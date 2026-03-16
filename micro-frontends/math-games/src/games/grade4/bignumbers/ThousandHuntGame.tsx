import React, { useState, useEffect } from 'react';

interface ThousandHuntGameProps {
  onBack: () => void;
}

const ThousandHuntGame: React.FC<ThousandHuntGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [targetNumber, setTargetNumber] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    generateRound();
  }, [level]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const generateRound = () => {
    const max = Math.min(1000 * level, 10000);
    const target = Math.floor(Math.random() * max) + 100;
    setTargetNumber(target);

    const opts = [target];
    while (opts.length < 4) {
      const variation = Math.floor(Math.random() * 200) - 100;
      const num = target + variation;
      if (num > 0 && !opts.includes(num)) {
        opts.push(num);
      }
    }

    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  const handleAnswer = (selected: number) => {
    if (selected === targetNumber) {
      setScore(score + 20);

      if ((score + 20) % 100 === 0) {
        setLevel(level + 1);
      }

      setTimeout(() => generateRound(), 500);
    } else {
      setScore(Math.max(0, score - 10));
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(90);
    setGameOver(false);
    setLevel(1);
    generateRound();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold transition-all backdrop-blur-sm"
          >
            ← Geri
          </button>
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
            🔢 Binlik Sayı Avı
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
            <div className="text-white/80 text-sm">Seviye</div>
            <div className="text-3xl font-black text-white">{level}</div>
          </div>
        </div>

        {!gameOver ? (
          <>
            <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 mb-8 text-center shadow-2xl">
              <h3 className="text-2xl font-black text-white mb-4">Bu Sayıyı Bul:</h3>
              <div className="text-8xl font-black text-white mb-4">
                {targetNumber.toLocaleString('tr-TR')}
              </div>
              <div className="text-xl text-white/80">({targetNumber} sayısını seç)</div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 rounded-3xl p-8 text-5xl font-black text-white transition-all hover:scale-105 active:scale-95 shadow-2xl"
                >
                  {option.toLocaleString('tr-TR')}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl">
            <div className="text-6xl mb-4">🔢</div>
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

export default ThousandHuntGame;
