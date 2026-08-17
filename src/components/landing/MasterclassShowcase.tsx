'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Video, Play, ArrowRight } from 'lucide-react';

export function MasterclassShowcase() {
  const [activeTab, setActiveTab] = useState<'unas' | 'pestanas' | 'facial'>('unas');

  const demoVideos = {
    unas: {
      id: 'gMLz-995K-A',
      title: 'Master Class 1.1: Manicura Rusa Combinada & Esculpido Estructural',
      courseTitle: 'Máster Profesional en Uñas de Gel & Acrílico Premium',
      duration: '45 min',
      tutor: 'Profesora Faby (Leslie Larico)',
      campusLink: '/campus/cursos/c2000000-0000-0000-0000-000000000002',
      detailsLink: '/cursos/unas-de-gel-y-acrilico',
      description: 'Demostración paso a paso de preparación con torno, deshidratadores, colocación de molde y control del ápice con gel autonivelante.',
    },
    pestanas: {
      id: 'FmcPn9DJ5ef',
      title: 'Master Class 1.1: Aplicación Técnica Clásica Pelo a Pelo (1x1)',
      courseTitle: 'Especialización en Pestañas, Cejas & Volumen Ruso',
      duration: '35 min',
      tutor: 'Laura Gómez',
      campusLink: '/campus/cursos/c1000000-0000-0000-0000-000000000001',
      detailsLink: '/cursos/extensiones-de-pestanas',
      description: 'Aislamiento milimétrico pestaña a pestaña, visagismo con henna, diseño de cejas y manejo de micro-gota de adhesivo.',
    },
    facial: {
      id: 'o6Z52S9qJ5k',
      title: 'Master Class 1.1: Protocolo de Hidrafacial & Limpieza Profunda en Cabina',
      courseTitle: 'Curso Superior de Cosmetología Facial & Hidrafacial',
      duration: '35 min',
      tutor: 'Profesora Faby (Leslie Larico)',
      campusLink: '/campus/cursos/c3000000-0000-0000-0000-000000000003',
      detailsLink: '/cursos/cosmetologia-facial',
      description: 'Diagnóstico de biotipo cutáneo, protocolo de Hidrafacial para renovación celular, desincrustación con espátula ultrasónica y cierre de poros.',
    },
  };

  const current = demoVideos[activeTab];

  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-rose-900/60 border border-rose-500/40 px-3.5 py-1 rounded-full text-xs font-bold text-rose-300">
            <Video className="w-3.5 h-3.5 text-rose-400" />
            <span>CLASES DE DEMOSTRACIÓN EN DIRECTO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
            Mira una Master Class Real de Nuestro Campus
          </h2>
          <p className="text-sm text-slate-400">
            Experimenta la calidad pedagógica y definición de vídeo de nuestras clases teóricas y prácticas.
          </p>

          {/* Video Course Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveTab('unas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'unas'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              💅 Uñas de Gel & Acrílico
            </button>
            <button
              onClick={() => setActiveTab('pestanas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pestanas'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              👁️ Pestañas, Cejas & Henna
            </button>
            <button
              onClick={() => setActiveTab('facial')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'facial'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🧴 Cosmetología & Hidrafacial
            </button>
          </div>
        </div>

        {/* Video Player Card */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl max-w-5xl mx-auto">
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-0.5">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                  {current.courseTitle}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">{current.title}</h3>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-400 shrink-0">
              <span className="bg-slate-800 px-2.5 py-1 rounded-lg">Docente: {current.tutor}</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded-lg">{current.duration}</span>
            </div>
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

          <div className="p-5 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800">
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {current.description}
            </p>
            <div className="flex items-center space-x-3 shrink-0">
              <Link
                href={current.detailsLink}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center"
              >
                <span>Temario</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
              <Link
                href={current.campusLink}
                className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-rose-600/30 transition-all flex items-center space-x-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Probar en Campus</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
