import React, { useState } from 'react';
import { GameCard } from '@egitim-galaksisi/ui';
import SafeSiteGame from './games/SafeSiteGame';
import PasswordGame from './games/PasswordGame';
import PrivacyGame from './games/PrivacyGame';
import ScreenTimeGame from './games/ScreenTimeGame';
import CyberbullyGame from './games/CyberbullyGame';
import PhishingGame from './games/PhishingGame';
import FakeNewsGame from './games/FakeNewsGame';

interface DigitalGamesProps {
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
      id: 'safe-site',
      title: 'Güvenli Site Bulma',
      icon: '🔒',
      description: 'Güvenli siteleri bul',
      color: 'from-green-500 via-emerald-500 to-green-600',
    },
    {
      id: 'screen-time',
      title: 'Ekran Süresi Yönetimi',
      icon: '⏰',
      description: 'Ekran süresini dengele',
      color: 'from-blue-500 via-cyan-500 to-blue-600',
    },
    {
      id: 'privacy-basic',
      title: 'Gizlilik Temelleri',
      icon: '🔐',
      description: 'Kişisel bilgileri koru',
      color: 'from-purple-500 via-violet-500 to-purple-600',
    },
    {
      id: 'good-behavior',
      title: 'İyi Davranış',
      icon: '😊',
      description: 'İnternette kibar ol',
      color: 'from-pink-500 via-rose-500 to-pink-600',
    },
    {
      id: 'ask-adult',
      title: 'Yetişkine Sor',
      icon: '👨‍👩‍👧',
      description: 'Ne zaman yardım istemeli',
      color: 'from-orange-500 via-amber-500 to-orange-600',
    },
  ],
  2: [
    {
      id: 'link-safety',
      title: 'Link Güvenliği',
      icon: '🔗',
      description: 'Güvenli ve tehlikeli linkleri ayır',
      color: 'from-red-500 via-rose-500 to-red-600',
    },
    {
      id: 'password-basic',
      title: 'Şifre Oluşturma',
      icon: '🔑',
      description: 'Güçlü şifre oluştur',
      color: 'from-indigo-500 via-purple-500 to-indigo-600',
    },
    {
      id: 'personal-info',
      title: 'Kişisel Bilgi Koruma',
      icon: '🛡️',
      description: 'Bilgilerini koru',
      color: 'from-teal-500 via-cyan-500 to-teal-600',
    },
    {
      id: 'screen-balance',
      title: 'Ekran Dengesi',
      icon: '⚖️',
      description: 'Dengeli ekran kullanımı',
      color: 'from-lime-500 via-green-500 to-lime-600',
    },
    {
      id: 'internet-rules',
      title: 'İnternet Kuralları',
      icon: '📜',
      description: 'Temel internet kuralları',
      color: 'from-yellow-500 via-amber-500 to-yellow-600',
    },
  ],
  3: [
    {
      id: 'password-game',
      title: 'Şifre Ustası',
      icon: '🔐',
      description: 'Güçlü şifreler oluştur',
      color: 'from-purple-600 via-indigo-600 to-purple-700',
    },
    {
      id: 'stranger-danger',
      title: 'Yabancı Tehlikesi',
      icon: '👤',
      description: 'Bilinmeyen kişilerden kaçın',
      color: 'from-red-600 via-orange-600 to-red-700',
    },
    {
      id: 'download-safety',
      title: 'Güvenli İndirme',
      icon: '⬇️',
      description: 'Güvenli indirme yap',
      color: 'from-blue-600 via-sky-600 to-blue-700',
    },
    {
      id: 'digital-footprint',
      title: 'Dijital Ayak İzi',
      icon: '👣',
      description: 'İzlerini yönet',
      color: 'from-green-600 via-emerald-600 to-green-700',
    },
    {
      id: 'game-safety',
      title: 'Oyun Güvenliği',
      icon: '🎮',
      description: 'Güvenli oyun oyna',
      color: 'from-pink-600 via-rose-600 to-pink-700',
    },
  ],
  4: [
    {
      id: 'phishing-detector',
      title: 'Phishing Dedektifi',
      icon: '🎣',
      description: 'Sahte mesajları tespit et',
      color: 'from-orange-600 via-red-600 to-orange-700',
    },
    {
      id: 'password-manager',
      title: 'Şifre Yöneticisi',
      icon: '🗝️',
      description: 'Şifrelerini yönet',
      color: 'from-indigo-600 via-purple-600 to-indigo-700',
    },
    {
      id: 'privacy-settings',
      title: 'Gizlilik Ayarları',
      icon: '⚙️',
      description: 'Ayarları yapılandır',
      color: 'from-teal-600 via-cyan-600 to-teal-700',
    },
    {
      id: 'virus-hunter',
      title: 'Virüs Avcısı',
      icon: '🦠',
      description: 'Virüsleri tespit et',
      color: 'from-lime-600 via-green-600 to-lime-700',
    },
    {
      id: 'digital-citizen',
      title: 'Dijital Vatandaş',
      icon: '🌐',
      description: 'Sorumlu davran',
      color: 'from-blue-600 via-indigo-600 to-blue-700',
    },
  ],
  5: [
    {
      id: 'cyberbully-stop',
      title: 'Siber Zorbalığı Durdur',
      icon: '🚫',
      description: 'Zorbalığa karşı dur',
      color: 'from-red-700 via-rose-700 to-red-800',
    },
    {
      id: 'social-media-safety',
      title: 'Sosyal Medya Güvenliği',
      icon: '📱',
      description: 'Güvenli sosyal medya',
      color: 'from-purple-700 via-pink-700 to-purple-800',
    },
    {
      id: 'fake-news',
      title: 'Sahte Haber Dedektifi',
      icon: '📰',
      description: 'Yanlış bilgiyi tespit et',
      color: 'from-orange-700 via-amber-700 to-orange-800',
    },
    {
      id: 'location-privacy',
      title: 'Konum Gizliliği',
      icon: '📍',
      description: 'Konumunu koru',
      color: 'from-blue-700 via-cyan-700 to-blue-800',
    },
    {
      id: 'copyright-game',
      title: 'Telif Hakları',
      icon: '©️',
      description: 'Telif haklarını öğren',
      color: 'from-green-700 via-emerald-700 to-green-800',
    },
  ],
  6: [
    {
      id: 'reputation-builder',
      title: 'İtibar Oluşturucu',
      icon: '⭐',
      description: 'Dijital itibarını yönet',
      color: 'from-yellow-700 via-amber-700 to-yellow-800',
    },
    {
      id: 'privacy-master',
      title: 'Gizlilik Ustası',
      icon: '🔒',
      description: 'Gizliliği tam koru',
      color: 'from-indigo-700 via-purple-700 to-indigo-800',
    },
    {
      id: 'friend-or-fake',
      title: 'Gerçek mi Sahte mi?',
      icon: '👥',
      description: 'Sahte profilleri tespit et',
      color: 'from-pink-700 via-rose-700 to-pink-800',
    },
    {
      id: 'data-detective',
      title: 'Veri Dedektifi',
      icon: '🔍',
      description: 'Veri güvenliğini sağla',
      color: 'from-teal-700 via-cyan-700 to-teal-800',
    },
    {
      id: 'digital-wellness',
      title: 'Dijital Sağlık',
      icon: '💚',
      description: 'Dengeli dijital yaşam',
      color: 'from-green-700 via-lime-700 to-green-800',
    },
  ],
  7: [
    {
      id: 'two-factor-auth',
      title: 'İki Faktörlü Kimlik',
      icon: '🔐',
      description: 'Güvenliği artır',
      color: 'from-blue-800 via-indigo-800 to-blue-900',
    },
    {
      id: 'encryption-game',
      title: 'Şifreleme Oyunu',
      icon: '🔒',
      description: 'Verileri şifrele',
      color: 'from-purple-800 via-pink-800 to-purple-900',
    },
    {
      id: 'digital-literacy',
      title: 'Dijital Okuryazarlık',
      icon: '📚',
      description: 'Dijital becerileri geliştir',
      color: 'from-orange-800 via-red-800 to-orange-900',
    },
    {
      id: 'misinformation',
      title: 'Yanlış Bilgi Savaşçısı',
      icon: '⚔️',
      description: 'Yanlış bilgiyle savaş',
      color: 'from-teal-800 via-cyan-800 to-teal-900',
    },
    {
      id: 'digital-detox',
      title: 'Dijital Detoks',
      icon: '📵',
      description: 'Teknolojiden ara ver',
      color: 'from-green-800 via-emerald-800 to-green-900',
    },
  ],
  8: [
    {
      id: 'cyber-security',
      title: 'Siber Güvenlik Uzmanı',
      icon: '🛡️',
      description: 'Tam güvenlik sağla',
      color: 'from-slate-800 via-gray-800 to-slate-900',
    },
    {
      id: 'digital-citizenship',
      title: 'Dijital Vatandaşlık',
      icon: '🌍',
      description: 'Sorumlu dijital vatandaş ol',
      color: 'from-blue-800 via-sky-800 to-blue-900',
    },
    {
      id: 'data-breach',
      title: 'Veri İhlali Simülasyonu',
      icon: '🚨',
      description: 'Veri ihlallerini yönet',
      color: 'from-red-800 via-rose-800 to-red-900',
    },
    {
      id: 'ethical-hacker',
      title: 'Etik Hacker',
      icon: '💻',
      description: 'Güvenlik açıklarını bul',
      color: 'from-green-800 via-lime-800 to-green-900',
    },
    {
      id: 'digital-legacy',
      title: 'Dijital Miras',
      icon: '🏛️',
      description: 'Dijital mirasını yönet',
      color: 'from-purple-800 via-indigo-800 to-purple-900',
    },
  ],
};

