import React, { useState, useEffect } from 'react';

interface MultiplicationBattleGameProps {
  onBack: () => void;
}

const MultiplicationBattleGame: React.FC<MultiplicationBattleGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [currentProblem, setCurrentProblem] = useState({ num1: 0, num2: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [playerHealth, setPlayerHealth] = useState(100);

  useEffect(() => {
    generateProblem();
  }, [level]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver && playerHealth > 0 && enemyHealth > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 || playerHealth <= 0) {
      setGameOver(true);
    } else if (enemyHealth <= 0) {
      setLevel(level + 1);
      setEnemyHealth(100);
    }
  }, [timeLeft, gameOver, playerHealth, enemyHealth]);

  const generateProblem = () => {
    const maxNum = Math.min(5 + level, 12);
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    const answer = num1 * num2;

    setCurrentProblem({ num1, num2, answer });
    setUserAnswer('');
  };

  const handleSubmit = () => {
    if (!userAnswer) return;

    if (parseInt(userAnswer) === currentProblem.answer) {
      const damage = 20 + streak * 5;
      setEnemyHealth(Math.max(0, enemyHealth - damage));
      setScore(score + 15 + streak * 3);
      setStreak(streak + 1);
      generateProblem();
    } else {
      setPlayerHealth(Math.max(0, playerHealth - 15));
      setStreak(0);
      setUserAnswer('');
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(120);
    setGameOver(false);
    setStreak(0);
    setLevel(1);
    setEnemyHealth(100);
    setPlayerHealth(100);
    generateProblem();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-blue-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold transition-all backdrop-blur-sm"
          >
            ← Geri
          </button>
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
            ⚔️ Çarpım Savaşı
          </h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Puan</div>
            <div className="text-3xl font-black text-white">{score}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Süre</div>
            <div className="text-3xl font-black text-white">{timeLeft}s</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Seri</div>
            <div className="text-3xl font-black text-white">{streak}🔥</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Seviye</div>
            <div className="text-3xl font-black text-white">{level}</div>
          </div>
        </div>

        {!gameOver && enemyHealth > 0 ? (
          <>
            {/* Battle Arena */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Player */}
              <div className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-blue-400/50">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">🛡️</div>
                  <div className="text-xl font-bold text-white">SEN</div>
                </div>
                <div className="bg-white/20 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${playerHealth}%` }}
                  />
                </div>
                <div className="text-center text-2xl font-black text-white mt-2">
                  {playerHealth} HP
                </div>
              </div>

              {/* Enemy */}
              <div className="bg-gradient-to-br from-red-500/30 to-orange-500/30 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-red-400/50">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">👹</div>
                  <div className="text-xl font-bold text-white">DÜŞMAN</div>
                </div>
                <div className="bg-white/20 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-red-400 to-orange-500 h-full transition-all duration-500"
                    style={{ width: `${enemyHealth}%` }}
                  />
                </div>
                <div className="text-center text-2xl font-black text-white mt-2">
                  {enemyHealth} HP
                </div>
              </div>
            </div>

            {/* Problem */}
            <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 mb-6 text-center shadow-2xl">
              <div className="text-7xl font-black text-white mb-4">
                {currentProblem.num1} × {currentProblem.num2}
              </div>
              <div className="text-4xl text-white/80 font-bold">= ?</div>
            </div>

            {/* Answer Input */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-40 h-24 text-6xl font-black text-center border-4 border-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300 bg-white text-purple-600 shadow-lg"
                placeholder="?"
                autoFocus
              />
            </div>

            {/* Attack Button */}
            <button
              onClick={handleSubmit}
              disabled={!userAnswer}
              className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white text-3xl font-black py-6 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              ⚔️ SALDIRI!
            </button>
          </>
        ) : (
          /* Game Over */
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl">
            <div className="text-6xl mb-4">{playerHealth > 0 ? '🏆' : '💀'}</div>
            <h2 className="text-4xl font-black text-white mb-4">
              {playerHealth > 0 ? 'Kazandın!' : 'Oyun Bitti!'}
            </h2>
            <p className="text-2xl text-white mb-2">Toplam Puan: {score}</p>
            <p className="text-xl text-white/80 mb-8">Ulaşılan Seviye: {level}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl text-white font-bold text-xl transition-all"
              >
                Tekrar Oyna
              </button>
              <button
                onClick={onBack}
                className="px-8 py-4 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-xl transition-all"
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

export default MultiplicationBattleGame;
