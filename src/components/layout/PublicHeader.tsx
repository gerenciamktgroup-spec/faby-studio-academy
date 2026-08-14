import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, UserCheck, BookOpen, GraduationCap, LogIn } from 'lucide-react';

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
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
                Beauty Education & Tech
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
            <Link href="/auditoria" className="hover:text-fabi-pink transition-colors flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Auditoría Demo</span>
            </Link>
            <Link href="/demo" className="text-fabi-pink font-bold hover:underline flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Role Switcher Demo</span>
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
