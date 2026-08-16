import fs from 'fs';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Parse .env.local safely
const envLines = fs.readFileSync('.env.local', 'utf-8').split('\n');
const env = {};
for (const line of envLines) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match) env[match[1]] = match[2].trim();
}

const supabaseAdmin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

const COURSE_A_ID = 'c1000000-0000-0000-0000-000000000001';
const COURSE_B_ID = 'c2000000-0000-0000-0000-000000000002';
const LESSON_A1_ID = 'b1000000-0000-4000-8000-000000000001';
const ASSESSMENT_A_ID = 'd1000000-0000-4000-8000-000000000001';

const testUsersConfig = [
  { role: 'alumna', emailPrefix: 'alumna_a', fullName: 'Alumna A (Matriculada)' },
  { role: 'alumna', emailPrefix: 'alumna_b', fullName: 'Alumna B (Sin Matrícula en A)' },
  { role: 'profesor', emailPrefix: 'profesora', fullName: 'Profesora Titular' },
  { role: 'admin_academico', emailPrefix: 'admin_acad', fullName: 'Administradora Académica' },
  { role: 'auditor', emailPrefix: 'auditor', fullName: 'Auditor Oficial' },
  { role: 'superadmin', emailPrefix: 'superadmin', fullName: 'Super Administradora' }
];

async function setupTestUser(cfg) {
  const email = `${cfg.emailPrefix}_${Date.now()}@staging.faby.internal`;
  const password = `StagingPass_${crypto.randomBytes(16).toString('hex')}!Aa1`;

  // Create auth user
  const { data: userData, error: userErr } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: cfg.fullName }
  });

  if (userErr) {
    throw new Error(`Failed to create test user ${email}: ${userErr.message}`);
  }

  const userId = userData.user.id;

  // Insert profile and role explicitly
  await supabaseAdmin.from('profiles').upsert({
    id: userId,
    full_name: cfg.fullName,
    email: email
  });

  if (cfg.role !== 'alumna') {
    await supabaseAdmin.from('user_roles').insert({
      user_id: userId,
      role: cfg.role
    });
  }

  // Create an isolated client for this user and log in
  const userClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const { data: sessionData, error: sessionErr } = await userClient.auth.signInWithPassword({
    email,
    password
  });

  if (sessionErr) {
    throw new Error(`Failed to sign in as ${email}: ${sessionErr.message}`);
  }

  return {
    ...cfg,
    id: userId,
    email,
    client: userClient,
    jwt: sessionData.session.access_token
  };
}

