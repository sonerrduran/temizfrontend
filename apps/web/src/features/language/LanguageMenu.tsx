import React from 'react';
import { GameCard } from '@egitim-galaksisi/ui';
import { GameMode, UserStats } from '../../types';

interface LanguageMenuProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const LanguageMenu: React.FC<LanguageMenuProps> = ({ stats, setMode }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-2 bounce-in relative z-20">
      <div className="text-center mb-12">
        <button
          onClick={() => setMode(GameMode.HOME)}
          className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
        >
          ⬅ ANA MENÜYE DÖN
        </button>
        <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
          FİLOLOJİ & DİL ÜSSÜ
        </h2>
        <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
          Kelime hazneni zenginleştir, dil bilgisini geliştir ve Türkçe'nin inceliklerini keşfet!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
        <GameCard
          title="Günlük Kelimeler"
          icon="📖"
          color="bg-gradient-to-br from-blue-500 to-blue-700"
          description="Günlük konuşmada en sık kullanılan kelimeleri öğren."
          onClick={() => setMode(GameMode.LANGUAGE_DAILY_WORDS)}
        />
        <GameCard
          title="Eş Anlamlı Kelimeler"
          icon="🔄"
          color="bg-gradient-to-br from-green-500 to-emerald-700"
          description="Anlamı aynı veya yakın olan kelimeleri keşfet."
          onClick={() => setMode(GameMode.LANGUAGE_SYNONYMS)}
        />
        <GameCard
          title="Zıt Anlamlı Kelimeler"
          icon="⚖️"
          color="bg-gradient-to-br from-orange-500 to-red-700"
          description="Birbirinin tam tersi anlamlı kelimeleri öğren."
          onClick={() => setMode(GameMode.LANGUAGE_ANTONYMS)}
        />
        <GameCard
          title="Deyimler"
          icon="💬"
          color="bg-gradient-to-br from-purple-500 to-fuchsia-700"
          description="Türkçe'nin zengin deyimlerini ve anlamlarını öğren."
          onClick={() => setMode(GameMode.LANGUAGE_IDIOMS)}
        />
        <GameCard
          title="Atasözleri"
          icon="🎓"
          color="bg-gradient-to-br from-cyan-500 to-blue-700"
          description="Toplumun tecrübelerini anlatan atasözlerini keşfet."
          onClick={() => setMode(GameMode.LANGUAGE_PROVERBS)}
        />
        <GameCard
          title="Mecaz Anlamlar"
          icon="🎭"
          color="bg-gradient-to-br from-pink-500 to-rose-700"
          description="Kelimelerin gerçek anlamından farklı kullanımlarını öğren."
          onClick={() => setMode(GameMode.LANGUAGE_METAPHORS)}
        />
        <GameCard
          title="Kelime Oyunları"
          icon="🎮"
          color="bg-gradient-to-br from-amber-500 to-orange-700"
          description="Eğlenceli oyunlarla kelime dağarcığını geliştir."
          onClick={() => setMode(GameMode.LANGUAGE_WORD_GAME)}
        />
        <GameCard
          title="AI Kelime Testi"
          icon="🤖"
          color="bg-gradient-to-br from-indigo-500 to-purple-700"
          description="Yapay zeka ile interaktif kelime testleri çöz."
          onClick={() => setMode(GameMode.LANGUAGE_AI_QUIZ)}
        />
        <GameCard
          title="Diyalog Simülatörü"
          icon="💭"
          color="bg-gradient-to-br from-rose-500 to-pink-700"
          description="Gerçek hayat senaryolarında doğru cümleleri kur."
          onClick={() => setMode(GameMode.LANGUAGE_SIM)}
        />
      </div>
    </div>
  );
};

export default LanguageMenu;
