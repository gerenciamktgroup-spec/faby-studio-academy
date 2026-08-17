'use client';

import React from 'react';
import { HeartHandshake, CheckCircle2, Award, Users, Star } from 'lucide-react';

export function FounderEditorial() {
  return (
    <section className="py-20 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="Leslie Fabiola Larico Zapana - Fundadora & Directora de Faby Studio"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-widest">
                  Fundadora & Master Educator
                </span>
                <h3 className="text-2xl font-bold font-display">Leslie Fabiola Larico Zapana</h3>
                <p className="text-xs text-slate-300 mt-0.5">Profesora Faby • +15 Años de Excelencia en Madrid</p>
                <div className="flex items-center space-x-3 pt-3 mt-3 border-t border-slate-800 text-xs text-slate-300">
                  <span className="flex items-center"><Users className="w-3.5 h-3.5 mr-1 text-rose-400" /> +80k Atendidas</span>
                  <span className="flex items-center"><Star className="w-3.5 h-3.5 mr-1 text-amber-400 fill-amber-400" /> 4.9★ Alumnas</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Nuestra Filosofía de Formación</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 leading-tight">
              "En Faby Studio transformamos tu pasión en una profesión de alto nivel y resultados reales"
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Nuestra misión no es venderte vídeos pregrabados sin soporte, sino guiarte paso a paso con estándares de salón de lujo. Te enseñamos la técnica milimétrica, la bioseguridad higiénico-sanitaria y las herramientas de cálculo financiero para que cobres lo que realmente vale tu trabajo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Corrección 1 a 1 de Prácticas</p>
                  <p className="text-slate-500 mt-0.5">Rúbricas visuales detalladas con notas directas de la docente.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Calculadora de Márgenes</p>
                  <p className="text-slate-500 mt-0.5">Herramienta integrada para costear insumos y fijar precios de salón.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3 text-xs text-slate-500">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Titulación profesional reconocida con código QR y verificación pública SHA-256.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
