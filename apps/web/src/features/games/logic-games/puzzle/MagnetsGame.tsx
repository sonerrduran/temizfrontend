import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';
import { LogicGameWrapper, RulesOverlay, GameOverOverlay, useLogicGame } from '../shared';

interface MagnetsGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface Domino {
  id: number;
  r1: number;
  c1: number;
  r2: number;
  c2: number;
}

interface BoardData {
  size: { r: number; c: number };
  dominoes: Domino[];
  topPlus: number[];
  topMinus: number[];
  leftPlus: number[];
  leftMinus: number[];
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: { r: 3, c: 4 },
    topPlus: [1, 1, 1, 0],
    topMinus: [0, 1, 1, 1],
    leftPlus: [2, 0, 1],
    leftMinus: [0, 2, 1],
    dominoes: [
      { id: 1, r1: 0, c1: 0, r2: 0, c2: 1 },
      { id: 2, r1: 0, c1: 2, r2: 1, c2: 2 },
      { id: 3, r1: 0, c1: 3, r2: 1, c2: 3 },
      { id: 4, r1: 1, c1: 0, r2: 2, c2: 0 },
      { id: 5, r1: 1, c1: 1, r2: 2, c2: 1 },
      { id: 6, r1: 2, c1: 2, r2: 2, c2: 3 },
    ],
  },
  5: {
    size: { r: 4, c: 5 },
    topPlus: [2, 0, 2, 0, 1],
    topMinus: [1, 1, 1, 2, 0],
    leftPlus: [2, 1, 2, 0],
    leftMinus: [1, 2, 0, 2],
    dominoes: [
      { id: 1, r1: 0, c1: 0, r2: 0, c2: 1 },
      { id: 2, r1: 0, c1: 2, r2: 0, c2: 3 },
      { id: 3, r1: 0, c1: 4, r2: 1, c2: 4 },
      { id: 4, r1: 1, c1: 0, r2: 2, c2: 0 },
      { id: 5, r1: 1, c1: 1, r2: 2, c2: 1 },
      { id: 6, r1: 1, c1: 2, r2: 1, c2: 3 },
      { id: 7, r1: 2, c1: 2, r2: 2, c2: 3 },
      { id: 8, r1: 2, c1: 4, r2: 3, c2: 4 },
      { id: 9, r1: 3, c1: 0, r2: 3, c2: 1 },
      { id: 10, r1: 3, c1: 2, r2: 3, c2: 3 },
    ],
  },
  6: {
    size: { r: 5, c: 6 },
    topPlus: [1, 2, 1, 2, 1, 1],
    topMinus: [1, 1, 2, 1, 1, 2],
    leftPlus: [2, 1, 2, 1, 2],
    leftMinus: [2, 1, 2, 2, 1],
    dominoes: [
      { id: 1, r1: 0, c1: 0, r2: 1, c2: 0 },
      { id: 2, r1: 0, c1: 1, r2: 0, c2: 2 },
      { id: 3, r1: 0, c1: 3, r2: 1, c2: 3 },
      { id: 4, r1: 0, c1: 4, r2: 0, c2: 5 },
      { id: 5, r1: 1, c1: 1, r2: 2, c2: 1 },
      { id: 6, r1: 1, c1: 2, r2: 2, c2: 2 },
      { id: 7, r1: 1, c1: 4, r2: 1, c2: 5 },
      { id: 8, r1: 2, c1: 0, r2: 3, c2: 0 },
      { id: 9, r1: 2, c1: 3, r2: 2, c2: 4 },
      { id: 10, r1: 2, c1: 5, r2: 3, c2: 5 },
      { id: 11, r1: 3, c1: 1, r2: 3, c2: 2 },
      { id: 12, r1: 3, c1: 3, r2: 4, c2: 3 },
      { id: 13, r1: 3, c1: 4, r2: 4, c2: 4 },
      { id: 14, r1: 4, c1: 0, r2: 4, c2: 1 },
      { id: 15, r1: 4, c1: 2, r2: 4, c2: 5 }, // Wait, 4,2 and 4,5 are not adjacent.
    ],
  },
};

