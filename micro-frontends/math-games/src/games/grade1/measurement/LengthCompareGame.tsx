import React, { useState, useEffect } from 'react';

interface LengthCompareGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const objects = [
  { name: 'Kalem', emoji: '✏️', length: 15 },
  { name: 'Silgi', emoji: '🧹', length: 5 },
  { name: 'Cetvel', emoji: '📏', length: 30 },
  { name: 'Defter', emoji: '📓', length: 20 },
  { name: 'Kitap', emoji: '📚', length: 25 },
  { name: 'Makas', emoji: '✂️', length: 12 },
  { name: 'Boya Kalemi', emoji: '🖍️', length: 10 },
  { name: 'Yapıştırıcı', emoji: '📎', length: 8 },
];

const LengthCompareGame: React.FC<LengthCompareGameProps> = ({ onComplete, onExit }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [currentPair, setCurrentPair] = useState<typeof objects>([]);
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
    const shuffled = [...objects].sort(() => Math.random() - 0.5);
    setCurrentPair([shuffled[0], shuffled[1]]);
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);

    const longerIndex = currentPair[0].length > currentPair[1].length ? 0 : 1;
    const correct = index === longerIndex;

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

  const longerIndex = currentPair[0]?.length > currentPair[1]?.length ? 0 : 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-4">
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
          <h3 className="text-3xl font-black text-orange-600 mb-8 text-center">
            Hangisi Daha Uzun?
          </h3>

          {/* Objects Display */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {currentPair.map((obj, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswer(index)}
                disabled={showFeedback}
                className={`p-8 rounded-2xl transition-all ${
                  showFeedback
                    ? index === longerIndex
                      ? 'bg-green-500 text-white scale-105'
                      : index === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white hover:scale-105 active:scale-95'
                }`}
              >
                <div className="text-7xl mb-4">{obj.emoji}</div>
                <div className="font-black text-2xl mb-2">{obj.name}</div>
                {/* Visual length representation */}
                <div className="bg-white/30 rounded-full h-4 mt-4">
                  <div
                    className="bg-yellow-400 h-4 rounded-full transition-all"
                    style={{ width: `${(obj.length / 30) * 100}%` }}
                  />
                </div>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`p-4 rounded-2xl text-center font-bold text-xl ${
                selectedAnswer === longerIndex
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {selectedAnswer === longerIndex
                ? '🎉 Doğru! Aferin!'
                : `❌ Yanlış! ${currentPair[longerIndex].name} daha uzun!`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LengthCompareGame;
