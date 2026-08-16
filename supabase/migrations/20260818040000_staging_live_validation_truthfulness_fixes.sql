-- ===========================================================================
-- FABY STUDIO ACADEMY — 8ª MIGRACIÓN: VALIDACIÓN LIVE SIN FALSOS POSITIVOS
-- Migration: 20260818040000_staging_live_validation_truthfulness_fixes.sql
-- ===========================================================================

-- 1. VERSIONES LEGALES DE PREVIEW: NO REESCRIBIR VERSIONES YA PUBLICADAS.
-- Estos textos describen exclusivamente un entorno privado de pruebas. No
-- constituyen una declaración de acreditación ni de cumplimiento normativo.
INSERT INTO public.legal_document_versions (
  document_type, version, title, content_text, content_sha256, effective_from
)
VALUES
  (
    'terms',
    '2026.2',
    'Condiciones de uso de la preview privada — Faby Studio Academy',
    'FABY STUDIO ACADEMY — PREVIEW PRIVADA v2026.2. Este entorno se encuentra en validación técnica y solo puede utilizarse con cuentas autorizadas y datos sintéticos. No procesa pagos reales. Los certificados generados en esta preview son comprobantes técnicos de prueba y no representan una titulación oficial, una acreditación administrativa ni el reconocimiento de una entidad pública. El acceso es personal e intransferible. La actividad de prueba puede registrarse para verificar seguridad, funcionamiento y trazabilidad del sistema.',
    encode(extensions.digest(convert_to('FABY STUDIO ACADEMY — PREVIEW PRIVADA v2026.2. Este entorno se encuentra en validación técnica y solo puede utilizarse con cuentas autorizadas y datos sintéticos. No procesa pagos reales. Los certificados generados en esta preview son comprobantes técnicos de prueba y no representan una titulación oficial, una acreditación administrativa ni el reconocimiento de una entidad pública. El acceso es personal e intransferible. La actividad de prueba puede registrarse para verificar seguridad, funcionamiento y trazabilidad del sistema.', 'UTF8'), 'sha256'), 'hex'),
    NOW()
  ),
  (
    'privacy_policy',
    '2026.2',
    'Aviso de privacidad de la preview privada — Faby Studio Academy',
    'FABY STUDIO ACADEMY — AVISO DE PRIVACIDAD PARA PRUEBAS v2026.2. Esta preview privada no debe utilizarse con datos personales reales. El registro público permanece deshabilitado hasta que la entidad responsable publique su identidad, datos de contacto y la información legal aplicable. Las cuentas de validación son sintéticas y se usan para probar autenticación, control de acceso, actividad académica y emisión técnica de certificados. Para consultas sobre los datos de prueba escriba a privacidad@fabystudio.academy. Este aviso no declara cumplimiento RGPD, acreditación SEPE/FUNDAE ni conformidad con la Orden TMS/369/2019.',
    encode(extensions.digest(convert_to('FABY STUDIO ACADEMY — AVISO DE PRIVACIDAD PARA PRUEBAS v2026.2. Esta preview privada no debe utilizarse con datos personales reales. El registro público permanece deshabilitado hasta que la entidad responsable publique su identidad, datos de contacto y la información legal aplicable. Las cuentas de validación son sintéticas y se usan para probar autenticación, control de acceso, actividad académica y emisión técnica de certificados. Para consultas sobre los datos de prueba escriba a privacidad@fabystudio.academy. Este aviso no declara cumplimiento RGPD, acreditación SEPE/FUNDAE ni conformidad con la Orden TMS/369/2019.', 'UTF8'), 'sha256'), 'hex'),
    NOW()
  )
ON CONFLICT (document_type, version) DO NOTHING;

-- Toda versión publicada es inmutable, incluidos título y fechas.
CREATE OR REPLACE FUNCTION public.trg_prevent_legal_document_mutation()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  RAISE EXCEPTION
    'Operación no permitida: una versión legal publicada no admite UPDATE ni DELETE; publique una versión nueva.';
