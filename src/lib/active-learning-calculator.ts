import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { recordActivityEvent } from '@/lib/audit-logger';

export interface HeartbeatPayload {
  userId: string;
  sessionId: string;
  isTabVisible: boolean;
  isVideoPlaying: boolean;
  hasRecentInteraction: boolean;
  lessonId?: string;
  courseId?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface LearningTimeSummary {
  totalLoggedHours: number;
  totalActiveHours: number;
  activeRatioPercentage: number;
  sessionCount: number;
  completedLessonsCount: number;
}

const HEARTBEAT_INTERVAL_SECONDS = 45;

export async function processHeartbeat(payload: HeartbeatPayload) {
  const isActiveLearning =
    payload.isTabVisible && (payload.isVideoPlaying || payload.hasRecentInteraction);
  const now = new Date().toISOString();
  const accessClient = await createClient();

  if (payload.lessonId) {
    const { data: lesson, error: lessonError } = await accessClient
      .from('lessons')
      .select('id, modules!inner(course_id)')
      .eq('id', payload.lessonId)
      .single();
    if (lessonError) throw lessonError;
    const moduleValue = Array.isArray(lesson.modules) ? lesson.modules[0] : lesson.modules;
    if (!moduleValue?.course_id || (payload.courseId && moduleValue.course_id !== payload.courseId)) {
      throw new Error('La lección no corresponde al curso activo.');
    }
    payload.courseId = moduleValue.course_id;
  } else if (payload.courseId) {
    const { data: enrollment, error: enrollmentError } = await accessClient
      .from('enrollments')
      .select('id')
      .eq('student_id', payload.userId)
      .eq('course_id', payload.courseId)
      .in('status', ['active', 'completed'])
      .maybeSingle();
    if (enrollmentError) throw enrollmentError;
    if (!enrollment) throw new Error('La cuenta no está matriculada en este curso.');
  }

  const supabase = createAdminClient();

  const { data: existingSession, error: sessionReadError } = await supabase
    .from('session_logs')
    .select('id, user_id, last_heartbeat_at, total_logged_seconds, total_active_seconds')
    .eq('session_id', payload.sessionId)
    .maybeSingle();

  if (sessionReadError) throw sessionReadError;
  if (existingSession && existingSession.user_id !== payload.userId) {
    throw new Error('La sesión de actividad pertenece a otra cuenta.');
  }

  const elapsedSeconds = existingSession
    ? Math.min(
        HEARTBEAT_INTERVAL_SECONDS,
        Math.max(0, Math.floor((Date.now() - new Date(existingSession.last_heartbeat_at).getTime()) / 1000))
      )
    : 0;
  const loggedSecondsToAdd = elapsedSeconds >= 30 ? elapsedSeconds : 0;
  const activeSecondsToAdd = isActiveLearning ? loggedSecondsToAdd : 0;

  if (existingSession) {
    const { error } = await supabase
      .from('session_logs')
      .update({
        last_heartbeat_at: now,
        total_logged_seconds:
          (existingSession.total_logged_seconds ?? 0) + loggedSecondsToAdd,
        total_active_seconds:
          (existingSession.total_active_seconds ?? 0) + activeSecondsToAdd,
        course_id: payload.courseId ?? null,
        is_active: true,
      })
      .eq('id', existingSession.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('session_logs').insert({
      user_id: payload.userId,
      session_id: payload.sessionId,
      course_id: payload.courseId ?? null,
      started_at: now,
      last_heartbeat_at: now,
      total_logged_seconds: 0,
      total_active_seconds: 0,
      is_active: true,
    });
    if (error) throw error;
  }

  if (payload.lessonId && activeSecondsToAdd > 0) {
    const { data: progress, error: progressReadError } = await supabase
      .from('lesson_progress')
      .select('id, status, active_time_seconds')
      .eq('student_id', payload.userId)
      .eq('lesson_id', payload.lessonId)
      .maybeSingle();
    if (progressReadError) throw progressReadError;

    if (progress) {
      const { error } = await supabase
        .from('lesson_progress')
        .update({
          active_time_seconds:
            (progress.active_time_seconds ?? 0) + activeSecondsToAdd,
          status: progress.status === 'completed' ? 'completed' : 'in_progress',
          updated_at: now,
        })
        .eq('id', progress.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('lesson_progress').insert({
        student_id: payload.userId,
        lesson_id: payload.lessonId,
        status: 'in_progress',
        active_time_seconds: activeSecondsToAdd,
      });
      if (error) throw error;
    }
  }

  if (loggedSecondsToAdd > 0) await recordActivityEvent({
    userId: payload.userId,
    sessionId: payload.sessionId,
    eventType: 'SESSION_HEARTBEAT',
    courseId: payload.courseId,
    lessonId: payload.lessonId,
    durationSeconds: activeSecondsToAdd,
    ipAddress: payload.ipAddress,
    userAgent: payload.userAgent,
    metadata: {
      is_tab_visible: payload.isTabVisible,
      is_video_playing: payload.isVideoPlaying,
      has_recent_interaction: payload.hasRecentInteraction,
      active_seconds_added: activeSecondsToAdd,
    },
  });

  return {
    success: true,
    activeSecondsAdded: activeSecondsToAdd,
    loggedSecondsAdded: loggedSecondsToAdd,
  };
}

export async function calculateActiveLearningSummary(
  userId: string,
  courseId?: string
): Promise<LearningTimeSummary> {
  const supabase = await createClient();
  let sessionsQuery = supabase
    .from('session_logs')
    .select('total_logged_seconds, total_active_seconds')
    .eq('user_id', userId);
  if (courseId) sessionsQuery = sessionsQuery.eq('course_id', courseId);

  const [{ data: sessions, error: sessionsError }, { count, error: progressError }] =
    await Promise.all([
      sessionsQuery,
      supabase
        .from('lesson_progress')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', userId)
        .eq('status', 'completed'),
    ]);

  if (sessionsError) throw sessionsError;
  if (progressError) throw progressError;

  const totals = (sessions ?? []).reduce(
    (sum, session) => ({
      logged: sum.logged + (session.total_logged_seconds ?? 0),
      active: sum.active + (session.total_active_seconds ?? 0),
    }),
    { logged: 0, active: 0 }
  );

  return {
    totalLoggedHours: Number((totals.logged / 3600).toFixed(2)),
    totalActiveHours: Number((totals.active / 3600).toFixed(2)),
    activeRatioPercentage:
      totals.logged > 0 ? Number(((totals.active / totals.logged) * 100).toFixed(1)) : 0,
    sessionCount: sessions?.length ?? 0,
    completedLessonsCount: count ?? 0,
  };
}
