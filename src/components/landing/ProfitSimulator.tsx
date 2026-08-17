'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export function ProfitSimulator() {
  const [clientsPerDay, setClientsPerDay] = useState(3);
  const [pricePerService, setPricePerService] = useState(45);
  const [daysPerWeek, setDaysPerWeek] = useState(5);

  const daysPerMonth = daysPerWeek * 4;
  const totalServicesMonth = clientsPerDay * daysPerMonth;
  const monthlyRevenue = totalServicesMonth * pricePerService;
  const annualRevenue = monthlyRevenue * 12;

  // Average course price is ~490€
  const coursePrice = 490;
  const daysToPayoff = Math.max(1, Math.ceil(coursePrice / (clientsPerDay * pricePerService)));

  return (
    <section className="py-20 bg-slate-100/60 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>SIMULADOR DE RENTABILIDAD & NEGOCIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
            ¿Cuánto Puedes Facturar al Mes con tu Nueva Profesión?
          </h2>
          <p className="text-sm text-slate-600">
            Calcula en tiempo real tus ingresos estimados trabajando como especialista en uñas, pestañas o cosmetología facial independiente.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Form (Left) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-4">
              {/* Slider 1: Clients Per Day */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Clientas atendidas por día:</span>
                  <span className="text-rose-600 text-sm bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                    {clientsPerDay} {clientsPerDay === 1 ? 'clienta' : 'clientas'} / día
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={clientsPerDay}
                  onChange={(e) => setClientsPerDay(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1 (Ritmo suave)</span>
                  <span>3 (Media salón)</span>
                  <span>6 (Agenda completa)</span>
                </div>
              </div>

              {/* Slider 2: Price Per Service */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Precio medio por servicio:</span>
                  <span className="text-rose-600 text-sm bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                    {pricePerService} € / servicio
                  </span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="85"
                  step="5"
                  value={pricePerService}
                  onChange={(e) => setPricePerService(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>25€ (Manicura básica)</span>
                  <span>45€ (Set Gel / Pestañas 1:1)</span>
                  <span>85€ (Volumen Ruso / Hidrafacial)</span>
                </div>
              </div>

              {/* Slider 3: Days per week */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Días de trabajo por semana:</span>
                  <span className="text-slate-700 text-sm bg-slate-100 px-2.5 py-0.5 rounded-lg">
                    {daysPerWeek} días / semana
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="6"
                  step="1"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>3 días (Parcial)</span>
                  <span>5 días (Estándar L-V)</span>
                  <span>6 días (Intensivo)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <p>• Estimación bruta calculada para {totalServicesMonth} citas mensuales.</p>
              <p>• Los precios corresponden a tarifas promedio actuales en salones de Madrid y España.</p>
            </div>
          </div>

          {/* Results Card (Right) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-7 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full">
                  Facturación Proyectada
                </span>
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>

              <div>
                <p className="text-xs text-slate-400">Ingreso Mensual Estimado</p>
                <div className="text-4xl sm:text-5xl font-extrabold text-white font-display mt-1">
                  {monthlyRevenue.toLocaleString('es-ES')} €
                  <span className="text-sm font-normal text-slate-400"> / mes</span>
                </div>
                <p className="text-xs text-emerald-400 font-semibold mt-1">
                  ≈ {(annualRevenue).toLocaleString('es-ES')} € facturación anual bruta
                </p>
              </div>

              {/* Payoff highlight */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1.5">
                <div className="flex items-center text-xs font-bold text-amber-400">
                  <Sparkles className="w-4 h-4 mr-1.5 shrink-0" />
                  <span>Amortización del Máster (~490€)</span>
                </div>
                <p className="text-xs text-slate-300">
                  Recuperas el 100% de tu inversión en solo <strong className="text-white text-sm">{daysToPayoff} {daysToPayoff === 1 ? 'día' : 'días'} de trabajo</strong>.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/cursos"
                className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white py-3.5 rounded-xl font-bold text-xs shadow-lg shadow-fabi-pink/20 transition-all hover:scale-[1.02]"
              >
                <span>Elegir mi Especialidad & Empezar</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-center text-slate-400">
                Aprende a presupuestar materiales con la calculadora del campus
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
