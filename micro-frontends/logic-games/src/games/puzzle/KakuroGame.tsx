import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';
import { LogicGameWrapper, RulesOverlay, GameOverOverlay, useLogicGame } from '../../shared';

interface KakuroGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

type CellType = 'black' | 'clue' | 'white';

interface Cell {
  r: number;
  c: number;
  type: CellType;
  downClue?: number;
  rightClue?: number;
  value?: number; // for white cells
  targetValue?: number; // the correct answer
}

// Generate a simple Kakuro board
// Kakuro generation is NP-hard to guarantee unique solutions generally,
// but for a kids generic game we can make rigid templates or run a simplified generator.
// Size 4x4 or 5x5
const generateKakuroBoard = (size: number): Cell[][] => {
  // 1. Create fully white board with top and left edges as black/clue
  const board: Cell[][] = Array(size)
    .fill(null)
    .map((_, r) =>
      Array(size)
        .fill(null)
        .map((_, c) => ({
          r,
          c,
          type: r === 0 || c === 0 ? 'black' : 'white',
          value: 0,
        }))
    );

  // Add some random black blocks in the middle to make it interesting
  // Size 4 or 5 can have 1 or 2 internal black cells
  if (size > 4) {
    board[2][2].type = 'black';
  }

  // 2. Fill white cells with random valid Kakuro numbers (1-9) ensuring no dupes in runs
  // For small boards, random filling then validating is usually fast enough
  const fillBoard = () => {
    const tempBoard = board.map((row) => row.map((c) => ({ ...c })));
    for (let r = 1; r < size; r++) {
      for (let c = 1; c < size; c++) {
        if (tempBoard[r][c].type === 'white') {
          // Collect used in horizontal run
          let usedH = new Set();
          for (let cc = c - 1; cc >= 1; cc--) {
            if (tempBoard[r][cc].type !== 'white') break;
            usedH.add(tempBoard[r][cc].targetValue);
          }
          // Collect used in vertical run
          let usedV = new Set();
          for (let rr = r - 1; rr >= 1; rr--) {
            if (tempBoard[rr][c].type !== 'white') break;
            usedV.add(tempBoard[rr][c].targetValue);
          }

          const available = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
            (n) => !usedH.has(n) && !usedV.has(n)
          );
          if (available.length === 0) return null; // Dead end
          const val = available[Math.floor(Math.random() * available.length)];
          tempBoard[r][c].targetValue = val;
        }
      }
    }
    return tempBoard;
  };

  let filledBoard = null;
  let attempts = 0;
  while (!filledBoard && attempts < 100) {
    filledBoard = fillBoard();
    attempts++;
  }

  if (!filledBoard) {
    // Fallback to purely sequential (might have obvious patterns but it avoids infinite loops)
    filledBoard = board;
    let counter = 1;
    for (let r = 1; r < size; r++) {
      for (let c = 1; c < size; c++) {
        if (filledBoard[r][c].type === 'white') {
          filledBoard[r][c].targetValue = counter++;
          if (counter > 9) counter = 1;
        }
      }
    }
  }

  // 3. Scan runs and assign clues to the black cells before them
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (filledBoard[r][c].type === 'black') {
        let rightSum = 0;
        let hasRightRun = false;
        for (let cc = c + 1; cc < size; cc++) {
          if (filledBoard[r][cc].type === 'white') {
            rightSum += filledBoard[r][cc].targetValue!;
            hasRightRun = true;
          } else break;
        }

        let downSum = 0;
        let hasDownRun = false;
        for (let rr = r + 1; rr < size; rr++) {
          if (filledBoard[rr][c].type === 'white') {
            downSum += filledBoard[rr][c].targetValue!;
            hasDownRun = true;
          } else break;
        }

        if (hasRightRun || hasDownRun) {
          filledBoard[r][c].type = 'clue';
          if (hasRightRun) filledBoard[r][c].rightClue = rightSum;
          if (hasDownRun) filledBoard[r][c].downClue = downSum;
        }
      }
    }
  }

  return filledBoard;
};

