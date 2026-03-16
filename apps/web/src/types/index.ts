export enum Difficulty {
  VERY_EASY = 'VERY_EASY',
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  VERY_HARD = 'VERY_HARD',
}

export enum GameMode {
  HOME = 'HOME',
  SINGLE_PLAYER = 'SINGLE_PLAYER',
  TWO_PLAYER = 'TWO_PLAYER',
  PRACTICE = 'PRACTICE',
  CHALLENGE = 'CHALLENGE',
}

export interface UserStats {
  stars: number;
  badges: string[];
  solvedProblems: number;
  gradeLevel: number;
  currentAvatar: string;
  fastReadingWpm?: number;
  fastReadingLevel?: number;
  fastReadingComprehensionAvg?: number;
}

export interface Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  difficulty?: Difficulty;
}
