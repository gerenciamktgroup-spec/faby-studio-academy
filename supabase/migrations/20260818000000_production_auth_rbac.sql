-- FABY STUDIO ACADEMY — Production authentication, RBAC and complete RLS baseline
-- Apply after the 20260808, 20260816 and 20260817 migrations.

-- ---------------------------------------------------------------------------
-- Identity lifecycle
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data ->> 'full_name'), ''), SPLIT_PART(NEW.email, '@', 1)),
    NEW.email,
    NULLIF(TRIM(NEW.raw_user_meta_data ->> 'phone'), '')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = NOW();

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'alumna')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

-- Backfill identities created before this migration.
INSERT INTO public.profiles (id, full_name, email, phone)
SELECT
  users.id,
  COALESCE(NULLIF(TRIM(users.raw_user_meta_data ->> 'full_name'), ''), SPLIT_PART(users.email, '@', 1)),
  users.email,
  NULLIF(TRIM(users.raw_user_meta_data ->> 'phone'), '')
FROM auth.users AS users
WHERE users.email IS NOT NULL
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.user_roles (user_id, role)
SELECT profiles.id, 'alumna'::public.app_role
FROM public.profiles AS profiles
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_roles AS existing WHERE existing.user_id = profiles.id
)
ON CONFLICT (user_id, role) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Course staffing and missing operational relations
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.course_staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  staff_role public.app_role NOT NULL CHECK (staff_role IN ('tutor', 'profesor')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (course_id, user_id, staff_role)
);

ALTER TABLE public.course_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_logs
  ADD COLUMN IF NOT EXISTS course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL;

CREATE UNIQUE INDEX IF NOT EXISTS certificates_enrollment_unique
  ON public.certificates (enrollment_id);
CREATE UNIQUE INDEX IF NOT EXISTS assessments_lesson_unique
  ON public.assessments (lesson_id);
CREATE INDEX IF NOT EXISTS course_staff_user_course_idx
  ON public.course_staff (user_id, course_id) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS enrollments_student_status_idx
  ON public.enrollments (student_id, status);
