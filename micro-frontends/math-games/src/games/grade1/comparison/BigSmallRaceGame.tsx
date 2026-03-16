import React, { useState, useEffect } from 'react';

interface BigSmallRaceGameProps {
  onBack: () => void;
}

const BigSmallRaceGame: React.FC<BigSmallRaceGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    generateNumbers();
  }, [level]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const generateNumbers = () => {
    const max = Math.min(20 + level * 10, 100);
    const n1 = Math.floor(Math.random() * max) + 1;
    let n2 = Math.floor(Math.random() * max) + 1;

    // Ensure numbers are different
    while (n2 === n1) {
      n2 = Math.floor(Math.random() * max) + 1;
    }

    setNum1(n1);
    setNum2(n2);
    setFeedback('');
  };

  const handleAnswer = (answer: 'bigger' | 'smaller' | 'equal') => {
    let correct = false;

    if (answer === 'bigger' && num1 > num2) correct = true;
    if (answer === 'smaller' && num1 < num2) correct = true;
    if (answer === 'equal' && num1 === num2) correct = true;

    if (correct) {
      setScore(score + 10 + streak * 2);
      setStreak(streak + 1);
      setFeedback('✅ Doğru!');

      if (streak > 0 && streak % 5 === 0) {
        setLevel(level + 1);
      }

      setTimeout(() => generateNumbers(), 500);
    } else {
      setStreak(0);
      setScore(Math.max(0, score - 5));
      setFeedback('❌ Yanlış!');
      setTimeout(() => generateNumbers(), 1500);
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setStreak(0);
    setLevel(1);
    generateNumbers();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 p-4 md:p-8">
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
            🏁 Büyük-Küçük Yarışı
          </h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
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

        {!gameOver ? (
          <>
            {/* Question */}
            <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 mb-8 text-center shadow-2xl">
              <h3 className="text-3xl font-black text-white mb-6">İlk sayı ikinci sayıdan...</h3>

              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-2xl">
                  <div className="text-7xl font-black text-white">{num1}</div>
                </div>

                <div className="text-6xl text-white">?</div>

                <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl p-8 shadow-2xl">
                  <div className="text-7xl font-black text-white">{num2}</div>
                </div>
              </div>
            </div>

            {/* Answer Buttons */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <button
                onClick={() => handleAnswer('bigger')}
                disabled={!!feedback}
                className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-3xl p-8 text-white transition-all hover:scale-105 active:scale-95 shadow-2xl disabled:opacity-50"
              >
                <div className="text-5xl mb-2">▲</div>
                <div className="text-3xl font-black">BÜYÜK</div>
              </button>

              <button
                onClick={() => handleAnswer('equal')}
                disabled={!!feedback}
                className="bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 rounded-3xl p-8 text-white transition-all hover:scale-105 active:scale-95 shadow-2xl disabled:opacity-50"
              >
                <div className="text-5xl mb-2">=</div>
                <div className="text-3xl font-black">EŞİT</div>
              </button>

              <button
                onClick={() => handleAnswer('smaller')}
                disabled={!!feedback}
                className="bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-3xl p-8 text-white transition-all hover:scale-105 active:scale-95 shadow-2xl disabled:opacity-50"
              >
                <div className="text-5xl mb-2">▼</div>
                <div className="text-3xl font-black">KÜÇÜK</div>
              </button>
            </div>

            {/* Feedback */}
            {feedback && (
              <div
                className={`text-center text-3xl font-black p-6 rounded-xl ${
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
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl">
            <div className="text-6xl mb-4">🏁</div>
            <h2 className="text-4xl font-black text-white mb-4">Oyun Bitti!</h2>
            <p className="text-2xl text-white mb-2">Toplam Puan: {score}</p>
            <p className="text-xl text-white/80 mb-8">En Yüksek Seri: {streak}</p>
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

export default BigSmallRaceGame;
