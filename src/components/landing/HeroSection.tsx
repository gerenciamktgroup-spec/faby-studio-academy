'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Play, ArrowRight, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Academia & Centro de Estética en Madrid • Aluche & Vallecas</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.15] text-slate-900">
              Transforma tu Pasión por la Belleza en un{' '}
              <span className="text-fabi-pink">Negocio Rentable y Certificado</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
              Más de <strong>15 años de experiencia</strong> y <strong>80.000 clientas y alumnas</strong> avalan nuestra metodología. Aprende Uñas de Gel & Acrílico, Hidrafacial y Pestañas con tutorías 1 a 1 y certificación digital verificable.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/cursos"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-fabi-pink/20 transition-all hover:scale-[1.02]"
              >
                <span>Explorar Másteres</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/campus"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-50 border border-slate-200 hover:border-rose-300 text-slate-800 px-6 py-4 rounded-xl font-semibold text-base transition-colors"
              >
                <Play className="w-4 h-4 text-fabi-pink fill-fabi-pink" />
                <span>Acceso Alumnas</span>
              </Link>
            </div>

            {/* Trust Counters */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl font-bold text-slate-900 font-display">+15 Años</p>
                <p className="text-[11px] text-slate-500">Experiencia en Madrid</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-fabi-pink font-display">+80k</p>
                <p className="text-[11px] text-slate-500">Alumnas & Clientas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 font-display">2 Sedes</p>
                <p className="text-[11px] text-slate-500">Aluche & Vallecas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600 font-display">SHA-256</p>
                <p className="text-[11px] text-slate-500">Diploma Verificable</p>
              </div>
            </div>
          </div>

          {/* Right Card / Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden bg-white border border-slate-200 p-4 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop"
                alt="Fabi Studio Master Studio Madrid"
                className="w-full h-72 object-cover rounded-2xl mb-4"
              />

              <div className="space-y-3 p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wider bg-rose-50 px-2.5 py-0.5 rounded-full">
                    Máster Destacado
                  </span>
                  <span className="flex items-center text-amber-600 text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" /> 4.9 / 5.0
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Máster Profesional en Uñas de Gel & Acrílico Premium
                </h3>

                <p className="text-xs text-slate-600">
                  60 Horas lectivas • Manicura Rusa combinada con torno • Tutorías 1 a 1 y diploma oficial verificable.
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <div>
                    <span className="text-lg font-extrabold text-slate-900">490€</span>
                    <span className="text-[10px] text-slate-400 block">o 3 cuotas sin intereses</span>
                  </div>
                  <Link
                    href="/cursos/unas-de-gel-y-acrilico"
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors flex items-center"
                  >
                    Ver temario completo <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
