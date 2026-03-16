import React, { useState, useEffect } from 'react';

interface ShapeDetectiveGameProps {
  onBack: () => void;
}

interface Shape {
  id: number;
  emoji: string;
  name: string;
  type: 'angular' | 'round';
  selected: boolean;
}

const ShapeDetectiveGame: React.FC<ShapeDetectiveGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [targetType, setTargetType] = useState<'angular' | 'round'>('angular');
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const angularShapes = [
    { emoji: '🔷', name: 'Baklava' },
    { emoji: '🔶', name: 'Turuncu Baklava' },
    { emoji: '🔺', name: 'Üçgen' },
    { emoji: '🟦', name: 'Kare' },
    { emoji: '🟩', name: 'Dikdörtgen' },
    { emoji: '⭐', name: 'Yıldız' },
  ];

  const roundShapes = [
    { emoji: '🔵', name: 'Mavi Daire' },
    { emoji: '🔴', name: 'Kırmızı Daire' },
    { emoji: '🟢', name: 'Yeşil Daire' },
    { emoji: '🟡', name: 'Sarı Daire' },
    { emoji: '🟣', name: 'Mor Daire' },
    { emoji: '⚫', name: 'Siyah Daire' },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const target: 'angular' | 'round' = Math.random() > 0.5 ? 'angular' : 'round';
    setTargetType(target);

    const count = Math.min(6 + level, 10);
    const angularCount = Math.floor(count / 2);
    const roundCount = count - angularCount;

    const selectedAngular = [...angularShapes]
      .sort(() => Math.random() - 0.5)
      .slice(0, angularCount);
    const selectedRound = [...roundShapes].sort(() => Math.random() - 0.5).slice(0, roundCount);

    const allShapes = [
      ...selectedAngular.map((s, i) => ({ ...s, type: 'angular' as const, id: i })),
      ...selectedRound.map((s, i) => ({ ...s, type: 'round' as const, id: i + angularCount })),
    ].sort(() => Math.random() - 0.5);

    setShapes(allShapes.map((s) => ({ ...s, selected: false })));
    setFeedback('');
  };

  const handleShapeClick = (shapeId: number) => {
    const shape = shapes.find((s) => s.id === shapeId);
    if (!shape || shape.selected) return;

    if (shape.type === targetType) {
      const newShapes = shapes.map((s) => (s.id === shapeId ? { ...s, selected: true } : s));
      setShapes(newShapes);
      setScore(score + 10);
      setFeedback('✅ Doğru!');

      const remainingTarget = newShapes.filter((s) => s.type === targetType && !s.selected);
      if (remainingTarget.length === 0) {
        setTimeout(() => {
          if (level < 5) {
            setLevel(level + 1);
          } else {
            setShowCelebration(true);
          }
        }, 1500);
      } else {
        setTimeout(() => setFeedback(''), 1000);
      }
    } else {
      setFeedback('❌ Yanlış tip!');
      setTimeout(() => setFeedback(''), 1000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setShowCelebration(false);
    generateLevel();
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-12 text-center border border-blue-500/30 max-w-2xl">
          <div className="text-8xl mb-6">🔍🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Mükemmel!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Tüm şekilleri doğru ayırdın!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 hover:from-blue-400 hover:to-cyan-500 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
            >
              Tekrar Oyna
            </button>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
            >
              Menüye Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
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
          <h1 className="text-white text-4xl md:text-5xl font-black">🔍 Şekil Dedektifi</h1>
          <p className="text-slate-400 text-lg mt-2">Köşeli ve yuvarlak nesneleri ayır!</p>
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* İç Kart - Mavi/Cyan Gradient */}
          <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowRules(true)}
                className="px-4 py-2 bg-blue-700/40 hover:bg-blue-600/40 border-2 border-blue-300 text-white rounded-xl font-bold transition-all transform hover:scale-105"
              >
                📖 NASIL OYNANIR?
              </button>
            </div>

            {/* Target Display */}
            <div className="bg-blue-700/40 rounded-2xl p-6 mb-6 border-2 border-blue-300 text-center">
              <h3 className="text-2xl font-black text-white mb-2">
                {targetType === 'angular' ? '📐 KÖŞELİ' : '⭕ YUVARLAK'} şekilleri bul!
              </h3>
              <p className="text-white/80 text-lg">
                {targetType === 'angular'
                  ? 'Köşeleri olan şekillere tıkla'
                  : 'Yuvarlak şekillere tıkla'}
              </p>
            </div>

            {/* Shapes Grid */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {shapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => handleShapeClick(shape.id)}
                  disabled={shape.selected}
                  className={`aspect-square rounded-2xl text-6xl flex items-center justify-center transition-all transform ${
                    shape.selected
                      ? 'bg-green-500/40 border-2 border-green-300 scale-95 opacity-50'
                      : 'bg-blue-800/40 border-2 border-blue-300 hover:scale-105 hover:bg-blue-700/40'
                  } disabled:cursor-not-allowed`}
                >
                  {shape.emoji}
                </button>
              ))}
            </div>

            {feedback && (
              <div
                className={`mt-6 text-center text-2xl font-black p-6 rounded-xl ${
                  feedback.includes('✅')
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

      {/* Kurallar Overlay */}
      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-blue-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">1.</span> Köşeli veya yuvarlak şekilleri
                bul
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">2.</span> Doğru tip şekillere tıkla
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">3.</span> Her doğru seçim puan kazandırır
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">4.</span> Tüm hedef şekilleri bul ve
                seviyeyi tamamla!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 hover:from-blue-400 hover:to-cyan-500 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapeDetectiveGame;
