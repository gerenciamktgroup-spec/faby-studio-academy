import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fabi-pink to-fabi-darkpink flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-slate-900 text-lg uppercase tracking-wide">
                FABY STUDIO <span className="text-fabi-pink">ACADEMY</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Plataforma de formación técnica avanzada en estética, pestañas, uñas y cosmetología. Metodología auditable con seguimiento de tiempo activo y certificación verificable.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <p className="font-bold text-slate-900 uppercase tracking-wider">Programas</p>
            <ul className="space-y-1.5 text-slate-600">
              <li><Link href="/cursos/extensiones-de-pestanas" className="hover:text-fabi-pink transition-colors">Extensiones de Pestañas</Link></li>
              <li><Link href="/cursos/unas-de-gel-y-acrilico" className="hover:text-fabi-pink transition-colors">Uñas de Gel & Acrílico</Link></li>
              <li><Link href="/cursos/cosmetologia-facial" className="hover:text-fabi-pink transition-colors">Cosmetología Facial</Link></li>
              <li><Link href="/cursos" className="hover:text-fabi-pink transition-colors">Catálogo Completo</Link></li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <p className="font-bold text-slate-900 uppercase tracking-wider">Garantía & Legal</p>
            <ul className="space-y-1.5 text-slate-600">
              <li><Link href="/verificar-certificado" className="hover:text-fabi-pink transition-colors">Verificación de Diplomas</Link></li>
              <li><Link href="/auditoria" className="hover:text-fabi-pink transition-colors">Auditoría & Trazabilidad</Link></li>
              <li><Link href="/privacidad" className="hover:text-fabi-pink transition-colors">Política de Privacidad (RGPD)</Link></li>
              <li><Link href="/terminos" className="hover:text-fabi-pink transition-colors">Términos y Condiciones</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} FABY STUDIO ACADEMY. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-2 text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4" />
            <span>Plataforma Verificada & Auditable</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
