'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, CheckCircle2, ArrowRight, Lock } from 'lucide-react';

export function MasteryGuarantee() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-rose-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl border border-rose-500/30 p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-rose-400">
                  Compromiso de Excelencia
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  Garantía de Maestría & Éxito Profesional
                </h3>
              </div>
            </div>
            <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0">
              <Lock className="w-3.5 h-3.5" />
              <span>Matrícula 100% Protegida</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p className="font-semibold text-white text-base">
                "Dominio asegurado de la técnica o te acompañamos personalmente hasta conseguirlo."
              </p>
              <p>
                Confiamos plenamente en la metodología pedagógica de <strong>FABY STUDIO ACADEMY</strong>. Si completando tu máster y entregando tus prácticas guiadas sobre modelo real sientes que no has alcanzado la soltura y precisión para atender clientas de pago, **la Profesora Leslie Fabiola te brindará tutorías de refuerzo 1 a 1 sin coste adicional** hasta que domines la técnica, o te devolvemos el 100% de tu matrícula.
              </p>
              <p className="text-slate-400 text-xs">
                Además, gracias a la calculadora de costes y las lecciones de negocio incluidas, garantizamos que recuperarás el valor de tu curso en pocas semanas con tus primeras clientas.
              </p>
            </div>

            <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                Pilares de Certeza
              </span>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>+15 Años de experiencia real avalada en Madrid</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Corrección visual pin a pin sobre fotos macro</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Diploma digital con firma hash SHA-256</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Pago fraccionado en 3 cuotas sin intereses</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Sello de Calidad Educativa FABYSTUDIO • Sede Aluche & Vallecas</span>
            </div>

            <Link
              href="/cursos"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white px-8 py-3.5 rounded-xl font-bold text-xs shadow-lg shadow-rose-600/30 transition-all hover:scale-105 shrink-0"
            >
              <span>Elegir mi Máster con Garantía</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
