# FABY STUDIO ACADEMY — DOSSIER TÉCNICO Y ARQUITECTURA DEL SISTEMA
**Versión de la Plataforma:** 3.0 Enterprise AI-Native  
**Entorno de Producción:** Vercel Pro (`https://faby-studio-academy.vercel.app`)  
**Base de Datos Staging:** Supabase (`sa-east-1`, PostgreSQL 17, Ref: `odsldktasbexyfjpijjg`)  
**Repositorio GitHub:** `https://github.com/gerenciamktgroup-spec/faby-studio-academy`  
**Rama Oficial:** `antigravity/supabase-staging-validation` (PR #1)

---

## 📑 ÍNDICE GENERAL
1. [Visión General y Propósito del Sistema](#1-visión-general-y-propósito-del-sistema)
2. [Stack Tecnológico y Dependencias](#2-stack-tecnológico-y-dependencias)
3. [Arquitectura de Base de Datos y las 8 Migraciones](#3-arquitectura-de-base-de-datos-y-las-8-migraciones)
4. [Seguridad, RBAC y Políticas RLS](#4-seguridad-rbac-y-políticas-rls)
5. [Criptografía, Auditoría y Certificación](#5-criptografía-auditoría-y-certificación)
6. [Estructura del Proyecto y Rutas (Front + API)](#6-estructura-del-proyecto-y-rutas-front--api)
7. [Cuentas Demo y Role Switcher](#7-cuentas-demo-y-role-switcher)
8. [Suites de Pruebas y Quality Gate](#8-suites-de-pruebas-y-quality-gate)
9. [Guía para Desarrolladores (Cómo Desplegar y Ejecutar)](#9-guía-para-desarrolladores)

---

## 1. Visión General y Propósito del Sistema

**FABY STUDIO ACADEMY** es una plataforma educativa de grado empresarial (*Learning OS*) especializada en la industria de la estética y cosmetología profesional (Extensiones de Pestañas, Uñas de Gel/Acrílico y Cosmetología Facial).

### Diferenciales Tecnológicos sobre LMS Tradicionales (Hotmart, Teachable, Moodle):
* **Trazabilidad Activa al Segundo:** Medición en tiempo real del tiempo de estudio real de la alumna mediante *heartbeats* cada 45 segundos en el cliente (`ActiveLearningTracker`), descartando tiempos de inactividad o pestañas en segundo plano.
* **Evaluación de Prácticas con Rúbrica Pedagógica:** Corrección visual sobre fotografías de modelos mediante pines de anotación y rúbrica ponderada de 4 criterios de 25 pts (Aislamiento, Distancia de Seguridad, Simetría, Higiene = 100 pts).
* **Certificación Atómica Firmada Criptográficamente (HMAC-SHA-256):** Emisión de diplomas mediante procedimiento transaccional ACID en PostgreSQL (`issue_certificate_tx`) que congela los snapshots del estudiante, curso y horas al momento de la graduación, con portal de verificación pública sin login (`/verificar-certificado/[code]`).
* **Auditoría Inmutable:** Registro continuo de eventos (*append-only*) en `activity_events` con anonimización de direcciones IP mediante hash salteado HMAC-SHA-256.

---

## 2. Stack Tecnológico y Dependencias

### Frontend & Servidor
* **Framework:** Next.js 15.5.21 (App Router, Server Actions, Route Handlers, SSR & Static Generation).
* **Librería de UI:** React 19.1.0, Tailwind CSS 3.4.17, Lucide React (iconografía).
* **Validación de Esquemas:** Zod 3.24.2 en cliente y servidor.
* **Manejo de Fechas:** Date-fns 4.1.0.

### Backend & Almacenamiento
* **Motor de Base de Datos:** PostgreSQL 17 (Supabase Managed).
* **Extensiones PostgreSQL:** `pgcrypto`, `vector` (pgvector para IA/RAG), `uuid-ossp`.
* **Seguridad de Acceso:** Row Level Security (RLS) habilitado en el 100% de las tablas (37 tablas activas).
* **Storage:** 3 buckets privados en Supabase Storage (`student-submissions`, `course-assets`, `system-backups`).

### Herramientas de Testing y Calidad
* **Linter:** ESLint 9.35.0 con `@typescript-eslint` estricto (0 warnings toleradas).
* **Tipado:** TypeScript 5.7.3 (`tsc --noEmit`).
* **Tests Unitarios:** Vitest 3.0.5.
* **Tests E2E:** Playwright 1.50.1.

---

## 3. Arquitectura de Base de Datos y las 8 Migraciones

El ciclo de base de datos se gestiona con Supabase CLI. Las 8 migraciones están aplicadas y sincronizadas remotamente:

```
20260808000000_faby_academy_schema.sql                      (1. Esquema base LMS)
20260816000000_faby_skill_graph.sql                         (2. Grafo de habilidades)
20260817000000_faby_ai_rag_pgvector.sql                     (3. Base de conocimiento RAG)
20260818000000_production_auth_rbac.sql                     (4. RBAC, perfiles y RLS base)
20260818010000_staging_security_corrections.sql             (5. Aislamiento y correcciones)
20260818020000_staging_security_verification_fixes.sql      (6. Endurecimiento de triggers)
20260818030000_final_verification_integrity_fixes.sql       (7. Consentimientos e integridad)
20260818040000_staging_live_validation_truthfulness_fixes.sql (8. Verificación live neutral 2026.2)
```

### Resumen de Tablas Principales por Dominio (37 Tablas Totales)
1. **Usuarios y Permisos:** `profiles`, `user_roles`, `course_staff`, `legal_document_versions`, `consent_records`, `registration_rate_limits`.
2. **Catálogo Académico:** `courses`, `modules`, `lessons`, `lesson_resources`, `course_reviews`.
3. **Progreso y Trazabilidad:** `enrollments`, `lesson_progress`, `session_logs`, `study_notes`, `user_streaks`, `activity_events`.
4. **Evaluaciones y Prácticas:** `assessments`, `questions`, `assessment_attempts`, `assignments`, `assignment_submissions`, `submission_feedback`, `submission_annotations`.
5. **Certificaciones:** `certificates`.
6. **Comunidad y Mensajería:** `tutoring_sessions`, `chat_messages`, `forum_threads`, `forum_posts`, `notifications`.
7. **Finanzas y Cupones:** `payments`, `invoices`, `coupons`, `coupon_redemptions`.
8. **Inteligencia Artificial y Skills:** `skill_nodes`, `skill_edges`, `user_skills`, `ai_knowledge_embeddings`.

---

## 4. Seguridad, RBAC y Políticas RLS

### Matriz de Roles (`AppRole`)
* `alumna`: Acceso exclusivo al Campus Virtual (`/campus`), visualización de sus cursos matriculados, registro de notas de estudio, entrega de prácticas y descarga de su propio diploma.
* `profesor` / `tutor`: Acceso al Panel Docente (`/profesor`), corrección de prácticas asignadas en `course_staff`, calificación de rúbricas y gestión de tutorías.
* `admin_academico`: Acceso a `/admin`, métricas financieras, base de datos de estudiantes, emisión de cupones y matriculación manual.
* `auditor`: Acceso a `/auditoria`, lectura de bitácoras inmutables (`activity_events`), trazabilidad de sesiones e inspección de integridad.
* `superadmin`: Control total y gobernanza de la plataforma.

### Endurecimiento a Nivel de Base de Datos
* **Revocación de Escritura a Clientes:** `anon`, `authenticated` y `PUBLIC` tienen **revocados los permisos directos** de `INSERT`, `UPDATE`, `DELETE` y `TRUNCATE` sobre `user_roles`, `consent_records` y `legal_document_versions`. Toda mutación pasa obligatoriamente por RPCs transaccionales con `SECURITY DEFINER`.
* **Invariante de Superadmin:** La función `manage_user_role_tx` adquiere bloqueos ordenados (`FOR UPDATE`) y prohíbe reducir la cantidad base de superadministradores o permitir que un administrador académico se auto-otorgue privilegios de superadmin.
* **Idempotencia con Advisory Locks:** `record_user_legal_consents` utiliza `pg_advisory_xact_lock` sobre el hash `userId:termsVer:privacyVer` para evitar duplicación de evidencias ante ráfagas concurrentes.

---

## 5. Criptografía, Auditoría y Certificación

### A. Documentos Legales e Inmutabilidad (v2026.2)
* Textos neutrales de preview privada sin aserciones administrativas prematuras.
* Trigger `trg_legal_doc_protect` que genera excepción si se intenta ejecutar un `UPDATE` o `DELETE` sobre una versión publicada.
* Hash SHA-256 verificado en base de datos mediante `extensions.digest(content_text, 'sha256')`.

### B. Emisión y Verificación de Certificados (v2.0)
* **Procedimiento ACID:** `issue_certificate_tx` valida en una sola transacción:
  1. 100% de lecciones completadas en `lesson_progress`.
  2. Aprobación de exámenes teóricos ($\ge 70\%$).
  3. Aprobación de entregas prácticas de modelo ($\ge 70/100$).
  4. Cumplimiento estricto al segundo del tiempo activo requerido ($\ge 80\%$ del estimado del curso).
* **Firma Digital HMAC-SHA-256:**
  ```typescript
  const canonicalPayload = buildCertificateCanonicalPayload({
    version: '2.0',
    code,
    studentId,
    studentName,
    courseId,
    courseTitle,
    totalActiveSeconds,
    issuedAt
  });
  const signature = createHmac('sha256', CERTIFICATE_SIGNING_SECRET)
    .update(canonicalPayload)
    .digest('hex');
  ```
* **Verificación Pública:** En `/verificar-certificado/[code]` cualquier empleador puede ingresar el código (ej. `FABY-2026-X892KLA892`) y el servidor valida criptográficamente la firma sin exponer datos privados de la alumna (DNI, correo, IP).

---

## 6. Estructura del Proyecto y Rutas (Front + API)

```
c:\Users\LENOVO\Desktop\fabi studio\
├── docs/                                  # Manuales y documentación
│   ├── MANUAL_COMPLETO_USUARIO.html       # Manual de usuario interactivo e imprimible
│   └── ARQUITECTURA_TECNICA.md           # Este documento
├── public/                                # Activos públicos y ZIP descargable
├── scripts/                               # Scripts Node.js para testing y seed
│   ├── seed-demo-accounts.mjs             # Sincronización de 5 identidades demo en Supabase
│   ├── test-roles-real.mjs                # Suite live de 26 pruebas de seguridad y RBAC
│   └── audit-db-live.mjs                  # Auditoría de 37 tablas y 89 políticas RLS
├── src/
│   ├── app/
│   │   ├── (public)/                      # Web pública, catálogo, checkout, login, términos
│   │   │   ├── page.tsx                   # Landing page con vídeo showcase
│   │   │   ├── cursos/page.tsx            # Catálogo de cursos
│   │   │   ├── checkout/page.tsx          # Pasarela con cupones y order bump
│   │   │   └── login/page.tsx             # Inicio de sesión seguro
│   │   ├── demo/page.tsx                  # Role Switcher de 1 Clic para pruebas
│   │   ├── campus/                        # Campus Virtual de la Alumna
│   │   │   ├── page.tsx                   # Dashboard (KPIs, progreso, radar de habilidades)
│   │   │   ├── cursos/[courseId]/         # Reproductor de vídeo HD con notas por timestamp
│   │   │   ├── practicas/                 # Subida y visualización de notas con rúbrica
│   │   │   ├── calculadora/               # Calculadora de rentabilidad y precios de salón
│   │   │   ├── certificado/               # Solicitud y encuesta de calidad
│   │   │   └── tutorias/                  # Agendamiento 1 a 1 con sincronización .ics
│   │   ├── profesor/                      # Panel Docente
│   │   │   ├── page.tsx                   # Dashboard docente con horas trazables
│   │   │   ├── evaluar-practica/[id]/     # Corrección con pines y rúbrica de 100 pts
│   │   │   └── alumnas/[id]/              # Expediente detallado de la alumna
│   │   ├── admin/                         # Panel de Dirección (5 pestañas de gestión)
│   │   ├── auditoria/                     # Portal del Inspector Oficial con log inmutable
│   │   └── api/                           # 17 Route Handlers Serverless
│   │       ├── certificates/              # Emisión y verificación
│   │       ├── audit/heartbeat/           # Tracker de actividad cada 45s
│   │       ├── assessments/               # Exámenes teóricos
│   │       └── assignments/               # Prácticas y calificaciones
│   ├── components/                        # Componentes UI reutilizables
│   └── lib/                               # Clientes Supabase, Auth, Cripto y Utilidades
└── supabase/
    └── migrations/                        # 8 Migraciones SQL oficiales
```

---

## 7. Cuentas Demo y Role Switcher

Para facilitar la evaluación inmediata del sistema sin fricción de contraseñas ni registros, se implementó el **Demo Role Switcher** en:
👉 **[https://faby-studio-academy.vercel.app/demo](https://faby-studio-academy.vercel.app/demo)**

**Contraseña universal:** `Faby2026!Demo`

1. **Alumna:** `alumna@fabystudio.academy` (Lucía Martínez) $\rightarrow$ `/campus`
2. **Docente:** `profesora@fabystudio.academy` (Profesora Faby) $\rightarrow$ `/profesor`
3. **Admin Académica:** `admin@fabystudio.academy` (Valeria Directora) $\rightarrow$ `/admin`
4. **Auditor Oficial:** `auditor@fabystudio.academy` (Inspector Oficial) $\rightarrow$ `/auditoria`
5. **Superadmin:** `superadmin@fabystudio.academy` (Superadmin Faby) $\rightarrow$ `/admin`

---

## 8. Suites de Pruebas y Quality Gate

### 1. Validación Estática y Compilación Local
```bash
npm run check
```
Ejecuta secuencialmente:
* `npm run lint`: ESLint estricto $\rightarrow$ **0 errores, 0 warnings**.
* `npm run typecheck`: TypeScript $\rightarrow$ **0 errores**.
* `npm test`: Vitest $\rightarrow$ **19/19 tests unitarios aprobados**.
* `npm run build`: Next.js Build $\rightarrow$ **33 rutas estáticas y serverless compiladas**.

### 2. Matriz de Seguridad Live (`scripts/test-roles-real.mjs`)
Ejecuta 26 validaciones reales contra la API de producción y la base de datos Supabase:
* Autenticación de los 6 roles.
* Rechazo de escrituras directas sobre `user_roles` por usuarios anónimos o alumnos.
* Invariante de conservación de superadmins ante carreras de degradación.
* Concurrencia de consentimientos y bloqueo de mutación legal.
* Emisión de certificados: rechazo anónimo (401), docente no asignada (403), horas insuficientes (409), emisión exitosa en umbral exacto (201) e idempotencia ante duplicados (409).
* Aislamiento RLS en Storage: descarga autorizada para propietaria vs. bloqueo 403 para otra alumna.

### 3. Auditoría de Catálogo PostgreSQL (`scripts/audit-db-live.mjs`)
* Verifica las 8 migraciones sincronizadas.
* Confirma que las 37 tablas tengan RLS habilitado y que las 89 políticas tengan predicados válidos.
* Comprueba que las RPCs críticas sean `SECURITY DEFINER` con `search_path` aislado.

---

## 9. Guía para Desarrolladores

### Requisitos Previos
* Node.js $\ge$ 18.18 (Probado en Node.js 24).
* Supabase CLI (`npx supabase`).
* Vercel CLI (`npx vercel`).

### Variables de Entorno Requeridas (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=https://odsldktasbexyfjpijjg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey...
SUPABASE_SERVICE_ROLE_KEY=ey...
AUDIT_IP_HASH_SALT=faby_studio_audit_salt_2026_secure_sha256_key
CERTIFICATE_SIGNING_SECRET=faby_studio_certificate_secret_hmac_2026_enterprise
NEXT_PUBLIC_APP_URL=https://faby-studio-academy.vercel.app
ENABLE_PUBLIC_REGISTRATION=false
```

### Comandos de Desarrollo
```bash
# Instalar dependencias
npm install

# Iniciar servidor local
npm run dev

# Ejecutar auditoría de base de datos en vivo
npm run db:audit:live

# Sincronizar cuentas demo en Supabase
node scripts/seed-demo-accounts.mjs

# Desplegar a Vercel Producción
npx vercel --prod --yes
```
