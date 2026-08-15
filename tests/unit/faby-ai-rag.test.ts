import { describe, it, expect } from 'vitest';
import {
  COURSE_KNOWLEDGE_BASE,
  searchCourseKnowledge,
  generateFabyAIResponse,
} from '../../src/lib/ai/rag-engine';
import {
  generateAdaptiveStudyPlan,
  generateAdaptiveMockQuiz,
} from '../../src/lib/ai/study-copilot';

describe('Faby AI Native Suite — RAG & Study Copilot', () => {
  it('contains indexed chunks across beauty disciplines with source citations', () => {
    expect(COURSE_KNOWLEDGE_BASE.length).toBeGreaterThanOrEqual(5);

    COURSE_KNOWLEDGE_BASE.forEach((chunk) => {
      expect(chunk.title).toBeDefined();
      expect(chunk.content.length).toBeGreaterThan(20);
      expect(chunk.sourceRef).toBeDefined();
      expect(chunk.keywords.length).toBeGreaterThan(0);
    });
  });

  it('performs semantic search returning relevant chunks with high precision', () => {
    const results = searchCourseKnowledge('humedad cianoacrilato', 2);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].content).toContain('humedad');
    expect(results[0].sourceRef).toContain('Manual de Bioseguridad');
  });

  it('generates grounded AI responses with exact source citations', () => {
    const response = generateFabyAIResponse('distancia al parpado en extensiones');
    expect(response.answer).toBeDefined();
    expect(response.citations.length).toBeGreaterThan(0);
    expect(response.citations[0].sourceRef).toContain('video Lección 1.1');
  });

  it('triggers safety guardrails and medical referral advice when clinical conditions are asked', () => {
    const response = generateFabyAIResponse('tengo una clienta con infeccion y pus en el ojo');
    expect(response.guardrailTriggered).toBe(true);
    expect(response.answer).toContain('Aviso de Bioseguridad y Derivación Médica');
    expect(response.answer).toContain('derivar a la clienta a un médico dermatólogo u oftalmólogo');
  });

  it('generates a 5-day adaptive study plan for exam prep with daily milestones', () => {
    const plan = generateAdaptiveStudyPlan(5, 'pestañas');
    expect(plan.length).toBe(5);
    expect(plan[0].dayName).toBe('Día 1');
    expect(plan[0].activities.length).toBeGreaterThanOrEqual(2);
    expect(plan[0].estimatedMinutes).toBeGreaterThan(0);
  });

  it('generates adaptive mock quiz questions with explanations and source lessons', () => {
    const quiz = generateAdaptiveMockQuiz('pestañas');
    expect(quiz.length).toBeGreaterThanOrEqual(3);

    quiz.forEach((q) => {
      expect(q.options.length).toBe(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
      expect(q.explanation.length).toBeGreaterThan(10);
      expect(q.sourceLesson).toBeDefined();
    });
  });
});
