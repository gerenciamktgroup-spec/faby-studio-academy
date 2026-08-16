-- ===========================================================================
-- FABY STUDIO ACADEMY - MIGRATION 5: STAGING SECURITY CORRECTIONS & HARDENING
-- ===========================================================================
-- 1. Add course-level min_active_hours_pct (default 0.80 = 80%)
-- 2. Drop vulnerable roles_admin_all policy on public.user_roles
-- 3. Block direct INSERT/UPDATE/DELETE on public.user_roles for all client roles
-- 4. Enforce immutable consent_records (revoke UPDATE/DELETE)
-- 5. Drop deprecated verify_certificate RPC function in favor of cryptographic HMAC service
-- ===========================================================================

-- 1. Course Active Hours Configuration
ALTER TABLE public.courses
ADD COLUMN IF NOT EXISTS min_active_hours_pct NUMERIC(4, 2) NOT NULL DEFAULT 0.80
CHECK (min_active_hours_pct > 0.00 AND min_active_hours_pct <= 1.00);

COMMENT ON COLUMN public.courses.min_active_hours_pct IS 'Porcentaje mínimo de horas activas requeridas para emitir el certificado (ej. 0.80 = 80%).';

-- 2. Drop vulnerable user_roles policies
DROP POLICY IF EXISTS roles_admin_all ON public.user_roles;
DROP POLICY IF EXISTS roles_authenticated_all ON public.user_roles;

-- Ensure SELECT policies on user_roles remain safe
DROP POLICY IF EXISTS roles_select_own ON public.user_roles;
CREATE POLICY roles_select_own ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS roles_auditor_admin_read ON public.user_roles;
CREATE POLICY roles_auditor_admin_read ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_any_role(ARRAY['auditor', 'admin_academico', 'superadmin']::public.app_role[]));

-- 3. Revoke all direct write operations on public.user_roles from anon and authenticated
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated, PUBLIC;
GRANT SELECT ON public.user_roles TO authenticated;

-- 4. Hardening consent_records (append-only, immutable)
DROP POLICY IF EXISTS consent_owner_insert ON public.consent_records;
DROP POLICY IF EXISTS consent_owner_all ON public.consent_records;

-- Users can read their own consent records; auditors/admins can read for compliance audit
DROP POLICY IF EXISTS consent_owner_read ON public.consent_records;
CREATE POLICY consent_owner_read ON public.consent_records
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_any_role(ARRAY['auditor', 'admin_academico', 'superadmin']::public.app_role[]));

-- Authenticated users can insert their own consent records
CREATE POLICY consent_owner_insert ON public.consent_records
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Revoke UPDATE and DELETE on consent_records to guarantee immutability
REVOKE UPDATE, DELETE ON public.consent_records FROM anon, authenticated, PUBLIC;
GRANT SELECT, INSERT ON public.consent_records TO authenticated;

-- 5. Drop deprecated verify_certificate RPC
DROP FUNCTION IF EXISTS public.verify_certificate(TEXT);

-- 6. Ensure column privileges on questions
REVOKE ALL ON public.questions FROM anon;
GRANT SELECT (id, assessment_id, question_text, question_type, options_json, points)
  ON public.questions TO authenticated;
REVOKE SELECT (correct_answer_json) ON public.questions FROM authenticated, anon, PUBLIC;

-- 7. Add index for consent_records lookups
CREATE INDEX IF NOT EXISTS idx_consent_records_user_version
  ON public.consent_records(user_id, consent_type, version);
