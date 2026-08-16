import https from 'https';
import fs from 'fs';

const projectRef = process.env.SUPABASE_PROJECT_REF || (process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname.split('.')[0] : "");
const token = process.env.SUPABASE_ACCESS_TOKEN || "";

function executeSQL(sql) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query: sql });
    const req = https.request({
      hostname: "api.supabase.com",
      path: `/v1/projects/${projectRef}/database/query`,
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data)
      }
    }, (res) => {
      let body = "";
      res.on("data", (chunk) => body += chunk);
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            resolve(body);
          }
        } else {
          reject(new Error(`Status ${res.statusCode}: ${body}`));
        }
      });
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function inspectDB() {
  console.log("=================================================");
  console.log("  POSTGRESQL 17 STAGING LIVE DATABASE AUDIT");
  console.log("=================================================");

  // 1. Tables
  const tables = await executeSQL(`
    SELECT tablename, rowsecurity
    FROM pg_tables
    WHERE schemaname = 'public'
    ORDER BY tablename;
  `);
  console.log(`\n📊 1. TABLAS EN ESQUEMA PUBLIC (Total: ${tables.length}):`);
  tables.forEach((t, i) => {
    console.log(`   ${i + 1}. public.${t.tablename.padEnd(28)} | RLS Enabled: ${t.rowsecurity ? '✅ SI' : '❌ NO'}`);
  });

  const nonRLS = tables.filter(t => !t.rowsecurity);
  console.log(`\n🚨 Tablas sin RLS: ${nonRLS.length} ${nonRLS.map(t => t.tablename).join(', ')}`);

  // 2. Migrations
  const migrations = await executeSQL(`
    SELECT *
    FROM supabase_migrations.schema_migrations
    ORDER BY version;
  `);
  console.log(`\n📜 2. MIGRACIONES APLICADAS EN POSTGRESQL (Total: ${migrations.length}):`);
  migrations.forEach(m => {
    console.log(`   - Versión: ${m.version} | Nombre: ${m.name || 'OK'}`);
  });

  // 3. RLS Policies
  const policies = await executeSQL(`
    SELECT tablename, policyname, permissive, roles, cmd
    FROM pg_policies
    WHERE schemaname = 'public'
    ORDER BY tablename, policyname;
  `);
  console.log(`\n🔒 3. POLÍTICAS RLS EN ESQUEMA PUBLIC (Total real: ${policies.length}):`);
  const polByTable = {};
  policies.forEach(p => {
    polByTable[p.tablename] = (polByTable[p.tablename] || 0) + 1;
  });
  Object.entries(polByTable).sort(([a], [b]) => a.localeCompare(b)).forEach(([tbl, count]) => {
    console.log(`   • ${tbl.padEnd(28)} : ${count} políticas`);
  });

  // 4. Custom App Functions (filtering out pgvector internals)
  const functions = await executeSQL(`
    SELECT p.proname, p.prosecdef, array_to_string(p.proconfig, ', ') as config
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' 
      AND p.proname NOT LIKE 'vector%'
      AND p.proname NOT LIKE 'halfvec%'
      AND p.proname NOT LIKE 'sparsevec%'
      AND p.proname NOT LIKE 'hnsw%'
      AND p.proname NOT LIKE 'ivfflat%'
      AND p.proname NOT LIKE 'l2_%'
      AND p.proname NOT LIKE 'cosine_%'
      AND p.proname NOT LIKE 'inner_%'
    ORDER BY p.proname;
  `);
  console.log(`\n⚙️ 4. FUNCIONES DE APLICACIÓN (Total: ${functions.length}):`);
  functions.forEach(f => {
    console.log(`   - ${f.proname.padEnd(28)} | SecDefiner: ${f.prosecdef ? '🔒 SI' : '⚪ NO'} | Config: [${f.config || 'NONE'}]`);
  });

  // 5. Storage Buckets & Policies
  const buckets = await executeSQL(`
    SELECT id, name, public, file_size_limit
    FROM storage.buckets;
  `);
  console.log(`\n📦 5. STORAGE BUCKETS (Total: ${buckets.length}):`);
  buckets.forEach(b => {
    console.log(`   - ${b.id.padEnd(20)} | Public: ${b.public ? '⚠️ SI' : '🔒 NO (Privado)'} | Max Size: ${b.file_size_limit}`);
  });

  const storagePolicies = await executeSQL(`
    SELECT policyname, cmd, roles
    FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects';
  `);
  console.log(`\n📦 6. POLÍTICAS RLS EN STORAGE.OBJECTS (Total: ${storagePolicies.length}):`);
  storagePolicies.forEach(p => {
    console.log(`   - [${p.cmd}] ${p.policyname} (${p.roles})`);
  });
}

inspectDB().catch(console.error);
