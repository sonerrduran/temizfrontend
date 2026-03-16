import React, { useState } from 'react';

const PROMPTS = [
  {
    title: 'Kayıp Galaksi',
    start:
      'Uzay gemimiz hiç bilmediğimiz mor renkli bir gezegene iniş yaptı. Kapağı açtığımda karşımda duran şey...',
  },
  {
    title: 'Zaman Gezgini',
    start:
      'Cebimdeki eski saatin kapağını çevirdiğimde aniden kendimi 100 yıl gelecekte buldum. İlk gördüğüm bina...',
  },
  {
    title: 'Gizemli Ada',
    start:
      'Denizin ortasında haritada görünmeyen bir ada keşfettik. Kıyıda bizi bekleyen devasa ayak izleri...',
  },
];

const StoryBuilder: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [story, setStory] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleNextPrompt = () => {
    setIndex((index + 1) % PROMPTS.length);
    setStory('');
    setShowPreview(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-4 text-white">
      <div className="w-full max-w-4xl bg-slate-900/80 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl">
        <div className="text-center mb-10">
          <h3 className="font-black tracking-widest text-xs uppercase mb-2 opacity-40">
            YARATICI YAZARLIK
          </h3>
          <h2 className="text-3xl font-black mb-2 uppercase italic">Hikaye Tamamlama</h2>
          <p className="text-white/60 text-sm">
            Verilen başlangıç cümlesinden yola çıkarak kendi maceranı oluştur.
          </p>
        </div>

        {!showPreview ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 relative">
              <label className="absolute -top-3 left-6 bg-slate-900 px-3 text-[10px] font-black tracking-widest uppercase text-cyan-400">
                Başlangıç
              </label>
              <p className="text-xl font-medium leading-relaxed italic text-white/90">
                "{PROMPTS[index].start}"
              </p>
            </div>

            <div className="relative">
              <label className="absolute -top-3 left-6 bg-slate-900 px-3 text-[10px] font-black tracking-widest uppercase text-yellow-400">
                Senin Devamın
              </label>
              <textarea
                className="w-full h-[250px] bg-white/5 border border-white/10 rounded-[32px] p-8 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all resize-none font-medium leading-relaxed"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Hikayeyi sürdür..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowPreview(true)}
                disabled={story.length < 20}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 disabled:opacity-30"
              >
                HİKAYEYİ TAMAMLA ✨
              </button>
              <button
                onClick={handleNextPrompt}
                className="bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl font-black transition-all border border-white/10"
              >
                DEĞİŞTİR 🔄
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in zoom-in duration-500 text-center">
            <div className="text-5xl mb-6">🖋️</div>
            <h3 className="text-2xl font-black mb-10 uppercase text-cyan-400">
              {PROMPTS[index].title}
            </h3>
            <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 text-left leading-relaxed text-xl mb-10 italic">
              <span className="opacity-50">{PROMPTS[index].start}</span> {story}
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              DÜZENLEMEYE DEVAM ET
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryBuilder;
