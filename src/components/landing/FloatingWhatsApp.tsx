'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  return (
    <aside
      aria-label="Contacto oficial por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center"
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <a
        href="https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20asesor%C3%ADa%20sobre%20las%20formaciones%20profesionales"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar con una asesora por WhatsApp"
        className="group inline-flex items-center space-x-2.5 bg-[#09090B] text-[#FFFDFC] hover:bg-[#DD006B] border border-[#2A2A35] py-3.5 px-4 shadow-xl transition-all duration-300"
      >
        <MessageCircle className="w-4 h-4 text-[#F6CADB] group-hover:text-white transition-colors" />
        <span className="text-xs uppercase tracking-wider font-semibold font-sans">
          Asesoría por WhatsApp
        </span>
      </a>
    </aside>
  );
}
