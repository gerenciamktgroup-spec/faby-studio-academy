import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-14 pb-10 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fabi-pink to-fabi-darkpink flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-slate-900 text-lg uppercase tracking-wide">
                FABY STUDIO <span className="text-fabi-pink">ACADEMY</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Academia de especialización estética profesional y centro de belleza en Madrid. Formación de alto impacto con prácticas reales, seguimiento 1 a 1 y certificación digital verificable.
            </p>
            <div className="text-[11px] text-slate-400 space-y-1">
              <p><strong className="text-slate-600">Fundadora:</strong> Leslie Fabiola Larico Zapana</p>
              <p><strong className="text-slate-600">Experiencia:</strong> +15 años formando profesionales • +80.000 servicios y alumnas</p>
            </div>
          </div>

          {/* Sedes Físicas Col */}
          <div className="space-y-3 text-xs">
            <p className="font-bold text-slate-900 uppercase tracking-wider flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-rose-600" />
              Sedes en Madrid
            </p>
            <div className="space-y-3 text-slate-600">
              <div>
                <p className="font-semibold text-slate-800">Sede Plaza Aluche</p>
                <p className="text-[11px] text-slate-500">C.C. Plaza Aluche, Av. de los Poblados 58, 28044 Madrid</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Sede Puente de Vallecas</p>
                <p className="text-[11px] text-slate-500">Centro de Formación & Estética Avanzada, Madrid</p>
              </div>
              <div className="flex items-center text-[11px] text-slate-500 pt-1">
                <Clock className="w-3 h-3 mr-1 text-slate-400" />
                <span>Lunes a Viernes: 07:00 - 18:00</span>
              </div>
            </div>
          </div>

          {/* Programas */}
          <div className="space-y-2 text-xs">
            <p className="font-bold text-slate-900 uppercase tracking-wider">Másteres Oficiales</p>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link href="/cursos/unas-de-gel-y-acrilico" className="hover:text-fabi-pink transition-colors">
                  💅 Uñas de Gel & Acrílico
                </Link>
              </li>
              <li>
                <Link href="/cursos/extensiones-de-pestanas" className="hover:text-fabi-pink transition-colors">
                  👁️ Pestañas & Volumen Ruso
                </Link>
              </li>
              <li>
                <Link href="/cursos/cosmetologia-facial" className="hover:text-fabi-pink transition-colors">
                  🧴 Cosmetología & Hidrafacial
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="hover:text-fabi-pink font-semibold text-rose-600 transition-colors">
                  Ver Todo el Catálogo →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto & Legal */}
          <div className="space-y-2 text-xs">
            <p className="font-bold text-slate-900 uppercase tracking-wider">Contacto & Legal</p>
            <ul className="space-y-2 text-slate-600">
              <li>
                <a href="tel:+34614236200" className="hover:text-fabi-pink transition-colors flex items-center">
                  <Phone className="w-3 h-3 mr-1 text-rose-500" />
                  <span>+34 614 23 62 00</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20informaci%C3%B3n%20sobre%20los%20cursos%20profesionales"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors flex items-center"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  <span>WhatsApp Directo</span>
                </a>
              </li>
              <li>
                <a href="mailto:fabileslie@gmail.com" className="hover:text-fabi-pink transition-colors flex items-center">
                  <Mail className="w-3 h-3 mr-1 text-slate-400" />
                  <span>fabileslie@gmail.com</span>
                </a>
              </li>
              <li className="pt-1">
                <Link href="/verificar-certificado" className="hover:text-fabi-pink transition-colors">
                  Verificación de Diplomas QR
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-fabi-pink transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-fabi-pink transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} FABY STUDIO ACADEMY • Leslie Fabiola Larico Zapana. Madrid, España.</p>
          <div className="flex items-center space-x-2 text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4" />
            <span>Plataforma Verificada con Hash SHA-256</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
