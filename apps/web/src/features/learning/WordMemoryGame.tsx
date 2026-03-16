import React, { useState, useEffect } from 'react';

const WORD_LIST = [
  'Gezegen',
  'Yıldız',
  'Galaksi',
  'Teleskop',
  'Astronot',
  'Roket',
  'Uydu',
  'Krater',
  'Kuyruklu Yıldız',
  'Işık Yılı',
  'Mars',
  'Jüpiter',
  'Kara Delik',
  'Nebula',
  'Meteor',
];

const WordMemoryGame: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'memorizing' | 'guessing' | 'result'>('intro');
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [userSelection, setUserSelection] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [level, setLevel] = useState(1);

  const startLevel = () => {
    const wordCount = 3 + Math.floor(level / 2);
    const selected = [...WORD_LIST].sort(() => 0.5 - Math.random()).slice(0, wordCount);
    setCurrentWords(selected);

    // Options should include the selected words plus some distractors
    const distractors = WORD_LIST.filter((w) => !selected.includes(w))
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    setOptions([...selected, ...distractors].sort(() => 0.5 - Math.random()));

    setUserSelection([]);
    setStep('memorizing');

    setTimeout(() => {
      setStep('guessing');
    }, wordCount * 1500); // 1.5s per word
  };

  const handleSelect = (word: string) => {
    if (userSelection.includes(word)) return;
    const newSelection = [...userSelection, word];
    setUserSelection(newSelection);

    if (newSelection.length === currentWords.length) {
      const isCorrect = newSelection.every((val, index) => val === currentWords[index]);
      if (isCorrect) {
        setLevel((l) => l + 1);
        setStep('result');
      } else {
        setStep('result');
      }
    }
  };

  const isCorrect = userSelection.every((val, index) => val === currentWords[index]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-4 text-white">
      <div className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden text-center">
        {step === 'intro' && (
          <div className="animate-in zoom-in duration-500">
            <div className="text-4xl mb-6">🧠</div>
            <h2 className="text-3xl font-black mb-4 uppercase italic">Kelime Hafızası</h2>
            <p className="text-white/60 mb-10">
              Ekranda sırayla belirecek kelimeleri aklında tut ve sonra aynı sırayla seç!
            </p>
            <button
              onClick={startLevel}
              className="bg-indigo-600 hover:bg-indigo-500 px-12 py-5 rounded-2xl font-black text-xl shadow-xl transition-all active:scale-95"
            >
              BAŞLAT
            </button>
          </div>
        )}

        {step === 'memorizing' && (
          <div className="animate-in fade-in duration-300">
            <p className="text-xs font-black opacity-40 mb-10 uppercase tracking-widest">
              KELİMELERİ AKLINDA TUT
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {currentWords.map((word, i) => (
                <div
                  key={i}
                  className="bg-indigo-600 px-8 py-4 rounded-2xl font-black text-2xl shadow-xl animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'guessing' && (
          <div className="animate-in slide-in-from-bottom-10 duration-500">
            <p className="text-xs font-black opacity-40 mb-6 uppercase tracking-widest">
              SIRAYLA SEÇ ({userSelection.length} / {currentWords.length})
            </p>

            <div className="bg-white/5 p-6 rounded-2xl mb-8 flex flex-wrap justify-center gap-2 min-h-[60px]">
              {userSelection.map((word, i) => (
                <span
                  key={i}
                  className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg font-bold text-sm"
                >
                  {word}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  disabled={userSelection.includes(opt)}
                  className={`py-4 rounded-xl font-bold transition-all ${userSelection.includes(opt) ? 'opacity-20 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="animate-in zoom-in duration-500">
            <div className="text-5xl mb-6">{isCorrect ? '🌟' : '💡'}</div>
            <h2 className="text-4xl font-black mb-2 uppercase">
              {isCorrect ? 'MÜKEMMEL!' : 'NEREDEYSE...'}
            </h2>
            <p className="text-white/60 mb-10">
              {isCorrect
                ? `Seviye ${level - 1} tamamlandı! Zorluk artıyor.`
                : 'Sıralamada bir hata yaptın. Tekrar deneyelim mi?'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={startLevel}
                className="bg-indigo-600 hover:bg-indigo-500 px-10 py-4 rounded-2xl font-black transition-all shadow-xl"
              >
                {isCorrect ? 'SIRADAKİ SEVİYE' : 'TEKRAR DENE'}
              </button>
              <button
                onClick={() => {
                  setLevel(1);
                  setStep('intro');
                }}
                className="bg-white/10 hover:bg-white/20 px-10 py-4 rounded-2xl font-black transition-all border border-white/10"
              >
                MENÜYE DÖN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordMemoryGame;
