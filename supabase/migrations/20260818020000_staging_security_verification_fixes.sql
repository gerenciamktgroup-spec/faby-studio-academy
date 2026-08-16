-- ===========================================================================
-- FABY STUDIO ACADEMY — 6ª MIGRACIÓN: CORRECCIONES DE SEGURIDAD Y VERIFICACIÓN LIVE
-- Migration: 20260818020000_staging_security_verification_fixes.sql
-- ===========================================================================

-- 1. TABLA DE VERSIONES LEGALES INMUTABLES
CREATE TABLE IF NOT EXISTS public.legal_document_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_type TEXT NOT NULL CHECK (document_type IN ('terms', 'privacy_policy')),
  version TEXT NOT NULL,
  title TEXT NOT NULL,
  content_text TEXT NOT NULL,
  content_sha256 TEXT NOT NULL,
  effective_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (document_type, version)
);

ALTER TABLE public.legal_document_versions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS legal_versions_select_all ON public.legal_document_versions;
CREATE POLICY legal_versions_select_all ON public.legal_document_versions
  FOR SELECT TO authenticated, anon
  USING (true);

REVOKE INSERT, UPDATE, DELETE ON public.legal_document_versions FROM anon, authenticated, PUBLIC;

-- Insertar versiones iniciales 2026.1 con hash SHA-256
INSERT INTO public.legal_document_versions (document_type, version, title, content_text, content_sha256, effective_from)
VALUES
  (
    'terms',
    '2026.1',
    'Términos y Condiciones de Uso — Faby Studio Academy (Entorno de Demostración)',
    'TÉRMINOS Y CONDICIONES DE USO - FABY STUDIO ACADEMY v2026.1. Acceso personal e intransferible, registro de actividad y trazabilidad técnica de aprendizaje para programas de formación técnica en belleza.',
    encode(extensions.digest(convert_to('TÉRMINOS Y CONDICIONES DE USO - FABY STUDIO ACADEMY v2026.1. Acceso personal e intransferible, registro de actividad y trazabilidad técnica de aprendizaje para programas de formación técnica en belleza.', 'UTF8'), 'sha256'), 'hex'),
    NOW()
  ),
  (
    'privacy_policy',
    '2026.1',
    'Política de Privacidad y Protección de Datos — Faby Studio Academy (Entorno de Demostración)',
    'POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS - FABY STUDIO ACADEMY v2026.1. Tratamiento legítimo de datos para matriculación, cómputo de horas de aprendizaje, evaluación de prácticas y expedición de diplomas verificables.',
    encode(extensions.digest(convert_to('POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS - FABY STUDIO ACADEMY v2026.1. Tratamiento legítimo de datos para matriculación, cómputo de horas de aprendizaje, evaluación de prácticas y expedición de diplomas verificables.', 'UTF8'), 'sha256'), 'hex'),
    NOW()
  )
ON CONFLICT (document_type, version) DO UPDATE
SET
  title = EXCLUDED.title,
  content_text = EXCLUDED.content_text,
  content_sha256 = EXCLUDED.content_sha256,
  effective_from = EXCLUDED.effective_from;

-- 2. HARDENING DE CONSENT_RECORDS
ALTER TABLE public.consent_records
  ADD COLUMN IF NOT EXISTS legal_version_id UUID REFERENCES public.legal_document_versions(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- Asegurar unicidad por usuario, tipo y versión
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'consent_records_user_type_version_uniq'
  ) THEN
    ALTER TABLE public.consent_records
      ADD CONSTRAINT consent_records_user_type_version_uniq UNIQUE (user_id, consent_type, version);
  END IF;
END $$;

-- Revocación total de escrituras directas desde clientes
REVOKE INSERT, UPDATE, DELETE ON public.consent_records FROM anon, authenticated, PUBLIC;
DROP POLICY IF EXISTS consent_owner_insert ON public.consent_records;
DROP POLICY IF EXISTS consent_insert_policy ON public.consent_records;
DROP POLICY IF EXISTS "consent_insert_authenticated" ON public.consent_records;

