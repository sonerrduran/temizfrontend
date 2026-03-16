import React, { useState, useEffect } from 'react';

interface CompareSubtractionGameProps {
  onBack: () => void;
}

const CompareSubtractionGame: React.FC<CompareSubtractionGameProps> = ({ onBack }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [problem1, setProblem1] = useState({ num1: 0, num2: 0 });
  const [problem2, setProblem2] = useState({ num1: 0, num2: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
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
    const p1n1 = Math.floor(Math.random() * 50) + 30;
    const p1n2 = Math.floor(Math.random() * (p1n1 - 10)) + 5;

    const p2n1 = Math.floor(Math.random() * 50) + 30;
    const p2n2 = Math.floor(Math.random() * (p2n1 - 10)) + 5;

    setProblem1({ num1: p1n1, num2: p1n2 });
    setProblem2({ num1: p2n1, num2: p2n2 });
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const result1 = problem1.num1 - problem1.num2;
    const result2 = problem2.num1 - problem2.num2;

    let correctAnswer = '=';
    if (result1 > result2) correctAnswer = '>';
    else if (result1 < result2) correctAnswer = '<';

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

  const result1 = problem1.num1 - problem1.num2;
  const result2 = problem2.num1 - problem2.num2;
  let correctAnswer = '=';
  if (result1 > result2) correctAnswer = '>';
  else if (result1 < result2) correctAnswer = '<';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 p-4">
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
          <h3 className="text-3xl font-black text-purple-600 mb-8 text-center">
            Çıkarma Karşılaştır! ⚖️
          </h3>

          {/* Problems Display */}
          <div className="grid grid-cols-3 gap-4 mb-8 items-center">
            {/* Problem 1 */}
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 text-center border-4 border-blue-400">
              <div className="text-5xl font-black text-blue-600 mb-2">
                {problem1.num1} − {problem1.num2}
              </div>
              <div className="text-3xl font-bold text-gray-600">= {result1}</div>
            </div>

            {/* Question Mark */}
            <div className="text-8xl font-black text-purple-600 text-center">?</div>

            {/* Problem 2 */}
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 text-center border-4 border-green-400">
              <div className="text-5xl font-black text-green-600 mb-2">
                {problem2.num1} − {problem2.num2}
              </div>
              <div className="text-3xl font-bold text-gray-600">= {result2}</div>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-3 gap-4">
            {['<', '=', '>'].map((symbol, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswer(symbol)}
                disabled={showFeedback}
                className={`p-8 rounded-2xl font-black text-6xl transition-all ${
                  showFeedback
                    ? symbol === correctAnswer
                      ? 'bg-green-500 text-white scale-105'
                      : symbol === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-105 active:scale-95'
                }`}
              >
                {symbol}
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
                ? '🎉 Harika! Doğru karşılaştırdın!'
                : `❌ Yanlış! Doğru cevap: ${correctAnswer}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareSubtractionGame;
