import React, { useState, useEffect } from 'react';

interface PatternPuzzleGameProps {
    onExit: () => void;
    onComplete?: (score: number) => void;
}

const PatternPuzzleGame: React.FC<PatternPuzzleGameProps> = ({ onExit, onComplete }) => {
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [selectedPieces, setSelectedPieces] = useState<number[]>([]);
    const [gameWon, setGameWon] = useState(false);
    const [moves, setMoves] = useState(0);

    // Şekil parçaları ve hedef desenler
    const patterns = [
        // Level 1 - Basit
        {
            target: ['🟥', '🟦', '🟥', '🟦'],
            pieces: ['🟥', '🟦', '🟥', '🟦', '🟩', '🟨'],
            gridSize: 2
        },
        // Level 2 - Orta
        {
            target: ['🔴', '🔵', '🟢', '🔴', '🔵', '🟢', '🔴', '🔵', '🟢'],
            pieces: ['🔴', '🔵', '🟢', '🔴', '🔵', '🟢', '🟡', '🟣', '🟤'],
            gridSize: 3
        },
        // Level 3 - Zor
        {
            target: ['🟥', '🟦', '🟩', '🟨', '🟥', '🟦', '🟩', '🟨', '🟥', '🟦', '🟩', '🟨', '🟥', '🟦', '🟩', '🟨'],
            pieces: ['🟥', '🟦', '🟩', '🟨', '🟥', '🟦', '🟩', '🟨', '🟧', '🟪', '⬛', '⬜'],
            gridSize: 4
        }
    ];

    const currentPattern = patterns[level - 1];

    const handlePieceClick = (piece: string, index: number) => {
        if (selectedPieces.length < currentPattern.target.length) {
            setSelectedPieces([...selectedPieces, index]);
            setMoves(moves + 1);
        }
    };

    const handleRemovePiece = (index: number) => {
        setSelectedPieces(selectedPieces.filter((_, i) => i !== index));
    };

    const checkPattern = () => {
        const selected = selectedPieces.map(i => currentPattern.pieces[i]);
        const isCorrect = JSON.stringify(selected) === JSON.stringify(currentPattern.target);
        
        if (isCorrect) {
            const levelScore = 100 - moves * 2;
            setScore(score + Math.max(levelScore, 20));
            setGameWon(true);
        } else {
            alert('Yanlış desen! Tekrar dene.');
            setSelectedPieces([]);
        }
    };

    const handleNextLevel = () => {
        if (level < patterns.length) {
            setLevel(level + 1);
            setSelectedPieces([]);
            setMoves(0);
            setGameWon(false);
        } else {
            if (onComplete) onComplete(score);
            onExit();
        }
    };

    const handleRestart = () => {
        setSelectedPieces([]);
        setMoves(0);
        setGameWon(false);
    };

    return (
        <div className="min-h-screen text-white p-4 flex items-center justify-center">
            <div className="w-full max-w-4xl">
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-purple-500/30 shadow-2xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={onExit}
                            className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-bold"
                        >
                            ⬅ GERİ
                        </button>
                        <h2 className="text-2xl md:text-3xl font-black text-white">
                            🎨 DESEN BULMACA
                        </h2>
                        <div className="text-sm font-bold bg-purple-500/20 px-4 py-2 rounded-xl">
                            Seviye {level}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center gap-4 mb-6">
                        <div className="bg-blue-500/20 px-6 py-3 rounded-xl">
                            <span className="text-blue-300 font-bold">Hamle: {moves}</span>
                        </div>
                        <div className="bg-green-500/20 px-6 py-3 rounded-xl">
                            <span className="text-green-300 font-bold">Puan: {score}</span>
                        </div>
                    </div>

                    {/* Target Pattern */}
                    <div className="mb-8">
                        <h3 className="text-center text-white/80 font-bold mb-4">🎯 Hedef Desen</h3>
                        <div 
                            className="grid gap-2 mx-auto w-fit bg-slate-800/50 p-4 rounded-2xl border-2 border-purple-500/30"
                            style={{ gridTemplateColumns: `repeat(${currentPattern.gridSize}, 1fr)` }}
                        >
                            {currentPattern.target.map((piece, i) => (
                                <div key={i} className="w-16 h-16 flex items-center justify-center text-4xl bg-slate-700/50 rounded-lg">
                                    {piece}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Selected Pieces */}
                    <div className="mb-8">
                        <h3 className="text-center text-white/80 font-bold mb-4">📦 Seçilen Parçalar</h3>
                        <div 
                            className="grid gap-2 mx-auto w-fit bg-slate-800/50 p-4 rounded-2xl border-2 border-cyan-500/30 min-h-[100px]"
                            style={{ gridTemplateColumns: `repeat(${currentPattern.gridSize}, 1fr)` }}
                        >
                            {Array.from({ length: currentPattern.target.length }).map((_, i) => (
                                <div 
                                    key={i} 
                                    className="w-16 h-16 flex items-center justify-center text-4xl bg-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-600/50"
                                    onClick={() => selectedPieces[i] !== undefined && handleRemovePiece(i)}
                                >
                                    {selectedPieces[i] !== undefined ? currentPattern.pieces[selectedPieces[i]] : '❓'}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Available Pieces */}
                    <div className="mb-6">
                        <h3 className="text-center text-white/80 font-bold mb-4">🧩 Kullanılabilir Parçalar</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {currentPattern.pieces.map((piece, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePieceClick(piece, i)}
                                    disabled={selectedPieces.includes(i)}
                                    className={`w-16 h-16 text-4xl rounded-xl transition-all ${
                                        selectedPieces.includes(i)
                                            ? 'bg-slate-700/30 opacity-30 cursor-not-allowed'
                                            : 'bg-white/10 hover:bg-white/20 hover:scale-110 cursor-pointer'
                                    }`}
                                >
                                    {piece}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Check Button */}
                    {selectedPieces.length === currentPattern.target.length && !gameWon && (
                        <div className="text-center">
                            <button
                                onClick={checkPattern}
                                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-black text-lg hover:scale-105 transition-all shadow-lg"
                            >
                                ✓ Kontrol Et
                            </button>
                        </div>
                    )}

                    {/* Win Modal */}
                    {gameWon && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                            <div className="bg-slate-900 p-8 rounded-3xl border-4 border-green-500 text-center animate-in zoom-in">
                                <div className="text-6xl mb-4">🎉</div>
                                <h3 className="text-3xl font-black mb-4 text-green-400">DOĞRU!</h3>
                                <p className="text-xl mb-2">Deseni {moves} hamlede tamamladın!</p>
                                <p className="text-lg mb-6">Toplam Puan: {score}</p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={handleRestart}
                                        className="px-6 py-3 bg-blue-500 rounded-xl font-bold hover:bg-blue-400"
                                    >
                                        🔄 Tekrar Oyna
                                    </button>
                                    {level < patterns.length ? (
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
                    <div className="mt-6 text-center text-white/60 text-sm">
                        <p>💡 Hedef deseni oluşturmak için parçaları seç</p>
                        <p>Yanlış parça seçersen, üzerine tıklayarak kaldırabilirsin</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatternPuzzleGame;
