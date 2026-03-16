import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'word-memory-',
  name: 'WordMemory',
  description: 'WordMemory oyunu',
  version: '1.0.0',

  category: 'learning',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'WordMemoryGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/word-memory-/icon.svg',
  },

  tags: ['learning'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
