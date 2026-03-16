import React, { useState, useEffect } from 'react';

interface ExponentPuzzleGameProps {
  onBack: () => void;
}

const ExponentPuzzleGame: React.FC<ExponentPuzzleGameProps> = ({ onBack }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [base, setBase] = useState(2);
  const [exponent, setExponent] = useState(2);
  const [result, setResult] = useState(4);
  const [questionType, setQuestionType] = useState<'base' | 'exponent' | 'result'>('result');
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
    const bases = [2, 3, 4, 5];
    const exponents = [2, 3, 4];

    const b = bases[Math.floor(Math.random() * bases.length)];
    const e = exponents[Math.floor(Math.random() * exponents.length)];
    const r = Math.pow(b, e);

    setBase(b);
    setExponent(e);
    setResult(r);

    const types: ('base' | 'exponent' | 'result')[] = ['result', 'exponent'];
    const qType = types[Math.floor(Math.random() * types.length)];
    setQuestionType(qType);

    let correctAnswer: number;
    let wrongOptions: number[];

    if (qType === 'result') {
      correctAnswer = r;
      wrongOptions = [r + 1, r - 1, r * 2].filter((n) => n > 0);
    } else if (qType === 'exponent') {
      correctAnswer = e;
      wrongOptions = [e + 1, e - 1, e + 2].filter((n) => n > 0 && n <= 5);
    } else {
      correctAnswer = b;
      wrongOptions = [b + 1, b - 1, b + 2].filter((n) => n > 0);
    }

    const allOptions = [correctAnswer, ...wrongOptions.slice(0, 3)].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    let correctAnswer: number;
    if (questionType === 'result') correctAnswer = result;
    else if (questionType === 'exponent') correctAnswer = exponent;
    else correctAnswer = base;

    const correct = answer === correctAnswer;
    if (correct) setScore(score + 15);

    setTimeout(() => {
      if (round < 10) {
        setRound(round + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        alert(`Oyun Bitti! Skorun: ${score + (correct ? 15 : 0)}`);
        onBack();
      }
    }, 1500);
  };

  const getCorrectAnswer = () => {
    if (questionType === 'result') return result;
    if (questionType === 'exponent') return exponent;
    return base;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-600 via-orange-500 to-red-600 p-4">
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
          <h3 className="text-3xl font-black text-orange-600 mb-8 text-center">Üslü Puzzle 🧩</h3>

          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-12 mb-8 border-4 border-yellow-400">
            <div className="flex items-center justify-center gap-8 text-5xl font-black">
              {questionType === 'base' ? (
                <>
                  <span className="text-orange-600">?</span>
                  <sup className="text-3xl text-purple-600">{exponent}</sup>
                  <span className="text-gray-600">=</span>
                  <span className="text-green-600">{result}</span>
                </>
              ) : questionType === 'exponent' ? (
                <>
                  <span className="text-orange-600">{base}</span>
                  <sup className="text-3xl text-purple-600">?</sup>
                  <span className="text-gray-600">=</span>
                  <span className="text-green-600">{result}</span>
                </>
              ) : (
                <>
                  <span className="text-orange-600">{base}</span>
                  <sup className="text-3xl text-purple-600">{exponent}</sup>
                  <span className="text-gray-600">=</span>
                  <span className="text-green-600">?</span>
                </>
              )}
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
                    ? option === getCorrectAnswer()
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
              className={`mt-6 p-4 rounded-2xl text-center font-bold text-xl ${selectedAnswer === getCorrectAnswer() ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {selectedAnswer === getCorrectAnswer()
                ? '🎉 Mükemmel!'
                : `❌ Yanlış! Doğru: ${getCorrectAnswer()}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExponentPuzzleGame;
