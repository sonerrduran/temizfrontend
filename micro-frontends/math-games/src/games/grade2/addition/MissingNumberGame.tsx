import React, { useState, useEffect } from 'react';

interface MissingNumberGameProps {
  onBack: () => void;
}

const MissingNumberGame: React.FC<MissingNumberGameProps> = ({ onBack }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [sum, setSum] = useState(0);
  const [missingPosition, setMissingPosition] = useState<'first' | 'second'>('first');
  const [options, setOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(150);

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
    const n1 = Math.floor(Math.random() * 40) + 10;
    const n2 = Math.floor(Math.random() * 40) + 10;
    const total = n1 + n2;
    const position = Math.random() > 0.5 ? 'first' : 'second';

    setNum1(n1);
    setNum2(n2);
    setSum(total);
    setMissingPosition(position);

    const correctAnswer = position === 'first' ? n1 : n2;
    const wrongOptions = [correctAnswer + 5, correctAnswer - 5, correctAnswer + 10].filter(
      (v) => v > 0
    );

    const allOptions = [correctAnswer, ...wrongOptions.slice(0, 2)].sort(() => Math.random() - 0.5);

    setOptions(allOptions);
  };

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const correctAnswer = missingPosition === 'first' ? num1 : num2;
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
        alert(`Oyun Bitti! Skorun: ${score + (correct ? 10 : 0)}`);
        onBack();
      }
    }, 1500);
  };

  const correctAnswer = missingPosition === 'first' ? num1 : num2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-500 p-4">
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
          <h3 className="text-3xl font-black text-orange-600 mb-8 text-center">
            Eksik Sayıyı Bul! 🔍
          </h3>

          {/* Problem Display */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-12 mb-8 text-center border-4 border-purple-400">
            <div className="flex items-center justify-center gap-8 text-8xl font-black">
              <span className={missingPosition === 'first' ? 'text-purple-600' : 'text-gray-800'}>
                {missingPosition === 'first' ? '?' : num1}
              </span>
              <span className="text-6xl text-gray-600">+</span>
              <span className={missingPosition === 'second' ? 'text-purple-600' : 'text-gray-800'}>
                {missingPosition === 'second' ? '?' : num2}
              </span>
              <span className="text-6xl text-gray-600">=</span>
              <span className="text-green-600">{sum}</span>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-3 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswer(option)}
                disabled={showFeedback}
                className={`p-8 rounded-2xl font-black text-5xl transition-all ${
                  showFeedback
                    ? option === correctAnswer
                      ? 'bg-green-500 text-white scale-105'
                      : option === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:scale-105 active:scale-95'
                }`}
              >
                {option}
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
                ? '🎉 Harika! Eksik sayıyı buldun!'
                : `❌ Yanlış! Doğru cevap: ${correctAnswer}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissingNumberGame;
