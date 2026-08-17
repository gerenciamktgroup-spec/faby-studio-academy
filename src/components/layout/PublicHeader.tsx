'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Phone, MessageCircle } from 'lucide-react';

export function PublicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8F5F1]/90 backdrop-blur-md border-b border-[#E8E4DF] shadow-xs'
          : 'bg-[#F8F5F1] border-b border-[#E8E4DF]/60'
      }`}
    >
      {/* Top Announcement Bar */}
      <div className="bg-[#0A0A0D] text-[#F8F5F1] text-[11px] tracking-wider uppercase py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 font-sans">
          <div className="flex items-center space-x-3 text-[#A8A49F]">
            <span className="text-[#F8F5F1] font-semibold">Madrid · Plaza Aluche & Puente de Vallecas</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:inline text-[#C5A880]">Formación con Práctica Real sobre Modelos</span>
          </div>

          <div className="flex items-center space-x-5">
            <a
              href="tel:+34614236200"
              className="flex items-center text-[#A8A49F] hover:text-[#F8F5F1] transition-colors"
            >
              <Phone className="w-3 h-3 mr-1.5 text-[#C5A880]" />
              <span>+34 614 23 62 00</span>
            </a>
            <a
              href="https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20asesor%C3%ADa%20sobre%20las%20formaciones%20profesionales"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#F8F5F1] hover:text-[#DD006B] font-semibold transition-colors"
            >
              <MessageCircle className="w-3 h-3 mr-1.5 text-[#DD006B]" />
              <span>Asesoría Directa</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo - High Editorial Typography */}
          <Link href="/" className="flex flex-col group">
            <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0D] leading-none">
              FABY STUDIO
            </span>
            <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#6E6B68] font-semibold mt-1">
              ACADEMY · MADRID
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-wider uppercase text-[#0A0A0D]/80">
            <Link href="/cursos" className="hover:text-[#DD006B] transition-colors">
              Formaciones
            </Link>
            <Link href="/#metodo" className="hover:text-[#DD006B] transition-colors">
              Método
            </Link>
            <Link href="/#resultados" className="hover:text-[#DD006B] transition-colors">
              Resultados
            </Link>
            <Link href="/#sedes" className="hover:text-[#DD006B] transition-colors">
              Sedes Madrid
            </Link>
            <Link href="/#faby" className="hover:text-[#DD006B] transition-colors">
              La Profesora
            </Link>
            <Link href="/verificar-certificado" className="hover:text-[#DD006B] transition-colors text-[#6E6B68]">
              Validar Título
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/campus"
              className="text-xs font-semibold uppercase tracking-wider text-[#6E6B68] hover:text-[#0A0A0D] px-3 py-2 transition-colors"
            >
              Acceso Campus
            </Link>

            <Link
              href="/cursos"
              className="inline-flex items-center space-x-2 bg-[#0A0A0D] hover:bg-[#1C1C24] text-[#F8F5F1] px-5 py-2.5 rounded-none border border-[#0A0A0D] text-xs font-semibold tracking-widest uppercase transition-all duration-200 group"
            >
              <span>Ver Formaciones</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0A0A0D] hover:text-[#DD006B] transition-colors"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F5F1] border-b border-[#E8E4DF] px-6 py-8 space-y-6 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-4 text-sm font-semibold tracking-wider uppercase text-[#0A0A0D]">
            <Link
              href="/cursos"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#DD006B] py-1 border-b border-[#E8E4DF]"
            >
              Formaciones & Másteres
            </Link>
            <Link
              href="/#metodo"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#DD006B] py-1 border-b border-[#E8E4DF]"
            >
              Método Pedagógico
            </Link>
            <Link
              href="/#resultados"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#DD006B] py-1 border-b border-[#E8E4DF]"
            >
              Resultados Técnicos
            </Link>
            <Link
              href="/#sedes"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#DD006B] py-1 border-b border-[#E8E4DF]"
            >
              Sedes en Madrid
            </Link>
            <Link
              href="/#faby"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#DD006B] py-1 border-b border-[#E8E4DF]"
            >
              Leslie Fabiola (Profesora Faby)
            </Link>
            <Link
              href="/verificar-certificado"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#DD006B] py-1 border-b border-[#E8E4DF] text-[#6E6B68]"
            >
              Validar Certificado SHA-256
            </Link>
          </nav>

          <div className="pt-2 space-y-3">
            <Link
              href="/cursos"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center bg-[#0A0A0D] text-[#F8F5F1] py-3.5 text-xs font-semibold tracking-widest uppercase"
            >
              Descubrir Formaciones
            </Link>
            <Link
              href="/campus"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center bg-transparent border border-[#0A0A0D] text-[#0A0A0D] py-3.5 text-xs font-semibold tracking-widest uppercase"
            >
              Acceso al Campus Virtual
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
