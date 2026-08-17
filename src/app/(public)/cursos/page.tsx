import React from 'react';
import Link from 'next/link';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { Clock, Award, Star, ArrowRight, MessageCircle, MapPin } from 'lucide-react';

export default function CursosPage() {
  const courses = [
    {
      id: 'c1',
      title: 'Máster Profesional en Uñas de Gel y Acrílico Premium',
      category: 'Uñas & Manicura',
      hours: 60,
      rating: 4.9,
      students: 450,
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop',
      description: 'Manicura rusa combinada con torno, nivelación con base rubber, acrigel, poligel y esculpido estructural.',
      price: '490€',
      href: '/cursos/unas-de-gel-y-acrilico',
    },
    {
      id: 'c2',
      title: 'Especialización en Pestañas, Cejas & Volumen Ruso',
      category: 'Mirada & Cejas',
      hours: 50,
      rating: 4.9,
      students: 320,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
      description: 'Técnica clásica 1:1, abanicos 2D-6D, visagismo y diseño con henna, lifting de pestañas y depilación con hilo.',
      price: '380€',
      href: '/cursos/extensiones-de-pestanas',
    },
    {
      id: 'c3',
      title: 'Curso Superior de Cosmetología Facial & Hidrafacial',
      category: 'Cosmetología Facial',
      hours: 80,
      rating: 5.0,
      students: 280,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
      description: 'Protocolo de Hidrafacial, aparatología en cabina, peelings químicos, diagnóstico de biotipos y renovación dérmica.',
      price: '590€',
      href: '/cursos/cosmetologia-facial',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <PublicHeader />

      <main className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-200 px-3.5 py-1 rounded-full">
            Oferta Formativa Oficial • Madrid
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 mt-3 mb-4">
            Catálogo de Másteres y Especializaciones Estéticas
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Formación de alto impacto con prácticas reales en modelo, corrección docente 1 a 1 y diploma oficial verificable con firma SHA-256.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <img src={course.image} alt={course.title} className="w-full h-52 object-cover" />
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                      {course.category}
                    </span>
                    <span className="flex items-center text-amber-600 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" /> {course.rating}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 font-display leading-snug">{course.title}</h2>
                  <p className="text-xs text-slate-600 leading-relaxed">{course.description}</p>

                  <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-rose-600" />
                      <span>{course.hours} horas de Formación Activa</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Certificación Verificada QR</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <div>
                  <span className="text-xl font-extrabold text-slate-900">{course.price}</span>
                  <span className="text-[10px] text-slate-400 block">3 cuotas disponibles</span>
                </div>
                <Link
                  href={course.href}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center shadow-xs"
                >
                  <span>Ver Programa</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center space-x-2 text-rose-400 text-xs font-bold">
              <MapPin className="w-4 h-4" />
              <span>Sedes Físicas en Madrid (Aluche & Vallecas)</span>
            </div>
            <h3 className="text-xl font-bold font-display">¿Quieres asesoría para elegir tu máster ideal?</h3>
            <p className="text-xs text-slate-300">Habla con Leslie Fabiola o nuestro equipo docente y resuelve todas tus dudas antes de inscribirte.</p>
          </div>
          <a
            href="https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20asesor%C3%ADa%20personalizada%20sobre%20el%20cat%C3%A1logo%20de%20cursos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Asesoría por WhatsApp (+34 614 23 62 00)</span>
          </a>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
