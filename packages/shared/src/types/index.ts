/**
 * Shared Types
 * Ortak tip tanımlamaları
 */

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'SCHOOL_ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
  gradeLevel: number;
  stars: number;
  xp: number;
  level: number;
  avatar: string;
  solvedProblems: number;
  streakDays: number;
  schoolId?: string | null;
  school?: {
    id: string;
    name: string;
    code?: string;
  } | null;
}

export interface Game {
  id: string;
  name: string;
  code: string;
  categoryId: string;
  description: string;
  icon: string;
  gradeMin: number;
  gradeMax: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  component: string;
  path: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  playCount: number;
  avgRating: number;
}

export interface Category {
  id: string;
  name: string;
  code: string;
  icon: string;
  color: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

export interface GameSession {
  id: string;
  userId: string;
  gameId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  completedAt: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  stars: number;
  avatar: string;
  rank: number;
  xp: number;
  level: number;
}
