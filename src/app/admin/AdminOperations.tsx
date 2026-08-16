'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  assignCourseStaffAction,
  assignRoleAction,
  createCourseAction,
  createEnrollmentAction,
  inviteUserAction,
  removeRoleAction,
  updateEnrollmentStatusAction,
  reviewDeletionRequestAction,
  initialAdminActionState,
  type AdminActionState,
} from './actions';

interface UserOption {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
}

interface CourseOption {
  id: string;
  title: string;
  isPublished: boolean;
}

export function AdminOperations({
  users,
  courses,
  enrollments,
  deletionRequests,
}: {
  users: UserOption[];
  courses: CourseOption[];
  enrollments: Array<{ id: string; label: string }>;
  deletionRequests: Array<{ id: string; label: string }>;
}) {
  const students = users.filter((user) => user.roles.includes('alumna'));
  return (
    <section className="grid gap-5 xl:grid-cols-2">
      <OperationForm title="Invitar una cuenta" description="Envía un acceso seguro y asigna el rol inicial." action={inviteUserAction}>
        <Field name="fullName" label="Nombre completo" placeholder="Nombre y apellidos" />
        <Field name="email" label="Correo" placeholder="persona@dominio.com" type="email" />
        <Select name="role" label="Rol inicial" options={[{ value: 'alumna', label: 'Alumna' }, { value: 'tutor', label: 'Tutora' }, { value: 'profesor', label: 'Profesora' }, { value: 'auditor', label: 'Auditoría' }, { value: 'admin_academico', label: 'Administración académica' }]} />
      </OperationForm>

      <OperationForm title="Crear matrícula" description="Habilita un curso para una alumna con pago confirmado." action={createEnrollmentAction}>
        <Select name="studentId" label="Alumna" options={students.map((user) => ({ value: user.id, label: `${user.fullName} — ${user.email}` }))} />
        <Select name="courseId" label="Curso" options={courses.map((course) => ({ value: course.id, label: course.title }))} />
      </OperationForm>

      <OperationForm title="Asignar rol" description="Concede permisos de forma explícita y auditable." action={assignRoleAction}>
        <Select name="userId" label="Cuenta" options={users.map((user) => ({ value: user.id, label: `${user.fullName} — ${user.roles.join(', ') || 'sin rol'}` }))} />
        <Select
          name="role"
          label="Nuevo rol"
          options={[
            { value: 'alumna', label: 'Alumna' },
            { value: 'tutor', label: 'Tutora' },
            { value: 'profesor', label: 'Profesora' },
            { value: 'auditor', label: 'Auditoría' },
            { value: 'admin_academico', label: 'Administración académica' },
            { value: 'superadmin', label: 'Superadministración' },
          ]}
        />
      </OperationForm>

      <OperationForm title="Retirar rol" description="Revoca permisos conservando al menos un rol por cuenta." action={removeRoleAction}>
        <Select name="userId" label="Cuenta" options={users.map((user) => ({ value: user.id, label: `${user.fullName} — ${user.roles.join(', ')}` }))} />
        <Select name="role" label="Rol a retirar" options={[{ value: 'alumna', label: 'Alumna' }, { value: 'tutor', label: 'Tutora' }, { value: 'profesor', label: 'Profesora' }, { value: 'auditor', label: 'Auditoría' }, { value: 'admin_academico', label: 'Administración académica' }, { value: 'superadmin', label: 'Superadministración' }]} />
      </OperationForm>

      <OperationForm title="Actualizar matrícula" description="Activa, completa o cancela una relación académica." action={updateEnrollmentStatusAction}>
        <Select name="enrollmentId" label="Matrícula" options={enrollments.map((item) => ({ value: item.id, label: item.label }))} />
        <Select name="status" label="Nuevo estado" options={[{ value: 'active', label: 'Activa' }, { value: 'completed', label: 'Completada' }, { value: 'cancelled', label: 'Cancelada' }]} />
      </OperationForm>

      <OperationForm title="Solicitudes de privacidad" description="Revisa o rechaza solicitudes; la eliminación final requiere el procedimiento legal." action={reviewDeletionRequestAction}>
        <Select name="requestId" label="Solicitud" options={deletionRequests.map((item) => ({ value: item.id, label: item.label }))} />
        <Select name="status" label="Decisión" options={[{ value: 'processing', label: 'Poner en revisión' }, { value: 'rejected', label: 'Rechazar' }]} />
      </OperationForm>

      <OperationForm title="Asignar docente a curso" description="Limita el alcance docente al curso elegido." action={assignCourseStaffAction}>
        <Select name="userId" label="Profesional" options={users.map((user) => ({ value: user.id, label: `${user.fullName} — ${user.roles.join(', ') || 'sin rol'}` }))} />
        <Select name="courseId" label="Curso" options={courses.map((course) => ({ value: course.id, label: course.title }))} />
        <Select name="staffRole" label="Función" options={[{ value: 'profesor', label: 'Profesora' }, { value: 'tutor', label: 'Tutora' }]} />
      </OperationForm>

      <OperationForm title="Crear curso" description="Genera un borrador antes de cargar módulos y publicarlo." action={createCourseAction}>
        <Field name="title" label="Título" placeholder="Especialización profesional…" />
        <Field name="slug" label="Slug" placeholder="especializacion-profesional" />
        <Field name="category" label="Categoría" placeholder="Belleza & Estética" />
        <Field name="estimatedHours" label="Horas estimadas" type="number" placeholder="40" />
        <label className="block text-xs font-semibold text-slate-700 sm:col-span-2">
          Descripción
          <textarea name="description" required minLength={20} rows={3} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-rose-500" />
        </label>
      </OperationForm>
    </section>
  );
}

function OperationForm({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description: string;
  action: (state: AdminActionState, formData: FormData) => Promise<AdminActionState>;
  children: React.ReactNode;
}) {
  const [state, formAction] = useFormState(action, initialAdminActionState);
  return (
    <form action={formAction} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">{children}</div>
      {state.status !== 'idle' && (
        <p className={`mt-4 rounded-xl p-3 text-xs font-semibold ${state.status === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {state.message}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="mt-4 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50">
      {pending ? 'Procesando…' : 'Confirmar operación'}
    </button>
  );
}

function Select({ name, label, options }: { name: string; label: string; options: Array<{ value: string; label: string }> }) {
  return (
    <label className="block text-xs font-semibold text-slate-700">
      {label}
      <select name={name} required defaultValue="" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-rose-500">
        <option value="" disabled>Selecciona…</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function Field({ name, label, placeholder, type = 'text' }: { name: string; label: string; placeholder: string; type?: string }) {
  return (
    <label className="block text-xs font-semibold text-slate-700">
      {label}
      <input name={name} type={type} required placeholder={placeholder} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-rose-500" />
    </label>
  );
}
