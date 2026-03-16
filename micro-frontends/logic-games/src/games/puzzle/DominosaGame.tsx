import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';
import { LogicGameWrapper, RulesOverlay, GameOverOverlay, useLogicGame } from '../../shared';

interface DominosaProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface BoardData {
  maxNum: number; // e.g. 3 means dominoes 0-0 to 3-3 (10 dominoes)
  rows: number;
  cols: number;
  numbers: number[][]; // The grid of numbers
}

// 0-0 to 3-3 -> 10 dominoes. Grid needs to be 4x5 = 20 cells
// 0-0 to 4-4 -> 15 dominoes. Grid needs to be 5x6 = 30 cells
// 0-0 to 5-5 -> 21 dominoes. Grid needs to be 6x7 = 42 cells

const BOARDS: Record<number, BoardData> = {
  3: {
    maxNum: 3,
    rows: 4,
    cols: 5,
    numbers: [
      [2, 0, 3, 2, 0],
      [1, 1, 0, 1, 3],
      [0, 1, 3, 0, 3],
      [3, 2, 2, 2, 1],
    ],
  },
  4: {
    maxNum: 4,
    rows: 5,
    cols: 6,
    numbers: [
      [3, 4, 1, 0, 4, 2],
      [1, 3, 4, 3, 1, 2],
      [3, 0, 0, 4, 4, 1],
      [2, 2, 0, 4, 0, 0],
      [1, 1, 3, 2, 2, 3],
    ],
  },
  5: {
    maxNum: 5,
    rows: 6,
    cols: 7,
    numbers: [
      [5, 4, 3, 1, 5, 2, 1],
      [4, 0, 3, 2, 4, 4, 5],
      [5, 0, 1, 5, 0, 3, 4],
      [5, 0, 3, 0, 4, 5, 1],
      [1, 2, 1, 0, 2, 2, 1],
      [2, 3, 2, 3, 2, 3, 0],
    ],
  },
};

