'use client';

import React from 'react';
import { MapPin, Clock, MessageCircle, Phone, ArrowRight } from 'lucide-react';

export function MadridSedesShowcase() {
  return (
    <section id="sedes" className="py-20 lg:py-32 bg-[#FAF6F3] text-[#111114] border-b border-[#E8E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#DD006B]">
            Presencia Física & Respaldo Local
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111114] tracking-tight leading-[0.95]">
            Dos sedes. <br />
            <span className="italic font-normal text-[#6E6763]">Una academia real.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6E6763] font-sans max-w-xl leading-relaxed">
            La tranquilidad de contar con dos centros consolidados en Madrid donde puedes visitarnos, adquirir tus kits profesionales o realizar workshops presenciales.
          </p>
        </div>

        {/* 2 Madrid Locations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {/* Sede 1: Plaza Aluche */}
          <div className="bg-[#FFFDFC] border border-[#E8E2DA] p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:border-[#DD006B] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#DD006B] font-sans font-bold">
                  Sede Central & Salón
                </span>
                <span className="text-xs text-[#111114] font-sans font-medium">
                  Abierto al público
                </span>
              </div>

              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#111114]">
                  Sede Plaza Aluche
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6763] font-sans mt-2 flex items-start leading-relaxed">
                  <MapPin className="w-4 h-4 mr-2 text-[#DD006B] shrink-0 mt-0.5" />
                  Centro Comercial Plaza Aluche, Av. de los Poblados 58, 28044 Madrid
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#6E6763] font-sans leading-relaxed">
                Salón especializado en manicura rusa, extensiones de pestañas, cosmetología facial y punto de atención presencial para alumnas.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E8E2DA] space-y-4">
              <div className="flex items-center justify-between text-xs text-[#6E6763] font-sans">
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-[#DD006B]" />
                  Lun – Vie: 07:00 – 18:00
                </span>
                <span className="text-[#111114] font-semibold">Madrid Suroeste</span>
              </div>

              <a
                href="https://maps.google.com/?q=Centro+Comercial+Plaza+Aluche+Av+de+los+Poblados+58+Madrid"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs uppercase tracking-wider text-[#111114] hover:text-[#DD006B] font-semibold transition-colors"
              >
                <span>Ver ubicación en Google Maps</span>
                <ArrowRight className="w-3 h-3 ml-1.5" />
              </a>
            </div>
          </div>

          {/* Sede 2: Puente de Vallecas */}
          <div className="bg-[#FFFDFC] border border-[#E8E2DA] p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:border-[#DD006B] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#DD006B] font-sans font-bold">
                  Centro de Formación Técnica
                </span>
                <span className="text-xs text-[#111114] font-sans font-medium">
                  Grupos Reducidos
                </span>
              </div>

              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#111114]">
                  Sede Puente de Vallecas
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6763] font-sans mt-2 flex items-start leading-relaxed">
                  <MapPin className="w-4 h-4 mr-2 text-[#DD006B] shrink-0 mt-0.5" />
                  Centro de Formación & Estética Avanzada, Puente de Vallecas, Madrid
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#6E6763] font-sans leading-relaxed">
                Espacio acondicionado para masterclasses técnicas, prácticas intensivas con modelos reales y entrega de diplomas acreditativos.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E8E2DA] space-y-4">
              <div className="flex items-center justify-between text-xs text-[#6E6763] font-sans">
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-[#DD006B]" />
                  Citas & Masterclasses
                </span>
                <span className="text-[#111114] font-semibold">Madrid Sureste</span>
              </div>

              <a
                href="https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20consultar%20disponibilidad%20en%20Sede%20Vallecas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs uppercase tracking-wider text-[#111114] hover:text-[#DD006B] font-semibold transition-colors"
              >
                <span>Consultar agenda formativa</span>
                <ArrowRight className="w-3 h-3 ml-1.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Direct Phone & WhatsApp Callout */}
        <div className="bg-[#09090B] text-white p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 max-w-5xl">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="font-editorial text-2xl font-bold text-white">
              ¿Deseas concertar una visita o hablar con la docente?
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A49F] font-sans">
              Atención directa en horario de salón de lunes a viernes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+34614236200"
              className="inline-flex items-center space-x-2 border border-white/30 hover:border-white text-white px-6 py-3.5 text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F6CADB]" />
              <span>+34 614 23 62 00</span>
            </a>

            <a
              href="https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20agendar%20una%20visita%20a%20sus%20sedes%20en%20Madrid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#DD006B] hover:bg-[#B70055] text-white px-6 py-3.5 text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span>WhatsApp Directo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
