import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

type Domino = [number, number];
type Player = 1 | 2;

const DominoGame: React.FC<Props> = ({ onExit }) => {
  const generateDominoes = (): Domino[] => {
    const dominoes: Domino[] = [];
    for (let i = 0; i <= 6; i++) {
      for (let j = i; j <= 6; j++) {
        dominoes.push([i, j]);
      }
    }
    return dominoes.sort(() => Math.random() - 0.5);
  };

  const [allDominoes] = useState<Domino[]>(generateDominoes());
  const [player1Hand, setPlayer1Hand] = useState<Domino[]>(allDominoes.slice(0, 7));
  const [player2Hand, setPlayer2Hand] = useState<Domino[]>(allDominoes.slice(7, 14));
  const [board, setBoard] = useState<Domino[]>([allDominoes[14]]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [winner, setWinner] = useState<Player | null>(null);

  const canPlay = (domino: Domino): boolean => {
    const leftEnd = board[0][0];
    const rightEnd = board[board.length - 1][1];
    return domino.includes(leftEnd) || domino.includes(rightEnd);
  };

  const playDomino = (domino: Domino, side: 'left' | 'right') => {
    if (winner) return;

    const newBoard = [...board];
    const hand = currentPlayer === 1 ? [...player1Hand] : [...player2Hand];
    const index = hand.findIndex((d) => d[0] === domino[0] && d[1] === domino[1]);

    if (index === -1) return;

    let playedDomino = domino;

    if (side === 'left') {
      const leftEnd = newBoard[0][0];
      if (playedDomino[1] === leftEnd) {
        // Correct orientation
      } else if (playedDomino[0] === leftEnd) {
        playedDomino = [playedDomino[1], playedDomino[0]];
      } else {
        return;
      }
      newBoard.unshift(playedDomino);
    } else {
      const rightEnd = newBoard[newBoard.length - 1][1];
      if (playedDomino[0] === rightEnd) {
        // Correct orientation
      } else if (playedDomino[1] === rightEnd) {
        playedDomino = [playedDomino[1], playedDomino[0]];
      } else {
        return;
      }
      newBoard.push(playedDomino);
    }

    hand.splice(index, 1);
    setBoard(newBoard);

    if (hand.length === 0) {
      setWinner(currentPlayer);
      return;
    }

    if (currentPlayer === 1) {
      setPlayer1Hand(hand);
    } else {
      setPlayer2Hand(hand);
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const renderDomino = (domino: Domino, onClick?: () => void, disabled?: boolean) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-white text-slate-900 rounded-lg p-2 border-2 border-slate-300 shadow-lg flex flex-col items-center justify-center min-w-[60px] transition-all ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'
      }`}
    >
      <div className="text-2xl font-black">{domino[0]}</div>
      <div className="w-full h-0.5 bg-slate-400 my-1"></div>
      <div className="text-2xl font-black">{domino[1]}</div>
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900 text-white p-4">
      <div className="w-full max-w-6xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-slate-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-gray-400">
            🀄 DOMINO
          </h2>
          <div className="text-sm font-bold bg-slate-500/20 px-4 py-2 rounded-xl border border-slate-500/30">
            {winner ? `Kazanan: Oyuncu ${winner}` : `Oyuncu ${currentPlayer}`}
          </div>
        </div>

        {/* Player 2 Hand */}
        <div className="mb-6">
          <div className="text-center mb-2 text-sm font-bold text-red-400">
            Oyuncu 2 ({player2Hand.length} taş)
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            {currentPlayer === 2
              ? player2Hand.map((domino, idx) => (
                  <div key={idx}>
                    {renderDomino(
                      domino,
                      () => {
                        if (canPlay(domino)) {
                          playDomino(domino, 'right');
                        }
                      },
                      !canPlay(domino)
                    )}
                  </div>
                ))
              : player2Hand.map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-700 w-[60px] h-[80px] rounded-lg border-2 border-slate-600"
                  ></div>
                ))}
          </div>
        </div>

        {/* Board */}
        <div className="bg-emerald-800/30 p-4 rounded-2xl border-2 border-emerald-700/50 mb-6 min-h-[120px]">
          <div className="flex gap-2 overflow-x-auto pb-2 justify-center items-center flex-wrap">
            {board.map((domino, idx) => (
              <div key={idx}>{renderDomino(domino, undefined, true)}</div>
            ))}
          </div>
        </div>

        {/* Player 1 Hand */}
        <div>
          <div className="text-center mb-2 text-sm font-bold text-blue-400">
            Oyuncu 1 ({player1Hand.length} taş)
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            {currentPlayer === 1
              ? player1Hand.map((domino, idx) => (
                  <div key={idx}>
                    {renderDomino(
                      domino,
                      () => {
                        if (canPlay(domino)) {
                          playDomino(domino, 'right');
                        }
                      },
                      !canPlay(domino)
                    )}
                  </div>
                ))
              : player1Hand.map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-700 w-[60px] h-[80px] rounded-lg border-2 border-slate-600"
                  ></div>
                ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-slate-500/10 border border-slate-500/30 rounded-xl p-4 text-center">
          <p className="text-slate-200 text-sm">
            🀄 Elinizden uygun bir taş seçin ve tahtaya yerleştirin!
          </p>
        </div>

        {winner && (
          <div className="mt-4 bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-4 text-center">
            <h3 className="text-2xl font-black text-yellow-400">🎉 Oyuncu {winner} Kazandı!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default DominoGame;
