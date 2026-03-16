import React, { useState, useEffect } from 'react';

interface NumberHuntTo100GameProps {
  onBack: () => void;
}

const NumberHuntTo100Game: React.FC<NumberHuntTo100GameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [targetNumber, setTargetNumber] = useState(0);
  const [numbers, setNumbers] = useState<
    Array<{ id: number; value: number; x: number; y: number }>
  >([]);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState('');
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
    const max = Math.min(20 + level * 10, 100);
    const target = Math.floor(Math.random() * max) + 1;
    setTargetNumber(target);

    const newNumbers = [];
    const count = Math.min(12 + level, 20);

    // Add target number
    newNumbers.push({
      id: 0,
      value: target,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 10,
    });

    // Add other numbers
    for (let i = 1; i < count; i++) {
      let num: number;
      do {
        num = Math.floor(Math.random() * max) + 1;
      } while (newNumbers.some((n) => n.value === num));

      newNumbers.push({
        id: i,
        value: num,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 10,
      });
    }

    setNumbers(newNumbers);
    setFeedback('');
  };

  const handleNumberClick = (value: number) => {
    if (value === targetNumber) {
      setScore(score + 15);
      setFeedback('🎯 Buldun!');

      if ((score + 15) % 100 === 0) {
        setLevel(level + 1);
      }

      setTimeout(() => generateRound(), 800);
    } else {
      setScore(Math.max(0, score - 5));
      setFeedback('❌ Yanlış sayı!');
      setTimeout(() => setFeedback(''), 1000);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold transition-all backdrop-blur-sm"
          >
            ← Geri
          </button>
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
            🔢 Sayı Avı (100'e Kadar)
          </h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
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
            {/* Target */}
            <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 mb-6 text-center shadow-2xl">
              <div className="text-6xl font-black text-white mb-2">{targetNumber}</div>
              <p className="text-2xl text-white/80">sayısını bul!</p>
              {feedback && (
                <div
                  className={`mt-4 text-3xl font-bold ${feedback.includes('🎯') ? 'text-green-300' : 'text-red-300'}`}
                >
                  {feedback}
                </div>
              )}
            </div>

            {/* Number Grid */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl h-[500px] overflow-hidden border-4 border-white/20 shadow-2xl">
              {numbers.map((num) => (
                <button
                  key={num.id}
                  onClick={() => handleNumberClick(num.value)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 rounded-2xl w-20 h-20 flex items-center justify-center text-3xl font-black text-white shadow-xl transition-all hover:scale-110 active:scale-95 border-4 border-white/50"
                  style={{ left: `${num.x}%`, top: `${num.y}%` }}
                >
                  {num.value}
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Game Over */
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

export default NumberHuntTo100Game;
