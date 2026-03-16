// Game Engine - Core game execution engine

import { EventEmitter } from 'events';
import { GameConfig, GameLogic, GameState, GameAction, GameResult } from './types/game.types';
import { GameRegistry } from './GameRegistry';

export class GameEngine extends EventEmitter {
  private currentGame: GameLogic | null = null;
  private currentConfig: GameConfig | null = null;
  private state: GameState = {};
  private startTime: number = 0;

  constructor() {
    super();
  }

  /**
   * Load a game
   */
  async loadGame(gameId: string): Promise<void> {
    console.log(`🎮 Loading game: ${gameId}`);

    const plugin = GameRegistry.get(gameId);

    if (!plugin) {
      throw new Error(`Game not found: ${gameId}`);
    }

    this.emit('game:loading', { gameId });

    const startTime = Date.now();

    try {
      // Initialize game logic
      this.currentGame = new plugin.logic();
      this.currentConfig = plugin.config;

      await this.currentGame.initialize(plugin.config);

      const loadTime = Date.now() - startTime;

      console.log(`✅ Game loaded in ${loadTime}ms`);

      this.emit('game:loaded', {
        gameId,
        config: plugin.config,
        loadTime,
      });
    } catch (error) {
      console.error(`❌ Failed to load game: ${gameId}`, error);
      this.emit('game:error', { gameId, error });
      throw error;
    }
  }

  /**
   * Start the game
   */
  async startGame(): Promise<void> {
    if (!this.currentGame || !this.currentConfig) {
      throw new Error('No game loaded');
    }

    console.log(`▶️ Starting game: ${this.currentConfig.id}`);

    this.startTime = Date.now();

    this.emit('game:started', {
      gameId: this.currentConfig.id,
      timestamp: this.startTime,
    });
  }

  /**
   * Handle game action
   */
  handleAction(action: GameAction): GameResult {
    if (!this.currentGame) {
      throw new Error('No game active');
    }

    const result = this.currentGame.handleAnswer(action.payload);

    this.emit('game:action', {
      action,
      result,
      timestamp: Date.now(),
    });

    return result;
  }

  /**
   * Complete the game
   */
  async completeGame(finalScore: number): Promise<void> {
    if (!this.currentGame || !this.currentConfig) {
      return;
    }

    const duration = Date.now() - this.startTime;

    const gameData = {
      gameId: this.currentConfig.id,
      score: finalScore,
      duration,
      completedAt: new Date(),
    };

    console.log(`🏁 Game completed:`, gameData);

    this.emit('game:completed', gameData);

    this.cleanup();
  }

  /**
   * Pause the game
   */
  pauseGame(): void {
    if (!this.currentConfig) return;

    this.emit('game:paused', {
      gameId: this.currentConfig.id,
      timestamp: Date.now(),
    });
  }

  /**
   * Resume the game
   */
  resumeGame(): void {
    if (!this.currentConfig) return;

    this.emit('game:resumed', {
      gameId: this.currentConfig.id,
      timestamp: Date.now(),
    });
  }

  /**
   * Get current game state
   */
  getState(): GameState {
    return this.currentGame?.getState() || {};
  }

  /**
   * Get current game config
   */
  getConfig(): GameConfig | null {
    return this.currentConfig;
  }

  /**
   * Get game duration
   */
  getDuration(): number {
    return Date.now() - this.startTime;
  }

  /**
   * Cleanup game resources
   */
  cleanup(): void {
    if (this.currentGame) {
      this.currentGame.reset();
      this.currentGame = null;
    }

    this.currentConfig = null;
    this.state = {};
    this.startTime = 0;

    console.log('🧹 Game cleaned up');
  }

  /**
   * Check if game is active
   */
  isActive(): boolean {
    return this.currentGame !== null;
  }
}
