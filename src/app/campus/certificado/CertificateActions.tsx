'use client';

import { Download } from 'lucide-react';

export function CertificateActions() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 print:hidden"
    >
      <Download className="h-4 w-4" /> Imprimir o guardar como PDF
    </button>
  );
}
