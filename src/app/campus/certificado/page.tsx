import Link from 'next/link';
import { Award, CheckCircle2, Clock, ExternalLink, Lock, ShieldCheck } from 'lucide-react';
import { STUDENT_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { createClient } from '@/lib/supabase/server';
import { loadStudentDashboard } from '@/lib/data/dashboards';
import { CertificateActions } from './CertificateActions';

function relation<T>(value: T | T[] | null): T | null {
  return Array.isArray(value) ? value[0] ?? null : value;
}

export default async function CertificatePage() {
  const principal = await requirePagePrincipal(STUDENT_ROLES);
  const supabase = await createClient();
  const [{ data: certificates, error }, dashboard] = await Promise.all([
    supabase
      .from('certificates')
      .select('id, code, total_active_hours, issued_at, verification_url, courses(title)')
      .eq('student_id', principal.id)
      .order('issued_at', { ascending: false }),
    loadStudentDashboard(principal.id),
  ]);
  if (error) throw error;

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 print:hidden">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Acreditaciones verificables</span>
          <h1 className="text-2xl font-bold font-display text-slate-900 mt-1">Mis certificados</h1>
          <p className="text-xs text-slate-500">Cada certificado incluye una página pública y una huella criptográfica de integridad.</p>
        </div>
      </div>

      {(certificates ?? []).length > 0 ? (
        <div className="space-y-6">
          {(certificates ?? []).map((certificate) => {
            const course = relation(certificate.courses as unknown as { title: string });
            return (
              <article key={certificate.id} className="bg-white rounded-3xl border-2 border-emerald-200 p-7 sm:p-10 shadow-sm space-y-8 break-inside-avoid">
                <div className="text-center space-y-3">
                  <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center"><Award className="w-8 h-8" /></div>
                  <p className="text-xs font-extrabold tracking-[0.25em] text-emerald-700">FABY STUDIO ACADEMY</p>
                  <h2 className="text-3xl font-extrabold text-slate-900">Certificado de finalización</h2>
                  <p className="text-sm text-slate-600">Se certifica que</p>
                  <p className="text-2xl font-bold text-rose-700">{principal.fullName}</p>
                  <p className="text-sm text-slate-600">ha completado satisfactoriamente</p>
                  <p className="text-xl font-bold text-slate-900">{course?.title ?? 'Programa formativo'}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 text-xs">
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4"><Clock className="w-4 h-4 text-emerald-600 mb-2" /><span className="text-slate-500 block">Horas activas</span><strong className="text-slate-900">{certificate.total_active_hours} h</strong></div>
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4"><CheckCircle2 className="w-4 h-4 text-emerald-600 mb-2" /><span className="text-slate-500 block">Emisión</span><strong className="text-slate-900">{new Intl.DateTimeFormat('es', { dateStyle: 'medium' }).format(new Date(certificate.issued_at))}</strong></div>
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4"><ShieldCheck className="w-4 h-4 text-emerald-600 mb-2" /><span className="text-slate-500 block">Código</span><strong className="font-mono text-slate-900 break-all">{certificate.code}</strong></div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
                  <Link href={`/verificar-certificado/${encodeURIComponent(certificate.code)}`} target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 px-4 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-50"><ExternalLink className="h-4 w-4" /> Verificación pública</Link>
                  <CertificateActions />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mx-auto"><Lock className="w-7 h-7" /></div>
          <h2 className="text-xl font-bold text-slate-900">Aún no tienes certificados emitidos</h2>
          <p className="text-xs text-slate-600 max-w-xl mx-auto">La profesora o administración podrá emitirlos cuando tu matrícula esté completada y las evidencias académicas estén aprobadas.</p>
        </div>
      )}

      <section className="print:hidden space-y-3">
        <h2 className="font-bold text-slate-900">Estado de tus programas</h2>
        {dashboard.courses.map((course) => (
          <div key={course.courseId} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4 text-xs">
            <div><p className="font-bold text-slate-900">{course.title}</p><p className="text-slate-500">{course.completedLessons} de {course.totalLessons} lecciones · {course.activeHours} h activas</p></div>
            <span className={`font-bold px-3 py-1 rounded-full ${course.status === 'completed' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'}`}>{course.progressPercentage}%</span>
          </div>
        ))}
      </section>
    </div>
  );
}
