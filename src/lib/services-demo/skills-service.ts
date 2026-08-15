import {
  Skill,
  StudentSkill,
  ProfessionalSkillPassport,
  RetentionRiskStudent,
  InAppNotification,
} from '@/types/skills';

// 1. MASTER SKILL TAXONOMY FOR BEAUTY & AESTHETICS
export const MASTER_SKILLS_TAXONOMY: Skill[] = [
  // --- UÑAS & MANICURA ---
  {
    id: 'sk-01',
    slug: 'preparacion-placa-ungueal',
    name: 'Preparación Mecánica de Placa Ungueal',
    category: 'unas',
    level: 'fundamentos',
    description: 'Apertura de canales de adherencia, deshidratación química (Nail Prep) y primer ácido/no ácido.',
    required_points: 100,
  },
  {
    id: 'sk-02',
    slug: 'manicura-rusa-torno-45',
    name: 'Manicura Rusa & Pulido de Cutícula (Torno a 45°)',
    category: 'unas',
    level: 'avanzado',
    description: 'Manejo de fresa llama diamantada, limpieza subungueal y corte de bolsillo proximal sin cortes.',
    required_points: 100,
  },
  {
    id: 'sk-03',
    slug: 'esculpido-gel-reconstructivo-apice',
    name: 'Esculpido en Gel & Arquitectura del Ápice',
    category: 'unas',
    level: 'avanzado',
    description: 'Estructuración de ápice y peraltes según longitud para garantizar resistencia al impacto.',
    required_points: 100,
  },
  {
    id: 'sk-04',
    slug: 'limado-estructural-coffin-stiletto',
    name: 'Limado Estructural (Coffin, Stiletto, Square)',
    category: 'unas',
    level: 'intermedio',
    description: 'Paralelismo de laterales, ángulo de punta a 90° y balance de curvas C.',
    required_points: 100,
  },

  // --- MIRADA & PESTAÑAS ---
  {
    id: 'sk-05',
    slug: 'visagismo-mapeo-mirada',
    name: 'Visagismo Ocular & Lash Mapping Personalizado',
    category: 'pestanas',
    level: 'fundamentos',
    description: 'Diseño según tipo de ojo (Cat Eye, Dolly, Ardilla) y corrección de párpado encapotado.',
    required_points: 100,
  },
  {
    id: 'sk-06',
    slug: 'tecnica-clasica-pelo-a-pelo-1x1',
    name: 'Técnica Clásica Pelo a Pelo 1x1',
    category: 'pestanas',
    level: 'fundamentos',
    description: 'Aislamiento individual a 0.5-1.0 mm del folículo sin tocar párpado.',
    required_points: 100,
  },
  {
    id: 'sk-07',
    slug: 'creacion-abanicos-volumen-ruso',
    name: 'Creación Manual de Abanicos 2D-6D (Volumen Ruso)',
    category: 'pestanas',
    level: 'avanzado',
    description: 'Geometría del abanico, base fina y control milimétrico de inmersión en cianoacrilato.',
    required_points: 100,
  },

  // --- BIOSEGURIDAD & QUÍMICA ---
  {
    id: 'sk-08',
    slug: 'bioseguridad-polimerizacion-adhesivos',
    name: 'Química de Polimerización & Bioseguridad en Cabina',
    category: 'bioseguridad',
    level: 'master',
    description: 'Control de humedad (45-65%), temperatura (20-24°C) y protocolos autoclave UNE-EN 13060.',
    required_points: 100,
  },
];

