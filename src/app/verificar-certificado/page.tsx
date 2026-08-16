'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Award,
  Search,
  Clock,
} from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function PublicCertificateSearchPage() {
  const router = useRouter();
  const [certCode, setCertCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = certCode.trim();
    if (!cleanCode) {
      setError('Por favor, introduce un código de certificado válido.');
      return;
    }
    router.push(`/verificar-certificado/${encodeURIComponent(cleanCode)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        {/* Title & Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>PORTAL OFICIAL DE VALIDACIÓN DE TÍTULOS — FABY STUDIO ACADEMY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
            Verificación de Certificación Digital
          </h1>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Comprobación pública e inalterable de diplomas y acreditaciones profesionales emitida con firma criptográfica SHA-256 y trazabilidad de horas reales activas.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Introduce el Código Único del Certificado
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={certCode}
                  onChange={(e) => {
                    setCertCode(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Ej. FABY-2026-1A2B3C4D5E6F"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-emerald-500 uppercase"
                />
              </div>

              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2 shrink-0 hover:scale-[1.02]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verificar Diploma</span>
              </button>
            </div>

            {error && (
              <p className="text-xs text-rose-600 font-semibold">{error}</p>
            )}
          </form>

        </div>

        {/* Verification Guarantee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900">Firma Hash SHA-256</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Inmune a falsificaciones mediante sellado criptográfico en base de datos append-only.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900">Horas Reales Auditadas</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Cumple la Orden TMS/369/2019 con trazabilidad de tiempo activo verificado cada 45 segundos.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900">Rúbrica Docente Oficial</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Acreditación respaldada por evaluación práctica en modelo real con nota superior a 70/100.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
