export interface CourseLesson {
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'assignment';
}

export interface CourseModule {
  number: number;
  title: string;
  hours: string;
  lessonsCount: string;
  lessons: CourseLesson[];
}

export interface CourseData {
  slug: string;
  title: string;
  badge: string;
  rating: number;
  reviewsCount: number;
  duration: string;
  hours: string;
  activeHours: number;
  modality: string;
  price: string;
  installments: string;
  heroImage: string;
  youtubeVideoId: string;
  tagline: string;
  description: string;
  highlights: string[];
  skillsGained: string[];
  modules: CourseModule[];
  faqs: { question: string; answer: string }[];
}

export const COURSE_CATALOG: Record<string, CourseData> = {
  'extensiones-de-pestanas': {
    slug: 'extensiones-de-pestanas',
    title: 'Especialización Profesional en Pestañas & Volumen Ruso',
    badge: 'Máster de Referencia',
    rating: 4.9,
    reviewsCount: 142,
    duration: '6 Semanas',
    hours: '50h Trazables',
    activeHours: 50,
    modality: '100% Online + Prácticas en Modelo',
    price: '380€',
    installments: 'Pago único o 3 cuotas sin intereses',
    heroImage: 'https://images.unsplash.com/photo-1583001809873-a1284a5da677?q=80&w=800&auto=format&fit=crop',
    youtubeVideoId: 'FmcPn9DJ5ef',
    tagline: 'Formación profesional integral en técnica clásica pelo a pelo, volumen ruso, lash mapping avanzado y bioseguridad ocular.',
    description: 'Programa formativo de referencia nacional en estética de la mirada. Combina rigor científico en bioseguridad ocular con el dominio artístico del visagismo y la creación manual de abanicos de volumen ruso.',
    highlights: [
      'Técnica clásica 1:1 y abanicado manual 2D a 6D',
      'Mapping personalizado según morfología ocular',
      'Corrección visual pin a pin con rúbrica técnica de 100 pts',
      'Kit profesional de inicio con envío incluido',
      'Certificado digital con firma criptográfica SHA-256',
    ],
    skillsGained: [
      'Aislamiento perfecto sin stickies ni grumos',
      'Direccionamiento simétrico a 90 grados',
      'Química y polimerización de cianoacrilatos',
      'Diseños Cat Eye, Doll Eye y Efecto Ardilla',
      'Cálculo de rentabilidad y precios en cabina',
    ],
    modules: [
      {
        number: 1,
        title: 'Módulo 1: Fundamentos & Bioseguridad Ocular',
        hours: '8 horas',
        lessonsCount: '5 lecciones',
        lessons: [
          { title: '1.1 Bienvenida y Estándares de Higiene FABY STUDIO', duration: '15 min', type: 'video' },
          { title: '1.2 Anatomía del Ojo, Párpado y Ciclo Piloso (Anágena, Catágena, Telógena)', duration: '25 min', type: 'video' },
          { title: '1.3 Bioseguridad, Esterilización de Pinzas y Prevención de Blefaritis', duration: '20 min', type: 'video' },
          { title: '1.4 Química de Adhesivos: Cianocrilato, Humedad y Polimerización', duration: '30 min', type: 'video' },
          { title: '1.5 Test de Evaluación Teórica de Bioseguridad (Mínimo 70%)', duration: '15 min', type: 'quiz' },
        ],
      },
      {
        number: 2,
        title: 'Módulo 2: Visagismo, Curvaturas & Mapping Avanzado',
        hours: '8 horas',
        lessonsCount: '6 lecciones',
        lessons: [
          { title: '2.1 Clasificación de Ojos: Almendrados, Hundidos, Encapotados y Redondos', duration: '25 min', type: 'video' },
          { title: '2.2 Guía de Curvaturas (B, C, CC, D, L, M) y Selección por Morfología', duration: '30 min', type: 'video' },
          { title: '2.3 Mapping Paso a Paso: Diseños Cat Eye, Doll Eye y Efecto Ardilla', duration: '35 min', type: 'video' },
          { title: '2.4 Tabla de Transición Milimétrica de Longitudes (7mm a 14mm)', duration: '20 min', type: 'video' },
          { title: '2.5 Práctica Guiada en Parche de Hidrogel', duration: '40 min', type: 'assignment' },
        ],
      },
      {
        number: 3,
        title: 'Módulo 3: Técnica Clásica Pelo a Pelo (1:1)',
        hours: '10 horas',
        lessonsCount: '7 lecciones',
        lessons: [
          { title: '3.1 Ergonomía, Postura y Calibración de Pinzas de Aislamiento', duration: '20 min', type: 'video' },
          { title: '3.2 Adherencia Milimétrica: Distancia de Seguridad al Párpado (0.5mm)', duration: '30 min', type: 'video' },
          { title: '3.3 Dirección Simétrica y Prevención de Adherencias (Stickies)', duration: '35 min', type: 'video' },
          { title: '3.4 Retoque y Rellenos a las 3 Semanas: Protocolo de Limpieza', duration: '25 min', type: 'video' },
          { title: '3.5 Retirada Segura de Extensiones con Removedor en Crema', duration: '20 min', type: 'video' },
          { title: '3.6 Práctica en Modelo Real: Set Clásico Completo', duration: '60 min', type: 'assignment' },
          { title: '3.7 Evaluación Teórica Técnica Clásica (Mínimo 70%)', duration: '15 min', type: 'quiz' },
        ],
      },
      {
        number: 4,
        title: 'Módulo 4: Volumen Ruso & Mega Volumen (2D a 6D)',
        hours: '12 horas',
        lessonsCount: '6 lecciones',
        lessons: [
          { title: '4.1 Geometría del Abanico Perfecto: Base Fina y Apertura Equidistante', duration: '30 min', type: 'video' },
          { title: '4.2 Técnicas de Abanicado: En Tira (Rolling), Pellizco (Pinching) y Pinza', duration: '45 min', type: 'video' },
          { title: '4.3 Cálculo de Carga y Grosor Seguro (0.05mm, 0.07mm)', duration: '25 min', type: 'video' },
          { title: '4.4 Efecto Híbrido / Volumen Glamour: Mezcla de Clásica y Abanicos', duration: '35 min', type: 'video' },
          { title: '4.5 Práctica en Esponja y Modelo: Creación de 50 Abanicos Perfectos', duration: '60 min', type: 'assignment' },
          { title: '4.6 Evaluación Teórica Volumen Ruso (Mínimo 70%)', duration: '15 min', type: 'quiz' },
        ],
      },
      {
        number: 5,
        title: 'Módulo 5: Casos Especiales, Alergias & Mantenimiento',
        hours: '6 horas',
        lessonsCount: '4 lecciones',
        lessons: [
          { title: '5.1 Test de Parche, Reacciones Alérgicas y Shock de Polimerización', duration: '25 min', type: 'video' },
          { title: '5.2 Trabajo en Pestañas Rubias, Entrecanas y Capas Desordenadas', duration: '30 min', type: 'video' },
          { title: '5.3 Ficha de Consentimiento Informado y Fotografía Profesional de Salón', duration: '20 min', type: 'video' },
          { title: '5.4 Examen Final Teórico de Especialización (Mínimo 70%)', duration: '20 min', type: 'quiz' },
        ],
      },
      {
        number: 6,
        title: 'Módulo 6: Proyecto Final & Certificación Oficial',
        hours: '6 horas',
        lessonsCount: '3 lecciones',
        lessons: [
          { title: '6.1 Guía de Ejecución del Proyecto Final en Modelo Real', duration: '20 min', type: 'video' },
          { title: '6.2 Entrega de Evidencia Fotográfica y Video para Rúbrica Docente', duration: '60 min', type: 'assignment' },
          { title: '6.3 Encuesta de Calidad y Emisión de Certificado SHA-256', duration: '15 min', type: 'assignment' },
        ],
      },
    ],
    faqs: [
      { question: '¿Necesito experiencia previa?', answer: 'No. El curso inicia desde la base absoluta y avanza hasta técnicas maestras de volumen ruso.' },
      { question: '¿Cómo se evalúan las prácticas?', answer: 'Subes fotos de alta resolución de tus modelos a la plataforma y las tutoras colocan pines visuales de corrección.' },
      { question: '¿El certificado tiene valor legal?', answer: 'Se emite con firma criptográfica HMAC-SHA-256 y código QR verificable públicamente.' },
    ],
  },

  'unas-de-gel-y-acrilico': {
    slug: 'unas-de-gel-y-acrilico',
    title: 'Máster Profesional en Uñas de Gel & Acrílico Premium',
    badge: 'Alta Demanda',
    rating: 4.9,
    reviewsCount: 189,
    duration: '8 Semanas',
    hours: '60h Trazables',
    activeHours: 60,
    modality: '100% Online + Prácticas en Modelo',
    price: '490€',
    installments: 'Pago único o 3 cuotas sin intereses',
    heroImage: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800&auto=format&fit=crop',
    youtubeVideoId: 'gMLz-995K-A',
    tagline: 'Domina las técnicas de esculpido en gel constructor, acrílico con control de perlas, manicura rusa con torno y nail art comercial.',
    description: 'Especialización completa en arquitectura ungular. Aprenderás desde la manicura combinada rusa hasta el esculpido paramétrico de estructuras Almond, Coffin y Stiletto con nivelación perfecta.',
    highlights: [
      'Manicura rusa y combinada con torno profesional',
      'Esculpido en Gel Builder con nivelación sin limado',
      'Acrílico tradicional: control de perlas y consistencia',
      'Arquitectura de salón: Square, Almond y Ballerina',
      'Certificado digital con firma criptográfica SHA-256',
    ],
    skillsGained: [
      'Preparación mecánica profunda sin dañar la lámina ungueal',
      'Colocación y corte milimétrico de moldes de esculpido',
      'Creación del ápice estructural resistente a impactos',
      'Esmaltado semipermanente bajo cutícula de larga duración',
      'Rentabilidad y optimización de tiempos en cabina',
    ],
    modules: [
      {
        number: 1,
        title: 'Módulo 1: Anatomía Ungular & Preparación Mecánica',
        hours: '10 horas',
        lessonsCount: '5 lecciones',
        lessons: [
          { title: '1.1 Estructura del lecho ungueal, matriz y eponiquio', duration: '20 min', type: 'video' },
          { title: '1.2 Manicura Rusa / Combinada con torno y fresas de diamante', duration: '35 min', type: 'video' },
          { title: '1.3 Deshidratación y primers sin ácido para adherencia óptima', duration: '25 min', type: 'video' },
          { title: '1.4 Esterilización y normativa higiénico-sanitaria en salón', duration: '20 min', type: 'video' },
          { title: '1.5 Evaluación Teórica de Anatomía y Bioseguridad', duration: '15 min', type: 'quiz' },
        ],
      },
      {
        number: 2,
        title: 'Módulo 2: Esculpido en Gel Constructor & Nivelación',
        hours: '12 horas',
        lessonsCount: '6 lecciones',
        lessons: [
          { title: '2.1 Colocación y corte preciso de moldes según curvatura C', duration: '30 min', type: 'video' },
          { title: '2.2 Creación del ápice y control del producto autonivelante', duration: '40 min', type: 'video' },
          { title: '2.3 Estructura Ballerina y Almond de salón', duration: '35 min', type: 'video' },
          { title: '2.4 Esquema de limado paramétrico (Lados, borde libre y superficie)', duration: '30 min', type: 'video' },
          { title: '2.5 Práctica Guiada de Esculpido en Gel', duration: '60 min', type: 'assignment' },
        ],
      },
      {
        number: 3,
        title: 'Módulo 3: Acrílico Tradicional & Control de Perlas',
        hours: '12 horas',
        lessonsCount: '6 lecciones',
        lessons: [
          { title: '3.1 Ratio monómero-polímero: Perlas pequeñas, medianas y grandes', duration: '35 min', type: 'video' },
          { title: '3.2 Sellado en zona de cutícula y prevención de desprendimientos', duration: '40 min', type: 'video' },
          { title: '3.3 Baby Boomer difuminado con acrílico Cover y Blanco', duration: '35 min', type: 'video' },
          { title: '3.4 Encapsulados con glitter, foil y elementos decorativos', duration: '30 min', type: 'video' },
          { title: '3.5 Práctica de Set Completo en Acrílico', duration: '60 min', type: 'assignment' },
        ],
      },
      {
        number: 4,
        title: 'Módulo 4: Esmaltado Semipermanente & Nail Art de Salón',
        hours: '10 horas',
        lessonsCount: '5 lecciones',
        lessons: [
          { title: '4.1 Aplicación de color bajo cutícula con pincel liner fino', duration: '25 min', type: 'video' },
          { title: '4.2 Efecto Ojo de Gato (Cat Eye) con imán y destellos', duration: '20 min', type: 'video' },
          { title: '4.3 Francesa perfecta (Deep French) y líneas geométricas', duration: '30 min', type: 'video' },
          { title: '4.4 Retirada segura y mantenimiento a 4 semanas', duration: '25 min', type: 'video' },
        ],
      },
      {
        number: 5,
        title: 'Módulo 5: Proyecto Final & Certificación',
        hours: '8 horas',
        lessonsCount: '3 lecciones',
        lessons: [
          { title: '5.1 Directrices del Set Completo de Examen', duration: '20 min', type: 'video' },
          { title: '5.2 Subida de Fotos en Macro para Evaluación de Rúbrica', duration: '60 min', type: 'assignment' },
          { title: '5.3 Encuesta de Calidad y Emisión de Diploma SHA-256', duration: '15 min', type: 'assignment' },
        ],
      },
    ],
    faqs: [
      { question: '¿Incluye torno y fresas?', answer: 'El programa te enseña el manejo profesional de torno y las fresas recomendadas para cada tipo de cutícula.' },
      { question: '¿Cómo se aprueba el máster?', answer: 'Completando el 100% de las clases, aprobando los quizzes y entregando la práctica final con nota mínima de 70/100.' },
    ],
  },

  'cosmetologia-facial': {
    slug: 'cosmetologia-facial',
    title: 'Curso Superior de Cosmetología Facial & Skin Care',
    badge: 'Grado Superior',
    rating: 5.0,
    reviewsCount: 115,
    duration: '10 Semanas',
    hours: '80h Trazables',
    activeHours: 80,
    modality: '100% Online + Prácticas en Cabina',
    price: '590€',
    installments: 'Pago único o 3 cuotas sin intereses',
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
    youtubeVideoId: 'o6Z52S9qJ5k',
    tagline: 'Formación clínica integral en diagnóstico cutáneo, química cosmética, peelings químicos, dermapen y protocolos de cabina.',
    description: 'El programa más avanzado en estética facial. Domina la anatomía dérmica, el análisis de biotipos y fototipos cutáneos, y la aplicación de protocolos transformadores con aparatología de última generación.',
    highlights: [
      'Diagnóstico clínico de biotipos y fototipos de Fitzpatrick',
      'Química cosmética: Ácidos (AHA/BHA), Retinoides y Péptidos',
      'Higiene facial profunda con espátula ultrasónica',
      'Protocolos de Microneedling (Dermapen) y Peeling Químico',
      'Certificado digital con firma criptográfica SHA-256',
    ],
    skillsGained: [
      'Prescripción de rutinas cosmecéuticas domiciliarias',
      'Tratamiento de acné activo, hiperpigmentaciones y envejecimiento',
      'Técnicas de extracción indolora y desinfección con alta frecuencia',
      'Masaje miofascial facial y drenaje linfático manual',
      'Creación de fichas clínicas y consentimientos informados',
    ],
    modules: [
      {
        number: 1,
        title: 'Módulo 1: Anatomía de la Piel & Biotipos Cutáneos',
        hours: '15 horas',
        lessonsCount: '6 lecciones',
        lessons: [
          { title: '1.1 Capas de la epidermis, dermis e hipodermis', duration: '25 min', type: 'video' },
          { title: '1.2 Diagnóstico clínico de biotipos: Grasa, seca, mixta y sensible', duration: '35 min', type: 'video' },
          { title: '1.3 Fototipos de Fitzpatrick y escalas de envejecimiento Glogau', duration: '30 min', type: 'video' },
          { title: '1.4 Bioseguridad y desinfección médica en cabina estética', duration: '20 min', type: 'video' },
          { title: '1.5 Evaluación Teórica de Histología Cutánea', duration: '15 min', type: 'quiz' },
        ],
      },
      {
        number: 2,
        title: 'Módulo 2: Química Cosmética & Activos Transformadores',
        hours: '15 horas',
        lessonsCount: '6 lecciones',
        lessons: [
          { title: '2.1 Ácido Hialurónico: Pesos moleculares y retención hídrica', duration: '30 min', type: 'video' },
          { title: '2.2 Retinol, Bakuchiol y derivados de la Vitamina A', duration: '40 min', type: 'video' },
          { title: '2.3 Vitamina C pura (Ácido L-Ascórbico) y antioxidantes', duration: '30 min', type: 'video' },
          { title: '2.4 Niacinamida, Péptidos y Ceramidas para barrera lipídica', duration: '35 min', type: 'video' },
          { title: '2.5 Creación de Rutinas Personalizadas por Diagnóstico', duration: '45 min', type: 'assignment' },
        ],
      },
      {
        number: 3,
        title: 'Módulo 3: Higiene Facial Profunda & Peelings Químicos',
        hours: '15 horas',
        lessonsCount: '6 lecciones',
        lessons: [
          { title: '3.1 Protocolo de doble limpieza y desmaquillado dérmico', duration: '25 min', type: 'video' },
          { title: '3.2 Exfoliación enzimática vs química: Ácido Glicólico, Salicílico y Mandélico', duration: '45 min', type: 'video' },
          { title: '3.3 Extracción con vapor ozono y espátula ultrasónica', duration: '40 min', type: 'video' },
          { title: '3.4 Alta frecuencia para bactericida y oxigenación celular', duration: '30 min', type: 'video' },
          { title: '3.5 Práctica en Cabina: Protocolo de Limpieza Facial', duration: '60 min', type: 'assignment' },
        ],
      },
      {
        number: 4,
        title: 'Módulo 4: Microneedling (Dermapen) & Masajes Faciales',
        hours: '15 horas',
        lessonsCount: '5 lecciones',
        lessons: [
          { title: '4.1 Fundamentos de inducción de colágeno y cartuchos', duration: '35 min', type: 'video' },
          { title: '4.2 Cócteles estériles: Factores de crecimiento y silicio orgánico', duration: '40 min', type: 'video' },
          { title: '4.3 Masaje Kobido lifting japonés y drenaje linfático facial', duration: '45 min', type: 'video' },
          { title: '4.4 Práctica de Dermapen en Modelo Real', duration: '60 min', type: 'assignment' },
        ],
      },
      {
        number: 5,
        title: 'Módulo 5: Proyecto Final & Certificación',
        hours: '10 horas',
        lessonsCount: '3 lecciones',
        lessons: [
          { title: '5.1 Elaboración de Caso Clínico Completo con Ficha Diagnóstica', duration: '30 min', type: 'video' },
          { title: '5.2 Subida de Caso y Fotos Antes/Después para Rúbrica Docente', duration: '60 min', type: 'assignment' },
          { title: '5.3 Encuesta de Calidad y Emisión de Diploma SHA-256', duration: '15 min', type: 'assignment' },
        ],
      },
    ],
    faqs: [
      { question: '¿Se necesita titulación médica para cursarlo?', answer: 'No. El curso está enfocado a cosmetología y estética avanzada no invasiva.' },
      { question: '¿Incluye el protocolo de consentimientos informados?', answer: 'Sí, incluye plantillas legales descargables para tu centro de estética.' },
    ],
  },
};
