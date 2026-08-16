'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { TEACHING_ROLES } from '@/lib/auth/roles';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { createClient } from '@/lib/supabase/server';

export interface CourseActionState {
  status: 'idle' | 'success' | 'error';
  message: string;
}

export const initialCourseActionState: CourseActionState = { status: 'idle', message: '' };

const moduleSchema = z.object({
  courseId: z.string().uuid(),
  title: z.string().trim().min(4).max(180),
  description: z.string().trim().max(1000).optional(),
  orderIndex: z.coerce.number().int().min(0).max(1000),
});

const lessonSchema = z.object({
  courseId: z.string().uuid(),
  moduleId: z.string().uuid(),
  title: z.string().trim().min(4).max(180),
  contentType: z.enum(['video', 'pdf', 'quiz', 'text']),
  contentUrl: z.union([
    z.string().trim().url().max(2000).refine((value) => ['http:', 'https:'].includes(new URL(value).protocol)),
    z.literal(''),
  ]).optional(),
  bodyText: z.string().trim().max(20000).optional(),
  durationMinutes: z.coerce.number().int().min(0).max(1000),
  orderIndex: z.coerce.number().int().min(0).max(1000),
});

const publicationSchema = z.object({
  courseId: z.string().uuid(),
  publish: z.enum(['true', 'false']),
});

const assessmentSchema = z.object({
  courseId: z.string().uuid(),
  lessonId: z.string().uuid(),
  title: z.string().trim().min(4).max(180),
  passingScore: z.coerce.number().int().min(1).max(100),
  timeLimitMinutes: z.coerce.number().int().min(1).max(240),
});

const questionSchema = z.object({
  courseId: z.string().uuid(),
  assessmentId: z.string().uuid(),
  questionText: z.string().trim().min(5).max(1000),
  options: z.string().transform((value) => value.split('\n').map((item) => item.trim()).filter(Boolean)).refine((items) => items.length >= 2 && items.length <= 8),
  correctAnswer: z.string().trim().min(1).max(500),
  points: z.coerce.number().int().min(1).max(100),
});

const assignmentSchema = z.object({
  courseId: z.string().uuid(),
  lessonId: z.string().uuid(),
  title: z.string().trim().min(4).max(180),
  description: z.string().trim().min(10).max(5000),
  dueDate: z.union([z.string().datetime({ offset: true }), z.literal('')]).optional(),
});

const forumSchema = z.object({
  courseId: z.string().uuid(),
  title: z.string().trim().min(4).max(180),
  description: z.string().trim().max(1000).optional(),
});

function failure(message: string): CourseActionState {
  return { status: 'error', message };
}

export async function createModuleAction(
  _state: CourseActionState,
  formData: FormData
): Promise<CourseActionState> {
  try {
    await requireAuthPrincipal(TEACHING_ROLES);
    const payload = moduleSchema.safeParse(Object.fromEntries(formData));
    if (!payload.success) return failure('Revisa los datos del módulo.');

    const supabase = await createClient();
    const { error } = await supabase.from('modules').insert({
      course_id: payload.data.courseId,
      title: payload.data.title,
      description: payload.data.description || null,
      order_index: payload.data.orderIndex,
    });
    if (error) throw error;

    revalidatePath(`/profesor/cursos/${payload.data.courseId}`);
    return { status: 'success', message: 'Módulo creado.' };
  } catch (error) {
    console.error('[Teacher] create module:', error);
    return failure('No fue posible crear el módulo o no tienes acceso al curso.');
  }
}

export async function createLessonAction(
  _state: CourseActionState,
  formData: FormData
): Promise<CourseActionState> {
  try {
    await requireAuthPrincipal(TEACHING_ROLES);
    const payload = lessonSchema.safeParse(Object.fromEntries(formData));
    if (!payload.success) return failure('Revisa los datos de la lección.');

    const supabase = await createClient();
    const { error } = await supabase.from('lessons').insert({
      module_id: payload.data.moduleId,
      title: payload.data.title,
      content_type: payload.data.contentType,
      content_url: payload.data.contentUrl || null,
      body_text: payload.data.bodyText || null,
      duration_seconds: payload.data.durationMinutes * 60,
      order_index: payload.data.orderIndex,
    });
    if (error) throw error;

    revalidatePath(`/profesor/cursos/${payload.data.courseId}`);
    return { status: 'success', message: 'Lección creada.' };
  } catch (error) {
    console.error('[Teacher] create lesson:', error);
    return failure('No fue posible crear la lección o el módulo no pertenece a tu curso.');
  }
}

