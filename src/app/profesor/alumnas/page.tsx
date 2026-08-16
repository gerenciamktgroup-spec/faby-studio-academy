import Link from 'next/link';
import { ArrowLeft, ArrowRight, Users } from 'lucide-react';
import { ADMIN_ROLES, hasAnyRole, TEACHING_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { loadTeacherDashboard } from '@/lib/data/dashboards';

export const dynamic = 'force-dynamic';

export default async function ProfesorAlumnasIndexPage() {
  const principal = await requirePagePrincipal(TEACHING_ROLES);
  const dashboard = await loadTeacherDashboard(principal.id, hasAnyRole(principal.roles, ADMIN_ROLES));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-7">
        <Link href="/profesor" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500"><ArrowLeft className="h-4 w-4" /> Panel docente</Link>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-rose-600">Seguimiento pedagógico</p>
          <h1 className="text-3xl font-extrabold text-slate-900">Alumnas asignadas</h1>
          <p className="mt-1 text-sm text-slate-600">La visibilidad está limitada por curso y rol docente.</p>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {dashboard.students.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-500">No hay alumnas activas en tus cursos asignados.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {dashboard.students.map((student) => (
                <div key={student.enrollmentId} className="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-700">{student.fullName.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</span>
                    <div><p className="font-bold text-slate-900">{student.fullName}</p><p className="text-xs text-slate-500">{student.email}</p></div>
                  </div>
                  <div className="sm:text-right"><p className="text-xs font-semibold text-slate-700">{student.courseTitle}</p><span className="mt-1 inline-block rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">{student.status}</span></div>
                  <Link href={`/profesor/alumnas/${student.studentId}`} className="inline-flex items-center justify-center gap-1 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white">Expediente <ArrowRight className="h-3.5 w-3.5" /></Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="flex items-center gap-2 text-xs text-slate-500"><Users className="h-4 w-4" /> {dashboard.students.length} matrículas visibles en {dashboard.courses.length} cursos.</div>
      </div>
    </main>
  );
}
