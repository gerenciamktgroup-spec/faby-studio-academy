'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, ArrowDown } from 'lucide-react';

export function EditorialHero() {
  return (
    <section className="relative bg-[#F8F5F1] text-[#0A0A0D] pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E8E4DF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Text Column (~45%) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DD006B]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6E6B68]">
                Academia Profesional · Madrid
              </span>
            </div>

            {/* Editorial H1 */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#0A0A0D] leading-[0.95]">
              Aprende belleza. <br />
              <span className="italic font-normal text-[#6E6B68]">Domina la técnica.</span> <br />
              Hazla tu profesión.
            </h1>

            {/* Subcopy */}
            <p className="text-base sm:text-lg text-[#6E6B68] leading-relaxed max-w-lg font-sans font-normal">
              Formación profesional en uñas, mirada y estética facial con práctica real sobre modelos, acompañamiento docente y dos sedes en Madrid.
            </p>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/cursos"
                  className="inline-flex items-center justify-center space-x-2 bg-[#0A0A0D] hover:bg-[#1C1C24] text-[#F8F5F1] px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-200 group"
                >
                  <span>Descubrir formaciones</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20asesor%C3%ADa%20personalizada%20sobre%20las%20formaciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-transparent hover:bg-[#E8E4DF]/50 text-[#0A0A0D] border border-[#0A0A0D] px-6 py-4 text-xs font-semibold tracking-widest uppercase transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#DD006B]" />
                  <span>Hablar con una asesora</span>
                </a>
              </div>

              <p className="text-xs text-[#8A8682] font-sans">
                Formaciones desde 380 € · Pago en 3 cuotas · Plaza Aluche & Vallecas
              </p>
            </div>

            {/* Smooth Anchor down to method */}
            <div className="pt-4 hidden sm:block">
              <a
                href="#metodo"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#6E6B68] hover:text-[#0A0A0D] transition-colors"
              >
                <ArrowDown className="w-3.5 h-3.5 text-[#DD006B]" />
                <span>Descubre el método FABY</span>
              </a>
            </div>
          </div>

          {/* Right Image Column (~55%) - Large Editorial Photography */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-[440px] sm:h-[540px] lg:h-[620px] w-full overflow-hidden bg-[#E8E4DF]">
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=85&w=1200&auto=format&fit=crop"
                alt="Manicura y técnica estética profesional en FABY STUDIO ACADEMY Madrid"
                className="w-full h-full object-cover object-center"
              />

              {/* Minimal Editorial Badge Overlay (Not a heavy card) */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-[#0A0A0D]/90 backdrop-blur-md text-[#F8F5F1] p-5 sm:p-6 border border-[#F8F5F1]/10 max-w-sm">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                  Edición 2026 · Sedes Madrid
                </span>
                <p className="font-editorial text-lg sm:text-xl font-bold mt-1 text-white leading-tight">
                  Técnicas avanzadas con corrección visual sobre modelo real
                </p>
                <p className="text-xs text-[#A8A49F] mt-1 font-sans">
                  Manicura Rusa · Volumen Ruso · Hidrafacial
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
