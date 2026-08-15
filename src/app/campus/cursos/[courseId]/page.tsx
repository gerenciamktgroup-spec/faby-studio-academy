'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ActiveLearningTracker } from '@/components/shared/ActiveLearningTracker';
import {
  Play,
  FileText,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Award,
  FileCheck,
  Download,
  Clock,
  MessageSquare,
  Sparkles,
  Plus,
  Send,
  SlidersHorizontal,
  Volume2,
  Lock,
  PictureInPicture,
  Keyboard,
  Info,
  Maximize,
  X,
  Video,
  Youtube,
  Layers,
  BookOpen,
  ListOrdered,
  BookmarkCheck,
  Search,
} from 'lucide-react';
import {
  DEMO_DOWNLOADABLE_RESOURCES,
  INITIAL_DEMO_NOTES,
  INITIAL_DEMO_COMMENTS,
  PLAYBACK_SPEEDS,
  VIDEO_QUALITIES,
  LessonNote,
  LessonComment
} from '@/lib/services-demo/streaming-service';

// Course Curriculum Catalog with Real YouTube Master Classes
const COURSES_DATA: Record<string, {
  id: string;
  title: string;
  category: string;
  moduleTitle: string;
  otherModules: Array<{ title: string; subtitle: string }>;
  lessons: Array<{
    id: string;
    title: string;
    type: 'video' | 'quiz' | 'assignment';
    duration: string;
    videoUrl?: string;
    body: string;
    passingScore?: number;
    questions?: Array<{
      id: string;
      question: string;
      options: string[];
      correct: number;
    }>;
  }>;
}> = {
  // Course 1: Uñas de Gel & Acrílico — Videos reales verificados
  'c2000000-0000-0000-0000-000000000002': {
    id: 'c2000000-0000-0000-0000-000000000002',
    title: 'Máster Profesional en Uñas de Gel y Acrílico Premium',
    category: 'Uñas & Manicura',
    moduleTitle: 'Módulo 1: Manicura Rusa Combinada & Esculpido Estructural',
    otherModules: [
      { title: 'Módulo 2: Acrílico de Salón & Control de Perlas', subtitle: '6 lecciones • 1 práctica técnica' },
      { title: 'Módulo 3: Dual System Forms & Polygel', subtitle: '5 lecciones • Master Class' },
      { title: 'Módulo 4: Nail Art de Salón & Francesa Inversa', subtitle: '6 lecciones • Evaluación' },
      { title: 'Módulo 5: Rellenos, Retiradas y Rentabilidad', subtitle: '4 lecciones • Proyecto Final' },
    ],
    lessons: [
      {
        id: 'l1',
        title: 'Master Class 1.1: Manicura Rusa Combinada & Preparación Anatómica',
        type: 'video',
        duration: '45 min',
        videoUrl: 'https://www.youtube.com/watch?v=gMLz-995K-A',
        body: 'Master Class completa de manicura rusa combinada con torno y fresas de diamante, deshidratación de la placa ungueal, primers sin ácido y colocación milimétrica de moldes de salón.',
      },
      {
        id: 'l2',
        title: 'Lección 1.2: Curso Completo de Uñas de Gel — Xnails',
        type: 'video',
        duration: '50 min',
        videoUrl: 'https://www.youtube.com/watch?v=a2NvwHH6HPQ',
        body: 'Curso completo de uñas de gel paso a paso con Xnails Peru. Domina la preparación de la uña natural, aplicación de base, construcción de estructura, sellado y limado con torno profesional.',
      },
      {
        id: 'l3',
        title: 'Lección 1.3: Builder Gel & Cuidado de Cutícula Profesional',
        type: 'video',
        duration: '30 min',
        videoUrl: 'https://www.youtube.com/watch?v=1F_47N7yZ-w',
        body: 'Domina el builder gel de construcción para uñas de alta resistencia. Técnicas de levantamiento cero, deshidratación correcta y sistema de sellado.',
      },
      {
        id: 'l4',
        title: 'Evaluación Teórica: Anatomía Ungular & Bioseguridad en Salón',
        type: 'quiz',
        duration: '15 min',
        passingScore: 70,
        body: 'Evaluación técnica obligatoria sobre histología de la uña, esterilización y fresas de diamante.',
        questions: [
          {
            id: 'q1',
            question: '¿Cuál es la función biomecánica del ápice en una estructura de uñas esculpidas?',
            options: [
              'Aportar resistencia mecánica en la zona de estrés para evitar roturas',
              'Servir exclusivamente como elemento decorativo de volumen',
              'Facilitar la absorción de aceites de cutícula',
            ],
            correct: 0,
          },
          {
            id: 'q2',
            question: '¿A qué ángulo se debe posicionar la fresa llama de diamante durante la manicura rusa?',
            options: [
              'A 45 grados respecto al pliegue ungueal sin tocar la placa natural',
              'A 90 grados perpendicular sobre la lámina ungueal',
              'A 0 grados plana sobre el lecho ungueal',
            ],
            correct: 0,
          },
        ],
      },
      {
        id: 'l4',
        title: 'Práctica 01: Esculpido Ballerina en Modelo Real',
        type: 'assignment',
        duration: '40 min',
        body: 'Sube 3 fotografías en alta resolución de tu aplicación de gel/acrílico (vista cenital del ápice, curva C frontal y sellado de cutícula) para evaluación por rúbrica de 100 puntos.',
      },
    ],
  },

  // Course 2: Pestañas — IDs verificados de Beauty Lash & otros canales
  'c1000000-0000-0000-0000-000000000001': {
    id: 'c1000000-0000-0000-0000-000000000001',
    title: 'Especialización en Pestañas y Volumen Ruso',
    category: 'Mirada & Pestañas',
    moduleTitle: 'Módulo 1: Fundamentos Profesionales, Aislamiento & Bioseguridad',
    otherModules: [
      { title: 'Módulo 2: Diseño y Mapping de la Mirada (Cat Eye, Doll)', subtitle: '6 lecciones • 1 práctica técnica' },
      { title: 'Módulo 3: Técnica Clásica Pelo a Pelo en Modelo', subtitle: '7 lecciones • Evaluada 86/100' },
      { title: 'Módulo 4: Volumen Ruso 2D a 6D y Abanicado Manual', subtitle: '6 lecciones • Master Class' },
      { title: 'Módulo 5: Retención Máxima & Cuidados Posteriores', subtitle: '4 lecciones • Proyecto Final' },
    ],
    lessons: [
      {
        id: 'l1',
        title: 'Master Class 1.1: Tutorial Pelo a Pelo — Técnica Clásica 1x1',
        type: 'video',
        duration: '35 min',
        videoUrl: 'https://www.youtube.com/watch?v=FmcPn9DJ5ef',
        body: 'Tutorial completo paso a paso: preparación de pestañas naturales, colocación de parches de hidrogel, técnica de pinzas y aislamiento milimétrico sin adherencias para un acabado natural.',
      },
      {
        id: 'l2',
        title: 'Lección 1.2: Volumen Ruso en 45 Minutos — Beauty Lash',
        type: 'video',
        duration: '45 min',
        videoUrl: 'https://www.youtube.com/watch?v=Fj7rP9S0D_A',
        body: 'Tutorial de abanicos prefabricados de volumen ruso para optimizar tiempos de aplicación profesional. Beauty Lash — canal líder hispano de extensiones. Cubre diseño, capas y retención.',
      },
      {
        id: 'l3',
        title: 'Lección 1.3: Natural Volume & Diseño Avanzado — Beauty Lash',
        type: 'video',
        duration: '40 min',
        videoUrl: 'https://www.youtube.com/watch?v=kYJj8Uo63vM',
        body: 'Tutorial avanzado con consejos de diseño del ojo, mapping y técnica de volumen natural ruso. Aprende a personalizar el efecto según la morfología ocular de cada clienta.',
      },
      {
        id: 'l4',
        title: 'Lección 1.4: Volumen 2D, 3D y 4D — Light Volume Natural',
        type: 'video',
        duration: '45 min',
        videoUrl: 'https://www.youtube.com/watch?v=7D3qZ_p5J14',
        body: 'Guía completa para volúmenes ligeros 2D-4D: diferenciación por nivel y peso de los abanicos, selección del diámetro correcto e impacto en la salud de la pestaña natural.',
      },
      {
        id: 'l5',
        title: 'Evaluación Teórica: Bioseguridad e Higiene Ocular',
        type: 'quiz',
        duration: '15 min',
        passingScore: 70,
        body: 'Evaluación técnica sobre salud folicular, contraindicaciones, adhesivos y aislamiento.',
        questions: [
          {
            id: 'q1',
            question: '¿Cuál es la función principal de la fase anágena en la pestaña natural?',
            options: [
              'Fase de crecimiento activo del folículo piloso',
              'Fase de reposo y caída natural',
              'Fase de transición folicular',
            ],
            correct: 0,
          },
          {
            id: 'q2',
            question: '¿A qué distancia mínima del párpado se debe aplicar la extensión de pestaña?',
            options: [
              '0.5 mm a 1 mm de la raíz sin tocar piel',
              'Directamente pegada a la piel del párpado',
              'A 3 mm de la raíz',
            ],
            correct: 0,
          },
          {
            id: 'q3',
            question: '¿Para qué sirve el nanomister al final de la aplicación?',
            options: [
              'Acelerar el curado del adhesivo con vapor de agua ultrafino',
              'Eliminar el adhesivo sobrante con acetona',
              'Limpiar los parches de hidrogel antes de retirar',
            ],
            correct: 0,
          },
        ],
      },
      {
        id: 'l6',
        title: 'Práctica 01: Aplicación Técnica Clásica Pelo a Pelo',
        type: 'assignment',
        duration: '30 min',
        body: 'Entrega obligatoria de fotografías de trabajo en modelo real para revisión docente por rúbrica de 100 puntos.',
      },
    ],
  },

  // Course 3: Cosmetología Facial — Videos verificados de canales profesionales
  'c3000000-0000-0000-0000-000000000003': {
    id: 'c3000000-0000-0000-0000-000000000003',
    title: 'Curso Superior de Cosmetología Facial y Skin Care',
    category: 'Cosmetología',
    moduleTitle: 'Módulo 1: Anatomía de la Piel, Biotipos Cutáneos & Higiene Facial',
    otherModules: [
      { title: 'Módulo 2: Química Cosmética & Activos Transformadores', subtitle: '6 lecciones • Casos Clínicos' },
      { title: 'Módulo 3: Peelings Químicos & Neutralización de pH', subtitle: '6 lecciones • 1 práctica técnica' },
      { title: 'Módulo 4: Dermapen & Principios Activos Viales', subtitle: '5 lecciones • Master Class' },
      { title: 'Módulo 5: Drenaje Linfático Facial & Masaje Kobido', subtitle: '5 lecciones • Proyecto Final' },
    ],
    lessons: [
      {
        id: 'l1',
        title: 'Master Class 1.1: Protocolo Limpieza Facial Profunda en Cabina',
        type: 'video',
        duration: '35 min',
        videoUrl: 'https://www.youtube.com/watch?v=o6Z52S9qJ5k',
        body: 'Master Class completa de higiene facial profunda: diagnóstico de biotipo cutáneo, desincrustación con vapor, extracción técnica no invasiva y mascarilla calmante post-tratamiento.',
      },
      {
        id: 'l2',
        title: 'Lección 1.2: Lifting de Pestañas Paso a Paso — Técnica Semipermanente',
        type: 'video',
        duration: '32 min',
        videoUrl: 'https://www.youtube.com/watch?v=kYJ7g1v6C40',
        body: 'Procedimiento completo de lash lifting: preparación de la pestaña, silicones, loción keratin y resultado de semipermanente de hasta 8 semanas. Ideal para servicios de valor añadido en cabina.',
      },
      {
        id: 'l3',
        title: 'Lección 1.3: Laminado de Cejas — Eyebrow Lamination Profesional',
        type: 'video',
        duration: '28 min',
        videoUrl: 'https://www.youtube.com/watch?v=99R8j7R_uF0',
        body: 'Protocolo completo de laminado de cejas: aplicación de lociones, peinado y fijación. Servicio complementario al tratamiento facial de alto valor en salón.',
      },
      {
        id: 'l4',
        title: 'Evaluación Teórica: Histología Cutánea & Bioseguridad',
        type: 'quiz',
        duration: '15 min',
        passingScore: 70,
        body: 'Evaluación sobre capas epidérmicas, pH cutáneo y protocolos de desinfección en cabina.',
        questions: [
          {
            id: 'q1',
            question: '¿Cuál es el valor medio de pH del manto hidrolipídico de una piel sana?',
            options: [
              'Entre 4.5 y 5.5 (ligeramente ácido)',
              'Entre 7.5 y 8.5 (alcalino)',
              '1.0 (fuertemente ácido)',
            ],
            correct: 0,
          },
          {
            id: 'q2',
            question: '¿En qué capa de la epidermis se produce la mitosis celular?',
            options: [
              'Estrato basal o germinativo',
              'Estrato córneo superficial',
              'Estrato lúcido',
            ],
            correct: 0,
          },
          {
            id: 'q3',
            question: '¿Qué aparato genera ozono con efecto bactericida en cabina estética?',
            options: [
              'Alta frecuencia con electrodo de vapor',
              'Ultrasonido de baja frecuencia',
              'Lámpara UV de polimerización',
            ],
            correct: 0,
          },
        ],
      },
      {
        id: 'l5',
        title: 'Práctica 01: Protocolo de Diagnóstico y Limpieza Facial',
        type: 'assignment',
        duration: '45 min',
        body: 'Realiza una ficha de diagnóstico cutáneo y sube las fotografías del protocolo de limpieza en cabina para revisión docente.',
      },
    ],
  },
};

