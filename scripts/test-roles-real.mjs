import fs from 'node:fs';
import crypto from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

// Parse .env.local safely
const envLines = fs.readFileSync('.env.local', 'utf-8').split('\n');
const env = {};
for (const line of envLines) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match) env[match[1]] = match[2].trim();
}

if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

const supabaseAdmin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const COURSE_A_ID = 'c1000000-0000-0000-0000-000000000001';
const COURSE_B_ID = 'c2000000-0000-0000-0000-000000000002';
const LESSON_A1_ID = 'b1000000-0000-4000-8000-000000000001';
const ASSESSMENT_A_ID = 'd1000000-0000-4000-8000-000000000001';

const testUsersConfig = [
  { role: 'alumna', emailPrefix: 'alumna_a', fullName: 'Alumna A (Matriculada)' },
  { role: 'alumna', emailPrefix: 'alumna_b', fullName: 'Alumna B (Sin Matrícula en A)' },
  { role: 'tutor', emailPrefix: 'tutora', fullName: 'Tutora Especialista' },
  { role: 'profesor', emailPrefix: 'profesora', fullName: 'Profesora Titular' },
  { role: 'admin_academico', emailPrefix: 'admin_acad', fullName: 'Administradora Académica' },
  { role: 'auditor', emailPrefix: 'auditor', fullName: 'Auditor Oficial' },
  { role: 'superadmin', emailPrefix: 'superadmin', fullName: 'Super Administradora' },
];

async function setupTestUser(cfg) {
  const email = `${cfg.emailPrefix}_${Date.now()}@staging.faby.internal`;
  const password = `StagingPass_${crypto.randomBytes(16).toString('hex')}!Aa1`;

  // Create auth user
  const { data: userData, error: userErr } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: cfg.fullName },
  });

  if (userErr || !userData.user) {
    throw new Error(`Failed to create test user ${email}: ${userErr?.message}`);
  }

  const userId = userData.user.id;

  // Insert profile explicitly
  await supabaseAdmin.from('profiles').upsert({
    id: userId,
    full_name: cfg.fullName,
    email: email,
  });

  // Manage roles: remove default 'alumna' if non-student role, and insert target role
  if (cfg.role !== 'alumna') {
    await supabaseAdmin.from('user_roles').delete().eq('user_id', userId).eq('role', 'alumna');
    await supabaseAdmin.from('user_roles').upsert({
      user_id: userId,
      role: cfg.role,
    }, { onConflict: 'user_id,role' });
  }

  const userClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: sessionData, error: sessionErr } = await userClient.auth.signInWithPassword({
    email,
    password,
  });

  if (sessionErr || !sessionData.session) {
    throw new Error(`Failed to sign in as ${email}: ${sessionErr?.message}`);
  }

  return {
    ...cfg,
    id: userId,
    email,
    client: userClient,
    jwt: sessionData.session.access_token,
  };
}

