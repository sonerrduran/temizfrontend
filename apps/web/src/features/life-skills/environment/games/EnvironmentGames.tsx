import React, { useState } from 'react';
import { GameCard } from '@egitim-galaksisi/ui';

interface EnvironmentGamesProps {
  gradeLevel: number;
  onExit: () => void;
}

const gamesByGrade: Record<
  number,
  Array<{
    id: string;
    title: string;
    icon: string;
    description: string;
    color: string;
  }>
> = {
  1: [
    {
      id: 'trash-sort',
      title: 'Çöp Ayırma',
      icon: '🗑️',
      description: 'Çöpleri doğru kutulara at',
      color: 'from-teal-500 via-cyan-500 to-teal-600',
    },
    {
      id: 'water-save',
      title: 'Su Tasarrufu',
      icon: '💧',
      description: 'Suyu koru, israf etme',
      color: 'from-blue-500 via-cyan-500 to-blue-600',
    },
    {
      id: 'nature-love',
      title: 'Doğa Sevgisi',
      icon: '🌳',
      description: 'Doğayı koru ve sev',
      color: 'from-green-500 via-emerald-500 to-green-600',
    },
    {
      id: 'clean-park',
      title: 'Park Temizliği',
      icon: '🏞️',
      description: 'Parkı temiz tut',
      color: 'from-lime-500 via-green-500 to-lime-600',
    },
    {
      id: 'animal-friend',
      title: 'Hayvan Dostu',
      icon: '🐾',
      description: 'Hayvanlara yardım et',
      color: 'from-amber-500 via-orange-500 to-amber-600',
    },
  ],
  2: [
    {
      id: 'recycle-master',
      title: 'Geri Dönüşüm Ustası',
      icon: '♻️',
      description: 'Geri dönüşümü öğren',
      color: 'from-emerald-500 via-green-500 to-emerald-600',
    },
    {
      id: 'energy-saver',
      title: 'Enerji Tasarrufu',
      icon: '💡',
      description: 'Enerjiyi koru',
      color: 'from-yellow-500 via-amber-500 to-yellow-600',
    },
    {
      id: 'plant-tree',
      title: 'Ağaç Dikme',
      icon: '🌱',
      description: 'Ağaç dik, yeşillen',
      color: 'from-green-500 via-lime-500 to-green-600',
    },
    {
      id: 'eco-hero',
      title: 'Çevre Kahramanı',
      icon: '🦸',
      description: 'Çevreyi kurtar',
      color: 'from-teal-500 via-cyan-500 to-teal-600',
    },
    {
      id: 'clean-beach',
      title: 'Sahil Temizliği',
      icon: '🏖️',
      description: 'Sahili temizle',
      color: 'from-sky-500 via-blue-500 to-sky-600',
    },
  ],
  3: [
    {
      id: 'plastic-free',
      title: 'Plastiksiz Yaşam',
      icon: '🚫',
      description: 'Plastik kullanımını azalt',
      color: 'from-red-500 via-rose-500 to-red-600',
    },
    {
      id: 'compost-game',
      title: 'Kompost Yapımı',
      icon: '🌿',
      description: 'Organik atıkları değerlendir',
      color: 'from-green-600 via-emerald-600 to-green-700',
    },
    {
      id: 'eco-shopping',
      title: 'Çevreci Alışveriş',
      icon: '🛍️',
      description: 'Çevre dostu ürünler seç',
      color: 'from-teal-600 via-cyan-600 to-teal-700',
    },
    {
      id: 'wildlife-protect',
      title: 'Yaban Hayatı Koruma',
      icon: '🦌',
      description: 'Vahşi hayvanları koru',
      color: 'from-amber-600 via-orange-600 to-amber-700',
    },
    {
      id: 'green-home',
      title: 'Yeşil Ev',
      icon: '🏡',
      description: 'Evini çevre dostu yap',
      color: 'from-lime-600 via-green-600 to-lime-700',
    },
  ],
  4: [
    {
      id: 'carbon-footprint',
      title: 'Karbon Ayak İzi',
      icon: '👣',
      description: 'Karbon ayak izini hesapla',
      color: 'from-slate-600 via-gray-600 to-slate-700',
    },
    {
      id: 'renewable-energy',
      title: 'Yenilenebilir Enerji',
      icon: '☀️',
      description: 'Temiz enerji kaynaklarını öğren',
      color: 'from-yellow-600 via-orange-600 to-yellow-700',
    },
    {
      id: 'ocean-clean',
      title: 'Okyanus Temizliği',
      icon: '🌊',
      description: 'Okyanusları temizle',
      color: 'from-blue-600 via-cyan-600 to-blue-700',
    },
    {
      id: 'eco-transport',
      title: 'Çevreci Ulaşım',
      icon: '🚲',
      description: 'Sürdürülebilir ulaşım seç',
      color: 'from-green-600 via-teal-600 to-green-700',
    },
    {
      id: 'zero-waste',
      title: 'Sıfır Atık',
      icon: '🎯',
      description: 'Atık üretme',
      color: 'from-purple-600 via-pink-600 to-purple-700',
    },
  ],
  5: [
    {
      id: 'climate-action',
      title: 'İklim Eylemi',
      icon: '🌍',
      description: 'İklim değişikliğiyle mücadele',
      color: 'from-blue-700 via-indigo-700 to-blue-800',
    },
    {
      id: 'biodiversity',
      title: 'Biyoçeşitlilik',
      icon: '🦋',
      description: 'Türleri koru',
      color: 'from-green-700 via-emerald-700 to-green-800',
    },
    {
      id: 'sustainable-food',
      title: 'Sürdürülebilir Gıda',
      icon: '🥗',
      description: 'Yerel ve organik beslen',
      color: 'from-lime-700 via-green-700 to-lime-800',
    },
    {
      id: 'water-cycle',
      title: 'Su Döngüsü',
      icon: '💦',
      description: 'Su döngüsünü öğren',
      color: 'from-cyan-700 via-blue-700 to-cyan-800',
    },
    {
      id: 'forest-guard',
      title: 'Orman Koruyucusu',
      icon: '🌲',
      description: 'Ormanları koru',
      color: 'from-green-700 via-teal-700 to-green-800',
    },
  ],
  6: [
    {
      id: 'eco-city',
      title: 'Çevreci Şehir',
      icon: '🏙️',
      description: 'Sürdürülebilir şehir kur',
      color: 'from-slate-700 via-gray-700 to-slate-800',
    },
    {
      id: 'pollution-fighter',
      title: 'Kirlilik Savaşçısı',
      icon: '😷',
      description: 'Hava kirliliğiyle savaş',
      color: 'from-red-700 via-orange-700 to-red-800',
    },
    {
      id: 'animal-rights',
      title: 'Hayvan Hakları',
      icon: '🐕',
      description: 'Hayvan haklarını savun',
      color: 'from-amber-700 via-orange-700 to-amber-800',
    },
    {
      id: 'green-energy',
      title: 'Yeşil Enerji Üretimi',
      icon: '⚡',
      description: 'Temiz enerji üret',
      color: 'from-yellow-700 via-lime-700 to-yellow-800',
    },
    {
      id: 'eco-warrior',
      title: 'Çevre Savaşçısı',
      icon: '⚔️',
      description: 'Çevre için savaş',
      color: 'from-teal-700 via-cyan-700 to-teal-800',
    },
  ],
  7: [
    {
      id: 'volunteer-project',
      title: 'Gönüllü Projesi',
      icon: '🤝',
      description: 'Toplum projesine katıl',
      color: 'from-purple-700 via-pink-700 to-purple-800',
    },
    {
      id: 'eco-entrepreneur',
      title: 'Çevreci Girişimci',
      icon: '💼',
      description: 'Yeşil iş kur',
      color: 'from-green-700 via-emerald-700 to-green-800',
    },
    {
      id: 'climate-summit',
      title: 'İklim Zirvesi',
      icon: '🌐',
      description: 'Küresel iklim müzakeresi',
      color: 'from-blue-700 via-sky-700 to-blue-800',
    },
    {
      id: 'sustainable-dev',
      title: 'Sürdürülebilir Kalkınma',
      icon: '📊',
      description: 'Sürdürülebilir hedefler',
      color: 'from-teal-700 via-cyan-700 to-teal-800',
    },
    {
      id: 'eco-activism',
      title: 'Çevre Aktivizmi',
      icon: '📢',
      description: 'Sesini duyur',
      color: 'from-orange-700 via-red-700 to-orange-800',
    },
  ],
  8: [
    {
      id: 'global-warming',
      title: 'Küresel Isınma',
      icon: '🌡️',
      description: 'İklim krizini anla',
      color: 'from-red-800 via-orange-800 to-red-900',
    },
    {
      id: 'circular-economy',
      title: 'Döngüsel Ekonomi',
      icon: '🔄',
      description: 'Atıksız ekonomi modeli',
      color: 'from-green-800 via-emerald-800 to-green-900',
    },
    {
      id: 'eco-policy',
      title: 'Çevre Politikaları',
      icon: '⚖️',
      description: 'Çevre yasalarını öğren',
      color: 'from-slate-800 via-gray-800 to-slate-900',
    },
    {
      id: 'sustainability-sim',
      title: 'Sürdürülebilirlik Simülasyonu',
      icon: '🎮',
      description: 'Dünyayı yönet',
      color: 'from-blue-800 via-indigo-800 to-blue-900',
    },
    {
      id: 'eco-future',
      title: 'Çevreci Gelecek',
      icon: '🚀',
      description: 'Geleceği tasarla',
      color: 'from-purple-800 via-pink-800 to-purple-900',
    },
  ],
};

