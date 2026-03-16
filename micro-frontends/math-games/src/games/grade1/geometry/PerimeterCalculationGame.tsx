import React, { useState, useEffect } from 'react';

interface PerimeterCalculationGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const PerimeterCalculationGame: React.FC<PerimeterCalculationGameProps> = ({
  onComplete,
  onExit,
}) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(8);
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(2);
  const [correctAnswer, setCorrectAnswer] = useState(6);
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRules, setShowRules] = useState(true);

  useEffect(() => {
    generateQuestion();
  }, [round, level]);

  const generateQuestion = () => {
    const maxSize = Math.min(3 + level, 7);
    const w = Math.floor(Math.random() * maxSize) + 2;
    const h = Math.floor(Math.random() * maxSize) + 2;
    const answer = 2 * (w + h); // Perimeter formula

    setWidth(w);
    setHeight(h);
    setCorrectAnswer(answer);

    const wrongOptions = [answer + 2, answer - 2, answer + 4, w * h].filter(
      (n) => n > 0 && n !== answer
    );

    const allOptions = [answer, ...wrongOptions.slice(0, 3)].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    setFeedback('');
  };

  const handleAnswer = (answer: number) => {
    if (answer === correctAnswer) {
      setScore(score + 10);
      setFeedback('✅ Doğru!');

      setTimeout(() => {
        if (round < totalRounds) {
          setRound(round + 1);
          if (round % 3 === 0 && level < 5) {
            setLevel(level + 1);
          }
        } else {
          setShowCelebration(true);
        }
      }, 1500);
    } else {
      setFeedback(`❌ Yanlış! Doğru cevap: ${correctAnswer}`);
      setTimeout(() => {
        if (round < totalRounds) {
          setRound(round + 1);
        } else {
          setShowCelebration(true);
        }
      }, 2000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setRound(1);
    setShowCelebration(false);
    generateQuestion();
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-12 text-center border border-lime-500/30 max-w-2xl">
          <div className="text-8xl mb-6">📏🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Harika!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Tüm çevreleri hesapladın!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-gradient-to-br from-lime-500 via-green-500 to-lime-600 hover:from-lime-400 hover:to-green-500 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
            >
              Tekrar Oyna
            </button>
            <button
              onClick={() => {
                onComplete(score);
                onExit();
              }}
              className="px-8 py-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
            >
              Menüye Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all transform hover:scale-105"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">
                Tur: {round}/{totalRounds}
              </span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">📏 Çevre Hesaplama</h1>
          <p className="text-slate-400 text-lg mt-2">Şekillerin çevresini bul!</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          <div className="bg-gradient-to-br from-lime-500 via-green-500 to-lime-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowRules(true)}
                className="px-4 py-2 bg-lime-700/40 hover:bg-lime-600/40 border-2 border-lime-300 text-white rounded-xl font-bold transition-all transform hover:scale-105"
              >
                📖 NASIL OYNANIR?
              </button>
            </div>

            <div className="bg-lime-700/40 rounded-2xl p-8 mb-8 border-2 border-lime-300">
              <p className="text-white text-2xl font-bold text-center mb-6">
                Bu dikdörtgenin çevresi kaç birimdir?
              </p>
              <div className="flex justify-center items-center">
                <div className="relative">
                  <div
                    className="grid gap-1 bg-lime-900/60 p-4 rounded-xl border-4 border-lime-300"
                    style={{
                      gridTemplateColumns: `repeat(${width}, 50px)`,
                      gridTemplateRows: `repeat(${height}, 50px)`,
                    }}
                  >
                    {Array.from({ length: width * height }).map((_, idx) => (
                      <div
                        key={idx}
                        className="w-12 h-12 bg-lime-300/80 border-2 border-lime-500 rounded-lg"
                      />
                    ))}
                  </div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-white font-bold text-lg">
                    {width} birim
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 -left-12 text-white font-bold text-lg">
                    {height} birim
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={!!feedback}
                  className="h-20 bg-lime-700/40 hover:bg-lime-600/40 border-2 border-lime-300 rounded-2xl text-white font-black text-3xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {option}
                </button>
              ))}
            </div>

            {feedback && (
              <div
                className={`mt-8 text-center text-2xl font-black p-6 rounded-xl ${
                  feedback.includes('✅')
                    ? 'bg-green-500/90 border-2 border-green-300 text-white'
                    : 'bg-red-500/90 border-2 border-red-300 text-white'
                }`}
              >
                {feedback}
              </div>
            )}
          </div>
        </div>
      </div>

      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-lime-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">📏</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-lime-400 font-bold">1.</span> Ekranda bir dikdörtgen
                göreceksin
              </li>
              <li className="flex gap-2">
                <span className="text-lime-400 font-bold">2.</span> Kenarları say ve çevreyi hesapla
              </li>
              <li className="flex gap-2">
                <span className="text-lime-400 font-bold">3.</span> Çevre = 2 × (Genişlik +
                Yükseklik)
              </li>
              <li className="flex gap-2">
                <span className="text-lime-400 font-bold">4.</span> Doğru cevabı seç ve puan kazan!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-lime-500 via-green-500 to-lime-600 hover:from-lime-400 hover:to-green-500 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerimeterCalculationGame;
