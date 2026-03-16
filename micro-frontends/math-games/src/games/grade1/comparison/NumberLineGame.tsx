import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const NumberLineGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetNumber, setTargetNumber] = useState(5);
  const [maxNumber, setMaxNumber] = useState(10);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, [level]);

  const generateQuestion = () => {
    const max = Math.min(10 + level * 5, 50);
    setMaxNumber(max);
    setTargetNumber(Math.floor(Math.random() * (max - 1)) + 1);
    setSelectedNumber(null);
    setFeedback('');
  };

  const handleNumberClick = (num: number) => {
    setSelectedNumber(num);

    if (num === targetNumber) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Mükemmel! Doğru sayıyı buldun!');
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
      setFeedback(num < targetNumber ? '⬆️ Daha büyük bir sayı!' : '⬇️ Daha küçük bir sayı!');
      setTimeout(() => {
        setSelectedNumber(null);
        setFeedback('');
      }, 1500);
    }
  };

  const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            {(i % 10) + 1}
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
            🎯 Sayı Doğrusu 🎯
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300 font-bold">Doğru sayıyı bul!</p>
        </div>

        {/* Game Area */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl px-12 py-8 shadow-2xl transform hover:scale-105 transition-all">
              <p className="text-white text-2xl font-bold mb-2">Bul:</p>
              <p className="text-white text-8xl font-black">{targetNumber}</p>
            </div>
          </div>

          {/* Number Line */}
          <div className="relative">
            <div className="flex flex-wrap justify-center gap-3">
              {numbers.map((num) => {
                const isSelected = selectedNumber === num;
                const isTarget = num === targetNumber;
                const isCorrect = isSelected && isTarget;
                const isWrong = isSelected && !isTarget;

                return (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num)}
                    disabled={selectedNumber !== null}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-xl font-black text-2xl transition-all transform ${
                      isCorrect
                        ? 'bg-green-500 text-white scale-125 shadow-2xl'
                        : isWrong
                          ? 'bg-red-500 text-white scale-90'
                          : 'bg-white/20 text-white hover:bg-white/30 hover:scale-110'
                    } ${selectedNumber === null ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`mt-8 text-center text-2xl font-black ${
                feedback.includes('Mükemmel') ? 'text-green-400' : 'text-yellow-400'
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
            <li>• Yukarıda gösterilen sayıyı bul</li>
            <li>• Sayı doğrusundan doğru sayıya tıkla</li>
            <li>• İpuçları sana yardımcı olacak!</li>
          </ul>
        </div>
      </div>

      {/* Celebration */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">🎯</div>
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

export default NumberLineGame;
