import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryCardsGame() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const emojis = ['🌟', '🎯', '🎨', '🎭', '🎪', '🎸', '🎮', '🎲'];

  const initGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameStarted(true);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(id) || cards[id].isMatched) return;

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    const newCards = cards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card));
    setCards(newCards);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;

      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second ? { ...card, isMatched: true } : card
            )
          );
          setMatches((m) => m + 1);
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const isGameComplete = matches === emojis.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Ana Kart - Dış Katman */}
      <div className="w-full max-w-3xl bg-slate-800/80 backdrop-blur-xl rounded-[40px] p-1 border border-slate-700 shadow-2xl">
        {/* İç Oyun Alanı */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-[36px] p-8 relative overflow-hidden">
          {/* Çıkış Butonu */}
          <button
            onClick={() => navigate('/focus')}
            className="absolute top-6 left-6 w-12 h-12 bg-red-600/90 hover:bg-red-500/90 rounded-full flex items-center justify-center text-white font-black text-xl transition-all z-10 shadow-lg"
          >
            ✕
          </button>

          {/* Sağ Üst Bilgi */}
          <div className="absolute top-6 right-6 bg-slate-800/80 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20">
            <p className="text-white/90 text-sm font-bold">
              Hamle: {moves} | Eşleşme: {matches}/{emojis.length}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[600px] text-white pt-12">
            <div className="text-center mb-8">
              <h3 className="font-black tracking-widest text-xs uppercase mb-2 opacity-80">
                HAFIZA KARTLARI
              </h3>
              <p className="text-xl font-bold">Eşleşen kartları bul!</p>
            </div>

            {!gameStarted ? (
              <button
                onClick={initGame}
                className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
              >
                OYUNU BAŞLAT
              </button>
            ) : isGameComplete ? (
              <div className="text-center animate-in zoom-in duration-300">
                <p className="text-3xl font-black mb-4">TEBRİKLER!</p>
                <p className="text-xl mb-6">Oyunu {moves} hamlede tamamladın!</p>
                <button
                  onClick={initGame}
                  className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
                >
                  YENİ OYUN 🔄
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4 max-w-2xl">
                {cards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`aspect-square rounded-2xl text-5xl flex items-center justify-center font-bold transition-all duration-300 ${
                      card.isFlipped || card.isMatched
                        ? 'bg-white text-slate-900 scale-105'
                        : 'bg-slate-900/40 backdrop-blur-sm hover:scale-105 active:scale-95'
                    } ${card.isMatched ? 'opacity-50' : ''}`}
                    disabled={card.isMatched}
                  >
                    {card.isFlipped || card.isMatched ? card.emoji : '?'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

}
