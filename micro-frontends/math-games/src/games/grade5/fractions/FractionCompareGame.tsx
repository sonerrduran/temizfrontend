import React, { useState, useEffect } from 'react';

interface FractionCompareGameProps {
  onBack: () => void;
}

const FractionCompareGame: React.FC<FractionCompareGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [fraction1, setFraction1] = useState({ num: 1, den: 2 });
  const [fraction2, setFraction2] = useState({ num: 1, den: 3 });
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    generateFractions();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const generateFractions = () => {
    const den1 = Math.floor(Math.random() * 8) + 2;
    const num1 = Math.floor(Math.random() * (den1 - 1)) + 1;

    const den2 = Math.floor(Math.random() * 8) + 2;
    const num2 = Math.floor(Math.random() * (den2 - 1)) + 1;

    setFraction1({ num: num1, den: den1 });
    setFraction2({ num: num2, den: den2 });
  };

  const handleAnswer = (answer: 'bigger' | 'smaller' | 'equal') => {
    const val1 = fraction1.num / fraction1.den;
    const val2 = fraction2.num / fraction2.den;

    let correct = false;
    if (answer === 'bigger' && val1 > val2) correct = true;
    if (answer === 'smaller' && val1 < val2) correct = true;
    if (answer === 'equal' && Math.abs(val1 - val2) < 0.001) correct = true;

    if (correct) {
      setScore(score + 10 + streak * 2);
      setStreak(streak + 1);
      setTimeout(() => generateFractions(), 500);
    } else {
      setStreak(0);
      setScore(Math.max(0, score - 5));
      setTimeout(() => generateFractions(), 1500);
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setStreak(0);
    generateFractions();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-500 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold transition-all backdrop-blur-sm"
          >
            ← Geri
          </button>
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
            🍕 Kesir Karşılaştırma
          </h1>
          <div className="w-24"></div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
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
        </div>

        {!gameOver ? (
          <>
            <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 mb-8 text-center shadow-2xl">
              <h3 className="text-2xl font-black text-white mb-6">İlk kesir ikinci kesirden...</h3>

              <div className="flex items-center justify-center gap-8">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl p-8 shadow-2xl">
                  <div className="text-7xl font-black text-white">
                    <div>{fraction1.num}</div>
                    <div className="border-t-4 border-white my-2"></div>
                    <div>{fraction1.den}</div>
                  </div>
                </div>

                <div className="text-6xl text-white">?</div>

                <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl p-8 shadow-2xl">
                  <div className="text-7xl font-black text-white">
                    <div>{fraction2.num}</div>
                    <div className="border-t-4 border-white my-2"></div>
                    <div>{fraction2.den}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handleAnswer('bigger')}
                className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-3xl p-8 text-white transition-all hover:scale-105 active:scale-95 shadow-2xl"
              >
                <div className="text-5xl mb-2">▲</div>
                <div className="text-3xl font-black">BÜYÜK</div>
              </button>

              <button
                onClick={() => handleAnswer('equal')}
                className="bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 rounded-3xl p-8 text-white transition-all hover:scale-105 active:scale-95 shadow-2xl"
              >
                <div className="text-5xl mb-2">=</div>
                <div className="text-3xl font-black">EŞİT</div>
              </button>

              <button
                onClick={() => handleAnswer('smaller')}
                className="bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-3xl p-8 text-white transition-all hover:scale-105 active:scale-95 shadow-2xl"
              >
                <div className="text-5xl mb-2">▼</div>
                <div className="text-3xl font-black">KÜÇÜK</div>
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl">
            <div className="text-6xl mb-4">🍕</div>
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

export default FractionCompareGame;
