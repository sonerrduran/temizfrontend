import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';
import { LogicGameWrapper, RulesOverlay, GameOverOverlay, useLogicGame } from '../../shared';

interface SlitherlinkGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

type LineState = 'empty' | 'drawn' | 'crossed';

interface BoardData {
  size: number;
  clues: (number | null)[][];
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    clues: [
      [null, 3, null, null],
      [1, null, 2, null],
      [null, null, 1, 3],
      [2, null, null, null],
    ],
  },
  5: {
    size: 5,
    clues: [
      [3, null, null, null, 1],
      [null, 2, null, 2, null],
      [null, null, 3, null, 2],
      [1, 2, null, 1, null],
      [null, null, null, 2, null],
    ],
  },
};

const SlitherlinkGame: React.FC<SlitherlinkGameProps> = ({
  grade,
  difficulty,
  onComplete,
  onExit,
}) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
      case Difficulty.MEDIUM:
        return 4;
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return 5;
      default:
        return 4;
    }
  };

  const getTimeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 600;
      case Difficulty.MEDIUM:
        return 900;
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return 1200;
      default:
        return 900;
    }
  };

  const size = getSizeForDifficulty();

  const [hLines, setHLines] = useState<LineState[][]>([]);
  const [vLines, setVLines] = useState<LineState[][]>([]);
  const [clues, setClues] = useState<(number | null)[][]>([]);

  const { timeLeft, mistakes, maxMistakes, isGameOver, showRules, setShowRules, endGame } =
    useLogicGame({
      difficulty,
      timeLimit: getTimeForDifficulty(),
      onComplete,
      onTimeUp: () => handleEndGame(false),
      onMaxMistakes: () => handleEndGame(false),
    });

  const initGame = useCallback(() => {
    const board = BOARDS[size];
    setClues(board.clues);

    const initialHLines = Array(size + 1)
      .fill(null)
      .map(() => Array(size).fill('empty'));
    setHLines(initialHLines);

    const initialVLines = Array(size)
      .fill(null)
      .map(() => Array(size + 1).fill('empty'));
    setVLines(initialVLines);
  }, [size]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleEndGame = (win: boolean) => {
    let finalStars = 1;
    if (win) {
      finalStars = timeLeft > getTimeForDifficulty() * 0.5 ? 5 : 4;
    }
    endGame(finalStars);
  };

  const handleLineClick = (type: 'h' | 'v', r: number, c: number) => {
    if (isGameOver) return;

    const nextState = (curr: LineState): LineState => {
      if (curr === 'empty') return 'drawn';
      if (curr === 'drawn') return 'crossed';
      return 'empty';
    };

    if (type === 'h') {
      const newH = hLines.map((row) => [...row]);
      newH[r][c] = nextState(newH[r][c]);
      setHLines(newH);
      checkSolution(newH, vLines);
    } else {
      const newV = vLines.map((row) => [...row]);
      newV[r][c] = nextState(newV[r][c]);
      setVLines(newV);
      checkSolution(hLines, newV);
    }
  };

  const checkSolution = (currH: LineState[][], currV: LineState[][]) => {
    let cluesSatisfied = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (clues[r][c] !== null) {
          let count = 0;
          if (currH[r][c] === 'drawn') count++;
          if (currH[r + 1][c] === 'drawn') count++;
          if (currV[r][c] === 'drawn') count++;
          if (currV[r][c + 1] === 'drawn') count++;
          if (count !== clues[r][c]) {
            cluesSatisfied = false;
            break;
          }
        }
      }
      if (!cluesSatisfied) break;
    }

    if (!cluesSatisfied) return;

    let totalDrawn = 0;
    currH.forEach((row) => row.forEach((val) => val === 'drawn' && totalDrawn++));
    currV.forEach((row) => row.forEach((val) => val === 'drawn' && totalDrawn++));

    if (totalDrawn === 0) return;

    for (let r = 0; r <= size; r++) {
      for (let c = 0; c <= size; c++) {
        let degree = 0;
        if (r > 0 && currV[r - 1][c] === 'drawn') degree++;
        if (r < size && currV[r][c] === 'drawn') degree++;
        if (c > 0 && currH[r][c - 1] === 'drawn') degree++;
        if (c < size && currH[r][c] === 'drawn') degree++;

        if (degree !== 0 && degree !== 2) return;
      }
    }

    let startNode: [number, number] | null = null;
    outer: for (let r = 0; r <= size; r++) {
      for (let c = 0; c <= size; c++) {
        if (c < size && currH[r][c] === 'drawn') {
          startNode = [r, c];
          break outer;
        }
      }
    }

    if (!startNode) return;

    let visitedNodes = new Set<string>();
    let linesCountInLoop = 0;

    const dfs = (r: number, c: number, prevR: number, prevC: number) => {
      const id = `${r},${c}`;
      visitedNodes.add(id);

      if (r > 0 && currV[r - 1][c] === 'drawn' && !(r - 1 === prevR && c === prevC)) {
        linesCountInLoop++;
        if (!visitedNodes.has(`${r - 1},${c}`)) dfs(r - 1, c, r, c);
      }
      if (r < size && currV[r][c] === 'drawn' && !(r + 1 === prevR && c === prevC)) {
        linesCountInLoop++;
        if (!visitedNodes.has(`${r + 1},${c}`)) dfs(r + 1, c, r, c);
      }
      if (c > 0 && currH[r][c - 1] === 'drawn' && !(r === prevR && c - 1 === prevC)) {
        linesCountInLoop++;
        if (!visitedNodes.has(`${r},${c - 1}`)) dfs(r, c - 1, r, c);
      }
      if (c < size && currH[r][c] === 'drawn' && !(r === prevR && c + 1 === prevC)) {
        linesCountInLoop++;
        if (!visitedNodes.has(`${r},${c + 1}`)) dfs(r, c + 1, r, c);
      }
    };

    dfs(startNode[0], startNode[1], -1, -1);

    if (linesCountInLoop === totalDrawn) {
      handleEndGame(true);
    }
  };

  const renderCell = (r: number, c: number) => {
    const dotSize = 'w-2 h-2 md:w-3 md:h-3';
    const cellSize = 'w-10 h-10 md:w-16 md:h-16';
    const lineThick = 'h-2 md:h-3';
    const lineVertWidth = 'w-2 md:w-3';

    return (
      <div key={`cell-${r}-${c}`} className="flex">
        <div className="flex flex-col">
          <div className="flex">
            <div className={`${dotSize} rounded-full bg-slate-300`}></div>

            {c < size && (
              <button
                onClick={() => handleLineClick('h', r, c)}
                className={`${cellSize} ${lineThick} group flex items-center justify-center transition-all px-1`}
              >
                <div
                  className={`w-full h-full rounded-full transition-all 
                                    ${
                                      hLines[r] && hLines[r][c] === 'drawn'
                                        ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                                        : hLines[r] && hLines[r][c] === 'crossed'
                                          ? 'bg-transparent text-red-500 font-bold text-xs flex items-center justify-center'
                                          : 'bg-slate-700/50 group-hover:bg-slate-600'
                                    }`}
                >
                  {hLines[r] && hLines[r][c] === 'crossed' ? '✖' : ''}
                </div>
              </button>
            )}
            {c === size - 1 && <div className={`${dotSize} rounded-full bg-slate-300`}></div>}
          </div>

          {r < size && (
            <div className="flex">
              <button
                onClick={() => handleLineClick('v', r, c)}
                className={`${lineVertWidth} ${cellSize} group flex items-center justify-center transition-all py-1`}
              >
                <div
                  className={`w-full h-full rounded-full transition-all 
                                    ${
                                      vLines[r] && vLines[r][c] === 'drawn'
                                        ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                                        : vLines[r] && vLines[r][c] === 'crossed'
                                          ? 'bg-transparent text-red-500 font-bold text-xs flex items-center justify-center leading-none'
                                          : 'bg-slate-700/50 group-hover:bg-slate-600'
                                    }`}
                >
                  {vLines[r] && vLines[r][c] === 'crossed' ? '✖' : ''}
                </div>
              </button>

              {c < size && (
                <div
                  className={`${cellSize} flex items-center justify-center text-2xl md:text-4xl font-black text-white`}
                >
                  {clues[r] && clues[r][c] !== null ? clues[r][c] : ''}
                </div>
              )}

              {c === size - 1 && (
                <button
                  onClick={() => handleLineClick('v', r, c + 1)}
                  className={`${lineVertWidth} ${cellSize} group flex items-center justify-center transition-all py-1`}
                >
                  <div
                    className={`w-full h-full rounded-full transition-all 
                                        ${
                                          vLines[r] && vLines[r][c + 1] === 'drawn'
                                            ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                                            : vLines[r] && vLines[r][c + 1] === 'crossed'
                                              ? 'bg-transparent text-red-500 font-bold text-xs flex items-center justify-center leading-none'
                                              : 'bg-slate-700/50 group-hover:bg-slate-600'
                                        }`}
                  >
                    {vLines[r] && vLines[r][c + 1] === 'crossed' ? '✖' : ''}
                  </div>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const rules = [
    'Amacın, noktaları birleştirerek kendisini kesmeyen tek, kapalı bir döngü (çizgi) oluşturmaktır.',
    'Karelerin içindeki sayılar, o karenin dört kenarının kaç tanesinden çizgi geçmesi gerektiğini gösterir.',
    'Sayı olmayan karelerin kenarlarından istenildiği kadar çizgi geçebilir veya hiç geçmeyebilir.',
    'Çizgilerin dallanıp budaklanmasına veya kesişmesine izin verilmez! Çizgi çizmek veya çarpılamak için kenarlara tıkla.',
  ];

  return (
    <LogicGameWrapper
      title="Slitherlink"
      emoji="🔗"
      gradient="from-indigo-600/40 to-blue-700/40"
      timeLeft={timeLeft}
      mistakes={mistakes}
      maxMistakes={maxMistakes}
      onExit={onExit}
      difficulty={difficulty}
    >
      <RulesOverlay
        show={showRules}
        onClose={() => setShowRules(false)}
        title="Slitherlink"
        emoji="🔗"
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

      <div className="flex flex-col items-center w-full">
        <div className="bg-slate-800 p-4 md:p-8 rounded-3xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] border border-slate-700 select-none overflow-x-auto max-w-full">
          <div className="inline-flex flex-col">
            {Array.from({ length: size + 1 }).map((_, r) => (
              <div key={`row-${r}`} className="flex">
                {Array.from({ length: size }).map((_, c) => renderCell(r, c))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </LogicGameWrapper>
  );
};

export default SlitherlinkGame;
