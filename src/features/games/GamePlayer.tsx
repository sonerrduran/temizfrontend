import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameRenderer } from '@/modules/games/engine/GameRenderer';
import { useSessionStore } from '@/stores/sessionStore';
import { useGameStore } from '@/stores/gameStore';

export default function GamePlayer() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const { startSession, endSession, currentSession } = useSessionStore();
  const { selectGame, currentGame } = useGameStore();

  useEffect(() => {
    if (gameId) {
      selectGame(gameId);
      startSession(gameId);
    }
  }, [gameId]);

  if (!gameId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-2xl">Oyun bulunamadı</div>
      </div>
    );
  }

  const handleComplete = async (score: number) => {
    setFinalScore(score);
    setShowResults(true);

    // Save score to backend via session store
    await endSession(score, score, 100); // TODO: Get actual correctAnswers and totalQuestions from game
  };

  const handleExit = () => {
    navigate('/games');
  };

  const handlePlayAgain = () => {
    setShowResults(false);
    window.location.reload(); // Simple reload for now
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 max-w-2xl w-full text-center border border-white/20">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-5xl font-black text-white mb-4">Tebrikler!</h1>
          <p className="text-3xl text-white/80 mb-2">Oyunu Tamamladın</p>
          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8">
            {finalScore} Puan
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handlePlayAgain}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
            >
              🔄 Tekrar Oyna
            </button>
            <button
              onClick={handleExit}
              className="px-8 py-4 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-xl transition-all"
            >
              🏠 Ana Menü
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <GameRenderer gameId={gameId} onComplete={handleComplete} onExit={handleExit} />;
}
