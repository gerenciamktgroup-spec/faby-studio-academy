'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Download, Lock, CheckCircle2, QrCode, ExternalLink, Sparkles } from 'lucide-react';

export default function CertificadoPage() {
  const [activePersona, setActivePersona] = useState<'camila' | 'lucia'>('camila');

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Selector to test both states */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-xs gap-3">
        <span className="text-slate-600 font-semibold flex items-center">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-rose-600" />
          Probar Estado de Certificación (Demo):
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => setActivePersona('camila')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activePersona === 'camila'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Camila Torres (92% - Certificado Listo)
          </button>
          <button
            onClick={() => setActivePersona('lucia')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activePersona === 'lucia'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Lucía Martínez (68% - En Progreso)
          </button>
        </div>
      </div>

      {activePersona === 'camila' ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                CERTIFICADO OFICIAL DE FINALIZACIÓN
              </span>
              <h1 className="text-2xl font-bold font-display text-slate-900 mt-2">Acreditación Académica</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/verificar-certificado/CERT-FS-DEMO-9988"
                target="_blank"
                className="bg-white border border-slate-200 hover:border-emerald-500 text-emerald-700 hover:text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Página de Verificación Pública</span>
              </Link>

              <button
                onClick={() => {
                  const content = `
═══════════════════════════════════════════════════════════
               FABY STUDIO ACADEMY
        CERTIFICADO DEMOSTRATIVO DE FINALIZACIÓN
═══════════════════════════════════════════════════════════

Se otorga el presente reconocimiento a:

                   CAMILA TORRES

Por haber completado satisfactoriamente el programa
de 50 horas lectivas activas correspondiente al:

    Curso Profesional de Extensiones de Pestañas

Código de Verificación: CERT-FS-DEMO-9988
Fecha de Emisión: 08 de Agosto de 2026
Calificación Final: 92% (Excelente)
Firmado por: Profesora Faby — Dirección Académica
Huella de Integridad SHA-256:
9a8f4c2e1b7d5e6a3f0c8b9d4e2a1f7c5e6d8a9b0c1e2f3a4b5c6d7e8f9a0b1c

Validación Pública: https://fabystudio.academy/verificar-certificado/CERT-FS-DEMO-9988

═══════════════════════════════════════════════════════════
`;
                  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `CERTIFICADO_DEMO_CAMILA_TORRES_${Date.now()}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2 shadow-md shadow-emerald-600/20"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Diploma Demo</span>
              </button>
            </div>
          </div>

          {/* Certificate Design Card (Clean White Luxury with Gold Border) */}
          <div className="bg-white border-2 border-amber-300 p-8 sm:p-12 rounded-3xl space-y-8 text-center relative overflow-hidden shadow-xl">
            <div className="space-y-2">
              <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-700 mx-auto flex items-center justify-center font-bold text-xl border border-amber-300">
                FS
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-widest uppercase">
                FABY STUDIO <span className="text-rose-600">ACADEMY</span>
              </h2>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">CERTIFICADO OFICIAL DE FINALIZACIÓN</p>
            </div>

            <div className="space-y-3 max-w-xl mx-auto">
              <p className="text-xs text-slate-500">Se otorga el presente reconocimiento oficial a:</p>
              <h3 className="text-3xl font-extrabold text-slate-900 font-display">Camila Torres</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Por haber completado satisfactoriamente el programa de 50 horas lectivas activas correspondiente al:
              </p>
              <p className="text-lg font-bold text-rose-600 font-display">
                Curso Profesional de Extensiones de Pestañas
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="text-left">
                <p className="font-semibold text-slate-800">Código de Verificación:</p>
                <Link
                  href="/verificar-certificado/CERT-FS-DEMO-9988"
                  className="font-mono text-amber-700 font-bold hover:underline flex items-center space-x-1"
                >
                  <span>CERT-FS-DEMO-9988</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <Link
                href="/verificar-certificado/CERT-FS-DEMO-9988"
                className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-200 hover:border-emerald-400 transition-colors group shadow-2xs"
              >
                <QrCode className="w-10 h-10 text-slate-800 group-hover:scale-105 transition-transform" />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-900 uppercase flex items-center">
                    <span>QR Verificable</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-1 text-emerald-600" />
                  </p>
                  <p className="text-[9px] text-slate-500">Comprobar autenticidad oficial</p>
                </div>
              </Link>

              <div className="text-right">
                <p className="font-semibold text-slate-800">Firma Dirección:</p>
                <p className="font-display font-bold text-rose-600">Profesora Faby</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">Certificado Actualmente Bloqueado</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Lucía Martínez ha completado el <strong className="text-slate-900">68%</strong> del curso (34 de 50 horas activas). Debes finalizar las evaluaciones restantes y el proyecto final de volumen ruso para desbloquear tu acreditación oficial.
          </p>
          <div className="pt-2">
            <Link
              href="/campus/cursos/c1000000-0000-0000-0000-000000000001"
              className="inline-flex items-center space-x-1.5 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <span>Continuar con el Módulo 4</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
