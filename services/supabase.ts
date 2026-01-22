
import { Employee, SurveyResponse, UserRole } from '../types';

/**
 * NOTE: In a real environment, you would use createClient(url, key) from '@supabase/supabase-js'.
 * For this demo/SPA environment, we implement the core data fetching logic.
 */

// Simulated database
let mockEmployees: Employee[] = [
  { email: 'admin@company.com', name: 'HR Manager', department: 'HR', level: 'L5', position: 'Lead', join_date: '2020-01-01', role: UserRole.ADMIN },
  { email: 'dev1@company.com', name: 'Developer One', department: 'Engineering', level: 'L2', position: 'SE', join_date: '2022-05-15', role: UserRole.MEMBER },
  { email: 'dev2@company.com', name: 'Developer Two', department: 'Engineering', level: 'L3', position: 'Senior SE', join_date: '2021-03-10', role: UserRole.MEMBER },
  { email: 'sale1@company.com', name: 'Sales rep', department: 'Sales', level: 'L1', position: 'Associate', join_date: '2023-11-20', role: UserRole.MEMBER },
];

let mockResponses: SurveyResponse[] = [];

export const supabaseService = {
  async login(email: string): Promise<Employee | null> {
    // In real app: supabase.from('employees').select('*').eq('email', email).single()
    return mockEmployees.find(e => e.email === email) || null;
  },

  async getEmployeeByEmail(email: string): Promise<Employee | null> {
    return mockEmployees.find(e => e.email === email) || null;
  },

  async checkDuplicateSubmission(email: string, surveyId: string): Promise<boolean> {
    // In real app: supabase.from('responses').select('id').match({ email, survey_id: surveyId })
    return mockResponses.some(r => r.email === email && r.survey_id === surveyId);
  },

  async submitResponse(response: Omit<SurveyResponse, 'id' | 'created_at'>): Promise<boolean> {
    const isDuplicate = await this.checkDuplicateSubmission(response.email, response.survey_id);
    if (isDuplicate) return false;

    mockResponses.push({
      ...response,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    });
    return true;
  },

  async getAllResponses(): Promise<SurveyResponse[]> {
    // In real app: supabase.from('responses').select('*, employee:employees(*)')
    return mockResponses.map(r => ({
      ...r,
      employee: mockEmployees.find(e => e.email === r.email)
    }));
  },

  async getAllEmployees(): Promise<Employee[]> {
    return mockEmployees;
  }
};
