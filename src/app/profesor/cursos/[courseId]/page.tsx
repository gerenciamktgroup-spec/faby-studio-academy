import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, FileText, Video } from 'lucide-react';
import { ADMIN_ROLES, hasAnyRole, TEACHING_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { createClient } from '@/lib/supabase/server';
import { CourseAuthoringForms } from './CourseAuthoringForms';

export const dynamic = 'force-dynamic';

export default async function CourseAuthoringPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const principal = await requirePagePrincipal(TEACHING_ROLES);
  const supabase = await createClient();

  if (!hasAnyRole(principal.roles, ADMIN_ROLES)) {
    const { data: assignment, error } = await supabase
      .from('course_staff')
      .select('id')
      .eq('course_id', courseId)
      .eq('user_id', principal.id)
      .eq('is_active', true)
      .maybeSingle();
    if (error) throw error;
    if (!assignment) notFound();
  }

  const [{ data: course, error: courseError }, { data: modules, error: modulesError }] = await Promise.all([
    supabase.from('courses').select('id, title, description, is_published').eq('id', courseId).single(),
    supabase.from('modules').select('id, title, description, order_index').eq('course_id', courseId).order('order_index'),
  ]);
  if (courseError) throw courseError;
  if (modulesError) throw modulesError;

  const moduleIds = (modules ?? []).map((module) => module.id);
  const { data: lessons, error: lessonsError } = moduleIds.length
    ? await supabase.from('lessons').select('id, module_id, title, content_type, duration_seconds, order_index').in('module_id', moduleIds).order('order_index')
    : { data: [], error: null };
  if (lessonsError) throw lessonsError;
  const lessonIds = (lessons ?? []).map((lesson) => lesson.id);
  const [{ data: assessments, error: assessmentsError }, { data: assignments, error: assignmentsError }, { data: forums, error: forumsError }] = await Promise.all([
    lessonIds.length ? supabase.from('assessments').select('id, lesson_id, title').in('lesson_id', lessonIds).order('created_at') : Promise.resolve({ data: [], error: null }),
    lessonIds.length ? supabase.from('assignments').select('id, lesson_id, title').in('lesson_id', lessonIds).order('created_at') : Promise.resolve({ data: [], error: null }),
    supabase.from('forums').select('id, title').eq('course_id', courseId).order('created_at'),
  ]);
  if (assessmentsError) throw assessmentsError;
  if (assignmentsError) throw assignmentsError;
  if (forumsError) throw forumsError;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <Link href="/profesor/cursos" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500"><ArrowLeft className="h-4 w-4" /> Cursos</Link>
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div><p className="text-xs font-bold uppercase tracking-wider text-rose-600">Editor del curso</p><h1 className="mt-1 text-2xl font-extrabold text-slate-900">{course.title}</h1><p className="mt-2 max-w-3xl text-sm text-slate-600">{course.description}</p></div>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${course.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{course.is_published ? 'Publicado' : 'Borrador'}</span>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Estructura actual</h2>
          <div className="mt-5 space-y-5">
            {(modules ?? []).map((module) => (
              <div key={module.id} className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-bold text-rose-600">Módulo {module.order_index}</p>
                <h3 className="font-bold text-slate-900">{module.title}</h3>
                <div className="mt-3 space-y-2">
                  {(lessons ?? []).filter((lesson) => lesson.module_id === module.id).map((lesson) => (
                    <div key={lesson.id} className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-700">
                      {lesson.content_type === 'video' ? <Video className="h-4 w-4 text-rose-600" /> : <FileText className="h-4 w-4 text-slate-500" />}
                      <span className="font-semibold">{lesson.title}</span>
                      <span className="ml-auto text-slate-400">{Math.ceil(lesson.duration_seconds / 60)} min</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {(modules ?? []).length === 0 && <p className="text-sm text-slate-500">El curso todavía no tiene módulos.</p>}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <Summary label="Evaluaciones" value={(assessments ?? []).length} />
          <Summary label="Prácticas" value={(assignments ?? []).length} />
          <Summary label="Foros" value={(forums ?? []).length} />
        </section>

        <CourseAuthoringForms
          courseId={course.id}
          isPublished={course.is_published}
          modules={(modules ?? []).map((module) => ({ id: module.id, title: module.title }))}
          lessons={(lessons ?? []).map((lesson) => ({ id: lesson.id, title: lesson.title }))}
          assessments={(assessments ?? []).map((assessment) => ({ id: assessment.id, title: assessment.title }))}
        />
      </div>
    </main>
  );
}

function Summary({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs text-slate-500">{label}</p><p className="text-2xl font-extrabold text-slate-900">{value}</p></div>;
}
