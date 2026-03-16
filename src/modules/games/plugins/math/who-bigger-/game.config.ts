import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'who-bigger-',
  name: 'WhoBigger',
  description: 'WhoBigger oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'WhoBiggerGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/who-bigger-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
