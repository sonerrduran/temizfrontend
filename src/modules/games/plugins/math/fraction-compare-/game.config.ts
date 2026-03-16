import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'fraction-compare-',
  name: 'FractionCompare',
  description: 'FractionCompare oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 5,
  gradeMax: 6,
  difficulty: 'medium',

  component: 'FractionCompareGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/fraction-compare-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
