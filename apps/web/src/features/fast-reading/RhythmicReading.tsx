import React, { useState, useEffect, useRef } from 'react';

const RhythmicReading: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWpm] = useState(200);
  const [blockSize, setBlockSize] = useState(2); // 2-word, 3-word blocks
  const [currentIndex, setCurrentIndex] = useState(-1);

  const sampleText =
    'Hızlı okuma, göz kaslarımızı eğiterek ve zihinsel algı hızımızı artırarak kelimeleri tek tek değil, gruplar halinde okuma yeteneğidir. Bu teknik sayesinde bilgiler beynimize daha hızlı iletilir ve anlama kapasitemiz genişler. Düzenli pratik yaparak dakikada okuduğunuz kelime sayısını iki katına çıkarabilirsiniz.'.split(
      ' '
    );

  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (isPlaying) {
      const delay = (60 / wpm) * 1000 * blockSize;
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + blockSize;
          if (next >= sampleText.length) {
            setIsPlaying(false);
            return -1;
          }
          return next;
        });
      }, delay);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, wpm, blockSize]);

  return (
    <div className="w-full h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between z-30 shadow-sm">
        <div className="flex items-center gap-6">
          <button
            onClick={onExit}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all font-black"
          >
            ⬅
          </button>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter leading-none mb-1 text-emerald-700">
              Blok Okuma
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              RİTMİK GÖZ Sıçratma
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase mb-1">
              Okuma Hızı (WPM)
            </span>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="100"
                max="800"
                step="50"
                value={wpm}
                onChange={(e) => setWpm(Number(e.target.value))}
                className="w-32 accent-emerald-500"
              />
              <span className="text-xs font-black w-10 text-slate-600">{wpm}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase mb-1">Blok Boyutu</span>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              {[1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => setBlockSize(s)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${blockSize === s ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {s} Kelime
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setIsPlaying(!isPlaying);
            if (!isPlaying) setCurrentIndex(0);
          }}
          className={`px-8 py-3 rounded-2xl font-black uppercase text-sm shadow-xl transition-all active:scale-95 ${isPlaying ? 'bg-rose-500 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
        >
          {isPlaying ? 'DURDUR' : 'ÇALIŞMAYI BAŞLAT'}
        </button>
      </div>

      <div className="flex-1 p-12 flex items-center justify-center bg-slate-100/50">
        <div className="max-w-4xl w-full bg-white rounded-[40px] p-16 shadow-2xl border border-slate-200/50 relative">
          <div className="flex flex-wrap gap-x-3 gap-y-6 text-2xl md:text-3xl font-medium leading-[1.6] text-slate-300 transition-all">
            {sampleText.map((word, i) => {
              const isHighlighted = i >= currentIndex && i < currentIndex + blockSize;
              return (
                <span
                  key={i}
                  className={`transition-all duration-200 ${isHighlighted ? 'text-emerald-600 font-black scale-110 drop-shadow-md' : ''}`}
                >
                  {word}
                </span>
              );
            })}
          </div>

          {!isPlaying && currentIndex === -1 && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-[40px] flex items-center justify-center border-4 border-dashed border-emerald-500/20 m-4">
              <p className="text-emerald-800/40 font-black text-xl uppercase tracking-widest">
                METİN ALANI HAZIR
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-t border-slate-200 p-4 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
        M5 BİLİŞİM STİLİ BLOK OKUMA ÇALIŞMASI • V1.0
      </div>
    </div>
  );
};

export default RhythmicReading;
