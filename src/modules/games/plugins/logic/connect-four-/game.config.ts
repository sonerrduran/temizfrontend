import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'connect-four-',
  name: 'ConnectFour',
  description: 'ConnectFour oyunu',
  version: '1.0.0',

  category: 'logic',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'ConnectFourGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/connect-four-/icon.svg',
  },

  tags: ['logic'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
