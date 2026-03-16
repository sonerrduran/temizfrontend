import React, { useState, useEffect } from 'react';

interface DecimalSortGameProps {
  onBack: () => void;
}

const DecimalSortGame: React.FC<DecimalSortGameProps> = ({ onBack }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [sortedNumbers, setSortedNumbers] = useState<number[]>([]);
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    generateQuestion();
  }, [round]);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  const generateQuestion = () => {
    const nums: number[] = [];
    for (let i = 0; i < 5; i++) {
      const num = Math.random() * 10;
      nums.push(parseFloat(num.toFixed(2)));
    }
    setNumbers([...nums]);
    setSortedNumbers([...nums].sort((a, b) => a - b));
    setUserOrder([]);
  };

  const handleNumberClick = (num: number) => {
    if (showFeedback || userOrder.includes(num)) return;
    const newOrder = [...userOrder, num];
    setUserOrder(newOrder);

    if (newOrder.length === numbers.length) {
      checkAnswer(newOrder);
    }
  };

  const checkAnswer = (order: number[]) => {
    setShowFeedback(true);
    const correct = order.every((num, idx) => num === sortedNumbers[idx]);
    if (correct) setScore(score + 20);

    setTimeout(() => {
      if (round < 10) {
        setRound(round + 1);
        setShowFeedback(false);
      } else {
        alert(`Oyun Bitti! Skorun: ${score + (correct ? 20 : 0)}`);
        onBack();
      }
    }, 2000);
  };

  const isCorrect = userOrder.every((num, idx) => num === sortedNumbers[idx]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-bold"
          >
            ← Geri
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white font-black">
              ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white font-black">
              ⭐ {score}
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-black text-purple-600 mb-8 text-center">
            Ondalık Sıralama 📊
          </h3>

          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 mb-8 border-4 border-blue-400">
            <p className="text-xl font-bold text-center text-gray-700 mb-6">
              Sayıları küçükten büyüğe sırala!
            </p>
            <div className="grid grid-cols-5 gap-3">
              {numbers.map((num, index) => (
                <button
                  key={index}
                  onClick={() => handleNumberClick(num)}
                  disabled={showFeedback || userOrder.includes(num)}
                  className={`p-4 rounded-xl font-black text-2xl transition-all ${
                    userOrder.includes(num)
                      ? 'bg-gray-300 text-gray-500 scale-90'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105'
                  }`}
                >
                  {num.toFixed(2)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 border-4 border-yellow-400">
            <p className="text-lg font-bold text-center text-gray-700 mb-4">Senin Sıralaman:</p>
            <div className="flex justify-center gap-3 min-h-[80px] items-center">
              {userOrder.map((num, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-xl font-black text-2xl text-purple-600 shadow-lg"
                >
                  {num.toFixed(2)}
                </div>
              ))}
              {userOrder.length === 0 && (
                <p className="text-gray-400 text-lg">Sayılara tıklayarak sırala...</p>
              )}
            </div>
          </div>

          {showFeedback && (
            <div
              className={`mt-6 p-4 rounded-2xl text-center font-bold text-xl ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {isCorrect
                ? '🎉 Mükemmel! Doğru sıralama!'
                : `❌ Yanlış! Doğru sıra: ${sortedNumbers.map((n) => n.toFixed(2)).join(' < ')}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DecimalSortGame;
