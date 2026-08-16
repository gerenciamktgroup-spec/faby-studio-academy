import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  FileCheck,
  Users,
} from 'lucide-react';
import { ADMIN_ROLES, hasAnyRole, TEACHING_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { loadTeacherDashboard } from '@/lib/data/dashboards';

export const dynamic = 'force-dynamic';

export default async function TeacherPage() {
  const principal = await requirePagePrincipal(TEACHING_ROLES);
  const dashboard = await loadTeacherDashboard(
    principal.id,
    hasAnyRole(principal.roles, ADMIN_ROLES)
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <Link href="/" className="font-extrabold text-slate-900">FABY STUDIO <span className="text-rose-600">ACADEMY</span></Link>
            <p className="text-xs text-slate-500">Panel docente de {principal.fullName}</p>
          </div>
          <Link href="/profesor/cursos" className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white">
            <BookOpen className="h-4 w-4" /> Gestionar cursos
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6">
        <section>
          <h1 className="text-3xl font-extrabold text-slate-900">Gestión docente</h1>
          <p className="mt-1 text-sm text-slate-600">
            Información limitada a los cursos asignados a tu cuenta.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric icon={BookOpen} label="Cursos asignados" value={dashboard.courses.length} />
          <Metric icon={Users} label="Matrículas visibles" value={dashboard.students.length} />
          <Metric icon={FileCheck} label="Prácticas por evaluar" value={dashboard.pendingSubmissions} />
          <Metric icon={CalendarClock} label="Tutorías programadas" value={dashboard.scheduledTutorings} />
        </section>

        <div className="flex flex-wrap gap-3">
          <Link href="/profesor/alumnas" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700">Expedientes de alumnas</Link>
          <Link href="/profesor/evaluar-practica" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700">Evaluar prácticas</Link>
          <Link href="/profesor/tutorias" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700">Gestionar tutorías</Link>
        </div>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-rose-600">Seguimiento</p>
                <h2 className="text-xl font-bold text-slate-900">Alumnas matriculadas</h2>
              </div>
              <Link href="/profesor/alumnas" className="text-xs font-bold text-rose-600">Ver todas</Link>
            </div>

            {dashboard.students.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                No hay alumnas en los cursos asignados.
              </p>
            ) : (
              <div className="divide-y divide-slate-100">
                {dashboard.students.slice(0, 8).map((student) => (
                  <div key={student.enrollmentId} className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="font-bold text-slate-900">{student.fullName}</p>
                      <p className="text-xs text-slate-500">{student.email}</p>
                      <p className="mt-1 text-xs font-medium text-rose-700">{student.courseTitle}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                        {student.status}
                      </span>
                      <Link href={`/profesor/alumnas/${student.studentId}`} className="rounded-lg border border-slate-200 p-2 text-slate-500">
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-rose-600">Cursos asignados</p>
            <div className="mt-4 space-y-3">
              {dashboard.courses.map((course) => (
                <Link key={course.id} href="/profesor/cursos" className="block rounded-xl border border-slate-200 p-3 text-sm font-bold text-slate-800 hover:border-rose-300">
                  {course.title}
                </Link>
              ))}
              {dashboard.courses.length === 0 && (
                <p className="text-sm text-slate-500">Administración debe asignarte al menos un curso.</p>
              )}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: number }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <Icon className="mb-4 h-5 w-5 text-rose-600" />
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-extrabold text-slate-900">{value}</p>
    </article>
  );
}
