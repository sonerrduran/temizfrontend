import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';

interface NumberlinkGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface PathNode {
  r: number;
  c: number;
  color: string;
}

interface BoardData {
  size: number;
  pairs: { r1: number; c1: number; r2: number; c2: number; color: string; val: number }[];
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    pairs: [
      { r1: 0, c1: 0, r2: 3, c2: 0, color: 'text-red-500 bg-red-500', val: 1 },
      { r1: 0, c1: 3, r2: 2, c2: 3, color: 'text-blue-500 bg-blue-500', val: 2 },
      { r1: 1, c1: 2, r2: 3, c2: 2, color: 'text-green-500 bg-green-500', val: 3 },
      { r1: 2, c1: 1, r2: 3, c2: 3, color: 'text-yellow-500 bg-yellow-500', val: 4 },
    ],
  },
  5: {
    size: 5,
    pairs: [
      { r1: 0, c1: 0, r2: 4, c2: 0, color: 'text-red-500 bg-red-500', val: 1 },
      { r1: 0, c1: 4, r2: 3, c2: 4, color: 'text-blue-500 bg-blue-500', val: 2 },
      { r1: 1, c1: 1, r2: 2, c2: 3, color: 'text-green-500 bg-green-500', val: 3 },
      { r1: 2, c1: 1, r2: 4, c2: 4, color: 'text-yellow-500 bg-yellow-500', val: 4 },
      { r1: 3, c1: 1, r2: 4, c2: 2, color: 'text-purple-500 bg-purple-500', val: 5 },
    ],
  },
};

