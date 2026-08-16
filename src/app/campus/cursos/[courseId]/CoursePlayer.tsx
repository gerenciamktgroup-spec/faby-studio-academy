'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Circle,
  FileText,
  PlayCircle,
  ShieldCheck,
} from 'lucide-react';
import { ActiveLearningTracker } from '@/components/shared/ActiveLearningTracker';

export interface PlayerLesson {
  id: string;
  title: string;
  contentType: 'video' | 'pdf' | 'quiz' | 'text';
  contentUrl: string | null;
  bodyText: string | null;
  durationSeconds: number;
  orderIndex: number;
}

export interface PlayerModule {
  id: string;
  title: string;
  description: string | null;
  orderIndex: number;
  lessons: PlayerLesson[];
}

export function CoursePlayer({
  course,
  modules,
  initiallyCompleted,
}: {
  course: { id: string; title: string; description: string; estimatedHours: number };
  modules: PlayerModule[];
  initiallyCompleted: string[];
}) {
  const lessons = useMemo(() => modules.flatMap((module) => module.lessons), [modules]);
  const [completed, setCompleted] = useState(() => new Set(initiallyCompleted));
  const [activeLessonId, setActiveLessonId] = useState(
    lessons.find((lesson) => !initiallyCompleted.includes(lesson.id))?.id ?? lessons[0]?.id ?? ''
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId) ?? lessons[0];
  const progress = lessons.length ? Math.round((completed.size / lessons.length) * 100) : 0;

  const markCompleted = async (allowQuiz = false) => {
    if (!activeLesson || completed.has(activeLesson.id)) return;
    if (activeLesson.contentType === 'quiz' && !allowQuiz) return;
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: activeLesson.id, status: 'completed' }),
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.error ?? 'No se pudo guardar el avance.');
        return;
      }

      const nextCompleted = new Set(completed);
      nextCompleted.add(activeLesson.id);
      setCompleted(nextCompleted);
      const currentIndex = lessons.findIndex((lesson) => lesson.id === activeLesson.id);
      const nextLesson = lessons[currentIndex + 1];
      if (nextLesson) setActiveLessonId(nextLesson.id);
      setMessage('Lección completada y registrada.');
    } catch {
      setMessage('No fue posible conectar con el registro académico.');
    } finally {
      setSaving(false);
    }
  };

  if (!activeLesson) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <BookOpen className="mx-auto mb-3 h-10 w-10 text-slate-400" />
        <h1 className="text-xl font-bold text-slate-900">Curso sin lecciones publicadas</h1>
        <p className="mt-1 text-sm text-slate-500">El equipo docente todavía está preparando el contenido.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <Link href="/campus" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500">
          <ArrowLeft className="h-4 w-4" /> Volver al panel
        </Link>
        <div className="mt-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-rose-600">Programa matriculado</p>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-900">{course.title}</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">{course.description}</p>
          </div>
          <div className="min-w-56">
            <div className="flex justify-between text-xs font-bold text-slate-600"><span>Avance</span><span>{progress}%</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-rose-600" style={{ width: `${progress}%` }} /></div>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-4 xl:col-span-3">
          <h2 className="px-2 text-sm font-bold text-slate-900">Contenido del curso</h2>
          <div className="mt-4 space-y-5">
            {modules.map((module) => (
              <section key={module.id}>
                <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">{module.title}</p>
                <div className="mt-2 space-y-1">
                  {module.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLesson.id;
                    const isCompleted = completed.has(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => { setActiveLessonId(lesson.id); setMessage(''); }}
                        className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs transition-colors ${isActive ? 'bg-rose-50 font-bold text-rose-800' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        {isCompleted ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> : <Circle className="h-4 w-4 shrink-0 text-slate-300" />}
                        <span className="flex-1">{lesson.title}</span>
                        {isActive && <ChevronRight className="h-3.5 w-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </aside>

        <main className="space-y-5 lg:col-span-8 xl:col-span-9">
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {activeLesson.contentType === 'video' && activeLesson.contentUrl ? (
              <video key={activeLesson.id} controls className="aspect-video w-full bg-black" src={activeLesson.contentUrl} />
            ) : (
              <div className="flex aspect-video items-center justify-center bg-slate-900 text-white">
                {activeLesson.contentType === 'pdf' ? <FileText className="h-14 w-14" /> : <PlayCircle className="h-14 w-14" />}
              </div>
            )}

            <div className="p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-rose-600">{activeLesson.contentType}</p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">{activeLesson.title}</h2>
                  <p className="mt-2 text-xs text-slate-500">Duración estimada: {Math.ceil(activeLesson.durationSeconds / 60)} min</p>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800">
                  <ShieldCheck className="h-4 w-4" /> Seguimiento activo
                </div>
              </div>

              {activeLesson.bodyText && <p className="mt-6 whitespace-pre-line text-sm leading-7 text-slate-700">{activeLesson.bodyText}</p>}
              {activeLesson.contentType === 'pdf' && activeLesson.contentUrl && (
                <a href={activeLesson.contentUrl} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700">
                  Abrir material PDF
                </a>
              )}
              {activeLesson.contentType === 'quiz' && (
                <QuizPanel lessonId={activeLesson.id} onPassed={() => markCompleted(true)} />
              )}

              <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => void markCompleted()}
                  disabled={saving || completed.has(activeLesson.id) || activeLesson.contentType === 'quiz'}
                  className="rounded-xl bg-rose-600 px-5 py-3 text-xs font-bold text-white disabled:bg-slate-300"
                >
                  {completed.has(activeLesson.id) ? 'Lección completada' : saving ? 'Guardando…' : 'Marcar como completada'}
                </button>
                {message && <p className="text-xs font-semibold text-slate-600">{message}</p>}
              </div>
            </div>
          </section>

          <ActiveLearningTracker courseId={course.id} lessonId={activeLesson.id} />
        </main>
      </div>
    </div>
  );
}

interface QuizQuestion {
  id: string;
  question_text: string;
  options_json: unknown;
  points: number;
}

interface QuizData {
  id: string;
  title: string;
  passing_score: number;
  questions: QuizQuestion[];
}

function QuizPanel({ lessonId, onPassed }: { lessonId: string; onPassed: () => Promise<void> }) {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let cancelled = false;
    const loadQuiz = async () => {
      setLoading(true);
      setMessage('');
      setAnswers({});
      try {
        const response = await fetch(`/api/assessments?lessonId=${encodeURIComponent(lessonId)}`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? 'No se pudo cargar la evaluación.');
        if (!cancelled) setQuiz(result.assessment);
      } catch (error) {
        if (!cancelled) setMessage(error instanceof Error ? error.message : 'No se pudo cargar la evaluación.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void loadQuiz();
    return () => { cancelled = true; };
  }, [lessonId]);

  const submitQuiz = async () => {
    if (!quiz) return;
    if (Object.keys(answers).length !== quiz.questions.length) {
      setMessage('Responde todas las preguntas antes de enviar.');
      return;
    }
    setSubmitting(true);
    setMessage('');
    try {
      const response = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessmentId: quiz.id, answers }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'No se pudo calificar la evaluación.');
      const result = data.result as { score: number; passed: boolean };
      setMessage(
        result.passed
          ? `Aprobada con ${result.score}/100. Registrando la lección…`
          : `Resultado: ${result.score}/100. Necesitas ${quiz.passing_score}/100 para aprobar.`
      );
      if (result.passed) await onPassed();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo enviar la evaluación.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="mt-6 text-sm text-slate-500">Cargando evaluación…</p>;
  if (!quiz) return <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{message}</p>;

  return (
    <section className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div>
        <h3 className="font-bold text-slate-900">{quiz.title}</h3>
        <p className="text-xs text-slate-500">Nota mínima: {quiz.passing_score}/100</p>
      </div>
      {quiz.questions.map((question, index) => {
        const options = Array.isArray(question.options_json)
          ? question.options_json.map((option) => String(option))
          : [];
        return (
          <fieldset key={question.id} className="space-y-2">
            <legend className="text-sm font-bold text-slate-800">{index + 1}. {question.question_text}</legend>
            {options.map((option) => (
              <label key={option} className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
                <input
                  type="radio"
                  name={question.id}
                  checked={answers[question.id] === option}
                  onChange={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                />
                {option}
              </label>
            ))}
          </fieldset>
        );
      })}
      <button type="button" onClick={submitQuiz} disabled={submitting} className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50">
        {submitting ? 'Calificando…' : 'Enviar evaluación'}
      </button>
      {message && <p className="text-sm font-semibold text-slate-700">{message}</p>}
    </section>
  );
}
