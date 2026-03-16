import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const ColorDetectiveGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetColor, setTargetColor] = useState('');
  const [objects, setObjects] = useState<{ emoji: string; color: string; id: number }[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const colorData = [
    {
      name: 'Kırmızı',
      emojis: ['🍎', '🍓', '🌹', '❤️', '🔴'],
      bgClass: 'from-red-500 to-rose-600',
    },
    { name: 'Mavi', emojis: ['💙', '🔵', '🦋', '🐟', '🌊'], bgClass: 'from-blue-500 to-cyan-600' },
    {
      name: 'Yeşil',
      emojis: ['🍏', '🌿', '🌳', '💚', '🟢'],
      bgClass: 'from-green-500 to-emerald-600',
    },
    {
      name: 'Sarı',
      emojis: ['🌟', '🍋', '🌻', '💛', '🟡'],
      bgClass: 'from-yellow-500 to-amber-600',
    },
    {
      name: 'Turuncu',
      emojis: ['🍊', '🧡', '🟠', '🥕', '🦊'],
      bgClass: 'from-orange-500 to-amber-600',
    },
    {
      name: 'Mor',
      emojis: ['💜', '🟣', '🍇', '🦄', '🔮'],
      bgClass: 'from-purple-500 to-violet-600',
    },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const target = colorData[Math.floor(Math.random() * colorData.length)];
    setTargetColor(target.name);

    const numObjects = Math.min(6 + level * 2, 12);
    const targetCount = Math.floor(numObjects / 3) + 1;

    const newObjects = [];

    // Add target color objects
    for (let i = 0; i < targetCount; i++) {
      newObjects.push({
        emoji: target.emojis[Math.floor(Math.random() * target.emojis.length)],
        color: target.name,
        id: newObjects.length,
      });
    }

    // Add other color objects
    while (newObjects.length < numObjects) {
      const otherColor = colorData.filter((c) => c.name !== target.name)[
        Math.floor(Math.random() * (colorData.length - 1))
      ];
      newObjects.push({
        emoji: otherColor.emojis[Math.floor(Math.random() * otherColor.emojis.length)],
        color: otherColor.name,
        id: newObjects.length,
      });
    }

    setObjects(newObjects.sort(() => Math.random() - 0.5));
    setFeedback('');
  };

  const handleClick = (id: number) => {
    const clickedObject = objects[id];

    if (clickedObject.color === targetColor) {
      const newObjects = objects.filter((obj) => obj.id !== id);
      setObjects(newObjects);

      const remainingTarget = newObjects.filter((obj) => obj.color === targetColor).length;

      if (remainingTarget === 0) {
        const points = 10 + level * 5;
        setScore(score + points);
        setFeedback('🎉 Harika! Tüm renkleri buldun!');
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
        setFeedback('✅ Doğru! Devam et!');
        setTimeout(() => setFeedback(''), 800);
      }
    } else {
      setFeedback('❌ Yanlış renk! Tekrar dene.');
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 p-4 md:p-8 relative overflow-hidden">
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
            🎨
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
            🎨 Renk Dedektifi 🎨
          </h1>
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl px-8 py-4 inline-block shadow-2xl">
            <p className="text-white text-3xl font-black">{targetColor} renkte olanları bul!</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {objects.map((obj) => (
              <button
                key={obj.id}
                onClick={() => handleClick(obj.id)}
                className="aspect-square bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 rounded-2xl text-6xl transition-all transform hover:scale-110 shadow-xl flex items-center justify-center"
              >
                {obj.emoji}
              </button>
            ))}
          </div>

          {feedback && (
            <div
              className={`mt-8 text-center text-3xl font-black ${
                feedback.includes('Harika') || feedback.includes('Doğru')
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-300/30">
          <h3 className="text-xl font-black text-cyan-300 mb-3">📋 Nasıl Oynanır?</h3>
          <ul className="text-white space-y-2">
            <li>• İstenen renkteki nesneleri bul</li>
            <li>• Tüm aynı renkteki nesneleri seç</li>
            <li>• Yanlış renk seçme!</li>
          </ul>
        </div>
      </div>

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">🎨</div>
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

export default ColorDetectiveGame;
