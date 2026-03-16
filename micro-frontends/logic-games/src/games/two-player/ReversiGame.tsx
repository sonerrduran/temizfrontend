import React, { useState, useEffect } from 'react';

interface Props {
  onExit: () => void;
}

type Disc = 'black' | 'white' | null;
type Player = 'black' | 'white';

const ReversiGame: React.FC<Props> = ({ onExit }) => {
  const BOARD_SIZE = 8;

  const initBoard = (): Disc[][] => {
    const board = Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null));
    board[3][3] = 'white';
    board[3][4] = 'black';
    board[4][3] = 'black';
    board[4][4] = 'white';
    return board;
  };

  const [board, setBoard] = useState<Disc[][]>(initBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('black');
  const [validMoves, setValidMoves] = useState<boolean[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({ black: 2, white: 2 });

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const isValidMove = (board: Disc[][], row: number, col: number, player: Player): boolean => {
    if (board[row][col] !== null) return false;

    const opponent = player === 'black' ? 'white' : 'black';

    for (const [dr, dc] of directions) {
      let r = row + dr;
      let c = col + dc;
      let hasOpponent = false;

      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
        if (board[r][c] === opponent) {
          hasOpponent = true;
        } else if (board[r][c] === player && hasOpponent) {
          return true;
        } else {
          break;
        }
        r += dr;
        c += dc;
      }
    }
    return false;
  };

  const getValidMoves = (board: Disc[][], player: Player): boolean[][] => {
    const moves = Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(false));
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (isValidMove(board, r, c, player)) {
          moves[r][c] = true;
        }
      }
    }
    return moves;
  };

  const makeMove = (row: number, col: number) => {
    if (!validMoves[row][col] || gameOver) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;
    const opponent = currentPlayer === 'black' ? 'white' : 'black';

    // Flip discs
    for (const [dr, dc] of directions) {
      const toFlip: [number, number][] = [];
      let r = row + dr;
      let c = col + dc;

      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
        if (newBoard[r][c] === opponent) {
          toFlip.push([r, c]);
        } else if (newBoard[r][c] === currentPlayer) {
          toFlip.forEach(([fr, fc]) => {
            newBoard[fr][fc] = currentPlayer;
          });
          break;
        } else {
          break;
        }
        r += dr;
        c += dc;
      }
    }

    setBoard(newBoard);

    // Calculate scores
    let blackCount = 0,
      whiteCount = 0;
    newBoard.forEach((row) => {
      row.forEach((cell) => {
        if (cell === 'black') blackCount++;
        if (cell === 'white') whiteCount++;
      });
    });
    setScores({ black: blackCount, white: whiteCount });

    // Switch player
    const nextPlayer = opponent;
    const nextMoves = getValidMoves(newBoard, nextPlayer);
    const hasValidMoves = nextMoves.some((row) => row.some((cell) => cell));

    if (!hasValidMoves) {
      // Check if current player can move
      const currentMoves = getValidMoves(newBoard, currentPlayer);
      const currentHasValidMoves = currentMoves.some((row) => row.some((cell) => cell));

      if (!currentHasValidMoves) {
        setGameOver(true);
      } else {
        setValidMoves(currentMoves);
      }
    } else {
      setCurrentPlayer(nextPlayer);
      setValidMoves(nextMoves);
    }
  };

  useEffect(() => {
    setValidMoves(getValidMoves(board, currentPlayer));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 text-white p-4">
      <div className="w-full max-w-2xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-indigo-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            ⚪ REVERSI / OTHELLO
          </h2>
          <div className="text-sm font-bold bg-indigo-500/20 px-4 py-2 rounded-xl border border-indigo-500/30">
            {gameOver ? 'Oyun Bitti!' : currentPlayer === 'black' ? '⚫ Siyah' : '⚪ Beyaz'}
          </div>
        </div>

        {/* Score */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center bg-black/30 px-6 py-3 rounded-xl border border-white/10">
            <div className="text-3xl">⚫</div>
            <div className="text-2xl font-black">{scores.black}</div>
          </div>
          <div className="text-center bg-white/10 px-6 py-3 rounded-xl border border-white/20">
            <div className="text-3xl">⚪</div>
            <div className="text-2xl font-black">{scores.white}</div>
          </div>
        </div>

        {/* Board */}
        <div className="bg-emerald-700 p-2 rounded-2xl border-4 border-emerald-900 mb-4">
          <div className="grid grid-cols-8 gap-1">
            {board.map((row, r) =>
              row.map((cell, c) => (
                <button
                  key={`${r}-${c}`}
                  onClick={() => makeMove(r, c)}
                  disabled={!validMoves[r][c] || gameOver}
                  className={`aspect-square rounded-lg flex items-center justify-center transition-all ${
                    validMoves[r][c] && !gameOver
                      ? 'bg-emerald-600 hover:bg-emerald-500 cursor-pointer border-2 border-yellow-400'
                      : 'bg-emerald-800 cursor-not-allowed'
                  }`}
                >
                  {cell === 'black' && (
                    <div className="w-10 h-10 rounded-full bg-black border-2 border-gray-700 shadow-lg"></div>
                  )}
                  {cell === 'white' && (
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 shadow-lg"></div>
                  )}
                  {validMoves[r][c] && !gameOver && cell === null && (
                    <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Game Over */}
        {gameOver && (
          <div className="bg-indigo-500/20 border border-indigo-500/50 rounded-xl p-4 text-center">
            <h3 className="text-2xl font-black mb-2">
              {scores.black > scores.white
                ? '⚫ Siyah Kazandı!'
                : scores.white > scores.black
                  ? '⚪ Beyaz Kazandı!'
                  : '🤝 Berabere!'}
            </h3>
            <p className="text-sm text-indigo-200">
              Siyah: {scores.black} - Beyaz: {scores.white}
            </p>
          </div>
        )}

        {/* Instructions */}
        {!gameOver && (
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 text-center">
            <p className="text-indigo-200 text-sm">
              ⚫⚪ Rakip taşları çevirin! En çok taşa sahip olan kazanır!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReversiGame;
