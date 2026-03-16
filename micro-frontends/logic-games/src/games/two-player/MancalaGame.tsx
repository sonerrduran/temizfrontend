import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

type Player = 1 | 2;

const MancalaGame: React.FC<Props> = ({ onExit }) => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [winner, setWinner] = useState<Player | null>(null);

  // Board: [player1Store, player1Pits(6), player2Pits(6), player2Store]
  const initBoard = (): number[] => {
    return [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0];
  };

  const [board, setBoard] = useState<number[]>(initBoard());

  const makeMove = (pitIndex: number) => {
    if (winner) return;

    // Validate move
    if (currentPlayer === 1 && (pitIndex < 1 || pitIndex > 6)) return;
    if (currentPlayer === 2 && (pitIndex < 7 || pitIndex > 12)) return;
    if (board[pitIndex] === 0) return;

    const newBoard = [...board];
    let stones = newBoard[pitIndex];
    newBoard[pitIndex] = 0;
    let currentIndex = pitIndex;

    // Distribute stones
    while (stones > 0) {
      currentIndex = (currentIndex + 1) % 14;

      // Skip opponent's store
      if (
        (currentPlayer === 1 && currentIndex === 13) ||
        (currentPlayer === 2 && currentIndex === 0)
      ) {
        continue;
      }

      newBoard[currentIndex]++;
      stones--;
    }

    // Check for capture
    const lastPit = currentIndex;
    if (newBoard[lastPit] === 1) {
      if (currentPlayer === 1 && lastPit >= 1 && lastPit <= 6) {
        const oppositePit = 14 - lastPit;
        if (newBoard[oppositePit] > 0) {
          newBoard[0] += newBoard[oppositePit] + 1;
          newBoard[oppositePit] = 0;
          newBoard[lastPit] = 0;
        }
      } else if (currentPlayer === 2 && lastPit >= 7 && lastPit <= 12) {
        const oppositePit = 14 - lastPit;
        if (newBoard[oppositePit] > 0) {
          newBoard[13] += newBoard[oppositePit] + 1;
          newBoard[oppositePit] = 0;
          newBoard[lastPit] = 0;
        }
      }
    }

    setBoard(newBoard);

    // Check if game is over
    const p1Empty = newBoard.slice(1, 7).every((v) => v === 0);
    const p2Empty = newBoard.slice(7, 13).every((v) => v === 0);

    if (p1Empty || p2Empty) {
      // Collect remaining stones
      const p1Remaining = newBoard.slice(1, 7).reduce((a, b) => a + b, 0);
      const p2Remaining = newBoard.slice(7, 13).reduce((a, b) => a + b, 0);
      newBoard[0] += p1Remaining;
      newBoard[13] += p2Remaining;
      for (let i = 1; i <= 12; i++) newBoard[i] = 0;

      setWinner(newBoard[0] > newBoard[13] ? 1 : 2);
    } else if ((currentPlayer === 1 && lastPit !== 0) || (currentPlayer === 2 && lastPit !== 13)) {
      // Switch player if didn't land in own store
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  const resetGame = () => {
    setBoard(initBoard());
    setCurrentPlayer(1);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 text-white p-4">
      <div className="w-full max-w-4xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-emerald-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
            🪨 MANGALA
          </h2>
          <div className="text-sm font-bold bg-emerald-500/20 px-4 py-2 rounded-xl border border-emerald-500/30">
            {winner ? `Kazanan: Oyuncu ${winner}` : `Oyuncu ${currentPlayer}`}
          </div>
        </div>

        {/* Board */}
        <div className="bg-amber-800/50 p-6 rounded-3xl border-4 border-amber-700">
          {/* Player 2 Store */}
          <div className="flex gap-4 mb-4">
            <div className="w-24 h-full bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl p-4 flex flex-col items-center justify-center border-4 border-red-800 shadow-xl">
              <div className="text-4xl font-black">{board[13]}</div>
              <div className="text-xs mt-1">Oyuncu 2</div>
            </div>

            {/* Player 2 Pits */}
            <div className="flex-1 grid grid-cols-6 gap-2">
              {board
                .slice(7, 13)
                .reverse()
                .map((stones, idx) => {
                  const realIdx = 12 - idx;
                  return (
                    <button
                      key={realIdx}
                      onClick={() => makeMove(realIdx)}
                      disabled={currentPlayer !== 2 || stones === 0 || winner !== null}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center text-2xl font-black transition-all border-4 ${
                        currentPlayer === 2 && stones > 0 && !winner
                          ? 'bg-gradient-to-br from-red-500 to-rose-600 border-red-700 hover:scale-105 cursor-pointer'
                          : 'bg-red-900/50 border-red-800/50 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div>{stones}</div>
                      <div className="text-xs">🪨</div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Player 1 Pits */}
          <div className="flex gap-4">
            <div className="flex-1 grid grid-cols-6 gap-2">
              {board.slice(1, 7).map((stones, idx) => {
                const realIdx = idx + 1;
                return (
                  <button
                    key={realIdx}
                    onClick={() => makeMove(realIdx)}
                    disabled={currentPlayer !== 1 || stones === 0 || winner !== null}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center text-2xl font-black transition-all border-4 ${
                      currentPlayer === 1 && stones > 0 && !winner
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-600 border-blue-700 hover:scale-105 cursor-pointer'
                        : 'bg-blue-900/50 border-blue-800/50 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div>{stones}</div>
                    <div className="text-xs">🪨</div>
                  </button>
                );
              })}
            </div>

            {/* Player 1 Store */}
            <div className="w-24 h-full bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl p-4 flex flex-col items-center justify-center border-4 border-blue-800 shadow-xl">
              <div className="text-4xl font-black">{board[0]}</div>
              <div className="text-xs mt-1">Oyuncu 1</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
          <p className="text-emerald-200 text-sm">
            🪨 Kendi tarafınızdaki bir çukuru seçin ve taşları saat yönünde dağıtın!
          </p>
        </div>

        {winner && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-3 rounded-xl font-black text-lg shadow-lg transition-all"
            >
              🔄 YENİDEN OYNA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MancalaGame;
