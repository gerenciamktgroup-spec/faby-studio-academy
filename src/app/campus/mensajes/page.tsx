'use client';

import React, { useState } from 'react';
import { Send, User, CheckCheck, Clock, Paperclip, Sparkles } from 'lucide-react';

export default function MensajesPage() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Laura Gómez',
      senderRole: 'Tutora Académica',
      text: '¡Hola Lucía! He revisado las fotos de tu primera práctica de técnica clásica. Tu aislamiento en el ojo derecho está impecable. Sube la foto del mapping para validar la simetría.',
      time: '10:45',
      isMe: false,
    },
    {
      id: 2,
      sender: 'Lucía Martínez',
      senderRole: 'Alumna',
      text: '¡Hola Laura! Muchísimas gracias. Acabo de subir la ficha de mapping en la pestaña de proyectos. Tuve un poco de dificultad con la curvatura D en el lagrimal, ¿recomiendas pasar a C?',
      time: '11:15',
      isMe: true,
    },
    {
      id: 3,
      sender: 'Laura Gómez',
      senderRole: 'Tutora Académica',
      text: 'Sí, totalmente. Para lagrimales internos muy sensibles o finos, la curvatura C en 7mm u 8mm te dará una transición mucho más suave sin forzar la pestaña.',
      time: '11:20',
      isMe: false,
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: 'Lucía Martínez',
        senderRole: 'Alumna',
        text: inputText.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
      },
    ]);
    setInputText('');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Comunicación Directa</span>
        <h1 className="text-2xl font-bold font-display text-slate-900 mt-1">Mensajería con Tutora Asignada</h1>
        <p className="text-xs text-slate-500">Resuelve dudas técnicas y recibe correcciones personalizadas de Laura Gómez.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col h-[580px] overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-sm border border-rose-200">
              LG
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Laura Gómez</p>
              <p className="text-[10px] text-emerald-700 font-semibold flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span> En línea (Tutora Especialista)
              </p>
            </div>
          </div>
          <span className="text-[10px] text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full font-medium">
            Curso Profesional de Pestañas
          </span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/40">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col max-w-[80%] ${m.isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[11px] font-bold text-slate-700">{m.sender}</span>
                <span className="text-[10px] text-slate-400">{m.time}</span>
              </div>

              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                  m.isMe
                    ? 'bg-rose-600 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                }`}
              >
                <p>{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe tu mensaje a Laura Gómez..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
          />
          <button
            type="submit"
            className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enviar</span>
          </button>
        </form>
      </div>
    </div>
  );
}
