import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryCardsGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const emojis = ['🍎', '🍌', '🍊', '🍇', '🍓', '🍉', '🍒', '🍑', '🥝', '🍍', '🥭', '🍈'];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const pairCount = Math.min(4 + level, 8);
    const selectedEmojis = emojis.slice(0, pairCount);
    const cardPairs = [...selectedEmojis, ...selectedEmojis];

    const shuffled = cardPairs
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setFeedback('');
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;

      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setFeedback('✅ Eşleşti!');

          const allMatched = matchedCards.every((c) => c.isMatched);
          if (allMatched) {
            const points = Math.max(10 + level * 5 - moves, 5);
            setScore(score + points);
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
            setTimeout(() => setFeedback(''), 1000);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
          setFeedback('❌ Eşleşmedi!');
          setTimeout(() => setFeedback(''), 1000);
        }, 1000);
      }
    }
  };

  const gridCols =
    cards.length <= 8 ? 'grid-cols-4' : cards.length <= 12 ? 'grid-cols-4' : 'grid-cols-5';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-fuchsia-900 p-4 md:p-8 relative overflow-hidden">
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
            🃏
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
            <div className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
              <span className="text-white font-black text-xl">Hamle: {moves}</span>
            </div>
            <div className="px-6 py-3 bg-yellow-500/90 backdrop-blur-xl rounded-xl border border-yellow-300/50">
              <span className="text-white font-black text-xl">⭐ {score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
            🃏 Hafıza Kartları 🃏
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300 font-bold">Aynı kartları eşleştir!</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className={`grid ${gridCols} gap-4`}>
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isMatched}
                className={`aspect-square rounded-2xl text-6xl font-black transition-all transform hover:scale-105 shadow-xl ${
                  card.isFlipped || card.isMatched
                    ? 'bg-gradient-to-br from-pink-400 to-rose-500'
                    : 'bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600'
                } ${card.isMatched ? 'opacity-50' : ''}`}
              >
                {card.isFlipped || card.isMatched ? card.emoji : '?'}
              </button>
            ))}
          </div>

          {feedback && (
            <div
              className={`mt-8 text-center text-3xl font-black ${
                feedback.includes('Eşleşti') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-300/30">
          <h3 className="text-xl font-black text-cyan-300 mb-3">📋 Nasıl Oynanır?</h3>
          <ul className="text-white space-y-2">
            <li>• Kartları çevir ve aynı olanları bul</li>
            <li>• Tüm çiftleri eşleştir</li>
            <li>• Az hamle ile bitir, daha çok puan kazan!</li>
          </ul>
        </div>
      </div>

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">🃏</div>
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

export default MemoryCardsGame;