CREATE INDEX IF NOT EXISTS activity_events_user_occurred_idx
  ON public.activity_events (user_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS activity_events_course_occurred_idx
  ON public.activity_events (course_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS messages_participants_sent_idx
  ON public.messages (sender_id, recipient_id, sent_at DESC);

DROP TRIGGER IF EXISTS trg_protect_certificates ON public.certificates;
CREATE TRIGGER trg_protect_certificates
BEFORE UPDATE OR DELETE ON public.certificates
FOR EACH ROW EXECUTE FUNCTION public.prevent_activity_event_tampering();

-- ---------------------------------------------------------------------------
-- Centralized authorization helpers. All helpers derive identity from auth.uid().
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.has_any_role(required_roles public.app_role[])
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid() AND role = ANY(required_roles)
  );
$$;

CREATE OR REPLACE FUNCTION public.can_manage_course(target_course_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[])
    OR EXISTS (
      SELECT 1 FROM public.course_staff
      WHERE course_id = target_course_id
        AND user_id = auth.uid()
        AND is_active = TRUE
    );
$$;

CREATE OR REPLACE FUNCTION public.can_access_course(target_course_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    public.can_manage_course(target_course_id)
    OR public.has_any_role(ARRAY['auditor']::public.app_role[])
    OR EXISTS (
      SELECT 1 FROM public.enrollments
      WHERE course_id = target_course_id
        AND student_id = auth.uid()
        AND status IN ('active', 'completed')
    );
$$;

CREATE OR REPLACE FUNCTION public.can_view_student(target_student_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    target_student_id = auth.uid()
    OR public.has_any_role(
      ARRAY['admin_academico', 'superadmin', 'auditor']::public.app_role[]
    )
    OR EXISTS (
      SELECT 1
      FROM public.enrollments AS enrollment
      JOIN public.course_staff AS staff ON staff.course_id = enrollment.course_id
      WHERE enrollment.student_id = target_student_id
        AND staff.user_id = auth.uid()
        AND staff.is_active = TRUE
    )
    OR EXISTS (
      SELECT 1
      FROM public.enrollments AS enrollment
      JOIN public.course_staff AS staff ON staff.course_id = enrollment.course_id
      WHERE enrollment.student_id = auth.uid()
        AND staff.user_id = target_student_id
        AND staff.is_active = TRUE
    );
$$;

CREATE OR REPLACE FUNCTION public.can_message_user(target_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    target_user_id <> auth.uid()
    AND (
      public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[])
      OR EXISTS (
        SELECT 1
        FROM public.enrollments AS enrollment
        JOIN public.course_staff AS staff ON staff.course_id = enrollment.course_id
        WHERE enrollment.student_id = auth.uid()
          AND staff.user_id = target_user_id
          AND staff.is_active = TRUE
      )
      OR EXISTS (
        SELECT 1
        FROM public.enrollments AS enrollment
        JOIN public.course_staff AS staff ON staff.course_id = enrollment.course_id
        WHERE enrollment.student_id = target_user_id
          AND staff.user_id = auth.uid()
          AND staff.is_active = TRUE
      )
    );
$$;

CREATE OR REPLACE FUNCTION public.can_manage_student(target_student_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[])
    OR EXISTS (
      SELECT 1
      FROM public.enrollments AS enrollment
      JOIN public.course_staff AS staff ON staff.course_id = enrollment.course_id
      WHERE enrollment.student_id = target_student_id
        AND staff.user_id = auth.uid()
        AND staff.is_active = TRUE
    );
$$;

-- Replace legacy helpers so old policies cannot accept a user id chosen by the caller.
CREATE OR REPLACE FUNCTION public.has_role(target_user_id UUID, required_role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT target_user_id = auth.uid() AND public.has_any_role(ARRAY[required_role]);
$$;

CREATE OR REPLACE FUNCTION public.is_auditor_or_admin(target_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT target_user_id = auth.uid() AND public.has_any_role(
    ARRAY['auditor', 'admin_academico', 'superadmin']::public.app_role[]
  );
$$;

-- ---------------------------------------------------------------------------
-- Replace the incomplete policies from the initial schema.
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "Public can view published courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can manage courses" ON public.courses;
DROP POLICY IF EXISTS "View modules" ON public.modules;
DROP POLICY IF EXISTS "View lessons" ON public.lessons;
DROP POLICY IF EXISTS "Students view own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Students enroll self" ON public.enrollments;
DROP POLICY IF EXISTS "Students manage own progress" ON public.lesson_progress;
DROP POLICY IF EXISTS "Insert activity events" ON public.activity_events;
DROP POLICY IF EXISTS "Auditors & Admins view activity events" ON public.activity_events;
DROP POLICY IF EXISTS "Auditors & Admins view audit exports" ON public.audit_exports;
DROP POLICY IF EXISTS "Public verify certificates" ON public.certificates;

-- Profiles and roles
CREATE POLICY profiles_select_scope ON public.profiles FOR SELECT TO authenticated
  USING (public.can_view_student(id));
CREATE POLICY profiles_update_own ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY profiles_admin_all ON public.profiles FOR ALL TO authenticated
  USING (public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[]))
  WITH CHECK (public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[]));

CREATE POLICY roles_select_own ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY roles_auditor_read ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_any_role(ARRAY['auditor']::public.app_role[]));
CREATE POLICY roles_admin_all ON public.user_roles FOR ALL TO authenticated
  USING (public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[]))
  WITH CHECK (public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[]));

CREATE POLICY course_staff_select_own ON public.course_staff FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.can_access_course(course_id));
CREATE POLICY course_staff_admin_all ON public.course_staff FOR ALL TO authenticated
  USING (public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[]))
  WITH CHECK (public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[]));

-- Courses and protected learning content
CREATE POLICY courses_public_catalog ON public.courses FOR SELECT TO anon
  USING (is_published = TRUE);
CREATE POLICY courses_authenticated_read ON public.courses FOR SELECT TO authenticated
  USING (is_published = TRUE OR public.can_access_course(id));
CREATE POLICY courses_staff_manage ON public.courses FOR ALL TO authenticated
  USING (public.can_manage_course(id)) WITH CHECK (public.can_manage_course(id));

CREATE POLICY modules_public_outline ON public.modules FOR SELECT TO anon
  USING (EXISTS (SELECT 1 FROM public.courses WHERE courses.id = modules.course_id AND courses.is_published));
