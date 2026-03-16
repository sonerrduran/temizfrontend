import React, { useState } from 'react';

const PROVERBS = [
  {
    proverb: 'Damlaya damlaya göl olur',
    meaning: 'Küçük birikimler zamanla büyük sonuçlar verir',
    lesson: 'Sabır ve azim',
  },
  {
    proverb: 'Sakla samanı gelir zamanı',
    meaning: 'Her şey bir gün işe yarayabilir',
    lesson: 'Tasarruf',
  },
  {
    proverb: 'Ne ekersen onu biçersin',
    meaning: 'Yaptığın işin sonucunu görürsün',
    lesson: 'Sorumluluk',
  },
  {
    proverb: 'Acele işe şeytan karışır',
    meaning: 'Aceleyle yapılan işler hatalı olur',
    lesson: 'Sabır',
  },
  { proverb: 'Ağaç yaşken eğilir', meaning: 'Eğitim küçük yaşta başlamalı', lesson: 'Eğitim' },
  {
    proverb: 'Dost kara günde belli olur',
    meaning: 'Gerçek dostlar zor zamanlarda ortaya çıkar',
    lesson: 'Dostluk',
  },
  {
    proverb: 'El elin eşeğini türkü çağırarak arar',
    meaning: 'Herkes kendi işini över',
    lesson: 'Öz eleştiri',
  },
  { proverb: 'Güneş balçıkla sıvanmaz', meaning: 'Gerçek gizlenemez', lesson: 'Dürüstlük' },
  {
    proverb: 'İşleyen demir pas tutmaz',
    meaning: 'Çalışan insan başarılı olur',
    lesson: 'Çalışkanlık',
  },
  {
    proverb: 'Yalancının mumu yatsıya kadar yanar',
    meaning: 'Yalan er geç ortaya çıkar',
    lesson: 'Doğruluk',
  },
];

interface Props {
  onExit: () => void;
}

const LanguageProverbs: React.FC<Props> = ({ onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const current = PROVERBS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % PROVERBS.length);
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
          <h2 className="text-3xl md:text-5xl font-black text-white">ATASÖZLER İ</h2>
          <div className="w-24"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/20 mb-6">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📜</div>
            <h3 className="text-2xl md:text-3xl font-black text-cyan-400 mb-4 italic">
              "{current.proverb}"
            </h3>
          </div>

          {showMeaning ? (
            <div className="animate-in fade-in zoom-in duration-500 space-y-4">
              <div className="bg-cyan-500/20 border-2 border-cyan-500 p-6 rounded-2xl">
                <h4 className="text-cyan-400 font-bold mb-2">📖 Anlamı:</h4>
                <p className="text-xl text-white/90">{current.meaning}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl">
                <h4 className="text-yellow-400 font-bold mb-2">💡 Öğrettiği Değer:</h4>
                <p className="text-lg font-bold text-white/90">{current.lesson}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowMeaning(true)}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-4 rounded-xl font-black text-xl hover:scale-105 transition-all"
            >
              ANLAMINI GÖR 🔍
            </button>
          )}
        </div>

        {showMeaning && (
          <button
            onClick={handleNext}
            className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-xl font-bold transition-all"
          >
            SONRAKİ ATASÖZÜ ➡️
          </button>
        )}

        <div className="flex justify-center gap-2 mt-6">
          {PROVERBS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageProverbs;
