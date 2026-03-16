import React, { useState, useEffect } from 'react';

interface Props {
  onExit: () => void;
}

type Player = 1 | 2;

const INITIAL_ROWS = [1, 3, 5, 7]; // Classic Nim starting configuration

const NimGame: React.FC<Props> = ({ onExit }) => {
  const [rows, setRows] = useState<number[]>(INITIAL_ROWS);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);

  const resetGame = () => {
    setRows([...INITIAL_ROWS]);
    setCurrentPlayer(1);
    setSelectedRow(null);
    setSelectedCount(0);
    setGameOver(false);
    setWinner(null);
  };

  const handleStickSelect = (rowIdx: number, count: number) => {
    if (gameOver) return;

    // You can only select from one row at a time per turn
    if (selectedRow === null || selectedRow === rowIdx) {
      setSelectedRow(rowIdx);
      if (selectedCount === count) {
        // Deselect if clicking the same number again
        setSelectedRow(null);
        setSelectedCount(0);
      } else {
        setSelectedCount(count);
      }
    } else {
      // Switching to a different row
      setSelectedRow(rowIdx);
      setSelectedCount(count);
    }
  };

  const executeMove = () => {
    if (selectedRow === null || selectedCount === 0 || gameOver) return;

    const newRows = [...rows];
    newRows[selectedRow] -= selectedCount;
    setRows(newRows);

    // Check if game is over (all rows are 0)
    const totalRemaining = newRows.reduce((a, b) => a + b, 0);
    if (totalRemaining === 0) {
      // Misere play: The person who takes the last object loses.
      // So the OTHER player wins
      setWinner(currentPlayer === 1 ? 2 : 1);
      setGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }

    setSelectedRow(null);
    setSelectedCount(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-4 relative">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onExit}
          className="px-6 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700 font-bold"
        >
          <span>⬅</span> Çıkış
        </button>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl border border-white/10 w-full max-w-4xl flex flex-col md:flex-row items-center gap-12">
        {/* Sidebar */}
        <div className="flex flex-col gap-6 min-w-[250px] w-full md:w-auto">
          <div>
            <h2 className="text-4xl font-black text-rose-400 italic drop-shadow-lg mb-2">
              Nim Oyunu
            </h2>
            <p className="text-white/60 text-sm leading-tight border-b border-white/10 pb-4">
              Aynı satırdan istediğiniz kadar (en az 1) çubuk alabilirsiniz.
              <span className="block mt-1 font-bold text-rose-300">
                Tahtadaki en son çubuğu alan kaybeder!
              </span>
            </p>
          </div>

          <div className="flex gap-4">
            {/* P1 */}
            <div
              className={`flex-1 p-3 text-center rounded-2xl border-2 transition-all ${currentPlayer === 1 && !gameOver ? 'bg-indigo-600/30 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)] scale-105' : 'bg-slate-800/20 border-white/10 opacity-70'}`}
            >
              <div className="w-8 h-8 mx-auto rounded-full bg-indigo-500 mb-2"></div>
              <span className="font-black text-white text-xs">1. OYUNCU</span>
            </div>

            {/* P2 */}
            <div
              className={`flex-1 p-3 text-center rounded-2xl border-2 transition-all ${currentPlayer === 2 && !gameOver ? 'bg-amber-500/30 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-105' : 'bg-slate-800/20 border-white/10 opacity-70'}`}
            >
              <div className="w-8 h-8 mx-auto rounded-full bg-amber-500 mb-2"></div>
              <span className="font-black text-white text-xs">2. OYUNCU</span>
            </div>
          </div>

          <button
            onClick={executeMove}
            disabled={selectedRow === null || selectedCount === 0 || gameOver}
            className={`w-full py-4 rounded-xl font-black text-lg transition-all shadow-xl ${selectedRow !== null && selectedCount > 0 && !gameOver ? 'bg-rose-500 hover:bg-rose-600 text-white cursor-pointer hover:shadow-[0_0_30px_rgba(244,63,94,0.4)]' : 'bg-slate-800 text-slate-500 cursor-not-allowed hidden'}`}
          >
            HAMLEYİ YAP ({selectedCount} Çubuk Al)
          </button>

          {gameOver && (
            <div className="bg-emerald-500/20 border border-emerald-500/50 p-6 rounded-3xl text-center mt-4">
              <h3 className="text-xl font-black text-emerald-400 mb-2">OYUN BİTTİ!</h3>
              <p className="text-white font-bold mb-4">
                {winner === 1 ? '🏆 1. OYUNCU KAZANDI!' : '🏆 2. OYUNCU KAZANDI!'}
              </p>
              <button
                onClick={resetGame}
                className="w-full py-2 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 transition-colors"
              >
                YENİ OYUN
              </button>
            </div>
          )}
          {!gameOver && (
            <button
              onClick={resetGame}
              className="w-full mt-auto py-2 bg-slate-800 text-white/50 font-bold rounded-xl hover:bg-slate-700 hover:text-white transition-colors"
            >
              Yeniden Başlat
            </button>
          )}
        </div>

        {/* Board */}
        <div className="flex-1 w-full bg-slate-950/50 p-8 rounded-3xl border border-slate-800 min-h-[400px] flex flex-col justify-center gap-8">
          {rows.map((stickCount, rowIdx) => (
            <div key={rowIdx} className="flex justify-center items-center gap-3">
              {Array.from({ length: stickCount }).map((_, stickIdx) => {
                // Determine if this specific stick should be highlighted as 'selected'
                // We'll just select from right to left for simplicity
                const isSelected = selectedRow === rowIdx && stickIdx >= stickCount - selectedCount;

                return (
                  <div
                    key={stickIdx}
                    onClick={() => handleStickSelect(rowIdx, stickCount - stickIdx)}
                    className={`
                      cursor-pointer group relative
                    `}
                  >
                    {/* The Stick Model */}
                    <div
                      className={`
                        w-6 h-28 md:w-8 md:h-36 rounded-full transition-all duration-300 transform outline outline-1 outline-black/50
                        ${isSelected ? 'bg-rose-500 -translate-y-4 shadow-[0_10px_20px_rgba(244,63,94,0.4)] scale-110' : 'bg-[#e5c07b] hover:-translate-y-2 hover:bg-[#d19a66] shadow-[0_4px_10px_rgba(0,0,0,0.5)]'}
                     `}
                    >
                      {/* Match Tip */}
                      <div
                        className={`w-full h-8 rounded-full ${isSelected ? 'bg-red-800' : 'bg-[#c15c5c]'} shadow-inner`}
                      ></div>

                      {/* Wood Texture Detail */}
                      <div className="absolute inset-0 top-8 opacity-20 pointer-events-none rounded-b-full bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,black_2px,black_4px)]"></div>
                    </div>
                  </div>
                );
              })}
              {/* Ghost sticks to show empty space for better layout stability */}
              {Array.from({ length: 7 - stickCount }).map((_, idx) => (
                <div
                  key={`empty-${idx}`}
                  className="w-6 md:w-8 h-28 md:h-36 mx-1.5 opacity-0"
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NimGame;
