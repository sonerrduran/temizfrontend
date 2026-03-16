import { GameConfig } from '@/modules/games/engine/types/game.types';

export const config: GameConfig = {
  id: 'big-small-race',
  name: 'Büyük Küçük Yarışı',
  description: 'Sayıları karşılaştır ve yarışı kazan!',
  version: '1.0.0',

  // Metadata
  category: 'math',
  subcategory: 'comparison',
  gradeMin: 1,
  gradeMax: 2,
  difficulty: 'easy',

  // Technical
  component: 'BigSmallRaceGame',
  template: 'quiz',

  // Features
  features: {
    multiplayer: false,
    ai: true,
    offline: true,
    realtime: false,
  },

  // Content
  contentSource: 'ai',

  // Assets
  assets: {
    icon: '/assets/games/big-small-race/icon.svg',
    thumbnail: '/assets/games/big-small-race/thumb.jpg',
  },

  // Tags
  tags: ['comparison', 'numbers', 'racing'],
  keywords: ['büyük', 'küçük', 'karşılaştırma', 'sayılar'],

  // Performance
  estimatedLoadTime: 300,
  memoryUsage: 'low',

  // Analytics
  trackEvents: ['game_start', 'question_answer', 'game_complete'],
};
