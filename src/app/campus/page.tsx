import Link from 'next/link';
import {
  ArrowRight,
  Award,
  BookOpen,
  Clock,
  FileCheck,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { STUDENT_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { loadStudentDashboard } from '@/lib/data/dashboards';

export const dynamic = 'force-dynamic';

export default async function CampusPage() {
  const principal = await requirePagePrincipal(STUDENT_ROLES);
  const dashboard = await loadStudentDashboard(principal.id);
  const globalProgress = dashboard.courses.length
    ? Math.round(
        dashboard.courses.reduce((total, course) => total + course.progressPercentage, 0) /
          dashboard.courses.length
      )
    : 0;
  const activeHours = dashboard.courses.reduce((total, course) => total + course.activeHours, 0);
  const firstName = principal.fullName.split(' ')[0];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">
            <Sparkles className="h-3.5 w-3.5" /> Bienvenida, {firstName}
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Continúa construyendo tu perfil profesional
          </h1>
          <p className="text-sm leading-relaxed text-slate-600">
            Tu panel muestra únicamente matrículas, avance y evidencias registrados en la base académica.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Progreso global" value={`${globalProgress}%`} icon={BookOpen} color="rose" />
        <Metric label="Tiempo activo" value={`${activeHours.toFixed(2)} h`} icon={Clock} color="emerald" />
        <Metric
          label="Última calificación"
          value={dashboard.latestGrade == null ? 'Pendiente' : `${dashboard.latestGrade}/100`}
          icon={FileCheck}
          color="violet"
        />
        <Metric
          label="Certificados"
          value={String(dashboard.certificateCount)}
          icon={Award}
          color="amber"
        />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-rose-600">Mis programas</p>
            <h2 className="text-xl font-bold text-slate-900">Matrículas activas y completadas</h2>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {dashboard.courses.length} programa(s)
          </span>
        </div>

        {dashboard.courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <GraduationCap className="mx-auto mb-3 h-10 w-10 text-slate-400" />
            <h3 className="font-bold text-slate-900">Aún no tienes una matrícula activa</h3>
            <p className="mt-1 text-sm text-slate-500">
              Cuando administración confirme tu pago, el programa aparecerá aquí.
            </p>
            <Link href="/cursos" className="mt-4 inline-block text-sm font-bold text-rose-600">
              Explorar programas
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {dashboard.courses.map((course) => (
              <article key={course.enrollmentId} className="rounded-2xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      {course.status === 'completed' ? 'Completado' : 'En curso'}
                    </p>
                    <h3 className="mt-1 font-bold text-slate-900">{course.title}</h3>
                  </div>
                  <span className="text-2xl font-extrabold text-rose-600">{course.progressPercentage}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-rose-600" style={{ width: `${course.progressPercentage}%` }} />
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>{course.completedLessons}/{course.totalLessons} lecciones</span>
                  <span>{course.activeHours} h activas</span>
                  <span>{course.estimatedHours} h estimadas</span>
                </div>
                {course.nextLesson && (
                  <p className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                    Siguiente: <strong className="text-slate-900">{course.nextLesson.title}</strong>
                  </p>
                )}
                <Link
                  href={`/campus/cursos/${course.courseId}`}
                  className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white"
                >
                  Abrir programa <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link href="/campus/practicas" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-900">Prácticas pendientes de revisión</p>
          <p className="mt-1 text-2xl font-extrabold text-violet-700">{dashboard.pendingFeedbackCount}</p>
        </Link>
        <Link href="/campus/mensajes" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-900">Notificaciones sin leer</p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-700">{dashboard.unreadNotifications}</p>
        </Link>
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: typeof BookOpen;
  color: 'rose' | 'emerald' | 'violet' | 'amber';
}) {
  const colors = {
    rose: 'bg-rose-50 text-rose-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    violet: 'bg-violet-50 text-violet-600',
    amber: 'bg-amber-50 text-amber-600',
  };
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl ${colors[color]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-slate-900">{value}</p>
    </article>
  );
}
