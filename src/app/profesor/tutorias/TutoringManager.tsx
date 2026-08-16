'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function TutoringManager({ sessionId, currentStatus }: { sessionId: string; currentStatus: string }) {
  const router = useRouter();
  const [meetingLink, setMeetingLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (status: 'scheduled' | 'completed' | 'cancelled') => {
    setLoading(true);
    setError(null);
    const response = await fetch('/api/tutoring', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, status, meetingLink: meetingLink || undefined }),
    });
    const payload = (await response.json()) as { error?: string };
    setLoading(false);
    if (!response.ok) return setError(payload.error ?? 'No se pudo actualizar la tutoría.');
    router.refresh();
  };

  if (currentStatus === 'completed' || currentStatus === 'cancelled') return null;
  return (
    <div className="space-y-2">
      {currentStatus === 'requested' && <input type="url" value={meetingLink} onChange={(event) => setMeetingLink(event.target.value)} placeholder="https://meet.example.com/..." className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs" />}
      <div className="flex flex-wrap gap-2">
        {currentStatus === 'requested' && <button disabled={loading} onClick={() => void update('scheduled')} className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-60">Confirmar</button>}
        {currentStatus === 'scheduled' && <button disabled={loading} onClick={() => void update('completed')} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white disabled:opacity-60">Marcar completada</button>}
        <button disabled={loading} onClick={() => void update('cancelled')} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 disabled:opacity-60">Cancelar</button>
      </div>
      {error && <p className="text-[10px] text-red-700">{error}</p>}
    </div>
  );
}
