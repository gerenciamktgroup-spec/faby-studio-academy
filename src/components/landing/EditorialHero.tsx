'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { landingMedia } from '@/lib/media/landingMedia';

export function EditorialHero() {
  return (
    <section className="relative bg-[#FAF6F3] text-[#111114] pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E8E2DA] overflow-hidden">
      {/* Background Soft Powder/Blush Ambient Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FBE8EF]/60 rounded-full blur-3xl pointer-events-none -z-0 translate-x-1/3 -translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column (Approx 45%) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 text-left">
            {/* Eyebrow with Faby Pink Accent */}
            <div className="inline-flex items-center space-x-2 bg-[#FBE8EF] border border-[#F6CADB] px-3.5 py-1.5 rounded-none">
              <Sparkles className="w-3.5 h-3.5 text-[#DD006B]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B70055]">
                Academia Profesional · Madrid
              </span>
            </div>

            {/* Editorial Glam H1 in Bodoni Moda */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#111114] leading-[0.95]">
              Aprende <br />
              <span className="italic font-normal text-[#DD006B]">belleza.</span> <br />
              Domina la técnica. <br />
              Hazla tu profesión.
            </h1>

            {/* Subcopy */}
            <p className="text-base sm:text-lg text-[#6E6763] leading-relaxed max-w-lg font-sans font-normal">
              Formación profesional en uñas, mirada y estética facial con práctica real sobre modelos, acompañamiento docente y dos sedes en Madrid.
            </p>

            {/* Main CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/cursos"
                  className="inline-flex items-center justify-center space-x-2 bg-[#09090B] hover:bg-[#DD006B] text-[#FFFDFC] px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 group shadow-md"
                >
                  <span>Descubrir formaciones</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20asesor%C3%ADa%20personalizada%20sobre%20las%20formaciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-[#FFFDFC] hover:bg-[#FBE8EF] text-[#111114] border border-[#E8E2DA] hover:border-[#DD006B] px-6 py-4 text-xs font-semibold tracking-widest uppercase transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#DD006B]" />
                  <span>Hablar con una asesora</span>
                </a>
              </div>

              <p className="text-xs text-[#8A8682] font-sans">
                Formaciones desde 380 € · Pago en 3 cuotas sin intereses · Sedes Plaza Aluche & Vallecas
              </p>
            </div>
          </div>

          {/* Right Image Composition (Approx 55%) - Large Editorial Glam Photography */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-[460px] sm:h-[560px] lg:h-[640px] w-full overflow-hidden bg-[#E8E2DA] border border-[#E8E2DA]">
              <img
                src={landingMedia.hero.main.src}
                alt={landingMedia.hero.main.alt}
                className="w-full h-full object-cover object-center"
              />

              {/* Faby Studio & Founder Floating Brand Plaque */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-[#09090B]/95 backdrop-blur-md text-[#FFFDFC] p-5 sm:p-6 border border-[#F6CADB]/20 max-w-sm">
                <div className="flex items-center justify-between border-b border-[#2A2A35] pb-2 mb-2">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A47C] font-semibold">
                    Dirección Académica
                  </span>
                  <span className="text-[10px] text-[#F6CADB] font-mono">Madrid</span>
                </div>
                <p className="font-editorial text-lg sm:text-xl font-bold text-white leading-tight">
                  Leslie Fabiola Larico Zapana
                </p>
                <p className="text-xs text-[#A8A49F] mt-1 font-sans">
                  15+ Años de Experiencia · Salones Plaza Aluche & Vallecas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
