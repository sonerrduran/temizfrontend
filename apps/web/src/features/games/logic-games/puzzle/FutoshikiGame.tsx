import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';
import { LogicGameWrapper, RulesOverlay, GameOverOverlay, useLogicGame } from '../shared';

interface FutoshikiGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

type Inequality = '>' | '<' | '^' | 'v' | null;

interface Cell {
  r: number;
  c: number;
  value: number | null;
  targetValue: number;
  isFixed: boolean;
  rightInequality: Inequality; // '>' means current > right, '<' means current < right
  bottomInequality: Inequality; // 'v' means current > bottom, '^' means current < bottom
}

const generateFutoshikiBoard = (size: number, difficulty: Difficulty): Cell[][] => {
  // 1. Generate a valid Latin Square
  const board: number[][] = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));

  const fillSquare = (r: number, c: number): boolean => {
    if (r === size) return true;
    if (c === size) return fillSquare(r + 1, 0);

    const usedInRow = new Set(board[r]);
    const usedInCol = new Set(board.map((row) => row[c]));

    let available = Array.from({ length: size }, (_, i) => i + 1).filter(
      (n) => !usedInRow.has(n) && !usedInCol.has(n)
    );

    // Shuffle available
    for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
    }

    for (const num of available) {
      board[r][c] = num;
      if (fillSquare(r, c + 1)) return true;
      board[r][c] = 0;
    }
    return false;
  };

  fillSquare(0, 0);

  // 2. Initialize cells
  const cells: Cell[][] = [];
  for (let r = 0; r < size; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < size; c++) {
      row.push({
        r,
        c,
        value: null,
        targetValue: board[r][c],
        isFixed: false,
        rightInequality: null,
        bottomInequality: null,
      });
    }
    cells.push(row);
  }

  // 3. Add inequalities based on target values
  // Density of inequalities depends on difficulty/size. Let's aim for ~ (size*size)/2 inequalities
  const numInequalities = Math.floor(size * size * (difficulty === Difficulty.HARD ? 0.6 : 0.4));
  let placed = 0;
  while (placed < numInequalities) {
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);
    const dir = Math.random() > 0.5 ? 'right' : 'bottom';

    if (dir === 'right' && c < size - 1 && cells[r][c].rightInequality === null) {
      cells[r][c].rightInequality =
        cells[r][c].targetValue > cells[r][c + 1].targetValue ? '>' : '<';
      placed++;
    } else if (dir === 'bottom' && r < size - 1 && cells[r][c].bottomInequality === null) {
      cells[r][c].bottomInequality =
        cells[r][c].targetValue > cells[r + 1][c].targetValue ? 'v' : '^';
      placed++;
    }
  }

  // 4. Reveal some numbers (less numbers revealed for harder difficulties)
  const numRevealed = difficulty === Difficulty.HARD ? size - 2 : size;
  let revealed = 0;
  while (revealed < numRevealed) {
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);
    if (!cells[r][c].isFixed) {
      cells[r][c].isFixed = true;
      cells[r][c].value = cells[r][c].targetValue;
      revealed++;
    }
  }

  return cells;
};

