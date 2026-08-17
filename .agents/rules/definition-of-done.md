# Definition of Done (DoD) — Faby Studio Academy

Cada cambio, módulo o entrega debe validar los siguientes criterios mediante su comando ejecutable exacto antes de considerarse completado:

- [ ] **1. Linting Estricto (0 Warnings / 0 Errors)**:
  Comando: `npm run lint` (`eslint . --max-warnings=0`)
- [ ] **2. Comprobación de Tipos TypeScript (0 Errores)**:
  Comando: `npm run typecheck` (`tsc --noEmit`)
- [ ] **3. Pruebas Unitarias Automatizadas (100% Verdes)**:
  Comando: `npm test` (`vitest run`)
- [ ] **4. Compilación de Producción Next.js**:
  Comando: `npm run build` (`next build`)
- [ ] **5. Auditoría del Catálogo PostgreSQL en Vivo (38 Tablas con RLS, 89 Políticas, 9 Migraciones)**:
  Comando: `npm run db:audit:live` (`node scripts/audit-db-live.mjs`)
- [ ] **6. Matriz de Roles, Lista Blanca y Seguridad Live (31/31 Comprobaciones)**:
  Comando: `node scripts/test-roles-real.mjs`
- [ ] **7. Pruebas de Extremo a Extremo (E2E)**:
  Comando: `npm run test:e2e` (`playwright test`)
- [ ] **8. Quality Gate Integral Automatizado**:
  Comando: `npm run check`
