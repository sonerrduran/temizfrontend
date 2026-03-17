import React, { useState, useEffect } from 'react';

interface ShapeMatchingGameProps {
    onExit: () => void;
    onComplete?: (score: number) => void;
}

const ShapeMatchingGame: React.FC<ShapeMatchingGameProps> = ({ onExit, onComplete }) => {
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [cards, setCards] = useState<string[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    const levels = [
        // Level 1 - 4 çift (8 kart)
        { pairs: ['🔴', '🔵', '🟢', '🟡'], gridCols: 4 },
        // Level 2 - 6 çift (12 kart)
        { pairs: ['🔴', '🔵', '🟢', '🟡', '🟣', '🟤'], gridCols: 4 },
        // Level 3 - 8 çift (16 kart)
        { pairs: ['🔴', '🔵', '🟢', '🟡', '🟣', '🟤', '🟠', '⚫'], gridCols: 4 }
    ];

    useEffect(() => {
        initializeGame();
    }, [level]);

    useEffect(() => {
        if (matched.length === cards.length && cards.length > 0) {
            const levelScore = 200 - moves * 5;
            setScore(score + Math.max(levelScore, 50));
            setGameWon(true);
        }
    }, [matched]);

    const initializeGame = () => {
        const currentLevel = levels[level - 1];
        const pairs = [...currentLevel.pairs, ...currentLevel.pairs];
        const shuffled = pairs.sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setGameWon(false);
    };

    const handleCardClick = (index: number) => {
        if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
            return;
        }

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);
            const [first, second] = newFlipped;
            
            if (cards[first] === cards[second]) {
                setTimeout(() => {
                    setMatched([...matched, first, second]);
                    setFlipped([]);
                }, 500);
            } else {
                setTimeout(() => {
                    setFlipped([]);
                }, 1000);
            }
        }
    };

    const handleNextLevel = () => {
        if (level < levels.length) {
            setLevel(level + 1);
        } else {
            if (onComplete) onComplete(score);
            onExit();
        }
    };

    const handleRestart = () => {
        initializeGame();
    };

    const currentLevel = levels[level - 1];

    return (
        <div className="min-h-screen text-white p-4 flex items-center justify-center">
            <div className="w-full max-w-4xl">
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-pink-500/30 shadow-2xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={onExit}
                            className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-bold"
                        >
                            ⬅ GERİ
                        </button>
                        <h2 className="text-2xl md:text-3xl font-black text-white">
                            🎴 EŞİNİ BUL
                        </h2>
                        <div className="text-sm font-bold bg-pink-500/20 px-4 py-2 rounded-xl">
                            Seviye {level}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center gap-4 mb-6">
                        <div className="bg-blue-500/20 px-6 py-3 rounded-xl">
                            <span className="text-blue-300 font-bold">Hamle: {moves}</span>
                        </div>
                        <div className="bg-yellow-500/20 px-6 py-3 rounded-xl">
                            <span className="text-yellow-300 font-bold">Eşleşen: {matched.length / 2}/{currentLevel.pairs.length}</span>
                        </div>
                        <div className="bg-green-500/20 px-6 py-3 rounded-xl">
                            <span className="text-green-300 font-bold">Puan: {score}</span>
                        </div>
                    </div>

                    {/* Game Board */}
                    <div 
                        className="grid gap-3 mx-auto w-fit mb-6"
                        style={{ gridTemplateColumns: `repeat(${currentLevel.gridCols}, 1fr)` }}
                    >
                        {cards.map((card, index) => (
                            <button
                                key={index}
                                onClick={() => handleCardClick(index)}
                                disabled={matched.includes(index)}
                                className={`w-20 h-20 rounded-xl font-bold text-4xl transition-all duration-300 ${
                                    matched.includes(index)
                                        ? 'bg-green-500/30 scale-95 cursor-not-allowed'
                                        : flipped.includes(index)
                                        ? 'bg-white/20 scale-105'
                                        : 'bg-gradient-to-br from-pink-500 to-purple-600 hover:scale-105 cursor-pointer'
                                }`}
                            >
                                {flipped.includes(index) || matched.includes(index) ? card : '❓'}
                            </button>
                        ))}
                    </div>

                    {/* Win Modal */}
                    {gameWon && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                            <div className="bg-slate-900 p-8 rounded-3xl border-4 border-green-500 text-center animate-in zoom-in">
                                <div className="text-6xl mb-4">🎉</div>
                                <h3 className="text-3xl font-black mb-4 text-green-400">HARIKA!</h3>
                                <p className="text-xl mb-2">Tüm eşleri {moves} hamlede buldun!</p>
                                <p className="text-lg mb-6">Toplam Puan: {score}</p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={handleRestart}
                                        className="px-6 py-3 bg-blue-500 rounded-xl font-bold hover:bg-blue-400"
                                    >
                                        🔄 Tekrar Oyna
                                    </button>
                                    {level < levels.length ? (
                                        <button
                                            onClick={handleNextLevel}
                                            className="px-6 py-3 bg-green-500 rounded-xl font-bold hover:bg-green-400"
                                        >
                                            Sonraki Seviye →
                                        </button>
                                    ) : (
                                        <button
                                            onClick={onExit}
                                            className="px-6 py-3 bg-purple-500 rounded-xl font-bold hover:bg-purple-400"
                                        >
                                            Tamamla ✓
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Instructions */}
                    <div className="text-center text-white/60 text-sm">
                        <p>💡 Kartları çevir ve eşlerini bul!</p>
                        <p>Aynı renkteki kartları eşleştir</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShapeMatchingGame;
