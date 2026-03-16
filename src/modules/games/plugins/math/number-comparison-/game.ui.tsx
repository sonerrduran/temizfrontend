import React, { useState, useEffect } from 'react';
import { GameUIProps } from '../../../engine/types/game.types';
import { NumberComparisonLogic } from './game.logic';

export const NumberComparisonGame: React.FC<GameUIProps> = ({
  config,
  logic,
  onComplete,
  onExit,
}) => {
  const gameLogic = logic as NumberComparisonLogic;
  const [, forceUpdate] = useState({});
  const [timeLeft, setTimeLeft] = useState(8);
  const [showWin, setShowWin] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const state = gameLogic.getState();
      if (!state.isComplete && timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else if (timeLeft === 0) {
        handleAnswer('');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (answer: string) => {
    const result = gameLogic.handleAnswer(answer);
    const state = gameLogic.getState();

    if (state.isComplete) {
      setShowWin(true);
    } else {
      setTimeLeft(8);
    }

    forceUpdate({});
  };

  const handleNextLevel = () => {
    gameLogic.nextLevel();
    setShowWin(false);
    setTimeLeft(8);
    forceUpdate({});
  };

  const handleRestart = () => {
    gameLogic.reset();
    setShowWin(false);
    setTimeLeft(8);
    forceUpdate({});
  };

  const state = gameLogic.getState();
  const currentQ = gameLogic.getCurrentQuestion();

  if (!currentQ) return null;

  return (
    <div className="min-h-screen text-white p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-green-500/30 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={onExit}
              className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-bold"
            >
              ⬅ GERİ
            </button>
            <h2 className="text-2xl md:text-3xl font-black text-white">⚖️ SAYI KARŞILAŞTIRMA</h2>
            <div className="text-sm font-bold bg-green-500/20 px-4 py-2 rounded-xl">
              Seviye {state.level}
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-blue-500/20 px-6 py-3 rounded-xl">
              <span className="text-blue-300 font-bold">
                Soru: {state.currentQuestion + 1}/{state.totalQuestions}
              </span>
            </div>
            <div className="bg-red-500/20 px-6 py-3 rounded-xl">
              <span className="text-red-300 font-bold">⏱️ {timeLeft}s</span>
            </div>
            <div className="bg-green-500/20 px-6 py-3 rounded-xl">
              <span className="text-green-300 font-bold">Puan: {state.score}</span>
            </div>
          </div>

          {!showWin && (
            <>
              <div className="text-center mb-8">
                <h3 className="text-white/80 font-bold mb-6 text-xl">🎯 Hangi işaret doğru?</h3>
                <div className="bg-slate-800/50 p-12 rounded-3xl border-2 border-green-500/30 mb-6">
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-7xl font-black text-cyan-400">{currentQ.num1}</div>
                    <div className="text-6xl text-white/30">?</div>
                    <div className="text-7xl font-black text-pink-400">{currentQ.num2}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-6">
                <button
                  onClick={() => handleAnswer('>')}
                  className="p-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl text-7xl font-black hover:scale-105 transition-all shadow-lg hover:shadow-green-500/50"
                >
                  &gt;
                </button>
                <button
                  onClick={() => handleAnswer('<')}
                  className="p-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-7xl font-black hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/50"
                >
                  &lt;
                </button>
              </div>

              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-1000"
                  style={{ width: `${(timeLeft / 8) * 100}%` }}
                />
              </div>
            </>
          )}

          {showWin && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="bg-slate-900 p-8 rounded-3xl border-4 border-green-500 text-center animate-in zoom-in">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-black mb-4 text-green-400">MÜKEMMEL!</h3>
                <p className="text-xl mb-2">
                  Doğru Cevap: {gameLogic.getCorrectAnswers()}/{state.totalQuestions}
                </p>
                <p className="text-lg mb-6">Toplam Puan: {state.score}</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleRestart}
                    className="px-6 py-3 bg-blue-500 rounded-xl font-bold hover:bg-blue-400"
                  >
                    🔄 Tekrar Oyna
                  </button>
                  {state.level < 3 ? (
                    <button
                      onClick={handleNextLevel}
                      className="px-6 py-3 bg-green-500 rounded-xl font-bold hover:bg-green-400"
                    >
                      Sonraki Seviye →
                    </button>
                  ) : (
                    <button
                      onClick={() => onComplete(state.score)}
                      className="px-6 py-3 bg-purple-500 rounded-xl font-bold hover:bg-purple-400"
                    >
                      Tamamla ✓
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-center text-white/60 text-sm">
            <p>💡 Sayıları karşılaştır ve doğru işareti seç!</p>
            <p>&gt; (büyüktür) veya &lt; (küçüktür)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
