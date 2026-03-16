import React, { useState, useEffect } from 'react';

interface LetterMatchGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const letterPairs = [
  { upper: 'A', lower: 'a', word: 'Araba', emoji: '🚗' },
  { upper: 'B', lower: 'b', word: 'Balon', emoji: '🎈' },
  { upper: 'C', lower: 'c', word: 'Ceket', emoji: '🧥' },
  { upper: 'Ç', lower: 'ç', word: 'Çiçek', emoji: '🌸' },
  { upper: 'D', lower: 'd', word: 'Deniz', emoji: '🌊' },
  { upper: 'E', lower: 'e', word: 'Elma', emoji: '🍎' },
  { upper: 'F', lower: 'f', word: 'Fil', emoji: '🐘' },
  { upper: 'G', lower: 'g', word: 'Güneş', emoji: '☀️' },
  { upper: 'Ğ', lower: 'ğ', word: 'Dağ', emoji: '⛰️' },
  { upper: 'H', lower: 'h', word: 'Havuç', emoji: '🥕' },
  { upper: 'I', lower: 'ı', word: 'Işık', emoji: '💡' },
  { upper: 'İ', lower: 'i', word: 'İnek', emoji: '🐄' },
  { upper: 'J', lower: 'j', word: 'Jilet', emoji: '🪒' },
  { upper: 'K', lower: 'k', word: 'Kedi', emoji: '🐱' },
  { upper: 'L', lower: 'l', word: 'Limon', emoji: '🍋' },
  { upper: 'M', lower: 'm', word: 'Muz', emoji: '🍌' },
  { upper: 'N', lower: 'n', word: 'Nar', emoji: '🍎' },
  { upper: 'O', lower: 'o', word: 'Okul', emoji: '🏫' },
  { upper: 'Ö', lower: 'ö', word: 'Öğretmen', emoji: '👨‍🏫' },
  { upper: 'P', lower: 'p', word: 'Panda', emoji: '🐼' },
  { upper: 'R', lower: 'r', word: 'Renk', emoji: '🎨' },
  { upper: 'S', lower: 's', word: 'Saat', emoji: '⏰' },
  { upper: 'Ş', lower: 'ş', word: 'Şapka', emoji: '🎩' },
  { upper: 'T', lower: 't', word: 'Top', emoji: '⚽' },
  { upper: 'U', lower: 'u', word: 'Uçak', emoji: '✈️' },
  { upper: 'Ü', lower: 'ü', word: 'Üzüm', emoji: '🍇' },
  { upper: 'V', lower: 'v', word: 'Vazo', emoji: '🏺' },
  { upper: 'Y', lower: 'y', word: 'Yıldız', emoji: '⭐' },
  { upper: 'Z', lower: 'z', word: 'Zürafa', emoji: '🦒' },
];

const LetterMatchGame: React.FC<LetterMatchGameProps> = ({ onComplete, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    generateOptions();
  }, [currentIndex]);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  const generateOptions = () => {
    const current = letterPairs[currentIndex];
    const wrongOptions = letterPairs
      .filter((_, i) => i !== currentIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((p) => p.lower);

    const allOptions = [current.lower, ...wrongOptions].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleAnswer = (selected: string) => {
    const current = letterPairs[currentIndex];
    const correct = selected === current.lower;

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (currentIndex < letterPairs.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowFeedback(false);
      } else {
        onComplete(score + (correct ? 10 : 0));
      }
    }, 1500);
  };

  const current = letterPairs[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 p-4">
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
            <span className="text-white font-bold">
              Harf {currentIndex + 1}/{letterPairs.length}
            </span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / letterPairs.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-black text-purple-600 mb-6 text-center">
            Büyük harfin küçüğünü bul!
          </h3>

          {/* Letter Display */}
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-12 mb-8 text-center border-4 border-yellow-400">
            <div className="text-9xl font-black text-purple-600 mb-4">{current.upper}</div>
            <div className="text-6xl mb-4">{current.emoji}</div>
            <div className="text-3xl font-bold text-gray-700">{current.word}</div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswer(option)}
                disabled={showFeedback}
                className={`p-8 rounded-2xl font-black text-6xl transition-all ${
                  showFeedback
                    ? option === current.lower
                      ? 'bg-green-500 text-white scale-105'
                      : option === options.find((o) => showFeedback && o !== current.lower)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 active:scale-95'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`mt-6 p-4 rounded-2xl text-center font-bold text-xl ${
                isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {isCorrect ? '🎉 Harika! Doğru buldun!' : `❌ Yanlış! Doğru cevap: ${current.lower}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LetterMatchGame;
