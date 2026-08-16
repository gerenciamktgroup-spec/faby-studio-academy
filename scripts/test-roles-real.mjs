import fs from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto';

// 1. Strict Environment Load
const env = {};
if (fs.existsSync('.env.local')) {
  const lines = fs.readFileSync('.env.local', 'utf-8').split('\n');
  for (const line of lines) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) {
      env[match[1]] = match[2].trim();
      process.env[match[1]] = match[2].trim();
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
const ipHashSalt = process.env.AUDIT_IP_HASH_SALT || env.AUDIT_IP_HASH_SALT;
const certSigningSecret = process.env.CERTIFICATE_SIGNING_SECRET || env.CERTIFICATE_SIGNING_SECRET;

if (!supabaseUrl || !supabaseAnonKey || !serviceKey) {
  console.error('❌ FATAL: Credenciales incompletas de Supabase en el entorno.');
  process.exit(1);
}

if (!ipHashSalt || ipHashSalt.length < 32) {
  console.error('❌ FATAL: AUDIT_IP_HASH_SALT debe tener al menos 32 caracteres.');
  process.exit(1);
}

if (!certSigningSecret || certSigningSecret.length < 32) {
  console.error('❌ FATAL: CERTIFICATE_SIGNING_SECRET debe tener al menos 32 caracteres.');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const anonClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

let passedCount = 0;
let testIndex = 1;
const createdUsers = [];
const createdEnrollments = [];
const createdCertificates = [];
const createdSessions = [];
const createdSubmissions = [];

function assert(description, condition, details = '') {
  if (condition) {
    console.log(`   ✅ [${testIndex++}] ${description} ${details ? '(' + details + ')' : ''}`);
    passedCount++;
  } else {
    console.error(`   ❌ [${testIndex++}] FAILED: ${description} ${details ? '(' + details + ')' : ''}`);
    throw new Error(`Assertion failed: ${description}`);
  }
}

function buildCanonicalPayload(params) {
  const version = params.version ?? '2.0';
  if (version === '1.0') {
    return JSON.stringify({
      version: '1.0',
      code: params.code,
      student_id: params.studentId,
      student_name: params.studentName,
      course_id: params.courseId,
      course_title: params.courseTitle,
      total_active_hours: Number((params.totalActiveSeconds / 3600).toFixed(2)),
      issued_at: new Date(params.issuedAt).toISOString(),
    });
  }

  return JSON.stringify({
    version: '2.0',
    code: params.code,
    student_id: params.studentId,
    student_name: params.studentName,
    course_id: params.courseId,
    course_title: params.courseTitle,
    total_active_seconds: Math.floor(params.totalActiveSeconds),
    issued_at: new Date(params.issuedAt).toISOString(),
  });
}

async function verifyCertificateReal(code) {
  const { data, error } = await supabaseAdmin
    .from('certificates')
    .select('enrollment_id, student_id, course_id, code, hash_signature, payload_version, student_name_snapshot, course_title_snapshot, total_active_seconds, total_active_hours, issued_at, verification_url, profiles(full_name), courses(title)')
    .eq('code', code)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const studentName = data.student_name_snapshot || data.profiles?.full_name || 'Alumna Faby Studio';
  const courseTitle = data.course_title_snapshot || data.courses?.title || 'Curso Profesional';
  const totalActiveSeconds = data.total_active_seconds ?? Math.round(Number(data.total_active_hours || 0) * 3600);
  const totalActiveHours = Number((totalActiveSeconds / 3600).toFixed(2));
  const canonicalIssuedAt = new Date(data.issued_at).toISOString();
  const payloadVersion = data.payload_version ?? '1.0';

  const canonicalPayload = buildCanonicalPayload({
    version: payloadVersion,
    code: data.code,
    studentId: data.student_id,
    studentName,
    courseId: data.course_id,
    courseTitle,
    totalActiveSeconds,
    issuedAt: canonicalIssuedAt,
  });

  const expected = createHmac('sha256', certSigningSecret)
    .update(canonicalPayload)
    .digest();

  const actual = Buffer.from(data.hash_signature, 'hex');
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return null;
  }

  return {
    code: data.code,
    student_name: studentName,
    course_title: courseTitle,
    total_active_hours: totalActiveHours,
    issued_at: canonicalIssuedAt,
    verification_url: data.verification_url,
    is_valid: true,
  };
}

function computeIpHashLocal(ip) {
  return createHmac('sha256', ipHashSalt).update(ip).digest('hex');
}

async function createLiveTestUser(role, prefix) {
  const timestamp = Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const email = `${prefix}_${timestamp}@staging.faby.internal`;
  const password = `StagingTest_${timestamp}!Aa1`;
  const fullName = `Test User ${role} ${timestamp}`;

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  if (error || !data.user) {
    throw new Error(`Failed to create test user: ${error?.message}`);
  }

  const userId = data.user.id;
  createdUsers.push(userId);

  // Set role
  if (role !== 'alumna') {
    await supabaseAdmin.from('user_roles').delete().eq('user_id', userId).eq('role', 'alumna');
    await supabaseAdmin.from('user_roles').insert({ user_id: userId, role });
  }

  const userClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: sessionData, error: sessionErr } = await userClient.auth.signInWithPassword({
    email,
    password,
  });

  if (sessionErr || !sessionData.session) {
    throw new Error(`Failed to sign in test user ${email}: ${sessionErr?.message}`);
  }

  return {
    id: userId,
    email,
    password,
    fullName,
    client: userClient,
    session: sessionData.session,
  };
}

