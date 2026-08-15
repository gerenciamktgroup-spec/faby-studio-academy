'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  ShieldCheck,
  Search,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Sparkles,
  ExternalLink,
  QrCode,
  Users,
} from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function ProfessionalPassportsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const graduates = [
    {
      slug: 'lucia-martinez',
      name: 'Lucía Martínez',
      title: 'Lash Stylist Profesional & Especialista en Mirada',
      location: 'Madrid, España',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      skillsCount: 5,
      activeHours: 34.5,
      specialtyBadge: 'Pestañas & Visagismo',
      verifiedCertificate: 'CERT-FS-DEMO-9988',
    },
    {
      slug: 'camila-torres',
      name: 'Camila Torres',
      title: 'Master Nail Artist & Lash Specialist',
      location: 'Barcelona, España',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
      skillsCount: 8,
      activeHours: 50.0,
      specialtyBadge: 'Uñas de Gel & Ruso',
      verifiedCertificate: 'CERT-FS-2026-4412',
    },
  ];

  const filtered = graduates.filter((g) => {
    return (
      searchQuery === '' ||
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span>FABY TALENT NETWORK & PASAPORTES PROFESIONALES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
            Directorio de Profesionales Acreditadas
          </h1>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Consulta las competencias técnicas, horas prácticas y portafolios verificados de las graduadas de Faby Studio Academy.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, especialidad o ciudad (Madrid, Barcelona)..."
            className="w-full bg-transparent text-xs text-slate-900 focus:outline-none placeholder-slate-400"
          />
        </div>

        {/* Graduates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((grad) => (
            <div
              key={grad.slug}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-rose-300 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={grad.avatar}
                    alt={grad.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-rose-100 shadow-xs group-hover:scale-105 transition-transform"
                  />
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-rose-600 font-mono">
                      {grad.specialtyBadge}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base font-display">
                      {grad.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{grad.location}</span>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-snug font-medium">
                  {grad.title}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Práctica Real</span>
                    <span className="font-bold text-slate-900">{grad.activeHours} Horas</span>
                  </div>
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                    <span className="text-[10px] text-emerald-700 font-bold uppercase block">Skills Rúbrica</span>
                    <span className="font-bold text-emerald-800">{grad.skillsCount} Verificadas</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/perfil-profesional/${grad.slug}`}
                className="w-full bg-slate-900 hover:bg-rose-600 text-white py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-2 shadow-xs"
              >
                <span>Ver Pasaporte & Portafolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
