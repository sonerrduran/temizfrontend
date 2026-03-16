// Game Registry - Central registry for all game plugins

import { GamePlugin, GameFilters } from './types/game.types';

class GameRegistryClass {
  private games: Map<string, GamePlugin> = new Map();
  private categories: Map<string, string[]> = new Map();

  /**
   * Register a game plugin
   */
  register(plugin: GamePlugin): void {
    const { id, category } = plugin.config;

    // Register game
    this.games.set(id, plugin);

    // Register in category
    if (!this.categories.has(category)) {
      this.categories.set(category, []);
    }
    this.categories.get(category)!.push(id);

    console.log(`✅ Game registered: ${id}`);
  }

  /**
   * Get a game by ID
   */
  get(gameId: string): GamePlugin | undefined {
    return this.games.get(gameId);
  }

  /**
   * Get all games in a category
   */
  getByCategory(category: string): GamePlugin[] {
    const gameIds = this.categories.get(category) || [];
    return gameIds.map((id) => this.games.get(id)!).filter(Boolean);
  }

  /**
   * Get all registered games
   */
  getAll(): GamePlugin[] {
    return Array.from(this.games.values());
  }

  /**
   * Search games by query
   */
  search(query: string): GamePlugin[] {
    const lowerQuery = query.toLowerCase();
    return this.getAll().filter(
      (plugin) =>
        plugin.config.name.toLowerCase().includes(lowerQuery) ||
        plugin.config.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
        plugin.config.keywords?.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * Filter games
   */
  filter(filters: GameFilters): GamePlugin[] {
    return this.getAll().filter((plugin) => {
      // Category filter
      if (filters.category && plugin.config.category !== filters.category) {
        return false;
      }

      // Grade level filter
      if (filters.gradeLevel) {
        if (
          plugin.config.gradeMin > filters.gradeLevel ||
          plugin.config.gradeMax < filters.gradeLevel
        ) {
          return false;
        }
      }

      // Difficulty filter
      if (filters.difficulty && plugin.config.difficulty !== filters.difficulty) {
        return false;
      }

      // Tags filter
      if (filters.tags && filters.tags.length > 0) {
        const hasTag = filters.tags.some((tag) => plugin.config.tags.includes(tag));
        if (!hasTag) return false;
      }

      return true;
    });
  }

  /**
   * Get all categories
   */
  getCategories(): string[] {
    return Array.from(this.categories.keys());
  }

  /**
   * Get game count
   */
  getCount(): number {
    return this.games.size;
  }

  /**
   * Clear all games (for testing)
   */
  clear(): void {
    this.games.clear();
    this.categories.clear();
  }
}

// Export singleton instance
export const GameRegistry = new GameRegistryClass();
