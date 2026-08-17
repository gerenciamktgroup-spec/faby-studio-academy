import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen, Lock, Sparkles } from 'lucide-react';
import { STUDENT_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { createClient } from '@/lib/supabase/server';
import { CoursePlayer, type PlayerModule } from './CoursePlayer';

export const dynamic = 'force-dynamic';

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const principal = await requirePagePrincipal(STUDENT_ROLES);
  const supabase = await createClient();

  // 1. Fetch course details
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('id, slug, title, description, estimated_hours')
    .eq('id', courseId)
    .maybeSingle();

  if (courseError) throw courseError;
  if (!course) notFound();

  // 2. Check student enrollment
  const { data: enrollment, error: enrollmentError } = await supabase
    .from('enrollments')
    .select('id, status')
    .eq('student_id', principal.id)
    .eq('course_id', courseId)
    .in('status', ['active', 'completed'])
    .maybeSingle();

  if (enrollmentError) throw enrollmentError;

  // If student is not enrolled, show informative enrollment gate
  if (!enrollment) {
    return (
      <div className="mx-auto max-w-3xl py-8 space-y-6">
        <Link
          href="/campus"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al Campus</span>
        </Link>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 border border-rose-200 text-rose-600">
            <Lock className="h-8 w-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[11px] font-bold text-rose-700">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Matrícula Requerida</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display sm:text-3xl">
              {course.title}
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              Actualmente no tienes una matrícula activa en este programa formativo ({course.estimated_hours}h lectivas). Puedes consultar el temario oficial o solicitar acceso desde secretaría académica.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/cursos/${course.slug || 'extensiones-de-pestanas'}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fabi-pink to-fabi-darkpink px-6 py-3 text-xs font-bold text-white shadow-md shadow-rose-600/20 hover:scale-[1.01] transition-all"
            >
              <BookOpen className="h-4 w-4" />
              <span>Ver Programa y Temario</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/campus"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-6 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <span>Ir a Mis Cursos Matriculados</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Fetch modules, progress and lessons for enrolled student
  const [{ data: modules, error: modulesError }, { data: progress, error: progressError }] =
    await Promise.all([
      supabase
        .from('modules')
        .select('id, title, description, order_index')
        .eq('course_id', courseId)
        .order('order_index'),
      supabase
        .from('lesson_progress')
        .select('lesson_id, status')
        .eq('student_id', principal.id),
    ]);

  if (modulesError) throw modulesError;
  if (progressError) throw progressError;

  const moduleIds = (modules ?? []).map((module) => module.id);
  const { data: lessons, error: lessonsError } = moduleIds.length
    ? await supabase
        .from('lessons')
        .select('id, title, content_type, content_url, body_text, duration_seconds, order_index, module_id')
        .in('module_id', moduleIds)
        .order('order_index')
    : { data: [], error: null };
  if (lessonsError) throw lessonsError;

  const playerModules: PlayerModule[] = (modules ?? []).map((module) => ({
    id: module.id,
    title: module.title,
    description: module.description,
    orderIndex: module.order_index,
    lessons: (lessons ?? [])
      .filter((lesson) => lesson.module_id === module.id)
      .map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        contentType: lesson.content_type,
        contentUrl: lesson.content_url,
        bodyText: lesson.body_text,
        durationSeconds: lesson.duration_seconds,
        orderIndex: lesson.order_index,
      })),
  }));

  return (
    <CoursePlayer
      course={{
        id: course.id,
        title: course.title,
        description: course.description,
        estimatedHours: course.estimated_hours,
      }}
      modules={playerModules}
      initiallyCompleted={(progress ?? [])
        .filter((item) => item.status === 'completed')
        .map((item) => item.lesson_id)}
    />
  );
}
