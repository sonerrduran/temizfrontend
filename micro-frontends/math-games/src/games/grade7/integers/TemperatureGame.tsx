import React, { useState, useEffect } from 'react';

interface TemperatureGameProps {
  onBack: () => void;
}

const TemperatureGame: React.FC<TemperatureGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [startTemp, setStartTemp] = useState(0);
  const [change, setChange] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    generateProblem();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const generateProblem = () => {
    const start = Math.floor(Math.random() * 41) - 20; // -20 to 20
    const changeVal = Math.floor(Math.random() * 21) - 10; // -10 to 10
    const answer = start + changeVal;

    setStartTemp(start);
    setChange(changeVal);

    const opts = [answer];
    while (opts.length < 4) {
      const wrong = answer + Math.floor(Math.random() * 11) - 5;
      if (!opts.includes(wrong)) {
        opts.push(wrong);
      }
    }

    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  const handleAnswer = (selected: number) => {
    const correct = startTemp + change;

    if (selected === correct) {
      setScore(score + 10 + streak * 2);
      setStreak(streak + 1);
      setTimeout(() => generateProblem(), 500);
    } else {
      setStreak(0);
      setScore(Math.max(0, score - 5));
      setTimeout(() => generateProblem(), 1500);
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setStreak(0);
    generateProblem();
  };

  const getTempColor = (temp: number) => {
    if (temp < -10) return 'from-blue-900 to-blue-700';
    if (temp < 0) return 'from-blue-600 to-cyan-500';
    if (temp < 10) return 'from-cyan-400 to-green-400';
    if (temp < 20) return 'from-yellow-400 to-orange-400';
    return 'from-orange-500 to-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-700 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold transition-all backdrop-blur-sm"
          >
            ← Geri
          </button>
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
            🌡️ Sıcaklık Oyunu
          </h1>
          <div className="w-24"></div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
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
        </div>

        {!gameOver ? (
          <>
            <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 mb-8 shadow-2xl">
              <h3 className="text-2xl font-black text-white text-center mb-6">Sıcaklık Değişimi</h3>

              <div className="grid grid-cols-3 gap-6 items-center mb-6">
                <div
                  className={`bg-gradient-to-br ${getTempColor(startTemp)} rounded-3xl p-8 text-center shadow-2xl`}
                >
                  <div className="text-6xl mb-2">🌡️</div>
                  <div className="text-5xl font-black text-white">{startTemp}°C</div>
                  <div className="text-lg text-white/80 mt-2">Başlangıç</div>
                </div>

                <div className="text-center">
                  <div
                    className={`text-6xl font-black ${change >= 0 ? 'text-red-400' : 'text-blue-400'}`}
                  >
                    {change >= 0 ? '+' : ''}
                    {change}°C
                  </div>
                  <div className="text-xl text-white/80 mt-2">
                    {change >= 0 ? '↑ Arttı' : '↓ Azaldı'}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-3xl p-8 text-center shadow-2xl">
                  <div className="text-6xl mb-2">❓</div>
                  <div className="text-5xl font-black text-white">?°C</div>
                  <div className="text-lg text-white/80 mt-2">Son Durum</div>
                </div>
              </div>

              <div className="bg-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-center gap-4 text-4xl font-black text-white">
                  <span>{startTemp}</span>
                  <span className="text-yellow-300">{change >= 0 ? '+' : ''}</span>
                  <span>{change}</span>
                  <span className="text-yellow-300">=</span>
                  <span>?</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`bg-gradient-to-br ${getTempColor(option)} hover:scale-105 active:scale-95 rounded-3xl p-8 text-white transition-all shadow-2xl`}
                >
                  <div className="text-6xl font-black">{option}°C</div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl">
            <div className="text-6xl mb-4">🌡️</div>
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

export default TemperatureGame;
