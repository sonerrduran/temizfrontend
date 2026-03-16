import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'market-basket-',
  name: 'MarketBasket',
  description: 'MarketBasket oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 2,
  gradeMax: 3,
  difficulty: 'easy',

  component: 'MarketBasketGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/market-basket-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
