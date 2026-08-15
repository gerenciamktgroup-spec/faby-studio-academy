# 🗺️ Current Route Map & Functionality Inventory — FABY STUDIO ACADEMY

**Document Version:** 1.0.0  
**Audit Date:** Agosto 2026  
**Auditor:** Principal Software Architect

---

## 1. Classification Methodology

Every URL and functional module in the codebase is categorized into one of 7 standardized states:
* 🟢 **REAL Y FUNCIONAL**: Totalmente conectada, interactiva y con validaciones completas.
* 🟡 **REAL PERO INCOMPLETA**: Conectada y operativa, pero requiere extender capacidades avanzadas (ej. RAG en AI, pasarela real Stripe vs sandbox).
* 🔵 **DEMO**: Diseñada intencionalmente para exhibición comercial con datos deterministas de prueba.
* 🟣 **MOCK**: Utiliza estructuras estáticas sin mutación o simulación en memoria.
* 🟠 **HARDCODEADA**: Valores numéricos o textos fijos que deben ser alimentados por el CMS o base de datos.
* 🔴 **ROTA**: Presenta errores de ejecución o enlaces que fallan (0 detectadas actualmente).
* ⚫ **AUSENTE**: Funcionalidad planificada pero no desarrollada aún (ej. Skill Passport público, Matching de empleo).

---

## 2. Comprehensive Route Inventory & Status Table

### 1. Embudo Público & Ventas

| Ruta / URL | Tipo | Estado | Descripción & Hallazgos |
| :--- | :--- | :--- | :--- |
| `/` | Pública | 🟢 **REAL Y FUNCIONAL** | Landing page oficial, catálogo destacado, testimonios y CTA de admisión. |
| `/cursos` | Pública | 🟢 **REAL Y FUNCIONAL** | Catálogo completo con buscador, filtrado por categorías y badges. |
| `/cursos/[courseSlug]` | Pública | 🟢 **REAL Y FUNCIONAL** | Páginas individuales de venta (`extensiones-de-pestanas`, `unas-de-gel-y-acrilico`, `cosmetologia-facial`) con temario y garantía. |
| `/checkout` | Pública | 🟢 **REAL Y FUNCIONAL** | Checkout multimétodo (tarjeta, bizum, reserva local), cupón `FABYPRO20` dinámico y order bump de Kit de herramientas (49€). |
| `/login` | Pública | 🟢 **REAL Y FUNCIONAL** | Formulario de autenticación con acceso rápido por perfiles demo y conexión Supabase. |
| `/registro` | Pública | 🟢 **REAL Y FUNCIONAL** | Formulario de alta con validación de contraseña y consentimiento RGPD. |
| `/recuperar-password` | Pública | 🟢 **REAL Y FUNCIONAL** | Flujo de restablecimiento de contraseña. |
| `/privacidad` | Pública | 🟢 **REAL Y FUNCIONAL** | Política de privacidad y tratamiento de datos conforme a RGPD / LOPDGDD. |
| `/terminos` | Pública | 🟢 **REAL Y FUNCIONAL** | Términos y condiciones del servicio formativo. |
| `/verificar-certificado` | Pública | 🟢 **REAL Y FUNCIONAL** | Portal de búsqueda de diplomas por código único con accesos de prueba. |
| `/verificar-certificado/[code]` | Pública | 🟢 **REAL Y FUNCIONAL** | Vista de validación pública de certificado con firma hash SHA-256 inmutable. |

---

### 2. Campus Estudiantil (`/campus/*`)

