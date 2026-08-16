'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Award } from 'lucide-react';

export function IssueCertificateButton({ enrollmentId }: { enrollmentId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const issue = async () => {
    if (!window.confirm('¿Emitir el certificado definitivo para esta matrícula?')) return;
    setLoading(true);
    setError(null);
    const response = await fetch('/api/certificates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enrollmentId }),
    });
    const payload = (await response.json()) as { error?: string };
    setLoading(false);
    if (!response.ok) return setError(payload.error ?? 'No se pudo emitir el certificado.');
    router.refresh();
  };

  return (
    <div className="space-y-1">
      <button type="button" onClick={() => void issue()} disabled={loading} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-60"><Award className="h-3.5 w-3.5" />{loading ? 'Emitiendo…' : 'Emitir certificado'}</button>
      {error && <p className="max-w-xs text-[10px] text-red-700">{error}</p>}
    </div>
  );
}
