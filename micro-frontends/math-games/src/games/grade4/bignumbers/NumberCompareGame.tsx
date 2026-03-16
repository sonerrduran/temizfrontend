import React, { useState, useEffect } from 'react';

interface NumberCompareGameProps {
  onBack: () => void;
}

const NumberCompareGame: React.FC<NumberCompareGameProps> = ({ onBack }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

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
    const n1 = Math.floor(Math.random() * 9000) + 1000;
    const n2 = Math.floor(Math.random() * 9000) + 1000;
    setNum1(n1);
    setNum2(n2);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    let correctAnswer = '=';
    if (num1 > num2) correctAnswer = '>';
    else if (num1 < num2) correctAnswer = '<';

    const correct = answer === correctAnswer;
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

  let correctAnswer = '=';
  if (num1 > num2) correctAnswer = '>';
  else if (num1 < num2) correctAnswer = '<';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 p-4">
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
            Büyük Sayı Karşılaştır ⚖️
          </h3>

          <div className="grid grid-cols-3 gap-4 mb-8 items-center">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 text-center border-4 border-blue-400">
              <div className="text-6xl font-black text-blue-600">{num1}</div>
            </div>
            <div className="text-8xl font-black text-purple-600 text-center">?</div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 text-center border-4 border-green-400">
              <div className="text-6xl font-black text-green-600">{num2}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {['<', '=', '>'].map((symbol) => (
              <button
                key={symbol}
                onClick={() => !showFeedback && handleAnswer(symbol)}
                disabled={showFeedback}
                className={`p-8 rounded-2xl font-black text-6xl transition-all ${
                  showFeedback
                    ? symbol === correctAnswer
                      ? 'bg-green-500 text-white scale-105'
                      : symbol === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-105'
                }`}
              >
                {symbol}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`mt-6 p-4 rounded-2xl text-center font-bold text-xl ${selectedAnswer === correctAnswer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {selectedAnswer === correctAnswer
                ? '🎉 Doğru!'
                : `❌ Yanlış! Doğru cevap: ${correctAnswer}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberCompareGame;
