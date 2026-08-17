import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, BookOpen, GraduationCap, LogIn, Award, MapPin, Phone, MessageCircle } from 'lucide-react';

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center space-x-3 text-slate-300 font-medium">
            <span className="flex items-center text-rose-400">
              <MapPin className="w-3 h-3 mr-1 text-rose-500" />
              Madrid: Plaza Aluche & Puente de Vallecas
            </span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:inline text-amber-400 font-semibold">
              +15 Años de Experiencia • +80k Alumnas & Clientas
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="tel:+34614236200"
              className="flex items-center text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 mr-1 text-rose-400" />
              <span>+34 614 23 62 00</span>
            </a>
            <a
              href="https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20informaci%C3%B3n%20sobre%20los%20cursos%20profesionales"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              <MessageCircle className="w-3 h-3 mr-1 fill-emerald-500 text-emerald-500" />
              <span>WhatsApp Asesoría</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fabi-pink to-fabi-darkpink flex items-center justify-center shadow-md shadow-fabi-pink/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-slate-900 uppercase">
                FABY STUDIO <span className="text-fabi-pink">ACADEMY</span>
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-slate-500 font-semibold">
                Beauty Education & Tech • Madrid
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-700">
            <Link href="/" className="hover:text-fabi-pink transition-colors">
              Inicio
            </Link>
            <Link href="/cursos" className="hover:text-fabi-pink transition-colors flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>Cursos & Másteres</span>
            </Link>
            <Link href="/verificar-certificado" className="hover:text-fabi-pink transition-colors flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Validar Título</span>
            </Link>
            <Link href="/auditoria" className="hover:text-fabi-pink transition-colors flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <span>Trazabilidad técnica</span>
            </Link>
            <Link href="/demo" className="text-rose-600 hover:text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-rose-500" />
              <span>Demo Roles</span>
            </Link>
          </nav>

          {/* Role Access Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="text-xs font-bold text-slate-700 hover:text-rose-600 px-3 py-2 rounded-xl transition-colors flex items-center space-x-1"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Iniciar Sesión</span>
            </Link>

            <Link
              href="/campus"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md shadow-fabi-pink/20 transition-all hover:scale-[1.02]"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Campus Alumna</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
