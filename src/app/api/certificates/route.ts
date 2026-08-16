import { createHmac, randomUUID } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { TEACHING_ROLES } from '@/lib/auth/roles';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { getCertificateSigningSecret } from '@/lib/config/env';
import { apiErrorResponse } from '@/lib/http/errors';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  certificateIssueSchema,
  validationError,
} from '@/lib/validation/api-schemas';
import { hashIpAddress } from '@/lib/consent';
import { verifyCertificate, buildCertificateCanonicalPayload } from '@/lib/certificates/verify';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')?.trim();
  if (!code || code.length > 80) {
    return NextResponse.json({ error: 'Código de certificado no válido.' }, { status: 400 });
  }

  try {
    const certificate = await verifyCertificate(code);
    if (!certificate) {
      return NextResponse.json({ error: 'Certificado no encontrado o firma no válida.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      certificate: {
        code: certificate.code,
        student_name: certificate.student_name,
        course_title: certificate.course_title,
        total_active_hours: certificate.total_active_hours,
        issued_at: certificate.issued_at,
        verification_url: certificate.verification_url,
        is_valid: certificate.is_valid,
      },
    });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const principal = await requireAuthPrincipal(TEACHING_ROLES);
    const payload = certificateIssueSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json(validationError(payload.error), { status: 400 });
    }

    const supabase = await createClient();
    const admin = createAdminClient();

    // 1. Fetch enrollment
    const { data: enrollment, error: enrollmentError } = await admin
      .from('enrollments')
      .select('id, student_id, course_id, status')
      .eq('id', payload.data.enrollmentId)
      .maybeSingle();

    if (enrollmentError) throw enrollmentError;
    if (!enrollment) {
      return NextResponse.json({ error: 'Matrícula no encontrada.' }, { status: 404 });
    }

    if (enrollment.status !== 'completed' && enrollment.status !== 'active') {
      return NextResponse.json(
        { error: 'La matrícula debe estar activa o completada antes de emitir el certificado.' },
        { status: 409 }
      );
    }

    // 2. Check teacher course assignment (if not superadmin or academic admin)
    if (!principal.roles.includes('superadmin') && !principal.roles.includes('admin_academico')) {
      const { data: staffAssignment, error: staffError } = await admin
        .from('course_staff')
        .select('id')
        .eq('course_id', enrollment.course_id)
        .eq('user_id', principal.id)
        .eq('is_active', true)
        .maybeSingle();

      if (staffError) throw staffError;
      if (!staffAssignment) {
        return NextResponse.json(
          { error: 'Solo la docente asignada a este curso o la administración académica pueden emitir certificaciones.' },
          { status: 403 }
        );
      }
    }

    // 3. Check existing certificate
    const { data: existing, error: existingError } = await admin
      .from('certificates')
      .select('code, verification_url')
      .eq('enrollment_id', enrollment.id)
      .maybeSingle();
    if (existingError) throw existingError;
    if (existing) {
      return NextResponse.json(
        { error: 'Esta matrícula ya cuenta con un certificado emitido.', certificate: existing },
        { status: 409 }
      );
    }

    // 4. Check lessons completion
    const { data: modules, error: modulesError } = await admin
      .from('modules')
      .select('id')
      .eq('course_id', enrollment.course_id);
    if (modulesError) throw modulesError;
    const moduleIds = (modules ?? []).map((m) => m.id);
    const lessonsResult = moduleIds.length
      ? await admin.from('lessons').select('id').in('module_id', moduleIds)
      : { data: [], error: null };
    if (lessonsResult.error) throw lessonsResult.error;
    const lessonIds = (lessonsResult.data ?? []).map((l) => l.id);

    if (lessonIds.length === 0) {
      return NextResponse.json(
        { error: 'El curso no contiene lecciones estructuradas para certificar.' },
        { status: 409 }
      );
    }

    const { data: progressData, error: progressError } = await admin
      .from('lesson_progress')
      .select('lesson_id')
      .eq('student_id', enrollment.student_id)
      .eq('status', 'completed')
      .in('lesson_id', lessonIds);
    if (progressError) throw progressError;

    const completedLessons = new Set((progressData ?? []).map((row) => row.lesson_id));
    if (lessonIds.some((lId) => !completedLessons.has(lId))) {
      return NextResponse.json(
        { error: 'La alumna aún no ha completado la totalidad de las lecciones del curso.' },
        { status: 409 }
      );
    }

    // 5. Check assessments and assignments
    const [assessmentsResult, assignmentsResult] = await Promise.all([
      admin.from('assessments').select('id').in('lesson_id', lessonIds),
      admin.from('assignments').select('id').in('lesson_id', lessonIds),
    ]);
    if (assessmentsResult.error) throw assessmentsResult.error;
    if (assignmentsResult.error) throw assignmentsResult.error;

    const assessmentIds = (assessmentsResult.data ?? []).map((row) => row.id);
    if (assessmentIds.length > 0) {
      const { data: attempts, error: attemptsError } = await admin
        .from('assessment_attempts')
        .select('assessment_id')
        .eq('student_id', enrollment.student_id)
        .eq('passed', true)
        .in('assessment_id', assessmentIds);
      if (attemptsError) throw attemptsError;
      const passed = new Set((attempts ?? []).map((row) => row.assessment_id));
      if (assessmentIds.some((aId) => !passed.has(aId))) {
        return NextResponse.json(
          { error: 'Faltan evaluaciones teóricas por aprobar.' },
          { status: 409 }
        );
      }
    }

    const assignmentIds = (assignmentsResult.data ?? []).map((row) => row.id);
    if (assignmentIds.length > 0) {
      const { data: submissions, error: submissionsError } = await admin
        .from('assignment_submissions')
        .select('assignment_id, grade')
        .eq('student_id', enrollment.student_id)
        .in('assignment_id', assignmentIds)
        .not('graded_at', 'is', null);
      if (submissionsError) throw submissionsError;
      const approved = new Set(
        (submissions ?? []).filter((row) => Number(row.grade) >= 70).map((row) => row.assignment_id)
      );
      if (assignmentIds.some((aId) => !approved.has(aId))) {
        return NextResponse.json(
          { error: 'Faltan entregas de prácticas evaluadas con nota aprobatoria (mínimo 70/100).' },
          { status: 409 }
        );
      }
    }

    // 6. Check Active Study Time in whole seconds BEFORE rounding
    const { data: courseData, error: courseError } = await admin
      .from('courses')
      .select('id, title, estimated_hours, min_active_hours_pct')
      .eq('id', enrollment.course_id)
      .single();
    if (courseError) throw courseError;

    const estimatedSeconds = Math.round(Number(courseData.estimated_hours) * 3600);
    const minPct = Number(courseData.min_active_hours_pct ?? 0.80);
    const requiredActiveSeconds = Math.ceil(estimatedSeconds * minPct);

    const { data: sessions, error: sessionsError } = await admin
      .from('session_logs')
      .select('total_active_seconds')
      .eq('user_id', enrollment.student_id)
      .eq('course_id', enrollment.course_id);
    if (sessionsError) throw sessionsError;

    const totalActiveSeconds = (sessions ?? []).reduce(
      (acc, s) => acc + Math.max(0, Math.floor(Number(s.total_active_seconds) || 0)),
      0
    );

    if (totalActiveSeconds < requiredActiveSeconds) {
      const totalActiveHours = Number((totalActiveSeconds / 3600).toFixed(2));
      const minRequiredHours = Number((requiredActiveSeconds / 3600).toFixed(2));
      return NextResponse.json(
        {
          error: `Horas de actividad insuficientes. Registradas: ${totalActiveHours}h (${totalActiveSeconds}s). Requeridas: ${minRequiredHours}h (${requiredActiveSeconds}s / ${Math.round(minPct * 100)}% de ${courseData.estimated_hours}h estimadas).`,
        },
        { status: 409 }
      );
    }

    // 7. Get student profile name for canonical string
    const { data: studentProfile, error: profileError } = await admin
      .from('profiles')
      .select('full_name')
      .eq('id', enrollment.student_id)
      .single();
    if (profileError) throw profileError;

    const studentName = studentProfile?.full_name ?? 'Alumna Faby Studio';
    const issuedAt = new Date().toISOString();
    const code = `FABY-${new Date().getUTCFullYear()}-${randomUUID()
      .replaceAll('-', '')
      .slice(0, 12)
      .toUpperCase()}`;

    const canonicalPayload = buildCertificateCanonicalPayload({
      version: '2.0',
      code,
      studentId: enrollment.student_id,
      studentName,
      courseId: enrollment.course_id,
      courseTitle: courseData.title,
      totalActiveSeconds,
      issuedAt,
    });

    const secret = getCertificateSigningSecret();
    const signature = createHmac('sha256', secret)
      .update(canonicalPayload)
      .digest('hex');

    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? request.nextUrl.origin).replace(/\/$/, '');
    const verificationUrl = `${appUrl}/verificar-certificado/${code}`;

    // 8. Revalidar bajo bloqueo y emitir certificado, completar matrícula y
    // registrar auditoría dentro de una única transacción PostgreSQL.
    const forwardedIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    const { data: certificateData, error: issueError } = await admin.rpc(
      'issue_certificate_tx',
      {
        p_actor_id: principal.id,
        p_enrollment_id: enrollment.id,
        p_code: code,
        p_hash_signature: signature,
        p_payload_version: '2.0',
        p_student_name_snapshot: studentName,
        p_course_title_snapshot: courseData.title,
        p_total_active_seconds: totalActiveSeconds,
        p_issued_at: issuedAt,
        p_verification_url: verificationUrl,
        p_ip_hash: hashIpAddress(forwardedIp || 'unknown'),
        p_user_agent: request.headers.get('user-agent') || 'FabyStudioCertificate/2.0',
      }
    );

    if (issueError) {
      const conflict = /ya tiene|cambió|insuficientes|pendiente|completó|caducado/i.test(
        issueError.message
      );
      const forbidden = /no está asignada|no autorizado/i.test(issueError.message);
      if (conflict || forbidden) {
        return NextResponse.json(
          { error: issueError.message },
          { status: forbidden ? 403 : 409 }
        );
      }
      throw issueError;
    }

    const certificate = certificateData as {
      code: string;
      student_name: string;
      course_title: string;
      total_active_hours: number;
      issued_at: string;
      verification_url: string;
    };

    return NextResponse.json(
      {
        success: true,
        certificate: {
          code: certificate.code,
          student_name: certificate.student_name,
          course_title: certificate.course_title,
          total_active_hours: certificate.total_active_hours,
          issued_at: certificate.issued_at,
          verification_url: certificate.verification_url,
          is_valid: true,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return apiErrorResponse(error);
  }
}
