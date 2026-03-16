import React, { useState, useEffect } from 'react';

interface MathBasketballGameProps {
  onBack: () => void;
}

const MathBasketballGame: React.FC<MathBasketballGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentProblem, setCurrentProblem] = useState({
    num1: 0,
    num2: 0,
    operation: '+',
    answer: 0,
  });
  const [userAnswer, setUserAnswer] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [shooting, setShooting] = useState(false);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    generateProblem();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const generateProblem = () => {
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer;

    if (operation === '+') {
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      answer = num1 + num2;
    } else if (operation === '-') {
      num1 = Math.floor(Math.random() * 20) + 10;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
    } else {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 * num2;
    }

    setCurrentProblem({ num1, num2, operation, answer });
    setUserAnswer('');
    setResult(null);
  };

  const handleShoot = () => {
    if (!userAnswer) return;

    setShooting(true);

    setTimeout(() => {
      if (parseInt(userAnswer) === currentProblem.answer) {
        setResult('correct');
        setScore(score + 3 + streak);
        setStreak(streak + 1);
      } else {
        setResult('wrong');
        setStreak(0);
      }

      setTimeout(() => {
        setShooting(false);
        generateProblem();
      }, 1500);
    }, 800);
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setStreak(0);
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
          <h1 className="text-3xl md:text-5xl font-black text-white">🏀 Matematik Basketbolu</h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
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
        </div>

        {!gameOver ? (
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
            {/* Basketball Court */}
            <div className="relative bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-2xl p-8 mb-6 min-h-[400px]">
              {/* Basket */}
              <div className="absolute top-4 right-8 text-6xl">
                🏀
                <div className="w-24 h-2 bg-orange-300 rounded-full mt-2"></div>
              </div>

              {/* Problem */}
              <div className="text-center mb-8">
                <div className="text-6xl md:text-8xl font-black text-white mb-4">
                  {currentProblem.num1} {currentProblem.operation} {currentProblem.num2}
                </div>
                <div className="text-4xl text-white font-bold">= ?</div>
              </div>

              {/* Answer Input */}
              <div className="flex justify-center items-center gap-4 mb-6">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleShoot()}
                  disabled={shooting}
                  className="w-32 h-20 text-5xl font-black text-center border-4 border-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/50 bg-white text-slate-800 disabled:opacity-50"
                  placeholder="?"
                  autoFocus
                />
              </div>

              {/* Shoot Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleShoot}
                  disabled={!userAnswer || shooting}
                  className={`px-12 py-6 rounded-2xl text-2xl font-black transition-all ${
                    shooting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-yellow-400 hover:bg-yellow-300 text-orange-600'
                  } disabled:opacity-50`}
                >
                  {shooting ? '🏀 Atış...' : '🏀 Basket At!'}
                </button>
              </div>

              {/* Result Animation */}
              {result && (
                <div
                  className={`absolute inset-0 flex items-center justify-center ${shooting ? 'animate-bounce' : ''}`}
                >
                  <div
                    className={`text-8xl font-black ${result === 'correct' ? 'text-green-300' : 'text-red-300'}`}
                  >
                    {result === 'correct' ? '✓ SAYIII!' : '✗ Kaçtı!'}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Game Over */
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-12 text-center">
            <div className="text-6xl mb-4">🏀</div>
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

export default MathBasketballGame;