// Fix board 6 dominoes since 4,2 and 4,5 is wrong. It should be 4,2-4,3 (but 4,3 is taken by id 12).
BOARDS[6].dominoes = [
  { id: 1, r1: 0, c1: 0, r2: 1, c2: 0 },
  { id: 2, r1: 0, c1: 1, r2: 0, c2: 2 },
  { id: 3, r1: 0, c1: 3, r2: 1, c2: 3 },
  { id: 4, r1: 0, c1: 4, r2: 0, c2: 5 },
  { id: 5, r1: 1, c1: 1, r2: 2, c2: 1 },
  { id: 6, r1: 1, c1: 2, r2: 2, c2: 2 },
  { id: 7, r1: 1, c1: 4, r2: 1, c2: 5 },
  { id: 8, r1: 2, c1: 0, r2: 3, c2: 0 },
  { id: 9, r1: 2, c1: 3, r2: 2, c2: 4 },
  { id: 10, r1: 2, c1: 5, r2: 3, c2: 5 },
  { id: 11, r1: 3, c1: 1, r2: 3, c2: 2 },
  { id: 12, r1: 3, c1: 3, r2: 4, c2: 3 },
  { id: 13, r1: 3, c1: 4, r2: 4, c2: 4 },
  { id: 14, r1: 4, c1: 0, r2: 4, c2: 1 },
  { id: 15, r1: 4, c1: 2, r2: 4, c2: 5 }, // Needs fix. Cells left: 4,2; 4,5. Not adjacent.
];

// Let's rewrite Board 6 to be valid. 5x6 grid. Total cells 30. 15 dominos.
BOARDS[6].dominoes = [
  { id: 1, r1: 0, c1: 0, r2: 0, c2: 1 },
  { id: 2, r1: 0, c1: 2, r2: 0, c2: 3 },
  { id: 3, r1: 0, c1: 4, r2: 0, c2: 5 },
  { id: 4, r1: 1, c1: 0, r2: 2, c2: 0 },
  { id: 5, r1: 1, c1: 1, r2: 2, c2: 1 },
  { id: 6, r1: 1, c1: 2, r2: 1, c2: 3 },
  { id: 7, r1: 1, c1: 4, r2: 2, c2: 4 },
  { id: 8, r1: 1, c1: 5, r2: 2, c2: 5 },
  { id: 9, r1: 2, c1: 2, r2: 3, c2: 2 },
  { id: 10, r1: 2, c1: 3, r2: 3, c2: 3 },
  { id: 11, r1: 3, c1: 0, r2: 3, c2: 1 },
  { id: 12, r1: 3, c1: 4, r2: 3, c2: 5 },
  { id: 13, r1: 4, c1: 0, r2: 4, c2: 1 },
  { id: 14, r1: 4, c1: 2, r2: 4, c2: 3 },
  { id: 15, r1: 4, c1: 4, r2: 4, c2: 5 },
];

