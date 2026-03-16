import React from 'react';
import { GameCard } from '@egitim-galaksisi/ui';
import { GameMode } from '../../types';

interface MeasurementMenuProps {
  setMode: (mode: GameMode) => void;
}

const MeasurementMenu: React.FC<MeasurementMenuProps> = ({ setMode }) => {
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
          📚 Ölçüm & Eğitim
        </h2>
        <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
          Okuma hızını ölç, tekniklerini geliştir ve anlama seviyeni artır!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
        <GameCard
          title="Okuma Hızı Testi"
          icon="⏱️"
          color="bg-gradient-to-br from-indigo-500 to-blue-700"
          description="Hızını ve anlama seviyeni metinlerle test et!"
          onClick={() => setMode(GameMode.FAST_READING_SPEED_TEST)}
        />
        <GameCard
          title="Okuma Teknikleri"
          icon="📖"
          color="bg-gradient-to-br from-fuchsia-500 to-purple-700"
          description="İçten seslendirmeyi bırak, geriye dönüşleri engelle!"
          onClick={() => setMode(GameMode.FAST_READING_TECHNIQUES)}
        />
        <GameCard
          title="Hız & Anlama"
          icon="📊"
          color="bg-gradient-to-br from-blue-500 to-indigo-700"
          description="Hızlı okurken anlamayı geliştir!"
          onClick={() => setMode(GameMode.FAST_READING_SPEED_COMPREHENSION)}
        />
        <GameCard
          title="Biyonik Okuma"
          icon="🔤"
          color="bg-gradient-to-br from-purple-500 to-pink-700"
          description="Kelimelerin ilk harflerini vurgulayarak oku!"
          onClick={() => setMode(GameMode.FAST_READING_BIONIC)}
        />
        <GameCard
          title="Ritmik Okuma"
          icon="🎵"
          color="bg-gradient-to-br from-cyan-500 to-blue-700"
          description="Belirli bir ritimde okuma pratiği yap!"
          onClick={() => setMode(GameMode.FAST_READING_RHYTHMIC)}
        />
        <GameCard
          title="Hızlı Okuma Öğretmeni"
          icon="👨‍🏫"
          color="bg-gradient-to-br from-green-500 to-emerald-700"
          description="Adım adım hızlı okuma teknikleri öğren!"
          onClick={() => setMode(GameMode.FAST_READING_TEACHER)}
        />
      </div>
    </div>
  );
};

export default MeasurementMenu;
