'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Clock, Award } from 'lucide-react';

export function CourseCatalogCards() {
  const courses = [
    {
      id: 'unas',
      title: 'Máster Profesional en Uñas de Gel & Acrílico Premium',
      badge: 'Alta Demanda',
      category: 'Uñas & Manicura',
      hours: '60h Activas',
      rating: 4.9,
      students: 450,
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop',
      description: 'Manicura rusa combinada con torno, nivelación con base rubber, acrigel, poligel y esculpido estructural con molde.',
      price: '490€',
      installments: 'o 3 cuotas de 163€ sin intereses',
      href: '/cursos/unas-de-gel-y-acrilico',
    },
    {
      id: 'pestanas',
      title: 'Especialización en Pestañas, Cejas & Volumen Ruso',
      badge: 'Más Vendido',
      category: 'Mirada & Cejas',
      hours: '50h Activas',
      rating: 4.9,
      students: 320,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
      description: 'Técnica clásica 1:1, abanicos 2D-6D, visagismo con henna, lifting de pestañas, laminado y depilación con hilo.',
      price: '380€',
      installments: 'o 3 cuotas de 126€ sin intereses',
      href: '/cursos/extensiones-de-pestanas',
    },
    {
      id: 'facial',
      title: 'Curso Superior de Cosmetología Facial & Hidrafacial',
      badge: 'Grado Superior',
      category: 'Cosmetología Facial',
      hours: '80h Activas',
      rating: 5.0,
      students: 280,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
      description: 'Protocolos de Hidrafacial, aparatología en cabina, peelings químicos, diagnóstico de biotipos y renovación dérmica.',
      price: '590€',
      installments: 'o 3 cuotas de 196€ sin intereses',
      href: '/cursos/cosmetologia-facial',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-200 px-3.5 py-1 rounded-full">
              Catálogo Académico Oficial
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 mt-2">
              Cursos & Másteres de Especialización Estética
            </h2>
          </div>
          <Link
            href="/cursos"
            className="text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors flex items-center shrink-0"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700 text-rose-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {course.badge}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-amber-600 text-xs font-bold px-2.5 py-1 rounded-full flex items-center shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                    <span>{course.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                    {course.category}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 font-display leading-snug group-hover:text-rose-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  <div className="space-y-1.5 pt-2 text-xs text-slate-600 border-t border-slate-100">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-rose-600" />
                      <span>{course.hours} lectivas activas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Certificado Digital Verificable SHA-256</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <div>
                  <span className="text-2xl font-extrabold text-slate-900">{course.price}</span>
                  <span className="text-[10px] text-slate-400 block">{course.installments}</span>
                </div>
                <Link
                  href={course.href}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-600/20 hover:scale-105 flex items-center"
                >
                  <span>Ver Programa</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
