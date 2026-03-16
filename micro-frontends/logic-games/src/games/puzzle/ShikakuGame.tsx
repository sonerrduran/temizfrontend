import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Difficulty } from '../../types';

interface ShikakuGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface Cell {
  r: number;
  c: number;
}

interface Rectangle {
  id: number;
  r1: number;
  c1: number;
  r2: number;
  c2: number;
  targetNum: number | null; // The number it currently covers
  area: number;
}

interface BoardData {
  size: number;
  clues: { r: number; c: number; num: number }[];
}

// Easy 5x5 board
const BOARDS: Record<number, BoardData> = {
  5: {
    size: 5,
    clues: [
      { r: 0, c: 0, num: 2 },
      { r: 0, c: 3, num: 4 },
      { r: 1, c: 1, num: 3 },
      { r: 2, c: 4, num: 5 },
      { r: 3, c: 0, num: 6 },
      { r: 4, c: 2, num: 5 },
      // 2+4+3+5+6+5 = 25 cells total, a valid shikaku board
    ],
  },
};

const ShikakuGame: React.FC<ShikakuGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    return 5; // Static for now
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

  const [rectangles, setRectangles] = useState<Rectangle[]>([]);

  // Drag state
  const [dragStart, setDragStart] = useState<Cell | null>(null);
  const [dragCurrent, setDragCurrent] = useState<Cell | null>(null);

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const gridRef = useRef<HTMLDivElement>(null);

  const initGame = useCallback(() => {
    setRectangles([]);
    setDragStart(null);
    setDragCurrent(null);
    setTimeLeft(getTimeForDifficulty());
    setIsGameOver(false);
  }, [size]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (isGameOver || showRules) return;
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      endGame(false);
    }
  }, [timeLeft, isGameOver, showRules]);

  const endGame = (win: boolean) => {
    setIsGameOver(true);
    let finalStars = 1;
    if (win) {
      finalStars = timeLeft > getTimeForDifficulty() * 0.5 ? 5 : 4;
    }
    setScore(finalStars);
  };

  // Calculate bounding box for a drag
  const getDragRect = (): { r1: number; c1: number; r2: number; c2: number } | null => {
    if (!dragStart || !dragCurrent) return null;
    return {
      r1: Math.min(dragStart.r, dragCurrent.r),
      c1: Math.min(dragStart.c, dragCurrent.c),
      r2: Math.max(dragStart.r, dragCurrent.r),
      c2: Math.max(dragStart.c, dragCurrent.c),
    };
  };

  // Does cell fall in a rectangle
  const isCellInRect = (
    r: number,
    c: number,
    rect: { r1: number; c1: number; r2: number; c2: number }
  ) => {
    return r >= rect.r1 && r <= rect.r2 && c >= rect.c1 && c <= rect.c2;
  };

  const handlePointerDown = (r: number, c: number, e: React.PointerEvent) => {
    if (isGameOver) return;
    // e.target.releasePointerCapture(e.pointerId); // Allows dragging across elements

    // If clicking on an existing rectangle, maybe they want to delete it?
    const existingIdx = rectangles.findIndex((rect) => isCellInRect(r, c, rect));
    if (existingIdx !== -1) {
      // Delete it
      const newRects = [...rectangles];
      newRects.splice(existingIdx, 1);
      setRectangles(newRects);
      // checkWinCondition(newRects); // Removing a rect won't cause a win, but good practice
      return;
    }

    setDragStart({ r, c });
    setDragCurrent({ r, c });
  };

  const handlePointerMove = (r: number, c: number) => {
    if (isGameOver || !dragStart) return;
    setDragCurrent({ r, c });
  };

  const handlePointerUp = () => {
    if (isGameOver || !dragStart || !dragCurrent) {
      setDragStart(null);
      setDragCurrent(null);
      return;
    }

    const newRect = getDragRect();
    if (newRect) {
      // Check for overlaps with existing
      let overlap = false;
      for (const existing of rectangles) {
        // If max of mins <= min of maxes, they overlap
        const overlapR = Math.max(newRect.r1, existing.r1) <= Math.min(newRect.r2, existing.r2);
        const overlapC = Math.max(newRect.c1, existing.c1) <= Math.min(newRect.c2, existing.c2);
        if (overlapR && overlapC) {
          overlap = true;
          break;
        }
      }

      if (!overlap) {
        // Find how many clues are in this new rect
        const cluesInRect = boardData.clues.filter((cl) => isCellInRect(cl.r, cl.c, newRect));
        const targetNum = cluesInRect.length === 1 ? cluesInRect[0].num : null;
        const area = (newRect.r2 - newRect.r1 + 1) * (newRect.c2 - newRect.c1 + 1);

        const finalRect: Rectangle = {
          id: Date.now(),
          ...newRect,
          targetNum,
          area,
        };

        const updatedRects = [...rectangles, finalRect];
        setRectangles(updatedRects);
        checkWinCondition(updatedRects);
      }
    }

    setDragStart(null);
    setDragCurrent(null);
  };

  const checkWinCondition = (currentRects: Rectangle[]) => {
    // 1. All rectangles must cover exactly 1 clue, and area must match the clue.
    for (const rect of currentRects) {
      if (rect.targetNum === null) return; // Covers 0 or >1 clues
      if (rect.area !== rect.targetNum) return; // Area mismatch
    }

    // 2. All cells must be covered (total area covered must equal board size)
    let totalArea = 0;
    for (const rect of currentRects) {
      totalArea += rect.area;
    }

    if (totalArea === size * size) {
      endGame(true);
    }
  };

  const getCellClue = (r: number, c: number) => {
    return boardData.clues.find((cl) => cl.r === r && cl.c === c)?.num || null;
  };

  // Calculate background and borders for rendering
  const getCellAppearance = (r: number, c: number) => {
    // Find if in committed rect
    const committedRect = rectangles.find((rect) => isCellInRect(r, c, rect));
    if (committedRect) {
      const isError =
        committedRect.targetNum === null || committedRect.area !== committedRect.targetNum;
      let borders = '';
      if (r === committedRect.r1) borders += 'border-t-4 ';
      if (r === committedRect.r2) borders += 'border-b-4 ';
      if (c === committedRect.c1) borders += 'border-l-4 ';
      if (c === committedRect.c2) borders += 'border-r-4 ';
      const colorClass = isError ? 'bg-red-200 border-red-500' : 'bg-orange-200 border-orange-500';
      return { classes: `${colorClass} ${borders}`, isError };
    }

    // Find if in dragged rect
    const dragRect = getDragRect();
    if (dragRect && isCellInRect(r, c, dragRect)) {
      let borders = '';
      if (r === dragRect.r1) borders += 'border-t-4 ';
      if (r === dragRect.r2) borders += 'border-b-4 ';
      if (c === dragRect.c1) borders += 'border-l-4 ';
      if (c === dragRect.c2) borders += 'border-r-4 ';
      return { classes: `bg-orange-100/50 border-orange-300 z-10 ${borders}`, isError: false };
    }

    return { classes: 'bg-white border-slate-200 border hover:bg-slate-50', isError: false };
  };

  const padZero = (n: number) => n.toString().padStart(2, '0');
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${padZero(s % 60)}`;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8"
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
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
              <span className="text-white font-black">⏱️ {formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">📐 Shikaku</h1>
          <p className="text-slate-400 text-lg mt-2">
            {size}x{size} Izgara
          </p>
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* İç Kart - Oyun Rengi (Turuncu) */}
          <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex flex-col items-center">
              {/* Shikaku Grid */}
              <div
                ref={gridRef}
                className="bg-white p-1 rounded-sm border-2 border-orange-400 grid mb-8 max-w-[400px] w-full touch-none select-none"
                style={{
                  gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                  gap: '1px',
                }}
              >
                {Array.from({ length: size }).map((_, r) =>
                  Array.from({ length: size }).map((_, c) => {
                    const appearance = getCellAppearance(r, c);
                    const clue = getCellClue(r, c);

                    return (
                      <div
                        key={`${r}-${c}`}
                        onPointerDown={(e) => handlePointerDown(r, c, e)}
                        onPointerEnter={() => handlePointerMove(r, c)}
                        className={`aspect-square relative flex items-center justify-center text-3xl md:text-5xl font-black transition-colors box-border pointer-events-auto ${appearance.classes}`}
                        style={{
                          WebkitUserSelect: 'none',
                          userSelect: 'none',
                        }}
                      >
                        {clue !== null && (
                          <span
                            className={`z-0 ${appearance.isError ? 'text-red-700' : 'text-slate-800'}`}
                          >
                            {clue}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <button
              onClick={() => setShowRules(true)}
              className="w-full bg-orange-500 hover:bg-orange-400 text-white text-xl font-black py-4 rounded-2xl transition-all"
            >
              📖 NASIL OYNANIR?
            </button>
          </div>
        </div>

        {/* Rules Overlay */}
        {showRules && (
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center rounded-3xl animate-in fade-in zoom-in">
            <div className="bg-slate-800/80 p-6 md:p-8 rounded-3xl border border-orange-500/30 max-w-md w-full">
              <div className="text-5xl mb-4">📐</div>
              <h3 className="text-2xl md:text-3xl font-black text-orange-400 mb-4 uppercase">
                Nasıl Oynanır?
              </h3>
              <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base font-medium">
                <li className="flex gap-2">
                  <span className="text-orange-400">1.</span> Amacın, tüm oyun alanını dikdörtgen
                  (veya kare) alanlara bölmektir.
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-400">2.</span> Çizdiğin her dikdörtgenin içinde tam
                  olarak bir tane sayı olmalıdır.
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-400">3.</span> Dikdörtgenin içindeki küçük karelerin
                  sayısı (alanı), içindeki sayıya eşit olmalıdır.
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-400">4.</span> Bir dikdörtgen oluşturmak için hücreyi
                  basılı tutup sürükle. Sürükleyip bıraktığında dikdörtgen boyanacaktır. Yanlışsa
                  üzerine tıkla/dokun, silinir!
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-400">5.</span> Hiç boşluk kalmadığında ve tüm sayılar
                  doğru kapsandığında kazanırsın!
                </li>
              </ul>
              <button
                onClick={() => setShowRules(false)}
                className="w-full bg-orange-500 hover:bg-orange-400 text-white font-black py-4 rounded-xl transition-transform hover:scale-105 active:scale-95 text-lg"
              >
                ANLADIM, BAŞLA! 🚀
              </button>
            </div>
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in p-6 text-center rounded-3xl">
            <h3
              className={`text-5xl md:text-7xl font-black mb-4 ${timeLeft === 0 ? 'text-red-500' : 'text-orange-400'}`}
            >
              {timeLeft === 0 ? 'SÜRE BİTTİ' : 'ALANLAR BÖLÜNDÜ!'}
            </h3>
            <p className="text-xl md:text-2xl text-white font-bold mb-8">
              Kazanılan Yıldız: <span className="text-orange-400">⭐ {score}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              <button
                onClick={() => {
                  initGame();
                }}
                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                🔄 TEKRAR OYNA
              </button>
              <button
                onClick={() => onComplete(score)}
                className="flex-1 bg-orange-500 hover:bg-orange-400 text-white font-black py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                🏠 ANA ÜSSE DÖN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShikakuGame;
