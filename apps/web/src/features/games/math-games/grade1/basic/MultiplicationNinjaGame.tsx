import React, { useState, useEffect } from 'react';

interface MultiplicationNinjaGameProps {
  onBack: () => void;
}

const MultiplicationNinjaGame: React.FC<MultiplicationNinjaGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentProblem, setCurrentProblem] = useState({ num1: 0, num2: 0, answer: 0 });
  const [options, setOptions] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    generateProblem();
  }, [level]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const generateProblem = () => {
    const maxNum = Math.min(5 + level, 10);
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    const answer = num1 * num2;

    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const wrong = answer + Math.floor(Math.random() * 20) - 10;
      if (wrong !== answer && wrong > 0 && !wrongAnswers.includes(wrong)) {
        wrongAnswers.push(wrong);
      }
    }

    const allOptions = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);

    setCurrentProblem({ num1, num2, answer });
    setOptions(allOptions);
  };

  const handleAnswer = (selected: number) => {
    if (selected === currentProblem.answer) {
      setScore(score + 10 + streak * 2);
      setStreak(streak + 1);

      if (streak > 0 && streak % 5 === 0) {
        setLevel(level + 1);
      }

      generateProblem();
    } else {
      setStreak(0);
      setScore(Math.max(0, score - 5));
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setStreak(0);
    setLevel(1);
    generateProblem();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all transform hover:scale-105 border border-red-500"
          >
            ← Çıkış
          </button>
          <h1 className="text-3xl md:text-5xl font-black text-white">🥷 Çarpım Ninja</h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-4 text-center border border-slate-700">
            <div className="text-slate-400 text-sm">Puan</div>
            <div className="text-3xl font-black text-white">{score}</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-4 text-center border border-slate-700">
            <div className="text-slate-400 text-sm">Süre</div>
            <div className="text-3xl font-black text-white">{timeLeft}s</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-4 text-center border border-slate-700">
            <div className="text-slate-400 text-sm">Seri</div>
            <div className="text-3xl font-black text-white">{streak}🔥</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-4 text-center border border-slate-700">
            <div className="text-slate-400 text-sm">Seviye</div>
            <div className="text-3xl font-black text-white">{level}</div>
          </div>
        </div>

        {!gameOver ? (
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
            {/* Problem */}
            <div className="bg-gradient-to-br from-red-500 via-rose-500 to-red-600 rounded-2xl p-12 mb-8 text-center">
              <div className="text-7xl md:text-9xl font-black text-white mb-4 animate-bounce">
                {currentProblem.num1} × {currentProblem.num2}
              </div>
              <div className="text-4xl text-white font-bold">= ?</div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-red-500 hover:bg-red-400 rounded-2xl p-8 text-5xl font-black text-white transition-all transform hover:scale-105 active:scale-95"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Game Over */
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-12 text-center">
            <div className="text-6xl mb-4">🥷</div>
            <h2 className="text-4xl font-black text-white mb-4">Oyun Bitti!</h2>
            <p className="text-2xl text-white mb-2">Toplam Puan: {score}</p>
            <p className="text-xl text-slate-400 mb-8">En Yüksek Seri: {streak}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl text-white font-bold text-xl transition-all"
              >
                Tekrar Oyna
              </button>
              <button
                onClick={onBack}
                className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-bold text-xl transition-all"
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

export default MultiplicationNinjaGame;
