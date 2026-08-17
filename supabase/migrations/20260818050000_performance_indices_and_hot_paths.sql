-- Migration 9: 20260818050000_performance_indices_and_hot_paths.sql
-- Purpose: Complete hot-path index coverage and provide generic rate-limiting infrastructure for audit closure.

-- 1. Hot Path Performance Indices
CREATE INDEX IF NOT EXISTS idx_session_logs_user_course
ON public.session_logs (user_id, course_id);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_student_status_lesson
ON public.lesson_progress (student_id, status, lesson_id);

CREATE INDEX IF NOT EXISTS idx_assignment_submissions_student_assignment
ON public.assignment_submissions (student_id, assignment_id);

CREATE INDEX IF NOT EXISTS idx_assessment_attempts_student_assessment
ON public.assessment_attempts (student_id, assessment_id);

-- 2. Generic Bucket-Key Rate Limiting Table
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket TEXT NOT NULL,
  bucket_key TEXT NOT NULL,
  attempts_count INT NOT NULL DEFAULT 1,
  window_started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_rate_limits_bucket_key UNIQUE (bucket, bucket_key)
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup
ON public.rate_limits (bucket, bucket_key);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.rate_limits FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.rate_limits TO service_role;

-- 3. Generic Rate Limiting Transaction Function
CREATE OR REPLACE FUNCTION public.consume_generic_rate_limit(
  p_bucket TEXT,
  p_key TEXT,
  p_max_attempts INT,
  p_window_seconds INT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_now TIMESTAMPTZ := now();
  v_window_start TIMESTAMPTZ;
  v_count INT;
BEGIN
  IF p_bucket IS NULL OR btrim(p_bucket) = '' OR p_key IS NULL OR btrim(p_key) = '' THEN
    RETURN FALSE;
  END IF;

  SELECT window_started_at, attempts_count
  INTO v_window_start, v_count
  FROM public.rate_limits
  WHERE bucket = p_bucket AND bucket_key = p_key
  FOR UPDATE;

  IF NOT FOUND THEN
    INSERT INTO public.rate_limits (bucket, bucket_key, attempts_count, window_started_at, updated_at)
    VALUES (p_bucket, p_key, 1, v_now, v_now);
    RETURN TRUE;
  END IF;

  IF v_now > v_window_start + (p_window_seconds || ' seconds')::INTERVAL THEN
    UPDATE public.rate_limits
    SET attempts_count = 1,
        window_started_at = v_now,
        updated_at = v_now
    WHERE bucket = p_bucket AND bucket_key = p_key;
    RETURN TRUE;
  END IF;

  IF v_count >= p_max_attempts THEN
    RETURN FALSE;
  END IF;

  UPDATE public.rate_limits
  SET attempts_count = attempts_count + 1,
      updated_at = v_now
  WHERE bucket = p_bucket AND bucket_key = p_key;

  RETURN TRUE;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.consume_generic_rate_limit(TEXT, TEXT, INT, INT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_generic_rate_limit(TEXT, TEXT, INT, INT) TO service_role;

-- 4. Update Security Catalog Audit RPC to inspect 9 migrations and indices
CREATE OR REPLACE FUNCTION public.security_catalog_audit()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, storage, supabase_migrations, pg_temp
AS $$
DECLARE
  migration_versions JSONB;
  public_tables JSONB;
  policies JSONB;
  table_grants JSONB;
  column_grants JSONB;
  functions JSONB;
  function_grants JSONB;
  triggers JSONB;
  buckets JSONB;
  hot_path_indices JSONB;
  legal_hash_mismatches INTEGER;
BEGIN
  SELECT COALESCE(jsonb_agg(version ORDER BY version), '[]'::JSONB)
  INTO migration_versions
  FROM supabase_migrations.schema_migrations;

  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'table', class.relname,
    'rls', class.relrowsecurity,
    'force_rls', class.relforcerowsecurity
  ) ORDER BY class.relname), '[]'::JSONB)
  INTO public_tables
  FROM pg_class AS class
  JOIN pg_namespace AS namespace ON namespace.oid = class.relnamespace
  WHERE namespace.nspname = 'public' AND class.relkind IN ('r', 'p');

  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'schema', schemaname,
    'table', tablename,
    'name', policyname,
    'command', cmd,
    'roles', roles,
    'qual', qual,
    'check', with_check
  ) ORDER BY schemaname, tablename, policyname), '[]'::JSONB)
  INTO policies
  FROM pg_policies
  WHERE schemaname IN ('public', 'storage');

  SELECT COALESCE(jsonb_agg(to_jsonb(grant_row)), '[]'::JSONB)
  INTO table_grants
  FROM (
    SELECT table_schema, table_name, grantee, privilege_type
    FROM information_schema.table_privileges
    WHERE table_schema IN ('public', 'storage')
    ORDER BY table_schema, table_name, grantee, privilege_type
  ) AS grant_row;

  SELECT COALESCE(jsonb_agg(to_jsonb(grant_row)), '[]'::JSONB)
  INTO column_grants
  FROM (
    SELECT table_schema, table_name, column_name, grantee, privilege_type
    FROM information_schema.column_privileges
    WHERE table_schema = 'public'
    ORDER BY table_name, column_name, grantee, privilege_type
  ) AS grant_row;

  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'name', procedure.proname,
    'identity_arguments', pg_get_function_identity_arguments(procedure.oid),
    'security_definer', procedure.prosecdef,
    'config', procedure.proconfig
  ) ORDER BY procedure.proname, pg_get_function_identity_arguments(procedure.oid)), '[]'::JSONB)
  INTO functions
  FROM pg_proc AS procedure
  JOIN pg_namespace AS namespace ON namespace.oid = procedure.pronamespace
  WHERE namespace.nspname = 'public';

  SELECT COALESCE(jsonb_agg(to_jsonb(grant_row)), '[]'::JSONB)
  INTO function_grants
  FROM (
    SELECT routine_schema, routine_name, grantee, privilege_type
    FROM information_schema.routine_privileges
    WHERE routine_schema = 'public'
    ORDER BY routine_name, grantee
  ) AS grant_row;

  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'table', class.relname,
    'name', trigger.tgname,
    'enabled', trigger.tgenabled
  ) ORDER BY class.relname, trigger.tgname), '[]'::JSONB)
  INTO triggers
  FROM pg_trigger AS trigger
  JOIN pg_class AS class ON class.oid = trigger.tgrelid
  JOIN pg_namespace AS namespace ON namespace.oid = class.relnamespace
  WHERE namespace.nspname = 'public' AND NOT trigger.tgisinternal;

  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'id', id, 'public', public, 'file_size_limit', file_size_limit
  ) ORDER BY id), '[]'::JSONB)
  INTO buckets
  FROM storage.buckets;

  SELECT COALESCE(jsonb_agg(indexname), '[]'::JSONB)
  INTO hot_path_indices
  FROM pg_indexes
  WHERE schemaname = 'public';

  SELECT COUNT(*) INTO legal_hash_mismatches
  FROM public.legal_document_versions
  WHERE content_sha256 <> encode(
    extensions.digest(convert_to(content_text, 'UTF8'), 'sha256'), 'hex'
  );

  RETURN jsonb_build_object(
    'migrations', migration_versions,
    'public_tables', public_tables,
    'policies', policies,
    'table_grants', table_grants,
    'column_grants', column_grants,
    'functions', functions,
    'function_grants', function_grants,
    'triggers', triggers,
    'buckets', buckets,
    'hot_path_indices', hot_path_indices,
    'legal_hash_mismatches', legal_hash_mismatches
  );
END;
$$;

REVOKE ALL ON FUNCTION public.security_catalog_audit() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.security_catalog_audit() TO service_role;
