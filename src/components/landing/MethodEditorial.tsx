'use client';

import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

export function MethodEditorial() {
  const steps = [
    {
      num: '01',
      title: 'Aprende',
      subtitle: 'Demostración Técnica Paso a Paso',
      description: 'Vídeos en alta definición con tomas macro, esquemas anatómicos y dosificación química exacta explicada por la docente.',
    },
    {
      num: '02',
      title: 'Practica',
      subtitle: 'Ejercicios sobre Modelos Reales',
      description: 'Pones en práctica cada protocolo en tu entorno o en los workshops de Madrid, trabajando la memoria muscular y el control de herramientas.',
    },
    {
      num: '03',
      title: 'Recibe correcciones',
      subtitle: 'Rúbricas Visuales 1 a 1',
      description: 'Subes fotografías detalladas de tus trabajos. Leslie Fabiola y el equipo docente colocan pines de corrección sobre ápice, simetría y cutícula.',
    },
    {
      num: '04',
      title: 'Demuestra',
      subtitle: 'Evaluación y Diploma Verificable',
      description: 'Superas la evaluación final de 100 puntos y obtienes tu titulación profesional con código QR y validación digital criptográfica.',
    },
  ];

  return (
    <section id="metodo" className="py-20 lg:py-32 bg-[#0A0A0D] text-[#F8F5F1] border-b border-[#1C1C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A880]">
            Metodología Pedagógica FABY
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[0.95]">
            Aquí no vienes solo a mirar. <br />
            <span className="italic font-normal text-[#A8A49F]">Vienes a practicar.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A8A49F] font-sans max-w-xl leading-relaxed">
            Un sistema formativo estructurado en 4 etapas diseñado para garantizar que cada alumna adquiera destreza manual y criterio profesional de salón.
          </p>
        </div>

        {/* 4 Editorial Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#1C1C24]">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className={`space-y-6 flex flex-col justify-between ${
                idx > 0 ? 'pt-6 lg:pt-0 lg:pl-8' : ''
              }`}
            >
              <div className="space-y-4">
                <span className="font-editorial text-3xl sm:text-4xl font-bold text-[#C5A880]">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-white leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#A8A49F] font-sans font-semibold mt-1">
                    {step.subtitle}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-[#8A8682] font-sans leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1C1C24] text-[11px] text-[#A8A49F] font-sans flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#DD006B] mr-2 shrink-0" />
                <span>Criterio de salón profesional</span>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Technology Notice (Discrete & Responsible) */}
        <div className="pt-8 border-t border-[#1C1C24] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E6B68] gap-4">
          <p className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-2 text-[#C5A880]" />
            La plataforma registra tu progreso real de aprendizaje activo durante cada lección.
          </p>
          <span className="text-[10px] uppercase tracking-widest text-[#A8A49F]">
            Auditoría Pedagógica Continua · Sedes Madrid
          </span>
        </div>
      </div>
    </section>
  );
}
