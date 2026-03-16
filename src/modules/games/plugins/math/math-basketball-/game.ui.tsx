import React, { useState, useEffect } from 'react';
import { GameUIProps } from '../../../engine/types/game.types';
import { MathBasketballLogic } from './game.logic';

export const MathBasketballGame: React.FC<GameUIProps> = ({
  config,
  logic,
  onComplete,
  onExit,
}) => {
  const gameLogic = logic as MathBasketballLogic;
  const [, forceUpdate] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      const state = gameLogic.getState();
      if (!state.isComplete && timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
        gameLogic.decrementTime();
      } else if (timeLeft === 0) {
        handleTimeout();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleTimeout = () => {
    const state = gameLogic.getState();
    if (state.isComplete) {
      onComplete(state.score);
    } else {
      setTimeLeft(30);
      forceUpdate({});
    }
  };

  const handleAnswer = (answer: any) => {
    const result = gameLogic.handleAnswer(answer);
    const state = gameLogic.getState();

    if (state.isComplete) {
      onComplete(state.score);
    }

    forceUpdate({});
  };

  const state = gameLogic.getState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/20 rounded-xl text-white font-bold hover:bg-white/30"
          >
            ← Geri
          </button>
          <h1 className="text-4xl font-bold text-white">{config.name}</h1>
          <div className="px-6 py-3 bg-white/20 rounded-xl text-white font-bold">
            Puan: {state.score}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8">
          <div className="text-center text-white">
            <p className="text-2xl mb-4">
              Soru {state.currentQuestion + 1} / {state.totalQuestions}
            </p>
            <p className="text-xl mb-4">⏱️ {timeLeft}s</p>

            <div className="mt-8">
              <button
                onClick={() => handleAnswer(true)}
                className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl text-white font-bold text-xl"
              >
                Cevap Ver
              </button>
            </div>
          </div>
        </div>

        {state.isComplete && (
          <div className="mt-8 bg-green-500/20 backdrop-blur-md rounded-3xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">🎉 Tebrikler!</h2>
            <p className="text-xl text-white mb-4">Toplam Puan: {state.score}</p>
            <button
              onClick={() => onComplete(state.score)}
              className="px-8 py-4 bg-white/20 rounded-xl text-white font-bold hover:bg-white/30"
            >
              Tamamla
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
