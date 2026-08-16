import fs from 'node:fs';
import { createHash } from 'node:crypto';
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

function requireEnvironment(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Falta la variable obligatoria ${name}.`);
  return value;
}

function assertCheck(condition, message, details = '') {
  if (!condition) throw new Error(`${message}${details ? ` — ${details}` : ''}`);
  console.log(`✅ ${message}`);
}

function hasForbiddenWrite(grants, tableName) {
  return grants.some((grant) =>
    grant.table_schema === 'public'
    && grant.table_name === tableName
    && ['PUBLIC', 'anon', 'authenticated'].includes(grant.grantee)
    && ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE'].includes(grant.privilege_type)
  );
}

async function getSecurityAdvisor(projectRef, accessToken) {
  const response = await fetch(
    `https://api.supabase.com/v1/projects/${encodeURIComponent(projectRef)}/advisors/security`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (!response.ok) {
    throw new Error(`Security Advisor respondió ${response.status}: ${await response.text()}`);
  }
  const payload = await response.json();
  return Array.isArray(payload) ? payload : payload.lints ?? payload.result ?? [];
}

async function runLiveAudit() {
  loadLocalEnvironment();

  const supabaseUrl = requireEnvironment('NEXT_PUBLIC_SUPABASE_URL');
  const anonKey = requireEnvironment('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  const serviceKey = requireEnvironment('SUPABASE_SERVICE_ROLE_KEY');
  const projectRef = requireEnvironment('SUPABASE_PROJECT_REF');
  const accessToken = requireEnvironment('SUPABASE_ACCESS_TOKEN');

  const expectedHost = `${projectRef}.supabase.co`;
  assertCheck(new URL(supabaseUrl).hostname === expectedHost, 'La URL corresponde al project ref esperado');

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const anonymous = createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log(`\nAuditoría live: ${expectedHost}`);
  const { data: catalog, error: catalogError } = await admin.rpc('security_catalog_audit');
  if (catalogError) throw catalogError;
  assertCheck(Boolean(catalog), 'La RPC de auditoría devolvió el catálogo PostgreSQL');

  const expectedMigrations = [
    '20260808000000',
    '20260816000000',
    '20260817000000',
    '20260818000000',
    '20260818010000',
    '20260818020000',
    '20260818030000',
    '20260818040000',
  ];
  const migrations = catalog.migrations ?? [];
  const missingMigrations = expectedMigrations.filter((version) => !migrations.includes(version));
  assertCheck(missingMigrations.length === 0, 'Las ocho migraciones están sincronizadas', missingMigrations.join(', '));

  const tables = catalog.public_tables ?? [];
  const withoutRls = tables.filter((table) => !table.rls).map((table) => table.table);
  assertCheck(tables.length > 0 && withoutRls.length === 0, 'Todas las tablas public tienen RLS habilitado', withoutRls.join(', '));

  const policies = catalog.policies ?? [];
  const malformedPolicies = policies.filter((policy) => {
    if (policy.command === 'INSERT') return !policy.check;
    if (policy.command === 'SELECT' || policy.command === 'DELETE') return !policy.qual;
    return false;
  });
  assertCheck(malformedPolicies.length === 0, 'Las políticas RLS tienen predicados para su operación');

  const grants = catalog.table_grants ?? [];
  assertCheck(!hasForbiddenWrite(grants, 'user_roles'), 'anon/authenticated/PUBLIC no escriben directamente en user_roles');
  assertCheck(!hasForbiddenWrite(grants, 'consent_records'), 'anon/authenticated/PUBLIC no escriben directamente en consent_records');
  assertCheck(!hasForbiddenWrite(grants, 'legal_document_versions'), 'anon/authenticated/PUBLIC no modifican versiones legales');

  const sensitiveColumnGrant = (catalog.column_grants ?? []).find((grant) =>
    grant.table_name === 'questions'
    && grant.column_name === 'correct_answer_json'
    && ['PUBLIC', 'anon', 'authenticated'].includes(grant.grantee)
    && grant.privilege_type === 'SELECT'
  );
  assertCheck(!sensitiveColumnGrant, 'correct_answer_json no tiene grants de lectura para clientes');

  const sensitiveFunctions = new Set([
    'record_user_legal_consents',
    'consume_registration_rate_limit',
    'manage_user_role_tx',
    'issue_certificate_tx',
    'security_catalog_audit',
  ]);
  const functionRows = catalog.functions ?? [];
  for (const functionName of sensitiveFunctions) {
    const matches = functionRows.filter((row) => row.name === functionName);
    assertCheck(matches.length === 1, `Existe una única firma activa de ${functionName}`);
    const [row] = matches;
    assertCheck(row.security_definer === true, `${functionName} es SECURITY DEFINER`);
    assertCheck(
      Array.isArray(row.config) && row.config.some((item) => item.startsWith('search_path=')),
      `${functionName} fija search_path`
    );
  }

  const publicSensitiveExecute = (catalog.function_grants ?? []).filter((grant) =>
    sensitiveFunctions.has(grant.routine_name)
    && ['PUBLIC', 'anon', 'authenticated'].includes(grant.grantee)
    && grant.privilege_type === 'EXECUTE'
  );
  assertCheck(publicSensitiveExecute.length === 0, 'Las RPC sensibles no son ejecutables por clientes');
  assertCheck(!functionRows.some((row) => row.name === 'clean_test_fixture_tx'), 'La RPC que deshabilitaba triggers fue eliminada');

  const disabledTriggers = (catalog.triggers ?? []).filter((trigger) => trigger.enabled === 'D');
  assertCheck(disabledTriggers.length === 0, 'No existen triggers de seguridad deshabilitados');
  assertCheck(catalog.legal_hash_mismatches === 0, 'Todos los hashes legales coinciden matemáticamente con content_text');

  const buckets = catalog.buckets ?? [];
  assertCheck(buckets.length > 0 && buckets.every((bucket) => bucket.public === false), 'Todos los buckets de Storage son privados');
  const storagePolicies = policies.filter((policy) => policy.schema === 'storage' && policy.table === 'objects');
  assertCheck(storagePolicies.length > 0, 'storage.objects tiene políticas explícitas');

  const { error: roleInsertError } = await anonymous.from('user_roles').insert({
    user_id: '00000000-0000-0000-0000-000000000000',
    role: 'superadmin',
  });
  assertCheck(Boolean(roleInsertError), 'La escritura anónima real sobre user_roles fue rechazada');

  const { error: consentInsertError } = await anonymous.from('consent_records').insert({
    user_id: '00000000-0000-0000-0000-000000000000',
    consent_type: 'terms',
    version: '2026.2',
    legal_version_id: '00000000-0000-0000-0000-000000000000',
    ip_hash: '0'.repeat(64),
  });
  assertCheck(Boolean(consentInsertError), 'La escritura anónima real sobre consent_records fue rechazada');

  const { data: legalDocuments, error: legalError } = await anonymous
    .from('legal_document_versions')
    .select('document_type, version, content_text, content_sha256')
    .eq('version', '2026.2');
  if (legalError) throw legalError;
  assertCheck(legalDocuments?.length === 2, 'La versión legal 2026.2 está publicada para lectura');
  for (const document of legalDocuments) {
    const expectedHash = createHash('sha256').update(document.content_text, 'utf8').digest('hex');
    assertCheck(expectedHash === document.content_sha256, `SHA-256 verificado para ${document.document_type}`);
  }

  const advisor = await getSecurityAdvisor(projectRef, accessToken);
  const advisorErrors = advisor.filter((item) => String(item.level ?? item.severity).toUpperCase() === 'ERROR');
  assertCheck(advisorErrors.length === 0, 'Security Advisor no informa errores', JSON.stringify(advisorErrors));

  console.log(`\nRESULTADO: auditoría live aprobada (${tables.length} tablas, ${policies.length} políticas, ${buckets.length} buckets).`);
}

runLiveAudit().catch((error) => {
  console.error('\n❌ AUDITORÍA LIVE FALLIDA');
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
