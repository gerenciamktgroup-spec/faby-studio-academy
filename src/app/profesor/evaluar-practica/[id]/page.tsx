import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { TEACHING_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { createClient } from '@/lib/supabase/server';
import { GradeSubmissionForm } from './GradeSubmissionForm';

export const dynamic = 'force-dynamic';

export default async function GradeSubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requirePagePrincipal(TEACHING_ROLES);
  const supabase = await createClient();
  const { data: submission, error } = await supabase
    .from('assignment_submissions')
    .select('id, student_id, assignment_id, submission_text, file_url, submitted_at, grade, graded_at')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  if (!submission) notFound();

  const [{ data: profile }, { data: assignment }] = await Promise.all([
    supabase.from('profiles').select('full_name, email').eq('id', submission.student_id).single(),
    supabase.from('assignments').select('title, description').eq('id', submission.assignment_id).single(),
  ]);
  let evidenceUrl: string | null = null;
  if (submission.file_url?.startsWith('practice-evidence/')) {
    const objectPath = submission.file_url.replace(/^practice-evidence\//, '');
    const { data: signed } = await supabase.storage
      .from('practice-evidence')
      .createSignedUrl(objectPath, 15 * 60);
    evidenceUrl = signed?.signedUrl ?? null;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-7">
        <Link href="/profesor/evaluar-practica" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500"><ArrowLeft className="h-4 w-4" /> Prácticas</Link>
        <header><p className="text-xs font-bold uppercase tracking-wider text-rose-600">Evaluación docente</p><h1 className="text-3xl font-extrabold text-slate-900">{assignment?.title ?? 'Práctica técnica'}</h1><p className="mt-1 text-sm text-slate-600">{profile?.full_name} — {profile?.email}</p></header>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-900">Evidencia de la alumna</h2>
          <p className="whitespace-pre-line text-sm leading-7 text-slate-700">{submission.submission_text || 'Sin descripción adicional.'}</p>
          {evidenceUrl && <a href={evidenceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-bold text-rose-600">Abrir archivo de evidencia <ExternalLink className="h-4 w-4" /></a>}
        </section>
        {submission.graded_at ? <p className="rounded-xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700">Esta práctica ya fue evaluada con {submission.grade}/100.</p> : <GradeSubmissionForm submissionId={submission.id} />}
      </div>
    </main>
  );
}
