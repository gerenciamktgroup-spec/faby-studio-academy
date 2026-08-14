'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
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
  X
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

export default function CoursePlayerPage() {
  const demoStudentId = '22222222-2222-2222-2222-222222222222';
  const courseId = 'c1000000-0000-0000-0000-000000000001';
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['l1']);
  const [activeTab, setActiveTab] = useState<'recursos' | 'notas' | 'preguntas' | 'proyecto'>('recursos');
  const [showKeyboardGuide, setShowKeyboardGuide] = useState(false);
  const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState<number | null>(null);
  
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

  const lessons = [
    {
      id: 'l1',
      title: 'Lección 1.1: Bienvenida & Estándares Profesionales FABY STUDIO',
      type: 'video',
      duration: '15 min',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      body: 'Presentación del programa y filosofía de trabajo profesional en FABY STUDIO ACADEMY. Protocolos de cabina y presentación ante clientas.',
    },
    {
      id: 'l2',
      title: 'Lección 1.2: Anatomía de la Pestaña Natural & Fases de Crecimiento',
      type: 'video',
      duration: '25 min',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      body: 'Fases anágena, catágena y telógena. Bioseguridad ocular, protección de la salud del folículo piloso y tabla de compatibilidad de grosores.',
    },
    {
      id: 'l3',
      title: 'Evaluación Teórica: Bioseguridad e Higiene Ocular',
      type: 'quiz',
      duration: '15 min',
      passingScore: 70,
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
          options: ['0.5 mm a 1 mm de la raíz sin tocar piel', 'Directamente pegada a la piel del párpado', 'A 3 mm de la raíz'],
          correct: 0,
        },
      ],
    },
    {
      id: 'l4',
      title: 'Práctica 01: Aplicación Técnica Clásica Pelo a Pelo',
      type: 'assignment',
      duration: '30 min',
      body: 'Entrega obligatoria de fotografías de trabajo en modelo real para revisión docente por rúbrica de 100 puntos.',
    },
  ];

  const currentLesson = lessons[activeLessonIdx];
  const currentResources = DEMO_DOWNLOADABLE_RESOURCES[currentLesson.id] || [];
  const currentNotes = notes[currentLesson.id] || [];
  const currentComments = comments[currentLesson.id] || [];

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

      try {
        await fetch('/api/audit/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: demoStudentId,
            sessionId: sessionStorage.getItem('fabi_session_id') || 'sess_demo',
            isTabVisible: true,
            isVideoPlaying: false,
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
      {/* Top Player Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <Link href="/campus" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center text-xs font-semibold">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver al Campus
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-sm font-bold font-display text-slate-900 truncate max-w-xs sm:max-w-md">
            Curso Profesional de Extensiones de Pestañas
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
        {/* Left Curriculum Sidebar (Clean White Theme) */}
        <aside className="lg:col-span-4 bg-white border-r border-slate-200 p-6 overflow-y-auto space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded">Módulo 1</span>
              <span className="text-xs text-slate-500 font-semibold">{completedLessons.length} / {lessons.length} completadas</span>
            </div>
            <h2 className="text-base font-bold font-display text-slate-900 mt-2">
              Fundamentos Profesionales & Bioseguridad
            </h2>
          </div>

          <div className="space-y-2">
            {lessons.map((lesson, idx) => {
              const isCurrent = idx === activeLessonIdx;
              const isCompleted = completedLessons.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonIdx(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start justify-between ${
                    isCurrent
                      ? 'bg-rose-50 border-rose-300 text-rose-950 font-semibold shadow-xs ring-1 ring-rose-200'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {lesson.type === 'video' && <Play className="w-3.5 h-3.5 text-rose-600" />}
                      {lesson.type === 'quiz' && <HelpCircle className="w-3.5 h-3.5 text-amber-600" />}
                      {lesson.type === 'assignment' && <FileCheck className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <div>
                      <p className="line-clamp-1">{lesson.title}</p>
                      <span className="text-[10px] text-slate-400">{lesson.duration}</span>
                    </div>
                  </div>

                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Next Modules Preview */}
          <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Siguientes Módulos del Programa:</p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">Módulo 2: Diseño y Mapping de la Mirada</p>
              <p className="text-[10px] text-slate-400">6 lecciones • 1 práctica técnica</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">Módulo 3: Técnica Clásica Pelo a Pelo</p>
              <p className="text-[10px] text-slate-400">7 lecciones • Evaluada 86/100</p>
            </div>
          </div>
        </aside>

        {/* Right Active Content & Tabbed Workspace */}
        <main className="lg:col-span-8 p-6 lg:p-8 overflow-y-auto space-y-6 bg-slate-50">
          {/* Header Title and Mark Complete Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h1 className="text-lg font-bold font-display text-slate-900">{currentLesson.title}</h1>

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
              {/* Video Player Box with Anti-Piracy Watermark & Controls */}
              <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-slate-300 relative group shadow-md">
                <video
                  ref={videoRef}
                  src={currentLesson.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />

                {/* Subtle Dynamic Watermark Anti-Piracy */}
                <div className="absolute top-4 right-4 pointer-events-none opacity-30 text-[10px] font-mono text-white bg-black/60 px-2 py-1 rounded backdrop-blur-xs border border-white/10">
                  lucia.martinez@gmail.com • FABY STUDIO ACADEMY
                </div>
              </div>

              {/* Streaming Settings Bar (Speed & Resolution) */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-xs">
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

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleTogglePip}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                    title="Modo Picture-in-Picture (Ventana Flotante)"
                  >
                    <PictureInPicture className="w-3.5 h-3.5 text-rose-600" />
                    <span className="hidden sm:inline">PiP</span>
                  </button>

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

              {/* Interactive Workspace Tabs (Clean White) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
                <div className="flex border-b border-slate-200 space-x-4 text-xs font-bold overflow-x-auto">
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
                    <span>Mis Notas con Timestamps ({currentNotes.length})</span>
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

                {/* Tab 1: Downloadable PDF Resources */}
                {activeTab === 'recursos' && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-700">Material de Apoyo para esta Lección:</h3>
                    {currentResources.length > 0 ? (
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
                              className="bg-white border border-slate-200 hover:border-rose-500 text-slate-800 hover:text-rose-600 px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-colors flex items-center space-x-1 shadow-2xs"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Descargar</span>
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">Esta lección no incluye archivos adjuntos adicionales.</p>
                    )}
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
                        placeholder="Escribe una nota en el segundo actual del video..."
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
                        placeholder="Haz una pregunta técnica a la tutora Laura Gómez..."
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
                      Al finalizar las lecciones teóricas, deberás subir fotografías de tu trabajo en modelo real para que la tutora evalúe el aislamiento, la simetría y la retención del adhesivo.
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
                <h3 className="text-base font-bold text-slate-900">Evaluación Teórica del Módulo 1</h3>
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
                <h3 className="text-lg font-bold text-slate-900 font-display">Práctica 01: Aplicación Clásica Pelo a Pelo</h3>
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
