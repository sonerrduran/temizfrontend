import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'non-consecutive-sudoku-',
  name: 'NonConsecutiveSudoku',
  description: 'NonConsecutiveSudoku oyunu',
  version: '1.0.0',

  category: 'logic',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'NonConsecutiveSudokuGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/non-consecutive-sudoku-/icon.svg',
  },

  tags: ['logic'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
