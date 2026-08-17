'use client';

import React from 'react';

export function ProfessionalJourney() {
  const steps = [
    {
      num: '01',
      title: 'Aprendes los fundamentos',
      description: 'Anatomía de la lámina ungular, párpado o estrato córneo, bioseguridad higiénico-sanitaria y química de producto.',
    },
    {
      num: '02',
      title: 'Practicas con criterio técnico',
      description: 'Ejercicios guiados paso a paso para desarrollar memoria muscular, control del micromotor, pinzas o espátula.',
    },
    {
      num: '03',
      title: 'Recibes correcciones',
      description: 'Evaluación directa con notas visuales en tus fotos macro para erradicar errores comunes antes de atender a clientas de pago.',
    },
    {
      num: '04',
      title: 'Construyes resultados',
      description: 'Creas tu propio portafolio con acabados de salón de lujo, durabilidad de 4 a 6 semanas y clientes satisfechas.',
    },
    {
      num: '05',
      title: 'Incorporas el servicio a tu actividad',
      description: 'Fijas tus tarifas con margen neto seguro y diplomas oficiales verificables para respaldar tu negocio o empleo.',
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#F8F5F1] text-[#0A0A0D] border-b border-[#E8E4DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6E6B68]">
            Tu Evolución
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A0A0D] tracking-tight leading-[0.95]">
            Una técnica no cambia tu futuro por saberla. <br />
            <span className="italic font-normal text-[#6E6B68]">Lo hace cuando sabes ejecutarla.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6E6B68] font-sans max-w-xl leading-relaxed">
            De tu primera práctica con incertidumbre a dominar un servicio demandado en salones de Madrid con seguridad y técnica limpia.
          </p>
        </div>

        {/* 5-Step Editorial Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#E8E4DF]">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className={`space-y-4 flex flex-col justify-between ${
                idx > 0 ? 'pt-6 md:pt-0 md:pl-6' : ''
              }`}
            >
              <div className="space-y-3">
                <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#C5A880] block">
                  {step.num}
                </span>
                <h3 className="font-editorial text-lg font-bold text-[#0A0A0D] leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-[#6E6B68] font-sans leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E4DF] text-[10px] uppercase tracking-widest text-[#8A8682] font-mono">
                Fase {step.num} · Progresión
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
