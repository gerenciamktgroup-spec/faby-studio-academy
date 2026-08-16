'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  createAssessmentAction,
  createAssignmentAction,
  createForumAction,
  createLessonAction,
  createModuleAction,
  createQuestionAction,
  initialCourseActionState,
  setCoursePublicationAction,
} from '../actions';

export function CourseAuthoringForms({
  courseId,
  isPublished,
  modules,
  lessons,
  assessments,
}: {
  courseId: string;
  isPublished: boolean;
  modules: Array<{ id: string; title: string }>;
  lessons: Array<{ id: string; title: string }>;
  assessments: Array<{ id: string; title: string }>;
}) {
  const [moduleState, moduleAction] = useFormState(createModuleAction, initialCourseActionState);
  const [lessonState, lessonAction] = useFormState(createLessonAction, initialCourseActionState);
  const [publicationState, publicationAction] = useFormState(
    setCoursePublicationAction,
    initialCourseActionState
  );
  const [assessmentState, assessmentAction] = useFormState(createAssessmentAction, initialCourseActionState);
  const [questionState, questionAction] = useFormState(createQuestionAction, initialCourseActionState);
  const [assignmentState, assignmentAction] = useFormState(createAssignmentAction, initialCourseActionState);
  const [forumState, forumAction] = useFormState(createForumAction, initialCourseActionState);

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <form action={moduleAction} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Nuevo módulo</h2>
        <input type="hidden" name="courseId" value={courseId} />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field name="title" label="Título" placeholder="Módulo 2: Técnica…" />
          <Field name="orderIndex" label="Orden" placeholder="2" type="number" />
          <label className="text-xs font-semibold text-slate-700 sm:col-span-2">
            Descripción
            <textarea name="description" rows={3} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-rose-500" />
          </label>
        </div>
        <ActionMessage state={moduleState} />
        <Submit label="Crear módulo" />
      </form>

      <form action={lessonAction} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Nueva lección</h2>
        <input type="hidden" name="courseId" value={courseId} />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-semibold text-slate-700 sm:col-span-2">
            Módulo
            <select name="moduleId" required defaultValue="" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <option value="" disabled>Selecciona…</option>
              {modules.map((module) => <option key={module.id} value={module.id}>{module.title}</option>)}
            </select>
          </label>
          <Field name="title" label="Título" placeholder="Lección 2.1…" />
          <label className="text-xs font-semibold text-slate-700">
            Tipo
            <select name="contentType" required className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <option value="text">Texto</option><option value="video">Vídeo</option><option value="pdf">PDF</option><option value="quiz">Evaluación</option>
            </select>
          </label>
          <Field name="contentUrl" label="URL de recurso" placeholder="https://…" />
          <Field name="durationMinutes" label="Duración (min)" placeholder="15" type="number" />
          <Field name="orderIndex" label="Orden" placeholder="1" type="number" />
          <label className="text-xs font-semibold text-slate-700 sm:col-span-2">
            Contenido / instrucciones
            <textarea name="bodyText" rows={4} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-rose-500" />
          </label>
        </div>
        <ActionMessage state={lessonState} />
        <Submit label="Crear lección" disabled={modules.length === 0} />
      </form>

      <form action={publicationAction} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
        <input type="hidden" name="courseId" value={courseId} />
        <input type="hidden" name="publish" value={isPublished ? 'false' : 'true'} />
        <h2 className="text-lg font-bold text-slate-900">Estado de publicación</h2>
        <p className="mt-1 text-sm text-slate-600">Actualmente: <strong>{isPublished ? 'Publicado' : 'Borrador'}</strong></p>
        <ActionMessage state={publicationState} />
        <Submit label={isPublished ? 'Pasar a borrador' : 'Publicar curso'} />
      </form>

      <form action={assessmentAction} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Nueva evaluación</h2>
        <input type="hidden" name="courseId" value={courseId} />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <OptionSelect name="lessonId" label="Lección tipo evaluación" options={lessons} />
          <Field name="title" label="Título" placeholder="Evaluación del módulo" />
          <Field name="passingScore" label="Nota mínima (%)" placeholder="70" type="number" />
          <Field name="timeLimitMinutes" label="Tiempo límite (min)" placeholder="30" type="number" />
        </div>
        <ActionMessage state={assessmentState} /><Submit label="Crear evaluación" disabled={lessons.length === 0} />
      </form>

      <form action={questionAction} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Añadir pregunta</h2>
        <input type="hidden" name="courseId" value={courseId} />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <OptionSelect name="assessmentId" label="Evaluación" options={assessments} />
          <Field name="points" label="Puntos" placeholder="10" type="number" />
          <label className="text-xs font-semibold text-slate-700 sm:col-span-2">Pregunta<textarea name="questionText" required minLength={5} rows={2} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="text-xs font-semibold text-slate-700 sm:col-span-2">Opciones (una por línea)<textarea name="options" required rows={4} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="text-xs font-semibold text-slate-700 sm:col-span-2">Respuesta correcta exacta<input name="correctAnswer" required className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
        </div>
        <ActionMessage state={questionState} /><Submit label="Añadir pregunta" disabled={assessments.length === 0} />
      </form>

      <form action={assignmentAction} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Nueva práctica</h2>
        <input type="hidden" name="courseId" value={courseId} />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <OptionSelect name="lessonId" label="Lección asociada" options={lessons} />
          <Field name="title" label="Título" placeholder="Práctica técnica" />
          <label className="text-xs font-semibold text-slate-700 sm:col-span-2">Instrucciones<textarea name="description" required minLength={10} rows={4} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="text-xs font-semibold text-slate-700">Fecha límite (opcional)<input type="datetime-local" name="dueDate" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
        </div>
        <ActionMessage state={assignmentState} /><Submit label="Crear práctica" disabled={lessons.length === 0} />
      </form>

      <form action={forumAction} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Nuevo foro del curso</h2>
        <input type="hidden" name="courseId" value={courseId} />
        <div className="mt-4 grid gap-3">
          <Field name="title" label="Título" placeholder="Comunidad del módulo" />
          <label className="text-xs font-semibold text-slate-700">Descripción<textarea name="description" rows={3} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
        </div>
        <ActionMessage state={forumState} /><Submit label="Crear foro" />
      </form>
    </div>
  );
}

function OptionSelect({ name, label, options }: { name: string; label: string; options: Array<{ id: string; title: string }> }) {
  return <label className="text-xs font-semibold text-slate-700"><span>{label}</span><select name={name} required defaultValue="" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"><option value="" disabled>Selecciona…</option>{options.map((option) => <option key={option.id} value={option.id}>{option.title}</option>)}</select></label>;
}

function Field({ name, label, placeholder, type = 'text' }: { name: string; label: string; placeholder: string; type?: string }) {
  return (
    <label className="text-xs font-semibold text-slate-700">
      {label}
      <input name={name} type={type} required={name !== 'contentUrl'} min={type === 'number' ? 0 : undefined} placeholder={placeholder} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-rose-500" />
    </label>
  );
}

function ActionMessage({ state }: { state: { status: string; message: string } }) {
  if (state.status === 'idle') return null;
  return <p className={`mt-4 rounded-xl p-3 text-xs font-semibold ${state.status === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{state.message}</p>;
}

function Submit({ label, disabled = false }: { label: string; disabled?: boolean }) {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending || disabled} className="mt-4 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50">{pending ? 'Guardando…' : label}</button>;
}
