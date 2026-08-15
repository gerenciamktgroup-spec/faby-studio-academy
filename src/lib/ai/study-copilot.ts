export interface StudyPlanDay {
  dayNumber: number;
  dayName: string;
  topicTitle: string;
  activities: string[];
  estimatedMinutes: number;
  isCompleted: boolean;
}

export interface AdaptiveQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceLesson: string;
}

// 1. GENERATE WEEKLY ADAPTIVE STUDY SCHEDULE
export function generateAdaptiveStudyPlan(daysLeft: number = 5, targetTopic: string = 'pestañas'): StudyPlanDay[] {
  const isPestanas = targetTopic.toLowerCase().includes('pestaña') || targetTopic.toLowerCase().includes('volumen');

  if (isPestanas) {
    return [
      {
        dayNumber: 1,
        dayName: 'Día 1',
        topicTitle: 'Química del Cianoacrilato & Bioseguridad',
        activities: [
          'Repasar Lección 1.3: Control de humedad (45-65%) e higrómetro',
          'Flashcards: Mazo de Química de Adhesivos (3 min)',
          'Test de comprobación de shock curing (5 preguntas)',
        ],
        estimatedMinutes: 35,
        isCompleted: true,
      },
      {
        dayNumber: 2,
        dayName: 'Día 2',
        topicTitle: 'Visagismo Ocular & Mapeo de Parche',
        activities: [
          'Lección 2.1: Diseño Cat Eye vs Dolly según ojo almendrado / encapotado',
          'Dibujar 3 esquemas de longitud en parches de hidrogel',
        ],
        estimatedMinutes: 40,
        isCompleted: true,
      },
      {
        dayNumber: 3,
        dayName: 'Día 3',
        topicTitle: 'Creación de Abanicos 2D-3D en Tira',
        activities: [
          'Práctica de 30 abanicos simétricos con pinza curva',
          'Comprobar distancia de seguridad a 0.5-1.0mm',
        ],
        estimatedMinutes: 45,
        isCompleted: false,
      },
      {
        dayNumber: 4,
        dayName: 'Día 4',
        topicTitle: 'Aplicación Práctica en Modelo Real',
        activities: [
          'Sesión completa de colocación en modelo',
          'Tomar fotografía cenital y a 45° para el Anotador de Prácticas',
        ],
        estimatedMinutes: 90,
        isCompleted: false,
      },
      {
        dayNumber: 5,
        dayName: 'Día 5',
        topicTitle: 'Simulacro de Examen Final & Rúbrica',
        activities: [
          'Simulacro de 10 preguntas con retroalimentación instantánea',
          'Revisión de feedback docente y desbloqueo de certificado',
        ],
        estimatedMinutes: 30,
        isCompleted: false,
      },
    ];
  }

  // Uñas de Gel & Manicura Rusa Plan
  return [
    {
      dayNumber: 1,
      dayName: 'Día 1',
      topicTitle: 'Anatomía del Plato Ungueal & Bioseguridad Autoclave',
      activities: [
        'Repaso de eponiquio, lecho ungueal y pliegue proximal',
        'Flashcards de esterilización UNE-EN 13060',
      ],
      estimatedMinutes: 35,
      isCompleted: true,
    },
    {
      dayNumber: 2,
      dayName: 'Día 2',
      topicTitle: 'Manicura Rusa: Manejo de Fresa Llama a 45°',
      activities: [
        'Práctica de desprendimiento de cutícula a 12.000 RPM',
        'Corte de bolsillo proximal sin generar lesiones',
      ],
      estimatedMinutes: 45,
      isCompleted: false,
    },
    {
      dayNumber: 3,
      dayName: 'Día 3',
      topicTitle: 'Arquitectura del Ápice & Nivelación de Gel',
      activities: [
        'Esculpido de estructura Coffin y balance del peralte',
        'Grosor en punta a 0.8 mm (tarjeta de crédito)',
      ],
      estimatedMinutes: 60,
      isCompleted: false,
    },
    {
      dayNumber: 4,
      dayName: 'Día 4',
      topicTitle: 'Limado Estructural & Esmaltado Bajo Cutícula',
      activities: [
        'Limado de laterales paralelos a 90°',
        'Aplicación de color con pincel liner 00',
      ],
      estimatedMinutes: 50,
      isCompleted: false,
    },
    {
      dayNumber: 5,
      dayName: 'Día 5',
      topicTitle: 'Simulacro de Evaluación Oficial',
      activities: [
        'Examen teórico de 10 preguntas',
        'Subida de fotos de la práctica final a la rúbrica',
      ],
      estimatedMinutes: 30,
      isCompleted: false,
    },
  ];
}

// 2. GENERATE ADAPTIVE MOCK QUIZ
export function generateAdaptiveMockQuiz(topic: string = 'pestañas'): AdaptiveQuizQuestion[] {
  return [
    {
      id: 'q-ad-1',
      question: '¿Qué fenómeno ocurre si aplicas extensiones con una humedad ambiental superior al 75%?',
      options: [
        'El adhesivo no seca y se escurre por el párpado.',
        'Ocurre polimerización en falso (Shock Curing), volviéndose blanco y quebradizo.',
        'La pestaña natural se desprende de forma instantánea.',
        'Aumenta la retención a más de 8 semanas.',
      ],
      correctIndex: 1,
      explanation: 'El exceso de humedad en el ambiente acelera la reacción superficial del cianoacrilato de forma descontrolada (Shock Curing), creando una capa opaca blanquecina de baja resistencia estructural.',
      sourceLesson: 'Lección 1.3: Química de Adhesivos de Cianoacrilato',
    },
    {
      id: 'q-ad-2',
      question: '¿Cuál es la distancia de seguridad obligatoria entre la base de la extensión y el párpado?',
      options: [
        '0.0 mm (debe pegarse directamente sobre la piel).',
        'Entre 0.5 mm y 1.0 mm.',
        'Entre 3.0 mm y 5.0 mm.',
        'No importa la distancia mientras no toque la córnea.',
      ],
      correctIndex: 1,
      explanation: 'La distancia de 0.5 a 1.0 mm evita la obstrucción de las glándulas de Meibomio, no interfiere con el parpadeo natural y previene inflamaciones o dermatitis.',
      sourceLesson: 'Lección 1.1: Anatomía de la Pestaña & Fases de Crecimiento',
    },
    {
      id: 'q-ad-3',
      question: 'En manicura rusa, ¿cuál es el ángulo correcto de la fresa llama sobre la uña natural?',
      options: [
        '90° perpendicular al lecho ungueal.',
        '45° trabajando con la barriga de la fresa.',
        '0° completamente plana presionando la punta.',
        '180° en sentido descendente.',
      ],
      correctIndex: 1,
      explanation: 'El ángulo de 45° permite que la barriga de la fresa despegue la cutícula sin que la punta toque la lámina ungueal, evitando los temidos anillos de fuego.',
      sourceLesson: 'Lección 1.2: Manejo de Fresas Diamantadas y Torno',
    },
  ];
}
