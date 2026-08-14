# ADR 001: Supabase PostgreSQL Append-Only Audit & Learning Event Engine

## Context & Problem Statement
Fabi Studio Academy requires an audit-ready learning management system (LMS) capable of meeting Spanish regulatory standards (e.g., Orden TMS/369/2019) for vocational training. Passive login/logout logging is insufficient because students could leave browser tabs open for hours without engaging in actual learning.

## Decision
1. **Append-Only Event Sourcing**:
   - `activity_events` is governed by a PostgreSQL database trigger (`trg_protect_activity_events`) that strictly rejects `UPDATE` and `DELETE` operations.
   - Any corrective entries are recorded as new events with `event_type = 'EVENT_CORRECTION'`.
2. **Active Learning Heartbeat (45–60s)**:
   - Client sends pings checking `document.hidden` (Tab Visibility API), video play state, and active DOM mouse/keyboard events.
   - Server-side calculator (`processHeartbeat`) adds `active_seconds` only when real interaction occurs, maintaining a clear separation between **Active Learning Time** and **Logged-In Time**.
3. **Inspection Export Signatures**:
   - Every exported inspection file (CSV, JSON, XLSX, PDF) generates a cryptographic SHA-256 hash stored in `audit_exports` for immutable verification.
