import React, { useState, useEffect } from 'react';

interface FractionAdditionGameProps {
  onBack: () => void;
}

const FractionAdditionGame: React.FC<FractionAdditionGameProps> = ({ onBack }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [frac1, setFrac1] = useState({ num: 1, den: 2 });
  const [frac2, setFrac2] = useState({ num: 1, den: 2 });
  const [options, setOptions] = useState<{ num: number; den: number }[]>([]);
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

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const simplify = (num: number, den: number) => {
    const g = gcd(Math.abs(num), Math.abs(den));
    return { num: num / g, den: den / g };
  };

  const generateQuestion = () => {
    const denominators = [2, 3, 4, 5, 6];
    const den = denominators[Math.floor(Math.random() * denominators.length)];

    const num1 = Math.floor(Math.random() * (den - 1)) + 1;
    const num2 = Math.floor(Math.random() * (den - 1)) + 1;

    setFrac1({ num: num1, den });
    setFrac2({ num: num2, den });

    const correctSum = simplify(num1 + num2, den);

    const wrongOptions = [
      simplify(num1 + num2 + 1, den),
      simplify(num1 + num2 - 1, den),
      { num: num1 + num2, den: den * 2 },
    ];

    const allOptions = [correctSum, ...wrongOptions].slice(0, 3);
    setOptions(allOptions);
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);

    const correctSum = simplify(frac1.num + frac2.num, frac1.den);
    const selected = options[index];
    const correct = selected.num === correctSum.num && selected.den === correctSum.den;

    if (correct) setScore(score + 10);

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

  const correctSum = simplify(frac1.num + frac2.num, frac1.den);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-500 p-4">
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
          <h3 className="text-3xl font-black text-orange-600 mb-8 text-center">Kesir Toplama 🍕</h3>

          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-12 mb-8 border-4 border-purple-400">
            <div className="flex items-center justify-center gap-8 text-6xl font-black">
              <div className="text-center">
                <div className="text-purple-600">{frac1.num}</div>
                <div className="border-t-4 border-purple-600 w-16 mx-auto my-2"></div>
                <div className="text-purple-600">{frac1.den}</div>
              </div>
              <span className="text-gray-600">+</span>
              <div className="text-center">
                <div className="text-purple-600">{frac2.num}</div>
                <div className="border-t-4 border-purple-600 w-16 mx-auto my-2"></div>
                <div className="text-purple-600">{frac2.den}</div>
              </div>
              <span className="text-gray-600">=</span>
              <span className="text-orange-600">?</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswer(index)}
                disabled={showFeedback}
                className={`p-6 rounded-2xl font-black text-4xl transition-all ${
                  showFeedback
                    ? option.num === correctSum.num && option.den === correctSum.den
                      ? 'bg-green-500 text-white scale-105'
                      : index === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105'
                }`}
              >
                <div className="text-center">
                  <div>{option.num}</div>
                  <div className="border-t-2 border-white w-12 mx-auto my-1"></div>
                  <div>{option.den}</div>
                </div>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`mt-6 p-4 rounded-2xl text-center font-bold text-xl ${selectedAnswer !== null && options[selectedAnswer].num === correctSum.num && options[selectedAnswer].den === correctSum.den ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {selectedAnswer !== null &&
              options[selectedAnswer].num === correctSum.num &&
              options[selectedAnswer].den === correctSum.den
                ? '🎉 Harika!'
                : `❌ Yanlış! Doğru: ${correctSum.num}/${correctSum.den}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FractionAdditionGame;