CREATE POLICY modules_member_read ON public.modules FOR SELECT TO authenticated
  USING (public.can_access_course(course_id));
CREATE POLICY modules_staff_manage ON public.modules FOR ALL TO authenticated
  USING (public.can_manage_course(course_id)) WITH CHECK (public.can_manage_course(course_id));

CREATE POLICY lessons_member_read ON public.lessons FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.modules
    WHERE modules.id = lessons.module_id AND public.can_access_course(modules.course_id)
  ));
CREATE POLICY lessons_staff_manage ON public.lessons FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.modules
    WHERE modules.id = lessons.module_id AND public.can_manage_course(modules.course_id)
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.modules
    WHERE modules.id = lessons.module_id AND public.can_manage_course(modules.course_id)
  ));

-- Enrollment, progress and audit trail
CREATE POLICY enrollments_select_scope ON public.enrollments FOR SELECT TO authenticated
  USING (
    student_id = auth.uid()
    OR public.can_manage_course(course_id)
    OR public.has_any_role(ARRAY['auditor']::public.app_role[])
  );
CREATE POLICY enrollments_staff_manage ON public.enrollments FOR ALL TO authenticated
  USING (public.can_manage_course(course_id)) WITH CHECK (public.can_manage_course(course_id));

CREATE POLICY progress_student_select ON public.lesson_progress FOR SELECT TO authenticated
  USING (student_id = auth.uid() OR public.can_view_student(student_id));
CREATE POLICY progress_student_insert ON public.lesson_progress FOR INSERT TO authenticated
  WITH CHECK (student_id = auth.uid());
CREATE POLICY progress_student_update ON public.lesson_progress FOR UPDATE TO authenticated
  USING (student_id = auth.uid()) WITH CHECK (student_id = auth.uid());
CREATE POLICY progress_staff_manage ON public.lesson_progress FOR ALL TO authenticated
  USING (public.can_manage_student(student_id)) WITH CHECK (public.can_manage_student(student_id));

CREATE POLICY session_logs_student_select ON public.session_logs FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.can_view_student(user_id));
CREATE POLICY session_logs_student_insert ON public.session_logs FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY session_logs_student_update ON public.session_logs FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY activity_events_student_insert ON public.activity_events FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY activity_events_scope_read ON public.activity_events FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.can_view_student(user_id));

-- Assessments and practical work
CREATE POLICY assessments_member_read ON public.assessments FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.lessons
    JOIN public.modules ON modules.id = lessons.module_id
    WHERE lessons.id = assessments.lesson_id AND public.can_access_course(modules.course_id)
  ));
CREATE POLICY assessments_staff_manage ON public.assessments FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.lessons JOIN public.modules ON modules.id = lessons.module_id
    WHERE lessons.id = assessments.lesson_id AND public.can_manage_course(modules.course_id)
  )) WITH CHECK (EXISTS (
    SELECT 1 FROM public.lessons JOIN public.modules ON modules.id = lessons.module_id
    WHERE lessons.id = assessments.lesson_id AND public.can_manage_course(modules.course_id)
  ));

CREATE POLICY questions_member_read ON public.questions FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.assessments
    JOIN public.lessons ON lessons.id = assessments.lesson_id
    JOIN public.modules ON modules.id = lessons.module_id
    WHERE assessments.id = questions.assessment_id AND public.can_access_course(modules.course_id)
  ));
CREATE POLICY questions_staff_manage ON public.questions FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.assessments
    JOIN public.lessons ON lessons.id = assessments.lesson_id
    JOIN public.modules ON modules.id = lessons.module_id
    WHERE assessments.id = questions.assessment_id AND public.can_manage_course(modules.course_id)
  )) WITH CHECK (EXISTS (
    SELECT 1 FROM public.assessments
    JOIN public.lessons ON lessons.id = assessments.lesson_id
    JOIN public.modules ON modules.id = lessons.module_id
    WHERE assessments.id = questions.assessment_id AND public.can_manage_course(modules.course_id)
  ));

CREATE POLICY attempts_student_select ON public.assessment_attempts FOR SELECT TO authenticated
  USING (student_id = auth.uid() OR public.can_view_student(student_id));
CREATE POLICY attempts_student_insert ON public.assessment_attempts FOR INSERT TO authenticated
  WITH CHECK (student_id = auth.uid());
