import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

type Stone = 'black' | 'white' | null;
type Player = 'black' | 'white';

const GoGame: React.FC<Props> = ({ onExit }) => {
  const BOARD_SIZE = 9; // 9x9 board for simplicity
  const [board, setBoard] = useState<Stone[][]>(
    Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>('black');
  const [capturedBlack, setCapturedBlack] = useState(0);
  const [capturedWhite, setCapturedWhite] = useState(0);
  const [passed, setPassed] = useState(false);

  const placeStone = (row: number, col: number) => {
    if (board[row][col] !== null) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;

    // Simple capture logic (remove stones with no liberties)
    const captured = removeCaptures(newBoard, currentPlayer === 'black' ? 'white' : 'black');

    if (currentPlayer === 'black') {
      setCapturedWhite(capturedWhite + captured);
    } else {
      setCapturedBlack(capturedBlack + captured);
    }

    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
    setPassed(false);
  };

  const removeCaptures = (board: Stone[][], opponent: Player): number => {
    let captured = 0;
    const visited = Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(false));

    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (board[r][c] === opponent && !visited[r][c]) {
          const group: [number, number][] = [];
          const hasLiberty = checkLiberties(board, r, c, opponent, visited, group);

          if (!hasLiberty) {
            group.forEach(([gr, gc]) => {
              board[gr][gc] = null;
              captured++;
            });
          }
        }
      }
    }
    return captured;
  };

  const checkLiberties = (
    board: Stone[][],
    row: number,
    col: number,
    color: Player,
    visited: boolean[][],
    group: [number, number][]
  ): boolean => {
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) return false;
    if (visited[row][col]) return false;
    if (board[row][col] === null) return true;
    if (board[row][col] !== color) return false;

    visited[row][col] = true;
    group.push([row, col]);

    return (
      checkLiberties(board, row - 1, col, color, visited, group) ||
      checkLiberties(board, row + 1, col, color, visited, group) ||
      checkLiberties(board, row, col - 1, color, visited, group) ||
      checkLiberties(board, row, col + 1, color, visited, group)
    );
  };

  const pass = () => {
    if (passed) {
      // Both players passed, game over
      alert('Oyun bitti! Taşları sayın.');
    } else {
      setPassed(true);
      setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900 text-white p-4">
      <div className="w-full max-w-3xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-slate-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-gray-400">
            ⚫ GO (바둑)
          </h2>
          <div className="text-sm font-bold bg-slate-500/20 px-4 py-2 rounded-xl border border-slate-500/30">
            {currentPlayer === 'black' ? '⚫ Siyah' : '⚪ Beyaz'}
          </div>
        </div>

        {/* Score */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-2xl">⚫</div>
            <div className="text-sm">Yakalanan: {capturedWhite}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl">⚪</div>
            <div className="text-sm">Yakalanan: {capturedBlack}</div>
          </div>
        </div>

        {/* Board */}
        <div className="bg-amber-700 p-4 rounded-2xl border-4 border-amber-900 mb-4">
          <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}>
            {board.map((row, r) =>
              row.map((cell, c) => (
                <button
                  key={`${r}-${c}`}
                  onClick={() => placeStone(r, c)}
                  className="w-8 h-8 md:w-10 md:h-10 border border-amber-900/50 hover:bg-amber-600/30 transition-all flex items-center justify-center relative"
                >
                  {cell === 'black' && (
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black border-2 border-gray-700 shadow-lg"></div>
                  )}
                  {cell === 'white' && (
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-2 border-gray-300 shadow-lg"></div>
                  )}
                  {/* Star points */}
                  {((r === 2 && c === 2) ||
                    (r === 2 && c === 6) ||
                    (r === 6 && c === 2) ||
                    (r === 6 && c === 6) ||
                    (r === 4 && c === 4)) &&
                    cell === null && <div className="w-2 h-2 rounded-full bg-amber-900"></div>}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center">
          <button
            onClick={pass}
            className="bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700 px-8 py-3 rounded-xl font-black text-lg shadow-lg transition-all"
          >
            PAS
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-4 bg-slate-500/10 border border-slate-500/30 rounded-xl p-4 text-center">
          <p className="text-slate-200 text-sm">
            ⚫⚪ Tahtaya taş yerleştirin. Özgürlüğü olmayan taşlar yakalanır!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoGame;
