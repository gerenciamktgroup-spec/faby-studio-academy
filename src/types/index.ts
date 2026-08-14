export type AppRole = 'alumna' | 'tutor' | 'profesor' | 'admin_academico' | 'superadmin' | 'auditor';

export type EnrollmentStatus = 'active' | 'completed' | 'cancelled';
export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';
export type ExportFormat = 'csv' | 'xlsx' | 'pdf' | 'json';
export type ContentType = 'video' | 'pdf' | 'quiz' | 'text';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  phone?: string;
  dni_nie?: string;
  created_at: string;
  updated_at: string;
  roles?: AppRole[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  level: string;
  estimated_hours: number;
  is_published: boolean;
  image_url?: string;
  created_at: string;
  modules?: Module[];
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_index: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content_type: ContentType;
  content_url?: string;
  body_text?: string;
  duration_seconds: number;
  order_index: number;
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  enrolled_at: string;
  status: EnrollmentStatus;
  completed_at?: string;
  certificate_id?: string;
  course?: Course;
  student?: UserProfile;
}

export interface LessonProgress {
  id: string;
  student_id: string;
  lesson_id: string;
  status: ProgressStatus;
  active_time_seconds: number;
  completed_at?: string;
}

export interface ActivityEvent {
  id: string;
  user_id: string;
  session_id: string;
  course_id?: string;
  module_id?: string;
  lesson_id?: string;
  event_type: string;
  occurred_at: string;
  received_at: string;
  duration_seconds: number;
  ip_hash: string;
  user_agent?: string;
  metadata_json?: Record<string, unknown>;
  source?: string;
  schema_version: number;
}

export interface SessionLog {
  id: string;
  user_id: string;
  session_id: string;
  started_at: string;
  last_heartbeat_at: string;
  ended_at?: string;
  total_logged_seconds: number;
  total_active_seconds: number;
  is_active: boolean;
}

export interface Assessment {
  id: string;
  lesson_id: string;
  title: string;
  passing_score: number;
  time_limit_minutes: number;
  questions?: Question[];
}

export interface Question {
  id: string;
  assessment_id: string;
  question_text: string;
  question_type: string;
  options_json: string[];
  correct_answer_json: unknown;
  points: number;
}

export interface AssessmentAttempt {
  id: string;
  student_id: string;
  assessment_id: string;
  started_at: string;
  submitted_at?: string;
  score: number;
  passed: boolean;
  answers_json: Record<string, unknown>;
}

export interface Certificate {
  id: string;
  enrollment_id: string;
  student_id: string;
  course_id: string;
  code: string;
  hash_signature: string;
  total_active_hours: number;
  issued_at: string;
  verification_url: string;
  student?: UserProfile;
  course?: Course;
}

export interface AuditExport {
  id: string;
  requested_by: string;
  export_format: ExportFormat;
  filters_json: Record<string, unknown>;
  generated_at: string;
  file_hash: string;
  file_location: string;
  record_count: number;
}
