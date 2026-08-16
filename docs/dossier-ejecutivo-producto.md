# 💎 DOSSIER EJECUTIVO DE PRODUCTO — FABY STUDIO ACADEMY
**Documento Estratégico de Arquitectura, Valor de Negocio y Diferenciación Competitiva**
*Para: Dirección General, Equipo Directivo e Inversores*

---

## 🎯 1. Resumen Ejecutivo de la Plataforma

**FABY STUDIO ACADEMY** es una solución tecnológica vertical para la formación superior y certificación profesional en el sector de la belleza y la estética avanzada (Uñas de Gel y Acrílico, Extensiones de Pestañas y Cosmetología Facial).

La plataforma fusiona tres pilares clave:
1. **Cumplimiento Regulatorio Oficial**: Preparada para auditorías de teleformación bajo la **Orden TMS/369/2019**, bonificaciones **SEPE / FUNDAE** y estándares de calidad **ISO 9001**.
2. **Sistema Operativo de Habilidades (Faby Skill Graph)**: Acreditación basada en 5 factores de evidencia práctica en modelos reales frente al modelo obsoleto de solo ver vídeos pasivos.
3. **Inteligencia Artificial Especializada (AI-Native Suite)**: Tutor RAG 24/7 con citación estricta al temario, copiloto de preparación de exámenes y asistente de visión para análisis de prácticas.

---

## 🥊 2. Matriz Comparativa: Faby Studio vs. Plataformas Genéricas

| Dimensión | Plataformas Tradicionales (Hotmart, Teachable, Kajabi) | LMS Académico Genérico (Moodle, Canvas) | **FABY STUDIO ACADEMY (Tu Producto)** |
| :--- | :--- | :--- | :--- |
| **Metodología de Aprendizaje** | Consumo pasivo de vídeos grabados. | Foros de texto y tareas en PDF genéricas. | **Learning OS enfocado en habilidades prácticas, modelos reales y visagismo.** |
| **Trazabilidad Horaria** | No auditable (solo mide tiempo de conexión bruta). | Registro de clics básico sin distinción de inactividad. | **Active Learning Heartbeat (TMS/369): distingue tiempo activo real cada 45s.** |
| **Evaluación Práctica** | Ninguna (cuestionarios tipo test automáticos). | Subida de archivos planos sin anotador interactivo. | **Anotador visual con pines sobre la foto de la modelo y rúbricas de 100 puntos.** |
| **Inteligencia Artificial** | Respuestas genéricas alucinadas con ChatGPT. | Ninguna integración nativa. | **RAG con citaciones al minuto de video (`03:15`), plan de estudio y guardrails médicos.** |
| **Certificación y Empleo** | Diploma en PDF fácilmente falsificable. | Certificado simple sin pasaporte público. | **Pasaporte Profesional Público con QR, fotos Antes/Después y firma SHA-256.** |
| **Herramientas de Cabina** | Ninguna. | Ninguna. | **Simulador de Lash Mapping sobre parche y Calculadora de Rentabilidad de Salón.** |

---

## 🛡️ 3. Blindaje de Seguridad y Cumplimiento Legal

1. **Inmutabilidad Criptográfica**: Las tablas de eventos (`activity_events`) disponen de triggers PostgreSQL que prohíben la edición o eliminación de registros para garantizar auditorías transparentes ante organismos públicos.
2. **WAF Edge Protection**: Middleware perimetral que neutraliza escáneres de vulnerabilidades (`sqlmap`, `nikto`, `acunetix`) y previene ataques de inyección y path-traversal.
3. **Privacidad y RGPD**: Los pasaportes profesionales públicos y diplomas verificables no exponen datos sensibles de la alumna (DNI, teléfonos, correos privados).

---

## 📊 4. Especificaciones Técnicas del Ecosistema

* **Frontend**: Next.js 14 App Router, React 18, TypeScript Estricto, Tailwind CSS con paleta de lujo.
* **Backend y Base de Datos**: PostgreSQL 15+ estructurado en **34 tablas maestras y 21 políticas Row Level Security (RLS)**.
* **Inteligencia Artificial**: Motor RAG semántico con soporte para vectores (`pgvector`), generador de planes de estudio y asistente de visión de prácticas.
* **Infraestructura y CDN**: Despliegue en producción de alta disponibilidad en **Vercel** ([https://faby-studio-academy.vercel.app](https://faby-studio-academy.vercel.app)).
* **Calidad y Pruebas**: **23 suites de pruebas automatizadas al 100%** cubriendo los 12 flujos críticos de usuario (0 errores de compilación).
