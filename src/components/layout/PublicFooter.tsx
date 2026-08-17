'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Award, ShieldCheck, ArrowRight } from 'lucide-react';

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0D] text-[#F8F5F1] border-t border-[#1C1C24] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Slogan (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-white leading-none block">
                FABY STUDIO
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold mt-1 block">
                ACADEMY · MADRID
              </span>
            </Link>

            <p className="text-xs text-[#A8A49F] font-sans leading-relaxed max-w-sm">
              Academia de formación técnica superior y salón profesional de belleza en Madrid. Dirección académica: Leslie Fabiola Larico Zapana.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-[#C5A880] font-mono">
              <ShieldCheck className="w-4 h-4 text-[#DD006B] shrink-0" />
              <span>Titulación Digital Verificable SHA-256</span>
            </div>
          </div>

          {/* Formaciones (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-sans font-semibold block">
              Formaciones Oficiales
            </span>
            <ul className="space-y-2.5 text-xs text-[#A8A49F] font-sans">
              <li>
                <Link href="/cursos/unas-de-gel-y-acrilico" className="hover:text-white transition-colors">
                  Máster en Uñas de Gel & Acrílico (490 €)
                </Link>
              </li>
              <li>
                <Link href="/cursos/extensiones-de-pestanas" className="hover:text-white transition-colors">
                  Especialización en Pestañas & Volumen Ruso (380 €)
                </Link>
              </li>
              <li>
                <Link href="/cursos/cosmetologia-facial" className="hover:text-white transition-colors">
                  Curso Superior en Hidrafacial & Facial (590 €)
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/cursos" className="text-white hover:text-[#DD006B] font-semibold flex items-center">
                  <span>Ver todas las formaciones</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Sedes Madrid (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-sans font-semibold block">
              Sedes Físicas en Madrid
            </span>
            <div className="space-y-3 text-xs text-[#A8A49F] font-sans leading-relaxed">
              <div>
                <p className="text-white font-semibold flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-[#DD006B]" />
                  Sede Plaza Aluche
                </p>
                <p className="text-[#8A8682] pl-4.5">
                  C.C. Plaza Aluche, Av. de los Poblados 58, 28044 Madrid
                </p>
              </div>
              <div>
                <p className="text-white font-semibold flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-[#DD006B]" />
                  Sede Puente de Vallecas
                </p>
                <p className="text-[#8A8682] pl-4.5">
                  Centro de Formación & Estética Avanzada, Madrid
                </p>
              </div>
            </div>
          </div>

          {/* Contacto & Campus (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-sans font-semibold block">
              Contacto & Acceso
            </span>
            <ul className="space-y-2.5 text-xs text-[#A8A49F] font-sans">
              <li>
                <a href="tel:+34614236200" className="hover:text-white transition-colors flex items-center">
                  <Phone className="w-3 h-3 mr-1.5 text-[#C5A880]" />
                  <span>+34 614 23 62 00</span>
                </a>
              </li>
              <li>
                <a href="mailto:fabileslie@gmail.com" className="hover:text-white transition-colors flex items-center">
                  <Mail className="w-3 h-3 mr-1.5 text-[#C5A880]" />
                  <span>fabileslie@gmail.com</span>
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/verificar-certificado"
                  className="hover:text-white transition-colors flex items-center text-[#C5A880]"
                >
                  <Award className="w-3.5 h-3.5 mr-1 text-[#DD006B]" />
                  <span>Validar Certificado</span>
                </Link>
              </li>
              <li>
                <Link href="/campus" className="hover:text-white transition-colors font-semibold text-white">
                  Campus Alumnas →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-[#1C1C24] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E6B68] font-sans">
          <p>
            © {currentYear} FABY STUDIO ACADEMY · Leslie Fabiola Larico Zapana. Todos los derechos reservados.
          </p>

          <div className="flex items-center space-x-6">
            <Link href="/terminos" className="hover:text-white transition-colors">
              Términos de Uso
            </Link>
            <Link href="/privacidad" className="hover:text-white transition-colors">
              Privacidad & RGPD
            </Link>
            <Link href="/auditoria" className="hover:text-white transition-colors">
              Auditoría Técnica
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
