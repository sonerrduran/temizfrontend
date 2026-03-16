import React, { useState, useEffect } from 'react';

interface ShapeHuntGameProps {
  onBack: () => void;
}

type ShapeType = 'circle' | 'square' | 'triangle' | 'rectangle' | 'star';

interface Shape {
  id: number;
  type: ShapeType;
  x: number;
  y: number;
  size: number;
  color: string;
}

const SHAPE_NAMES: Record<ShapeType, string> = {
  circle: '🔵 Daire',
  square: '🟦 Kare',
  triangle: '🔺 Üçgen',
  rectangle: '🟩 Dikdörtgen',
  star: '⭐ Yıldız',
};

const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

const ShapeHuntGame: React.FC<ShapeHuntGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [targetShape, setTargetShape] = useState<ShapeType>('circle');
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);
  const [showRules, setShowRules] = useState(true);

  useEffect(() => {
    generateShapes();
  }, [level]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver && !showRules) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver, showRules]);

  const generateShapes = () => {
    const shapeTypes: ShapeType[] = ['circle', 'square', 'triangle', 'rectangle', 'star'];
    const target = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    setTargetShape(target);

    const newShapes: Shape[] = [];
    const shapeCount = Math.min(10 + level * 2, 20);

    for (let i = 0; i < shapeCount; i++) {
      newShapes.push({
        id: i,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        x: Math.random() * 85 + 5,
        y: Math.random() * 75 + 10,
        size: Math.random() * 30 + 40,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    setShapes(newShapes);
    setFeedback('');
  };

  const handleShapeClick = (shape: Shape) => {
    if (shape.type === targetShape) {
      setScore(score + 10);
      setFeedback('✅ Doğru!');

      if ((score + 10) % 50 === 0) {
        setLevel(level + 1);
      }

      setTimeout(() => generateShapes(), 500);
    } else {
      setScore(Math.max(0, score - 5));
      setFeedback('❌ Yanlış şekil!');
      setTimeout(() => setFeedback(''), 1000);
    }
  };

  const renderShape = (shape: Shape) => {
    const style = {
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      backgroundColor: shape.color,
    };

    const baseClass =
      'absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 active:scale-95';

    switch (shape.type) {
      case 'circle':
        return (
          <div
            key={shape.id}
            onClick={() => handleShapeClick(shape)}
            className={`${baseClass} rounded-full`}
            style={style}
          />
        );
      case 'square':
        return (
          <div
            key={shape.id}
            onClick={() => handleShapeClick(shape)}
            className={`${baseClass} rounded-lg`}
            style={style}
          />
        );
      case 'triangle':
        return (
          <div
            key={shape.id}
            onClick={() => handleShapeClick(shape)}
            className={baseClass}
            style={{ left: `${shape.x}%`, top: `${shape.y}%` }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid ${shape.color}`,
              }}
            />
          </div>
        );
      case 'rectangle':
        return (
          <div
            key={shape.id}
            onClick={() => handleShapeClick(shape)}
            className={`${baseClass} rounded-lg`}
            style={{ ...style, width: `${shape.size * 1.5}px` }}
          />
        );
      case 'star':
        return (
          <div
            key={shape.id}
            onClick={() => handleShapeClick(shape)}
            className={`${baseClass} text-6xl`}
            style={{ left: `${shape.x}%`, top: `${shape.y}%`, color: shape.color }}
          >
            ⭐
          </div>
        );
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setLevel(1);
    generateShapes();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">Puan: {score}</span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">⏱️ {timeLeft}s</span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">Seviye: {level}</span>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">🔍 Şekil Avı</h1>
          <p className="text-slate-400 text-lg mt-2">Hedef şekli bul ve tıkla!</p>
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* İç Kart - Oyun Rengi (Mavi/Cyan) */}
          <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-2xl p-8 md:p-12 mb-8">
            {!gameOver ? (
              <>
                {/* Target */}
                <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 mb-6 text-center">
                  <div className="text-5xl font-black text-white mb-2">
                    {SHAPE_NAMES[targetShape]}
                  </div>
                  <p className="text-xl text-white">şeklini bul ve tıkla!</p>
                  {feedback && (
                    <div
                      className={`mt-4 text-3xl font-bold ${feedback.includes('✅') ? 'text-green-300' : 'text-red-300'}`}
                    >
                      {feedback}
                    </div>
                  )}
                </div>

                {/* Game Area */}
                <div className="relative bg-cyan-900/40 backdrop-blur-sm rounded-2xl h-[500px] overflow-hidden border-2 border-cyan-400">
                  {shapes.map((shape) => renderShape(shape))}
                </div>
              </>
            ) : (
              /* Game Over */
              <div className="text-center py-12">
                <div className="text-8xl mb-6">🔍</div>
                <h2 className="text-4xl font-black text-white mb-4">Oyun Bitti!</h2>
                <p className="text-2xl text-white mb-8">Toplam Puan: {score}</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetGame}
                    className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl text-white font-bold text-xl transition-all"
                  >
                    Tekrar Oyna
                  </button>
                  <button
                    onClick={onBack}
                    className="px-8 py-4 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-xl transition-all"
                  >
                    Menüye Dön
                  </button>
                </div>
              </div>
            )}

            {/* Nasıl Oynanır Butonu */}
            {!gameOver && (
              <button
                onClick={() => setShowRules(true)}
                className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold text-white transition-all mt-6"
              >
                NASIL OYNANIR?
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Kurallar Overlay */}
      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-cyan-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">1.</span> Ekranda gösterilen hedef şekli
                bul.
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">2.</span> Doğru şekle tıkla ve puan kazan!
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">3.</span> Yanlış şekle tıklarsan puan
                kaybedersin.
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">4.</span> 60 saniye içinde en yüksek puanı
                topla!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapeHuntGame;