CREATE POLICY attempts_student_update ON public.assessment_attempts FOR UPDATE TO authenticated
  USING (student_id = auth.uid()) WITH CHECK (student_id = auth.uid());

CREATE POLICY assignments_member_read ON public.assignments FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.lessons JOIN public.modules ON modules.id = lessons.module_id
    WHERE lessons.id = assignments.lesson_id AND public.can_access_course(modules.course_id)
  ));
CREATE POLICY assignments_staff_manage ON public.assignments FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.lessons JOIN public.modules ON modules.id = lessons.module_id
    WHERE lessons.id = assignments.lesson_id AND public.can_manage_course(modules.course_id)
  )) WITH CHECK (EXISTS (
    SELECT 1 FROM public.lessons JOIN public.modules ON modules.id = lessons.module_id
    WHERE lessons.id = assignments.lesson_id AND public.can_manage_course(modules.course_id)
  ));

CREATE POLICY submissions_student_select ON public.assignment_submissions FOR SELECT TO authenticated
  USING (student_id = auth.uid() OR public.can_view_student(student_id));
CREATE POLICY submissions_student_insert ON public.assignment_submissions FOR INSERT TO authenticated
  WITH CHECK (student_id = auth.uid());
CREATE POLICY submissions_student_update_ungraded ON public.assignment_submissions FOR UPDATE TO authenticated
  USING (student_id = auth.uid() AND graded_at IS NULL)
  WITH CHECK (student_id = auth.uid() AND graded_at IS NULL);
CREATE POLICY submissions_staff_update ON public.assignment_submissions FOR UPDATE TO authenticated
  USING (public.can_manage_student(student_id)) WITH CHECK (public.can_manage_student(student_id));

-- Tutoring, forums and messages
CREATE POLICY tutoring_participants_read ON public.tutoring_sessions FOR SELECT TO authenticated
  USING (student_id = auth.uid() OR tutor_id = auth.uid() OR public.can_view_student(student_id));
CREATE POLICY tutoring_student_request ON public.tutoring_sessions FOR INSERT TO authenticated
  WITH CHECK (
    student_id = auth.uid()
    AND public.can_message_user(tutor_id)
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = tutor_id AND role IN ('tutor', 'profesor')
    )
  );
CREATE POLICY tutoring_tutor_manage ON public.tutoring_sessions FOR UPDATE TO authenticated
  USING (tutor_id = auth.uid() OR public.can_manage_student(student_id))
  WITH CHECK (tutor_id = auth.uid() OR public.can_manage_student(student_id));

CREATE POLICY forums_member_read ON public.forums FOR SELECT TO authenticated
  USING (public.can_access_course(course_id));
CREATE POLICY forums_staff_manage ON public.forums FOR ALL TO authenticated
  USING (public.can_manage_course(course_id)) WITH CHECK (public.can_manage_course(course_id));
CREATE POLICY forum_posts_member_read ON public.forum_posts FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.forums
    WHERE forums.id = forum_posts.forum_id AND public.can_access_course(forums.course_id)
  ));
CREATE POLICY forum_posts_member_insert ON public.forum_posts FOR INSERT TO authenticated
  WITH CHECK (
    author_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.forums
      WHERE forums.id = forum_posts.forum_id AND public.can_access_course(forums.course_id)
    )
  );
CREATE POLICY forum_posts_author_update ON public.forum_posts FOR UPDATE TO authenticated
  USING (author_id = auth.uid()) WITH CHECK (author_id = auth.uid());
CREATE POLICY forum_posts_staff_delete ON public.forum_posts FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.forums
    WHERE forums.id = forum_posts.forum_id AND public.can_manage_course(forums.course_id)
  ));

CREATE POLICY messages_participants_read ON public.messages FOR SELECT TO authenticated
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());
CREATE POLICY messages_sender_insert ON public.messages FOR INSERT TO authenticated
  WITH CHECK (sender_id = auth.uid() AND public.can_message_user(recipient_id));

-- Certificates are exposed only through the safe verification RPC below.
CREATE POLICY certificates_owner_read ON public.certificates FOR SELECT TO authenticated
  USING (student_id = auth.uid() OR public.can_manage_course(course_id));
