import React, { useState, useEffect, useRef } from 'react';

const Tachistoscope: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(100); // ms
  const [interval, setIntervalTime] = useState(2000); // ms
  const [type, setType] = useState<'WORD' | 'NUMBER' | 'SYMBOL'>('WORD');
  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(false);

  const WORDS = [
    'Güneş',
    'Kitap',
    'Bilgi',
    'Hız',
    'Zeka',
    'Odak',
    'Başarı',
    'Öğrenme',
    'Akıl',
    'Mantık',
    'Bilişim',
    'Sistem',
    'Gelişim',
    'Teknik',
    'Pratik',
  ];
  const SYMBOLS = ['◆', '▲', '●', '★', '■', '♣', '♠', '♥', '♦'];

  const generateContent = () => {
    if (type === 'WORD') return WORDS[Math.floor(Math.random() * WORDS.length)];
    if (type === 'NUMBER') return Math.floor(Math.random() * 9000 + 1000).toString();
    return Array(3)
      .fill(0)
      .map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
      .join(' ');
  };

  useEffect(() => {
    let flashTimer: any;
    let mainTimer: any;

    if (isPlaying) {
      mainTimer = setInterval(() => {
        setContent(generateContent());
        setVisible(true);
        flashTimer = setTimeout(() => {
          setVisible(false);
        }, duration);
      }, interval);
    }

    return () => {
      clearInterval(mainTimer);
      clearTimeout(flashTimer);
    };
  }, [isPlaying, duration, interval, type]);

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col font-sans overflow-hidden text-white">
      {/* Dark Professional Toolbar */}
      <div className="bg-slate-800 border-b border-white/10 px-8 py-4 flex items-center justify-between z-30 shadow-2xl">
        <div className="flex items-center gap-6">
          <button
            onClick={onExit}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all font-black text-white/50 hover:text-white"
          >
            ⬅
          </button>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter leading-none mb-1">
              Takistoskop
            </h1>
            <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">
              ANLIK ALGILAMA EGZERSİZİ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase mb-1">
              Görünme Süresi (ms)
            </span>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-32 accent-sky-500"
              />
              <span className="text-xs font-black w-10">{duration}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase mb-1">
              Tekrar Aralığı (sn)
            </span>
            <select
              value={interval}
              onChange={(e) => setIntervalTime(Number(e.target.value))}
              className="bg-slate-700 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-black outline-none"
            >
              <option value={1000}>1 Saniye</option>
              <option value={2000}>2 Saniye</option>
              <option value={3000}>3 Saniye</option>
            </select>
          </div>
          <div className="flex gap-1 h-10 bg-black/20 p-1 rounded-xl">
            {(['WORD', 'NUMBER', 'SYMBOL'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 rounded-lg text-[10px] font-black uppercase transition-all ${type === t ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {t === 'WORD' ? 'Kelime' : t === 'NUMBER' ? 'Sayı' : 'Sembol'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Flash Area */}
      <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1)_0%,transparent_70%)]" />

        {/* Visual Guide Lines */}
        <div className="absolute w-20 h-[1px] bg-white/10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-12" />
        <div className="absolute w-20 h-[1px] bg-white/10 left-1/2 -translate-x-1/2 top-1/2 translate-y-12" />

        <div
          className={`text-7xl md:text-9xl font-black tracking-tighter transition-opacity duration-75 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          {content}
        </div>

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-md z-40">
            <div className="text-center">
              <div className="w-24 h-24 bg-sky-500/20 rounded-[40px] flex items-center justify-center mx-auto mb-8 border border-sky-500/30 animate-pulse">
                <span className="text-5xl">⚡</span>
              </div>
              <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">
                Algılama Hızını Test Et
              </h2>
              <p className="text-slate-400 max-w-md mx-auto mb-10 text-sm font-medium">
                Kelimeler anlık olarak merkezde belirecektir. <br />
                Gözlerinizi çizgilerin ortasına odaklayın.
              </p>
              <button
                onClick={() => setIsPlaying(true)}
                className="bg-sky-500 hover:bg-sky-600 text-white px-16 py-5 rounded-[24px] font-black text-xl shadow-2xl hover:scale-105 transition-all active:scale-95"
              >
                BAŞLAT 🚀
              </button>
            </div>
          </div>
        )}

        {isPlaying && (
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute bottom-12 px-10 py-4 bg-white/5 hover:bg-rose-500/20 border border-white/10 text-white/40 hover:text-rose-400 rounded-2xl transition-all font-black text-xs uppercase tracking-widest"
          >
            Egzersizi Durdur ⏹️
          </button>
        )}
      </div>

      <div className="bg-slate-900 border-t border-white/5 p-4 text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
        M5 BİLİŞİM STİLİ TAKİSTOSKOP MODÜLÜ • V1.0
      </div>
    </div>
  );
};

export default Tachistoscope;
