import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface KuromasuGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

type CellState = 'empty' | 'black' | 'white'; // white/dot = marked as not black

interface BoardData {
  size: number;
  clues: { r: number; c: number; val: number }[];
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    clues: [
      { r: 0, c: 0, val: 3 },
      { r: 1, c: 2, val: 5 },
      { r: 2, c: 1, val: 5 },
      { r: 3, c: 3, val: 3 },
    ],
  },
  5: {
    size: 5,
    clues: [
      { r: 0, c: 2, val: 5 },
      { r: 1, c: 1, val: 3 },
      { r: 1, c: 3, val: 3 },
      { r: 3, c: 1, val: 3 },
      { r: 3, c: 3, val: 3 },
      { r: 4, c: 2, val: 5 },
    ],
  },
  7: {
    size: 7,
    clues: [
      { r: 0, c: 0, val: 2 },
      { r: 0, c: 6, val: 2 },
      { r: 1, c: 3, val: 7 },
      { r: 3, c: 1, val: 7 },
      { r: 3, c: 5, val: 7 },
      { r: 5, c: 3, val: 7 },
      { r: 6, c: 0, val: 2 },
      { r: 6, c: 6, val: 2 },
    ],
  },
};

const KuromasuGame: React.FC<KuromasuGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
        return 4;
      case Difficulty.EASY:
        return 5;
      default:
        return 7; // Medium/Hard sizes
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
  const boardData = BOARDS[size] || BOARDS[5];

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
    if (boardData.clues.some((clue) => clue.r === r && clue.c === c)) return; // Can't click clues directly, they are always white

    const newBoard = board.map((row) => [...row]);
    const currentState = newBoard[r][c];

    // Cycle: empty -> black -> white -> empty
    if (currentState === 'empty') newBoard[r][c] = 'black';
    else if (currentState === 'black') newBoard[r][c] = 'white';
    else newBoard[r][c] = 'empty';

    setBoard(newBoard);

    // Instant touch check for blacks
    if (newBoard[r][c] === 'black' && hasAdjacentBlacks(newBoard, r, c)) {
      setMistakes((m) => {
        const newM = m + 1;
        if (newM >= maxMistakes) handleGameOver(false);
        return newM;
      });
      newBoard[r][c] = 'white'; // revert to white (dot) upon error
      setBoard(newBoard);
      return;
    }

    checkWinCondition(newBoard);
  };

  const hasAdjacentBlacks = (currentBoard: CellState[][], r: number, c: number) => {
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    for (const [dr, dc] of directions) {
      const nr = r + dr,
        nc = c + dc;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
        if (currentBoard[nr][nc] === 'black') return true;
      }
    }
    return false;
  };

  const getVisibleCells = (currentBoard: CellState[][], clueR: number, clueC: number) => {
    let visible = 1; // Itself

    // Up
    for (let r = clueR - 1; r >= 0; r--) {
      if (currentBoard[r][clueC] === 'black') break;
      visible++;
    }
    // Down
    for (let r = clueR + 1; r < size; r++) {
      if (currentBoard[r][clueC] === 'black') break;
      visible++;
    }
    // Left
    for (let c = clueC - 1; c >= 0; c--) {
      if (currentBoard[clueR][c] === 'black') break;
      visible++;
    }
    // Right
    for (let c = clueC + 1; c < size; c++) {
      if (currentBoard[clueR][c] === 'black') break;
      visible++;
    }

    return visible;
  };

  const isWhiteConnected = (currentBoard: CellState[][]) => {
    let firstWhiteR = -1;
    let firstWhiteC = -1;
    let totalWhiteTarget = 0;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        // Empty counts as white here because black is the active block
        if (currentBoard[r][c] !== 'black') {
          totalWhiteTarget++;
          if (firstWhiteR === -1) {
            firstWhiteR = r;
            firstWhiteC = c;
          }
        }
      }
    }

    if (totalWhiteTarget === 0) return true; // Edge case, all black? invalid by rules but anyway

    const visited = Array(size)
      .fill(false)
      .map(() => Array(size).fill(false));
    const stack = [[firstWhiteR, firstWhiteC]];
    visited[firstWhiteR][firstWhiteC] = true;
    let connectedCount = 1;

    while (stack.length > 0) {
      const [curR, curC] = stack.pop()!;

      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      for (const [dr, dc] of directions) {
        const nr = curR + dr,
          nc = curC + dc;
        if (
          nr >= 0 &&
          nr < size &&
          nc >= 0 &&
          nc < size &&
          !visited[nr][nc] &&
          currentBoard[nr][nc] !== 'black'
        ) {
          visited[nr][nc] = true;
          connectedCount++;
          stack.push([nr, nc]);
        }
      }
    }

    return connectedCount === totalWhiteTarget;
  };

  const checkWinCondition = (currentBoard: CellState[][]) => {
    // Must be full? Actually Kuromasu only demands rules are met.
    // We ensure a cell is either black or white (empty acts as white computationally,
    // but to ensure they finished, let's say all cells must be marked if strict.
    // In standard play, just satisfying the clues and connectivity wins.
    // Let's adopt strictly filled for UI clarity.
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (
          currentBoard[r][c] === 'empty' &&
          !boardData.clues.some((cl) => cl.r === r && cl.c === c)
        ) {
          return; // Wait until all are marked
        }
      }
    }

    // Rule 1: No adjacent blacks handled instantly, but double check
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] === 'black' && hasAdjacentBlacks(currentBoard, r, c)) return;
      }
    }

    // Rule 2: All whites connected
    if (!isWhiteConnected(currentBoard)) return;

    // Rule 3: Clue numbers match exactly
    for (const clue of boardData.clues) {
      if (getVisibleCells(currentBoard, clue.r, clue.c) !== clue.val) return;
    }

    handleGameOver(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans selection:bg-slate-500/30">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">👁️</span> Kuromasu Nasıl Oynanır?
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span className="text-slate-400">🔢</span>
                <div>
                  İçinde sayı olan hücreler, o hücreden bakıldığında sağa, sola, yukarı ve aşağı{' '}
                  <b>siyah kutulara</b> veya <b>duvara</b> çarpana kadar görülebilen toplam{' '}
                  <b>beyaz</b> hücre sayısını (kendi dâhil) gösterir.
                </div>
              </li>
              <li className="flex gap-3 text-rose-400 font-bold">
                <span>🚫</span>
                <span>
                  <b>Siyah kutular</b> birbirine sağdan, soldan, üstten veya alttan temas edemez
                  (çapraz değebilir).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">🔗</span>
                <span>
                  Tüm <b>beyaz hücreler</b> (üzerinde sayı olmayanlar da dâhil) birbirine bir
                  şekilde ağ gibi <b>bağlı</b> olmalıdır (aralara siyah girip bir beyazı
                  hapsedemez).
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full py-4 rounded-xl font-black text-xl transition-all bg-slate-200 hover:bg-white text-slate-900 shadow-lg active:scale-95"
            >
              ANLADIM, BAŞLA!
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl px-4 py-6 md:py-12">
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
              <h2 className="text-2xl md:text-3xl font-black text-white">Kuromasu</h2>
              <div className="text-xs md:text-sm font-bold text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full mt-1 inline-block">
                SEVİYE: {size}x{size}
              </div>
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-2">
            <div className="bg-slate-900/80 px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
              <span className="text-lg">⏱️</span>
              <span
                className={`text-xl md:text-2xl font-black font-mono ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-slate-200'}`}
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

        {/* Board */}
        <div className="flex justify-center mb-8 relative">
          <div
            className="grid gap-[2px] bg-slate-600 p-[4px] rounded-xl shadow-[0_0_50px_rgba(255,255,255,0.05)] border-2 border-slate-500"
            style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
          >
            {board.map((row, r) =>
              row.map((cellState, c) => {
                const clue = boardData.clues.find((cl) => cl.r === r && cl.c === c);
                let isFulfilled = false;

                if (clue) {
                  isFulfilled = getVisibleCells(board, r, c) === clue.val;
                }

                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-black text-2xl md:text-3xl transition-all duration-300 relative
                                            ${
                                              clue
                                                ? 'bg-slate-100 text-slate-900 cursor-not-allowed'
                                                : cellState === 'black'
                                                  ? 'bg-slate-900 scale-[0.85] rounded-md shadow-[inset_0_3px_10px_rgba(0,0,0,0.8)]'
                                                  : cellState === 'white'
                                                    ? 'bg-slate-200 text-slate-400 hover:bg-white'
                                                    : 'bg-slate-300 hover:bg-slate-200 text-transparent'
                                            }`}
                  >
                    {clue ? (
                      <>
                        <span>{clue.val}</span>
                        {isFulfilled && (
                          <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,1)] animate-pulse" />
                        )}
                      </>
                    ) : cellState === 'white' ? (
                      '·'
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
        <div className="text-center bg-slate-800/50 p-4 rounded-2xl border border-white/5">
          <p className="text-slate-400 text-sm font-bold">
            1 Tık: <span className="text-white bg-slate-900 px-2 rounded-sm mx-1">Siyah</span> | 2
            Tık:{' '}
            <span className="border border-slate-400/50 text-slate-800 bg-slate-200 px-2 rounded-sm mx-1">
              Beyaz Nokta
            </span>{' '}
            | 3 Tık: Boş
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
              {mistakes >= maxMistakes
                ? 'Mantık Hatası!'
                : timeLeft <= 0
                  ? 'Süre Doldu!'
                  : 'Harika!'}
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              {mistakes >= maxMistakes
                ? 'Siyahlar temas edemez!'
                : timeLeft <= 0
                  ? 'Zamanı iyi yönetemedin.'
                  : `Işınları mükemmel hesapladın! Kazanılan Yıldız: ${score}`}
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
                className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-slate-600 hover:bg-slate-500 text-white shadow-lg active:scale-95"
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

export default KuromasuGame;
