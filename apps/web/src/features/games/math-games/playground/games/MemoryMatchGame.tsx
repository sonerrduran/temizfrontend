import React, { useState, useEffect } from 'react';

const EMOJIS = ['🚀', '👽', '🛸', '⭐', '🌎', '☄️'];
const PAIRS = [...EMOJIS, ...EMOJIS];

interface MemoryMatchGameProps {
    onComplete: (stars: number) => void;
    onExit: () => void;
}

const MemoryMatchGame: React.FC<MemoryMatchGameProps> = ({ onComplete, onExit }) => {
    const [cards, setCards] = useState<{ id: number, emoji: string, isFlipped: boolean, isMatched: boolean }[]>([]);
    const [flippedIdxs, setFlippedIdxs] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [timeLeft, setTimeLeft] = useState(45);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        // Shuffle cards
        const shuffled = [...PAIRS].sort(() => Math.random() - 0.5).map((emoji, idx) => ({
            id: idx,
            emoji,
            isFlipped: false,
            isMatched: false
        }));
        setCards(shuffled);
    }, []);

    useEffect(() => {
        if (isGameOver) return;

        if (timeLeft > 0 && matches < EMOJIS.length) {
            const timerId = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timerId);
        } else if (timeLeft === 0 || matches === EMOJIS.length) {
            endGame();
        }
    }, [timeLeft, matches, isGameOver]);

    const endGame = () => {
        setIsGameOver(true);
        // Base 5 stars for win + bonus based on time left + bonus based on fewer moves
        const isWin = matches === EMOJIS.length;
        let earnedStars = isWin ? 5 : 1;

        if (isWin) {
            earnedStars += Math.floor(timeLeft / 10);
            earnedStars += (moves <= 10 ? 3 : (moves <= 15 ? 1 : 0));
        }

        setTimeout(() => {
            onComplete(earnedStars);
        }, 2000);
    };

    const handleCardClick = (index: number) => {
        if (isGameOver || cards[index].isFlipped || cards[index].isMatched || flippedIdxs.length === 2) return;

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flippedIdxs, index];
        setFlippedIdxs(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);
            const [firstIdx, secondIdx] = newFlipped;

            if (cards[firstIdx].emoji === cards[secondIdx].emoji) {
                // Match
                setTimeout(() => {
                    setCards(prev => {
                        const nextCards = [...prev];
                        nextCards[firstIdx].isMatched = true;
                        nextCards[secondIdx].isMatched = true;
                        return nextCards;
                    });
                    setMatches(m => m + 1);
                    setFlippedIdxs([]);
                }, 500);
            } else {
                // No Match
                setTimeout(() => {
                    setCards(prev => {
                        const nextCards = [...prev];
                        nextCards[firstIdx].isFlipped = false;
                        nextCards[secondIdx].isFlipped = false;
                        return nextCards;
                    });
                    setFlippedIdxs([]);
                }, 1000);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <button onClick={onExit} className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all">
                        ← Çıkış
                    </button>
                    <div className="flex gap-4">
                        <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
                            <span className="text-white font-black">Hamle: {moves}</span>
                        </div>
                        <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
                            <span className="text-white font-black">⏱️ {timeLeft}s</span>
                        </div>
                    </div>
                </div>

                {/* Başlık */}
                <div className="text-center mb-8">
                    <h1 className="text-white text-4xl md:text-5xl font-black">
                        🧩 Kozmik Hafıza
                    </h1>
                    <p className="text-slate-400 text-lg mt-2">Eşleşme: {matches}/{EMOJIS.length}</p>
                </div>

                {/* Dış Kart - Lacivert */}
                <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
                    {/* İç Kart - Oyun Rengi (İndigo) */}
                    <div className="bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-600 rounded-2xl p-8 md:p-12 mb-8">
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
                            {cards.map((card, idx) => (
                                <button
                                    key={card.id}
                                    onClick={() => handleCardClick(idx)}
                                    className={`relative w-full aspect-square rounded-2xl transition-all duration-300 transform flex items-center justify-center text-4xl md:text-6xl
                                      ${card.isFlipped || card.isMatched ? 'bg-indigo-700/40 border-2 border-indigo-400' : 'bg-indigo-700/20 hover:bg-indigo-600/40 border-2 border-indigo-500/50'}
                                      ${card.isMatched ? 'opacity-50 scale-95' : 'hover:scale-105'}
                                    `}
                                >
                                    <div className={`transition-opacity duration-300 ${card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'}`}>
                                        {card.emoji}
                                    </div>
                                    <div className={`absolute inset-0 flex items-center justify-center text-white transition-opacity duration-300 ${!card.isFlipped && !card.isMatched ? 'opacity-100' : 'opacity-0'}`}>
                                        ❓
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {isGameOver && (
                    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center z-10 animate-in fade-in duration-500 p-6 text-center">
                        <h3 className="text-5xl md:text-7xl font-black text-yellow-400 mb-4">
                            {matches === EMOJIS.length ? 'HARİKA!' : 'SÜRE BİTTİ'}
                        </h3>
                        <p className="text-xl md:text-2xl text-white font-bold mb-8">Puanların hesaplanıyor...</p>
                        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemoryMatchGame;
