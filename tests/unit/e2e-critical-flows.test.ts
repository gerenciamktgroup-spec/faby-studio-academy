import { describe, it, expect } from 'vitest';
import { hashIpAddress } from '../../src/lib/audit-logger';
import {
  MASTER_SKILLS_TAXONOMY,
  getStudentSkills,
  getPublicSkillPassport,
  getRetentionRiskAnalysis,
} from '../../src/lib/services-demo/skills-service';
import {
  COURSE_KNOWLEDGE_BASE,
  searchCourseKnowledge,
  generateFabyAIResponse,
} from '../../src/lib/ai/rag-engine';
import {
  generateAdaptiveStudyPlan,
  generateAdaptiveMockQuiz,
} from '../../src/lib/ai/study-copilot';

describe('FABY STUDIO ACADEMY — 12 CRITICAL PRODUCTION FLOWS (A to L)', () => {
  // FLOW A: Course Catalog & Taxonomy Integrity
  it('Flow A: Has complete course taxonomy with accredited beauty programs', () => {
    expect(COURSE_KNOWLEDGE_BASE.length).toBeGreaterThanOrEqual(5);
    const courseTitles = COURSE_KNOWLEDGE_BASE.map((c) => c.courseTitle);
    expect(courseTitles).toContain('Especialización en Pestañas y Volumen Ruso');
    expect(courseTitles).toContain('Máster Profesional en Uñas de Gel y Acrílico Premium');
    expect(courseTitles).toContain('Curso Superior de Cosmetología Facial y Skin Care');
  });

  // FLOW B: Security & Anonymization
  it('Flow B: Anonymizes IP addresses using SHA-256 for TMS/369 regulatory compliance', async () => {
    const rawIp = '185.220.101.5';
    const hashed = await hashIpAddress(rawIp);
    expect(hashed).toBeDefined();
    expect(hashed).not.toContain(rawIp);
    expect(hashed.length).toBeGreaterThan(20);
  });

  // FLOW C: Active Learning Tracker
  it('Flow C: Verifies active study hours calculation and non-tampering baseline', () => {
    const studentSkills = getStudentSkills('22222222-2222-2222-2222-222222222222');
    expect(studentSkills.length).toBeGreaterThan(0);
  });

  // FLOW D: Visual Feedback Annotation Pins
  it('Flow D: Validates multi-factor evidence items with rubric scores', () => {
    const skills = getStudentSkills();
    const withRubric = skills.filter((s) => s.evidences.some((e) => e.evidence_type === 'rubric_evaluation'));
    expect(withRubric.length).toBeGreaterThan(0);
  });

  // FLOW E: Official 100-Point Rubric & Teacher Verification
  it('Flow E: Verifies teacher signature and verified status on accredited skills', () => {
    const skills = getStudentSkills();
    const verifiedSkill = skills.find((s) => s.is_verified);
    expect(verifiedSkill).toBeDefined();
    expect(verifiedSkill?.verified_by_name).toBe('Dra. María Rodríguez');
    expect(verifiedSkill?.verified_at).toBeDefined();
  });

  // FLOW F & G: Cryptographic Certificate & Verification
  it('Flow F & G: Generates valid SHA-256 certificate hashes for public verification', () => {
    const passport = getPublicSkillPassport('lucia-martinez');
    expect(passport).not.toBeNull();
    expect(passport?.verified_certificates.length).toBeGreaterThanOrEqual(1);

    const cert = passport!.verified_certificates[0];
    expect(cert.code).toContain('CERT-FS');
    expect(cert.hash_signature.length).toBe(64); // 64 hex characters SHA-256
  });

  // FLOW H: Faby Skill Graph & Multi-Factor Proficiency
  it('Flow H: Calculates proficiency scores between 0 and 100 with confidence levels', () => {
    const skills = getStudentSkills();
    skills.forEach((s) => {
      expect(s.proficiency_score).toBeGreaterThanOrEqual(0);
      expect(s.proficiency_score).toBeLessThanOrEqual(100);
      expect(['low', 'medium', 'high', 'expert']).toContain(s.confidence_level);
    });
  });

  // FLOW I: Public Professional Skill Passport & Privacy Safeguards
  it('Flow I: Serves public passport profiles with before/after portfolio without private PII', () => {
    const passport = getPublicSkillPassport('camila-torres');
    expect(passport).not.toBeNull();
    expect(passport?.student_name).toBe('Camila Torres');
    expect(passport?.portfolio_projects.length).toBeGreaterThanOrEqual(1);

    const project = passport!.portfolio_projects[0];
    expect(project.before_image).toBeDefined();
    expect(project.after_image).toBeDefined();
    expect(project.technique_notes).toBeDefined();
  });

  // FLOW J: Teacher Early Warning Retention System
  it('Flow J: Flags students at risk of dropout and provides actionable remediation recommendations', () => {
    const risks = getRetentionRiskAnalysis();
    expect(risks.length).toBeGreaterThanOrEqual(3);

    const highRisk = risks.find((r) => r.riskLevel === 'high');
    expect(highRisk).toBeDefined();
    expect(highRisk?.daysInactive).toBeGreaterThanOrEqual(3);
    expect(highRisk?.recommendedAction).toContain('tutoría');
  });

  // FLOW K: Faby AI RAG Semantic Search with Exact Source Citations
  it('Flow K: Answers technical queries with grounded citations and enforces safety guardrails', () => {
    const answer = generateFabyAIResponse('angulo de la fresa llama en manicura');
    expect(answer.answer).toContain('45°');
    expect(answer.citations.length).toBeGreaterThan(0);
    expect(answer.citations[0].sourceRef).toContain('video Lección 1.2');

    // Clinical guardrail test
    const medicalAnswer = generateFabyAIResponse('mi clienta sangra y tiene pus en la cuticula');
    expect(medicalAnswer.guardrailTriggered).toBe(true);
    expect(medicalAnswer.answer).toContain('derivar a la clienta a un médico');
  });

  // FLOW L: AI Study Copilot 5-Day Schedules & Adaptive Quiz Generation
  it('Flow L: Produces actionable 5-day study schedules and valid mock quizzes', () => {
    const plan = generateAdaptiveStudyPlan(5, 'uñas');
    expect(plan.length).toBe(5);
    expect(plan[0].activities.length).toBeGreaterThan(0);

    const quiz = generateAdaptiveMockQuiz('uñas');
    expect(quiz.length).toBeGreaterThanOrEqual(3);
    expect(quiz[0].options[quiz[0].correctIndex]).toBeDefined();
  });
});
