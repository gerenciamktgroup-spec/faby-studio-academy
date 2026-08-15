'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  Award,
  ChevronRight,
  Flame,
  Zap,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Trophy,
} from 'lucide-react';

interface Flashcard {
  id: number;
  category: string;
  front: string;
  back: string;
  citation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const FLASHCARD_DECKS: Record<string, { title: string; icon: string; cards: Flashcard[] }> = {
  quimica: {
    title: 'Química de Adhesivos & Polimerización',
    icon: '💧',
    cards: [
      {
        id: 1,
        category: 'Química de Adhesivos',
        front: '¿Cuál es el rango óptimo de humedad relativa (%) en cabina para el curado del cianoacrilato estándar?',
        back: 'Entre el 45% y el 60% de humedad relativa (HR) con temperatura de 19°C a 22°C. Si sube de 65%, el curado se acelera excesivamente provocando falsas adherencias.',
        citation: 'Módulo 1: Química de Polímeros y Adhesivos',
      },
      {
        id: 2,
        category: 'Química de Adhesivos',
        front: '¿Qué fenómeno ocurre si el cianoacrilato entra en contacto con agua líquida directa antes de curar?',
        back: 'Ocurre el efecto "Shock Curing" o Blooming: el adhesivo polimeriza instantáneamente en estado rígido y quebradizo, blanqueándose y perdiendo su elasticidad de retención.',
        citation: 'Manual de Bioseguridad Fabi Studio pág. 24',
      },
      {
        id: 3,
        category: 'Química de Adhesivos',
        front: '¿Por qué se debe renovar la gota de adhesivo en la piedra jade o anillo cada 15-20 minutos?',
        back: 'Porque la humedad ambiental inicia la polimerización desde el exterior de la cúpula hacia adentro, alterando la viscosidad y reduciendo la retención del set hasta en un 50%.',
        citation: 'Módulo 1: Preparación de la Mesa de Trabajo',
      },
    ],
  },
  anatomia: {
    title: 'Anatomía, Tricología & Histología Ungular',
    icon: '🔬',
    cards: [
      {
        id: 4,
        category: 'Anatomía Folicular',
        front: '¿En cuál de las tres fases del ciclo de la pestaña natural (Anágena, Catágena, Telógena) NO debemos aplicar extensiones pesadas?',
        back: 'En la fase Anágena (crecimiento activo temprano o "baby lash"). Solo se aplican extensiones ultrafinas (0.05-0.07mm) o se aíslan para no truncar la salud del folículo.',
        citation: 'Módulo 1: Fisiología de la Pestaña Natural',
      },
      {
        id: 5,
        category: 'Estructura Ungular',
        front: '¿Qué es el eponiquio y por qué nunca debe cortarse de forma invasiva en manicura rusa?',
        back: 'El eponiquio es el pliegue vivo de piel que protege la matriz ungueal contra bacterias y hongos. En manicura rusa solo se despega y pule la cutícula queratinizada muerta adherida a la placa.',
        citation: 'Máster Uñas de Gel: Anatomía Ungular',
      },
      {
        id: 6,
        category: 'Biología Cutánea',
        front: '¿Cuál es el valor medio de pH fisiológico del manto hidrolipídico de una piel sana?',
        back: 'Entre 4.5 y 5.5 (ligeramente ácido). Mantiene la flora bacteriana simbiótica y neutraliza microorganismos patógenos.',
        citation: 'Cosmetología Facial: Histología de la Dermis',
      },
    ],
  },
  bioseguridad: {
    title: 'Bioseguridad & Distancias de Cabina',
    icon: '🛡️',
    cards: [
      {
        id: 7,
        category: 'Distancias Clínicas',
        front: '¿Cuál es la distancia de seguridad obligatoria entre la base de la extensión y el borde libre del párpado?',
        back: 'De 0.5 mm a 1.0 mm de la raíz, NUNCA tocando la piel del párpado para evitar dermatitis, blefaritis u oclusión de las glándulas de Meibomio.',
        citation: 'Protocolo de Seguridad Ocular Fabi Studio',
      },
      {
        id: 8,
        category: 'Manicura Rusa',
        front: '¿A qué ángulo se debe colocar la fresa llama de diamante respecto al pliegue ungueal?',
        back: 'A 45 grados sobre el eponiquio, manteniendo la barriga de la fresa paralela sin clavar la punta en la placa ungueal natural para evitar "anillos de fuego".',
        citation: 'Módulo 1: Técnicas de Torno Mecánico',
      },
    ],
  },
};

export default function FlashcardsPage() {
  const [selectedDeckKey, setSelectedDeckKey] = useState<string>('quimica');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  const activeDeck = FLASHCARD_DECKS[selectedDeckKey];
  const currentCard = activeDeck.cards[currentCardIndex];

  const handleNextCard = (difficulty: 'easy' | 'medium' | 'hard') => {
    const xpBonus = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 20 : 10;
    setXpGained((prev) => prev + xpBonus);
    setIsFlipped(false);

    if (currentCardIndex + 1 < activeDeck.cards.length) {
      setTimeout(() => {
        setCurrentCardIndex((prev) => prev + 1);
      }, 200);
    } else {
      setSessionCompleted(true);
    }
  };

  const handleRestartDeck = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold text-amber-800">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Microaprendizaje de Retención Activa</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-2">
            Flashcards de Repaso Espaciado (3 Min)
          </h1>
          <p className="text-xs text-slate-500 max-w-xl">
            Entrena tu memoria a largo plazo con tarjetas interactivas de conceptos clave de química, bioseguridad y anatomía de cabina.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-white border border-slate-200 p-2 rounded-2xl shadow-xs self-start">
          <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Puntos de Repaso</p>
            <p className="text-sm font-extrabold text-amber-700 font-display">+{xpGained} XP</p>
          </div>
        </div>
      </div>

      {/* Deck Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {Object.entries(FLASHCARD_DECKS).map(([key, deck]) => {
          const isSelected = selectedDeckKey === key;
          return (
            <button
              key={key}
              onClick={() => {
                setSelectedDeckKey(key);
                setCurrentCardIndex(0);
                setIsFlipped(false);
                setSessionCompleted(false);
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-2xl mb-2">{deck.icon}</div>
              <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{deck.title}</h4>
              <p className="text-[11px] text-slate-500 mt-1">{deck.cards.length} Tarjetas Técnicas</p>
            </button>
          );
        })}
      </div>

      {/* Flashcard Area */}
      {!sessionCompleted && currentCard && (
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Tarjeta <strong className="text-slate-900">{currentCardIndex + 1}</strong> de{' '}
              {activeDeck.cards.length}
            </span>
            <span className="text-[11px] bg-slate-100 px-2.5 py-0.5 rounded-full font-semibold">
              {currentCard.category}
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentCardIndex + 1) / activeDeck.cards.length) * 100}%`,
              }}
            />
          </div>

          {/* 3D Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[320px] bg-white rounded-3xl border-2 border-slate-200/80 p-8 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between relative group hover:border-rose-300 select-none"
          >
            {/* Top Tag */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                {isFlipped ? '💡 Respuesta Técnica' : '❓ Pregunta de Repaso'}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-rose-600 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Haz clic para voltear</span>
              </span>
            </div>

            {/* Content */}
            <div className="py-6 text-center space-y-4 max-w-xl mx-auto">
              {!isFlipped ? (
                <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 leading-relaxed">
                  {currentCard.front}
                </h3>
              ) : (
                <div className="space-y-3 animate-in fade-in zoom-in-95">
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                    {currentCard.back}
                  </p>
                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-rose-600" />
                    <span>{currentCard.citation}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Hint */}
            <p className="text-[11px] text-slate-400 text-center">
              {isFlipped
                ? '¿Qué tan bien recordabas este concepto?'
                : 'Tómate 5 segundos para pensar la respuesta antes de voltear'}
            </p>
          </div>

          {/* Evaluation / Next Buttons */}
          {isFlipped && (
            <div className="grid grid-cols-3 gap-3 animate-in fade-in">
              <button
                onClick={() => handleNextCard('hard')}
                className="bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 p-3.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1"
              >
                <span>🔴 Difícil</span>
                <span className="text-[10px] font-normal text-rose-600">Repasar pronto (+10 XP)</span>
              </button>

              <button
                onClick={() => handleNextCard('medium')}
                className="bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 p-3.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1"
              >
                <span>🟡 Regular</span>
                <span className="text-[10px] font-normal text-amber-600">Casi dominado (+20 XP)</span>
              </button>

              <button
                onClick={() => handleNextCard('easy')}
                className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 p-3.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1"
              >
                <span>🟢 Fácil</span>
                <span className="text-[10px] font-normal text-emerald-600">¡Dominado! (+30 XP)</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Session Completed State */}
      {sessionCompleted && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-6 shadow-md animate-in fade-in zoom-in-95">
          <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-rose-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-rose-500/20">
            <Trophy className="w-10 h-10 fill-white" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold font-display text-slate-900">
              ¡Mazo Completado con Éxito!
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Has repasado todos los conceptos de <strong className="text-slate-900">{activeDeck.title}</strong>. Tu racha diaria se ha asegurado para el día de hoy.
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 inline-flex items-center space-x-3 text-amber-900 font-bold text-sm">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>Recompensa: +{xpGained} Puntos de Maestría Técnica</span>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleRestartDeck}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Repetir este Mazo</span>
            </button>

            <Link
              href="/campus/cursos/c1000000-0000-0000-0000-000000000001"
              className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center gap-1.5"
            >
              <span>Continuar Lección de Video</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
