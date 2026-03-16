import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'thousand-hunt-',
  name: 'ThousandHunt',
  description: 'ThousandHunt oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 4,
  gradeMax: 5,
  difficulty: 'medium',

  component: 'ThousandHuntGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/thousand-hunt-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
