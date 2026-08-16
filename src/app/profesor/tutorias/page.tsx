import Link from 'next/link';
import { ArrowLeft, CalendarClock, Video } from 'lucide-react';
import { ADMIN_ROLES, hasAnyRole, TEACHING_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { createClient } from '@/lib/supabase/server';
import { TutoringManager } from './TutoringManager';

export const dynamic = 'force-dynamic';

export default async function TeacherTutoringPage() {
  const principal = await requirePagePrincipal(TEACHING_ROLES);
  const supabase = await createClient();
  let sessionsQuery = supabase
    .from('tutoring_sessions')
    .select('id, student_id, tutor_id, scheduled_at, duration_minutes, status, meeting_link, profiles!tutoring_sessions_student_id_fkey(full_name, email)')
    .order('scheduled_at', { ascending: true });
  if (!hasAnyRole(principal.roles, ADMIN_ROLES)) sessionsQuery = sessionsQuery.eq('tutor_id', principal.id);
  const { data: sessions, error } = await sessionsQuery;
  if (error) throw error;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-7">
        <Link href="/profesor" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500"><ArrowLeft className="h-4 w-4" /> Panel docente</Link>
        <div><p className="text-xs font-bold uppercase tracking-wider text-rose-600">Agenda docente</p><h1 className="text-3xl font-extrabold text-slate-900">Gestión de tutorías</h1></div>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {(sessions ?? []).length === 0 ? <p className="py-10 text-center text-sm text-slate-500">No tienes solicitudes ni tutorías asignadas.</p> : <div className="divide-y divide-slate-100">{(sessions ?? []).map((session) => {
            const profileValue = session.profiles as unknown as { full_name: string; email: string } | { full_name: string; email: string }[] | null;
            const student = Array.isArray(profileValue) ? profileValue[0] : profileValue;
            return <article key={session.id} className="grid gap-4 py-5 lg:grid-cols-[1fr_1fr_280px] lg:items-center"><div><p className="font-bold text-slate-900">{student?.full_name ?? 'Alumna'}</p><p className="text-xs text-slate-500">{student?.email}</p></div><div><p className="flex items-center gap-1 text-xs font-semibold text-slate-700"><CalendarClock className="h-4 w-4 text-rose-600" /> {new Intl.DateTimeFormat('es', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(session.scheduled_at))}</p><p className="mt-1 text-[11px] text-slate-500">{session.duration_minutes} min · {session.status}</p>{session.meeting_link && <a href={session.meeting_link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-rose-600"><Video className="h-3.5 w-3.5" /> Abrir videollamada</a>}</div><TutoringManager sessionId={session.id} currentStatus={session.status} /></article>;
          })}</div>}
        </section>
      </div>
    </main>
  );
}
