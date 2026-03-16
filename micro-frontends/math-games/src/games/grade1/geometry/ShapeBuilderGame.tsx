import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const ShapeBuilderGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetShape, setTargetShape] = useState('square');
  const [pieces, setPieces] = useState<string[]>([]);
  const [selectedPieces, setSelectedPieces] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const shapes = {
    square: { name: 'Kare', pieces: ['⬜', '⬜', '⬜', '⬜'], emoji: '🟦' },
    triangle: { name: 'Üçgen', pieces: ['🔺', '🔺', '🔺'], emoji: '🔺' },
    rectangle: { name: 'Dikdörtgen', pieces: ['▬', '▬', '▬', '▬', '▬', '▬'], emoji: '🟪' },
    circle: { name: 'Daire', pieces: ['◯', '◯', '◯', '◯'], emoji: '🔵' },
  };

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const shapeKeys = Object.keys(shapes);
    const target = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
    setTargetShape(target);

    const correctPieces = shapes[target as keyof typeof shapes].pieces;
    const allPieces = [...correctPieces];

    // Add some wrong pieces
    shapeKeys.forEach((key) => {
      if (key !== target) {
        allPieces.push(...shapes[key as keyof typeof shapes].pieces.slice(0, 2));
      }
    });

    setPieces(allPieces.sort(() => Math.random() - 0.5));
    setSelectedPieces([]);
    setFeedback('');
  };

  const handlePieceClick = (piece: string) => {
    const newSelected = [...selectedPieces, piece];
    setSelectedPieces(newSelected);

    const correctPieces = shapes[targetShape as keyof typeof shapes].pieces;

    if (newSelected.length === correctPieces.length) {
      const isCorrect = newSelected.every((p) => correctPieces.includes(p));

      if (isCorrect && newSelected.length === correctPieces.length) {
        const points = 10 + level * 5;
        setScore(score + points);
        setFeedback('🎉 Harika! Şekli tamamladın!');
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
        setFeedback('❌ Yanlış parçalar! Tekrar dene.');
        setTimeout(() => {
          setSelectedPieces([]);
          setFeedback('');
        }, 1500);
      }
    }
  };

  const currentShape = shapes[targetShape as keyof typeof shapes];

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
          <h1 className="text-white text-4xl md:text-5xl font-black">🏗️ Şekil İnşa Et</h1>
          <p className="text-slate-400 text-lg mt-2">{currentShape.name} oluştur!</p>
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* İç Kart - Turuncu/Amber Gradient */}
          <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowRules(true)}
                className="px-4 py-2 bg-orange-700/40 hover:bg-orange-600/40 border-2 border-orange-300 text-white rounded-xl font-bold transition-all transform hover:scale-105"
              >
                📖 NASIL OYNANIR?
              </button>
            </div>

            {/* Target Shape Display */}
            <div className="text-center mb-8">
              <div className="inline-block bg-orange-700/40 rounded-3xl px-12 py-8 border-2 border-orange-300">
                <p className="text-white text-2xl font-bold mb-4">Hedef Şekil:</p>
                <span className="text-9xl">{currentShape.emoji}</span>
                <p className="text-white text-3xl font-black mt-4">{currentShape.name}</p>
              </div>
            </div>

            {/* Selected Pieces Display */}
            <div className="mb-8">
              <p className="text-white text-xl font-bold text-center mb-4">
                Seçilen Parçalar: {selectedPieces.length} / {currentShape.pieces.length}
              </p>
              <div className="flex flex-wrap justify-center gap-3 min-h-[100px] bg-orange-700/40 rounded-2xl p-4 border-2 border-orange-300">
                {selectedPieces.map((piece, idx) => (
                  <div key={idx} className="text-6xl">
                    {piece}
                  </div>
                ))}
              </div>
            </div>

            {/* Piece Selection Grid */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {pieces.map((piece, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePieceClick(piece)}
                  disabled={selectedPieces.length >= currentShape.pieces.length}
                  className="h-20 bg-orange-700/40 hover:bg-orange-600/40 border-2 border-orange-300 text-white rounded-2xl font-black text-5xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {piece}
                </button>
              ))}
            </div>

            {feedback && (
              <div
                className={`mt-8 text-center text-2xl font-black p-6 rounded-xl ${
                  feedback.includes('Harika')
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
          <div className="text-9xl animate-bounce">🏗️</div>
        </div>
      )}

      {/* Kurallar Overlay */}
      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-orange-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">🏗️</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold">1.</span> Hedef şekli oluşturmak için
                doğru parçaları seç
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold">2.</span> Yanlış parçalar seçersen
                tekrar başlarsın
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold">3.</span> Şekli tamamla ve puan kazan!
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold">4.</span> 5 seviyeyi tamamla ve kazanan
                sen ol!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-500 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapeBuilderGame;
