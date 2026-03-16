/**
 * Game Registry - Tüm oyunların merkezi kaydı
 * Lazy loading ile oyunlar sadece gerektiğinde yüklenir
 */

import { lazy, ComponentType } from 'react';

export interface GameConfig {
  id: string;
  name: string;
  category: string;
  grade?: number;
  component: () => Promise<{ default: ComponentType<any> }>;
}

// Matematik Oyunları - Grade 1
const mathGrade1Games: GameConfig[] = [
  {
    id: 'fruit-addition',
    name: 'Meyve Toplama',
    category: 'math',
    grade: 1,
    component: () => import('../../components/academic/math/grade1/basic/FruitAdditionGame'),
  },
  {
    id: 'fish-addition',
    name: 'Balık Toplama',
    category: 'math',
    grade: 1,
    component: () => import('../../components/academic/math/grade1/basic/FishAdditionGame'),
  },
  {
    id: 'space-addition',
    name: 'Uzay Toplama',
    category: 'math',
    grade: 1,
    component: () => import('../../components/academic/math/grade1/basic/SpaceAdditionGame'),
  },
  {
    id: 'balloon-pop',
    name: 'Balon Patlatma',
    category: 'math',
    grade: 1,
    component: () => import('../../components/academic/math/grade1/basic/BalloonPopGame'),
  },
  {
    id: 'cookie-monster',
    name: 'Kurabiye Canavarı',
    category: 'math',
    grade: 1,
    component: () => import('../../components/academic/math/grade1/basic/CookieMonsterGame'),
  },
];

// Türkçe Oyunları - Grade 1
const turkishGrade1Games: GameConfig[] = [
  {
    id: 'letter-match',
    name: 'Harf Eşleştirme',
    category: 'turkish',
    grade: 1,
    component: () => import('../../components/academic/turkish/grade1/letters/LetterMatchGame'),
  },
  {
    id: 'vowel-consonant',
    name: 'Sesli-Sessiz',
    category: 'turkish',
    grade: 1,
    component: () => import('../../components/academic/turkish/grade1/letters/VowelConsonantGame'),
  },
];

// Zeka Oyunları
const logicGames: GameConfig[] = [
  {
    id: 'chess',
    name: 'Satranç',
    category: 'logic',
    component: () => import('../../components/logic-games/two-player/ChessGame'),
  },
  {
    id: 'backgammon',
    name: 'Tavla',
    category: 'logic',
    component: () => import('../../components/logic-games/two-player/BackgammonGame'),
  },
];

// Tüm oyunları birleştir
export const gameRegistry: GameConfig[] = [
  ...mathGrade1Games,
  ...turkishGrade1Games,
  ...logicGames,
];

// Oyun arama fonksiyonları
export const getGameById = (id: string): GameConfig | undefined => {
  return gameRegistry.find((game) => game.id === id);
};

export const getGamesByCategory = (category: string): GameConfig[] => {
  return gameRegistry.filter((game) => game.category === category);
};

export const getGamesByGrade = (grade: number): GameConfig[] => {
  return gameRegistry.filter((game) => game.grade === grade);
};
