import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ColorMatchGame() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [currentWord, setCurrentWord] = useState('');
  const [currentColor, setCurrentColor] = useState('');
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  const colors = [
    { name: 'KIRMIZI', value: 'text-red-500' },
    { name: 'MAVİ', value: 'text-blue-500' },
    { name: 'YEŞİL', value: 'text-green-500' },
    { name: 'SARI', value: 'text-yellow-500' },
    { name: 'MOR', value: 'text-purple-500' },
  ];

  const generateQuestion = () => {
    const wordColor = colors[Math.floor(Math.random() * colors.length)];
    const textColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentWord(wordColor.name);
    setCurrentColor(textColor.value);
  };

  const startGame = () => {
    setScore(0);
    setRound(1);
    setTimeLeft(30);
    setGameState('playing');
    generateQuestion();
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameState('result');
      setMessage(`Süre doldu! Toplam puan: ${score}`);
    }
  }, [gameState, timeLeft, score]);

  const handleAnswer = (isMatch: boolean) => {
    const wordColorName = currentWord;
    const actualColorClass = currentColor;
    const actualColorName = colors.find((c) => c.value === actualColorClass)?.name || '';

    const correct = (wordColorName === actualColorName) === isMatch;

    if (correct) {
      setScore((s) => s + 10);
      setMessage('Doğru!');
    } else {
      setMessage('Yanlış!');
    }

    setRound((r) => r + 1);
    setTimeout(() => {
      setMessage('');
      generateQuestion();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-slate-800/80 backdrop-blur-xl rounded-[40px] p-1 border border-slate-700 shadow-2xl">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-[36px] p-8 relative overflow-hidden">
          <button
            onClick={() => navigate('/focus')}
            className="absolute top-6 left-6 w-12 h-12 bg-red-600/90 hover:bg-red-500/90 rounded-full flex items-center justify-center text-white font-black text-xl transition-all z-10 shadow-lg"
          >
            ✕
          </button>

          <div className="absolute top-6 right-6 bg-slate-800/80 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20">
            <p className="text-white/90 text-sm font-bold">
              Süre: {timeLeft}s | Puan: {score}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[600px] text-white pt-12">
            <div className="text-center mb-8">
              <h3 className="font-black tracking-widest text-xs uppercase mb-2 opacity-80">
                RENK ODAĞI
              </h3>
              <p className="text-xl font-bold">Kelime ve renk eşleşiyor mu?</p>
            </div>

            {gameState === 'idle' && (
              <button
                onClick={startGame}
                className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
              >
                OYUNU BAŞLAT
              </button>
            )}

            {gameState === 'playing' && (
              <div className="text-center space-y-8">
                <div className={`text-7xl font-black ${currentColor}`}>{currentWord}</div>
                {message && <p className="text-2xl font-bold">{message}</p>}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="bg-green-500 text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
                  >
                    EVET
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="bg-red-500 text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
                  >
                    HAYIR
                  </button>
                </div>
              </div>
            )}

            {gameState === 'result' && (
              <div className="text-center animate-in zoom-in duration-300">
                <p className="text-3xl font-black mb-4">{message}</p>
                <button
                  onClick={startGame}
                  className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
                >
                  YENİ OYUN 🔄
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

}
