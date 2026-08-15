# 📊 Product Gap Analysis: LMS vs Faby Learning & Skills Platform

**Document Version:** 1.0.0  
**Strategic Target:** Evolving from a Course-Watching LMS to a Vertical EdTech AI-Native Skills Platform

---

## 1. Executive Strategic Comparison

```
 ┌───────────────────────────────────────────────────┬───────────────────────────────────────────────────┐
 │ ESTADO ACTUAL (LMS DE ALTO NIVEL)                 │ ESTADO OBJETIVO (FABY SKILLS & TALENT PLATFORM)   │
 ├───────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
 │ • Ver lecciones en video y descargar recursos     │ • Aprender → Practicar → Demostrar → Certificar   │
 │ • Entrega de prácticas con rúbricas de 100 pts    │ • Grafo de Habilidades (Skill Graph) medible      │
 │ • Certificado por horas activas y notas de curso  │ • Motor de Evidencias Multifactor (5 fuentes)     │
 │ • Asistente IA flotante con base de conocimiento  │ • Pasaporte Profesional Público con QR verificable│
 │ • Dashboard de horas y progreso por curso         │ • Faby AI Tutor con RAG y citación exacta         │
 │ • Buzón docente de corrección fotográfica         │ • Living Curriculum con versionado (v1.0, v1.1)   │
 └───────────────────────────────────────────────────┴───────────────────────────────────────────────────┘
```

---

## 2. Detailed Gap Analysis Matrix

### Pillar 1: Faby Skill Graph & Taxonomy
* **Current State**: Cursos organizados por módulos y lecciones tradicionales.
* **Target State**: Grafo de habilidades interconectado en 3 disciplinas clave:
  * **Uñas**: Preparación de placa ungueal, Manicura rusa, Esculpido acrílico, Gel reconstructivo, Acrigel, Limado y Ápice, Nail Art, Bioseguridad.
  * **Pestañas**: Visagismo de mirada, Pelo a pelo clásico, Abanicos 2D-3D, Mega Volumen Ruso, Bioseguridad ocular.
  * **Cosmetología**: Diagnóstico de biotipo cutáneo, Higiene profunda, Dermocosmética e ingredientes, Protocolos antiedad.
* **Evolution Gap**: Modelar entidades `skills`, `course_skills`, `lesson_skills` y mapear cada lección a competencias concretas.

### Pillar 2: Skill Evidence Engine (Motor de Evidencias Multifactor)
* **Current State**: Alumna entrega práctica y profesora asigna nota.
* **Target State**: Nivel de competencia (*Proficiency Score* 0-100 + *Confidence Level*) respaldado por 5 factores:
  1. Comprensión teórica completada.
  2. Examen teórico superado (≥70%).
  3. Evidencia fotográfica en modelo real.
  4. Rúbrica docente validada con feedback por criterio.
  5. Proyecto final integrador aprobado.
* **Evolution Gap**: Crear `student_skills` y `skill_evidence` calculando el nivel en tiempo real.

### Pillar 3: Professional Skill Passport (`/perfil-profesional/[slug]`)
* **Current State**: Certificado individual descargable con QR.
* **Target State**: Perfil profesional público y compartible para empleabilidad donde se exhiben las habilidades verificadas, proyectos destacados del portafolio, certificados y código QR de validación rápida para salones.
* **Evolution Gap**: Crear vista pública segura sin exponer datos privados (DNI, email, teléfono).

### Pillar 4: Faby AI RAG Engine & Citations
* **Current State**: AI Assistant con banco de conocimiento estático indexado en memoria.
* **Target State**: Pipeline RAG completo con embeddings semánticos en `pgvector`, segmentación de transcripciones y PDFs del curso, y respuestas con enlaces directos al segundo exacto del video o página del manual.
* **Evolution Gap**: Integrar tabla de embeddings y endpoint de recuperación vectorial.

### Pillar 5: Living Curriculum (Versionado de Cursos)
* **Current State**: Cursos editados directamente en base de datos.
* **Target State**: Versionado formal de planes de estudio (`v1.0`, `v1.1`, `v1.2`) con changelog y protección retroactiva de expedientes de alumnas ya graduadas.
* **Evolution Gap**: Crear `course_versions` y trazabilidad de actualizaciones.

### Pillar 6: Early Warning Retention System (Alerta de Abandono)
* **Current State**: Vista de horas activas en el panel de profesor.
* **Target State**: Algoritmo por reglas que clasifica a las alumnas en *Riesgo Bajo*, *Riesgo Medio* o *Riesgo Alto* basándose en días sin actividad, entregas pendientes o tests no superados.
* **Evolution Gap**: Añadir indicador de riesgo en el panel docente y disparar notificaciones automáticas de apoyo.
