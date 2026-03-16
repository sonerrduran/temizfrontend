import React, { useState, useEffect } from 'react';

interface WeightCompareGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const items = [
  { name: 'Tüy', emoji: '🪶', weight: 1 },
  { name: 'Elma', emoji: '🍎', weight: 5 },
  { name: 'Kitap', emoji: '📚', weight: 8 },
  { name: 'Ayakkabı', emoji: '👟', weight: 6 },
  { name: 'Top', emoji: '⚽', weight: 4 },
  { name: 'Çanta', emoji: '🎒', weight: 10 },
  { name: 'Karpuz', emoji: '🍉', weight: 12 },
  { name: 'Sandalye', emoji: '🪑', weight: 15 },
];

const WeightCompareGame: React.FC<WeightCompareGameProps> = ({ onComplete, onExit }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [currentPair, setCurrentPair] = useState<typeof items>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    generateNewPair();
  }, [round]);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  const generateNewPair = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setCurrentPair([shuffled[0], shuffled[1]]);
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);

    const heavierIndex = currentPair[0].weight > currentPair[1].weight ? 0 : 1;
    const correct = index === heavierIndex;

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

  const heavierIndex = currentPair[0]?.weight > currentPair[1]?.weight ? 0 : 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500 p-4">
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
            <span className="text-white font-bold">Tur {round}/10</span>
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
          <h3 className="text-3xl font-black text-purple-600 mb-8 text-center">
            Hangisi Daha Ağır?
          </h3>

          {/* Scale Visual */}
          <div className="mb-8 text-center">
            <div className="text-6xl mb-4">⚖️</div>
            <p className="text-gray-600 font-semibold">Teraziyi dengede tut!</p>
          </div>

          {/* Items Display */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {currentPair.map((item, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswer(index)}
                disabled={showFeedback}
                className={`p-8 rounded-2xl transition-all ${
                  showFeedback
                    ? index === heavierIndex
                      ? 'bg-green-500 text-white scale-105'
                      : index === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white hover:scale-105 active:scale-95'
                }`}
              >
                <div className="text-7xl mb-4">{item.emoji}</div>
                <div className="font-black text-2xl">{item.name}</div>
                {/* Visual weight bars */}
                <div className="mt-4 flex justify-center gap-1">
                  {Array.from({ length: Math.ceil(item.weight / 3) }).map((_, i) => (
                    <div key={i} className="w-3 h-8 bg-yellow-400 rounded-full" />
                  ))}
                </div>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`p-4 rounded-2xl text-center font-bold text-xl ${
                selectedAnswer === heavierIndex
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {selectedAnswer === heavierIndex
                ? '🎉 Doğru! Aferin!'
                : `❌ Yanlış! ${currentPair[heavierIndex].name} daha ağır!`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeightCompareGame;