CREATE POLICY certificates_staff_issue ON public.certificates FOR INSERT TO authenticated
  WITH CHECK (public.can_manage_course(course_id));

CREATE POLICY audit_exports_auditor_select ON public.audit_exports FOR SELECT TO authenticated
  USING (public.has_any_role(ARRAY['auditor', 'admin_academico', 'superadmin']::public.app_role[]));
CREATE POLICY audit_exports_auditor_insert ON public.audit_exports FOR INSERT TO authenticated
  WITH CHECK (
    requested_by = auth.uid()
    AND public.has_any_role(ARRAY['auditor', 'admin_academico', 'superadmin']::public.app_role[])
  );

-- Privacy and retention
CREATE POLICY consent_owner_read ON public.consent_records FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_any_role(ARRAY['admin_academico', 'superadmin', 'auditor']::public.app_role[]));
CREATE POLICY consent_owner_insert ON public.consent_records FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY privacy_versions_public_read ON public.privacy_policy_versions FOR SELECT TO anon, authenticated
  USING (effective_date <= NOW());
CREATE POLICY privacy_versions_admin_manage ON public.privacy_policy_versions FOR ALL TO authenticated
  USING (public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[]))
  WITH CHECK (public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[]));
CREATE POLICY deletion_requests_owner_read ON public.data_deletion_requests FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[]));
CREATE POLICY deletion_requests_owner_insert ON public.data_deletion_requests FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY deletion_requests_admin_update ON public.data_deletion_requests FOR UPDATE TO authenticated
  USING (public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[]))
  WITH CHECK (public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[]));
CREATE POLICY retention_admin_read ON public.data_retention_policies FOR SELECT TO authenticated
  USING (public.has_any_role(ARRAY['admin_academico', 'superadmin', 'auditor']::public.app_role[]));
CREATE POLICY retention_admin_manage ON public.data_retention_policies FOR ALL TO authenticated
  USING (public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[]))
  WITH CHECK (public.has_any_role(ARRAY['admin_academico', 'superadmin']::public.app_role[]));

-- ---------------------------------------------------------------------------
-- Correct policies introduced by the skill graph and AI migrations.
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "Public read course_versions" ON public.course_versions;
DROP POLICY IF EXISTS "Students view own skills" ON public.student_skills;
DROP POLICY IF EXISTS "Students view own skill evidence" ON public.skill_evidence;
DROP POLICY IF EXISTS "Users view own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Public read knowledge chunks" ON public.course_knowledge_chunks;
DROP POLICY IF EXISTS "Students view own AI practice reviews" ON public.ai_practice_reviews;
DROP POLICY IF EXISTS "Students manage own study plans" ON public.ai_study_plans;

CREATE POLICY course_versions_active_read ON public.course_versions FOR SELECT TO authenticated
  USING (is_active = TRUE AND public.can_access_course(course_id));
CREATE POLICY course_versions_staff_manage ON public.course_versions FOR ALL TO authenticated
  USING (public.can_manage_course(course_id)) WITH CHECK (public.can_manage_course(course_id));
CREATE POLICY student_skills_scope_read ON public.student_skills FOR SELECT TO authenticated
  USING (student_id = auth.uid() OR public.can_view_student(student_id));
CREATE POLICY student_skills_staff_manage ON public.student_skills FOR ALL TO authenticated
  USING (public.can_manage_student(student_id)) WITH CHECK (public.can_manage_student(student_id));
CREATE POLICY skill_evidence_scope_read ON public.skill_evidence FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.student_skills
    WHERE student_skills.id = skill_evidence.student_skill_id
      AND public.can_view_student(student_skills.student_id)
  ));
CREATE POLICY skill_evidence_staff_manage ON public.skill_evidence FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.student_skills
    WHERE student_skills.id = skill_evidence.student_skill_id
      AND public.can_manage_student(student_skills.student_id)
  )) WITH CHECK (EXISTS (
    SELECT 1 FROM public.student_skills
    WHERE student_skills.id = skill_evidence.student_skill_id
      AND public.can_manage_student(student_skills.student_id)
  ));
CREATE POLICY notifications_owner_read ON public.notifications FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY notifications_owner_update ON public.notifications FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY notifications_staff_insert ON public.notifications FOR INSERT TO authenticated
  WITH CHECK (public.can_view_student(user_id));