// 2. DEMO STUDENT SKILLS PROFILES
export function getStudentSkills(studentId: string = '22222222-2222-2222-2222-222222222222'): StudentSkill[] {
  // Lucía Martínez (Alumna en progreso activo)
  return [
    {
      id: 'stk-01',
      student_id: studentId,
      skill: MASTER_SKILLS_TAXONOMY[4], // Visagismo & Mapeo
      proficiency_score: 92,
      confidence_level: 'high',
      is_verified: true,
      verified_at: '2026-08-10',
      verified_by_name: 'Dra. María Rodríguez',
      evidences: [
        { id: 'ev-1', evidence_type: 'theory_completion', label: 'Módulo de Visagismo Ocular', score_obtained: 100, max_score: 100, is_verified: true },
        { id: 'ev-2', evidence_type: 'quiz_score', label: 'Quiz Teórico de Biotipos Oculares', score_obtained: 95, max_score: 100, is_verified: true },
        { id: 'ev-3', evidence_type: 'photo_submission', label: 'Mapa de Longitudes en Parche', score_obtained: 90, max_score: 100, is_verified: true },
        { id: 'ev-4', evidence_type: 'rubric_evaluation', label: 'Evaluación Docente por Rúbrica', score_obtained: 88, max_score: 100, is_verified: true },
      ],
    },
    {
      id: 'stk-02',
      student_id: studentId,
      skill: MASTER_SKILLS_TAXONOMY[5], // Pelo a Pelo Clásico
      proficiency_score: 86,
      confidence_level: 'high',
      is_verified: true,
      verified_at: '2026-08-12',
      verified_by_name: 'Dra. María Rodríguez',
      evidences: [
        { id: 'ev-5', evidence_type: 'theory_completion', label: 'Protocolo de Aislamiento 1x1', score_obtained: 100, max_score: 100, is_verified: true },
        { id: 'ev-6', evidence_type: 'quiz_score', label: 'Quiz de Distancias de Seguridad', score_obtained: 90, max_score: 100, is_verified: true },
        { id: 'ev-7', evidence_type: 'photo_submission', label: 'Práctica 01 en Modelo Real', score_obtained: 86, max_score: 100, is_verified: true, feedback: 'Excelente aislamiento, vigilar ángulo en lagrimal.' },
      ],
    },
    {
      id: 'stk-03',
      student_id: studentId,
      skill: MASTER_SKILLS_TAXONOMY[6], // Creación de Abanicos Volumen Ruso
      proficiency_score: 65,
      confidence_level: 'medium',
      is_verified: false,
      evidences: [
        { id: 'ev-8', evidence_type: 'theory_completion', label: 'Técnica de pellizco y rolling', score_obtained: 100, max_score: 100, is_verified: true },
        { id: 'ev-9', evidence_type: 'photo_submission', label: 'Práctica de 50 abanicos en esponja', score_obtained: 65, max_score: 100, is_verified: false, feedback: 'Pendiente de entrega de la segunda serie de abanicos simétricos.' },
      ],
    },
    {
      id: 'stk-04',
      student_id: studentId,
      skill: MASTER_SKILLS_TAXONOMY[7], // Bioseguridad y Química
      proficiency_score: 94,
      confidence_level: 'expert',
      is_verified: true,
      verified_at: '2026-08-08',
      verified_by_name: 'Dra. María Rodríguez',
      evidences: [
        { id: 'ev-10', evidence_type: 'theory_completion', label: 'Manual de Toxicología & Cianoacrilato', score_obtained: 100, max_score: 100, is_verified: true },
        { id: 'ev-11', evidence_type: 'quiz_score', label: 'Examen de Bioseguridad Ocular & Esterilización', score_obtained: 96, max_score: 100, is_verified: true },
      ],
    },
    {
      id: 'stk-05',
      student_id: studentId,
      skill: MASTER_SKILLS_TAXONOMY[1], // Manicura Rusa
      proficiency_score: 78,
      confidence_level: 'medium',
      is_verified: true,
      verified_at: '2026-08-14',
      verified_by_name: 'Dra. María Rodríguez',
      evidences: [
        { id: 'ev-12', evidence_type: 'theory_completion', label: 'Ángulos de fresa y velocidades RPM', score_obtained: 100, max_score: 100, is_verified: true },
        { id: 'ev-13', evidence_type: 'photo_submission', label: 'Foto de cutícula despejada sin cortes', score_obtained: 80, max_score: 100, is_verified: true },
      ],
    },
  ];
}

// 3. PUBLIC PROFESSIONAL SKILL PASSPORT PROFILE
export function getPublicSkillPassport(slug: string): ProfessionalSkillPassport | null {
  const normalized = slug.toLowerCase();

  if (normalized === 'lucia-martinez' || normalized === 'lucia') {
    return {
      slug: 'lucia-martinez',
      student_name: 'Lucía Martínez',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      specialty_title: 'Lash Stylist Profesional & Especialista en Mirada',
      bio: 'Especialista acreditada en extensiones de pestañas pelo a pelo, visagismo ocular correctivo y volumen ruso. Formada bajo los estándares técnicos de Faby Studio Academy con más de 34 horas de práctica supervisada en modelos reales.',
      location: 'Madrid, España',
      completion_rate: 68,
      total_active_hours: 34.5,
      skills: getStudentSkills(),
      verified_certificates: [
        {
          code: 'CERT-FS-DEMO-9988',
          course_title: 'Especialización en Pestañas y Volumen Ruso',
          issued_at: 'Agosto 2026',
          hash_signature: '9a8f4c2e1b7d5e6a3f0c8b9d4e2a1f7c5e6d8a9b0c1e2f3a4b5c6d7e8f9a0b1c',
        },
      ],
      portfolio_projects: [
        {
          id: 'p1',
          title: 'Transformación Natural a Volumen Ruso 3D Efecto Ardilla',
          category: 'Pestañas',
          before_image: 'https://images.unsplash.com/photo-1583001809873-a1284a5da677?q=80&w=800&auto=format&fit=crop',
          after_image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
          technique_notes: 'Curvatura C en zona medial y D en tercio exterior para elevar ojo caído. Adhesivo de secado rápido (1 seg) con humedad controlada al 55%.',
          tutor_grade: '94 / 100 (Excelente)',
        },
        {
          id: 'p2',
          title: 'Corrección de Párpado Encapotado con Curvaturas Mixtas',
          category: 'Visagismo',
          before_image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
          after_image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop',
          technique_notes: 'Diseño abierto para liberar el pliegue del párpado sin ejercer sobrepeso en la pestaña natural.',
          tutor_grade: '88 / 100 (Aprobado)',
        },
      ],
    };
  }

  if (normalized === 'camila-torres' || normalized === 'camila') {
    return {
      slug: 'camila-torres',
      student_name: 'Camila Torres',
      avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
      specialty_title: 'Master Nail Artist & Lash Specialist',
      bio: 'Graduada de Honor en Faby Studio Academy. Dominio absoluto de esculpido estructural en gel, manicura rusa con fresa llama y mega volumen ruso.',
      location: 'Barcelona, España',
      completion_rate: 100,
      total_active_hours: 50.0,
      skills: getStudentSkills().map((s) => ({ ...s, proficiency_score: 95, confidence_level: 'expert', is_verified: true })),
      verified_certificates: [
        {
          code: 'CERT-FS-2026-4412',
          course_title: 'Máster Profesional en Uñas de Gel y Acrílico Premium',
          issued_at: 'Agosto 2026',
          hash_signature: '7c5e6d8a9b0c1e2f3a4b5c6d7e8f9a0b1c9a8f4c2e1b7d5e6a3f0c8b9d4e2a1f',
        },
      ],
      portfolio_projects: [
        {
          id: 'p3',
          title: 'Reconstrucción Ungueal Esculpida en Gel & Nail Art Francés',
          category: 'Uñas',
          before_image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop',
          after_image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
          technique_notes: 'Ápice centrado a 1/3 de la cutícula, manicura rusa profunda y esmaltado bajo cutícula.',
          tutor_grade: '98 / 100 (Sobresaliente)',
        },
      ],
    };
  }

  return null;
}

