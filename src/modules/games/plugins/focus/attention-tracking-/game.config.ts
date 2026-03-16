import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'attention-tracking-',
  name: 'AttentionTracking',
  description: 'AttentionTracking oyunu',
  version: '1.0.0',

  category: 'focus',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'AttentionTrackingGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/attention-tracking-/icon.svg',
  },

  tags: ['focus'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
