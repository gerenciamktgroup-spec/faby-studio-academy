/**
 * FABY STUDIO ACADEMY — Database Migration & Verification Runner
 * Audita localmente los archivos de esquema PostgreSQL 15+ y seed.
 * No aplica migraciones ni sustituye `supabase db lint` contra un proyecto real.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const migrationsDir = path.join(rootDir, 'supabase', 'migrations');
const seedPath = path.join(rootDir, 'supabase', 'seed', 'seed.sql');
const demoSeedPath = path.join(rootDir, 'supabase', 'seed', 'demo_seed.sql');

console.log('--------------------------------------------------');
console.log('🗄️  FABY STUDIO ACADEMY — AUDITORÍA Y SETUP DE BD');
console.log('--------------------------------------------------');

// 1. Verificar existencia y peso de archivos SQL
function auditSQLFile(filePath, label) {
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').length;
    console.log(`✅ ${label}:`);
    console.log(`   - Ruta: ${filePath}`);
    console.log(`   - Tamaño: ${(stats.size / 1024).toFixed(2)} KB (${lines} líneas)`);
    return content;
  } else {
    console.error(`❌ ${label} NO ENCONTRADO en: ${filePath}`);
    return null;
  }
}

let combinedSchemaSQL = '';
if (fs.existsSync(migrationsDir)) {
  const migrationFiles = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();
  console.log(`\n📂 Migraciones detectadas en /supabase/migrations (${migrationFiles.length} archivos):`);
  migrationFiles.forEach((file) => {
    const filePath = path.join(migrationsDir, file);
    const sql = auditSQLFile(filePath, `Migración: ${file}`);
    if (sql) combinedSchemaSQL += '\n' + sql;
  });
}

const seedSQL = auditSQLFile(seedPath, 'Datos Oficiales Seed (seed.sql)');
auditSQLFile(demoSeedPath, 'Seed demo deshabilitado (demo_seed.sql)');

// 2. Extraer catálogo de tablas creadas en el esquema
if (combinedSchemaSQL) {
  const tables = new Set();
  const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?public\.([a-zA-Z0-9_]+)/gi;
  let match;
  while ((match = tableRegex.exec(combinedSchemaSQL)) !== null) {
    tables.add(match[1]);
  }

  const rlsPolicies = [];
  const rlsRegex = /CREATE\s+POLICY\s+(?:"([^"]+)"|([a-zA-Z0-9_]+))\s+ON\s+public\.([a-zA-Z0-9_]+)/gi;
  while ((match = rlsRegex.exec(combinedSchemaSQL)) !== null) {
    rlsPolicies.push({ policy: match[1] ?? match[2], table: match[3] });
  }

  const tablesArray = Array.from(tables);
  console.log('\n📊 Resumen de Estructura Detectada:');
  console.log(`   • Tablas PostgreSQL definidas: ${tablesArray.length} tablas`);
  tablesArray.forEach((t, i) => console.log(`     ${i + 1}. public.${t}`));

  console.log(`\n🔒 Políticas de Seguridad RLS (Row Level Security): ${rlsPolicies.length} políticas`);
  rlsPolicies.slice(0, 8).forEach((p) => console.log(`     - [${p.table}] "${p.policy}"`));
  if (rlsPolicies.length > 8) console.log(`     ... y ${rlsPolicies.length - 8} políticas adicionales.`);
}

console.log('\n--------------------------------------------------');
console.log('⚡ ESTADO DE CONEXIÓN CON SUPABASE CLOUD:');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (supabaseUrl && !supabaseUrl.includes('demo.supabase.co')) {
  console.log(`🟢 URL Configurada: ${supabaseUrl}`);
  console.log(`🟢 Clave Anon: Configurada (${supabaseAnonKey ? supabaseAnonKey.slice(0, 10) + '...' : 'Faltante'})`);
  console.log(`🟢 Service Role: ${serviceRoleKey ? 'Configurado' : 'Pendiente'}`);
} else {
  console.log('🔴 Supabase no está configurado. La aplicación fallará de forma segura (sin datos simulados).');
  console.log('   Configura URL, clave pública y clave secreta de servidor antes de ejecutar pruebas integradas.');
}

console.log('--------------------------------------------------\n');
