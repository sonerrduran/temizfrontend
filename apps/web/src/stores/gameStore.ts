import { create } from 'zustand';
import { gameAPI } from '../services/api';

interface GameCategory {
  id: string;
  name: string;
  code: string;
  icon: string;
  color: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  games?: Game[];
}

interface Game {
  id: string;
  name: string;
  code: string;
  categoryId: string;
  description?: string;
  icon: string;
  gradeMin: number;
  gradeMax: number;
  difficulty: string;
  component: string;
  path?: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  playCount: number;
  avgRating: number;
  category?: GameCategory;
}

interface GameStore {
  // State
  categories: GameCategory[];
  games: Game[];
  currentGame: Game | null;
  loading: boolean;
  error: string | null;

  // Actions
  loadCategories: () => Promise<void>;
  loadGames: (categoryId?: string, gradeLevel?: number) => Promise<void>;
  setCurrentGame: (game: Game | null) => void;
  playGame: (gameId: string) => Promise<void>;
  clearError: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  categories: [],
  games: [],
  currentGame: null,
  loading: false,
  error: null,

  // Load categories with games
  loadCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await gameAPI.categories();
      set({
        categories: response.data || [],
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Kategoriler yüklenirken hata oluştu',
        loading: false,
      });
    }
  },

  // Load games with filters
  loadGames: async (categoryId?: string, gradeLevel?: number) => {
    set({ loading: true, error: null });
    try {
      const response = await gameAPI.games({ categoryId, gradeLevel });
      set({
        games: response.data || [],
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Oyunlar yüklenirken hata oluştu',
        loading: false,
      });
    }
  },

  // Set current game
  setCurrentGame: (game: Game | null) => {
    set({ currentGame: game });
  },

  // Increment play count
  playGame: async (gameId: string) => {
    try {
      await gameAPI.play(gameId);
      // Update local state
      const games = get().games.map((g) =>
        g.id === gameId ? { ...g, playCount: g.playCount + 1 } : g
      );
      set({ games });
    } catch (error) {
      console.error('Play count güncellenemedi:', error);
    }
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));
