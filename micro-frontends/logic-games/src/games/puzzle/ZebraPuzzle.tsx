import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';

interface ZebraPuzzleProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface PuzzleData {
  n: number;
  title: string;
  categories: string[][];
  clues: string[];
  solution: number[][];
}

const PUZZLES: Record<number, PuzzleData> = {
  3: {
    n: 3,
    title: 'Evcil Hayvanlar',
    categories: [
      ['Ali', 'Veli', 'Can'],
      ['Kırmızı', 'Mavi', 'Yeşil'],
      ['Köpek', 'Kedi', 'Kuş'],
    ],
    clues: [
      '1. Ali mavi tişört giymiyor.',
      '2. Kuş sahibi kırmızı tişörtlüdür.',
      "3. Veli'nin köpeği var.",
      '4. Can yeşil tişört giymiyor.',
    ],
    solution: [
      [0, 2, 1], // Ali(0) -> Yeşil(2) -> Kedi(1)
      [1, 1, 0], // Veli(1) -> Mavi(1) -> Köpek(0)
      [2, 0, 2], // Can(2) -> Kırmızı(0) -> Kuş(2)
    ],
  },
  4: {
    n: 4,
    title: 'Haftalık Meyve',
    categories: [
      ['Ahmet', 'Burak', 'Cem', 'Deniz'],
      ['Elma', 'Armut', 'Muz', 'Çilek'],
      ['Pzt.', 'Salı', 'Çarş.', 'Perş.'],
    ],
    clues: [
      '1. Ahmet meyvesini Salı veya Çarşamba günü yemedi ve bu meyve Elma değil.',
      '2. Çilek yiyen kişi bunu Çarşamba günü yedi.',
      '3. Burak Muz yedi ama Pazartesi değil.',
      '4. Cem meyvesini Perşembe yedi.',
      '5. Armut yiyen kişi Deniz değildir.',
    ],
    solution: [
      [0, 1, 0], // Ahmet -> Armut -> Pzt
      [1, 2, 1], // Burak -> Muz -> Salı
      [2, 0, 3], // Cem -> Elma -> Perş
      [3, 3, 2], // Deniz -> Çilek -> Çar
    ],
  },
  5: {
    n: 5,
    title: 'Okul Dersleri',
    categories: [
      ['Ece', 'Eda', 'Ege', 'Efe', 'Ela'],
      ['Mat.', 'Fizik', 'Kimya', 'Biyo.', 'Tarih'],
      ['1. Sınıf', '2. Sınıf', '3. Sınıf', '4. Sınıf', '5. Sınıf'],
    ],
    clues: [
      '1. Efe 3. ve 1. sınıfta değil, Tarih sevmiyor.',
      '2. Fizik seven öğrenci 2. sınıftadır.',
      '3. Ece Biyoloji sever.',
      '4. 5. sınıftaki öğrenci Kimya sever.',
      '5. Eda 1. sınıftadır ama Matematik sevmez.',
      '6. Ege 4. sınıftadır.',
      '7. Efe Kimya sevmez.',
    ],
    solution: [
      [0, 3, 2], // Ece -> Biyo -> 3
      [1, 4, 0], // Eda -> Tarih -> 1
      [2, 0, 3], // Ege -> Mat -> 4
      [3, 1, 1], // Efe -> Fizik -> 2
      [4, 2, 4], // Ela -> Kimya -> 5
    ],
  },
};

