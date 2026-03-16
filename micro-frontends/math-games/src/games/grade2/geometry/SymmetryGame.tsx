import React, { useState, useEffect } from 'react';

interface SymmetryGameProps {
  onBack: () => void;
}

const patterns = [
  { pattern: ['🔴', '🔵', '🔵', '🔴'], symmetric: true },
  { pattern: ['⭐', '🌟', '🌟', '⭐'], symmetric: true },
  { pattern: ['🟦', '🟩', '🟦', '🟩'], symmetric: false },
  { pattern: ['🍎', '🍊', '🍊', '🍎'], symmetric: true },
  { pattern: ['🔺', '🔻', '🔺', '🔻'], symmetric: false },
  { pattern: ['💙', '💚', '💚', '💙'], symmetric: true },
  { pattern: ['🌸', '🌺', '🌸', '🌺'], symmetric: false },
  { pattern: ['🎈', '🎁', '🎁', '🎈'], symmetric: true },
  { pattern: ['🦋', '🐛', '🐛', '🦋'], symmetric: true },
  { pattern: ['🍕', '🍔', '🍕', '🍔'], symmetric: false },
];

const SymmetryGame: React.FC<SymmetryGameProps> = ({ onBack }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [currentPattern, setCurrentPattern] = useState(patterns[0]);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    setCurrentPattern(patterns[round - 1]);
  }, [round]);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const correct = answer === currentPattern.symmetric;

    if (correct) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (round < patterns.length) {
        setRound(round + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        alert(`Oyun Bitti! Skorun: ${score + (correct ? 10 : 0)}`);
        onBack();
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-rose-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-bold hover:bg-white/30 transition-all"
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

        {/* Progress */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold">
              Soru {round}/{patterns.length}
            </span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(round / patterns.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-black text-pink-600 mb-4 text-center">Simetri Var mı? 🪞</h3>
          <p className="text-lg font-semibold text-gray-600 mb-8 text-center">
            Bu desen simetrik mi?
          </p>

          {/* Pattern Display */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-12 mb-8 border-4 border-purple-400">
            <div className="flex justify-center items-center gap-6">
              {currentPattern.pattern.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="text-7xl">{item}</div>
                  {index === 1 && <div className="w-1 h-32 bg-purple-600 rounded-full"></div>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => !showFeedback && handleAnswer(true)}
              disabled={showFeedback}
              className={`p-8 rounded-2xl font-black text-3xl transition-all ${
                showFeedback
                  ? currentPattern.symmetric
                    ? 'bg-green-500 text-white scale-105'
                    : selectedAnswer === true
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-105 active:scale-95'
              }`}
            >
              ✅ Evet, Simetrik
            </button>
            <button
              onClick={() => !showFeedback && handleAnswer(false)}
              disabled={showFeedback}
              className={`p-8 rounded-2xl font-black text-3xl transition-all ${
                showFeedback
                  ? !currentPattern.symmetric
                    ? 'bg-green-500 text-white scale-105'
                    : selectedAnswer === false
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  : 'bg-gradient-to-r from-red-500 to-rose-500 text-white hover:scale-105 active:scale-95'
              }`}
            >
              ❌ Hayır, Değil
            </button>
          </div>

          {showFeedback && (
            <div
              className={`mt-6 p-4 rounded-2xl text-center font-bold text-xl ${
                selectedAnswer === currentPattern.symmetric
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {selectedAnswer === currentPattern.symmetric
                ? '🎉 Doğru! Harika gözlem!'
                : `❌ Yanlış! ${currentPattern.symmetric ? 'Bu desen simetrik!' : 'Bu desen simetrik değil!'}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymmetryGame;
