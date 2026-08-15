'use client';

import React, { useState } from 'react';
import {
  Calculator,
  TrendingUp,
  Euro,
  DollarSign,
  PieChart,
  Download,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Clock,
  Briefcase,
  Store,
  Layers,
  ArrowRight,
  Printer,
} from 'lucide-react';

interface PresetService {
  name: string;
  durationHours: number;
  consumablesCost: number;
  marketPriceRange: string;
}

const PRESET_SERVICES: PresetService[] = [
  {
    name: 'Extensiones de Pestañas: 1x1 Clásica',
    durationHours: 1.75,
    consumablesCost: 5.2,
    marketPriceRange: '45€ – 65€',
  },
  {
    name: 'Extensiones de Pestañas: Volumen Ruso 3D-5D',
    durationHours: 2.25,
    consumablesCost: 6.8,
    marketPriceRange: '65€ – 95€',
  },
  {
    name: 'Uñas Esculpidas en Gel / Acrílico (Primera Puesta)',
    durationHours: 2.0,
    consumablesCost: 7.5,
    marketPriceRange: '50€ – 75€',
  },
  {
    name: 'Relleno de Uñas / Mantenimiento 3 Semanas',
    durationHours: 1.25,
    consumablesCost: 3.8,
    marketPriceRange: '35€ – 50€',
  },
  {
    name: 'Tratamiento Facial Profundo & Peeling Suave',
    durationHours: 1.5,
    consumablesCost: 8.5,
    marketPriceRange: '60€ – 90€',
  },
];

