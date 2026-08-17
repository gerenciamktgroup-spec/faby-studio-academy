import { Award, Clock, FileCheck } from 'lucide-react';
import { STUDENT_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { createClient } from '@/lib/supabase/server';
import { PracticeSubmissionPanel } from './PracticeSubmissionPanel';

export const dynamic = 'force-dynamic';

interface AssignmentItem {
  id: string;
  title: string;
  description?: string | null;
  due_date?: string | null;
}

export default async function StudentPracticesPage() {
  const principal = await requirePagePrincipal(STUDENT_ROLES);
  const supabase = await createClient();
  const [{ data: assignments, error: assignmentsError }, { data: submissions, error: submissionsError }] = await Promise.all([
    supabase.from('assignments').select('id, title, description, due_date').order('created_at'),
    supabase.from('assignment_submissions').select('id, assignment_id, submitted_at, grade, feedback, graded_at').eq('student_id', principal.id).order('submitted_at', { ascending: false }),
  ]);
  if (assignmentsError) throw assignmentsError;
  if (submissionsError) throw submissionsError;
  const assignmentsById = new Map<string, AssignmentItem>((assignments ?? []).map((assignment) => [assignment.id, assignment] as [string, AssignmentItem]));

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header><p className="text-xs font-bold uppercase tracking-wider text-rose-600">Evidencias de belleza</p><h1 className="text-3xl font-extrabold text-slate-900">Prácticas y rúbricas</h1><p className="mt-2 text-sm text-slate-600">Carga evidencias privadas y recibe calificación del equipo docente.</p></header>

      {assignments?.length ? <PracticeSubmissionPanel userId={principal.id} assignments={assignments.map((assignment) => ({ id: assignment.id, title: assignment.title, description: assignment.description }))} /> : <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">No hay prácticas disponibles en tus cursos.</p>}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Historial de entregas</h2>
        {(submissions ?? []).length === 0 ? <p className="mt-4 text-sm text-slate-500">Todavía no has enviado prácticas.</p> : (
          <div className="mt-5 divide-y divide-slate-100">
            {(submissions ?? []).map((submission) => {
              const assignment = assignmentsById.get(submission.assignment_id);
              return <article key={submission.id} className="py-4"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><p className="font-bold text-slate-900">{assignment?.title ?? 'Práctica'}</p><p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><Clock className="h-3.5 w-3.5" /> {new Intl.DateTimeFormat('es', { dateStyle: 'medium' }).format(new Date(submission.submitted_at))}</p></div>{submission.graded_at ? <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"><Award className="h-3.5 w-3.5" /> {submission.grade}/100</span> : <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700"><FileCheck className="h-3.5 w-3.5" /> En revisión</span>}</div>{submission.feedback && <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">{submission.feedback}</p>}</article>;
            })}
          </div>
        )}
      </section>
    </div>
  );
}
