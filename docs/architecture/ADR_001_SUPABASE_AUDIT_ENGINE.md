# ADR 001: Supabase PostgreSQL Append-Only Audit & Learning Event Engine

## Context & Problem Statement
Fabi Studio Academy necesita trazabilidad verificable del aprendizaje. Esta decisión es un control técnico, no una certificación regulatoria. El acceso pasivo no basta porque una pestaña puede permanecer abierta sin interacción.

## Decision
1. **Append-Only Event Sourcing**:
   - `activity_events` is governed by a PostgreSQL database trigger (`trg_protect_activity_events`) that strictly rejects `UPDATE` and `DELETE` operations.
   - Any corrective entries are recorded as new events with `event_type = 'EVENT_CORRECTION'`.
2. **Active Learning Heartbeat (45–60s)**:
   - Client sends pings checking `document.hidden` (Tab Visibility API), video play state, and active DOM mouse/keyboard events.
   - Server-side calculator (`processHeartbeat`) adds `active_seconds` only when real interaction occurs, maintaining a clear separation between **Active Learning Time** and **Logged-In Time**.
3. **Inspection Export Signatures**:
   - Cada exportación implementada (CSV o JSON) genera un hash SHA-256 almacenado en `audit_exports` para verificar integridad.
