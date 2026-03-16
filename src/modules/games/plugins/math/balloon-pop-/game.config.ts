import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'balloon-pop-',
  name: 'BalloonPop',
  description: 'BalloonPop oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'BalloonPopGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/balloon-pop-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
