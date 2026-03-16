import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

type Stone = 'black' | 'white' | null;
type Player = 'black' | 'white';

const PenteGame: React.FC<Props> = ({ onExit }) => {
  const BOARD_SIZE = 13;
  const [board, setBoard] = useState<Stone[][]>(
    Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>('black');
  const [captures, setCaptures] = useState({ black: 0, white: 0 });
  const [winner, setWinner] = useState<Player | null>(null);

  const checkWin = (row: number, col: number, player: Player): boolean => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];
    for (const [dr, dc] of directions) {
      let count = 1;
      let r = row + dr,
        c = col + dc;
      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === player) {
        count++;
        r += dr;
        c += dc;
      }
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

  const checkCaptures = (newBoard: Stone[][], row: number, col: number, player: Player): number => {
    const opponent = player === 'black' ? 'white' : 'black';
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
      [0, -1],
      [-1, 0],
      [-1, -1],
      [-1, 1],
    ];
    let captured = 0;

    for (const [dr, dc] of directions) {
      const r1 = row + dr,
        c1 = col + dc;
      const r2 = row + 2 * dr,
        c2 = col + 2 * dc;
      const r3 = row + 3 * dr,
        c3 = col + 3 * dc;

      if (r3 >= 0 && r3 < BOARD_SIZE && c3 >= 0 && c3 < BOARD_SIZE) {
        if (
          newBoard[r1]?.[c1] === opponent &&
          newBoard[r2]?.[c2] === opponent &&
          newBoard[r3]?.[c3] === player
        ) {
          newBoard[r1][c1] = null;
          newBoard[r2][c2] = null;
          captured += 2;
        }
      }
    }
    return captured;
  };

  const placeStone = (row: number, col: number) => {
    if (board[row][col] !== null || winner) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;

    const captured = checkCaptures(newBoard, row, col, currentPlayer);
    const newCaptures = { ...captures };
    newCaptures[currentPlayer] += captured;
    setCaptures(newCaptures);
    setBoard(newBoard);

    if (checkWin(row, col, currentPlayer) || newCaptures[currentPlayer] >= 10) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 text-white p-4">
      <div className="w-full max-w-3xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-indigo-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">
            ⚫ PENTE
          </h2>
          <div className="text-sm font-bold bg-indigo-500/20 px-4 py-2 rounded-xl border border-indigo-500/30">
            {winner
              ? `${winner === 'black' ? '⚫' : '⚪'} Kazandı!`
              : currentPlayer === 'black'
                ? '⚫ Siyah'
                : '⚪ Beyaz'}
          </div>
        </div>

        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center bg-black/30 px-4 py-2 rounded-xl">
            <div className="text-2xl">⚫</div>
            <div className="text-sm">Yakalanan: {captures.black}</div>
          </div>
          <div className="text-center bg-white/10 px-4 py-2 rounded-xl">
            <div className="text-2xl">⚪</div>
            <div className="text-sm">Yakalanan: {captures.white}</div>
          </div>
        </div>

        <div className="bg-amber-700 p-4 rounded-2xl border-4 border-amber-900 mb-4">
          <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}>
            {board.map((row, r) =>
              row.map((cell, c) => (
                <button
                  key={`${r}-${c}`}
                  onClick={() => placeStone(r, c)}
                  disabled={winner !== null}
                  className="w-8 h-8 md:w-10 md:h-10 border border-amber-900/50 hover:bg-amber-600/30 transition-all flex items-center justify-center"
                >
                  {cell === 'black' && (
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black border-2 border-gray-700 shadow-lg"></div>
                  )}
                  {cell === 'white' && (
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-2 border-gray-300 shadow-lg"></div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 text-center">
          <p className="text-indigo-200 text-sm">
            ⚫⚪ Beş taş yan yana dizin veya 10 taş yakalayın!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PenteGame;
