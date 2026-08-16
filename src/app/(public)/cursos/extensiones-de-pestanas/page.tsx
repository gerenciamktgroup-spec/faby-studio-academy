'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import {
  Sparkles,
  Clock,
  Award,
  Play,
  ArrowRight,
  Users,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Video
} from 'lucide-react';

export default function LashCourseDetailPage() {
  const [openModule, setOpenModule] = useState<number | null>(1);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const youtubeVideoId = 'FmcPn9DJ5ef'; // Tutorial Pelo a Pelo Técnica Clásica 1x1

  const modules = [
    {
      number: 1,
      title: 'Módulo 1: Fundamentos & Bioseguridad Ocular',
      hours: '8 horas',
      lessonsCount: '5 lecciones',
      lessons: [
        { title: '1.1 Bienvenida y Estándares de Higiene FABY STUDIO', duration: '15 min', type: 'video' },
        { title: '1.2 Anatomía del Ojo, Párpado y Ciclo Piloso (Anágena, Catágena, Telógena)', duration: '25 min', type: 'video' },
        { title: '1.3 Bioseguridad, Esterilización de Pinzas y Prevención de Blefaritis', duration: '20 min', type: 'video' },
        { title: '1.4 Química de Adhesivos: Cianocrilato, Humedad y Polimerización', duration: '30 min', type: 'video' },
        { title: '1.5 Test de Evaluación Teórica de Bioseguridad (Mínimo 70%)', duration: '15 min', type: 'quiz' },
      ],
    },
    {
      number: 2,
      title: 'Módulo 2: Visagismo, Curvaturas & Mapping Avanzado',
      hours: '8 horas',
      lessonsCount: '6 lecciones',
      lessons: [
        { title: '2.1 Clasificación de Ojos: Almendrados, Hundidos, Encapotados y Redondos', duration: '25 min', type: 'video' },
        { title: '2.2 Guía de Curvaturas (B, C, CC, D, L, M) y Selección por Morfología', duration: '30 min', type: 'video' },
        { title: '2.3 Mapping Paso a Paso: Diseños Cat Eye, Doll Eye y Efecto Ardilla', duration: '35 min', type: 'video' },
        { title: '2.4 Tabla de Transición Milimétrica de Longitudes (7mm a 14mm)', duration: '20 min', type: 'video' },
        { title: '2.5 Práctica Guiada en Parche de Hidrogel', duration: '40 min', type: 'assignment' },
      ],
    },
    {
      number: 3,
      title: 'Módulo 3: Técnica Clásica Pelo a Pelo (1:1)',
      hours: '10 horas',
      lessonsCount: '7 lecciones',
      lessons: [
        { title: '3.1 Postura Ergonómica de Manos y Manejo de Pinza Curva / Recta', duration: '25 min', type: 'video' },
        { title: '3.2 Aislamiento Perfecto Sin ' + '«' + 'Stickies' + '»' + ' ni Cruces de Pestañas', duration: '40 min', type: 'video' },
        { title: '3.3 Inmersión Correcta en Gota de Adhesivo y Ángulo de Colocación (90°)', duration: '30 min', type: 'video' },
        { title: '3.4 Colocación en Pestañas Baby y Control de Distancia a la Raíz (0.5mm)', duration: '35 min', type: 'video' },
        { title: '3.5 Práctica en Maniquí y Corrección de Dirección', duration: '60 min', type: 'assignment' },
      ],
    },
    {
      number: 4,
      title: 'Módulo 4: Volumen Ruso & Creación de Abanicos (2D-6D)',
      hours: '12 horas',
      lessonsCount: '6 lecciones',
      lessons: [
        { title: '4.1 Cálculo Matemático de Pesos y Grosores (0.03mm, 0.05mm, 0.07mm)', duration: '30 min', type: 'video' },
        { title: '4.2 Técnicas de Creación de Abanicos: En Tira, En Dedo y Pinching', duration: '45 min', type: 'video' },
        { title: '4.3 Base Cristalizada vs Base Plana: Envolvente en la Pestaña Natural', duration: '35 min', type: 'video' },
        { title: '4.4 Efecto Kim K (Wispy) y Mezcla de Espigas', duration: '40 min', type: 'video' },
        { title: '4.5 Práctica en Modelo Real: Set Completo Volumen Ruso 3D', duration: '90 min', type: 'assignment' },
      ],
    },
    {
      number: 5,
      title: 'Módulo 5: Retención Extrema, Mantenimiento & Retirada',
      hours: '6 horas',
      lessonsCount: '5 lecciones',
      lessons: [
        { title: '5.1 Factores Ambientales en Cabina (Higrómetro, Temperatura y Aceleradores)', duration: '25 min', type: 'video' },
        { title: '5.2 Protocolo de Relleno a las 3 Semanas y Diagnóstico de Desprendimiento', duration: '30 min', type: 'video' },
        { title: '5.3 Retirada Química Segura con Gel Remover Sin Irritación', duration: '20 min', type: 'video' },
        { title: '5.4 Cuidados Posteriores (Aftercare) y Hoja de Recomendaciones a la Clienta', duration: '20 min', type: 'video' },
      ],
    },
    {
      number: 6,
      title: 'Módulo 6: Negocio en Cabina, Fotografía & Marca Personal',
      hours: '6 horas',
      lessonsCount: '5 lecciones',
      lessons: [
        { title: '6.1 Iluminación, Macrofotografía y Edición de Resultados para Redes', duration: '30 min', type: 'video' },
        { title: '6.2 Estructura de Costes, Fijación de Precios Rentables y Fidelización', duration: '35 min', type: 'video' },
        { title: '6.3 Consentimiento Informado RGPD y Ficha Médica de la Clienta', duration: '20 min', type: 'video' },
        { title: '6.4 Entrega y Evaluación del Proyecto Final en Modelo Real', duration: '60 min', type: 'assignment' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />

      {/* Hero Header */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PROGRAMA INSIGNIA — FABY STUDIO ACADEMY</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold font-display leading-tight text-slate-900">
                Curso Profesional de Extensiones de Pestañas
              </h1>

              <p className="text-base text-slate-600 leading-relaxed">
                Formación completa de 6 semanas con acompañamiento docente 1 a 1. Aprende técnica clásica pelo a pelo, volumen ruso, diseño de mirada y gestión profesional de clientas con certificado técnico verificable.
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Clock className="w-4 h-4 text-rose-600" />
                  <span>Duración: 6 Semanas (50h Activas)</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Certificado Técnico Verificable SHA-256</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>3 Tutorías 1 a 1 Incluidas</span>
                </span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-fabi-pink/20 transition-all hover:scale-[1.02]"
                >
                  <span>Matricularme en el Curso (380€)</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/cursos/extensiones-de-pestanas/dossier"
                  target="_blank"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-50 border border-slate-200 text-slate-800 px-6 py-4 rounded-xl font-semibold text-base hover:border-rose-300 hover:text-rose-600 transition-colors shadow-2xs"
                >
                  <Download className="w-4 h-4 text-rose-600" />
                  <span>Ver Dossier Académico</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xl space-y-3">
                <div className="relative group cursor-pointer overflow-hidden rounded-2xl" onClick={() => setShowVideoModal(true)}>
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop"
                    alt="Curso Extensiones de Pestañas"
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-white/90 text-rose-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all">
                      <Play className="w-7 h-7 fill-rose-600 ml-1" />
                    </div>
                    <span className="text-white text-xs font-bold bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs">
                      Ver Clase de Muestra (35 min)
                    </span>
                  </div>
                </div>

                <div className="p-2 space-y-2 text-xs">
                  <div className="flex justify-between items-center font-semibold text-slate-500">
                    <span className="flex items-center text-rose-600 font-bold">
                      <Video className="w-3.5 h-3.5 mr-1" /> Master Class Pelo a Pelo HD
                    </span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Cupos Abiertos</span>
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900">
                    380€ <span className="text-xs text-slate-500 font-normal">(Matrícula del programa completo)</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    ✨ Acceso inmediato al campus virtual y seguimiento personalizado por tutora asignada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Preview Modal */}
        {showVideoModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl overflow-hidden max-w-4xl w-full border border-slate-800 shadow-2xl space-y-3">
              <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <h3 className="text-white text-sm font-bold font-display">
                    Clase de Muestra: Aplicación Técnica Clásica Pelo a Pelo (1x1)
                  </h3>
                </div>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="text-slate-400 hover:text-white text-xs font-bold bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl transition-colors"
                >
                  Cerrar ✕
                </button>
              </div>

              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                  title="Lash Master Class Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              <div className="p-4 bg-slate-950 flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Esta clase forma parte del <strong className="text-white">Módulo 1</strong> de la Especialización Profesional.
                </p>
                <Link
                  href="/checkout"
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center space-x-1"
                >
                  <span>Matricularme Ahora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Curriculum Section with Interactive Accordion */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
            Plan de Estudios Detallado
          </span>
          <h2 className="text-3xl font-bold font-display text-slate-900">6 Módulos & 34 Lecciones Especializadas</h2>
          <p className="text-sm text-slate-600">
            Haz clic en cada módulo para explorar las lecciones teóricas, demostraciones prácticas en modelo real y criterios de rúbrica.
          </p>
        </div>

        <div className="space-y-4">
          {modules.map((m) => {
            const isOpen = openModule === m.number;
            return (
              <div
                key={m.number}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenModule(isOpen ? null : m.number)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <span className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 font-bold text-sm flex items-center justify-center border border-rose-200 shrink-0">
                      0{m.number}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-display">{m.title}</h3>
                      <p className="text-xs text-slate-500 font-medium">{m.lessonsCount} • {m.hours} lectivas activas</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="hidden sm:inline-block text-xs font-bold text-rose-600">
                      {isOpen ? 'Ocultar Temario' : 'Ver Temario'}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-rose-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pt-3">
                      Lecciones Incluidas en este Módulo:
                    </p>
                    <div className="divide-y divide-slate-100 bg-white rounded-xl border border-slate-200 overflow-hidden">
                      {m.lessons.map((les, idx) => (
                        <div key={idx} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50">
                          <div className="flex items-center space-x-2.5">
                            {les.type === 'video' ? (
                              <Video className="w-4 h-4 text-rose-600 shrink-0" />
                            ) : les.type === 'quiz' ? (
                              <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                            )}
                            <span className="font-semibold text-slate-800">{les.title}</span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono shrink-0 ml-3">{les.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Claustro Docente Section */}
        <div className="pt-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Excelencia Pedagógica</span>
            <h3 className="text-2xl font-bold font-display text-slate-900">Claustro de Especialistas</h3>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Aprenderás directamente de profesionales en activo con salones de alto rendimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 font-extrabold text-xl flex items-center justify-center shrink-0 border border-rose-200">
                PF
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Profesora Faby</h4>
                <p className="text-xs text-rose-600 font-bold">Fundadora & Master Educator</p>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Más de 10 años formando especialistas y liderando protocolos de alta estética en Faby Studio.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 font-extrabold text-xl flex items-center justify-center shrink-0 border border-purple-200">
                LG
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Laura Gómez</h4>
                <p className="text-xs text-purple-600 font-bold">Tutora 1 a 1 & Lash Artist Especialista</p>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Encargada del seguimiento individualizado, corrección de rúbricas fotográficas y tutorías en vivo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
          <h3 className="text-2xl font-bold font-display text-slate-900">Comienza tu Formación Profesional Hoy</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Inicia tu formación especializada y obtén un certificado técnico verificable en el sector de la estética.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/checkout"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-rose-600/20 transition-all hover:scale-[1.02]"
            >
              <span>Matricularme en el Programa (380€)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
