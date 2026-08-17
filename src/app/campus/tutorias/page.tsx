import { CalendarClock, Video } from 'lucide-react';
import { STUDENT_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { createClient } from '@/lib/supabase/server';
import { TutoringRequestForm } from './TutoringRequestForm';

export const dynamic = 'force-dynamic';

export default async function TutoringPage() {
  const principal = await requirePagePrincipal(STUDENT_ROLES);
  const supabase = await createClient();
  const { data: enrollments, error: enrollmentError } = await supabase.from('enrollments').select('course_id').eq('student_id', principal.id).in('status', ['active', 'completed']);
  if (enrollmentError) throw enrollmentError;
  const courseIds = (enrollments ?? []).map((item) => item.course_id);
  const { data: staff, error: staffError } = courseIds.length ? await supabase.from('course_staff').select('user_id').in('course_id', courseIds).eq('is_active', true) : { data: [], error: null };
  if (staffError) throw staffError;
  const tutorIds = [...new Set((staff ?? []).map((item) => item.user_id))];
  const [{ data: tutors, error: tutorsError }, { data: sessions, error: sessionsError }] = await Promise.all([
    tutorIds.length ? supabase.from('profiles').select('id, full_name').in('id', tutorIds) : Promise.resolve({ data: [], error: null }),
    supabase.from('tutoring_sessions').select('id, tutor_id, scheduled_at, duration_minutes, status, meeting_link').eq('student_id', principal.id).order('scheduled_at', { ascending: false }),
  ]);
  if (tutorsError) throw tutorsError;
  if (sessionsError) throw sessionsError;
  const tutorsById = new Map<string, string>((tutors ?? []).map((tutor: { id: string; full_name: string | null }) => [tutor.id, tutor.full_name ?? 'Tutora'] as [string, string]));

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header><p className="text-xs font-bold uppercase tracking-wider text-rose-600">Acompañamiento en vivo</p><h1 className="text-3xl font-extrabold text-slate-900">Tutorías 1 a 1</h1></header>
      <TutoringRequestForm tutors={(tutors ?? []).map((tutor) => ({ id: tutor.id, fullName: tutor.full_name }))} />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-slate-900">Historial y próximas sesiones</h2><div className="mt-5 divide-y divide-slate-100">{(sessions ?? []).length === 0 ? <p className="py-6 text-sm text-slate-500">No tienes tutorías registradas.</p> : (sessions ?? []).map((session) => <article key={session.id} className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center"><div><p className="font-bold text-slate-900">{tutorsById.get(session.tutor_id) ?? 'Tutora asignada'}</p><p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><CalendarClock className="h-3.5 w-3.5" /> {new Intl.DateTimeFormat('es', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(session.scheduled_at))} · {session.duration_minutes} min</p></div><div className="flex items-center gap-2"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{session.status}</span>{session.meeting_link && <a href={session.meeting_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-3 py-2 text-xs font-bold text-white"><Video className="h-3.5 w-3.5" /> Unirse</a>}</div></article>)}</div></section>
    </div>
  );
}
