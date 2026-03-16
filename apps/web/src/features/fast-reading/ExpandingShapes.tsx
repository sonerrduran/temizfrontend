import React, { useState, useEffect } from 'react';

const ExpandingShapes: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(3);
  const [shape, setShape] = useState<'CIRCLE' | 'SQUARE' | 'HEXAGON'>('CIRCLE');
  const [shapes, setShapes] = useState<{ id: number; size: number }[]>([]);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setShapes((prev) => {
          // Filter out shapes that reached 100% size
          const next = prev.map((s) => ({ ...s, size: s.size + 1 })).filter((s) => s.size <= 100);
          // Add a new shape at center every few frames
          if (prev.length === 0 || prev[prev.length - 1].size > 20 - speed * 2) {
            next.push({ id: Date.now(), size: 0 });
          }
          return next;
        });
      }, 30);
    } else {
      setShapes([]);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  return (
    <div className="w-full h-screen bg-white flex flex-col font-sans overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between z-30 shadow-sm">
        <div className="flex items-center gap-6">
          <button
            onClick={onExit}
            className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-500 hover:bg-slate-200"
          >
            ⬅
          </button>
          <div>
            <h1 className="text-xl font-black uppercase text-orange-600">Büyüyen Şekiller</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              AKTİF GÖRME ALANI EGZERSİZİ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase mb-1">
              Genişleme Hızı
            </span>
            <input
              type="range"
              min="1"
              max="8"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-32 accent-orange-500"
            />
          </div>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {(['CIRCLE', 'SQUARE', 'HEXAGON'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase transition-all ${shape === s ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {s === 'CIRCLE' ? 'Daire' : s === 'SQUARE' ? 'Kare' : 'Altıgen'}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-10 py-3 rounded-2xl font-black uppercase text-sm shadow-xl transition-all ${isPlaying ? 'bg-rose-500 text-white' : 'bg-orange-600 text-white'}`}
        >
          {isPlaying ? 'DURDUR' : 'BAŞLAT 🚀'}
        </button>
      </div>

      <div className="flex-1 relative flex items-center justify-center bg-slate-50 overflow-hidden">
        {/* Visual Center Point */}
        <div className="w-3 h-3 bg-red-500 rounded-full z-20 shadow-[0_0_15px_rgba(239,68,68,0.5)] border-2 border-white" />

        {/* Expanding Shapes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {shapes.map((s) => (
            <div
              key={s.id}
              className={`absolute border-2 border-orange-500/30 transition-all duration-75 ${shape === 'CIRCLE' ? 'rounded-full' : shape === 'HEXAGON' ? 'clip-hexagon' : ''}`}
              style={{
                width: `${s.size}%`,
                height: `${s.size}%`,
                opacity: 1 - s.size / 100,
              }}
            />
          ))}
        </div>

        {!isPlaying && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="text-center bg-white p-12 rounded-[48px] shadow-2xl border border-slate-200 max-w-lg">
              <h2 className="text-3xl font-black text-slate-700 mb-4 uppercase tracking-tighter">
                Görüş Alanını Genişlet
              </h2>
              <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">
                Kırmızı noktaya odaklanın ve başınızı oynatmadan kenarlara doğru genişleyen
                şekilleri takip edin. Periferik vizyonunuzu geliştirin.
              </p>
              <button
                onClick={() => setIsPlaying(true)}
                className="bg-orange-600 text-white px-12 py-4 rounded-2xl font-black uppercase text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                Egzersizi Başlat
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-slate-200 p-4 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
        M5 BİLİŞİM STİLİ PERİFERİK VİZYON MODÜLÜ • V1.0
      </div>
    </div>
  );
};

export default ExpandingShapes;
