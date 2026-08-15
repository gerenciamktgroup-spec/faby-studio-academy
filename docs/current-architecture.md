# 🏛️ Current Architecture Audit — FABY STUDIO ACADEMY

**Document Version:** 1.0.0  
**Status:** Audited & Verified  
**Date:** Agosto 2026  
**System Classification:** Vertical EdTech & LMS Modular Monolith (Hybrid Demo & Supabase Cloud)

---

## 1. Executive Summary & Stack Overview

FABY STUDIO ACADEMY is built as a high-performance **Modular Monolith** using Next.js 14 (App Router) on Vercel Fluid Compute, backed by PostgreSQL 15 on Supabase with Row Level Security (RLS) and cryptographic append-only event logging.

### Core Technology Stack

| Layer | Technology | Version / Specification | Rationale & Status |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `14.2.24` | React Server Components + Client Workspaces |
| **Language** | TypeScript | `5.7.3` (Strict Mode) | Zero build-time type errors (`tsc --noEmit`) |
| **Styling** | Tailwind CSS + Vanilla CSS | `3.4.17` | Bespoke luxury aesthetic, responsive design system |
| **Icons** | Lucide React | `0.475.0` | Comprehensive semantic icon set |
| **Database** | PostgreSQL 15 (Supabase) | `@supabase/ssr` `0.5.2` | 24 tables, 11 RLS policies, append-only triggers |
| **Client Auth/DB** | `@supabase/supabase-js` | `2.48.1` | Cookie-based session handling via Next.js middleware |
| **Testing** | Vitest + Playwright | Vitest `3.0.5`, Playwright `1.50.1` | Unit + E2E integration test harnesses |
| **Deployment** | Vercel Edge / Fluid Compute | Node.js 20.x | Global edge caching & WAF protection |

---

## 2. Simplified C4 Architecture Model

### C4 Level 1: System Context Diagram

```mermaid
C4Context
    title System Context Diagram - FABY STUDIO ACADEMY

    Person(student, "Alumna / Estudiante", "Accede a cursos, video streaming, notas, flashcards, calculadora y entrega prácticas.")
    Person(instructor, "Docente / Tutora", "Evalúa prácticas con rúbricas de 100 pts, resuelve dudas y realiza tutorías 1 a 1.")
    Person(admin, "Dirección Académica", "Gestiona matrículas, cohortes, altas de cursos y supervisa KPIs de negocio.")
    Person(auditor, "Auditor Oficial / Inspector", "Inspecciona tiempos activos (TMS/369/2019) y exporta actas firmadas.")
    Person(public_user, "Público / Empleador", "Valida diplomas por QR/hash y explora el catálogo de formación.")

    System(faby_system, "FABY STUDIO ACADEMY", "Plataforma EdTech vertical: LMS, evaluación práctica, trazabilidad legal y campus.")

    System_Ext(supabase, "Supabase Cloud (PostgreSQL 15)", "Auth, base de datos relacional, RLS, storage y triggers inmutables.")
    System_Ext(stripe, "Pasarelas de Pago (Stripe/Bizum)", "Procesamiento de pagos y webhooks.")
    System_Ext(video_cdn, "Video Streaming CDN", "Distribución de video educativo de alta resolución.")

    Rel(student, faby_system, "Aprende, practica, interactúa y se certifica", "HTTPS/WSS")
    Rel(instructor, faby_system, "Corrige prácticas fotográficas y tutoriza", "HTTPS")
    Rel(admin, faby_system, "Administra catálogo y expedientes", "HTTPS")
    Rel(auditor, faby_system, "Audita horas reales y descarga actas SHA-256", "HTTPS")
    Rel(public_user, faby_system, "Verifica autenticidad de diplomas", "HTTPS")

    Rel(faby_system, supabase, "Persistencia relacional, RLS y Auth", "PostgreSQL / HTTPS")
    Rel(faby_system, stripe, "Cobro de matrículas y order bumps", "HTTPS API")
    Rel(faby_system, video_cdn, "Streaming de video seguro", "HTTPS")
```

