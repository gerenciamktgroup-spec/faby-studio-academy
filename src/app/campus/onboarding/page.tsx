'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Play,
  CheckCircle2,
  Clock,
  Award,
  Video,
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: '¡Bienvenida a FABY STUDIO ACADEMY!',
      subtitle: 'Tu plaza en el Curso Profesional de Extensiones de Pestañas está confirmada.',
      description: 'Estás a punto de iniciar una formación técnica de élite con acompañamiento 1 a 1, seguimiento de horas activas y titulación oficial verificable.',
      icon: Sparkles,
      color: 'text-rose-600 bg-rose-100',
    },
    {
      title: 'Active Learning Time (Trazabilidad Real)',
      subtitle: 'Validación continua de tu tiempo activo en la plataforma.',
      description: 'Nuestra tecnología envía un pulso (heartbeat) cada 45 segundos mientras visualizas lecciones o realizas evaluaciones. Solo se computa el tiempo real de interacción.',
      icon: Clock,
      color: 'text-emerald-600 bg-emerald-100',
    },
    {
      title: 'Tutorías 1 a 1 con Laura Gómez',
      subtitle: 'Corrección personalizada de tus trabajos en modelos reales.',
      description: 'Dispones de sesiones individuales para corregir tu aislamiento, mapping y adhesivo. Además, podrás escribir a tu tutora en cualquier momento por mensajería.',
      icon: Video,
      color: 'text-purple-600 bg-purple-100',
    },
  ];

  const current = steps[step - 1];
  const Icon = current.icon;

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      router.push('/campus');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-8 shadow-xl text-center">
        {/* Step Indicator */}
        <div className="flex justify-center space-x-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx + 1 === step
                  ? 'w-8 bg-rose-600'
                  : idx + 1 < step
                  ? 'w-4 bg-emerald-500'
                  : 'w-4 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Icon & Content */}
        <div className="space-y-4">
          <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center font-bold ${current.color}`}>
            <Icon className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-bold font-display text-slate-900">{current.title}</h1>
          <p className="text-xs font-semibold text-rose-700 uppercase tracking-wider">{current.subtitle}</p>
          <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">{current.description}</p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white py-3.5 rounded-xl font-bold text-sm shadow-md shadow-rose-600/20 transition-all flex items-center justify-center space-x-2 hover:scale-[1.01]"
        >
          <span>{step === steps.length ? 'Entrar a mi Campus Virtual' : 'Siguiente Paso'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
