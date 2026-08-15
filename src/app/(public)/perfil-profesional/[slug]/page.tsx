'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Sparkles,
  MapPin,
  Clock,
  ExternalLink,
  Layers,
  ArrowRight,
  Share2,
  Download,
  Eye,
} from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { getPublicSkillPassport } from '@/lib/services-demo/skills-service';
import { BeforeAfterSlider } from '@/components/shared/BeforeAfterSlider';

export default function ProfessionalSkillPassportPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'lucia-martinez';
  const passport = getPublicSkillPassport(slug) || getPublicSkillPassport('lucia-martinez')!;
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Official Verification Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Pasaporte Profesional de Habilidades Verificadas
              </span>
              <span className="text-[11px] text-slate-500">
                Acreditación oficial respaldada por Faby Studio Academy mediante evidencias prácticas y rúbricas.
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleShare}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? '¡Enlace Copiado!' : 'Compartir Pasaporte'}</span>
            </button>
          </div>
        </div>

        {/* Profile Luxury Card Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center space-x-5">
              <div className="relative">
                <img
                  src={passport.avatar_url}
                  alt={passport.student_name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-rose-100 shadow-md"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1.5 rounded-full shadow-xs">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center space-x-1.5 bg-rose-50 border border-rose-200 px-3 py-0.5 rounded-full text-[10px] font-bold text-rose-700 uppercase font-mono">
                  <span>Acreditada Faby Studio Pro</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
                  {passport.student_name}
                </h1>
                <p className="text-xs font-semibold text-rose-600 font-display">
                  {passport.specialty_title}
                </p>
                <p className="text-xs text-slate-500 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{passport.location}</span>
                </p>
              </div>
            </div>

            {/* QR Card for Salons */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center space-x-3 shrink-0 shadow-2xs self-stretch sm:self-auto justify-center">
              <QrCode className="w-12 h-12 text-slate-900" />
              <div className="text-left text-xs">
                <span className="font-bold text-slate-900 block text-[11px] uppercase">
                  QR de Validación
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  Escaneable por salones y empleadores
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl border-t border-slate-100 pt-4">
            {passport.bio}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Horas Prácticas</span>
              <span className="text-lg font-extrabold font-display text-slate-900">{passport.total_active_hours}h</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Skills Validadas</span>
              <span className="text-lg font-extrabold font-display text-emerald-800">{passport.skills.filter(s => s.is_verified).length}</span>
            </div>
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 text-center">
              <span className="text-[10px] uppercase font-bold text-rose-700 block">Progreso Global</span>
              <span className="text-lg font-extrabold font-display text-rose-800">{passport.completion_rate}%</span>
            </div>
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-700 block">Certificados</span>
              <span className="text-lg font-extrabold font-display text-amber-800">{passport.verified_certificates.length}</span>
            </div>
          </div>
        </div>

        {/* Section 1: Verified Skills Breakdown */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="space-y-1">
            <h2 className="text-lg font-bold font-display text-slate-900">
              Competencias Técnicas Acreditadas
            </h2>
            <p className="text-xs text-slate-500">
              Evaluación multifactorial respaldada por rúbricas y horas activas reales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {passport.skills.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs font-display">
                    {item.skill.name}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {item.proficiency_score}% Maestría
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-600 rounded-full"
                    style={{ width: `${item.proficiency_score}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-500 leading-snug">
                  {item.skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Transformation Portfolio with Before/After Comparisons */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold font-display text-slate-900">
              Portafolio de Evidencias Prácticas en Modelos Reales
            </h2>
            <p className="text-xs text-slate-500">
              Trabajos evaluados y certificados por el cuerpo docente de Faby Studio Academy.
            </p>
          </div>

          <div className="space-y-6">
            {passport.portfolio_projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-600 font-mono">
                      {proj.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm font-display">
                      {proj.title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full shrink-0">
                    Nota Docente: {proj.tutor_grade}
                  </span>
                </div>

                {/* Interactive Before & After Slider */}
                <BeforeAfterSlider
                  beforeImage={proj.before_image}
                  afterImage={proj.after_image}
                  beforeLabel="Estado Inicial (Antes)"
                  afterLabel="Resultado Profesional (Después)"
                />

                <p className="text-xs text-slate-600 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                  <strong>Notas Técnicas:</strong> {proj.technique_notes}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Verified Certificates */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-lg font-bold font-display text-slate-900">
            Diplomas Oficiales Emitidos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {passport.verified_certificates.map((cert) => (
              <div
                key={cert.code}
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <p className="font-bold text-slate-900 font-display">{cert.course_title}</p>
                  <p className="font-mono text-[11px] text-slate-500 font-bold">Código: {cert.code}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold">✓ Firma Hash SHA-256 Verificada</p>
                </div>

                <Link
                  href={`/verificar-certificado/${cert.code}`}
                  target="_blank"
                  className="bg-white hover:bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl font-bold border border-slate-200 transition-colors shrink-0 shadow-2xs flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Comprobar</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
