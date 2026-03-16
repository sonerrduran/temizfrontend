import React, { useState, useEffect } from 'react';

interface ShapeMatchingGameProps {
  onBack: () => void;
}

type ShapeType = 'circle' | 'square' | 'triangle' | 'rectangle' | 'pentagon' | 'hexagon';

interface Card {
  id: number;
  shape: ShapeType;
  flipped: boolean;
  matched: boolean;
}

const SHAPE_EMOJIS: Record<ShapeType, string> = {
  circle: '🔵',
  square: '🟦',
  triangle: '🔺',
  rectangle: '🟩',
  pentagon: '⬟',
  hexagon: '⬡',
};

const SHAPE_NAMES: Record<ShapeType, string> = {
  circle: 'Daire',
  square: 'Kare',
  triangle: 'Üçgen',
  rectangle: 'Dikdörtgen',
  pentagon: 'Beşgen',
  hexagon: 'Altıgen',
};

const ShapeMatchingGame: React.FC<ShapeMatchingGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRules, setShowRules] = useState(true);

  useEffect(() => {
    generateCards();
  }, [level]);

  const generateCards = () => {
    const pairCount = Math.min(4 + level, 8);
    const shapes: ShapeType[] = [
      'circle',
      'square',
      'triangle',
      'rectangle',
      'pentagon',
      'hexagon',
    ];
    const selectedShapes = shapes.slice(0, pairCount);

    const cardPairs: Card[] = [];
    selectedShapes.forEach((shape, idx) => {
      cardPairs.push(
        { id: idx * 2, shape, flipped: false, matched: false },
        { id: idx * 2 + 1, shape, flipped: false, matched: false }
      );
    });

    setCards(cardPairs.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMoves(0);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards.find((c) => c.id === cardId)?.matched) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    const newCards = cards.map((c) => (c.id === cardId ? { ...c, flipped: true } : c));
    setCards(newCards);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      const firstCard = cards.find((c) => c.id === first);
      const secondCard = cards.find((c) => c.id === second);

      if (firstCard?.shape === secondCard?.shape) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === first || c.id === second ? { ...c, matched: true } : c))
          );
          setFlippedCards([]);
          setScore(score + 10);

          if (cards.filter((c) => !c.matched).length === 2) {
            setTimeout(() => {
              if (level < 5) {
                setLevel(level + 1);
              } else {
                setShowCelebration(true);
              }
            }, 1000);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === first || c.id === second ? { ...c, flipped: false } : c))
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setShowCelebration(false);
    generateCards();
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-12 text-center border border-teal-500/30 max-w-2xl">
          <div className="text-8xl mb-6">🎉🔷</div>
          <h2 className="text-5xl font-black text-white mb-4">Mükemmel!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Tüm şekilleri eşleştirdin!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 hover:from-teal-400 hover:to-cyan-500 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
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
              <span className="text-white font-black">Hamle: {moves}</span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">🔷 Şekil Eşleştirme</h1>
          <p className="text-slate-400 text-lg mt-2">Aynı şekilleri eşleştir!</p>
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* İç Kart - Teal/Cyan Gradient */}
          <div className="bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowRules(true)}
                className="px-4 py-2 bg-teal-700/40 hover:bg-teal-600/40 border-2 border-teal-300 text-white rounded-xl font-bold transition-all transform hover:scale-105"
              >
                📖 NASIL OYNANIR?
              </button>
            </div>

            {/* Cards Grid */}
            <div
              className={`grid gap-4 ${cards.length <= 8 ? 'grid-cols-4' : cards.length <= 12 ? 'grid-cols-4 md:grid-cols-6' : 'grid-cols-4 md:grid-cols-8'}`}
            >
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  disabled={card.matched || card.flipped}
                  className={`aspect-square rounded-2xl text-6xl flex items-center justify-center transition-all transform ${
                    card.matched
                      ? 'bg-green-500/40 border-2 border-green-300 scale-95 opacity-50'
                      : card.flipped
                        ? 'bg-teal-700/40 border-2 border-teal-300 scale-105'
                        : 'bg-teal-800/40 border-2 border-teal-300 hover:scale-105 hover:bg-teal-700/40'
                  } disabled:cursor-not-allowed`}
                >
                  {card.flipped || card.matched ? SHAPE_EMOJIS[card.shape] : '❓'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Kurallar Overlay */}
      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-teal-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">🔷</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-teal-400 font-bold">1.</span> Kartlara tıklayarak şekilleri aç
              </li>
              <li className="flex gap-2">
                <span className="text-teal-400 font-bold">2.</span> Aynı şekilleri eşleştir
              </li>
              <li className="flex gap-2">
                <span className="text-teal-400 font-bold">3.</span> Her eşleşme puan kazandırır
              </li>
              <li className="flex gap-2">
                <span className="text-teal-400 font-bold">4.</span> Tüm kartları eşleştir ve
                seviyeyi tamamla!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 hover:from-teal-400 hover:to-cyan-500 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapeMatchingGame;
