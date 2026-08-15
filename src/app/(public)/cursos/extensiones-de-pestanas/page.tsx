'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import {
  Sparkles,
  Clock,
  Award,
  CheckCircle2,
  Play,
  Star,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Users,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Video,
  Check,
  MessageCircle
} from 'lucide-react';

export default function LashCourseDetailPage() {
  const [openModule, setOpenModule] = useState<number | null>(1);
  const [downloadedDossier, setDownloadedDossier] = useState(false);

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

  const handleDownloadDossier = () => {
    setDownloadedDossier(true);
    const content = `═══════════════════════════════════════════════════════════
        FABY STUDIO ACADEMY — DOSSIER OFICIAL 2026
       ESPECIALIZACIÓN EN PESTAÑAS Y VOLUMEN RUSO
═══════════════════════════════════════════════════════════

• Duración: 6 Semanas (50 Horas Lectivas Activas)
• Modalidad: Campus Virtual 24/7 + Tutorías 1 a 1 de Corrección
• Acreditación: Certificado Oficial Verificable con Hash SHA-256

TEMARIO COMPLETO:
- Módulo 1: Fundamentos & Bioseguridad Ocular
- Módulo 2: Visagismo, Curvaturas & Mapping Avanzado (Cat Eye, Doll Eye)
- Módulo 3: Técnica Clásica Pelo a Pelo (1:1)
- Módulo 4: Volumen Ruso & Creación de Abanicos (2D a 6D)
- Módulo 5: Retención Extrema, Mantenimiento & Retirada Segura
- Módulo 6: Negocio en Cabina, Fotografía & Marca Personal

Matrículas e Información: https://faby-studio-academy.vercel.app/checkout
═══════════════════════════════════════════════════════════`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DOSSIER_ESPECIALIZACION_PESTANAS_FABY_STUDIO_2026.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloadedDossier(false), 3500);
  };

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
                Formación completa de 6 semanas con acompañamiento docente 1 a 1. Aprende técnica clásica pelo a pelo, volumen ruso, diseño de mirada y gestión profesional de clientas con diploma oficial verificable.
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Clock className="w-4 h-4 text-rose-600" />
                  <span>Duración: 6 Semanas (50h Activas)</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Certificado Oficial Verificable SHA-256</span>
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
                  <span>Matricularme Ahora (380€)</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleDownloadDossier}
                  className="inline-flex items-center justify-center space-x-2 bg-slate-50 border border-slate-200 text-slate-800 px-6 py-4 rounded-xl font-semibold text-base hover:border-rose-300 transition-colors"
                >
                  <Download className="w-4 h-4 text-rose-600" />
                  <span>{downloadedDossier ? '¡Dossier Descargado!' : 'Descargar Dossier PDF'}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xl space-y-3">
                <img
                  src="https://images.unsplash.com/photo-1583001809873-a1284a5da677?q=80&w=800&auto=format&fit=crop"
                  alt="Curso Extensiones de Pestañas"
                  className="w-full h-72 object-cover rounded-2xl"
                />
                <div className="p-2 space-y-2 text-xs">
                  <div className="flex justify-between items-center font-semibold text-slate-500">
                    <span>Modalidad: Online + Tutoría 1 a 1</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Cupos Abiertos</span>
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900">
                    380€ <span className="text-xs text-slate-500 font-normal">(o 3 cuotas de 126,66€ sin intereses con Klarna)</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    ✨ Opción de pagar en efectivo directamente en los locales de Faby Studio en Madrid y Barcelona.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
            Únete a más de 1.200 alumnas graduadas y obtén una acreditación técnica oficial de alto valor en el mercado de la belleza.
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
