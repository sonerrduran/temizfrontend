import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const SkipCountingGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [skipBy, setSkipBy] = useState(2);
  const [sequence, setSequence] = useState<number[]>([]);
  const [missingIndex, setMissingIndex] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, [level]);

  const generateQuestion = () => {
    const skip = level <= 2 ? 2 : level <= 4 ? 5 : 10;
    setSkipBy(skip);

    const length = 5;
    const start = Math.floor(Math.random() * 3) * skip;
    const seq = Array.from({ length }, (_, i) => start + i * skip);

    const missing = Math.floor(Math.random() * length);
    const correctAnswer = seq[missing];

    setSequence(seq);
    setMissingIndex(missing);

    // Generate options
    const opts = [correctAnswer];
    while (opts.length < 4) {
      const wrong =
        correctAnswer + (Math.random() < 0.5 ? -skip : skip) * (Math.floor(Math.random() * 2) + 1);
      if (wrong >= 0 && !opts.includes(wrong)) {
        opts.push(wrong);
      }
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
    setFeedback('');
  };

  const handleAnswer = (answer: number) => {
    const correct = sequence[missingIndex];

    if (answer === correct) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Harika! Doğru sayı!');
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
      setFeedback('❌ Tekrar dene!');
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 p-4 md:p-8 relative overflow-hidden">
      {/* Animated Background */}
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
            {['🦘', '🐸', '🐇', '🦗'][i % 4]}
          </div>
        ))}
      </div>

      {/* Header */}
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

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
            🦘 Atlayarak Sayma 🦘
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300 font-bold">
            {skipBy}'şer {skipBy}'şer say!
          </p>
        </div>

        {/* Game Area */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl px-8 py-4 shadow-xl">
              <p className="text-white text-2xl font-bold">
                {skipBy}'şer {skipBy}'şer sayıyoruz!
              </p>
            </div>
          </div>

          {/* Sequence */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {sequence.map((num, idx) => (
              <div
                key={idx}
                className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center text-4xl md:text-5xl font-black shadow-2xl transition-all transform hover:scale-105 ${
                  idx === missingIndex
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 animate-pulse'
                    : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
                }`}
              >
                {idx === missingIndex ? '?' : num}
              </div>
            ))}
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="h-24 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl font-black text-4xl transition-all transform hover:scale-105 shadow-xl"
              >
                {option}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`mt-8 text-center text-2xl font-black ${
                feedback.includes('Harika') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-300/30">
          <h3 className="text-xl font-black text-cyan-300 mb-3">📋 Nasıl Oynanır?</h3>
          <ul className="text-white space-y-2">
            <li>• Sayı dizisindeki eksik sayıyı bul</li>
            <li>
              • {skipBy}'şer {skipBy}'şer sayarak ilerle
            </li>
            <li>• Doğru cevabı seç ve puan kazan!</li>
          </ul>
        </div>
      </div>

      {/* Celebration */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">🦘</div>
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

export default SkipCountingGame;
