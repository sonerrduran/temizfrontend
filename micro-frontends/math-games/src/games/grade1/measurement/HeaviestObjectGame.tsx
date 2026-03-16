import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const HeaviestObjectGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [objects, setObjects] = useState<
    { emoji: string; weight: number; id: number; name: string }[]
  >([]);
  const [correctId, setCorrectId] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const objectData = [
    { emoji: '🪶', name: 'Tüy', baseWeight: 1 },
    { emoji: '📄', name: 'Kağıt', baseWeight: 2 },
    { emoji: '✏️', name: 'Kalem', baseWeight: 3 },
    { emoji: '📱', name: 'Telefon', baseWeight: 5 },
    { emoji: '📚', name: 'Kitap', baseWeight: 7 },
    { emoji: '🎒', name: 'Çanta', baseWeight: 10 },
    { emoji: '🪨', name: 'Taş', baseWeight: 12 },
    { emoji: '🧱', name: 'Tuğla', baseWeight: 15 },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const numObjects = Math.min(3 + Math.floor(level / 2), 5);
    const shuffled = [...objectData].sort(() => Math.random() - 0.5).slice(0, numObjects);

    const newObjects = shuffled.map((obj, i) => ({
      emoji: obj.emoji,
      name: obj.name,
      weight: obj.baseWeight + Math.random() * 3,
      id: i,
    }));

    const heaviest = newObjects.reduce((max, obj) => (obj.weight > max.weight ? obj : max));
    setCorrectId(heaviest.id);
    setObjects(newObjects);
    setFeedback('');
  };

  const handleAnswer = (id: number) => {
    if (id === correctId) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Doğru! En ağır olanı buldun!');
      setShowCelebration(true);

      setTimeout(() => {
        setShowCelebration(false);
        if (level < 5) {
          setLevel(level + 1);
        } else {
          onComplete(score + points);
        }
      }, 2000);
    } else {
      setFeedback('❌ Yanlış! Daha ağır olanı bul.');
      setTimeout(() => {
        setFeedback('');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            ⚖️
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
              <span className="text-white font-black text-xl">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-yellow-500/90 backdrop-blur-xl rounded-xl border border-yellow-300/50">
              <span className="text-white font-black text-xl">⭐ {score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
            ⚖️ Hangisi Ağır? ⚖️
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300 font-bold">En ağır nesneyi seç!</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {objects.map((obj) => (
              <button
                key={obj.id}
                onClick={() => handleAnswer(obj.id)}
                className="bg-gradient-to-br from-gray-600 to-slate-700 hover:from-gray-500 hover:to-slate-600 rounded-2xl p-8 transition-all transform hover:scale-105 shadow-xl flex flex-col items-center justify-center gap-4"
              >
                <div className="text-8xl">{obj.emoji}</div>
                <div className="text-white text-xl font-bold">{obj.name}</div>
                <div className="bg-white/20 rounded-xl px-4 py-2">
                  <span className="text-white text-sm font-bold">{obj.weight.toFixed(1)} kg</span>
                </div>
              </button>
            ))}
          </div>

          {feedback && (
            <div
              className={`mt-8 text-center text-3xl font-black ${
                feedback.includes('Doğru') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-300/30">
          <h3 className="text-xl font-black text-cyan-300 mb-3">📋 Nasıl Oynanır?</h3>
          <ul className="text-white space-y-2">
            <li>• Nesnelerin ağırlıklarını karşılaştır</li>
            <li>• En ağır olanı seç</li>
            <li>• Kilogram (kg) değerlerine dikkat et!</li>
          </ul>
        </div>
      </div>

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">⚖️</div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HeaviestObjectGame;
