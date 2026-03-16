import React, { useState, useEffect } from 'react';

interface DivisionHuntGameProps {
  onBack: () => void;
}

const DivisionHuntGame: React.FC<DivisionHuntGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [currentProblem, setCurrentProblem] = useState({ dividend: 0, divisor: 0, answer: 0 });
  const [targets, setTargets] = useState<
    Array<{ id: number; value: number; x: number; y: number }>
  >([]);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState('');
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
    const maxDivisor = Math.min(5 + level, 10);
    const divisor = Math.floor(Math.random() * (maxDivisor - 1)) + 2;
    const quotient = Math.floor(Math.random() * 10) + 1;
    const dividend = divisor * quotient;

    const newTargets = [];
    newTargets.push({
      id: 0,
      value: quotient,
      x: Math.random() * 70 + 10,
      y: Math.random() * 60 + 10,
    });

    for (let i = 1; i < 5; i++) {
      let wrongAnswer;
      do {
        wrongAnswer = Math.floor(Math.random() * 20) + 1;
      } while (wrongAnswer === quotient || newTargets.some((t) => t.value === wrongAnswer));

      newTargets.push({
        id: i,
        value: wrongAnswer,
        x: Math.random() * 70 + 10,
        y: Math.random() * 60 + 10,
      });
    }

    setCurrentProblem({ dividend, divisor, answer: quotient });
    setTargets(newTargets);
    setFeedback('');
  };

  const handleTargetClick = (value: number) => {
    if (value === currentProblem.answer) {
      setScore(score + 15);
      setFeedback('🎯 İsabet!');

      if ((score + 15) % 100 === 0) {
        setLevel(level + 1);
      }

      setTimeout(() => generateProblem(), 800);
    } else {
      setScore(Math.max(0, score - 5));
      setFeedback('❌ Kaçırdın!');
      setTimeout(() => setFeedback(''), 1000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(90);
    setGameOver(false);
    setLevel(1);
    generateProblem();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all transform hover:scale-105 border border-red-500"
          >
            ← Çıkış
          </button>
          <h1 className="text-3xl md:text-5xl font-black text-white">🎯 Bölme Avı</h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-4 text-center border border-slate-700">
            <div className="text-slate-400 text-sm">Puan</div>
            <div className="text-3xl font-black text-white">{score}</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-4 text-center border border-slate-700">
            <div className="text-slate-400 text-sm">Süre</div>
            <div className="text-3xl font-black text-white">{timeLeft}s</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-4 text-center border border-slate-700">
            <div className="text-slate-400 text-sm">Seviye</div>
            <div className="text-3xl font-black text-white">{level}</div>
          </div>
        </div>

        {!gameOver ? (
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
            {/* Problem */}
            <div className="bg-gradient-to-br from-cyan-500 via-teal-500 to-cyan-600 rounded-2xl p-8 mb-6 text-center">
              <div className="text-6xl md:text-8xl font-black text-white mb-2">
                {currentProblem.dividend} ÷ {currentProblem.divisor}
              </div>
              <div className="text-3xl text-white font-bold">= ?</div>
              {feedback && (
                <div
                  className={`mt-4 text-3xl font-bold ${feedback.includes('🎯') ? 'text-green-300' : 'text-red-300'}`}
                >
                  {feedback}
                </div>
              )}
            </div>

            {/* Hunting Area */}
            <div className="relative bg-gradient-to-br from-green-800/40 to-green-900/40 backdrop-blur-sm rounded-3xl h-96 overflow-hidden border-4 border-cyan-500/30">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-50"></div>
              {targets.map((target) => (
                <button
                  key={target.id}
                  onClick={() => handleTargetClick(target.value)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 rounded-full text-3xl font-black text-white transition-all hover:scale-110 active:scale-95 border-4 border-white/50"
                  style={{ left: `${target.x}%`, top: `${target.y}%` }}
                >
                  {target.value}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Game Over */
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-12 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-4xl font-black text-white mb-4">Oyun Bitti!</h2>
            <p className="text-2xl text-white mb-8">Toplam Puan: {score}</p>
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

export default DivisionHuntGame;