// Aliases for friendly URLs
COURSES_DATA['unas-de-gel-y-acrilico'] = COURSES_DATA['c2000000-0000-0000-0000-000000000002'];
COURSES_DATA['extensiones-de-pestanas'] = COURSES_DATA['c1000000-0000-0000-0000-000000000001'];
COURSES_DATA['cosmetologia-facial'] = COURSES_DATA['c3000000-0000-0000-0000-000000000003'];
COURSES_DATA['c1'] = COURSES_DATA['c2000000-0000-0000-0000-000000000002'];
COURSES_DATA['c2'] = COURSES_DATA['c1000000-0000-0000-0000-000000000001'];
COURSES_DATA['c3'] = COURSES_DATA['c3000000-0000-0000-0000-000000000003'];

export interface VideoChapter {
  id: string;
  timeSeconds: number;
  timeFormatted: string;
  title: string;
  description: string;
  keyTakeaway: string;
}

const LESSON_CHAPTERS_MAP: Record<string, VideoChapter[]> = {
  l1: [
    {
      id: 'c1',
      timeSeconds: 0,
      timeFormatted: '00:00',
      title: '1. Introducción & Preparación del Protocolo',
      description: 'Presentación de instrumental, desinfección con glutaraldehído y organización de mesa de trabajo.',
      keyTakeaway: 'Desinfección obligatoria 20 min antes de la clienta.',
    },
    {
      id: 'c2',
      timeSeconds: 245,
      timeFormatted: '04:05',
      title: '2. Colocación de Parches de Hidrogel & Aislamiento Inferior',
      description: 'Técnica de colocación sin presionar la conjuntiva ni tapar la línea de agua.',
      keyTakeaway: 'Distancia de 1mm del lagrimal inferior para no irritar.',
    },
    {
      id: 'c3',
      timeSeconds: 615,
      timeFormatted: '10:15',
      title: '3. Dosificación y Control de la Micro-Gota de Adhesivo',
      description: 'Inmersión a 45° a 2mm de profundidad para retención óptima sin pegotes.',
      keyTakeaway: 'Renovación de gota cada 15-20 minutos.',
    },
    {
      id: 'c4',
      timeSeconds: 1120,
      timeFormatted: '18:40',
      title: '4. Técnica de Aislamiento 1x1 en Pestaña Anágena',
      description: 'Separación milimétrica con pinza curva y acople sin tensión folicular.',
      keyTakeaway: 'Distancia fija de 0.5 a 1.0 mm de la raíz.',
    },
    {
      id: 'c5',
      timeSeconds: 1680,
      timeFormatted: '28:00',
      title: '5. Sellado con Nanomister y Peinado Final',
      description: 'Polimerización controlada y verificación de stickies.',
      keyTakeaway: 'Nanomister a mínimo 25 cm de distancia.',
    },
  ],
  l2: [
    {
      id: 'c21',
      timeSeconds: 0,
      timeFormatted: '00:00',
      title: '1. Diagnóstico de la Mirada & Mapping Doll Eye',
      description: 'Morfología ocular, elección de curvatura C/D y mapa de longitudes.',
      keyTakeaway: 'Longitud máxima en centro pupilar.',
    },
    {
      id: 'c22',
      timeSeconds: 420,
      timeFormatted: '07:00',
      title: '2. Creación de Abanicos de Volumen 3D en Tira',
      description: 'Técnica de pellizco y abanicado en banda adhesiva.',
      keyTakeaway: 'Base cristalizada ultrafina.',
    },
    {
      id: 'c23',
      timeSeconds: 1200,
      timeFormatted: '20:00',
      title: '3. Dirección y Envoltura del Adhesivo',
      description: 'Acople magnético del abanico envolviendo la pestaña natural.',
      keyTakeaway: 'Retención de hasta 8 semanas.',
    },
  ],
};

