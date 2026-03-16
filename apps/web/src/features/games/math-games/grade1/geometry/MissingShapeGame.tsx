import React, { useState, useEffect } from 'react';

interface MissingShapeGameProps {
  onBack: () => void;
}

type ShapeType = 'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'diamond';

const MissingShapeGame: React.FC<MissingShapeGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState<(ShapeType | null)[]>([]);
  const [options, setOptions] = useState<ShapeType[]>([]);
  const [missingIndex, setMissingIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const shapes: ShapeType[] = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond'];
  const shapeEmojis: Record<ShapeType, string> = {
    circle: '🔵',
    square: '🟦',
    triangle: '🔺',
    star: '⭐',
    heart: '❤️',
    diamond: '🔷',
  };

  useEffect(() => {
    generatePattern();
  }, [level]);

  const generatePattern = () => {
    const patternLength = Math.min(4 + level, 8);
    const selectedShapes = [...shapes].sort(() => Math.random() - 0.5).slice(0, 3);

    const newPattern: ShapeType[] = [];
    for (let i = 0; i < patternLength; i++) {
      newPattern.push(selectedShapes[i % selectedShapes.length]);
    }

    const missing = Math.floor(Math.random() * patternLength);
    const correctAnswer = newPattern[missing];

    const wrongOptions = shapes
      .filter((s) => s !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    const allOptions = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);

    const patternWithMissing = newPattern.map((s, i) => (i === missing ? null : s));

    setPattern(patternWithMissing);
    setMissingIndex(missing);
    setOptions(allOptions);
    setFeedback('');
  };

  const handleOptionClick = (shape: ShapeType) => {
    const correctShape = pattern.filter((s) => s !== null)[0];
    const fullPattern = [...pattern];

    let correct = false;
    if (missingIndex > 0 && pattern[missingIndex - 1]) {
      const prevShape = pattern[missingIndex - 1];
      const prevIndex = pattern.slice(0, missingIndex - 1).filter((s) => s === prevShape).length;
      const nextIndex = prevIndex + 1;

      const allOfType = pattern.filter((s) => s === prevShape);
      if (nextIndex < allOfType.length + 1) {
        correct = shape === prevShape;
      }
    }

    if (!correct && missingIndex < pattern.length - 1 && pattern[missingIndex + 1]) {
      correct = shape === pattern[missingIndex + 1];
    }

    if (correct) {
      setScore(score + 15);
      setFeedback('🎉 Doğru!');
      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
        } else {
          setShowCelebration(true);
        }
      }, 1500);
    } else {
      setFeedback('❌ Yanlış! Tekrar dene.');
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setShowCelebration(false);
    generatePattern();
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-12 text-center border border-orange-500/30 max-w-2xl">
          <div className="text-8xl mb-6">🧩🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Harika!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Tüm desenleri tamamladın!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-500 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
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
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all transform hover:scale-105"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">🧩 Eksik Şekil</h1>
          <p className="text-slate-400 text-lg mt-2">Eksik olan parçayı tamamla!</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowRules(true)}
                className="px-4 py-2 bg-orange-700/40 hover:bg-orange-600/40 border-2 border-orange-300 text-white rounded-xl font-bold transition-all transform hover:scale-105"
              >
                📖 NASIL OYNANIR?
              </button>
            </div>

            <div className="bg-orange-700/40 rounded-2xl p-8 mb-6 border-2 border-orange-300">
              <h3 className="text-2xl font-black text-white text-center mb-6">Deseni Tamamla</h3>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {pattern.map((shape, idx) => (
                  <div
                    key={idx}
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center text-5xl ${
                      shape === null
                        ? 'bg-orange-800/40 border-4 border-dashed border-yellow-300'
                        : 'bg-orange-800/40 border-2 border-orange-300'
                    }`}
                  >
                    {shape ? shapeEmojis[shape] : '❓'}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-700/40 rounded-2xl p-6 border-2 border-orange-300">
              <h3 className="text-xl font-black text-white text-center mb-4">Seçenekler</h3>
              <div className="flex justify-center gap-4">
                {options.map((shape, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(shape)}
                    className="w-24 h-24 bg-orange-800/40 hover:bg-orange-700/40 border-2 border-orange-300 rounded-2xl text-6xl transition-all transform hover:scale-105"
                  >
                    {shapeEmojis[shape]}
                  </button>
                ))}
              </div>
            </div>

            {feedback && (
              <div
                className={`mt-6 text-center text-2xl font-black p-6 rounded-xl ${feedback.includes('🎉') ? 'bg-green-500/90 border-2 border-green-300 text-white' : 'bg-red-500/90 border-2 border-red-300 text-white'}`}
              >
                {feedback}
              </div>
            )}
          </div>
        </div>
      </div>

      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-orange-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">🧩</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold">1.</span> Şekil desenine bak ve eksik
                parçayı bul
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold">2.</span> Alttaki seçeneklerden doğru
                şekli seç
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold">3.</span> Deseni tamamla ve puan kazan
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold">4.</span> 5 seviyeyi tamamla!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-500 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissingShapeGame;
