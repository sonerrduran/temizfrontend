import React, { useState, useEffect } from 'react';

interface ShadowMatchGameProps {
  onBack: () => void;
}

type ShapeType = 'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'diamond';

const ShadowMatchGame: React.FC<ShadowMatchGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(10);
  const [targetShape, setTargetShape] = useState<ShapeType>('circle');
  const [shadowOptions, setShadowOptions] = useState<ShapeType[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    generateRound();
  }, []);

  const generateRound = () => {
    const shapes: ShapeType[] = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond'];
    const target = shapes[Math.floor(Math.random() * shapes.length)];

    const options = [target];
    while (options.length < 4) {
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      if (!options.includes(randomShape)) {
        options.push(randomShape);
      }
    }

    setTargetShape(target);
    setShadowOptions(options.sort(() => Math.random() - 0.5));
    setFeedback('');
  };

  const handleShadowClick = (shape: ShapeType) => {
    if (shape === targetShape) {
      setFeedback('✅ Doğru!');
      setScore(score + 10);

      setTimeout(() => {
        if (round < totalRounds) {
          setRound(round + 1);
          generateRound();
        } else {
          setShowCelebration(true);
        }
      }, 1500);
    } else {
      setFeedback('❌ Yanlış gölge!');
      setTimeout(() => setFeedback(''), 1000);
    }
  };

  const renderColoredShape = (shape: ShapeType) => {
    switch (shape) {
      case 'circle':
        return (
          <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-xl" />
        );
      case 'square':
        return (
          <div className="w-32 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl shadow-xl" />
        );
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '64px solid transparent',
              borderRight: '64px solid transparent',
              borderBottom: '120px solid #10B981',
              filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))',
            }}
          />
        );
      case 'star':
        return (
          <div className="text-9xl" style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }}>
            ⭐
          </div>
        );
      case 'heart':
        return (
          <div className="text-9xl" style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }}>
            ❤️
          </div>
        );
      case 'diamond':
        return (
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 transform rotate-45 rounded-lg shadow-xl" />
          </div>
        );
    }
  };

  const renderShadow = (shape: ShapeType) => {
    switch (shape) {
      case 'circle':
        return <div className="w-24 h-24 bg-black/80 rounded-full" />;
      case 'square':
        return <div className="w-24 h-24 bg-black/80 rounded-xl" />;
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '48px solid transparent',
              borderRight: '48px solid transparent',
              borderBottom: '90px solid rgba(0,0,0,0.8)',
            }}
          />
        );
      case 'star':
        return <div className="text-7xl opacity-80">⭐</div>;
      case 'heart':
        return <div className="text-7xl opacity-80">❤️</div>;
      case 'diamond':
        return (
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-black/80 transform rotate-45 rounded-lg" />
          </div>
        );
    }
  };

  const resetGame = () => {
    setScore(0);
    setRound(1);
    setShowCelebration(false);
    generateRound();
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-12 text-center border border-slate-500/30 max-w-2xl">
          <div className="text-8xl mb-6">🌑🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Mükemmel!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Tüm gölgeleri doğru eşleştirdin!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-gradient-to-br from-slate-500 via-gray-500 to-slate-600 hover:from-slate-400 hover:to-gray-500 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
            >
              Tekrar Oyna
            </button>
            <button
              onClick={onBack}
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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 rounded-xl text-white font-bold transition-all transform hover:scale-105"
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

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">🌑 Gölgeyi Bul</h1>
          <p className="text-slate-400 text-lg mt-2">Puan: {score}</p>
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* İç Kart - Gri/Slate Gradient */}
          <div className="bg-gradient-to-br from-slate-500 via-gray-500 to-slate-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowRules(true)}
                className="px-4 py-2 bg-slate-700/40 hover:bg-slate-600/40 border-2 border-slate-300 text-white rounded-xl font-bold transition-all transform hover:scale-105"
              >
                📖 NASIL OYNANIR?
              </button>
            </div>

            {/* Target Shape */}
            <div className="bg-slate-700/40 rounded-2xl p-8 mb-6 border-2 border-slate-300">
              <h3 className="text-2xl font-black text-white text-center mb-6">
                Bu Şeklin Gölgesini Bul
              </h3>
              <div className="flex justify-center items-center min-h-[150px]">
                {renderColoredShape(targetShape)}
              </div>
            </div>

            {/* Shadow Options */}
            <div className="bg-slate-700/40 rounded-2xl p-8 border-2 border-slate-300">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {shadowOptions.map((shape, index) => (
                  <button
                    key={index}
                    onClick={() => handleShadowClick(shape)}
                    disabled={!!feedback}
                    className="bg-slate-800/40 hover:bg-slate-700/40 border-2 border-slate-300 rounded-2xl p-8 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[140px]"
                  >
                    {renderShadow(shape)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`mt-6 text-center text-3xl font-black p-6 rounded-xl ${
              feedback.includes('✅')
                ? 'bg-green-500/90 border-2 border-green-300 text-white'
                : 'bg-red-500/90 border-2 border-red-300 text-white'
            }`}
          >
            {feedback}
          </div>
        )}
      </div>

      {/* Kurallar Overlay */}
      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-slate-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">🌑</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-slate-400 font-bold">1.</span> Yukarıda renkli bir şekil
                göreceksin
              </li>
              <li className="flex gap-2">
                <span className="text-slate-400 font-bold">2.</span> Alttaki gölgelerden doğru olanı
                bul
              </li>
              <li className="flex gap-2">
                <span className="text-slate-400 font-bold">3.</span> Doğru gölgeyi seçersen puan
                kazanırsın
              </li>
              <li className="flex gap-2">
                <span className="text-slate-400 font-bold">4.</span> Tüm turları tamamla ve kazanan
                sen ol!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-slate-500 via-gray-500 to-slate-600 hover:from-slate-400 hover:to-gray-500 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShadowMatchGame;
