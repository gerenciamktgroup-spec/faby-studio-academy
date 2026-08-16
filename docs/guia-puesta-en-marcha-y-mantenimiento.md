# 🛠️ GUÍA DE PUESTA EN MARCHA Y MANTENIMIENTO TÉCNICO
**Manual de Administración de Infraestructura, Base de Datos y Dominio**
*FABY STUDIO ACADEMY*

---

## ⚡ 1. Configuración de Base de Datos Cloud (Supabase PostgreSQL)

La aplicación cuenta con una arquitectura híbrida: opera en **Modo Sandbox / Local** con datos seed en memoria de forma inmediata y conmuta automáticamente a **Supabase Cloud** al definir las siguientes variables de entorno:

### Variables Requeridas en `.env.local` y en el Dashboard de Vercel:

```env
# URL de tu proyecto Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co

# Clave pública de cliente (Anon Key)
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_publica_aqui

# Clave de administración (Service Role - NUNCA exponer al cliente)
SUPABASE_SERVICE_ROLE_KEY=tu_clave_service_role_aqui
```

### Ejecutar y Validar el Esquema en Supabase:
1. Accede al **SQL Editor** de tu proyecto Supabase en `app.supabase.com`.
2. Ejecuta en orden las 3 migraciones ubicadas en `supabase/migrations/`:
   * `20260808000000_faby_academy_schema.sql` (Esquema maestro, tablas y RLS).
   * `20260816000000_faby_skill_graph.sql` (Skill Graph, evidencias y pasaportes).
   * `20260817000000_faby_ai_rag_pgvector.sql` (RAG Knowledge y soporte vectorial).
3. Ejecuta los datos de prueba desde `supabase/seed/demo_seed.sql`.
4. Verifica la integridad ejecutando localmente:
   ```bash
   npm run db:audit
   ```

---

## 🌐 2. Vinculación de Dominio Personalizado en Vercel

Para apuntar tu propio dominio (ej. `fabystudio.academy` o `campus.fabystudio.com`):

1. Ve a [vercel.com](https://vercel.com) e ingresa al proyecto **faby-studio-academy**.
2. Dirígete a **Settings** → **Domains**.
3. Haz clic en **Add** e introduce tu dominio.
4. En tu proveedor de DNS (GoDaddy, Namecheap, Cloudflare, DonDominio), añade los registros indicados:
   * **Registro CNAME**: `cname.vercel-dns.com` (para subdominios como `campus.fabystudio.com`).
   * **Registro A**: `76.76.21.21` (para dominio raíz `fabystudio.academy`).
5. Vercel emitirá automáticamente el certificado de seguridad SSL/TLS con renovación automática sin coste.

---

## 🧪 3. Comandos de Mantenimiento y Validación

| Tarea de Mantenimiento | Comando en Terminal | Resultado Esperado |
| :--- | :--- | :--- |
| **Auditoría de Esquema SQL** | `npm run db:audit` | Verifica 34 tablas, triggers de no-manipulación y RLS. |
| **Pruebas Automatizadas Unit & E2E** | `npm test -- --run` | Ejecuta las 23 pruebas de los 12 flujos críticos. |
| **Chequeo de Tipos TypeScript** | `npx tsc --noEmit` | Valida 0 errores de tipado estricto. |
| **Compilación de Producción** | `npm run build` | Genera el bundle de las 44 rutas estáticas y dinámicas. |
| **Despliegue Inmediato a Vercel** | `npx vercel --prod --yes` | Despliega y publica los cambios directamente en producción. |

---

## 🔐 4. Protocolo de Respaldo y Seguridad

1. **Backups Automáticos de Base de Datos**: Supabase realiza copias de seguridad diarias automatizadas (*Point-in-Time Recovery*).
2. **Exportación de Auditoría Oficial**: En caso de inspección de la administración laboral (SEPE/FUNDAE), ingresa a `/auditoria` y descarga el expediente completo en formato CSV/JSON firmado criptográficamente.
