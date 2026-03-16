import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'exponent-puzzle-',
  name: 'ExponentPuzzle',
  description: 'ExponentPuzzle oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 8,
  gradeMax: 9,
  difficulty: 'hard',

  component: 'ExponentPuzzleGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/exponent-puzzle-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
