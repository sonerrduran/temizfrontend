/**
 * Mock Game Service
 * Oyun API'si için mock servis
 */

import type { Game, GameCategory, GameCategoryType } from '../contracts/game';
import { mockGames, mockGameCategories } from '../data/games';

/**
 * Simulated API delay
 */
function delay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Tüm oyun kategorilerini getirir
 */
export async function getGameCategories(): Promise<GameCategory[]> {
  await delay(300);
  return mockGameCategories;
}

/**
 * Tüm oyunları getirir
 */
export async function getGames(filters?: {
  category?: GameCategoryType;
  gradeLevel?: number;
  difficulty?: string;
  isPopular?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
}): Promise<Game[]> {
  await delay();

  let games = [...mockGames];

  if (filters) {
    if (filters.category) {
      games = games.filter((game) => game.category === filters.category);
    }
    if (filters.gradeLevel) {
      games = games.filter((game) => game.gradeLevel === filters.gradeLevel);
    }
    if (filters.difficulty) {
      games = games.filter((game) => game.difficulty === filters.difficulty);
    }
    if (filters.isPopular !== undefined) {
      games = games.filter((game) => game.isPopular === filters.isPopular);
    }
    if (filters.isFeatured !== undefined) {
      games = games.filter((game) => game.isFeatured === filters.isFeatured);
    }
    if (filters.isNew !== undefined) {
      games = games.filter((game) => game.isNew === filters.isNew);
    }
  }

  return games;
}

/**
 * ID'ye göre oyun getirir
 */
export async function getGameById(id: string): Promise<Game | null> {
  await delay(200);
  return mockGames.find((game) => game.id === id) || null;
}

/**
 * Kategoriye göre oyunları getirir
 */
export async function getGamesByCategory(categoryType: GameCategoryType): Promise<Game[]> {
  await delay();
  return mockGames.filter((game) => game.category === categoryType);
}

/**
 * Sınıf seviyesine göre oyunları getirir
 */
export async function getGamesByGrade(gradeLevel: number): Promise<Game[]> {
  await delay();
  return mockGames.filter((game) => game.gradeLevel === gradeLevel);
}

/**
 * Popüler oyunları getirir
 */
export async function getPopularGames(limit: number = 10): Promise<Game[]> {
  await delay(300);
  return mockGames
    .filter((game) => game.isPopular)
    .sort((a, b) => b.playCount - a.playCount)
    .slice(0, limit);
}

/**
 * Öne çıkan oyunları getirir
 */
export async function getFeaturedGames(limit: number = 5): Promise<Game[]> {
  await delay(300);
  return mockGames.filter((game) => game.isFeatured).slice(0, limit);
}

/**
 * Yeni oyunları getirir
 */
export async function getNewGames(limit: number = 5): Promise<Game[]> {
  await delay(300);
  return mockGames
    .filter((game) => game.isNew)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

/**
 * Oyun arama
 */
export async function searchGames(query: string): Promise<Game[]> {
  await delay(400);
  const lowerQuery = query.toLowerCase();
  return mockGames.filter(
    (game) =>
      game.name.toLowerCase().includes(lowerQuery) ||
      game.description.toLowerCase().includes(lowerQuery) ||
      game.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Oyun oynama sayısını artırır
 */
export async function incrementPlayCount(gameId: string): Promise<void> {
  await delay(100);
  const game = mockGames.find((g) => g.id === gameId);
  if (game) {
    game.playCount++;
  }
}
