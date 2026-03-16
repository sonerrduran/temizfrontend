import { create } from 'zustand';
import { gameService, GameSession } from '@/shared/services/api/gameService';
import { analytics } from '@/shared/services/analytics/analyticsService';

interface SessionStore {
  // State
  currentSession: GameSession | null;
  isPlaying: boolean;
  startTime: number | null;

  // Actions
  startSession: (gameId: string) => Promise<void>;
  endSession: (score: number, correctAnswers: number, totalQuestions: number) => Promise<void>;
  pauseSession: () => void;
  resumeSession: () => void;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  // Initial state
  currentSession: null,
  isPlaying: false,
  startTime: null,

  // Start a new game session
  startSession: async (gameId: string) => {
    try {
      const session = await gameService.createSession({ gameId });

      set({
        currentSession: session,
        isPlaying: true,
        startTime: Date.now(),
      });

      // Track analytics
      analytics.gameStart(gameId);
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  },

  // End the current session
  endSession: async (score: number, correctAnswers: number, totalQuestions: number) => {
    const { currentSession, startTime } = get();

    if (!currentSession || !startTime) return;

    const duration = Math.floor((Date.now() - startTime) / 1000); // seconds

    try {
      await gameService.completeSession({
        sessionId: currentSession.id,
        score,
        correctAnswers,
        totalQuestions,
        duration,
      });

      // Track analytics
      analytics.gameEnd(currentSession.gameId, score, {
        correctAnswers,
        totalQuestions,
        duration,
      });

      set({
        currentSession: null,
        isPlaying: false,
        startTime: null,
      });
    } catch (error) {
      console.error('Failed to end session:', error);
    }
  },

  // Pause the session
  pauseSession: () => {
    set({ isPlaying: false });

    const { currentSession } = get();
    if (currentSession) {
      analytics.track('GAME_PAUSE', { gameId: currentSession.gameId });
    }
  },

  // Resume the session
  resumeSession: () => {
    set({ isPlaying: true });

    const { currentSession } = get();
    if (currentSession) {
      analytics.track('GAME_RESUME', { gameId: currentSession.gameId });
    }
  },
}));
