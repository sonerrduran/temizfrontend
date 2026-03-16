import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'symmetry-',
  name: 'Symmetry',
  description: 'Symmetry oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 2,
  gradeMax: 3,
  difficulty: 'easy',

  component: 'SymmetryGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/symmetry-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
