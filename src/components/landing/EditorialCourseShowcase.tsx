'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';

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
      installments: '3 cuotas de 163 €',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=85&w=900&auto=format&fit=crop',
      techniques: [
        'Manicura rusa combinada con torno y fresas de diamante',
        'Nivelación y refuerzo de lámina con base rubber',
        'Esculpido estructural en gel autonivelante y acrigel con molde',
        'Arquitectura de salón: formas Square, Almond y Coffin',
      ],
    },
    {
      num: '02',
      id: 'pestanas',
      slug: 'extensiones-de-pestanas',
      title: 'Especialización Profesional en Pestañas, Cejas & Volumen Ruso',
      category: 'Mirada & Cejas',
      duration: '6 Semanas · 50h Activas',
      price: 380,
      installments: '3 cuotas de 126 €',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=85&w=900&auto=format&fit=crop',
      techniques: [
        'Técnica clásica pelo a pelo 1:1 y aislamiento milimétrico',
        'Volumen Ruso 2D–6D con apertura manual de abanicos',
        'Visagismo y diseño de cejas con henna orgánica y tinte',
        'Lifting, laminado de cejas y depilación con hilo (threading)',
      ],
    },
    {
      num: '03',
      id: 'facial',
      slug: 'cosmetologia-facial',
      title: 'Curso Superior de Cosmetología Facial & Hidrafacial',
      category: 'Cosmetología & Cabina',
      duration: '10 Semanas · 80h Activas',
      price: 590,
      installments: '3 cuotas de 196 €',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=85&w=900&auto=format&fit=crop',
      techniques: [
        'Protocolo completo de Hidrafacial y renovación celular',
        'Diagnóstico clínico de biotipos y fototipos de Fitzpatrick',
        'Aparatología en cabina: espátula ultrasónica, radiofrecuencia y Dermapen',
        'Química cosmecéutica: AHA/BHA, retinol, vitamina C y péptidos',
      ],
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#F8F5F1] text-[#0A0A0D] border-b border-[#E8E4DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E8E4DF] pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6E6B68]">
              Catálogo Académico Oficial
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A0A0D] tracking-tight leading-[0.95]">
              Tres caminos. <br />
              <span className="italic font-normal text-[#6E6B68]">Una misma exigencia.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6E6B68] font-sans max-w-lg">
              Elige la especialidad que quieres convertir en una habilidad profesional de alto nivel con práctica directa sobre modelos.
            </p>
          </div>

          <Link
            href="/cursos"
            className="text-xs uppercase tracking-widest font-semibold text-[#0A0A0D] hover:text-[#DD006B] transition-colors flex items-center shrink-0 group"
          >
            <span>Ver dossier de las 3 formaciones</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Courses Editorial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-[#FFFFFF] border border-[#E8E4DF] flex flex-col justify-between group transition-all duration-300 hover:border-[#0A0A0D]"
            >
              <div>
                {/* Large Photography Banner */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#E8E4DF]">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-[#0A0A0D]/90 backdrop-blur-md text-[#F8F5F1] text-[10px] font-mono font-bold px-2.5 py-1 uppercase tracking-widest">
                    {course.num}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0A0A0D]/85 backdrop-blur-md text-[#F8F5F1] p-3 text-xs font-sans flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold">
                      {course.category}
                    </span>
                    <span className="text-[10px] text-[#A8A49F]">{course.duration}</span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  <h3 className="font-editorial text-2xl font-bold text-[#0A0A0D] leading-tight group-hover:text-[#DD006B] transition-colors">
                    {course.title}
                  </h3>

                  {/* Key Techniques */}
                  <div className="space-y-2.5 pt-2 border-t border-[#E8E4DF]">
                    <p className="text-[10px] uppercase tracking-widest text-[#6E6B68] font-semibold">
                      Técnicas Clave de Salón:
                    </p>
                    <ul className="space-y-2 text-xs text-[#6E6B68] font-sans">
                      {course.techniques.map((tech, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1 h-1 rounded-full bg-[#0A0A0D] mr-2.5 mt-1.5 shrink-0" />
                          <span>{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Price & Actions Bottom */}
              <div className="p-6 sm:p-8 pt-0 border-t border-[#E8E4DF] mt-6 flex flex-col space-y-4">
                <div className="flex items-baseline justify-between pt-4">
                  <div>
                    <span className="font-editorial text-3xl font-bold text-[#0A0A0D]">
                      {course.price} €
                    </span>
                    <span className="text-[11px] text-[#6E6B68] block font-sans">
                      o {course.installments} sin intereses
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#6E6B68] font-medium">
                    Sedes Madrid
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    href={`/cursos/${course.slug}`}
                    className="inline-flex items-center justify-center bg-[#0A0A0D] hover:bg-[#1C1C24] text-[#F8F5F1] py-3 text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    <span>Ver programa</span>
                  </Link>

                  <a
                    href={`https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20consultar%20detalles%20del%20${encodeURIComponent(course.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-1.5 border border-[#0A0A0D] text-[#0A0A0D] hover:bg-[#0A0A0D] hover:text-[#F8F5F1] py-3 text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Consultar</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
