import React, { useState, useEffect } from 'react';

interface Props {
  onExit: () => void;
}

type Player = 1 | 2;
type Letter = 'S' | 'O';
type CellData = Letter | null;

const GRID_SIZE = 6; // Configurable grid size

const SOSGame: React.FC<Props> = ({ onExit }) => {
  const [board, setBoard] = useState<CellData[][]>(
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [selectedLetter, setSelectedLetter] = useState<Letter>('S');
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [sosLines, setSosLines] = useState<
    { p1: { r: number; c: number }; p2: { r: number; c: number }; player: Player }[]
  >([]);
  const [gameOver, setGameOver] = useState(false);

  // Check for SOS around a newly placed letter
  const checkSOS = (r: number, c: number, letter: Letter) => {
    let scored = 0;
    const newSosLines = [...sosLines];

    const directions = [
      [0, 1], // Horizontal right
      [1, 0], // Vertical down
      [1, 1], // Diagonal down-right
      [1, -1], // Diagonal down-left
    ];

    if (letter === 'O') {
      // Check if S is on both sides of this O
      for (const [dr, dc] of directions) {
        const r1 = r - dr,
          c1 = c - dc;
        const r2 = r + dr,
          c2 = c + dc;

        if (isValid(r1, c1) && isValid(r2, c2)) {
          if (board[r1][c1] === 'S' && board[r2][c2] === 'S') {
            // Avoid duplicate lines
            if (!lineExists(newSosLines, r1, c1, r2, c2)) {
              scored++;
              newSosLines.push({
                p1: { r: r1, c: c1 },
                p2: { r: r2, c: c2 },
                player: currentPlayer,
              });
            }
          }
        }
      }
    } else {
      // letter === 'S'
      // Check if O and S are in any direction from this S
      // Need to check both "forward" and "backward" for the direction vector

      const allDirs = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1],
      ];

      for (const [dr, dc] of allDirs) {
        const rO = r + dr,
          cO = c + dc;
        const rS = r + 2 * dr,
          cS = c + 2 * dc;

        if (isValid(rO, cO) && isValid(rS, cS)) {
          if (board[rO][cO] === 'O' && board[rS][cS] === 'S') {
            if (!lineExists(newSosLines, r, c, rS, cS)) {
              scored++;
              newSosLines.push({ p1: { r, c }, p2: { r: rS, c: cS }, player: currentPlayer });
            }
          }
        }
      }
    }

    return { scored, newSosLines };
  };

  const isValid = (r: number, c: number) => r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE;

  const lineExists = (
    lines: { p1: any; p2: any }[],
    r1: number,
    c1: number,
    r2: number,
    c2: number
  ) => {
    // Check both orientations since S-O-S order doesn't matter for the line segment
    return lines.some(
      (l) =>
        (l.p1.r === r1 && l.p1.c === c1 && l.p2.r === r2 && l.p2.c === c2) ||
        (l.p1.r === r2 && l.p1.c === c2 && l.p2.r === r1 && l.p2.c === c1)
    );
  };

  const handleCellClick = (r: number, c: number) => {
    if (board[r][c] !== null || gameOver) return;

    const newBoard = [...board.map((row) => [...row])];
    newBoard[r][c] = selectedLetter;
    setBoard(newBoard);

    // After updating board, check logic
    const { scored, newSosLines } = checkSOS(r, c, selectedLetter);

    if (scored > 0) {
      setScores((prev) => ({ ...prev, [currentPlayer]: prev[currentPlayer] + scored }));
      setSosLines(newSosLines);
      // Player gets to play again!
    } else {
      // Change turn
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  // Check Game Over
  useEffect(() => {
    if (board.every((row) => row.every((cell) => cell !== null))) {
      setGameOver(true);
    }
  }, [board]);

  const resetGame = () => {
    setBoard(
      Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill(null))
    );
    setCurrentPlayer(1);
    setScores({ 1: 0, 2: 0 });
    setSosLines([]);
    setGameOver(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bounce-in">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onExit}
          className="px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors flex items-center gap-2 font-bold border border-white/20"
        >
          <span>⬅</span> Çıkış
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 italic drop-shadow-lg">
          SOS OYUNU
        </h2>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[40px] shadow-2xl grid md:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar Controls */}
        <div className="flex flex-col gap-6">
          {/* Score Board */}
          <div className="flex flex-col gap-4">
            <div
              className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${currentPlayer === 1 && !gameOver ? 'bg-orange-500/20 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)] scale-105' : 'bg-slate-800 border-white/10 opacity-70'}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🧑‍🚀</span>
                <span className="font-black text-orange-400">1. OYUNCU</span>
              </div>
              <span className="text-3xl font-black text-white">{scores[1]}</span>
            </div>

            <div
              className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${currentPlayer === 2 && !gameOver ? 'bg-cyan-500/20 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-105' : 'bg-slate-800 border-white/10 opacity-70'}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">👽</span>
                <span className="font-black text-cyan-400">2. OYUNCU</span>
              </div>
              <span className="text-3xl font-black text-white">{scores[2]}</span>
            </div>
          </div>

          {/* Letter Selection */}
          {!gameOver && (
            <div className="bg-slate-800/80 p-5 rounded-3xl border border-white/5">
              <p className="text-white/60 text-xs font-black uppercase mb-3 text-center">
                Harf Seçimi (Sıra {currentPlayer}. Oyuncuda)
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedLetter('S')}
                  className={`flex-1 py-4 rounded-2xl text-4xl font-black transition-all ${selectedLetter === 'S' ? 'bg-white text-slate-900 scale-105 shadow-xl' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                >
                  S
                </button>
                <button
                  onClick={() => setSelectedLetter('O')}
                  className={`flex-1 py-4 rounded-2xl text-4xl font-black transition-all ${selectedLetter === 'O' ? 'bg-white text-slate-900 scale-105 shadow-xl' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                >
                  O
                </button>
              </div>
            </div>
          )}

          {/* Game Over Message */}
          {gameOver && (
            <div className="bg-emerald-500/20 border border-emerald-500/50 p-6 rounded-3xl text-center">
              <h3 className="text-2xl font-black text-emerald-400 mb-2">OYUN BİTTİ!</h3>
              <p className="text-white font-bold mb-6">
                {scores[1] > scores[2]
                  ? '🏆 1. OYUNCU KAZANDI'
                  : scores[2] > scores[1]
                    ? '🏆 2. OYUNCU KAZANDI'
                    : '🤝 BERABERE BİTTİ'}
              </p>
              <button
                onClick={resetGame}
                className="w-full py-3 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 transition-colors"
              >
                YENİ OYUN
              </button>
            </div>
          )}
        </div>

        {/* Board Canvas */}
        <div className="flex justify-center items-center relative">
          <div
            className="grid bg-white/5 border border-white/10 p-2 rounded-2xl"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
          >
            {board.map((row, rIdx) =>
              row.map((cell, cIdx) => (
                <button
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => handleCellClick(rIdx, cIdx)}
                  disabled={cell !== null || gameOver}
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors relative"
                >
                  {/* Letter Content */}
                  <span
                    className={`text-3xl sm:text-4xl md:text-5xl font-black ${cell ? 'animate-in zoom-in duration-200' : ''} ${cell === 'S' ? 'text-indigo-400' : 'text-rose-400'}`}
                  >
                    {cell}
                  </span>

                  {/* Render SVG Line overlays if this cell is part of an SOS */}
                  {/* For simplicity we overlay an absolute div if it's strictly part of a line */}
                </button>
              ))
            )}

            {/* Drawing Lines for SOS */}
            {/* Use a pointer-events-none SVG overlay covering the entire grid to draw strokes exactly from cell centers */}
          </div>

          {/* SVG OVERLAY for absolute precise line drawing over the grid */}
          <svg
            className="absolute inset-0 pointer-events-none w-full h-full z-10"
            style={{ padding: '8px' /* Match grid padding */ }}
          >
            {sosLines.map((line, idx) => {
              // Calculate exact % positions
              const cellWidth = 100 / GRID_SIZE;
              const cellHeight = 100 / GRID_SIZE;
              const x1 = line.p1.c * cellWidth + cellWidth / 2;
              const y1 = line.p1.r * cellHeight + cellHeight / 2;
              const x2 = line.p2.c * cellWidth + cellWidth / 2;
              const y2 = line.p2.r * cellHeight + cellHeight / 2;

              const strokeColor = line.player === 1 ? '#f97316' : '#06b6d4'; // orange : cyan

              return (
                <line
                  key={idx}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke={strokeColor}
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="opacity-80 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] animate-in custom-line-draw"
                  style={{ strokeDasharray: 200, strokeDashoffset: 0 }}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SOSGame;