CREATE POLICY knowledge_chunks_member_read ON public.course_knowledge_chunks FOR SELECT TO authenticated
  USING (course_id IS NOT NULL AND public.can_access_course(course_id));
CREATE POLICY knowledge_chunks_staff_manage ON public.course_knowledge_chunks FOR ALL TO authenticated
  USING (course_id IS NOT NULL AND public.can_manage_course(course_id))
  WITH CHECK (course_id IS NOT NULL AND public.can_manage_course(course_id));
CREATE POLICY ai_reviews_scope_read ON public.ai_practice_reviews FOR SELECT TO authenticated
  USING (student_id = auth.uid() OR public.can_view_student(student_id));
CREATE POLICY ai_reviews_staff_manage ON public.ai_practice_reviews FOR ALL TO authenticated
  USING (public.can_manage_student(student_id)) WITH CHECK (public.can_manage_student(student_id));
CREATE POLICY study_plans_owner_all ON public.ai_study_plans FOR ALL TO authenticated
  USING (student_id = auth.uid()) WITH CHECK (student_id = auth.uid());
CREATE POLICY study_plans_staff_read ON public.ai_study_plans FOR SELECT TO authenticated
  USING (public.can_view_student(student_id));

-- ---------------------------------------------------------------------------
-- Safe public certificate verification. No DNI, email or internal UUIDs exposed.
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.verify_certificate(p_code TEXT)
RETURNS TABLE (
  code TEXT,
  student_name TEXT,
  course_title TEXT,
  total_active_hours NUMERIC,
  issued_at TIMESTAMPTZ,
  verification_url TEXT,
  hash_signature TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    certificate.code,
    profile.full_name,
    course.title,
    certificate.total_active_hours,
    certificate.issued_at,
    certificate.verification_url,
    certificate.hash_signature
  FROM public.certificates AS certificate
  JOIN public.profiles AS profile ON profile.id = certificate.student_id
  JOIN public.courses AS course ON course.id = certificate.course_id
  WHERE certificate.code = p_code
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.verify_certificate(TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.verify_certificate(TEXT) TO service_role;

-- Private storage buckets. Objects use `{owner-or-course-uuid}/filename` paths.
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('practice-evidence', 'practice-evidence', FALSE),
  ('course-resources', 'course-resources', FALSE),
  ('certificates', 'certificates', FALSE)
ON CONFLICT (id) DO UPDATE SET public = FALSE;

CREATE POLICY practice_evidence_owner_insert ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'practice-evidence'
    AND (storage.foldername(name))[1] = auth.uid()::TEXT
  );
CREATE POLICY practice_evidence_scope_read ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'practice-evidence'
    AND (
      (storage.foldername(name))[1] = auth.uid()::TEXT
      OR (
        (storage.foldername(name))[1] ~* '^[0-9a-f-]{36}$'
        AND public.can_view_student(((storage.foldername(name))[1])::UUID)
      )
    )
  );
CREATE POLICY practice_evidence_owner_update ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'practice-evidence' AND (storage.foldername(name))[1] = auth.uid()::TEXT)
  WITH CHECK (bucket_id = 'practice-evidence' AND (storage.foldername(name))[1] = auth.uid()::TEXT);
CREATE POLICY practice_evidence_owner_delete ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'practice-evidence' AND (storage.foldername(name))[1] = auth.uid()::TEXT);

CREATE POLICY course_resources_member_read ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'course-resources'
    AND (storage.foldername(name))[1] ~* '^[0-9a-f-]{36}$'
    AND public.can_access_course(((storage.foldername(name))[1])::UUID)
  );
CREATE POLICY course_resources_staff_manage ON storage.objects FOR ALL TO authenticated
  USING (
    bucket_id = 'course-resources'
    AND (storage.foldername(name))[1] ~* '^[0-9a-f-]{36}$'
    AND public.can_manage_course(((storage.foldername(name))[1])::UUID)
  )
  WITH CHECK (
    bucket_id = 'course-resources'
    AND (storage.foldername(name))[1] ~* '^[0-9a-f-]{36}$'
    AND public.can_manage_course(((storage.foldername(name))[1])::UUID)
  );

