import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Award, CheckCircle2, Clock, FileCheck } from 'lucide-react';
import { TEACHING_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { createClient } from '@/lib/supabase/server';
import { IssueCertificateButton } from './IssueCertificateButton';

function relation<T>(value: T | T[] | null): T | null {
  return Array.isArray(value) ? value[0] ?? null : value;
}

export const dynamic = 'force-dynamic';

export default async function StudentDrilldownPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requirePagePrincipal(TEACHING_ROLES);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) notFound();

  const supabase = await createClient();
  const [{ data: profile }, { data: enrollments, error: enrollmentError }] = await Promise.all([
    supabase.from('profiles').select('id, full_name, email, phone, created_at').eq('id', id).maybeSingle(),
    supabase.from('enrollments').select('id, course_id, status, enrolled_at, completed_at, courses(title, estimated_hours)').eq('student_id', id).order('enrolled_at', { ascending: false }),
  ]);
  if (enrollmentError) throw enrollmentError;
  if (!profile || !enrollments?.length) notFound();

  const courseIds = enrollments.map((item) => item.course_id);
  const { data: modules, error: modulesError } = await supabase.from('modules').select('id').in('course_id', courseIds);
  if (modulesError) throw modulesError;
  const moduleIds = (modules ?? []).map((item) => item.id);
  const lessonsResult = moduleIds.length
    ? await supabase.from('lessons').select('id').in('module_id', moduleIds)
    : { data: [], error: null };
  if (lessonsResult.error) throw lessonsResult.error;
  const lessonIds = (lessonsResult.data ?? []).map((item) => item.id);

  const [progressResult, sessionsResult, submissionsResult, attemptsResult, certificatesResult] = await Promise.all([
    lessonIds.length ? supabase.from('lesson_progress').select('lesson_id, status, active_time_seconds, completed_at').eq('student_id', id).in('lesson_id', lessonIds) : Promise.resolve({ data: [], error: null }),
    supabase.from('session_logs').select('total_active_seconds, started_at').eq('user_id', id).in('course_id', courseIds),
    supabase.from('assignment_submissions').select('id, assignment_id, grade, feedback, submitted_at, graded_at, assignments(title)').eq('student_id', id).order('submitted_at', { ascending: false }),
    supabase.from('assessment_attempts').select('id, score, passed, submitted_at, assessments(title)').eq('student_id', id).order('submitted_at', { ascending: false }),
    supabase.from('certificates').select('id, enrollment_id, code, issued_at, courses(title)').eq('student_id', id).order('issued_at', { ascending: false }),
  ]);
  for (const result of [progressResult, sessionsResult, submissionsResult, attemptsResult, certificatesResult]) {
    if (result.error) throw result.error;
  }

  const completedLessons = (progressResult.data ?? []).filter((item) => item.status === 'completed').length;
  const totalActiveSeconds = (sessionsResult.data ?? []).reduce((sum, item) => sum + (item.total_active_seconds ?? 0), 0);
  const graded = (submissionsResult.data ?? []).filter((item) => item.grade != null);
  const averageGrade = graded.length ? Math.round(graded.reduce((sum, item) => sum + Number(item.grade), 0) / graded.length) : null;
  const totalLessons = lessonIds.length;
  const progress = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const certifiedEnrollments = new Set((certificatesResult.data ?? []).map((item) => item.enrollment_id));
  const issuableEnrollments = enrollments.filter((item) => item.status === 'completed' && !certifiedEnrollments.has(item.id));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-7">
        <Link href="/profesor/alumnas" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500"><ArrowLeft className="h-4 w-4" /> Alumnas asignadas</Link>

        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div><p className="text-xs font-bold uppercase tracking-wider text-rose-600">Expediente académico</p><h1 className="text-3xl font-extrabold text-slate-900">{profile.full_name}</h1><p className="text-sm text-slate-500">{profile.email}{profile.phone ? ` · ${profile.phone}` : ''}</p></div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <Metric label="Progreso" value={`${progress}%`} />
              <Metric label="Tiempo activo" value={`${(totalActiveSeconds / 3600).toFixed(1)} h`} />
              <Metric label="Promedio" value={averageGrade == null ? '—' : `${averageGrade}/100`} />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Panel title="Matrículas" icon={CheckCircle2}>
            {enrollments.map((enrollment) => { const course = relation(enrollment.courses as unknown as { title: string; estimated_hours: number }); return <Row key={enrollment.id} title={course?.title ?? 'Curso'} detail={`Desde ${new Intl.DateTimeFormat('es', { dateStyle: 'medium' }).format(new Date(enrollment.enrolled_at))}`} value={enrollment.status} />; })}
          </Panel>
          <Panel title="Prácticas" icon={FileCheck}>
            {(submissionsResult.data ?? []).length ? (submissionsResult.data ?? []).map((submission) => { const assignment = relation(submission.assignments as unknown as { title: string }); return <Row key={submission.id} title={assignment?.title ?? 'Práctica'} detail={new Intl.DateTimeFormat('es', { dateStyle: 'medium' }).format(new Date(submission.submitted_at))} value={submission.grade == null ? 'Pendiente' : `${submission.grade}/100`} href={submission.grade == null ? `/profesor/evaluar-practica/${submission.id}` : undefined} />; }) : <Empty text="No hay prácticas entregadas." />}
          </Panel>
          <Panel title="Evaluaciones teóricas" icon={Clock}>
            {(attemptsResult.data ?? []).length ? (attemptsResult.data ?? []).map((attempt) => { const assessment = relation(attempt.assessments as unknown as { title: string }); return <Row key={attempt.id} title={assessment?.title ?? 'Evaluación'} detail={attempt.submitted_at ? new Intl.DateTimeFormat('es', { dateStyle: 'medium' }).format(new Date(attempt.submitted_at)) : 'En curso'} value={`${attempt.score}% ${attempt.passed ? 'Aprobada' : 'No aprobada'}`} />; }) : <Empty text="No hay intentos registrados." />}
          </Panel>
          <Panel title="Certificados" icon={Award}>
            {(certificatesResult.data ?? []).length ? (certificatesResult.data ?? []).map((certificate) => { const course = relation(certificate.courses as unknown as { title: string }); return <Row key={certificate.id} title={course?.title ?? 'Certificado'} detail={certificate.code} value={new Intl.DateTimeFormat('es', { dateStyle: 'medium' }).format(new Date(certificate.issued_at))} href={`/verificar-certificado/${certificate.code}`} />; }) : <Empty text="No hay certificados emitidos." />}
          </Panel>
        </section>

        {issuableEnrollments.length > 0 && (
          <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="font-bold text-emerald-950">Certificados pendientes de emisión</h2>
            <div className="mt-3 space-y-3">
              {issuableEnrollments.map((enrollment) => {
                const course = relation(enrollment.courses as unknown as { title: string });
                return <div key={enrollment.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-white border border-emerald-200 p-4"><div><p className="text-sm font-bold text-slate-900">{course?.title ?? 'Curso completado'}</p><p className="text-xs text-slate-500">La emisión genera código y firma definitiva.</p></div><IssueCertificateButton enrollmentId={enrollment.id} /></div>;
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3"><span className="text-[10px] text-slate-500">{label}</span><p className="font-extrabold text-slate-900">{value}</p></div>; }
function Panel({ title, icon: Icon, children }: { title: string; icon: typeof Award; children: React.ReactNode }) { return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="mb-4 flex items-center gap-2 font-bold text-slate-900"><Icon className="h-4 w-4 text-rose-600" />{title}</h2><div className="divide-y divide-slate-100">{children}</div></div>; }
function Row({ title, detail, value, href }: { title: string; detail: string; value: string; href?: string }) { const content = <div className="flex items-center justify-between gap-4 py-3 text-xs"><div><p className="font-bold text-slate-900">{title}</p><p className="text-slate-500">{detail}</p></div><span className="shrink-0 font-bold text-rose-700">{value}</span></div>; return href ? <Link href={href} className="block hover:bg-slate-50">{content}</Link> : content; }
function Empty({ text }: { text: string }) { return <p className="py-6 text-center text-xs text-slate-500">{text}</p>; }
