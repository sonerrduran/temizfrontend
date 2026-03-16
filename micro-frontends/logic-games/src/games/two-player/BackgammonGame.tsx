import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onExit: () => void;
}

type Player = 1 | 2;
type Checker = { player: Player; count: number };

const BackgammonGame: React.FC<Props> = ({ onExit }) => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [dice, setDice] = useState<[number, number]>([0, 0]);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [movesMade, setMovesMade] = useState(0);
  const [availableMoves, setAvailableMoves] = useState<number[]>([]);

  const initBoard = (): (Checker | null)[] => {
    const board = Array(24).fill(null);
    board[0] = { player: 2, count: 2 };
    board[11] = { player: 2, count: 5 };
    board[16] = { player: 2, count: 3 };
    board[18] = { player: 2, count: 5 };

    board[23] = { player: 1, count: 2 };
    board[12] = { player: 1, count: 5 };
    board[7] = { player: 1, count: 3 };
    board[5] = { player: 1, count: 5 };

    return board;
  };

  const [board, setBoard] = useState<(Checker | null)[]>(initBoard());
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const rollDice = () => {
    setIsRolling(true);
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
      setDice([d1, d2]);
      setAvailableMoves(d1 === d2 ? [d1, d1, d1, d1] : [d1, d2]);
      setIsRolling(false);
      setGameStarted(true);
      setMovesMade(0);
    }, 600);
  };

  const endTurn = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setDice([0, 0]);
    setSelectedPoint(null);
    setAvailableMoves([]);
    setMovesMade(0);
  };

  const renderDice = (value: number) => {
    const dots: { [key: number]: number[][] } = {
      1: [[1, 1]],
      2: [
        [0, 0],
        [2, 2],
      ],
      3: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      4: [
        [0, 0],
        [0, 2],
        [2, 0],
        [2, 2],
      ],
      5: [
        [0, 0],
        [0, 2],
        [1, 1],
        [2, 0],
        [2, 2],
      ],
      6: [
        [0, 0],
        [0, 2],
        [1, 0],
        [1, 2],
        [2, 0],
        [2, 2],
      ],
    };

    return (
      <div className="relative w-20 h-20 bg-white rounded-2xl shadow-2xl border-4 border-slate-200">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-2 gap-1">
          {Array.from({ length: 9 }).map((_, idx) => {
            const row = Math.floor(idx / 3);
            const col = idx % 3;
            const hasDot = value > 0 && dots[value]?.some(([r, c]) => r === row && c === col);
            return (
              <div key={idx} className="flex items-center justify-center">
                {hasDot && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 bg-slate-800 rounded-full"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20 transition-all font-bold flex items-center gap-2"
          >
            <span>←</span> GERİ
          </motion.button>

          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-2">
              🎲 TAVLA
            </h2>
            <div className="text-sm text-white/60">İki Kişilik Strateji Oyunu</div>
          </div>

          <div className="flex gap-2">
            <div className="bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-blue-500/30 text-center">
              <div className="text-xs text-blue-300">Oyuncu 1</div>
              <div className="text-lg font-black text-blue-400">{player1Score}</div>
            </div>
            <div className="bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-red-500/30 text-center">
              <div className="text-xs text-red-300">Oyuncu 2</div>
              <div className="text-lg font-black text-red-400">{player2Score}</div>
            </div>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="bg-gradient-to-br from-amber-900/40 via-orange-900/40 to-red-900/40 backdrop-blur-xl rounded-3xl p-6 border-2 border-amber-500/30 shadow-2xl">
          {/* Current Player & Dice */}
          <div className="flex justify-between items-center mb-6">
            <motion.div
              animate={{ scale: currentPlayer === 1 ? 1.1 : 1 }}
              className={`px-6 py-3 rounded-xl font-black text-lg ${
                currentPlayer === 1
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-white/10 text-white/50'
              }`}
            >
              ⚪ Oyuncu 1
            </motion.div>

            <div className="flex gap-4">
              <AnimatePresence mode="wait">
                {isRolling ? (
                  <motion.div
                    key="rolling"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                    className="flex gap-4"
                  >
                    {renderDice(6)}
                    {renderDice(6)}
                  </motion.div>
                ) : (
                  <motion.div
                    key="static"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex gap-4"
                  >
                    {renderDice(dice[0])}
                    {renderDice(dice[1])}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              animate={{ scale: currentPlayer === 2 ? 1.1 : 1 }}
              className={`px-6 py-3 rounded-xl font-black text-lg ${
                currentPlayer === 2
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/50'
                  : 'bg-white/10 text-white/50'
              }`}
            >
              🔴 Oyuncu 2
            </motion.div>
          </div>

          {/* Board */}
          <div className="bg-gradient-to-br from-amber-800/60 to-orange-900/60 p-6 rounded-2xl border-4 border-amber-600/50 shadow-inner mb-6">
            {/* Top Half */}
            <div className="grid grid-cols-12 gap-2 mb-4">
              {board.slice(12, 24).map((point, idx) => (
                <motion.button
                  key={idx + 12}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPoint(idx + 12)}
                  className={`relative h-32 rounded-t-2xl transition-all ${
                    selectedPoint === idx + 12
                      ? 'bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/50'
                      : idx % 2 === 0
                        ? 'bg-gradient-to-b from-amber-700 to-amber-800'
                        : 'bg-gradient-to-b from-slate-700 to-slate-800'
                  } border-2 ${
                    selectedPoint === idx + 12 ? 'border-yellow-300' : 'border-amber-900/50'
                  }`}
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-white/40">
                    {idx + 13}
                  </div>
                  {point && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                      {Array.from({ length: Math.min(point.count, 5) }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className={`w-8 h-8 rounded-full border-3 shadow-lg ${
                            point.player === 1
                              ? 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-300'
                              : 'bg-gradient-to-br from-red-400 to-red-600 border-red-300'
                          }`}
                        />
                      ))}
                      {point.count > 5 && (
                        <div className="absolute -top-1 bg-white text-slate-900 text-xs font-black px-1.5 py-0.5 rounded-full">
                          {point.count}
                        </div>
                      )}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Middle Bar */}
            <div className="h-8 bg-gradient-to-r from-amber-900 via-orange-900 to-amber-900 rounded-full mb-4 flex items-center justify-center">
              <div className="text-xs font-bold text-amber-200">BAR</div>
            </div>

            {/* Bottom Half */}
            <div className="grid grid-cols-12 gap-2">
              {board
                .slice(0, 12)
                .reverse()
                .map((point, idx) => {
                  const realIdx = 11 - idx;
                  return (
                    <motion.button
                      key={realIdx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedPoint(realIdx)}
                      className={`relative h-32 rounded-b-2xl transition-all ${
                        selectedPoint === realIdx
                          ? 'bg-gradient-to-t from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/50'
                          : realIdx % 2 === 0
                            ? 'bg-gradient-to-t from-amber-700 to-amber-800'
                            : 'bg-gradient-to-t from-slate-700 to-slate-800'
                      } border-2 ${
                        selectedPoint === realIdx ? 'border-yellow-300' : 'border-amber-900/50'
                      }`}
                    >
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-white/40">
                        {realIdx + 1}
                      </div>
                      {point && (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center gap-1">
                          {Array.from({ length: Math.min(point.count, 5) }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className={`w-8 h-8 rounded-full border-3 shadow-lg ${
                                point.player === 1
                                  ? 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-300'
                                  : 'bg-gradient-to-br from-red-400 to-red-600 border-red-300'
                              }`}
                            />
                          ))}
                          {point.count > 5 && (
                            <div className="absolute -bottom-1 bg-white text-slate-900 text-xs font-black px-1.5 py-0.5 rounded-full">
                              {point.count}
                            </div>
                          )}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={rollDice}
              disabled={dice[0] !== 0 || isRolling}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed px-10 py-4 rounded-xl font-black text-xl shadow-lg transition-all flex items-center gap-3"
            >
              <span className="text-2xl">🎲</span>
              ZAR AT
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={endTurn}
              disabled={dice[0] === 0}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed px-10 py-4 rounded-xl font-black text-xl shadow-lg transition-all flex items-center gap-3"
            >
              <span className="text-2xl">✓</span>
              TURU BİTİR
            </motion.button>
          </div>

          {/* Instructions */}
          {!gameStarted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 rounded-xl p-4 text-center"
            >
              <p className="text-amber-200 font-semibold">
                🎲 Zarları atarak oyuna başlayın! Pullarınızı zarların gösterdiği sayı kadar hareket
                ettirin.
              </p>
              <p className="text-amber-300/60 text-sm mt-2">
                Tüm pullarınızı kendi evinize toplayıp çıkararak kazanın!
              </p>
            </motion.div>
          )}

          {availableMoves.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex justify-center gap-2"
            >
              <div className="text-sm text-white/60">Kalan Hamleler:</div>
              {availableMoves.map((move, idx) => (
                <div key={idx} className="bg-white/10 px-3 py-1 rounded-lg text-sm font-bold">
                  {move}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BackgammonGame;
