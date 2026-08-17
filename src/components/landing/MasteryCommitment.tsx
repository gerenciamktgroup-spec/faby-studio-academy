'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function MasteryCommitment() {
  const commitments = [
    {
      title: 'Programa Estructurado Paso a Paso',
      description: 'Sin saltos técnicos ni explicaciones apresuradas. Cada lección profundiza en anatomía, química y ejecución de salón.',
    },
    {
      title: 'Práctica Guiada sobre Modelos',
      description: 'Protocolos de entrega fotográfica macro para que la docente analice el acabado antes de avanzar de módulo.',
    },
    {
      title: 'Correcciones y Feedback Personalizado',
      description: 'Rúbricas detalladas con notas directas de Leslie Fabiola para corregir postura, ángulo de limado y presión.',
    },
    {
      title: 'Evaluación Técnica de 100 Puntos',
      description: 'Garantía de que solo obtienes tu titulación cuando demuestras destreza real y estándares de bioseguridad.',
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#F8F5F1] text-[#0A0A0D] border-b border-[#E8E4DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6E6B68]">
            Nuestro Compromiso Docente
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A0A0D] tracking-tight leading-[0.95]">
            No te entregamos un vídeo. <br />
            <span className="italic font-normal text-[#6E6B68]">Te acompañamos hasta la evaluación.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6E6B68] font-sans max-w-xl leading-relaxed">
            Nuestro objetivo no es acumular reproducciones en una pantalla, sino asegurarnos de que adquieras la destreza y soltura necesarias para trabajar profesionalmente.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {commitments.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E8E4DF] p-8 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="font-editorial text-2xl font-bold text-[#C5A880] block">
                  0{idx + 1}
                </span>
                <h3 className="font-editorial text-xl font-bold text-[#0A0A0D] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6B68] font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E4DF] flex items-center text-[11px] text-[#8A8682] font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#DD006B] mr-2 shrink-0" />
                <span>Supervisión continua</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action Line */}
        <div className="p-8 bg-[#0A0A0D] text-[#F8F5F1] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-editorial text-xl font-bold text-white">
              Titulación técnica con validez profesional
            </h3>
            <p className="text-xs text-[#A8A49F] font-sans">
              Diplomas oficiales respaldados por nuestra sede física en Madrid.
            </p>
          </div>

          <Link
            href="/cursos"
            className="inline-flex items-center justify-center space-x-2 bg-[#F8F5F1] hover:bg-white text-[#0A0A0D] px-8 py-3.5 text-xs font-semibold tracking-widest uppercase transition-colors shrink-0 group"
          >
            <span>Elegir especialidad</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
