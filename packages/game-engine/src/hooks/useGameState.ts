import { useState, useCallback } from 'react';

export interface GameState {
  level: number;
  score: number;
  lives: number;
  isPlaying: boolean;
  isPaused: boolean;
}

export interface UseGameStateReturn {
  state: GameState;
  incrementScore: (points: number) => void;
  nextLevel: () => void;
  loseLife: () => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useGameState = (initialState?: Partial<GameState>): UseGameStateReturn => {
  const [state, setState] = useState<GameState>({
    level: 1,
    score: 0,
    lives: 3,
    isPlaying: false,
    isPaused: false,
    ...initialState,
  });

  const incrementScore = useCallback((points: number) => {
    setState((prev) => ({ ...prev, score: prev.score + points }));
  }, []);

  const nextLevel = useCallback(() => {
    setState((prev) => ({ ...prev, level: prev.level + 1 }));
  }, []);

  const loseLife = useCallback(() => {
    setState((prev) => ({ ...prev, lives: Math.max(0, prev.lives - 1) }));
  }, []);

  const startGame = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: true, isPaused: false }));
  }, []);

  const pauseGame = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: true }));
  }, []);

  const resumeGame = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: false }));
  }, []);

  const resetGame = useCallback(() => {
    setState({
      level: 1,
      score: 0,
      lives: 3,
      isPlaying: false,
      isPaused: false,
    });
  }, []);

  return {
    state,
    incrementScore,
    nextLevel,
    loseLife,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    setState,
  };
};
