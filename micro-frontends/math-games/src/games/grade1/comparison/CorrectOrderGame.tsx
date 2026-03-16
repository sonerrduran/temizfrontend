import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const CorrectOrderGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const count = Math.min(4 + level, 8);
    const maxNum = 10 + level * 5;
    const nums: number[] = [];

    while (nums.length < count) {
      const num = Math.floor(Math.random() * maxNum) + 1;
      if (!nums.includes(num)) {
        nums.push(num);
      }
    }

    setNumbers([...nums].sort((a, b) => a - b));
    setAvailableNumbers([...nums].sort(() => Math.random() - 0.5));
    setUserOrder([]);
    setFeedback('');
  };

  const handleNumberClick = (num: number) => {
    setUserOrder([...userOrder, num]);
    setAvailableNumbers(availableNumbers.filter((n) => n !== num));
  };

  const handleRemoveNumber = (num: number) => {
    setUserOrder(userOrder.filter((n) => n !== num));
    setAvailableNumbers([...availableNumbers, num]);
  };

  const handleCheck = () => {
    if (userOrder.length !== numbers.length) {
      setFeedback('❌ Tüm sayıları sırala!');
      setTimeout(() => setFeedback(''), 1500);
      return;
    }

    const isCorrect = userOrder.every((num, idx) => num === numbers[idx]);

    if (isCorrect) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Mükemmel! Doğru sıralama!');

      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
        } else {
          onComplete(score + points);
        }
      }, 1500);
    } else {
      setFeedback('❌ Yanlış sıralama! Tekrar dene.');
      setTimeout(() => {
        setUserOrder([]);
        setAvailableNumbers([...numbers].sort(() => Math.random() - 0.5));
        setFeedback('');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/10 rounded-xl">
              <span className="text-white font-black">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-yellow-500/90 rounded-xl">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">📊 Doğru Sıra 📊</h1>
          <p className="text-white text-xl">Sayıları küçükten büyüğe sırala!</p>
        </div>

        <div className="bg-white/10 rounded-3xl p-8 mb-8">
          <div className="mb-8">
            <h3 className="text-white text-2xl font-bold mb-4 text-center">Sıralanacak Sayılar:</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {availableNumbers.map((num, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNumberClick(num)}
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-white rounded-2xl font-black text-4xl shadow-lg transform hover:scale-110 transition-all"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-white text-2xl font-bold mb-4 text-center">Senin Sıralaman:</h3>
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 min-h-[120px]">
              <div className="flex flex-wrap justify-center gap-4">
                {userOrder.map((num, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRemoveNumber(num)}
                    className="w-20 h-20 bg-white/30 hover:bg-white/40 text-white rounded-2xl font-black text-4xl shadow-lg"
                  >
                    {num}
                  </button>
                ))}
                {userOrder.length === 0 && (
                  <div className="text-white/50 text-xl font-bold flex items-center">
                    Sayıları buraya sürükle
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleCheck}
              className="px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl font-black text-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              Kontrol Et ✓
            </button>
          </div>

          {feedback && (
            <div
              className={`mt-8 text-center text-3xl font-black ${feedback.includes('Mükemmel') || feedback.includes('Doğru') ? 'text-green-400' : 'text-red-400'}`}
            >
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorrectOrderGame;
