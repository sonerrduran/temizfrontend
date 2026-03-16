import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

const KalahGame: React.FC<Props> = ({ onExit }) => {
  const initBoard = (): number[] => [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0];
  const [board, setBoard] = useState<number[]>(initBoard());
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [winner, setWinner] = useState<1 | 2 | null>(null);

  const makeMove = (pitIndex: number) => {
    if (
      winner ||
      (currentPlayer === 1 && (pitIndex < 1 || pitIndex > 6)) ||
      (currentPlayer === 2 && (pitIndex < 7 || pitIndex > 12)) ||
      board[pitIndex] === 0
    )
      return;

    const newBoard = [...board];
    let stones = newBoard[pitIndex];
    newBoard[pitIndex] = 0;
    let idx = pitIndex;

    while (stones > 0) {
      idx = (idx + 1) % 14;
      if ((currentPlayer === 1 && idx === 13) || (currentPlayer === 2 && idx === 0)) continue;
      newBoard[idx]++;
      stones--;
    }

    const p1Empty = newBoard.slice(1, 7).every((v) => v === 0);
    const p2Empty = newBoard.slice(7, 13).every((v) => v === 0);

    if (p1Empty || p2Empty) {
      newBoard[0] += newBoard.slice(1, 7).reduce((a, b) => a + b, 0);
      newBoard[13] += newBoard.slice(7, 13).reduce((a, b) => a + b, 0);
      for (let i = 1; i <= 12; i++) newBoard[i] = 0;
      setWinner(newBoard[0] > newBoard[13] ? 1 : 2);
    } else if ((currentPlayer === 1 && idx !== 0) || (currentPlayer === 2 && idx !== 13)) {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }

    setBoard(newBoard);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-lime-900 via-green-900 to-emerald-900 text-white p-4">
      <div className="w-full max-w-4xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-lime-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500">
            🌰 KALAH
          </h2>
          <div className="text-sm font-bold bg-lime-500/20 px-4 py-2 rounded-xl border border-lime-500/30">
            {winner ? `Kazanan: Oyuncu ${winner}` : `Oyuncu ${currentPlayer}`}
          </div>
        </div>

        <div className="bg-amber-800/50 p-6 rounded-3xl border-4 border-amber-700">
          <div className="flex gap-4 mb-4">
            <div className="w-24 bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl p-4 flex flex-col items-center justify-center border-4 border-red-800">
              <div className="text-4xl font-black">{board[13]}</div>
              <div className="text-xs mt-1">P2</div>
            </div>
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
                          : 'bg-red-900/50 border-red-800/50 opacity-50'
                      }`}
                    >
                      <div>{stones}</div>
                      <div className="text-xs">🌰</div>
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 grid grid-cols-6 gap-2">
              {board.slice(1, 7).map((stones, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => makeMove(idx + 1)}
                  disabled={currentPlayer !== 1 || stones === 0 || winner !== null}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-2xl font-black transition-all border-4 ${
                    currentPlayer === 1 && stones > 0 && !winner
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-600 border-blue-700 hover:scale-105 cursor-pointer'
                      : 'bg-blue-900/50 border-blue-800/50 opacity-50'
                  }`}
                >
                  <div>{stones}</div>
                  <div className="text-xs">🌰</div>
                </button>
              ))}
            </div>
            <div className="w-24 bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl p-4 flex flex-col items-center justify-center border-4 border-blue-800">
              <div className="text-4xl font-black">{board[0]}</div>
              <div className="text-xs mt-1">P1</div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-lime-500/10 border border-lime-500/30 rounded-xl p-4 text-center">
          <p className="text-lime-200 text-sm">🌰 Çukurlardan taş alın ve saat yönünde dağıtın!</p>
        </div>
      </div>
    </div>
  );
};

export default KalahGame;
