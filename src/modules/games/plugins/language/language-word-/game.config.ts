import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'language-word-',
  name: 'LanguageWord',
  description: 'LanguageWord oyunu',
  version: '1.0.0',

  category: 'language',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  component: 'LanguageWordGame',

  features: {
    multiplayer: false,
    ai: false,
    offline: true,
    realtime: false,
  },

  contentSource: 'static',

  assets: {
    icon: '/assets/games/language-word-/icon.svg',
  },

  tags: ['language'],
  estimatedLoadTime: 300,
  memoryUsage: 'low',
};
