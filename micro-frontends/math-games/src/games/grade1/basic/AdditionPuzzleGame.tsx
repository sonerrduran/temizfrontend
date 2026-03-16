import React, { useState, useEffect } from 'react';

interface AdditionPuzzleGameProps {
  onExit: () => void;
}

const AdditionPuzzleGame: React.FC<AdditionPuzzleGameProps> = ({ onExit }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const n1 = Math.floor(Math.random() * 5) + 1;
    const n2 = Math.floor(Math.random() * 5) + 1;
    const answer = n1 + n2;

    setNum1(n1);
    setNum2(n2);
    setCorrectAnswer(answer);

    // Generate 4 options including the correct answer
    const opts = [answer];
    while (opts.length < 4) {
      const wrongAnswer = Math.floor(Math.random() * 10) + 1;
      if (!opts.includes(wrongAnswer)) {
        opts.push(wrongAnswer);
      }
    }

    // Shuffle options
    setOptions(opts.sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setFeedback('');
  };

  const checkAnswer = (selected: number) => {
    setSelectedAnswer(selected);
    setShowFeedback(true);
    const isCorrect = selected === correctAnswer;

    if (isCorrect) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('✅ Puzzle tamamlandı!');
    } else {
      setFeedback(`❌ Yanlış parça! Doğru cevap: ${correctAnswer}`);
    }

    setTimeout(() => {
      if (level < 5) {
        setLevel(level + 1);
        generateQuestion();
        setShowFeedback(false);
      } else {
        const finalScore = isCorrect ? score + 10 + level * 5 : score;
        alert(`Oyun Bitti! Toplam Puanın: ${finalScore}`);
        onExit();
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all transform hover:scale-105 border border-red-500"
          >
            ← Çıkış
          </button>

          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700">
              <span className="text-white font-black">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black flex items-center justify-center gap-3">
            🧩 Toplama Puzzle
          </h1>
          <p className="text-slate-400 text-lg mt-2">Puan: {score}</p>
        </div>

        {/* Game Card - Koyu Lacivert (Dış Katman) */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* Question Card - Pink Gradient (Oyun Kutusu Rengi) */}
          <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 text-5xl md:text-6xl font-black text-white mb-6">
                <span>{num1}</span>
                <span>+</span>
                <span>{num2}</span>
                <span>=</span>
                <span>?</span>
              </div>
              <p className="text-white text-lg">Doğru puzzle parçasını seç!</p>
            </div>

            {/* Puzzle Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`relative p-6 rounded-2xl text-4xl font-black transition-all transform hover:scale-105 disabled:cursor-not-allowed ${
                    selectedAnswer === option
                      ? option === correctAnswer
                        ? 'bg-green-500 text-white scale-105'
                        : 'bg-red-500 text-white'
                      : 'bg-pink-700/40 text-white hover:bg-pink-700/60 border-2 border-pink-400'
                  }`}
                >
                  <div className="text-6xl mb-2">🧩</div>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div
              className={`mt-8 p-6 rounded-2xl text-center font-bold text-2xl ${
                feedback.includes('✅')
                  ? 'bg-green-500/90 border-2 border-green-300 text-white'
                  : 'bg-red-500/90 border-2 border-red-300 text-white'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdditionPuzzleGame;
