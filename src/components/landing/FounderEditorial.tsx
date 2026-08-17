'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export function FounderEditorial() {
  return (
    <section id="faby" className="py-20 lg:py-32 bg-[#F8F5F1] text-[#0A0A0D] border-b border-[#E8E4DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Large Editorial Portrait (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[480px] sm:h-[580px] w-full overflow-hidden bg-[#E8E4DF] border border-[#E8E4DF]">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=85&w=900&auto=format&fit=crop"
                alt="Leslie Fabiola Larico Zapana · Directora y Master Educator en Madrid"
                className="w-full h-full object-cover object-top"
              />

              {/* Minimal caption badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0A0A0D]/90 backdrop-blur-md text-white p-4 text-xs font-sans">
                <span className="text-[9px] uppercase tracking-widest text-[#C5A880] block font-semibold">
                  Fundadora & Master Educator
                </span>
                <p className="font-editorial text-base font-bold mt-0.5">
                  Leslie Fabiola Larico Zapana
                </p>
                <p className="text-[11px] text-[#A8A49F]">
                  15+ Años de Experiencia en Salones de Madrid
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Editorial Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6E6B68]">
                Fundadora · Master Educator
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0A0A0D] tracking-tight leading-[1.05]">
                “La técnica no se improvisa. <br />
                <span className="italic font-normal text-[#6E6B68]">Se aprende, se practica y se corrige.”</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#6E6B68] font-sans leading-relaxed">
              <p>
                Más de <strong>15 años de ejercicio profesional</strong> y miles de servicios realizados en nuestras sedes de Madrid avalan una metodología centrada en el rigor, la higiene y la precisión milimétrica.
              </p>
              <p>
                Nuestra misión en <strong>FABY STUDIO ACADEMY</strong> no es entregarte grabaciones genéricas sin supervisión, sino guiarte de forma directa para que entiendas la química de los productos, el manejo seguro del instrumental y la correcta ejecución sobre clientes reales.
              </p>
            </div>

            {/* 2 Key Credibility Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-white border border-[#E8E4DF] space-y-1.5">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                  Acompañamiento 1 a 1
                </span>
                <h3 className="font-editorial text-base font-bold text-[#0A0A0D]">
                  Corrección Técnica Directa
                </h3>
                <p className="text-xs text-[#6E6B68] font-sans">
                  Revisión minuciosa de cada práctica sobre modelo real con notas pedagógicas personalizadas.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E8E4DF] space-y-1.5">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                  Criterio de Negocio
                </span>
                <h3 className="font-editorial text-base font-bold text-[#0A0A0D]">
                  Rentabilidad en Cabina
                </h3>
                <p className="text-xs text-[#6E6B68] font-sans">
                  Herramientas y pautas para costear materiales, fijar tarifas y brindar un servicio premium.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#metodo"
                className="inline-flex items-center justify-center space-x-2 bg-[#0A0A0D] hover:bg-[#1C1C24] text-[#F8F5F1] px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-colors group"
              >
                <span>Conoce el método FABY</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <span className="text-xs text-[#8A8682] font-sans text-center sm:text-left">
                Sede Plaza Aluche · Sede Puente de Vallecas · Madrid
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
