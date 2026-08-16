-- ===========================================================================
-- FABY STUDIO ACADEMY — 7ª MIGRACIÓN: INTEGRIDAD FINAL Y VERIFICACIÓN LIVE
-- Migration: 20260818030000_final_verification_integrity_fixes.sql
-- ===========================================================================

-- 1. ESQUEMA DE VERSIONES LEGALES: INMUTABILIDAD, TEXTO COMPLETO Y SHA-256 MATEMÁTICO
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

-- Trigger para garantizar que content_sha256 corresponda matemáticamente a content_text
CREATE OR REPLACE FUNCTION public.trg_enforce_legal_document_sha256()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
BEGIN
  NEW.content_sha256 := encode(extensions.digest(convert_to(NEW.content_text, 'UTF8'), 'sha256'), 'hex');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_legal_doc_sha256 ON public.legal_document_versions;
CREATE TRIGGER trg_legal_doc_sha256
  BEFORE INSERT OR UPDATE ON public.legal_document_versions
  FOR EACH ROW
  EXECUTE FUNCTION public.trg_enforce_legal_document_sha256();

-- Trigger para impedir UPDATE o DELETE de versiones de documentos publicadas
CREATE OR REPLACE FUNCTION public.trg_prevent_legal_document_mutation()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'Operación no permitida: Las versiones de documentos legales publicadas son inmutables y no pueden eliminarse. Cree una nueva versión.';
  END IF;
  IF TG_OP = 'UPDATE' THEN
    IF OLD.document_type <> NEW.document_type OR OLD.version <> NEW.version OR OLD.content_text <> NEW.content_text OR OLD.content_sha256 <> NEW.content_sha256 THEN
      RAISE EXCEPTION 'Operación no permitida: El contenido y versión de un documento legal publicado no pueden modificarse. Cree una nueva versión.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_legal_doc_protect ON public.legal_document_versions;
CREATE TRIGGER trg_legal_doc_protect
  BEFORE UPDATE OR DELETE ON public.legal_document_versions
  FOR EACH ROW
  EXECUTE FUNCTION public.trg_prevent_legal_document_mutation();

