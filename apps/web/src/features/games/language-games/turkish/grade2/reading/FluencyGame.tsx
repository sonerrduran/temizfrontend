import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const stories = [
  {
    id: 1,
    title: 'Küçük Kedi',
    text: 'Bahçede küçük bir kedi vardı. Kedi çok sevimli ve oyuncaktı. Her gün bahçede koşar ve oyunlar oynardı.',
    words: 18,
    difficulty: 'kolay',
  },
  {
    id: 2,
    title: 'Okul Yolu',
    text: 'Ali her sabah okula yürüyerek gider. Yolda arkadaşlarıyla karşılaşır. Birlikte okula giderler ve çok eğlenirler.',
    words: 16,
    difficulty: 'kolay',
  },
  {
    id: 3,
    title: 'Bahçede Oyun',
    text: 'Çocuklar bahçede top oynuyorlar. Hava çok güzel ve güneşli. Anneleri onlara meyve suyu getiriyor. Çok mutlular.',
    words: 17,
    difficulty: 'orta',
  },
];

const FluencyGame: React.FC = () => {
  const navigate = useNavigate();
  const [currentStory, setCurrentStory] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isReading) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isReading]);

  const handleStartReading = () => {
    setIsReading(true);
    setTimeElapsed(0);
  };

  const handleFinishReading = () => {
    setIsReading(false);
    const story = stories[currentStory];
    const wordsPerMinute = Math.round((story.words / timeElapsed) * 60);
    const points = Math.min(100, Math.max(0, wordsPerMinute * 2));
    setScore(score + points);
    setShowResult(true);
  };

  const handleNextStory = () => {
    if (currentStory < stories.length - 1) {
      setCurrentStory(currentStory + 1);
      setShowResult(false);
      setTimeElapsed(0);
    } else {
      navigate('/academic/turkish/grade2');
    }
  };

  const story = stories[currentStory];
  const wordsPerMinute = timeElapsed > 0 ? Math.round((story.words / timeElapsed) * 60) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/academic/turkish/grade2')}
            className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-bold hover:bg-white/30 transition-all"
          >
            ← Geri
          </button>
          <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white font-black">
            ⭐ {score}
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black text-blue-600 mb-2">Akıcı Okuma</h1>
            <p className="text-gray-600">Metni sesli olarak oku ve süreyi takip et</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">{story.title}</h2>
            <p className="text-xl leading-relaxed text-gray-800">{story.text}</p>
          </div>

          {!isReading && !showResult && (
            <button
              onClick={handleStartReading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-xl hover:scale-105 transition-all"
            >
              🎤 Okumaya Başla
            </button>
          )}

          {isReading && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl font-black text-blue-600 mb-2">
                  {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
                </div>
                <p className="text-gray-600">Geçen Süre</p>
              </div>
              <button
                onClick={handleFinishReading}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-xl hover:scale-105 transition-all"
              >
                ✓ Okumayı Bitir
              </button>
            </div>
          )}

          {showResult && (
            <div className="space-y-4">
              <div className="bg-green-100 rounded-2xl p-6 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">Harika!</h3>
                <p className="text-lg text-gray-700 mb-4">
                  Dakikada <span className="font-black text-green-600">{wordsPerMinute}</span> kelime okudun!
                </p>
                <div className="text-sm text-gray-600">
                  Toplam Süre: {timeElapsed} saniye | Kelime Sayısı: {story.words}
                </div>
              </div>
              <button
                onClick={handleNextStory}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-xl hover:scale-105 transition-all"
              >
                {currentStory < stories.length - 1 ? '→ Sonraki Metin' : '✓ Tamamla'}
              </button>
            </div>
          )}

          <div className="mt-6 flex justify-center gap-2">
            {stories.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === currentStory ? 'bg-blue-500' : idx < currentStory ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FluencyGame;
