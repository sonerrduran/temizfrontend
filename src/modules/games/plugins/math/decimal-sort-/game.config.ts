import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'decimal-sort-',
  name: 'DecimalSort',
  description: 'DecimalSort oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 6,
  gradeMax: 7,
  difficulty: 'hard',

  component: 'DecimalSortGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/decimal-sort-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
