'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send, Building2, HelpCircle } from 'lucide-react';

export function WhatsAppAdmissionsWidget({ phone }: { phone: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('info');

  const getWhatsAppLink = () => {
    let text = 'Hola Faby Studio, quiero información sobre los cursos y programas especializados.';
    if (selectedTopic === 'efectivo') {
      text = 'Hola Faby Studio, quiero consultar las opciones de pago de mi matrícula.';
    } else if (selectedTopic === 'tutorias') {
      text = 'Hola Faby Studio, quiero consultar sobre las tutorías 1 a 1 y la certificación técnica.';
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-5 w-80 sm:w-96 space-y-4 animate-in fade-in slide-in-from-bottom-3 text-xs text-slate-800">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Admisiones FABY STUDIO</p>
                <p className="text-[10px] text-emerald-700 font-semibold flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"></span> Atención Rápida por WhatsApp
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 font-bold"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-slate-600 leading-relaxed text-[11px]">
            ¡Hola! ¿Tienes dudas con tu matrícula, quieres reservar tu plaza o prefieres pagar en efectivo en el estudio?
          </div>

          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700 text-[11px]">Selecciona el motivo de tu consulta:</label>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setSelectedTopic('info')}
                className={`w-full text-left p-2.5 rounded-xl border text-[11px] font-semibold transition-all ${
                  selectedTopic === 'info'
                    ? 'bg-rose-50 border-rose-300 text-rose-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                🎓 Información sobre temarios y precios
              </button>

              <button
                type="button"
                onClick={() => setSelectedTopic('efectivo')}
                className={`w-full text-left p-2.5 rounded-xl border text-[11px] font-semibold transition-all ${
                  selectedTopic === 'efectivo'
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                🏢 Consultar opciones de pago
              </button>

              <button
                type="button"
                onClick={() => setSelectedTopic('tutorias')}
                className={`w-full text-left p-2.5 rounded-xl border text-[11px] font-semibold transition-all ${
                  selectedTopic === 'tutorias'
                    ? 'bg-purple-50 border-purple-300 text-purple-900'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                👩‍🏫 Tutorías 1 a 1 y certificación técnica
              </button>
            </div>
          </div>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Abrir Conversación en WhatsApp</span>
          </a>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl transition-all hover:scale-105 flex items-center space-x-2 group"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pr-1">
            ¿Dudas? Escríbenos
          </span>
        </button>
      )}
    </div>
  );
}
