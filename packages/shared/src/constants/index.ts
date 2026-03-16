/**
 * Shared Constants
 * Ortak sabitler
 */

export const APP_NAME = 'Eğitim Galaksisi';
export const APP_VERSION = '3.0.0';

export const GRADE_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  SCHOOL_ADMIN: 'SCHOOL_ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
} as const;

export const DIFFICULTY_LEVELS = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
} as const;

export const XP_PER_LEVEL = 100;
export const STARS_PER_CORRECT_ANSWER = 10;
