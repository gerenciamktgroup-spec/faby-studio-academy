'use client';

import React from 'react';
import { Building2, GraduationCap, MapPin, Clock, MessageCircle, Phone } from 'lucide-react';

export function MadridSedesShowcase() {
  return (
    <section className="py-20 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-rose-700 uppercase tracking-widest bg-rose-100/80 px-3.5 py-1 rounded-full border border-rose-200">
            Presencia Física & Respaldo Real en Madrid
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
            Nuestras 2 Sedes Físicas en Madrid
          </h2>
          <p className="text-sm text-slate-600">
            A diferencia de plataformas anónimas, en FABY STUDIO contamos con centros físicos consolidados donde puedes visitarnos, adquirir materiales o complementar tu formación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Sede 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full">
                  Sede Central & Salón
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">Sede Plaza Aluche</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-start">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-rose-500 shrink-0 mt-0.5" />
                  Centro Comercial Plaza Aluche, Av. de los Poblados 58, 28044 Madrid
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Salón especializado en estética facial, micropigmentación, manicura y atención presencial a alumnas.
              </p>
            </div>
            <div className="pt-3 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100">
              <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-slate-400" /> Lun - Vie: 07:00 - 18:00</span>
              <span className="font-semibold text-emerald-600">Abierto al público</span>
            </div>
          </div>

          {/* Sede 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                  Centro de Formación
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">Sede Puente de Vallecas</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-start">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-purple-500 shrink-0 mt-0.5" />
                  Centro de Formación & Estética Avanzada, Puente de Vallecas, Madrid
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Espacio acondicionado para workshops intensivos, prácticas con modelos reales y masterclasses técnicas.
              </p>
            </div>
            <div className="pt-3 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100">
              <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-slate-400" /> Citas & Formación</span>
              <span className="font-semibold text-purple-600">Grupos Reducidos</span>
            </div>
          </div>
        </div>

        {/* Direct WhatsApp Callout */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold font-display">¿Tienes dudas o deseas atención personalizada?</h4>
            <p className="text-xs text-slate-300">Habla directamente con la Profesora Faby y nuestro equipo de asesoría académica.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+34614236200"
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-xl font-bold text-xs border border-slate-700 transition-colors"
            >
              <Phone className="w-4 h-4 text-rose-400" />
              <span>+34 614 23 62 00</span>
            </a>
            <a
              href="https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20asesor%C3%ADa%20sobre%20los%20m%C3%A1steres%20profesionales"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Asesoría</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
