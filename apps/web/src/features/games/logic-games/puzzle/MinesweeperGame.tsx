import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';
import { LogicGameWrapper, RulesOverlay, GameOverOverlay, useLogicGame } from '../shared';

interface MinesweeperGameProps {
  grade: number; // For scaling difficulty if needed
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

type CellState = 'hidden' | 'revealed' | 'flagged';

interface Cell {
  r: number;
  c: number;
  hasMine: boolean;
  state: CellState;
  adjacentMines: number;
}

const MinesweeperGame: React.FC<MinesweeperGameProps> = ({
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
      case Difficulty.MEDIUM:
        return 8;
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return 10;
      default:
        return 8;
    }
  };

  const getMinesForDifficulty = (boardSize: number) => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return Math.floor(boardSize * boardSize * 0.12);
      case Difficulty.MEDIUM:
        return Math.floor(boardSize * boardSize * 0.16);
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return Math.floor(boardSize * boardSize * 0.2);
      default:
        return Math.floor(boardSize * boardSize * 0.16);
    }
  };

  const size = getSizeForDifficulty();
  const totalMines = getMinesForDifficulty(size);

  const [board, setBoard] = useState<Cell[][]>([]);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [actionMode, setActionMode] = useState<'dig' | 'flag'>('dig');

  // Merkezi oyun state yönetimi
  const {
    timeLeft,
    isGameOver,
    gameWon,
    score,
    showRules,
    setShowRules,
    endGame,
    resetGame,
    formatTime,
  } = useLogicGame({ difficulty, onComplete });

  // Derived state
  const flagsCount = board.flat().filter((c) => c.state === 'flagged').length;

  const initBoard = useCallback(() => {
    const initialBoard: Cell[][] = [];
    for (let r = 0; r < size; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < size; c++) {
        row.push({
          r,
          c,
          hasMine: false,
          state: 'hidden',
          adjacentMines: 0,
        });
      }
      initialBoard.push(row);
    }
    setBoard(initialBoard);
    setActionMode('dig');
    setIsFirstClick(true);
  }, [size]);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  const placeMines = (firstR: number, firstC: number, currentBoard: Cell[][]) => {
    let placed = 0;
    while (placed < totalMines) {
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);
      const isTooClose = Math.abs(r - firstR) <= 1 && Math.abs(c - firstC) <= 1;
      if (!currentBoard[r][c].hasMine && !isTooClose) {
        currentBoard[r][c].hasMine = true;
        placed++;
      }
    }

    // Calculate adjacency
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!currentBoard[r][c].hasMine) {
          let count = 0;
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              const nr = r + x;
              const nc = c + y;
              if (nr >= 0 && nr < size && nc >= 0 && nc < size && currentBoard[nr][nc].hasMine) {
                count++;
              }
            }
          }
          currentBoard[r][c].adjacentMines = count;
        }
      }
    }
  };

  const handleGameEnd = (win: boolean, finalBoard?: Cell[][]) => {
    if (win) {
      // Reveal all unflagged mines as flags
      setBoard((prev) => {
        const nw = finalBoard ? finalBoard : prev.map((r) => [...r]);
        for (const row of nw) {
          for (const cell of row) {
            if (cell.hasMine && cell.state !== 'flagged') cell.state = 'flagged';
          }
        }
        return nw;
      });
    } else {
      // Reveal all mines
      setBoard((prev) => {
        const nw = prev.map((r) => [...r].map((c) => ({ ...c })));
        for (const row of nw) {
          for (const cell of row) {
            if (cell.hasMine) {
              if (cell.state !== 'flagged') cell.state = 'revealed';
            } else if (cell.state === 'flagged') {
              cell.state = 'revealed';
            }
          }
        }
        return nw;
      });
    }
    endGame(win);
  };

  const revealCell = (r: number, c: number) => {
    if (isGameOver) return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    if (actionMode === 'flag') {
      const cell = newBoard[r][c];
      if (cell.state === 'hidden') cell.state = 'flagged';
      else if (cell.state === 'flagged') cell.state = 'hidden';
      setBoard(newBoard);
      return;
    }

    const cell = newBoard[r][c];
    if (cell.state === 'revealed' || cell.state === 'flagged') return;

    if (isFirstClick) {
      placeMines(r, c, newBoard);
      setIsFirstClick(false);
    }

    if (newBoard[r][c].hasMine) {
      // Boom
      newBoard[r][c].state = 'revealed';
      handleGameEnd(false);
      return;
    }

    // DFS Flood fill
    const stack = [[r, c]];
    while (stack.length > 0) {
      const [cr, cc] = stack.pop()!;
      const currCell = newBoard[cr][cc];

      if (currCell.state === 'hidden') {
        currCell.state = 'revealed';

        if (currCell.adjacentMines === 0) {
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              const nr = cr + x;
              const nc = cc + y;
              if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
                if (newBoard[nr][nc].state === 'hidden') {
                  stack.push([nr, nc]);
                }
              }
            }
          }
        }
      }
    }

    setBoard(newBoard);

    // Check win condition
    let revealedCount = 0;
    for (let ir = 0; ir < size; ir++) {
      for (let ic = 0; ic < size; ic++) {
        if (newBoard[ir][ic].state === 'revealed' && !newBoard[ir][ic].hasMine) {
          revealedCount++;
        }
      }
    }

    if (revealedCount === size * size - totalMines) {
      handleGameEnd(true, newBoard);
    }
  };

  // Right-click to flag desktop support
  const handleContextMenu = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (isGameOver || isFirstClick) return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newBoard[r][c];
    if (cell.state === 'revealed') return;

    cell.state = cell.state === 'flagged' ? 'hidden' : 'flagged';
    setBoard(newBoard);
  };

  const getNumberColorClass = (n: number) => {
    switch (n) {
      case 1:
        return 'text-blue-500';
      case 2:
        return 'text-emerald-500';
      case 3:
        return 'text-red-500';
      case 4:
        return 'text-purple-500';
      case 5:
        return 'text-amber-600';
      case 6:
        return 'text-cyan-500';
      case 7:
        return 'text-black';
      case 8:
        return 'text-slate-600';
      default:
        return '';
    }
  };

  const gameRules = [
    'Amaç panodaki hiçbir mayına basmadan tüm güvenli kareleri açmaktır.',
    'Bir kareyi açtığında çıkan sayı, o karenin etrafındaki (komşu) 8 karede toplam kaç adet mayın olduğunu gösterir.',
    'Mayın olduğundan emin olduğun karelere "Bayrak 🚩" koy (Mobil: BAYRAK modunu seçip tıkla, PC: Sağ Tıkla).',
    'Sayıları mantık yürüterek takip et ve tüm temiz alanları aç!',
  ];

  return (
    <>
      <LogicGameWrapper
        title="Mayın Tarlası"
        emoji="💣"
        subtitle={`${size}x${size} Alan`}
        gradientFrom="from-emerald-600"
        gradientTo="to-teal-700"
        onExit={onExit}
        onShowRules={() => setShowRules(true)}
        infoCard={
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-red-400 font-bold text-lg">
                💣{' '}
                {Math.max(0, totalMines - flagsCount)
                  .toString()
                  .padStart(2, '0')}
              </div>
            </div>
            <div
              className={`text-center font-bold text-lg ${timeLeft <= 30 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`}
            >
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>
        }
      >
        {/* Oyun Kontrolleri */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActionMode((acc) => (acc === 'dig' ? 'flag' : 'dig'))}
            className={`px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${actionMode === 'dig' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-red-600 hover:bg-red-700'} text-white`}
          >
            {actionMode === 'dig' ? '⛏️ KAZ' : '🚩 BAYRAK'}
          </button>
        </div>

        {/* Oyun Tahtası */}
        <div className="flex justify-center">
          <div
            className="bg-slate-300 p-2 md:p-3 rounded-xl border-4 border-slate-700 grid gap-1 w-full max-w-[360px]"
            style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
          >
            {board.map((row, r) =>
              row.map((cell, c) => {
                const isRevealed = cell.state === 'revealed';
                const isFlagged = cell.state === 'flagged';

                const showMine = isGameOver && !gameWon && cell.hasMine;
                const showFalseFlag = isGameOver && !gameWon && isFlagged && !cell.hasMine;

                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => revealCell(r, c)}
                    onContextMenu={(e) => handleContextMenu(e, r, c)}
                    className={`
                                            aspect-square flex items-center justify-center font-black text-lg md:text-2xl transition-all select-none
                                            ${
                                              isRevealed
                                                ? 'bg-slate-200'
                                                : 'bg-slate-400 border-t-2 border-l-2 border-slate-300 border-b-4 border-r-4 border-slate-600 hover:brightness-110 active:border-b-2 active:border-r-2 active:border-t-4 active:border-l-4'
                                            }
                                            ${showMine && !isRevealed ? 'bg-red-500 border-red-400 border-red-700' : ''}
                                        `}
                  >
                    {isFlagged && !showFalseFlag && '🚩'}
                    {showFalseFlag && <span className="text-red-600 font-bold text-xl">❌</span>}
                    {isRevealed && cell.hasMine && !isFlagged && '💣'}
                    {isRevealed && !cell.hasMine && cell.adjacentMines > 0 && (
                      <span className={getNumberColorClass(cell.adjacentMines)}>
                        {cell.adjacentMines}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </LogicGameWrapper>

      <RulesOverlay
        show={showRules}
        onClose={() => setShowRules(false)}
        title="Mayın Tarlası"
        emoji="💣"
        rules={gameRules}
        accentColor="emerald"
      />

      <GameOverOverlay
        show={isGameOver}
        won={gameWon}
        score={score}
        onRestart={() => resetGame(initBoard)}
        onExit={() => onComplete(score)}
        accentColor="emerald"
        winTitle="GÖREV TAMAM"
        loseTitle="GÜÜÜLM!"
        loseEmoji="💥"
      />
    </>
  );
};

export default MinesweeperGame;
