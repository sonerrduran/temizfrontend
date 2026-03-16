import React, { useState } from 'react';

const EXERCISES = [
  {
    title: 'Teknoloji ve İnsan',
    original:
      'Teknolojik aletlerin hayatımıza girmesiyle birlikte iletişim hızımız artsa da, yüz yüze kurulan gerçek bağlar zayıflamaya başladı.',
    acceptedKeywords: [
      'teknoloji',
      'iletişim',
      'zayıf',
      'sosyal',
      'insan',
      'hızlı',
      'azalmak',
      'gerçek',
    ],
  },
  {
    title: 'Doğa ve Çevre',
    original:
      'Doğal kaynakların hızla tükenmesi, gelecek nesillerin yaşam kalitesini ciddi şekilde tehdit eden küresel bir kriz haline geldi.',
    acceptedKeywords: ['doğa', 'tüketim', 'tehlike', 'gelecek', 'nesil', 'kriz', 'çevre', 'risk'],
  },
];

const ParaphraseExercise: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState<number | null>(null);

  const current = EXERCISES[index];

  const checkResult = () => {
    const words = userInput.toLowerCase().split(/\s+/);
    const matches = current.acceptedKeywords.filter((k) => words.some((w) => w.includes(k)));
    const percentage = (matches.length / current.acceptedKeywords.length) * 100;
    setScore(Math.round(percentage));
  };

  const nextTask = () => {
    setIndex((index + 1) % EXERCISES.length);
    setUserInput('');
    setScore(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-4 text-white">
      <div className="w-full max-w-4xl bg-slate-900/80 backdrop-blur-2xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl">
        <div className="text-center mb-10">
          <h3 className="font-black tracking-widest text-xs uppercase mb-2 opacity-40">
            YENİDEN İFADE ETME EGZERSİZİ
          </h3>
          <h2 className="text-3xl font-black">Okuduğunu Kendi Kelimelerinle Anlat</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 relative">
              <label className="absolute -top-3 left-6 bg-slate-900 px-3 text-[10px] font-black tracking-widest uppercase text-cyan-400">
                Orijinal Metin
              </label>
              <p className="text-lg md:text-xl font-medium leading-relaxed italic text-white/90">
                "{current.original}"
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative">
              <label className="absolute -top-3 left-6 bg-slate-900 px-3 text-[10px] font-black tracking-widest uppercase text-yellow-400">
                Senin Özetin
              </label>
              <textarea
                className="w-full h-[200px] bg-white/5 border border-white/10 rounded-[32px] p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all resize-none font-medium leading-relaxed"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Yukarıdaki cümleyi eş anlamlı kelimeler kullanarak yeniden yazın..."
              />
            </div>

            {score === null ? (
              <button
                onClick={checkResult}
                disabled={userInput.length < 10}
                className="w-full bg-white text-slate-900 py-5 rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ANALİZ ET 🔍
              </button>
            ) : (
              <div className="bg-white/5 p-6 rounded-[32px] text-center animate-in zoom-in">
                <p className="text-xs font-black opacity-40 uppercase tracking-widest mb-2">
                  Anlam Koruma Oranı
                </p>
                <div className="text-5xl font-black text-cyan-400 mb-6">%{score}</div>
                <button
                  onClick={nextTask}
                  className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-2xl font-black transition-all"
                >
                  SIRADAKİ GÖREV ➡️
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white/5 p-6 rounded-2xl border border-white/5">
          <p className="text-xs font-black opacity-40 uppercase tracking-widest mb-3">İPUCU ✨</p>
          <p className="text-sm text-white/60">
            Anlamı bozmadan sadece kelimeleri değiştirin veya cümleyi tersten kurmayı deneyin. Bu
            egzersiz beyin esnekliğinizi artırır.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParaphraseExercise;
