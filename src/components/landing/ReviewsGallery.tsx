'use client';

import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, X, MapPin } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  role: string;
  location: string;
  course: 'unas' | 'pestanas' | 'facial';
  courseName: string;
  rating: number;
  photo: string;
  shortQuote: string;
  fullStory: string;
  certificateHash: string;
  achievement: string;
}

export function ReviewsGallery() {
  const [filter, setFilter] = useState<'all' | 'unas' | 'pestanas' | 'facial'>('all');
  const [activeReview, setActiveReview] = useState<Review | null>(null);

  const reviews: Review[] = [
    {
      id: 1,
      name: 'Lucía Ramírez',
      role: 'Alumna Graduada • Dueña de Salón',
      location: 'Madrid (Sede Plaza Aluche)',
      course: 'unas',
      courseName: 'Máster Profesional en Uñas de Gel & Acrílico',
      rating: 5,
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      shortQuote: 'Pasé de cobrar 18€ por manicura a 45€ por set de gel con manicura rusa. Mis clientas notan la diferencia de inmediato.',
      fullStory: 'Antes de entrar a Faby Studio hacía manicura básica pero las uñas se desprendían a las dos semanas. Con la corrección 1 a 1 de la Profesora Faby aprendí el limado paramétrico, el corte limpio con torno y la nivelación con base rubber. Hoy tengo la agenda completa en mi propio local de Madrid.',
      certificateHash: 'sha256-8f3a9e...2026-MAD-UNAS',
      achievement: 'Facturación media: 2.800€/mes',
    },
    {
      id: 2,
      name: 'Carmen Delgado',
      role: 'Alumna Graduada • Lash Artist Independiente',
      location: 'Madrid (Sede Puente de Vallecas)',
      course: 'pestanas',
      courseName: 'Especialización en Pestañas & Volumen Ruso',
      rating: 5,
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
      shortQuote: 'El módulo de abanicado manual 2D-6D y visagismo con henna cambió totalmente la calidad de mis acabados.',
      fullStory: 'Tenía miedo de que un curso con parte online no me diera destreza, pero las correcciones sobre fotos en macro que hace el equipo docente son milimétricas. Te marcan con pines dónde mejorar la distancia al párpado y la simetría. Mis sets ahora duran más de 5 semanas intactos.',
      certificateHash: 'sha256-4c1b7d...2026-MAD-PEST',
      achievement: 'Retención de clientas: 92%',
    },
    {
      id: 3,
      name: 'Valeria Montoya',
      role: 'Alumna Graduada • Especialista en Cabina',
      location: 'Madrid (Aluche)',
      course: 'facial',
      courseName: 'Curso Superior de Cosmetología Facial & Hidrafacial',
      rating: 5,
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
      shortQuote: 'El protocolo de Hidrafacial y química cosmética me dio la seguridad para cobrar 75€ por sesión en cabina.',
      fullStory: 'Buscaba una formación seria en dermatología estética y no simples recetas de internet. En el máster aprendí la clasificación de Fitzpatrick, la espátula ultrasónica y cómo prescribir rutinas domiciliarias. La calculadora de cabina del campus me ayudó a costear cada insumo.',
      certificateHash: 'sha256-9d2e1a...2026-MAD-FACIAL',
      achievement: 'Ticket medio por sesión: 75€',
    },
    {
      id: 4,
      name: 'Sara Benítez',
      role: 'Alumna Graduada • Emprendedora',
      location: 'Madrid',
      course: 'unas',
      courseName: 'Máster Profesional en Uñas de Gel & Acrílico',
      rating: 5,
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
      shortQuote: 'Empecé desde cero absoluto sin haber tocado un torno. En 8 semanas estaba haciendo estructuras Ballerina perfectas.',
      fullStory: 'La paciencia de Leslie y las clases explicadas paso a paso me dieron toda la confianza que necesitaba. El diploma con código QR me abrió las puertas para trabajar en un centro de belleza de prestigio en Madrid de inmediato.',
      certificateHash: 'sha256-11b8f4...2026-MAD-UNAS',
      achievement: 'Contratada en salón premium a los 15 días',
    },
    {
      id: 5,
      name: 'Elena Morales',
      role: 'Alumna Graduada • Brow & Lash Stylist',
      location: 'Madrid (Puente de Vallecas)',
      course: 'pestanas',
      courseName: 'Especialización en Pestañas & Visagismo con Henna',
      rating: 5,
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop',
      shortQuote: 'La técnica de depilación con hilo (threading) y diseño con henna son los servicios más solicitados de mi estudio.',
      fullStory: 'Aprender la simetría del rostro y las tablas de transición milimétrica de longitudes marcó la diferencia. La plataforma registra tus horas reales y la comunidad de alumnas es un apoyo diario increíble.',
      certificateHash: 'sha256-77a3c2...2026-MAD-PEST',
      achievement: '+40 nuevas clientas en su primer mes',
    },
    {
      id: 6,
      name: 'Marta Castillo',
      role: 'Alumna Graduada • Cosmetóloga',
      location: 'Madrid',
      course: 'facial',
      courseName: 'Curso Superior de Cosmetología Facial',
      rating: 5,
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
      shortQuote: 'Pude visitar la sede física en Madrid y resolver todas mis dudas. Un nivel de profesionalismo inigualable.',
      fullStory: 'Tener una sede física donde acudir y saber que detrás hay una profesional con 15 años de trayectoria en Madrid te da una tranquilidad que ninguna otra academia online ofrece.',
      certificateHash: 'sha256-55e9c0...2026-MAD-FACIAL',
      achievement: 'Servicios de Hidrafacial reservados a 3 semanas',
    },
  ];

  const filteredReviews = filter === 'all' ? reviews : reviews.filter((r) => r.course === filter);

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>CASOS DE ÉXITO & DIPLOMAS VERIFICADOS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
            Historias Reales de Alumnas Graduadas
          </h2>
          <p className="text-sm text-slate-600">
            Descubre cómo nuestras alumnas en Madrid y toda España han transformado su nivel técnico y multiplicado sus ingresos.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todas las Reseñas ({reviews.length})
            </button>
            <button
              onClick={() => setFilter('unas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'unas'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              💅 Uñas & Manicura
            </button>
            <button
              onClick={() => setFilter('pestanas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'pestanas'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              👁️ Pestañas & Cejas
            </button>
            <button
              onClick={() => setFilter('facial')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'facial'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              🧴 Cosmetología Facial
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              onClick={() => setActiveReview(review)}
              className="bg-slate-50 hover:bg-white p-6 rounded-3xl border border-slate-200 hover:border-rose-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={review.photo}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                        {review.name}
                      </h3>
                      <p className="text-[11px] text-slate-500">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-700 leading-relaxed italic relative pl-4 border-l-2 border-rose-300">
                  "{review.shortQuote}"
                </div>

                <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                  <p className="font-semibold text-slate-800 flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1 shrink-0" />
                    {review.courseName}
                  </p>
                  <p className="flex items-center text-slate-400">
                    <MapPin className="w-3 h-3 mr-1 text-slate-400 shrink-0" />
                    {review.location}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs mt-4">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {review.achievement}
                </span>
                <span className="text-rose-600 font-bold group-hover:underline text-[11px]">
                  Leer Historia →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Story */}
        {activeReview && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={activeReview.photo}
                    alt={activeReview.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-rose-100 shadow-md"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{activeReview.name}</h3>
                    <p className="text-xs text-slate-500">{activeReview.role}</p>
                    <p className="text-[11px] text-rose-600 font-semibold">{activeReview.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveReview(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(activeReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-800 ml-2">5.0 / 5.0 Excelente</span>
                </div>
                <p className="font-semibold text-slate-900 text-sm">"{activeReview.shortQuote}"</p>
                <p className="text-slate-600">{activeReview.fullStory}</p>
              </div>

              {/* Certificate Verification Badge in Modal */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center space-x-2 text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Diploma Técnico Verificado en Sistema</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Código de Trazabilidad: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-[10px] text-slate-700">{activeReview.certificateHash}</code>
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveReview(null)}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
