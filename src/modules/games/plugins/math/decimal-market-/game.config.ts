import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'decimal-market-',
  name: 'DecimalMarket',
  description: 'DecimalMarket oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 6,
  gradeMax: 7,
  difficulty: 'hard',

  component: 'DecimalMarketGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/decimal-market-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
