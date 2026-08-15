export type SkillCategory = 'unas' | 'pestanas' | 'cosmetologia' | 'bioseguridad' | 'negocio';
export type SkillLevel = 'fundamentos' | 'intermedio' | 'avanzado' | 'master';
export type EvidenceConfidence = 'low' | 'medium' | 'high' | 'expert';
export type RetentionRiskLevel = 'low' | 'medium' | 'high';

export interface Skill {
  id: string;
  slug: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  description: string;
  icon?: string;
  required_points: number;
}

export interface SkillEvidenceItem {
  id: string;
  evidence_type: 'theory_completion' | 'quiz_score' | 'photo_submission' | 'rubric_evaluation' | 'final_project';
  label: string;
  score_obtained: number;
  max_score: number;
  is_verified: boolean;
  verified_at?: string;
  feedback?: string;
}

export interface StudentSkill {
  id: string;
  student_id: string;
  skill: Skill;
  proficiency_score: number; // 0 to 100
  confidence_level: EvidenceConfidence;
  is_verified: boolean;
  verified_at?: string;
  verified_by_name?: string;
  evidences: SkillEvidenceItem[];
}

export interface ProfessionalSkillPassport {
  slug: string;
  student_name: string;
  avatar_url?: string;
  specialty_title: string;
  bio: string;
  location: string;
  completion_rate: number;
  total_active_hours: number;
  skills: StudentSkill[];
  verified_certificates: {
    code: string;
    course_title: string;
    issued_at: string;
    hash_signature: string;
  }[];
  portfolio_projects: {
    id: string;
    title: string;
    category: string;
    before_image: string;
    after_image: string;
    technique_notes: string;
    tutor_grade: string;
  }[];
}

export interface RetentionRiskStudent {
  id: string;
  name: string;
  email: string;
  avatar: string;
  courseTitle: string;
  progress: number;
  activeHours: number;
  daysInactive: number;
  failedQuizzesCount: number;
  pendingPracticesCount: number;
  riskLevel: RetentionRiskLevel;
  riskFactors: string[];
  recommendedAction: string;
}

export interface InAppNotification {
  id: string;
  title: string;
  message: string;
  type: 'general' | 'feedback' | 'tutoring' | 'streak' | 'certificate' | 'alert';
  link_url?: string;
  is_read: boolean;
  created_at: string;
}
