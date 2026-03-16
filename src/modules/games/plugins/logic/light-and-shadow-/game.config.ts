import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'light-and-shadow-',
  name: 'LightAndShadow',
  description: 'LightAndShadow oyunu',
  version: '1.0.0',

  category: 'logic',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'LightAndShadowGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/light-and-shadow-/icon.svg',
  },

  tags: ['logic'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
