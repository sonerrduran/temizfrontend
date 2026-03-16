import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

interface Seat {
  name: string;
  row: number;
  col: number;
}

const LAYOUTS = [
  { label: '4×5 Klasik', rows: 5, cols: 4 },
  { label: '5×5 Kare', rows: 5, cols: 5 },
  { label: '3×6 Uzun', rows: 6, cols: 3 },
  { label: '6×4 Geniş', rows: 4, cols: 6 },
];

const SeatingChart: React.FC<Props> = ({ onExit }) => {
  const [layoutIdx, setLayoutIdx] = useState(0);
  const [seats, setSeats] = useState<(string | null)[][]>(() => {
    const l = LAYOUTS[0];
    return Array.from({ length: l.rows }, () => Array(l.cols).fill(null));
  });
  const [namesText, setNamesText] = useState(
    'Ahmet\nAyşe\nMehmet\nFatma\nAli\nVeli\nZeynep\nDeniz\nEfe\nEla\nBurak\nSelin\nCan\nNur\nEmre\nYağmur\nKaan\nEcrin\nBerk\nDefne'
  );
  const [editingSeat, setEditingSeat] = useState<{ r: number; c: number } | null>(null);

  const layout = LAYOUTS[layoutIdx];

  const changeLayout = (idx: number) => {
    setLayoutIdx(idx);
    const l = LAYOUTS[idx];
    setSeats(Array.from({ length: l.rows }, () => Array(l.cols).fill(null)));
  };

  const shuffleSeats = () => {
    const names = namesText
      .split('\n')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    // Shuffle
    for (let i = names.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [names[i], names[j]] = [names[j], names[i]];
    }
    const newSeats = Array.from({ length: layout.rows }, () => Array(layout.cols).fill(null));
    let idx = 0;
    for (let r = 0; r < layout.rows && idx < names.length; r++) {
      for (let c = 0; c < layout.cols && idx < names.length; c++) {
        newSeats[r][c] = names[idx++];
      }
    }
    setSeats(newSeats);
  };

  const clearSeat = (r: number, c: number) => {
    setSeats((prev) =>
      prev.map((row, ri) => row.map((s, ci) => (ri === r && ci === c ? null : s)))
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-4 relative">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onExit}
          className="px-6 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700 font-bold"
        >
          <span>⬅</span> Çıkış
        </button>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-xl p-6 md:p-8 rounded-[40px] shadow-2xl border border-white/10 w-full max-w-5xl">
        <h2 className="text-3xl font-black text-blue-400 italic text-center mb-6">Oturma Düzeni</h2>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {LAYOUTS.map((l, i) => (
            <button
              key={i}
              onClick={() => changeLayout(i)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${layoutIdx === i ? 'bg-blue-500 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={shuffleSeats}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-black text-sm shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            🔀 Karıştır
          </button>
        </div>

        {/* Board - Tahta */}
        <div className="bg-emerald-600 rounded-xl py-2 mb-6 text-center">
          <span className="text-white font-black text-sm uppercase tracking-widest">📋 TAHTA</span>
        </div>

        {/* Seat Grid */}
        <div className="flex flex-col items-center gap-2 mb-6">
          {seats.map((row, r) => (
            <div key={r} className="flex gap-2">
              {row.map((name, c) => (
                <button
                  key={c}
                  onClick={() => (name ? clearSeat(r, c) : null)}
                  className={`w-20 h-16 md:w-24 md:h-20 rounded-xl text-center flex flex-col items-center justify-center transition-all text-[10px] md:text-xs font-bold border ${
                    name
                      ? 'bg-blue-500/20 text-white border-blue-500/30 hover:bg-red-500/20 hover:border-red-500/30'
                      : 'bg-white/5 text-white/20 border-white/5'
                  }`}
                >
                  <span className="text-lg mb-0.5">{name ? '🪑' : '⬜'}</span>
                  <span className="truncate w-full px-1">{name || '—'}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Names Input */}
        <details className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <summary className="px-4 py-3 cursor-pointer text-white/60 text-sm font-bold hover:text-white transition-colors">
            📝 Öğrenci Listesi (düzenle)
          </summary>
          <div className="p-4 pt-0">
            <textarea
              value={namesText}
              onChange={(e) => setNamesText(e.target.value)}
              className="w-full h-32 bg-slate-950 text-white p-3 rounded-xl border border-white/10 focus:border-blue-500 outline-none resize-none font-medium text-sm"
              placeholder="İsimleri buraya yazın..."
            />
          </div>
        </details>
      </div>
    </div>
  );
};

export default SeatingChart;
