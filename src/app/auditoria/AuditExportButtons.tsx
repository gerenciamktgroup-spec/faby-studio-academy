'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';

export function AuditExportButtons() {
  const [exporting, setExporting] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const download = async (format: 'csv' | 'json') => {
    setExporting(format);
    setMessage('');
    try {
      const response = await fetch('/api/audit/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format }),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error ?? 'No se pudo generar el archivo.');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `faby-auditoria-${new Date().toISOString().slice(0, 10)}.${format}`;
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage(`Exportación ${format.toUpperCase()} generada con ${response.headers.get('X-Record-Count') ?? 0} registros.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo generar la exportación.');
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {(['csv', 'json'] as const).map((format) => (
        <button key={format} type="button" onClick={() => download(format)} disabled={Boolean(exporting)} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50"><Download className="h-4 w-4" />{exporting === format ? 'Generando…' : `Exportar ${format.toUpperCase()}`}</button>
      ))}
      {message && <p className="w-full text-xs font-semibold text-slate-600">{message}</p>}
    </div>
  );
}
