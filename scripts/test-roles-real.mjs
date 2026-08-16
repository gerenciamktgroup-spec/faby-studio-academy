import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

function loadLocalEnvironment() {
  if (!fs.existsSync('.env.local')) return;
  for (const rawLine of fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const separator = line.indexOf('=');
    if (separator < 1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function requireEnvironment(name, minLength = 1) {
  const value = process.env[name]?.trim();
  if (!value || value.length < minLength) throw new Error(`Falta o es inválida la variable ${name}.`);
  return value;
}

let passed = 0;
function check(description, condition, details = '') {
  if (!condition) throw new Error(`${description}${details ? ` — ${details}` : ''}`);
  passed += 1;
  console.log(`✅ [${passed}] ${description}`);
}

function strictResult(description, result) {
  if (result.error) throw new Error(`${description}: ${result.error.message}`);
  return result.data;
}

async function waitForApplication(baseUrl, child) {
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    if (child?.exitCode !== null) throw new Error(`Next.js terminó antes de estar listo (${child.exitCode}).`);
    try {
      const response = await fetch(`${baseUrl}/login`, { redirect: 'manual' });
      if (response.status < 500) return;
    } catch {
      // El proceso todavía está iniciando; el límite temporal controla el fallo.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error('Next.js no estuvo disponible dentro de 120 segundos.');
}

function startApplication(baseUrl) {
  if (process.env.LIVE_APP_URL) return null;
  const port = new URL(baseUrl).port || '3100';
  const child = spawn(
    'npm',
    ['run', 'dev', '--', '--hostname', '127.0.0.1', '--port', port],
    {
      env: {
        ...process.env,
        ENABLE_PUBLIC_REGISTRATION: 'true',
        NEXT_PUBLIC_APP_URL: baseUrl,
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    }
  );
  child.stdout.on('data', (chunk) => process.stdout.write(`[next] ${chunk}`));
  child.stderr.on('data', (chunk) => process.stderr.write(`[next] ${chunk}`));
  return child;
}

async function apiRequest(baseUrl, path, options = {}, accessToken) {
  const headers = new Headers(options.headers);
  headers.set('content-type', 'application/json');
  if (accessToken) headers.set('authorization', `Bearer ${accessToken}`);
  const response = await fetch(`${baseUrl}${path}`, { ...options, headers });
  const body = await response.json().catch(() => null);
  return { response, body };
}

function containsPrivateKey(value) {
  const forbidden = new Set([
    'id',
    'student_id',
    'course_id',
    'enrollment_id',
    'hash_signature',
    'email',
  ]);
  if (Array.isArray(value)) return value.some(containsPrivateKey);
  if (!value || typeof value !== 'object') return false;
  return Object.entries(value).some(([key, nested]) => forbidden.has(key) || containsPrivateKey(nested));
}

loadLocalEnvironment();
const supabaseUrl = requireEnvironment('NEXT_PUBLIC_SUPABASE_URL');
const anonKey = requireEnvironment('NEXT_PUBLIC_SUPABASE_ANON_KEY', 40);
const serviceKey = requireEnvironment('SUPABASE_SERVICE_ROLE_KEY', 40);
requireEnvironment('AUDIT_IP_HASH_SALT', 32);
requireEnvironment('CERTIFICATE_SIGNING_SECRET', 32);

const baseUrl = (process.env.LIVE_APP_URL?.trim() || 'http://127.0.0.1:3100').replace(/\/$/, '');
const admin = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const anonymous = createClient(supabaseUrl, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const runId = randomUUID();
const users = [];
const storageObjects = [];
let testCourseId = null;
let application = null;

async function createUser(role, label, retainStudentRole = false) {
  const email = `${label}_${runId}@staging.faby.internal`;
  const password = `Staging_${randomUUID()}!Aa1`;
  const fullName = `Security Test ${label}`;
  const created = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, security_test_run_id: runId },
  });
  if (created.error || !created.data.user) {
    throw new Error(`No se pudo crear ${label}: ${created.error?.message}`);
  }

  const id = created.data.user.id;
  users.push(id);

  if (role !== 'alumna') {
    const roleInsert = await admin.from('user_roles').insert({ user_id: id, role });
    strictResult(`Asignación inicial ${role}`, roleInsert);
    if (!retainStudentRole) {
      const defaultDelete = await admin
        .from('user_roles')
        .delete()
        .eq('user_id', id)
        .eq('role', 'alumna');
      strictResult(`Retiro del rol inicial de ${label}`, defaultDelete);
    }
  }

  const client = createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const signedIn = await client.auth.signInWithPassword({ email, password });
  if (signedIn.error || !signedIn.data.session) {
    throw new Error(`No se pudo autenticar ${label}: ${signedIn.error?.message}`);
  }

  return {
    id,
    email,
    fullName,
    client,
    accessToken: signedIn.data.session.access_token,
  };
}

async function createEnrollmentFixture(student, activeSeconds) {
  const enrollment = strictResult(
    `Matrícula para ${student.email}`,
    await admin
      .from('enrollments')
      .insert({ student_id: student.id, course_id: testCourseId, status: 'active' })
      .select('id')
      .single()
  );
  const lesson = strictResult(
    'Lectura de lección de prueba',
    await admin
      .from('lessons')
      .select('id, modules!inner(course_id)')
      .eq('modules.course_id', testCourseId)
      .single()
  );
  strictResult(
    `Progreso para ${student.email}`,
    await admin.from('lesson_progress').insert({
      student_id: student.id,
      lesson_id: lesson.id,
      status: 'completed',
      active_time_seconds: activeSeconds,
      completed_at: new Date().toISOString(),
    })
  );
  strictResult(
    `Sesión activa para ${student.email}`,
    await admin.from('session_logs').insert({
      user_id: student.id,
      course_id: testCourseId,
      session_id: `security_${runId}_${student.id}`,
      total_active_seconds: activeSeconds,
      total_logged_seconds: activeSeconds,
      is_active: false,
      ended_at: new Date().toISOString(),
    })
  );
  return enrollment.id;
}

async function cleanup() {
  for (const object of storageObjects) {
    const removed = await admin.storage.from(object.bucket).remove([object.path]);
    if (removed.error) console.error(`Cleanup Storage: ${removed.error.message}`);
  }

  if (users.length > 0) {
    const certificateDelete = await admin
      .from('certificates')
      .delete()
      .in('student_id', users)
      .eq('is_test_fixture', true);
    if (certificateDelete.error) console.error(`Cleanup certificados: ${certificateDelete.error.message}`);
  }

  if (testCourseId) {
    const courseDelete = await admin.from('courses').delete().eq('id', testCourseId);
    if (courseDelete.error) console.error(`Cleanup curso: ${courseDelete.error.message}`);
  }

  for (const userId of users) {
    const deleted = await admin.auth.admin.deleteUser(userId);
    if (deleted.error) console.error(`Cleanup Auth ${userId}: ${deleted.error.message}`);
  }

  if (application && application.exitCode === null) application.kill('SIGTERM');
}

async function run() {
  console.log(`LIVE target: ${supabaseUrl}`);
  application = startApplication(baseUrl);
  await waitForApplication(baseUrl, application);
  check('La aplicación Next.js está disponible para pruebas HTTP reales', true);

  const baselineSuperRows = strictResult(
    'Lectura del baseline de superadmins',
    await admin.from('user_roles').select('user_id').eq('role', 'superadmin')
  );
  const baselineSuperCount = baselineSuperRows.length;

  const alumnaBelow = await createUser('alumna', 'alumna_below');
  const alumnaExact = await createUser('alumna', 'alumna_exact');
  const alumnaAbove = await createUser('alumna', 'alumna_above');
  const alumnaTamper = await createUser('alumna', 'alumna_tamper');
  const tutor = await createUser('tutor', 'tutor');
  const professor = await createUser('profesor', 'professor');
  const adminAcademic = await createUser('admin_academico', 'admin');
  const auditor = await createUser('auditor', 'auditor');
  const superadminA = await createUser('superadmin', 'super_a', true);
  const superadminB = await createUser('superadmin', 'super_b', true);
  check('Se autenticaron identidades reales para los seis roles y cuatro matrículas de umbral', users.length === 10);

  const anonymousRoleInsert = await anonymous.from('user_roles').insert({
    user_id: alumnaBelow.id,
    role: 'superadmin',
  });
  check('Anónimo no puede escribir user_roles', Boolean(anonymousRoleInsert.error));

  const studentRoleInsert = await alumnaBelow.client.from('user_roles').insert({
    user_id: alumnaBelow.id,
    role: 'superadmin',
  });
  check('Alumna no puede autoasignarse roles', Boolean(studentRoleInsert.error));

  const clientRpc = await alumnaBelow.client.rpc('manage_user_role_tx', {
    p_actor_id: alumnaBelow.id,
    p_target_user_id: alumnaBelow.id,
    p_target_role: 'superadmin',
    p_action: 'ASSIGN',
  });
  check('Alumna no puede ejecutar manage_user_role_tx', Boolean(clientRpc.error));

  const adminEscalation = await admin.rpc('manage_user_role_tx', {
    p_actor_id: adminAcademic.id,
    p_target_user_id: tutor.id,
    p_target_role: 'superadmin',
    p_action: 'ASSIGN',
  });
  check('admin_academico no puede escalar una cuenta a superadmin', Boolean(adminEscalation.error));

  const race = await Promise.all([
    admin.rpc('manage_user_role_tx', {
      p_actor_id: superadminA.id,
      p_target_user_id: superadminA.id,
      p_target_role: 'superadmin',
      p_action: 'REMOVE',
    }),
    admin.rpc('manage_user_role_tx', {
      p_actor_id: superadminB.id,
      p_target_user_id: superadminB.id,
      p_target_role: 'superadmin',
      p_action: 'REMOVE',
    }),
  ]);
  const expectedRaceErrors = baselineSuperCount === 0 ? 1 : 0;
  check(
    'La carrera de degradación conserva el baseline global de superadmins',
    race.filter((result) => result.error).length === expectedRaceErrors
  );
  const remainingSupers = strictResult(
    'Conteo posterior de superadmins',
    await admin.from('user_roles').select('user_id').eq('role', 'superadmin')
  );
  check(
    'El invariante conserva al menos un superadmin y nunca reduce el baseline existente',
    remainingSupers.length >= Math.max(1, baselineSuperCount)
  );

  for (const user of [superadminA, superadminB]) {
    const restore = await admin
      .from('user_roles')
      .upsert({ user_id: user.id, role: 'superadmin' }, { onConflict: 'user_id,role' });
    strictResult(`Restauración de fixture ${user.email}`, restore);
  }

  const consentHashA = 'a'.repeat(64);
  const consentHashB = 'b'.repeat(64);
  const concurrentConsents = await Promise.all([
    admin.rpc('record_user_legal_consents', {
      p_user_id: alumnaBelow.id,
      p_ip_hash: consentHashA,
      p_user_agent: 'SecurityMatrix/A',
      p_terms_version: '2026.2',
      p_privacy_version: '2026.2',
    }),
    admin.rpc('record_user_legal_consents', {
      p_user_id: alumnaBelow.id,
      p_ip_hash: consentHashB,
      p_user_agent: 'SecurityMatrix/B',
      p_terms_version: '2026.2',
      p_privacy_version: '2026.2',
    }),
  ]);
  check('Las dos llamadas concurrentes de consentimiento terminan sin error', concurrentConsents.every((result) => !result.error));
  const consentRows = strictResult(
    'Lectura de consentimientos concurrentes',
    await admin
      .from('consent_records')
      .select('consent_type, ip_hash, granted_at, legal_version_id')
      .eq('user_id', alumnaBelow.id)
      .eq('version', '2026.2')
  );
  check('La concurrencia genera exactamente una evidencia por documento', consentRows.length === 2);
  check('La evidencia original no fue sobrescrita por el reintento', new Set(consentRows.map((row) => row.ip_hash)).size === 1);

  const legalMutation = await admin
    .from('legal_document_versions')
    .update({ title: 'Mutación prohibida' })
    .eq('version', '2026.2');
  check('La inmutabilidad legal bloquea también cambios de título', Boolean(legalMutation.error));

  const course = strictResult(
    'Creación de curso de umbral',
    await admin
      .from('courses')
      .insert({
        slug: `security-threshold-${runId}`,
        title: `Security Threshold ${runId}`,
        description: 'Curso sintético para validar el umbral exacto al segundo.',
        category: 'Security Test',
        estimated_hours: 1,
        min_active_hours_pct: 0.8,
        is_published: false,
      })
      .select('id, title')
      .single()
  );
  testCourseId = course.id;
  const moduleRow = strictResult(
    'Creación de módulo de prueba',
    await admin
      .from('modules')
      .insert({ course_id: testCourseId, title: 'Módulo de seguridad', order_index: 1 })
      .select('id')
      .single()
  );
  const lessonRow = strictResult(
    'Creación de lección de prueba',
    await admin
      .from('lessons')
      .insert({
        module_id: moduleRow.id,
        title: 'Lección de seguridad',
        content_type: 'text',
        duration_seconds: 60,
        order_index: 1,
      })
      .select('id')
      .single()
  );
  strictResult(
    'Asignación real de profesora',
    await admin.from('course_staff').insert({
      course_id: testCourseId,
      user_id: professor.id,
      staff_role: 'profesor',
      is_active: true,
    })
  );

  const requiredSeconds = 2880;
  const belowEnrollment = await createEnrollmentFixture(alumnaBelow, requiredSeconds - 1);
  const exactEnrollment = await createEnrollmentFixture(alumnaExact, requiredSeconds);
  const aboveEnrollment = await createEnrollmentFixture(alumnaAbove, requiredSeconds + 1);
  const tamperEnrollment = await createEnrollmentFixture(alumnaTamper, requiredSeconds + 1);

  const anonymousIssue = await apiRequest(baseUrl, '/api/certificates', {
    method: 'POST',
    body: JSON.stringify({ enrollmentId: exactEnrollment }),
  });
  check('La API rechaza emisión anónima con 401', anonymousIssue.response.status === 401);

  const unassignedIssue = await apiRequest(baseUrl, '/api/certificates', {
    method: 'POST',
    body: JSON.stringify({ enrollmentId: exactEnrollment }),
  }, tutor.accessToken);
  check('La API rechaza docente no asignada con 403', unassignedIssue.response.status === 403);

  const belowIssue = await apiRequest(baseUrl, '/api/certificates', {
    method: 'POST',
    body: JSON.stringify({ enrollmentId: belowEnrollment }),
  }, professor.accessToken);
  check('La API rechaza requiredSeconds - 1 con 409', belowIssue.response.status === 409);

  const exactIssue = await apiRequest(baseUrl, '/api/certificates', {
    method: 'POST',
    body: JSON.stringify({ enrollmentId: exactEnrollment }),
  }, professor.accessToken);
  check('La API emite en el umbral exacto con 201', exactIssue.response.status === 201, JSON.stringify(exactIssue.body));

  const aboveIssue = await apiRequest(baseUrl, '/api/certificates', {
    method: 'POST',
    body: JSON.stringify({ enrollmentId: aboveEnrollment }),
  }, professor.accessToken);
  check('La API emite sobre el umbral con 201', aboveIssue.response.status === 201, JSON.stringify(aboveIssue.body));

  const duplicateIssue = await apiRequest(baseUrl, '/api/certificates', {
    method: 'POST',
    body: JSON.stringify({ enrollmentId: exactEnrollment }),
  }, professor.accessToken);
  check('La emisión repetida es idempotente y responde 409', duplicateIssue.response.status === 409);

  const publicVerification = await apiRequest(
    baseUrl,
    `/api/certificates?code=${encodeURIComponent(exactIssue.body.certificate.code)}`,
    { method: 'GET' }
  );
  check('La verificación pública real responde 200', publicVerification.response.status === 200);
  check('La respuesta pública no contiene campos privados', !containsPrivateKey(publicVerification.body));

  const tamperedCode = `FABY-${new Date().getUTCFullYear()}-TAMPER000001`;
  strictResult(
    'Inserción controlada del fixture alterado',
    await admin.from('certificates').insert({
      enrollment_id: tamperEnrollment,
      student_id: alumnaTamper.id,
      course_id: testCourseId,
      code: tamperedCode,
      hash_signature: 'd'.repeat(64),
      payload_version: '2.0',
      student_name_snapshot: alumnaTamper.fullName,
      course_title_snapshot: course.title,
      total_active_seconds: requiredSeconds + 1,
      total_active_hours: 0.8,
      issued_at: new Date().toISOString(),
      verification_url: `${baseUrl}/verificar-certificado/${tamperedCode}`,
      is_test_fixture: true,
    })
  );
  const tamperedVerification = await apiRequest(
    baseUrl,
    `/api/certificates?code=${encodeURIComponent(tamperedCode)}`,
    { method: 'GET' }
  );
  check('Una firma alterada es rechazada por la API con 404', tamperedVerification.response.status === 404);

  const ownPath = `${alumnaExact.id}/security-${runId}.txt`;
  const upload = await alumnaExact.client.storage
    .from('practice-evidence')
    .upload(ownPath, new Blob(['synthetic-security-evidence'], { type: 'text/plain' }));
  strictResult('Upload propietario en Storage', upload);
  storageObjects.push({ bucket: 'practice-evidence', path: ownPath });
  const ownDownload = await alumnaExact.client.storage.from('practice-evidence').download(ownPath);
  check('La propietaria puede descargar su evidencia', !ownDownload.error && ownDownload.data instanceof Blob);
  const crossDownload = await alumnaAbove.client.storage.from('practice-evidence').download(ownPath);
  check('Otra alumna no puede descargar la evidencia', Boolean(crossDownload.error) && !crossDownload.data);

  const submission = strictResult(
    'Creación de entrega privada A',
    await admin
      .from('assignments')
      .insert({
        lesson_id: lessonRow.id,
        title: 'Fixture de aislamiento',
        description: 'Solo para validar RLS',
      })
      .select('id')
      .single()
  );
  const privateSubmission = strictResult(
    'Creación de submission privada',
    await admin
      .from('assignment_submissions')
      .insert({
        assignment_id: submission.id,
        student_id: alumnaExact.id,
        submission_text: 'Evidencia sintética privada',
      })
      .select('id')
      .single()
  );
  const ownerRead = await alumnaExact.client
    .from('assignment_submissions')
    .select('id')
    .eq('id', privateSubmission.id);
  check('Alumna puede leer su propia entrega', !ownerRead.error && ownerRead.data?.length === 1);
  const crossRead = await alumnaAbove.client
    .from('assignment_submissions')
    .select('id')
    .eq('id', privateSubmission.id);
  check('Alumna no puede leer entregas ajenas', !crossRead.error && crossRead.data?.length === 0);

  const auditorRead = await auditor.client.from('activity_events').select('id').limit(1);
  check('Auditor puede leer la traza inmutable', !auditorRead.error && Array.isArray(auditorRead.data));

  console.log(`\nRESULTADO LIVE: ${passed} comprobaciones reales superadas.`);
}

try {
  await run();
} catch (error) {
  console.error('\n❌ MATRIZ LIVE FALLIDA');
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await cleanup();
}
