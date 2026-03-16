import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'number-line-jump-',
  name: 'NumberLineJump',
  description: 'NumberLineJump oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 2,
  gradeMax: 3,
  difficulty: 'easy',

  component: 'NumberLineJumpGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/number-line-jump-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
