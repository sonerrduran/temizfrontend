import React, { useState, useEffect } from 'react';
import { Difficulty } from '../../types';
import { LogicGameWrapper, RulesOverlay, GameOverOverlay, useLogicGame } from '../../shared';

interface StarBattleGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

type CellState = 'empty' | 'star' | 'cross';

interface Region {
  id: number;
  cells: { r: number; c: number }[];
}

interface BoardData {
  size: number;
  starsPerLine: number;
  regions: Region[];
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    starsPerLine: 1,
    regions: [
      {
        id: 1,
        cells: [
          { r: 0, c: 0 },
          { r: 0, c: 1 },
          { r: 1, c: 0 },
        ],
      },
      {
        id: 2,
        cells: [
          { r: 0, c: 2 },
          { r: 0, c: 3 },
          { r: 1, c: 3 },
        ],
      },
      {
        id: 3,
        cells: [
          { r: 1, c: 1 },
          { r: 1, c: 2 },
          { r: 2, c: 1 },
          { r: 2, c: 2 },
        ],
      },
      {
        id: 4,
        cells: [
          { r: 2, c: 0 },
          { r: 3, c: 0 },
          { r: 3, c: 1 },
        ],
      },
      {
        id: 5,
        cells: [
          { r: 2, c: 3 },
          { r: 3, c: 2 },
          { r: 3, c: 3 },
        ],
      },
    ], // same as Suguru 4x4 regions for simplicity
  },
  5: {
    size: 5,
    starsPerLine: 1,
    regions: [
      {
        id: 1,
        cells: [
          { r: 0, c: 0 },
          { r: 0, c: 1 },
          { r: 1, c: 0 },
          { r: 2, c: 0 },
        ],
      },
      {
        id: 2,
        cells: [
          { r: 0, c: 2 },
          { r: 0, c: 3 },
          { r: 1, c: 2 },
          { r: 1, c: 3 },
        ],
      },
      {
        id: 3,
        cells: [
          { r: 0, c: 4 },
          { r: 1, c: 4 },
          { r: 2, c: 4 },
        ],
      },
      {
        id: 4,
        cells: [
          { r: 1, c: 1 },
          { r: 2, c: 1 },
          { r: 2, c: 2 },
          { r: 3, c: 1 },
          { r: 3, c: 2 },
        ],
      },
      {
        id: 5,
        cells: [
          { r: 2, c: 3 },
          { r: 3, c: 3 },
          { r: 4, c: 3 },
          { r: 4, c: 4 },
        ],
      },
      { id: 6, cells: [{ r: 3, c: 4 }] },
      {
        id: 7,
        cells: [
          { r: 3, c: 0 },
          { r: 4, c: 0 },
          { r: 4, c: 1 },
          { r: 4, c: 2 },
        ],
      },
    ], // same as Suguru 5x5 regions for simplicity
  },
  8: {
    // For Hard/Very Hard, a typical 8x8 2-star logic
    size: 8,
    starsPerLine: 2,
    regions: [
      {
        id: 1,
        cells: [
          { r: 0, c: 0 },
          { r: 0, c: 1 },
          { r: 0, c: 2 },
          { r: 1, c: 0 },
        ],
      },
      {
        id: 2,
        cells: [
          { r: 0, c: 3 },
          { r: 0, c: 4 },
          { r: 0, c: 5 },
          { r: 0, c: 6 },
          { r: 0, c: 7 },
          { r: 1, c: 7 },
        ],
      },
      {
        id: 3,
        cells: [
          { r: 1, c: 1 },
          { r: 1, c: 2 },
          { r: 2, c: 0 },
          { r: 2, c: 1 },
          { r: 3, c: 0 },
        ],
      },
      {
        id: 4,
        cells: [
          { r: 1, c: 3 },
          { r: 1, c: 4 },
          { r: 2, c: 2 },
          { r: 2, c: 3 },
          { r: 3, c: 1 },
          { r: 3, c: 2 },
          { r: 4, c: 0 },
          { r: 4, c: 1 },
        ],
      },
      {
        id: 5,
        cells: [
          { r: 1, c: 5 },
          { r: 1, c: 6 },
          { r: 2, c: 4 },
          { r: 2, c: 5 },
          { r: 2, c: 6 },
          { r: 3, c: 3 },
          { r: 3, c: 4 },
        ],
      },
      {
        id: 6,
        cells: [
          { r: 2, c: 7 },
          { r: 3, c: 5 },
          { r: 3, c: 6 },
          { r: 3, c: 7 },
          { r: 4, c: 5 },
          { r: 4, c: 6 },
          { r: 5, c: 5 },
        ],
      },
      {
        id: 7,
        cells: [
          { r: 4, c: 2 },
          { r: 4, c: 3 },
          { r: 4, c: 4 },
          { r: 5, c: 3 },
          { r: 5, c: 4 },
          { r: 6, c: 4 },
        ],
      },
      {
        id: 8,
        cells: [
          { r: 5, c: 0 },
          { r: 5, c: 1 },
          { r: 6, c: 0 },
          { r: 7, c: 0 },
          { r: 7, c: 1 },
        ],
      },
      {
        id: 9,
        cells: [
          { r: 5, c: 2 },
          { r: 6, c: 1 },
          { r: 6, c: 2 },
          { r: 6, c: 3 },
          { r: 7, c: 2 },
          { r: 7, c: 3 },
        ],
      },
      {
        id: 10,
        cells: [
          { r: 4, c: 7 },
          { r: 5, c: 6 },
          { r: 5, c: 7 },
          { r: 6, c: 5 },
          { r: 6, c: 6 },
          { r: 6, c: 7 },
          { r: 7, c: 4 },
          { r: 7, c: 5 },
          { r: 7, c: 6 },
          { r: 7, c: 7 },
        ],
      },
    ],
  },
};

