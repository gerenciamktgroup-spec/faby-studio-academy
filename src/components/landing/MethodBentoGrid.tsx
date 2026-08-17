'use client';

import React from 'react';
import { Clock, ShieldCheck, Award, Calculator, Eye, Sparkles, CheckCircle2 } from 'lucide-react';

export function MethodBentoGrid() {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>ESTÁNDAR DE FORMACIÓN AUDITABLE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
            Nuestra Metodología Pedagógica en 4 Pilares
          </h2>
          <p className="text-sm text-slate-600">
            Combinamos técnicas estéticas de vanguardia con tecnología auditable para garantizar que cada alumna adquiera destreza manual real y rigor profesional.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Active Learning Heartbeat (Wide 7 cols) */}
          <div className="md:col-span-7 bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Innovación LMS</span>
                <h3 className="text-xl font-bold text-slate-900 font-display mt-0.5">
                  Active Learning Heartbeat (Trazabilidad Real)
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nuestra plataforma mide únicamente el tiempo de interacción activa real (pulsos cada 45 segundos), descartando el tiempo inactivo. Así garantizamos que tu diploma certifique horas lectivas efectivas ante empleadores y centros de estética.
              </p>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-500 pt-3 border-t border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Cómputo auditable y verificado para tu expediente</span>
            </div>
          </div>

          {/* Card 2: 1 to 1 Practice Rubric (5 cols) */}
          <div className="md:col-span-5 bg-gradient-to-br from-rose-900 to-slate-900 text-white p-8 rounded-3xl border border-rose-800 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">Corrección Docente</span>
                <h3 className="text-xl font-bold font-display mt-0.5">
                  Rúbricas Visuales 1 a 1
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Subes fotografías macro de tus modelos. Leslie Fabiola y las tutoras analizan ápice, curvatura, aislamiento o higiene colocando notas directas para que corrijas cada detalle.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-rose-200 font-semibold pt-3 border-t border-rose-800/60">
              <span>Nota mínima exigida: 70/100 para aprobar</span>
            </div>
          </div>

          {/* Card 3: Profit Calculator (5 cols) */}
          <div className="md:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Herramienta Financiera</span>
                <h3 className="text-xl font-bold text-slate-900 font-display mt-0.5">
                  Calculadora de Costes en Cabina
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Módulo interactivo dentro del campus para calcular el coste exacto de monómero, gel, sueros o adhesivos por servicio y fijar tus tarifas con margen neto seguro.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-emerald-700 font-semibold pt-3 border-t border-slate-100">
              <span>Acceso de por vida incluido con tu matrícula</span>
            </div>
          </div>

          {/* Card 4: SHA-256 Verifiable Diplomas (Wide 7 cols) */}
          <div className="md:col-span-7 bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">Acreditación Segura</span>
                <h3 className="text-xl font-bold font-display mt-0.5">
                  Diplomas Digitales con Código QR & Hash SHA-256
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cada certificado emitido contiene una huella digital única verificable en nuestra web oficial. Centros de belleza y clientas pueden escanear el QR para confirmar la autenticidad e integridad de tu título.
              </p>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-400 pt-3 border-t border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Validador público operativo las 24 horas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
