import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const NumberBuildingGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetNumber, setTargetNumber] = useState(5);
  const [currentCount, setCurrentCount] = useState(0);
  const [blocks, setBlocks] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, [level]);

  const generateQuestion = () => {
    const max = Math.min(5 + level * 2, 20);
    const target = Math.floor(Math.random() * max) + 1;
    setTargetNumber(target);
    setCurrentCount(0);
    setBlocks([]);
    setFeedback('');
  };

  const addBlock = () => {
    if (currentCount < targetNumber) {
      setBlocks([...blocks, currentCount]);
      setCurrentCount(currentCount + 1);

      if (currentCount + 1 === targetNumber) {
        checkAnswer();
      }
    }
  };

  const removeBlock = () => {
    if (currentCount > 0) {
      const newBlocks = blocks.slice(0, -1);
      setBlocks(newBlocks);
      setCurrentCount(currentCount - 1);
    }
  };

  const checkAnswer = () => {
    const points = 10 + level * 5;
    setScore(score + points);
    setFeedback('🎉 Mükemmel! Doğru sayıda blok koydun!');
    setShowCelebration(true);

    setTimeout(() => {
      setShowCelebration(false);
      if (level < 5) {
        setLevel(level + 1);
      } else {
        onComplete(score + points);
      }
    }, 2000);
  };

  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4 md:p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            🧱
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
            🧱 Sayı İnşaatı 🧱
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300 font-bold">Blokları say ve kule yap!</p>
        </div>

        {/* Game Area */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl px-12 py-8 shadow-2xl">
              <p className="text-white text-2xl font-bold mb-2">Hedef Sayı:</p>
              <p className="text-white text-8xl font-black">{targetNumber}</p>
            </div>
          </div>

          {/* Current Count */}
          <div className="text-center mb-8">
            <div className="inline-block bg-white/20 rounded-2xl px-8 py-4">
              <p className="text-white text-3xl font-black">
                Mevcut: {currentCount} / {targetNumber}
              </p>
            </div>
          </div>

          {/* Building Area */}
          <div className="flex justify-center items-end min-h-[400px] mb-8 relative">
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg"></div>
            <div className="flex flex-wrap justify-center items-end gap-2 max-w-4xl">
              {blocks.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-16 md:w-20 md:h-20 ${colors[idx % colors.length]} rounded-lg shadow-xl transform transition-all hover:scale-105 flex items-center justify-center text-white font-black text-2xl animate-in zoom-in`}
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                  }}
                >
                  {idx + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={addBlock}
              disabled={currentCount >= targetNumber}
              className="px-12 py-6 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-2xl font-black text-2xl transition-all transform hover:scale-105 shadow-xl"
            >
              ➕ Blok Ekle
            </button>
            <button
              onClick={removeBlock}
              disabled={currentCount === 0}
              className="px-12 py-6 bg-red-500 hover:bg-red-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-2xl font-black text-2xl transition-all transform hover:scale-105 shadow-xl"
            >
              ➖ Blok Çıkar
            </button>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="mt-8 text-center text-2xl font-black text-green-400">{feedback}</div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-300/30">
          <h3 className="text-xl font-black text-cyan-300 mb-3">📋 Nasıl Oynanır?</h3>
          <ul className="text-white space-y-2">
            <li>• Hedef sayı kadar blok ekle</li>
            <li>• Her blok bir sayıyı temsil eder</li>
            <li>• Doğru sayıya ulaşınca kazanırsın!</li>
          </ul>
        </div>
      </div>

      {/* Celebration */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">🏗️</div>
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

export default NumberBuildingGame;
