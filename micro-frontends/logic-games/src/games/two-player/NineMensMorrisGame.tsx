import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

type Player = 1 | 2;
type Position = number | null;

const NineMensMorrisGame: React.FC<Props> = ({ onExit }) => {
  const [board, setBoard] = useState<Position[]>(Array(24).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [phase, setPhase] = useState<'placing' | 'moving' | 'flying'>('placing');
  const [piecesLeft, setPiecesLeft] = useState({ 1: 9, 2: 9 });
  const [piecesOnBoard, setPiecesOnBoard] = useState({ 1: 0, 2: 0 });
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [winner, setWinner] = useState<Player | null>(null);

  // Mill patterns (three in a row)
  const mills = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
    [12, 13, 14],
    [15, 16, 17],
    [18, 19, 20],
    [21, 22, 23],
    [0, 9, 21],
    [3, 10, 18],
    [6, 11, 15],
    [1, 4, 7],
    [16, 19, 22],
    [8, 12, 17],
    [5, 13, 20],
    [2, 14, 23],
  ];

  const adjacentPositions: { [key: number]: number[] } = {
    0: [1, 9],
    1: [0, 2, 4],
    2: [1, 14],
    3: [4, 10],
    4: [1, 3, 5, 7],
    5: [4, 13],
    6: [7, 11],
    7: [4, 6, 8],
    8: [7, 12],
    9: [0, 10, 21],
    10: [3, 9, 11, 18],
    11: [6, 10, 15],
    12: [8, 13, 17],
    13: [5, 12, 14, 20],
    14: [2, 13, 23],
    15: [11, 16],
    16: [15, 17, 19],
    17: [12, 16],
    18: [10, 19],
    19: [16, 18, 20, 22],
    20: [13, 19],
    21: [9, 22],
    22: [19, 21, 23],
    23: [14, 22],
  };

  const checkMill = (pos: number, player: Player): boolean => {
    return mills.some((mill) => mill.includes(pos) && mill.every((p) => board[p] === player));
  };

  const placePiece = (pos: number) => {
    if (board[pos] !== null || phase !== 'placing' || winner) return;

    const newBoard = [...board];
    newBoard[pos] = currentPlayer;
    setBoard(newBoard);

    const newPiecesLeft = { ...piecesLeft };
    newPiecesLeft[currentPlayer]--;
    setPiecesLeft(newPiecesLeft);

    const newPiecesOnBoard = { ...piecesOnBoard };
    newPiecesOnBoard[currentPlayer]++;
    setPiecesOnBoard(newPiecesOnBoard);

    if (checkMill(pos, currentPlayer)) {
      // Remove opponent piece (simplified - just switch turn for now)
    }

    if (newPiecesLeft[1] === 0 && newPiecesLeft[2] === 0) {
      setPhase('moving');
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const movePiece = (to: number) => {
    if (selectedPiece === null || board[to] !== null || winner) return;

    const canMove = phase === 'flying' || adjacentPositions[selectedPiece]?.includes(to);
    if (!canMove) return;

    const newBoard = [...board];
    newBoard[to] = currentPlayer;
    newBoard[selectedPiece] = null;
    setBoard(newBoard);
    setSelectedPiece(null);

    if (checkMill(to, currentPlayer)) {
      // Remove opponent piece
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const handleClick = (pos: number) => {
    if (phase === 'placing') {
      placePiece(pos);
    } else {
      if (board[pos] === currentPlayer) {
        setSelectedPiece(pos);
      } else if (selectedPiece !== null) {
        movePiece(pos);
      }
    }
  };

  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
    [12, 13, 14],
    [15, 16, 17],
    [18, 19, 20],
    [21, 22, 23],
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white p-4">
      <div className="w-full max-w-3xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-green-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
            ⭕ NINE MEN'S MORRIS
          </h2>
          <div className="text-sm font-bold bg-green-500/20 px-4 py-2 rounded-xl border border-green-500/30">
            Oyuncu {currentPlayer}
          </div>
        </div>

        {/* Info */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-2xl">🔵</div>
            <div className="text-sm">Kalan: {piecesLeft[1]}</div>
            <div className="text-sm">Tahtada: {piecesOnBoard[1]}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl">🔴</div>
            <div className="text-sm">Kalan: {piecesLeft[2]}</div>
            <div className="text-sm">Tahtada: {piecesOnBoard[2]}</div>
          </div>
        </div>

        {/* Board */}
        <div className="bg-amber-800/50 p-8 rounded-2xl border-4 border-amber-900 mb-4 relative">
          <svg viewBox="0 0 300 300" className="w-full h-full">
            {/* Lines */}
            <rect x="0" y="0" width="300" height="300" fill="none" stroke="white" strokeWidth="2" />
            <rect
              x="50"
              y="50"
              width="200"
              height="200"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <rect
              x="100"
              y="100"
              width="100"
              height="100"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <line x1="150" y1="0" x2="150" y2="100" stroke="white" strokeWidth="2" />
            <line x1="150" y1="200" x2="150" y2="300" stroke="white" strokeWidth="2" />
            <line x1="0" y1="150" x2="100" y2="150" stroke="white" strokeWidth="2" />
            <line x1="200" y1="150" x2="300" y2="150" stroke="white" strokeWidth="2" />

            {/* Positions */}
            {[
              [0, 0],
              [150, 0],
              [300, 0],
              [50, 50],
              [150, 50],
              [250, 50],
              [100, 100],
              [150, 100],
              [200, 100],
              [0, 150],
              [50, 150],
              [100, 150],
              [200, 150],
              [250, 150],
              [300, 150],
              [100, 200],
              [150, 200],
              [200, 200],
              [50, 250],
              [150, 250],
              [250, 250],
              [0, 300],
              [150, 300],
              [300, 300],
            ].map((pos, idx) => (
              <g key={idx} onClick={() => handleClick(idx)} className="cursor-pointer">
                <circle
                  cx={pos[0]}
                  cy={pos[1]}
                  r="15"
                  fill={board[idx] === 1 ? '#3b82f6' : board[idx] === 2 ? '#ef4444' : '#ffffff'}
                  stroke={selectedPiece === idx ? '#fbbf24' : '#000000'}
                  strokeWidth={selectedPiece === idx ? '4' : '2'}
                  className="hover:opacity-80 transition-all"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Instructions */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
          <p className="text-green-200 text-sm">
            {phase === 'placing'
              ? '⭕ Taşlarınızı yerleştirin! Üç taş yan yana getirin!'
              : '⭕ Taşlarınızı hareket ettirin! Üç taş yan yana getirin!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NineMensMorrisGame;
