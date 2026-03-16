// Logic games types
export type Difficulty = 'easy' | 'medium' | 'hard';

// Difficulty values for runtime use
export const DifficultyValues = {
  EASY: 'easy' as Difficulty,
  MEDIUM: 'medium' as Difficulty,
  HARD: 'hard' as Difficulty,
};

export interface LogicGameConfig {
  gameType: 'sudoku' | 'puzzle' | 'memory' | 'two-player';
  difficulty: Difficulty;
}

export interface LogicGameProps {
  config: LogicGameConfig;
  onComplete?: (result: any) => void;
}

export type GameMode = 'single' | 'multi' | 'tournament';
