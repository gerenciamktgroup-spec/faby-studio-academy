# Faby Studio Academy

LMS especializado en formación profesional de belleza, con separación real de responsabilidades para alumnas, tutoras/profesoras, administración académica, superadministración y auditoría.

## Capacidades implementadas

- Supabase Auth SSR: registro, acceso, recuperación, actualización de contraseña y cierre de sesión.
- RBAC y RLS: alcance por rol, curso, matrícula y relación docente-alumna.
- Campus: cursos, progreso persistente, tiempo activo, evaluaciones calificadas en servidor, prácticas privadas, mensajes, foros, tutorías, notificaciones, perfil y certificados verificables.
- Docencia: autoría de módulos, lecciones, evaluaciones, preguntas, prácticas y foros; expedientes; rúbricas; tutorías; emisión de certificados.
- Administración: invitaciones, asignación/revocación de roles, matrículas, asignación docente, cursos y solicitudes de privacidad.
- Auditoría: eventos inmutables, horas activas, filtros API y exportación CSV/JSON.
- Seguridad: mutaciones académicas sensibles exclusivamente en servidor, validación Zod, cabeceras de seguridad, buckets privados y protección por middleware más templates de servidor.
- Calidad: TypeScript estricto, Vitest, Playwright y workflow de GitHub Actions.

## Configuración local

1. Copia `.env.example` a `.env.local` y completa las claves.
2. Crea un proyecto Supabase y aplica las migraciones en orden.
3. Carga `supabase/seed/seed.sql` para crear el catálogo inicial sin usuarios ficticios.
4. Crea la primera cuenta superadmin de manera controlada desde Supabase.
5. Ejecuta:

```bash
npm ci
npm run check
npm run dev
```

Variables obligatorias para operación completa:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (solo servidor)
- `AUDIT_IP_HASH_SALT`
- `CERTIFICATE_SIGNING_SECRET`
- `NEXT_PUBLIC_APP_URL`

`NEXT_PUBLIC_WHATSAPP_NUMBER` es opcional. Si no existe, el acceso de WhatsApp no se renderiza.

## Reglas operativas

- No colocar jamás `SUPABASE_SERVICE_ROLE_KEY` en una variable `NEXT_PUBLIC_*`.
- No publicar cursos sin lecciones, evaluación válida, práctica y responsables asignados.
- No emitir certificados hasta que la matrícula figure como completada.
- No considerar producción aprobada sin ejecutar migraciones y pruebas integradas contra un proyecto Supabase de staging.
- El endpoint de checkout falla de forma segura hasta configurar un proveedor de pagos y webhooks.

Consulta [docs/PRODUCTION_READINESS.md](docs/PRODUCTION_READINESS.md) para la auditoría de salida y el plan autónomo restante.
