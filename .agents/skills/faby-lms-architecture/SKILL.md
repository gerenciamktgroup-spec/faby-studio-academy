---
name: faby-lms-architecture
description: Architecture guidelines, domain modeling, and technical hierarchy for Fabi Studio Academy LMS.
---

# Fabi LMS Architecture Skill

## Architectural Stack
- **Framework**: Next.js 14+ App Router, Server Actions, TypeScript.
- **Backend/DB**: Supabase PostgreSQL with RLS, Auth, Realtime, and Storage.
- **Audit Subsystem**: TMS/369/2019-compliant immutable active learning event logger.

## Domain Model Pipeline
```
Alumna -> Enrollment -> Course -> Module -> Lesson -> Activity -> Assessment -> Attempt -> Result -> Tutoring -> Certificate
```
