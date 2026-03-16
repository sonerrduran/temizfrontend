import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const ShapeHunterGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetShape, setTargetShape] = useState('');
  const [shapes, setShapes] = useState<{ shape: string; emoji: string; id: number }[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [foundCount, setFoundCount] = useState(0);
  const [totalTarget, setTotalTarget] = useState(0);

  const shapeData = [
    { name: 'Kare', emoji: '🟦' },
    { name: 'Daire', emoji: '🔵' },
    { name: 'Üçgen', emoji: '🔺' },
    { name: 'Yıldız', emoji: '⭐' },
    { name: 'Kalp', emoji: '❤️' },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const target = shapeData[Math.floor(Math.random() * shapeData.length)];
    setTargetShape(target.name);

    const numShapes = Math.min(8 + level * 2, 20);
    const targetCount = Math.floor(numShapes / 4) + 2;
    setTotalTarget(targetCount);
    setFoundCount(0);

    const newShapes = [];

    // Add target shapes
    for (let i = 0; i < targetCount; i++) {
      newShapes.push({
        shape: target.name,
        emoji: target.emoji,
        id: newShapes.length,
      });
    }

    // Add other shapes
    while (newShapes.length < numShapes) {
      const otherShape = shapeData.filter((s) => s.name !== target.name)[
        Math.floor(Math.random() * (shapeData.length - 1))
      ];
      newShapes.push({
        shape: otherShape.name,
        emoji: otherShape.emoji,
        id: newShapes.length,
      });
    }

    setShapes(newShapes.sort(() => Math.random() - 0.5));
    setFeedback('');
  };

  const handleClick = (id: number) => {
    const clickedShape = shapes[id];

    if (clickedShape.shape === targetShape) {
      const newShapes = shapes.filter((s) => s.id !== id);
      setShapes(newShapes);

      const newFoundCount = foundCount + 1;
      setFoundCount(newFoundCount);

      if (newFoundCount >= totalTarget) {
        const points = 10 + level * 5;
        setScore(score + points);
        setFeedback('🎉 Harika! Tüm şekilleri buldun!');
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
      setFeedback('❌ Yanlış şekil! Tekrar dene.');
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4 md:p-8 relative overflow-hidden">
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
            🔍
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
            🔍 Şekil Avcısı 🔍
          </h1>
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl px-8 py-4 inline-block shadow-2xl mb-4">
            <p className="text-white text-3xl font-black">{targetShape} şekillerini bul!</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-3 inline-block">
            <p className="text-white text-2xl font-bold">
              Bulunan: {foundCount} / {totalTarget}
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {shapes.map((shape) => (
              <button
                key={shape.id}
                onClick={() => handleClick(shape.id)}
                className="aspect-square bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 rounded-2xl text-6xl transition-all transform hover:scale-110 shadow-xl flex items-center justify-center"
              >
                {shape.emoji}
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
            <li>• İstenen şekli bul</li>
            <li>• Tüm aynı şekilleri seç</li>
            <li>• Yanlış şekil seçme!</li>
          </ul>
        </div>
      </div>

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">🔍</div>
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

export default ShapeHunterGame;