-- Actualizar/Sembrar versiones 2026.1 con texto íntegro mostrado en la web pública
INSERT INTO public.legal_document_versions (
  document_type,
  version,
  title,
  content_text,
  content_sha256,
  effective_from
)
VALUES
  (
    'terms',
    '2026.1',
    'Términos y Condiciones de Uso — FABY STUDIO ACADEMY',
    'CONDICIONES GENERALES DE CONTRATACIÓN - TÉRMINOS Y CONDICIONES DE USO - FABY STUDIO ACADEMY v2026.1. 1. Objeto y Titularidad: Los presentes Términos y Condiciones regulan la matrícula, acceso a la plataforma LMS y contenidos formativos proporcionados por FABY STUDIO ACADEMY a través de sus canales digitales y centros autorizados. 2. Acceso y Uso del Campus Virtual: El acceso al campus es personal e intransferible. Cada alumna dispone de credenciales individuales y un sistema de control de presencia y tiempo de estudio activo exigido para la certificación formativa y expedición del diploma de aprovechamiento. 3. Modalidades de Matrícula y Pagos: En este entorno de pruebas, las inscripciones son gestionadas de forma manual y asistida por el equipo de administración académica. Los pagos automatizados en línea se habilitarán tras la activación de la pasarela de pagos. 4. Expedición de Certificados & Diplomas: Para obtener el Diploma con firma criptográfica SHA-256 es necesario completar los módulos formativos requeridos, superar la evaluación teórica y aprobar la entrega de prácticas técnicas con un mínimo de 70/100 puntos según la rúbrica docente.',
    encode(extensions.digest(convert_to('CONDICIONES GENERALES DE CONTRATACIÓN - TÉRMINOS Y CONDICIONES DE USO - FABY STUDIO ACADEMY v2026.1. 1. Objeto y Titularidad: Los presentes Términos y Condiciones regulan la matrícula, acceso a la plataforma LMS y contenidos formativos proporcionados por FABY STUDIO ACADEMY a través de sus canales digitales y centros autorizados. 2. Acceso y Uso del Campus Virtual: El acceso al campus es personal e intransferible. Cada alumna dispone de credenciales individuales y un sistema de control de presencia y tiempo de estudio activo exigido para la certificación formativa y expedición del diploma de aprovechamiento. 3. Modalidades de Matrícula y Pagos: En este entorno de pruebas, las inscripciones son gestionadas de forma manual y asistida por el equipo de administración académica. Los pagos automatizados en línea se habilitarán tras la activación de la pasarela de pagos. 4. Expedición de Certificados & Diplomas: Para obtener el Diploma con firma criptográfica SHA-256 es necesario completar los módulos formativos requeridos, superar la evaluación teórica y aprobar la entrega de prácticas técnicas con un mínimo de 70/100 puntos según la rúbrica docente.', 'UTF8'), 'sha256'), 'hex'),
    NOW()
  ),
  (
    'privacy_policy',
    '2026.1',
    'Política de Privacidad y Protección de Datos — FABY STUDIO ACADEMY',
    'PROTECCIÓN DE DATOS & PRIVACIDAD (RGPD) - POLÍTICA DE PRIVACIDAD & PROTECCIÓN DE DATOS - FABY STUDIO ACADEMY v2026.1. 1. Responsable del Tratamiento: El presente entorno web y campus virtual opera como plataforma de formación técnica y académica para el sector belleza. Los datos fiscales definitivos y domicilio social de la entidad titular se encuentran en fase de formalización corporativa previa al lanzamiento comercial definitivo. Para cualquier consulta sobre privacidad, protección de datos de prueba o ejercicio de derechos de acceso y supresión, contacte a través del correo de contacto: privacidad@fabystudio.academy. 2. Finalidad del Tratamiento de Datos: Tratamos la información que nos facilitan las usuarias y alumnas para: - Gestionar la matrícula, creación de cuentas individuales y acceso al campus virtual. - Acreditar el cómputo de horas de aprendizaje activo y tiempo de interacción en la plataforma. - Evaluar las prácticas docentes, emitir certificados verificables y registrar el código único criptográfico SHA-256. - Gestionar los cobros online y validaciones en caja en los salones físicos de Faby Studio. 3. Legitimación: La base legal para el tratamiento de los datos es la ejecución del contrato de prestación de servicios formativos y el consentimiento expreso otorgado al registrarse y aceptar los presentes términos. 4. Derechos ARCO / RGPD de las Alumnas: Cualquier usuaria puede ejercer sus derechos de acceso, rectificación, supresión, limitación del tratamiento y portabilidad de sus datos enviando un email a privacidad@fabystudio.academy.',
    encode(extensions.digest(convert_to('PROTECCIÓN DE DATOS & PRIVACIDAD (RGPD) - POLÍTICA DE PRIVACIDAD & PROTECCIÓN DE DATOS - FABY STUDIO ACADEMY v2026.1. 1. Responsable del Tratamiento: El presente entorno web y campus virtual opera como plataforma de formación técnica y académica para el sector belleza. Los datos fiscales definitivos y domicilio social de la entidad titular se encuentran en fase de formalización corporativa previa al lanzamiento comercial definitivo. Para cualquier consulta sobre privacidad, protección de datos de prueba o ejercicio de derechos de acceso y supresión, contacte a través del correo de contacto: privacidad@fabystudio.academy. 2. Finalidad del Tratamiento de Datos: Tratamos la información que nos facilitan las usuarias y alumnas para: - Gestionar la matrícula, creación de cuentas individuales y acceso al campus virtual. - Acreditar el cómputo de horas de aprendizaje activo y tiempo de interacción en la plataforma. - Evaluar las prácticas docentes, emitir certificados verificables y registrar el código único criptográfico SHA-256. - Gestionar los cobros online y validaciones en caja en los salones físicos de Faby Studio. 3. Legitimación: La base legal para el tratamiento de los datos es la ejecución del contrato de prestación de servicios formativos y el consentimiento expreso otorgado al registrarse y aceptar los presentes términos. 4. Derechos ARCO / RGPD de las Alumnas: Cualquier usuaria puede ejercer sus derechos de acceso, rectificación, supresión, limitación del tratamiento y portabilidad de sus datos enviando un email a privacidad@fabystudio.academy.', 'UTF8'), 'sha256'), 'hex'),
    NOW()
  )
ON CONFLICT (document_type, version) DO NOTHING;

-- 2. INTEGRIDAD REFERENCIAL DE CONSENT_RECORDS: ON DELETE RESTRICT & BACKFILL
ALTER TABLE public.consent_records
  DROP CONSTRAINT IF EXISTS consent_records_legal_version_id_fkey;

ALTER TABLE public.consent_records
  ADD CONSTRAINT consent_records_legal_version_id_fkey
  FOREIGN KEY (legal_version_id)
  REFERENCES public.legal_document_versions(id)
  ON DELETE RESTRICT;

-- Backfill de registros de consentimiento existentes
UPDATE public.consent_records c
SET legal_version_id = l.id
FROM public.legal_document_versions l
WHERE c.consent_type = l.document_type
  AND c.version = l.version
  AND c.legal_version_id IS NULL;

-- 3. PROCEDIMIENTO TRANSACCIONAL IDEMPOTENTE: REGISTRO DE CONSENTIMIENTOS SIN MUTACIÓN DE EVIDENCIA
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
  v_inserted_any BOOLEAN := false;
