import React, { useState, useEffect } from 'react';

interface MoneyCountGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const coins = [
  { value: 1, emoji: '🪙', color: 'from-yellow-600 to-amber-700' },
  { value: 5, emoji: '🪙', color: 'from-orange-500 to-red-600' },
  { value: 10, emoji: '🪙', color: 'from-blue-500 to-indigo-600' },
  { value: 25, emoji: '🪙', color: 'from-purple-500 to-pink-600' },
  { value: 50, emoji: '🪙', color: 'from-green-500 to-emerald-600' },
];

const MoneyCountGame: React.FC<MoneyCountGameProps> = ({ onComplete, onExit }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [currentCoins, setCurrentCoins] = useState<typeof coins>([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(150);

  useEffect(() => {
    generateNewQuestion();
  }, [round]);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  const generateNewQuestion = () => {
    // Generate 2-4 random coins
    const numCoins = Math.floor(Math.random() * 3) + 2;
    const selectedCoins = [];
    let total = 0;

    for (let i = 0; i < numCoins; i++) {
      const coin = coins[Math.floor(Math.random() * Math.min(3, coins.length))]; // Use smaller coins for grade 1
      selectedCoins.push(coin);
      total += coin.value;
    }

    setCurrentCoins(selectedCoins);
    setCorrectAnswer(total);

    // Generate options
    const wrongOptions = [total + 5, total - 5, total + 10].filter((v) => v > 0);

    const allOptions = [total, ...wrongOptions.slice(0, 2)].sort(() => Math.random() - 0.5);

    setOptions(allOptions);
  };

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const correct = answer === correctAnswer;
    if (correct) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (round < 10) {
        setRound(round + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        onComplete(score + (correct ? 10 : 0));
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-bold hover:bg-white/30 transition-all"
          >
            ← Çıkış
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

        {/* Progress */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold">Soru {round}/10</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(round / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-black text-green-600 mb-8 text-center">Toplam Kaç Kuruş?</h3>

          {/* Coins Display */}
          <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl p-8 mb-8 border-4 border-yellow-400">
            <div className="flex flex-wrap justify-center gap-4">
              {currentCoins.map((coin, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${coin.color} rounded-full w-24 h-24 flex flex-col items-center justify-center text-white shadow-lg`}
                >
                  <div className="text-4xl">{coin.emoji}</div>
                  <div className="font-black text-xl">{coin.value}₺</div>
                </div>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-3 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswer(option)}
                disabled={showFeedback}
                className={`p-6 rounded-2xl font-black text-3xl transition-all ${
                  showFeedback
                    ? option === correctAnswer
                      ? 'bg-green-500 text-white scale-105'
                      : option === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 active:scale-95'
                }`}
              >
                {option}₺
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`mt-6 p-4 rounded-2xl text-center font-bold text-xl ${
                selectedAnswer === correctAnswer
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {selectedAnswer === correctAnswer
                ? '🎉 Doğru! Harika hesapladın!'
                : `❌ Yanlış! Doğru cevap: ${correctAnswer}₺`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoneyCountGame;
