import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const EstimateJarGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [actualCount, setActualCount] = useState(0);
  const [itemEmoji, setItemEmoji] = useState('');
  const [itemName, setItemName] = useState('');
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const items = [
    { emoji: '🍬', name: 'Şeker' },
    { emoji: '⚽', name: 'Top' },
    { emoji: '🎈', name: 'Balon' },
    { emoji: '🍎', name: 'Elma' },
    { emoji: '🍪', name: 'Kurabiye' },
    { emoji: '🌟', name: 'Yıldız' },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const item = items[Math.floor(Math.random() * items.length)];
    const count = Math.floor(Math.random() * (10 + level * 5)) + 5;

    setItemEmoji(item.emoji);
    setItemName(item.name);
    setActualCount(count);
    setShowAnswer(false);

    // Generate options (close estimates)
    const option1 = count;
    const option2 = count + Math.floor(Math.random() * 5) + 1;
    const option3 = count - Math.floor(Math.random() * 5) - 1;

    setOptions([option1, option2, option3].sort(() => Math.random() - 0.5));
    setFeedback('');
  };

  const handleAnswer = (selected: number) => {
    setShowAnswer(true);

    const difference = Math.abs(selected - actualCount);

    if (difference === 0) {
      const points = 15 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Mükemmel! Tam bildin!');
      setShowCelebration(true);

      setTimeout(() => {
        setShowCelebration(false);
        if (level < 5) {
          setLevel(level + 1);
        } else {
          onComplete(score + points);
        }
      }, 2500);
    } else if (difference <= 2) {
      const points = 10 + level * 3;
      setScore(score + points);
      setFeedback('✅ Çok yakın! İyi tahmin!');

      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
        } else {
          onComplete(score + points);
        }
      }, 2500);
    } else {
      setFeedback(`❌ Gerçek sayı: ${actualCount}`);
      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
        } else {
          onComplete(score);
        }
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-yellow-900 p-4 md:p-8 relative overflow-hidden">
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
            🎯
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
            🎯 Tahmin Et 🎯
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300 font-bold">
            Kavanozda kaç tane {itemName} var?
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          {/* Jar visualization */}
          <div className="flex justify-center mb-8">
            <div className="relative w-64 h-80 bg-gradient-to-b from-cyan-200/30 to-cyan-400/30 rounded-3xl border-8 border-cyan-300/50 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 flex flex-wrap content-start justify-center p-4 gap-1">
                {Array.from({ length: Math.min(actualCount, 50) }).map((_, i) => (
                  <span
                    key={i}
                    className="text-3xl"
                    style={{
                      transform: `rotate(${Math.random() * 360}deg)`,
                      opacity: 0.8 + Math.random() * 0.2,
                    }}
                  >
                    {itemEmoji}
                  </span>
                ))}
              </div>
              {actualCount > 50 && (
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent flex items-end justify-center pb-4">
                  <span className="text-white text-2xl font-black">...</span>
                </div>
              )}
            </div>
          </div>

          {showAnswer && (
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl px-8 py-4 inline-block shadow-xl">
                <p className="text-white text-3xl font-black">Gerçek Sayı: {actualCount}</p>
              </div>
            </div>
          )}

          <div className="text-center mb-8">
            <p className="text-white text-2xl font-bold">Tahminin nedir?</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={showAnswer}
                className="h-24 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white rounded-2xl font-black text-5xl transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <div
              className={`mt-8 text-center text-3xl font-black ${
                feedback.includes('Mükemmel') || feedback.includes('yakın')
                  ? 'text-green-400'
                  : 'text-yellow-400'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-300/30">
          <h3 className="text-xl font-black text-cyan-300 mb-3">📋 Nasıl Oynanır?</h3>
          <ul className="text-white space-y-2">
            <li>• Kavanoza bak ve tahmin et</li>
            <li>• Tam bilirsen daha çok puan!</li>
            <li>• Yakın tahmin de puan kazandırır</li>
          </ul>
        </div>
      </div>

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

export default EstimateJarGame;
