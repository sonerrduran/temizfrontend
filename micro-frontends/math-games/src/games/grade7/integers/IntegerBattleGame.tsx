import React, { useState, useEffect } from 'react';

interface IntegerBattleGameProps {
  onBack: () => void;
}

const IntegerBattleGame: React.FC<IntegerBattleGameProps> = ({ onBack }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState('+');
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
    const ops = ['+', '-'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    setOperation(op);

    const n1 = Math.floor(Math.random() * 21) - 10; // -10 to 10
    const n2 = Math.floor(Math.random() * 21) - 10;
    setNum1(n1);
    setNum2(n2);

    const correctAnswer = op === '+' ? n1 + n2 : n1 - n2;
    const wrongOptions = [
      correctAnswer + Math.floor(Math.random() * 5) + 1,
      correctAnswer - Math.floor(Math.random() * 5) - 1,
      -correctAnswer,
    ];

    const allOptions = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;
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

  const correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 p-4">
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
          <h3 className="text-3xl font-black text-red-600 mb-8 text-center">
            Pozitif-Negatif Savaşı ⚔️
          </h3>

          <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-12 mb-8 border-4 border-red-400">
            <div className="flex items-center justify-center gap-8 text-6xl font-black">
              <span className={num1 >= 0 ? 'text-green-600' : 'text-red-600'}>{num1}</span>
              <span className="text-gray-600">{operation}</span>
              <span className={num2 >= 0 ? 'text-green-600' : 'text-red-600'}>{num2}</span>
              <span className="text-gray-600">=</span>
              <span className="text-purple-600">?</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswer(option)}
                disabled={showFeedback}
                className={`p-6 rounded-2xl font-black text-4xl transition-all ${
                  showFeedback
                    ? option === correctAnswer
                      ? 'bg-green-500 text-white scale-105'
                      : option === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`mt-6 p-4 rounded-2xl text-center font-bold text-xl ${selectedAnswer === correctAnswer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {selectedAnswer === correctAnswer
                ? '🎉 Harika!'
                : `❌ Yanlış! Doğru: ${correctAnswer}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegerBattleGame;
