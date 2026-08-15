export interface KnowledgeChunk {
  id: string;
  courseTitle: string;
  moduleTitle: string;
  lessonTitle: string;
  sourceType: 'video_transcript' | 'pdf_manual' | 'rubric_guide' | 'biosecurity_protocol';
  sourceRef: string; // e.g. '04:05 en video' or 'Pág. 14 Manual Técnico'
  title: string;
  content: string;
  keywords: string[];
}

export interface RAGQueryResult {
  answer: string;
  citations: {
    title: string;
    sourceRef: string;
    lessonTitle: string;
    confidence: number;
  }[];
  guardrailTriggered?: boolean;
  guardrailMessage?: string;
}

// 1. OFFICIAL DOMAIN KNOWLEDGE BASE CHUNKS
export const COURSE_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'kb-01',
    courseTitle: 'Especialización en Pestañas y Volumen Ruso',
    moduleTitle: 'Módulo 1: Fundamentos Profesionales & Bioseguridad',
    lessonTitle: 'Lección 1.1: Anatomía de la Pestaña & Ciclo Anágeno/Telógeno',
    sourceType: 'video_transcript',
    sourceRef: '03:15 en video Lección 1.1',
    title: 'Distancia de Seguridad al Párpado y Aislamiento',
    content: 'La extensión de pestaña debe colocarse obligatoriamente a una distancia de seguridad milimétrica de entre 0.5 mm y 1.0 mm de la raíz folicular, NUNCA tocando la piel del párpado para evitar dermatitis por contacto y obstrucción de las glándulas de Meibomio.',
    keywords: ['distancia', 'seguridad', 'parpado', 'raiz', 'foliculo', '0.5', '1.0', 'aislamiento', 'meibomio'],
  },
  {
    id: 'kb-02',
    courseTitle: 'Especialización en Pestañas y Volumen Ruso',
    moduleTitle: 'Módulo 1: Fundamentos Profesionales & Bioseguridad',
    lessonTitle: 'Lección 1.3: Química de Adhesivos de Cianoacrilato',
    sourceType: 'pdf_manual',
    sourceRef: 'Pág. 8 del Manual de Bioseguridad Ocular',
    title: 'Humedad Ambiental y Velocidad de Polimerización del Adhesivo',
    content: 'El cianoacrilato polimeriza por reacción con la humedad ambiental. El rango óptimo en cabina es de 45% a 65% de humedad relativa a 20-24°C. Si la humedad es <40%, el adhesivo tarda en secar provocando pestañas pegadas (stickies). Si la humedad es >70%, polimeriza en falso (shock curing) volviéndose blanco y quebradizo.',
    keywords: ['cianoacrilato', 'adhesivo', 'pegamento', 'humedad', 'polimerizacion', 'temperatura', 'shock curing', 'blanco', 'higrometro'],
  },
  {
    id: 'kb-03',
    courseTitle: 'Especialización en Pestañas y Volumen Ruso',
    moduleTitle: 'Módulo 2: Visagismo y Diseño Personalizado de Mirada',
    lessonTitle: 'Lección 2.1: Lash Mapping & Corrección de Párpado Encapotado',
    sourceType: 'video_transcript',
    sourceRef: '08:40 en video Lección 2.1',
    title: 'Visagismo Ocular y Selección de Curvaturas (C, D, L, M)',
    content: 'Para párpados encapotados o caídos, se utiliza curvatura L o M en el tercio exterior con longitudes cortas a medias (8-11 mm) para abrir la mirada sin que la punta roce el pliegue superior. Para ojos almendrados se recomienda diseño Cat Eye o Ardilla.',
    keywords: ['visagismo', 'mapping', 'mapa', 'encapotado', 'curvatura', 'l', 'm', 'd', 'cat eye', 'ardilla', 'ojos caidos'],
  },
  {
    id: 'kb-04',
    courseTitle: 'Máster Profesional en Uñas de Gel y Acrílico Premium',
    moduleTitle: 'Módulo 1: Anatomía Ungueal y Manicura Rusa',
    lessonTitle: 'Lección 1.2: Manejo de Fresas Diamantadas y Torno',
    sourceType: 'video_transcript',
    sourceRef: '05:20 en video Lección 1.2',
    title: 'Ángulo de Trabajo de la Fresa Llama en Manicura Rusa',
    content: 'La fresa llama diamantada debe posicionarse siempre a un ángulo estricto de 45° respecto al plato ungueal, trabajando con la barriga de la fresa a 12.000 - 15.000 RPM en sentido Forward/Reverse, sin presionar la punta para evitar anillos de fuego en la matriz ungueal.',
    keywords: ['fresa', 'llama', 'torno', '45', 'grados', 'manicura rusa', 'cuticula', 'anillos de fuego', 'rpm', 'velocidad'],
  },
  {
    id: 'kb-05',
    courseTitle: 'Máster Profesional en Uñas de Gel y Acrílico Premium',
    moduleTitle: 'Módulo 2: Esculpido Estructural en Gel & Acrigel',
    lessonTitle: 'Lección 2.3: Arquitectura y Ubicación del Ápice',
    sourceType: 'pdf_manual',
    sourceRef: 'Pág. 15 del Dossier de Esculpido Estructural',
    title: 'Ubicación Correcta del Ápice y Balance de Peralte',
    content: 'El ápice (zona de mayor grosor y resistencia mecánica) debe ubicarse en el tercio posterior de la uña natural, exactamente sobre la zona de estrés (punto de unión entre el lecho ungueal y el borde libre). La punta debe tener un grosor uniforme de tarjeta de crédito (0.8 - 1.0 mm).',
    keywords: ['apice', 'punto de estres', 'peralte', 'grosor', 'esculpido', 'gel', 'acrigel', 'estructura', 'resistencia'],
  },
  {
    id: 'kb-06',
    courseTitle: 'Curso Superior de Cosmetología Facial y Skin Care',
    moduleTitle: 'Módulo 1: Diagnóstico de Biotipo Cutáneo',
    lessonTitle: 'Lección 1.1: Clasificación de Pieles (Grasa, Mixta, Seca, Sensible)',
    sourceType: 'pdf_manual',
    sourceRef: 'Pág. 6 del Manual de Diagnóstico Dérmico',
    title: 'Identificación de Biotipos Cutáneos y Film Hidrolipídico',
    content: 'El diagnóstico cutáneo evalúa la secreción sebácea, hidratación y reactividad vascular. Piel grasa presenta poros dilatados e hiperqueratosis; piel alípica (seca) carece de lípidos y muestra tirantez y líneas finas prematuras. Piel mixta concentra sebo en zona T.',
    keywords: ['biotipo', 'cutaneo', 'piel', 'grasa', 'seca', 'alipica', 'mixta', 'sensible', 'sebo', 'film hidrolipidico'],
  },
  {
    id: 'kb-07',
    courseTitle: 'Gestión de Salón & Negocio de Belleza',
    moduleTitle: 'Módulo de Rentabilidad de Cabina',
    lessonTitle: 'Fórmulas Financieras de Fijación de Precios',
    sourceType: 'rubric_guide',
    sourceRef: 'Guía de Fijación de Tarifas Faby Studio',
    title: 'Fórmula de Precio de Venta al Público (PVP) y Margen de Salón',
    content: 'PVP Recomendado = (Coste Insumos Directos + Coste Hora Cabina Prorrateado + Salario Neto Deseado por Servicio) / (1 - Margen Beneficio deseado, ej. 0.65). Nunca cobrar por debajo del precio de equilibrio (Break-even).',
    keywords: ['precio', 'pvp', 'coste', 'rentabilidad', 'salario', 'margen', 'break even', 'tarifa', 'salon', 'cabina'],
  },
];

