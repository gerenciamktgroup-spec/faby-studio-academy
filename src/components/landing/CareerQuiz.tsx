'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, MessageCircle } from 'lucide-react';

interface Option {
  text: string;
  category: 'unas' | 'pestanas' | 'facial';
  hint: string;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: Option[];
}

export function CareerQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<{ unas: number; pestanas: number; facial: number }>({
    unas: 0,
    pestanas: 0,
    facial: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      title: '1. ¿Cuál es tu objetivo principal en el sector estético?',
      subtitle: 'Elige la meta que más te motive hoy.',
      options: [
        {
          text: 'Crear estructuras resistentes, manicura rusa y dominar el torno',
          category: 'unas',
          hint: 'Enfoque en arquitectura ungular y alta precisión',
        },
        {
          text: 'Especializarme en la mirada: volumen ruso, visagismo y cejas perfectas',
          category: 'pestanas',
          hint: 'Enfoque en diseño de mirada y tratamientos de pestañas',
        },
        {
          text: 'Aprender cuidado dérmico profundo, Hidrafacial y química cosmética',
          category: 'facial',
          hint: 'Enfoque en salud de la piel y aparatología en cabina',
        },
      ],
    },
    {
      id: 2,
      title: '2. ¿Qué tipo de habilidad disfrutas más desarrollar?',
      subtitle: 'Tu destreza natural determinará tu velocidad de aprendizaje.',
      options: [
        {
          text: 'El detalle geométrico, limado milimétrico y control de productos',
          category: 'unas',
          hint: 'Ideal para esculpido en gel, acrílico y nail art',
        },
        {
          text: 'La delicadeza milimétrica pelo a pelo y visagismo personalizado',
          category: 'pestanas',
          hint: 'Ideal para extensiones 1:1 y abanicado manual 2D-6D',
        },
        {
          text: 'El análisis de piel, protocolos de cabina y masajes rejuvenecedores',
          category: 'facial',
          hint: 'Ideal para peelings, espátula ultrasónica e Hidrafacial',
        },
      ],
    },
    {
      id: 3,
      title: '3. ¿Cómo imaginas tu espacio de trabajo o negocio?',
      subtitle: 'Piensa en el formato de servicio que más te gustaría ofrecer.',
      options: [
        {
          text: 'Nail Bar de lujo o mesa de manicura con clientas recurrentes cada 3-4 semanas',
          category: 'unas',
          hint: 'Alta rotación y fidelidad de clientas',
        },
        {
          text: 'Lash & Brow Bar exclusivo con citas personalizadas de alta rentabilidad',
          category: 'pestanas',
          hint: 'Servicio premium con márgenes muy altos',
        },
        {
          text: 'Cabina estética facial con tratamientos de rejuvenecimiento y diagnóstico dérmico',
          category: 'facial',
          hint: 'Ticket medio-alto por sesión',
        },
      ],
    },
    {
      id: 4,
      title: '4. ¿Cuál es tu nivel actual de experiencia previa?',
      subtitle: 'Todos nuestros programas van desde cero hasta nivel élite.',
      options: [
        {
          text: 'Principiante total o quiero perfeccionar mi técnica con torno y gel',
          category: 'unas',
          hint: 'Aprenderás desde la anatomía hasta estructuras complejas',
        },
        {
          text: 'He probado colocar pestañas o lifting pero quiero dominar el volumen ruso',
          category: 'pestanas',
          hint: 'Aprenderás aislamiento perfecto y abanicado sin grumos',
        },
        {
          text: 'Me apasiona el skincare y quiero dominar la aparatología profesional',
          category: 'facial',
          hint: 'Aprenderás protocolos clínicos de cabina e ingredientes activos',
        },
      ],
    },
  ];

  const handleSelectOption = (category: 'unas' | 'pestanas' | 'facial') => {
    const nextScores = { ...scores, [category]: scores[category] + 1 };
    setScores(nextScores);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const getWinner = () => {
    if (scores.facial > scores.unas && scores.facial > scores.pestanas) return 'facial';
    if (scores.pestanas > scores.unas && scores.pestanas >= scores.facial) return 'pestanas';
    return 'unas';
  };

  const resetQuiz = () => {
    setScores({ unas: 0, pestanas: 0, facial: 0 });
    setCurrentStep(0);
    setShowResult(false);
  };

  const resultsData = {
    unas: {
      title: 'Máster Profesional en Uñas de Gel & Acrílico Premium',
      badge: '96% de Afinidad con tu Perfil',
      category: 'Uñas & Manicura Rusa',
      price: '490€ (o 3 cuotas de 163€)',
      duration: '8 Semanas • 60h Activas',
      href: '/cursos/unas-de-gel-y-acrilico',
      description: 'Tu perfil destaca por la precisión, la creatividad y la búsqueda de clientas fieles de alta recurrencia. Este máster te enseñará Manicura Rusa combinada con torno, nivelación con base rubber, gel autonivelante y esculpido estructural.',
      skills: [
        'Manicura rusa con torno y fresas de diamante',
        'Nivelación perfecta con base rubber',
        'Esculpido en gel y acrigel con molde',
        'Calculadora de costes por servicio incluida',
      ],
    },
    pestanas: {
      title: 'Especialización en Pestañas, Cejas & Volumen Ruso',
      badge: '98% de Afinidad con tu Perfil',
      category: 'Mirada & Cejas',
      price: '380€ (o 3 cuotas de 126€)',
      duration: '6 Semanas • 50h Activas',
      href: '/cursos/extensiones-de-pestanas',
      description: 'Tu perfil tiene una gran sensibilidad estética y paciencia para la microprecisión. Dominarás el aislamiento 1:1, la creación manual de abanicos 2D-6D, el visagismo de cejas con henna, lifting y depilación con hilo.',
      skills: [
        'Técnica clásica pelo a pelo y volumen ruso 2D-6D',
        'Visagismo con henna y depilación con hilo (threading)',
        'Lifting y laminado de cejas y pestañas',
        'Bioseguridad ocular y control de adhesivos',
      ],
    },
    facial: {
      title: 'Curso Superior de Cosmetología Facial & Hidrafacial',
      badge: '95% de Afinidad con tu Perfil',
      category: 'Cosmetología & Skincare',
      price: '590€ (o 3 cuotas de 196€)',
      duration: '10 Semanas • 80h Activas',
      href: '/cursos/cosmetologia-facial',
      description: 'Te apasiona la salud cutánea, la aparatología avanzada y los servicios de alto ticket en cabina. Aprenderás el protocolo completo de Hidrafacial, química cosmética (retinol, AHA/BHA, vitamina C), peelings y Dermapen.',
      skills: [
        'Protocolo completo de Hidrafacial en cabina',
        'Diagnóstico clínico de biotipos y fototipos de Fitzpatrick',
        'Espátula ultrasónica, radiofrecuencia y Dermapen',
        'Prescripción de rutinas cosmecéuticas de salón',
      ],
    },
  };

  const winnerKey = getWinner();
  const winner = resultsData[winnerKey];
  const progressPercent = Math.round(((currentStep + (showResult ? 1 : 0)) / questions.length) * 100);

  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-rose-950/90 border border-rose-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-300">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>DIAGNÓSTICO VOCACIONAL GRATUITO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
            ¿Qué Especialidad Estética es Ideal para Ti?
          </h2>
          <p className="text-sm text-slate-400">
            Responde 4 preguntas breves y nuestro sistema calculará el máster con mayor proyección y afinidad para tu perfil profesional.
          </p>
        </div>

        {/* Quiz Box */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
              <span>{showResult ? 'Diagnóstico Completado' : `Pregunta ${currentStep + 1} de ${questions.length}`}</span>
              <span className="text-rose-400">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-fabi-pink to-rose-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {!showResult ? (
            /* Active Question */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {questions[currentStep].title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{questions[currentStep].subtitle}</p>
              </div>

              <div className="space-y-3">
                {questions[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option.category)}
                    className="w-full text-left p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500/60 hover:bg-slate-850 hover:shadow-lg hover:shadow-rose-900/20 transition-all group flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                        {option.text}
                      </p>
                      <p className="text-xs text-slate-400">{option.hint}</p>
                    </div>
                    <div className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center shrink-0 group-hover:border-rose-500 group-hover:bg-rose-500/10">
                      <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-rose-400 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Card */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 px-3.5 py-1 rounded-full text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{winner.badge}</span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Especialidad Recomendada:
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
                  {winner.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{winner.description}</p>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Lo que dominarás en este máster:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {winner.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div>
                  <span className="text-2xl font-extrabold text-white">{winner.price}</span>
                  <span className="text-xs text-slate-400 block">{winner.duration}</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={resetQuiz}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-1 text-slate-400 hover:text-white px-4 py-3 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Repetir Test</span>
                  </button>

                  <a
                    href={`https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20hice%20el%20test%20y%20me%20recomiendan%20el%20${encodeURIComponent(winner.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md shadow-emerald-500/20 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Asesoría Directa</span>
                  </a>

                  <Link
                    href={winner.href}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white px-6 py-3 rounded-xl font-bold text-xs shadow-lg shadow-fabi-pink/20 transition-all hover:scale-105"
                  >
                    <span>Ver Temario Completo</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
