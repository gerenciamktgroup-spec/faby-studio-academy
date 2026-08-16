import Link from 'next/link';
import { Activity, Clock, Database, ShieldCheck, Users } from 'lucide-react';
import { AUDIT_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { createClient } from '@/lib/supabase/server';
import { AuditExportButtons } from './AuditExportButtons';

export const dynamic = 'force-dynamic';

export default async function AuditPage() {
  const principal = await requirePagePrincipal(AUDIT_ROLES);
  const supabase = await createClient();
  const [{ data: events, error: eventsError, count: eventCount }, { data: sessions, error: sessionsError }, { count: studentCount, error: studentsError }] = await Promise.all([
    supabase.from('activity_events').select('*', { count: 'exact' }).order('occurred_at', { ascending: false }).limit(100),
    supabase.from('session_logs').select('total_logged_seconds, total_active_seconds'),
    supabase.from('user_roles').select('*', { count: 'exact', head: true }).eq('role', 'alumna'),
  ]);
  if (eventsError) throw eventsError;
  if (sessionsError) throw sessionsError;
  if (studentsError) throw studentsError;

  const userIds = [...new Set((events ?? []).map((event) => event.user_id))];
  const { data: profiles, error: profilesError } = userIds.length ? await supabase.from('profiles').select('id, full_name').in('id', userIds) : { data: [], error: null };
  if (profilesError) throw profilesError;
  const namesById = new Map((profiles ?? []).map((profile) => [profile.id, profile.full_name]));
  const totalLoggedSeconds = (sessions ?? []).reduce((total, session) => total + (session.total_logged_seconds ?? 0), 0);
  const totalActiveSeconds = (sessions ?? []).reduce((total, session) => total + (session.total_active_seconds ?? 0), 0);
  const activeRatio = totalLoggedSeconds > 0 ? Math.round((totalActiveSeconds / totalLoggedSeconds) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4"><div><Link href="/" className="font-extrabold text-slate-900">FABY STUDIO <span className="text-emerald-700">ACADEMY</span></Link><p className="text-xs text-slate-500">Auditoría de actividad</p></div><span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800"><ShieldCheck className="h-4 w-4" /> {principal.fullName}</span></div>
      </header>
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6">
        <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Registro append-only</p><h1 className="text-3xl font-extrabold text-slate-900">Trazabilidad académica</h1><p className="mt-2 max-w-2xl text-sm text-slate-600">Eventos, sesiones y exportaciones obtenidos de la base operativa. Los registros no pueden editarse ni eliminarse.</p></div><AuditExportButtons /></section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric icon={Database} label="Eventos registrados" value={eventCount ?? 0} />
          <Metric icon={Users} label="Alumnas" value={studentCount ?? 0} />
          <Metric icon={Clock} label="Horas activas" value={Number((totalActiveSeconds / 3600).toFixed(2))} />
          <Metric icon={Activity} label="Ratio activo" value={`${activeRatio}%`} />
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6"><h2 className="text-xl font-bold text-slate-900">Últimos eventos</h2><p className="text-xs text-slate-500">Se muestran hasta 100 registros recientes.</p></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-xs"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-3">Fecha</th><th className="p-3">Usuario</th><th className="p-3">Evento</th><th className="p-3">Sesión</th><th className="p-3">Duración</th><th className="p-3">IP anonimizada</th></tr></thead><tbody className="divide-y divide-slate-100">{(events ?? []).map((event) => <tr key={event.id}><td className="p-3 text-slate-600">{new Intl.DateTimeFormat('es', { dateStyle: 'short', timeStyle: 'medium' }).format(new Date(event.occurred_at))}</td><td className="p-3 font-bold text-slate-900">{namesById.get(event.user_id) ?? event.user_id.slice(0, 8)}</td><td className="p-3"><span className="rounded-full bg-emerald-50 px-2 py-1 font-bold text-emerald-700">{event.event_type}</span></td><td className="p-3 font-mono text-slate-500">{event.session_id.slice(0, 24)}</td><td className="p-3 text-slate-600">{event.duration_seconds ?? 0}s</td><td className="p-3 font-mono text-slate-400">{event.ip_hash.slice(0, 12)}…</td></tr>)}</tbody></table></div>
          {(events ?? []).length === 0 && <p className="p-8 text-center text-sm text-slate-500">Todavía no existen eventos registrados.</p>}
        </section>
      </main>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof Activity; label: string; value: number | string }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><Icon className="mb-4 h-5 w-5 text-emerald-700" /><p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-1 text-2xl font-extrabold text-slate-900">{value}</p></article>;
}
