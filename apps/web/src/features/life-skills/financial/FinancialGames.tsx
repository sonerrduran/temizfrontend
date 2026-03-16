import React, { useState } from 'react';
import { GameCard } from '@egitim-galaksisi/ui';
import CoinMatchGame from './games/CoinMatchGame';
import PiggyBankGame from './games/PiggyBankGame';
import NeedWantGame from './games/NeedWantGame';
import MoneyCountGame from './games/MoneyCountGame';
import ShoppingBasicGame from './games/ShoppingBasicGame';

interface FinancialGamesProps {
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
      id: 'coin-match',
      title: 'Para Eşleştirme',
      icon: '🪙',
      description: 'Paraları tanı ve eşleştir',
      color: 'from-yellow-500 via-amber-500 to-yellow-600',
    },
    {
      id: 'piggy-bank',
      title: 'Kumbara Oyunu',
      icon: '🐷',
      description: 'Kumbarana para biriktir',
      color: 'from-pink-500 via-rose-500 to-pink-600',
    },
    {
      id: 'need-want',
      title: 'İhtiyaç-İstek Ayırma',
      icon: '🎯',
      description: 'İhtiyaç ve istekleri ayır',
      color: 'from-blue-500 via-cyan-500 to-blue-600',
    },
    {
      id: 'money-count',
      title: 'Para Sayma',
      icon: '💰',
      description: 'Paraları say ve topla',
      color: 'from-green-500 via-emerald-500 to-green-600',
    },
    {
      id: 'shopping-basic',
      title: 'Basit Alışveriş',
      icon: '🛒',
      description: 'Alışveriş simülasyonu',
      color: 'from-purple-500 via-violet-500 to-purple-600',
    },
  ],
  2: [
    {
      id: 'market-game',
      title: 'Sanal Market',
      icon: '🏪',
      description: 'Markette alışveriş yap',
      color: 'from-orange-500 via-amber-500 to-orange-600',
    },
    {
      id: 'change-calculator',
      title: 'Para Üstü Hesaplama',
      icon: '🧮',
      description: 'Para üstünü hesapla',
      color: 'from-teal-500 via-cyan-500 to-teal-600',
    },
    {
      id: 'price-compare',
      title: 'Fiyat Karşılaştırma',
      icon: '🏷️',
      description: 'En uygun fiyatı bul',
      color: 'from-indigo-500 via-purple-500 to-indigo-600',
    },
    {
      id: 'saving-goal',
      title: 'Birikim Hedefi',
      icon: '🎯',
      description: 'Hedefine ulaşmak için biriktir',
      color: 'from-lime-500 via-green-500 to-lime-600',
    },
    {
      id: 'money-memory',
      title: 'Para Hafızası',
      icon: '🧠',
      description: 'Paraları ezberle',
      color: 'from-rose-500 via-pink-500 to-rose-600',
    },
  ],
  3: [
    {
      id: 'allowance-manager',
      title: 'Harçlık Yöneticisi',
      icon: '💵',
      description: 'Harçlığını yönet',
      color: 'from-emerald-500 via-green-500 to-emerald-600',
    },
    {
      id: 'smart-shopper',
      title: 'Akıllı Alışverişçi',
      icon: '🛍️',
      description: 'Akıllıca alışveriş yap',
      color: 'from-blue-500 via-sky-500 to-blue-600',
    },
    {
      id: 'save-spend',
      title: 'Harca-Biriktir Dengesi',
      icon: '⚖️',
      description: 'Dengeyi koru',
      color: 'from-purple-500 via-fuchsia-500 to-purple-600',
    },
    {
      id: 'coin-collector',
      title: 'Madeni Para Toplayıcı',
      icon: '🪙',
      description: 'Paraları topla ve say',
      color: 'from-yellow-500 via-orange-500 to-yellow-600',
    },
    {
      id: 'budget-basics',
      title: 'Bütçe Temelleri',
      icon: '📊',
      description: 'Basit bütçe yap',
      color: 'from-cyan-500 via-teal-500 to-cyan-600',
    },
  ],
  4: [
    {
      id: 'budget-planner',
      title: 'Bütçe Planlayıcı',
      icon: '📋',
      description: 'Bütçe planı oluştur',
      color: 'from-green-600 via-emerald-600 to-green-700',
    },
    {
      id: 'income-expense',
      title: 'Gelir-Gider Takibi',
      icon: '💹',
      description: 'Gelir ve giderleri takip et',
      color: 'from-blue-600 via-indigo-600 to-blue-700',
    },
    {
      id: 'saving-challenge',
      title: 'Tasarruf Meydan Okuması',
      icon: '🏆',
      description: 'Tasarruf hedeflerine ulaş',
      color: 'from-purple-600 via-pink-600 to-purple-700',
    },
    {
      id: 'money-decisions',
      title: 'Para Kararları',
      icon: '🤔',
      description: 'Doğru finansal kararlar ver',
      color: 'from-orange-600 via-red-600 to-orange-700',
    },
    {
      id: 'virtual-wallet',
      title: 'Sanal Cüzdan',
      icon: '👛',
      description: 'Cüzdanını yönet',
      color: 'from-teal-600 via-cyan-600 to-teal-700',
    },
  ],
  5: [
    {
      id: 'bank-simulator',
      title: 'Banka Simülatörü',
      icon: '🏦',
      description: 'Banka işlemlerini öğren',
      color: 'from-slate-600 via-gray-600 to-slate-700',
    },
    {
      id: 'interest-calculator',
      title: 'Faiz Hesaplayıcı',
      icon: '📈',
      description: 'Faiz hesapla',
      color: 'from-emerald-600 via-green-600 to-emerald-700',
    },
    {
      id: 'discount-hunter',
      title: 'İndirim Avcısı',
      icon: '🎯',
      description: 'En iyi indirimleri bul',
      color: 'from-red-600 via-rose-600 to-red-700',
    },
    {
      id: 'savings-account',
      title: 'Tasarruf Hesabı',
      icon: '💰',
      description: 'Tasarruf hesabı yönet',
      color: 'from-blue-600 via-sky-600 to-blue-700',
    },
    {
      id: 'financial-goals',
      title: 'Finansal Hedefler',
      icon: '🎯',
      description: 'Hedeflerini belirle ve ulaş',
      color: 'from-purple-600 via-violet-600 to-purple-700',
    },
  ],
  6: [
    {
      id: 'atm-master',
      title: 'ATM Ustası',
      icon: '🏧',
      description: 'ATM kullanımını öğren',
      color: 'from-cyan-600 via-blue-600 to-cyan-700',
    },
    {
      id: 'digital-payment',
      title: 'Dijital Ödeme',
      icon: '💳',
      description: 'Dijital ödeme yöntemleri',
      color: 'from-indigo-600 via-purple-600 to-indigo-700',
    },
    {
      id: 'online-shopping',
      title: 'Güvenli Online Alışveriş',
      icon: '🛒',
      description: 'Online alışveriş güvenliği',
      color: 'from-orange-600 via-amber-600 to-orange-700',
    },
    {
      id: 'money-security',
      title: 'Para Güvenliği',
      icon: '🔒',
      description: 'Paranı güvende tut',
      color: 'from-red-600 via-pink-600 to-red-700',
    },
    {
      id: 'financial-literacy',
      title: 'Finansal Okuryazarlık Testi',
      icon: '📚',
      description: 'Bilgini test et',
      color: 'from-green-600 via-lime-600 to-green-700',
    },
  ],
  7: [
    {
      id: 'investment-basics',
      title: 'Yatırım Temelleri',
      icon: '📊',
      description: 'Temel yatırım bilgisi',
      color: 'from-blue-700 via-indigo-700 to-blue-800',
    },
    {
      id: 'stock-market',
      title: 'Borsa Simülatörü',
      icon: '📈',
      description: 'Borsa oyunu',
      color: 'from-green-700 via-emerald-700 to-green-800',
    },
    {
      id: 'risk-reward',
      title: 'Risk-Getiri Dengesi',
      icon: '⚖️',
      description: 'Risk ve getiriyi dengele',
      color: 'from-purple-700 via-pink-700 to-purple-800',
    },
    {
      id: 'diversification',
      title: 'Çeşitlendirme Oyunu',
      icon: '🎲',
      description: 'Portföyünü çeşitlendir',
      color: 'from-orange-700 via-red-700 to-orange-800',
    },
    {
      id: 'financial-planning',
      title: 'Finansal Planlama',
      icon: '📋',
      description: 'Uzun vadeli plan yap',
      color: 'from-teal-700 via-cyan-700 to-teal-800',
    },
  ],
  8: [
    {
      id: 'credit-card-sim',
      title: 'Kredi Kartı Simülasyonu',
      icon: '💳',
      description: 'Kredi kartı kullanımı',
      color: 'from-slate-700 via-gray-700 to-slate-800',
    },
    {
      id: 'loan-calculator',
      title: 'Kredi Hesaplayıcı',
      icon: '🧮',
      description: 'Kredi maliyetini hesapla',
      color: 'from-red-700 via-rose-700 to-red-800',
    },
    {
      id: 'entrepreneur',
      title: 'Genç Girişimci',
      icon: '💼',
      description: 'İş kurma simülasyonu',
      color: 'from-blue-700 via-sky-700 to-blue-800',
    },
    {
      id: 'tax-basics',
      title: 'Vergi Temelleri',
      icon: '📋',
      description: 'Vergi sistemini öğren',
      color: 'from-green-700 via-lime-700 to-green-800',
    },
    {
      id: 'life-finance',
      title: 'Yaşam Finansı',
      icon: '🌟',
      description: 'Kapsamlı finansal yönetim',
      color: 'from-purple-700 via-fuchsia-700 to-purple-800',
    },
  ],
};

export default function FinancialGames({ gradeLevel, onExit }: FinancialGamesProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const allGames = Object.entries(gamesByGrade).flatMap(([grade, games]) =>
    games.map((game) => ({ ...game, grade: parseInt(grade) }))
  );

  // Render specific games
  if (selectedGame === 'coin-match') {
    return <CoinMatchGame onExit={() => setSelectedGame(null)} />;
  }
  if (selectedGame === 'piggy-bank') {
    return <PiggyBankGame onExit={() => setSelectedGame(null)} />;
  }
  if (selectedGame === 'need-want') {
    return <NeedWantGame onExit={() => setSelectedGame(null)} />;
  }
  if (selectedGame === 'money-count') {
    return <MoneyCountGame onExit={() => setSelectedGame(null)} />;
  }
  if (selectedGame === 'shopping-basic' || selectedGame === 'market-game') {
    return <ShoppingBasicGame onExit={() => setSelectedGame(null)} />;
  }

  if (selectedGame) {
    const game = allGames.find((g) => g.id === selectedGame);
    if (game) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4 md:p-8">
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
                className="w-full bg-green-500 hover:bg-green-400 text-white text-2xl font-black py-5 rounded-2xl transition-all"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4">
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
