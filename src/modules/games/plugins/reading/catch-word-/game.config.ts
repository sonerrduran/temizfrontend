import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'catch-word-',
  name: 'CatchWord',
  description: 'CatchWord oyunu',
  version: '1.0.0',

  category: 'reading',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'CatchWordGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/catch-word-/icon.svg',
  },

  tags: ['reading'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
