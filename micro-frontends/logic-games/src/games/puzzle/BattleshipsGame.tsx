import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';

interface BattleshipsGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

type CellState = 'empty' | 'water' | 'ship';

interface BoardData {
  size: number;
  clues: {
    row: number[];
    col: number[];
  };
  fleet: number[]; // e.g [4, 3, 3, 2, 2, 2, 1, 1, 1, 1] means 1 battleship, 2 cruisers, etc.
}

const BOARDS: Record<number, BoardData> = {
  6: {
    size: 6,
    clues: {
      row: [1, 3, 0, 2, 1, 1],
      col: [2, 0, 3, 0, 2, 1],
    },
    fleet: [3, 2, 1, 1, 1], // Smaller fleet for 6x6
  },
  8: {
    size: 8,
    clues: {
      row: [2, 0, 4, 1, 2, 1, 3, 0],
      col: [1, 4, 0, 2, 1, 3, 0, 2],
    },
    fleet: [4, 3, 3, 2, 2, 1], // Standard variation
  },
};

const BattleshipsGame: React.FC<BattleshipsGameProps> = ({
  grade,
  difficulty,
  onComplete,
  onExit,
}) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 6;
      default:
        return 8;
    }
  };

  const getTimeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 600; // 10m
      case Difficulty.MEDIUM:
        return 900; // 15m
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return 1200; // 20m
      default:
        return 900;
    }
  };

  const size = getSizeForDifficulty();
  const boardData = BOARDS[size] || BOARDS[8];

  const [board, setBoard] = useState<CellState[][]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [maxMistakes, setMaxMistakes] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const initGame = useCallback(() => {
    const initialBoard = Array(size)
      .fill(null)
      .map(() => Array(size).fill('empty' as CellState));
    setBoard(initialBoard);
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

    const newBoard = board.map((row) => [...row]);
    const currentState = newBoard[r][c];

    // Cycle: empty -> water -> ship -> empty
    if (currentState === 'empty') newBoard[r][c] = 'water';
    else if (currentState === 'water') newBoard[r][c] = 'ship';
    else newBoard[r][c] = 'empty';

    setBoard(newBoard);

    if (newBoard[r][c] === 'ship') {
      if (hasDiagonalTouch(newBoard, r, c)) {
        setMistakes((m) => {
          const newM = m + 1;
          if (newM >= maxMistakes) handleGameOver(false);
          return newM;
        });
        // It's a fundamental rule of Battleships Solitaire: ships cannot touch diagonally
        newBoard[r][c] = 'water'; // Revert to water if they touch diagonally
        setBoard(newBoard);
        return;
      }
    }

    checkWinCondition(newBoard);
  };

  const hasDiagonalTouch = (currentBoard: CellState[][], r: number, c: number) => {
    // Ships can touch orthogonally to form larger ships
    // But they NEVER touch diagonally, even other ships.
    const diagonals = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];
    for (const [dr, dc] of diagonals) {
      const nr = r + dr,
        nc = c + dc;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
        if (currentBoard[nr][nc] === 'ship') return true;
      }
    }
    return false;
  };

  const countShipsInRow = (r: number) => {
    let count = 0;
    for (let i = 0; i < size; i++) if (board[r][i] === 'ship') count++;
    return count;
  };

  const countShipsInCol = (c: number) => {
    let count = 0;
    for (let i = 0; i < size; i++) if (board[i][c] === 'ship') count++;
    return count;
  };

  const extractFleet = (currentBoard: CellState[][]) => {
    const visited = Array(size)
      .fill(false)
      .map(() => Array(size).fill(false));
    const foundShips: number[] = [];

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] === 'ship' && !visited[r][c]) {
          let shipSize = 0;
          const stack = [[r, c]];
          visited[r][c] = true;

          // Ships are strictly straight horizontal or vertical
          // Since we prevented diagonal touches, BFS/DFS finds the component size easily
          while (stack.length > 0) {
            const [curR, curC] = stack.pop()!;
            shipSize++;

            const orthogonals = [
              [-1, 0],
              [1, 0],
              [0, -1],
              [0, 1],
            ];
            for (const [dr, dc] of orthogonals) {
              const nr = curR + dr,
                nc = curC + dc;
              if (
                nr >= 0 &&
                nr < size &&
                nc >= 0 &&
                nc < size &&
                !visited[nr][nc] &&
                currentBoard[nr][nc] === 'ship'
              ) {
                visited[nr][nc] = true;
                stack.push([nr, nc]);
              }
            }
          }
          foundShips.push(shipSize);
        }
      }
    }

    return foundShips.sort((a, b) => b - a); // Descending order
  };

  const checkWinCondition = (currentBoard: CellState[][]) => {
    // 1. Check Row and Col Counts
    for (let r = 0; r < size; r++) {
      let rowCount = 0;
      for (let c = 0; c < size; c++) if (currentBoard[r][c] === 'ship') rowCount++;
      if (rowCount !== boardData.clues.row[r]) return;
    }

    for (let c = 0; c < size; c++) {
      let colCount = 0;
      for (let r = 0; r < size; r++) if (currentBoard[r][c] === 'ship') colCount++;
      if (colCount !== boardData.clues.col[c]) return;
    }

    // 2. Check diagonals (already enforced mostly on click, but good for safety)
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] === 'ship' && hasDiagonalTouch(currentBoard, r, c)) return;
      }
    }

    // 3. Extract fleet and compare with required fleet
    const currentFleet = extractFleet(currentBoard);
    const targetFleet = [...boardData.fleet].sort((a, b) => b - a);

    if (currentFleet.length !== targetFleet.length) return;
    for (let i = 0; i < currentFleet.length; i++) {
      if (currentFleet[i] !== targetFleet[i]) return;
    }

    handleGameOver(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500/30">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl text-blue-400">🚢</span> Battleships
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span className="text-blue-400">🔢</span>
                <div>
                  Kenarlardaki sayılar, o satır veya sütunda toplam kaç <b>gemi parçası</b> (Ship)
                  olduğunu gösterir.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-400">🛳️</span>
                <span>Tüm gizli deniz filosunu bulmalısın (Sağ tarafta filoyu görebilirsin).</span>
              </li>
              <li className="flex gap-3 text-red-400 font-bold">
                <span>🚫</span>
                <span>
                  Gemiler birbirlerine (kendi parçaları hariç) asla temas edemezler,{' '}
                  <b>çaprazdan bile!</b>
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full py-4 rounded-xl font-black text-xl transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-lg active:scale-95"
            >
              ANLADIM, BAŞLA!
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl px-4 py-6 md:py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-slate-800/50 p-4 md:p-6 rounded-3xl border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={onExit}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all relative z-50"
            >
              ⬅ Geri Dön
            </button>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Battleships
              </h2>
              <div className="text-xs md:text-sm font-bold text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full mt-1 inline-block">
                SEVİYE: {size}x{size}
              </div>
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-2">
            <div className="bg-slate-900/80 px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
              <span className="text-lg">⏱️</span>
              <span
                className={`text-xl md:text-2xl font-black font-mono ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-cyan-300'}`}
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

        <div className="flex flex-col lg:flex-row justify-center gap-8 items-start">
          {/* Board Container */}
          <div className="relative inline-block mx-auto lg:mx-0">
            {/* Top Clues */}
            <div className="flex ml-8 mb-2 w-fit">
              {boardData.clues.col.map((c, i) => {
                const currentCount = countShipsInCol(i);
                const isMatched = currentCount === c;
                const isOver = currentCount > c;
                return (
                  <div
                    key={`c-${i}`}
                    className={`w-10 h-8 md:w-14 flex items-end justify-center font-black text-xl 
                                        ${isOver ? 'text-rose-500' : isMatched ? 'text-slate-500' : 'text-white'}`}
                  >
                    {c}
                  </div>
                );
              })}
            </div>

            <div className="flex">
              {/* Left Clues */}
              <div className="flex flex-col mr-2">
                {boardData.clues.row.map((c, i) => {
                  const currentCount = countShipsInRow(i);
                  const isMatched = currentCount === c;
                  const isOver = currentCount > c;
                  return (
                    <div
                      key={`r-${i}`}
                      className={`w-6 h-10 md:h-14 flex items-center justify-end font-black text-xl pr-2 
                                            ${isOver ? 'text-rose-500' : isMatched ? 'text-slate-500' : 'text-white'}`}
                    >
                      {c}
                    </div>
                  );
                })}
              </div>

              {/* Main Grid */}
              <div
                className="grid gap-[2px] bg-blue-900 p-[4px] shadow-[0_0_30px_rgba(59,130,246,0.3)] border-2 border-blue-400"
                style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
              >
                {board.map((row, r) =>
                  row.map((cellState, c) => (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-3xl transition-all duration-200
                                                ${
                                                  cellState === 'ship'
                                                    ? 'bg-slate-700 shadow-[inset_0_3px_10px_rgba(0,0,0,0.8)] border border-slate-600'
                                                    : cellState === 'water'
                                                      ? 'bg-cyan-800/80 text-cyan-300'
                                                      : 'bg-slate-300 hover:bg-slate-200'
                                                }`}
                    >
                      {cellState === 'ship' ? '🚢' : cellState === 'water' ? '〰' : ''}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Fleet Status */}
          <div className="bg-slate-800/80 p-6 rounded-3xl border border-white/10 min-w-[200px] w-full lg:w-auto">
            <h3 className="text-xl font-black text-blue-400 mb-4 text-center">Hedef Filo</h3>
            <div className="flex flex-col gap-3">
              {boardData.fleet.map((shipSize, idx) => (
                <div key={idx} className="flex gap-1 justify-center bg-slate-900/50 p-2 rounded-xl">
                  {Array(shipSize)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 bg-slate-600 rounded-sm flex items-center justify-center text-xs"
                      >
                        🚢
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Control Guide */}
        <div className="mt-8 text-center bg-slate-800/50 p-4 rounded-2xl border border-white/5 max-w-2xl mx-auto">
          <p className="text-slate-400 text-sm font-bold">
            1 Tık: <span className="text-cyan-300 bg-cyan-800 px-2 rounded-sm mx-1">Su (〰)</span> |
            2 Tık: <span className="bg-slate-700 px-2 rounded-sm mx-1">Gemi (🚢)</span> | 3 Tık: Boş
          </p>
        </div>
      </div>

      {/* Game Over Overlay */}
      {isGameOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-slate-800 p-8 md:p-12 rounded-[2rem] max-w-md w-full text-center shadow-2xl border border-white/10 bounce-in">
            <div className="text-6xl md:text-8xl mb-6">
              {mistakes >= maxMistakes || timeLeft <= 0 ? '💥' : '🎉'}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {mistakes >= maxMistakes ? 'Çarpışma!' : timeLeft <= 0 ? 'Süre Doldu!' : 'Harika!'}
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              {mistakes >= maxMistakes
                ? 'Gemiler çaprazdan bile birbirine değemez.'
                : timeLeft <= 0
                  ? 'Zamanı iyi yönetemedin.'
                  : `Tüm filoyu başarıyla deşifre ettin! Kazanılan Yıldız: ${score}`}
            </p>

            <div className="flex flex-col gap-3">
              {mistakes < maxMistakes && timeLeft > 0 && (
                <button
                  onClick={() => onComplete(score)}
                  className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg shadow-green-500/25 active:scale-95"
                >
                  Ödülü Al ⭐️
                </button>
              )}
              <button
                onClick={initGame}
                className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-lg active:scale-95"
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

export default BattleshipsGame;
