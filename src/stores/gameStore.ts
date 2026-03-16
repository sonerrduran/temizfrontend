import { create } from 'zustand';
import { GAMES_LIST, GameInfo } from '../game-engine/config/gamesList';

interface GameStore {
  // State
  games: GameInfo[];
  currentGame: GameInfo | null;
  isLoading: boolean;
  error: string | null;

  // Filters
  selectedCategory: string;
  searchQuery: string;
  selectedGrade: number | null;

  // Actions
  loadGames: () => void;
  selectGame: (gameId: string) => void;
  setCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setGrade: (grade: number | null) => void;
  clearFilters: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  games: [],
  currentGame: null,
  isLoading: false,
  error: null,
  selectedCategory: 'all',
  searchQuery: '',
  selectedGrade: null,

  // Load all games from generated list
  loadGames: () => {
    set({ isLoading: true, error: null });
    try {
      // Load from pre-generated games list (from datasets)
      set({ games: GAMES_LIST, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load games', isLoading: false });
    }
  },

  // Select a game
  selectGame: (gameId: string) => {
    const game = get().games.find((g) => g.id === gameId);
    set({ currentGame: game || null });
  },

  // Set category filter
  setCategory: (category: string) => {
    set({ selectedCategory: category });
  },

  // Set search query
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  // Set grade filter
  setGrade: (grade: number | null) => {
    set({ selectedGrade: grade });
  },

  // Clear all filters
  clearFilters: () => {
    set({
      selectedCategory: 'all',
      searchQuery: '',
      selectedGrade: null,
    });
  },
}));
