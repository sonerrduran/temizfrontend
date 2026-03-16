import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

const JengaGame: React.FC<Props> = ({ onExit }) => {
  const [tower, setTower] = useState(Array(18).fill(3)); // 18 levels, 3 blocks each
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [gameOver, setGameOver] = useState(false);

  const removeBlock = (level: number) => {
    if (gameOver || tower[level] === 0) return;
    const newTower = [...tower];
    newTower[level]--;
    if (Math.random() < 0.1 * (18 - level)) {
      // Higher levels = more risk
      setGameOver(true);
    } else {
      setTower(newTower);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900 text-white p-4">
      <div className="w-full max-w-2xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-amber-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
            🧱 JENGA
          </h2>
          <div className="text-sm font-bold bg-amber-500/20 px-4 py-2 rounded-xl border border-amber-500/30">
            {gameOver
              ? `Oyuncu ${currentPlayer === 1 ? 2 : 1} Kazandı!`
              : `Oyuncu ${currentPlayer}`}
          </div>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-2xl border-4 border-slate-700 mb-4">
          <div className="flex flex-col-reverse gap-1">
            {tower.map((blocks, level) => (
              <div key={level} className="flex justify-center gap-1">
                {Array(blocks)
                  .fill(0)
                  .map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => removeBlock(level)}
                      disabled={gameOver}
                      className={`w-20 h-8 rounded transition-all ${
                        level % 2 === 0
                          ? 'bg-amber-600 hover:bg-amber-500'
                          : 'bg-amber-700 hover:bg-amber-600'
                      } ${gameOver ? 'opacity-50' : 'hover:scale-105'}`}
                    >
                      🧱
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
          <p className="text-amber-200 text-sm">
            {gameOver
              ? '🧱 Kule yıkıldı! Oyun bitti!'
              : '🧱 Bir blok çekin! Kuleyi yıkan kaybeder!'}
          </p>
        </div>

        {gameOver && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {
                setTower(Array(18).fill(3));
                setCurrentPlayer(1);
                setGameOver(false);
              }}
              className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 px-8 py-3 rounded-xl font-black text-lg shadow-lg transition-all"
            >
              🔄 YENİDEN OYNA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JengaGame;