const ZebraPuzzle: React.FC<ZebraPuzzleProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 3;
      case Difficulty.MEDIUM:
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

  const n = getSizeForDifficulty();
  const puzzle = PUZZLES[n] || PUZZLES[4];

  // State: 0 (empty), 1 (O - check), 2 (X - cross)
  const [grids, setGrids] = useState<{
    AB: number[][];
    AC: number[][];
    CB: number[][];
  }>({
    AB: [],
    AC: [],
    CB: [],
  });

  const [mistakes, setMistakes] = useState(0);
  const [maxMistakes, setMaxMistakes] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const initGame = useCallback(() => {
    const createEmptyGrid = () =>
      Array(n)
        .fill(null)
        .map(() => Array(n).fill(0));
    setGrids({
      AB: createEmptyGrid(),
      AC: createEmptyGrid(),
      CB: createEmptyGrid(),
    });
    setMistakes(0);
    setTimeLeft(getTimeForDifficulty());
    setIsGameOver(false);
  }, [n]);

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

  const onCellClick = (block: 'AB' | 'AC' | 'CB', r: number, c: number) => {
    if (isGameOver || showRules) return;

    const newGrids = JSON.parse(JSON.stringify(grids)) as typeof grids;
    const grid = newGrids[block];

    if (grid[r][c] === 0) {
      grid[r][c] = 2; // Cycle: 0 -> 2 (X) -> 1 (O) -> 0
    } else if (grid[r][c] === 2) {
      grid[r][c] = 1; // 1 means O (check)
      // Auto-cross row and col
      for (let i = 0; i < n; i++) {
        if (i !== c && grid[r][i] === 0) grid[r][i] = 2;
        if (i !== r && grid[i][c] === 0) grid[i][c] = 2;
      }
    } else {
      grid[r][c] = 0;
    }

    // Simple transitive auto-cross check (optional but amazing for players)
    // If A=r implies B=c, and A=r implies C=k -> then C=k implies B=c.
    let changed = true;
    let circuitBreaker = 0;
    while (changed && circuitBreaker < 5) {
      changed = false;
      circuitBreaker++;
      // evaluate combinations
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          for (let k = 0; k < n; k++) {
            // if AB[i][j] == 1 and AC[i][k] == 1 => CB[k][j] = 1
            if (newGrids.AB[i][j] === 1 && newGrids.AC[i][k] === 1 && newGrids.CB[k][j] === 0) {
              newGrids.CB[k][j] = 1;
              changed = true;
            }
            // if AB[i][j] == 1 and CB[k][j] == 1 => AC[i][k] = 1
            if (newGrids.AB[i][j] === 1 && newGrids.CB[k][j] === 1 && newGrids.AC[i][k] === 0) {
              newGrids.AC[i][k] = 1;
              changed = true;
            }
            // if AC[i][k] == 1 and CB[k][j] == 1 => AB[i][j] = 1
            if (newGrids.AC[i][k] === 1 && newGrids.CB[k][j] === 1 && newGrids.AB[i][j] === 0) {
              newGrids.AB[i][j] = 1;
              changed = true;
            }
          }
        }
      }
      // Auto-cross on newly discovered 1s
      ['AB', 'AC', 'CB'].forEach((bName) => {
        const b = newGrids[bName as keyof typeof newGrids];
        for (let r2 = 0; r2 < n; r2++) {
          for (let c2 = 0; c2 < n; c2++) {
            if (b[r2][c2] === 1) {
              for (let idx = 0; idx < n; idx++) {
                if (idx !== c2 && b[r2][idx] === 0) {
                  b[r2][idx] = 2;
                  changed = true;
                }
                if (idx !== r2 && b[idx][c2] === 0) {
                  b[idx][c2] = 2;
                  changed = true;
                }
              }
            }
          }
        }
      });
    }

    setGrids(newGrids);
    checkWinCondition(newGrids);
  };

  const checkWinCondition = (currentGrids: typeof grids) => {
    // Are all target cells 1?
    let won = true;
    for (const [a, b, c] of puzzle.solution) {
      if (
        currentGrids.AB[a][b] !== 1 ||
        currentGrids.AC[a][c] !== 1 ||
        currentGrids.CB[c][b] !== 1
      ) {
        won = false;
        break;
      }
    }

    // Also ensure no false positives
    let invalid = false;
    for (const [a, b, c] of puzzle.solution) {
      if (
        currentGrids.AB[a][b] === 2 ||
        currentGrids.AC[a][c] === 2 ||
        currentGrids.CB[c][b] === 2
      ) {
        invalid = true; // Player crossed out a correct answer
      }
    }

    if (won && !invalid) {
      handleGameOver(true);
    } else if (invalid) {
      // Check if board is "full" of claims (many 1s or full row/cols)
      // Just let them naturally find their contradiction. No instant lose on crossing out,
      // because in logic puzzles you often undo.
      // But if ALL cells are filled and not won, give a mistake.
      const isFull = ['AB', 'AC', 'CB'].every((bStr) => {
        const b = currentGrids[bStr as keyof typeof currentGrids];
        return b.every((row) => row.every((cell) => cell !== 0));
      });
      if (isFull) {
        setMistakes((m) => {
          const newM = m + 1;
          if (newM >= maxMistakes) handleGameOver(false);
          return newM;
        });
      }
    }
  };

  const renderCell = (val: number) => {
    if (val === 1) return <span className="text-emerald-400 font-bold">O</span>;
    if (val === 2) return <span className="text-rose-400/70 font-bold">X</span>;
    return null;
  };

  // Width classes to keep grid uniform
  const cellSize = 'w-8 h-8 md:w-10 md:h-10 text-sm md:text-base';
  const headerWidth = 'w-16 md:w-20';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-500/30">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl text-cyan-400">🦓</span> Zebra Puzzle
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span className="text-cyan-400">📋</span>
                <div>
                  Aşağıdaki ipuçlarını okuyarak kimin neyle eşleştiğini bul. Klasik bir eleme
                  (Einstein) bulmacasıdır.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-400">🖱️</span>
                <span>
                  Kutuya 1. tıkta kırmızı çarpı <b>(X)</b> - "Olamaz" işareti koyar. 2. tıkta yeşil
                  onay <b>(O)</b> - "Kesinlikle O" işareti koyar.
                </span>
              </li>
              <li className="flex gap-3 text-emerald-400 font-bold">
                <span>✨</span>
                <span>
                  Yeşil <b>(O)</b> koyduğunda o satır ve sütundaki diğer ihtimaller sistem
                  tarafından otomatik olarak çarpı <b>(X)</b> yapılır.
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full py-4 rounded-xl font-black text-xl transition-all bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg active:scale-95"
            >
              ANLADIM, DETEKTİF!
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl px-4 py-6 md:py-12 flex flex-col items-center">
        {/* Header */}
        <div className="flex justify-between items-center w-full mb-8 bg-slate-800/50 p-4 md:p-6 rounded-3xl border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={onExit}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all relative z-50"
            >
              ⬅ Geri Dön
            </button>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Zebra Puzzle
              </h2>
              <div className="text-xs md:text-sm font-bold text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full mt-1 inline-block">
                SEVİYE: {n} Kategorili
              </div>
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-2">
            <div className="bg-slate-900/80 px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
              <span className="text-lg">⏱️</span>
              <span
                className={`text-xl md:text-2xl font-black font-mono ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-cyan-300'}`}
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

        <div className="flex flex-col lg:flex-row gap-8 items-start w-full max-w-5xl justify-center">
          {/* The Grid */}
          <div className="bg-slate-800 p-2 md:p-4 rounded-2xl shadow-2xl border border-slate-700 overflow-x-auto w-full lg:w-auto">
            <h3 className="text-center font-bold text-slate-400 mb-4">{puzzle.title}</h3>

            <div className="flex flex-col w-max">
              {/* Row 0: Top Headers */}
              <div className="flex">
                <div className={`${headerWidth} h-24`}></div> {/* Empty top-left */}
                {/* Top Header B */}
                <div className="flex border-b-2 border-slate-500">
                  {puzzle.categories[1].map((cat1, idx) => (
                    <div
                      key={`th-b-${idx}`}
                      className={`${cellSize} h-24 flex items-end justify-center pb-2 border-l border-slate-700`}
                    >
                      <span className="origin-bottom-left -rotate-90 whitespace-nowrap translate-x-3">
                        {cat1}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="w-1 border-r-2 border-slate-500 z-10"></div>
                {/* Top Header C */}
                <div className="flex border-b-2 border-slate-500">
                  {puzzle.categories[2].map((cat2, idx) => (
                    <div
                      key={`th-c-${idx}`}
                      className={`${cellSize} h-24 flex items-end justify-center pb-2 border-l border-slate-700`}
                    >
                      <span className="origin-bottom-left -rotate-90 whitespace-nowrap translate-x-3 text-amber-200">
                        {cat2}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 1: Section A */}
              <div className="flex border-b-2 border-slate-500">
                {/* Left Header A */}
                <div className="flex flex-col border-r-2 border-slate-500">
                  {puzzle.categories[0].map((cat0, idx) => (
                    <div
                      key={`lh-a-${idx}`}
                      className={`${headerWidth} ${cellSize} flex items-center justify-end pr-2 text-cyan-200 border-b border-slate-700`}
                    >
                      {cat0}
                    </div>
                  ))}
                </div>

                {/* Grid A-B */}
                <div className="flex flex-col border-r-2 border-slate-500 bg-slate-900/50">
                  {grids.AB.map((row, r) => (
                    <div key={`ab-r${r}`} className="flex">
                      {row.map((cell, c) => (
                        <button
                          key={`ab-c${c}`}
                          onClick={() => onCellClick('AB', r, c)}
                          className={`${cellSize} border-b border-l border-slate-700 hover:bg-slate-700/50 transition-colors`}
                        >
                          {renderCell(cell)}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Grid A-C */}
                <div className="flex flex-col bg-slate-900/50">
                  {grids.AC.map((row, r) => (
                    <div key={`ac-r${r}`} className="flex">
                      {row.map((cell, c) => (
                        <button
                          key={`ac-c${c}`}
                          onClick={() => onCellClick('AC', r, c)}
                          className={`${cellSize} border-b border-l border-slate-700 hover:bg-slate-700/50 transition-colors`}
                        >
                          {renderCell(cell)}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Section C */}
              <div className="flex">
                {/* Left Header C */}
                <div className="flex flex-col border-r-2 border-slate-500">
                  {puzzle.categories[2].map((cat2, idx) => (
                    <div
                      key={`lh-c-${idx}`}
                      className={`${headerWidth} ${cellSize} flex items-center justify-end pr-2 text-amber-200 border-b border-slate-700`}
                    >
                      {cat2}
                    </div>
                  ))}
                </div>

                {/* Grid C-B */}
                <div className="flex flex-col bg-slate-900/50">
                  {grids.CB.map((row, r) => (
                    <div key={`cb-r${r}`} className="flex">
                      {row.map((cell, c) => (
                        <button
                          key={`cb-c${c}`}
                          onClick={() => onCellClick('CB', r, c)}
                          className={`${cellSize} border-b border-l border-slate-700 hover:bg-slate-700/50 transition-colors`}
                        >
                          {renderCell(cell)}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Clues Pane */}
          <div className="w-full lg:w-96 bg-slate-800 p-6 rounded-2xl shadow-2xl border border-slate-700">
            <h3 className="text-xl font-black text-cyan-400 mb-4 flex items-center gap-2">
              <span className="text-2xl">🕵️</span> İpuçları
            </h3>
            <div className="space-y-3">
              {puzzle.clues.map((clue, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-900/50 border border-white/5 rounded-xl text-slate-300 text-sm md:text-base leading-relaxed hover:bg-slate-700/50 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.currentTarget.classList.toggle('line-through');
                    e.currentTarget.classList.toggle('opacity-50');
                  }}
                >
                  {clue}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500 text-center italic">
              Not: İpuçlarının üstünü çizmek için tıklayabilirsiniz.
            </p>
          </div>
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
                  : 'Tebrikler Detektif!'}
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              {mistakes >= maxMistakes
                ? 'Tabloda tamamen dolu ve çözülemez bir çelişki oluştu.'
                : timeLeft <= 0
                  ? 'Süreyi daha iyi kullanmayı dene.'
                  : `Tüm ipuçlarını başarıyla analiz ettin! Kazanılan Yıldız: ${score}`}
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
                className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg active:scale-95"
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

export default ZebraPuzzle;
