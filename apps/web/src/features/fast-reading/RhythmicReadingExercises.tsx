import React, { useState, useEffect } from 'react';

type DrillMode = 'TAKISTOSKOP' | 'BLOCK' | 'SHADOW' | 'GROUP';

const RhythmicReadingExercises: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [mode, setMode] = useState<DrillMode>('TAKISTOSKOP');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [speed, setSpeed] = useState(300); // ms
  const [index, setIndex] = useState(0);

  const SAMPLE_TEXT =
    'Hızlı okuma teknikleri ile beyninizi daha verimli kullanabilir ve bilgiye ulaşma hızınızı artırabilirsiniz. Göz kaslarınızı güçlendirerek daha geniş alanları tek seferde görmeyi öğrenin.'.split(
      ' '
    );

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % SAMPLE_TEXT.length;
        if (mode === 'TAKISTOSKOP') setCurrentText(SAMPLE_TEXT[next]);
        else if (mode === 'BLOCK') setCurrentText(SAMPLE_TEXT.slice(next, next + 3).join(' '));
        return next;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [isPlaying, mode, speed]);

  return (
    <div className="w-full max-w-4xl mx-auto p-10 bg-slate-900 rounded-[50px] border border-white/10 text-white text-center shadow-2xl animate-in slide-in-from-bottom duration-500">
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={onExit}
          className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"
        >
          ⬅
        </button>
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">
          Ritmik Okuma Çalışmaları
        </h2>
        <div className="w-12" />
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {[
          { id: 'TAKISTOSKOP', label: 'Takistoskop', icon: '📸' },
          { id: 'BLOCK', label: 'Blok Okuma', icon: '🧊' },
          { id: 'SHADOW', label: 'Gölgeleme', icon: '🌓' },
          { id: 'GROUP', label: 'Gruplama', icon: '🔗' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setMode(m.id as DrillMode);
              setIsPlaying(false);
              setIndex(0);
              setCurrentText('');
            }}
            className={`px-6 py-4 rounded-3xl font-black text-xs uppercase border transition-all ${mode === m.id ? 'bg-indigo-600 border-white' : 'bg-white/5 border-white/10 hover:bg-white/20'}`}
          >
            <div className="text-2xl mb-1">{m.icon}</div>
            {m.label}
          </button>
        ))}
      </div>

      <div className="h-[400px] bg-black/40 rounded-[40px] border border-white/5 flex items-center justify-center p-12 relative overflow-hidden">
        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-xl hover:scale-110 transition-all shadow-2xl"
          >
            ÇALIŞMAYI BAŞLAT ⚡
          </button>
        ) : (
          <div className="animate-in fade-in duration-150">
            <div className="text-5xl font-black leading-tight tracking-tight text-white drop-shadow-md bg-indigo-500/10 p-12 rounded-[40px] border border-indigo-500/20">
              {currentText || '...'}
            </div>
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute bottom-6 right-6 p-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all font-black text-[10px] uppercase border border-red-500/10"
            >
              Durdur
            </button>
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-8 px-10">
        <div className="w-full md:w-64">
          <div className="flex justify-between mb-2 text-[10px] font-black opacity-40 uppercase tracking-widest">
            <span>Hız (Gecikme)</span>
            <span>{speed}ms</span>
          </div>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>
        <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-left flex-1">
          <p className="text-white/60 text-sm leading-relaxed italic">
            {mode === 'TAKISTOSKOP'
              ? 'Kelimeler çok kısa süre görünür. Kelimeyi okumaya değil, resim gibi algılamaya çalışın.'
              : mode === 'BLOCK'
                ? 'Gözünüzü satır üzerinde değil, bloklar arasında sıçratarak okuyun.'
                : 'Ritmik göz hareketleri ile metni takip edin.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RhythmicReadingExercises;
