'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export function StudentStories() {
  const featuredStory = {
    name: 'Lucía Ramírez',
    location: 'Madrid · Sede Plaza Aluche',
    course: 'Máster Profesional en Uñas de Gel & Acrílico',
    quote: 'Pasé de tener dudas con la preparación y ver cómo el producto se desprendía a las dos semanas, a dominar la manicura rusa y el ápice estructural. La corrección 1 a 1 de la profesora Leslie sobre fotos macro me dio la seguridad que ningún vídeo de internet te puede dar.',
    achievement: 'Especialista en Uñas Esculpidas · Salón Propio en Madrid',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=85&w=800&auto=format&fit=crop',
    certificateId: 'MAD-2026-UNAS-8F3A',
  };

  const microStories = [
    {
      name: 'Carmen Delgado',
      location: 'Madrid · Puente de Vallecas',
      course: 'Especialización en Pestañas & Volumen Ruso',
      quote: 'El módulo de abanicado manual 2D-6D y la tabla de visagismo con henna cambiaron la simetría y retención de mis sets.',
      achievement: 'Lash Artist Independiente',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=85&w=400&auto=format&fit=crop',
    },
    {
      name: 'Valeria Montoya',
      location: 'Madrid · Aluche',
      course: 'Curso Superior de Cosmetología Facial',
      quote: 'Entender la química de los ácidos y la aparatología en cabina me permitió estructurar protocolos de Hidrafacial con criterio dermatológico.',
      achievement: 'Cosmetóloga en Cabina',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=85&w=400&auto=format&fit=crop',
    },
    {
      name: 'Sara Benítez',
      location: 'Madrid',
      course: 'Máster Profesional en Uñas de Gel',
      quote: 'Empecé desde cero absoluto. En 8 semanas de práctica guiada logré el control del torno y estructuras limpias.',
      achievement: 'Técnica de Manicura Rusa',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=85&w=400&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#0A0A0D] text-[#F8F5F1] border-b border-[#1C1C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A880]">
            Prueba Social & Resultados
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[0.95]">
            Alumnas que transformaron su técnica.
          </h2>
          <p className="text-sm sm:text-base text-[#A8A49F] font-sans max-w-lg">
            Historias reales de profesionales formadas en nuestras aulas físicas de Madrid y a través de nuestra plataforma virtual.
          </p>
        </div>

        {/* Featured Story Split */}
        <div className="bg-[#111117] border border-[#1C1C24] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Featured Image */}
          <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-[#1C1C24]">
            <img
              src={featuredStory.image}
              alt={featuredStory.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 bg-[#0A0A0D]/90 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-widest px-3 py-1 border border-white/10">
              Caso de Éxito Destacado
            </div>
          </div>

          {/* Featured Content */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-sans font-semibold">
                {featuredStory.course} · {featuredStory.location}
              </span>
              <p className="font-editorial text-xl sm:text-2xl lg:text-3xl font-normal text-white leading-snug italic">
                "{featuredStory.quote}"
              </p>
            </div>

            <div className="pt-6 border-t border-[#1C1C24] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-editorial text-lg font-bold text-white">
                  {featuredStory.name}
                </h3>
                <p className="text-xs text-[#A8A49F] font-sans mt-0.5">
                  {featuredStory.achievement}
                </p>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-[#A8A49F] font-mono bg-[#0A0A0D] px-3 py-2 border border-[#1C1C24]">
                <ShieldCheck className="w-4 h-4 text-[#DD006B] shrink-0" />
                <span>Diploma Validado: {featuredStory.certificateId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Micro Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {microStories.map((story, idx) => (
            <div
              key={idx}
              className="bg-[#111117] border border-[#1C1C24] p-6 sm:p-8 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-12 h-12 rounded-none object-cover border border-[#2A2A35]"
                  />
                  <div>
                    <h3 className="font-editorial text-base font-bold text-white">
                      {story.name}
                    </h3>
                    <p className="text-[11px] text-[#C5A880] font-sans">{story.location}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#A8A49F] font-sans leading-relaxed italic">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1C1C24] text-[11px] text-[#6E6B68] font-sans flex items-center justify-between">
                <span className="text-white font-medium">{story.achievement}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#DD006B]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
