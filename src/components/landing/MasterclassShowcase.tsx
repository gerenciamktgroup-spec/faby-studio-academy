'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';

export function MasterclassShowcase() {
  const [activeTab, setActiveTab] = useState<'unas' | 'pestanas' | 'facial'>('unas');

  const demoVideos = {
    unas: {
      id: 'gMLz-995K-A',
      title: 'Demostración Técnica: Manicura Rusa Combinada & Esculpido Estructural',
      courseTitle: 'Máster Profesional en Uñas de Gel & Acrílico',
      duration: '45 min lecturas',
      tutor: 'Profesora Faby (Leslie Larico)',
      campusLink: '/campus/cursos/c2000000-0000-0000-0000-000000000002',
      detailsLink: '/cursos/unas-de-gel-y-acrilico',
      description: 'Manejo del micromotor con fresas de diamante rusas, deshidratación, colocación del molde paramétrico y nivelación con gel sin sensación de quemazón.',
    },
    pestanas: {
      id: 'FmcPn9DJ5ef',
      title: 'Demostración Técnica: Aislamiento Pestaña a Pestaña & Volumen Ruso',
      courseTitle: 'Especialización en Pestañas, Cejas & Volumen Ruso',
      duration: '35 min lecturas',
      tutor: 'Laura Gómez · Tutora Senior',
      campusLink: '/campus/cursos/c1000000-0000-0000-0000-000000000001',
      detailsLink: '/cursos/extensiones-de-pestanas',
      description: 'Aislamiento milimétrico, simetría en visagismo de mirada y apertura manual de abanicos 2D–6D con micro-gota de adhesivo de polimerización rápida.',
    },
    facial: {
      id: 'o6Z52S9qJ5k',
      title: 'Demostración Técnica: Protocolo de Hidrafacial & Renovación Dérmica',
      courseTitle: 'Curso Superior de Cosmetología Facial & Hidrafacial',
      duration: '35 min lecturas',
      tutor: 'Profesora Faby (Leslie Larico)',
      campusLink: '/campus/cursos/c3000000-0000-0000-0000-000000000003',
      detailsLink: '/cursos/cosmetologia-facial',
      description: 'Diagnóstico clínico de biotipos cutáneos, desincrustación profunda con espátula ultrasónica e infusión dérmica de activos antioxidantes en cabina.',
    },
  };

  const current = demoVideos[activeTab];

  return (
    <section className="py-20 lg:py-32 bg-[#F8F5F1] text-[#0A0A0D] border-b border-[#E8E4DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6E6B68]">
              Muestra Pedagógica
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A0A0D] tracking-tight leading-[0.95]">
              Entra en una clase FABY.
            </h2>
            <p className="text-sm sm:text-base text-[#6E6B68] font-sans max-w-lg">
              Comprueba el nivel de detalle, la calidad de vídeo en alta definición y la claridad pedagógica con la que explicamos cada técnica.
            </p>
          </div>

          {/* Minimalist Tabs */}
          <div className="flex items-center space-x-2 border-b border-[#E8E4DF] pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('unas')}
              className={`pb-2 px-3 text-xs uppercase tracking-widest font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'unas'
                  ? 'border-[#0A0A0D] text-[#0A0A0D]'
                  : 'border-transparent text-[#8A8682] hover:text-[#0A0A0D]'
              }`}
            >
              01 · Uñas de Gel
            </button>
            <button
              onClick={() => setActiveTab('pestanas')}
              className={`pb-2 px-3 text-xs uppercase tracking-widest font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'pestanas'
                  ? 'border-[#0A0A0D] text-[#0A0A0D]'
                  : 'border-transparent text-[#8A8682] hover:text-[#0A0A0D]'
              }`}
            >
              02 · Pestañas & Cejas
            </button>
            <button
              onClick={() => setActiveTab('facial')}
              className={`pb-2 px-3 text-xs uppercase tracking-widest font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'facial'
                  ? 'border-[#0A0A0D] text-[#0A0A0D]'
                  : 'border-transparent text-[#8A8682] hover:text-[#0A0A0D]'
              }`}
            >
              03 · Hidrafacial
            </button>
          </div>
        </div>

        {/* Video Player Card */}
        <div className="bg-[#0A0A0D] border border-[#1C1C24] overflow-hidden">
          <div className="p-4 sm:p-5 bg-[#111117] border-b border-[#1C1C24] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-sans font-semibold">
                {current.courseTitle}
              </span>
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-white mt-0.5">
                {current.title}
              </h3>
            </div>
            <span className="text-xs text-[#A8A49F] font-sans shrink-0">
              {current.tutor} · {current.duration}
            </span>
          </div>

          <div className="aspect-video w-full bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`}
              title={current.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          <div className="p-6 bg-[#0A0A0D] flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#1C1C24] text-[#F8F5F1]">
            <p className="text-xs sm:text-sm text-[#A8A49F] font-sans max-w-2xl leading-relaxed">
              {current.description}
            </p>

            <div className="flex items-center space-x-3 shrink-0">
              <Link
                href={current.detailsLink}
                className="bg-transparent border border-[#F8F5F1]/30 hover:border-white text-[#F8F5F1] px-5 py-3 text-xs font-semibold tracking-widest uppercase transition-colors"
              >
                Ver temario
              </Link>
              <Link
                href={current.campusLink}
                className="bg-[#F8F5F1] hover:bg-white text-[#0A0A0D] px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-colors flex items-center space-x-2"
              >
                <Play className="w-3.5 h-3.5 fill-[#0A0A0D]" />
                <span>Probar en campus</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
