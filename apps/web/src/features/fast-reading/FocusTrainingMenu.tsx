import React from 'react';
import { GameCard } from '@egitim-galaksisi/ui';
import { GameMode } from '../../types';

interface FocusTrainingMenuProps {
  setMode: (mode: GameMode) => void;
}

const FocusTrainingMenu: React.FC<FocusTrainingMenuProps> = ({ setMode }) => {
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
          🧠 Odak & Antrenman
        </h2>
        <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
          Göz kaslarını güçlendir, periferik görüşü geliştir ve beyin hızını artır!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
        <GameCard
          title="Göz Kasları"
          icon="👀"
          color="bg-gradient-to-br from-orange-500 to-red-600"
          description="Akar nokta takibi ile geniş görüş ve sıçrama!"
          onClick={() => setMode(GameMode.FAST_READING_EYE_TRACKING)}
        />
        <GameCard
          title="Periferik Görüş"
          icon="🎯"
          color="bg-gradient-to-br from-cyan-500 to-blue-600"
          description="Merkeze bakarken yanlardaki kelimeleri algıla!"
          onClick={() => setMode(GameMode.FAST_READING_PERIPHERAL)}
        />
        <GameCard
          title="Beyin Hızı Egzersizleri"
          icon="🎮"
          color="bg-gradient-to-br from-pink-500 to-rose-600"
          description="Kelime yakalama ve görsel algı oyunları!"
          onClick={() => setMode(GameMode.FAST_READING_BRAIN_GAMES)}
        />
        <GameCard
          title="İleri Seviye Göz Egzersizleri"
          icon="👁️‍🗨️"
          color="bg-gradient-to-br from-purple-500 to-indigo-700"
          description="Profesyonel göz kasları antrenmanı!"
          onClick={() => setMode(GameMode.FAST_READING_ADVANCED_EYE)}
        />
        <GameCard
          title="Taşistoskop"
          icon="⚡"
          color="bg-gradient-to-br from-yellow-500 to-orange-700"
          description="Anlık görsel algı ve hız egzersizi!"
          onClick={() => setMode(GameMode.FAST_READING_TACHISTOSCOPE)}
        />
        <GameCard
          title="Görsel Algı Oyunları"
          icon="🎨"
          color="bg-gradient-to-br from-green-500 to-emerald-700"
          description="Eğlenceli görsel algı ve dikkat oyunları!"
          onClick={() => setMode(GameMode.FAST_READING_VISUAL_PERCEPTION)}
        />
        <GameCard
          title="Kelime Yakalama"
          icon="🎯"
          color="bg-gradient-to-br from-blue-500 to-cyan-700"
          description="Hızlı hareket eden kelimeleri yakala!"
          onClick={() => setMode(GameMode.FAST_READING_CATCH_WORD)}
        />
        <GameCard
          title="Flaş Hafıza"
          icon="💡"
          color="bg-gradient-to-br from-red-500 to-pink-700"
          description="Anlık görsel hafıza geliştirme!"
          onClick={() => setMode(GameMode.FAST_READING_FLASH_MEMORY)}
        />
      </div>
    </div>
  );
};

export default FocusTrainingMenu;
