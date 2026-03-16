import React from 'react';
import { GameCard } from '@egitim-galaksisi/ui';
import { GameMode, UserStats } from '../../types';

interface FastReadingMenuProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const FastReadingMenu: React.FC<FastReadingMenuProps> = ({ stats, setMode }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-2 bounce-in relative z-20">
      <div className="text-center mb-12">
        <button
          onClick={() => setMode(GameMode.HOME)}
          className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
        >
          ⬅ GERİ DÖN
        </button>
        <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
          Hızlı Okuma Merkezi
        </h2>
        <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
          Okuma hızını artır, göz kaslarını geliştir ve odaklanmayı öğren!
        </p>
        <div className="flex justify-center gap-3">
          <span className="bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-500/30">
            {stats.fastReadingWpm
              ? `WPM REKORU: ${stats.fastReadingWpm}`
              : 'HIZINI ŞİMDİ TEST ET! 🚀'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
        {/* Ölçüm & Eğitim */}
        <GameCard
          title="Ölçüm & Eğitim"
          icon="📚"
          color="bg-gradient-to-br from-indigo-500 to-blue-700"
          description="Okuma hızı testi, teknikler ve anlama egzersizleri"
          onClick={() => setMode(GameMode.FAST_READING_MEASUREMENT)}
        />

        {/* Göz & Akış */}
        <GameCard
          title="Göz & Akış"
          icon="👁️"
          color="bg-gradient-to-br from-emerald-500 to-teal-700"
          description="Kelime akışı, gruplama ve satır takibi"
          onClick={() => setMode(GameMode.FAST_READING_EYE_FLOW)}
        />

        {/* Odak & Antrenman */}
        <GameCard
          title="Odak & Antrenman"
          icon="🧠"
          color="bg-gradient-to-br from-orange-500 to-red-600"
          description="Göz kasları, periferik görüş ve beyin oyunları"
          onClick={() => setMode(GameMode.FAST_READING_FOCUS_TRAINING)}
        />
      </div>
    </div>
  );
};

export default FastReadingMenu;
