# FABY STUDIO ACADEMY — Defensive Demo Reset Procedure

> [!CAUTION]
> This reset procedure contains defensive environment guards. It strictly aborts execution if `NEXT_PUBLIC_APP_ENV !== 'demo'`.

## Safety Guard Implementation
The function `assertDemoEnvironment('resetDemoDataset')` in `src/lib/demo-config.ts` prevents accidental truncation or deletion of production data.

## Reset Steps
1. Verify `NEXT_PUBLIC_APP_ENV=demo` in `.env`.
2. Run database re-seed script:
   ```sql
   \i supabase/seed/demo_seed.sql
   ```
3. Clear client-side `sessionStorage` and `localStorage` flags (`fabi_session_id`, `fabi_onboarding_completed`).
