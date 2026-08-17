'use client';

import React from 'react';
import { Check, X } from 'lucide-react';

export function ComparisonMatrix() {
  const comparisonRows = [
    {
      feature: 'Sedes físicas de respaldo en Madrid (Aluche & Vallecas)',
      faby: true,
      other: false,
    },
    {
      feature: 'Evaluación y corrección 1 a 1 de prácticas sobre modelo real',
      faby: true,
      other: false,
    },
    {
      feature: 'Diplomas digitales con firma hash SHA-256 y QR verificable',
      faby: true,
      other: false,
    },
    {
      feature: 'Calculadora interactiva de rentabilidad y costes por servicio',
      faby: true,
      other: false,
    },
    {
      feature: 'Trazabilidad de horas y seguimiento activo en el Campus',
      faby: true,
      other: false,
    },
    {
      feature: 'Comunidad privada de alumnas y soporte directo de la docente',
      faby: true,
      other: false,
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-200 px-3.5 py-1 rounded-full">
            Diferenciador Exclusivo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
            ¿Por Qué Faby Studio Academy Marca la Diferencia?
          </h2>
          <p className="text-sm text-slate-600">
            Compara nuestro modelo de formación integral frente a los cursos convencionales del mercado.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          <div className="grid grid-cols-3 bg-slate-900 text-white p-4 sm:p-5 text-xs sm:text-sm font-bold">
            <div>Característica</div>
            <div className="text-center text-rose-400 font-extrabold">FABY STUDIO ACADEMY</div>
            <div className="text-center text-slate-400">Otros Cursos Online</div>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-3 p-4 sm:p-5 items-center ${
                  idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'
                }`}
              >
                <span className="font-semibold text-slate-800">{row.feature}</span>
                <span className="text-center text-emerald-600 font-bold flex justify-center">
                  <Check className="w-5 h-5" />
                </span>
                <span className="text-center text-rose-400 flex justify-center">
                  <X className="w-5 h-5" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
