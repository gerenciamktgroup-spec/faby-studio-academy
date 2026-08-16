import { NextResponse, type NextRequest } from 'next/server';
import { STUDENT_ROLES, TEACHING_ROLES } from '@/lib/auth/roles';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { apiErrorResponse } from '@/lib/http/errors';
import { createClient } from '@/lib/supabase/server';
import { tutoringRequestSchema, tutoringUpdateSchema, validationError } from '@/lib/validation/api-schemas';

export async function POST(request: NextRequest) {
  try {
    const principal = await requireAuthPrincipal(STUDENT_ROLES);
    const payload = tutoringRequestSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json(validationError(payload.error), { status: 400 });
    }

    const scheduledAt = new Date(payload.data.scheduledAt);
    const now = Date.now();
    if (scheduledAt.getTime() < now + 2 * 60 * 60 * 1000 || scheduledAt.getTime() > now + 90 * 24 * 60 * 60 * 1000) {
      return NextResponse.json({ error: 'La tutoría debe solicitarse entre 2 horas y 90 días de anticipación.' }, { status: 400 });
    }

    const supabase = await createClient();
    const windowStart = new Date(scheduledAt.getTime() - 90 * 60 * 1000).toISOString();
    const windowEnd = new Date(scheduledAt.getTime() + 90 * 60 * 1000).toISOString();
    const { data: conflicts, error: conflictError } = await supabase
      .from('tutoring_sessions')
      .select('id')
      .or(`student_id.eq.${principal.id},tutor_id.eq.${payload.data.tutorId}`)
      .gte('scheduled_at', windowStart)
      .lte('scheduled_at', windowEnd)
      .in('status', ['requested', 'scheduled']);
    if (conflictError) throw conflictError;
    if ((conflicts ?? []).length > 0) {
      return NextResponse.json({ error: 'Ya existe una tutoría cercana a ese horario.' }, { status: 409 });
    }

    const { data: tutoring, error } = await supabase
      .from('tutoring_sessions')
      .insert({
        student_id: principal.id,
        tutor_id: payload.data.tutorId,
        scheduled_at: scheduledAt.toISOString(),
        duration_minutes: payload.data.durationMinutes,
        status: 'requested',
      })
      .select('id, tutor_id, scheduled_at, duration_minutes, status')
      .single();
    if (error) throw error;

    const { error: notificationError } = await supabase.from('notifications').insert({
      user_id: payload.data.tutorId,
      title: 'Nueva solicitud de tutoría',
      message: `${principal.fullName} solicitó una tutoría para ${new Intl.DateTimeFormat('es', { dateStyle: 'medium', timeStyle: 'short' }).format(scheduledAt)}.`,
      type: 'tutoring',
      link_url: '/profesor/tutorias',
    });
    if (notificationError) console.error('[Notifications] tutoring request:', notificationError.message);

    return NextResponse.json({ success: true, tutoring }, { status: 201 });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const principal = await requireAuthPrincipal(TEACHING_ROLES);
    const payload = tutoringUpdateSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json(validationError(payload.error), { status: 400 });
    }
    if (payload.data.status === 'scheduled' && !payload.data.meetingLink) {
      return NextResponse.json({ error: 'Indica el enlace de videollamada para confirmar la tutoría.' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: existing, error: lookupError } = await supabase
      .from('tutoring_sessions')
      .select('id, student_id, tutor_id, scheduled_at, status')
      .eq('id', payload.data.sessionId)
      .single();
    if (lookupError) throw lookupError;
    if (existing.status === 'completed' || existing.status === 'cancelled') {
      return NextResponse.json({ error: 'Esta tutoría ya está cerrada.' }, { status: 409 });
    }

    const { data, error } = await supabase
      .from('tutoring_sessions')
      .update({
        status: payload.data.status,
        meeting_link: payload.data.status === 'scheduled' ? payload.data.meetingLink : null,
      })
      .eq('id', existing.id)
      .select('id, status, meeting_link')
      .single();
    if (error) throw error;

    const labels = { scheduled: 'confirmada', completed: 'completada', cancelled: 'cancelada' } as const;
    const { error: notificationError } = await supabase.from('notifications').insert({
      user_id: existing.student_id,
      title: `Tutoría ${labels[payload.data.status]}`,
      message: `Tu sesión del ${new Intl.DateTimeFormat('es', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(existing.scheduled_at))} fue ${labels[payload.data.status]}.`,
      type: 'tutoring',
      link_url: '/campus/tutorias',
    });
    if (notificationError) console.error('[Notifications] tutoring update:', notificationError.message);

    return NextResponse.json({ success: true, tutoring: data, updatedBy: principal.id });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
