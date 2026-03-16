import React, { useState, useEffect } from 'react';

interface ShapePuzzleGameProps {
  onBack: () => void;
}

type ShapeType = 'circle' | 'square' | 'triangle' | 'star';

interface PuzzleSlot {
  id: number;
  shape: ShapeType;
  filled: boolean;
}

const ShapePuzzleGame: React.FC<ShapePuzzleGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(8);
  const [slots, setSlots] = useState<PuzzleSlot[]>([]);
  const [availableShapes, setAvailableShapes] = useState<ShapeType[]>([]);
  const [selectedShape, setSelectedShape] = useState<ShapeType | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    generatePuzzle();
  }, []);

  const generatePuzzle = () => {
    const shapes: ShapeType[] = ['circle', 'square', 'triangle', 'star'];
    const slotCount = Math.min(4 + Math.floor(round / 2), 6);

    const newSlots: PuzzleSlot[] = [];
    const shapesNeeded: ShapeType[] = [];

    for (let i = 0; i < slotCount; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      newSlots.push({ id: i, shape, filled: false });
      shapesNeeded.push(shape);
    }

    // Shuffle available shapes
    const shuffled = [...shapesNeeded].sort(() => Math.random() - 0.5);

    setSlots(newSlots);
    setAvailableShapes(shuffled);
    setSelectedShape(null);
    setFeedback('');
  };

  const handleShapeSelect = (shape: ShapeType) => {
    setSelectedShape(shape);
  };

  const handleSlotClick = (slotId: number) => {
    if (!selectedShape || feedback) return;

    const slot = slots.find((s) => s.id === slotId);
    if (!slot || slot.filled) return;

    if (slot.shape === selectedShape) {
      const newSlots = slots.map((s) => (s.id === slotId ? { ...s, filled: true } : s));
      setSlots(newSlots);

      const newAvailable = [...availableShapes];
      const index = newAvailable.indexOf(selectedShape);
      if (index > -1) {
        newAvailable.splice(index, 1);
      }
      setAvailableShapes(newAvailable);
      setSelectedShape(null);
      setScore(score + 10);

      // Check if puzzle is complete
      if (newSlots.every((s) => s.filled)) {
        setFeedback('🎉 Tamamlandı!');
        setTimeout(() => {
          if (round < totalRounds) {
            setRound(round + 1);
            generatePuzzle();
          } else {
            setShowCelebration(true);
          }
        }, 1500);
      }
    } else {
      setFeedback('❌ Yanlış şekil!');
      setTimeout(() => setFeedback(''), 1000);
    }
  };

  const renderShape = (shape: ShapeType, size: number = 60) => {
    const colors = {
      circle: 'bg-blue-500',
      square: 'bg-red-500',
      triangle: 'bg-green-500',
      star: 'bg-yellow-500',
    };

    switch (shape) {
      case 'circle':
        return (
          <div
            className={`w-${size} h-${size} ${colors.circle} rounded-full`}
            style={{ width: size, height: size }}
          />
        );
      case 'square':
        return (
          <div
            className={`w-${size} h-${size} ${colors.square} rounded-lg`}
            style={{ width: size, height: size }}
          />
        );
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid #10B981`,
            }}
          />
        );
      case 'star':
        return <div className="text-6xl">⭐</div>;
    }
  };

  const resetGame = () => {
    setScore(0);
    setRound(1);
    setShowCelebration(false);
    generatePuzzle();
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-12 text-center border border-purple-500/30 max-w-2xl">
          <div className="text-8xl mb-6">🧩🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Harika!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Tüm yapbozları tamamladın!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 hover:from-purple-400 hover:to-pink-500 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 rounded-xl text-white font-bold transition-all transform hover:scale-105"
          >
            ← Çıkış
          </button>

          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">
                Tur: {round}/{totalRounds}
              </span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">🧩 Şekil Yapboz</h1>
          <p className="text-slate-400 text-lg mt-2">Puan: {score}</p>
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* İç Kart - Mor/Pembe Gradient */}
          <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowRules(true)}
                className="px-4 py-2 bg-purple-700/40 hover:bg-purple-600/40 border-2 border-purple-300 text-white rounded-xl font-bold transition-all transform hover:scale-105"
              >
                📖 NASIL OYNANIR?
              </button>
            </div>

            {/* Puzzle Board */}
            <div className="bg-purple-700/40 rounded-2xl p-6 mb-6 border-2 border-purple-300">
              <div className="grid grid-cols-3 gap-4">
                {slots.map((slot) => (
                  <div
                    key={slot.id}
                    onClick={() => handleSlotClick(slot.id)}
                    className={`aspect-square bg-purple-800/40 rounded-2xl border-4 ${
                      slot.filled ? 'border-green-400' : 'border-dashed border-white/60'
                    } flex items-center justify-center cursor-pointer hover:bg-purple-700/40 transition-all`}
                  >
                    {slot.filled ? (
                      renderShape(slot.shape, 60)
                    ) : (
                      <div className="text-white/40 text-4xl">?</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Available Shapes */}
            <div className="bg-purple-700/40 rounded-2xl p-6 border-2 border-purple-300">
              <h3 className="text-2xl font-black text-white text-center mb-4">Şekilleri Seç</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {availableShapes.map((shape, index) => (
                  <button
                    key={index}
                    onClick={() => handleShapeSelect(shape)}
                    className={`p-6 rounded-2xl transition-all transform ${
                      selectedShape === shape
                        ? 'bg-yellow-400 scale-110'
                        : 'bg-purple-800/40 hover:bg-purple-700/40 border-2 border-purple-300 hover:scale-105'
                    }`}
                  >
                    {renderShape(shape, 60)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`mt-6 text-center text-3xl font-black p-6 rounded-xl ${
              feedback.includes('🎉')
                ? 'bg-green-500/90 border-2 border-green-300 text-white'
                : 'bg-red-500/90 border-2 border-red-300 text-white'
            }`}
          >
            {feedback}
          </div>
        )}
      </div>

      {/* Kurallar Overlay */}
      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-purple-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">🧩</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-purple-400 font-bold">1.</span> Boş yerlere uygun şekilleri
                yerleştir
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 font-bold">2.</span> Önce bir şekil seç, sonra boş
                yere tıkla
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 font-bold">3.</span> Doğru şekli seçersen puan
                kazanırsın
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 font-bold">4.</span> Tüm boşlukları doldur ve
                yapbozu tamamla!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 hover:from-purple-400 hover:to-pink-500 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapePuzzleGame;