| Ruta / URL | Tipo | Estado | Descripción & Hallazgos |
| :--- | :--- | :--- | :--- |
| `/campus` | Estudiante | 🟢 **REAL Y FUNCIONAL** | Dashboard general de la alumna con progreso (68%), horas activas reales (1.8h), rachas diarias 🔥 y widget Faby AI. |
| `/campus/cursos/[courseId]` | Estudiante | 🟢 **REAL Y FUNCIONAL** | Reproductor LMS interactivo con pestañas de Contenido, Notas con timestamp, Q&A, Exámenes, Prácticas, Recursos PDF y Capítulos con salto temporal. |
| `/campus/proyectos` | Estudiante | 🟢 **REAL Y FUNCIONAL** | Portafolio con **Comparador Antes / Después** interactivo (Split-screen slider) y galería de trabajos. |
| `/campus/practicas` | Estudiante | 🟢 **REAL Y FUNCIONAL** | Sistema de evaluación técnica con **Anotador Visual con Pines (1-4)** sobre fotografía real y rúbrica de 100 puntos. |
| `/campus/flashcards` | Estudiante | 🟢 **REAL Y FUNCIONAL** | Motor de repaso espaciado en 3 minutos con tarjetas 3D interactivas, 3 mazos y asignación de XP. |
| `/campus/calculadora` | Estudiante | 🟢 **REAL Y FUNCIONAL** | Herramienta de rentabilidad y costes de salón con cálculo de punto de equilibrio, PVP recomendado y exportación imprimible. |
| `/campus/tutorias` | Estudiante | 🟢 **REAL Y FUNCIONAL** | Reserva de mentorías individuales 1 a 1 con sincronización a Google Calendar, Outlook y descarga `.ics`. |
| `/campus/calendario` | Estudiante | 🟢 **REAL Y FUNCIONAL** | Calendario académico con eventos sincrónicos, fechas de entrega y botón de sincronización universal. |
| `/campus/comunidad` | Estudiante | 🟢 **REAL Y FUNCIONAL** | Foro de debate entre alumnas y anuncios oficiales de la academia. |
| `/campus/mensajes` | Estudiante | 🟢 **REAL Y FUNCIONAL** | Chat bidireccional directo alumna ↔ tutora acreditada. |
| `/campus/logros` | Estudiante | 🟢 **REAL Y FUNCIONAL** | Sistema de insignias y gamificación por hitos alcanzados. |
| `/campus/certificado` | Estudiante | 🟢 **REAL Y FUNCIONAL** | Acreditación oficial con **Cuestionario Obligatorio de Calidad SEPE/FUNDAE** previo a la descarga. |
| `/campus/perfil` | Estudiante | 🟢 **REAL Y FUNCIONAL** | Datos personales, facturas fiscales y preferencias de notificación. |
| `/campus/soporte` | Estudiante | 🟢 **REAL Y FUNCIONAL** | Centro de ayuda, FAQs y enlace prioritario de soporte por WhatsApp. |
| `/campus/onboarding` | Estudiante | 🟢 **REAL Y FUNCIONAL** | Asistente de bienvenida en 4 pasos para nuevas alumnas. |

---

### 3. Portal Docente & Gestión Académica (`/profesor/*`)

| Ruta / URL | Tipo | Estado | Descripción & Hallazgos |
| :--- | :--- | :--- | :--- |
| `/profesor` | Docente | 🟢 **REAL Y FUNCIONAL** | Panel de control docente con KPIs de alumnas activas, horas trazables y accesos rápidos. |
| `/profesor/evaluar-practica` | Docente | 🟢 **REAL Y FUNCIONAL** | Buzón de corrección de entregas fotográficas con filtros por estado. |
| `/profesor/evaluar-practica/[id]` | Docente | 🟢 **REAL Y FUNCIONAL** | Herramienta de calificación interactiva por rúbrica oficial de 100 puntos con feedback por criterio. |
| `/profesor/alumnas` | Docente | 🟢 **REAL Y FUNCIONAL** | Directorio de expedientes de alumnas con barras de progreso y horas activas reales. |
| `/profesor/alumnas/[id]` | Docente | 🟢 **REAL Y FUNCIONAL** | Ficha detallada del expediente individual con registro de eventos TMS/369. |
| `/profesor/cursos` | Docente | 🟢 **REAL Y FUNCIONAL** | Catálogo de cursos asignados a la tutora con métricas de graduación. |
| `/profesor/cursos/nuevo` | Docente | 🟢 **REAL Y FUNCIONAL** | Asistente para creación de módulos y lecciones. |

---

### 4. Dirección & Auditoría Regulatoria

| Ruta / URL | Tipo | Estado | Descripción & Hallazgos |
| :--- | :--- | :--- | :--- |
| `/admin` | Dirección | 🟢 **REAL Y FUNCIONAL** | Dashboard ejecutivo con gestión de cohortes, alumnas, métricas financieras y cursos. |
| `/auditoria` | Inspector | 🟢 **REAL Y FUNCIONAL** | Suite de auditoría conforme a la Orden TMS/369/2019 con stream inmutable de eventos y generador de actas firmadas SHA-256 en PDF, CSV, XLSX y JSON. |
| `/demo` | Stakeholder | 🔵 **DEMO** | Conmutador de roles para testing rápido entre Alumna, Profesora, Administrador y Auditor. |

---

### 5. Nuevos Dominios Estratégicos (Planificados para Release 2-4)

| Funcionalidad / Ruta Futura | Tipo | Estado | Roadmap |
| :--- | :--- | :--- | :--- |
| `/perfil-profesional/[slug]` (Skill Passport) | Empleabilidad | ⚫ **AUSENTE** | Release 2 / Release 4 |
| `/campus/skill-graph` (Grafo de Competencias) | Pedagógico | ⚫ **AUSENTE** | Release 2 |
| `RAG Vector Engine` en Faby AI (pgvector) | Inteligencia Artificial | 🟡 **REAL PERO INCOMPLETA** | Release 3 |
| `Faby Talent Network` (Conexión Salones) | Empleabilidad B2B | ⚫ **AUSENTE** | Release 4 |