CREATE POLICY certificate_files_owner_read ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'certificates' AND (storage.foldername(name))[1] = auth.uid()::TEXT);

COMMENT ON TABLE public.course_staff IS
  'Scopes teachers and tutors to the courses they are allowed to manage.';
COMMENT ON FUNCTION public.verify_certificate(TEXT) IS
  'Returns only the public fields required to verify a certificate.';

-- Students can read question wording and options, never the answer key.
REVOKE SELECT ON public.questions FROM authenticated;
GRANT SELECT (id, assessment_id, question_text, question_type, options_json, points)
  ON public.questions TO authenticated;

CREATE OR REPLACE FUNCTION public.submit_assessment_attempt(
  p_assessment_id UUID,
  p_answers JSONB
)
RETURNS TABLE (attempt_id UUID, score INT, passed BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_course_id UUID;
  target_passing_score INT;
  total_points INT;
  earned_points INT;
  final_score INT;
  new_attempt_id UUID;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;

  SELECT modules.course_id, assessments.passing_score
    INTO target_course_id, target_passing_score
  FROM public.assessments
  JOIN public.lessons ON lessons.id = assessments.lesson_id
  JOIN public.modules ON modules.id = lessons.module_id
  WHERE assessments.id = p_assessment_id;

  IF target_course_id IS NULL OR NOT public.can_access_course(target_course_id) THEN
    RAISE EXCEPTION 'Assessment not available' USING ERRCODE = '42501';
  END IF;

  SELECT
    COALESCE(SUM(question.points), 0),
    COALESCE(SUM(
      CASE
        WHEN question.correct_answer_json = COALESCE(p_answers -> question.id::TEXT, 'null'::JSONB)
          THEN question.points
        WHEN question.correct_answer_json -> 'value' = COALESCE(p_answers -> question.id::TEXT, 'null'::JSONB)
          THEN question.points
        ELSE 0
      END
    ), 0)
  INTO total_points, earned_points
  FROM public.questions AS question
  WHERE question.assessment_id = p_assessment_id;

  IF total_points <= 0 THEN
    RAISE EXCEPTION 'Assessment has no scored questions';
  END IF;

  final_score := ROUND((earned_points::NUMERIC / total_points::NUMERIC) * 100)::INT;

  INSERT INTO public.assessment_attempts (
    student_id,
    assessment_id,
    submitted_at,
    score,
    passed,
    answers_json
  )
  VALUES (
    auth.uid(),
    p_assessment_id,
    NOW(),
    final_score,
    final_score >= target_passing_score,
    p_answers
  )
  RETURNING id INTO new_attempt_id;

  RETURN QUERY SELECT new_attempt_id, final_score, final_score >= target_passing_score;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_assessment_attempt(UUID, JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_assessment_attempt(UUID, JSONB) TO authenticated;

CREATE OR REPLACE FUNCTION public.get_forum_feed(p_forum_id UUID)
RETURNS TABLE (
  id UUID,
  author_id UUID,
  author_name TEXT,
  title TEXT,
  content TEXT,
  parent_id UUID,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_course_id UUID;
BEGIN
  SELECT forums.course_id INTO target_course_id
  FROM public.forums
  WHERE forums.id = p_forum_id;

  IF target_course_id IS NULL OR NOT public.can_access_course(target_course_id) THEN
    RAISE EXCEPTION 'Forum not available' USING ERRCODE = '42501';
  END IF;

  RETURN QUERY
  SELECT
    post.id,
    post.author_id,
    profile.full_name,
    post.title,
    post.content,
    post.parent_id,
    post.created_at
  FROM public.forum_posts AS post
  JOIN public.profiles AS profile ON profile.id = post.author_id
  WHERE post.forum_id = p_forum_id
  ORDER BY post.created_at DESC;
END;
$$;

REVOKE ALL ON FUNCTION public.get_forum_feed(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_forum_feed(UUID) TO authenticated;

-- Sensitive academic evidence is mutated only by authenticated server routes or
-- the grading RPC. This prevents browser clients from forging hours, grades,
-- completion records, audit events, or certificate signatures.
REVOKE INSERT, UPDATE, DELETE ON public.session_logs FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.activity_events FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.lesson_progress FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.assessment_attempts FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.assignment_submissions FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.certificates FROM authenticated;
