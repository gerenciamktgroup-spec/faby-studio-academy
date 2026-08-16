'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarPlus } from 'lucide-react';

export function TutoringRequestForm({ tutors }: { tutors: Array<{ id: string; fullName: string }> }) {
  const router = useRouter();
  const [tutorId, setTutorId] = useState(tutors[0]?.id ?? '');
  const [scheduledAt, setScheduledAt] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch('/api/tutoring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tutorId, scheduledAt: new Date(scheduledAt).toISOString(), durationMinutes: 45 }),
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.error ?? 'No se pudo solicitar la tutoría.');
        return;
      }
      setScheduledAt('');
      setMessage('Solicitud enviada a tu tutora.');
      router.refresh();
    } catch {
      setMessage('No fue posible conectar con tutorías.');
    } finally {
      setSaving(false);
    }
  };

  if (tutors.length === 0) return <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">Administración todavía no asignó una tutora a tu curso.</p>;
  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Solicitar tutoría 1 a 1</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-semibold text-slate-700">Tutora<select value={tutorId} onChange={(event) => setTutorId(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">{tutors.map((tutor) => <option key={tutor.id} value={tutor.id}>{tutor.fullName}</option>)}</select></label>
        <label className="text-xs font-semibold text-slate-700">Fecha y hora<input type="datetime-local" required value={scheduledAt} onChange={(event) => setScheduledAt(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" /></label>
      </div>
      {message && <p className="text-xs font-semibold text-slate-600">{message}</p>}
      <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50"><CalendarPlus className="h-4 w-4" />{saving ? 'Enviando…' : 'Solicitar horario'}</button>
    </form>
  );
}
