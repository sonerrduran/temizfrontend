import React, { useState, useEffect } from 'react';

interface PatternContinueGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const patterns = [
  { sequence: ['🔴', '🔵', '🔴', '🔵'], options: ['🔴', '🔵', '🟡'], answer: 0 },
  { sequence: ['⭐', '⭐', '🌟', '⭐', '⭐'], options: ['⭐', '🌟', '💫'], answer: 1 },
  { sequence: ['🍎', '🍊', '🍎', '🍊'], options: ['🍎', '🍊', '🍋'], answer: 0 },
  { sequence: ['🐶', '🐱', '🐶', '🐱'], options: ['🐶', '🐱', '🐭'], answer: 0 },
  { sequence: ['1️⃣', '2️⃣', '1️⃣', '2️⃣'], options: ['1️⃣', '2️⃣', '3️⃣'], answer: 0 },
  { sequence: ['🌸', '🌸', '🌺', '🌸', '🌸'], options: ['🌸', '🌺', '🌻'], answer: 1 },
  { sequence: ['🚗', '🚙', '🚗', '🚙'], options: ['🚗', '🚙', '🚕'], answer: 0 },
  { sequence: ['⚽', '🏀', '⚽', '🏀'], options: ['⚽', '🏀', '🎾'], answer: 0 },
  { sequence: ['🎈', '🎈', '🎁', '🎈', '🎈'], options: ['🎈', '🎁', '🎀'], answer: 1 },
  { sequence: ['🦋', '🐛', '🦋', '🐛'], options: ['🦋', '🐛', '🐝'], answer: 0 },
];

const PatternContinueGame: React.FC<PatternContinueGameProps> = ({ onComplete, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);

    const correct = index === patterns[currentIndex].answer;
    if (correct) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (currentIndex < patterns.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        onComplete(score + (correct ? 10 : 0));
      }
    }, 1500);
  };

  const current = patterns[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-rose-500 to-red-500 p-4">
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
              Soru {currentIndex + 1}/{patterns.length}
            </span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / patterns.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-black text-pink-600 mb-8 text-center">Örüntüyü Tamamla!</h3>

          {/* Pattern Display */}
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 mb-8 border-4 border-yellow-400">
            <div className="flex justify-center items-center gap-4 mb-4">
              {current.sequence.map((item, index) => (
                <div
                  key={index}
                  className="w-20 h-20 bg-white rounded-xl flex items-center justify-center text-5xl shadow-lg"
                >
                  {item}
                </div>
              ))}
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-4xl shadow-lg animate-pulse">
                ❓
              </div>
            </div>
            <div className="text-center text-gray-600 font-semibold">Sıradaki ne olmalı?</div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-3 gap-4">
            {current.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswer(index)}
                disabled={showFeedback}
                className={`p-8 rounded-2xl font-black text-6xl transition-all ${
                  showFeedback
                    ? index === current.answer
                      ? 'bg-green-500 text-white scale-105'
                      : index === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 active:scale-95'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`mt-6 p-4 rounded-2xl text-center font-bold text-xl ${
                selectedAnswer === current.answer
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {selectedAnswer === current.answer
                ? '🎉 Harika! Örüntüyü doğru tamamladın!'
                : `❌ Yanlış! Doğru cevap: ${current.options[current.answer]}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatternContinueGame;
