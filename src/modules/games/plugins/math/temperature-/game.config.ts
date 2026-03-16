import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'temperature-',
  name: 'Temperature',
  description: 'Temperature oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 7,
  gradeMax: 8,
  difficulty: 'hard',

  component: 'TemperatureGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/temperature-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