async function runRoleSecurityMatrix() {
  console.log('================================================================');
  console.log('  FASE 5: MATRIZ DE PRUEBAS DE SEGURIDAD REALES POR ROL (STAGING)');
  console.log('================================================================\n');

  console.log('1. Creando usuarios de prueba desechables en Supabase Auth...');
  const users = {};
  for (const cfg of testUsersConfig) {
    const user = await setupTestUser(cfg);
    users[cfg.emailPrefix] = user;
    console.log(`   ✅ Creado usuario ${cfg.emailPrefix} (ID: ${user.id}, Rol: ${cfg.role})`);
  }

  const anonClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  // 2. Setup relations
  console.log('\n2. Aprovisionando matrículas y asignaciones de staff...');
  // Matricular Alumna A en Curso A
  const { data: enrollA } = await supabaseAdmin.from('enrollments').insert({
    student_id: users.alumna_a.id,
    course_id: COURSE_A_ID,
    status: 'active'
  }).select('id').single();

  // Asignar Profesora al Curso A
  await supabaseAdmin.from('course_staff').insert({
    user_id: users.profesora.id,
    course_id: COURSE_A_ID,
    staff_role: 'profesor',
    is_active: true
  });

  console.log('   ✅ Alumna A matriculada en Curso A (ID:', enrollA?.id, ')');
  console.log('   ✅ Profesora asignada a Curso A en course_staff');

  const results = [];

  function record(testName, expected, actual, pass, detail = '') {
    results.push({ testName, expected, actual, pass, detail });
    const mark = pass ? '🟢 PASS' : '🔴 FAIL';
    console.log(`\n${mark} | ${testName}`);
    console.log(`       Esperado: ${expected}`);
    console.log(`       Obtenido: ${actual} ${detail ? `(${detail})` : ''}`);
  }

  console.log('\n--- 3. EJECUTANDO PRUEBAS DE LA MATRIZ DE SEGURIDAD ---');

  // TEST 1: Anon read public courses
  const { data: anonCourses } = await anonClient.from('courses').select('id, slug, is_published');
  record(
    'Anónimo: Lectura de catálogo de cursos publicados',
    '3 cursos visibles',
    `${anonCourses?.length} cursos`,
    anonCourses?.length === 3
  );

  // TEST 2: Anon direct insert on activity_events (Rechazo)
  const { error: anonActErr } = await anonClient.from('activity_events').insert({
    user_id: users.alumna_a.id,
    session_id: 'hack_session',
    event_type: 'hack',
    ip_hash: 'fake_hash'
  });
  record(
    'Anónimo: Intento de mutación en activity_events',
    'Rechazo por RLS / REVOKE',
    anonActErr ? 'Rechazado' : 'Permitido (Vulnerabilidad)',
    !!anonActErr,
    anonActErr?.message
  );

  // TEST 3: Anon direct select on questions table (Rechazo total)
  const { data: anonQ, error: anonQErr } = await anonClient.from('questions').select('id, question_text');
  record(
    'Anónimo: Intento de lectura en tabla questions',
    '0 filas accesibles / error',
    anonQ?.length === 0 || !!anonQErr ? 'Bloqueado (0 filas)' : `${anonQ?.length} filas expuestas`,
    anonQ?.length === 0 || !!anonQErr
  );

  // TEST 4: Alumna A reads own enrollment and course
  const { data: aEnroll } = await users.alumna_a.client.from('enrollments').select('id, course_id');
  record(
    'Alumna A: Lectura de su propia matrícula',
    '1 matrícula visible (Curso A)',
    `${aEnroll?.length} matrículas (${aEnroll?.[0]?.course_id === COURSE_A_ID ? 'Curso A' : 'Otro'})`,
    aEnroll?.length === 1 && aEnroll?.[0]?.course_id === COURSE_A_ID
  );

  // TEST 5: Alumna A reads questions of Course A (Permitted columns only)
  const { data: aQuestions, error: aQErr } = await users.alumna_a.client
    .from('questions')
    .select('id, question_text, question_type, options_json, points')
    .eq('assessment_id', ASSESSMENT_A_ID);
  record(
    'Alumna A: Lectura de preguntas en examen (columnas autorizadas)',
    '3 preguntas legibles',
    `${aQuestions?.length || 0} preguntas`,
    (aQuestions?.length || 0) === 3,
    aQErr?.message
  );

  // TEST 6: Alumna A attempts to read correct_answer_json column (Blocked by REVOKE)
  const { data: aAnswers, error: aAnsErr } = await users.alumna_a.client
    .from('questions')
    .select('id, correct_answer_json')
    .eq('assessment_id', ASSESSMENT_A_ID);
  record(
    'Alumna A: Intento de lectura de columna correct_answer_json (Clave de respuestas)',
    'Rechazo por REVOKE column privilege',
    aAnsErr ? 'Rechazado (Bloqueado por Postgres)' : 'Expuesto (Fallo)',
    !!aAnsErr,
    aAnsErr?.message
  );

  // TEST 7: Alumna A attempts to read Alumna B profile
  const { data: bProfile } = await users.alumna_a.client
    .from('profiles')
    .select('id, email')
    .eq('id', users.alumna_b.id);
  record(
    'Alumna A: Intento de lectura de perfil de Alumna B',
    '0 registros visibles (Aislamiento de perfil)',
    `${bProfile?.length || 0} registros`,
    (bProfile?.length || 0) === 0
  );

  // TEST 8: Alumna B attempts to read Course A questions (No enrollment)
  const { data: bQuestions } = await users.alumna_b.client
    .from('questions')
    .select('id, question_text')
    .eq('assessment_id', ASSESSMENT_A_ID);
  record(
    'Alumna B: Intento de lectura de examen de Curso A (sin matrícula)',
    '0 preguntas visibles (can_access_course = false)',
    `${bQuestions?.length || 0} preguntas`,
    (bQuestions?.length || 0) === 0
  );

  // TEST 9: Alumna A submits assessment via secure RPC
  const { data: rpcAttempt, error: rpcErr } = await users.alumna_a.client.rpc('submit_assessment_attempt', {
    p_assessment_id: ASSESSMENT_A_ID,
    p_answers: {
      'e1000000-0000-4000-8000-000000000001': 'Higiene de manos',
      'e1000000-0000-4000-8000-000000000002': 'Suspender el servicio y derivar',
      'e1000000-0000-4000-8000-000000000003': 'No'
    }
  });
  record(
    'Alumna A: Ejecución de RPC submit_assessment_attempt con respuestas válidas',
    'Evaluación calificada en BD: score = 100, passed = true',
    rpcAttempt ? `Score: ${rpcAttempt[0]?.score}, Passed: ${rpcAttempt[0]?.passed}` : 'Error',
    rpcAttempt?.[0]?.score === 100 && rpcAttempt?.[0]?.passed === true,
    rpcErr?.message
  );

  // TEST 10: Alumna A attempts direct INSERT into assessment_attempts (Bypass attempt)
  const { error: aDirectAttemptErr } = await users.alumna_a.client.from('assessment_attempts').insert({
    student_id: users.alumna_a.id,
    assessment_id: ASSESSMENT_A_ID,
    score: 100,
    passed: true
  });
  record(
    'Alumna A: Intento de mutación directa en assessment_attempts (Bypass de examen)',
    'Rechazado por REVOKE / RLS',
    aDirectAttemptErr ? 'Rechazado' : 'Permitido (Vulnerabilidad)',
    !!aDirectAttemptErr,
    aDirectAttemptErr?.message
  );

  // TEST 11: Alumna A attempts privilege escalation (Granting self superadmin role)
  const { error: aRoleEscalateErr } = await users.alumna_a.client.from('user_roles').insert({
    user_id: users.alumna_a.id,
    role: 'superadmin'
  });
  record(
    'Alumna A: Intento de auto-asignación de rol superadmin',
    'Rechazado por RLS / REVOKE',
    aRoleEscalateErr ? 'Rechazado' : 'Permitido (Vulnerabilidad)',
    !!aRoleEscalateErr,
    aRoleEscalateErr?.message
  );

  // TEST 12: Profesora reads students in her assigned course (Course A only)
  const { data: profStudents, error: profStudentsErr } = await users.profesora.client
    .from('enrollments')
    .select('id, student_id, course_id')
    .eq('course_id', COURSE_A_ID);
  const allInCourseA = profStudents?.every(e => e.course_id === COURSE_A_ID);
  const includesAlumnaA = profStudents?.some(e => e.student_id === users.alumna_a.id);
  const excludesAlumnaB = profStudents?.every(e => e.student_id !== users.alumna_b.id);
  record(
    'Profesora: Lectura de matrículas en su curso asignado (Curso A)',
    'Matrículas de Curso A visibles (incluye Alumna A, excluye Alumna B)',
    `Total: ${profStudents?.length || 0}, Solo Curso A: ${allInCourseA ? 'SI' : 'NO'}, Incluye A: ${includesAlumnaA ? 'SI' : 'NO'}, Excluye B: ${excludesAlumnaB ? 'SI' : 'NO'}`,
    (profStudents?.length || 0) >= 1 && allInCourseA && includesAlumnaA && excludesAlumnaB,
    profStudentsErr?.message
  );

  // TEST 13: Profesora attempts to grant roles (Admin operation)
  const { error: profRoleErr } = await users.profesora.client.from('user_roles').insert({
    user_id: users.profesora.id,
    role: 'admin_academico'
  });
  record(
    'Profesora: Intento de auto-escalada de privilegios a admin_academico',
    'Rechazado por RLS',
    profRoleErr ? 'Rechazado' : 'Permitido (Vulnerabilidad)',
    !!profRoleErr,
    profRoleErr?.message
  );

  // TEST 14: Auditor reads activity_events
  const { data: auditEvents, error: audErr } = await users.auditor.client
    .from('activity_events')
    .select('id, event_type, occurred_at');
  record(
    'Auditor: Lectura autorizada de stream de auditoría',
    'Lectura exitosa sin errores',
    auditEvents ? `Consulta exitosa (${auditEvents.length} eventos)` : 'Error',
    !audErr,
    audErr?.message
  );

  // TEST 15: Auditor attempts to insert a course (Academic mutation forbidden)
  const { error: audCourseErr } = await users.auditor.client.from('courses').insert({
    slug: 'curso-falso-auditor',
    title: 'Curso Falso',
    category: 'Test'
  });
  record(
    'Auditor: Intento de creación de cursos (Mutación académica)',
    'Rechazado por RLS',
    audCourseErr ? 'Rechazado' : 'Permitido (Vulnerabilidad)',
    !!audCourseErr,
    audCourseErr?.message
  );

  // TEST 16: Public / Anon direct RPC verify_certificate execution (Protected by REVOKE)
  const { error: anonRpcErr } = await anonClient.rpc('verify_certificate', {
    p_code: 'NON_EXISTENT_CODE'
  });
  record(
    'Público / Anon: Intento de ejecución directa de RPC verify_certificate',
    'Rechazado por REVOKE (Solo ejecutable por service_role en endpoint server-side)',
    anonRpcErr ? 'Rechazado (Protegido)' : 'Permitido',
    !!anonRpcErr,
    anonRpcErr?.message
  );

  // TEST 17: Service Role execution of verify_certificate (Server authorized)
  const { data: adminRpcData, error: adminRpcErr } = await supabaseAdmin.rpc('verify_certificate', {
    p_code: 'NON_EXISTENT_CODE'
  });
  record(
    'Servidor / Admin: Ejecución autorizada de verify_certificate vía service_role',
    'Ejecución autorizada exitosa (0 registros para código inexistente)',
    adminRpcData ? `Ejecución autorizada (${adminRpcData.length} registros)` : 'Error',
    !adminRpcErr && Array.isArray(adminRpcData),
    adminRpcErr?.message
  );

  console.log('\n================================================================');
  const allPassed = results.every(r => r.pass);
  console.log(`RESUMEN FINAL DE LA MATRIZ: ${results.filter(r => r.pass).length}/${results.length} PRUEBAS PASADAS`);
  console.log(allPassed ? '🏆 TODAS LAS PRUEBAS DE SEGURIDAD RLS/RBAC APROBADAS' : '⚠️ DETECTADOS FALLOS DE SEGURIDAD');
  console.log('================================================================\n');

  // Guardar credenciales de prueba en archivo local ignorado para Playwright
  const testAccountsPath = '.auth-test-accounts.local.json';
  const credentialsForE2E = {};
  for (const [key, val] of Object.entries(users)) {
    credentialsForE2E[key] = {
      id: val.id,
      email: val.email,
      role: val.role
    };
  }
  fs.writeFileSync(testAccountsPath, JSON.stringify(credentialsForE2E, null, 2));
  console.log(`Cuentas de prueba registradas en ${testAccountsPath} (ignorado por git).`);
}

runRoleSecurityMatrix().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
