import React from 'react';
import { GameMode, UserStats } from '../../types';

interface FastReadingDashboardProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const FastReadingDashboard: React.FC<FastReadingDashboardProps> = ({ stats, setMode }) => {
  const wpm = stats.fastReadingWpm || 0;

  // Decide badge
  let badge = 'Okumaya Başla!';
  let badgeColor = 'text-slate-400';
  if (wpm >= 500) {
    badge = '🔥 500 WPM Kulübü (Hız Ustası)';
    badgeColor = 'text-rose-500';
  } else if (wpm >= 300) {
    badge = '⚡ Süper Okuyucu';
    badgeColor = 'text-orange-500';
  } else if (wpm >= 200) {
    badge = '🚀 Gelişen Okuyucu';
    badgeColor = 'text-emerald-500';
  } else if (wpm > 0) {
    badge = '🌱 Başlangıç';
    badgeColor = 'text-cyan-500';
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setMode(GameMode.FAST_READING_MENU)}
          className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-white italic">Okuma Analizleri</h2>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 p-8 rounded-3xl text-center shadow-lg">
            <h3 className="text-indigo-300 font-bold uppercase tracking-widest text-sm mb-4">
              En Yüksek WPM
            </h3>
            <div className="text-7xl font-black text-white mb-2">{wpm}</div>
            <p className="text-slate-400 font-medium">Kelime / Dakika</p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 p-8 rounded-3xl flex flex-col items-center justify-center shadow-lg">
            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-4">
              Mevcut Seviye & Rozet
            </h3>
            <div className={`text-2xl md:text-3xl font-black text-center ${badgeColor}`}>
              {badge}
            </div>
            {wpm < 500 && wpm > 0 && (
              <p className="text-slate-500 mt-4 text-sm font-medium">
                Sonraki rozet için {wpm < 200 ? 200 : wpm < 300 ? 300 : 500} WPM'e ulaş!
              </p>
            )}
          </div>
        </div>

        <div className="bg-black/30 p-6 rounded-3xl border border-white/5 space-y-4">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>📈</span> Gelişim Grafiği (Demo)
          </h3>
          <div className="h-40 flex items-end justify-between gap-2 px-2">
            {[120, 150, 180, 175, 210, 240, wpm || 100].map((val, i, arr) => {
              const max = Math.max(...arr, 500);
              const height = (val / max) * 100;
              return (
                <div
                  key={i}
                  className="w-full bg-slate-700 rounded-t-lg relative group transition-all hover:bg-indigo-500"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {val} WPM
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-500 px-2 mt-2">
            <span>Pzt</span>
            <span>Sal</span>
            <span>Çar</span>
            <span>Per</span>
            <span>Cum</span>
            <span>Cmt</span>
            <span>Bugün</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastReadingDashboard;
