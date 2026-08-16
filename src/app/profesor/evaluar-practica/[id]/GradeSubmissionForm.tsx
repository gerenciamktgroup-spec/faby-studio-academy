'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function GradeSubmissionForm({ submissionId }: { submissionId: string }) {
  const router = useRouter();
  const [grade, setGrade] = useState(70);
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const response = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'grade', submissionId, grade, feedback }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error ?? 'No se pudo guardar la evaluación.');
        return;
      }
      router.replace('/profesor/evaluar-practica');
      router.refresh();
    } catch {
      setError('No fue posible conectar con el registro académico.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
      <div><label className="text-sm font-bold text-slate-900">Calificación: {grade}/100</label><input type="range" min={0} max={100} value={grade} onChange={(event) => setGrade(Number(event.target.value))} className="mt-2 w-full accent-rose-600" /></div>
      <label className="block text-sm font-bold text-slate-900">Retroalimentación<textarea required minLength={10} maxLength={5000} rows={7} value={feedback} onChange={(event) => setFeedback(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-normal outline-none focus:border-rose-500" placeholder="Describe fortalezas, correcciones y siguiente paso…" /></label>
      {error && <p className="rounded-xl bg-red-50 p-3 text-xs text-red-700">{error}</p>}
      <button type="submit" disabled={saving} className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{saving ? 'Guardando…' : 'Guardar evaluación oficial'}</button>
    </form>
  );
}
