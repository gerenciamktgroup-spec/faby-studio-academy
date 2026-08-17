# 🏛️ FABY STUDIO ACADEMY — Manual de Arquitectura Técnica & Dossier del Sistema para IAs

> **Propósito de este documento:** Este archivo contiene el mapa completo, la arquitectura técnica, la identidad de marca, el modelo de negocio y el desglose de componentes de **FABY STUDIO ACADEMY**. Ha sido redactado para que cualquier modelo de Inteligencia Artificial (LLM), diseñador de producto o estratega de marketing comprenda de forma inmediata y sin ambigüedades qué tenemos construido, cómo funciona y cómo plantear mejoras sobre la base existente sin romper nada.

---

## 📌 1. Identidad de Marca & Contexto de Negocio Real

* **Nombre de Marca:** FABY STUDIO ACADEMY (FABYSTUDIO)
* **Directora & Master Educator:** Leslie Fabiola Larico Zapana (Profesora Faby).
* **Nicho:** Academia de Formación Técnica Avanzada en Estética y Salón Profesional de Belleza en Madrid.
* **Sedes Físicas en Madrid:**
  1. **Sede Central & Salón:** Centro Comercial Plaza Aluche, Av. de los Poblados 58, 28044 Madrid, España.
  2. **Sede Centro de Formación:** Puente de Vallecas, Madrid, España.
* **Canales Oficiales:**
  * **WhatsApp / Teléfono Directo:** `+34 614 23 62 00` (+34614236200)
  * **Email:** `fabileslie@gmail.com`
  * **Horario:** Lunes a Viernes 07:00 a 18:00 (y citas de fin de semana).
* **Métricas de Autoridad & Social Proof:**
  * **+15 Años de Experiencia** en el sector estético profesional en Madrid.
  * **+80.000 (80k) Alumnas y Clientas** atendidas y formadas a lo largo de su trayectoria.
  * **4.9 / 5.0 ★** de valoración promedio.
* **Despliegues en Vivo:**
  * **Producción Principal:** `https://faby-studio-academy.vercel.app`
  * **Repositorio GitHub:** `gerenciamktgroup-spec/faby-studio-academy`

---

## 💻 2. Stack Tecnológico & Restricciones de Desarrollo

* **Framework Core:** Next.js 15.5.21 (App Router con Server Components y Client Components optimizados).
* **Lenguaje:** TypeScript 5.x (Strict Type Checking, 0 errores en build).
* **Estilos & UI:** Tailwind CSS con tokens de lujo personalizados:
  * Primario: `fabi-pink` (`#DD006B`), `fabi-darkpink` (`#960046`), `rose-600` / `rose-700`.
  * Acentos de Lujo: `amber-400` / `amber-500` (`#F4B125`, badges, estrellas de calificación).
  * Fondos & Contrastes: `slate-950` / `slate-900` (*Obsidian Noir*) y `slate-50` / `white` (*Clean Luxury*).
* **Iconografía:** `lucide-react`.
* **Backend & Base de Datos:** Supabase (PostgreSQL, Auth con RLS policies, Storage de prácticas, auditoría inmutable append-only).
* **Seguridad Criptográfica:** Certificados digitales protegidos con hash **HMAC-SHA256** y validación pública instantánea por código QR.
* **Arquitectura de Rendimiento:** Componentes CSS nativos acelerados por GPU (ej. `clip-path` para el slider), `next/image` y Schema.org JSON-LD para SEO enriquecido.

---

## 🗺️ 3. Mapa de Rutas de la Plataforma (Sitemap Funcional)

