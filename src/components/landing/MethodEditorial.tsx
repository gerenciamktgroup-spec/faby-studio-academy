'use client';

import React from 'react';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

export function MethodEditorial() {
  const steps = [
    {
      num: '01',
      title: 'Aprende',
      subtitle: 'Demostración Técnica Paso a Paso',
      description: 'Vídeos en alta definición con tomas macro, esquemas anatómicos y química de producto explicada por la docente.',
      highlight: false,
    },
    {
      num: '02',
      title: 'Practica',
      subtitle: 'Trabajo sobre Modelos Reales',
      description: 'El núcleo de la formación: desarrollas memoria muscular, control del torno, pinzas o espátula sobre modelos en salón o tu espacio.',
      highlight: true, // Dominant pillar as requested
    },
    {
      num: '03',
      title: 'Recibe correcciones',
      subtitle: 'Rúbricas Visuales 1 a 1',
      description: 'Subes fotos macro de tus prácticas. Leslie Fabiola y las tutoras colocan notas directas sobre simetría, ápice y cutícula.',
      highlight: false,
    },
    {
      num: '04',
      title: 'Demuestra',
      subtitle: 'Evaluación y Titulación Oficial',
      description: 'Superas la evaluación de 100 puntos y obtienes tu titulación profesional con código QR y verificación pública.',
      highlight: false,
    },
  ];

  const journeyPillars = [
    '01 Fundamentos anatómicos y bioseguridad',
    '02 Práctica continua con criterio técnico',
    '03 Corrección visual antes de atender clientas',
    '04 Creación de portafolio con acabados de salón',
    '05 Incorporación del servicio con tarifas seguras',
  ];

  return (
    <section id="metodo" className="py-20 lg:py-32 bg-[#111114] text-[#FFFDFC] border-b border-[#1C1C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A47C]">
            Metodología Pedagógica FABY
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[0.95]">
            Aquí no vienes solo a mirar. <br />
            <span className="italic font-normal text-[#F6CADB]">Vienes a practicar.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A8A49F] font-sans max-w-xl leading-relaxed">
            Un sistema formativo estructurado para asegurar que adquieras la destreza manual y el criterio profesional que demandan los salones de estética de Madrid.
          </p>
        </div>

        {/* 4 Steps Grid (With 02 Practica Dominating) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                step.highlight
                  ? 'bg-[#1C1C24] border-2 border-[#DD006B] shadow-xl relative'
                  : 'bg-[#09090B] border border-[#1C1C24]'
              }`}
            >
              {step.highlight && (
                <div className="absolute -top-3 left-6 bg-[#DD006B] text-white text-[9px] uppercase tracking-widest font-bold px-2.5 py-0.5 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Promesa Central</span>
                </div>
              )}

              <div className="space-y-4">
                <span
                  className={`font-editorial text-3xl sm:text-4xl font-bold block ${
                    step.highlight ? 'text-[#DD006B]' : 'text-[#C5A47C]'
                  }`}
                >
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

              <div className="pt-6 border-t border-[#2A2A35] text-[11px] text-[#A8A49F] font-sans flex items-center">
                <CheckCircle2
                  className={`w-3.5 h-3.5 mr-2 shrink-0 ${
                    step.highlight ? 'text-[#DD006B]' : 'text-[#C5A47C]'
                  }`}
                />
                <span>Supervisión continua</span>
              </div>
            </div>
          ))}
        </div>

        {/* Integrated Professional Evolution Strip */}
        <div className="p-8 bg-[#09090B] border border-[#1C1C24] space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A47C] font-semibold block">
              Tu Evolución Profesional
            </span>
            <h4 className="font-editorial text-xl sm:text-2xl font-bold text-white">
              De tu primera práctica al dominio del servicio
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2 border-t border-[#1C1C24]">
            {journeyPillars.map((pillar, idx) => (
              <div key={idx} className="text-xs text-[#A8A49F] font-sans flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DD006B] mt-1.5 shrink-0" />
                <span>{pillar}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#1C1C24] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E6763] gap-3">
            <p className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-2 text-[#C5A47C]" />
              La plataforma registra tu progreso real de aprendizaje activo durante cada lección.
            </p>
            <span className="text-[10px] uppercase tracking-widest text-[#A8A49F]">
              Auditoría Pedagógica Continua · Sedes Madrid
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
