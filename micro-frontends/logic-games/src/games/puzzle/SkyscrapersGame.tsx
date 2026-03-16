import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';
import { LogicGameWrapper, RulesOverlay, GameOverOverlay, useLogicGame } from '../../shared';

interface SkyscrapersGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface BoardData {
  size: number;
  clues: {
    top: number[];
    right: number[];
    bottom: number[];
    left: number[];
  };
  given?: { r: number; c: number; val: number }[];
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    clues: {
      top: [0, 2, 2, 0],
      right: [0, 3, 0, 1],
      bottom: [2, 0, 0, 2],
      left: [1, 2, 0, 3],
    },
    given: [{ r: 0, c: 3, val: 2 }],
  },
  5: {
    size: 5,
    clues: {
      top: [4, 0, 1, 0, 3],
      right: [2, 0, 3, 0, 2],
      bottom: [0, 0, 4, 3, 0],
      left: [1, 5, 0, 0, 2],
    },
  },
};

const SkyscrapersGame: React.FC<SkyscrapersGameProps> = ({
  grade,
  difficulty,
  onComplete,
  onExit,
}) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 4;
      default:
        return 5;
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

  const [board, setBoard] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);

  const { timeLeft, mistakes, isGameOver, showRules, setShowRules, addMistake, endGame } =
    useLogicGame({
      difficulty,
      onComplete,
    });

  const initGame = useCallback(() => {
    const initialBoard = Array(size)
      .fill(null)
      .map(() => Array(size).fill(0));

    if (boardData.given) {
      boardData.given.forEach((g) => {
        initialBoard[g.r][g.c] = g.val;
      });
    }

    setBoard(initialBoard);
    setSelectedCell(null);
  }, [size, boardData]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleGameOver = (win: boolean) => {
    endGame(win);
  };

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver || showRules) return;
    if (boardData.given?.some((g) => g.r === r && g.c === c)) return;

    setSelectedCell({ r, c });
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || isGameOver || showRules) return;

    const { r, c } = selectedCell;
    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = num;
    setBoard(newBoard);

    for (let i = 0; i < size; i++) {
      if (i !== c && newBoard[r][i] === num) {
        addMistake();
        newBoard[r][c] = 0;
        setBoard(newBoard);
        return;
      }
      if (i !== r && newBoard[i][c] === num) {
        addMistake();
        newBoard[r][c] = 0;
        setBoard(newBoard);
        return;
      }
    }

    checkWinCondition(newBoard);
  };

  const countVisible = (line: number[]) => {
    let maxSeen = 0;
    let visibleCount = 0;
    for (const height of line) {
      if (height === 0) return -1;
      if (height > maxSeen) {
        visibleCount++;
        maxSeen = height;
      }
    }
    return visibleCount;
  };

  const checkWinCondition = (currentBoard: number[][]) => {
    let isFull = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] === 0) {
          isFull = false;
          break;
        }
      }
    }
    if (!isFull) return;

    for (let c = 0; c < size; c++) {
      if (boardData.clues.top[c] !== 0) {
        const line = [];
        for (let r = 0; r < size; r++) line.push(currentBoard[r][c]);
        if (countVisible(line) !== boardData.clues.top[c]) return;
      }
    }

    for (let c = 0; c < size; c++) {
      if (boardData.clues.bottom[c] !== 0) {
        const line = [];
        for (let r = size - 1; r >= 0; r--) line.push(currentBoard[r][c]);
        if (countVisible(line) !== boardData.clues.bottom[c]) return;
      }
    }

    for (let r = 0; r < size; r++) {
      if (boardData.clues.left[r] !== 0) {
        const line = [...currentBoard[r]];
        if (countVisible(line) !== boardData.clues.left[r]) return;
      }
    }

    for (let r = 0; r < size; r++) {
      if (boardData.clues.right[r] !== 0) {
        const line = [...currentBoard[r]].reverse();
        if (countVisible(line) !== boardData.clues.right[r]) return;
      }
    }

    handleGameOver(true);
  };

  const rules = [
    "Her satıra ve sütuna 1'den " +
      size +
      "'e kadar tüm sayıları tam olarak birer kez yerleştirmelisin (Sudoku gibi).",
    'Rakamlar binaların yüksekliğini temsil eder. Büyük binalar küçük binaları arkasında gizler.',
    'Alan dışındaki sayılar, o yönden bakıldığında (ilk binadan başlayarak arka arkaya) kaç tane bina görebildiğini söyler.',
  ];

  return (
    <LogicGameWrapper
      title="Skyscrapers"
      emoji="🏢"
      gradient="from-slate-600/40 to-gray-700/40"
      timeLeft={timeLeft}
      mistakes={mistakes}
      maxMistakes={5}
      onExit={onExit}
      difficulty={difficulty}
    >
      <RulesOverlay
        show={showRules}
        onClose={() => setShowRules(false)}
        title="Gökdelenler"
        emoji="🏢"
        rules={rules}
      />

      <GameOverOverlay
        show={isGameOver}
        onRestart={initGame}
        onExit={onExit}
        onComplete={onComplete}
        timeLeft={timeLeft}
        mistakes={mistakes}
        maxMistakes={5}
      />

      <div className="w-full max-w-2xl px-4">
        <div className="flex justify-center mb-8">
          <div className="relative inline-block">
            <div className="flex ml-12 mb-2 w-fit">
              {boardData.clues.top.map((c, i) => (
                <div
                  key={`t-${i}`}
                  className={`w-12 md:w-16 h-8 flex items-end justify-center font-black text-xl ${c ? 'text-emerald-400' : 'text-transparent'}`}
                >
                  {c}
                </div>
              ))}
            </div>

            <div className="flex">
              <div className="flex flex-col mr-2">
                {boardData.clues.left.map((c, i) => (
                  <div
                    key={`l-${i}`}
                    className={`w-8 h-12 md:h-16 flex items-center justify-end font-black text-xl pr-2 ${c ? 'text-emerald-400' : 'text-transparent'}`}
                  >
                    {c}
                  </div>
                ))}
              </div>

              <div
                className="grid gap-[2px] bg-indigo-900/50 p-2 md:p-3 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.2)] border-2 border-indigo-500/20"
                style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
              >
                {board.map((row, r) =>
                  row.map((cell, c) => {
                    const isGiven = boardData.given?.some((g) => g.r === r && g.c === c);
                    const isSelected = selectedCell?.r === r && selectedCell?.c === c;

                    return (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => handleCellClick(r, c)}
                        className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl font-black text-2xl md:text-3xl transition-all
                                                    ${
                                                      isGiven
                                                        ? 'bg-slate-700 text-slate-300 font-bold cursor-not-allowed shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]'
                                                        : isSelected
                                                          ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.8)] scale-110 z-10'
                                                          : 'bg-slate-800 hover:bg-slate-700 text-indigo-100 shadow-sm border-b-4 border-slate-900 active:border-b-0 active:translate-y-1'
                                                    }`}
                      >
                        {cell !== 0 ? cell : ''}
                      </button>
                    );
                  })
                )}
              </div>

              <div className="flex flex-col ml-2">
                {boardData.clues.right.map((c, i) => (
                  <div
                    key={`r-${i}`}
                    className={`w-8 h-12 md:h-16 flex items-center justify-start font-black text-xl pl-2 ${c ? 'text-emerald-400' : 'text-transparent'}`}
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex ml-12 mt-2 w-fit">
              {boardData.clues.bottom.map((c, i) => (
                <div
                  key={`b-${i}`}
                  className={`w-12 md:w-16 h-8 flex items-start justify-center font-black text-xl ${c ? 'text-emerald-400' : 'text-transparent'}`}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 md:flex md:justify-center gap-2 max-w-md mx-auto">
          {[1, 2, 3, 4, 5, 6, 7].slice(0, size).map((num) => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              className="bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-400 text-white font-black text-xl md:text-2xl p-4 rounded-2xl transition-all shadow-lg active:scale-95 flex-1"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleNumberInput(0)}
            className="bg-rose-900/50 hover:bg-rose-600 border border-rose-800 hover:border-rose-400 text-white font-black text-xl md:text-2xl p-4 rounded-2xl transition-all shadow-lg active:scale-95 flex-1 md:flex-none md:w-20"
          >
            X
          </button>
        </div>
      </div>
    </LogicGameWrapper>
  );
};

export default SkyscrapersGame;
