import React from 'react';
import { GameCard } from '@egitim-galaksisi/ui';
import { GameMode, UserStats } from '../../types';

interface BrainGamesMenuProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const BrainGamesMenu: React.FC<BrainGamesMenuProps> = ({ stats, setMode }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-2 bounce-in relative z-20">
      <div className="text-center mb-12">
        <button
          onClick={() => setMode(GameMode.FAST_READING_MENU)}
          className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
        >
          ⬅ HIZLI OKUMA MERKEZİNE DÖN
        </button>
        <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
          Beyin Hızı Egzersizleri
        </h2>
        <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
          Görsel hafızanı güçlendiren ve algılama hızını artıran oyunlar.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
        <GameCard
          title="Kelime Yakalama"
          icon="🏃"
          color="bg-gradient-to-br from-orange-500 to-red-600"
          description="Ekranda hızla kayan kelimeler arasından hedef kelimeyi bul."
          onClick={() => setMode(GameMode.FAST_READING_CATCH_WORD)}
        />

        <GameCard
          title="Hafıza Kartları (Flaş)"
          icon="🧠"
          color="bg-gradient-to-br from-indigo-500 to-purple-600"
          description="Ekranda çok kısa süre beliren kelimeleri hafızanda tut."
          onClick={() => setMode(GameMode.FAST_READING_FLASH_MEMORY)}
        />
      </div>
    </div>
  );
};

export default BrainGamesMenu;
