-- ============================================================================
-- FABY STUDIO ACADEMY — Migration: Faby Skill Graph, Evidence Engine & Living Curriculum
-- Target: Supabase / PostgreSQL 15+
-- ============================================================================

-- 1. ENUMS FOR SKILL GRAPH & LIVING CURRICULUM
DO $$ BEGIN
  CREATE TYPE public.skill_category AS ENUM ('unas', 'pestanas', 'cosmetologia', 'bioseguridad', 'negocio');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.skill_level AS ENUM ('fundamentos', 'intermedio', 'avanzado', 'master');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.evidence_confidence AS ENUM ('low', 'medium', 'high', 'expert');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.retention_risk_level AS ENUM ('low', 'medium', 'high');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 2. SKILLS TAXONOMY
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category public.skill_category NOT NULL,
  level public.skill_level NOT NULL DEFAULT 'fundamentos',
  description TEXT NOT NULL,
  icon TEXT DEFAULT 'Sparkles',
  required_points INT NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course & Lesson Mapping to Skills
CREATE TABLE IF NOT EXISTS public.course_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  weight NUMERIC(3,2) NOT NULL DEFAULT 1.00,
  UNIQUE(course_id, skill_id)
);

CREATE TABLE IF NOT EXISTS public.lesson_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  points_granted INT NOT NULL DEFAULT 20,
  UNIQUE(lesson_id, skill_id)
);

-- 3. STUDENT SKILLS PROFICIENCY
CREATE TABLE IF NOT EXISTS public.student_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  proficiency_score INT NOT NULL DEFAULT 0 CHECK (proficiency_score BETWEEN 0 AND 100),
  confidence_level public.evidence_confidence NOT NULL DEFAULT 'low',
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  verified_by UUID REFERENCES public.profiles(id),
  verified_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, skill_id)
);

-- 4. MULTI-FACTOR SKILL EVIDENCE ENGINE
CREATE TABLE IF NOT EXISTS public.skill_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_skill_id UUID NOT NULL REFERENCES public.student_skills(id) ON DELETE CASCADE,
  evidence_type TEXT NOT NULL CHECK (evidence_type IN ('theory_completion', 'quiz_score', 'photo_submission', 'rubric_evaluation', 'final_project')),
  reference_id TEXT NOT NULL,
  score_obtained INT NOT NULL DEFAULT 0,
  max_score INT NOT NULL DEFAULT 100,
  feedback_notes TEXT,
  verified_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. LIVING CURRICULUM & COURSE VERSIONING
CREATE TABLE IF NOT EXISTS public.course_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  version_tag TEXT NOT NULL, -- e.g. 'v1.0', 'v1.1', 'v2.0'
  changelog_notes TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES public.profiles(id),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. IN-APP LIVING NOTIFICATION CENTER
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'general' CHECK (type IN ('general', 'feedback', 'tutoring', 'streak', 'certificate', 'alert')),
  link_url TEXT,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Public can view all skills taxonomy and course versions
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (TRUE);
CREATE POLICY "Public read course_skills" ON public.course_skills FOR SELECT USING (TRUE);
CREATE POLICY "Public read lesson_skills" ON public.lesson_skills FOR SELECT USING (TRUE);
CREATE POLICY "Public read course_versions" ON public.course_versions FOR SELECT USING (TRUE);

-- Students manage and view own skills and evidence; Teachers & Admins can review
CREATE POLICY "Students view own skills" ON public.student_skills FOR SELECT
  USING (student_id = auth.uid() OR public.is_auditor_or_admin(auth.uid()));

CREATE POLICY "Students view own skill evidence" ON public.skill_evidence FOR SELECT
  USING (
    student_skill_id IN (SELECT id FROM public.student_skills WHERE student_id = auth.uid())
    OR public.is_auditor_or_admin(auth.uid())
  );

CREATE POLICY "Users view own notifications" ON public.notifications FOR ALL
  USING (user_id = auth.uid());
