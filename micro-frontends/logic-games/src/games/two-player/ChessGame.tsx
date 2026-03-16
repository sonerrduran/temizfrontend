import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Crown, RotateCcw, Trophy, Swords, Clock, Star } from 'lucide-react';

interface Props {
  onExit: () => void;
}

const ChessGame: React.FC<Props> = ({ onExit }) => {
  const [game, setGame] = useState(new Chess());
  const [outcome, setOutcome] = useState<string | null>(null);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [capturedPieces, setCapturedPieces] = useState({
    white: [] as string[],
    black: [] as string[],
  });
  const [moveCount, setMoveCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    checkGameOver();
    updateCapturedPieces();
  }, [game]);

  const pieceSymbols: Record<string, string> = {
    p: '♟',
    n: '♞',
    b: '♝',
    r: '♜',
    q: '♛',
    k: '♚',
    P: '♙',
    N: '♘',
    B: '♗',
    R: '♖',
    Q: '♕',
    K: '♔',
  };

  const updateCapturedPieces = () => {
    const history = game.history({ verbose: true });
    const captured = { white: [] as string[], black: [] as string[] };

    history.forEach((move) => {
      if (move.captured) {
        const piece =
          move.color === 'w' ? move.captured.toLowerCase() : move.captured.toUpperCase();
        if (move.color === 'w') {
          captured.black.push(pieceSymbols[move.captured]);
        } else {
          captured.white.push(pieceSymbols[move.captured.toUpperCase()]);
        }
      }
    });

    setCapturedPieces(captured);
  };

  const checkGameOver = () => {
    if (game.isCheckmate()) {
      setOutcome(`Şah Mat! ${game.turn() === 'w' ? 'Siyah' : 'Beyaz'} kazandı!`);
    } else if (game.isDraw()) {
      setOutcome('Oyun Berabere bitti!');
    } else if (game.isStalemate()) {
      setOutcome('Pat! Oyun Berabere.');
    } else if (game.isCheck()) {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 2000);
    }
  };

  const onDrop = (data: {
    sourceSquare: string;
    targetSquare: string | null;
    piece: { pieceType: string };
  }) => {
    const { sourceSquare, targetSquare, piece } = data;
    if (!targetSquare) return false;

    const gameCopy = new Chess(game.fen());
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece?.pieceType?.[1]?.toLowerCase() ?? 'q',
      });

      if (move) {
        setGame(gameCopy);
        setMoveHistory([...moveHistory, move.san]);
        setMoveCount(moveCount + 1);
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  };

  const resetGame = () => {
    setGame(new Chess());
    setOutcome(null);
    setMoveHistory([]);
    setCapturedPieces({ white: [], black: [] });
    setMoveCount(0);
  };

  const undoMove = () => {
    const gameCopy = new Chess(game.fen());
    gameCopy.undo();
    setGame(gameCopy);
    setMoveHistory(moveHistory.slice(0, -1));
    setMoveCount(Math.max(0, moveCount - 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onExit}
            className="group px-6 py-3 bg-slate-800/80 backdrop-blur-sm text-white rounded-2xl hover:bg-slate-700 transition-all flex items-center gap-2 border border-slate-700/50 font-bold shadow-lg hover:shadow-purple-500/20"
          >
            <span className="group-hover:-translate-x-1 transition-transform">⬅</span>
            <span>Çıkış</span>
          </button>

          <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-slate-700/50 shadow-lg">
            <Swords className="w-6 h-6 text-purple-400" />
            <span className="text-white font-bold text-lg">Hamle: {moveCount}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_600px_1fr] gap-6 items-start">
          {/* Left Panel - Black Player */}
          <div className="space-y-4">
            <div
              className={`bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl p-6 rounded-3xl border-2 transition-all ${
                game.turn() === 'b'
                  ? 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] scale-105'
                  : 'border-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-2xl">
                  ♚
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Siyah Oyuncu</h3>
                  <p className="text-slate-400 text-sm">Strateji Ustası</p>
                </div>
              </div>

              {/* Captured Pieces */}
              <div className="bg-slate-900/50 rounded-xl p-3">
                <p className="text-slate-400 text-xs mb-2">Alınan Taşlar</p>
                <div className="flex flex-wrap gap-1 min-h-[32px]">
                  {capturedPieces.white.map((piece, i) => (
                    <span key={i} className="text-2xl opacity-70">
                      {piece}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Move History */}
            <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-700/50 shadow-lg">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                Hamle Geçmişi
              </h3>
              <div className="bg-slate-900/50 rounded-xl p-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                {moveHistory.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-4">Henüz hamle yapılmadı</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {moveHistory.map((move, i) => (
                      <div key={i} className="text-slate-300 font-mono">
                        <span className="text-purple-400">{Math.floor(i / 2) + 1}.</span> {move}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center - Chessboard */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl p-6 rounded-[40px] shadow-2xl border-2 border-slate-700/50 w-full">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Crown className="w-8 h-8 text-yellow-400" />
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Satranç
                </h2>
                <Crown className="w-8 h-8 text-yellow-400" />
              </div>

              {/* Check Warning */}
              {game.isCheck() && !outcome && showHint && (
                <div className="mb-4 bg-red-500/20 border-2 border-red-500 rounded-xl p-3 animate-pulse">
                  <p className="text-red-400 font-bold text-center flex items-center justify-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    ŞAH! Şahını koru!
                  </p>
                </div>
              )}

              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-slate-700">
                <Chessboard
                  options={{
                    position: game.fen(),
                    onPieceDrop: onDrop as any,
                    darkSquareStyle: { backgroundColor: '#4a5568' },
                    lightSquareStyle: { backgroundColor: '#cbd5e0' },
                    animationDurationInMs: 300,
                  }}
                />

                {/* Outcome Overlay */}
                {outcome && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-20">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.6)] text-center max-w-[90%] transform animate-in zoom-in-95 duration-500">
                      <div className="text-7xl mb-4 animate-bounce">
                        {outcome.includes('Mat')
                          ? '🏆'
                          : outcome.includes('Berabere')
                            ? '🤝'
                            : '⚠️'}
                      </div>
                      <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                        {outcome}
                      </h3>
                      <p className="text-slate-400 mb-6">Toplam {moveCount} hamle yapıldı</p>
                      <button
                        onClick={resetGame}
                        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl font-black transition-all shadow-xl hover:shadow-purple-500/50 active:scale-95 flex items-center gap-2 mx-auto"
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
                  onClick={undoMove}
                  disabled={moveHistory.length === 0}
                  className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:opacity-50 text-white rounded-xl transition-all font-bold flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="w-5 h-5" />
                  Geri Al
                </button>
                <button
                  onClick={resetGame}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50"
                >
                  <Star className="w-5 h-5" />
                  Yeni Oyun
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - White Player */}
          <div className="space-y-4">
            <div
              className={`bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl p-6 rounded-3xl border-2 transition-all ${
                game.turn() === 'w'
                  ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)] scale-105'
                  : 'border-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-2xl">
                  ♔
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Beyaz Oyuncu</h3>
                  <p className="text-slate-400 text-sm">Taktik Dehası</p>
                </div>
              </div>

              {/* Captured Pieces */}
              <div className="bg-slate-900/50 rounded-xl p-3">
                <p className="text-slate-400 text-xs mb-2">Alınan Taşlar</p>
                <div className="flex flex-wrap gap-1 min-h-[32px]">
                  {capturedPieces.black.map((piece, i) => (
                    <span key={i} className="text-2xl opacity-70">
                      {piece}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Game Info */}
            <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-700/50 shadow-lg">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Oyun Bilgisi
              </h3>
              <div className="space-y-3">
                <div className="bg-slate-900/50 rounded-xl p-3">
                  <p className="text-slate-400 text-xs mb-1">Sıra</p>
                  <p className="text-white font-bold">
                    {game.turn() === 'w' ? '◻️ Beyaz' : '◼️ Siyah'}
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-3">
                  <p className="text-slate-400 text-xs mb-1">Durum</p>
                  <p className="text-white font-bold">
                    {game.isCheck() ? '⚠️ Şah!' : game.isCheckmate() ? '🏆 Mat!' : '✓ Devam Ediyor'}
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-3">
                  <p className="text-slate-400 text-xs mb-1">Toplam Hamle</p>
                  <p className="text-white font-bold">{moveCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(15, 23, 42, 0.5);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(168, 85, 247, 0.5);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(168, 85, 247, 0.7);
                }
            `}</style>
    </div>
  );
};

export default ChessGame;
