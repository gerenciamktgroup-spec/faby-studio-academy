import { createAdminClient } from '@/lib/supabase/admin';
import { getAuditIpSalt } from '@/lib/config/env';
import type { ActivityEvent } from '@/types';

export const VALID_AUDIT_EVENT_TYPES = [
  'AUTH_LOGIN',
  'AUTH_LOGOUT',
  'SESSION_STARTED',
  'SESSION_HEARTBEAT',
  'SESSION_ENDED',
  'COURSE_OPENED',
  'MODULE_STARTED',
  'MODULE_COMPLETED',
  'LESSON_STARTED',
  'LESSON_PROGRESS',
  'LESSON_COMPLETED',
  'VIDEO_STARTED',
  'VIDEO_PROGRESS',
  'VIDEO_COMPLETED',
  'PDF_OPENED',
  'QUIZ_STARTED',
  'QUESTION_ANSWERED',
  'QUIZ_SUBMITTED',
  'QUIZ_GRADED',
  'ASSIGNMENT_SUBMITTED',
  'FORUM_POSTED',
  'MESSAGE_SENT',
  'TUTOR_FEEDBACK_RECEIVED',
  'LIVE_CLASS_JOINED',
  'COURSE_COMPLETED',
  'CERTIFICATE_ISSUED',
  'EVENT_CORRECTION',
] as const;

export type AuditEventType = (typeof VALID_AUDIT_EVENT_TYPES)[number];

export async function hashIpAddress(ip: string): Promise<string> {
  const input = new TextEncoder().encode(`${ip}:${getAuditIpSalt()}`);
  const digest = await crypto.subtle.digest('SHA-256', input);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export interface RecordEventPayload {
  userId: string;
  sessionId: string;
  eventType: AuditEventType;
  courseId?: string;
  moduleId?: string;
  lessonId?: string;
  durationSeconds?: number;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export async function recordActivityEvent(
  payload: RecordEventPayload
): Promise<ActivityEvent> {
  const supabase = createAdminClient();
  const ipHash = await hashIpAddress(payload.ipAddress ?? 'unknown');
  const { data, error } = await supabase
    .from('activity_events')
    .insert({
      user_id: payload.userId,
      session_id: payload.sessionId,
      event_type: payload.eventType,
      course_id: payload.courseId ?? null,
      module_id: payload.moduleId ?? null,
      lesson_id: payload.lessonId ?? null,
      duration_seconds: payload.durationSeconds ?? 0,
      ip_hash: ipHash,
      user_agent: payload.userAgent ?? null,
      metadata_json: payload.metadata ?? {},
      source: 'web',
      schema_version: 1,
    })
    .select('*')
    .single();

  if (error) throw error;
  return data as ActivityEvent;
}
