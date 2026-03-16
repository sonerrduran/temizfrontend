import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';

interface MastermindProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

// Colors available for the game
const COLORS = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-400',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-cyan-400',
];

interface Guess {
  code: number[];
  feedback: { black: number; white: number }; // black: correct color & pos, white: correct color only
}

const MastermindGame: React.FC<MastermindProps> = ({ grade, difficulty, onComplete, onExit }) => {
  // Config based on difficulty
  const getConfig = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
        return { codeLength: 4, colorsCount: 4, maxGuesses: 10, allowDuplicates: false };
      case Difficulty.EASY:
        return { codeLength: 4, colorsCount: 6, maxGuesses: 10, allowDuplicates: true };
      case Difficulty.MEDIUM:
        return { codeLength: 4, colorsCount: 8, maxGuesses: 10, allowDuplicates: true };
      case Difficulty.HARD:
        return { codeLength: 5, colorsCount: 8, maxGuesses: 8, allowDuplicates: true };
      case Difficulty.VERY_HARD:
        return { codeLength: 6, colorsCount: 8, maxGuesses: 8, allowDuplicates: true };
      default:
        return { codeLength: 4, colorsCount: 6, maxGuesses: 10, allowDuplicates: true };
    }
  };

  const config = getConfig();

  const [secretCode, setSecretCode] = useState<number[]>([]);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState<number[]>([]);

  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const generateSecretCode = useCallback(() => {
    const code: number[] = [];
    const availableColors = [...Array(config.colorsCount).keys()];

    for (let i = 0; i < config.codeLength; i++) {
      if (config.allowDuplicates) {
        const randomColor = Math.floor(Math.random() * config.colorsCount);
        code.push(randomColor);
      } else {
        const randomIndex = Math.floor(Math.random() * availableColors.length);
        code.push(availableColors[randomIndex]);
        availableColors.splice(randomIndex, 1);
      }
    }
    return code;
  }, [config]);

  const initGame = useCallback(() => {
    setSecretCode(generateSecretCode());
    setGuesses([]);
    setCurrentGuess(Array(config.codeLength).fill(-1));
    setIsGameOver(false);
    setHasWon(false);
  }, [generateSecretCode, config.codeLength]);

  useEffect(() => {
    initGame();
  }, [initGame, difficulty]);

  const handleGameOver = (win: boolean) => {
    setIsGameOver(true);
    setHasWon(win);
    let finalStars = 1;
    if (win) {
      // Score based on guesses used
      const attempts = guesses.length + 1; // including the winning guess
      const efficiency = (config.maxGuesses - attempts) / config.maxGuesses;

      if (efficiency > 0.6) finalStars = 5;
      else if (efficiency > 0.4) finalStars = 4;
      else if (efficiency > 0.2) finalStars = 3;
      else finalStars = 2;
    }
    setScore(Math.max(1, Math.min(finalStars, 5)));
  };

  const handleColorPick = (colorIndex: number) => {
    if (isGameOver || showRules) return;

    // Find first empty slot (-1)
    const emptyIndex = currentGuess.indexOf(-1);
    if (emptyIndex !== -1) {
      const newGuess = [...currentGuess];
      newGuess[emptyIndex] = colorIndex;
      setCurrentGuess(newGuess);
    }
  };

  const handleRemoveColor = (slotIndex: number) => {
    if (isGameOver || showRules) return;
    const newGuess = [...currentGuess];
    newGuess[slotIndex] = -1;
    setCurrentGuess(newGuess);
  };

  const submitGuess = () => {
    if (isGameOver || showRules) return;
    if (currentGuess.includes(-1)) return; // not full

    // Calculate Feedback
    let black = 0; // exact match
    let white = 0; // color match, wrong position

    const secretCopy = [...secretCode];
    const guessCopy = [...currentGuess];

    // 1. Find Black (Exact Matches)
    for (let i = 0; i < config.codeLength; i++) {
      if (guessCopy[i] === secretCopy[i]) {
        black++;
        guessCopy[i] = -2; // mark as used
        secretCopy[i] = -2; // mark as used
      }
    }

    // 2. Find White (Color Matches)
    for (let i = 0; i < config.codeLength; i++) {
      if (guessCopy[i] !== -2) {
        const foundIndex = secretCopy.indexOf(guessCopy[i]);
        if (foundIndex !== -1) {
          white++;
          secretCopy[foundIndex] = -2; // mark as used
        }
      }
    }

    const newGuessRecord = {
      code: [...currentGuess],
      feedback: { black, white },
    };

    const newGuesses = [...guesses, newGuessRecord];
    setGuesses(newGuesses);
    setCurrentGuess(Array(config.codeLength).fill(-1));

    if (black === config.codeLength) {
      handleGameOver(true);
    } else if (newGuesses.length >= config.maxGuesses) {
      handleGameOver(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans selection:bg-purple-500/30 w-full overflow-hidden">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl text-fuchsia-400">🕵️‍♂️</span> Mastermind
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span>🔐</span>
                <div>Bilgisayarın belirlediği **gizli renk kombinasyonunu** bulmaya çalış.</div>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-400 font-black">●</span>
                <div>
                  Tahmininden sonraki her **Siyah Çivi (●)**, hem rengi hem de yeri doğru olan bir
                  topu temsil eder.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-100 font-bold border border-slate-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">
                  ○
                </span>
                <div>
                  Her **Beyaz Çivi (○)**, rengi doğru ancak yanlış yere koyduğun bir topu temsil
                  eder.
                </div>
              </li>
              <li className="flex gap-3 text-amber-400">
                <span>⚠️</span>
                <div>İpuçlarının sırası, topların sırasını **göstermez!**</div>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full py-4 rounded-xl font-black text-xl transition-all bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-lg active:scale-95"
            >
              KODU KIR!
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-3xl px-2 sm:px-4 py-4 md:py-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-slate-800/50 p-4 rounded-3xl border border-white/5 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={onExit}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all font-bold relative z-50"
            >
              ⬅ Geri Dön
            </button>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600">
                Mastermind
              </h2>
              <div className="text-xs md:text-sm font-bold text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full mt-1 inline-block">
                ŞİFRE UZUNLUĞU: {config.codeLength}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">
              Deneme Hakkı
            </div>
            <div className="text-2xl font-black text-fuchsia-400">
              {config.maxGuesses - guesses.length}
            </div>
          </div>
        </div>

        {/* Game Board Container - Scrollable on mobile if needed */}
        <div className="flex-1 flex justify-center w-full max-h-[60vh] overflow-y-auto mb-6 scrollbar-hide">
          <div className="bg-slate-800/80 p-4 sm:p-6 rounded-3xl shadow-2xl border-4 border-slate-700 w-full max-w-md flex flex-col gap-3">
            {/* Render Past Guesses */}
            {guesses.map((guess, gIndex) => (
              <div
                key={`guess-${gIndex}`}
                className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-2xl border border-white/5"
              >
                <div className="text-slate-500 font-black w-6 text-right select-none">
                  {gIndex + 1}
                </div>

                <div className="flex flex-1 gap-2 sm:gap-3 justify-center">
                  {guess.code.map((c, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-[inset_0_-4px_8px_rgba(0,0,0,0.4)] ${COLORS[c]}`}
                    />
                  ))}
                </div>

                {/* Feedback Pegs Grid */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 grid grid-cols-2 gap-1 items-center justify-center p-1 bg-slate-950/50 rounded-lg">
                  {Array.from({ length: config.codeLength }).map((_, i) => {
                    let pegClass = 'bg-slate-800 border border-slate-700'; // empty peg
                    if (i < guess.feedback.black)
                      pegClass =
                        'bg-slate-900 border border-black shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5)]';
                    else if (i < guess.feedback.black + guess.feedback.white)
                      pegClass =
                        'bg-white border border-slate-300 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)]';

                    return (
                      <div
                        key={`peg-${i}`}
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full mx-auto ${pegClass}`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Current Active Guess Row */}
            {!isGameOver && guesses.length < config.maxGuesses && (
              <div className="flex items-center gap-4 bg-slate-700/50 p-3 rounded-2xl border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.1)] relative mt-2">
                <div className="text-fuchsia-400 font-black w-6 text-right animate-pulse">▶</div>

                <div className="flex flex-1 gap-2 sm:gap-3 justify-center">
                  {currentGuess.map((c, i) => (
                    <button
                      key={`curr-${i}`}
                      onClick={() => handleRemoveColor(i)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all flex items-center justify-center
                                                ${c === -1 ? 'bg-slate-900 border-2 border-dashed border-slate-600 hover:border-slate-400' : `${COLORS[c]} shadow-[inset_0_-4px_8px_rgba(0,0,0,0.4)] hover:opacity-80`}
                                            `}
                    >
                      {c !== -1 && (
                        <span className="opacity-0 hover:opacity-100 text-white font-black text-shadow drop-shadow-md">
                          X
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                  <button
                    onClick={submitGuess}
                    disabled={currentGuess.includes(-1)}
                    className={`w-full h-full rounded-xl font-black transition-all flex items-center justify-center
                                            ${currentGuess.includes(-1) ? 'bg-slate-800 text-slate-600 cursor-not-allowed border-none' : 'bg-fuchsia-500 hover:bg-fuchsia-400 text-white shadow-[0_4px_10px_rgba(217,70,239,0.4)] shadow-fuchsia-500/50 border-b-4 border-fuchsia-700 active:translate-y-1 active:border-b-0'}
                                        `}
                  >
                    ✓
                  </button>
                </div>
              </div>
            )}

            {/* Secret Code Reveal (Game Over) */}
            {isGameOver && (
              <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border-2 border-dashed border-slate-600 mt-4">
                <div className="text-slate-400 font-black text-center w-full mb-2 uppercase tracking-widest text-sm">
                  Gizli Kod
                </div>
                <div className="flex flex-1 gap-2 sm:gap-3 justify-center">
                  {secretCode.map((c, i) => (
                    <div
                      key={`secret-${i}`}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-[inset_0_-4px_8px_rgba(0,0,0,0.4)] ${COLORS[c]} animate-bounce`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Color Picker Controls */}
        {!isGameOver && (
          <div className="bg-slate-800 p-4 sm:p-6 rounded-3xl border border-white/10 shadow-xl shrink-0">
            <h3 className="text-center text-slate-400 font-bold mb-4 text-sm uppercase tracking-wider">
              Renk Seç
            </h3>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {COLORS.slice(0, config.colorsCount).map((color, i) => (
                <button
                  key={`picker-${i}`}
                  onClick={() => handleColorPick(i)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${color} shadow-[inset_0_-4px_10px_rgba(0,0,0,0.3),0_4px_10px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:scale-110 active:scale-95 transition-all outline-none border-2 border-white/20 hover:border-white`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Game Over Overlay */}
      {isGameOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-slate-800 p-8 md:p-12 rounded-[2rem] max-w-md w-full text-center shadow-2xl border border-white/10 bounce-in">
            <div className="text-6xl md:text-8xl mb-6">{hasWon ? '🎯' : '💥'}</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {hasWon ? 'Şifre Kırıldı!' : 'Ajan Yakalandı!'}
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              {hasWon
                ? `Gizli kodu ${guesses.length} denemede çözmeyi başardın. Sıkı işti! Kazanılan Yıldız: ${score}`
                : 'Deneme hakkın malesef tükendi. Gizli kodu bulamadık.'}
            </p>

            <div className="flex flex-col gap-3">
              {hasWon && (
                <button
                  onClick={() => onComplete(score)}
                  className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-400 hover:to-fuchsia-500 text-white shadow-lg active:scale-95 text-transparent bg-clip-text text-white"
                >
                  Ödülü Al ⭐️
                </button>
              )}
              <button
                onClick={initGame}
                className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-slate-600 hover:bg-slate-500 text-white shadow-lg active:scale-95"
              >
                Yeni Şifre İste
              </button>
              <button
                onClick={onExit}
                className="w-full py-4 rounded-2xl font-black text-lg transition-all bg-slate-700 hover:bg-slate-600 text-white shadow-lg active:scale-95"
              >
                Ana Üsse Dön
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MastermindGame;