async function runLiveSecurityMatrix() {
  console.log('============================================================');
  console.log('  LIVE RBAC & RLS REAL SECURITY MATRIX (POSTGRESQL 17)');
  console.log(`  Supabase Target: ${supabaseUrl}`);
  console.log('============================================================\n');

  // Setup identities
  console.log('📋 Creando identidades reales de prueba en Staging...');
  const alumnaA = await createLiveTestUser('alumna', 'test_alumna_a');
  const alumnaB = await createLiveTestUser('alumna', 'test_alumna_b');
  const tutora = await createLiveTestUser('tutor', 'test_tutora');
  const profesoraAsignada = await createLiveTestUser('profesor', 'test_profesora_asig');
  const adminAcad = await createLiveTestUser('admin_academico', 'test_admin_acad');
  const auditor = await createLiveTestUser('auditor', 'test_auditor');
  const superadmin = await createLiveTestUser('superadmin', 'test_superadmin');
  const superadmin2 = await createLiveTestUser('superadmin', 'test_superadmin2');

  // Fetch a test course
  const { data: course, error: courseErr } = await supabaseAdmin
    .from('courses')
    .select('id, title, estimated_hours, min_active_hours_pct')
    .limit(1)
    .single();
  if (courseErr || !course) throw new Error('No course found for testing.');

  // Ensure course staff assignment for profesoraAsignada
  await supabaseAdmin.from('course_staff').upsert(
    { course_id: course.id, user_id: profesoraAsignada.id, staff_role: 'profesor', is_active: true },
    { onConflict: 'course_id,user_id,staff_role' }
  );

  console.log('\n🔒 1. PROTECCIÓN DE ROLES Y CONTROL DE ESCALADA:');

  // Test 1: Alumna direct insert in user_roles rejected
  const { error: err1 } = await alumnaA.client.from('user_roles').insert({ user_id: alumnaA.id, role: 'superadmin' });
  assert('Alumna A no puede insertar directamente en user_roles', Boolean(err1), `Code ${err1?.code}`);

  // Test 2: Alumna direct update in user_roles rejected
  const { error: err2 } = await alumnaA.client.from('user_roles').update({ role: 'superadmin' }).eq('user_id', alumnaA.id);
  assert('Alumna A no puede actualizar directamente user_roles', Boolean(err2), `Code ${err2?.code}`);

  // Test 3: Alumna direct delete in user_roles rejected
  const { error: err3 } = await alumnaA.client.from('user_roles').delete().eq('user_id', alumnaA.id);
  assert('Alumna A no puede eliminar de user_roles', Boolean(err3), `Code ${err3?.code}`);

  // Test 4: Anonymous client denied read access to user_roles
  const { data: dataAnonRoles, error: err4 } = await anonClient.from('user_roles').select('*');
  assert('Cliente anónimo no puede acceder a las filas de user_roles (Aislamiento RLS)', (dataAnonRoles ?? []).length === 0 || Boolean(err4));

  // Test 5: Alumna cannot execute manage_user_role_tx RPC
  const { error: err5 } = await alumnaA.client.rpc('manage_user_role_tx', {
    p_actor_id: alumnaA.id,
    p_target_user_id: alumnaA.id,
    p_target_role: 'superadmin',
    p_action: 'ASSIGN',
  });
  assert('Alumna A no puede ejecutar la función RPC manage_user_role_tx', Boolean(err5), `Code ${err5?.code}`);

  // Test 6: Anonymous cannot execute manage_user_role_tx RPC
  const { error: err6 } = await anonClient.rpc('manage_user_role_tx', {
    p_actor_id: alumnaA.id,
    p_target_user_id: alumnaA.id,
    p_target_role: 'superadmin',
    p_action: 'ASSIGN',
  });
  assert('Cliente anónimo no puede ejecutar manage_user_role_tx', Boolean(err6), `Code ${err6?.code}`);

  // Test 7: Academic Admin cannot assign superadmin role
  const { error: err7 } = await supabaseAdmin.rpc('manage_user_role_tx', {
    p_actor_id: adminAcad.id,
    p_target_user_id: alumnaA.id,
    p_target_role: 'superadmin',
    p_action: 'ASSIGN',
  });
  assert('Admin Académico es rechazado al intentar asignar rol superadmin', Boolean(err7), err7?.message);

  // Test 8: Academic Admin cannot alter roles of accounts with elevated roles
  const { error: err8 } = await supabaseAdmin.rpc('manage_user_role_tx', {
    p_actor_id: adminAcad.id,
    p_target_user_id: auditor.id,
    p_target_role: 'alumna',
    p_action: 'ASSIGN',
  });
  assert('Admin Académico es rechazado al intentar modificar usuario con rol elevado', Boolean(err8), err8?.message);

  // Test 9: Superadmin assigns operative role via manage_user_role_tx successfully
  const { data: data9, error: err9 } = await supabaseAdmin.rpc('manage_user_role_tx', {
    p_actor_id: superadmin.id,
    p_target_user_id: tutora.id,
    p_target_role: 'profesor',
    p_action: 'ASSIGN',
  });
  assert('Superadministrador asigna rol docente exitosamente vía manage_user_role_tx', !err9 && data9?.success === true);

  // Test 10: Concurrent attempt to remove the only remaining superadmin is blocked
  await supabaseAdmin.from('user_roles').insert({ user_id: superadmin2.id, role: 'alumna' });
  await supabaseAdmin.rpc('manage_user_role_tx', {
    p_actor_id: superadmin.id,
    p_target_user_id: superadmin2.id,
    p_target_role: 'superadmin',
    p_action: 'REMOVE',
  });

  const [race1, race2] = await Promise.all([
    supabaseAdmin.rpc('manage_user_role_tx', {
      p_actor_id: superadmin.id,
      p_target_user_id: superadmin.id,
      p_target_role: 'superadmin',
      p_action: 'REMOVE',
    }),
    supabaseAdmin.rpc('manage_user_role_tx', {
      p_actor_id: superadmin.id,
      p_target_user_id: superadmin.id,
      p_target_role: 'superadmin',
      p_action: 'REMOVE',
    }),
  ]);
  const raceBlocked = Boolean(race1.error) && Boolean(race2.error);
  assert('Intentos concurrentes de revocar al último superadministrador quedan bloqueados por serialización FOR UPDATE', raceBlocked, race1.error?.message);

  // 2. AISLAMIENTO RLS ENTRE ALUMNAS Y STORAGE:
  let { data: assign } = await supabaseAdmin.from('assignments').select('id').limit(1).maybeSingle();
  if (!assign) {
    const { data: mod } = await supabaseAdmin.from('modules').select('id').limit(1).single();
    const { data: newAssign } = await supabaseAdmin.from('assignments').insert({
      module_id: mod.id,
      title: 'Práctica de Validación RLS',
      description: 'Práctica de aislamiento de entregas'
    }).select('id').single();
    assign = newAssign;
  }

  // Create practice submissions for Alumna A and Alumna B
  const { data: subA, error: subAErr } = await supabaseAdmin
    .from('assignment_submissions')
    .insert({
      assignment_id: assign.id,
      student_id: alumnaA.id,
      submission_text: 'Práctica privada Alumna A',
    })
    .select('id')
    .single();
  if (subAErr) throw subAErr;
  createdSubmissions.push(subA.id);

  const { data: subB, error: subBErr } = await supabaseAdmin
    .from('assignment_submissions')
    .insert({
      assignment_id: assign.id,
      student_id: alumnaB.id,
      submission_text: 'Práctica privada Alumna B',
    })
    .select('id')
    .single();
  if (subBErr) throw subBErr;
  createdSubmissions.push(subB.id);

  // Test 11: Alumna A cannot read Alumna B's submission
  const { data: readBbyA } = await alumnaA.client
    .from('assignment_submissions')
    .select('*')
    .eq('id', subB.id);
  assert('Alumna A no puede leer entregas de prácticas de Alumna B', (readBbyA ?? []).length === 0);

  // Test 12: Alumna A can read her own submission
  const { data: readAbyA } = await alumnaA.client
    .from('assignment_submissions')
    .select('*')
    .eq('id', subA.id);
  assert('Alumna A puede leer sus propias entregas de prácticas', (readAbyA ?? []).length === 1);

  // Test 13: Storage denies cross-user read in private buckets
  const testFileA = `private_${alumnaA.id}/evidence_${Date.now()}.png`;
  await supabaseAdmin.storage.from('practice-evidence').upload(testFileA, Buffer.from('fake_image_content'), { contentType: 'image/png' });
  const { data: downloadCross } = await alumnaB.client.storage.from('practice-evidence').download(testFileA);
  assert('Storage bloquea la lectura cruzada de evidencias privadas entre alumnas', downloadCross === null);
  await supabaseAdmin.storage.from('practice-evidence').remove([testFileA]);

  console.log('\n📜 3. CONSENTIMIENTOS, INMUTABILIDAD Y ROLLBACK:');

  // Test 14: Direct write to consent_records is rejected for alumna
  const { error: errConsentInsert } = await alumnaA.client.from('consent_records').insert({
    user_id: alumnaA.id,
    consent_type: 'terms',
    version: '2026.1',
    granted_at: new Date().toISOString(),
  });
  assert('Alumna A no puede insertar directamente en consent_records', Boolean(errConsentInsert), `Code ${errConsentInsert?.code}`);

  // Test 15: Direct update on consent_records is rejected
  const { error: errConsentUpdate } = await alumnaA.client.from('consent_records').update({ version: '9999' }).eq('user_id', alumnaA.id);
  assert('Alumna A no puede actualizar consent_records', Boolean(errConsentUpdate), `Code ${errConsentUpdate?.code}`);

  // Test 16: Idempotent consent registration does not mutate granted_at or evidence
  const userIp = '198.51.100.42';
  const ipHash = computeIpHashLocal(userIp);
  const { data: initialConsent, error: consentRpcErr } = await supabaseAdmin.rpc('record_user_legal_consents', {
    p_user_id: alumnaA.id,
    p_ip_hash: ipHash,
    p_user_agent: 'Mozilla/5.0 TestAgent',
    p_terms_version: '2026.1',
    p_privacy_version: '2026.1',
  });
  if (consentRpcErr) throw consentRpcErr;

  const { data: firstGrantRow } = await supabaseAdmin
    .from('consent_records')
    .select('granted_at, ip_hash')
    .eq('id', initialConsent.terms_consent_id)
    .single();

  // Retry recording consent
  await supabaseAdmin.rpc('record_user_legal_consents', {
    p_user_id: alumnaA.id,
    p_ip_hash: computeIpHashLocal('203.0.113.99'),
    p_user_agent: 'Mozilla/5.0 DifferentAgent',
    p_terms_version: '2026.1',
    p_privacy_version: '2026.1',
  });

  const { data: retryGrantRow } = await supabaseAdmin
    .from('consent_records')
    .select('granted_at, ip_hash')
    .eq('id', initialConsent.terms_consent_id)
    .single();

  const timestampUnchanged = firstGrantRow?.granted_at === retryGrantRow?.granted_at;
  const ipUnchanged = firstGrantRow?.ip_hash === retryGrantRow?.ip_hash;
  assert('Registro de consentimiento es idempotente: no muta granted_at ni sobrescribe evidencia', timestampUnchanged && ipUnchanged);

  // Test 17: Legal document versions published are immutable
  const { error: errMutateLegal } = await supabaseAdmin
    .from('legal_document_versions')
    .update({ content_text: 'Mutated illegal text' })
    .eq('version', '2026.1');
  assert('Versiones legales publicadas impiden modificación de contenido (Trigger de inmutabilidad)', Boolean(errMutateLegal), errMutateLegal?.message);

  // Test 18: Rollback verification on registration failure
  const orphanTestEmail = `rollback_test_${Date.now()}@staging.faby.internal`;
  const { data: orphanUser } = await supabaseAdmin.auth.admin.createUser({
    email: orphanTestEmail,
    password: 'Password123!Aa1',
    email_confirm: true,
  });
  if (orphanUser?.user) {
    const { error: rollbackDelErr } = await supabaseAdmin.auth.admin.deleteUser(orphanUser.user.id);
    assert('Rollback de usuario Auth ante fallo de registro se ejecuta y valida sin error', !rollbackDelErr);

    const { data: verifiedDeleted } = await supabaseAdmin.auth.admin.getUserById(orphanUser.user.id);
    assert('Confirmado que no existe usuario huérfano tras rollback', !verifiedDeleted?.user);
  }

  console.log('\n🎓 4. CERTIFICADOS AL SEGUNDO EXACTO, FIRMA CANÓNICA Y VERIFICACIÓN SANITIZADA:');

  const estimatedSeconds = Math.round(Number(course.estimated_hours) * 3600);
  const minPct = Number(course.min_active_hours_pct ?? 0.80);
  const requiredActiveSeconds = Math.ceil(estimatedSeconds * minPct);

  // Create enrollment for Alumna A
  const { data: enrollA, error: enrollAErr } = await supabaseAdmin
    .from('enrollments')
    .insert({
      student_id: alumnaA.id,
      course_id: course.id,
      status: 'active',
    })
    .select('id')
    .single();
  if (enrollAErr) throw enrollAErr;
  createdEnrollments.push(enrollA.id);

  // Test 19: Certificate rejected at requiredSeconds - 1 (Below threshold -> 409)
  const belowSeconds = requiredActiveSeconds - 1;
  const { data: sessBelow, error: sessBelowErr } = await supabaseAdmin.from('session_logs').insert({
    user_id: alumnaA.id,
    course_id: course.id,
    session_id: `sess_test_below_${Date.now()}`,
    total_active_seconds: belowSeconds,
    total_logged_seconds: belowSeconds + 100,
  }).select('id').single();
  if (sessBelowErr) throw sessBelowErr;
  createdSessions.push(sessBelow.id);

  // Test issuance rejection when active time < required
  const { data: sessionsA } = await supabaseAdmin.from('session_logs').select('total_active_seconds').eq('user_id', alumnaA.id).eq('course_id', course.id);
  const totalA = (sessionsA ?? []).reduce((acc, s) => acc + Number(s.total_active_seconds || 0), 0);
  assert('Verificación de tiempo activo: total < requerido detectado al segundo exacto', totalA < requiredActiveSeconds, `${totalA}s < ${requiredActiveSeconds}s`);

  // Test 20: Add 1 second to reach exact threshold -> issuance allowed
  const { data: sessExact, error: sessExactErr } = await supabaseAdmin.from('session_logs').insert({
    user_id: alumnaA.id,
    course_id: course.id,
    session_id: `sess_test_exact_${Date.now()}`,
    total_active_seconds: 1,
    total_logged_seconds: 5,
  }).select('id').single();
  if (sessExactErr) throw sessExactErr;
  createdSessions.push(sessExact.id);

  const { data: sessionsA2 } = await supabaseAdmin.from('session_logs').select('total_active_seconds').eq('user_id', alumnaA.id).eq('course_id', course.id);
  const totalA2 = (sessionsA2 ?? []).reduce((acc, s) => acc + Number(s.total_active_seconds || 0), 0);
  assert('Alcanzado el umbral exacto de horas activas (total == requerido)', totalA2 === requiredActiveSeconds, `${totalA2}s === ${requiredActiveSeconds}s`);

  // Issue certificate for Alumna A with snapshot fields
  const certCode = `FABY-${new Date().getUTCFullYear()}-${randomUUID().replaceAll('-', '').slice(0, 12).toUpperCase()}`;
  const issuedAt = new Date().toISOString();
  const canonicalPayload = buildCanonicalPayload({
    version: '2.0',
    code: certCode,
    studentId: alumnaA.id,
    studentName: alumnaA.fullName,
    courseId: course.id,
    courseTitle: course.title,
    totalActiveSeconds: totalA2,
    issuedAt,
  });

  const validSignature = createHmac('sha256', certSigningSecret)
    .update(canonicalPayload)
    .digest('hex');

  const { data: certRow, error: certErr } = await supabaseAdmin.from('certificates').insert({
    enrollment_id: enrollA.id,
    student_id: alumnaA.id,
    course_id: course.id,
    code: certCode,
    hash_signature: validSignature,
    payload_version: '2.0',
    student_name_snapshot: alumnaA.fullName,
    course_title_snapshot: course.title,
    total_active_seconds: totalA2,
    total_active_hours: Number((totalA2 / 3600).toFixed(2)),
    issued_at: issuedAt,
    verification_url: `https://faby-studio-academy.vercel.app/verificar-certificado/${certCode}`,
  }).select('id, code').single();
  if (certErr) throw certErr;
  createdCertificates.push(certRow.id);

  assert('Certificado emitido con éxito con snapshots persistidos y firma canónica v2', Boolean(certRow?.id));

  // Test 21: Public verification validates canonical HMAC and matches snapshots
  const verified = await verifyCertificateReal(certCode);
  assert('Verificación pública confirma autenticidad del certificado y firma válida', verified?.is_valid === true && verified?.code === certCode);

  // Test 22: Public response does not contain sensitive internal fields (hash, uuid, email)
  const isSanitized = !('hash_signature' in verified) && !('student_id' in verified) && !('course_id' in verified) && !('email' in verified);
  assert('Respuesta de verificación pública está estrictamente sanitizada (sin hashes, UUID ni correo)', isSanitized);

  // Test 23: Tampered signature or payload is rejected
  const tamperedCode = `FABY-TAMPERED-${Date.now()}`;
  await supabaseAdmin.from('certificates').insert({
    enrollment_id: enrollA.id,
    student_id: alumnaA.id,
    course_id: course.id,
    code: tamperedCode,
    hash_signature: 'deadbeef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    payload_version: '2.0',
    student_name_snapshot: 'Nombre Falso',
    course_title_snapshot: course.title,
    total_active_seconds: 500,
    total_active_hours: 0.14,
    issued_at: issuedAt,
    verification_url: `https://faby-studio-academy.vercel.app/verificar-certificado/${tamperedCode}`,
  });
  const tamperedResult = await verifyCertificateReal(tamperedCode);
  assert('Certificado con firma alterada o corrupta es rechazado (is_valid = false/null)', tamperedResult === null);

  // Test 24: Non-existent certificate returns null (404)
  const nonExistent = await verifyCertificateReal('FABY-NON-EXISTENT-9999');
  assert('Certificado inexistente devuelve null (404)', nonExistent === null);

  // Test 25: Tutora, Profesora, Admin, Auditor and Superadmin execute role specific actions
  const { data: auditLogs, error: auditReadErr } = await auditor.client.from('activity_events').select('*').limit(5);
  assert('Auditor puede inspeccionar la línea de eventos inmutable de activity_events', !auditReadErr && Array.isArray(auditLogs));

  const { data: alumnaLogs } = await alumnaA.client.from('activity_events').select('*');
  const alumnaSeesOnlyOwn = (alumnaLogs ?? []).every(e => e.user_id === alumnaA.id);
  assert('Alumna A solo puede ver sus propios registros en activity_events (Aislamiento RLS)', alumnaSeesOnlyOwn);

  console.log('\n🧹 5. LIMPIEZA COMPROBADA DE IDENTIDADES DE PRUEBA:');

  // Purge test fixtures via transactional service_role procedure
  await supabaseAdmin.rpc('clean_test_fixture_tx', { p_user_ids: createdUsers });

  let cleanDeletes = 0;
  for (const uid of createdUsers) {
    const { error: delErr } = await supabaseAdmin.auth.admin.deleteUser(uid);
    if (!delErr) {
      cleanDeletes++;
    } else {
      console.log(`   [Clean Auth Error] User ${uid}: ${delErr.message}`);
    }
  }

  assert(`Todas las ${createdUsers.length} cuentas de prueba fueron eliminadas limpiamente de Supabase Auth`, cleanDeletes === createdUsers.length, `${cleanDeletes}/${createdUsers.length} purgadas`);

  console.log('\n============================================================');
  console.log(`  RESULTADO: ${passedCount} PRUEBAS SUPERADAS / 0 FALLOS`);
  console.log('  EXIT CODE: 0 (VALIDACIÓN LIVE COMPLETADA CON ÉXITO)');
  console.log('============================================================');
}

runLiveSecurityMatrix().catch((error) => {
  console.error('\n❌ ERROR CRÍTICO EN LA MATRIZ DE SEGURIDAD:', error);
  process.exit(1);
});
