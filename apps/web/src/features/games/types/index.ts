/**
 * Games Feature Types
 * Oyun feature'ı için tip tanımları
 */

export interface GameMetadata {
  id: string;
  name: string;
  description: string;
  category: GameCategory;
  icon: string;
  path: string;
  gradeLevel?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export type GameCategory = 'math' | 'logic' | 'language' | 'memory' | 'speed' | 'puzzle';

export interface GameNavigationState {
  currentGame: string | null;
  previousGame: string | null;
  category: GameCategory | null;
}
