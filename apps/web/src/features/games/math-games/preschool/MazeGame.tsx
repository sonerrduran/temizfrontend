import React, { useState, useEffect } from 'react';

interface MazeGameProps {
    onExit: () => void;
    onComplete?: (score: number) => void;
}

const MazeGame: React.FC<MazeGameProps> = ({ onExit, onComplete }) => {
    const [level, setLevel] = useState(1);
    const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [score, setScore] = useState(0);

    // Basit labirent haritaları (0: yol, 1: duvar, 2: başlangıç, 3: bitiş, 4: yıldız)
    const mazes = [
        // Level 1 - Kolay
        [
            [2, 0, 1, 0, 0],
            [0, 0, 1, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 1, 0, 4],
            [0, 0, 0, 0, 3]
        ],
        // Level 2 - Orta
        [
            [2, 0, 1, 0, 4, 0, 0],
            [0, 0, 1, 0, 1, 1, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 1, 1, 1, 1, 0, 4],
            [0, 0, 0, 0, 0, 0, 3]
        ],
        // Level 3 - Zor
        [
            [2, 0, 1, 0, 0, 1, 0, 0, 4],
            [0, 0, 1, 0, 0, 1, 0, 1, 0],
            [1, 0, 0, 0, 1, 0, 0, 1, 0],
            [1, 1, 1, 0, 1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0, 1],
            [0, 0, 0, 4, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 3]
        ]
    ];

    const currentMaze = mazes[level - 1];
    const [collectedStars, setCollectedStars] = useState<Set<string>>(new Set());

    useEffect(() => {
        // Başlangıç pozisyonunu bul
        for (let y = 0; y < currentMaze.length; y++) {
            for (let x = 0; x < currentMaze[y].length; x++) {
                if (currentMaze[y][x] === 2) {
                    setPlayerPos({ x, y });
                    return;
                }
            }
        }
    }, [level]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (gameWon) return;
            
            let newX = playerPos.x;
            let newY = playerPos.y;

            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    newY = Math.max(0, playerPos.y - 1);
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    newY = Math.min(currentMaze.length - 1, playerPos.y + 1);
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    newX = Math.max(0, playerPos.x - 1);
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    newX = Math.min(currentMaze[0].length - 1, playerPos.x + 1);
                    break;
                default:
                    return;
            }

            // Duvara çarpmadıysa hareket et
            if (currentMaze[newY][newX] !== 1) {
                setPlayerPos({ x: newX, y: newY });
                setMoves(moves + 1);

                // Yıldız topla
                if (currentMaze[newY][newX] === 4) {
                    const starKey = `${newX}-${newY}`;
                    if (!collectedStars.has(starKey)) {
                        setCollectedStars(new Set([...collectedStars, starKey]));
                        setScore(score + 10);
                    }
                }

                // Bitişe ulaştı mı?
                if (currentMaze[newY][newX] === 3) {
                    setGameWon(true);
                    const finalScore = score + (100 - moves);
                    setScore(finalScore);
                    if (onComplete) onComplete(finalScore);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [playerPos, gameWon, moves, score, collectedStars]);

    const handleNextLevel = () => {
        if (level < mazes.length) {
            setLevel(level + 1);
            setMoves(0);
            setGameWon(false);
            setCollectedStars(new Set());
        } else {
            onExit();
        }
    };

    const handleRestart = () => {
        setMoves(0);
        setGameWon(false);
        setCollectedStars(new Set());
        // Başlangıç pozisyonunu bul
        for (let y = 0; y < currentMaze.length; y++) {
            for (let x = 0; x < currentMaze[y].length; x++) {
                if (currentMaze[y][x] === 2) {
                    setPlayerPos({ x, y });
                    return;
                }
            }
        }
    };

    const getCellContent = (x: number, y: number) => {
        const starKey = `${x}-${y}`;
        const isPlayer = playerPos.x === x && playerPos.y === y;
        const cellValue = currentMaze[y][x];

        if (isPlayer) return '🧒';
        if (cellValue === 1) return '🧱';
        if (cellValue === 3) return '🏁';
        if (cellValue === 4 && !collectedStars.has(starKey)) return '⭐';
        return '';
    };

    const cellSize = currentMaze[0].length > 7 ? 'w-10 h-10 text-2xl' : 'w-14 h-14 text-3xl';

    return (
        <div className="min-h-screen text-white p-4 flex items-center justify-center">
            <div className="w-full max-w-4xl">
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-cyan-500/30 shadow-2xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={onExit}
                            className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-bold"
                        >
                            ⬅ GERİ
                        </button>
                        <h2 className="text-2xl md:text-3xl font-black text-white">
                            🌀 LABİRENT OYUNU
                        </h2>
                        <div className="text-sm font-bold bg-cyan-500/20 px-4 py-2 rounded-xl">
                            Seviye {level}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center gap-4 mb-6">
                        <div className="bg-blue-500/20 px-6 py-3 rounded-xl">
                            <span className="text-blue-300 font-bold">Hamle: {moves}</span>
                        </div>
                        <div className="bg-yellow-500/20 px-6 py-3 rounded-xl">
                            <span className="text-yellow-300 font-bold">⭐ {collectedStars.size}</span>
                        </div>
                        <div className="bg-green-500/20 px-6 py-3 rounded-xl">
                            <span className="text-green-300 font-bold">Puan: {score}</span>
                        </div>
                    </div>

                    {/* Maze */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-block bg-slate-800/50 p-4 rounded-2xl border-4 border-cyan-500/30">
                            {currentMaze.map((row, y) => (
                                <div key={y} className="flex">
                                    {row.map((cell, x) => (
                                        <div
                                            key={`${x}-${y}`}
                                            className={`${cellSize} flex items-center justify-center border border-slate-700/50 ${
                                                cell === 1 ? 'bg-slate-700' : 'bg-slate-900/50'
                                            }`}
                                        >
                                            {getCellContent(x, y)}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="text-center mb-6">
                        <p className="text-white/70 text-sm mb-4">
                            ⌨️ Ok tuşları veya W-A-S-D ile hareket et
                        </p>
                        <div className="flex justify-center gap-2">
                            <div className="grid grid-cols-3 gap-2">
                                <div></div>
                                <button className="w-12 h-12 bg-white/10 rounded-lg font-bold hover:bg-white/20">↑</button>
                                <div></div>
                                <button className="w-12 h-12 bg-white/10 rounded-lg font-bold hover:bg-white/20">←</button>
                                <button className="w-12 h-12 bg-white/10 rounded-lg font-bold hover:bg-white/20">↓</button>
                                <button className="w-12 h-12 bg-white/10 rounded-lg font-bold hover:bg-white/20">→</button>
                            </div>
                        </div>
                    </div>

                    {/* Win Modal */}
                    {gameWon && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                            <div className="bg-slate-900 p-8 rounded-3xl border-4 border-green-500 text-center animate-in zoom-in">
                                <div className="text-6xl mb-4">🎉</div>
                                <h3 className="text-3xl font-black mb-4 text-green-400">TEBRİKLER!</h3>
                                <p className="text-xl mb-2">Labirenti {moves} hamlede tamamladın!</p>
                                <p className="text-lg mb-6">Toplam Puan: {score}</p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={handleRestart}
                                        className="px-6 py-3 bg-blue-500 rounded-xl font-bold hover:bg-blue-400"
                                    >
                                        🔄 Tekrar Oyna
                                    </button>
                                    {level < mazes.length ? (
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
                </div>
            </div>
        </div>
    );
};

export default MazeGame;