export default function CalculadoraRentabilidadPage() {
  // Active selected preset or custom
  const [serviceName, setServiceName] = useState(PRESET_SERVICES[1].name);
  const [durationHours, setDurationHours] = useState(PRESET_SERVICES[1].durationHours);
  const [consumablesCost, setConsumablesCost] = useState(PRESET_SERVICES[1].consumablesCost);

  // Business parameters
  const [monthlyOverheads, setMonthlyOverheads] = useState(450); // Alquiler cabina + luz + seguro
  const [monthlyServices, setMonthlyServices] = useState(40); // 40 clientas al mes
  const [targetMonthlySalary, setTargetMonthlySalary] = useState(1800); // 1.800€ netos deseados
  const [targetMarginPct, setTargetMarginPct] = useState(65); // 65% de margen

  const handleSelectPreset = (preset: PresetService) => {
    setServiceName(preset.name);
    setDurationHours(preset.durationHours);
    setConsumablesCost(preset.consumablesCost);
  };

  // Calculations
  const overheadPerService = monthlyServices > 0 ? monthlyOverheads / monthlyServices : 0;
  const laborTargetPerService = monthlyServices > 0 ? targetMonthlySalary / monthlyServices : 0;
  const totalCostPerService = consumablesCost + overheadPerService;

  // Recommended PVP calculation
  const recommendedPrice = (totalCostPerService + laborTargetPerService) * (1 + (100 - targetMarginPct) / 100);
  const minimumBreakEvenPrice = totalCostPerService;
  const netProfitPerService = Math.max(0, recommendedPrice - totalCostPerService);
  const monthlyRevenue = recommendedPrice * monthlyServices;
  const monthlyNetProfit = netProfitPerService * monthlyServices;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold text-emerald-800">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Beauty Business Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-2">
            Calculadora de Costes & Rentabilidad de Salón
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Calcula con precisión matemática el coste unitario de cada servicio, tus gastos fijos prorrateados y el Precio de Venta al Público (PVP) sugerido para garantizar un negocio altamente rentable.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center space-x-2 self-start"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Imprimir / Guardar PDF</span>
        </button>
      </div>

      {/* Preset Service Templates */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          Seleccionar Servicio Prediseñado:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {PRESET_SERVICES.map((p, idx) => {
            const isSelected = serviceName === p.name;
            return (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p)}
                className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                  isSelected
                    ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-500/20 text-rose-900 font-bold shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <p className="line-clamp-2 text-[11px] leading-snug">{p.name}</p>
                <div className="mt-2 flex justify-between items-center text-[10px] text-slate-400">
                  <span>{p.durationHours}h</span>
                  <span className="font-semibold text-rose-700">{p.marketPriceRange}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Inputs + Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Inputs */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2 border-b border-slate-100 pb-3">
            <Store className="w-4 h-4 text-rose-600" />
            <span>1. Parámetros del Servicio & Gastos</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nombre del Servicio</label>
              <input
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Duración (Horas)</label>
                <input
                  type="number"
                  step="0.25"
                  min="0.5"
                  value={durationHours}
                  onChange={(e) => setDurationHours(parseFloat(e.target.value) || 1)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Coste de Insumos (€/servicio)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={consumablesCost}
                  onChange={(e) => setConsumablesCost(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-rose-500"
                />
                <span className="text-[10px] text-slate-400">Blíster, adhesivo, parches, desinfección</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                <span>2. Estructura de Salón & Metas Mensuales</span>
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Costes Fijos Mensuales (€)
                  </label>
                  <input
                    type="number"
                    step="20"
                    min="0"
                    value={monthlyOverheads}
                    onChange={(e) => setMonthlyOverheads(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                  <span className="text-[10px] text-slate-400">Alquiler cabina + luz + seguro + autónomos</span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Clientas Estimadas / Mes
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={monthlyServices}
                    onChange={(e) => setMonthlyServices(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                  <span className="text-[10px] text-slate-400">Aprox. {Math.round(monthlyServices / 4)} por semana</span>
                </div>
              </div>

              <div className="mt-3">
                <label className="block font-bold text-slate-700 mb-1">
                  Sueldo Neto Mensual Deseado (€)
                </label>
                <input
                  type="number"
                  step="100"
                  min="500"
                  value={targetMonthlySalary}
                  onChange={(e) => setTargetMonthlySalary(parseFloat(e.target.value) || 1000)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Results & Pricing Recommendation */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Pricing Recommendation Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>PVP Recomendado Fabi Studio</span>
              </span>
              <span className="text-xs text-slate-300">{durationHours}h de servicio</span>
            </div>

            <div>
              <p className="text-xs text-slate-300 font-semibold">Tarifa Sugerida de Venta al Público</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-4xl sm:text-5xl font-black font-display text-white mt-1">
                  {Math.round(recommendedPrice)} €
                </p>
                <span className="text-xs text-rose-300 font-bold">/ sesión</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Garantiza tu sueldo de {targetMonthlySalary}€/mes y cubre todos los gastos operativos.
              </p>
            </div>

            {/* Quick Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <p className="text-slate-400 text-[10px] uppercase font-bold">Coste Real Insumos</p>
                <p className="text-lg font-bold text-white mt-0.5">{consumablesCost.toFixed(2)} €</p>
              </div>

              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <p className="text-slate-400 text-[10px] uppercase font-bold">Coste Fijo Prorrateado</p>
                <p className="text-lg font-bold text-white mt-0.5">{overheadPerService.toFixed(2)} €</p>
              </div>

              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <p className="text-slate-400 text-[10px] uppercase font-bold">Precio de Equilibrio (Mínimo)</p>
                <p className="text-lg font-bold text-amber-300 mt-0.5">
                  {totalCostPerService.toFixed(2)} €
                </p>
              </div>

              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <p className="text-slate-400 text-[10px] uppercase font-bold">Beneficio Neto / Clienta</p>
                <p className="text-lg font-bold text-emerald-400 mt-0.5">
                  +{Math.round(netProfitPerService)} €
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Projection Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Proyección Financiera Mensual ({monthlyServices} Servicios)</span>
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-500 text-[10px] font-bold uppercase">Facturación Bruta Mes</span>
                <p className="text-xl font-extrabold text-slate-900 font-display mt-0.5">
                  {Math.round(monthlyRevenue)} €
                </p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="text-emerald-800 text-[10px] font-bold uppercase">Beneficio Neto Mensual</span>
                <p className="text-xl font-extrabold text-emerald-700 font-display mt-0.5">
                  {Math.round(monthlyNetProfit)} €
                </p>
              </div>
            </div>

            <div className="p-3 bg-rose-50/60 rounded-2xl border border-rose-200 text-[11px] text-slate-700 leading-relaxed flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>
                <strong>Consejo de Negocio Fabi Studio:</strong> Nunca compitas por precio bajando de{' '}
                <strong>{Math.round(minimumBreakEvenPrice + 20)}€</strong>. La formación y certificación de alto nivel te permiten posicionarte como especialista premium.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
