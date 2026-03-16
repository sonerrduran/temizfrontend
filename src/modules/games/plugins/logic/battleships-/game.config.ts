import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'battleships-',
  name: 'Battleships',
  description: 'Battleships oyunu',
  version: '1.0.0',

  category: 'logic',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'BattleshipsGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/battleships-/icon.svg',
  },

  tags: ['logic'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
