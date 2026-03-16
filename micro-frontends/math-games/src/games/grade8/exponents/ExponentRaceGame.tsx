import React, { useState, useEffect } from 'react';

interface ExponentRaceGameProps {
  onBack: () => void;
}

const ExponentRaceGame: React.FC<ExponentRaceGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [base, setBase] = useState(2);
  const [exponent, setExponent] = useState(2);
  const [options, setOptions] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    generateProblem();
  }, [level]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const generateProblem = () => {
    const maxBase = Math.min(5 + level, 10);
    const maxExp = Math.min(2 + Math.floor(level / 2), 5);

    const b = Math.floor(Math.random() * (maxBase - 1)) + 2;
    const e = Math.floor(Math.random() * (maxExp - 1)) + 2;
    const answer = Math.pow(b, e);

    setBase(b);
    setExponent(e);

    const opts = [answer];
    while (opts.length < 4) {
      const variation = Math.floor(Math.random() * answer * 0.5);
      const wrong = answer + (Math.random() > 0.5 ? variation : -variation);
      if (wrong > 0 && !opts.includes(wrong)) {
        opts.push(Math.floor(wrong));
      }
    }

    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  const handleAnswer = (selected: number) => {
    const correct = Math.pow(base, exponent);

    if (selected === correct) {
      setScore(score + 15 + streak * 3);
      setStreak(streak + 1);

      if ((score + 15) % 100 === 0) {
        setLevel(level + 1);
      }

      setTimeout(() => generateProblem(), 500);
    } else {
      setStreak(0);
      setScore(Math.max(0, score - 5));
      setTimeout(() => generateProblem(), 1500);
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(90);
    setGameOver(false);
    setStreak(0);
    setLevel(1);
    generateProblem();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold transition-all backdrop-blur-sm"
          >
            ← Geri
          </button>
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
            ² Üs Hesaplama Yarışı
          </h1>
          <div className="w-24"></div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Puan</div>
            <div className="text-3xl font-black text-white">{score}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Süre</div>
            <div className="text-3xl font-black text-white">{timeLeft}s</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Seri</div>
            <div className="text-3xl font-black text-white">{streak}🔥</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Seviye</div>
            <div className="text-3xl font-black text-white">{level}</div>
          </div>
        </div>

        {!gameOver ? (
          <>
            <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 mb-8 text-center shadow-2xl">
              <h3 className="text-2xl font-black text-white mb-6">Üslü Sayıyı Hesapla!</h3>

              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-2xl">
                  <div className="text-8xl font-black text-white relative">
                    {base}
                    <span className="absolute -top-4 -right-4 text-5xl">{exponent}</span>
                  </div>
                </div>

                <div className="text-6xl text-white">=</div>

                <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl p-8 shadow-2xl">
                  <div className="text-8xl font-black text-white">?</div>
                </div>
              </div>

              <div className="bg-white/20 rounded-2xl p-6">
                <div className="text-2xl text-white/80 mb-2">
                  {base} ×{' '}
                  {Array(exponent - 1)
                    .fill(base)
                    .join(' × ')}
                </div>
                <div className="text-xl text-white/60">
                  ({base} sayısını {exponent} kere çarp)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 rounded-3xl p-8 text-6xl font-black text-white transition-all hover:scale-105 active:scale-95 shadow-2xl"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl">
            <div className="text-6xl mb-4">²</div>
            <h2 className="text-4xl font-black text-white mb-4">Oyun Bitti!</h2>
            <p className="text-2xl text-white mb-2">Toplam Puan: {score}</p>
            <p className="text-xl text-white/80 mb-8">En Yüksek Seri: {streak}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl text-white font-bold text-xl transition-all"
              >
                Tekrar Oyna
              </button>
              <button
                onClick={onBack}
                className="px-8 py-4 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-xl transition-all"
              >
                Menüye Dön
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExponentRaceGame;