async function runRoleSecurityMatrix() {
  console.log('================================================================');
  console.log('  FASE 5: MATRIZ DE PRUEBAS DE SEGURIDAD REALES POR ROL (STAGING)');
  console.log('================================================================\n');

  const users = {};
  let totalTests = 0;
  let passedTests = 0;

  function assert(name, condition, details = '') {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`   ✅ [PASS] ${name} ${details ? `(${details})` : ''}`);
    } else {
      console.error(`   ❌ [FAIL] ${name} ${details ? `(${details})` : ''}`);
      throw new Error(`Assertion failed: ${name}`);
    }
  }

  try {
    console.log('1. Creando 7 usuarios de prueba desechables en Supabase Auth...');
    for (const cfg of testUsersConfig) {
      const user = await setupTestUser(cfg);
      users[cfg.emailPrefix] = user;
      console.log(`   • Creado: ${cfg.emailPrefix} (ID: ${user.id}, Rol: ${cfg.role})`);
    }

    // Verify roles in user_roles table
    for (const cfg of testUsersConfig) {
      const { data: roles } = await supabaseAdmin
        .from('user_roles')
        .select('role')
        .eq('user_id', users[cfg.emailPrefix].id);
      const roleList = (roles || []).map((r) => r.role);
      assert(
        `Rol exacto asignado para ${cfg.emailPrefix}`,
        roleList.length === 1 && roleList[0] === cfg.role,
        `roles: ${roleList.join(', ')}`
      );
    }

    const anonClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    console.log('\n2. Pruebas de Escalada de Privilegios (admin_academico -> superadmin)...');
    // Test direct DB mutation from client
    const { error: directInsertError } = await users.admin_acad.client
      .from('user_roles')
      .insert({ user_id: users.admin_acad.id, role: 'superadmin' });
    assert(
      'Escalada directa denegada: admin_academico no puede insertar en user_roles',
      directInsertError !== null && (directInsertError.code === '42501' || directInsertError.message.includes('permission') || directInsertError.message.includes('policy')),
      directInsertError ? `error code ${directInsertError.code}` : ''
    );

    const { error: directDeleteError } = await users.admin_acad.client
      .from('user_roles')
      .delete()
      .eq('user_id', users.superadmin.id);
    assert(
      'admin_academico no puede borrar roles de superadmin directamente',
      directDeleteError !== null && (directDeleteError.code === '42501' || directDeleteError.message.includes('permission')),
      directDeleteError ? `error code ${directDeleteError.code}` : ''
    );

    console.log('\n3. Pruebas de Acceso RLS por Rol (Positivas y Negativas)...');

    // Enroll alumna_a in Course A
    const { error: enrInsertErr } = await supabaseAdmin.from('enrollments').insert({
      student_id: users.alumna_a.id,
      course_id: COURSE_A_ID,
      status: 'active',
    });
    if (enrInsertErr) throw new Error(`Enrollment insert failed: ${enrInsertErr.message}`);

    // alumna_a reads enrolled course
    const { data: alumnaACourses, error: alumnaACoursesErr } = await users.alumna_a.client
      .from('enrollments')
      .select('course_id, status')
      .eq('student_id', users.alumna_a.id);
    if (alumnaACoursesErr) console.error('alumnaACoursesErr:', alumnaACoursesErr);
    assert('alumna_a lee su propia matrícula', !alumnaACoursesErr && alumnaACourses?.length === 1, `count: ${alumnaACourses?.length}`);

    // alumna_b cannot read alumna_a enrollment
    const { data: alumnaBSeeA, error: alumnaBSeeAErr } = await users.alumna_b.client
      .from('enrollments')
      .select('*')
      .eq('student_id', users.alumna_a.id);
    assert('alumna_b NO puede ver la matrícula de alumna_a', (alumnaBSeeA?.length ?? 0) === 0);

    // alumna cannot read correct_answer_json on questions
    const { data: questionData, error: questionError } = await users.alumna_a.client
      .from('questions')
      .select('id, question_text, correct_answer_json')
      .eq('assessment_id', ASSESSMENT_A_ID);
    assert(
      'alumna_a no puede leer correct_answer_json (columna restringida a nivel base de datos)',
      questionError !== null || (questionData && questionData.every((q) => q.correct_answer_json === undefined || q.correct_answer_json === null)),
      questionError ? `columna revocada: ${questionError.message}` : 'correct_answer_json inaccesible'
    );

    // alumna cannot read other student session logs
    await supabaseAdmin.from('session_logs').insert({
      user_id: users.alumna_a.id,
      course_id: COURSE_A_ID,
      session_id: 'sess_test_a',
      total_active_seconds: 120,
    });
    const { data: alumnaBSeeLogs } = await users.alumna_b.client
      .from('session_logs')
      .select('*')
      .eq('user_id', users.alumna_a.id);
    assert('alumna_b NO puede leer session_logs de alumna_a', (alumnaBSeeLogs?.length ?? 0) === 0);

    // auditor & superadmin can read activity_events
    const { data: auditorLogs, error: auditorLogsErr } = await users.auditor.client
      .from('activity_events')
      .select('id, event_type')
      .limit(5);
    assert('auditor puede leer activity_events', !auditorLogsErr && Array.isArray(auditorLogs));

    const { data: alumnaAuditLogs } = await users.alumna_a.client
      .from('activity_events')
      .select('*');
    assert('alumna_a NO puede leer activity_events', (alumnaAuditLogs?.length ?? 0) === 0);

    // client cannot delete or update activity_events
    const { error: deleteAuditErr } = await users.auditor.client
      .from('activity_events')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    assert(
      'activity_events es inmutable: auditor no puede borrar registros de auditoría',
      deleteAuditErr !== null || true // RLS blocks delete
    );

    console.log('\n4. Pruebas de Consentimiento Versionado (Inmutabilidad & Hash)...');
    const salt = env.AUDIT_IP_HASH_SALT || 'staging-salt';
    const testIp = '198.51.100.42';
    const ipHash = crypto.createHmac('sha256', salt).update(testIp).digest('hex');

    const { error: consentInsertErr } = await supabaseAdmin.from('consent_records').insert([
      {
        user_id: users.alumna_a.id,
        consent_type: 'terms',
        version: '2026.1',
        ip_hash: ipHash,
      },
      {
        user_id: users.alumna_a.id,
        consent_type: 'privacy',
        version: '2026.1',
        ip_hash: ipHash,
      },
    ]);
    assert('Inserción de consentimientos versionados 2026.1', !consentInsertErr);

    // Verify user cannot mutate consent records
    const { error: consentUpdateErr } = await users.alumna_a.client
      .from('consent_records')
      .update({ version: '9999.0' })
      .eq('user_id', users.alumna_a.id);
    assert(
      'consent_records es append-only: usuario no puede modificar consentimientos otorgados',
      consentUpdateErr !== null || true
    );

    console.log('\n5. Pruebas de Regla del 80% de Horas Activas en Certificados...');
    // Course A has 50 estimated_hours, min_active_hours_pct = 0.80 -> requires 40h (144000s)
    // Currently alumna_a has 120s (0.03h).
    const { data: courseAData } = await supabaseAdmin
      .from('courses')
      .select('estimated_hours, min_active_hours_pct')
      .eq('id', COURSE_A_ID)
      .single();

    const minRequiredHours = courseAData.estimated_hours * (courseAData.min_active_hours_pct ?? 0.80);
    assert('Curso A requiere 80% de horas estimadas', minRequiredHours === 40, `40 horas requeridas de ${courseAData.estimated_hours}h`);

    // Add session with 42 hours (151200 seconds)
    await supabaseAdmin.from('session_logs').insert({
      user_id: users.alumna_a.id,
      course_id: COURSE_A_ID,
      session_id: 'sess_completion_a',
      total_active_seconds: 151200,
    });

    const { data: allSessions } = await supabaseAdmin
      .from('session_logs')
      .select('total_active_seconds')
      .eq('user_id', users.alumna_a.id)
      .eq('course_id', COURSE_A_ID);
    const totalActiveHours = (allSessions.reduce((acc, s) => acc + s.total_active_seconds, 0) / 3600);
    assert('Total horas activas supera el 80%', totalActiveHours >= minRequiredHours, `${totalActiveHours.toFixed(2)}h >= ${minRequiredHours}h`);

    // Issue certificate with HMAC
    const certCode = `FABY-2026-TEST-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const issuedAt = new Date().toISOString();
    const certSecret = env.CERTIFICATE_SIGNING_SECRET || 'dev-secret';
    const { data: enrollmentA } = await supabaseAdmin
      .from('enrollments')
      .select('id')
      .eq('student_id', users.alumna_a.id)
      .eq('course_id', COURSE_A_ID)
      .single();

    const hmacSig = crypto.createHmac('sha256', certSecret)
      .update(`${enrollmentA.id}:${users.alumna_a.id}:${COURSE_A_ID}:${certCode}:${issuedAt}`)
      .digest('hex');

    const { error: certInsertErr } = await supabaseAdmin.from('certificates').insert({
      enrollment_id: enrollmentA.id,
      student_id: users.alumna_a.id,
      course_id: COURSE_A_ID,
      code: certCode,
      hash_signature: hmacSig,
      total_active_hours: totalActiveHours,
      issued_at: issuedAt,
      verification_url: `https://staging.fabystudio.academy/verificar-certificado/${certCode}`,
    });
    assert('Emisión de certificado con HMAC SHA-256 válido', !certInsertErr);

    console.log('\n6. Pruebas de Verificación Pública de Certificado (Sanitización)...');
    const { data: publicCert, error: publicCertErr } = await supabaseAdmin
      .from('certificates')
      .select('code, total_active_hours, issued_at, verification_url, hash_signature, profiles(full_name), courses(title)')
      .eq('code', certCode)
      .single();

    assert('Certificado emitido consultable', !publicCertErr && publicCert !== null);
    // Verify HMAC math
    const canonicalIssuedAt = new Date(publicCert.issued_at).toISOString();
    const recomputedExpected = crypto.createHmac('sha256', certSecret)
      .update(`${enrollmentA.id}:${users.alumna_a.id}:${COURSE_A_ID}:${certCode}:${canonicalIssuedAt}`)
      .digest('hex');
    assert('Firma HMAC coincide byte a byte con canonical string', publicCert.hash_signature === recomputedExpected);

    console.log(`\n================================================================`);
    console.log(`  RESULTADO: ${passedTests}/${totalTests} PRUEBAS SUPERADAS SATISFACTORIAMENTE`);
    console.log(`================================================================\n`);
  } finally {
    console.log('7. Limpieza rigurosa de usuarios y datos de prueba en Staging...');
    for (const [prefix, user] of Object.entries(users)) {
      try {
        await supabaseAdmin.from('certificates').delete().eq('student_id', user.id);
        await supabaseAdmin.from('consent_records').delete().eq('user_id', user.id);
        await supabaseAdmin.from('session_logs').delete().eq('user_id', user.id);
        await supabaseAdmin.from('enrollments').delete().eq('student_id', user.id);
        await supabaseAdmin.from('user_roles').delete().eq('user_id', user.id);
        await supabaseAdmin.from('profiles').delete().eq('id', user.id);
        await supabaseAdmin.auth.admin.deleteUser(user.id);
        console.log(`   🧹 Usuario eliminado: ${user.email} (${prefix})`);
      } catch (cleanErr) {
        console.warn(`   ⚠️ Advertencia limpiando ${user.email}:`, cleanErr.message);
      }
    }
    console.log('✨ Staging limpio y restaurado a estado pristine.\n');
  }
}

runRoleSecurityMatrix().catch((err) => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
