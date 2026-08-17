'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import {
  Sparkles,
  Clock,
  Award,
  Play,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Video,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { COURSE_CATALOG } from '@/lib/courses/catalog';

export default function DynamicCourseDetailPage() {
  const params = useParams();
  const slug = typeof params?.courseSlug === 'string' ? params.courseSlug : '';
  const course = COURSE_CATALOG[slug];

  const [openModule, setOpenModule] = useState<number | null>(1);
  const [showVideoModal, setShowVideoModal] = useState(false);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <PublicHeader />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative bg-slate-900 text-white py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Course Info */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-rose-600 text-white uppercase tracking-wider shadow-sm">
                    {course.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                    <span>★ {course.rating.toFixed(1)}</span>
                    <span className="text-slate-400">({course.reviewsCount} reseñas)</span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-display">
                  {course.title}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  {course.tagline}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-slate-800/60 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/60">
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-bold mb-1">
                      <Clock className="w-4 h-4" />
                      <span>DURACIÓN</span>
                    </div>
                    <p className="text-sm font-bold text-white">{course.duration} ({course.hours})</p>
                  </div>

                  <div className="bg-slate-800/60 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/60">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                      <Award className="w-4 h-4" />
                      <span>CERTIFICADO</span>
                    </div>
                    <p className="text-sm font-bold text-white">Firma SHA-256 Oficial</p>
                  </div>

                  <div className="bg-slate-800/60 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/60 col-span-2 sm:col-span-1">
                    <div className="flex items-center gap-2 text-purple-400 text-xs font-bold mb-1">
                      <Sparkles className="w-4 h-4" />
                      <span>MODALIDAD</span>
                    </div>
                    <p className="text-sm font-bold text-white">{course.modality}</p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                  <Link
                    href={`/checkout?curso=${course.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all hover:scale-105 text-center"
                  >
                    <span>Matricularme Ahora por {course.price}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/cursos/${course.slug}/dossier`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors text-center"
                  >
                    <Download className="w-4 h-4 text-rose-400" />
                    <span>Descargar Dossier</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Video Preview */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700 group aspect-video lg:aspect-4/3">
                  <Image
                    src={course.heroImage}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-center justify-center">
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="w-16 h-16 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg shadow-rose-600/50 hover:bg-rose-500 hover:scale-110 transition-all cursor-pointer"
                      aria-label="Ver muestra de clase"
                    >
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-xs font-semibold text-white/90 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700/60 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-rose-400" />
                      Clase de Demostración HD
                    </span>
                    <span className="text-[10px] text-rose-300 font-bold uppercase tracking-wider">Ver Vídeo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SYLLABUS & MODULES SECTION */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Modules Accordion */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  Plan de Estudios Detallado
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
                  Contenido Académico y Prácticas
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Estructura modular con lecciones en vídeo HD, cuestionarios y rúbrica de prácticas en modelo.
                </p>
              </div>

              {/* Modules List */}
              <div className="space-y-4">
                {course.modules.map((mod) => {
                  const isOpen = openModule === mod.number;

                  return (
                    <div
                      key={mod.number}
                      className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenModule(isOpen ? null : mod.number)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors"
                      >
                        <div className="space-y-1">
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                            {mod.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {mod.hours}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5 text-slate-400" />
                              {mod.lessonsCount}
                            </span>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 ml-4">
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-5 pt-2 border-t border-slate-100 bg-slate-50/40 space-y-2.5">
                          {mod.lessons.map((les, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-white border border-slate-100 text-slate-700"
                            >
                              <div className="flex items-center gap-2.5">
                                {les.type === 'video' && <Play className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                                {les.type === 'quiz' && <FileText className="w-3.5 h-3.5 text-purple-500 shrink-0" />}
                                {les.type === 'assignment' && <Award className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                                <span className="font-medium">{les.title}</span>
                              </div>
                              <span className="text-slate-400 font-mono shrink-0 ml-2">{les.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Guarantee & Summary Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 sticky top-24">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inversión Formativa</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900 font-display">{course.price}</span>
                    <span className="text-xs text-slate-500">impuestos incluidos</span>
                  </div>
                  <p className="text-xs text-slate-600">{course.installments}</p>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Lo que incluye:</h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {course.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/checkout?curso=${course.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white font-bold text-sm shadow-md shadow-rose-600/20 transition-all text-center"
                >
                  <span>Inscribirme al Programa</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                Preguntas Frecuentes
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                Dudas Comunes sobre este Máster
              </h2>
            </div>

            <div className="space-y-3 pt-4">
              {course.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden max-w-3xl w-full aspect-video relative shadow-2xl">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center text-sm font-bold transition-colors"
            >
              ✕
            </button>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${course.youtubeVideoId}?autoplay=1`}
              title="Vídeo de Clase"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
