import React, { useState } from 'react';

const IDIOMS = [
  {
    idiom: 'Kulağına küpe olmak',
    meaning: 'Söyleneni iyi dinlemek ve unutmamak',
    example: 'Söylediklerim kulağına küpe olsun!',
  },
  {
    idiom: 'Gözden düşmek',
    meaning: 'Değer kaybetmek, saygınlığını yitirmek',
    example: 'Yaptığı hatadan sonra gözden düştü.',
  },
  {
    idiom: 'Etekleri zil çalmak',
    meaning: 'Çok sevinmek',
    example: 'Haberi duyunca etekleri zil çaldı.',
  },
  {
    idiom: 'Ağzı kulaklarına varmak',
    meaning: 'Çok mutlu olmak',
    example: 'Hediyeyi görünce ağzı kulaklarına vardı.',
  },
  {
    idiom: 'Burnundan kıl aldırmamak',
    meaning: 'Çok kibirli olmak',
    example: 'Burnundan kıl aldırmaz, çok gururlu.',
  },
  { idiom: 'Dili tutulmak', meaning: 'Konuşamamak, şaşırmak', example: 'Korkudan dili tutuldu.' },
  { idiom: 'Eli açık olmak', meaning: 'Cömert olmak', example: 'Çok eli açık bir insandır.' },
  {
    idiom: 'Göz göre göre',
    meaning: 'Bilerek, farkında olarak',
    example: 'Göz göre göre hata yaptı.',
  },
  { idiom: 'İçi yanmak', meaning: 'Çok üzülmek', example: 'Onun durumuna içi yandı.' },
  { idiom: 'Yüzü gülmek', meaning: 'Mutlu olmak, sevinmek', example: 'Başarısıyla yüzü güldü.' },
];

interface Props {
  onExit: () => void;
}

const LanguageIdioms: React.FC<Props> = ({ onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const current = IDIOMS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % IDIOMS.length);
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
          <h2 className="text-3xl md:text-5xl font-black text-white">DEYİMLER</h2>
          <div className="w-24"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/20 mb-6">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">💭</div>
            <h3 className="text-3xl md:text-4xl font-black text-purple-400 mb-4">
              "{current.idiom}"
            </h3>
          </div>

          {showMeaning ? (
            <div className="animate-in fade-in zoom-in duration-500 space-y-4">
              <div className="bg-purple-500/20 border-2 border-purple-500 p-6 rounded-2xl">
                <h4 className="text-purple-400 font-bold mb-2">📖 Anlamı:</h4>
                <p className="text-xl text-white/90">{current.meaning}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl">
                <h4 className="text-cyan-400 font-bold mb-2">💡 Örnek Kullanım:</h4>
                <p className="text-lg italic text-white/80">"{current.example}"</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowMeaning(true)}
              className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 py-4 rounded-xl font-black text-xl hover:scale-105 transition-all"
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
            SONRAKİ DEYİM ➡️
          </button>
        )}

        <div className="flex justify-center gap-2 mt-6">
          {IDIOMS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? 'w-8 bg-purple-400' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageIdioms;
