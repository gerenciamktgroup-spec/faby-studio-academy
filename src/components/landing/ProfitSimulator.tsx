'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function ProfitSimulator() {
  const [clientsPerDay, setClientsPerDay] = useState(3);
  const [pricePerService, setPricePerService] = useState(45);
  const [daysPerWeek, setDaysPerWeek] = useState(5);

  const daysPerMonth = daysPerWeek * 4;
  const totalServicesMonth = clientsPerDay * daysPerMonth;
  const monthlyRevenue = totalServicesMonth * pricePerService;

  return (
    <section className="py-20 lg:py-32 bg-[#0A0A0D] text-[#F8F5F1] border-b border-[#1C1C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A880]">
            Proyección en Cabina
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[0.95]">
            ¿Cómo se traduce una nueva técnica a tu cabina?
          </h2>
          <p className="text-sm sm:text-base text-[#A8A49F] font-sans max-w-xl leading-relaxed">
            Una estimación visual para comprender cómo el dominio técnico y la fijación de tarifas profesionales impactan en la facturación mensual de tu estudio.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Controls Left (7 cols) */}
          <div className="lg:col-span-7 bg-[#111117] border border-[#1C1C24] p-8 sm:p-10 space-y-8">
            <div className="space-y-6">
              {/* Slider 1 */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider font-semibold text-[#F8F5F1]">
                  <span>Clientas atendidas por día:</span>
                  <span className="text-white font-mono text-sm bg-[#1C1C24] px-3 py-1 border border-[#2A2A35]">
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
                  className="w-full h-1.5 bg-[#1C1C24] rounded-none appearance-none cursor-pointer accent-[#DD006B]"
                />
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#6E6B68]">
                  <span>1 (Media jornada)</span>
                  <span>3 (Ritmo estándar)</span>
                  <span>6 (Agenda completa)</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider font-semibold text-[#F8F5F1]">
                  <span>Precio medio por servicio:</span>
                  <span className="text-white font-mono text-sm bg-[#1C1C24] px-3 py-1 border border-[#2A2A35]">
                    {pricePerService} € / cita
                  </span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="85"
                  step="5"
                  value={pricePerService}
                  onChange={(e) => setPricePerService(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#1C1C24] rounded-none appearance-none cursor-pointer accent-[#DD006B]"
                />
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#6E6B68]">
                  <span>25 € (Básico)</span>
                  <span>45 € (Set Gel / Pestañas)</span>
                  <span>85 € (Volumen / Hidrafacial)</span>
                </div>
              </div>

              {/* Slider 3 */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider font-semibold text-[#F8F5F1]">
                  <span>Días de trabajo por semana:</span>
                  <span className="text-white font-mono text-sm bg-[#1C1C24] px-3 py-1 border border-[#2A2A35]">
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
                  className="w-full h-1.5 bg-[#1C1C24] rounded-none appearance-none cursor-pointer accent-[#C5A880]"
                />
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#6E6B68]">
                  <span>3 días</span>
                  <span>5 días (L-V)</span>
                  <span>6 días</span>
                </div>
              </div>
            </div>

            {/* Legal / Responsible framing */}
            <div className="pt-4 border-t border-[#1C1C24] text-xs text-[#6E6B68] font-sans leading-relaxed">
              <p>
                * <strong>Nota de transparencia:</strong> Simulación orientativa calculada para {totalServicesMonth} citas mensuales. Los resultados reales dependen de tus tarifas, costes de insumos, localización, demanda y volumen de clientela.
              </p>
            </div>
          </div>

          {/* Results Right (5 cols) */}
          <div className="lg:col-span-5 bg-[#0A0A0D] border border-[#2A2A35] p-8 sm:p-10 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-sans font-semibold block">
                Facturación Bruta Proyectada
              </span>

              <div>
                <p className="text-xs text-[#A8A49F] uppercase tracking-wider font-sans">
                  Ingreso Mensual Estimado
                </p>
                <div className="font-editorial text-5xl sm:text-6xl font-bold text-white mt-1 tracking-tight">
                  {monthlyRevenue.toLocaleString('es-ES')} €
                  <span className="text-sm font-sans font-normal text-[#A8A49F]"> / mes</span>
                </div>
                <p className="text-xs text-[#C5A880] font-sans mt-2">
                  Basado en {totalServicesMonth} servicios al mes a {pricePerService} €/servicio.
                </p>
              </div>

              <div className="p-4 bg-[#111117] border border-[#1C1C24] space-y-2 text-xs text-[#A8A49F] font-sans">
                <p className="text-white font-semibold flex items-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#DD006B] mr-2" />
                  Calculadora de cabina incluida en el Campus
                </p>
                <p className="text-[#8A8682]">
                  Aprenderás a calcular el coste por gramo de producto para fijar precios con margen seguro.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1C1C24]">
              <Link
                href="/cursos"
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#F8F5F1] hover:bg-white text-[#0A0A0D] py-4 text-xs font-semibold tracking-widest uppercase transition-colors group"
              >
                <span>Descubrir formaciones oficiales</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
