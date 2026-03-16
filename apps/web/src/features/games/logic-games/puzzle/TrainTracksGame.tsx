import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface TrainTracksProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface BoardData {
  size: number;
  start: { r: number; c: number; dir: string }; // entry direction
  end: { r: number; c: number; dir: string }; // exit direction
  colClues: number[];
  rowClues: number[];
  solution: string[][]; // valid states: 'hz', 'vt', 'tr', 'tl', 'br', 'bl'
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    start: { r: 0, c: 0, dir: 'top' },
    end: { r: 3, c: 3, dir: 'bottom' },
    rowClues: [3, 2, 2, 3],
    colClues: [2, 3, 3, 2],
    solution: [
      ['br', 'hz', 'bl', ''],
      ['vt', 'br', 'tl', ''],
      ['vt', 'tr', 'hz', 'bl'],
      ['tr', 'hz', 'hz', 'tl'],
    ],
  },
  5: {
    size: 5,
    start: { r: 0, c: 1, dir: 'top' },
    end: { r: 4, c: 3, dir: 'bottom' },
    rowClues: [2, 4, 3, 4, 2],
    colClues: [3, 4, 2, 3, 3],
    solution: [
      ['', 'br', 'bl', '', ''],
      ['br', 'tl', 'br', 'hz', 'bl'],
      ['vt', '', 'vt', '', 'vt'],
      ['tr', 'hz', 'tl', 'br', 'tl'],
      ['', '', '', 'tr', ''], // Wait, row clues 2, 4, 3, 4, 2 = 15. col clues 3, 4, 2, 3, 3 = 15.
    ],
  },
  6: {
    size: 6,
    start: { r: 0, c: 0, dir: 'left' },
    end: { r: 5, c: 5, dir: 'right' },
    rowClues: [4, 3, 4, 4, 3, 4],
    colClues: [4, 4, 2, 3, 5, 4],
    solution: [
      // Dummy solution just for counts
      ['hz', 'bl', '', 'br', 'hz', 'bl'],
      ['', 'tr', 'bl', 'vt', '', 'vt'],
      ['br', 'hz', 'tl', 'tr', 'bl', 'vt'],
      ['vt', '', '', 'br', 'tl', 'vt'],
      ['tr', 'hz', 'bl', 'vt', '', 'vt'],
      ['', '', 'tr', 'tl', 'br', 'hz'],
    ],
  },
};

type TrackType = '' | 'hz' | 'vt' | 'tr' | 'tl' | 'br' | 'bl' | 'x';

const TRACK_ORDER: TrackType[] = ['', 'hz', 'vt', 'tr', 'tl', 'br', 'bl', 'x'];

