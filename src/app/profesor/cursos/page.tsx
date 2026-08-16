import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { ADMIN_ROLES, hasAnyRole, TEACHING_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { loadTeacherDashboard } from '@/lib/data/dashboards';

export const dynamic = 'force-dynamic';

export default async function TeacherCoursesPage() {
  const principal = await requirePagePrincipal(TEACHING_ROLES);
  const dashboard = await loadTeacherDashboard(principal.id, hasAnyRole(principal.roles, ADMIN_ROLES));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-7">
        <Link href="/profesor" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500"><ArrowLeft className="h-4 w-4" /> Panel docente</Link>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-rose-600">Autoría académica</p>
          <h1 className="text-3xl font-extrabold text-slate-900">Cursos asignados</h1>
          <p className="mt-2 text-sm text-slate-600">Crea módulos y lecciones únicamente dentro de tu alcance docente.</p>
        </div>

        <section className="grid gap-4 sm:grid-cols-2">
          {dashboard.courses.map((course) => (
            <Link key={course.id} href={`/profesor/cursos/${course.id}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-rose-300">
              <BookOpen className="mb-4 h-6 w-6 text-rose-600" />
              <h2 className="font-bold text-slate-900">{course.title}</h2>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-rose-600">Gestionar contenido <ArrowRight className="h-3.5 w-3.5" /></span>
            </Link>
          ))}
        </section>

        {dashboard.courses.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">No tienes cursos asignados. Solicita la asignación a administración académica.</p>
        )}
      </div>
    </main>
  );
}