-- 3. OPERACIÓN TRANSACCIONAL EXCLUSIVA DE SERVIDOR: REGISTRO DE CONSENTIMIENTOS
CREATE OR REPLACE FUNCTION public.record_user_legal_consents(
  p_user_id UUID,
  p_ip_hash TEXT,
  p_user_agent TEXT,
  p_terms_version TEXT DEFAULT '2026.1',
  p_privacy_version TEXT DEFAULT '2026.1'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
  v_terms_doc public.legal_document_versions%ROWTYPE;
  v_privacy_doc public.legal_document_versions%ROWTYPE;
  v_terms_id UUID;
  v_privacy_id UUID;
BEGIN
  -- Verificar documento de términos
  SELECT * INTO v_terms_doc
  FROM public.legal_document_versions
  WHERE document_type = 'terms' AND version = p_terms_version;

  IF v_terms_doc.id IS NULL THEN
    RAISE EXCEPTION 'Versión de términos no encontrada: %', p_terms_version;
  END IF;

  -- Verificar documento de privacidad
  SELECT * INTO v_privacy_doc
  FROM public.legal_document_versions
  WHERE document_type = 'privacy_policy' AND version = p_privacy_version;

  IF v_privacy_doc.id IS NULL THEN
    RAISE EXCEPTION 'Versión de política de privacidad no encontrada: %', p_privacy_version;
  END IF;

  -- Insertar o actualizar consentimiento de términos
  INSERT INTO public.consent_records (
    user_id,
    consent_type,
    version,
    legal_version_id,
    ip_hash,
    user_agent,
    granted_at
  )
  VALUES (
    p_user_id,
    'terms',
    p_terms_version,
    v_terms_doc.id,
    p_ip_hash,
    p_user_agent,
    NOW()
  )
  ON CONFLICT (user_id, consent_type, version) DO UPDATE
  SET
    legal_version_id = EXCLUDED.legal_version_id,
    ip_hash = EXCLUDED.ip_hash,
    user_agent = EXCLUDED.user_agent,
    granted_at = EXCLUDED.granted_at
  RETURNING id INTO v_terms_id;

  -- Insertar o actualizar consentimiento de privacidad
  INSERT INTO public.consent_records (
    user_id,
    consent_type,
    version,
    legal_version_id,
    ip_hash,
    user_agent,
    granted_at
  )
  VALUES (
    p_user_id,
    'privacy_policy',
    p_privacy_version,
    v_privacy_doc.id,
    p_ip_hash,
    p_user_agent,
    NOW()
  )
  ON CONFLICT (user_id, consent_type, version) DO UPDATE
  SET
    legal_version_id = EXCLUDED.legal_version_id,
    ip_hash = EXCLUDED.ip_hash,
    user_agent = EXCLUDED.user_agent,
    granted_at = EXCLUDED.granted_at
  RETURNING id INTO v_privacy_id;

  -- Registro atómico en auditoría
  INSERT INTO public.activity_events (
    user_id,
    session_id,
    event_type,
    ip_hash,
    user_agent,
    metadata_json
  )
  VALUES (
    p_user_id,
    'sess_consent_' || p_user_id::text,
    'AUTH_LOGIN',
    p_ip_hash,
    p_user_agent,
    jsonb_build_object(
      'action', 'USER_REGISTERED_WITH_CONSENT',
      'terms_version', p_terms_version,
      'privacy_version', p_privacy_version,
      'terms_sha256', v_terms_doc.content_sha256,
      'privacy_sha256', v_privacy_doc.content_sha256
    )
  );

  RETURN jsonb_build_object(
    'success', true,
    'terms_consent_id', v_terms_id,
    'privacy_consent_id', v_privacy_id
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.record_user_legal_consents FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_user_legal_consents TO service_role;

-- 4. OPERACIÓN TRANSACCIONAL EXCLUSIVA DE SERVIDOR: GESTIÓN DE ROLES CON BLOQUEO DE CONDICIONES DE CARRERA
CREATE OR REPLACE FUNCTION public.manage_user_role_tx(
  p_actor_id UUID,
  p_target_user_id UUID,
  p_target_role public.app_role,
  p_action TEXT -- 'ASSIGN' or 'REMOVE'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
  v_is_superadmin BOOLEAN;
  v_is_admin_acad BOOLEAN;
  v_target_has_elevated BOOLEAN;
  v_remaining_superadmins INTEGER;
  v_remaining_user_roles INTEGER;
  v_sys_ip_hash TEXT;
BEGIN
  v_sys_ip_hash := encode(extensions.digest('internal_admin_action', 'sha256'), 'hex');

  -- Comprobar permisos del actor
  SELECT EXISTS(
    SELECT 1 FROM public.user_roles WHERE user_id = p_actor_id AND role = 'superadmin'
  ) INTO v_is_superadmin;

  SELECT EXISTS(
    SELECT 1 FROM public.user_roles WHERE user_id = p_actor_id AND role = 'admin_academico'
  ) INTO v_is_admin_acad;

  IF NOT v_is_superadmin AND NOT v_is_admin_acad THEN
    RAISE EXCEPTION 'No autorizado: solo administradores pueden gestionar roles.';
  END IF;

  -- Si el actor es admin_academico (no superadmin)
  IF NOT v_is_superadmin AND v_is_admin_acad THEN
    -- Solo roles operativos
    IF p_target_role NOT IN ('alumna', 'tutor', 'profesor') THEN
      RAISE EXCEPTION 'Permiso denegado: admin_academico solo puede gestionar roles operativos (alumna, tutor, profesor).';
    END IF;

    -- El destinatario no debe tener roles elevados
    SELECT EXISTS(
      SELECT 1 FROM public.user_roles
      WHERE user_id = p_target_user_id AND role IN ('superadmin', 'admin_academico', 'auditor')
    ) INTO v_target_has_elevated;

    IF v_target_has_elevated THEN
      RAISE EXCEPTION 'Permiso denegado: admin_academico no puede modificar cuentas con roles administrativos o de auditoría.';
    END IF;

    -- Bloqueo de autoascenso
    IF p_actor_id = p_target_user_id THEN
      RAISE EXCEPTION 'Permiso denegado: No se permite la auto-modificación de roles.';
    END IF;
  END IF;

  -- Bloqueo FOR UPDATE para serializar cambios críticos de roles y evitar condiciones de carrera
  PERFORM 1 FROM public.user_roles WHERE role = 'superadmin' FOR UPDATE;

  -- Ejecutar ASSIGN
  IF p_action = 'ASSIGN' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (p_target_user_id, p_target_role)
    ON CONFLICT (user_id, role) DO NOTHING;

    -- Registro atómico en auditoría
    INSERT INTO public.activity_events (
      user_id,
      session_id,
      event_type,
      ip_hash,
      metadata_json
    )
    VALUES (
      p_actor_id,
      'sess_role_assign_' || p_target_user_id::text,
      'EVENT_CORRECTION',
      v_sys_ip_hash,
      jsonb_build_object(
        'action', 'ROLE_ASSIGNED',
        'target_user_id', p_target_user_id,
        'assigned_role', p_target_role,
        'granted_by', p_actor_id
      )
    );

    RETURN jsonb_build_object('success', true, 'action', 'ASSIGN', 'role', p_target_role);

  -- Ejecutar REMOVE
  ELSIF p_action = 'REMOVE' THEN
    -- Comprobar si el usuario posee el rol
    IF NOT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id = p_target_user_id AND role = p_target_role) THEN
      RETURN jsonb_build_object('success', true, 'action', 'NOOP', 'message', 'El usuario no posee el rol.');
    END IF;

    -- Si se intenta remover superadmin
    IF p_target_role = 'superadmin' THEN
      SELECT COUNT(*) INTO v_remaining_superadmins
      FROM public.user_roles
      WHERE role = 'superadmin';

      IF v_remaining_superadmins <= 1 THEN
        RAISE EXCEPTION 'Operación bloqueada: No se puede eliminar el último superadministrador de la plataforma.';
      END IF;

      IF p_actor_id = p_target_user_id THEN
        RAISE EXCEPTION 'Operación bloqueada: No puedes retirar tu propio rol de superadministrador.';
      END IF;
    END IF;

    -- Comprobar que el usuario conserve al menos un rol
    SELECT COUNT(*) INTO v_remaining_user_roles
    FROM public.user_roles
    WHERE user_id = p_target_user_id;

    IF v_remaining_user_roles <= 1 THEN
      RAISE EXCEPTION 'Operación bloqueada: El usuario debe conservar al menos un rol activo.';
    END IF;

    DELETE FROM public.user_roles
    WHERE user_id = p_target_user_id AND role = p_target_role;

    -- Registro atómico en auditoría
    INSERT INTO public.activity_events (
      user_id,
      session_id,
      event_type,
      ip_hash,
      metadata_json
    )
    VALUES (
      p_actor_id,
      'sess_role_remove_' || p_target_user_id::text,
      'EVENT_CORRECTION',
      v_sys_ip_hash,
      jsonb_build_object(
        'action', 'ROLE_REMOVED',
        'target_user_id', p_target_user_id,
        'removed_role', p_target_role,
        'revoked_by', p_actor_id
      )
    );

    RETURN jsonb_build_object('success', true, 'action', 'REMOVE', 'role', p_target_role);

  ELSE
    RAISE EXCEPTION 'Acción no válida: % (debe ser ASSIGN o REMOVE)', p_action;
  END IF;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.manage_user_role_tx FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.manage_user_role_tx TO service_role;
