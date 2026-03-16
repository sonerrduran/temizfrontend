import React, { useState } from 'react';

const ANTONYMS = [
  { word: 'büyük', antonym: 'küçük', example1: 'Büyük bir ev.', example2: 'Küçük bir ev.' },
  { word: 'sıcak', antonym: 'soğuk', example1: 'Hava çok sıcak.', example2: 'Hava çok soğuk.' },
  { word: 'hızlı', antonym: 'yavaş', example1: 'Hızlı koşuyor.', example2: 'Yavaş yürüyor.' },
  { word: 'iyi', antonym: 'kötü', example1: 'İyi bir insan.', example2: 'Kötü bir davranış.' },
  { word: 'doğru', antonym: 'yanlış', example1: 'Doğru cevap.', example2: 'Yanlış cevap.' },
  { word: 'erken', antonym: 'geç', example1: 'Erken kalktı.', example2: 'Geç kaldı.' },
  { word: 'açık', antonym: 'kapalı', example1: 'Kapı açık.', example2: 'Kapı kapalı.' },
  { word: 'uzun', antonym: 'kısa', example1: 'Uzun saçlı.', example2: 'Kısa saçlı.' },
  { word: 'yeni', antonym: 'eski', example1: 'Yeni araba.', example2: 'Eski araba.' },
  { word: 'kolay', antonym: 'zor', example1: 'Kolay soru.', example2: 'Zor soru.' },
];

interface Props {
  onExit: () => void;
}

const LanguageAntonyms: React.FC<Props> = ({ onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAntonym, setShowAntonym] = useState(false);

  const current = ANTONYMS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % ANTONYMS.length);
    setShowAntonym(false);
  };

  return (
    <div className="min-h-screen text-white p-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-3xl md:text-5xl font-black text-white">ZIT ANLAMLI KELİMELER</h2>
          <div className="w-24"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-500/20 backdrop-blur-xl p-8 rounded-3xl border-2 border-blue-500">
            <div className="text-center">
              <div className="text-6xl font-black mb-4 text-blue-400">{current.word}</div>
              <p className="text-white/80 italic">"{current.example1}"</p>
            </div>
          </div>

          <div
            className={`backdrop-blur-xl p-8 rounded-3xl border-2 transition-all ${
              showAntonym ? 'bg-red-500/20 border-red-500' : 'bg-white/5 border-white/20'
            }`}
          >
            <div className="text-center">
              {showAntonym ? (
                <>
                  <div className="text-6xl font-black mb-4 text-red-400 animate-in zoom-in">
                    {current.antonym}
                  </div>
                  <p className="text-white/80 italic">"{current.example2}"</p>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-8xl">❓</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {!showAntonym ? (
          <button
            onClick={() => setShowAntonym(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 py-4 rounded-xl font-black text-xl hover:scale-105 transition-all"
          >
            ZIT ANLAMLISINI GÖR ⚖️
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-xl font-bold transition-all"
          >
            SONRAKİ KELİME ➡️
          </button>
        )}

        <div className="flex justify-center gap-2 mt-6">
          {ANTONYMS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? 'w-8 bg-orange-400' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageAntonyms;
