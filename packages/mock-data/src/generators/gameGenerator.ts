/**
 * Game Data Generator
 * Oyun mock data üreteci
 */

import type { Game, GameCategoryType, GameDifficulty, GradeLevel } from '../contracts/game';

const gameNames = {
  math: ['Toplama', 'Çıkarma', 'Çarpma', 'Bölme', 'Kesirler', 'Geometri'],
  logic: ['Sudoku', 'Mantık Bulmacası', 'Şifre Çözme', 'Desen Tamamlama'],
  language: ['Kelime Hazinesi', 'Yazım Kuralları', 'Eş Anlamlı', 'Zıt Anlamlı'],
  memory: ['Hafıza Kartları', 'Sıra Hafızası', 'Görsel Hafıza'],
  speed: ['Hızlı Okuma', 'Hızlı Yazma', 'Hızlı Hesaplama'],
  puzzle: ['Yapboz', 'Bulmaca', 'Kelime Avı'],
};

const icons = ['🎮', '🎯', '🧩', '🎲', '🃏', '🎪', '🎨', '🎭', '🎬', '🎤'];

/**
 * Rastgele oyun adı üretir
 */
function generateGameName(category: GameCategoryType): string {
  const names = gameNames[category] || ['Oyun'];
  const name = names[Math.floor(Math.random() * names.length)];
  const suffix = Math.floor(Math.random() * 100);
  return `${name} ${suffix}`;
}

/**
 * Rastgele zorluk seviyesi üretir
 */
function generateDifficulty(): GameDifficulty {
  const difficulties: GameDifficulty[] = ['easy', 'medium', 'hard', 'expert'];
  return difficulties[Math.floor(Math.random() * difficulties.length)];
}

/**
 * Rastgele sınıf seviyesi üretir
 */
function generateGradeLevel(): GradeLevel {
  return (Math.floor(Math.random() * 8) + 1) as GradeLevel;
}

/**
 * Mock oyun üretir
 */
export function generateMockGame(
  category: GameCategoryType = 'math',
  options: {
    difficulty?: GameDifficulty;
    gradeLevel?: GradeLevel;
    hasLevels?: boolean;
    hasTimer?: boolean;
    hasLives?: boolean;
  } = {}
): Game {
  const id = `game-${category}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const name = generateGameName(category);
  const difficulty = options.difficulty || generateDifficulty();
  const gradeLevel = options.gradeLevel || generateGradeLevel();
  const hasLevels = options.hasLevels ?? Math.random() > 0.3;
  const hasTimer = options.hasTimer ?? Math.random() > 0.4;
  const hasLives = options.hasLives ?? Math.random() > 0.5;

  return {
    id,
    name,
    description: `${name} oyunu - ${category} kategorisi`,
    categoryId: `cat-${category}`,
    category,
    icon: icons[Math.floor(Math.random() * icons.length)],
    difficulty,
    gradeLevel,
    tags: [category, difficulty, `${gradeLevel}. sınıf`],
    hasLevels,
    hasTimer,
    hasLives,
    maxLevel: hasLevels ? Math.floor(Math.random() * 20) + 5 : undefined,
    estimatedDuration: Math.floor(Math.random() * 20) + 5,
    playCount: Math.floor(Math.random() * 20000),
    averageRating: 3.5 + Math.random() * 1.5,
    isPopular: Math.random() > 0.7,
    isFeatured: Math.random() > 0.8,
    isNew: Math.random() > 0.9,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Birden fazla mock oyun üretir
 */
export function generateMockGames(count: number, category?: GameCategoryType): Game[] {
  const games: Game[] = [];
  const categories: GameCategoryType[] = ['math', 'logic', 'language', 'memory', 'speed', 'puzzle'];

  for (let i = 0; i < count; i++) {
    const gameCategory = category || categories[Math.floor(Math.random() * categories.length)];
    games.push(generateMockGame(gameCategory));
  }

  return games;
}
