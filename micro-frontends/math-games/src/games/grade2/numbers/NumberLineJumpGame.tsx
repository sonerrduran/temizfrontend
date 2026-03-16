import React, { useState, useEffect } from 'react';

interface NumberLineJumpGameProps {
  onBack: () => void;
}

const NumberLineJumpGame: React.FC<NumberLineJumpGameProps> = ({ onBack }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [startNum, setStartNum] = useState(0);
  const [jump, setJump] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
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
    const start = Math.floor(Math.random() * 80) + 10;
    const jumpSize = Math.floor(Math.random() * 15) + 5;

    setStartNum(start);
    setJump(jumpSize);

    const correctAnswer = start + jumpSize;
    const wrongOptions = [correctAnswer + 5, correctAnswer - 5, correctAnswer + 10];

    const allOptions = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5).slice(0, 3);

    setOptions(allOptions);
  };

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const correctAnswer = startNum + jump;
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

  const correctAnswer = startNum + jump;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-600 via-blue-500 to-indigo-500 p-4">
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
          <h3 className="text-3xl font-black text-blue-600 mb-8 text-center">
            Sayı Doğrusunda Zıpla! 🦘
          </h3>

          {/* Number Line Visual */}
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 mb-8 border-4 border-green-400">
            <div className="text-center mb-6">
              <div className="text-6xl font-black text-blue-600 mb-2">{startNum}</div>
              <div className="text-2xl font-bold text-gray-700 mb-4">+{jump} ileri git</div>
              <div className="text-5xl">🦘➡️</div>
            </div>

            {/* Simple number line */}
            <div className="flex justify-center items-center gap-2 mt-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-black text-xl">
                {startNum}
              </div>
              <div className="flex-1 h-2 bg-blue-300 rounded-full relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
                  ➡️
                </div>
              </div>
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-black text-xl">
                ?
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-3 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswer(option)}
                disabled={showFeedback}
                className={`p-8 rounded-2xl font-black text-4xl transition-all ${
                  showFeedback
                    ? option === correctAnswer
                      ? 'bg-green-500 text-white scale-105'
                      : option === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-105 active:scale-95'
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
                ? '🎉 Doğru! Harika zıpladın!'
                : `❌ Yanlış! Doğru cevap: ${correctAnswer}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberLineJumpGame;