export async function setCoursePublicationAction(
  _state: CourseActionState,
  formData: FormData
): Promise<CourseActionState> {
  try {
    await requireAuthPrincipal(TEACHING_ROLES);
    const payload = publicationSchema.safeParse(Object.fromEntries(formData));
    if (!payload.success) return failure('Solicitud de publicación no válida.');

    const supabase = await createClient();
    const { error } = await supabase
      .from('courses')
      .update({ is_published: payload.data.publish === 'true', updated_at: new Date().toISOString() })
      .eq('id', payload.data.courseId);
    if (error) throw error;

    revalidatePath(`/profesor/cursos/${payload.data.courseId}`);
    revalidatePath('/profesor/cursos');
    return {
      status: 'success',
      message: payload.data.publish === 'true' ? 'Curso publicado.' : 'Curso pasado a borrador.',
    };
  } catch (error) {
    console.error('[Teacher] publish course:', error);
    return failure('No fue posible cambiar la publicación del curso.');
  }
}

export async function createAssessmentAction(_state: CourseActionState, formData: FormData): Promise<CourseActionState> {
  try {
    await requireAuthPrincipal(TEACHING_ROLES);
    const payload = assessmentSchema.safeParse(Object.fromEntries(formData));
    if (!payload.success) return failure('Revisa la evaluación y su nota mínima.');
    const supabase = await createClient();
    const { error } = await supabase.from('assessments').insert({ lesson_id: payload.data.lessonId, title: payload.data.title, passing_score: payload.data.passingScore, time_limit_minutes: payload.data.timeLimitMinutes });
    if (error) { if (error.code === '23505') return failure('La lección ya tiene una evaluación.'); throw error; }
    revalidatePath(`/profesor/cursos/${payload.data.courseId}`);
    return { status: 'success', message: 'Evaluación creada.' };
  } catch (error) { console.error('[Teacher] create assessment:', error); return failure('No fue posible crear la evaluación.'); }
}

export async function createQuestionAction(_state: CourseActionState, formData: FormData): Promise<CourseActionState> {
  try {
    await requireAuthPrincipal(TEACHING_ROLES);
    const payload = questionSchema.safeParse(Object.fromEntries(formData));
    if (!payload.success || !payload.data.options.includes(payload.data.correctAnswer)) return failure('Incluye entre 2 y 8 opciones y copia exactamente la respuesta correcta.');
    const supabase = await createClient();
    const { error } = await supabase.from('questions').insert({ assessment_id: payload.data.assessmentId, question_text: payload.data.questionText, question_type: 'multiple_choice', options_json: payload.data.options, correct_answer_json: payload.data.correctAnswer, points: payload.data.points });
    if (error) throw error;
    revalidatePath(`/profesor/cursos/${payload.data.courseId}`);
    return { status: 'success', message: 'Pregunta añadida.' };
  } catch (error) { console.error('[Teacher] create question:', error); return failure('No fue posible añadir la pregunta.'); }
}

export async function createAssignmentAction(_state: CourseActionState, formData: FormData): Promise<CourseActionState> {
  try {
    await requireAuthPrincipal(TEACHING_ROLES);
    const raw = Object.fromEntries(formData);
    const payload = assignmentSchema.safeParse({ ...raw, dueDate: raw.dueDate ? new Date(String(raw.dueDate)).toISOString() : '' });
    if (!payload.success) return failure('Revisa la práctica y la fecha límite.');
    const supabase = await createClient();
    const { error } = await supabase.from('assignments').insert({ lesson_id: payload.data.lessonId, title: payload.data.title, description: payload.data.description, due_date: payload.data.dueDate || null });
    if (error) throw error;
    revalidatePath(`/profesor/cursos/${payload.data.courseId}`);
    return { status: 'success', message: 'Práctica publicada.' };
  } catch (error) { console.error('[Teacher] create assignment:', error); return failure('No fue posible crear la práctica.'); }
}

export async function createForumAction(_state: CourseActionState, formData: FormData): Promise<CourseActionState> {
  try {
    await requireAuthPrincipal(TEACHING_ROLES);
    const payload = forumSchema.safeParse(Object.fromEntries(formData));
    if (!payload.success) return failure('Revisa el título del foro.');
    const supabase = await createClient();
    const { error } = await supabase.from('forums').insert({ course_id: payload.data.courseId, title: payload.data.title, description: payload.data.description || null });
    if (error) throw error;
    revalidatePath(`/profesor/cursos/${payload.data.courseId}`);
    return { status: 'success', message: 'Foro creado.' };
  } catch (error) { console.error('[Teacher] create forum:', error); return failure('No fue posible crear el foro.'); }
}
