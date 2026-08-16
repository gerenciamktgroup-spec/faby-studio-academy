# Auditoría de preparación para producción

Fecha de corte: 16 de agosto de 2026.

## Dictamen

La plataforma ya tiene un núcleo full-stack funcional y coherente para los cuatro frentes operativos, pero **todavía no debe abrirse a ventas públicas**. El código de aplicación supera compilación y pruebas locales; la aprobación final depende de infraestructura, negocio y validación integrada que no pueden inferirse del repositorio.

## Cobertura frente a LMS de referencia

| Área | Alumna | Docencia | Administración | Auditoría | Estado |
|---|---|---|---|---|---|
| Identidad y acceso | Registro, login, recuperación | Acceso por rol | Invitación y roles | Acceso separado | Implementado |
| Catálogo y contenidos | Reproductor por módulos | Autoría y publicación | Creación de cursos | Visibilidad controlada | Implementado |
| Evaluaciones | Intentos y nota de servidor | Evaluaciones/preguntas | Control por curso | Evento de calificación | Implementado |
| Prácticas | Evidencia privada | Rúbrica y feedback | Pendientes globales | Evidencia de evento | Implementado |
| Progreso | Lecciones y horas activas | Expediente individual | Métricas de matrícula | Registro append-only | Implementado |
| Acompañamiento | Mensajes, foros, tutorías | Gestión de tutorías | Asignación de staff | Trazabilidad | Implementado |
| Certificación | Vista, impresión y validación | Emisión firmada | Conteo y estado | Consulta verificable | Implementado |
| Privacidad | Solicitud de eliminación | — | Revisión/rechazo | Lectura por rol | Parcial: ejecución legal manual |
| Pagos | Checkout bloqueado | — | Matrícula manual confirmada | — | Bloqueador comercial |
| IA adaptativa | No se publica simulación | — | — | — | Fuera del MVP hasta proveedor/RAG real |

El alcance busca el patrón común de Coursera/Crehana (catálogo, rutas, progreso, evaluación, certificación y comunidad) y agrega necesidades del sector belleza: evidencias fotográficas privadas, rúbrica técnica, tutoría, cálculo de rentabilidad de salón y horas activas auditables.

## Controles de seguridad aplicados

- La identidad siempre deriva de `auth.uid()`; las APIs no aceptan un usuario elegido por el cliente.
- RLS limita lectura por matrícula, curso asignado y rol.
- Horas, progreso, intentos, notas, eventos y certificados no admiten escritura directa del rol `authenticated`.
- Los heartbeats se contabilizan según tiempo transcurrido en servidor y tienen incremento máximo por intervalo.
- Las respuestas correctas no se conceden al rol autenticado; la calificación ocurre en RPC de servidor.
- Evidencias, recursos y certificados utilizan buckets privados.
- IP de auditoría se almacena como hash SHA-256 con sal secreta.
- CSV protege contra fórmulas inyectadas.
- La clave de servicio se crea en un cliente de servidor separado, sin cookies de usuario.

## Bloqueadores antes del lanzamiento

1. Crear staging Supabase y ejecutar todas las migraciones con `supabase db lint` y `supabase db push`.
2. Ejecutar pruebas integradas reales con una cuenta por rol y probar RLS positiva y negativamente.
3. Elegir país fiscal, moneda y proveedor de pago; implementar checkout, webhook idempotente, reembolsos y conciliación.
4. Configurar SMTP transaccional, plantillas de invitación/recuperación y dominio de correo.
5. Cargar contenido final, derechos de video, rúbricas, tutoras, calendarios y criterios de finalización.
6. Definir procedimiento legal de eliminación, retención, consentimiento, términos y política de privacidad aplicables al país.
7. Configurar dominio, observabilidad, alertas, copias de seguridad, recuperación y rotación de secretos.
8. Ejecutar accesibilidad, pruebas móviles, carga, restauración de backup y aceptación del negocio.

## Plan autónomo restante

### Fase 1 — staging y seguridad

- Aplicar esquema y seed.
- Crear fixtures de roles sin contraseñas en el repositorio.
- Probar acceso cruzado: alumna-alumna, docente-curso, auditor-administración.
- Corregir cualquier hallazgo del Security Advisor de Supabase.

### Fase 2 — operación comercial

- Implementar el proveedor elegido con órdenes, pagos y webhooks idempotentes.
- Crear matrícula solo después de confirmación verificable o aprobación administrativa de pago offline.
- Añadir facturas/recibos únicamente a partir de transacciones reales.

### Fase 3 — contenidos y certificación

- Cargar recursos en Storage privado.
- Definir reglas automáticas de finalización por curso.
- Incorporar documento PDF de certificado generado y almacenado, si el negocio lo requiere además de impresión web.

### Fase 4 — lanzamiento controlado

- Piloto con un curso, una docente y un grupo pequeño de alumnas.
- Medir errores, abandono, tiempos de feedback y asistencia a tutorías.
- Abrir ventas solo después de la aceptación firmada de seguridad, academia y administración.

## Puertas de calidad ejecutables

```bash
npm run typecheck
npm test
npm run build
npm run test:e2e
node scripts/setup-database.mjs
```

La prueba E2E completa requiere Chromium instalado y un entorno de staging para validar flujos autenticados. El workflow de GitHub instala Chromium automáticamente.

## Referencias técnicas primarias

- Next.js July 2026 Security Release: https://nextjs.org/blog/july-2026-security-release
- Next.js upgrade guide: https://nextjs.org/docs/app/getting-started/upgrading
- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase API security (grants + RLS): https://supabase.com/docs/guides/api/securing-your-api
- Supabase API keys: https://supabase.com/docs/guides/getting-started/api-keys
