import Link from 'next/link';
import { ArrowLeft, ArrowRight, FileCheck } from 'lucide-react';
import { TEACHING_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function PendingPracticesPage() {
  await requirePagePrincipal(TEACHING_ROLES);
  const supabase = await createClient();
  const { data: submissions, error } = await supabase
    .from('assignment_submissions')
    .select('id, student_id, assignment_id, submitted_at, submission_text, file_url')
    .is('graded_at', null)
    .order('submitted_at');
  if (error) throw error;

  const studentIds = [...new Set((submissions ?? []).map((item) => item.student_id))];
  const assignmentIds = [...new Set((submissions ?? []).map((item) => item.assignment_id))];
  const [{ data: profiles, error: profilesError }, { data: assignments, error: assignmentsError }] =
    await Promise.all([
      studentIds.length
        ? supabase.from('profiles').select('id, full_name, email').in('id', studentIds)
        : Promise.resolve({ data: [], error: null }),
      assignmentIds.length
        ? supabase.from('assignments').select('id, title').in('id', assignmentIds)
        : Promise.resolve({ data: [], error: null }),
    ]);
  if (profilesError) throw profilesError;
  if (assignmentsError) throw assignmentsError;

  interface StudentProfile {
    id: string;
    full_name: string | null;
    email: string;
  }
  interface AssignmentRef {
    id: string;
    title: string;
  }
  const profilesById = new Map<string, StudentProfile>((profiles ?? []).map((profile: StudentProfile) => [profile.id, profile]));
  const assignmentsById = new Map<string, AssignmentRef>((assignments ?? []).map((assignment: AssignmentRef) => [assignment.id, assignment]));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-7">
        <Link href="/profesor" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500"><ArrowLeft className="h-4 w-4" /> Panel docente</Link>
        <div><p className="text-xs font-bold uppercase tracking-wider text-rose-600">Rúbrica docente</p><h1 className="text-3xl font-extrabold text-slate-900">Prácticas pendientes</h1></div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {(submissions ?? []).length === 0 ? (
            <p className="rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">No hay prácticas pendientes de evaluación.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {(submissions ?? []).map((submission) => {
                const profile = profilesById.get(submission.student_id);
                const assignment = assignmentsById.get(submission.assignment_id);
                return (
                  <div key={submission.id} className="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-3"><FileCheck className="mt-1 h-5 w-5 text-rose-600" /><div><p className="font-bold text-slate-900">{assignment?.title ?? 'Práctica técnica'}</p><p className="text-xs text-slate-500">{profile?.full_name ?? 'Alumna'} — {profile?.email}</p><p className="mt-1 text-[11px] text-slate-400">Enviada {new Intl.DateTimeFormat('es', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(submission.submitted_at))}</p></div></div>
                    <Link href={`/profesor/evaluar-practica/${submission.id}`} className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white">Evaluar <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
