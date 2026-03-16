import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const ShapePaintingGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetShape, setTargetShape] = useState('');
  const [targetColor, setTargetColor] = useState('');
  const [shapes, setShapes] = useState<{ shape: string; color: string; id: number }[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const shapeTypes = ['⬜', '🔴', '🔺', '⭐', '❤️'];
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  const colorNames: Record<string, string> = {
    red: 'Kırmızı',
    blue: 'Mavi',
    green: 'Yeşil',
    yellow: 'Sarı',
    purple: 'Mor',
  };

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const count = Math.min(4 + level, 8);
    const target = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    setTargetShape(target);
    setTargetColor(color);

    const newShapes = Array.from({ length: count }, (_, i) => ({
      shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      id: i,
    }));

    // Ensure at least one correct answer exists
    if (!newShapes.some((s) => s.shape === target && s.color === color)) {
      newShapes[0] = { shape: target, color, id: 0 };
    }

    setShapes(newShapes);
    setSelectedId(null);
    setFeedback('');
  };

  const handleShapeClick = (id: number) => {
    const shape = shapes.find((s) => s.id === id);
    if (!shape) return;

    setSelectedId(id);

    if (shape.shape === targetShape && shape.color === targetColor) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Mükemmel! Doğru şekil ve renk!');
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
      setTimeout(() => {
        setSelectedId(null);
        setFeedback('');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all transform hover:scale-105"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">🎨 Şekil Boyama</h1>
          <p className="text-slate-400 text-lg mt-2">Doğru şekli doğru renkle bul!</p>
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* İç Kart - Pembe/Rose Gradient */}
          <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowRules(true)}
                className="px-4 py-2 bg-pink-700/40 hover:bg-pink-600/40 border-2 border-pink-300 text-white rounded-xl font-bold transition-all transform hover:scale-105"
              >
                📖 NASIL OYNANIR?
              </button>
            </div>

            {/* Target Display */}
            <div className="text-center mb-8">
              <div className="inline-block bg-pink-700/40 rounded-3xl px-12 py-8 border-2 border-pink-300">
                <p className="text-white text-2xl font-bold mb-4">Bul:</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-8xl">{targetShape}</span>
                  <span className="text-white text-4xl font-black">{colorNames[targetColor]}</span>
                </div>
              </div>
            </div>

            {/* Shape Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {shapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => handleShapeClick(shape.id)}
                  disabled={selectedId !== null}
                  className={`h-32 rounded-2xl flex items-center justify-center text-8xl transition-all transform border-4 ${
                    selectedId === shape.id
                      ? 'scale-110 border-yellow-400'
                      : 'hover:scale-105 border-white/30'
                  } ${selectedId === null ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  style={{
                    backgroundColor: shape.color,
                    opacity: selectedId !== null && selectedId !== shape.id ? 0.5 : 1,
                  }}
                >
                  {shape.shape}
                </button>
              ))}
            </div>

            {feedback && (
              <div
                className={`mt-8 text-center text-2xl font-black p-6 rounded-xl ${
                  feedback.includes('Mükemmel')
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

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">🎨</div>
        </div>
      )}

      {/* Kurallar Overlay */}
      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-pink-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-pink-400 font-bold">1.</span> Yukarıda gösterilen şekli ve
                rengi bul
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400 font-bold">2.</span> Doğru şekil ve renk
                kombinasyonunu seç
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400 font-bold">3.</span> Her doğru cevap puan kazandırır!
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400 font-bold">4.</span> 5 seviyeyi tamamla ve kazanan
                sen ol!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-500 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapePaintingGame;