---

### C4 Level 2: Container Diagram

```mermaid
C4Container
    title Container Diagram - Application Architecture

    Container(spa, "Next.js Web & PWA Client", "React 18, Tailwind, TypeScript", "Frontend interactivo para alumnas, profesoras, administradores y público.")
    Container(edge_waf, "Next.js Security Middleware", "Edge Runtime", "Filtrado de scanners (sqlmap, nikto), path traversal y refresco de sesión JWT.")
    Container(api_layer, "API Route Handlers", "Next.js Serverless", "/api/checkout, /api/assignments, /api/audit/*, /api/certificates")
    Container(services_layer, "Domain Services Engine", "TypeScript Modules", "Active learning calculator, audit logger, export generator, payment gateway.")
    ContainerDb(postgres, "PostgreSQL 15 Database", "Supabase", "24 tablas estructuradas, triggers inmutables y 11 políticas RLS.")
    Container(storage, "Supabase Object Storage", "S3 Compatible", "Almacenamiento de evidencias fotográficas, guías PDF y certificados.")

    Rel(spa, edge_waf, "Peticiones HTTP/HTTPS", "TLS 1.3")
    Rel(edge_waf, api_layer, "Rutas API autenticadas", "Internal")
    Rel(edge_waf, spa, "Páginas renderizadas en servidor/cliente", "Internal")
    Rel(api_layer, services_layer, "Invoca lógica de dominio", "TypeScript")
    Rel(services_layer, postgres, "Lecturas y escrituras con RLS", "PostgreSQL TCP / REST")
    Rel(services_layer, storage, "Carga de fotos de prácticas y PDFs", "HTTPS")
```

---

## 3. Modular Domain Organization

The codebase is organized into discrete domain packages within `src/`:

```
src/
├── app/                        # Next.js App Router Tree
│   ├── (public)/               # Public Funnel (Landing, Catálogo, Checkout, Login)
│   ├── campus/                 # Student LMS Experience (Player, Flashcards, Calculadora, etc.)
│   ├── profesor/               # Teacher Portal (Buzón de Rúbricas, Expedientes, Cursos)
│   ├── admin/                  # Academic Operations & Direction
│   ├── auditoria/              # TMS/369 Inspection & Audit Log Suite
│   ├── verificar-certificado/  # Public Certificate Verification Portal
│   └── api/                    # Serverless API Handlers
├── components/                 # Component Library
│   ├── layout/                 # Public & Campus Navigation Shells
│   ├── shared/                 # FabyAIAssistant, BeforeAfterSlider, VisualFeedbackAnnotator, StreakTracker
│   └── ui/                     # Primitives
├── lib/                        # Domain Engines & Utilities
│   ├── supabase/               # Browser, Server, Middleware clients
│   ├── active-learning-calculator.ts # Heartbeat & TMS/369 time engine
│   ├── audit-logger.ts         # Append-only activity logger with SHA-256 IP hashing
│   ├── export-generator.ts     # Inspection act generator (PDF/CSV/XLSX/JSON)
│   ├── calendar-sync.ts        # Google / Outlook / Apple iCal sync
│   └── services-demo/          # Deterministic in-memory sandbox fallbacks
└── types/                      # Global TypeScript Definitions
```

---

## 4. Current State Classification: Dual-Mode Architecture

The platform operates on an intelligent **Hybrid Dual-Mode**:
1. **Cloud Production Mode**: When `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` point to a live Supabase project, all data reads and writes run through PostgreSQL with active RLS and trigger enforcement.
2. **Sandbox / Demo Fallback Mode**: When running in unlinked local environments or demo presentations, fallback services (`src/lib/services-demo/*`) provide instant state persistence and deterministic data to prevent UI breakdown.
