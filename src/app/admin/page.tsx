import Link from 'next/link';
import {
  Award,
  BookOpen,
  FileCheck,
  GraduationCap,
  ShieldCheck,
  UserRoundCog,
  Users,
} from 'lucide-react';
import { ADMIN_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { loadAdminDashboard } from '@/lib/data/dashboards';
import { AdminOperations } from './AdminOperations';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const principal = await requirePagePrincipal(ADMIN_ROLES);
  const dashboard = await loadAdminDashboard();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <Link href="/" className="font-extrabold text-slate-900">FABY STUDIO <span className="text-rose-600">ACADEMY</span></Link>
            <p className="text-xs text-slate-500">Administración académica</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> {principal.fullName}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6">
        <section>
          <p className="text-xs font-bold uppercase tracking-wider text-rose-600">Centro de control</p>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">Operación académica</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Los indicadores y operaciones de esta pantalla provienen de la base de datos y respetan las políticas por rol.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <Metric icon={Users} label="Usuarios" value={dashboard.profileCount} />
          <Metric icon={GraduationCap} label="Alumnas" value={dashboard.studentCount} />
          <Metric icon={BookOpen} label="Cursos" value={dashboard.courseCount} />
          <Metric icon={UserRoundCog} label="Matrículas activas" value={dashboard.activeEnrollmentCount} />
          <Metric icon={FileCheck} label="Prácticas pendientes" value={dashboard.pendingSubmissionCount} />
          <Metric icon={Award} label="Certificados" value={dashboard.certificateCount} />
        </section>

        <section>
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wider text-rose-600">Acciones autorizadas</p>
            <h2 className="text-xl font-bold text-slate-900">Gestión de cuentas, cursos y matrículas</h2>
          </div>
          <AdminOperations
            users={dashboard.users}
            courses={dashboard.courses}
            enrollments={dashboard.enrollments.map((item) => ({ id: item.enrollmentId, label: `${item.fullName} — ${item.courseTitle} (${item.status})` }))}
            deletionRequests={dashboard.deletionRequests.map((item) => ({ id: item.id, label: `${item.userName} — ${item.status}` }))}
          />
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-rose-600">Actividad reciente</p>
              <h2 className="text-xl font-bold text-slate-900">Últimas matrículas</h2>
            </div>
            <Link href="/auditoria" className="text-xs font-bold text-emerald-700">Abrir auditoría</Link>
          </div>
          {dashboard.recentEnrollments.length === 0 ? (
            <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">No existen matrículas registradas.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-xs">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr><th className="p-3">Alumna</th><th className="p-3">Correo</th><th className="p-3">Curso</th><th className="p-3">Estado</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dashboard.recentEnrollments.map((enrollment) => (
                    <tr key={enrollment.enrollmentId}>
                      <td className="p-3 font-bold text-slate-900">{enrollment.fullName}</td>
                      <td className="p-3 text-slate-600">{enrollment.email}</td>
                      <td className="p-3 text-slate-600">{enrollment.courseTitle}</td>
                      <td className="p-3"><span className="rounded-full bg-emerald-50 px-2.5 py-1 font-bold text-emerald-700">{enrollment.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: number }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <Icon className="mb-3 h-5 w-5 text-rose-600" />
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-slate-900">{value}</p>
    </article>
  );
}