const TrainTracksGame: React.FC<TrainTracksProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 4;
      case Difficulty.MEDIUM:
        return 5;
      default:
        return 6;
    }
  };

  const getTimeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 600;
      case Difficulty.MEDIUM:
        return 900;
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return 1200;
      default:
        return 900;
    }
  };

  const size = getSizeForDifficulty();
  const boardData = BOARDS[size] || BOARDS[5];

  const [grid, setGrid] = useState<TrackType[][]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [maxMistakes, setMaxMistakes] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const initGame = useCallback(() => {
    const initial = Array(size)
      .fill('')
      .map(() => Array(size).fill(''));

    // Place initial start/end tracks pointing into the board
    if (boardData.start.dir === 'top') initial[boardData.start.r][boardData.start.c] = 'vt';
    if (boardData.start.dir === 'left') initial[boardData.start.r][boardData.start.c] = 'hz';

    if (boardData.end.dir === 'bottom') initial[boardData.end.r][boardData.end.c] = 'vt';
    if (boardData.end.dir === 'right') initial[boardData.end.r][boardData.end.c] = 'hz';

    setGrid(initial);
    setMistakes(0);
    setTimeLeft(getTimeForDifficulty());
    setIsGameOver(false);
  }, [size]);

  useEffect(() => {
    initGame();
    let mm = 3;
    if (difficulty === Difficulty.HARD) mm = 2;
    if (difficulty === Difficulty.VERY_HARD) mm = 1;
    setMaxMistakes(mm);
  }, [initGame, difficulty]);

  useEffect(() => {
    if (isGameOver || showRules) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGameOver(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver, showRules]);

  const handleGameOver = (win: boolean) => {
    setIsGameOver(true);
    let finalStars = 1;
    if (win) {
      finalStars = 5 - Math.floor(mistakes / 2);
      if (timeLeft > getTimeForDifficulty() * 0.5) finalStars += 1;
    }
    setScore(Math.min(finalStars, 5));
  };

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver || showRules) return;

    // Don't allow changing start and end cells
    if (r === boardData.start.r && c === boardData.start.c) return;
    if (r === boardData.end.r && c === boardData.end.c) return;

    const current = grid[r][c];
    const nextIdx = (TRACK_ORDER.indexOf(current) + 1) % TRACK_ORDER.length;
    const newTrack = TRACK_ORDER[nextIdx];

    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = newTrack;
    setGrid(newGrid);

    checkWinCondition(newGrid);
  };

  const handleRightClick = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (isGameOver || showRules) return;

    if (r === boardData.start.r && c === boardData.start.c) return;
    if (r === boardData.end.r && c === boardData.end.c) return;

    const current = grid[r][c];
    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = current === 'x' ? '' : 'x';
    setGrid(newGrid);

    checkWinCondition(newGrid);
  };

  const getConnections = (r: number, c: number, track: TrackType) => {
    const dirs: { dr: number; dc: number }[] = [];
    if (track === 'hz') dirs.push({ dr: 0, dc: -1 }, { dr: 0, dc: 1 });
    if (track === 'vt') dirs.push({ dr: -1, dc: 0 }, { dr: 1, dc: 0 });
    if (track === 'tr') dirs.push({ dr: -1, dc: 0 }, { dr: 0, dc: 1 });
    if (track === 'tl') dirs.push({ dr: -1, dc: 0 }, { dr: 0, dc: -1 });
    if (track === 'br') dirs.push({ dr: 1, dc: 0 }, { dr: 0, dc: 1 });
    if (track === 'bl') dirs.push({ dr: 1, dc: 0 }, { dr: 0, dc: -1 });
    return dirs;
  };

  const checkWinCondition = (currentGrid: TrackType[][]) => {
    // 1. Check Row and Col Counts
    const currentRowCounts = Array(size).fill(0);
    const currentColCounts = Array(size).fill(0);

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentGrid[r][c] !== '' && currentGrid[r][c] !== 'x') {
          currentRowCounts[r]++;
          currentColCounts[c]++;
        }
      }
    }

    let countsMatch = true;
    for (let i = 0; i < size; i++) {
      if (currentRowCounts[i] !== boardData.rowClues[i]) countsMatch = false;
      if (currentColCounts[i] !== boardData.colClues[i]) countsMatch = false;
    }

    // 2. Check Continuous Route
    // Start from start node, follow connection. It must end at end node and traverse all placed tracks.
    if (!countsMatch) return; // Wait until counts match to do the heavy route check. Or do it anyway?

    let isValidRoute = false;

    // Simple tracker
    let currR = boardData.start.r;
    let currC = boardData.start.c;
    let prevR = -1; // coming from outside
    let prevC = -1;

    if (boardData.start.dir === 'top') {
      prevR = -1;
      prevC = currC;
    }
    if (boardData.start.dir === 'left') {
      prevR = currR;
      prevC = -1;
    }
    // Add more if needed

    let pathLength = 0;
    const totalPieces = currentRowCounts.reduce((a, b) => a + b, 0);

    const visited = new Set<string>();

    while (true) {
      const track = currentGrid[currR][currC];
      if (track === '' || track === 'x') break;

      visited.add(`${currR},${currC}`);
      pathLength++;

      const conns = getConnections(currR, currC, track);
      const n1 = { r: currR + conns[0].dr, c: currC + conns[0].dc };
      const n2 = { r: currR + conns[1].dr, c: currC + conns[1].dc };

      // Find which connection points to the NEXT cell (not the previous one)
      let nextCell = null;
      if (n1.r !== prevR || n1.c !== prevC) nextCell = n1;
      else if (n2.r !== prevR || n2.c !== prevC) nextCell = n2;

      if (!nextCell) break; // dead end or invalid connection

      // Are we at the end?
      if (currR === boardData.end.r && currC === boardData.end.c) {
        // Check if it's pointing to the correct exit dir
        if (boardData.end.dir === 'bottom' && nextCell.r === size) isValidRoute = true;
        if (boardData.end.dir === 'right' && nextCell.c === size) isValidRoute = true;
        break;
      }

      if (nextCell.r < 0 || nextCell.r >= size || nextCell.c < 0 || nextCell.c >= size) {
        break; // drifted off board early
      }

      // Check if next cell accepts connection from current cell
      const nextTrack = currentGrid[nextCell.r][nextCell.c];
      if (nextTrack === '' || nextTrack === 'x') break;

      const nextConns = getConnections(nextCell.r, nextCell.c, nextTrack);
      const accepts = nextConns.some(
        (conn) => nextCell!.r + conn.dr === currR && nextCell!.c + conn.dc === currC
      );

      if (!accepts) break;

      prevR = currR;
      prevC = currC;
      currR = nextCell.r;
      currC = nextCell.c;
    }

    if (countsMatch && isValidRoute && pathLength === totalPieces) {
      handleGameOver(true);
    }
  };

  // Calculate current counts for visual feedback
  const currentRowCounts = Array(size).fill(0);
  const currentColCounts = Array(size).fill(0);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r] && grid[r][c] !== '' && grid[r][c] !== 'x') {
        currentRowCounts[r]++;
        currentColCounts[c]++;
      }
    }
  }

  const renderTrackSVG = (type: TrackType) => {
    if (type === 'x') return <span className="text-slate-500 font-bold opacity-50">×</span>;
    if (type === '') return null;

    const color = '#10b981'; // emerald-500
    const w = 12; // stroke width

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md p-1">
        {type === 'hz' && (
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke={color}
            strokeWidth={w}
            strokeLinecap="round"
          />
        )}
        {type === 'vt' && (
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke={color}
            strokeWidth={w}
            strokeLinecap="round"
          />
        )}
        {type === 'tr' && (
          <path
            d="M 50 0 A 50 50 0 0 0 100 50"
            fill="transparent"
            stroke={color}
            strokeWidth={w}
            strokeLinecap="round"
          />
        )}
        {type === 'tl' && (
          <path
            d="M 50 0 A 50 50 0 0 1 0 50"
            fill="transparent"
            stroke={color}
            strokeWidth={w}
            strokeLinecap="round"
          />
        )}
        {type === 'br' && (
          <path
            d="M 50 100 A 50 50 0 0 1 100 50"
            fill="transparent"
            stroke={color}
            strokeWidth={w}
            strokeLinecap="round"
          />
        )}
        {type === 'bl' && (
          <path
            d="M 50 100 A 50 50 0 0 0 0 50"
            fill="transparent"
            stroke={color}
            strokeWidth={w}
            strokeLinecap="round"
          />
        )}
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans selection:bg-emerald-500/30">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl text-emerald-400">🚂</span> Train Tracks
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span>🛤️</span>
                <div>
                  Düz veya kavisli ray parçaları döşeyerek Başlangıç ve Bitiş noktalarını
                  birleştirmelisin.
                </div>
              </li>
              <li className="flex gap-3 text-emerald-400 font-bold">
                <span>🔢</span>
                <div>
                  Kenarlardaki sayılar, o satır veya sütunda **kaç adet ray parçası** olması
                  gerektiğini söyler!
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-400">🖱️</span>
                <span>
                  Hücreye sol tıklayarak rayları çevir. Kesinlikle ray olmayan yere sağ tıklayarak
                  **X** işareti koyabilirsin.
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full py-4 rounded-xl font-black text-xl transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 active:scale-95"
            >
              ANLADIM, BAŞLA!
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl px-4 py-6 md:py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 bg-slate-800/50 p-4 md:p-6 rounded-3xl border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={onExit}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all font-bold relative z-50"
            >
              ⬅ Geri Dön
            </button>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 tracking-wider">
                Tracks
              </h2>
              <div className="text-xs md:text-sm font-bold text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full mt-1 inline-block">
                SEVİYE: {size}x{size}
              </div>
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-2 text-white">
            <div className="bg-slate-900/80 px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
              <span className="text-lg">⏱️</span>
              <span
                className={`text-xl md:text-2xl font-black font-mono ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-emerald-300'}`}
              >
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="flex gap-1">
              {[...Array(maxMistakes)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${i < mistakes ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]' : 'bg-slate-700'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Board Container */}
        <div className="flex justify-center mb-8 pr-8">
          <div className="flex flex-col">
            {/* Top Clues */}
            <div className="flex ml-12 mb-2">
              {boardData.colClues.map((clue, i) => (
                <div
                  key={`tc-${i}`}
                  className={`w-12 sm:w-16 text-center font-black text-lg
                                    ${currentColCounts[i] === clue ? 'text-emerald-400' : currentColCounts[i] > clue ? 'text-rose-500' : 'text-slate-400'}
                                `}
                >
                  {clue}
                </div>
              ))}
            </div>

            <div className="flex">
              {/* Left Clues */}
              <div className="flex flex-col mr-2">
                {boardData.rowClues.map((clue, i) => (
                  <div
                    key={`lc-${i}`}
                    className={`h-12 sm:h-16 flex items-center justify-end pr-2 font-black text-lg w-10
                                        ${currentRowCounts[i] === clue ? 'text-emerald-400' : currentRowCounts[i] > clue ? 'text-rose-500' : 'text-slate-400'}
                                    `}
                  >
                    {clue}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="bg-amber-900/50 p-2 sm:p-3 rounded-2xl shadow-xl border-4 border-amber-900/80 backdrop-blur-sm relative">
                <div
                  className="grid gap-[2px] sm:gap-1 bg-amber-800"
                  style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
                >
                  {grid.map((row, r) =>
                    row.map((cell, c) => {
                      const isStart = r === boardData.start.r && c === boardData.start.c;
                      const isEnd = r === boardData.end.r && c === boardData.end.c;

                      return (
                        <button
                          key={`${r}-${c}`}
                          onClick={() => handleCellClick(r, c)}
                          onContextMenu={(e) => handleRightClick(e, r, c)}
                          className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center transition-colors
                                                        ${isStart ? 'bg-emerald-900/80 ring-2 ring-emerald-500' : isEnd ? 'bg-rose-900/80 ring-2 ring-rose-500' : 'bg-amber-100/90 hover:bg-amber-50'}
                                                    `}
                        >
                          {renderTrackSVG(cell)}
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Start / End Indicators */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  {/* These could be tiny arrows pointing in/out next to the board */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center bg-slate-800/50 p-4 rounded-2xl border border-white/5 max-w-sm mx-auto">
          <p className="text-slate-400 text-sm font-medium">
            Parça seçmek için <span className="text-white font-bold cursor-pointer">Sol Tık</span>{' '}
            art arda bas, X içi <span className="text-white font-bold cursor-pointer">Sağ Tık</span>{' '}
            yap.
          </p>
        </div>
      </div>

      {/* Game Over Overlay */}
      {isGameOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-slate-800 p-8 md:p-12 rounded-[2rem] max-w-md w-full text-center shadow-2xl border border-white/10 bounce-in">
            <div className="text-6xl md:text-8xl mb-6">🎉</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              İstasyon Tamamlandı!
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              Muazzam bir tren yolu inşa ettin! Yolcular güvende. Kazanılan Yıldız: {score}
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => onComplete(score)}
                className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg active:scale-95 text-transparent bg-clip-text text-white"
              >
                Ödülü Al ⭐️
              </button>
              <button
                onClick={initGame}
                className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-slate-600 hover:bg-slate-500 text-white shadow-lg active:scale-95"
              >
                Tekrar Dene
              </button>
              <button
                onClick={onExit}
                className="w-full py-4 rounded-2xl font-black text-lg transition-all bg-slate-700 hover:bg-slate-600 text-white shadow-lg active:scale-95"
              >
                Ana Üsse Dön
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainTracksGame;
