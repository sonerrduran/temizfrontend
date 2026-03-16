import React, { useState } from 'react';
import { GameMode, UserStats } from '../../types';

interface TechniquesModuleProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const TechniquesModule: React.FC<TechniquesModuleProps> = ({ stats, setMode }) => {
  const [activeTab, setActiveTab] = useState(0);

  const techniques = [
    {
      title: 'İçten Seslendirmeyi (Subvocalization) Bırak',
      icon: '🤫',
      desc: 'Okurken kelimeleri zihnimizde veya dudaklarımızla seslendirme alışkanlığıdır. Konuşma hızımız okuma hızımızdan yavaştır (yaklaşık 150-250 WPM). Bu yüzden içten seslendirme okuma hızımızı sınırlar.',
      action:
        'Nasıl Yenilir? Okurken sakız çiğnemek, müzik dinlemek veya içinizden 1-2-3-4 diye ritim saymak beynin kelimeleri seslendirmesini engeller. Sadece gözlerinizle görmeye odaklanın.',
    },
    {
      title: 'Geriye Dönüşleri (Regression) Engelle',
      icon: '🚫',
      desc: 'Okuduğumuz bir kelimeyi veya cümleyi anladığımızdan emin olamayıp tekrar tekrar başa dönme alışkanlığıdır. Bu durum hızı %30 oranında düşürür.',
      action:
        'Nasıl Yenilir? Okuduğunuz satırın üzerini (veya bilgisayar ekranında farenizle) bir kartla veya metin imleciyle kapatarak ilerleyin. Satır Takibi egzersizi bu yeteneği geliştirir.',
    },
    {
      title: 'Blok Okuma (Göz Genişliği)',
      icon: '👁️↔️👁️',
      desc: 'Kelimeleri tek tek okumak yerine, yan yana duran 2 veya 3 kelimeyi tek bir fotoğraf karesi gibi algılamaktır.',
      action:
        'Nasıl Yenilir? Kelime Gruplama egzersizimiz tam olarak bunun içindir. Gözleriniz kelimelerin ortasına odaklanıp etraftakileri algılamaya alıştıkça okuma hızınız katlanacaktır.',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-in fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setMode(GameMode.FAST_READING_MENU)}
          className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-white italic">Okuma Teknikleri</h2>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-[40px] p-6 md:p-12 mb-8 shadow-2xl flex flex-col md:flex-row gap-8">
        {/* Tabs sidebar */}
        <div className="flex flex-col gap-3 md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
          {techniques.map((tech, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`text-left px-6 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 ${
                activeTab === idx
                  ? 'bg-fuchsia-600 text-white shadow-lg scale-[1.02]'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="text-sm md:text-base leading-tight">{tech.title}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:w-2/3 flex flex-col gap-6 animate-in slide-in-from-right">
          <div className="flex items-center gap-4 border-b border-fuchsia-500/30 pb-4">
            <span className="text-5xl md:text-6xl">{techniques[activeTab].icon}</span>
            <h3 className="text-2xl md:text-4xl font-black text-fuchsia-300">
              {techniques[activeTab].title}
            </h3>
          </div>

          <div className="bg-black/30 p-6 md:p-8 rounded-3xl border border-white/5 text-slate-300 text-lg md:text-xl leading-relaxed">
            <p className="mb-6 font-medium">{techniques[activeTab].desc}</p>

            <div className="bg-fuchsia-900/30 border-l-4 border-fuchsia-500 p-6 rounded-r-2xl">
              <h4 className="text-fuchsia-300 font-bold mb-2">Nasıl Yenerim?</h4>
              <p className="text-fuchsia-100 font-medium">{techniques[activeTab].action}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechniquesModule;
