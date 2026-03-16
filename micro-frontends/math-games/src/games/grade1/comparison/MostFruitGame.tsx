import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const MostFruitGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [fruits, setFruits] = useState<{ emoji: string; count: number; name: string }[]>([]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const fruitData = [
    { emoji: '🍎', name: 'Elma' },
    { emoji: '🍌', name: 'Muz' },
    { emoji: '🍊', name: 'Portakal' },
    { emoji: '🍇', name: 'Üzüm' },
    { emoji: '🍓', name: 'Çilek' },
    { emoji: '🍉', name: 'Karpuz' },
    { emoji: '🍒', name: 'Kiraz' },
    { emoji: '🍑', name: 'Şeftali' },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const numFruits = Math.min(3 + Math.floor(level / 2), 5);
    const selectedFruits = [...fruitData].sort(() => Math.random() - 0.5).slice(0, numFruits);

    const newFruits = selectedFruits.map((fruit) => ({
      emoji: fruit.emoji,
      name: fruit.name,
      count: Math.floor(Math.random() * (5 + level * 2)) + 1,
    }));

    const maxCount = Math.max(...newFruits.map((f) => f.count));
    const correctIdx = newFruits.findIndex((f) => f.count === maxCount);

    setFruits(newFruits);
    setCorrectIndex(correctIdx);
    setFeedback('');
  };

  const handleAnswer = (index: number) => {
    if (index === correctIndex) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Doğru! En çok olanı buldun!');
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
      setFeedback('❌ Yanlış! Daha fazla olanı bul.');
      setTimeout(() => {
        setFeedback('');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-4 md:p-8 relative overflow-hidden">
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
            🍎
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
            🍎 En Çok Hangisi? 🍎
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300 font-bold">Hangi meyve daha fazla?</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fruits.map((fruit, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-2xl p-6 transition-all transform hover:scale-105 shadow-xl"
              >
                <div className="text-center mb-4">
                  <h3 className="text-white text-2xl font-black mb-2">{fruit.name}</h3>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-4 min-h-[120px]">
                  {Array.from({ length: fruit.count }).map((_, i) => (
                    <span key={i} className="text-5xl">
                      {fruit.emoji}
                    </span>
                  ))}
                </div>
                <div className="bg-white/20 rounded-xl px-4 py-2">
                  <span className="text-white text-3xl font-black">{fruit.count}</span>
                </div>
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
            <li>• Meyveleri say</li>
            <li>• En çok olanı bul</li>
            <li>• Sayıları karşılaştır!</li>
          </ul>
        </div>
      </div>

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">🍎</div>
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

export default MostFruitGame;
