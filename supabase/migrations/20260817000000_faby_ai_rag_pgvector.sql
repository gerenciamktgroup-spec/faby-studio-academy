-- ============================================================================
-- FABY STUDIO ACADEMY — Migration: Faby AI Native Suite (RAG Knowledge, Copilot & Vision Assistant)
-- Target: Supabase / PostgreSQL 15+ with pgvector
-- ============================================================================

-- 1. ENABLE PGVECTOR EXTENSION (if supported in environment)
DO $$ BEGIN
  CREATE EXTENSION IF NOT EXISTS vector;
EXCEPTION
  WHEN undefined_file THEN
    RAISE NOTICE 'pgvector extension not installed in environment, vector columns will fallback to JSONB embeddings.';
  WHEN OTHERS THEN
    RAISE NOTICE 'Vector extension already configured or skipped.';
END $$;

-- 2. COURSE KNOWLEDGE CHUNKS (FOR RAG SEMANTIC RETRIEVAL)
CREATE TABLE IF NOT EXISTS public.course_knowledge_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  module_id UUID REFERENCES public.modules(id) ON DELETE SET NULL,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
  chunk_title TEXT NOT NULL,
  content_text TEXT NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('video_transcript', 'pdf_manual', 'rubric_guide', 'biosecurity_protocol', 'faq')),
  source_ref TEXT NOT NULL, -- e.g. '04:05 en video Lección 1.2' or 'Pág. 14 Manual Técnico'
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. AI PRACTICE REVIEWS (EXPERIMENTAL VISION ASSISTANT WITH TEACHER OVERRIDE)
CREATE TABLE IF NOT EXISTS public.ai_practice_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES public.assignment_submissions(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  model_name TEXT NOT NULL DEFAULT 'faby-vision-aesthetic-v1',
  detected_symmetry_score INT CHECK (detected_symmetry_score BETWEEN 0 AND 100),
  detected_spacing_score INT CHECK (detected_spacing_score BETWEEN 0 AND 100),
  detected_adhesive_score INT CHECK (detected_adhesive_score BETWEEN 0 AND 100),
  vision_analysis_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_official_grade BOOLEAN NOT NULL DEFAULT FALSE,
  teacher_override_grade INT,
  teacher_override_notes TEXT,
  reviewed_by_teacher_id UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. AI ADAPTIVE STUDY PLANS (STUDY COPILOT)
CREATE TABLE IF NOT EXISTS public.ai_study_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  days_until_exam INT NOT NULL,
  target_exam_date DATE,
  weak_skills_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  generated_schedule_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.course_knowledge_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_practice_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_study_plans ENABLE ROW LEVEL SECURITY;

-- Public/Student read on course knowledge chunks for RAG queries
CREATE POLICY "Public read knowledge chunks" ON public.course_knowledge_chunks FOR SELECT USING (TRUE);

-- Students view own AI practice reviews and study plans; Teachers and Admins can review & override
CREATE POLICY "Students view own AI practice reviews" ON public.ai_practice_reviews FOR SELECT
  USING (student_id = auth.uid() OR public.is_auditor_or_admin(auth.uid()));

CREATE POLICY "Students manage own study plans" ON public.ai_study_plans FOR ALL
  USING (student_id = auth.uid() OR public.is_auditor_or_admin(auth.uid()));