const NumberlinkGame: React.FC<NumberlinkGameProps> = ({
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
        return 5; // Simplified to 5x5 for now, logic works the same
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

  const [paths, setPaths] = useState<PathNode[][]>([]);
  const [currentPath, setCurrentPath] = useState<PathNode[] | null>(null);
  const [draggingColor, setDraggingColor] = useState<string | null>(null);

  const [mistakes, setMistakes] = useState(0);
  const [maxMistakes, setMaxMistakes] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const initGame = useCallback(() => {
    setPaths([]);
    setCurrentPath(null);
    setDraggingColor(null);
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

  const getPairAt = (r: number, c: number) => {
    return boardData.pairs.find((p) => (p.r1 === r && p.c1 === c) || (p.r2 === r && p.c2 === c));
  };

  const getPathAt = (r: number, c: number) => {
    return paths.find((path) => path.some((node) => node.r === r && node.c === c));
  };

  // --- MOUSE / TOUCH EVENTS ---

  const handlePointerDown = (r: number, c: number) => {
    if (isGameOver || showRules) return;

    // Start drawing from a node
    const pair = getPairAt(r, c);
    if (pair) {
      // Remove existing path for this color if present
      setPaths((prev) => prev.filter((p) => !p.some((n) => n.color === pair.color)));

      setDraggingColor(pair.color);
      setCurrentPath([{ r, c, color: pair.color }]);
      return;
    }

    // Or start modifying an existing path from its endpoint
    const existingPath = getPathAt(r, c);
    if (existingPath) {
      const head = existingPath[existingPath.length - 1];
      const tail = existingPath[0];

      if (head.r === r && head.c === c) {
        setPaths((prev) => prev.filter((p) => p !== existingPath));
        setDraggingColor(existingPath[0].color);
        setCurrentPath([...existingPath]);
      } else if (tail.r === r && tail.c === c) {
        // reverse it
        setPaths((prev) => prev.filter((p) => p !== existingPath));
        setDraggingColor(existingPath[0].color);
        setCurrentPath([...existingPath].reverse());
      }
    }
  };

  const handlePointerEnter = (r: number, c: number) => {
    if (!draggingColor || !currentPath || isGameOver) return;

    const lastNode = currentPath[currentPath.length - 1];

    // Ensure adjacent
    const isAdjacent = Math.abs(lastNode.r - r) + Math.abs(lastNode.c - c) === 1;
    if (!isAdjacent) return;

    // Check if hitting another line (not ours)
    const hitPath = getPathAt(r, c);
    if (hitPath) return; // Prevent crossing lines

    // Check if hitting itself (allow backtracking)
    const selfIndex = currentPath.findIndex((n) => n.r === r && n.c === c);
    if (selfIndex !== -1) {
      // Cut path
      setCurrentPath(currentPath.slice(0, selfIndex + 1));
      return;
    }

    // Check if hitting another pair
    const targetPair = getPairAt(r, c);
    if (targetPair && targetPair.color !== draggingColor) {
      return; // invalid connection
    }

    // Add to path
    const newPath = [...currentPath, { r, c, color: draggingColor }];
    setCurrentPath(newPath);

    // If reached target, complete path
    if (targetPair && targetPair.color === draggingColor) {
      setPaths((prev) => [...prev, newPath]);
      setCurrentPath(null);
      setDraggingColor(null);
      checkWin([...paths, newPath]);
    }
  };

  const handlePointerUp = () => {
    if (draggingColor && currentPath) {
      // Just drop it where it is, don't delete it
      setPaths((prev) => [...prev, currentPath]);
    }
    setCurrentPath(null);
    setDraggingColor(null);
  };

  // Global pass to catch mouse ups outside the grid
  useEffect(() => {
    const up = () => handlePointerUp();
    window.addEventListener('pointerup', up);
    return () => window.removeEventListener('pointerup', up);
  });

  const checkWin = (currentPaths: PathNode[][]) => {
    // All pairs must be connected
    const connectedColors = new Set<string>();

    for (const p of currentPaths) {
      const start = p[0];
      const end = p[p.length - 1];
      if (!start || !end) continue;

      const pairStart = getPairAt(start.r, start.c);
      const pairEnd = getPairAt(end.r, end.c);

      if (
        pairStart &&
        pairEnd &&
        pairStart.color === pairEnd.color &&
        (start.r !== end.r || start.c !== end.c)
      ) {
        connectedColors.add(pairStart.color);
      }
    }

    if (connectedColors.size === boardData.pairs.length) {
      // All connected!
      // In traditional Numberlink, every cell doesn't HAVE to be filled, but in generic versions it does.
      // We'll just check connections.
      handleGameOver(true);
    }
  };

  const renderCellContent = (r: number, c: number) => {
    const pair = getPairAt(r, c);

    let pathLine = null;
    let isCurrent = false;

    const pathNodeIndex = currentPath?.findIndex((n) => n.r === r && n.c === c) ?? -1;
    if (pathNodeIndex !== -1 && currentPath) {
      isCurrent = true;
      const node = currentPath[pathNodeIndex];
      const prev = currentPath[pathNodeIndex - 1];
      const next = currentPath[pathNodeIndex + 1];
      pathLine = getPathSVG(node, prev, next, node.color);
    } else {
      const savedPath = getPathAt(r, c);
      if (savedPath) {
        const idx = savedPath.findIndex((n) => n.r === r && n.c === c);
        const node = savedPath[idx];
        const prev = savedPath[idx - 1];
        const next = savedPath[idx + 1];
        pathLine = getPathSVG(node, prev, next, node.color);
      }
    }

    if (pair) {
      const baseColorClass = pair.color.split(' ')[0]; // text-red-500
      const [colorPrefix, colorName, shade] = baseColorClass.split('-');
      const bgClass = `bg-${colorName}-500`;

      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {pathLine}
          <div
            className={`relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-xl md:text-2xl shadow-lg border-2 border-slate-900 ${bgClass} text-white`}
          >
            {pair.val}
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full flex items-center justify-center">{pathLine}</div>
    );
  };

  // Draw lines connecting centers
  const getPathSVG = (node: PathNode, prev?: PathNode, next?: PathNode, colorClasses?: string) => {
    const baseColorClass = colorClasses?.split(' ')[1]; // bg-red-500
    const [_, colorName, shade] = (baseColorClass || '').split('-');

    // Let's use Tailwind's arbitrary values for SVG stroke
    const isRed = colorName === 'red';
    const isBlue = colorName === 'blue';
    const isGreen = colorName === 'green';
    const isYellow = colorName === 'yellow';
    const isPurple = colorName === 'purple';

    let strokeColor = '#64748B'; // default
    if (isRed) strokeColor = '#EF4444';
    if (isBlue) strokeColor = '#3B82F6';
    if (isGreen) strokeColor = '#22C55E';
    if (isYellow) strokeColor = '#EAB308';
    if (isPurple) strokeColor = '#A855F7';

    const lines = [];
    const strokeWidth = 14;

    if (prev) {
      const dx = prev.c - node.c;
      const dy = prev.r - node.r;
      lines.push(
        <line
          key="prev"
          x1="50%"
          y1="50%"
          x2={`${50 + dx * 50}%`}
          y2={`${50 + dy * 50}%`}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      );
    }
    if (next) {
      const dx = next.c - node.c;
      const dy = next.r - node.r;
      lines.push(
        <line
          key="next"
          x1="50%"
          y1="50%"
          x2={`${50 + dx * 50}%`}
          y2={`${50 + dy * 50}%`}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      );
    }

    // If it's just a single point start, draw a dot
    if (!prev && !next) {
      lines.push(<circle key="dot" cx="50%" cy="50%" r={strokeWidth / 2} fill={strokeColor} />);
    }

    return <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">{lines}</svg>;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans selection:bg-rose-500/30">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl text-rose-400">🔀</span> Numberlink Nasıl Oynanır?
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span className="text-rose-400">🔢</span>
                <span>
                  Aynı renk ve numaraya sahip daireleri birbirine <b>kesintisiz çizgilerle</b>{' '}
                  bağla.
                </span>
              </li>
              <li className="flex gap-3 text-red-400 font-bold">
                <span>🚫</span>
                <span>
                  Farklı çizgiler birbiriyle <b>kesişemez</b> veya üst üste gelemez.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-500">👆</span>
                <span>
                  Bir daireden basılı tutarak sürükle ve diğer eşine ulaştır. Düzeltmek için çizgiye
                  tekrar dokun.
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full py-4 rounded-xl font-black text-xl transition-all bg-rose-500 hover:bg-rose-400 text-white shadow-lg active:scale-95"
            >
              ANLADIM, BAŞLA!
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-lg px-4 py-6 md:py-12">
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
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
                Numberlink
              </h2>
              <div className="text-xs md:text-sm font-bold text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full mt-1 inline-block">
                SEVİYE: {size}x{size}
              </div>
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-2">
            <div className="bg-slate-900/80 px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
              <span className="text-lg">⏱️</span>
              <span
                className={`text-xl md:text-2xl font-black font-mono ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-slate-300'}`}
              >
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
            {/* Optional Mistakes - Numberlink usually doesn't have mistakes until timeout or manual validation */}
          </div>
        </div>

        {/* Board */}
        <div
          className="flex justify-center mb-8 relative touch-none"
          onPointerLeave={handlePointerUp} // Cancel drag if leaving board
        >
          <div
            className="grid gap-[2px] bg-slate-700 p-[2px] rounded-xl shadow-2xl"
            style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
          >
            {Array(size)
              .fill(0)
              .map((_, r) =>
                Array(size)
                  .fill(0)
                  .map((_, c) => (
                    <div
                      key={`${r}-${c}`}
                      onPointerDown={(e) => {
                        e.preventDefault();
                        handlePointerDown(r, c);
                      }}
                      onPointerEnter={() => handlePointerEnter(r, c)}
                      // Touch move requires calculating element from point
                      // This is a simplified fallback relying mostly on pointer enter (which works on desktop and some mobile)
                      // For full mobile support, touchmove event on the container would trace elements via document.elementFromPoint
                      className="w-14 h-14 md:w-20 md:h-20 bg-slate-900 flex items-center justify-center overflow-hidden cursor-crosshair select-none relative"
                    >
                      {renderCellContent(r, c)}
                    </div>
                  ))
              )}
          </div>
        </div>
      </div>

      {/* Game Over Overlay */}
      {isGameOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-slate-800 p-8 md:p-12 rounded-[2rem] max-w-md w-full text-center shadow-2xl border border-white/10 bounce-in">
            <div className="text-6xl md:text-8xl mb-6">{timeLeft <= 0 ? '💥' : '🎉'}</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {timeLeft <= 0 ? 'Süre Doldu!' : 'Harika!'}
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              {timeLeft <= 0
                ? 'Zamanı iyi yönetemedin.'
                : `Tüm akışları mükemmel bağladın! Kazanılan Yıldız: ${score}`}
            </p>

            <div className="flex flex-col gap-3">
              {timeLeft > 0 && (
                <button
                  onClick={() => onComplete(score)}
                  className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg shadow-green-500/25 active:scale-95"
                >
                  Ödülü Al ⭐️
                </button>
              )}
              <button
                onClick={initGame}
                className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-rose-600 hover:bg-rose-500 text-white shadow-lg active:scale-95"
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

export default NumberlinkGame;