BEGIN
  -- 1. Validar existencia de versión de términos
  SELECT * INTO v_terms_doc
  FROM public.legal_document_versions
  WHERE document_type = 'terms' AND version = p_terms_version;

  IF v_terms_doc.id IS NULL THEN
    RAISE EXCEPTION 'Versión de términos no encontrada: %', p_terms_version;
  END IF;

  -- 2. Validar existencia de versión de privacidad
  SELECT * INTO v_privacy_doc
  FROM public.legal_document_versions
  WHERE document_type = 'privacy_policy' AND version = p_privacy_version;

  IF v_privacy_doc.id IS NULL THEN
    RAISE EXCEPTION 'Versión de política de privacidad no encontrada: %', p_privacy_version;
  END IF;

  -- 3. Términos: buscar existente o insertar nuevo
  SELECT id INTO v_terms_id
  FROM public.consent_records
  WHERE user_id = p_user_id AND consent_type = 'terms' AND version = p_terms_version;

  IF v_terms_id IS NULL THEN
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
    RETURNING id INTO v_terms_id;
    v_inserted_any := true;
  END IF;

  -- 4. Privacidad: buscar existente o insertar nuevo
  SELECT id INTO v_privacy_id
  FROM public.consent_records
  WHERE user_id = p_user_id AND consent_type = 'privacy_policy' AND version = p_privacy_version;

  IF v_privacy_id IS NULL THEN
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
    RETURNING id INTO v_privacy_id;
    v_inserted_any := true;
  END IF;

  -- 5. Registrar en auditoría solo si se insertó nueva evidencia
  IF v_inserted_any THEN
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
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'terms_consent_id', v_terms_id,
    'privacy_consent_id', v_privacy_id,
    'is_new_grant', v_inserted_any
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.record_user_legal_consents FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_user_legal_consents TO service_role;

-- 4. GESTIÓN TRANSACCIONAL DE ROLES CON BLOQUEO SERIALIZABLE (FOR UPDATE) ANTES DE EVALUACIÓN
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

  -- 1. Adquirir bloqueo exclusivo sobre filas de roles del actor, destinatario y todos los roles elevados
  PERFORM 1 FROM public.user_roles
  WHERE user_id IN (p_actor_id, p_target_user_id)
     OR role IN ('superadmin', 'admin_academico', 'auditor')
  FOR UPDATE;

  -- 2. Evaluar permisos del actor
  SELECT EXISTS(
    SELECT 1 FROM public.user_roles WHERE user_id = p_actor_id AND role = 'superadmin'
  ) INTO v_is_superadmin;

  SELECT EXISTS(
    SELECT 1 FROM public.user_roles WHERE user_id = p_actor_id AND role = 'admin_academico'
  ) INTO v_is_admin_acad;

  IF NOT v_is_superadmin AND NOT v_is_admin_acad THEN
    RAISE EXCEPTION 'No autorizado: solo administradores pueden gestionar roles.';
  END IF;

  -- 3. Si el actor es admin_academico (no superadmin)
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
      RAISE EXCEPTION 'Permiso denegado: admin_academico no puede modificar cuentas directivas ni de auditoría.';
    END IF;
  END IF;

  -- 4. Bloquear auto-modificación indebida
  IF p_actor_id = p_target_user_id THEN
    IF p_action = 'ASSIGN' AND p_target_role = 'superadmin' AND NOT v_is_superadmin THEN
      RAISE EXCEPTION 'Autoascenso no permitido a superadmin.';
    END IF;
    IF p_action = 'REMOVE' AND p_target_role = 'superadmin' THEN
      RAISE EXCEPTION 'No es posible revocar tu propio rol de superadministrador directamente.';
    END IF;
  END IF;

  -- 5. Ejecutar Acción
  IF p_action = 'ASSIGN' THEN
    -- Asignar rol
    INSERT INTO public.user_roles (user_id, role)
    VALUES (p_target_user_id, p_target_role)
    ON CONFLICT (user_id, role) DO NOTHING;

    -- Auditoría atómica
    INSERT INTO public.activity_events (
      user_id, session_id, event_type, ip_hash, user_agent, metadata_json
    )
    VALUES (
      p_actor_id,
      'sess_role_assign_' || p_actor_id::text,
      'USER_SIGN_IN',
      v_sys_ip_hash,
      'InternalRoleManager/2026.1',
      jsonb_build_object(
        'action', 'ROLE_ASSIGNED',
        'target_user_id', p_target_user_id,
        'role', p_target_role,
        'actor_id', p_actor_id
      )
    );

    RETURN jsonb_build_object(
      'success', true,
      'action', 'ASSIGN',
      'target_user_id', p_target_user_id,
      'role', p_target_role
    );

  ELSIF p_action = 'REMOVE' THEN
    -- Si es superadmin, asegurar que no sea el último del sistema
    IF p_target_role = 'superadmin' THEN
      SELECT COUNT(*) INTO v_remaining_superadmins
      FROM public.user_roles
      WHERE role = 'superadmin' AND user_id <> p_target_user_id;

      IF v_remaining_superadmins < 1 THEN
        RAISE EXCEPTION 'Operación rechazada: no es posible revocar el último superadministrador del sistema.';
      END IF;
    END IF;

    -- Verificar que el usuario mantenga al menos un rol tras la remoción
    SELECT COUNT(*) INTO v_remaining_user_roles
    FROM public.user_roles
    WHERE user_id = p_target_user_id AND role <> p_target_role;

    IF v_remaining_user_roles < 1 THEN
      RAISE EXCEPTION 'Operación rechazada: el usuario debe conservar al menos un rol activo en la plataforma.';
    END IF;

    -- Eliminar rol
    DELETE FROM public.user_roles
    WHERE user_id = p_target_user_id AND role = p_target_role;

    -- Auditoría atómica
    INSERT INTO public.activity_events (
      user_id, session_id, event_type, ip_hash, user_agent, metadata_json
    )
    VALUES (
      p_actor_id,
      'sess_role_remove_' || p_actor_id::text,
      'USER_SIGN_IN',
      v_sys_ip_hash,
      'InternalRoleManager/2026.1',
      jsonb_build_object(
        'action', 'ROLE_REMOVED',
        'target_user_id', p_target_user_id,
        'role', p_target_role,
        'actor_id', p_actor_id
      )
    );

    RETURN jsonb_build_object(
      'success', true,
      'action', 'REMOVE',
      'target_user_id', p_target_user_id,
      'role', p_target_role
    );

  ELSE
    RAISE EXCEPTION 'Acción no válida: %. Utilice ASSIGN o REMOVE.', p_action;
  END IF;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.manage_user_role_tx FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.manage_user_role_tx TO service_role;

