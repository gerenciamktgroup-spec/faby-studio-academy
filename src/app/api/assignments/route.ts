import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { STUDENT_ROLES, TEACHING_ROLES } from '@/lib/auth/roles';
import { apiErrorResponse } from '@/lib/http/errors';
import {
  assignmentOperationSchema,
  validationError,
} from '@/lib/validation/api-schemas';
import { recordActivityEvent } from '@/lib/audit-logger';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const payload = assignmentOperationSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json(validationError(payload.error), { status: 400 });
    }

    const supabase = await createClient();

    if (payload.data.action === 'submit') {
      const principal = await requireAuthPrincipal(STUDENT_ROLES);
      const { data: assignment, error: assignmentError } = await supabase
        .from('assignments')
        .select('id')
        .eq('id', payload.data.assignmentId)
        .single();
      if (assignmentError || !assignment) throw assignmentError ?? new Error('Práctica no disponible.');

      const admin = createAdminClient();
      const { data: submission, error } = await admin
        .from('assignment_submissions')
        .insert({
          assignment_id: payload.data.assignmentId,
          student_id: principal.id,
          submission_text: payload.data.description ?? null,
          file_url: payload.data.filePath ?? null,
        })
        .select('id, assignment_id, submitted_at')
        .single();

      if (error) throw error;

      await recordActivityEvent({
        userId: principal.id,
        sessionId: `sess_assignment_${crypto.randomUUID()}`,
        eventType: 'ASSIGNMENT_SUBMITTED',
        metadata: {
          assignmentId: submission.assignment_id,
          submissionId: submission.id,
        },
      });

      return NextResponse.json({ success: true, submission }, { status: 201 });
    }

    const principal = await requireAuthPrincipal(TEACHING_ROLES);
    const { data: existing, error: lookupError } = await supabase
      .from('assignment_submissions')
      .select('id, student_id, assignment_id')
      .eq('id', payload.data.submissionId)
      .single();

    if (lookupError) throw lookupError;

    const admin = createAdminClient();
    const { data: submission, error: gradeError } = await admin
      .from('assignment_submissions')
      .update({
        grade: payload.data.grade,
        feedback: payload.data.feedback,
        graded_by: principal.id,
        graded_at: new Date().toISOString(),
      })
      .eq('id', payload.data.submissionId)
      .select('id, student_id, assignment_id, grade, feedback, graded_at')
      .single();

    if (gradeError) throw gradeError;

    const { error: notificationError } = await admin.from('notifications').insert({
      user_id: existing.student_id,
      title: 'Práctica evaluada',
      message: `Tu práctica recibió una calificación de ${payload.data.grade}/100.`,
      type: 'feedback',
      link_url: '/campus/practicas',
    });
    if (notificationError) console.error('[Notifications] grade:', notificationError.message);

    await recordActivityEvent({
      userId: principal.id,
      sessionId: `sess_grading_${crypto.randomUUID()}`,
      eventType: 'TUTOR_FEEDBACK_RECEIVED',
      metadata: {
        studentId: existing.student_id,
        assignmentId: existing.assignment_id,
        submissionId: existing.id,
        grade: payload.data.grade,
      },
    });

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