const MagnetsGame: React.FC<MagnetsGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
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

  const diffSize = getSizeForDifficulty();
  const boardData = BOARDS[diffSize] || BOARDS[5];
  const { r: R, c: C } = boardData.size;

  const [grid, setGrid] = useState<number[][]>([]);

  const {
    timeLeft,
    mistakes,
    maxMistakes,
    isGameOver,
    showRules,
    setShowRules,
    addMistake,
    endGame,
  } = useLogicGame({
    difficulty,
    timeLimit: getTimeForDifficulty(),
    onComplete,
    onTimeUp: () => handleGameOver(false),
    onMaxMistakes: () => handleGameOver(false),
  });

  const initGame = useCallback(() => {
    setGrid(
      Array(R)
        .fill(0)
        .map(() => Array(C).fill(0))
    );
  }, [R, C]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleGameOver = (win: boolean) => {
    let finalStars = 1;
    if (win) {
      finalStars = 5 - Math.floor(mistakes / 2);
      if (timeLeft > getTimeForDifficulty() * 0.5) finalStars += 1;
    }
    endGame(Math.min(finalStars, 5));
  };

  const handleDominoClick = (domino: Domino) => {
    if (isGameOver || showRules) return;

    // Cycle: Empty(0,0) -> +/-(1,-1) -> -/+(-1,1) -> X/X(2,2) -> Empty(0,0)
    const cell1 = grid[domino.r1][domino.c1];

    let newV1 = 0,
      newV2 = 0;
    if (cell1 === 0) {
      newV1 = 1;
      newV2 = -1;
    } else if (cell1 === 1) {
      newV1 = -1;
      newV2 = 1;
    } else if (cell1 === -1) {
      newV1 = 2;
      newV2 = 2;
    } else if (cell1 === 2) {
      newV1 = 0;
      newV2 = 0;
    }

    const newGrid = grid.map((row) => [...row]);
    newGrid[domino.r1][domino.c1] = newV1;
    newGrid[domino.r2][domino.c2] = newV2;
    setGrid(newGrid);

    checkWinCondition(newGrid);
  };

  const handleRightClick = (e: React.MouseEvent, domino: Domino) => {
    e.preventDefault();
    if (isGameOver || showRules) return;

    // Direct toggle to Empty/Neutral X
    const newGrid = grid.map((row) => [...row]);
    newGrid[domino.r1][domino.c1] = 2;
    newGrid[domino.r2][domino.c2] = 2;
    setGrid(newGrid);

    checkWinCondition(newGrid);
  };

  const checkWinCondition = (currentGrid: number[][]) => {
    // 1. Same poles cannot be orthogonally adjacent
    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        const val = currentGrid[r][c];
        if (val !== 1 && val !== -1) continue;

        if (r > 0 && currentGrid[r - 1][c] === val) {
          addMistake();
          return;
        }
        if (c > 0 && currentGrid[r][c - 1] === val) {
          addMistake();
          return;
        }
      }
    }
    let isFull = true;
    let countsMatch = true;

    const currentTopPlus = Array(C).fill(0);
    const currentTopMinus = Array(C).fill(0);
    const currentLeftPlus = Array(R).fill(0);
    const currentLeftMinus = Array(R).fill(0);

    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        const val = currentGrid[r][c];
        if (val === 0) isFull = false;
        if (val === 1) {
          currentTopPlus[c]++;
          currentLeftPlus[r]++;
        }
        if (val === -1) {
          currentTopMinus[c]++;
          currentLeftMinus[r]++;
        }
      }
    }

    for (let c = 0; c < C; c++) {
      if (currentTopPlus[c] !== boardData.topPlus[c]) countsMatch = false;
      if (currentTopMinus[c] !== boardData.topMinus[c]) countsMatch = false;
    }

    for (let r = 0; r < R; r++) {
      if (currentLeftPlus[r] !== boardData.leftPlus[r]) countsMatch = false;
      if (currentLeftMinus[r] !== boardData.leftMinus[r]) countsMatch = false;
    }

    if (isFull && countsMatch) {
      handleGameOver(true);
    }
  };

  const cellSize = 56;

  const rules = [
    'Domino bloklarının içine mıknatıslar [ + | - ] veya [ - | + ] yerleştir. Boş [ X | X ] de bırakabilirsin.',
    'Aynı kutuplar (iki tane + yan yana veya alt alta) ASLA temas edemezler! Mıknatıslar birbirini iter.',
    'Satır/Sütun dışındaki rakamlar, o doğrultuda kaç tane + ve kaç tane - kutup olduğunu gösterir.',
  ];

  return (
    <LogicGameWrapper
      title="Magnets"
      emoji="🧲"
      gradient="from-red-600/40 to-pink-700/40"
      timeLeft={timeLeft}
      mistakes={mistakes}
      maxMistakes={maxMistakes}
      onExit={onExit}
      difficulty={difficulty}
    >
      <RulesOverlay
        show={showRules}
        onClose={() => setShowRules(false)}
        title="Magnets Puzzle"
        emoji="🧲"
        rules={rules}
      />

      <GameOverOverlay
        show={isGameOver}
        onRestart={initGame}
        onExit={onExit}
        onComplete={onComplete}
        timeLeft={timeLeft}
        mistakes={mistakes}
        maxMistakes={maxMistakes}
      />

      <div className="w-full max-w-4xl px-4 py-6 md:py-12">
        <div className="flex justify-center mb-8 relative">
          <div className="flex flex-col items-center">
            <div className="flex mb-2 ml-[88px]">
              {boardData.topPlus.map((val, c) => (
                <div
                  key={`tcp-${c}`}
                  className="flex flex-col items-center justify-end font-black"
                  style={{ width: `${cellSize}px` }}
                >
                  <span className="text-red-400 font-black text-xs md:text-sm">+{val}</span>
                  <span className="text-blue-400 font-black text-xs md:text-sm">
                    -{boardData.topMinus[c]}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex">
              <div className="flex flex-col mr-2 justify-between py-2">
                {boardData.leftPlus.map((val, r) => (
                  <div
                    key={`lcp-${r}`}
                    className="flex items-center justify-end font-black gap-2 pr-2"
                    style={{ height: `${cellSize}px` }}
                  >
                    <span className="text-red-400 font-black text-xs md:text-sm">+{val}</span>
                    <span className="text-blue-400 font-black text-xs md:text-sm">
                      -{boardData.leftMinus[r]}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="relative bg-slate-300 shadow-2xl rounded-xl border-[6px] border-slate-700 p-2 overflow-hidden"
                style={{
                  width: `${C * cellSize + 16}px`,
                  height: `${R * cellSize + 16}px`,
                }}
              >
                <div
                  className="absolute inset-2 grid pointer-events-none opacity-20"
                  style={{ gridTemplateColumns: `repeat(${C}, 1fr)` }}
                >
                  {Array(R * C)
                    .fill(0)
                    .map((_, i) => (
                      <div key={`bg-${i}`} className="border border-slate-900" />
                    ))}
                </div>

                <div className="absolute inset-2">
                  {boardData.dominoes.map((domino) => {
                    const isHorizontal = domino.r1 === domino.r2;
                    const width = isHorizontal ? cellSize * 2 : cellSize;
                    const height = isHorizontal ? cellSize : cellSize * 2;

                    const val1 = grid[domino.r1][domino.c1];
                    const val2 = grid[domino.r2][domino.c2];

                    const renderCellContent = (val: number) => {
                      if (val === 1)
                        return (
                          <span className="text-3xl text-red-500 drop-shadow-sm leading-none">
                            +
                          </span>
                        );
                      if (val === -1)
                        return (
                          <span className="text-3xl text-blue-500 drop-shadow-sm leading-none">
                            -
                          </span>
                        );
                      if (val === 2)
                        return (
                          <span className="text-xl text-slate-500 drop-shadow-sm opacity-50">
                            X
                          </span>
                        );
                      return null;
                    };

                    return (
                      <button
                        key={`domino-${domino.id}`}
                        onClick={() => handleDominoClick(domino)}
                        onContextMenu={(e) => handleRightClick(e, domino)}
                        className={`absolute border-[3px] border-slate-800 bg-white shadow-sm flex items-center justify-center transition-all hover:bg-slate-100 hover:z-10 cursor-pointer overflow-hidden
                                                    ${isHorizontal ? 'flex-row' : 'flex-col'}
                                                `}
                        style={{
                          top: `${domino.r1 * cellSize}px`,
                          left: `${domino.c1 * cellSize}px`,
                          width: `${width}px`,
                          height: `${height}px`,
                          borderRadius: '8px',
                        }}
                      >
                        <div
                          className={`absolute bg-slate-300 pointer-events-none
                                                    ${isHorizontal ? 'w-[2px] h-full left-1/2 -translate-x-1/2' : 'h-[2px] w-full top-1/2 -translate-y-1/2'}
                                                `}
                        />

                        <div
                          className={`flex items-center justify-center font-black transition-colors duration-300
                                                    ${val1 === 1 ? 'bg-red-50/50' : val1 === -1 ? 'bg-blue-50/50' : val1 === 2 ? 'bg-slate-200' : ''}
                                                `}
                          style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                        >
                          {renderCellContent(val1)}
                        </div>

                        <div
                          className={`flex items-center justify-center font-black transition-colors duration-300
                                                    ${val2 === 1 ? 'bg-red-50/50' : val2 === -1 ? 'bg-blue-50/50' : val2 === 2 ? 'bg-slate-200' : ''}
                                                `}
                          style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                        >
                          {renderCellContent(val2)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center bg-slate-800/50 p-4 rounded-2xl border border-white/5 max-w-sm mx-auto">
          <p className="text-slate-400 text-sm font-medium">
            Bloklara (Sol Tık) basarak kutupları değiştirin. Sağ tıklayarak hızla{' '}
            <span className="font-black text-slate-300">X</span> (boş) bırakabilirsiniz.
          </p>
        </div>
      </div>
    </LogicGameWrapper>
  );
};

export default MagnetsGame;
