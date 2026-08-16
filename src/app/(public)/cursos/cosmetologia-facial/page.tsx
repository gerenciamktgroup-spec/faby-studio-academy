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
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Video,
  HelpCircle
} from 'lucide-react';

export default function CosmetologyCourseDetailPage() {
  const [openModule, setOpenModule] = useState<number | null>(1);
  const [downloadedDossier, setDownloadedDossier] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const youtubeVideoId = 'o6Z52S9qJ5k'; // Protocolo de Limpieza Facial en Cabina

  const modules = [
    {
      number: 1,
      title: 'Módulo 1: Anatomía de la Piel & Biotipos Cutáneos',
      hours: '15 horas',
      lessonsCount: '6 lecciones',
      lessons: [
        { title: '1.1 Capas de la epidermis, dermis e hipodermis', duration: '25 min', type: 'video' },
        { title: '1.2 Diagnóstico clínico de biotipos: Grasa, seca, mixta y sensible', duration: '35 min', type: 'video' },
        { title: '1.3 Fototipos de Fitzpatrick y escalas de envejecimiento Glogau', duration: '30 min', type: 'video' },
        { title: '1.4 Bioseguridad y desinfección médica en cabina estética', duration: '20 min', type: 'video' },
        { title: '1.5 Evaluación Teórica de Histología Cutánea', duration: '15 min', type: 'quiz' },
      ],
    },
    {
      number: 2,
      title: 'Módulo 2: Química Cosmética & Activos Transformadores',
      hours: '15 horas',
      lessonsCount: '6 lecciones',
      lessons: [
        { title: '2.1 Ácido Hialurónico: Pesos moleculares y retención hídrica', duration: '30 min', type: 'video' },
        { title: '2.2 Retinol, Bakuchiol y derivados de la Vitamina A', duration: '40 min', type: 'video' },
        { title: '2.3 Vitamina C pura (Ácido L-Ascórbico) y antioxidantes', duration: '30 min', type: 'video' },
        { title: '2.4 Niacinamida, Péptidos y Ceramidas para barrera lipídica', duration: '35 min', type: 'video' },
        { title: '2.5 Creación de Rutinas Personalizadas por Diagnóstico', duration: '45 min', type: 'assignment' },
      ],
    },
    {
      number: 3,
      title: 'Módulo 3: Higiene Facial Profunda & Peelings Químicos',
      hours: '15 horas',
      lessonsCount: '6 lecciones',
      lessons: [
        { title: '3.1 Protocolo de doble limpieza y desincrustación con vaporizador', duration: '35 min', type: 'video' },
        { title: '3.2 Extracción no invasiva con espátula ultrasónica', duration: '30 min', type: 'video' },
        { title: '3.3 AHA (Glicólico, Láctico, Mandélico) y BHA (Salicílico)', duration: '45 min', type: 'video' },
        { title: '3.4 Neutralización, pH y control de escarchado (frosting)', duration: '30 min', type: 'video' },
        { title: '3.5 Práctica Guiada de Peeling en Cabina', duration: '60 min', type: 'assignment' },
      ],
    },
    {
      number: 4,
      title: 'Módulo 4: Dermapen / Microneedling & Principios Activos',
      hours: '15 horas',
      lessonsCount: '5 lecciones',
      lessons: [
        { title: '4.1 Inducción de colágeno percutáneo y micro-canales', duration: '30 min', type: 'video' },
        { title: '4.2 Selección de profundidades (0.25mm a 1.5mm) según área facial', duration: '35 min', type: 'video' },
        { title: '4.3 Viales estériles: Factores de crecimiento y silicio orgánico', duration: '35 min', type: 'video' },
        { title: '4.4 Cuidados post-tratamiento y consentimiento informado', duration: '25 min', type: 'video' },
      ],
    },
    {
      number: 5,
      title: 'Módulo 5: Drenaje Linfático Facial & Masaje Miofascial',
      hours: '10 horas',
      lessonsCount: '5 lecciones',
      lessons: [
        { title: '5.1 Maniobras de drenaje según el método Vodder', duration: '35 min', type: 'video' },
        { title: '5.2 Masaje Kobido lifting japonés no quirúrgico', duration: '45 min', type: 'video' },
        { title: '5.3 Masaje con Gua Sha y rodillo de jade térmico', duration: '25 min', type: 'video' },
        { title: '5.4 Práctica en Modelo Real: Protocolo Reafirmante', duration: '60 min', type: 'assignment' },
      ],
    },
    {
      number: 6,
      title: 'Módulo 6: Asesoría Dermocosmética & Plan de Tratamiento',
      hours: '10 horas',
      lessonsCount: '4 lecciones',
      lessons: [
        { title: '6.1 Entrevista y ficha clínica de consentimiento informado', duration: '25 min', type: 'video' },
        { title: '6.2 Venta consultiva de productos de apoyo domiciliario', duration: '30 min', type: 'video' },
        { title: '6.3 Entrega del Proyecto Final: Caso Clínico Completo', duration: '60 min', type: 'assignment' },
      ],
    },
  ];

  const handleDownloadDossier = () => {
    setDownloadedDossier(true);
    const content = `═══════════════════════════════════════════════════════════
        FABY STUDIO ACADEMY — DOSSIER OFICIAL 2026
    CURSO SUPERIOR DE COSMETOLOGÍA FACIAL & SKIN CARE
═══════════════════════════════════════════════════════════

• Duración: 10 Semanas (80 Horas Lectivas Activas)
• Modalidad: Campus Virtual 24/7 + Tutorías 1 a 1 de Corrección
• Acreditación: Certificado Oficial Verificable con Hash SHA-256

TEMARIO COMPLETO:
- Módulo 1: Histología Cutánea, Biotipos & Fisiología Dérmica
- Módulo 2: Química Cosmética, pH & Formulación Magistral
- Módulo 3: Protocolos de Limpieza Profunda & Extracción Aséptica
- Módulo 4: Peelings Químicos (AHA, BHA, Mandélico) & Neutralización
- Módulo 5: Aparatología Estética: Alta Frecuencia, Dermapen y Luz LED
- Módulo 6: Diagnóstico Profesional, Ficha Médica y Proyecto de Casos

Matrículas e Información: https://faby-studio-academy.vercel.app/checkout
═══════════════════════════════════════════════════════════`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DOSSIER_COSMETOLOGIA_FACIAL_FABY_STUDIO_2026.txt`;
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
                <span>CURSO SUPERIOR — FABY STUDIO ACADEMY</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold font-display leading-tight text-slate-900">
                Curso Superior de Cosmetología Facial & Skin Care
              </h1>

              <p className="text-base text-slate-600 leading-relaxed">
                Especialízate en diagnóstico cutáneo avanzado, química de activos dermocosméticos, peelings químicos, microneedling y masajes reafirmantes de cabina con acreditación oficial auditable.
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Clock className="w-4 h-4 text-rose-600" />
                  <span>Duración: 10 Semanas (80h Activas)</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Certificado Oficial Verificable SHA-256</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>Tutorías 1 a 1 de Casos Clínicos</span>
                </span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-fabi-pink/20 transition-all hover:scale-[1.02]"
                >
                  <span>Matricularme en el Curso (590€)</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/cursos/cosmetologia-facial/dossier"
                  target="_blank"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-50 border border-slate-200 text-slate-800 px-6 py-4 rounded-xl font-semibold text-base hover:border-rose-300 hover:text-rose-600 transition-colors shadow-2xs"
                >
                  <Download className="w-4 h-4 text-rose-600" />
                  <span>Ver Dossier Oficial PDF</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xl space-y-3">
                <div className="relative group cursor-pointer overflow-hidden rounded-2xl" onClick={() => setShowVideoModal(true)}>
                  <img
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop"
                    alt="Curso Cosmetología Facial"
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
                      <Video className="w-3.5 h-3.5 mr-1" /> Master Class Protocolo Cabina
                    </span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Matrícula Abierta</span>
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900">
                    590€ <span className="text-xs text-slate-500 font-normal">(Matrícula del programa completo)</span>
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
                    Clase de Muestra: Protocolo de Limpieza Facial Profunda en Cabina
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
                  title="Cosmetology Master Class Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              <div className="p-4 bg-slate-950 flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Esta clase forma parte del <strong className="text-white">Módulo 1</strong> del Curso Superior Oficial.
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
          <h2 className="text-3xl font-bold font-display text-slate-900">6 Módulos & 32 Lecciones Magistrales</h2>
          <p className="text-sm text-slate-600">
            Explora el temario científico y los protocolos prácticos en cabina supervisados por el equipo docente.
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

        {/* Claustro Docente */}
        <div className="pt-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Excelencia Pedagógica</span>
            <h3 className="text-2xl font-bold font-display text-slate-900">Claustro de Especialistas</h3>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Formación avalada por profesionales en dermoestética y protocolos de cabina.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 font-extrabold text-xl flex items-center justify-center shrink-0 border border-rose-200">
                PF
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Profesora Faby</h4>
                <p className="text-xs text-rose-600 font-bold">Directora Académica & Especialista Facial</p>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Supervisora de protocolos de diagnóstico cutáneo y dermoestética aplicada.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 font-extrabold text-xl flex items-center justify-center shrink-0 border border-purple-200">
                LG
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Laura Gómez</h4>
                <p className="text-xs text-purple-600 font-bold">Tutora Dermoestética & Casos Clínicos</p>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Seguimiento de formulaciones dermocosméticas y resolución de dudas 1 a 1.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
          <h3 className="text-2xl font-bold font-display text-slate-900">Domina la Cosmetología Facial Profesional</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Matricúlate hoy y comienza a diagnosticar y tratar la piel con rigor científico y comercial.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/checkout"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-rose-600/20 transition-all hover:scale-[1.02]"
            >
              <span>Matricularme en el Curso (590€)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
