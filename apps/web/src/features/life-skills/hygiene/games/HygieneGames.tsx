import { useState } from 'react';
import { GameCard } from '@egitim-galaksisi/ui';

interface HygieneGamesProps {
  gradeLevel: number;
  onExit: () => void;
}

const gamesByGrade: Record<number, Array<{
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
}>> = {
  1: [
    { id: 'hand-wash', title: 'El Yıkama Yarışması', icon: '🧼', description: 'Doğru el yıkama tekniği', color: 'from-blue-500 to-cyan-600' },
    { id: 'tooth-brush', title: 'Diş Fırçalama Oyunu', icon: '🦷', description: 'Dişlerini doğru fırçala', color: 'from-cyan-500 to-teal-600' },
    { id: 'clean-dirty', title: 'Temiz-Kirli Eşleştirme', icon: '✨', description: 'Temiz ve kirli ayır', color: 'from-teal-500 to-emerald-600' },
    { id: 'germ-catcher', title: 'Mikrop Avcısı', icon: '🦠', description: 'Mikropları yakala', color: 'from-emerald-500 to-green-600' },
    { id: 'hygiene-hero', title: 'Hijyen Kahramanı', icon: '🦸', description: 'Temizlik görevleri', color: 'from-green-500 to-lime-600' }
  ],
  2: [
    { id: 'bath-time', title: 'Banyo Zamanı', icon: '🛁', description: 'Banyo rutini öğren', color: 'from-blue-500 to-indigo-600' },
    { id: 'clean-clothes', title: 'Temiz Kıyafet Seçimi', icon: '👕', description: 'Doğru kıyafeti seç', color: 'from-indigo-500 to-purple-600' },
    { id: 'nail-care', title: 'Tırnak Bakımı', icon: '💅', description: 'Tırnak temizliği', color: 'from-purple-500 to-pink-600' },
    { id: 'hair-care', title: 'Saç Bakımı', icon: '💇', description: 'Saç temizliği ve bakımı', color: 'from-pink-500 to-rose-600' },
    { id: 'hygiene-routine', title: 'Günlük Hijyen Rutini', icon: '📅', description: 'Günlük temizlik alışkanlıkları', color: 'from-rose-500 to-red-600' }
  ],
  3: [
    { id: 'germ-defense', title: 'Mikrop Savunması', icon: '🛡️', description: 'Mikroplardan korun', color: 'from-cyan-500 to-blue-600' },
    { id: 'sneeze-cover', title: 'Hapşırık Kapama', icon: '🤧', description: 'Doğru hapşırma tekniği', color: 'from-blue-500 to-sky-600' },
    { id: 'sleep-hygiene', title: 'Uyku Hijyeni', icon: '😴', description: 'Sağlıklı uyku alışkanlıkları', color: 'from-sky-500 to-cyan-600' },
    { id: 'sick-day', title: 'Hasta Günü Simülasyonu', icon: '🤒', description: 'Hasta olunca ne yapmalı', color: 'from-teal-500 to-emerald-600' },
    { id: 'hygiene-quiz', title: 'Hijyen Bilgi Yarışması', icon: '❓', description: 'Hijyen bilgini test et', color: 'from-emerald-500 to-green-600' }
  ],
  4: [
    { id: 'flu-fighter', title: 'Grip Savaşçısı', icon: '💪', description: 'Gripten korunma yolları', color: 'from-blue-600 to-indigo-700' },
    { id: 'food-hygiene', title: 'Yemek Hijyeni', icon: '🍎', description: 'Gıda güvenliği kuralları', color: 'from-indigo-600 to-purple-700' },
    { id: 'tissue-master', title: 'Mendil Ustası', icon: '🧻', description: 'Mendil kullanımı', color: 'from-purple-600 to-pink-700' },
    { id: 'water-safety', title: 'Su Güvenliği', icon: '💧', description: 'Temiz su kullanımı', color: 'from-pink-600 to-rose-700' },
    { id: 'hygiene-detective', title: 'Hijyen Dedektifi', icon: '🔍', description: 'Hijyen hatalarını bul', color: 'from-rose-600 to-red-700' }
  ],
  5: [
    { id: 'skin-care', title: 'Cilt Bakımı', icon: '🧴', description: 'Temel cilt bakımı', color: 'from-cyan-600 to-blue-700' },
    { id: 'hair-health', title: 'Saç Sağlığı', icon: '💆', description: 'Saç bakımı ve hijyen', color: 'from-blue-600 to-sky-700' },
    { id: 'sports-hygiene', title: 'Spor Hijyeni', icon: '⚽', description: 'Spor sonrası temizlik', color: 'from-sky-600 to-cyan-700' },
    { id: 'sun-protection', title: 'Güneş Koruması', icon: '☀️', description: 'Güneşten korunma', color: 'from-teal-600 to-emerald-700' },
    { id: 'wound-care', title: 'Yara Bakımı', icon: '🩹', description: 'Yaraları temizleme', color: 'from-emerald-600 to-green-700' }
  ],
  6: [
    { id: 'puberty-hygiene', title: 'Ergenlik Hijyeni', icon: '🧑', description: 'Ergenlikte hijyen', color: 'from-blue-700 to-indigo-800' },
    { id: 'deodorant-use', title: 'Deodorant Kullanımı', icon: '🧴', description: 'Ter kokusu kontrolü', color: 'from-indigo-700 to-purple-800' },
    { id: 'dental-health', title: 'Diş Sağlığı', icon: '🦷', description: 'Ağız ve diş bakımı', color: 'from-purple-700 to-pink-800' },
    { id: 'floss-master', title: 'Diş İpi Ustası', icon: '🧵', description: 'Diş ipi kullanımı', color: 'from-pink-700 to-rose-800' },
    { id: 'hygiene-planner', title: 'Hijyen Planlayıcı', icon: '📋', description: 'Kişisel hijyen planı', color: 'from-rose-700 to-red-800' }
  ],
  7: [
    { id: 'acne-care', title: 'Akne Bakımı', icon: '🧴', description: 'Akne ile başa çıkma', color: 'from-cyan-700 to-blue-800' },
    { id: 'skin-routine', title: 'Cilt Rutini', icon: '💆', description: 'Günlük cilt bakımı', color: 'from-blue-700 to-sky-800' },
    { id: 'stress-hygiene', title: 'Stres ve Hijyen', icon: '🧘', description: 'Stres yönetimi', color: 'from-sky-700 to-cyan-800' },
    { id: 'sleep-quality', title: 'Uyku Kalitesi', icon: '😴', description: 'İyi uyku hijyeni', color: 'from-teal-700 to-emerald-800' },
    { id: 'hygiene-expert', title: 'Hijyen Uzmanı', icon: '🎓', description: 'İleri seviye hijyen', color: 'from-emerald-700 to-green-800' }
  ],
  8: [
    { id: 'reproductive-health', title: 'Üreme Sağlığı', icon: '🩺', description: 'Üreme sağlığı hijyeni', color: 'from-blue-800 to-indigo-900' },
    { id: 'health-checkup', title: 'Sağlık Kontrolü', icon: '🏥', description: 'Düzenli sağlık kontrolü', color: 'from-indigo-800 to-purple-900' },
    { id: 'healthy-lifestyle', title: 'Sağlıklı Yaşam', icon: '🏃', description: 'Sağlıklı yaşam alışkanlıkları', color: 'from-purple-800 to-pink-900' },
    { id: 'hygiene-awareness', title: 'Hijyen Bilinci', icon: '🧠', description: 'Hijyen farkındalığı', color: 'from-pink-800 to-rose-900' },
    { id: 'life-hygiene', title: 'Yaşam Hijyeni', icon: '🌟', description: 'Kapsamlı hijyen yaklaşımı', color: 'from-rose-800 to-red-900' }
  ]
};

export default function HygieneGames({ gradeLevel, onExit }: HygieneGamesProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const allGames = Object.entries(gamesByGrade).flatMap(([grade, games]) => 
    games.map(game => ({ ...game, grade: parseInt(grade) }))
  );

  if (selectedGame) {
    const game = allGames.find(g => g.id === selectedGame);
    if (game) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
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
              <h1 className="text-white text-4xl md:text-5xl font-black">{game.icon} {game.title}</h1>
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
                className="w-full bg-blue-500 hover:bg-blue-400 text-white text-2xl font-black py-5 rounded-2xl transition-all"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="w-full max-w-7xl mx-auto px-2">
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
              color={game.color}
              description={`${game.description} (${game.grade}. Sınıf)`}
              onClick={() => setSelectedGame(game.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
