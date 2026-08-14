# Database & Security Rules - Fabi Studio Academy

## PostgreSQL & Supabase Security
1. **Row Level Security (RLS)**: Mandatory RLS on EVERY table in `public` schema.
2. **Role Enums**:
   - `alumna`
   - `tutor`
   - `profesor`
   - `admin_academico`
   - `superadmin`
   - `auditor`
3. **Auditor Profile**: Auditors have strictly `SELECT` permissions on course, progress, heartbeat, assessment, and audit tables. Zero `INSERT`/`UPDATE`/`DELETE` capabilities.
4. **Append-Only Activity Events**: `activity_events` and `audit_exports` tables prohibit direct updates or deletions via RLS policies.
5. **Data Hashing**: IP addresses stored in `activity_events` MUST be anonymized/hashed using SHA-256 (`ip_hash`).
