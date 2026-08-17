'use client';

import React from 'react';
import Link from 'next/link';
import { Award, QrCode, ShieldCheck, ArrowRight } from 'lucide-react';

export function CertificateTrust() {
  return (
    <section className="py-20 lg:py-32 bg-[#0A0A0D] text-[#F8F5F1] border-b border-[#1C1C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A880]">
              Acreditación & Validez Técnica
            </span>

            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[0.95]">
              Un diploma que también <br />
              <span className="italic font-normal text-[#A8A49F]">puede comprobarse.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#A8A49F] font-sans leading-relaxed">
              Cada certificado emitido por <strong>FABY STUDIO ACADEMY</strong> incorpora un código único y un código QR que permite a salones empleadores y clientas verificar en tiempo real tu nombre, especialidad cursada y horas lectivas efectivas.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 text-xs text-[#A8A49F] font-sans">
                <ShieldCheck className="w-4 h-4 text-[#DD006B] shrink-0 mt-0.5" />
                <span>Registro digital inmutable accesible las 24 horas del día.</span>
              </div>
              <div className="flex items-start space-x-3 text-xs text-[#A8A49F] font-sans">
                <QrCode className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>Validación pública mediante escaneo instantáneo desde cualquier dispositivo.</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/verificar-certificado"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-white hover:text-[#DD006B] transition-colors group"
              >
                <span>Probar validador público de certificados</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Visual Certificate Preview (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-[#111117] border border-[#2A2A35] p-6 sm:p-8 space-y-6 relative">
              {/* Diploma Mockup Header */}
              <div className="flex items-center justify-between border-b border-[#1C1C24] pb-4">
                <div>
                  <span className="font-editorial text-lg font-bold text-white tracking-tight">
                    FABY STUDIO ACADEMY
                  </span>
                  <span className="block text-[9px] uppercase tracking-widest text-[#C5A880]">
                    MADRID · ACREDITACIÓN TÉCNICA
                  </span>
                </div>
                <div className="w-10 h-10 bg-[#0A0A0D] border border-[#2A2A35] flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#C5A880]" />
                </div>
              </div>

              {/* Certificate Body Preview */}
              <div className="space-y-4 py-2">
                <span className="text-[10px] uppercase tracking-widest text-[#6E6B68] block">
                  Certifica que:
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                  Nombre de la Alumna Graduada
                </h3>
                <p className="text-xs text-[#A8A49F] font-sans leading-relaxed">
                  Ha completado satisfactoriamente el programa teórico-práctico de <strong>Máster Profesional en Uñas de Gel & Acrílico</strong> con una calificación sobresaliente y horas lectivas activas acreditadas.
                </p>
              </div>

              {/* Certificate Bottom Verification Data */}
              <div className="pt-4 border-t border-[#1C1C24] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] font-mono text-[#8A8682]">
                <div className="flex items-center space-x-2">
                  <QrCode className="w-6 h-6 text-white shrink-0" />
                  <div>
                    <span className="text-white block font-sans text-xs">QR de Validación Oficial</span>
                    <span>Código: MAD-2026-FSA-0089</span>
                  </div>
                </div>

                <div className="text-right sm:text-right font-sans text-[10px] text-[#A8A49F]">
                  <span>Firma Docente: Leslie F. Larico</span>
                  <span className="block text-emerald-400">Estado: Activo & Verificado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
