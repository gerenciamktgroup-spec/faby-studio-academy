'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { landingMedia } from '@/lib/media/landingMedia';

export function EditorialCourseShowcase() {
  const courses = [
    {
      num: '01',
      id: 'unas',
      slug: 'unas-de-gel-y-acrilico',
      title: 'Máster Profesional en Uñas de Gel & Acrílico Premium',
      category: 'Uñas & Manicura Rusa',
      duration: '8 Semanas · 60h Activas',
      price: 490,
      installments: '3 cuotas de 163 € sin intereses',
      image: landingMedia.courses.nails.src,
      alt: landingMedia.courses.nails.alt,
      description: 'Dominio absoluto de la manicura rusa con torno, nivelación con base rubber, gel constructor autonivelante y esculpido estructural con molde.',
      techniques: [
        'Manicura rusa combinada con torno y fresas de diamante',
        'Nivelación y refuerzo de lámina con base rubber',
        'Esculpido en gel autonivelante y acrigel con molde paramétrico',
        'Arquitectura de salón: formas Square, Almond y Coffin',
      ],
      align: 'left', // photo left, text right
    },
    {
      num: '02',
      id: 'pestanas',
      slug: 'extensiones-de-pestanas',
      title: 'Especialización Profesional en Pestañas, Cejas & Volumen Ruso',
      category: 'Mirada & Cejas',
      duration: '6 Semanas · 50h Activas',
      price: 380,
      installments: '3 cuotas de 126 € sin intereses',
      image: landingMedia.courses.lashes.src,
      alt: landingMedia.courses.lashes.alt,
      description: 'Especialización en técnica clásica pelo a pelo, abanicado manual de volumen ruso 2D–6D, visagismo con henna, lifting y depilación con hilo.',
      techniques: [
        'Técnica clásica pelo a pelo 1:1 y aislamiento milimétrico',
        'Volumen Ruso 2D–6D con apertura manual de abanicos',
        'Visagismo y diseño de cejas con henna orgánica y tinte',
        'Lifting, laminado de cejas y depilación con hilo (threading)',
      ],
      align: 'right', // text left, photo right
    },
    {
      num: '03',
      id: 'facial',
      slug: 'cosmetologia-facial',
      title: 'Curso Superior de Cosmetología Facial & Hidrafacial',
      category: 'Cosmetología & Cabina',
      duration: '10 Semanas · 80h Activas',
      price: 590,
      installments: '3 cuotas de 196 € sin intereses',
      image: landingMedia.courses.facial.src,
      alt: landingMedia.courses.facial.alt,
      description: 'Protocolos de cabina estética, diagnóstico clínico de biotipos de piel, aparatología ultrasónica, radiofrecuencia y protocolo Hidrafacial.',
      techniques: [
        'Protocolo completo de Hidrafacial y renovación celular',
        'Diagnóstico clínico de biotipos y fototipos de Fitzpatrick',
        'Aparatología en cabina: espátula ultrasónica, radiofrecuencia y Dermapen',
        'Química cosmecéutica: AHA/BHA, retinol, vitamina C y péptidos',
      ],
      align: 'left', // photo left, text right
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#FAF6F3] text-[#111114] border-b border-[#E8E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E8E2DA] pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#DD006B]">
              Formaciones Oficiales · Edición 2026
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111114] tracking-tight leading-[0.95]">
              Tres caminos. <br />
              <span className="italic font-normal text-[#6E6763]">Una misma exigencia.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6E6763] font-sans max-w-lg">
              Elige la especialidad que deseas convertir en una profesión rentable con prácticas sobre modelos reales en nuestras sedes de Madrid.
            </p>
          </div>

          <Link
            href="/cursos"
            className="text-xs uppercase tracking-widest font-semibold text-[#111114] hover:text-[#DD006B] transition-colors flex items-center shrink-0 group"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Alternating Editorial Course Showcase */}
        <div className="space-y-16 lg:space-y-24">
          {courses.map((course) => {
            const isPhotoLeft = course.align === 'left';
            return (
              <div
                key={course.id}
                className="bg-[#FFFDFC] border border-[#E8E2DA] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                {/* Photo Column (6 cols) */}
                <div
                  className={`lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] bg-[#E8E2DA] overflow-hidden ${
                    isPhotoLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={course.image}
                    alt={course.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-5 left-5 bg-[#09090B] text-[#FFFDFC] text-xs font-mono font-bold px-3 py-1 uppercase tracking-widest">
                    {course.num}
                  </div>
                  <div className="absolute bottom-5 left-5 bg-[#09090B]/90 backdrop-blur-md text-[#FFFDFC] text-[10px] font-sans uppercase tracking-widest px-3 py-1.5 border border-white/10">
                    {course.duration}
                  </div>
                </div>

                {/* Content Column (6 cols) */}
                <div
                  className={`lg:col-span-6 p-8 sm:p-10 lg:p-12 space-y-6 flex flex-col justify-between ${
                    isPhotoLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#DD006B] font-sans font-bold">
                      {course.category}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#111114] leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E6763] font-sans leading-relaxed">
                      {course.description}
                    </p>

                    {/* Techniques Bullet List */}
                    <div className="pt-3 border-t border-[#E8E2DA] space-y-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#111114] font-semibold block">
                        Técnicas que dominarás:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#6E6763] font-sans">
                        {course.techniques.map((tech, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-1 h-1 rounded-full bg-[#DD006B] mr-2.5 mt-1.5 shrink-0" />
                            <span>{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Price and Dual Action Buttons */}
                  <div className="pt-6 border-t border-[#E8E2DA] space-y-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="font-editorial text-3xl sm:text-4xl font-bold text-[#111114]">
                          {course.price} €
                        </span>
                        <span className="text-xs text-[#6E6763] block font-sans mt-0.5">
                          {course.installments}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-[#8A8682] font-mono">
                        Sedes Madrid
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <Link
                        href={`/cursos/${course.slug}`}
                        className="inline-flex items-center justify-center space-x-2 bg-[#09090B] hover:bg-[#DD006B] text-[#FFFDFC] py-3.5 px-5 text-xs font-semibold tracking-widest uppercase transition-colors group"
                      >
                        <span>Ver programa</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <a
                        href={`https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20asesor%C3%ADa%20sobre%20el%20${encodeURIComponent(course.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-2 bg-[#FFFDFC] hover:bg-[#FBE8EF] border border-[#E8E2DA] hover:border-[#DD006B] text-[#111114] py-3.5 px-4 text-xs font-semibold tracking-widest uppercase transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#DD006B]" />
                        <span>Consultar por WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
