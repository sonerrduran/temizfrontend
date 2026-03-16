import React, { useState, useEffect } from 'react';

type GameType = 'SIMILAR_WORDS' | 'ODD_EVEN' | 'WORD_SEARCH' | 'VISION_FIELD';

const WORD_PAIRS = [
  { a: 'kalem', b: 'kalem' },
  { a: 'çıta', b: 'çıta' },
  { a: 'mağaza', b: 'mağaza' },
  { a: 'sefalet', b: 'sefareti' },
  { a: 'tekrar', b: 'tekrar' },
  { a: 'nefes', b: 'nefes' },
  { a: 'uçurtma', b: 'uçuşma' },
  { a: 'sıkıcı', b: 'sıkıcı' },
  { a: 'maden', b: 'maden' },
  { a: 'plan', b: 'plan' },
  { a: 'balkan', b: 'balkan' },
  { a: 'yamuk', b: 'yamak' },
  { a: 'kader', b: 'kader' },
  { a: 'sincap', b: 'sincap' },
  { a: 'kazan', b: 'kızan' },
  { a: 'resim', b: 'resim' },
  { a: 'armatör', b: 'armatör' },
  { a: 'hareket', b: 'hareket' },
  { a: 'yanık', b: 'yanık' },
  { a: 'anket', b: 'anket' },
];

const VisualPerceptionGames: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [game, setGame] = useState<GameType>('SIMILAR_WORDS');
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [mismatches, setMismatches] = useState<number[]>([]);
  const [foundCount, setFoundCount] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  useEffect(() => {
    if (game === 'SIMILAR_WORDS') {
      const badOnes = WORD_PAIRS.map((p, i) => (p.a !== p.b ? i : -1)).filter((i) => i !== -1);
      setMismatches(badOnes);
      setFoundCount(0);
    }
  }, [game, isPlaying]);

  const handleWordClick = (idx: number) => {
    if (!isPlaying) return;
    if (mismatches.includes(idx)) {
      setScore((s) => s + 10);
      setMismatches((m) => m.filter((i) => i !== idx));
      setFoundCount((f) => f + 1);
    } else {
      setScore((s) => Math.max(0, s - 5));
    }
  };

  const renderOverlay = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-100/60 backdrop-blur-[2px] z-50 rounded-[32px]">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-slate-800 text-center max-w-lg border border-slate-200">
        <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-slate-600">
          BENZER KELİMELER
        </h3>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
          Bu egzersiz konsantrasyonunuzu ve beyin algılama hızınızı geliştirmeye yöneliktir. Kutucuk
          içerisinde iki kelime gösterilmektedir, bazı kutucuklarda bulunan kelimeler farklıdır.
          Farklı olan kelimeleri bulun!
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setIsPlaying(true);
              setTimer(60);
              setScore(0);
            }}
            className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-lg font-black uppercase text-sm transition-all shadow-lg"
          >
            Egzersizi Başlat
          </button>
          <button className="bg-slate-400 hover:bg-slate-500 text-white px-8 py-3 rounded-lg font-black uppercase text-sm transition-all">
            Ayarlar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen bg-slate-100 flex flex-col font-sans overflow-hidden">
      <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <button onClick={onExit} className="text-slate-400 hover:text-slate-600 font-black">
            ⬅
          </button>
          <h1 className="text-xl font-black text-slate-700 uppercase tracking-tight">
            BENZER KELİMELER
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <select
            value="1:00"
            className="bg-white border border-slate-300 rounded p-1 text-sm font-bold text-slate-600"
          >
            <option>1:00</option>
          </select>
          <select
            value="5 Kelime"
            className="bg-white border border-slate-300 rounded p-1 text-sm font-bold text-slate-600"
          >
            <option>5 Kelime</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-700 text-[#7bb] px-4 py-1 rounded font-bold text-sm uppercase">
            Kalan: {mismatches.length}
          </div>
          <div className="bg-sky-700 text-white px-4 py-1 rounded font-mono font-bold text-lg">
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white p-8 relative flex items-center justify-center overflow-auto">
        <div className="w-full max-w-3xl bg-[#f0f0f0] p-1 rounded-sm shadow-sm relative">
          {!isPlaying && renderOverlay()}

          <div className="bg-slate-700 text-slate-200 p-2 text-sm font-bold flex justify-between">
            <span>Aynı kutu içindeki farklı kelimeleri bul!</span>
          </div>

          <div className="grid grid-cols-4 gap-1 mt-1">
            {WORD_PAIRS.map((pair, i) => (
              <button
                key={i}
                onClick={() => handleWordClick(i)}
                className={`bg-white hover:bg-slate-50 p-4 flex flex-col items-center justify-center min-h-[100px] transition-all relative overflow-hidden ${!mismatches.includes(i) && isPlaying && WORD_PAIRS[i].a !== WORD_PAIRS[i].b ? 'opacity-40 grayscale pointer-events-none' : ''}`}
              >
                <span className="text-slate-600 font-medium text-lg leading-tight">{pair.a}</span>
                <span className="text-slate-600 font-medium text-lg leading-tight">{pair.b}</span>
                {!mismatches.includes(i) && isPlaying && WORD_PAIRS[i].a !== WORD_PAIRS[i].b && (
                  <div className="absolute inset-0 border-4 border-emerald-500/50 flex items-center justify-center">
                    <span className="text-emerald-600 font-black text-4xl">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualPerceptionGames;
