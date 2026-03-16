// Game Loader - Dynamic game loading with caching

import { GamePlugin } from './types/game.types';

export class GameLoader {
  private cache: Map<string, GamePlugin> = new Map();
  private loading: Map<string, Promise<GamePlugin>> = new Map();

  /**
   * Load a game plugin dynamically
   */
  async loadPlugin(gameId: string): Promise<GamePlugin> {
    // Check cache first
    if (this.cache.has(gameId)) {
      console.log(`📦 Loading from cache: ${gameId}`);
      return this.cache.get(gameId)!;
    }

    // Check if already loading
    if (this.loading.has(gameId)) {
      console.log(`⏳ Already loading: ${gameId}`);
      return this.loading.get(gameId)!;
    }

    // Start loading
    console.log(`🔄 Loading plugin: ${gameId}`);
    const loadPromise = this.loadPluginInternal(gameId);
    this.loading.set(gameId, loadPromise);

    try {
      const plugin = await loadPromise;

      // Cache the plugin
      this.cache.set(gameId, plugin);

      return plugin;
    } finally {
      // Remove from loading map
      this.loading.delete(gameId);
    }
  }

  /**
   * Internal plugin loading logic
   */
  private async loadPluginInternal(gameId: string): Promise<GamePlugin> {
    try {
      // Dynamic import based on game ID
      // This will be replaced with actual path resolution
      const gamePath = this.resolveGamePath(gameId);

      const module = await import(
        /* @vite-ignore */
        `../plugins/${gamePath}/index.ts`
      );

      const plugin = module.default || module[`${this.toPascalCase(gameId)}Plugin`];

      if (!plugin) {
        throw new Error(`Plugin not found: ${gameId}`);
      }

      return plugin;
    } catch (error) {
      console.error(`Failed to load plugin: ${gameId}`, error);
      throw new Error(`Failed to load game: ${gameId}`);
    }
  }

  /**
   * Resolve game path from ID
   */
  private resolveGamePath(gameId: string): string {
    // Example: "big-small-race" -> "math/big-small-race"
    // This should be enhanced with category mapping
    return `math/${gameId}`;
  }

  /**
   * Convert kebab-case to PascalCase
   */
  private toPascalCase(str: string): string {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  /**
   * Preload games in background
   */
  preload(gameIds: string[]): void {
    console.log(`🚀 Preloading ${gameIds.length} games...`);

    gameIds.forEach((id) => {
      this.loadPlugin(id).catch((err) => {
        console.error(`Failed to preload: ${id}`, err);
      });
    });
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
    console.log('🗑️ Cache cleared');
  }

  /**
   * Get cache size
   */
  getCacheSize(): number {
    return this.cache.size;
  }

  /**
   * Check if game is cached
   */
  isCached(gameId: string): boolean {
    return this.cache.has(gameId);
  }
}

// Export singleton instance
export const gameLoader = new GameLoader();
