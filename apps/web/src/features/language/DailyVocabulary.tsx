import React, { useState } from 'react';

const VOCAB_DATA = [
  {
    word: 'Müstesna',
    meaning: 'İstisnai, eşsiz, benzersiz',
    example: 'Bu müstesna bir fırsat, kaçırmamalısın.',
    type: 'Sıfat',
  },
  {
    word: 'Mahcup',
    meaning: 'Utanmış, sıkılmış',
    example: 'Yaptığı hatadan dolayı mahcup oldu.',
    type: 'Sıfat',
  },
  {
    word: 'Müteakip',
    meaning: 'Sonraki, ardından gelen',
    example: 'Müteakip günlerde hava daha güzel olacak.',
    type: 'Sıfat',
  },
  {
    word: 'Müstakbel',
    meaning: 'Gelecekteki, ileride olacak',
    example: 'Müstakbel planlarımızı konuştuk.',
    type: 'Sıfat',
  },
  {
    word: 'Müteşekkir',
    meaning: 'Teşekkür eden, minnettar',
    example: 'Yardımınız için size müteşekkirim.',
    type: 'Sıfat',
  },
  {
    word: 'Müteessir',
    meaning: 'Etkilenmiş, duygulanmış',
    example: 'Hikayeden çok müteessir oldum.',
    type: 'Sıfat',
  },
  {
    word: 'Müstehcen',
    meaning: 'Ahlaka aykırı, uygunsuz',
    example: 'Müstehcen içerik yasaktır.',
    type: 'Sıfat',
  },
  {
    word: 'Mütevazilik',
    meaning: 'Alçakgönüllülük, tevazu',
    example: 'Mütevazilik en güzel erdemlerden biridir.',
    type: 'İsim',
  },
  {
    word: 'Müsamaha',
    meaning: 'Hoşgörü, tolerans',
    example: 'Herkese müsamaha göstermeliyiz.',
    type: 'İsim',
  },
  {
    word: 'Mütevazı',
    meaning: 'Alçakgönüllü, gösterişsiz',
    example: 'Çok başarılı ama mütevazı bir insandır.',
    type: 'Sıfat',
  },
  {
    word: 'Müphem',
    meaning: 'Belirsiz, anlaşılmaz',
    example: 'Verdiği cevap çok müphemdi.',
    type: 'Sıfat',
  },
  {
    word: 'Müstehzi',
    meaning: 'Alaycı, istihza eden',
    example: 'Müstehzi bir gülümsemeyle baktı.',
    type: 'Sıfat',
  },
  {
    word: 'Mütereddit',
    meaning: 'Kararsız, tereddütlü',
    example: 'Bu konuda hala müteredditim.',
    type: 'Sıfat',
  },
  {
    word: 'Müteessif',
    meaning: 'Üzgün, üzüntülü',
    example: 'Bu durumdan çok müteessifim.',
    type: 'Sıfat',
  },
  {
    word: 'Müstakil',
    meaning: 'Bağımsız, ayrı',
    example: 'Müstakil bir evde yaşıyorlar.',
    type: 'Sıfat',
  },
];

const DailyVocabulary: React.FC<{ onExit?: () => void }> = ({ onExit }) => {
  const [index, setIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const nextWord = () => {
    setIndex((index + 1) % VOCAB_DATA.length);
    setShowMeaning(false);
  };

  const current = VOCAB_DATA[index];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      {onExit && (
        <button
          onClick={onExit}
          className="absolute top-4 left-4 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl border border-white/10 transition-all font-bold"
        >
          ⬅ GERİ
        </button>
      )}
      <div className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden text-center">
        <h3 className="font-black tracking-widest text-[10px] uppercase mb-10 opacity-40">
          GÜNLÜK KELİME HAZNESİ
        </h3>

        <div className="animate-in fade-in zoom-in duration-500">
          <div className="mb-4">
            <span className="bg-indigo-500/20 text-indigo-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">
              {current.type}
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-8 italic text-white tracking-tighter uppercase">
            {current.word}
          </h2>

          <div
            className={`transition-all duration-700 overflow-hidden ${showMeaning ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 mb-8">
              <p className="text-2xl font-bold text-cyan-400 mb-4">{current.meaning}</p>
              <p className="text-lg italic text-white/60 font-medium leading-relaxed">
                "{current.example}"
              </p>
            </div>
          </div>

          {!showMeaning ? (
            <button
              onClick={() => setShowMeaning(true)}
              className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              ANLAMI GÖR 👀
            </button>
          ) : (
            <button
              onClick={nextWord}
              className="bg-indigo-600 hover:bg-indigo-500 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              SIRADAKİ KELİME ➡️
            </button>
          )}
        </div>

        <div className="mt-12 flex justify-center gap-2">
          {VOCAB_DATA.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-cyan-400 w-6' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyVocabulary;
