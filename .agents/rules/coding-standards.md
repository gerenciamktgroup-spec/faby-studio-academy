# Coding Standards - Fabi Studio Academy

## TypeScript & Code Integrity
1. Strict TypeScript: `noImplicitAny: true`, `strictNullChecks: true`.
2. Clean Modular Functions: Max 50 lines per function. Single Responsibility Principle.
3. Explicit Input Validation: Zod schemas for all form submissions, API parameters, and server actions (`src/validations/`).
4. Error Handling: No swallowed exceptions or empty catch blocks. Always return structured error payloads or throw logged app errors.
5. Zero Hardcoded Secrets: Access environment variables strictly via `process.env.NEXT_PUBLIC_SUPABASE_URL`, etc.