// 2. SEMANTIC SEARCH SIMULATOR
export function searchCourseKnowledge(query: string, topK: number = 2): KnowledgeChunk[] {
  const normalizedTokens = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const scoredChunks = COURSE_KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;
    const chunkText = (chunk.title + ' ' + chunk.content + ' ' + chunk.keywords.join(' '))
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    normalizedTokens.forEach((token) => {
      if (chunk.keywords.some((k) => k.includes(token))) score += 5;
      if (chunk.title.toLowerCase().includes(token)) score += 4;
      if (chunkText.includes(token)) score += 2;
    });

    return { chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);
  return scoredChunks.filter((s) => s.score > 0).slice(0, topK).map((s) => s.chunk);
}

// 3. RAG PROMPT RUNNER WITH MEDICAL & SAFETY GUARDRAILS
export function generateFabyAIResponse(userQuestion: string): RAGQueryResult {
  const lower = userQuestion.toLowerCase();

  // Guardrail check: Clinical diagnosis / Medical conditions
  const clinicalKeywords = ['infeccion', 'pus', 'hongo', 'sangre', 'herida abierta', 'blefaritis severa', 'dermatologo', 'medico'];
  if (clinicalKeywords.some((k) => lower.includes(k))) {
    return {
      answer: `⚠️ **Aviso de Bioseguridad y Derivación Médica:**\n\nComo asistente educativo de Faby Studio Academy, te recordamos que ante signos evidentes de infección activa, secreción purulenta, lesiones abiertas o patologías ungueales/oculares severas, **el protocolo estético prohíbe realizar cualquier procedimiento**.\n\nDebes suspender el servicio de inmediato, desinfectar la zona con antiséptico suave y **derivar a la clienta a un médico dermatólogo u oftalmólogo** antes de reanudar el tratamiento.`,
      citations: [
        {
          title: 'Protocolo de Derivación Médica & Bioseguridad',
          sourceRef: 'Pág. 3 del Manual Oficial de Bioseguridad',
          lessonTitle: 'Módulo de Toxicología & Salud en Cabina',
          confidence: 0.99,
        },
      ],
      guardrailTriggered: true,
      guardrailMessage: 'Se activó el protocolo de derivación médica estética para salvaguardar la salud de la clienta.',
    };
  }

  const matchingChunks = searchCourseKnowledge(userQuestion, 2);

  if (matchingChunks.length === 0) {
    return {
      answer: `Como tutora virtual de **Fabi Studio Academy**, puedo ayudarte con técnicas oficiales del temario: química de adhesivos de cianoacrilato, humedad ambiental, ángulos de fresas de manicura rusa (45°), ubicación del ápice y fórmulas de fijación de tarifas de salón.\n\n¿Podrías especificar sobre qué módulo o técnica deseas profundizar?`,
      citations: [],
    };
  }

  // Synthesize answer based on top matching chunks
  const mainChunk = matchingChunks[0];
  const citations = matchingChunks.map((c) => ({
    title: c.title,
    sourceRef: c.sourceRef,
    lessonTitle: c.lessonTitle,
    confidence: 0.95,
  }));

  const answer = `Basado en el temario oficial de **${mainChunk.courseTitle}**:\n\n${mainChunk.content}\n\n📖 **Fuentes Oficiales del Curso:**\n${citations
    .map((cit) => `• **${cit.lessonTitle}** — *${cit.sourceRef}*`)
    .join('\n')}`;

  return {
    answer,
    citations,
  };
}
