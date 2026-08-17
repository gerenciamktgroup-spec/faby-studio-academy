'use client';

import React, { useState } from 'react';
import { PackageCheck, Sparkles, Check, Plus, Minus, MessageCircle } from 'lucide-react';

interface KitItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  defaultQty: number;
  essential: boolean;
}

export function KitCalculator() {
  const [selectedCourse, setSelectedCourse] = useState<'unas' | 'pestanas' | 'facial'>('unas');
  const [quantities, setQuantities] = useState<Record<string, number>>({
    torno: 1,
    fresas: 1,
    gel_builder: 2,
    base_rubber: 2,
    moldes: 1,
    pincel_liner: 1,
    // Pestanas
    pinzas_volumen: 1,
    adhesivo_elite: 2,
    cajas_pestañas: 3,
    kit_henna: 1,
    parches_hidrogel: 2,
    // Facial
    espatula_ultra: 1,
    serums_hidra: 2,
    peeling_enzimatico: 1,
    mascarillas_hidrogel: 2,
    alta_frecuencia: 1,
  });

  const kitsData: Record<'unas' | 'pestanas' | 'facial', { title: string; subtitle: string; items: KitItem[] }> = {
    unas: {
      title: 'Kit Profesional para Máster en Uñas & Manicura Rusa',
      subtitle: 'Herramientas de salón y consumibles para tus primeras 30 clientas.',
      items: [
        {
          id: 'torno',
          name: 'Mini Torno Profesional 35.000 RPM sin vibración',
          category: 'Aparatología',
          price: 129,
          description: 'Control de velocidad gradual, sentido reversible y pieza de mano ligera.',
          defaultQty: 1,
          essential: true,
        },
        {
          id: 'fresas',
          name: 'Set de 6 Fresas de Diamante Rusas (Llama, Bola, Cilindro)',
          category: 'Herramientas',
          price: 35,
          description: 'Calibre micrométrico para preparación de cutícula sin corte invasivo.',
          defaultQty: 1,
          essential: true,
        },
        {
          id: 'gel_builder',
          name: 'Gel Constructor Autonivelante Premium (50ml)',
          category: 'Producto',
          price: 28,
          description: 'Fórmula europea sin sensación de quemazón en lámpara LED.',
          defaultQty: 2,
          essential: true,
        },
        {
          id: 'base_rubber',
          name: 'Bases Rubber Niveladoras de Alta Resistencia (15ml)',
          category: 'Producto',
          price: 18,
          description: 'Garantiza 4 semanas de adherencia sin desprendimientos en cutícula.',
          defaultQty: 2,
          essential: true,
        },
        {
          id: 'moldes',
          name: 'Rollo de 300 Moldes de Esculpido con Guía Paramétrica',
          category: 'Consumible',
          price: 22,
          description: 'Aluminio reforzado para estructuras Almond, Square y Coffin.',
          defaultQty: 1,
          essential: false,
        },
        {
          id: 'pincel_liner',
          name: 'Pincel Liner Fino 00 Kolinsky para Esmaltado Bajo Cutícula',
          category: 'Pincelería',
          price: 16,
          description: 'Pelo natural para definición limpia del color y líneas finas.',
          defaultQty: 1,
          essential: false,
        },
      ],
    },
    pestanas: {
      title: 'Kit de Inicio para Máster en Pestañas & Volumen Ruso',
      subtitle: 'Pinzas de aislamiento calibradas a mano y adhesivos de polimerización rápida.',
      items: [
        {
          id: 'pinzas_volumen',
          name: 'Set de 2 Pinzas Japonesas Calibradas (Aislamiento + Curva 90°)',
          category: 'Herramientas',
          price: 58,
          description: 'Cierre hermético para atrapar abanicos 0.05mm sin deformarlos.',
          defaultQty: 1,
          essential: true,
        },
        {
          id: 'adhesivo_elite',
          name: 'Adhesivo Médico de Secado Rápido (0.5s - 1s, 5ml)',
          category: 'Química',
          price: 32,
          description: 'Baja emisión de vapores, retención superior a 6 semanas.',
          defaultQty: 2,
          essential: true,
        },
        {
          id: 'cajas_pestañas',
          name: 'Blister Mix de Pestañas Seda Negra Mate (Curvaturas C, CC, D)',
          category: 'Consumible',
          price: 19,
          description: '16 tiras por caja con grosores 0.07 y 0.05 para abanicos rusos.',
          defaultQty: 3,
          essential: true,
        },
        {
          id: 'kit_henna',
          name: 'Kit de Visagismo & Diseño de Cejas con Henna Orgánica',
          category: 'Cejas',
          price: 45,
          description: 'Calibrador vernier, hilo de mapeo teñido y 3 tonos de henna.',
          defaultQty: 1,
          essential: false,
        },
        {
          id: 'parches_hidrogel',
          name: 'Pack de 50 Parches de Hidrogel Calmantes con Colágeno',
          category: 'Consumible',
          price: 15,
          description: 'Aislamiento cómodo del párpado inferior sin pelusas ni irritación.',
          defaultQty: 2,
          essential: false,
        },
      ],
    },
    facial: {
      title: 'Kit de Cabina para Especialización en Cosmetología Facial',
      subtitle: 'Aparatología ultrasónica, sueros con péptidos y peelings de salón.',
      items: [
        {
          id: 'espatula_ultra',
          name: 'Espátula Ultrasónica Profesional 28.000 Hz de Desincrustación',
          category: 'Aparatología',
          price: 95,
          description: 'Modos de limpieza profunda, ionización galvánica y lifting EMS.',
          defaultQty: 1,
          essential: true,
        },
        {
          id: 'serums_hidra',
          name: 'Set de Sueros Hidrafacial (Ácido Hialurónico + Niacinamida + C)',
          category: 'Cosmecéutica',
          price: 65,
          description: 'Fórmula concentrada estéril para renovación dérmica y glow inmediato.',
          defaultQty: 2,
          essential: true,
        },
        {
          id: 'peeling_enzimatico',
          name: 'Peeling Enzimático con Papaína & Ácido Láctico Suave (150ml)',
          category: 'Cosmecéutica',
          price: 38,
          description: 'Exfoliación no irritante apta para todo tipo de biotipos cutáneos.',
          defaultQty: 1,
          essential: true,
        },
        {
          id: 'mascarillas_hidrogel',
          name: 'Pack de 10 Mascarillas Oclusivas Calmantes Post-Tratamiento',
          category: 'Consumible',
          price: 25,
          description: 'Sellado oclusivo calmante para cerrar poros tras la sesión.',
          defaultQty: 2,
          essential: false,
        },
        {
          id: 'alta_frecuencia',
          name: 'Equipo de Alta Frecuencia Portátil con 4 Electrodos de Argón',
          category: 'Aparatología',
          price: 55,
          description: 'Acción bactericida, oxigenante y antiinflamatoria en cabina.',
          defaultQty: 1,
          essential: false,
        },
      ],
    },
  };

  const currentKit = kitsData[selectedCourse];

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const calculateTotal = () => {
    return currentKit.items.reduce((total, item) => {
      const qty = quantities[item.id] !== undefined ? quantities[item.id] : item.defaultQty;
      return total + item.price * qty;
    }, 0);
  };

  const totalBudget = calculateTotal();
  const discountedBudget = Math.round(totalBudget * 0.85); // 15% pack discount

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
            <PackageCheck className="w-3.5 h-3.5 text-rose-600" />
            <span>TRANSPARENCIA TOTAL EN HERRAMIENTAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
            Calculadora de Kit de Materiales Iniciales
          </h2>
          <p className="text-sm text-slate-600">
            Conoce exactamente qué insumos y aparatología profesional necesitas para iniciar tu práctica sin sobrecostes ocultos.
          </p>

          {/* Specialty Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <button
              onClick={() => setSelectedCourse('unas')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedCourse === 'unas'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              💅 Kit Uñas & Manicura Rusa
            </button>
            <button
              onClick={() => setSelectedCourse('pestanas')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedCourse === 'pestanas'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              👁️ Kit Pestañas & Cejas
            </button>
            <button
              onClick={() => setSelectedCourse('facial')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedCourse === 'facial'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              🧴 Kit Cosmetología & Hidrafacial
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Table / List (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold font-display text-slate-900">{currentKit.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{currentKit.subtitle}</p>
            </div>

            <div className="divide-y divide-slate-100">
              {currentKit.items.map((item) => {
                const qty = quantities[item.id] !== undefined ? quantities[item.id] : item.defaultQty;
                return (
                  <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-md">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-900">{item.name}</span>
                        {item.essential && (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 shrink-0">
                            Imprescindible
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{item.description}</p>
                      <p className="text-xs font-semibold text-rose-600">{item.price} € / ud.</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between sm:justify-end space-x-3 shrink-0">
                      <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={qty <= 0}
                          className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-700 disabled:opacity-30 hover:bg-slate-50"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-900">{qty}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[70px]">
                        <span className="text-sm font-extrabold text-slate-900">{item.price * qty} €</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Budget Summary Card (4 cols) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-6 sticky top-28">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                Presupuesto Estimado
              </span>
              <h4 className="text-xl font-bold font-display">Inversión en Insumos</h4>
            </div>

            <div className="space-y-3 border-y border-slate-800 py-4 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Total precio de mercado:</span>
                <span className="line-through text-slate-500">{totalBudget} €</span>
              </div>
              <div className="flex justify-between items-center text-emerald-400 font-semibold">
                <span className="flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1" /> Pack Alumna (15% Dto):
                </span>
                <span className="text-sm font-bold">{discountedBudget} €</span>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Presupuesto sugerido:</span>
                <span className="text-3xl font-extrabold text-white font-display">{discountedBudget} €</span>
              </div>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
              <p className="flex items-center text-emerald-400 font-bold">
                <Check className="w-3.5 h-3.5 mr-1 shrink-0" />
                Marcas profesionales de salón homologadas
              </p>
              <p>Puedes adquirirlo con nosotros o con tus proveedores de confianza con nuestra guía técnica.</p>
            </div>

            <a
              href={`https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20consultar%20el%20kit%20de%20materiales%20para%20el%20m%C3%A1ster%20de%20${selectedCourse}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white py-3.5 rounded-xl font-bold text-xs shadow-lg shadow-rose-600/20 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Disponibilidad de Kit</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
