---
name: faby-security-review
description: Security review checklist for RBAC, RLS policies, audit immutability, and RGPD compliance.
---

# Fabi Security Review Skill

## Core Checks
1. Validate RLS policies on all Supabase tables (`alumna`, `tutor`, `profesor`, `admin_academico`, `superadmin`, `auditor`).
2. Ensure `activity_events` has strictly append-only security rules.
3. Verify Auditor role has 100% read-only privileges across all tables.
4. Verify RGPD data minimisation and hash-anonymization for IP addresses.
