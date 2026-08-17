'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#DD006B] text-[#FFFDFC] overflow-hidden">
      {/* Background Soft Deep Pink Vignette */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#DD006B] via-[#C90060] to-[#990044] -z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs font-bold text-white">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="uppercase tracking-[0.25em] text-[10px]">Tu Siguiente Paso Profesional</span>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.0]">
            Elige qué quieres aprender. <br />
            <span className="italic font-normal text-[#F6CADB]">Nosotros te ayudamos a empezar.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/90 font-sans max-w-xl mx-auto leading-relaxed">
            Formación técnica de alto nivel con práctica en modelos reales, supervisión directa de Leslie Fabiola y dos sedes físicas en Madrid.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/cursos"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#09090B] hover:bg-black text-[#FFFDFC] px-9 py-4 text-xs font-semibold tracking-widest uppercase transition-all shadow-xl group"
          >
            <span>Descubrir formaciones</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20asesor%C3%ADa%20para%20elegir%20mi%20m%C3%A1ster%20profesional"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white text-[#111114] hover:bg-[#FAF6F3] px-7 py-4 text-xs font-semibold tracking-widest uppercase transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-[#DD006B]" />
            <span>Hablar con una asesora</span>
          </a>
        </div>

        <p className="text-xs text-white/80 font-sans pt-2">
          Matrícula abierta para próximas convocatorias · Financiación en 3 cuotas sin intereses
        </p>
      </div>
    </section>
  );
}