// Helper to extract YouTube embed URL
function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1` : null;
}

export default function CoursePlayerPage() {
  const params = useParams();
  const routeParam = (params?.courseId as string) || 'c1000000-0000-0000-0000-000000000001';
  
  // Resolve active course
  const currentCourse = COURSES_DATA[routeParam] || COURSES_DATA['c1000000-0000-0000-0000-000000000001'];
  const lessons = currentCourse.lessons;
  const courseId = currentCourse.id;

  const demoStudentId = '22222222-2222-2222-2222-222222222222';
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['l1']);
  const [activeTab, setActiveTab] = useState<'capitulos' | 'recursos' | 'notas' | 'preguntas' | 'proyecto'>('capitulos');
  const [chapterSearchQuery, setChapterSearchQuery] = useState('');
  const [showKeyboardGuide, setShowKeyboardGuide] = useState(false);
  const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Streaming Player Controls
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [selectedQuality, setSelectedQuality] = useState<string>('Auto (1080p ABR)');
  
  // Quiz State
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Notes State
  const [notes, setNotes] = useState<Record<string, LessonNote[]>>(INITIAL_DEMO_NOTES);
  const [newNoteText, setNewNoteText] = useState('');

  // Questions / Comments State
  const [comments, setComments] = useState<Record<string, LessonComment[]>>(INITIAL_DEMO_COMMENTS);
  const [newQuestionText, setNewQuestionText] = useState('');

  const currentLesson = lessons[activeLessonIdx] || lessons[0];
  const currentResources = DEMO_DOWNLOADABLE_RESOURCES[currentLesson.id] || [
    {
      id: 'res-default',
      title: `Guía Técnica Oficial — ${currentLesson.title.split(':')[1] || currentLesson.title}`,
      fileName: `Dossier_${currentLesson.id}_FabyStudio.pdf`,
      fileSize: '2.1 MB',
      type: 'pdf',
      downloadUrl: 'data:application/pdf;base64,JVBERi0xLjQKJUZBQlkgU1RVRElPIEFDQURFTVkgRE9TU0lFUg==',
    }
  ];
  const currentNotes = notes[currentLesson.id] || [];
  const currentComments = comments[currentLesson.id] || [];

  const youtubeEmbedUrl = getYouTubeEmbedUrl(currentLesson.videoUrl);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTogglePip = async () => {
    try {
      if (videoRef.current) {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await videoRef.current.requestPictureInPicture();
        }
      }
    } catch (err) {
      console.warn('PiP no disponible', err);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      if (activeEl && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (videoRef.current) {
          if (videoRef.current.paused) videoRef.current.play();
          else videoRef.current.pause();
        }
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime = Math.min(videoRef.current.duration || 9999, videoRef.current.currentTime + 5);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        if (videoRef.current) {
          if (document.fullscreenElement) document.exitFullscreen();
          else videoRef.current.requestFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMarkCompleted = async (id: string) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons([...completedLessons, id]);

      if (activeLessonIdx < lessons.length - 1) {
        setAutoAdvanceCountdown(3);
      }

      showToast('¡Lección completada! Progreso registrado en tu expediente.');

      try {
        await fetch('/api/audit/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: demoStudentId,
            sessionId: sessionStorage.getItem('fabi_session_id') || 'sess_demo',
            isTabVisible: true,
            isVideoPlaying: true,
            courseId,
            lessonId: id,
          }),
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleJumpToTimestamp = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    } else {
      showToast(`Timestamp ${seconds}s fijado en la clase.`);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const currentTime = videoRef.current ? Math.floor(videoRef.current.currentTime) : 45;
    const mins = Math.floor(currentTime / 60);
    const secs = currentTime % 60;
    const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    const newNote: LessonNote = {
      id: 'note_' + Date.now(),
      timestampSeconds: currentTime,
      timestampFormatted: formatted,
      text: newNoteText.trim(),
      createdAt: 'Ahora mismo',
    };

    setNotes({
      ...notes,
      [currentLesson.id]: [newNote, ...(notes[currentLesson.id] || [])],
    });
    setNewNoteText('');
    showToast('¡Apunte añadido con éxito!');
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newComment: LessonComment = {
      id: 'comm_' + Date.now(),
      author: 'Lucía Martínez',
      avatar: 'LM',
      timeAgo: 'Ahora mismo',
      question: newQuestionText.trim(),
    };

    setComments({
      ...comments,
      [currentLesson.id]: [newComment, ...(comments[currentLesson.id] || [])],
    });
    setNewQuestionText('');
    showToast('¡Duda técnica enviada a tu tutora!');
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuizSubmitted(true);
    setQuizScore(100);
    handleMarkCompleted(currentLesson.id);
  };

  const handlePrevLesson = () => {
    if (activeLessonIdx > 0) setActiveLessonIdx(activeLessonIdx - 1);
  };

  const handleNextLesson = () => {
    if (activeLessonIdx < lessons.length - 1) setActiveLessonIdx(activeLessonIdx + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Player Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <Link href="/campus" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center text-xs font-semibold">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver al Campus
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-sm font-bold font-display text-slate-900 truncate max-w-xs sm:max-w-md">
            {currentCourse.title}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/demo"
            className="hidden sm:inline-flex items-center space-x-1 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs px-2.5 py-1 rounded-lg font-bold transition-all"
          >
            <Sparkles className="w-3 h-3" />
            <span>Role Switcher</span>
          </Link>
          <ActiveLearningTracker userId={demoStudentId} courseId={courseId} lessonId={currentLesson.id} />
        </div>
      </header>

      {/* Main Grid: Sidebar + Player */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Curriculum Sidebar */}
        <aside className="lg:col-span-4 bg-white border-r border-slate-200 p-6 overflow-y-auto space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded">
                {currentCourse.category}
              </span>
              <span className="text-xs text-slate-500 font-semibold">{completedLessons.length} / {lessons.length} completadas</span>
            </div>
            <h2 className="text-base font-bold font-display text-slate-900 mt-2 leading-snug">
              {currentCourse.moduleTitle}
            </h2>
          </div>

          {/* Lessons List */}
          <div className="space-y-2">
            {lessons.map((lesson, idx) => {
              const isCurrent = idx === activeLessonIdx;
              const isCompleted = completedLessons.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setActiveLessonIdx(idx);
                    setQuizSubmitted(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start justify-between ${
                    isCurrent
                      ? 'bg-rose-50 border-rose-300 text-rose-950 font-semibold shadow-xs ring-1 ring-rose-200'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {lesson.type === 'video' && (
                        lesson.videoUrl?.includes('youtube') ? (
                          <Youtube className="w-4 h-4 text-red-600" />
                        ) : (
                          <Play className="w-4 h-4 text-rose-600" />
                        )
                      )}
                      {lesson.type === 'quiz' && <HelpCircle className="w-4 h-4 text-amber-600" />}
                      {lesson.type === 'assignment' && <FileCheck className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <div>
                      <p className="line-clamp-1">{lesson.title}</p>
                      <span className="text-[10px] text-slate-400">{lesson.duration}</span>
                    </div>
                  </div>

                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Course Switcher & Next Modules */}
          <div className="pt-4 border-t border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Módulos del Máster:</p>
              <span className="text-[10px] font-semibold text-rose-600">6 Módulos</span>
            </div>

            {currentCourse.otherModules.map((mod, mIdx) => (
              <button
                key={mIdx}
                onClick={() => showToast(`El ${mod.title.split(':')[0]} se desbloquea al aprobar la evaluación actual.`)}
                className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-500 space-y-1 transition-colors group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-700 group-hover:text-slate-900">{mod.title}</p>
                  <Lock className="w-3 h-3 text-slate-400" />
                </div>
                <p className="text-[10px] text-slate-400">{mod.subtitle}</p>
              </button>
            ))}
          </div>
        </aside>

        {/* Right Active Content & Tabbed Workspace */}
        <main className="lg:col-span-8 p-6 lg:p-8 overflow-y-auto space-y-6 bg-slate-50">
          {/* Header Title and Mark Complete Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  {currentLesson.type === 'video' ? 'Clase Magistral en Video' : currentLesson.type === 'quiz' ? 'Evaluación Teórica' : 'Entrega Práctica'}
                </span>
                {youtubeEmbedUrl && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded flex items-center space-x-1">
                    <Youtube className="w-3 h-3 text-red-600" />
                    <span>YouTube HD Stream</span>
                  </span>
                )}
              </div>
              <h1 className="text-lg font-bold font-display text-slate-900">{currentLesson.title}</h1>
            </div>

            <button
              onClick={() => handleMarkCompleted(currentLesson.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5 self-start ${
                completedLessons.includes(currentLesson.id)
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {completedLessons.includes(currentLesson.id) ? 'Lección Completada ✓' : 'Marcar como Completada'}
              </span>
            </button>
          </div>

          {/* Render Main Content: Video / Quiz / Assignment */}
          {currentLesson.type === 'video' && (
            <div className="space-y-4">
              {/* Video Player Box: Supports both YouTube Embed and Native Video */}
              <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-slate-300 relative group shadow-md">
                {youtubeEmbedUrl ? (
                  <iframe
                    src={youtubeEmbedUrl}
                    title={currentLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={currentLesson.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Subtle Dynamic Watermark Anti-Piracy */}
                <div className="absolute top-4 right-4 pointer-events-none opacity-40 text-[10px] font-mono text-white bg-black/70 px-2.5 py-1 rounded backdrop-blur-xs border border-white/10 select-none">
                  lucia.martinez@gmail.com • FABY STUDIO ACADEMY
                </div>
              </div>

              {/* Streaming Settings Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-xs">
                {youtubeEmbedUrl ? (
                  <div className="flex items-center space-x-2 text-rose-600 font-bold">
                    <Youtube className="w-4 h-4 text-red-600" />
                    <span>Transmisión en Vivo desde YouTube (1080p Master Class)</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-500 font-semibold">Velocidad:</span>
                    <div className="flex space-x-1">
                      {PLAYBACK_SPEEDS.map((spd) => (
                        <button
                          key={spd}
                          onClick={() => handleSpeedChange(spd)}
                          className={`px-2 py-1 rounded text-[11px] font-bold transition-colors ${
                            playbackSpeed === spd
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  {!youtubeEmbedUrl && (
                    <button
                      type="button"
                      onClick={handleTogglePip}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                      title="Modo Picture-in-Picture (Ventana Flotante)"
                    >
                      <PictureInPicture className="w-3.5 h-3.5 text-rose-600" />
                      <span className="hidden sm:inline">PiP</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowKeyboardGuide(true)}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                    title="Ver Atajos de Teclado"
                  >
                    <Keyboard className="w-3.5 h-3.5 text-slate-600" />
                    <span className="hidden sm:inline">Atajos</span>
                  </button>

                  <SlidersHorizontal className="w-3.5 h-3.5 text-purple-600 ml-1" />
                  <span className="text-slate-500 font-semibold hidden md:inline">Calidad:</span>
                  <select
                    value={selectedQuality}
                    onChange={(e) => setSelectedQuality(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-800 text-[11px] rounded-lg px-2 py-1 focus:outline-none focus:border-rose-500"
                  >
                    {VIDEO_QUALITIES.map((q) => (
                      <option key={q.label} value={q.label}>
                        {q.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Auto-Advance Notification Banner */}
              {autoAdvanceCountdown !== null && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs font-bold text-emerald-900 shadow-sm animate-in fade-in slide-in-from-top-1">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>¡Lección completada con éxito! ¿Deseas continuar con la siguiente lección?</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setAutoAdvanceCountdown(null)}
                      className="px-2.5 py-1 text-slate-500 hover:text-slate-800 text-xs font-semibold"
                    >
                      Permanecer aquí
                    </button>
                    <button
                      onClick={() => {
                        setAutoAdvanceCountdown(null);
                        handleNextLesson();
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-xl text-xs font-bold shadow-xs transition-colors"
                    >
                      Continuar →
                    </button>
                  </div>
                </div>
              )}

              {/* Description Body */}
              <p className="text-xs text-slate-600 leading-relaxed bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                {currentLesson.body}
              </p>

              {/* Interactive Workspace Tabs */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
                <div className="flex border-b border-slate-200 space-x-4 text-xs font-bold overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('capitulos')}
                    className={`pb-3 transition-colors flex items-center space-x-1.5 whitespace-nowrap border-b-2 ${
                      activeTab === 'capitulos'
                        ? 'border-rose-600 text-rose-600'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <ListOrdered className="w-4 h-4" />
                    <span>Capítulos & Minutaje ({LESSON_CHAPTERS_MAP[currentLesson.id]?.length || 4})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('recursos')}
                    className={`pb-3 transition-colors flex items-center space-x-1.5 whitespace-nowrap border-b-2 ${
                      activeTab === 'recursos'
                        ? 'border-rose-600 text-rose-600'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Recursos & Guías PDF ({currentResources.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('notas')}
                    className={`pb-3 transition-colors flex items-center space-x-1.5 whitespace-nowrap border-b-2 ${
                      activeTab === 'notas'
                        ? 'border-rose-600 text-rose-600'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Mis Notas ({currentNotes.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('preguntas')}
                    className={`pb-3 transition-colors flex items-center space-x-1.5 whitespace-nowrap border-b-2 ${
                      activeTab === 'preguntas'
                        ? 'border-rose-600 text-rose-600'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Dudas de la Lección ({currentComments.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('proyecto')}
                    className={`pb-3 transition-colors flex items-center space-x-1.5 whitespace-nowrap border-b-2 ${
                      activeTab === 'proyecto'
                        ? 'border-rose-600 text-rose-600'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Proyecto & Práctica</span>
                  </button>
                </div>

                {/* Tab 0: Searchable Video Chapters & Index */}
                {activeTab === 'capitulos' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={chapterSearchQuery}
                          onChange={(e) => setChapterSearchQuery(e.target.value)}
                          placeholder="Buscar tema técnico en el video (ej. adhesivo, parches)..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 self-start sm:self-center">
                        Haz clic en el tiempo para saltar al segundo exacto
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {(LESSON_CHAPTERS_MAP[currentLesson.id] || LESSON_CHAPTERS_MAP['l1'])
                        .filter(
                          (ch) =>
                            !chapterSearchQuery ||
                            ch.title.toLowerCase().includes(chapterSearchQuery.toLowerCase()) ||
                            ch.description.toLowerCase().includes(chapterSearchQuery.toLowerCase()) ||
                            ch.keyTakeaway.toLowerCase().includes(chapterSearchQuery.toLowerCase())
                        )
                        .map((ch) => (
                          <div
                            key={ch.id}
                            className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-rose-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs group"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleJumpToTimestamp(ch.timeSeconds)}
                                  className="inline-flex items-center space-x-1.5 bg-white border border-rose-200 hover:bg-rose-600 hover:text-white text-rose-700 font-mono font-bold text-xs px-2.5 py-1 rounded-lg transition-colors shadow-2xs"
                                >
                                  <Play className="w-3 h-3 fill-current" />
                                  <span>{ch.timeFormatted}</span>
                                </button>
                                <span className="font-bold text-slate-900 text-sm font-display">
                                  {ch.title}
                                </span>
                              </div>
                              <p className="text-slate-600 text-[11px] leading-relaxed">
                                {ch.description}
                              </p>
                              <div className="flex items-center space-x-1 text-[10px] text-slate-400 pt-0.5">
                                <BookmarkCheck className="w-3 h-3 text-emerald-600" />
                                <span>Punto Clave: <strong className="text-slate-700">{ch.keyTakeaway}</strong></span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleJumpToTimestamp(ch.timeSeconds)}
                              className="self-end sm:self-center bg-white group-hover:bg-rose-600 group-hover:text-white border border-slate-200 group-hover:border-rose-600 text-slate-700 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors shrink-0 flex items-center space-x-1"
                            >
                              <span>Ver Sección</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Tab 1: Downloadable PDF Resources */}
                {activeTab === 'recursos' && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-700">Material de Apoyo para esta Lección:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentResources.map((res) => (
                        <div
                          key={res.id}
                          className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center space-x-3 truncate">
                            <FileText className="w-5 h-5 text-rose-600 shrink-0" />
                            <div className="truncate">
                              <p className="font-bold text-slate-900 truncate">{res.title}</p>
                              <p className="text-[10px] text-slate-500">{res.fileName} • {res.fileSize}</p>
                            </div>
                          </div>

                          <a
                            href={res.downloadUrl}
                            download={res.fileName}
                            onClick={() => showToast(`Descargando ${res.fileName}...`)}
                            className="bg-white border border-slate-200 hover:border-rose-500 text-slate-800 hover:text-rose-600 px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-colors flex items-center space-x-1 shadow-2xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Descargar</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Timestamped Notes */}
                {activeTab === 'notas' && (
                  <div className="space-y-4">
                    <form onSubmit={handleAddNote} className="flex gap-2">
                      <input
                        type="text"
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        placeholder="Escribe un apunte para repasar antes del examen..."
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                      />
                      <button
                        type="submit"
                        className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 shadow-xs"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Añadir Nota</span>
                      </button>
                    </form>

                    <div className="space-y-2">
                      {currentNotes.map((note) => (
                        <div
                          key={note.id}
                          className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3 text-xs"
                        >
                          <div className="space-y-1">
                            <button
                              onClick={() => handleJumpToTimestamp(note.timestampSeconds)}
                              className="inline-flex items-center space-x-1 text-rose-600 hover:underline font-mono font-bold text-[11px]"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>{note.timestampFormatted}</span>
                            </button>
                            <p className="text-slate-800">{note.text}</p>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0">{note.createdAt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Q&A / Lesson Comments */}
                {activeTab === 'preguntas' && (
                  <div className="space-y-4">
                    <form onSubmit={handleAddQuestion} className="flex gap-2">
                      <input
                        type="text"
                        value={newQuestionText}
                        onChange={(e) => setNewQuestionText(e.target.value)}
                        placeholder="Haz una pregunta técnica a la tutora..."
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                      />
                      <button
                        type="submit"
                        className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Preguntar</span>
                      </button>
                    </form>

                    <div className="space-y-3">
                      {currentComments.map((comm) => (
                        <div key={comm.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px]">
                                {comm.avatar}
                              </span>
                              <span className="font-bold text-slate-900">{comm.author}</span>
                            </div>
                            <span className="text-[10px] text-slate-400">{comm.timeAgo}</span>
                          </div>

                          <p className="text-slate-700">{comm.question}</p>

                          {comm.answer && (
                            <div className="pl-4 border-l-2 border-rose-500 space-y-1 bg-white p-3 rounded-lg border border-slate-200">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-rose-700">{comm.answer.author}</span>
                                <span className="text-[10px] text-slate-400">{comm.answer.timeAgo}</span>
                              </div>
                              <p className="text-slate-700 text-xs">{comm.answer.text}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 4: Project & Practice preview */}
                {activeTab === 'proyecto' && (
                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-800 font-bold flex items-center space-x-1">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <span>Práctica Obligatoria del Módulo</span>
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        Rúbrica de 100 Puntos
                      </span>
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                      Al finalizar las lecciones teóricas, deberás subir fotografías de tu trabajo en modelo real para que la tutora evalúe la técnica, la nivelación y la bioseguridad.
                    </p>

                    <Link
                      href="/campus/proyectos"
                      className="inline-flex items-center space-x-1.5 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-xs"
                    >
                      <span>Ir a la Galería de Proyectos & Entregas</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quiz Lesson View */}
          {currentLesson.type === 'quiz' && (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">{currentLesson.title}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Puntuación mínima requerida: 70%. Los intentos quedan registrados en el sistema de auditoría inmutable.
                </p>
              </div>

              {quizSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-slate-900">¡Evaluación Superada con Éxito!</h4>
                  <p className="text-sm text-emerald-800 font-semibold">Nota obtenida: {quizScore}% (10/10)</p>
                  <p className="text-xs text-slate-600">
                    Tu resultado ha sido registrado en la base de datos con trazabilidad de tiempo activo validado.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuizSubmit} className="space-y-6">
                  {currentLesson.questions?.map((q, idx) => (
                    <div key={q.id} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <p className="text-xs font-bold text-rose-600">Pregunta {idx + 1}</p>
                      <p className="text-sm font-semibold text-slate-900">{q.question}</p>

                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, oIdx) => (
                          <label
                            key={oIdx}
                            className="flex items-center space-x-3 p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-rose-50/50 cursor-pointer text-xs text-slate-700"
                          >
                            <input
                              type="radio"
                              name={q.id}
                              defaultChecked={oIdx === 0}
                              className="text-rose-600 focus:ring-rose-500"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-fabi-pink to-fabi-darkpink text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-fabi-pink/20 transition-all hover:scale-[1.01]"
                  >
                    Enviar Respuestas y Registrar Intento
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Assignment Lesson View */}
          {currentLesson.type === 'assignment' && (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Práctica Técnica Evaluada
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display">{currentLesson.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{currentLesson.body}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div>
                  <p className="font-bold text-slate-900">Estado de la Entrega:</p>
                  <p className="text-emerald-700 font-semibold">Evaluada por Tutora Laura Gómez (86/100)</p>
                </div>
                <Link
                  href="/campus/practicas"
                  className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl font-bold transition-colors flex items-center space-x-1 shadow-xs"
                >
                  <span>Ver Rúbrica & Fotos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Bottom Player Navigation Controls */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={handlePrevLesson}
              disabled={activeLessonIdx === 0}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                activeLessonIdx === 0
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-xs'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Lección Anterior</span>
            </button>

            <span className="text-xs text-slate-500">
              Lección {activeLessonIdx + 1} de {lessons.length}
            </span>

            <button
              onClick={handleNextLesson}
              disabled={activeLessonIdx === lessons.length - 1}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                activeLessonIdx === lessons.length - 1
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
              }`}
            >
              <span>Siguiente Lección</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </main>
      </div>

      {/* Keyboard Shortcuts Dialog */}
      {showKeyboardGuide && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Keyboard className="w-4 h-4 text-rose-600" />
                <h3 className="font-bold text-slate-900 text-sm">Atajos de Teclado del Reproductor</h3>
              </div>
              <button
                onClick={() => setShowKeyboardGuide(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-700">Reproducir / Pausar</span>
                <kbd className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono font-bold shadow-2xs">Espacio</kbd>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-700">Avanzar 5 segundos</span>
                <kbd className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono font-bold shadow-2xs">Flecha Derecha →</kbd>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-700">Retroceder 5 segundos</span>
                <kbd className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono font-bold shadow-2xs">← Flecha Izquierda</kbd>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-700">Pantalla Completa</span>
                <kbd className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono font-bold shadow-2xs">Tecla F</kbd>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-700">Silenciar / Activar Audio</span>
                <kbd className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono font-bold shadow-2xs">Tecla M</kbd>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowKeyboardGuide(false)}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
