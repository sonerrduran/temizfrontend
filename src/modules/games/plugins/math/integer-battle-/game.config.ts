import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'integer-battle-',
  name: 'IntegerBattle',
  description: 'IntegerBattle oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 7,
  gradeMax: 8,
  difficulty: 'hard',

  component: 'IntegerBattleGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/integer-battle-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