```
/                                 -> Landing Page Inicial (AIDA Funnel de alta conversión)
/cursos                           -> Catálogo general de másteres con filtros y planes de pago
/cursos/[courseSlug]              -> Ficha técnica profunda de cada máster (temario, FAQs, vídeo)
/cursos/[courseSlug]/dossier      -> Dossier académico descargable/imprimible
/checkout                         -> Pasarela de matriculación y selección de cuotas
/verificar-certificado            -> Buscador público de certificados con código único
/verificar-certificado/[code]     -> Vista pública del diploma con firma criptográfica SHA-256
/auditoria                        -> Panel de transparencia y trazabilidad técnica inmutable
/login, /registro, /recuperar...  -> Autenticación de alumnas y profesoras
/demo                             -> Conmutador interactivo de roles (Alumna, Profesora, Auditor)
/campus                           -> Dashboard de la Alumna (LMS: progreso, tiempo activo, módulos)
/campus/cursos/[courseId]         -> Reproductor de vídeo con marcas de tiempo y control de foco
/campus/practicas                 -> Módulo de envío de prácticas fotográficas (antes/después)
/campus/calculadora               -> Calculadora de costes y rentabilidad de servicios en cabina
/campus/certificado               -> Descarga del diploma oficial en PDF y visualizador
/campus/comunidad                 -> Foro privado de dudas con la docente y compañeras
/campus/tutorias                  -> Agenda de tutorías 1 a 1 en directo
/profesor                         -> Panel Docente (Gestión de alumnas, corrección de fotos y rúbricas)
/admin                            -> Panel de Administración General
```

---

## 🎨 4. Arquitectura Específica de la Landing Page (`src/app/(public)/page.tsx`)

La Landing Page implementa una estructura secuencial basada en el modelo **AIDA (Atención -> Interés -> Deseo -> Certeza -> Acción)** dividida en **10 componentes modulares** bajo `src/components/landing/`:

```
src/app/(public)/page.tsx
│
├── 1. <PublicHeader />            # Top Bar: Sedes Madrid, Teléfono directo, WhatsApp rápido y navegación.
├── 2. <HeroSection />             # Hook de 50ms: Titular de impacto, confianza, dual CTA y tarjeta del máster.
├── 3. <AuthorityTicker />         # Cinta de confianza: +15 años, +80k alumnas, sedes Aluche/Vallecas, SHA-256.
├── 4. <BeforeAfterSlider />       # Slider interactivo táctil: Comparativa Antes/Después (Uñas, Pestañas, Facial).
├── 5. <ProfitSimulator />         # Simulador de ROI: Deslizadores de clientas/día y precio para proyectar ingresos.
├── 6. <MethodBentoGrid />         # Bento Grid 4 Pilares: Active Learning, Rúbricas 1 a 1, Calculadora, Diplomas QR.
├── 7. <MasterclassShowcase />     # Selector de vídeos: Fragmentos reales de clase en alta definición.
├── 8. <CourseCatalogCards />      # Tarjetas del catálogo: Precios, cuotas sin intereses y badges de demanda.
├── 9. <MadridSedesShowcase />     # Anclaje físico: Fichas de Plaza Aluche y Puente de Vallecas + WhatsApp.
├── 10. <FounderEditorial />       # Spotlight de Leslie Fabiola (Profesora Faby) con cita de autoridad.
├── 11. <ComparisonMatrix />       # Tabla comparativa: Faby Studio Academy vs cursos online convencionales.
├── 12. <FaqInteractive />         # Acordeón de preguntas frecuentes con Schema.org FAQ.
├── 13. <PublicFooter />           # Footer corporativo: Direcciones físicas, horarios, email y bases legales.
└── 14. <FloatingWhatsApp />       # Botón flotante: Pulso "En línea", ventana emergente y chat a +34 614 23 62 00.
```

---

## 📚 5. Catálogo de Cursos & Fichas Técnicas Oficiales

Los 3 pilares formativos definidos en `src/lib/courses/catalog.ts` son:

### 1. Máster Profesional en Uñas de Gel & Acrílico Premium (`/cursos/unas-de-gel-y-acrilico`)
* **Precio:** 490€ (o 3 cuotas de 163€ sin intereses).
* **Duración:** 8 Semanas (60 Horas Lectivas Activas).
* **Técnicas Clave:** Manicura Rusa combinada con torno, nivelación con base rubber, gel constructor autonivelante, acrílico tradicional (control de perlas), acrigel/poligel, esculpido estructural con molde (Square, Almond, Ballerina) y Nail Art de salón.
* **Evaluación:** Test de bioseguridad + 2 entregas de prácticas fotográficas + set completo final con rúbrica de 100 puntos.

