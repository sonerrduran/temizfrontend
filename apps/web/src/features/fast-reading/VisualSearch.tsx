import React, { useState, useEffect } from 'react';

const VisualSearch: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState<'EASY' | 'HARD'>('EASY');
  const [grid, setGrid] = useState<string[][]>([]);
  const [target, setTarget] = useState('');
  const [foundCount, setFoundCount] = useState(0);
  const [timer, setTimer] = useState(60);

  const CHARS = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
  const WORDS = [
    'GÜNEŞ',
    'DENİZ',
    'KİTAP',
    'BİLGİ',
    'ODAK',
    'RADAR',
    'KEMER',
    'METAL',
    'KALAN',
    'DÜNYA',
  ];

  const generateGrid = () => {
    const size = 14;
    const newGrid = Array(size)
      .fill(0)
      .map(() =>
        Array(size)
          .fill(0)
          .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
      );

    const newTarget =
      difficulty === 'EASY'
        ? WORDS[Math.floor(Math.random() * WORDS.length)]
        : CHARS[Math.floor(Math.random() * CHARS.length)] +
          CHARS[Math.floor(Math.random() * CHARS.length)];

    setTarget(newTarget);

    // Place target term randomly 5-8 times
    const count = 5 + Math.floor(Math.random() * 4);
    for (let c = 0; c < count; c++) {
      const rx = Math.floor(Math.random() * (size - newTarget.length));
      const ry = Math.floor(Math.random() * size);
      for (let i = 0; i < newTarget.length; i++) {
        newGrid[ry][rx + i] = newTarget[i];
      }
    }
    setGrid(newGrid);
    setFoundCount(0);
  };

  useEffect(() => {
    if (isPlaying && timer > 0) {
      const t = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(t);
    } else if (timer === 0) {
      setIsPlaying(false);
    }
  }, [isPlaying, timer]);

  const handleCellClick = (r: number, c: number) => {
    if (!isPlaying) return;
    // Basic check for character match or start of word
    if (grid[r][c] === target[0]) {
      // Check if full word matches
      let match = true;
      for (let i = 0; i < target.length; i++) {
        if (grid[r][c + i] !== target[i]) match = false;
      }
      if (match) {
        setFoundCount((f) => f + 1);
        // Clear the match visually
        const nextGrid = [...grid];
        for (let i = 0; i < target.length; i++) nextGrid[r][c + i] = '✓';
        setGrid(nextGrid);
      }
    }
  };

  return (
    <div className="w-full h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between z-30 shadow-sm">
        <div className="flex items-center gap-6">
          <button
            onClick={onExit}
            className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-500 hover:bg-slate-200"
          >
            ⬅
          </button>
          <div>
            <h1 className="text-xl font-black uppercase text-indigo-600">Kelime Arama</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              GÖRSEL TARAMA EGZERSİZİ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="bg-indigo-50 border border-indigo-200 px-6 py-2 rounded-2xl">
            <span className="text-[10px] font-black text-indigo-400 uppercase block mb-1">
              Hedef Terim
            </span>
            <span className="text-2xl font-black text-indigo-700 tracking-widest">
              {target || '---'}
            </span>
          </div>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {(['EASY', 'HARD'] as const).map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDifficulty(d);
                  setIsPlaying(false);
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase transition-all ${difficulty === d ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {d === 'EASY' ? 'Kelime' : 'Harf Grubu'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">
              Bulunan
            </span>
            <span className="text-2xl font-black text-slate-700">{foundCount}</span>
          </div>
          <div className="bg-slate-800 text-white px-5 py-2 rounded-xl font-mono font-black text-xl shadow-lg border-b-4 border-slate-900">
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-200 p-8 flex items-center justify-center relative overflow-hidden">
        <div className="bg-white p-4 rounded-2xl shadow-2xl border-4 border-white grid grid-cols-14 gap-1">
          {grid.map((row, ri) =>
            row.map((cell, ci) => (
              <button
                key={`${ri}-${ci}`}
                onClick={() => handleCellClick(ri, ci)}
                className={`w-10 h-10 flex items-center justify-center font-black text-sm rounded transition-all ${cell === '✓' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-indigo-100'}`}
              >
                {cell}
              </button>
            ))
          )}
        </div>

        {!isPlaying && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md z-40 flex items-center justify-center">
            <div className="text-center bg-white p-12 rounded-[48px] shadow-2xl border border-slate-200 max-w-lg">
              <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl">
                🔍
              </div>
              <h2 className="text-3xl font-black text-slate-700 mb-4 uppercase tracking-tighter">
                Hızlıca Taramaya Başla
              </h2>
              <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">
                Karmaşık harf tablosu içinde yukarıda gösterilen hedef terimi bulun ve üzerine
                tıklayın. Gözlerinizin tarama hızını geliştirin.
              </p>
              <button
                onClick={() => {
                  setIsPlaying(true);
                  generateGrid();
                  setTimer(60);
                }}
                className="bg-indigo-600 text-white px-16 py-5 rounded-2xl font-black uppercase text-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                OYUNA BAŞLA
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualSearch;
