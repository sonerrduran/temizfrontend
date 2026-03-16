import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'number-train-',
  name: 'NumberTrain',
  description: 'NumberTrain oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'NumberTrainGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/number-train-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
