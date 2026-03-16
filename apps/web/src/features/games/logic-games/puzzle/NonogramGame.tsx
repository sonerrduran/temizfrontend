import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';
import { LogicGameWrapper, RulesOverlay, GameOverOverlay, useLogicGame } from '../shared';

interface NonogramGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

const generateNonogram = (size: number) => {
  // Generate a random binary matrix that looks somewhat like a shape
  const solution = Array(size)
    .fill(0)
    .map(() => Array(size).fill(0));

  // Fill density: Easy ~40%, Hard ~60%
  const density = size === 5 ? 0.45 : 0.55;

  // To make it more solvable, maybe don't make it purely random,
  // but purely random is easiest for this scope
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // ensure at least some cells are filled
      solution[r][c] = Math.random() < density ? 1 : 0;
    }
  }

  // Ensure no completely empty rows or columns (if possible)
  for (let r = 0; r < size; r++) {
    if (!solution[r].includes(1)) solution[r][Math.floor(Math.random() * size)] = 1;
  }
  for (let c = 0; c < size; c++) {
    let hasOne = false;
    for (let r = 0; r < size; r++) if (solution[r][c] === 1) hasOne = true;
    if (!hasOne) solution[Math.floor(Math.random() * size)][c] = 1;
  }

  // Calculate clues
  const rowClues: number[][] = [];
  for (let r = 0; r < size; r++) {
    const clues = [];
    let count = 0;
    for (let c = 0; c < size; c++) {
      if (solution[r][c] === 1) count++;
      else if (count > 0) {
        clues.push(count);
        count = 0;
      }
    }
    if (count > 0) clues.push(count);
    if (clues.length === 0) clues.push(0);
    rowClues.push(clues);
  }

  const colClues: number[][] = [];
  for (let c = 0; c < size; c++) {
    const clues = [];
    let count = 0;
    for (let r = 0; r < size; r++) {
      if (solution[r][c] === 1) count++;
      else if (count > 0) {
        clues.push(count);
        count = 0;
      }
    }
    if (count > 0) clues.push(count);
    if (clues.length === 0) clues.push(0);
    colClues.push(clues);
  }

  return { solution, rowClues, colClues };
};

