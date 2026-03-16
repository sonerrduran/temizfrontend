import React from 'react';
import { GameCard } from '@egitim-galaksisi/ui';
import { GameMode, UserStats } from '../../types';

interface LearningMenuProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const LearningMenu: React.FC<LearningMenuProps> = ({ stats, setMode }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-2 bounce-in relative z-20">
      <div className="text-center mb-12">
        <button
          onClick={() => setMode(GameMode.HOME)}
          className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
        >
          ⬅ ANA MENÜYE DÖN
        </button>
        <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
          Hızlı Öğrenme Üssü
        </h2>
        <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
          Öğrenme tekniklerini keşfet, hafızanı güçlendir ve bilgiyi daha hızlı işle!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
        <GameCard
          title="Hızlı Anlama"
          icon="📖"
          color="bg-gradient-to-br from-indigo-500 to-blue-700"
          description="Metinleri saniyeler içinde tara ve ana fikri yakala."
          onClick={() => setMode(GameMode.LEARNING_COMPREHENSION)}
        />
        <GameCard
          title="SRS Ezber Kartları"
          icon="🃏"
          color="bg-gradient-to-br from-purple-500 to-indigo-600"
          description="Aralıklı tekrar sistemi ile kalıcı öğrenme sağla."
          onClick={() => setMode(GameMode.LEARNING_FLASHCARD)}
        />
        <GameCard
          title="Yeniden İfade Et"
          icon="✍️"
          color="bg-gradient-to-br from-emerald-500 to-teal-700"
          description="Okuduğun metni kendi kelimelerinle özetle."
          onClick={() => setMode(GameMode.LEARNING_PARAPHRASE)}
        />
        <GameCard
          title="Hafıza Haritası"
          icon="🗺️"
          color="bg-gradient-to-br from-orange-400 to-orange-600"
          description="Kavramlar arası bağ kurarak bütünü gör."
          onClick={() => setMode(GameMode.MEMORY_MIND_MAP)}
        />
        <GameCard
          title="Mnemonik Eğitim"
          icon="🧩"
          color="bg-gradient-to-br from-fuchsia-500 to-pink-600"
          description="Şifreleme teknikleri ile ezberlemeyi kolaylaştır."
          onClick={() => setMode(GameMode.MEMORY_MNEMONIC)}
        />
      </div>
    </div>
  );
};

export default LearningMenu;
