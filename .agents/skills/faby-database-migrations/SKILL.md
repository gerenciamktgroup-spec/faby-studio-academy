---
name: faby-database-migrations
description: Database migration and seed guidelines for Supabase PostgreSQL schema.
---

# Fabi Database Migrations Skill

## Migration Principles
- Migrations reside in `supabase/migrations/`.
- Seed data resides in `supabase/seed/seed.sql`.
- Every migration must be idempotent and include RLS policies.
- Tables created: `profiles`, `user_roles`, `courses`, `modules`, `lessons`, `enrollments`, `lesson_progress`, `activity_events`, `session_logs`, `assessments`, `questions`, `assessment_attempts`, `assignments`, `assignment_submissions`, `tutoring_sessions`, `forums`, `forum_posts`, `messages`, `certificates`, `audit_exports`, `consent_records`, `privacy_policy_versions`, `data_deletion_requests`, `data_retention_policies`.