export default function EnvironmentGames({ gradeLevel, onExit }: EnvironmentGamesProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const allGames = Object.entries(gamesByGrade).flatMap(([grade, games]) =>
    games.map((game) => ({ ...game, grade: parseInt(grade) }))
  );

  if (selectedGame) {
    const game = allGames.find((g) => g.id === selectedGame);
    if (game) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={() => setSelectedGame(null)}
                className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all"
              >
                ← Çıkış
              </button>
              <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
                <span className="text-white font-black">⭐ 0</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-white text-4xl md:text-5xl font-black">
                {game.icon} {game.title}
              </h1>
              <p className="text-slate-400 text-lg mt-2">{game.description}</p>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
              <div className={`bg-gradient-to-br ${game.color} rounded-2xl p-8 md:p-12 mb-8`}>
                <div className="text-center text-white">
                  <div className="text-9xl mb-6">{game.icon}</div>
                  <h2 className="text-3xl font-black mb-4">Oyun Geliştiriliyor</h2>
                  <p className="text-xl">Bu oyun yakında eklenecek!</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedGame(null)}
                className="w-full bg-teal-500 hover:bg-teal-400 text-white text-2xl font-black py-5 rounded-2xl transition-all"
              >
                Geri Dön
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <button
            onClick={onExit}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
          >
            ⬅ GERİ DÖN
          </button>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
            Oyunlar
          </h2>
          <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
            Eğlenerek öğren!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
          {allGames.map((game, index) => (
            <GameCard
              key={`${game.id}-${index}`}
              title={game.title}
              icon={game.icon}
              color={`bg-gradient-to-br ${game.color}`}
              description={`${game.description} (${game.grade}. Sınıf)`}
              onClick={() => setSelectedGame(game.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
