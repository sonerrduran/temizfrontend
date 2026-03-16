import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'number-hunt-to100',
  name: 'NumberHuntTo100',
  description: 'NumberHuntTo100 oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 2,
  gradeMax: 3,
  difficulty: 'easy',

  component: 'NumberHuntTo100Game',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/number-hunt-to100/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
