import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';
import { LogicGameWrapper, RulesOverlay, GameOverOverlay, useLogicGame } from '../shared';

interface HidatoGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface BoardData {
  size: number;
  initialBoard: number[][]; // 0 means empty, -1 means invalid/wall (for shapes)
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    initialBoard: [
      [1, 0, 0, 16],
      [0, 2, 14, 0],
      [0, 0, 0, 12],
      [6, 0, 10, 0],
    ],
  },
  5: {
    size: 5,
    initialBoard: [
      [1, 0, 0, 0, 25],
      [0, 3, 0, 9, 0],
      [0, 0, 13, 0, 0],
      [0, 18, 0, 11, 0],
      [20, 0, 0, 0, 23],
    ],
  },
  6: {
    size: 6,
    initialBoard: [
      [1, 0, 0, 0, 0, 36],
      [0, 4, 0, 0, 33, 0],
      [0, 0, 7, 20, 0, 0],
      [0, 0, 14, 21, 0, 0],
      [0, 11, 0, 0, 25, 0],
      [10, 0, 0, 0, 0, 27],
    ],
  },
};

const HidatoGame: React.FC<HidatoGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
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

  const size = getSizeForDifficulty();
  const boardData = BOARDS[size] || BOARDS[5];

  const getMaxMistakes = () => {
    if (difficulty === Difficulty.VERY_HARD) return 1;
    if (difficulty === Difficulty.HARD) return 2;
    return 3;
  };

  // Shared hook for game state management
  const {
    timeLeft,
    mistakes,
    isGameOver,
    gameWon,
    score,
    showRules,
    setShowRules,
    addMistake,
    endGame,
    resetGame,
    formatTime,
  } = useLogicGame({
    difficulty,
    onComplete,
    maxMistakes: getMaxMistakes(),
  });

  const [board, setBoard] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [errorCells, setErrorCells] = useState<{ r: number; c: number }[]>([]);

  const initGame = useCallback(() => {
    const cloned = boardData.initialBoard.map((row) => [...row]);
    setBoard(cloned);
    setSelectedCell(null);
    setErrorCells([]);
  }, [boardData]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const isFixed = (r: number, c: number) => {
    return boardData.initialBoard[r][c] !== 0;
  };

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver || showRules || isFixed(r, c) || board[r][c] === -1) return;
    setSelectedCell({ r, c });
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || isGameOver || showRules) return;

    let maxVal = 0;
    boardData.initialBoard.forEach((row) =>
      row.forEach((cell) => {
        if (cell !== -1) maxVal++;
      })
    );

    if (num < 1 || num > maxVal) return;

    const { r, c } = selectedCell;
    const newBoard = board.map((row) => [...row]);

    let existsAt = null;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (newBoard[i][j] === num) existsAt = { i, j };
      }
    }
    if (existsAt) {
      if (isFixed(existsAt.i, existsAt.j)) return;
      newBoard[existsAt.i][existsAt.j] = 0;
    }

    newBoard[r][c] = num;
    setBoard(newBoard);
    validateBoard(newBoard, maxVal);
  };

  const handleDelete = () => {
    if (!selectedCell || isGameOver || showRules) return;
    const { r, c } = selectedCell;
    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = 0;
    setBoard(newBoard);

    let maxVal = 0;
    boardData.initialBoard.forEach((row) =>
      row.forEach((cell) => {
        if (cell !== -1) maxVal++;
      })
    );
    validateBoard(newBoard, maxVal);
  };

  const validateBoard = (currentBoard: number[][], maxVal: number) => {
    const errors: { r: number; c: number }[] = [];
    let isFull = true;

    const positions = new Map<number, { r: number; c: number }>();
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const val = currentBoard[r][c];
        if (val === 0) isFull = false;
        else if (val > 0) positions.set(val, { r, c });
      }
    }

    // Hidato allows DIAGONAL movement too
    for (let n = 1; n < maxVal; n++) {
      const current = positions.get(n);
      const next = positions.get(n + 1);

      if (current && next) {
        const dr = Math.abs(current.r - next.r);
        const dc = Math.abs(current.c - next.c);
        if (Math.max(dr, dc) !== 1) {
          errors.push({ r: current.r, c: current.c });
          errors.push({ r: next.r, c: next.c });
        }
      }
    }

    setErrorCells(errors);

    if (isFull && errors.length === 0) {
      endGame(true);
    } else if (isFull && errors.length > 0) {
      addMistake();
    }
  };

  const gameRules = [
    {
      icon: '1️⃣',
      text: `1'den ${size * size}'a kadar tüm sayıları ardı ardına (zincirleme) birleştirmen gerekiyor.`,
    },
    {
      icon: '2️⃣',
      text: "Numbrix'in aksine, Hidato'da sayılar Yatay, Dikey VEYA Çapraz (Diagonal) olarak bağlanabilir! (8 farklı yön).",
    },
    {
      icon: '3️⃣',
      text: 'Kırmızı uyarı alırsan sayılar birbirinden fazla uzaktır.',
    },
  ];

  return (
    <>
      <LogicGameWrapper
        title="Hidato"
        emoji="🐍"
        subtitle={`${size}x${size} Izgara`}
        gradientFrom="from-yellow-600/40"
        gradientTo="to-amber-700/40"
        onExit={onExit}
        onShowRules={() => setShowRules(true)}
        infoCard={
          <div className="flex gap-3 text-sm font-bold">
            <div className="text-white/90">
              Hata: {mistakes}/{getMaxMistakes()}
            </div>
            <div className={timeLeft <= 30 ? 'text-red-400 animate-pulse' : 'text-white/90'}>
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>
        }
      >
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full">
          <div className="flex-1 w-full max-w-md">
            <div className="flex justify-center">
              <div className="bg-amber-900/50 p-3 rounded-3xl shadow-2xl border-4 border-amber-800 backdrop-blur-sm">
                <div
                  className="grid gap-1.5"
                  style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
                >
                  {board.map((row, r) =>
                    row.map((cell, c) => {
                      if (cell === -1) {
                        return (
                          <div key={`${r}-${c}`} className="w-12 h-12 md:w-16 md:h-16 opacity-0" />
                        );
                      }

                      const fixed = isFixed(r, c);
                      const selected = selectedCell?.r === r && selectedCell?.c === c;
                      const isError = errorCells.some((e) => e.r === r && e.c === c);

                      return (
                        <button
                          key={`${r}-${c}`}
                          onClick={() => handleCellClick(r, c)}
                          className={`w-12 h-12 md:w-16 md:h-16 text-xl md:text-2xl font-black rounded-xl transition-all duration-200 flex items-center justify-center border-b-4 relative overflow-hidden
                                                        ${
                                                          fixed
                                                            ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)] cursor-not-allowed'
                                                            : selected
                                                              ? 'bg-rose-400 text-white border-rose-600 shadow-[0_0_20px_rgba(251,113,133,0.8)] scale-110 z-10'
                                                              : cell !== 0
                                                                ? 'bg-amber-500 text-white border-amber-700 shadow-md hover:bg-amber-400 hover:border-amber-600 hover:-translate-y-1'
                                                                : 'bg-slate-800 text-slate-300 border-slate-900 hover:bg-slate-700 hover:border-slate-800'
                                                        }
                                                        ${isError ? 'ring-4 ring-rose-500 animate-pulse border-rose-700 bg-rose-600 text-white' : ''}
                                                    `}
                        >
                          {cell !== 0 ? cell : ''}
                          {!fixed && !selected && cell === 0 && (
                            <div
                              className="absolute inset-0 opacity-10"
                              style={{
                                backgroundImage:
                                  'radial-gradient(circle at 50% 50%, white 2px, transparent 2px)',
                                backgroundSize: '10px 10px',
                              }}
                            />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-xs bg-slate-800/60 p-6 rounded-3xl shadow-2xl border border-white/10">
            <h3 className="text-center font-black text-rose-400 mb-4 text-xl">Sayı Girişi</h3>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    if (selectedCell) {
                      const currentVal = board[selectedCell.r][selectedCell.c];
                      const newVal = currentVal === 0 ? num : parseInt(`${currentVal}${num}`);
                      if (newVal <= size * size) {
                        handleNumberInput(newVal);
                      }
                    }
                  }}
                  className="bg-slate-700 hover:bg-rose-500 text-white h-14 md:h-16 rounded-xl font-black text-2xl transition-colors shadow-md border-b-4 border-slate-900 hover:border-rose-700 active:translate-y-1 active:border-b-0"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => {
                  if (selectedCell) {
                    const currentVal = board[selectedCell.r][selectedCell.c];
                    const newVal = currentVal === 0 ? 0 : parseInt(`${currentVal}0`);
                    if (newVal > 0 && newVal <= size * size) {
                      handleNumberInput(newVal);
                    }
                  }
                }}
                className="bg-slate-700 hover:bg-rose-500 text-white h-14 md:h-16 rounded-xl font-black text-2xl transition-colors shadow-md border-b-4 border-slate-900 hover:border-rose-700 active:translate-y-1 active:border-b-0"
              >
                0
              </button>
              <button
                onClick={handleDelete}
                className="col-span-2 bg-slate-600 hover:bg-slate-500 text-white h-14 md:h-16 rounded-xl font-black text-xl transition-colors shadow-md border-b-4 border-slate-800 hover:border-slate-700 active:translate-y-1 active:border-b-0"
              >
                SİL (X)
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center leading-relaxed">
              Art arda basarak iki basamaklı sayı yazabilirsin (Maks: {size * size}).
            </p>
          </div>
        </div>
      </LogicGameWrapper>

      <RulesOverlay
        show={showRules}
        onClose={() => setShowRules(false)}
        title="Hidato (Number Snake)"
        emoji="🐍"
        rules={gameRules}
        gradientFrom="from-yellow-600"
        gradientTo="to-amber-700"
      />

      <GameOverOverlay
        show={isGameOver}
        onRestart={() => resetGame(initGame)}
        onExit={() => onComplete(score)}
        score={score}
        gameWon={gameWon}
        mistakes={mistakes}
        maxMistakes={getMaxMistakes()}
        timeLeft={timeLeft}
        gradientFrom="from-yellow-600"
        gradientTo="to-amber-700"
      />
    </>
  );
};

export default HidatoGame;
