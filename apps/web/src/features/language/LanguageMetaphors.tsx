import React, { useState } from 'react';

const METAPHORS = [
  {
    phrase: 'Taş kalpli',
    literal: 'Taştan yapılmış kalp',
    metaphor: 'Duygusuz, acımasız',
    example: 'Çok taş kalpli biri, kimseye acımıyor.',
  },
  {
    phrase: 'Dil dökmek',
    literal: 'Dili dökmek',
    metaphor: 'Çok güzel konuşmak, iltifat etmek',
    example: 'Ona dil döküyor ama samimi değil.',
  },
  {
    phrase: 'İçi yanmak',
    literal: 'İçinin yanması',
    metaphor: 'Çok üzülmek',
    example: 'Onun durumuna içi yandı.',
  },
  {
    phrase: 'Gözü tok',
    literal: 'Gözü doymuş',
    metaphor: 'Kanaat eden, az şeyle yetinen',
    example: 'Gözü tok bir insandır, fazlasını istemez.',
  },
  {
    phrase: 'Eli açık',
    literal: 'Eli açık',
    metaphor: 'Cömert',
    example: 'Çok eli açık, herkese yardım eder.',
  },
  {
    phrase: 'Yüzü gülmek',
    literal: 'Yüzünün gülmesi',
    metaphor: 'Mutlu olmak',
    example: 'Başarısıyla yüzü güldü.',
  },
  {
    phrase: 'Ağzı sıkı',
    literal: 'Ağzı sıkı',
    metaphor: 'Sır saklayan',
    example: 'Ağzı sıkı biri, kimseye söylemez.',
  },
  {
    phrase: 'Kulağı kirişte',
    literal: 'Kulağı kirişte',
    metaphor: 'Dikkatli, uyanık',
    example: 'Her zaman kulağı kirişte, her şeyi duyar.',
  },
  {
    phrase: 'Gözü yükseklerde',
    literal: 'Gözü yüksekte',
    metaphor: 'Hırslı, iddialı',
    example: 'Gözü yükseklerde, büyük hedefleri var.',
  },
  {
    phrase: 'Eli ayağına dolaşmak',
    literal: 'Eli ayağına dolaşmak',
    metaphor: 'Telaşlanmak, şaşırmak',
    example: 'Heyecandan eli ayağına dolaştı.',
  },
];

interface Props {
  onExit: () => void;
}

const LanguageMetaphors: React.FC<Props> = ({ onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const current = METAPHORS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % METAPHORS.length);
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
          <h2 className="text-3xl md:text-5xl font-black text-white">MECAZ ANLAMLAR</h2>
          <div className="w-24"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/20 mb-6">
          <div className="text-center mb-8">
            <h3 className="text-4xl md:text-5xl font-black text-pink-400 mb-4">
              "{current.phrase}"
            </h3>
          </div>

          {showMeaning ? (
            <div className="animate-in fade-in zoom-in duration-500 space-y-4">
              <div className="bg-white/5 p-6 rounded-2xl">
                <h4 className="text-gray-400 font-bold mb-2">📝 Gerçek Anlam:</h4>
                <p className="text-lg text-white/70 line-through">{current.literal}</p>
              </div>
              <div className="bg-pink-500/20 border-2 border-pink-500 p-6 rounded-2xl">
                <h4 className="text-pink-400 font-bold mb-2">🎭 Mecaz Anlam:</h4>
                <p className="text-xl text-white/90 font-bold">{current.metaphor}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl">
                <h4 className="text-cyan-400 font-bold mb-2">💡 Örnek:</h4>
                <p className="text-lg italic text-white/80">"{current.example}"</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowMeaning(true)}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 py-4 rounded-xl font-black text-xl hover:scale-105 transition-all"
            >
              MECAZ ANLAMINI GÖR 🎭
            </button>
          )}
        </div>

        {showMeaning && (
          <button
            onClick={handleNext}
            className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-xl font-bold transition-all"
          >
            SONRAKİ İFADE ➡️
          </button>
        )}

        <div className="flex justify-center gap-2 mt-6">
          {METAPHORS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? 'w-8 bg-pink-400' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageMetaphors;
