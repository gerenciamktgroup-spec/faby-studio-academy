'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  Eye,
  FileCheck,
  Zap,
  TrendingUp,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { StudentSkill, SkillCategory } from '@/types/skills';
import { getStudentSkills } from '@/lib/services-demo/skills-service';

interface FabySkillGraphProps {
  studentId?: string;
  isCompact?: boolean;
}

export function FabySkillGraph({ studentId, isCompact = false }: FabySkillGraphProps) {
  const [skills, setSkills] = useState<StudentSkill[]>(() => getStudentSkills(studentId));
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');
  const [activeEvidenceModal, setActiveEvidenceModal] = useState<StudentSkill | null>(null);

  const categories = [
    { id: 'all', label: 'Todas las Skills' },
    { id: 'pestanas', label: '👁️ Pestañas' },
    { id: 'unas', label: '💅 Uñas & Manicura' },
    { id: 'bioseguridad', label: '🛡️ Bioseguridad' },
  ];

  const filteredSkills = skills.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.skill.category === selectedCategory;
  });

  const averageProficiency = Math.round(
    skills.reduce((acc, s) => acc + s.proficiency_score, 0) / skills.length
  );

  const verifiedSkillsCount = skills.filter((s) => s.is_verified).length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold text-rose-700">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Faby Skill Graph & Multi-Factor Evidence</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Grafo de Competencias & Habilidades Verificadas
          </h2>
          <p className="text-xs text-slate-500">
            Acreditación basada en 5 factores de evidencia: teoría, exámenes, fotografía en modelo y rúbricas docentes.
          </p>
        </div>

        {/* Global Summary Badge */}
        <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 p-3 rounded-2xl shrink-0">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Maestría Global</span>
            <span className="text-lg font-extrabold font-display text-rose-600">{averageProficiency}%</span>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Habilidades</span>
            <span className="text-xs font-bold text-emerald-700">{verifiedSkillsCount} / {skills.length} Verificadas</span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      {!isCompact && (
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl border border-slate-200 hover:border-rose-300 bg-slate-50/50 hover:bg-white transition-all space-y-3.5 group relative"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-600 font-mono">
                  {item.skill.category.toUpperCase()} • {item.skill.level.toUpperCase()}
                </span>
                <h3 className="font-bold text-slate-900 text-sm font-display leading-snug">
                  {item.skill.name}
                </h3>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${
                  item.is_verified
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                {item.is_verified ? '✓ Verificada' : '⏳ En Progreso'}
              </span>
            </div>

            {/* Proficiency Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600">Nivel de Maestría</span>
                <span className="text-slate-900 font-display">{item.proficiency_score} / 100</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.proficiency_score >= 85
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                      : item.proficiency_score >= 70
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500'
                      : 'bg-gradient-to-r from-amber-400 to-orange-500'
                  }`}
                  style={{ width: `${item.proficiency_score}%` }}
                />
              </div>
            </div>

            {/* Evidence Checklist Badges */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center space-x-1 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{item.evidences.length} evidencias registradas</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveEvidenceModal(item)}
                className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1 group-hover:underline"
              >
                <span>Ver Evidencias</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Link to Public Skill Passport */}
      <div className="p-4 bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 rounded-2xl border border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 font-display">
              Tu Pasaporte Profesional de Habilidades
            </h4>
            <p className="text-[11px] text-slate-600">
              Genera tu enlace público con código QR para salones y empleadores.
            </p>
          </div>
        </div>

        <Link
          href="/perfil-profesional/lucia-martinez"
          target="_blank"
          className="bg-white hover:bg-slate-50 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 shadow-2xs transition-all flex items-center space-x-1.5 shrink-0"
        >
          <span>Ver Mi Pasaporte Público</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </Link>
      </div>

      {/* Evidence Detail Modal */}
      {activeEvidenceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                  SK
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm font-display">
                    {activeEvidenceModal.skill.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 uppercase font-mono">
                    {activeEvidenceModal.skill.category} • Confianza: {activeEvidenceModal.confidence_level.toUpperCase()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveEvidenceModal(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
                Desglose de Evidencias Multifactor (5 Fuentes):
              </span>

              <div className="space-y-2">
                {activeEvidenceModal.evidences.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900">{ev.label}</p>
                      {ev.feedback && (
                        <p className="text-[11px] text-slate-600 italic">“{ev.feedback}”</p>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-bold text-emerald-700 font-mono">
                        {ev.score_obtained} / {ev.max_score} pts
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {ev.is_verified ? '✓ Acreditado' : '⏳ Pendiente'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {activeEvidenceModal.verified_by_name && (
                <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
                  <span>Docente Verificadora: <strong>{activeEvidenceModal.verified_by_name}</strong></span>
                  <span>Fecha: {activeEvidenceModal.verified_at}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveEvidenceModal(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
