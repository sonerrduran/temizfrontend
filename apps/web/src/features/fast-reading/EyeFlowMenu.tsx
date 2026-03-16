import React from 'react';
import { GameCard } from '@egitim-galaksisi/ui';
import { GameMode } from '../../types';

interface EyeFlowMenuProps {
  setMode: (mode: GameMode) => void;
}

const EyeFlowMenu: React.FC<EyeFlowMenuProps> = ({ setMode }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-2 bounce-in relative z-20">
      <div className="text-center mb-12">
        <button
          onClick={() => setMode(GameMode.FAST_READING_MENU)}
          className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
        >
          ⬅ GERİ DÖN
        </button>
        <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
          👁️ Göz & Akış
        </h2>
        <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
          Kelime akışını hızlandır, gruplama yap ve satır takibini geliştir!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
        <GameCard
          title="Kelime Akışı"
          icon="⚡"
          color="bg-gradient-to-br from-purple-500 to-fuchsia-700"
          description="Ekranda belirip kaybolan kelimelerle refleksini güçlendir!"
          onClick={() => setMode(GameMode.FAST_READING_WORD_FLOW)}
        />
        <GameCard
          title="Kelime Gruplama"
          icon="🔠"
          color="bg-gradient-to-br from-emerald-500 to-teal-700"
          description="Kelimeleri bloklar halinde okuyarak sıçramaları azalt!"
          onClick={() => setMode(GameMode.FAST_READING_GROUPING)}
        />
        <GameCard
          title="Satır Takibi"
          icon="📏"
          color="bg-gradient-to-br from-sky-500 to-blue-600"
          description="Satırları kaybetmeden hızlıca takip etme pratiği!"
          onClick={() => setMode(GameMode.FAST_READING_LINE_TRACKING)}
        />
        <GameCard
          title="Sakkad Egzersizi"
          icon="↔️"
          color="bg-gradient-to-br from-blue-500 to-indigo-700"
          description="Göz sıçramalarını hızlandır ve kontrol et!"
          onClick={() => setMode(GameMode.FAST_READING_SACCADE)}
        />
        <GameCard
          title="Genişleyen Şekiller"
          icon="🔷"
          color="bg-gradient-to-br from-pink-500 to-rose-700"
          description="Görüş alanını genişlet ve odaklan!"
          onClick={() => setMode(GameMode.FAST_READING_EXPANDING)}
        />
        <GameCard
          title="Görsel Arama"
          icon="🔍"
          color="bg-gradient-to-br from-yellow-500 to-orange-700"
          description="Hızlı görsel tarama ve kelime bulma!"
          onClick={() => setMode(GameMode.FAST_READING_VISUAL_SEARCH)}
        />
      </div>
    </div>
  );
};

export default EyeFlowMenu;
