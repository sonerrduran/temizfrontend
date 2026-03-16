import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'polyomino-puzzle-',
  name: 'PolyominoPuzzle',
  description: 'PolyominoPuzzle oyunu',
  version: '1.0.0',

  category: 'logic',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'PolyominoPuzzleGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/polyomino-puzzle-/icon.svg',
  },

  tags: ['logic'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
