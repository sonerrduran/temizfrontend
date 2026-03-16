import React, { useState } from 'react';

const SYNONYMS = [
  {
    word: 'güzel',
    synonyms: ['hoş', 'zarif', 'şirin', 'sevimli'],
    example: 'Çok güzel bir manzara.',
  },
  { word: 'hızlı', synonyms: ['süratli', 'çabuk', 'seri'], example: 'Hızlı koşuyor.' },
  { word: 'akıl', synonyms: ['zeka', 'us', 'idrak'], example: 'Akıl sağlığı önemlidir.' },
  { word: 'cevap', synonyms: ['yanıt', 'karşılık'], example: 'Soruya cevap verdi.' },
  { word: 'görev', synonyms: ['vazife', 'iş', 'ödev'], example: 'Görevini tamamladı.' },
  { word: 'kalp', synonyms: ['yürek', 'gönül'], example: 'Kalbi çok temiz.' },
  { word: 'zengin', synonyms: ['varlıklı', 'varsıl', 'müreffeh'], example: 'Zengin bir aile.' },
  { word: 'mutlu', synonyms: ['mesut', 'bahtiyar', 'sevinçli'], example: 'Çok mutlu bir gün.' },
  { word: 'üzgün', synonyms: ['kederli', 'mahzun', 'hüzünlü'], example: 'Üzgün görünüyor.' },
  { word: 'cesur', synonyms: ['yiğit', 'gözüpek', 'kahraman'], example: 'Cesur bir asker.' },
];

interface Props {
  onExit: () => void;
}

const LanguageSynonyms: React.FC<Props> = ({ onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSynonyms, setShowSynonyms] = useState(false);

  const current = SYNONYMS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % SYNONYMS.length);
    setShowSynonyms(false);
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
          <h2 className="text-3xl md:text-5xl font-black text-white">EŞ ANLAMLI KELİMELER</h2>
          <div className="w-24"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/20 mb-6">
          <h3 className="text-6xl md:text-8xl font-black text-center mb-8 text-white">
            {current.word}
          </h3>

          {showSynonyms ? (
            <div className="animate-in fade-in zoom-in duration-500">
              <div className="bg-white/5 p-6 rounded-2xl mb-4">
                <h4 className="text-green-400 font-bold mb-4 text-center">Eş Anlamlıları:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {current.synonyms.map((syn, i) => (
                    <div
                      key={i}
                      className="bg-green-500/20 border-2 border-green-500 p-4 rounded-xl text-center font-bold text-xl"
                    >
                      {syn}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl">
                <h4 className="text-cyan-400 font-bold mb-2">💡 Örnek:</h4>
                <p className="text-lg italic text-white/80">"{current.example}"</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowSynonyms(true)}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 py-4 rounded-xl font-black text-xl hover:scale-105 transition-all"
            >
              EŞ ANLAMLILARI GÖR 🔄
            </button>
          )}
        </div>

        {showSynonyms && (
          <button
            onClick={handleNext}
            className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-xl font-bold transition-all"
          >
            SONRAKİ KELİME ➡️
          </button>
        )}

        <div className="flex justify-center gap-2 mt-6">
          {SYNONYMS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? 'w-8 bg-green-400' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSynonyms;