const FutoshikiGame: React.FC<FutoshikiGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 4;
      case Difficulty.MEDIUM:
        return 5;
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return 6;
      default:
        return 5;
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
  const [board, setBoard] = useState<Cell[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  // Merkezi oyun state yönetimi
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
    maxMistakes: difficulty === Difficulty.HARD || difficulty === Difficulty.VERY_HARD ? 3 : 5,
  });

  const initGame = useCallback(() => {
    const newBoard = generateFutoshikiBoard(size, difficulty);
    setBoard(newBoard);
    setSelectedCell(null);
  }, [size, difficulty]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const validateBoard = (currentBoard: Cell[][]) => {
    let isFull = true;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const cell = currentBoard[r][c];
        if (!cell.value) isFull = false;
      }
    }

    if (isFull) {
      // Check Latin Square property (rows and cols unique)
      for (let i = 0; i < size; i++) {
        const rowVals = new Set();
        const colVals = new Set();
        for (let j = 0; j < size; j++) {
          rowVals.add(currentBoard[i][j].value);
          colVals.add(currentBoard[j][i].value);
        }
        if (rowVals.size !== size || colVals.size !== size) {
          addMistake();
          return; // Bad board
        }
      }

      // Check inequalities
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = currentBoard[r][c];
          if (cell.rightInequality) {
            const rightCell = currentBoard[r][c + 1];
            if (cell.rightInequality === '>' && !(cell.value! > rightCell.value!)) {
              addMistake();
              return;
            }
            if (cell.rightInequality === '<' && !(cell.value! < rightCell.value!)) {
              addMistake();
              return;
            }
          }
          if (cell.bottomInequality) {
            const bottomCell = currentBoard[r + 1][c];
            if (cell.bottomInequality === 'v' && !(cell.value! > bottomCell.value!)) {
              addMistake();
              return;
            }
            if (cell.bottomInequality === '^' && !(cell.value! < bottomCell.value!)) {
              addMistake();
              return;
            }
          }
        }
      }

      // If we get here, it's correct
      endGame(true);
    }
  };

  const handleInput = (num: number) => {
    if (isGameOver || !selectedCell) return;
    const [r, c] = selectedCell;

    if (board[r][c].isFixed) return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    // Futoshiki doesn't instantly punish individual wrong cells like Sudoku because it's meant to be guessed and tested sometimes,
    // but for kids we might still want to punish if it violates an immediate visible inequality constraint to guide them.

    // Let's do a soft check of immediate neighbors
    let isObviouslyWrong = false;

    // Check row/col duplicates
    for (let i = 0; i < size; i++) {
      if (i !== c && newBoard[r][i].value === num) isObviouslyWrong = true;
      if (i !== r && newBoard[i][c].value === num) isObviouslyWrong = true;
    }

    // Check immediate inequalities
    if (
      newBoard[r][c].rightInequality === '>' &&
      newBoard[r][c + 1].value &&
      !(num > newBoard[r][c + 1].value!)
    )
      isObviouslyWrong = true;
    if (
      newBoard[r][c].rightInequality === '<' &&
      newBoard[r][c + 1].value &&
      !(num < newBoard[r][c + 1].value!)
    )
      isObviouslyWrong = true;
    if (
      c > 0 &&
      newBoard[r][c - 1].rightInequality === '>' &&
      newBoard[r][c - 1].value &&
      !(newBoard[r][c - 1].value! > num)
    )
      isObviouslyWrong = true;
    if (
      c > 0 &&
      newBoard[r][c - 1].rightInequality === '<' &&
      newBoard[r][c - 1].value &&
      !(newBoard[r][c - 1].value! < num)
    )
      isObviouslyWrong = true;

    if (
      newBoard[r][c].bottomInequality === 'v' &&
      newBoard[r + 1]?.[c].value &&
      !(num > newBoard[r + 1][c].value!)
    )
      isObviouslyWrong = true;
    if (
      newBoard[r][c].bottomInequality === '^' &&
      newBoard[r + 1]?.[c].value &&
      !(num < newBoard[r + 1][c].value!)
    )
      isObviouslyWrong = true;
    if (
      r > 0 &&
      newBoard[r - 1][c].bottomInequality === 'v' &&
      newBoard[r - 1][c].value &&
      !(newBoard[r - 1][c].value! > num)
    )
      isObviouslyWrong = true;
    if (
      r > 0 &&
      newBoard[r - 1][c].bottomInequality === '^' &&
      newBoard[r - 1][c].value &&
      !(newBoard[r - 1][c].value! < num)
    )
      isObviouslyWrong = true;

    if (isObviouslyWrong) {
      addMistake();
      // Don't place it
    } else {
      newBoard[r][c].value = num;
      setBoard(newBoard);
      validateBoard(newBoard);
    }
  };

  const handleCellClick = (r: number, c: number) => {
    if (!board[r][c].isFixed) {
      setSelectedCell([r, c]);
    }
  };

  const gameRules = [
    `Her satır ve her sütunda her sayı (1'den ${size}'e kadar) tam olarak BİR KERE bulunmalıdır.`,
    'Hücreler arasındaki büyüktür (>, v) veya küçüktür (<, ^) işaretlerine kesinlikle uyulmalıdır.',
    'Boş bir hücre seç ve alttaki sayılardan uygun olanı yerleştir.',
    'Hem işaret kurallarına hem de Sudoku (benzersizlik) kuralına uyan çözümü bul!',
  ];

  const padZero = (n: number) => n.toString().padStart(2, '0');

  return (
    <>
      <LogicGameWrapper
        title="Futoshiki"
        emoji="📐"
        subtitle={`${size}x${size} Izgara`}
        gradientFrom="from-blue-600"
        gradientTo="to-cyan-700"
        onExit={onExit}
        onShowRules={() => setShowRules(true)}
        infoCard={
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-rose-400 font-bold text-lg">❌ {mistakes}/5</div>
            </div>
            <div
              className={`text-center font-bold text-lg ${timeLeft <= 30 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`}
            >
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>
        }
      >
        <div className="flex flex-col items-center select-none pb-4">
          {/* Futoshiki Grid */}
          <div className="relative bg-slate-900/80 p-4 md:p-6 rounded-2xl shadow-2xl border-4 border-slate-700 mb-8 max-w-[400px] w-full">
            <div
              className="grid gap-2 md:gap-4 relative"
              style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
            >
              {board.map((row, r) =>
                row.map((cell, c) => {
                  const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;

                  return (
                    <div key={`${r}-${c}`} className="relative">
                      <button
                        onClick={() => handleCellClick(r, c)}
                        className={`
                                                    w-full aspect-square flex items-center justify-center text-2xl md:text-4xl font-black rounded-lg transition-all shadow-md
                                                    ${cell.isFixed ? 'bg-slate-300 text-slate-800 cursor-default' : 'bg-white text-blue-600 hover:bg-blue-50'}
                                                    ${isSelected ? 'ring-4 ring-blue-500 z-10 scale-105' : ''}
                                                `}
                      >
                        {cell.value || ''}
                      </button>

                      {/* Right Inequality */}
                      {cell.rightInequality && (
                        <div className="absolute top-1/2 -right-1 md:-right-2 w-2 md:w-4 flex items-center justify-center -translate-y-1/2 translate-x-full text-xl md:text-2xl font-black text-blue-400 z-20 pointer-events-none drop-shadow-md">
                          {cell.rightInequality}
                        </div>
                      )}

                      {/* Bottom Inequality */}
                      {cell.bottomInequality && (
                        <div className="absolute -bottom-1 md:-bottom-2 left-1/2 h-2 md:h-4 flex items-center justify-center -translate-x-1/2 translate-y-full text-xl md:text-2xl font-black text-blue-400 z-20 pointer-events-none drop-shadow-md">
                          {cell.bottomInequality === 'v' ? 'v' : '^'}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Numpad */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-sm">
            {Array.from({ length: size }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handleInput(num)}
                disabled={!selectedCell || !!board[selectedCell[0]]?.[selectedCell[1]]?.isFixed}
                className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl font-black text-2xl md:text-3xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed transition-transform border border-blue-400/50 shadow-lg"
              >
                {num}
              </button>
            ))}
            {/* Clear Button */}
            <button
              onClick={() => {
                if (!selectedCell || board[selectedCell[0]]?.[selectedCell[1]]?.isFixed) return;
                const [r, c] = selectedCell;
                const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
                newBoard[r][c].value = null;
                setBoard(newBoard);
              }}
              disabled={!selectedCell || !!board[selectedCell[0]]?.[selectedCell[1]]?.isFixed}
              className="w-14 h-14 md:w-16 md:h-16 bg-slate-600 text-white rounded-2xl font-black text-xl hover:bg-slate-500 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed transition-all border border-white/20 flex items-center justify-center shadow-lg"
            >
              ✖️
            </button>
          </div>
        </div>
      </LogicGameWrapper>

      <RulesOverlay
        show={showRules}
        onClose={() => setShowRules(false)}
        title="Futoshiki"
        emoji="📐"
        rules={gameRules}
        accentColor="blue"
      />

      <GameOverOverlay
        show={isGameOver}
        won={gameWon}
        score={score}
        onRestart={() => resetGame(initGame)}
        onExit={() => onComplete(score)}
        accentColor="blue"
        winTitle="HARİKA!"
        loseTitle="ÇOK HATA!"
      />
    </>
  );
};

export default FutoshikiGame;
