-- Fabi Studio Academy - Complete PostgreSQL Schema & RLS Policies
-- Target: Supabase / PostgreSQL 15+

-- 1. ENUMS
CREATE TYPE public.app_role AS ENUM (
  'alumna',
  'tutor',
  'profesor',
  'admin_academico',
  'superadmin',
  'auditor'
);

CREATE TYPE public.enrollment_status AS ENUM ('active', 'completed', 'cancelled');
CREATE TYPE public.progress_status AS ENUM ('not_started', 'in_progress', 'completed');
CREATE TYPE public.export_format AS ENUM ('csv', 'xlsx', 'pdf', 'json');

-- 2. USER PROFILES & ROLES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  phone TEXT,
  dni_nie TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Helper function to check role in RLS
CREATE OR REPLACE FUNCTION public.has_role(target_user_id UUID, required_role public.app_role)
RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = target_user_id AND role = required_role
  );
END;
$$;

-- 3. COURSES & CONTENT HIERARCHY
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Belleza & Estética',
  level TEXT DEFAULT 'Todos los niveles',
  estimated_hours INT NOT NULL DEFAULT 40,
  is_published BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('video', 'pdf', 'quiz', 'text')),
  content_url TEXT,
  body_text TEXT,
  duration_seconds INT NOT NULL DEFAULT 0,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ENROLLMENTS & PROGRESS
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  status public.enrollment_status DEFAULT 'active',
  completed_at TIMESTAMPTZ,
  certificate_id UUID,
  UNIQUE(student_id, course_id)
);

CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  status public.progress_status DEFAULT 'not_started',
  active_time_seconds INT DEFAULT 0,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, lesson_id)
);

-- 5. SESSION LOGS & ACTIVE LEARNING TIME
CREATE TABLE public.session_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL UNIQUE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_heartbeat_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  total_logged_seconds INT DEFAULT 0,
  total_active_seconds INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- 6. APPEND-ONLY ACTIVITY EVENTS (TMS/369/2019 COMPLIANT)
CREATE TABLE public.activity_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  module_id UUID REFERENCES public.modules(id) ON DELETE SET NULL,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  duration_seconds INT DEFAULT 0,
  ip_hash TEXT NOT NULL,
  user_agent TEXT,
  metadata_json JSONB DEFAULT '{}'::jsonb,
  source TEXT DEFAULT 'web',
  schema_version INT DEFAULT 1
);

-- Trigger to enforce immutability on activity_events (NO UPDATE / NO DELETE)
CREATE OR REPLACE FUNCTION public.prevent_activity_event_tampering()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'Immutable Table: UPDATE and DELETE operations are strictly prohibited on activity_events for audit compliance.';
END;
$$;

CREATE TRIGGER trg_protect_activity_events
BEFORE UPDATE OR DELETE ON public.activity_events
FOR EACH ROW EXECUTE FUNCTION public.prevent_activity_event_tampering();

-- 7. ASSESSMENTS, ASSIGNMENTS & TUTORING
CREATE TABLE public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  passing_score INT DEFAULT 70,
  time_limit_minutes INT DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT DEFAULT 'multiple_choice',
  options_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_answer_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  points INT DEFAULT 10
);

CREATE TABLE public.assessment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  score INT DEFAULT 0,
  passed BOOLEAN DEFAULT FALSE,
  answers_json JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.assignment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  submission_text TEXT,
  file_url TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  grade INT,
  feedback TEXT,
  graded_by UUID REFERENCES public.profiles(id),
  graded_at TIMESTAMPTZ
);

CREATE TABLE public.tutoring_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tutor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 45,
  status TEXT DEFAULT 'scheduled',
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.forums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  forum_id UUID NOT NULL REFERENCES public.forums(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CERTIFICATES
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  hash_signature TEXT NOT NULL,
  total_active_hours NUMERIC(6,2) NOT NULL DEFAULT 0,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  verification_url TEXT NOT NULL
);

-- 9. AUDIT EXPORTS (IMMUTABLE LOG OF AUDITOR EXPORTS)
CREATE TABLE public.audit_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requested_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  export_format public.export_format NOT NULL,
  filters_json JSONB DEFAULT '{}'::jsonb,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  file_hash TEXT NOT NULL,
  file_location TEXT NOT NULL,
  record_count INT DEFAULT 0
);

-- Trigger to enforce immutability on audit_exports
CREATE TRIGGER trg_protect_audit_exports
BEFORE UPDATE OR DELETE ON public.audit_exports
FOR EACH ROW EXECUTE FUNCTION public.prevent_activity_event_tampering();

-- 10. RGPD PRIVACY & COMPLIANCE RECORDS
CREATE TABLE public.consent_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  consent_type TEXT NOT NULL,
  version TEXT NOT NULL,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  ip_hash TEXT NOT NULL
);

CREATE TABLE public.privacy_policy_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version TEXT NOT NULL UNIQUE,
  effective_date TIMESTAMPTZ DEFAULT NOW(),
  content TEXT NOT NULL
);

CREATE TABLE public.data_deletion_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending',
  completed_at TIMESTAMPTZ,
  note TEXT
);

CREATE TABLE public.data_retention_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL UNIQUE,
  retention_period_days INT NOT NULL,
  description TEXT NOT NULL
);

-- 11. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutoring_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.privacy_policy_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_deletion_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_retention_policies ENABLE ROW LEVEL SECURITY;

-- Policy helper for Auditors, Admins, Superadmins
CREATE OR REPLACE FUNCTION public.is_auditor_or_admin(user_id UUID)
RETURNS BOOLEAN LANGUAGE plpgsql AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = $1 AND role IN ('auditor', 'admin_academico', 'superadmin')
  );
END;
$$;

-- RLS: Courses (Everyone can read published courses; Admins can manage)
CREATE POLICY "Public can view published courses" ON public.courses FOR SELECT USING (is_published = TRUE OR public.is_auditor_or_admin(auth.uid()));
CREATE POLICY "Admins can manage courses" ON public.courses FOR ALL USING (public.is_auditor_or_admin(auth.uid()));

-- RLS: Modules & Lessons
CREATE POLICY "View modules" ON public.modules FOR SELECT USING (TRUE);
CREATE POLICY "View lessons" ON public.lessons FOR SELECT USING (TRUE);

-- RLS: Enrollments
CREATE POLICY "Students view own enrollments" ON public.enrollments FOR SELECT USING (student_id = auth.uid() OR public.is_auditor_or_admin(auth.uid()));
CREATE POLICY "Students enroll self" ON public.enrollments FOR INSERT WITH CHECK (student_id = auth.uid());

-- RLS: Lesson Progress
CREATE POLICY "Students manage own progress" ON public.lesson_progress FOR ALL USING (student_id = auth.uid() OR public.is_auditor_or_admin(auth.uid()));

-- RLS: Activity Events & Audit Exports
CREATE POLICY "Insert activity events" ON public.activity_events FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Auditors & Admins view activity events" ON public.activity_events FOR SELECT USING (user_id = auth.uid() OR public.is_auditor_or_admin(auth.uid()));
CREATE POLICY "Auditors & Admins view audit exports" ON public.audit_exports FOR ALL USING (public.is_auditor_or_admin(auth.uid()));

-- RLS: Certificates (Public read for verification)
CREATE POLICY "Public verify certificates" ON public.certificates FOR SELECT USING (TRUE);
