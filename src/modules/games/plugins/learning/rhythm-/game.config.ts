import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'rhythm-',
  name: 'Rhythm',
  description: 'Rhythm oyunu',
  version: '1.0.0',

  category: 'learning',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'RhythmGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/rhythm-/icon.svg',
  },

  tags: ['learning'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
