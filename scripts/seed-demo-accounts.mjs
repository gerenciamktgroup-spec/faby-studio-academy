import fs from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const env = {};
if (fs.existsSync('.env.local')) {
  const lines = fs.readFileSync('.env.local', 'utf-8').split(/\r?\n/).filter((l) => l.includes('='));
  for (const l of lines) {
    const [k, ...rest] = l.split('=');
    env[k.trim()] = rest.join('=').trim();
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const adminClient = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const DEMO_PASSWORD = 'Faby2026!Demo';
const includeAdmin = process.argv.includes('--with-admin') && (process.env.ALLOW_ADMIN_SEED === 'true' || env.ALLOW_ADMIN_SEED === 'true');

const BASE_DEMO_USERS = [
  {
    email: 'alumna@fabystudio.academy',
    fullName: 'Lucía Martínez',
    phone: '+34 612 345 678',
    roles: ['alumna'],
    landingPage: '/campus',
    description: 'Acceso completo como alumna: cursos, reproductor de clases, prácticas, calculadora y certificado.',
  },
  {
    email: 'profesora@fabystudio.academy',
    fullName: 'Profesora Faby',
    phone: '+34 622 345 679',
    roles: ['profesor', 'tutor'],
    landingPage: '/profesor',
    description: 'Acceso docente: evaluación de prácticas con rúbrica, directorio de alumnas y tutorías.',
  },
];

const ADMIN_USERS = [
  {
    email: 'admin@fabystudio.academy',
    fullName: 'Valeria Directora',
    phone: '+34 633 345 680',
    roles: ['admin_academico'],
    landingPage: '/admin',
    description: 'Acceso directivo: gestión de matrículas, catálogo de másteres y métricas de facturación.',
  },
  {
    email: 'auditor@fabystudio.academy',
    fullName: 'Inspector Oficial',
    phone: '+34 644 345 681',
    roles: ['auditor'],
    landingPage: '/auditoria',
    description: 'Acceso de auditoría: inspección de bitácora inmutable de eventos, exportación e integridad.',
  },
  {
    email: 'superadmin@fabystudio.academy',
    fullName: 'Superadmin Faby',
    phone: '+34 655 345 682',
    roles: ['superadmin'],
    landingPage: '/admin',
    description: 'Control total de la plataforma: todas las áreas de administración, auditoría y campus.',
  },
];

const DEMO_USERS = includeAdmin ? [...BASE_DEMO_USERS, ...ADMIN_USERS] : BASE_DEMO_USERS;

async function seedDemoUsers() {
  console.log('================================================================');
  console.log(`  SEEDING DEMO ACCOUNTS IN SUPABASE (${includeAdmin ? 'INCLUDING ADMIN' : 'SAFE DEMO ONLY'})`);
  console.log('================================================================\n');

  // 1. Fetch available courses
  const { data: courses } = await adminClient.from('courses').select('id, title, slug');
  console.log(`Found ${courses?.length || 0} courses in database.`);

  for (const userConfig of DEMO_USERS) {
    console.log(`\n👤 Setting up demo account: ${userConfig.email} (${userConfig.fullName})`);

    // Check if user already exists in auth
    const { data: existingUsers } = await adminClient.auth.admin.listUsers();
    let user = existingUsers?.users?.find((u) => u.email === userConfig.email);

    if (user) {
      console.log(`   - Auth user already exists (${user.id}). Updating password...`);
      await adminClient.auth.admin.updateUserById(user.id, {
        password: DEMO_PASSWORD,
        email_confirm: true,
        user_metadata: { full_name: userConfig.fullName },
      });
    } else {
      console.log(`   - Creating user in Auth...`);
      const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
        email: userConfig.email,
        password: DEMO_PASSWORD,
        email_confirm: true,
        user_metadata: { full_name: userConfig.fullName },
      });
      if (createError) {
        console.error(`   ❌ Failed to create user: ${createError.message}`);
        continue;
      }
      user = newUser.user;
    }

    const userId = user.id;

    // Upsert profile
    await adminClient.from('profiles').upsert(
      {
        id: userId,
        email: userConfig.email,
        full_name: userConfig.fullName,
        phone: userConfig.phone,
        active: true,
        preferred_locale: 'es-ES',
      },
      { onConflict: 'id' }
    );
    console.log(`   ✅ Profile synced.`);

    // Sync roles
    for (const r of userConfig.roles) {
      await adminClient.from('user_roles').upsert(
        { user_id: userId, role: r },
        { onConflict: 'user_id,role' }
      );
    }
    console.log(`   ✅ Roles assigned: ${userConfig.roles.join(', ')}`);

    // If student, create enrollments in all courses
    if (userConfig.roles.includes('alumna') && courses && courses.length > 0) {
      for (const course of courses) {
        await adminClient.from('enrollments').upsert(
          {
            student_id: userId,
            course_id: course.id,
            status: 'active',
            progress_percentage: 68,
            active_learning_seconds: 6480, // 1.8h
            total_session_seconds: 9000,   // 2.5h
          },
          { onConflict: 'student_id,course_id' }
        );
      }
      console.log(`   ✅ Enrolled in ${courses.length} courses with progress.`);
    }

    // If teacher, assign to course_staff
    if (userConfig.roles.includes('profesor') && courses && courses.length > 0) {
      for (const course of courses) {
        await adminClient.from('course_staff').upsert(
          {
            course_id: course.id,
            user_id: userId,
            role: 'lead_instructor',
          },
          { onConflict: 'course_id,user_id,role' }
        );
      }
      console.log(`   ✅ Assigned to course staff for all courses.`);
    }
  }

  console.log('\n================================================================');
  console.log('  DEMO SEED COMPLETE');
  console.log('================================================================\n');
}

seedDemoUsers().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
