'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_PERSONAS, DemoPersona } from '@/lib/demo-config';
import { UserCheck, ShieldCheck, GraduationCap, ArrowRight, MonitorPlay, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function DemoRoleSwitcherPage() {
  const [activePersona, setActivePersona] = useState<string>('lucia');
  const [presentationMode, setPresentationMode] = useState<boolean>(true);

  const personas = Object.entries(DEMO_PERSONAS);

  const getTargetUrl = (p: DemoPersona) => {
    if (p.role === 'alumna') {
      return p.id.startsWith('555') ? '/campus/certificado' : '/campus';
    }
    if (p.role === 'profesor') return '/profesor';
    if (p.role === 'tutor') return '/profesor';
    if (p.role === 'admin_academico') return '/admin';
    if (p.role === 'auditor') return '/auditoria';
    return '/';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 sm:p-10 max-w-5xl mx-auto flex flex-col justify-center space-y-8">
      {/* Top Back Header */}
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </Link>
        <span className="text-[11px] font-bold text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
          FABY STUDIO ACADEMY
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DEMO ROLE SWITCHER — PRESENTACIÓN EJECUTIVA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
          Selector de Roles para Presentación
        </h1>
        <p className="text-xs text-slate-500 max-w-2xl mx-auto">
          Cambia de rol con un solo clic para demostrar el recorrido completo del campus virtual ante la dirección de FABY STUDIO.
        </p>
      </div>

      {/* Presentation Mode Toggle */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <MonitorPlay className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Modo Presentación Ejecutiva</p>
            <p className="text-xs text-slate-500">Recorrido fluido y optimizado para compartir pantalla.</p>
          </div>
        </div>
        <button
          onClick={() => setPresentationMode(!presentationMode)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            presentationMode
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 border border-slate-200 text-slate-600'
          }`}
        >
          {presentationMode ? 'Activado ✓' : 'Desactivado'}
        </button>
      </div>

      {/* Grid of Demo Personas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Visitor Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 shadow-xs hover:border-slate-300 transition-all">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
              Público General
            </span>
            <h3 className="text-base font-bold text-slate-900 font-display">Visitante / Potencial Alumna</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Descubrimiento del programa, landing page del curso y proceso de matrícula sandbox.
            </p>
          </div>
          <Link
            href="/"
            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1"
          >
            <span>Ver Homepage Pública</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Persona Cards */}
        {personas.map(([key, p]) => (
          <div
            key={key}
            className={`bg-white rounded-2xl border p-6 flex flex-col justify-between space-y-4 transition-all shadow-xs ${
              activePersona === key
                ? 'border-rose-300 ring-2 ring-rose-100'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                  {p.badge}
                </span>
                <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center border border-rose-200">
                  {p.avatar}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">{p.name}</h3>
              <p className="text-xs text-slate-700 font-medium">{p.title}</p>
              <p className="text-[11px] text-slate-400">{p.email}</p>
            </div>

            <Link
              href={getTargetUrl(p)}
              onClick={() => setActivePersona(key)}
              className="w-full bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 shadow-md shadow-fabi-pink/20"
            >
              <span>Entrar como {p.name.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
