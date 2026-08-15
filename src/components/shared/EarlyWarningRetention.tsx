'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Clock,
  MessageSquare,
  Video,
  CheckCircle2,
  ChevronRight,
  TrendingDown,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { RetentionRiskStudent } from '@/types/skills';
import { getRetentionRiskAnalysis } from '@/lib/services-demo/skills-service';

export function EarlyWarningRetention() {
  const [students, setStudents] = useState<RetentionRiskStudent[]>(() => getRetentionRiskAnalysis());
  const [actionDone, setActionDone] = useState<string | null>(null);

  const handleQuickAction = (studentId: string, actionText: string) => {
    setActionDone(`${studentId}-${actionText}`);
    setTimeout(() => setActionDone(null), 3000);
  };

  const highRiskCount = students.filter((s) => s.riskLevel === 'high').length;
  const mediumRiskCount = students.filter((s) => s.riskLevel === 'medium').length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold text-amber-800">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>Sistema Preventivo de Retención & Apoyo Docente</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Detección Temprana de Alumnas en Riesgo de Abandono
          </h2>
          <p className="text-xs text-slate-500">
            Algoritmo determinista de 4 factores: días sin conexión, tareas prácticas vencidas y tests reprobados.
          </p>
        </div>

        {/* Risk Badges */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
            ⚠️ {highRiskCount} Riesgo Alto
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
            ⚡ {mediumRiskCount} Riesgo Medio
          </span>
        </div>
      </div>

      {/* Student Risk Cards */}
      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            className={`p-5 rounded-2xl border transition-all space-y-3 ${
              student.riskLevel === 'high'
                ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
                : student.riskLevel === 'medium'
                ? 'bg-amber-50/30 border-amber-200 hover:border-amber-300'
                : 'bg-slate-50/40 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3.5">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                    student.riskLevel === 'high'
                      ? 'bg-rose-100 text-rose-700'
                      : student.riskLevel === 'medium'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {student.avatar}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm font-display">
                      {student.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                        student.riskLevel === 'high'
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : student.riskLevel === 'medium'
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      Riesgo {student.riskLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{student.courseTitle}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 self-end sm:self-center">
                <Link
                  href="/campus/mensajes"
                  className="bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold transition-colors flex items-center space-x-1 shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Mensaje</span>
                </Link>
                <Link
                  href={`/profesor/alumnas/${student.id}`}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center space-x-1"
                >
                  <span>Ver Ficha</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Risk Factor Bullet Points */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-1 text-xs">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Factores de Riesgo Detectados:
              </span>
              <ul className="space-y-1 text-[11px] text-slate-600 list-disc list-inside">
                {student.riskFactors.map((rf, i) => (
                  <li key={i}>{rf}</li>
                ))}
              </ul>
            </div>

            {/* Action Feedback */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>
                <strong>Acción Recomendada:</strong> {student.recommendedAction}
              </span>
              {actionDone?.startsWith(student.id) && (
                <span className="text-emerald-700 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Acción Registrada</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
