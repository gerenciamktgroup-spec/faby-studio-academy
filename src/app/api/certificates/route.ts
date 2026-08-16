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
import { recordActivityEvent } from '@/lib/audit-logger';
import { verifyCertificate } from '@/lib/certificates/verify';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')?.trim();
  if (!code || code.length > 80) {
    return NextResponse.json({ error: 'Código de certificado no válido.' }, { status: 400 });
  }

  try {
    const certificate = await verifyCertificate(code);
    if (!certificate) {
      return NextResponse.json({ error: 'Certificado no encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, certificate });
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
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .select('id, student_id, course_id, status')
      .eq('id', payload.data.enrollmentId)
      .single();
    if (enrollmentError) throw enrollmentError;
    if (enrollment.status !== 'completed') {
      return NextResponse.json(
        { error: 'La matrícula debe estar completada antes de emitir el certificado.' },
        { status: 409 }
      );
    }

    const { data: existing } = await supabase
      .from('certificates')
      .select('code, verification_url')
      .eq('enrollment_id', enrollment.id)
      .maybeSingle();
    if (existing) {
      return NextResponse.json(
        { error: 'Esta matrícula ya tiene un certificado emitido.', certificate: existing },
        { status: 409 }
      );
    }

    const { data: modules, error: modulesError } = await supabase
      .from('modules')
      .select('id')
      .eq('course_id', enrollment.course_id);
    if (modulesError) throw modulesError;
    const moduleIds = (modules ?? []).map((module) => module.id);
    const lessonsResult = moduleIds.length
      ? await supabase.from('lessons').select('id').in('module_id', moduleIds)
      : { data: [], error: null };
    if (lessonsResult.error) throw lessonsResult.error;
    const lessonIds = (lessonsResult.data ?? []).map((lesson) => lesson.id);
    if (lessonIds.length === 0) {
      return NextResponse.json({ error: 'No se puede certificar un curso sin lecciones.' }, { status: 409 });
    }

    const [progressResult, assessmentsResult, assignmentsResult] = await Promise.all([
      supabase.from('lesson_progress').select('lesson_id').eq('student_id', enrollment.student_id).eq('status', 'completed').in('lesson_id', lessonIds),
      supabase.from('assessments').select('id').in('lesson_id', lessonIds),
      supabase.from('assignments').select('id').in('lesson_id', lessonIds),
    ]);
    if (progressResult.error) throw progressResult.error;
    if (assessmentsResult.error) throw assessmentsResult.error;
    if (assignmentsResult.error) throw assignmentsResult.error;
    const completedLessons = new Set((progressResult.data ?? []).map((row) => row.lesson_id));
    if (lessonIds.some((lessonId) => !completedLessons.has(lessonId))) {
      return NextResponse.json({ error: 'La alumna todavía no completó todas las lecciones.' }, { status: 409 });
    }

    const assessmentIds = (assessmentsResult.data ?? []).map((row) => row.id);
    if (assessmentIds.length) {
      const { data: attempts, error: attemptsError } = await supabase.from('assessment_attempts').select('assessment_id').eq('student_id', enrollment.student_id).eq('passed', true).in('assessment_id', assessmentIds);
      if (attemptsError) throw attemptsError;
      const passed = new Set((attempts ?? []).map((row) => row.assessment_id));
      if (assessmentIds.some((assessmentId) => !passed.has(assessmentId))) {
        return NextResponse.json({ error: 'Faltan evaluaciones teóricas aprobadas.' }, { status: 409 });
      }
    }

    const assignmentIds = (assignmentsResult.data ?? []).map((row) => row.id);
    if (assignmentIds.length) {
      const { data: submissions, error: submissionsError } = await supabase.from('assignment_submissions').select('assignment_id, grade').eq('student_id', enrollment.student_id).in('assignment_id', assignmentIds).not('graded_at', 'is', null);
      if (submissionsError) throw submissionsError;
      const approved = new Set((submissions ?? []).filter((row) => Number(row.grade) >= 70).map((row) => row.assignment_id));
      if (assignmentIds.some((assignmentId) => !approved.has(assignmentId))) {
        return NextResponse.json({ error: 'Faltan prácticas aprobadas con al menos 70/100.' }, { status: 409 });
      }
    }

    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .select('id, title, estimated_hours, min_active_hours_pct')
      .eq('id', enrollment.course_id)
      .single();
    if (courseError) throw courseError;

    const minPct = Number(courseData.min_active_hours_pct ?? 0.80);
    const minRequiredHours = Number((courseData.estimated_hours * minPct).toFixed(2));

    const { data: sessions, error: sessionsError } = await supabase
      .from('session_logs')
      .select('total_active_seconds')
      .eq('user_id', enrollment.student_id)
      .eq('course_id', enrollment.course_id);
    if (sessionsError) throw sessionsError;

    const totalActiveSeconds = (sessions ?? []).reduce(
      (total, session) => total + (session.total_active_seconds ?? 0),
      0
    );
    const totalActiveHours = Number((totalActiveSeconds / 3600).toFixed(2));

    if (totalActiveHours < minRequiredHours) {
      return NextResponse.json(
        {
          error: `Horas de actividad insuficientes. La alumna cuenta con ${totalActiveHours}h registradas, pero se requiere un mínimo de ${minRequiredHours}h (${Math.round(minPct * 100)}% de ${courseData.estimated_hours}h estimadas).`,
        },
        { status: 409 }
      );
    }

    const issuedAt = new Date().toISOString();
    const code = `FABY-${new Date().getUTCFullYear()}-${randomUUID()
      .replaceAll('-', '')
      .slice(0, 12)
      .toUpperCase()}`;
    const signature = createHmac('sha256', getCertificateSigningSecret())
      .update(`${enrollment.id}:${enrollment.student_id}:${enrollment.course_id}:${code}:${issuedAt}`)
      .digest('hex');
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? request.nextUrl.origin).replace(/\/$/, '');
    const verificationUrl = `${appUrl}/verificar-certificado/${code}`;

    const admin = createAdminClient();
    const { data: certificate, error: issueError } = await admin
      .from('certificates')
      .insert({
        enrollment_id: enrollment.id,
        student_id: enrollment.student_id,
        course_id: enrollment.course_id,
        code,
        hash_signature: signature,
        total_active_hours: totalActiveHours,
        issued_at: issuedAt,
        verification_url: verificationUrl,
      })
      .select('id, code, total_active_hours, issued_at, verification_url')
      .single();
    if (issueError) throw issueError;

    const { error: notificationError } = await admin.from('notifications').insert({
      user_id: enrollment.student_id,
      title: 'Certificado emitido',
      message: 'Tu certificado ya está disponible y puede verificarse públicamente.',
      type: 'certificate',
      link_url: '/campus/certificado',
    });
    if (notificationError) console.error('[Notifications] certificate:', notificationError.message);

    await recordActivityEvent({
      userId: principal.id,
      sessionId: `sess_certificate_${randomUUID()}`,
      eventType: 'CERTIFICATE_ISSUED',
      courseId: enrollment.course_id,
      metadata: {
        certificateId: certificate.id,
        enrollmentId: enrollment.id,
        studentId: enrollment.student_id,
      },
    });

    return NextResponse.json({ success: true, certificate }, { status: 201 });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
