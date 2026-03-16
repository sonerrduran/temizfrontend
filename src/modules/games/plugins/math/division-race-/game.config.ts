import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'division-race-',
  name: 'DivisionRace',
  description: 'DivisionRace oyunu',
  version: '1.0.0',

  category: 'math',
  gradeMin: 3,
  gradeMax: 4,
  difficulty: 'medium',

  component: 'DivisionRaceGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/division-race-/icon.svg',
  },

  tags: ['math'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
