import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'fraction-addition-',
  name: 'FractionAddition',
  description: 'FractionAddition oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 5,
  gradeMax: 6,
  difficulty: 'medium',

  component: 'FractionAdditionGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/fraction-addition-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
