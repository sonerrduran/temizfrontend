import React, { useState } from 'react';

const DAILY_WORDS = [
  {
    word: 'ev',
    meaning: 'İnsanların yaşadığı yapı',
    example: 'Evimiz çok güzel.',
    category: 'İsim',
  },
  {
    word: 'okul',
    meaning: 'Eğitim verilen yer',
    example: 'Okula her gün gidiyorum.',
    category: 'İsim',
  },
  {
    word: 'yemek',
    meaning: 'Beslenme için alınan gıda',
    example: 'Yemek çok lezzetli.',
    category: 'İsim',
  },
  {
    word: 'gitmek',
    meaning: 'Bir yerden başka bir yere hareket etmek',
    example: 'Parka gitmek istiyorum.',
    category: 'Fiil',
  },
  {
    word: 'gelmek',
    meaning: 'Bir yerden buraya doğru hareket etmek',
    example: 'Yarın bize gelecek.',
    category: 'Fiil',
  },
  {
    word: 'konuşmak',
    meaning: 'Söz söylemek, diyalog kurmak',
    example: 'Seninle konuşmak istiyorum.',
    category: 'Fiil',
  },
  { word: 'görmek', meaning: 'Gözle algılamak', example: 'Seni görmek güzel.', category: 'Fiil' },
  {
    word: 'yapmak',
    meaning: 'Bir işi gerçekleştirmek',
    example: 'Ödevimi yapmam gerek.',
    category: 'Fiil',
  },
  {
    word: 'almak',
    meaning: 'Bir şeyi edinmek',
    example: 'Marketten ekmek aldım.',
    category: 'Fiil',
  },
  {
    word: 'vermek',
    meaning: 'Bir şeyi başkasına teslim etmek',
    example: 'Ona hediye verdim.',
    category: 'Fiil',
  },
  { word: 'su', meaning: 'İçilen sıvı', example: 'Su içmek sağlıklıdır.', category: 'İsim' },
  { word: 'kitap', meaning: 'Yazılı eser', example: 'Kitap okumayı severim.', category: 'İsim' },
  { word: 'arkadaş', meaning: 'Dost, ahbap', example: 'En iyi arkadaşım o.', category: 'İsim' },
  { word: 'güzel', meaning: 'Hoş, beğenilen', example: 'Çok güzel bir gün.', category: 'Sıfat' },
  { word: 'büyük', meaning: 'Boyutu fazla olan', example: 'Büyük bir ev.', category: 'Sıfat' },
];

interface Props {
  onExit: () => void;
}

const LanguageDailyWords: React.FC<Props> = ({ onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const currentWord = DAILY_WORDS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % DAILY_WORDS.length);
    setShowMeaning(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((currentIndex - 1 + DAILY_WORDS.length) % DAILY_WORDS.length);
    setShowMeaning(false);
  };

  return (
    <div className="min-h-screen text-white p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-3xl md:text-5xl font-black text-white">GÜNLÜK KELİMELER</h2>
          <div className="w-24"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/20 mb-6">
          <div className="text-center mb-6">
            <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-bold">
              {currentWord.category}
            </span>
          </div>

          <h3 className="text-6xl md:text-8xl font-black text-center mb-8 text-white">
            {currentWord.word}
          </h3>

          {showMeaning && (
            <div className="animate-in fade-in zoom-in duration-500">
              <div className="bg-white/5 p-6 rounded-2xl mb-4">
                <h4 className="text-cyan-400 font-bold mb-2">📝 Anlam:</h4>
                <p className="text-xl text-white/90">{currentWord.meaning}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl">
                <h4 className="text-green-400 font-bold mb-2">💡 Örnek Cümle:</h4>
                <p className="text-lg italic text-white/80">"{currentWord.example}"</p>
              </div>
            </div>
          )}

          {!showMeaning && (
            <button
              onClick={() => setShowMeaning(true)}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 py-4 rounded-xl font-black text-xl hover:scale-105 transition-all"
            >
              ANLAMI GÖR 👀
            </button>
          )}
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={handlePrevious}
            className="flex-1 bg-white/10 hover:bg-white/20 py-4 rounded-xl font-bold transition-all"
          >
            ⬅️ ÖNCEKİ
          </button>
          <button
            onClick={handleNext}
            className="flex-1 bg-white/10 hover:bg-white/20 py-4 rounded-xl font-bold transition-all"
          >
            SONRAKİ ➡️
          </button>
        </div>

        <div className="flex justify-center gap-2">
          {DAILY_WORDS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? 'w-8 bg-blue-400' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageDailyWords;