END;
$$;

DROP TRIGGER IF EXISTS trg_legal_doc_protect ON public.legal_document_versions;
CREATE TRIGGER trg_legal_doc_protect
  BEFORE UPDATE OR DELETE ON public.legal_document_versions
  FOR EACH ROW EXECUTE FUNCTION public.trg_prevent_legal_document_mutation();

-- Normalizar el nombre legacy antes de completar el backfill.
UPDATE public.consent_records
SET consent_type = 'privacy_policy'
WHERE consent_type = 'privacy';

UPDATE public.consent_records AS consent
SET legal_version_id = legal.id
FROM public.legal_document_versions AS legal
WHERE consent.consent_type = legal.document_type
  AND consent.version = legal.version
  AND consent.legal_version_id IS NULL;

DO $$
DECLARE
  missing_links INTEGER;
BEGIN
  SELECT COUNT(*) INTO missing_links
  FROM public.consent_records
  WHERE legal_version_id IS NULL;

  IF missing_links > 0 THEN
    RAISE EXCEPTION
      'No se puede exigir legal_version_id: existen % consentimientos sin versión legal vinculada.',
      missing_links;
  END IF;
END;
$$;

ALTER TABLE public.consent_records
  ALTER COLUMN legal_version_id SET NOT NULL;

-- 2. CONSENTIMIENTO IDEMPOTENTE TAMBIÉN BAJO CONCURRENCIA.
CREATE OR REPLACE FUNCTION public.record_user_legal_consents(
  p_user_id UUID,
  p_ip_hash TEXT,
  p_user_agent TEXT,
  p_terms_version TEXT DEFAULT '2026.2',
  p_privacy_version TEXT DEFAULT '2026.2'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
  terms_doc public.legal_document_versions%ROWTYPE;
  privacy_doc public.legal_document_versions%ROWTYPE;
  terms_id UUID;
  privacy_id UUID;
  inserted_terms BOOLEAN := FALSE;
  inserted_privacy BOOLEAN := FALSE;
  is_test_identity BOOLEAN := FALSE;
BEGIN
  IF p_ip_hash !~ '^[0-9a-f]{64}$' THEN
    RAISE EXCEPTION 'El hash de IP debe ser SHA-256 hexadecimal.';
  END IF;

  -- Un mismo usuario y par de versiones solo puede registrarse por una
  -- transacción a la vez, incluso si todavía no existen filas que bloquear.
  PERFORM pg_advisory_xact_lock(
    hashtextextended(
      'legal-consent:' || p_user_id::TEXT || ':' || p_terms_version || ':' || p_privacy_version,
      0
    )
  );

  SELECT * INTO STRICT terms_doc
  FROM public.legal_document_versions
  WHERE document_type = 'terms' AND version = p_terms_version;

  SELECT * INTO STRICT privacy_doc
  FROM public.legal_document_versions
  WHERE document_type = 'privacy_policy' AND version = p_privacy_version;

  INSERT INTO public.consent_records (
    user_id, consent_type, version, legal_version_id, ip_hash, user_agent, granted_at
  )
  VALUES (
    p_user_id, 'terms', p_terms_version, terms_doc.id, p_ip_hash,
    LEFT(COALESCE(p_user_agent, 'unknown'), 512), NOW()
  )
  ON CONFLICT (user_id, consent_type, version) DO NOTHING
  RETURNING id INTO terms_id;
  inserted_terms := terms_id IS NOT NULL;

  IF terms_id IS NULL THEN
    SELECT id INTO STRICT terms_id
    FROM public.consent_records
    WHERE user_id = p_user_id
      AND consent_type = 'terms'
      AND version = p_terms_version;
  END IF;

  INSERT INTO public.consent_records (
    user_id, consent_type, version, legal_version_id, ip_hash, user_agent, granted_at
  )
  VALUES (
    p_user_id, 'privacy_policy', p_privacy_version, privacy_doc.id, p_ip_hash,
    LEFT(COALESCE(p_user_agent, 'unknown'), 512), NOW()
  )
  ON CONFLICT (user_id, consent_type, version) DO NOTHING
  RETURNING id INTO privacy_id;
  inserted_privacy := privacy_id IS NOT NULL;

  IF privacy_id IS NULL THEN
    SELECT id INTO STRICT privacy_id
    FROM public.consent_records
    WHERE user_id = p_user_id
      AND consent_type = 'privacy_policy'
      AND version = p_privacy_version;
  END IF;

  IF inserted_terms OR inserted_privacy THEN
    SELECT COALESCE(email LIKE '%@staging.faby.internal', FALSE)
    INTO is_test_identity
    FROM public.profiles
    WHERE id = p_user_id;

    INSERT INTO public.activity_events (
      user_id, session_id, event_type, ip_hash, user_agent, metadata_json
    )
    VALUES (
      p_user_id,
      'sess_consent_' || gen_random_uuid()::TEXT,
      'LEGAL_CONSENT_RECORDED',
      p_ip_hash,
      LEFT(COALESCE(p_user_agent, 'unknown'), 512),
      jsonb_build_object(
        'terms_version', p_terms_version,
        'privacy_version', p_privacy_version,
        'terms_sha256', terms_doc.content_sha256,
        'privacy_sha256', privacy_doc.content_sha256,
        'inserted_terms', inserted_terms,
        'inserted_privacy', inserted_privacy,
        'test_fixture', is_test_identity
      )
    );
  END IF;

  RETURN jsonb_build_object(
    'success', TRUE,
    'terms_consent_id', terms_id,
    'privacy_consent_id', privacy_id,
    'is_new_grant', inserted_terms OR inserted_privacy
  );
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RAISE EXCEPTION 'No existe el usuario o alguna versión legal solicitada.';
END;
$$;

REVOKE ALL ON FUNCTION public.record_user_legal_consents(UUID, TEXT, TEXT, TEXT, TEXT)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_user_legal_consents(UUID, TEXT, TEXT, TEXT, TEXT)
  TO service_role;

-- Rate limit compartido por todas las instancias de Vercel.
CREATE TABLE IF NOT EXISTS public.registration_rate_limits (
  ip_hash TEXT PRIMARY KEY CHECK (ip_hash ~ '^[0-9a-f]{64}$'),
  window_started_at TIMESTAMPTZ NOT NULL,
  attempts INTEGER NOT NULL CHECK (attempts > 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.registration_rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.registration_rate_limits FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.consume_registration_rate_limit(
  p_ip_hash TEXT,
  p_limit INTEGER DEFAULT 10,
  p_window_seconds INTEGER DEFAULT 900
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  current_row public.registration_rate_limits%ROWTYPE;
  allowed BOOLEAN;
  retry_after INTEGER := 0;
BEGIN
  IF p_ip_hash !~ '^[0-9a-f]{64}$' OR p_limit < 1 OR p_window_seconds < 60 THEN
    RAISE EXCEPTION 'Parámetros de rate limit no válidos.';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtextextended('register-rate:' || p_ip_hash, 0));

  SELECT * INTO current_row
  FROM public.registration_rate_limits
  WHERE ip_hash = p_ip_hash
  FOR UPDATE;

  IF current_row.ip_hash IS NULL
     OR current_row.window_started_at <= NOW() - make_interval(secs => p_window_seconds) THEN
    INSERT INTO public.registration_rate_limits (ip_hash, window_started_at, attempts, updated_at)
    VALUES (p_ip_hash, NOW(), 1, NOW())
    ON CONFLICT (ip_hash) DO UPDATE SET
      window_started_at = EXCLUDED.window_started_at,
      attempts = 1,
      updated_at = NOW();
    allowed := TRUE;
  ELSIF current_row.attempts >= p_limit THEN
    allowed := FALSE;
    retry_after := GREATEST(
      1,
      CEIL(EXTRACT(EPOCH FROM (
        current_row.window_started_at + make_interval(secs => p_window_seconds) - NOW()
      )))::INTEGER
    );
  ELSE
    UPDATE public.registration_rate_limits
    SET attempts = attempts + 1, updated_at = NOW()
    WHERE ip_hash = p_ip_hash;
    allowed := TRUE;
  END IF;

  RETURN jsonb_build_object('allowed', allowed, 'retry_after_seconds', retry_after);
END;
$$;

REVOKE ALL ON FUNCTION public.consume_registration_rate_limit(TEXT, INTEGER, INTEGER)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_registration_rate_limit(TEXT, INTEGER, INTEGER)
  TO service_role;

-- 3. RBAC CON BLOQUEOS ADVISORY: TAMBIÉN PROTEGE FILAS AÚN INEXISTENTES.
CREATE OR REPLACE FUNCTION public.manage_user_role_tx(
  p_actor_id UUID,
  p_target_user_id UUID,
  p_target_role public.app_role,
  p_action TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
  actor_is_superadmin BOOLEAN;
  actor_is_admin BOOLEAN;
  target_is_elevated BOOLEAN;
  remaining_superadmins INTEGER;
  remaining_roles INTEGER;
  affected_rows INTEGER := 0;
  action_name TEXT := UPPER(p_action);
  system_ip_hash TEXT;
  first_user TEXT := LEAST(p_actor_id::TEXT, p_target_user_id::TEXT);
  second_user TEXT := GREATEST(p_actor_id::TEXT, p_target_user_id::TEXT);
BEGIN
  IF action_name NOT IN ('ASSIGN', 'REMOVE') THEN
    RAISE EXCEPTION 'Acción no válida: %. Utilice ASSIGN o REMOVE.', p_action;
  END IF;

  -- Bloqueo global del invariante y bloqueos por usuario en orden estable.
  PERFORM pg_advisory_xact_lock(hashtextextended('rbac:superadmin-invariant', 0));
  PERFORM pg_advisory_xact_lock(hashtextextended('rbac:user:' || first_user, 0));
  IF second_user <> first_user THEN
    PERFORM pg_advisory_xact_lock(hashtextextended('rbac:user:' || second_user, 0));
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = p_actor_id AND role = 'superadmin'
  ) INTO actor_is_superadmin;

  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = p_actor_id AND role = 'admin_academico'
  ) INTO actor_is_admin;

  IF NOT actor_is_superadmin AND NOT actor_is_admin THEN
    RAISE EXCEPTION 'No autorizado: solo la administración puede gestionar roles.';
  END IF;

  IF NOT actor_is_superadmin THEN
    IF p_target_role NOT IN ('alumna', 'tutor', 'profesor') THEN
      RAISE EXCEPTION 'admin_academico solo puede gestionar roles operativos.';
    END IF;

    SELECT EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = p_target_user_id
        AND role IN ('superadmin', 'admin_academico', 'auditor')
    ) INTO target_is_elevated;

    IF target_is_elevated THEN
      RAISE EXCEPTION 'admin_academico no puede modificar cuentas elevadas o de auditoría.';
    END IF;
  END IF;

  IF p_actor_id = p_target_user_id
     AND action_name = 'ASSIGN'
     AND p_target_role = 'superadmin'
     AND NOT actor_is_superadmin THEN
    RAISE EXCEPTION 'Autoascenso no permitido.';
  END IF;

  IF action_name = 'ASSIGN' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (p_target_user_id, p_target_role)
    ON CONFLICT (user_id, role) DO NOTHING;
    GET DIAGNOSTICS affected_rows = ROW_COUNT;
  ELSE
    IF p_target_role = 'superadmin' THEN
      SELECT COUNT(*) INTO remaining_superadmins
      FROM public.user_roles
      WHERE role = 'superadmin' AND user_id <> p_target_user_id;

      IF remaining_superadmins < 1 THEN
        RAISE EXCEPTION 'No es posible revocar el último superadministrador.';
      END IF;
    END IF;

    SELECT COUNT(*) INTO remaining_roles
    FROM public.user_roles
    WHERE user_id = p_target_user_id AND role <> p_target_role;

    IF remaining_roles < 1 THEN
      RAISE EXCEPTION 'La cuenta debe conservar al menos un rol activo.';
    END IF;

    DELETE FROM public.user_roles
    WHERE user_id = p_target_user_id AND role = p_target_role;
    GET DIAGNOSTICS affected_rows = ROW_COUNT;
  END IF;

  IF affected_rows > 0 THEN
    system_ip_hash := encode(extensions.digest('internal_role_action', 'sha256'), 'hex');
    INSERT INTO public.activity_events (
      user_id, session_id, event_type, ip_hash, user_agent, metadata_json
    ) VALUES (
      p_actor_id,
      'sess_role_' || gen_random_uuid()::TEXT,
      CASE WHEN action_name = 'ASSIGN' THEN 'ROLE_ASSIGNED' ELSE 'ROLE_REMOVED' END,
      system_ip_hash,
      'InternalRoleManager/2026.2',
      jsonb_build_object(
        'target_user_id', p_target_user_id,
        'role', p_target_role,
        'actor_id', p_actor_id
      )
    );
  END IF;

  RETURN jsonb_build_object(
    'success', TRUE,
    'changed', affected_rows > 0,
    'action', action_name,
    'target_user_id', p_target_user_id,
    'role', p_target_role
  );
END;
$$;

REVOKE ALL ON FUNCTION public.manage_user_role_tx(UUID, UUID, public.app_role, TEXT)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.manage_user_role_tx(UUID, UUID, public.app_role, TEXT)
  TO service_role;

-- 4. EMISIÓN ATÓMICA DE CERTIFICADOS.
ALTER TABLE public.certificates
  ADD COLUMN IF NOT EXISTS is_test_fixture BOOLEAN NOT NULL DEFAULT FALSE;

CREATE OR REPLACE FUNCTION public.protect_certificate_mutation()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  IF TG_OP = 'DELETE'
     AND OLD.is_test_fixture
     AND COALESCE(auth.role(), '') = 'service_role' THEN
    RETURN OLD;
  END IF;

  RAISE EXCEPTION 'Los certificados emitidos no admiten UPDATE ni DELETE.';
END;
$$;

DROP TRIGGER IF EXISTS trg_protect_certificates ON public.certificates;
CREATE TRIGGER trg_protect_certificates
  BEFORE UPDATE OR DELETE ON public.certificates
  FOR EACH ROW EXECUTE FUNCTION public.protect_certificate_mutation();

CREATE UNIQUE INDEX IF NOT EXISTS certificates_enrollment_unique
  ON public.certificates (enrollment_id);

CREATE OR REPLACE FUNCTION public.issue_certificate_tx(
  p_actor_id UUID,
  p_enrollment_id UUID,
  p_code TEXT,
  p_hash_signature TEXT,
  p_payload_version TEXT,
  p_student_name_snapshot TEXT,
  p_course_title_snapshot TEXT,
  p_total_active_seconds INTEGER,
  p_issued_at TIMESTAMPTZ,
  p_verification_url TEXT,
  p_ip_hash TEXT,
  p_user_agent TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  enrollment_row public.enrollments%ROWTYPE;
  course_row public.courses%ROWTYPE;
  student_name TEXT;
  student_email TEXT;
  lesson_count INTEGER;
  completed_count INTEGER;
  total_seconds BIGINT;
  required_seconds BIGINT;
  actor_allowed BOOLEAN;
  test_fixture BOOLEAN;
  certificate_id UUID;
BEGIN
  IF p_payload_version <> '2.0'
     OR p_code !~ '^FABY-[0-9]{4}-[A-Z0-9]{12}$'
     OR p_hash_signature !~ '^[0-9a-f]{64}$'
     OR p_ip_hash !~ '^[0-9a-f]{64}$'
     OR p_total_active_seconds < 0
     OR p_issued_at < NOW() - INTERVAL '5 minutes'
     OR p_issued_at > NOW() + INTERVAL '1 minute' THEN
    RAISE EXCEPTION 'Payload de certificado no válido o caducado.';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtextextended('certificate:' || p_enrollment_id::TEXT, 0));

  SELECT * INTO STRICT enrollment_row
  FROM public.enrollments
  WHERE id = p_enrollment_id
  FOR UPDATE;

  IF enrollment_row.status NOT IN ('active', 'completed') THEN
    RAISE EXCEPTION 'La matrícula no está activa ni completada.';
  END IF;

  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles AS roles
    WHERE roles.user_id = p_actor_id
      AND roles.role IN ('tutor', 'profesor', 'admin_academico', 'superadmin')
      AND (
        roles.role IN ('admin_academico', 'superadmin')
        OR EXISTS (
          SELECT 1 FROM public.course_staff AS staff
          WHERE staff.user_id = p_actor_id
            AND staff.course_id = enrollment_row.course_id
            AND staff.is_active
        )
      )
  ) INTO actor_allowed;

  IF NOT actor_allowed THEN
    RAISE EXCEPTION 'La persona docente no está asignada al curso.';
  END IF;

  IF EXISTS (SELECT 1 FROM public.certificates WHERE enrollment_id = p_enrollment_id) THEN
    RAISE EXCEPTION 'La matrícula ya tiene un certificado.';
  END IF;

  SELECT * INTO STRICT course_row
  FROM public.courses
  WHERE id = enrollment_row.course_id
  FOR SHARE;

  SELECT COUNT(*) INTO lesson_count
  FROM public.lessons AS lesson
  JOIN public.modules AS module ON module.id = lesson.module_id
  WHERE module.course_id = enrollment_row.course_id;

  IF lesson_count = 0 THEN
    RAISE EXCEPTION 'El curso no contiene lecciones certificables.';
  END IF;

  SELECT COUNT(DISTINCT progress.lesson_id) INTO completed_count
  FROM public.lesson_progress AS progress
  JOIN public.lessons AS lesson ON lesson.id = progress.lesson_id
  JOIN public.modules AS module ON module.id = lesson.module_id
  WHERE progress.student_id = enrollment_row.student_id
    AND progress.status = 'completed'
    AND module.course_id = enrollment_row.course_id;

  IF completed_count <> lesson_count THEN
    RAISE EXCEPTION 'La alumna no completó todas las lecciones.';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.assessments AS assessment
    JOIN public.lessons AS lesson ON lesson.id = assessment.lesson_id
    JOIN public.modules AS module ON module.id = lesson.module_id
    WHERE module.course_id = enrollment_row.course_id
      AND NOT EXISTS (
        SELECT 1 FROM public.assessment_attempts AS attempt
        WHERE attempt.assessment_id = assessment.id
          AND attempt.student_id = enrollment_row.student_id
          AND attempt.passed
      )
  ) THEN
    RAISE EXCEPTION 'Existen evaluaciones pendientes de aprobación.';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.assignments AS assignment
    JOIN public.lessons AS lesson ON lesson.id = assignment.lesson_id
    JOIN public.modules AS module ON module.id = lesson.module_id
    WHERE module.course_id = enrollment_row.course_id
      AND NOT EXISTS (
        SELECT 1 FROM public.assignment_submissions AS submission
        WHERE submission.assignment_id = assignment.id
          AND submission.student_id = enrollment_row.student_id
          AND submission.graded_at IS NOT NULL
          AND submission.grade >= 70
      )
  ) THEN
    RAISE EXCEPTION 'Existen prácticas pendientes de aprobación.';
  END IF;

  SELECT COALESCE(SUM(GREATEST(total_active_seconds, 0)), 0)
  INTO total_seconds
  FROM public.session_logs
  WHERE user_id = enrollment_row.student_id
    AND course_id = enrollment_row.course_id;

  required_seconds := CEIL(
    course_row.estimated_hours::NUMERIC * 3600 * course_row.min_active_hours_pct
  );

  IF total_seconds < required_seconds THEN
    RAISE EXCEPTION 'Horas activas insuficientes: % de % segundos.', total_seconds, required_seconds;
  END IF;

  IF total_seconds <> p_total_active_seconds THEN
    RAISE EXCEPTION 'El total de segundos cambió durante la emisión.';
  END IF;

  SELECT full_name, email INTO STRICT student_name, student_email
  FROM public.profiles
  WHERE id = enrollment_row.student_id;

  IF student_name <> p_student_name_snapshot OR course_row.title <> p_course_title_snapshot THEN
    RAISE EXCEPTION 'Los snapshots no coinciden con la matrícula bloqueada.';
  END IF;

  test_fixture := student_email LIKE '%@staging.faby.internal';

  INSERT INTO public.certificates (
    enrollment_id, student_id, course_id, code, hash_signature,
    payload_version, student_name_snapshot, course_title_snapshot,
    total_active_seconds, total_active_hours, issued_at, verification_url,
    is_test_fixture
  ) VALUES (
    enrollment_row.id, enrollment_row.student_id, enrollment_row.course_id,
    p_code, p_hash_signature, p_payload_version, p_student_name_snapshot,
    p_course_title_snapshot, p_total_active_seconds,
    ROUND(p_total_active_seconds::NUMERIC / 3600, 2), p_issued_at,
    p_verification_url, test_fixture
  ) RETURNING id INTO certificate_id;

  UPDATE public.enrollments
  SET status = 'completed', completed_at = p_issued_at, certificate_id = certificate_id
  WHERE id = enrollment_row.id;

  INSERT INTO public.activity_events (
    user_id, session_id, course_id, event_type, ip_hash, user_agent, metadata_json
  ) VALUES (
    p_actor_id,
    'sess_certificate_' || gen_random_uuid()::TEXT,
    CASE WHEN test_fixture THEN NULL ELSE enrollment_row.course_id END,
    'CERTIFICATE_ISSUED',
    p_ip_hash,
    LEFT(COALESCE(p_user_agent, 'unknown'), 512),
    jsonb_build_object(
      'certificate_id', certificate_id,
      'enrollment_id', enrollment_row.id,
      'student_id', enrollment_row.student_id,
      'active_seconds', p_total_active_seconds,
      'test_fixture', test_fixture
    )
  );

  RETURN jsonb_build_object(
    'id', certificate_id,
    'code', p_code,
    'student_name', p_student_name_snapshot,
    'course_title', p_course_title_snapshot,
    'total_active_hours', ROUND(p_total_active_seconds::NUMERIC / 3600, 2),
    'issued_at', p_issued_at,
    'verification_url', p_verification_url
  );
END;
$$;

REVOKE ALL ON FUNCTION public.issue_certificate_tx(
  UUID, UUID, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER, TIMESTAMPTZ, TEXT, TEXT, TEXT
) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.issue_certificate_tx(
  UUID, UUID, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER, TIMESTAMPTZ, TEXT, TEXT, TEXT
) TO service_role;

-- Eliminar la RPC anterior que deshabilitaba triggers mediante DDL.
DROP FUNCTION IF EXISTS public.clean_test_fixture_tx(UUID[]);

-- 5. SNAPSHOT DE CATÁLOGOS POSTGRESQL, SOLO PARA LA AUDITORÍA LIVE.
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
    'legal_hash_mismatches', legal_hash_mismatches
  );
END;
$$;

REVOKE ALL ON FUNCTION public.security_catalog_audit() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.security_catalog_audit() TO service_role;
