import { NextResponse, type NextRequest } from 'next/server';
import { STUDENT_ROLES } from '@/lib/auth/roles';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { recordActivityEvent } from '@/lib/audit-logger';
import { apiErrorResponse } from '@/lib/http/errors';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { lessonProgressSchema, validationError } from '@/lib/validation/api-schemas';

export async function POST(request: NextRequest) {
  try {
    const principal = await requireAuthPrincipal(STUDENT_ROLES);
    const payload = lessonProgressSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json(validationError(payload.error), { status: 400 });
    }

    const supabase = await createClient();
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select('id, modules!inner(course_id)')
      .eq('id', payload.data.lessonId)
      .single();
    if (lessonError) throw lessonError;

    const moduleRelation = Array.isArray(lesson.modules) ? lesson.modules[0] : lesson.modules;
    const courseId = moduleRelation?.course_id;
    if (!courseId) throw new Error('La lección no tiene un curso asociado.');

    const completedAt = payload.data.status === 'completed' ? new Date().toISOString() : null;
    const admin = createAdminClient();
    const { data: progress, error } = await admin
      .from('lesson_progress')
      .upsert(
        {
          student_id: principal.id,
          lesson_id: payload.data.lessonId,
          status: payload.data.status,
          completed_at: completedAt,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'student_id,lesson_id' }
      )
      .select('id, lesson_id, status, active_time_seconds, completed_at')
      .single();
    if (error) throw error;

    await recordActivityEvent({
      userId: principal.id,
      sessionId: `sess_progress_${crypto.randomUUID()}`,
      eventType:
        payload.data.status === 'completed' ? 'LESSON_COMPLETED' : 'LESSON_PROGRESS',
      courseId,
      lessonId: payload.data.lessonId,
      ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
      userAgent: request.headers.get('user-agent') ?? undefined,
    });

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
