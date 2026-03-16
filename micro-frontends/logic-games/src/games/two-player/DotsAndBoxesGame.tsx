import React, { useState, useEffect, useCallback } from 'react';

interface Props {
  onExit: () => void;
}

type Player = 1 | 2;

const DOTS_SIZE = 6; // 6x6 dots = 5x5 boxes

const DotsAndBoxesGame: React.FC<Props> = ({ onExit }) => {
  // false means line not drawn, true means line down
  const [hLines, setHLines] = useState<boolean[][]>(
    Array(DOTS_SIZE)
      .fill(null)
      .map(() => Array(DOTS_SIZE - 1).fill(false))
  );
  const [vLines, setVLines] = useState<boolean[][]>(
    Array(DOTS_SIZE - 1)
      .fill(null)
      .map(() => Array(DOTS_SIZE).fill(false))
  );
  const [boxes, setBoxes] = useState<(Player | null)[][]>(
    Array(DOTS_SIZE - 1)
      .fill(null)
      .map(() => Array(DOTS_SIZE - 1).fill(null))
  );

  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [gameOver, setGameOver] = useState(false);

  // Check board completion
  useEffect(() => {
    let completed = 0;
    for (let r = 0; r < DOTS_SIZE - 1; r++) {
      for (let c = 0; c < DOTS_SIZE - 1; c++) {
        if (boxes[r][c] !== null) completed++;
      }
    }
    if (completed === (DOTS_SIZE - 1) * (DOTS_SIZE - 1)) {
      setGameOver(true);
    }
  }, [boxes]);

  const drawHLine = (r: number, c: number) => {
    if (gameOver || hLines[r][c]) return;

    const newHLines = [...hLines.map((row) => [...row])];
    newHLines[r][c] = true;
    setHLines(newHLines);

    checkBoxes(newHLines, vLines);
  };

  const drawVLine = (r: number, c: number) => {
    if (gameOver || vLines[r][c]) return;

    const newVLines = [...vLines.map((row) => [...row])];
    newVLines[r][c] = true;
    setVLines(newVLines);

    checkBoxes(hLines, newVLines);
  };

  const checkBoxes = (currentHLines: boolean[][], currentVLines: boolean[][]) => {
    let boxesCompletedInTurn = 0;
    const newBoxes = [...boxes.map((row) => [...row])];

    for (let r = 0; r < DOTS_SIZE - 1; r++) {
      for (let c = 0; c < DOTS_SIZE - 1; c++) {
        if (newBoxes[r][c] === null) {
          // Check if all 4 lines are drawn
          if (
            currentHLines[r][c] && // Top
            currentHLines[r + 1][c] && // Bottom
            currentVLines[r][c] && // Left
            currentVLines[r][c + 1] // Right
          ) {
            newBoxes[r][c] = currentPlayer;
            boxesCompletedInTurn++;
          }
        }
      }
    }

    setBoxes(newBoxes);

    if (boxesCompletedInTurn > 0) {
      setScores((prev) => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + boxesCompletedInTurn,
      }));
      // Player gets another turn, do not change currentPlayer
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  const resetGame = () => {
    setHLines(
      Array(DOTS_SIZE)
        .fill(null)
        .map(() => Array(DOTS_SIZE - 1).fill(false))
    );
    setVLines(
      Array(DOTS_SIZE - 1)
        .fill(null)
        .map(() => Array(DOTS_SIZE).fill(false))
    );
    setBoxes(
      Array(DOTS_SIZE - 1)
        .fill(null)
        .map(() => Array(DOTS_SIZE - 1).fill(null))
    );
    setCurrentPlayer(1);
    setScores({ 1: 0, 2: 0 });
    setGameOver(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bounce-in">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onExit}
          className="px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors flex items-center gap-2 font-bold border border-white/20"
        >
          <span>⬅</span> Çıkış
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 italic drop-shadow-lg">
          Noktalar ve Kutular
        </h2>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[40px] shadow-2xl flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Score Board & Status - Sidebar on Desktop */}
        <div className="flex flex-col gap-6 min-w-[250px] w-full md:w-auto">
          <div
            className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${currentPlayer === 1 && !gameOver ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-105' : 'bg-slate-800 border-white/10 opacity-70'}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧑‍🚀</span>
              <span className="font-black text-emerald-400">1. OYUNCU</span>
            </div>
            <span className="text-3xl font-black text-white">{scores[1]}</span>
          </div>

          <div
            className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${currentPlayer === 2 && !gameOver ? 'bg-indigo-500/20 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)] scale-105' : 'bg-slate-800 border-white/10 opacity-70'}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">👽</span>
              <span className="font-black text-indigo-400">2. OYUNCU</span>
            </div>
            <span className="text-3xl font-black text-white">{scores[2]}</span>
          </div>

          {gameOver && (
            <div className="bg-rose-500/20 border border-rose-500/50 p-6 rounded-3xl text-center mt-4">
              <h3 className="text-2xl font-black text-rose-400 mb-2">OYUN BİTTİ!</h3>
              <p className="text-white font-bold mb-6">
                {scores[1] > scores[2]
                  ? '🏆 1. OYUNCU KAZANDI!'
                  : scores[2] > scores[1]
                    ? '🏆 2. OYUNCU KAZANDI!'
                    : '🤝 BERABERE BİTTİ'}
              </p>
              <button
                onClick={resetGame}
                className="w-full py-3 bg-rose-500 text-white font-black rounded-xl hover:bg-rose-600 transition-colors"
              >
                YENİ OYUN
              </button>
            </div>
          )}
          {!gameOver && (
            <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-sm text-white/70 font-bold mb-2">NASIL OYNANIR?</p>
              <p className="text-xs text-white/50">
                Noktalar arası çizgileri tıklayarak karenizi kapatın. Kare kapatan tekrar oynar.
              </p>
            </div>
          )}
        </div>

        {/* Board */}
        <div className="bg-white/5 p-6 md:p-10 rounded-[32px] border border-white/10 shadow-inner flex-shrink-0">
          <div className="relative inline-block">
            {/* Horizontal Lines */}
            {hLines.map((row, r) =>
              row.map((line, c) => (
                <button
                  key={`h-${r}-${c}`}
                  onClick={() => drawHLine(r, c)}
                  disabled={line || gameOver}
                  className={`absolute h-3 w-12 md:w-16 rounded-full transform -translate-y-1/2 transition-colors cursor-pointer 
                            ${line ? (currentPlayer === 1 ? 'bg-emerald-500' : 'bg-indigo-500') : 'bg-white/10 hover:bg-white/30'}
                         `}
                  style={{ top: `${r * 50}px`, left: `${c * 50 + 10}px` }}
                />
              ))
            )}

            {/* Vertical Lines */}
            {vLines.map((row, r) =>
              row.map((line, c) => (
                <button
                  key={`v-${r}-${c}`}
                  onClick={() => drawVLine(r, c)}
                  disabled={line || gameOver}
                  className={`absolute w-3 h-12 md:h-16 rounded-full transform -translate-x-1/2 transition-colors cursor-pointer 
                            ${line ? (currentPlayer === 1 ? 'bg-emerald-500' : 'bg-indigo-500') : 'bg-white/10 hover:bg-white/30'}
                         `}
                  style={{ top: `${r * 50 + 10}px`, left: `${c * 50}px` }}
                />
              ))
            )}

            {/* Dots & Boxes overlay */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${DOTS_SIZE}, 50px)`,
                gridTemplateRows: `repeat(${DOTS_SIZE}, 50px)`,
              }}
            >
              {Array(DOTS_SIZE * DOTS_SIZE)
                .fill(null)
                .map((_, idx) => {
                  const r = Math.floor(idx / DOTS_SIZE);
                  const c = idx % DOTS_SIZE;

                  // We also render boxes if r < DOTS_SIZE-1 and c < DOTS_SIZE-1
                  const owner = r < DOTS_SIZE - 1 && c < DOTS_SIZE - 1 ? boxes[r][c] : null;

                  return (
                    <div key={idx} className="relative w-full h-full">
                      {/* BOX FILL */}
                      {owner && (
                        <div
                          className={`absolute top-[8px] left-[8px] right-[-8px] bottom-[-8px] opacity-40 rounded-lg animate-in zoom-in ${owner === 1 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                        ></div>
                      )}
                      {owner && (
                        <div
                          className="absolute top-[8px] left-[8px] right-[-8px] bottom-[-8px] flex items-center justify-center font-black animate-in fade-in"
                          style={{ color: owner === 1 ? '#10b981' : '#6366f1' }}
                        >
                          {owner === 1 ? '1' : '2'}
                        </div>
                      )}

                      {/* DOT */}
                      <div className="absolute w-5 h-5 bg-white/40 rounded-full top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 shadow-inner z-10 pointer-events-none"></div>
                    </div>
                  );
                })}
            </div>

            {/* Adjust container width based on grid exactly */}
            <div
              style={{ width: `${(DOTS_SIZE - 1) * 50}px`, height: `${(DOTS_SIZE - 1) * 50}px` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DotsAndBoxesGame;
