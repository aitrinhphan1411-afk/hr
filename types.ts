
export enum UserRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN'
}

export enum Language {
  VI = 'VI',
  EN = 'EN'
}

export interface Employee {
  email: string;
  name: string;
  department: string;
  level: string;
  position: string;
  join_date: string;
  role: UserRole;
}

export interface SurveyResponse {
  id?: string;
  email: string;
  survey_id: string;
  answers: Record<string, any>;
  created_at: string;
  // Joined employee data
  employee?: Employee;
}

export interface DashboardMetrics {
  totalParticipants: number;
  participationRate: number;
  engagementScore: number;
  departmentBreakdown: Record<string, number>;
  levelBreakdown: Record<string, number>;
  monthlyTrend: Array<{ month: string; count: number }>;
  anonymizedFeedback: string[];
  nonParticipants: Employee[];
}

export interface TranslationSchema {
  login: {
    title: string;
    description: string;
    emailPlaceholder: string;
    submit: string;
    trustNote: string;
  };
  survey: {
    title: string;
    optional: string;
    submit: string;
    submitting: string;
    duplicate: string;
  };
  thanks: {
    title: string;
    message: string;
    backHome: string;
  };
  admin: {
    dashboard: string;
    metrics: string;
    engagement: string;
    participation: string;
    anonymizedTitle: string;
    nonParticipantsTitle: string;
  };
}
