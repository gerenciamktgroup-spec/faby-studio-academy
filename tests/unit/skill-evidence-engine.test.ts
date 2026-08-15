import { describe, it, expect } from 'vitest';
import {
  MASTER_SKILLS_TAXONOMY,
  getStudentSkills,
  getPublicSkillPassport,
  getRetentionRiskAnalysis,
} from '../../src/lib/services-demo/skills-service';

describe('Faby Skill Graph & Multi-Factor Evidence Engine', () => {
  it('loads master skills taxonomy across key beauty domains', () => {
    expect(MASTER_SKILLS_TAXONOMY.length).toBeGreaterThanOrEqual(8);
    const categories = MASTER_SKILLS_TAXONOMY.map((s) => s.category);
    expect(categories).toContain('unas');
    expect(categories).toContain('pestanas');
    expect(categories).toContain('bioseguridad');
  });

  it('calculates multi-factor student skills with verified evidences', () => {
    const skills = getStudentSkills('22222222-2222-2222-2222-222222222222');
    expect(skills.length).toBeGreaterThanOrEqual(4);

    const verified = skills.filter((s) => s.is_verified);
    expect(verified.length).toBeGreaterThan(0);

    // Each skill must contain multi-factor evidence items
    skills.forEach((stk) => {
      expect(stk.proficiency_score).toBeGreaterThanOrEqual(0);
      expect(stk.proficiency_score).toBeLessThanOrEqual(100);
      expect(stk.evidences.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('generates public skill passport profiles with transformation projects and without private data', () => {
    const passport = getPublicSkillPassport('lucia-martinez');
    expect(passport).not.toBeNull();
    expect(passport?.student_name).toBe('Lucía Martínez');
    expect(passport?.skills.length).toBeGreaterThan(0);
    expect(passport?.portfolio_projects.length).toBeGreaterThanOrEqual(2);
    expect(passport?.verified_certificates.length).toBeGreaterThanOrEqual(1);

    // Verify transformation before/after images exist
    passport?.portfolio_projects.forEach((proj) => {
      expect(proj.before_image).toBeDefined();
      expect(proj.after_image).toBeDefined();
      expect(proj.tutor_grade).toBeDefined();
    });
  });

  it('detects early warning retention risk based on inactivity and failed assignments', () => {
    const riskAnalysis = getRetentionRiskAnalysis();
    expect(riskAnalysis.length).toBeGreaterThanOrEqual(3);

    const highRisk = riskAnalysis.find((s) => s.riskLevel === 'high');
    expect(highRisk).toBeDefined();
    expect(highRisk?.daysInactive).toBeGreaterThanOrEqual(3);
    expect(highRisk?.riskFactors.length).toBeGreaterThan(0);
    expect(highRisk?.recommendedAction).toBeDefined();
  });
});
