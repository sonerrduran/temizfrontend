import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

type Stone = 'black' | 'white' | null;
type Player = 'black' | 'white';

const GomokuGame: React.FC<Props> = ({ onExit }) => {
  const BOARD_SIZE = 15;
  const [board, setBoard] = useState<Stone[][]>(
    Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>('black');
  const [winner, setWinner] = useState<Player | null>(null);

  const checkWin = (row: number, col: number, player: Player): boolean => {
    const directions = [
      [0, 1], // horizontal
      [1, 0], // vertical
      [1, 1], // diagonal \
      [1, -1], // diagonal /
    ];

    for (const [dr, dc] of directions) {
      let count = 1;

      // Check positive direction
      let r = row + dr;
      let c = col + dc;
      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === player) {
        count++;
        r += dr;
        c += dc;
      }

      // Check negative direction
      r = row - dr;
      c = col - dc;
      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === player) {
        count++;
        r -= dr;
        c -= dc;
      }

      if (count >= 5) return true;
    }
    return false;
  };

  const placeStone = (row: number, col: number) => {
    if (board[row][col] !== null || winner) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(row, col, currentPlayer)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
    }
  };

  const resetGame = () => {
    setBoard(
      Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(null))
    );
    setCurrentPlayer('black');
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-fuchsia-900 text-white p-4">
      <div className="w-full max-w-3xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-purple-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500">
            ⚪ GOMOKU (五目並べ)
          </h2>
          <div className="text-sm font-bold bg-purple-500/20 px-4 py-2 rounded-xl border border-purple-500/30">
            {winner
              ? `${winner === 'black' ? '⚫' : '⚪'} Kazandı!`
              : currentPlayer === 'black'
                ? '⚫ Siyah'
                : '⚪ Beyaz'}
          </div>
        </div>

        {/* Board */}
        <div className="bg-amber-700 p-4 rounded-2xl border-4 border-amber-900 mb-4 overflow-auto">
          <div
            className="grid gap-0"
            style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`, minWidth: '600px' }}
          >
            {board.map((row, r) =>
              row.map((cell, c) => (
                <button
                  key={`${r}-${c}`}
                  onClick={() => placeStone(r, c)}
                  disabled={winner !== null}
                  className="w-10 h-10 border border-amber-900/50 hover:bg-amber-600/30 transition-all flex items-center justify-center relative disabled:cursor-not-allowed"
                >
                  {cell === 'black' && (
                    <div className="w-8 h-8 rounded-full bg-black border-2 border-gray-700 shadow-lg"></div>
                  )}
                  {cell === 'white' && (
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 shadow-lg"></div>
                  )}
                  {/* Star points */}
                  {((r === 3 && c === 3) ||
                    (r === 3 && c === 11) ||
                    (r === 11 && c === 3) ||
                    (r === 11 && c === 11) ||
                    (r === 7 && c === 7)) &&
                    cell === null && <div className="w-2 h-2 rounded-full bg-amber-900"></div>}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
          <p className="text-purple-200 text-sm">
            ⚫⚪ Beş taşınızı yan yana, dikey veya çapraz dizin!
          </p>
        </div>

        {winner && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 px-8 py-3 rounded-xl font-black text-lg shadow-lg transition-all"
            >
              🔄 YENİDEN OYNA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GomokuGame;
