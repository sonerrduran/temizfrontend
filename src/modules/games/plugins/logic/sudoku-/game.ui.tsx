import React, { useState } from 'react';
import { GameUIProps } from '../../../engine/types/game.types';
import { SudokuLogic } from './game.logic';

export const SudokuGame: React.FC<GameUIProps> = ({ config, logic, onComplete, onExit }) => {
  const gameLogic = logic as SudokuLogic;
  const [, forceUpdate] = useState({});

  const handleAnswer = (answer: any) => {
    const result = gameLogic.handleAnswer(answer);
    const state = gameLogic.getState();

    if (state.isComplete) {
      onComplete(state.score);
    }

    forceUpdate({});
  };

  const state = gameLogic.getState();
  const currentQuestion = gameLogic.getCurrentQuestion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold transition-all backdrop-blur-sm"
          >
            ← Geri
          </button>
          <h1 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
            {config.name}
          </h1>
          <div className="px-6 py-3 bg-white/20 rounded-xl text-white font-bold backdrop-blur-sm">
            ⭐ {state.score}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Soru</div>
            <div className="text-2xl font-black text-white">
              {state.currentQuestion + 1}/{state.totalQuestions}
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Seviye</div>
            <div className="text-2xl font-black text-white">{state.level}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Doğru</div>
            <div className="text-2xl font-black text-white">{gameLogic.getCorrectAnswers()}</div>
          </div>
        </div>

        {/* Game Area */}
        {!state.isComplete ? (
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
            <div className="text-center text-white mb-8">
              <h3 className="text-2xl font-bold mb-4">Soru {state.currentQuestion + 1}</h3>
              <p className="text-lg">Oyun içeriği buraya gelecek</p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
              >
                Doğru
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="px-8 py-4 bg-red-500 hover:bg-red-600 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
              >
                Yanlış
              </button>
            </div>
          </div>
        ) : (
          /* Game Complete */
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl font-black text-white mb-4">Tebrikler!</h2>
            <p className="text-2xl text-white mb-2">Toplam Puan: {state.score}</p>
            <p className="text-xl text-white/80 mb-8">
              Doğru Cevap: {gameLogic.getCorrectAnswers()}/{state.totalQuestions}
            </p>
            <button
              onClick={() => onComplete(state.score)}
              className="px-8 py-4 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-xl transition-all"
            >
              Tamamla
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
