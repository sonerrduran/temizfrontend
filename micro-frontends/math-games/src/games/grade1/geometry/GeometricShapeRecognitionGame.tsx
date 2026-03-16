import React, { useState, useEffect } from 'react';

interface GeometricShapeRecognitionGameProps {
  onBack: () => void;
}

type ShapeType =
  | 'circle'
  | 'square'
  | 'triangle'
  | 'rectangle'
  | 'pentagon'
  | 'hexagon'
  | 'oval'
  | 'diamond';

interface ShapeQuestion {
  shape: ShapeType;
  name: string;
  options: string[];
  correctAnswer: string;
}

const SHAPE_DATA: Record<ShapeType, { name: string; emoji: string; description: string }> = {
  circle: { name: 'Daire', emoji: '🔵', description: 'Yuvarlak şekil' },
  square: { name: 'Kare', emoji: '🟦', description: '4 eşit kenar' },
  triangle: { name: 'Üçgen', emoji: '🔺', description: '3 köşe, 3 kenar' },
  rectangle: { name: 'Dikdörtgen', emoji: '🟩', description: '4 köşe, karşılıklı kenarlar eşit' },
  pentagon: { name: 'Beşgen', emoji: '⬟', description: '5 köşe, 5 kenar' },
  hexagon: { name: 'Altıgen', emoji: '⬡', description: '6 köşe, 6 kenar' },
  oval: { name: 'Oval', emoji: '🥚', description: 'Uzun yuvarlak' },
  diamond: { name: 'Baklava', emoji: '💎', description: 'Döndürülmüş kare' },
};

const GeometricShapeRecognitionGame: React.FC<GeometricShapeRecognitionGameProps> = ({
  onBack,
}) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(10);
  const [currentQuestion, setCurrentQuestion] = useState<ShapeQuestion | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showRules, setShowRules] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, [round]);

  const generateQuestion = () => {
    const shapes = Object.keys(SHAPE_DATA) as ShapeType[];
    const availableShapes = level >= 3 ? shapes : shapes.slice(0, 4 + level);

    const targetShape = availableShapes[Math.floor(Math.random() * availableShapes.length)];
    const correctName = SHAPE_DATA[targetShape].name;

    const wrongOptions = availableShapes
      .filter((s) => s !== targetShape)
      .map((s) => SHAPE_DATA[s].name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [correctName, ...wrongOptions].sort(() => Math.random() - 0.5);

    setCurrentQuestion({
      shape: targetShape,
      name: correctName,
      options: allOptions,
      correctAnswer: correctName,
    });
    setFeedback('');
  };

  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return;

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 10);
      setFeedback('✅ Doğru!');

      if (round % 5 === 0 && level < 5) {
        setLevel(level + 1);
      }
    } else {
      setFeedback(`❌ Yanlış! Doğrusu: ${currentQuestion.correctAnswer}`);
    }

    setTimeout(() => {
      if (round < totalRounds) {
        setRound(round + 1);
      } else {
        setShowCelebration(true);
      }
    }, 2000);
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
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-12 text-center border border-blue-500/30 max-w-2xl">
          <div className="text-8xl mb-6">🔷🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Harika!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Tüm şekilleri tanıdın!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 hover:from-blue-400 hover:to-cyan-500 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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
          <h1 className="text-white text-4xl md:text-5xl font-black">🔷 Geometrik Şekil Tanıma</h1>
          <p className="text-slate-400 text-lg mt-2">Şekilleri tanı ve eşleştir!</p>
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* İç Kart - Mavi Gradient */}
          <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowRules(true)}
                className="px-4 py-2 bg-blue-700/40 hover:bg-blue-600/40 border-2 border-blue-300 text-white rounded-xl font-bold transition-all transform hover:scale-105"
              >
                📖 NASIL OYNANIR?
              </button>
            </div>

            {currentQuestion && (
              <>
                {/* Shape Display */}
                <div className="bg-blue-700/40 rounded-2xl p-12 mb-8 border-2 border-blue-300 text-center">
                  <p className="text-white text-2xl font-bold mb-6">Bu şeklin adı nedir?</p>
                  <div className="text-9xl mb-4">{SHAPE_DATA[currentQuestion.shape].emoji}</div>
                  <p className="text-white/70 text-lg">
                    {SHAPE_DATA[currentQuestion.shape].description}
                  </p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      disabled={!!feedback}
                      className="bg-blue-700/40 hover:bg-blue-600/40 border-2 border-blue-300 rounded-2xl p-6 text-white text-2xl font-black transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {feedback && (
                  <div
                    className={`mt-6 text-center text-2xl font-black p-6 rounded-xl ${
                      feedback.includes('✅')
                        ? 'bg-green-500/90 border-2 border-green-300 text-white'
                        : 'bg-red-500/90 border-2 border-red-300 text-white'
                    }`}
                  >
                    {feedback}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Kurallar Overlay */}
      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-blue-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">🔷</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">1.</span> Ekranda bir geometrik şekil
                göreceksin
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">2.</span> Şeklin adını doğru seçeneği
                bularak söyle
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">3.</span> Doğru cevap verirsen puan
                kazanırsın
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">4.</span> 10 turu tamamla ve şekil uzmanı
                ol!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 hover:from-blue-400 hover:to-cyan-500 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeometricShapeRecognitionGame;
