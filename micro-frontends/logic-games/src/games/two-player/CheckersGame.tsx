import React, { useState, useEffect } from 'react';
import { Crown, RotateCcw, Trophy, Swords, Target, Star, Zap } from 'lucide-react';

interface Props {
  onExit: () => void;
}

type Player = 1 | 2;

interface Piece {
  player: Player;
  isKing: boolean;
}

interface Move {
  r: number;
  c: number;
  isJump: boolean;
  jumpedPiece?: { r: number; c: number };
}

const ROWS = 8;
const COLS = 8;

const CheckersGame: React.FC<Props> = ({ onExit }) => {
  const [board, setBoard] = useState<(Piece | null)[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [selectedPiece, setSelectedPiece] = useState<{ r: number; c: number } | null>(null);
  const [validMoves, setValidMoves] = useState<Move[]>([]);
  const [scores, setScores] = useState({ 1: 12, 2: 12 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [captureCount, setCaptureCount] = useState({ 1: 0, 2: 0 });
  const [lastCapture, setLastCapture] = useState<{
    player: Player;
    position: { r: number; c: number };
  } | null>(null);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const initialBoard: (Piece | null)[][] = Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(null));

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if ((r + c) % 2 === 1) {
          if (r < 3) initialBoard[r][c] = { player: 1, isKing: false };
          else if (r > 4) initialBoard[r][c] = { player: 2, isKing: false };
        }
      }
    }

    setBoard(initialBoard);
    setCurrentPlayer(1);
    setSelectedPiece(null);
    setValidMoves([]);
    setScores({ 1: 12, 2: 12 });
    setGameOver(false);
    setWinner(null);
    setMoveCount(0);
    setCaptureCount({ 1: 0, 2: 0 });
    setLastCapture(null);
  };

  const getValidMoves = (
    r: number,
    c: number,
    currentBoard: (Piece | null)[][],
    assumePlayer?: Player
  ): Move[] => {
    const piece = currentBoard[r][c];
    if (!piece) return [];

    const player = assumePlayer || piece.player;
    const isKing = piece.isKing;
    const moves: Move[] = [];

    const dirs = [];
    if (player === 1 || isKing) dirs.push([1, -1], [1, 1]);
    if (player === 2 || isKing) dirs.push([-1, -1], [-1, 1]);

    for (const [dr, dc] of dirs) {
      const nr = r + dr,
        nc = c + dc;
      if (isValid(nr, nc) && currentBoard[nr][nc] === null) {
        moves.push({ r: nr, c: nc, isJump: false });
      }
    }

    for (const [dr, dc] of dirs) {
      const nr = r + dr,
        nc = c + dc;
      const jr = r + 2 * dr,
        jc = c + 2 * dc;

      if (isValid(nr, nc) && isValid(jr, jc)) {
        const neighbor = currentBoard[nr][nc];
        const landing = currentBoard[jr][jc];
        if (neighbor && neighbor.player !== player && landing === null) {
          moves.push({ r: jr, c: jc, isJump: true, jumpedPiece: { r: nr, c: nc } });
        }
      }
    }

    return moves;
  };

  const isValid = (r: number, c: number) => r >= 0 && r < ROWS && c >= 0 && c < COLS;

  const handleSquareClick = (r: number, c: number) => {
    if (gameOver) return;

    const move = validMoves.find((m) => m.r === r && m.c === c);

    if (move && selectedPiece) {
      executeMove(selectedPiece.r, selectedPiece.c, move);
    } else {
      if (board[r][c]?.player === currentPlayer) {
        setSelectedPiece({ r, c });
        setValidMoves(getValidMoves(r, c, board));
      } else {
        setSelectedPiece(null);
        setValidMoves([]);
      }
    }
  };

  const executeMove = (fromR: number, fromC: number, move: Move) => {
    const newBoard = [...board.map((row) => [...row])];
    const piece = newBoard[fromR][fromC]!;

    newBoard[move.r][move.c] = piece;
    newBoard[fromR][fromC] = null;

    let captured = false;

    if (move.isJump && move.jumpedPiece) {
      newBoard[move.jumpedPiece.r][move.jumpedPiece.c] = null;
      setScores((prev) => ({
        ...prev,
        [currentPlayer === 1 ? 2 : 1]: prev[currentPlayer === 1 ? 2 : 1] - 1,
      }));
      setCaptureCount((prev) => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 1,
      }));
      setLastCapture({ player: currentPlayer, position: move.jumpedPiece });
      captured = true;

      setTimeout(() => setLastCapture(null), 1000);
    }

    if (piece.player === 1 && move.r === ROWS - 1 && !piece.isKing) piece.isKing = true;
    if (piece.player === 2 && move.r === 0 && !piece.isKing) piece.isKing = true;

    setBoard(newBoard);
    setSelectedPiece(null);
    setValidMoves([]);
    setMoveCount(moveCount + 1);

    const newScore = { ...scores };
    if (captured) {
      newScore[currentPlayer === 1 ? 2 : 1]--;
    }

    if (newScore[1] === 0) {
      setWinner(2);
      setGameOver(true);
      return;
    }
    if (newScore[2] === 0) {
      setWinner(1);
      setGameOver(true);
      return;
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-slate-900 p-4 md:p-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onExit}
            className="group px-6 py-3 bg-slate-800/80 backdrop-blur-sm text-white rounded-2xl hover:bg-slate-700 transition-all flex items-center gap-2 border border-slate-700/50 font-bold shadow-lg hover:shadow-red-500/20"
          >
            <span className="group-hover:-translate-x-1 transition-transform">⬅</span>
            <span>Çıkış</span>
          </button>

          <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-slate-700/50 shadow-lg">
            <Swords className="w-6 h-6 text-red-400" />
            <span className="text-white font-bold text-lg">Hamle: {moveCount}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_600px_1fr] gap-6 items-start">
          {/* Left Panel - Player 1 (Red) */}
          <div className="space-y-4">
            <div
              className={`bg-gradient-to-br from-red-800 to-red-900 backdrop-blur-xl p-6 rounded-3xl border-2 transition-all ${
                currentPlayer === 1 && !gameOver
                  ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] scale-105'
                  : 'border-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-red-300">
                  🔴
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Kırmızı Oyuncu</h3>
                  <p className="text-red-200 text-sm">1. Oyuncu</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-900/50 rounded-xl p-3">
                  <p className="text-red-200 text-xs mb-1">Kalan Taş</p>
                  <p className="text-white font-bold text-3xl">{scores[1]}</p>
                </div>
                <div className="bg-red-900/50 rounded-xl p-3">
                  <p className="text-red-200 text-xs mb-1">Yenen Taş</p>
                  <p className="text-white font-bold text-3xl">{captureCount[1]}</p>
                </div>
              </div>
            </div>

            {/* Game Stats */}
            <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-700/50 shadow-lg">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Oyun İstatistikleri
              </h3>
              <div className="space-y-3">
                <div className="bg-slate-900/50 rounded-xl p-3">
                  <p className="text-slate-400 text-xs mb-1">Toplam Hamle</p>
                  <p className="text-white font-bold text-xl">{moveCount}</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-3">
                  <p className="text-slate-400 text-xs mb-1">Toplam Yenilen</p>
                  <p className="text-white font-bold text-xl">
                    {captureCount[1] + captureCount[2]}
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-3">
                  <p className="text-slate-400 text-xs mb-1">Sıradaki</p>
                  <p className="text-white font-bold">
                    {currentPlayer === 1 ? '🔴 Kırmızı' : '⚫ Siyah'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Game Board */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl p-6 rounded-[40px] shadow-2xl border-2 border-slate-700/50 w-full">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Target className="w-8 h-8 text-red-400" />
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                  DAMA
                </h2>
                <Target className="w-8 h-8 text-red-400" />
              </div>

              {/* Last Capture Animation */}
              {lastCapture && (
                <div className="mb-4 bg-yellow-500/20 border-2 border-yellow-500 rounded-xl p-3 animate-pulse">
                  <p className="text-yellow-400 font-bold text-center flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    {lastCapture.player === 1 ? 'Kırmızı' : 'Siyah'} taş yendi!
                  </p>
                </div>
              )}

              <div className="relative p-4 bg-amber-900 rounded-2xl shadow-2xl border-8 border-amber-950">
                <div className="grid grid-cols-8 grid-rows-8 w-full aspect-square border-4 border-amber-950 shadow-inner bg-amber-100 rounded-lg overflow-hidden">
                  {board.map((row, rIdx) =>
                    row.map((cell, cIdx) => {
                      const isDarkSq = (rIdx + cIdx) % 2 === 1;
                      const isSelected = selectedPiece?.r === rIdx && selectedPiece?.c === cIdx;
                      const isMoveSq = validMoves.some((m) => m.r === rIdx && m.c === cIdx);
                      const isLastCapture =
                        lastCapture?.position.r === rIdx && lastCapture?.position.c === cIdx;

                      return (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          onClick={() => handleSquareClick(rIdx, cIdx)}
                          className={`
                                                        relative flex items-center justify-center transition-all
                                                        ${isDarkSq ? 'bg-gradient-to-br from-amber-800 to-amber-900' : 'bg-gradient-to-br from-amber-100 to-amber-200'}
                                                        ${isSelected ? 'brightness-150 ring-inset ring-4 ring-yellow-400 z-10 scale-95' : ''}
                                                        ${isMoveSq ? 'cursor-pointer hover:brightness-110' : ''}
                                                        ${isLastCapture ? 'animate-pulse bg-red-500/30' : ''}
                                                    `}
                        >
                          {isMoveSq && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-6 h-6 bg-yellow-400/60 rounded-full animate-ping"></div>
                              <div className="absolute w-4 h-4 bg-yellow-400 rounded-full"></div>
                            </div>
                          )}

                          {cell && (
                            <div
                              className={`
                                                            w-[75%] h-[75%] rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.6)] z-10 transition-all cursor-pointer hover:scale-110 active:scale-95
                                                            ${
                                                              cell.player === 1
                                                                ? 'bg-gradient-to-br from-red-400 via-red-500 to-red-700 border-4 border-red-300'
                                                                : 'bg-gradient-to-br from-slate-600 via-slate-700 to-slate-900 border-4 border-slate-500'
                                                            }
                                                            flex items-center justify-center relative
                                                        `}
                            >
                              <div
                                className={`w-[70%] h-[70%] rounded-full border-2 border-white/30 shadow-inner flex items-center justify-center`}
                              >
                                {cell.isKing && (
                                  <Crown className="w-4 h-4 md:w-6 md:h-6 text-yellow-300 drop-shadow-lg animate-pulse" />
                                )}
                              </div>
                              {cell.isKing && (
                                <div className="absolute inset-0 rounded-full border-2 border-yellow-400/50 animate-ping"></div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Game Over Overlay */}
                {gameOver && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-20 rounded-2xl">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border-2 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.6)] text-center max-w-[90%] transform animate-in zoom-in-95 duration-500">
                      <div className="text-7xl mb-4 animate-bounce">🏆</div>
                      <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-2">
                        OYUN BİTTİ!
                      </h3>
                      <p className="text-white text-xl font-bold mb-2">
                        {winner === 1 ? '🔴 Kırmızı Oyuncu' : '⚫ Siyah Oyuncu'} Kazandı!
                      </p>
                      <p className="text-slate-400 mb-6">
                        {moveCount} hamle • {captureCount[winner!]} taş yendi
                      </p>
                      <button
                        onClick={resetGame}
                        className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-2xl font-black transition-all shadow-xl hover:shadow-red-500/50 active:scale-95 flex items-center gap-2 mx-auto"
                      >
                        <Trophy className="w-5 h-5" />
                        YENİ OYUN
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={resetGame}
                  className="flex-1 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl transition-all font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/50"
                >
                  <RotateCcw className="w-5 h-5" />
                  Yeni Oyun
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Player 2 (Black) */}
          <div className="space-y-4">
            <div
              className={`bg-gradient-to-br from-slate-700 to-slate-900 backdrop-blur-xl p-6 rounded-3xl border-2 transition-all ${
                currentPlayer === 2 && !gameOver
                  ? 'border-slate-400 shadow-[0_0_30px_rgba(148,163,184,0.4)] scale-105'
                  : 'border-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-900 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-slate-500">
                  ⚫
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Siyah Oyuncu</h3>
                  <p className="text-slate-300 text-sm">2. Oyuncu</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/50 rounded-xl p-3">
                  <p className="text-slate-300 text-xs mb-1">Kalan Taş</p>
                  <p className="text-white font-bold text-3xl">{scores[2]}</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-3">
                  <p className="text-slate-300 text-xs mb-1">Yenen Taş</p>
                  <p className="text-white font-bold text-3xl">{captureCount[2]}</p>
                </div>
              </div>
            </div>

            {/* Game Rules */}
            <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-700/50 shadow-lg">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Oyun Kuralları
              </h3>
              <div className="space-y-2 text-sm text-slate-300">
                <p>• Taşlar çapraz hareket eder</p>
                <p>• Rakip taşı atlayarak yenilir</p>
                <p>• Son sıraya ulaşan taş dama olur</p>
                <p>• Dama her yöne hareket edebilir</p>
                <p>• Tüm taşları yenen kazanır</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
    </div>
  );
};

export default CheckersGame;
