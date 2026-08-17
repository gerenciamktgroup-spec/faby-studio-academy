'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  return (
    <aside aria-label="Contacto por WhatsApp" className="fixed bottom-6 right-6 z-40 flex items-center">
      <a
        href="https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20asesor%C3%ADa%20sobre%20las%20formaciones%20profesionales"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar con una asesora por WhatsApp"
        className="group inline-flex items-center space-x-2.5 bg-[#0A0A0D] text-[#F8F5F1] hover:bg-[#1C1C24] border border-[#2A2A35] py-3 px-4 shadow-2xl transition-all duration-200"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <MessageCircle className="w-4 h-4 text-[#DD006B]" />
        <span className="text-xs uppercase tracking-wider font-semibold font-sans">
          Asesoría WhatsApp
        </span>
      </a>
    </aside>
  );
}
