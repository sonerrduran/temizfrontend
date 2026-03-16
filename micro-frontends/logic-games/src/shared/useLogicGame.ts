import { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface UseLogicGameProps {
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  maxMistakes?: number;
  timeMultiplier?: number;
}

interface UseLogicGameReturn {
  timeLeft: number;
  mistakes: number;
  isGameOver: boolean;
  gameWon: boolean;
  score: number;
  showRules: boolean;
  setShowRules: (show: boolean) => void;
  addMistake: () => void;
  endGame: (won: boolean) => void;
  resetGame: (callback: () => void) => void;
  formatTime: (seconds: number) => string;
}

/**
 * Merkezi Zeka Oyunu Hook
 * Tüm zeka oyunları için ortak state ve logic yönetimi
 */
export const useLogicGame = ({
  difficulty,
  onComplete,
  maxMistakes = 5,
  timeMultiplier = 1,
}: UseLogicGameProps): UseLogicGameReturn => {
  const getTimeForDifficulty = useCallback(() => {
    let baseTime: number;
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        baseTime = 600; // 10 minutes
        break;
      case Difficulty.MEDIUM:
        baseTime = 900; // 15 minutes
        break;
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        baseTime = 1200; // 20 minutes
        break;
      default:
        baseTime = 900;
    }
    return Math.floor(baseTime * timeMultiplier);
  }, [difficulty, timeMultiplier]);

  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [mistakes, setMistakes] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);
  const [showRules, setShowRules] = useState(true);

  // Timer effect
  useEffect(() => {
    if (isGameOver || showRules) return;

    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      endGame(false);
    }
  }, [timeLeft, isGameOver, showRules]);

  const addMistake = useCallback(() => {
    setMistakes((prev) => {
      const newMistakes = prev + 1;
      if (newMistakes >= maxMistakes) {
        endGame(false);
      }
      return newMistakes;
    });
    // Penalty: reduce time by 10 seconds
    setTimeLeft((prev) => Math.max(0, prev - 10));
  }, [maxMistakes]);

  const endGame = useCallback(
    (won: boolean) => {
      setIsGameOver(true);
      setGameWon(won);

      let finalStars = 0;
      if (won) {
        // Calculate stars based on performance
        finalStars = 5 - Math.floor(mistakes / 2);
        if (timeLeft > getTimeForDifficulty() * 0.5) {
          finalStars = 5; // Bonus for finishing with time
        }
        finalStars = Math.min(5, Math.max(1, finalStars));
      } else {
        finalStars = 1; // Minimum star for trying
      }

      setScore(finalStars);
      onComplete(finalStars);
    },
    [mistakes, timeLeft, getTimeForDifficulty, onComplete]
  );

  const resetGame = useCallback(
    (callback: () => void) => {
      setTimeLeft(getTimeForDifficulty());
      setMistakes(0);
      setIsGameOver(false);
      setGameWon(false);
      setScore(0);
      callback();
    },
    [getTimeForDifficulty]
  );

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    timeLeft,
    mistakes,
    isGameOver,
    gameWon,
    score,
    showRules,
    setShowRules,
    addMistake,
    endGame,
    resetGame,
    formatTime,
  };
};
