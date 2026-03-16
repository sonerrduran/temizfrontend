import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'pizza-sharing-',
  name: 'PizzaSharing',
  description: 'PizzaSharing oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 3,
  gradeMax: 4,
  difficulty: 'medium',

  component: 'PizzaSharingGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/pizza-sharing-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
