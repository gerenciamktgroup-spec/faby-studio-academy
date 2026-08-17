'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';

export function MasterclassShowcase() {
  const [activeTab, setActiveTab] = useState<'unas' | 'pestanas' | 'facial'>('unas');
  const [isPlaying, setIsPlaying] = useState(false);

  const demoVideos = {
    unas: {
      id: 'gMLz-995K-A',
      title: 'Muestra Formativa: Manicura Rusa Combinada & Esculpido Estructural',
      courseTitle: 'Máster Profesional en Uñas de Gel & Acrílico',
      duration: '45 min lecturas',
      tutor: 'Equipo docente FABY',
      posterImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=85&w=1200&auto=format&fit=crop',
      campusLink: '/campus/cursos/c2000000-0000-0000-0000-000000000002',
      detailsLink: '/cursos/unas-de-gel-y-acrilico',
      description: 'Manejo del micromotor con fresas de diamante rusas, deshidratación, colocación del molde paramétrico y nivelación con gel sin sensación de quemazón.',
    },
    pestanas: {
      id: 'FmcPn9DJ5ef',
      title: 'Muestra Formativa: Aislamiento Pestaña a Pestaña & Volumen Ruso',
      courseTitle: 'Especialización en Pestañas, Cejas & Volumen Ruso',
      duration: '35 min lecturas',
      tutor: 'Equipo docente FABY',
      posterImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=85&w=1200&auto=format&fit=crop',
      campusLink: '/campus/cursos/c1000000-0000-0000-0000-000000000001',
      detailsLink: '/cursos/extensiones-de-pestanas',
      description: 'Aislamiento milimétrico, simetría en visagismo de mirada y apertura manual de abanicos 2D–6D con micro-gota de adhesivo de polimerización rápida.',
    },
    facial: {
      id: 'o6Z52S9qJ5k',
      title: 'Muestra Formativa: Protocolo de Hidrafacial & Renovación Dérmica',
      courseTitle: 'Curso Superior de Cosmetología Facial & Hidrafacial',
      duration: '35 min lecturas',
      tutor: 'Equipo docente FABY',
      posterImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=85&w=1200&auto=format&fit=crop',
      campusLink: '/campus/cursos/c3000000-0000-0000-0000-000000000003',
      detailsLink: '/cursos/cosmetologia-facial',
      description: 'Diagnóstico clínico de biotipos cutáneos, desincrustación profunda con espátula ultrasónica e infusión dérmica de activos antioxidantes en cabina.',
    },
  };

  const current = demoVideos[activeTab];

  const handleTabChange = (tab: 'unas' | 'pestanas' | 'facial') => {
    setActiveTab(tab);
    setIsPlaying(false);
  };

  return (
    <section className="py-20 lg:py-32 bg-[#111114] text-[#FFFDFC] border-b border-[#1C1C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A47C]">
              Muestra de Experiencia Formativa
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[0.95]">
              Entra en una clase FABY.
            </h2>
            <p className="text-sm sm:text-base text-[#A8A49F] font-sans max-w-lg">
              Comprueba el nivel de detalle, la calidad de vídeo en alta definición y la claridad pedagógica con la que explicamos cada técnica.
            </p>
          </div>

          {/* Minimalist Tabs */}
          <div className="flex items-center space-x-2 border-b border-[#1C1C24] pb-2 overflow-x-auto">
            <button
              onClick={() => handleTabChange('unas')}
              className={`pb-2 px-3 text-xs uppercase tracking-widest font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'unas'
                  ? 'border-[#DD006B] text-white'
                  : 'border-transparent text-[#8A8682] hover:text-white'
              }`}
            >
              01 · Uñas de Gel
            </button>
            <button
              onClick={() => handleTabChange('pestanas')}
              className={`pb-2 px-3 text-xs uppercase tracking-widest font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'pestanas'
                  ? 'border-[#DD006B] text-white'
                  : 'border-transparent text-[#8A8682] hover:text-white'
              }`}
            >
              02 · Pestañas & Cejas
            </button>
            <button
              onClick={() => handleTabChange('facial')}
              className={`pb-2 px-3 text-xs uppercase tracking-widest font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'facial'
                  ? 'border-[#DD006B] text-white'
                  : 'border-transparent text-[#8A8682] hover:text-white'
              }`}
            >
              03 · Hidrafacial
            </button>
          </div>
        </div>

        {/* Video Player Card */}
        <div className="bg-[#09090B] border border-[#1C1C24] overflow-hidden">
          <div className="p-4 sm:p-5 bg-[#1C1C24] border-b border-[#2A2A35] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A47C] font-sans font-semibold">
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

          {/* Player / Poster Area */}
          <div className="aspect-video w-full bg-black relative flex items-center justify-center overflow-hidden">
            {!isPlaying ? (
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={current.posterImage}
                  alt={current.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent" />
                
                {/* Play Trigger Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-4 text-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#DD006B] hover:bg-[#B70055] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 group"
                    aria-label="Reproducir clase de demostración"
                  >
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
                  </button>
                  <p className="text-xs uppercase tracking-widest text-white font-semibold font-sans">
                    Haz clic para reproducir muestra formativa
                  </p>
                </div>
              </div>
            ) : (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={current.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            )}
          </div>

          <div className="p-6 bg-[#09090B] flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#1C1C24] text-[#FFFDFC]">
            <p className="text-xs sm:text-sm text-[#A8A49F] font-sans max-w-2xl leading-relaxed">
              {current.description}
            </p>

            <div className="flex items-center space-x-3 shrink-0">
              <Link
                href={current.detailsLink}
                className="bg-transparent border border-white/20 hover:border-white text-white px-5 py-3 text-xs font-semibold tracking-widest uppercase transition-colors"
              >
                Ver temario
              </Link>
              <Link
                href={current.campusLink}
                className="bg-[#FFFDFC] hover:bg-[#FBE8EF] text-[#09090B] px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-colors flex items-center space-x-2"
              >
                <Play className="w-3.5 h-3.5 fill-[#09090B]" />
                <span>Probar en campus</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
