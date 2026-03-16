import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';
import { LogicGameWrapper, RulesOverlay, GameOverOverlay, useLogicGame } from '../shared';

interface BinairoGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

type CellState = 'empty' | 'zero' | 'one';

interface BoardData {
  size: number;
  clues: { r: number; c: number; val: CellState }[];
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    clues: [
      { r: 0, c: 1, val: 'zero' },
      { r: 1, c: 3, val: 'one' },
      { r: 2, c: 0, val: 'one' },
      { r: 3, c: 2, val: 'zero' },
    ],
  },
  6: {
    size: 6,
    clues: [
      { r: 0, c: 0, val: 'one' },
      { r: 0, c: 1, val: 'one' },
      { r: 1, c: 3, val: 'zero' },
      { r: 1, c: 5, val: 'zero' },
      { r: 3, c: 0, val: 'zero' },
      { r: 5, c: 2, val: 'one' },
      { r: 5, c: 4, val: 'one' },
    ],
  },
};

const BinairoGame: React.FC<BinairoGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 4;
      default:
        return 6;
    }
  };

  const size = getSizeForDifficulty();
  const boardData = BOARDS[size] || BOARDS[6];

  const [board, setBoard] = useState<CellState[][]>([]);

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
    maxMistakes: difficulty === Difficulty.VERY_HARD ? 1 : difficulty === Difficulty.HARD ? 2 : 3,
  });

  const initGame = useCallback(() => {
    const initialBoard = Array(size)
      .fill(null)
      .map(() => Array(size).fill('empty' as CellState));
    boardData.clues.forEach((clue) => {
      initialBoard[clue.r][clue.c] = clue.val;
    });
    setBoard(initialBoard);
  }, [size, boardData]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver) return;
    if (boardData.clues.some((clue) => clue.r === r && clue.c === c)) return;

    const newBoard = board.map((row) => [...row]);
    const currentState = newBoard[r][c];

    // Cycle: empty -> zero -> one -> empty
    if (currentState === 'empty') newBoard[r][c] = 'zero';
    else if (currentState === 'zero') newBoard[r][c] = 'one';
    else newBoard[r][c] = 'empty';

    setBoard(newBoard);

    if (newBoard[r][c] !== 'empty') {
      if (!isValidPlacement(newBoard, r, c)) {
        addMistake();
        newBoard[r][c] = currentState;
        setBoard(newBoard);
        return;
      }
    }

    checkWinCondition(newBoard);
  };

  const isValidPlacement = (currentBoard: CellState[][], r: number, c: number) => {
    const val = currentBoard[r][c];
    if (val === 'empty') return true;

    // Rule 1: No more than 2 consecutive identical numbers
    // Check Row
    if (c >= 2 && currentBoard[r][c - 1] === val && currentBoard[r][c - 2] === val) return false;
    if (c >= 1 && c < size - 1 && currentBoard[r][c - 1] === val && currentBoard[r][c + 1] === val)
      return false;
    if (c < size - 2 && currentBoard[r][c + 1] === val && currentBoard[r][c + 2] === val)
      return false;

    // Check Col
    if (r >= 2 && currentBoard[r - 1][c] === val && currentBoard[r - 2][c] === val) return false;
    if (r >= 1 && r < size - 1 && currentBoard[r - 1][c] === val && currentBoard[r + 1][c] === val)
      return false;
    if (r < size - 2 && currentBoard[r + 1][c] === val && currentBoard[r + 2][c] === val)
      return false;

    // Rule 2: Equal number of 0s and 1s per row/col
    let rowCount = 0;
    for (let i = 0; i < size; i++) if (currentBoard[r][i] === val) rowCount++;
    if (rowCount > size / 2) return false;

    let colCount = 0;
    for (let i = 0; i < size; i++) if (currentBoard[i][c] === val) colCount++;
    if (colCount > size / 2) return false;

    return true;
  };

  const arraysEqual = (a: CellState[], b: CellState[]) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] === 'empty' || b[i] === 'empty') return false;
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  const checkWinCondition = (currentBoard: CellState[][]) => {
    // 1. Is it full?
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] === 'empty') return;
      }
    }

    // 2. Check Rule 3: No two rows/columns can be the same
    for (let r1 = 0; r1 < size - 1; r1++) {
      for (let r2 = r1 + 1; r2 < size; r2++) {
        if (arraysEqual(currentBoard[r1], currentBoard[r2])) return;
      }
    }

    for (let c1 = 0; c1 < size - 1; c1++) {
      const col1 = currentBoard.map((row) => row[c1]);
      for (let c2 = c1 + 1; c2 < size; c2++) {
        const col2 = currentBoard.map((row) => row[c2]);
        if (arraysEqual(col1, col2)) return;
      }
    }

    endGame(true);
  };

  const gameRules = [
    'Izgarayı tamamen 0 (Mavi) ve 1 (Kırmızı) ile doldurmalısın.',
    'Yatay veya dikeyde aynı sayıdan arka arkaya en fazla 2 tane gelebilir.',
    'Her satırda ve sütunda eşit sayıda 0 ve 1 olmalıdır.',
    'Hiçbir iki satır veya sütun birbiriyle tamamen aynı olamaz.',
  ];

  return (
    <>
      <LogicGameWrapper
        title="Binairo"
        emoji="🔴"
        subtitle={`${size}x${size} Izgara`}
        gradientFrom="from-fuchsia-600"
        gradientTo="to-purple-700"
        onExit={onExit}
        onShowRules={() => setShowRules(true)}
        infoCard={
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-rose-400 font-bold text-lg">❌ {mistakes}/3</div>
            </div>
            <div
              className={`text-center font-bold text-lg ${timeLeft <= 30 ? 'text-red-400 animate-pulse' : 'text-fuchsia-400'}`}
            >
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>
        }
      >
        {/* Board */}
        <div className="flex justify-center mb-6">
          <div
            className="grid gap-2 bg-slate-900/80 p-4 rounded-2xl shadow-2xl border-4 border-slate-700"
            style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
          >
            {board.map((row, r) =>
              row.map((cellState, c) => {
                const isClue = boardData.clues.some((cl) => cl.r === r && cl.c === c);

                let cellStyle = 'bg-slate-700 hover:bg-slate-600 border border-slate-600';
                if (cellState === 'zero')
                  cellStyle = 'bg-blue-500 text-white shadow-lg shadow-blue-500/50';
                else if (cellState === 'one')
                  cellStyle = 'bg-rose-500 text-white shadow-lg shadow-rose-500/50';

                if (isClue) {
                  if (cellState === 'zero')
                    cellStyle =
                      'bg-blue-800 text-blue-200 cursor-not-allowed border-2 border-blue-500/50';
                  else if (cellState === 'one')
                    cellStyle =
                      'bg-rose-800 text-rose-200 cursor-not-allowed border-2 border-rose-500/50';
                }

                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl font-black text-3xl transition-all transform active:scale-90 ${cellStyle}`}
                  >
                    {cellState === 'zero' ? '0' : cellState === 'one' ? '1' : ''}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Control Guide */}
        <div className="text-center bg-slate-900/50 p-4 rounded-xl">
          <p className="text-white text-sm font-bold">
            1 Tık: <span className="text-blue-200 bg-blue-600 px-2 rounded mx-1">0</span> | 2 Tık:{' '}
            <span className="text-rose-200 bg-rose-600 px-2 rounded mx-1">1</span> | 3 Tık: Boş
          </p>
        </div>
      </LogicGameWrapper>

      <RulesOverlay
        show={showRules}
        onClose={() => setShowRules(false)}
        title="Binairo"
        emoji="🔴"
        rules={gameRules}
        accentColor="pink"
      />

      <GameOverOverlay
        show={isGameOver}
        won={gameWon}
        score={score}
        onRestart={() => resetGame(initGame)}
        onExit={() => onComplete(score)}
        accentColor="pink"
        winTitle="MÜKEMMEL!"
        loseTitle="MANTIK HATASI!"
        loseEmoji="💥"
      />
    </>
  );
};

export default BinairoGame;
