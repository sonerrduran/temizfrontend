/**
 * Custom hook for game state management
 * Handles game lifecycle, scoring, and progress
 */

import { useState, useEffect, useCallback } from 'react';
import { gameAPI } from '../services/api';
import { offlineStorage } from '../services/offlineStorage';
import { useAuthStore } from '../stores/authStore';

interface GameState {
  level: number;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  isPlaying: boolean;
  isPaused: boolean;
  isCompleted: boolean;
}

export const useGameState = (gameId: string) => {
  const { user } = useAuthStore();
  const [state, setState] = useState<GameState>({
    level: 1,
    score: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    timeSpent: 0,
    isPlaying: false,
    isPaused: false,
    isCompleted: false,
  });

  const [startTime, setStartTime] = useState<number | null>(null);

  // Start game
  const startGame = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: true, isPaused: false }));
    setStartTime(Date.now());
  }, []);

  // Pause game
  const pauseGame = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: true }));
    if (startTime) {
      setState((prev) => ({
        ...prev,
        timeSpent: prev.timeSpent + (Date.now() - startTime),
      }));
      setStartTime(null);
    }
  }, [startTime]);

  // Resume game
  const resumeGame = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: false }));
    setStartTime(Date.now());
  }, []);

  // Answer question
  const answerQuestion = useCallback((isCorrect: boolean, points: number = 10) => {
    setState((prev) => ({
      ...prev,
      totalQuestions: prev.totalQuestions + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      score: prev.score + (isCorrect ? points : 0),
    }));
  }, []);

  // Complete level
  const completeLevel = useCallback(() => {
    setState((prev) => ({
      ...prev,
      level: prev.level + 1,
    }));
  }, []);

  // Complete game
  const completeGame = useCallback(async () => {
    // Calculate final time
    const finalTime = startTime ? state.timeSpent + (Date.now() - startTime) : state.timeSpent;

    setState((prev) => ({
      ...prev,
      isPlaying: false,
      isCompleted: true,
      timeSpent: finalTime,
    }));

    // Save score
    try {
      const scoreData = {
        gameId,
        userId: user?.id || 'guest',
        score: state.score,
        correctAnswers: state.correctAnswers,
        totalQuestions: state.totalQuestions,
        timeSpent: Math.floor(finalTime / 1000), // Convert to seconds
      };

      if (navigator.onLine) {
        await gameAPI.saveScore(gameId, scoreData);
      } else {
        // Save offline
        await offlineStorage.saveScore(scoreData);
      }
    } catch (error) {
      console.error('Failed to save score:', error);
      // Save offline as fallback
      await offlineStorage.saveScore({
        gameId,
        userId: user?.id || 'guest',
        score: state.score,
        correctAnswers: state.correctAnswers,
        totalQuestions: state.totalQuestions,
        timeSpent: Math.floor(finalTime / 1000),
      });
    }
  }, [gameId, user, state, startTime]);

  // Reset game
  const resetGame = useCallback(() => {
    setState({
      level: 1,
      score: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      timeSpent: 0,
      isPlaying: false,
      isPaused: false,
      isCompleted: false,
    });
    setStartTime(null);
  }, []);

  // Update time spent (every second)
  useEffect(() => {
    if (!state.isPlaying || state.isPaused || !startTime) return;

    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        timeSpent: prev.timeSpent + 1000,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isPlaying, state.isPaused, startTime]);

  return {
    ...state,
    startGame,
    pauseGame,
    resumeGame,
    answerQuestion,
    completeLevel,
    completeGame,
    resetGame,
  };
};
