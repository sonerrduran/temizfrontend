import React, { useState, useEffect } from 'react';
import { GameUIProps } from '../../../engine/types/game.types';
import { AdditionRaceLogic } from './game.logic';

export const AdditionRaceGame: React.FC<GameUIProps> = ({ config, logic, onComplete, onExit }) => {
  const gameLogic = logic as AdditionRaceLogic;
  const [, forceUpdate] = useState({});
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (selectedAnswer === null && timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
        gameLogic.decrementTime();
      } else if (timeLeft === 0 && selectedAnswer === null) {
        handleTimeout();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, selectedAnswer]);

  const handleTimeout = () => {
    const currentQ = gameLogic.getCurrentQuestion();
    if (currentQ) {
      setFeedback(`⏰ Süre doldu! Doğru cevap: ${currentQ.correctAnswer}`);
      setShowFeedback(true);

      setTimeout(() => {
        const state = gameLogic.getState();
        if (state.isComplete) {
          onComplete(state.score);
        } else {
          setShowFeedback(false);
          setSelectedAnswer(null);
          setTimeLeft(10);
          forceUpdate({});
        }
      }, 2000);
    }
  };

  const checkAnswer = (selected: number) => {
    setSelectedAnswer(selected);
    const result = gameLogic.handleAnswer(selected);
    setFeedback(result.feedback);
    setShowFeedback(true);

    setTimeout(() => {
      const state = gameLogic.getState();
      if (state.isComplete) {
        onComplete(state.score);
      } else {
        setShowFeedback(false);
        setSelectedAnswer(null);
        setTimeLeft(10);
        forceUpdate({});
      }
    }, 1500);
  };

  const state = gameLogic.getState();
  const currentQ = gameLogic.getCurrentQuestion();

  if (!currentQ) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all transform hover:scale-105 border border-red-500"
          >
            ← Çıkış
          </button>

          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700">
              <span className="text-white font-black">Seviye: {state.level}/5</span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700">
              <span className="text-white font-black">⭐ {state.score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black flex items-center justify-center gap-3">
            🏁 Toplama Yarışı
          </h1>
          <p className="text-slate-400 text-lg mt-2">Puan: {state.score}</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          <div className="bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="text-center mb-6">
              <div
                className={`inline-block px-8 py-4 rounded-2xl font-black text-4xl ${
                  timeLeft <= 3
                    ? 'bg-red-500/40 text-white animate-pulse border-2 border-red-300'
                    : 'bg-yellow-700/40 text-white border-2 border-yellow-400'
                }`}
              >
                ⏱️ {timeLeft}s
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 text-5xl md:text-6xl font-black text-white mb-6">
                <span>{currentQ.num1}</span>
                <span>+</span>
                <span>{currentQ.num2}</span>
                <span>=</span>
                <span>?</span>
              </div>
              <p className="text-white text-lg">Hızlıca doğru cevabı seç!</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`relative p-8 rounded-2xl text-5xl font-black transition-all transform hover:scale-105 disabled:cursor-not-allowed ${
                    selectedAnswer === option
                      ? option === currentQ.correctAnswer
                        ? 'bg-green-500 text-white scale-105'
                        : 'bg-red-500 text-white'
                      : 'bg-yellow-700/40 text-white hover:bg-yellow-700/60 border-2 border-yellow-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {showFeedback && (
            <div
              className={`mt-8 p-6 rounded-2xl text-center font-bold text-2xl ${
                feedback.includes('✅')
                  ? 'bg-green-500/90 border-2 border-green-300 text-white'
                  : 'bg-red-500/90 border-2 border-red-300 text-white'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
