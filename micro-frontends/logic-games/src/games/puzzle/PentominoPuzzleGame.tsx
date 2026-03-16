import React, { useState, useEffect } from 'react';

interface PentominoPuzzleGameProps {
  onBack: () => void;
}

type PentominoShape = number[][];

const PentominoPuzzleGame: React.FC<PentominoPuzzleGameProps> = ({ onBack }) => {
  const [board, setBoard] = useState<number[][]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [placedPieces, setPlacedPieces] = useState<Set<number>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // Pentomino shapes (12 pieces, each 5 squares)
  const pentominoes: { [key: number]: { shape: PentominoShape; color: string; name: string } } = {
    1: { shape: [[1, 1, 1, 1, 1]], color: 'bg-red-500', name: 'I' },
    2: {
      shape: [
        [1, 1],
        [1, 0],
        [1, 0],
        [1, 0],
      ],
      color: 'bg-blue-500',
      name: 'L',
    },
    3: {
      shape: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0],
      ],
      color: 'bg-green-500',
      name: 'V',
    },
    4: {
      shape: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      color: 'bg-yellow-500',
      name: 'T',
    },
    5: {
      shape: [
        [0, 1, 1],
        [1, 1, 0],
        [1, 0, 0],
      ],
      color: 'bg-purple-500',
      name: 'Z',
    },
    6: {
      shape: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
      color: 'bg-pink-500',
      name: 'W',
    },
    7: {
      shape: [
        [1, 1, 1],
        [1, 1, 0],
      ],
      color: 'bg-orange-500',
      name: 'P',
    },
    8: {
      shape: [
        [1, 1, 1],
        [1, 0, 1],
      ],
      color: 'bg-cyan-500',
      name: 'U',
    },
    9: {
      shape: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      color: 'bg-indigo-500',
      name: 'X',
    },
    10: {
      shape: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      color: 'bg-teal-500',
      name: 'N',
    },
    11: {
      shape: [
        [1, 1],
        [1, 1],
        [1, 0],
      ],
      color: 'bg-lime-500',
      name: 'F',
    },
    12: {
      shape: [
        [0, 1, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      color: 'bg-amber-500',
      name: 'Y',
    },
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  useEffect(() => {
    if (!isComplete) {
      const timer = setInterval(() => setTime((t) => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isComplete]);

  const initializeBoard = () => {
    // 10x6 board
    const newBoard = Array(6)
      .fill(0)
      .map(() => Array(10).fill(0));
    setBoard(newBoard);
    setPlacedPieces(new Set());
    setMistakes(0);
    setTime(0);
    setIsComplete(false);
    setSelectedPiece(null);
  };

  const canPlacePiece = (shape: PentominoShape, row: number, col: number): boolean => {
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          const newRow = row + i;
          const newCol = col + j;
          if (newRow >= 6 || newCol >= 10 || newRow < 0 || newCol < 0) return false;
          if (board[newRow][newCol] !== 0) return false;
        }
      }
    }
    return true;
  };

  const placePiece = (pieceId: number, row: number, col: number) => {
    if (!selectedPiece || selectedPiece !== pieceId) return;

    const shape = pentominoes[pieceId].shape;
    if (!canPlacePiece(shape, row, col)) {
      setMistakes((m) => m + 1);
      return;
    }

    const newBoard = board.map((r) => [...r]);
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          newBoard[row + i][col + j] = pieceId;
        }
      }
    }

    setBoard(newBoard);
    setPlacedPieces(new Set([...placedPieces, pieceId]));
    setSelectedPiece(null);

    // Check completion
    if (placedPieces.size + 1 === 12) {
      setIsComplete(true);
    }
  };

  const removePiece = (pieceId: number) => {
    const newBoard = board.map((row) => row.map((cell) => (cell === pieceId ? 0 : cell)));
    setBoard(newBoard);
    const newPlaced = new Set(placedPieces);
    newPlaced.delete(pieceId);
    setPlacedPieces(newPlaced);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-white/20"
          >
            ⬅ GERİ DÖN
          </button>
          <h1 className="text-3xl md:text-4xl font-black text-white">Pentomino Puzzle</h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-white/70 text-sm">Süre</div>
            <div className="text-2xl font-bold text-white">{formatTime(time)}</div>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-white/70 text-sm">Yerleştirilen</div>
            <div className="text-2xl font-bold text-white">{placedPieces.size}/12</div>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-white/70 text-sm">Hatalar</div>
            <div className="text-2xl font-bold text-white">{mistakes}</div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 rounded-xl p-4 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-white font-bold mb-2">📖 Nasıl Oynanır?</h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• 12 farklı pentomino parçasını tahtaya yerleştirin</li>
                  <li>• Her parça 5 kareden oluşur</li>
                  <li>• Bir parça seçin, sonra tahtaya tıklayarak yerleştirin</li>
                  <li>• Parçalar üst üste gelemez</li>
                  <li>• Tüm tahtayı doldurun!</li>
                </ul>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-white/70 hover:text-white ml-4"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="inline-block">
              {board.map((row, i) => (
                <div key={i} className="flex">
                  {row.map((cell, j) => (
                    <button
                      key={j}
                      onClick={() => selectedPiece && placePiece(selectedPiece, i, j)}
                      className={`w-10 h-10 md:w-12 md:h-12 border border-gray-600 transition-all ${
                        cell === 0 ? 'bg-white/20 hover:bg-white/30' : pentominoes[cell].color
                      }`}
                    >
                      {cell !== 0 && (
                        <span className="text-white font-bold text-xs">
                          {pentominoes[cell].name}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Pieces Panel */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-white font-bold mb-4">Parçalar</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(pentominoes).map(([id, piece]) => {
                const pieceId = parseInt(id);
                const isPlaced = placedPieces.has(pieceId);
                const isSelected = selectedPiece === pieceId;

                return (
                  <div key={id} className="relative">
                    <button
                      onClick={() => {
                        if (isPlaced) {
                          removePiece(pieceId);
                        } else {
                          setSelectedPiece(isSelected ? null : pieceId);
                        }
                      }}
                      className={`w-full p-3 rounded-xl transition-all border-2 ${
                        isPlaced
                          ? 'bg-gray-600/50 border-gray-500 opacity-50'
                          : isSelected
                            ? 'bg-yellow-500/30 border-yellow-400 scale-105'
                            : 'bg-white/10 border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <div className="text-white font-bold text-xs mb-1">{piece.name}</div>
                      <div className="flex justify-center">
                        <div className="inline-block">
                          {piece.shape.map((row, i) => (
                            <div key={i} className="flex">
                              {row.map((cell, j) => (
                                <div
                                  key={j}
                                  className={`w-3 h-3 border border-gray-700 ${
                                    cell === 1 ? piece.color : 'bg-transparent'
                                  }`}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </button>
                    {isPlaced && <div className="absolute top-1 right-1 text-green-400">✓</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={initializeBoard}
          className="w-full mt-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-xl text-white font-bold text-lg transition-all shadow-lg"
        >
          🔄 Yeniden Başlat
        </button>

        {/* Completion Modal */}
        {isComplete && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-black text-white mb-4">Harika!</h2>
              <p className="text-white/90 mb-6">
                Pentomino Puzzle'ı {formatTime(time)} sürede, {mistakes} hata ile tamamladınız!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={initializeBoard}
                  className="flex-1 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all"
                >
                  Yeni Oyun
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all"
                >
                  Menüye Dön
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PentominoPuzzleGame;