const StarBattleGame: React.FC<StarBattleGameProps> = ({
  grade,
  difficulty,
  onComplete,
  onExit,
}) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
        return 4;
      case Difficulty.EASY:
        return 5;
      default:
        return 8; // 8x8 uses 2 stars
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

  const [board, setBoard] = useState<CellState[][]>([]);

  useEffect(() => {
    initGame();
  }, [size, difficulty]);

  const initGame = () => {
    const initialBoard = Array(size)
      .fill(null)
      .map(() => Array(size).fill('empty' as CellState));
    setBoard(initialBoard);
  };

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver || showRules) return;

    const newBoard = board.map((row) => [...row]);
    const currentState = newBoard[r][c];

    // Cycle: empty -> star -> cross -> empty
    if (currentState === 'empty') newBoard[r][c] = 'star';
    else if (currentState === 'star') newBoard[r][c] = 'cross';
    else newBoard[r][c] = 'empty';

    setBoard(newBoard);

    // Instant validation for mistakes when placing a star
    if (newBoard[r][c] === 'star') {
      if (!isValidPlacement(newBoard, r, c)) {
        addMistake();
        // Revert if invalid
        newBoard[r][c] = 'cross';
        setBoard(newBoard);
        return;
      }
    }

    checkWinCondition(newBoard);
  };

  const isValidPlacement = (currentBoard: CellState[][], r: number, c: number) => {
    const targetStars = boardData.starsPerLine;

    // Check Touch constraint
    const touchConflict = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ].some(([dr, dc]) => {
      const nr = r + dr,
        nc = c + dc;
      return nr >= 0 && nr < size && nc >= 0 && nc < size && currentBoard[nr][nc] === 'star';
    });

    if (touchConflict) return false;

    // Check Row limit
    let rowStars = 0;
    for (let i = 0; i < size; i++) if (currentBoard[r][i] === 'star') rowStars++;
    if (rowStars > targetStars) return false;

    // Check Col limit
    let colStars = 0;
    for (let i = 0; i < size; i++) if (currentBoard[i][c] === 'star') colStars++;
    if (colStars > targetStars) return false;

    // Check Region limit
    const region = boardData.regions.find((reg) =>
      reg.cells.some((cell) => cell.r === r && cell.c === c)
    );
    if (region) {
      let regStars = 0;
      region.cells.forEach((cell) => {
        if (currentBoard[cell.r][cell.c] === 'star') regStars++;
      });
      if (regStars > targetStars) return false;
    }

    return true;
  };

  const checkWinCondition = (currentBoard: CellState[][]) => {
    const targetStars = boardData.starsPerLine;

    // Count total stars
    let totalStars = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] === 'star') totalStars++;
      }
    }

    if (totalStars !== targetStars * size) return;

    // Verify rows and columns
    for (let i = 0; i < size; i++) {
      let rowStars = 0,
        colStars = 0;
      for (let j = 0; j < size; j++) {
        if (currentBoard[i][j] === 'star') rowStars++;
        if (currentBoard[j][i] === 'star') colStars++;
      }
      if (rowStars !== targetStars || colStars !== targetStars) return;
    }

    // Verify regions
    for (const region of boardData.regions) {
      let regStars = 0;
      for (const cell of region.cells) {
        if (currentBoard[cell.r][cell.c] === 'star') regStars++;
      }
      if (regStars !== targetStars) return;
    }

    endGame(true);
  };

  const gameRules = [
    {
      icon: '1️⃣',
      text: `Her satır, her sütun ve kalın çizgilerle ayrılmış her bölgede tam olarak ${boardData.starsPerLine} adet Yıldız bulunmalıdır.`,
    },
    {
      icon: '2️⃣',
      text: 'Yıldızlar birbirine yatay, dikey veya çaprazdan değemez!',
    },
    {
      icon: '3️⃣',
      text: 'Yıldız olamayacak yerleri çarpı ile işaretle.',
    },
  ];

  const getCellBorders = (r: number, c: number) => {
    const region = boardData.regions.find((reg) =>
      reg.cells.some((cell) => cell.r === r && cell.c === c)
    );
    if (!region) return '';

    let borders = 'border border-amber-200/20 '; // default soft border

    const hasTop = !region.cells.some((cell) => cell.r === r - 1 && cell.c === c);
    const hasBottom = !region.cells.some((cell) => cell.r === r + 1 && cell.c === c);
    const hasLeft = !region.cells.some((cell) => cell.r === r && cell.c === c - 1);
    const hasRight = !region.cells.some((cell) => cell.r === r && cell.c === c + 1);

    if (hasTop) borders += 'border-t-[3px] border-t-amber-400 ';
    if (hasBottom) borders += 'border-b-[3px] border-b-amber-400 ';
    if (hasLeft) borders += 'border-l-[3px] border-l-amber-400 ';
    if (hasRight) borders += 'border-r-[3px] border-r-amber-400 ';

    return borders;
  };

  return (
    <>
      <LogicGameWrapper
        title="Star Battle"
        emoji="⭐"
        subtitle={`${size}x${size} Izgara - ${boardData.starsPerLine} Yıldız`}
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
        {/* Board */}
        <div className="flex justify-center mb-6">
          <div
            className="grid gap-0 bg-amber-700/40 p-2 rounded-2xl border-2 border-amber-400"
            style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
          >
            {board.map((row, r) =>
              row.map((cellState, c) => {
                const borders = getCellBorders(r, c);
                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center text-3xl font-black transition-all transform active:scale-90
                                            ${borders}
                                            ${cellState === 'star' ? 'bg-amber-500/30' : cellState === 'cross' ? 'bg-amber-900/40' : 'bg-amber-800/60 hover:bg-amber-700/60'}`}
                  >
                    {cellState === 'star' ? (
                      '⭐'
                    ) : cellState === 'cross' ? (
                      <span className="text-rose-500/70 text-2xl">❌</span>
                    ) : (
                      ''
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Control Guide */}
        <div className="text-center bg-white/10 p-4 rounded-2xl">
          <p className="text-white text-sm font-bold">
            1 Tık: <span className="mx-1">⭐</span> | 2 Tık:{' '}
            <span className="mx-1 text-rose-300">❌</span> | 3 Tık: Boş
          </p>
        </div>
      </LogicGameWrapper>

      <RulesOverlay
        show={showRules}
        onClose={() => setShowRules(false)}
        title="Star Battle"
        emoji="⭐"
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

export default StarBattleGame;
