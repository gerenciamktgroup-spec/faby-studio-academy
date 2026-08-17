'use client';

import React from 'react';
import { landingMedia } from '@/lib/media/landingMedia';

export interface StudentStory {
  id: string;
  name: string;
  course: string;
  quote: string;
  location?: string;
  achievement?: string;
  image?: string;
  videoUrl?: string;
  certificateId?: string;
  status: 'demo' | 'verified';
}

export function StudentStories() {
  const featuredStory: StudentStory = {
    id: 'story-1',
    name: 'Lucía R.',
    location: 'Madrid · Aluche',
    course: 'Máster Profesional en Uñas de Gel & Acrílico',
    quote: 'Pasé de tener dudas con la preparación y ver cómo el producto se desprendía a las dos semanas, a dominar la manicura rusa y el ápice estructural. La corrección 1 a 1 de la profesora Leslie sobre fotos macro me dio la seguridad que ningún vídeo de internet te puede dar.',
    achievement: 'Especialista en Uñas Esculpidas · Estudio en Madrid',
    image: landingMedia.students.hero.src,
    certificateId: 'MAD-2026-UNAS-8F3A',
    status: 'demo',
  };

  const microStories: StudentStory[] = [
    {
      id: 'story-2',
      name: 'Carmen D.',
      location: 'Madrid · Puente de Vallecas',
      course: 'Especialización en Pestañas & Volumen Ruso',
      quote: 'El módulo de abanicado manual 2D-6D y la tabla de visagismo con henna cambiaron la simetría y retención de mis sets.',
      achievement: 'Lash Artist Independiente',
      image: landingMedia.students.micro1.src,
      status: 'demo',
    },
    {
      id: 'story-3',
      name: 'Valeria M.',
      location: 'Madrid · Aluche',
      course: 'Curso Superior de Cosmetología Facial',
      quote: 'Entender la química de los ácidos y la aparatología en cabina me permitió estructurar protocolos de Hidrafacial con criterio dermatológico.',
      achievement: 'Cosmetóloga en Cabina',
      image: landingMedia.students.micro2.src,
      status: 'demo',
    },
    {
      id: 'story-4',
      name: 'Sara B.',
      location: 'Madrid',
      course: 'Máster Profesional en Uñas de Gel',
      quote: 'Empecé desde cero absoluto. En 8 semanas de práctica guiada logré el control del torno y estructuras limpias.',
      achievement: 'Técnica de Manicura Rusa',
      image: landingMedia.students.micro3.src,
      status: 'demo',
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#FAF6F3] text-[#111114] border-b border-[#E8E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#DD006B]">
            Experiencias FABY
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111114] tracking-tight leading-[0.95]">
            Aprender una técnica también cambia la seguridad con la que trabajas.
          </h2>
          <p className="text-xs text-[#8A8682] font-sans">
            * Contenido demostrativo de la versión Preview. Los testimonios definitivos serán sustituidos por experiencias documentadas de alumnas FABY.
          </p>
        </div>

        {/* Featured Story (Hero Impact) */}
        <div className="bg-[#FFFDFC] border border-[#E8E2DA] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xs">
          {/* Featured Image */}
          <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full bg-[#E8E2DA] overflow-hidden">
            <img
              src={featuredStory.image}
              alt={featuredStory.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 bg-[#09090B] text-white text-[10px] font-mono uppercase tracking-widest px-3 py-1">
              Experiencia Formativa
            </div>
          </div>

          {/* Featured Content */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#DD006B] font-sans font-bold">
                {featuredStory.course} · {featuredStory.location}
              </span>
              <p className="font-editorial text-xl sm:text-2xl lg:text-3xl font-normal text-[#111114] leading-snug italic">
                "{featuredStory.quote}"
              </p>
            </div>

            <div className="pt-6 border-t border-[#E8E2DA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-editorial text-lg font-bold text-[#111114]">
                  {featuredStory.name}
                </h3>
                <p className="text-xs text-[#6E6763] font-sans mt-0.5">
                  {featuredStory.achievement}
                </p>
              </div>

              <span className="text-[10px] uppercase tracking-widest text-[#8A8682] font-mono bg-[#FAF6F3] px-3 py-1.5 border border-[#E8E2DA]">
                Graduada · Formato Presencial/Online
              </span>
            </div>
          </div>
        </div>

        {/* 3 Micro Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {microStories.map((story) => (
            <div
              key={story.id}
              className="bg-[#FFFDFC] border border-[#E8E2DA] p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-[#DD006B] transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-12 h-12 rounded-none object-cover border border-[#E8E2DA]"
                  />
                  <div>
                    <h3 className="font-editorial text-base font-bold text-[#111114]">
                      {story.name}
                    </h3>
                    <p className="text-[11px] text-[#DD006B] font-sans">{story.location}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#6E6763] font-sans leading-relaxed italic">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E2DA] text-[11px] text-[#8A8682] font-sans flex items-center justify-between">
                <span>{story.achievement}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
