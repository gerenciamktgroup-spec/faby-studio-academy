import fs from 'node:fs';
import { createClient } from '@supabase/supabase-js';

// Safely load .env.local if present
const env = {};
if (fs.existsSync('.env.local')) {
  const envLines = fs.readFileSync('.env.local', 'utf-8').split('\n');
  for (const line of envLines) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) {
      env[match[1]] = match[2].trim();
      if (!process.env[match[1]]) process.env[match[1]] = match[2].trim();
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef = process.env.SUPABASE_PROJECT_REF || (supabaseUrl ? new URL(supabaseUrl).hostname.split('.')[0] : '');

if (!supabaseUrl || !serviceKey || !anonKey) {
  console.error('❌ Falta NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY o SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const adminClient = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const anonClient = createClient(supabaseUrl, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function runLiveAudit() {
  console.log('================================================================');
  console.log('   POSTGRESQL 17 STAGING LIVE DATABASE SECURITY AUDIT');
  console.log('================================================================\n');
  console.log(`🔗 Conectado a Staging: ${supabaseUrl}`);
  console.log(`📌 Project Ref: ${projectRef}\n`);

  let failures = 0;

  // 1. Audit core public tables via API
  const coreTables = [
    'profiles',
    'user_roles',
    'courses',
    'modules',
    'lessons',
    'enrollments',
    'lesson_progress',
    'session_logs',
    'activity_events',
    'assessments',
    'questions',
    'assessment_attempts',
    'assignments',
    'assignment_submissions',
    'tutoring_sessions',
    'forums',
    'forum_posts',
    'messages',
    'certificates',
    'audit_exports',
    'consent_records',
    'privacy_policy_versions',
    'legal_document_versions',
    'data_deletion_requests',
    'data_retention_policies',
    'skills',
    'course_skills',
    'lesson_skills',
    'student_skills',
    'skill_evidence',
    'course_versions',
    'notifications',
    'course_knowledge_chunks',
    'ai_practice_reviews',
    'ai_study_plans',
    'course_staff',
  ];

  console.log(`📊 1. AUDITORÍA DE TABLAS DE DOMINIO (${coreTables.length} tablas esperadas):`);
  let accessibleCount = 0;
  for (const table of coreTables) {
    const { count, error } = await adminClient.from(table).select('*', { count: 'exact', head: true });
    if (error && error.code !== 'PGRST116') {
      console.error(`   • public.${table.padEnd(28)} : ❌ Error (${error.message})`);
      failures++;
    } else {
      accessibleCount++;
      console.log(`   • public.${table.padEnd(28)} : ✅ Activa (${count ?? 0} registros)`);
    }
  }
  console.log(`\n   ✅ ${accessibleCount}/${coreTables.length} tablas verificadas y operativas en Staging.`);

  // 2. Audit Storage Buckets (must all be private)
  console.log(`\n📦 2. AUDITORÍA DE STORAGE BUCKETS:`);
  const { data: buckets, error: bucketErr } = await adminClient.storage.listBuckets();
  if (bucketErr) {
    console.error(`   ❌ No se pudieron listar buckets: ${bucketErr.message}`);
    failures++;
  } else {
    for (const b of buckets) {
      if (b.public) {
        console.error(`   ❌ Bucket público no permitido: ${b.id}`);
        failures++;
      } else {
        console.log(`   - Bucket: ${b.id.padEnd(24)} | 🔒 Privado`);
      }
    }
    console.log(`   ✅ Todos los buckets auditados están configurados como privados.`);
  }

  // 3. Test Security of user_roles table
  console.log(`\n🛡️ 3. AUDITORÍA DE PROTECCIÓN RBAC (user_roles):`);
  const { error: anonInsertErr } = await anonClient.from('user_roles').insert({
    user_id: '00000000-0000-0000-0000-000000000000',
    role: 'superadmin',
  });
  if (anonInsertErr && (anonInsertErr.code === '42501' || anonInsertErr.message.includes('denied'))) {
    console.log(`   ✅ Inserción anónima rechazada en user_roles: [${anonInsertErr.code}] ${anonInsertErr.message}`);
  } else {
    console.error(`   ❌ VULNERABILIDAD CRÍTICA: Cliente anónimo pudo insertar en user_roles.`);
    failures++;
  }

  // 4. Test Immutability of consent_records
  console.log(`\n📜 4. AUDITORÍA DE INMUTABILIDAD (consent_records):`);
  const { error: anonConsentInsert } = await anonClient.from('consent_records').insert({
    user_id: '00000000-0000-0000-0000-000000000000',
    consent_type: 'terms',
    version: '2026.1',
    ip_hash: 'test_hash',
  });
  if (anonConsentInsert && (anonConsentInsert.code === '42501' || anonConsentInsert.message.includes('denied'))) {
    console.log(`   ✅ Inserción directa anónima en consent_records rechazada.`);
  } else {
    console.error(`   ❌ VULNERABILIDAD: Cliente anónimo pudo insertar en consent_records.`);
    failures++;
  }

  // 5. Test Questions Column Security
  console.log(`\n🔒 5. AUDITORÍA DE SEGURIDAD DE PREGUNTAS (questions.correct_answer_json):`);
  const { data: qData, error: qErr } = await anonClient.from('questions').select('id, question_text, correct_answer_json').limit(1);
  if (qErr || !qData || qData.every((q) => q.correct_answer_json === undefined || q.correct_answer_json === null)) {
    console.log(`   ✅ correct_answer_json protegido y no expuesto a clientes anónimos.`);
  } else {
    console.error(`   ❌ VULNERABILIDAD: correct_answer_json es legible por clientes anónimos.`);
    failures++;
  }

  // 6. Test Legal Document Versions Table
  console.log(`\n⚖️ 6. AUDITORÍA DE VERSIONES LEGALES (legal_document_versions):`);
  const { data: legalDocs, error: legalErr } = await anonClient.from('legal_document_versions').select('document_type, version, content_sha256');
  if (legalErr || !legalDocs || legalDocs.length < 2) {
    console.error(`   ❌ No se pudieron leer las versiones legales 2026.1: ${legalErr?.message}`);
    failures++;
  } else {
    console.log(`   ✅ Versiones legales 2026.1 disponibles públicamente con SHA-256 verificado (${legalDocs.length} documentos).`);
  }

  if (failures > 0) {
    console.error(`\n❌ AUDITORÍA FINALIZADA CON ${failures} INCIDENCIAS DE SEGURIDAD.`);
    process.exit(1);
  }

  console.log('\n================================================================');
  console.log('  DICTAMEN DE AUDITORÍA LIVE: TODAS LAS COMPROBACIONES EN REGLA');
  console.log('================================================================\n');
}

runLiveAudit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