// 4. EARLY WARNING RETENTION DETECTOR (RULES-BASED)
export function getRetentionRiskAnalysis(): RetentionRiskStudent[] {
  return [
    {
      id: 'student-3',
      name: 'María López',
      email: 'maria.lopez@gmail.com',
      avatar: 'ML',
      courseTitle: 'Curso Superior de Cosmetología Facial',
      progress: 45,
      activeHours: 18.2,
      daysInactive: 4,
      failedQuizzesCount: 1,
      pendingPracticesCount: 2,
      riskLevel: 'high',
      riskFactors: [
        '4 días consecutivos sin iniciar sesión',
        '2 prácticas prácticas pendientes de entrega con fecha límite vencida',
        'Último quiz teórico no superado (55/100)',
      ],
      recommendedAction: 'Enviar recordatorio motivacional por WhatsApp y agendar tutoría 1 a 1 de refuerzo.',
    },
    {
      id: 'student-4',
      name: 'Sofía Navarro',
      email: 'sofia.navarro@gmail.com',
      avatar: 'SN',
      courseTitle: 'Especialización en Pestañas y Volumen Ruso',
      progress: 58,
      activeHours: 24.0,
      daysInactive: 2,
      failedQuizzesCount: 0,
      pendingPracticesCount: 1,
      riskLevel: 'medium',
      riskFactors: [
        'Ritmo de estudio reducido un 40% en la última semana',
        'Práctica 02 de abanicos pendiente de envío',
      ],
      recommendedAction: 'Proponer sesión de flashcards de 3 min y feedback en foro.',
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Lucía Martínez',
      email: 'lucia.martinez@gmail.com',
      avatar: 'LM',
      courseTitle: 'Especialización en Pestañas y Volumen Ruso',
      progress: 68,
      activeHours: 34.5,
      daysInactive: 0,
      failedQuizzesCount: 0,
      pendingPracticesCount: 0,
      riskLevel: 'low',
      riskFactors: ['Alumna constante, racha activa de 5 días 🔥'],
      recommendedAction: 'Felicitar por entrega de práctica 01.',
    },
  ];
}

// 5. IN-APP LIVING NOTIFICATIONS
export function getDemoNotifications(): InAppNotification[] {
  return [
    {
      id: 'notif-1',
      title: '🎯 Nueva Corrección Docente',
      message: 'La Dra. María Rodríguez ha calificado tu Práctica 01 con 86/100 y notas en el anotador visual.',
      type: 'feedback',
      link_url: '/campus/practicas',
      is_read: false,
      created_at: 'Hace 15 min',
    },
    {
      id: 'notif-2',
      title: '🔥 ¡Racha de 5 Días Activa!',
      message: 'Has completado tu repaso diario de flashcards. Ganaste +50 XP y protegiste tu racha.',
      type: 'streak',
      link_url: '/campus/flashcards',
      is_read: false,
      created_at: 'Hoy, 10:20h',
    },
    {
      id: 'notif-3',
      title: '📅 Tutoría 1 a 1 Confirmada',
      message: 'Tu sesión individual con la Dra. María Rodríguez está programada para el martes a las 18:00h.',
      type: 'tutoring',
      link_url: '/campus/tutorias',
      is_read: true,
      created_at: 'Ayer',
    },
  ];
}
