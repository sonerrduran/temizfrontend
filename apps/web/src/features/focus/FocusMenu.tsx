import React from 'react';
import { GameCard } from '@egitim-galaksisi/ui';
import { GameMode, UserStats } from '../../types';

interface FocusMenuProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const FocusMenu: React.FC<FocusMenuProps> = ({ stats, setMode }) => {
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
          Konsantrasyon Merkezi
        </h2>
        <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
          Zihnini sakinleştir, odaklanmanı geliştir ve dikkatini tek bir noktada toplamayı öğren!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
        <GameCard
          title="Pomodoro Görev"
          icon="⏳"
          color="from-rose-500 to-red-600"
          description="25+5 kuralı ile derslerini odaklanarak bitir."
          onClick={() => setMode(GameMode.FOCUS_POMODORO)}
        />
        <GameCard
          title="Dikkat Takibi"
          icon="🎯"
          color="from-cyan-500 to-blue-600"
          description="Hareket eden objeleri gözden kaçırma."
          onClick={() => setMode(GameMode.FOCUS_ATTENTION)}
        />
        <GameCard
          title="Odak Noktası"
          icon="🔘"
          color="from-indigo-500 to-indigo-700"
          description="Merkezdeki noktaya bakarak dikkat süreni artır."
          onClick={() => setMode(GameMode.FAST_READING_FOCUS)}
        />
        <GameCard
          title="Hafıza Kartları"
          icon="🃏"
          color="from-purple-500 to-pink-600"
          description="Eşleşen kartları bul, hafızanı güçlendir."
          onClick={() => setMode(GameMode.FOCUS_MEMORY_CARDS)}
        />
        <GameCard
          title="Renk Odağı"
          icon="🎨"
          color="from-orange-500 to-red-600"
          description="Renk ve kelime uyumunu hızlıca değerlendir."
          onClick={() => setMode(GameMode.FOCUS_COLOR_MATCH)}
        />
        <GameCard
          title="Sayı Dizisi"
          icon="🔢"
          color="from-green-500 to-emerald-600"
          description="Sayı dizilerini hatırla ve tekrarla."
          onClick={() => setMode(GameMode.FOCUS_NUMBER_SEQUENCE)}
        />
        <GameCard
          title="Nefes Egzersizi"
          icon="🌬️"
          color="from-teal-500 to-cyan-600"
          description="Derin nefes alarak zihnini sakinleştir."
          onClick={() => setMode(GameMode.FOCUS_BREATHING)}
        />
        <GameCard
          title="Labirent Çözücü"
          icon="🧩"
          color="from-violet-500 to-purple-600"
          description="Labirentten çıkış yolunu bul."
          onClick={() => setMode(GameMode.FOCUS_MAZE)}
        />
      </div>
    </div>
  );
};

export default FocusMenu;
