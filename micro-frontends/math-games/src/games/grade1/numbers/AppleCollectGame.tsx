import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const AppleCollectGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetNumber, setTargetNumber] = useState(3);
  const [collectedApples, setCollectedApples] = useState(0);
  const [apples, setApples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const target = Math.floor(Math.random() * (5 + level * 2)) + 1;
    setTargetNumber(target);
    setCollectedApples(0);
    setFeedback('');

    // Generate apples at random positions
    const newApples = Array.from({ length: target + 3 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 10,
    }));
    setApples(newApples);
  };

  const handleAppleClick = (id: number) => {
    const newCollected = collectedApples + 1;
    setCollectedApples(newCollected);
    setApples(apples.filter((a) => a.id !== id));

    if (newCollected === targetNumber) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback(`🎉 Harika! ${targetNumber} elma topladın!`);
      setShowCelebration(true);

      setTimeout(() => {
        setShowCelebration(false);
        if (level < 5) {
          setLevel(level + 1);
        } else {
          onComplete(score + points);
        }
      }, 2000);
    } else if (newCollected > targetNumber) {
      setFeedback('❌ Çok fazla elma topladın! Tekrar dene.');
      setTimeout(() => {
        generateLevel();
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
            🌳
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
            🍎 Elma Topla 🍎
          </h1>
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl px-8 py-4 inline-block shadow-2xl">
            <p className="text-white text-3xl font-black">{targetNumber} elma topla!</p>
          </div>
          <div className="mt-4 bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-3 inline-block">
            <p className="text-white text-2xl font-bold">
              Toplanan: {collectedApples} / {targetNumber}
            </p>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-green-600/30 to-emerald-600/30 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl min-h-[500px]">
          {apples.map((apple) => (
            <button
              key={apple.id}
              onClick={() => handleAppleClick(apple.id)}
              className="absolute text-7xl transition-all transform hover:scale-125 active:scale-95 cursor-pointer animate-bounce"
              style={{
                left: `${apple.x}%`,
                top: `${apple.y}%`,
                animationDuration: `${1 + Math.random()}s`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              🍎
            </button>
          ))}
        </div>

        {feedback && (
          <div
            className={`mt-8 text-center text-3xl font-black ${
              feedback.includes('Harika') ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {feedback}
          </div>
        )}

        <div className="mt-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-300/30">
          <h3 className="text-xl font-black text-cyan-300 mb-3">📋 Nasıl Oynanır?</h3>
          <ul className="text-white space-y-2">
            <li>• Ağaçtan düşen elmaları topla</li>
            <li>• İstenen sayı kadar elma topla</li>
            <li>• Fazla toplama, dikkatli ol!</li>
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

export default AppleCollectGame;
