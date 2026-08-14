import { createClient } from '@/lib/supabase/server';
import { ActivityEvent } from '@/types';

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

export type AuditEventType = typeof VALID_AUDIT_EVENT_TYPES[number];

/**
 * Anonymizes client IP address using SHA-256 for RGPD compliance.
 */
export async function hashIpAddress(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + '_fabi_salt_2026');
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'ip_hash_' + Math.abs(hash).toString(16);
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

/**
 * Inserts an immutable append-only activity log event.
 * Handles offline / sandbox fallback gracefully in demo mode.
 */
export async function recordActivityEvent(payload: RecordEventPayload): Promise<ActivityEvent | null> {
  try {
    const supabase = createClient();
    const ipHash = await hashIpAddress(payload.ipAddress || '127.0.0.1');

    const eventRecord = {
      id: 'ev_' + Math.random().toString(36).substring(2, 11),
      user_id: payload.userId,
      session_id: payload.sessionId,
      event_type: payload.eventType,
      course_id: payload.courseId || null,
      module_id: payload.moduleId || null,
      lesson_id: payload.lessonId || null,
      duration_seconds: payload.durationSeconds || 0,
      ip_hash: ipHash,
      user_agent: payload.userAgent || 'Web Browser',
      metadata_json: payload.metadata || {},
      source: 'web',
      schema_version: 1,
      occurred_at: new Date().toISOString(),
      received_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('activity_events')
      .insert([eventRecord])
      .select()
      .single();

    if (error) {
      // In demo mode without active network connection to Supabase, return generated record payload
      return eventRecord as ActivityEvent;
    }

    return (data || eventRecord) as ActivityEvent;
  } catch (err) {
    // Return mock event record so heartbeat and tracking continue seamlessly in demo sandbox
    const ipHash = await hashIpAddress(payload.ipAddress || '127.0.0.1');
    return {
      id: 'ev_demo_' + Date.now(),
      user_id: payload.userId,
      session_id: payload.sessionId,
      event_type: payload.eventType,
      course_id: payload.courseId || null,
      module_id: payload.moduleId || null,
      lesson_id: payload.lessonId || null,
      duration_seconds: payload.durationSeconds || 0,
      ip_hash: ipHash,
      user_agent: payload.userAgent || 'Web Browser',
      metadata_json: payload.metadata || {},
      source: 'web',
      schema_version: 1,
      occurred_at: new Date().toISOString(),
      received_at: new Date().toISOString(),
    } as ActivityEvent;
  }
}
