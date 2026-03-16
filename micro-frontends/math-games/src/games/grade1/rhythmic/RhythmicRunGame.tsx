import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const RhythmicRunGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [skipBy, setSkipBy] = useState(2);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const skipValues = [2, 5, 10];
    const skip = skipValues[Math.min(level - 1, 2)];
    setSkipBy(skip);
    setCurrentNumber(0);
    setQuestionsAnswered(0);
    generateQuestion(0, skip);
  };

  const generateQuestion = (current: number, skip: number) => {
    const correctAnswer = current + skip;
    const wrongOptions = [
      correctAnswer + 1,
      correctAnswer - 1,
      correctAnswer + skip,
      correctAnswer - skip,
    ].filter((n) => n > 0 && n !== correctAnswer);

    const shuffled = [correctAnswer, ...wrongOptions.slice(0, 2)].sort(() => Math.random() - 0.5);

    setOptions(shuffled);
    setFeedback('');
  };

  const handleAnswer = (selected: number) => {
    const correctAnswer = currentNumber + skipBy;

    if (selected === correctAnswer) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Doğru!');
      setCurrentNumber(correctAnswer);

      const newQuestionsAnswered = questionsAnswered + 1;
      setQuestionsAnswered(newQuestionsAnswered);

      if (newQuestionsAnswered >= 5) {
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
          if (level < 5) {
            setLevel(level + 1);
          } else {
            onComplete(score + points);
          }
        }, 2000);
      } else {
        setTimeout(() => {
          generateQuestion(correctAnswer, skipBy);
        }, 1000);
      }
    } else {
      setFeedback('❌ Yanlış! Tekrar dene.');
      setTimeout(() => {
        setFeedback('');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-900 via-green-900 to-emerald-900 p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-5xl opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            🏃
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
              <span className="text-white font-black text-xl">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-yellow-500/90 backdrop-blur-xl rounded-xl border border-yellow-300/50">
              <span className="text-white font-black text-xl">⭐ {score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
            🏃 Ritmik Koşu 🏃
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300 font-bold">{skipBy}'şer sayarak koş!</p>
          <div className="mt-4 bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-3 inline-block">
            <p className="text-white text-2xl font-bold">Soru: {questionsAnswered + 1} / 5</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-lime-400 to-green-500 rounded-3xl px-12 py-8 shadow-2xl">
              <p className="text-white text-2xl font-bold mb-4">Şu an:</p>
              <span className="text-9xl font-black text-white">{currentNumber}</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-white text-3xl font-black mb-4">
              {skipBy}'şer atlayarak sonraki sayı hangisi?
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="h-32 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl font-black text-6xl transition-all transform hover:scale-105 shadow-xl"
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <div
              className={`mt-8 text-center text-3xl font-black ${
                feedback.includes('Doğru') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-300/30">
          <h3 className="text-xl font-black text-cyan-300 mb-3">📋 Nasıl Oynanır?</h3>
          <ul className="text-white space-y-2">
            <li>• {skipBy}'şer atlayarak say</li>
            <li>• Doğru sayıya zıpla</li>
            <li>• 5 soruyu doğru cevapla!</li>
          </ul>
        </div>
      </div>

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">🏃</div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default RhythmicRunGame;
