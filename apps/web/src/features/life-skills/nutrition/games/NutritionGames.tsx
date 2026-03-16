import React, { useState } from 'react';
import { GameCard } from '@egitim-galaksisi/ui';

interface NutritionGamesProps {
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
      id: 'fruit-match',
      title: 'Meyve Eşleştirme',
      icon: '🍎',
      description: 'Meyveleri tanı ve eşleştir',
      color: 'from-red-500 via-pink-500 to-red-600',
    },
    {
      id: 'veggie-sort',
      title: 'Sebze Ayırma',
      icon: '🥕',
      description: 'Sebzeleri grupla',
      color: 'from-orange-500 via-amber-500 to-orange-600',
    },
    {
      id: 'food-groups',
      title: 'Besin Grupları',
      icon: '🍽️',
      description: 'Besinleri gruplarına ayır',
      color: 'from-lime-500 via-green-500 to-lime-600',
    },
    {
      id: 'healthy-plate',
      title: 'Sağlıklı Tabak',
      icon: '🥗',
      description: 'Dengeli tabak oluştur',
      color: 'from-green-500 via-emerald-500 to-green-600',
    },
    {
      id: 'water-game',
      title: 'Su İçme Oyunu',
      icon: '💧',
      description: 'Günlük su ihtiyacını karşıla',
      color: 'from-blue-500 via-cyan-500 to-blue-600',
    },
  ],
  2: [
    {
      id: 'breakfast-builder',
      title: 'Kahvaltı Hazırlama',
      icon: '🥣',
      description: 'Sağlıklı kahvaltı yap',
      color: 'from-yellow-500 via-orange-500 to-yellow-600',
    },
    {
      id: 'snack-chooser',
      title: 'Atıştırmalık Seçimi',
      icon: '🍪',
      description: 'Sağlıklı atıştırmalık seç',
      color: 'from-amber-500 via-orange-500 to-amber-600',
    },
    {
      id: 'vitamin-hunt',
      title: 'Vitamin Avı',
      icon: '💊',
      description: 'Vitaminleri bul',
      color: 'from-purple-500 via-pink-500 to-purple-600',
    },
    {
      id: 'meal-planner',
      title: 'Öğün Planlayıcı',
      icon: '📋',
      description: 'Günlük öğünleri planla',
      color: 'from-teal-500 via-cyan-500 to-teal-600',
    },
    {
      id: 'food-pyramid',
      title: 'Besin Piramidi',
      icon: '🔺',
      description: 'Piramidi doğru oluştur',
      color: 'from-indigo-500 via-purple-500 to-indigo-600',
    },
  ],
  3: [
    {
      id: 'nutrition-quiz',
      title: 'Beslenme Bilgi Yarışması',
      icon: '❓',
      description: 'Bilgini test et',
      color: 'from-blue-600 via-indigo-600 to-blue-700',
    },
    {
      id: 'calorie-counter',
      title: 'Kalori Sayacı',
      icon: '🔢',
      description: 'Kalorileri hesapla',
      color: 'from-green-600 via-emerald-600 to-green-700',
    },
    {
      id: 'sugar-detective',
      title: 'Şeker Dedektifi',
      icon: '🔍',
      description: 'Gizli şekerleri bul',
      color: 'from-red-600 via-rose-600 to-red-700',
    },
    {
      id: 'protein-power',
      title: 'Protein Gücü',
      icon: '💪',
      description: 'Protein kaynaklarını öğren',
      color: 'from-orange-600 via-amber-600 to-orange-700',
    },
    {
      id: 'balanced-diet',
      title: 'Dengeli Diyet',
      icon: '⚖️',
      description: 'Dengeli beslenme planı yap',
      color: 'from-lime-600 via-green-600 to-lime-700',
    },
  ],
  4: [
    {
      id: 'exercise-nutrition',
      title: 'Egzersiz ve Beslenme',
      icon: '🏃',
      description: 'Spor ve beslenme dengesi',
      color: 'from-cyan-600 via-blue-600 to-cyan-700',
    },
    {
      id: 'hydration-hero',
      title: 'Hidrasyon Kahramanı',
      icon: '💦',
      description: 'Su dengesini koru',
      color: 'from-blue-600 via-sky-600 to-blue-700',
    },
    {
      id: 'label-reader',
      title: 'Etiket Okuyucu',
      icon: '🏷️',
      description: 'Besin etiketlerini oku',
      color: 'from-purple-600 via-pink-600 to-purple-700',
    },
    {
      id: 'portion-control',
      title: 'Porsiyon Kontrolü',
      icon: '🍴',
      description: 'Doğru porsiyon öğren',
      color: 'from-teal-600 via-cyan-600 to-teal-700',
    },
    {
      id: 'fast-food-facts',
      title: 'Fast Food Gerçekleri',
      icon: '🍔',
      description: "Fast food'un zararlarını öğren",
      color: 'from-red-600 via-orange-600 to-red-700',
    },
  ],
  5: [
    {
      id: 'metabolism-master',
      title: 'Metabolizma Ustası',
      icon: '⚡',
      description: 'Metabolizmayı anla',
      color: 'from-yellow-700 via-orange-700 to-yellow-800',
    },
    {
      id: 'fiber-finder',
      title: 'Lif Bulucu',
      icon: '🌾',
      description: 'Lifli besinleri bul',
      color: 'from-amber-700 via-orange-700 to-amber-800',
    },
    {
      id: 'sports-nutrition',
      title: 'Spor Beslenmesi',
      icon: '⚽',
      description: 'Sporcu beslenmesi öğren',
      color: 'from-green-700 via-lime-700 to-green-800',
    },
    {
      id: 'meal-timing',
      title: 'Öğün Zamanlaması',
      icon: '⏰',
      description: 'Doğru zamanda ye',
      color: 'from-blue-700 via-indigo-700 to-blue-800',
    },
    {
      id: 'nutrient-match',
      title: 'Besin Öğesi Eşleştirme',
      icon: '🧩',
      description: 'Besin öğelerini eşleştir',
      color: 'from-purple-700 via-pink-700 to-purple-800',
    },
  ],
  6: [
    {
      id: 'bmi-calculator',
      title: 'BMI Hesaplayıcı',
      icon: '📊',
      description: 'Vücut kitle indeksini hesapla',
      color: 'from-slate-700 via-gray-700 to-slate-800',
    },
    {
      id: 'glycemic-index',
      title: 'Glisemik İndeks',
      icon: '📈',
      description: 'Glisemik indeksi öğren',
      color: 'from-red-700 via-rose-700 to-red-800',
    },
    {
      id: 'vitamin-quest',
      title: 'Vitamin Görevi',
      icon: '💊',
      description: 'Tüm vitaminleri keşfet',
      color: 'from-orange-700 via-amber-700 to-orange-800',
    },
    {
      id: 'mineral-mission',
      title: 'Mineral Misyonu',
      icon: '⛏️',
      description: 'Mineralleri öğren',
      color: 'from-teal-700 via-cyan-700 to-teal-800',
    },
    {
      id: 'antioxidant-adventure',
      title: 'Antioksidan Macerası',
      icon: '🛡️',
      description: 'Antioksidanları keşfet',
      color: 'from-green-700 via-emerald-700 to-green-800',
    },
  ],
  7: [
    {
      id: 'diet-planner',
      title: 'Diyet Planlayıcı',
      icon: '📋',
      description: 'Kişisel diyet planı yap',
      color: 'from-blue-800 via-indigo-800 to-blue-900',
    },
    {
      id: 'macro-tracker',
      title: 'Makro Takipçisi',
      icon: '🎯',
      description: 'Makro besinleri takip et',
      color: 'from-green-800 via-emerald-800 to-green-900',
    },
    {
      id: 'supplement-guide',
      title: 'Takviye Rehberi',
      icon: '💊',
      description: 'Takviyeleri öğren',
      color: 'from-purple-800 via-pink-800 to-purple-900',
    },
    {
      id: 'meal-prep',
      title: 'Yemek Hazırlığı',
      icon: '🍱',
      description: 'Haftalık yemek hazırla',
      color: 'from-orange-800 via-red-800 to-orange-900',
    },
    {
      id: 'stress-eating',
      title: 'Stres Yeme',
      icon: '😰',
      description: 'Duygusal yemeyi yönet',
      color: 'from-teal-800 via-cyan-800 to-teal-900',
    },
  ],
  8: [
    {
      id: 'nutrition-science',
      title: 'Beslenme Bilimi',
      icon: '🔬',
      description: 'Beslenme bilimini öğren',
      color: 'from-slate-800 via-gray-800 to-slate-900',
    },
    {
      id: 'diet-types',
      title: 'Diyet Türleri',
      icon: '📚',
      description: 'Farklı diyetleri keşfet',
      color: 'from-blue-800 via-sky-800 to-blue-900',
    },
    {
      id: 'performance-nutrition',
      title: 'Performans Beslenmesi',
      icon: '🏆',
      description: 'Performansı artır',
      color: 'from-yellow-800 via-orange-800 to-yellow-900',
    },
    {
      id: 'gut-health',
      title: 'Bağırsak Sağlığı',
      icon: '🦠',
      description: 'Mikrobiyom öğren',
      color: 'from-green-800 via-lime-800 to-green-900',
    },
    {
      id: 'lifetime-nutrition',
      title: 'Yaşam Boyu Beslenme',
      icon: '🌟',
      description: 'Kapsamlı beslenme planı',
      color: 'from-purple-800 via-fuchsia-800 to-purple-900',
    },
  ],
};

export default function NutritionGames({ gradeLevel, onExit }: NutritionGamesProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const allGames = Object.entries(gamesByGrade).flatMap(([grade, games]) =>
    games.map((game) => ({ ...game, grade: parseInt(grade) }))
  );

  if (selectedGame) {
    const game = allGames.find((g) => g.id === selectedGame);
    if (game) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-lime-900 to-slate-900 p-4 md:p-8">
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
                className="w-full bg-lime-500 hover:bg-lime-400 text-white text-2xl font-black py-5 rounded-2xl transition-all"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-lime-900 to-slate-900 p-4">
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
