import React, { useState, useEffect } from 'react';

interface MemoryMatchGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const emojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🥝', '🍒'];

const MemoryMatchGame: React.FC<MemoryMatchGameProps> = ({ onComplete, onExit }) => {
  const [cards, setCards] = useState<
    { emoji: string; id: number; flipped: boolean; matched: boolean }[]
  >([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      onComplete(score);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices;
      if (cards[first].emoji === cards[second].emoji) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, idx) =>
              idx === first || idx === second ? { ...card, matched: true } : card
            )
          );
          setScore(score + 20);
          setFlippedIndices([]);

          // Check if game is complete
          const allMatched = cards.every(
            (card, idx) => card.matched || idx === first || idx === second
          );
          if (allMatched) {
            setTimeout(() => onComplete(score + 20), 500);
          }
        }, 800);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, idx) =>
              idx === first || idx === second ? { ...card, flipped: false } : card
            )
          );
          setFlippedIndices([]);
        }, 1000);
      }
    }
  }, [flippedIndices]);

  const initializeGame = () => {
    const gameEmojis = emojis.slice(0, 6);
    const doubled = [...gameEmojis, ...gameEmojis];
    const shuffled = doubled
      .map((emoji, id) => ({ emoji, id, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].flipped || cards[index].matched) return;

    setCards((prev) =>
      prev.map((card, idx) => (idx === index ? { ...card, flipped: true } : card))
    );
    setFlippedIndices([...flippedIndices, index]);

    if (flippedIndices.length === 1) {
      setMoves(moves + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-bold hover:bg-white/30 transition-all"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white font-black">
              ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white font-black">
              🎯 {moves} Hamle
            </div>
            <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white font-black">
              ⭐ {score}
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-black text-purple-600 mb-8 text-center">
            Hafıza Oyunu - Eşleştir!
          </h3>

          {/* Cards Grid */}
          <div className="grid grid-cols-4 gap-4">
            {cards.map((card, index) => (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                disabled={card.matched}
                className={`aspect-square rounded-2xl font-black text-5xl transition-all ${
                  card.matched
                    ? 'bg-green-500 text-white scale-95 opacity-50'
                    : card.flipped
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white scale-105'
                      : 'bg-gradient-to-br from-blue-500 to-cyan-500 hover:scale-105 active:scale-95'
                }`}
              >
                {card.flipped || card.matched ? card.emoji : '❓'}
              </button>
            ))}
          </div>

          <div className="mt-6 text-center text-gray-600 font-semibold">
            Aynı meyveleri bul ve eşleştir!
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryMatchGame;
