'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    text: string;
    category: 'unas' | 'pestanas' | 'facial';
  }[];
}

export function CareerPathQuiz() {
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
      title: '1. Cuando imaginas trabajar en belleza, ¿qué te atrae más?',
      subtitle: 'Elige la disciplina que más despierta tu interés o afinidad manual.',
      options: [
        { text: 'Precisión geométrica, limado, arquitectura y estructuras de gel (Uñas)', category: 'unas' },
        { text: 'Delicadeza pelo a pelo, visagismo, diseño de cejas y simetría de mirada (Pestañas)', category: 'pestanas' },
        { text: 'Cuidado dérmico profundo, aparatología, peelings y glow en cabina (Facial)', category: 'facial' },
      ],
    },
    {
      id: 2,
      title: '2. ¿Cuál es tu punto de partida actual?',
      subtitle: 'Tu experiencia previa nos ayuda a afinar la recomendación.',
      options: [
        { text: 'Empiezo completamente desde cero y busco una profesión de alta demanda', category: 'unas' },
        { text: 'Ya tengo nociones básicas y quiero perfeccionar mi técnica y velocidad', category: 'pestanas' },
        { text: 'Tengo o quiero abrir mi propio espacio o cabina de estética', category: 'facial' },
      ],
    },
    {
      id: 3,
      title: '3. ¿Qué servicio te gustaría dominar primero?',
      subtitle: 'La técnica insignia con la que comenzarás a atender clientas.',
      options: [
        { text: 'Manicura rusa combinada con torno y base rubber autonivelante', category: 'unas' },
        { text: 'Extensiones de pestañas 1:1, volumen ruso y visagismo con henna', category: 'pestanas' },
        { text: 'Protocolo completo de Hidrafacial y renovación dérmica en cabina', category: 'facial' },
      ],
    },
    {
      id: 4,
      title: '4. ¿Cuál es tu principal meta profesional a corto plazo?',
      subtitle: 'El objetivo que quieres alcanzar con tu titulación.',
      options: [
        { text: 'Construir una cartera de clientas recurrentes que vuelvan cada mes', category: 'unas' },
        { text: 'Elevar la calidad de mis sets para cobrar tarifas de mayor ticket', category: 'pestanas' },
        { text: 'Incorporar tratamientos faciales de alto margen a mi menú de servicios', category: 'facial' },
      ],
    },
  ];

  const handleSelect = (category: 'unas' | 'pestanas' | 'facial') => {
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

  const courseResults = {
    unas: {
      title: 'Máster Profesional en Uñas de Gel & Acrílico Premium',
      slug: 'unas-de-gel-y-acrilico',
      reason: 'Tu perfil destaca por la búsqueda de precisión geométrica y la creación de clientela recurrente mes a mes. Aprenderás Manicura Rusa con torno, nivelación con base rubber y esculpido estructural.',
      duration: '8 Semanas · 60h Activas',
      price: '490 €',
      installments: 'o 3 cuotas de 163 € sin intereses',
      skills: [
        'Manicura rusa combinada con torno y fresas de diamante',
        'Nivelación y refuerzo con base rubber autonivelante',
        'Esculpido en gel y acrigel con molde paramétrico',
        'Cálculo de costes de cabina y fijación de precios',
      ],
    },
    pestanas: {
      title: 'Especialización Profesional en Pestañas, Cejas & Volumen Ruso',
      slug: 'extensiones-de-pestanas',
      reason: 'Tu vocación busca la microprecisión, la simetría y el embellecimiento de la mirada. Dominarás el aislamiento 1:1, la apertura manual de abanicos 2D–6D, el visagismo con henna y el laminado.',
      duration: '6 Semanas · 50h Activas',
      price: '380 €',
      installments: 'o 3 cuotas de 126 € sin intereses',
      skills: [
        'Técnica clásica pelo a pelo y volumen ruso 2D–6D',
        'Visagismo y diseño de cejas con henna y tinte',
        'Lifting, laminado de cejas y depilación con hilo',
        'Bioseguridad ocular y control de humedad de adhesivos',
      ],
    },
    facial: {
      title: 'Curso Superior de Cosmetología Facial & Hidrafacial',
      slug: 'cosmetologia-facial',
      reason: 'Tu interés se orienta al cuidado dérmico profundo, la aparatología en cabina y los tratamientos de alto ticket. Aprenderás el protocolo completo de Hidrafacial, peelings químicos y diagnóstico clínico.',
      duration: '10 Semanas · 80h Activas',
      price: '590 €',
      installments: 'o 3 cuotas de 196 € sin intereses',
      skills: [
        'Protocolo completo de Hidrafacial en cabina',
        'Diagnóstico clínico de biotipos y fototipos de Fitzpatrick',
        'Espátula ultrasónica, radiofrecuencia y Dermapen',
        'Química cosmecéutica: AHA/BHA, retinol y vitamina C',
      ],
    },
  };

  const winnerKey = getWinner();
  const winner = courseResults[winnerKey];

  return (
    <section className="py-20 lg:py-32 bg-[#FAF6F3] text-[#111114] border-b border-[#E8E2DA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#FBE8EF] border border-[#F6CADB] px-3.5 py-1 text-xs font-bold text-[#B70055]">
            <Sparkles className="w-3.5 h-3.5 text-[#DD006B]" />
            <span className="uppercase tracking-widest text-[10px]">Orientación Vocacional</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111114] tracking-tight leading-[0.95]">
            ¿No sabes qué formación elegir?
          </h2>
          <p className="text-sm sm:text-base text-[#6E6763] font-sans">
            Responde 4 preguntas breves para identificar la especialidad que mejor encaja con tus metas y habilidades.
          </p>
        </div>

        {/* Quiz Frame */}
        <div className="bg-[#FFFDFC] border border-[#E8E2DA] p-6 sm:p-10 space-y-8 shadow-xs">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-sans font-semibold text-[#8A8682]">
              <span>
                {showResult ? 'Diagnóstico Completado' : `Pregunta ${currentStep + 1} de ${questions.length}`}
              </span>
              <span className="text-[#111114] font-mono">
                {Math.round(((currentStep + (showResult ? 1 : 0)) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-1 bg-[#E8E2DA]">
              <div
                className="h-full bg-[#DD006B] transition-all duration-300"
                style={{
                  width: `${Math.round(((currentStep + (showResult ? 1 : 0)) / questions.length) * 100)}%`,
                }}
              />
            </div>
          </div>

          {!showResult ? (
            /* Active Question */
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#111114]">
                  {questions[currentStep].title}
                </h3>
                <p className="text-xs text-[#6E6763] font-sans mt-1">
                  {questions[currentStep].subtitle}
                </p>
              </div>

              <div className="space-y-3">
                {questions[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(option.category)}
                    className="w-full text-left p-5 bg-[#FAF6F3] border border-[#E8E2DA] hover:border-[#DD006B] hover:bg-[#FBE8EF]/40 transition-all group flex items-center justify-between"
                  >
                    <span className="text-xs sm:text-sm font-medium text-[#111114] group-hover:text-[#DD006B] transition-colors">
                      {option.text}
                    </span>
                    <span className="w-4 h-4 rounded-full border border-[#C5A47C] flex items-center justify-center shrink-0 ml-4 group-hover:border-[#DD006B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#DD006B]" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#DD006B] font-sans font-bold">
                  Tu Formación Recomendada:
                </span>
                <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-[#111114] mt-1">
                  {winner.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6763] font-sans mt-3 leading-relaxed">
                  {winner.reason}
                </p>
              </div>

              <div className="bg-[#FAF6F3] border border-[#E8E2DA] p-6 space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#111114] font-semibold block">
                  Técnicas principales del máster:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#6E6763] font-sans">
                  {winner.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DD006B] shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2DA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-editorial text-3xl font-bold text-[#111114]">
                    {winner.price}
                  </span>
                  <span className="text-xs text-[#6E6763] font-sans block">
                    {winner.installments} · {winner.duration}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center justify-center space-x-1.5 text-xs uppercase tracking-wider text-[#8A8682] hover:text-[#111114] py-3 px-4 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Repetir</span>
                  </button>

                  <a
                    href={`https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20complet%C3%A9%20el%20test%20y%20mi%20recomendaci%C3%B3n%20es%20el%20${encodeURIComponent(winner.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-[#FFFDFC] hover:bg-[#FBE8EF] border border-[#E8E2DA] text-[#111114] py-3.5 px-5 text-xs font-semibold tracking-widest uppercase transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#DD006B]" />
                    <span>Hablar con una asesora</span>
                  </a>

                  <Link
                    href={`/cursos/${winner.slug}`}
                    className="inline-flex items-center justify-center space-x-2 bg-[#09090B] hover:bg-[#DD006B] text-white py-3.5 px-6 text-xs font-semibold tracking-widest uppercase transition-colors group"
                  >
                    <span>Ver programa</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
