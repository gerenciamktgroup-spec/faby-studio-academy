'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Tooltip Popup on Desktop */}
      {isOpen && (
        <div className="mb-3 bg-white p-4 rounded-2xl shadow-2xl border border-slate-200 max-w-xs text-xs text-slate-700 space-y-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-900">Leslie Fabiola (Faby Studio)</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-slate-600">
            ¡Hola! ¿Tienes dudas sobre qué máster elegir o quieres agendar una visita a nuestras sedes en Madrid? Escríbeme directamente.
          </p>
          <a
            href="https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20asesor%C3%ADa%20personalizada%20sobre%20los%20m%C3%A1steres"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs transition-colors shadow-md shadow-emerald-500/20"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Abrir Chat de WhatsApp</span>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden sm:inline-flex items-center space-x-1.5 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg border border-slate-800 hover:bg-slate-900 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Asesoría en Directo</span>
        </button>

        <a
          href="https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20asesor%C3%ADa%20personalizada%20sobre%20los%20m%C3%A1steres"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform relative group"
        >
          <MessageCircle className="w-7 h-7 fill-white" />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full animate-ping" />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
        </a>
      </div>
    </div>
  );
}
