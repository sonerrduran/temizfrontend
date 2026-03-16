import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'length-compare-',
  name: 'LengthCompare',
  description: 'LengthCompare oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'LengthCompareGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/length-compare-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
