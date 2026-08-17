'use client';

import React from 'react';
import { Check, Minus } from 'lucide-react';

export function ComparisonMatrix() {
  const comparisonRows = [
    {
      feature: 'Sedes físicas de respaldo en Madrid (Aluche & Vallecas)',
      faby: true,
      other: false,
    },
    {
      feature: 'Evaluación y corrección 1 a 1 sobre fotos macro de tus modelos',
      faby: true,
      other: false,
    },
    {
      feature: 'Diploma con código QR único y validación digital pública',
      faby: true,
      other: false,
    },
    {
      feature: 'Calculadora de costes por servicio y rentabilidad en cabina',
      faby: true,
      other: false,
    },
    {
      feature: 'Registro de tiempo activo real (sin acumular horas en reposo)',
      faby: true,
      other: false,
    },
    {
      feature: 'Tutorías y contacto directo con la docente durante la formación',
      faby: true,
      other: false,
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#F8F5F1] text-[#0A0A0D] border-b border-[#E8E4DF]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6E6B68]">
            Diferenciador Metodológico
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A0A0D] tracking-tight leading-[0.95]">
            No todos los cursos enseñan de la misma manera.
          </h2>
          <p className="text-sm sm:text-base text-[#6E6B68] font-sans">
            Compara los pilares de rigor técnico de nuestra academia frente a las formaciones en vídeo convencionales.
          </p>
        </div>

        {/* Minimal Editorial Table */}
        <div className="bg-white border border-[#E8E4DF] overflow-hidden">
          <div className="grid grid-cols-12 bg-[#0A0A0D] text-white p-5 sm:p-6 text-xs uppercase tracking-widest font-semibold">
            <div className="col-span-6 sm:col-span-7">Pilar Formativo</div>
            <div className="col-span-3 sm:col-span-3 text-center text-[#C5A880]">
              FABY STUDIO
            </div>
            <div className="col-span-3 sm:col-span-2 text-center text-[#8A8682]">
              Cursos Estándar
            </div>
          </div>

          <div className="divide-y divide-[#E8E4DF] text-xs sm:text-sm font-sans">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-5 sm:p-6 items-center hover:bg-[#F8F5F1]/50 transition-colors"
              >
                <div className="col-span-6 sm:col-span-7 font-medium text-[#0A0A0D] pr-4">
                  {row.feature}
                </div>

                <div className="col-span-3 sm:col-span-3 flex justify-center text-[#0A0A0D]">
                  <span className="w-6 h-6 rounded-full bg-[#0A0A0D] text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </span>
                </div>

                <div className="col-span-3 sm:col-span-2 flex justify-center text-[#8A8682]">
                  <Minus className="w-4 h-4 text-[#C5A880]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