const NonogramGame: React.FC<NonogramGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
      case Difficulty.MEDIUM:
        return 5;
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return 8;
      default:
        return 5;
    }
  };

  const size = getSizeForDifficulty();
  const maxMistakes = difficulty === Difficulty.HARD || difficulty === Difficulty.VERY_HARD ? 3 : 5;

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
    maxMistakes,
    timeMultiplier: 1.5, // Nonogram needs more time
  });

  const [solution, setSolution] = useState<number[][]>([]);
  const [rowClues, setRowClues] = useState<number[][]>([]);
  const [colClues, setColClues] = useState<number[][]>([]);
  const [board, setBoard] = useState<number[][]>([]);

  // mode: 'fill' | 'cross'
  const [drawMode, setDrawMode] = useState<'fill' | 'cross'>('fill');

  const initGame = useCallback(() => {
    const { solution, rowClues, colClues } = generateNonogram(size);
    setSolution(solution);
    setRowClues(rowClues);
    setColClues(colClues);
    setBoard(
      Array(size)
        .fill(0)
        .map(() => Array(size).fill(0))
    );
    setDrawMode('fill');
  }, [size]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver) return;

    // If it's already filled/crossed, we can toggle it back to empty (0)
    // Or if empty, toggle to drawMode (1 or 2)
    const current = board[r][c];
    const targetVal = drawMode === 'fill' ? 1 : 2;

    // Auto mistake check: if player tries to 'fill' an empty cell in solution, it's a mistake
    // Nonogram often punishes wrong fills immediately.
    if (drawMode === 'fill' && current === 0 && solution[r][c] === 0) {
      // Mistake!
      addMistake();
      // Auto mark it as cross to help them
      const newBoard = board.map((row) => [...row]);
      newBoard[r][c] = 2;
      setBoard(newBoard);
      return;
    }

    const newBoard = board.map((row) => [...row]);
    if (current === targetVal) {
      newBoard[r][c] = 0; // erase
    } else {
      newBoard[r][c] = targetVal;
    }
    setBoard(newBoard);

    // Check if won (all 1s match solution 1s, ignores crosses (2))
    let won = true;
    for (let ir = 0; ir < size; ir++) {
      for (let ic = 0; ic < size; ic++) {
        // If solution needs 1, board must have 1
        if (solution[ir][ic] === 1 && newBoard[ir][ic] !== 1) won = false;
        // If board has 1, solution must have 1 (prevent overfilling, though we already punished it above)
        if (newBoard[ir][ic] === 1 && solution[ir][ic] !== 1) won = false;
      }
    }
    if (won) endGame(true);
  };

  const gameRules = [
    {
      icon: '1️⃣',
      text: 'Izgaranın satır ve sütunlarının kenarındaki sayılar, o satır/sütunda peş peşe (aralıksız) boyanması gereken kare sayılarını gösterir.',
    },
    {
      icon: '2️⃣',
      text: 'Örneğin "3 2" yazıyorsa, önce peş peşe 3 kare, sonra en az 1 boşluk, sonra peş peşe 2 kare boyanmalıdır.',
    },
    {
      icon: '3️⃣',
      text: 'Kesinlikle boş olması gereken karelere "ÇARPI (✕)" koyarak işini kolaylaştırabilirsin.',
    },
    {
      icon: '4️⃣',
      text: 'Yanlış bir kareyi boyadığında uyarı alırsın. Tüm doğru kareleri boyayarak resmi ortaya çıkar!',
    },
  ];

  return (
    <>
      <LogicGameWrapper
        title="Nonogram"
        emoji="🎨"
        subtitle={`${size}x${size} İzgara`}
        gradientFrom="from-pink-600/40"
        gradientTo="to-rose-700/40"
        onExit={onExit}
        onShowRules={() => setShowRules(true)}
        infoCard={
          <div className="flex gap-3 text-sm font-bold">
            <div className="text-white/90">
              Hata: {mistakes}/{maxMistakes}
            </div>
            <div className={timeLeft <= 30 ? 'text-red-400 animate-pulse' : 'text-white/90'}>
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>
        }
      >
        <div className="flex flex-col items-center justify-center text-white">
          {/* Mod Seçimi */}
          <div className="flex justify-center mb-6 gap-4">
            <button
              onClick={() => setDrawMode('fill')}
              className={`px-6 py-3 rounded-2xl font-black flex items-center gap-2 transition-all ${drawMode === 'fill' ? 'bg-white text-pink-600 shadow-lg scale-105' : 'bg-white/20 text-white hover:bg-white/30'} border border-white/30`}
            >
              <div className="w-4 h-4 bg-current rounded-sm"></div> DOLDUR
            </button>
            <button
              onClick={() => setDrawMode('cross')}
              className={`px-6 py-3 rounded-2xl font-black flex items-center gap-2 transition-all ${drawMode === 'cross' ? 'bg-white text-pink-600 shadow-lg scale-105' : 'bg-white/20 text-white hover:bg-white/30'} border border-white/30`}
            >
              <div className="text-xl leading-none">✕</div> ÇARPI
            </button>
          </div>

          {/* Grid Container */}
          <div className="flex flex-col items-center select-none bg-slate-900/40 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex">
              {/* Top-left empty corner */}
              <div className="w-16 md:w-20 bg-transparent flex items-end justify-end p-2 border-r-2 border-b-2 border-white/30"></div>

              {/* Col Clues */}
              <div className="flex bg-slate-800/60 rounded-tr-xl border-b-2 border-white/30">
                {colClues.map((clueArr, c) => (
                  <div
                    key={`col-${c}`}
                    className="w-10 h-auto md:w-12 min-h-[80px] flex flex-col items-center justify-end p-1 gap-1 border-r border-white/20 text-xs md:text-sm font-black text-white"
                  >
                    {clueArr.map((clue, idx) => (
                      <span key={idx}>{clue}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex">
              {/* Row Clues */}
              <div className="flex flex-col bg-slate-800/60 rounded-bl-xl border-r-2 border-white/30">
                {rowClues.map((clueArr, r) => (
                  <div
                    key={`row-${r}`}
                    className="h-10 md:h-12 w-16 md:w-20 flex items-center justify-end p-2 gap-2 border-b border-white/20 text-xs md:text-sm font-black text-white"
                  >
                    {clueArr.map((clue, idx) => (
                      <span key={idx}>{clue}</span>
                    ))}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="flex flex-col border-2 border-white/30 bg-slate-900/60 rounded-br-xl overflow-hidden shadow-xl">
                {board.map((row, r) => (
                  <div key={`gr-${r}`} className="flex">
                    {row.map((cell, c) => {
                      const isFilled = cell === 1;
                      const isCrossed = cell === 2;
                      const borderR =
                        c === 4 && size > 5
                          ? 'border-r-2 border-white/40'
                          : 'border-r border-white/20';
                      const borderB =
                        r === 4 && size > 5
                          ? 'border-b-2 border-white/40'
                          : 'border-b border-white/20';

                      return (
                        <div
                          key={`${r}-${c}`}
                          onClick={() => handleCellClick(r, c)}
                          className={`
                                                        w-10 h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer transition-all
                                                        ${borderR} ${borderB}
                                                        ${isFilled ? 'bg-white shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]' : 'bg-transparent hover:bg-white/10'}
                                                    `}
                        >
                          {isCrossed && (
                            <span className="text-white/60 font-black text-xl select-none">✕</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </LogicGameWrapper>

      <RulesOverlay
        show={showRules}
        onClose={() => setShowRules(false)}
        title="Nonogram"
        emoji="🎨"
        rules={gameRules}
        gradientFrom="from-pink-600"
        gradientTo="to-rose-700"
      />

      <GameOverOverlay
        show={isGameOver}
        onRestart={() => resetGame(initGame)}
        onExit={() => onComplete(score)}
        score={score}
        gameWon={gameWon}
        mistakes={mistakes}
        maxMistakes={maxMistakes}
        timeLeft={timeLeft}
        gradientFrom="from-pink-600"
        gradientTo="to-rose-700"
      />
    </>
  );
};

export default NonogramGame;
