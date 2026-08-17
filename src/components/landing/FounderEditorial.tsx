'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { landingMedia } from '@/lib/media/landingMedia';

export function FounderEditorial() {
  return (
    <section id="faby" className="py-20 lg:py-32 bg-[#FAF6F3] text-[#111114] border-b border-[#E8E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Portrait (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[480px] sm:h-[580px] w-full overflow-hidden bg-[#E8E2DA] border border-[#E8E2DA]">
              {/* TODO(PRODUCTION): Replace with approved portrait of Leslie Fabiola Larico Zapana */}
              <img
                src={landingMedia.founder.portrait.src}
                alt={landingMedia.founder.portrait.alt}
                className="w-full h-full object-cover object-top"
              />

              {/* Founder Plaque */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#09090B]/95 backdrop-blur-md text-white p-5 text-xs font-sans border border-[#F6CADB]/20">
                <span className="text-[9px] uppercase tracking-widest text-[#C5A47C] block font-semibold">
                  Fundadora & Master Educator
                </span>
                <p className="font-editorial text-lg sm:text-xl font-bold mt-1 text-white">
                  Leslie Fabiola Larico Zapana
                </p>
                <p className="text-[11px] text-[#A8A49F] mt-0.5">
                  15+ Años de Experiencia en Salones de Madrid
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Editorial Copy & Authority (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 bg-[#FBE8EF] border border-[#F6CADB] px-3.5 py-1 text-xs font-bold text-[#B70055]">
                <Sparkles className="w-3.5 h-3.5 text-[#DD006B]" />
                <span className="uppercase tracking-widest text-[10px]">Dirección Académica & Fundadora</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#111114] tracking-tight leading-[1.05]">
                “La técnica no se improvisa. <br />
                <span className="italic font-normal text-[#DD006B]">Se aprende, se practica y se corrige.”</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#6E6763] font-sans leading-relaxed">
              <p>
                Más de <strong>15 años de trayectoria profesional</strong> en el sector de la belleza y la dirección de salones físicos en Madrid avalan una metodología fundamentada en el rigor higiénico-sanitario, la destreza manual y la atención al detalle.
              </p>
              <p>
                En <strong>FABY STUDIO ACADEMY</strong> no creemos en cursos pregrabados sin acompañamiento. Nuestro compromiso es supervisar personalmente tus avances para que domines Manicura Rusa, Volumen Ruso e Hidrafacial con la soltura y los acabados que exigen los clientes de alto ticket.
              </p>
            </div>

            {/* 2 Focus Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-[#FFFDFC] border border-[#E8E2DA] space-y-1.5">
                <span className="text-[10px] uppercase tracking-widest text-[#DD006B] font-bold block">
                  Mentoría Directa
                </span>
                <h3 className="font-editorial text-base font-bold text-[#111114]">
                  Corrección 1 a 1 de Prácticas
                </h3>
                <p className="text-xs text-[#6E6763] font-sans">
                  Revisión minuciosa de cada entrega fotográfica en macro antes de otorgar la acreditación.
                </p>
              </div>

              <div className="p-5 bg-[#FFFDFC] border border-[#E8E2DA] space-y-1.5">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A47C] font-bold block">
                  Enfoque de Negocio
                </span>
                <h3 className="font-editorial text-base font-bold text-[#111114]">
                  Rentabilidad en Cabina
                </h3>
                <p className="text-xs text-[#6E6763] font-sans">
                  Herramientas y pautas de costeo para fijar precios con margen seguro desde el primer día.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/cursos"
                className="inline-flex items-center justify-center space-x-2 bg-[#09090B] hover:bg-[#DD006B] text-[#FFFDFC] px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 group shadow-md"
              >
                <span>Explorar másteres con Leslie</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/34614236200?text=Hola%20Leslie%20(Faby),%20quisiera%20asesor%C3%ADa%20sobre%20los%20m%C3%A1steres%20profesionales"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-[#FFFDFC] hover:bg-[#FBE8EF] border border-[#E8E2DA] text-[#111114] px-6 py-4 text-xs font-semibold tracking-widest uppercase transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#DD006B]" />
                <span>Hablar con Leslie por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