const KakuroGame: React.FC<KakuroGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
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
  const maxMistakes = difficulty === Difficulty.HARD || difficulty === Difficulty.VERY_HARD ? 3 : 5;

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
  } = useLogicGame({ difficulty, onComplete, maxMistakes });

  const initGame = useCallback(() => {
    const newBoard = generateKakuroBoard(size);
    setBoard(newBoard);
    setSelectedCell(null);
  }, [size]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const validateBoard = (currentBoard: Cell[][]) => {
    let isFull = true;
    let isCorrect = true;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const cell = currentBoard[r][c];
        if (cell.type === 'white') {
          if (!cell.value) isFull = false;
          else if (cell.value !== cell.targetValue) isCorrect = false;
        }
      }
    }

    if (isFull && isCorrect) endGame(true);
  };

  const handleInput = (num: number) => {
    if (isGameOver || !selectedCell) return;
    const [r, c] = selectedCell;

    if (board[r][c].type !== 'white') return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    if (newBoard[r][c].targetValue !== num) {
      addMistake();
    } else {
      newBoard[r][c].value = num;
      setBoard(newBoard);
      validateBoard(newBoard);
    }
  };

  const handleCellClick = (r: number, c: number) => {
    if (board[r][c].type === 'white' && !board[r][c].value) {
      setSelectedCell([r, c]);
    }
  };

  const gameRules = [
    'Amaç tüm beyaz hücreleri 1 ile 9 arasındaki rakamlarla doldurmaktır.',
    'Siyah hücrelerdeki diyagonal çizginin sağ üstündeki sayı, sağındaki beyaz hücrelerin toplamını verir.',
    'Siyah hücrelerdeki diyagonal çizginin sol altındaki sayı, altındaki beyaz hücrelerin toplamını verir.',
    'Bir toplam grubu (run) içinde bir rakam yalnızca bir kez kullanılabilir!',
  ];

  return (
    <>
      <LogicGameWrapper
        title="Kakuro"
        emoji="➕"
        subtitle={`${size}x${size} Izgara`}
        gradientFrom="from-orange-600"
        gradientTo="to-amber-700"
        onExit={onExit}
        onShowRules={() => setShowRules(true)}
        infoCard={
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-white font-bold text-lg">
                ❌ {mistakes}/{maxMistakes}
              </div>
            </div>
            <div
              className={`text-center font-bold text-lg ${timeLeft <= 30 ? 'text-red-400 animate-pulse' : 'text-orange-300'}`}
            >
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>
        }
      >
        <div className="flex flex-col items-center select-none">
          {/* Kakuro Grid */}
          <div
            className="bg-slate-300 p-1 md:p-2 rounded-xl grid gap-0.5 border-4 border-slate-700 mb-8 max-w-[360px] w-full"
            style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
          >
            {board.map((row, r) =>
              row.map((cell, c) => {
                const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;

                if (cell.type === 'black') {
                  return (
                    <div
                      key={`${r}-${c}`}
                      className="aspect-square bg-slate-800 rounded-sm overflow-hidden"
                    ></div>
                  );
                }

                if (cell.type === 'clue') {
                  return (
                    <div
                      key={`${r}-${c}`}
                      className="aspect-square bg-slate-800 rounded-sm relative overflow-hidden flex"
                    >
                      <div className="absolute inset-0 w-[141%] h-0.5 bg-slate-600 origin-top-left rotate-45 pointer-events-none"></div>
                      <div className="flex-1 h-full relative">
                        {cell.downClue && (
                          <span className="absolute bottom-1 right-2 lg:bottom-1 lg:right-2 text-[10px] md:text-xs font-black text-white/90 z-10 leading-none">
                            {cell.downClue}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 h-full relative">
                        {cell.rightClue && (
                          <span className="absolute top-1 right-1 lg:top-1.5 lg:right-1.5 text-[10px] md:text-xs font-black text-white/90 z-10 leading-none">
                            {cell.rightClue}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`
                                            aspect-square flex items-center justify-center text-xl md:text-3xl font-black rounded-sm transition-all
                                            ${cell.value ? 'bg-white text-slate-800' : 'bg-slate-100 hover:bg-slate-200'}
                                            ${isSelected ? 'ring-4 ring-orange-400 z-10 scale-105' : ''}
                                        `}
                  >
                    {cell.value || ''}
                  </button>
                );
              })
            )}
          </div>

          {/* Numpad */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-sm">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleInput(num)}
                disabled={!selectedCell || !!board[selectedCell[0]]?.[selectedCell[1]]?.value}
                className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl font-black text-xl md:text-3xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed transition-transform border border-orange-400/50"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </LogicGameWrapper>

      <RulesOverlay
        show={showRules}
        onClose={() => setShowRules(false)}
        title="Kakuro"
        emoji="➕"
        rules={gameRules}
        accentColor="orange"
      />

      <GameOverOverlay
        show={isGameOver}
        won={gameWon}
        score={score}
        onRestart={() => resetGame(initGame)}
        onExit={() => onComplete(score)}
        accentColor="orange"
        winTitle="HARİKA!"
        loseTitle={mistakes >= maxMistakes ? 'ÇOK HATA!' : 'SÜRE BİTTİ'}
        loseEmoji={mistakes >= maxMistakes ? '❌' : '⏰'}
      />
    </>
  );
};

export default KakuroGame;
