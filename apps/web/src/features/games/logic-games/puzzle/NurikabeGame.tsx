import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface NurikabeGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

type CellState = 'empty' | 'sea' | 'dot';

interface BoardData {
  size: number;
  clues: { r: number; c: number; val: number }[];
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    clues: [
      { r: 0, c: 0, val: 2 },
      { r: 1, c: 3, val: 3 },
      { r: 3, c: 1, val: 1 },
    ],
  },
  5: {
    size: 5,
    clues: [
      { r: 0, c: 2, val: 2 },
      { r: 1, c: 0, val: 1 },
      { r: 3, c: 4, val: 4 },
      { r: 4, c: 1, val: 2 },
    ],
  },
};

const NurikabeGame: React.FC<NurikabeGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
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
  const [clues, setClues] = useState<{ r: number; c: number; val: number }[]>([]);

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
    setClues([...boardData.clues]);
    setMistakes(0);
    setTimeLeft(getTimeForDifficulty());
    setIsGameOver(false);
  }, [size, boardData]);

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
      if (timeLeft > getTimeForDifficulty() * 0.5) finalStars += 1; // Time bonus
    }
    setScore(Math.min(finalStars, 5));
  };

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver || showRules) return;
    if (clues.some((clue) => clue.r === r && clue.c === c)) return; // Can't click clues

    const newBoard = board.map((row) => [...row]);
    const currentState = newBoard[r][c];

    // Cycle: empty -> shadow (sea) -> dot (island) -> empty
    if (currentState === 'empty') newBoard[r][c] = 'sea';
    else if (currentState === 'sea') newBoard[r][c] = 'dot';
    else newBoard[r][c] = 'empty';

    setBoard(newBoard);
    checkWinCondition(newBoard);
  };

  const isSeaConnected = (currentBoard: CellState[][]) => {
    let firstSeaRow = -1;
    let firstSeaCol = -1;

    // Find standard sea
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] === 'sea') {
          firstSeaRow = r;
          firstSeaCol = c;
          break;
        }
      }
      if (firstSeaRow !== -1) break;
    }

    if (firstSeaRow === -1) return false; // No sea yet

    const visited = Array(size)
      .fill(false)
      .map(() => Array(size).fill(false));
    const stack = [[firstSeaRow, firstSeaCol]];
    visited[firstSeaRow][firstSeaCol] = true;
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
          currentBoard[nr][nc] === 'sea'
        ) {
          visited[nr][nc] = true;
          connectedCount++;
          stack.push([nr, nc]);
        }
      }
    }

    let totalSea = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] === 'sea') totalSea++;
      }
    }

    return connectedCount === totalSea;
  };

  const has2x2Sea = (currentBoard: CellState[][]) => {
    for (let r = 0; r < size - 1; r++) {
      for (let c = 0; c < size - 1; c++) {
        if (
          currentBoard[r][c] === 'sea' &&
          currentBoard[r + 1][c] === 'sea' &&
          currentBoard[r][c + 1] === 'sea' &&
          currentBoard[r + 1][c + 1] === 'sea'
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const getIslandSizes = (currentBoard: CellState[][]) => {
    const visited = Array(size)
      .fill(false)
      .map(() => Array(size).fill(false));
    let islandsValid = true;

    for (const clue of clues) {
      let islandSize = 0;
      const stack = [[clue.r, clue.c]];
      visited[clue.r][clue.c] = true;

      while (stack.length > 0) {
        const [curR, curC] = stack.pop()!;
        islandSize++;

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
            currentBoard[nr][nc] !== 'sea'
          ) {
            // Check if we hit another clue, an island can only have ONE clue
            if (clues.some((c) => c.r === nr && c.c === nc)) {
              return false; // Invalid: Two clues in one island
            }
            visited[nr][nc] = true;
            stack.push([nr, nc]);
          }
        }
      }
      if (islandSize !== clue.val) islandsValid = false;
    }

    // Check for stray islands without clues
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!visited[r][c] && currentBoard[r][c] !== 'sea') {
          return false; // Invalid: Island cell not connected to a clue
        }
      }
    }

    return islandsValid;
  };

  const checkWinCondition = (currentBoard: CellState[][]) => {
    // Are all cells filled? (Dots count as island parts, Sea as water)
    let isFull = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] === 'empty' && !clues.some((clue) => clue.r === r && clue.c === c)) {
          isFull = false;
          break;
        }
      }
      if (!isFull) break;
    }
    if (!isFull) return;

    if (has2x2Sea(currentBoard)) {
      setMistakes((m) => {
        const newM = m + 1;
        if (newM >= maxMistakes) handleGameOver(false);
        return newM;
      });
      // We can add error states here to highlight the 2x2.
      return;
    }

    if (!isSeaConnected(currentBoard)) return;
    if (!getIslandSizes(currentBoard)) return;

    handleGameOver(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">
                Hata: {mistakes}/{maxMistakes}
              </span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">
                ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">🏝️ Nurikabe</h1>
          <p className="text-slate-400 text-lg mt-2">
            {size}x{size} Izgara
          </p>
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* İç Kart - Oyun Rengi (Cyan) */}
          <div className="bg-gradient-to-br from-cyan-500 via-teal-500 to-cyan-600 rounded-2xl p-8 md:p-12 mb-8">
            {/* Board */}
            <div className="flex justify-center mb-8 relative">
              <div
                className="grid gap-1 bg-cyan-700/40 p-2 md:p-3 rounded-2xl border-2 border-cyan-400"
                style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
              >
                {board.map((row, r) =>
                  row.map((cellState, c) => {
                    const clue = clues.find((cl) => cl.r === r && cl.c === c);
                    return (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => handleCellClick(r, c)}
                        className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl font-black text-2xl md:text-3xl transition-all duration-300 transform active:scale-90
                                                    ${
                                                      clue
                                                        ? 'bg-white text-slate-900 cursor-not-allowed border border-slate-200'
                                                        : cellState === 'sea'
                                                          ? 'bg-slate-900 border-2 border-slate-800'
                                                          : cellState === 'dot'
                                                            ? 'bg-white/10 hover:bg-white/20 border-2 border-dashed border-white/20 text-white'
                                                            : 'bg-cyan-800/60 hover:bg-cyan-700/60 border border-cyan-600'
                                                    }`}
                      >
                        {clue ? clue.val : cellState === 'dot' ? '·' : ''}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Control Guide */}
            <div className="text-center bg-white/10 p-4 rounded-2xl mb-4">
              <p className="text-white text-sm font-bold">
                1 Tık:{' '}
                <span className="text-slate-900 bg-slate-400 px-2 rounded-sm mx-1">Deniz</span> | 2
                Tık:{' '}
                <span className="text-white bg-slate-600 px-2 py-0.5 rounded-sm mx-1">
                  Ada Noktası
                </span>{' '}
                | 3 Tık: Boş
              </p>
            </div>

            {/* Nasıl Oynanır Butonu */}
            <button
              onClick={() => setShowRules(true)}
              className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold text-white transition-all"
            >
              NASIL OYNANIR?
            </button>
          </div>
        </div>
      </div>

      {/* Kurallar Overlay */}
      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-cyan-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">🏝️</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">1.</span> Sayılı hücreler adaları temsil
                eder. Her ada o sayı kadar hücre içermelidir.
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">2.</span> Deniz (siyah hücreler) tüm
                tahtayı bağlı bir şekilde kaplamalıdır.
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">3.</span> 2x2 deniz havuzu oluşturulamaz!
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">4.</span> Her adada sadece bir sayı
                olmalıdır.
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-cyan-600 to-teal-700 hover:from-cyan-500 hover:to-teal-600 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {isGameOver && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-8 rounded-3xl border border-cyan-500/30 max-w-md w-full">
            <h3
              className={`text-5xl md:text-6xl font-black mb-4 ${mistakes >= maxMistakes || timeLeft === 0 ? 'text-red-500' : 'text-yellow-400'}`}
            >
              {mistakes >= maxMistakes
                ? '❌ ÇOK HATA!'
                : timeLeft === 0
                  ? '⏰ SÜRE BİTTİ'
                  : '🎉 HARİKA!'}
            </h3>
            <p className="text-xl md:text-2xl text-white font-bold mb-8">
              Kazanılan Yıldız: <span className="text-yellow-400">⭐ {score}</span>
            </p>

            <div className="flex flex-col gap-4 w-full">
              <button
                onClick={() => initGame()}
                className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105"
              >
                🔄 Tekrar Oyna
              </button>
              <button
                onClick={() => onComplete(score)}
                className="w-full bg-gradient-to-br from-cyan-600 to-teal-700 hover:from-cyan-500 hover:to-teal-600 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105"
              >
                ← Geri Dön
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NurikabeGame;
