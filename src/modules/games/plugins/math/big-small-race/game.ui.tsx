import React, { useState, useEffect } from 'react';
import { GameUIProps } from '@/modules/games/engine/types/game.types';

export const BigSmallRaceGame: React.FC<GameUIProps> = ({ config, logic, onComplete, onExit }) => {
  const [state, setState] = useState(logic.getState());
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    // Initialize game
    logic.initialize(config);
    setState(logic.getState());

    // Update state every second for timer
    const interval = setInterval(() => {
      setState(logic.getState());
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (answer: 'bigger' | 'smaller' | 'equal') => {
    if (feedback) return; // Prevent multiple clicks

    const result = logic.handleAnswer(answer);

    // Show feedback
    setFeedback(result.feedback);

    const delay = result.correct ? 500 : 1500;

    setTimeout(() => {
      setFeedback(null);

      // Update state
      const newState = logic.getState();
      setState(newState);

      // Check if game is over
      if (newState.gameOver) {
        onComplete(newState.score);
      }
    }, delay);
  };

  const resetGame = () => {
    logic.reset();
    setState(logic.getState());
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold transition-all backdrop-blur-sm"
          >
            ← Geri
          </button>
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
            🏁 {config.name}
          </h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Puan</div>
            <div className="text-3xl font-black text-white">{state.score}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Süre</div>
            <div className="text-3xl font-black text-white">{state.timeLeft}s</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Seri</div>
            <div className="text-3xl font-black text-white">{state.streak}🔥</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Seviye</div>
            <div className="text-3xl font-black text-white">{state.level}</div>
          </div>
        </div>

        {!state.gameOver ? (
          <>
            {/* Question */}
            <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 mb-8 text-center shadow-2xl">
              <h3 className="text-3xl font-black text-white mb-6">İlk sayı ikinci sayıdan...</h3>

              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition">
                  <div className="text-7xl font-black text-white">{state.num1}</div>
                </div>

                <div className="text-6xl text-white animate-pulse">?</div>

                <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition">
                  <div className="text-7xl font-black text-white">{state.num2}</div>
                </div>
              </div>
            </div>

            {/* Answer Buttons */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <button
                onClick={() => handleAnswer('bigger')}
                disabled={!!feedback}
                className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-3xl p-8 text-white transition-all hover:scale-105 active:scale-95 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-5xl mb-2">▲</div>
                <div className="text-3xl font-black">BÜYÜK</div>
              </button>

              <button
                onClick={() => handleAnswer('equal')}
                disabled={!!feedback}
                className="bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 rounded-3xl p-8 text-white transition-all hover:scale-105 active:scale-95 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-5xl mb-2">=</div>
                <div className="text-3xl font-black">EŞİT</div>
              </button>

              <button
                onClick={() => handleAnswer('smaller')}
                disabled={!!feedback}
                className="bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-3xl p-8 text-white transition-all hover:scale-105 active:scale-95 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-5xl mb-2">▼</div>
                <div className="text-3xl font-black">KÜÇÜK</div>
              </button>
            </div>

            {/* Feedback */}
            {feedback && (
              <div
                className={`text-center text-3xl font-black p-6 rounded-xl animate-bounce ${
                  feedback.includes('✅')
                    ? 'bg-green-500/30 text-green-100'
                    : 'bg-red-500/30 text-red-100'
                }`}
              >
                {feedback}
              </div>
            )}
          </>
        ) : (
          /* Game Over */
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl animate-in zoom-in duration-500">
            <div className="text-6xl mb-4">🏁</div>
            <h2 className="text-4xl font-black text-white mb-4">Oyun Bitti!</h2>
            <p className="text-2xl text-white mb-2">Toplam Puan: {state.score}</p>
            <p className="text-xl text-white/80 mb-2">En Yüksek Seri: {state.maxStreak}</p>
            <p className="text-xl text-white/80 mb-8">Ulaşılan Seviye: {state.level}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
              >
                Tekrar Oyna
              </button>
              <button
                onClick={onExit}
                className="px-8 py-4 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
              >
                Menüye Dön
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
