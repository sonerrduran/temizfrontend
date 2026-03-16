import React, { useState, useEffect } from 'react';

interface ShapeCountGameProps {
  onBack: () => void;
}

const shapes = [
  { name: 'Üçgen', emoji: '🔺', sides: 3 },
  { name: 'Kare', emoji: '🟦', sides: 4 },
  { name: 'Daire', emoji: '🔵', sides: 0 },
  { name: 'Dikdörtgen', emoji: '🟩', sides: 4 },
];

const ShapeCountGame: React.FC<ShapeCountGameProps> = ({ onBack }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [targetShape, setTargetShape] = useState(shapes[0]);
  const [shapeArray, setShapeArray] = useState<typeof shapes>([]);
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
    const target = shapes[Math.floor(Math.random() * shapes.length)];
    const count = Math.floor(Math.random() * 8) + 3;

    const array: typeof shapes = [];
    for (let i = 0; i < count; i++) {
      array.push(target);
    }

    // Add some other shapes
    const otherCount = Math.floor(Math.random() * 5) + 2;
    for (let i = 0; i < otherCount; i++) {
      const otherShape = shapes.filter((s) => s.name !== target.name)[
        Math.floor(Math.random() * 3)
      ];
      array.push(otherShape);
    }

    // Shuffle
    array.sort(() => Math.random() - 0.5);

    setTargetShape(target);
    setShapeArray(array);

    const wrongOptions = [count + 1, count - 1, count + 2].filter((v) => v > 0);
    const allOptions = [count, ...wrongOptions.slice(0, 2)].sort(() => Math.random() - 0.5);

    setOptions(allOptions);
  };

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const correctAnswer = shapeArray.filter((s) => s.name === targetShape.name).length;
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

  const correctAnswer = shapeArray.filter((s) => s.name === targetShape.name).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 p-4">
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
          <h3 className="text-3xl font-black text-blue-600 mb-4 text-center">Şekil Sayma</h3>
          <p className="text-xl font-bold text-gray-600 mb-8 text-center">
            Kaç tane <span className="text-blue-600">{targetShape.name}</span> var?
          </p>

          {/* Shapes Display */}
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 mb-8 border-4 border-yellow-400">
            <div className="flex flex-wrap justify-center gap-4">
              {shapeArray.map((shape, index) => (
                <div key={index} className="text-6xl">
                  {shape.emoji}
                </div>
              ))}
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
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 active:scale-95'
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
                ? '🎉 Harika! Doğru saydın!'
                : `❌ Yanlış! Doğru cevap: ${correctAnswer}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShapeCountGame;
