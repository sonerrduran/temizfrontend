import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'flash-memory-',
  name: 'FlashMemory',
  description: 'FlashMemory oyunu',
  version: '1.0.0',

  category: 'reading',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'FlashMemoryGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/flash-memory-/icon.svg',
  },

  tags: ['reading'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