-- 5. ESQUEMA DE CERTIFICADOS VERSIONADOS CON SNAPSHOTS INMUTABLES
ALTER TABLE public.certificates
  ADD COLUMN IF NOT EXISTS payload_version TEXT NOT NULL DEFAULT '1.0',
  ADD COLUMN IF NOT EXISTS student_name_snapshot TEXT,
  ADD COLUMN IF NOT EXISTS course_title_snapshot TEXT,
  ADD COLUMN IF NOT EXISTS total_active_seconds INTEGER,
  ADD COLUMN IF NOT EXISTS metadata_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb;

-- Backfill snapshots en certificados históricos deshabilitando temporalmente el trigger de protección
ALTER TABLE public.certificates DISABLE TRIGGER trg_protect_certificates;

UPDATE public.certificates c
SET
  student_name_snapshot = COALESCE(p.full_name, 'Alumna Faby Studio'),
  course_title_snapshot = COALESCE(co.title, 'Curso Profesional de Belleza'),
  total_active_seconds = COALESCE(ROUND(c.total_active_hours * 3600), 0)
FROM public.profiles p, public.courses co
WHERE c.student_id = p.id AND c.course_id = co.id
  AND (c.student_name_snapshot IS NULL OR c.course_title_snapshot IS NULL OR c.total_active_seconds IS NULL);

ALTER TABLE public.certificates ENABLE TRIGGER trg_protect_certificates;

ALTER TABLE public.activity_events DROP CONSTRAINT IF EXISTS activity_events_user_id_fkey;

-- 7. FUNCIÓN SEGURA DE PURGA DE PRUEBAS PARA SERVICE_ROLE
CREATE OR REPLACE FUNCTION public.clean_test_fixture_tx(p_user_ids UUID[])
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  ALTER TABLE public.certificates DISABLE TRIGGER trg_protect_certificates;
  DELETE FROM public.certificates WHERE student_id = ANY(p_user_ids);
  ALTER TABLE public.certificates ENABLE TRIGGER trg_protect_certificates;

  DELETE FROM public.assignment_submissions WHERE student_id = ANY(p_user_ids);
  DELETE FROM public.session_logs WHERE user_id = ANY(p_user_ids);
  DELETE FROM public.enrollments WHERE student_id = ANY(p_user_ids);
  DELETE FROM public.course_staff WHERE user_id = ANY(p_user_ids);
  DELETE FROM public.consent_records WHERE user_id = ANY(p_user_ids);
  DELETE FROM public.user_roles WHERE user_id = ANY(p_user_ids);
  DELETE FROM public.profiles WHERE id = ANY(p_user_ids);
END;
$$;

REVOKE ALL ON FUNCTION public.clean_test_fixture_tx FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.clean_test_fixture_tx TO service_role;
