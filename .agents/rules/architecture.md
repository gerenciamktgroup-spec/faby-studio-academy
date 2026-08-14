# Architecture Rules - Fabi Studio Academy

## 1. Stack & Core Guidelines
- Framework: Next.js 14+ (App Router), React 18+, TypeScript (strict mode enabled).
- Styling: Tailwind CSS with custom Fabi Studio Design System tokens (`#E91E63` primary, `#C2185B` deep fuchsia, `#121212` charcoal background accents, `#FDF2F8` soft rose container fills).
- Database & Auth: Supabase (PostgreSQL, Row Level Security, Realtime, Storage, Audit).
- API Layer: Next.js Server Components, Server Actions (`src/server/actions`), and Route Handlers (`src/app/api`).

## 2. Layer Separation
- `src/app/`: File-system routing, Page components, Layouts, API endpoints.
- `src/features/`: Feature-sliced architecture (`auth`, `courses`, `enrollments`, `progress`, `assessments`, `audit`, `certificates`, etc.).
- `src/components/`: Reusable UI elements (`ui/`, `layout/`, `shared/`).
- `src/lib/`: Database clients, utilities, formatters, audit event dispatchers.
- `src/server/`: Server-side actions, database queries, and business logic.
- `src/types/`: Domain models, DB entity definitions, API request/response contracts.

## 3. Immutability & Event Sourcing
- All learning progress actions MUST emit append-only records to `activity_events`.
- Never mutate or delete audit logs. Event corrections MUST add corrective events (`event_type: EVENT_CORRECTION`).