export default function DigitalGames({ gradeLevel, onExit }: DigitalGamesProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const allGames = Object.entries(gamesByGrade).flatMap(([grade, games]) =>
    games.map((game) => ({ ...game, grade: parseInt(grade) }))
  );

  // Render specific games
  if (selectedGame === 'safe-site' || selectedGame === 'link-safety') {
    return <SafeSiteGame onExit={() => setSelectedGame(null)} />;
  }
  if (
    selectedGame === 'password-basic' ||
    selectedGame === 'password-game' ||
    selectedGame === 'password-manager'
  ) {
    return <PasswordGame onExit={() => setSelectedGame(null)} />;
  }
  if (
    selectedGame === 'privacy-basic' ||
    selectedGame === 'personal-info' ||
    selectedGame === 'privacy-game' ||
    selectedGame === 'privacy-settings' ||
    selectedGame === 'privacy-master'
  ) {
    return <PrivacyGame onExit={() => setSelectedGame(null)} />;
  }
  if (selectedGame === 'screen-time' || selectedGame === 'screen-balance') {
    return <ScreenTimeGame onExit={() => setSelectedGame(null)} />;
  }
  if (selectedGame === 'cyberbully-stop') {
    return <CyberbullyGame onExit={() => setSelectedGame(null)} />;
  }
  if (selectedGame === 'phishing-detector') {
    return <PhishingGame onExit={() => setSelectedGame(null)} />;
  }
  if (selectedGame === 'fake-news' || selectedGame === 'misinformation') {
    return <FakeNewsGame onExit={() => setSelectedGame(null)} />;
  }

  if (selectedGame) {
    const game = allGames.find((g) => g.id === selectedGame);
    if (game) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
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
                className="w-full bg-purple-500 hover:bg-purple-400 text-white text-2xl font-black py-5 rounded-2xl transition-all"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
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
