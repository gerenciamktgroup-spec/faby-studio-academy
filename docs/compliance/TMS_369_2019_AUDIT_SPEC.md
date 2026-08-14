# Specification: Compliance with Orden TMS/369/2019 & Spanish EdTech Audit Regulations

## 1. Concurrency & Operation 24x7
Fabi Studio Academy runs on Vercel Fluid Compute with Supabase PostgreSQL connection pooling, supporting 40%+ active student concurrency without cold-start bottlenecks.

## 2. Access Control & Role Models
Six distinct RBAC roles are enforced via Row Level Security (RLS):
- `alumna`: Enrolls, views course materials, takes quizzes, submits assignments.
- `tutor`: Monitors student active time, provides feedback, conducts 1-on-1 tutoring.
- `profesor`: Manages course content, authoring, and assessment criteria.
- `admin_academico`: Academic operations, user enrollment, system configuration.
- `superadmin`: Platform parameters and security policies.
- `auditor`: Strictly read-only access to all active learning time logs, attempts, and hash-signed export generation.

## 3. Active Time vs Logged-In Time
Heartbeats sent every 45s record:
- Tab visibility state (`isTabVisible`)
- Active video playback (`isVideoPlaying`)
- User interaction timestamps

Only validated active interval periods contribute to `total_active_hours` on accredited certificates.
