import { notFound } from 'next/navigation';
import { STUDENT_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { createClient } from '@/lib/supabase/server';
import { CoursePlayer, type PlayerModule } from './CoursePlayer';

export const dynamic = 'force-dynamic';

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const principal = await requirePagePrincipal(STUDENT_ROLES);
  const supabase = await createClient();
  const { data: enrollment, error: enrollmentError } = await supabase
    .from('enrollments')
    .select('id, status')
    .eq('student_id', principal.id)
    .eq('course_id', courseId)
    .in('status', ['active', 'completed'])
    .maybeSingle();

  if (enrollmentError) throw enrollmentError;
  if (!enrollment) notFound();

  const [{ data: course, error: courseError }, { data: modules, error: modulesError }, { data: progress, error: progressError }] =
    await Promise.all([
      supabase
        .from('courses')
        .select('id, title, description, estimated_hours')
        .eq('id', courseId)
        .single(),
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

  if (courseError) throw courseError;
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
