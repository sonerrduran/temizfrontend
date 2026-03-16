import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'block-coding-',
  name: 'BlockCoding',
  description: 'BlockCoding oyunu',
  version: '1.0.0',

  category: 'learning',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'BlockCodingGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/block-coding-/icon.svg',
  },

  tags: ['learning'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