### 2. Especialización Profesional en Pestañas, Cejas & Volumen Ruso (`/cursos/extensiones-de-pestanas`)
* **Precio:** 380€ (o 3 cuotas de 126€ sin intereses).
* **Duración:** 6 Semanas (50 Horas Lectivas Activas).
* **Técnicas Clave:** Técnica clásica pelo a pelo 1:1, Volumen Ruso 2D a 6D (abanicado manual), visagismo y diseño de cejas con henna/tinte, lifting de pestañas, laminado de cejas, depilación con hilo (*threading*) y bioseguridad ocular (prevención de blefaritis y polimerización de cianoacrilatos).
* **Evaluación:** Evaluación de abanicado en esponja + colocación simétrica en modelo real.

### 3. Curso Superior de Cosmetología Facial & Hidrafacial (`/cursos/cosmetologia-facial`)
* **Precio:** 590€ (o 3 cuotas de 196€ sin intereses).
* **Duración:** 10 Semanas (80 Horas Lectivas Activas).
* **Técnicas Clave:** Protocolo completo paso a paso de **Hidrafacial** (rejuvenecimiento y limpieza profunda), diagnóstico clínico de biotipos/fototipos de Fitzpatrick, química cosmética (Retinol, AHA/BHA, Vitamina C, Péptidos), aparatología en cabina (espátula ultrasónica, radiofrecuencia, alta frecuencia) y Microneedling (Dermapen).
* **Evaluación:** Ficha clínica de diagnóstico + caso real documentado antes/después.

---

## ⚙️ 6. Motor de Trazabilidad & Auditoría (Diferenciador Único)

La plataforma cuenta con un sistema pionero en academias de belleza:
1. **Active Learning Heartbeat:** El frontend envía un ping a `/api/audit/heartbeat` cada 45 segundos solo si la alumna interactúa (scroll, vídeo reproduciendo, clics), diferenciando el tiempo real de estudio del tiempo conectado en reposo.
2. **Registro Inmutable Append-Only:** Cada lección vista, práctica calificada o diploma emitido genera un evento con hash e IP anonimizada registrado en la base de datos de auditoría (`/auditoria`).
3. **Verificador Público:** Cualquier diploma puede validarse en `/verificar-certificado/[code]`, mostrando la nota final, horas activas cursadas, fecha de expedición y firma HMAC-SHA256.

---

## 🎯 7. Instrucciones para IAs que Analicen o Sugieran Mejoras

Si eres un modelo de IA leyendo este archivo para proponer nuevas optimizaciones a la landing page o al campus, sigue estas directrices estrictas:

1. **Mantener la Coherencia del Stack:** Cualquier propuesta debe ser compatible con **Next.js 15 App Router, React 19, TypeScript y Tailwind CSS**. No sugieras dependencias pesadas si se pueden resolver con CSS nativo o librerías ligeras.
2. **Preservar los Datos Reales:** Respeta las dos sedes en Madrid (Aluche y Vallecas), el teléfono `+34 614 23 62 00`, el email `fabileslie@gmail.com`, y la figura de la fundadora **Leslie Fabiola Larico Zapana**.
3. **Enfoque en Conversión de Alto Valor:** La plataforma apunta a alumnas que buscan una carrera rentable y centros que exigen certificaciones verificables. Las propuestas de contenido deben reforzar la **confianza, la facilidad de pago (cuotas) y el soporte docente 1 a 1**.
4. **Modularidad de Componentes:** Nuevas secciones deben proponerse como componentes individuales bajo `src/components/landing/[NombreComponente].tsx` para mantener `page.tsx` como un ensamblador limpio.