const DominosaGame: React.FC<DominosaProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getConfig = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 3;
      case Difficulty.MEDIUM:
        return 4;
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return 5;
      default:
        return 4;
    }
  };

  const maxNum = getConfig();
  const boardData = BOARDS[maxNum] || BOARDS[3];

  const generateAllDominoes = useCallback(() => {
    const arr: string[] = [];
    for (let i = 0; i <= boardData.maxNum; i++) {
      for (let j = i; j <= boardData.maxNum; j++) {
        arr.push(`${i}-${j}`);
      }
    }
    return arr;
  }, [boardData.maxNum]);

  const [placedDominoes, setPlacedDominoes] = useState<
    { r1: number; c1: number; r2: number; c2: number }[]
  >([]);
  const [hConns, setHConns] = useState<number[][]>([]);
  const [vConns, setVConns] = useState<number[][]>([]);

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
    timeLimit: 600 + maxNum * 300,
    onComplete,
    onTimeUp: () => handleGameOver(false),
    onMaxMistakes: () => handleGameOver(false),
  });

  const checkWinCondition = useCallback(
    (
      currentPlaced: { r1: number; c1: number; r2: number; c2: number }[],
      currentH: number[][],
      currentV: number[][]
    ) => {
      const formedDominoes: string[] = [];
      const usedCells = Array(boardData.rows)
        .fill(false)
        .map(() => Array(boardData.cols).fill(false));

      for (const pd of currentPlaced) {
        const v1 = boardData.numbers[pd.r1][pd.c1];
        const v2 = boardData.numbers[pd.r2][pd.c2];
        const name = v1 <= v2 ? `${v1}-${v2}` : `${v2}-${v1}`;
        formedDominoes.push(name);
        usedCells[pd.r1][pd.c1] = true;
        usedCells[pd.r2][pd.c2] = true;
      }

      let isFull = true;
      for (let r = 0; r < boardData.rows; r++) {
        for (let c = 0; c < boardData.cols; c++) {
          if (!usedCells[r][c]) {
            isFull = false;
            break;
          }
        }
        if (!isFull) break;
      }

      if (!isFull) return;

      const uniqueDoms = new Set(formedDominoes);

      if (
        uniqueDoms.size === formedDominoes.length &&
        formedDominoes.length === generateAllDominoes().length
      ) {
        handleGameOver(true);
      } else {
        addMistake();
      }
    },
    [boardData, generateAllDominoes, addMistake]
  );
  const initGame = useCallback(() => {
    setPlacedDominoes([]);
    setHConns(
      Array(boardData.rows - 1)
        .fill(0)
        .map(() => Array(boardData.cols).fill(0))
    );
    setVConns(
      Array(boardData.rows)
        .fill(0)
        .map(() => Array(boardData.cols - 1).fill(0))
    );
  }, [boardData.cols, boardData.rows]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleGameOver = (win: boolean) => {
    let finalStars = 1;
    if (win) {
      finalStars = 5 - Math.floor(mistakes / 2);
      if (timeLeft > 300) finalStars += 1;
    }
    endGame(Math.min(finalStars, 5));
  };

  const isCellUsed = (
    r: number,
    c: number,
    checkPlaced: { r1: number; c1: number; r2: number; c2: number }[]
  ) => {
    return checkPlaced.some((p) => (p.r1 === r && p.c1 === c) || (p.r2 === r && p.c2 === c));
  };

  const toggleConn = (type: 'h' | 'v', r: number, c: number, buttonObj: number) => {
    // 0: empty -> 1: Join (Left Click)
    // 0: empty -> 2: X (Right Click)
    // 1: Join -> 0: empty
    // 2: X -> 0: empty

    if (isGameOver || showRules) return;

    let curPlaced = [...placedDominoes];
    let newH = hConns.map((row) => [...row]);
    let newV = vConns.map((row) => [...row]);

    let currentVal = type === 'h' ? hConns[r][c] : vConns[r][c];

    // Define adjacent cells
    const r1 = r,
      c1 = c;
    const r2 = type === 'h' ? r + 1 : r;
    const c2 = type === 'h' ? c : c + 1;

    if (buttonObj === 0) {
      // Left Click (Join)
      if (currentVal === 1) {
        // Remove join
        if (type === 'h') newH[r][c] = 0;
        else newV[r][c] = 0;
        curPlaced = curPlaced.filter(
          (p) => !(p.r1 === r1 && p.c1 === c1 && p.r2 === r2 && p.c2 === c2)
        );
      } else {
        // Ensure neither cell is already used
        if (isCellUsed(r1, c1, curPlaced) || isCellUsed(r2, c2, curPlaced)) return;

        // Add join
        if (type === 'h') newH[r][c] = 1;
        else newV[r][c] = 1;
        // If there were X's, overwrite
        curPlaced.push({ r1, c1, r2, c2 });
      }
    } else if (buttonObj === 2) {
      // Right Click (X)
      if (currentVal === 2) {
        // Remove X
        if (type === 'h') newH[r][c] = 0;
        else newV[r][c] = 0;
      } else {
        // Add X
        if (type === 'h') newH[r][c] = 2;
        else newV[r][c] = 2;
        // If it was joined before, remove the placement
        if (currentVal === 1) {
          curPlaced = curPlaced.filter(
            (p) => !(p.r1 === r1 && p.c1 === c1 && p.r2 === r2 && p.c2 === c2)
          );
        }
      }
    }

    setPlacedDominoes(curPlaced);
    setHConns(newH);
    setVConns(newV);

    checkWinCondition(curPlaced, newH, newV);
  };

  const getUsedDominoes = () => {
    const used = new Set<string>();
    placedDominoes.forEach((p) => {
      const v1 = boardData.numbers[p.r1][p.c1];
      const v2 = boardData.numbers[p.r2][p.c2];
      const name = v1 <= v2 ? `${v1}-${v2}` : `${v2}-${v1}`;
      used.add(name);
    });
    return used;
  };
  const usedSet = getUsedDominoes();
  const allDominoes = generateAllDominoes();

  const rules = [
    "0'dan " + maxNum + "'e kadar olan zarları içeren TAM BİR DOMİNO SETİ ızgaraya gizlendi.",
    'Aynı sayı çiftine sahip bir domino (Örn: 1-2) oyunda sadece BİR KERE bulunabilir.',
    "İki sayı arasına Sol tıklayarak domino hattı kur, Sağ tıklayarak (X) 'burası ayrı kalmalı' diye işaretle.",
  ];

  return (
    <LogicGameWrapper
      title="Dominosa"
      emoji="🁣"
      gradient="from-rose-600/40 to-red-700/40"
      timeLeft={timeLeft}
      mistakes={mistakes}
      maxMistakes={maxMistakes}
      onExit={onExit}
      difficulty={difficulty}
    >
      <RulesOverlay
        show={showRules}
        onClose={() => setShowRules(false)}
        title="Domino Logic"
        emoji="🁣"
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

      <div className="flex flex-col lg:flex-row gap-8 justify-center w-full">
        <div className="relative select-none touch-none mx-auto bg-slate-100 p-6 sm:p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border-4 border-slate-300">
          <div className="flex flex-col gap-2">
            {boardData.numbers.map((row, r) => (
              <React.Fragment key={`row-${r}`}>
                <div className="flex gap-2">
                  {row.map((cellObj, c) => {
                    const vJoin = c < boardData.cols - 1 ? vConns[r][c] : 0;
                    const isUsed = isCellUsed(r, c, placedDominoes);

                    let joinedRight = placedDominoes.some(
                      (p) => p.r1 === r && p.c1 === c && p.r2 === r && p.c2 === c + 1
                    );
                    let joinedLeft = placedDominoes.some(
                      (p) => p.r1 === r && p.c1 === c - 1 && p.r2 === r && p.c2 === c
                    );
                    let joinedBottom = placedDominoes.some(
                      (p) => p.r1 === r && p.c1 === c && p.r2 === r + 1 && p.c2 === c
                    );
                    let joinedTop = placedDominoes.some(
                      (p) => p.r1 === r - 1 && p.c1 === c && p.r2 === r && p.c2 === c
                    );

                    const baseColor = isUsed
                      ? 'bg-slate-800 text-white'
                      : 'bg-white text-slate-800';

                    let borderRadius = 'rounded-lg';
                    if (joinedRight) borderRadius = 'rounded-l-full rounded-r-none';
                    else if (joinedLeft) borderRadius = 'rounded-r-full rounded-l-none';
                    else if (joinedBottom) borderRadius = 'rounded-t-full rounded-b-none';
                    else if (joinedTop) borderRadius = 'rounded-b-full rounded-t-none';

                    return (
                      <React.Fragment key={`cell-${r}-${c}`}>
                        <div
                          className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center font-black text-2xl sm:text-3xl transition-colors duration-200 border-2 border-slate-300/50 shadow-sm z-10 ${baseColor} ${borderRadius}`}
                        >
                          {cellObj}
                        </div>

                        {c < boardData.cols - 1 && (
                          <div
                            className={`w-6 h-12 sm:w-8 sm:h-16 flex items-center justify-center cursor-pointer group -mx-4 z-20 hover:scale-110 active:scale-95 relative transition-transform`}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleConn('v', r, c, 0);
                            }}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              toggleConn('v', r, c, 2);
                            }}
                          >
                            <div
                              className={`w-10 h-6 sm:w-14 sm:h-8 rounded-full flex items-center justify-center transition-colors
                                                                ${vJoin === 1 ? 'bg-slate-800' : vJoin === 2 ? 'bg-transparent text-slate-400' : 'bg-slate-200/50 group-hover:bg-rose-200'}
                                                            `}
                            >
                              {vJoin === 2 && <span className="text-xl font-black">×</span>}
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {r < boardData.rows - 1 && (
                  <div className="flex gap-2">
                    {row.map((_, c) => {
                      const hJoin = hConns[r][c];

                      return (
                        <React.Fragment key={`hjoin-${r}-${c}`}>
                          <div
                            className={`w-12 h-6 sm:w-16 sm:h-8 flex items-center justify-center cursor-pointer group -my-4 z-20 hover:scale-110 active:scale-95 relative transition-transform`}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleConn('h', r, c, 0);
                            }}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              toggleConn('h', r, c, 2);
                            }}
                          >
                            <div
                              className={`w-6 h-10 sm:w-8 sm:h-14 rounded-full flex items-center justify-center transition-colors
                                                                ${hJoin === 1 ? 'bg-slate-800' : hJoin === 2 ? 'bg-transparent text-slate-400' : 'bg-slate-200/50 group-hover:bg-rose-200'}
                                                            `}
                            >
                              {hJoin === 2 && <span className="text-xl font-black">×</span>}
                            </div>
                          </div>

                          {c < boardData.cols - 1 && <div className="w-6 sm:w-8" />}
                        </React.Fragment>
                      );
                    })}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/80 p-6 rounded-3xl border border-white/10 shadow-xl flex-1 max-w-sm">
          <h3 className="text-center text-slate-400 font-bold mb-4 text-sm uppercase tracking-wider flex items-center justify-center gap-2">
            <span>Kullanılacak Dominolar</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded-full text-white">
              {placedDominoes.length} / {allDominoes.length}
            </span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {allDominoes.map((domino) => {
              const isPlaced = usedSet.has(domino);
              const [d1, d2] = domino.split('-');
              return (
                <div
                  key={domino}
                  className={`flex rounded-xl overflow-hidden border-2 transition-all duration-300
                                    ${isPlaced ? 'border-slate-700 opacity-30 grayscale' : 'border-slate-600 bg-white shadow-md shadow-white/5'}
                                `}
                >
                  <div
                    className={`w-1/2 flex items-center justify-center py-2 font-black text-lg ${isPlaced ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-800'}`}
                  >
                    {d1}
                  </div>
                  <div className="w-[2px] bg-slate-400/30"></div>
                  <div
                    className={`w-1/2 flex items-center justify-center py-2 font-black text-lg ${isPlaced ? 'bg-slate-800 text-slate-500' : 'bg-white text-slate-800'}`}
                  >
                    {d2}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LogicGameWrapper>
  );
};

export default DominosaGame;
