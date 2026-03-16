import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameContainer from '../../game-engine/components/GameContainer';
import { GameResults } from '../../game-engine/types/engine.types';
import { useSessionStore } from '../../stores/sessionStore';
import { GAME_DATASET_MAP } from '../../game-engine/config/gameDatasetMap';

export default function GamePlayerNew() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [finalResults, setFinalResults] = useState<GameResults | null>(null);

  const { startSession, endSession } = useSessionStore();

  React.useEffect(() => {
    if (gameId) {
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

  const datasetPath = GAME_DATASET_MAP[gameId];
  if (!datasetPath) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <div className="text-white text-2xl mb-4">Oyun bulunamadı</div>
          <button
            onClick={() => navigate('/games')}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-bold"
          >
            Oyunlara Dön
          </button>
        </div>
      </div>
    );
  }

  const handleComplete = async (results: GameResults) => {
    setFinalResults(results);
    setShowResults(true);

    // Save to backend
    await endSession(results.score, results.correctAnswers, results.totalQuestions);
  };

  const handleExit = () => {
    navigate('/games');
  };

  const handlePlayAgain = () => {
    setShowResults(false);
    setFinalResults(null);
    window.location.reload();
  };

  if (showResults && finalResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 max-w-2xl w-full text-center border border-white/20">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-5xl font-black text-white mb-4">Tebrikler!</h1>
          <p className="text-3xl text-white/80 mb-2">Oyunu Tamamladın</p>

          {/* Score */}
          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8">
            {finalResults.score} Puan
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-1">Doğru</div>
              <div className="text-2xl font-bold text-green-400">{finalResults.correctAnswers}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-1">Toplam</div>
              <div className="text-2xl font-bold text-white">{finalResults.totalQuestions}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-1">Süre</div>
              <div className="text-2xl font-bold text-blue-400">{finalResults.duration}s</div>
            </div>
          </div>

          {/* Actions */}
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

  return (
    <GameContainer
      gameId={gameId}
      datasetPath={datasetPath}
      onComplete={handleComplete}
      onExit={handleExit}
    />
  );
}
