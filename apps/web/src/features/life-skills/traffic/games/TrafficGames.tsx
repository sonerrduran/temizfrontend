import { useState } from 'react';
import { GameCard } from '@egitim-galaksisi/ui';

interface TrafficGamesProps {
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
    { id: 'traffic-light', title: 'Trafik Işığı Oyunu', icon: '🚦', description: 'Işıkları öğren, doğru zamanda geç', color: 'from-red-500 to-green-500' },
    { id: 'crosswalk', title: 'Yaya Geçidi Yarışı', icon: '🚶', description: 'Güvenli geçiş yap', color: 'from-blue-500 to-cyan-600' },
    { id: 'sign-match', title: 'İşaret Eşleştirme', icon: '🔺', description: 'Trafik levhalarını eşleştir', color: 'from-green-500 to-emerald-600' },
    { id: 'safe-walk', title: 'Güvenli Yürüyüş', icon: '👣', description: 'Kaldırımda güvenle yürü', color: 'from-purple-500 to-pink-600' },
    { id: 'stop-go', title: 'Dur-Geç Oyunu', icon: '✋', description: 'Reflekslerini test et', color: 'from-orange-500 to-red-600' }
  ],
  2: [
    { id: 'traffic-light-advanced', title: 'Gelişmiş Işık Oyunu', icon: '🚦', description: 'Tüm ışık kombinasyonları', color: 'from-red-500 to-yellow-500' },
    { id: 'school-bus', title: 'Okul Servisi Güvenliği', icon: '🚌', description: 'Serviste güvenli davran', color: 'from-yellow-500 to-amber-600' },
    { id: 'pedestrian-sim', title: 'Yaya Simülasyonu', icon: '🚶‍♂️', description: 'Şehirde güvenle dolaş', color: 'from-blue-500 to-indigo-600' },
    { id: 'sign-quiz', title: 'İşaret Bilgi Yarışması', icon: '❓', description: 'İşaretleri tanı', color: 'from-green-500 to-emerald-600' },
    { id: 'safe-route', title: 'Güvenli Rota', icon: '🗺️', description: 'En güvenli yolu bul', color: 'from-purple-500 to-violet-600' }
  ],
  3: [
    { id: 'bike-safety', title: 'Bisiklet Güvenliği', icon: '🚲', description: 'Bisikletle güvenle sür', color: 'from-cyan-500 to-blue-600' },
    { id: 'helmet-hero', title: 'Kask Kahramanı', icon: '🪖', description: 'Kaskın önemini öğren', color: 'from-red-500 to-rose-600' },
    { id: 'traffic-maze', title: 'Trafik Labirenti', icon: '🎯', description: 'Kurallarla labirentten çık', color: 'from-green-500 to-lime-600' },
    { id: 'sign-memory', title: 'İşaret Hafızası', icon: '🧠', description: 'İşaretleri ezberle', color: 'from-purple-500 to-fuchsia-600' },
    { id: 'crossroad-challenge', title: 'Kavşak Meydan Okuması', icon: '✖️', description: 'Kavşakta doğru karar ver', color: 'from-orange-500 to-amber-600' }
  ],
  4: [
    { id: 'bike-parkour', title: 'Bisiklet Parkuru', icon: '🚴', description: 'Engelli parkurda sür', color: 'from-blue-500 to-cyan-600' },
    { id: 'public-transport', title: 'Toplu Taşıma Güvenliği', icon: '🚇', description: 'Otobüs ve metroda güvenlik', color: 'from-indigo-500 to-purple-600' },
    { id: 'night-visibility', title: 'Gece Görünürlüğü', icon: '🌙', description: 'Karanlıkta görünür ol', color: 'from-slate-600 to-gray-700' },
    { id: 'emergency-vehicles', title: 'Acil Durum Araçları', icon: '🚑', description: 'Ambulans ve itfaiyeye yol ver', color: 'from-red-500 to-rose-600' },
    { id: 'weather-safety', title: 'Hava Koşulları Güvenliği', icon: '🌧️', description: 'Yağmur ve karda dikkat', color: 'from-sky-500 to-cyan-600' }
  ],
  5: [
    { id: 'scooter-safety', title: 'Scooter Güvenliği', icon: '🛴', description: 'Scooter ile güvenle git', color: 'from-lime-500 to-emerald-600' },
    { id: 'traffic-priority', title: 'Öncelik Kuralları', icon: '⚠️', description: 'Kim önce geçer?', color: 'from-yellow-500 to-amber-600' },
    { id: 'parking-rules', title: 'Park Kuralları', icon: '🅿️', description: 'Doğru park etmeyi öğren', color: 'from-blue-500 to-indigo-600' },
    { id: 'road-signs-expert', title: 'İşaret Uzmanı', icon: '🎓', description: 'Tüm işaretleri bil', color: 'from-purple-500 to-pink-600' },
    { id: 'safe-cyclist', title: 'Güvenli Bisikletçi', icon: '🚵', description: 'Profesyonel bisiklet sürüşü', color: 'from-teal-500 to-cyan-600' }
  ],
  6: [
    { id: 'traffic-simulator', title: 'Trafik Simülatörü', icon: '🎮', description: 'Gerçekçi trafik deneyimi', color: 'from-slate-600 to-gray-700' },
    { id: 'intersection-master', title: 'Kavşak Ustası', icon: '🔀', description: 'Karmaşık kavşakları yönet', color: 'from-orange-500 to-red-600' },
    { id: 'distraction-test', title: 'Dikkat Dağınıklığı Testi', icon: '📱', description: 'Dikkatini koru', color: 'from-red-500 to-rose-600' },
    { id: 'speed-awareness', title: 'Hız Farkındalığı', icon: '⚡', description: 'Hız limitlerini öğren', color: 'from-yellow-500 to-amber-600' },
    { id: 'defensive-riding', title: 'Savunma Sürüşü', icon: '🛡️', description: 'Tehlikeleri önceden gör', color: 'from-blue-500 to-indigo-600' }
  ],
  7: [
    { id: 'city-traffic', title: 'Şehir Trafiği', icon: '🏙️', description: 'Yoğun trafikte gezin', color: 'from-gray-600 to-slate-700' },
    { id: 'highway-rules', title: 'Otoyol Kuralları', icon: '🛣️', description: 'Otoyolda güvenlik', color: 'from-blue-600 to-indigo-700' },
    { id: 'accident-prevention', title: 'Kaza Önleme', icon: '🚨', description: 'Kazaları önlemeyi öğren', color: 'from-red-600 to-rose-700' },
    { id: 'traffic-psychology', title: 'Trafik Psikolojisi', icon: '🧠', description: 'Sürücü davranışlarını anla', color: 'from-purple-600 to-violet-700' },
    { id: 'advanced-signs', title: 'İleri Seviye İşaretler', icon: '📋', description: 'Tüm trafik işaretleri', color: 'from-green-600 to-emerald-700' }
  ],
  8: [
    { id: 'traffic-laws', title: 'Trafik Kanunları', icon: '⚖️', description: 'Yasal kuralları öğren', color: 'from-slate-700 to-gray-800' },
    { id: 'driver-prep', title: 'Sürücü Adayı Hazırlık', icon: '🚗', description: 'Ehliyet öncesi bilgiler', color: 'from-blue-700 to-indigo-800' },
    { id: 'traffic-management', title: 'Trafik Yönetimi', icon: '🎛️', description: 'Trafik akışını yönet', color: 'from-orange-600 to-red-700' },
    { id: 'eco-driving', title: 'Eko Sürüş', icon: '🌱', description: 'Çevre dostu sürüş', color: 'from-green-600 to-lime-700' },
    { id: 'virtual-city', title: 'Sanal Trafik Şehri', icon: '🌆', description: 'Tam simülasyon deneyimi', color: 'from-purple-700 to-pink-800' }
  ]
};

export default function TrafficGames({ gradeLevel, onExit }: TrafficGamesProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Tüm sınıfların oyunlarını birleştir
  const allGames = Object.entries(gamesByGrade).flatMap(([grade, games]) => 
    games.map(game => ({ ...game, grade: parseInt(grade) }))
  );

  // Oyun seçiliyse placeholder göster
  if (selectedGame) {
    const game = allGames.find(g => g.id === selectedGame);
    if (game) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => setSelectedGame(null)} className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all">
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
                className="w-full bg-red-500 hover:bg-red-400 text-white text-2xl font-black py-5 rounded-2xl transition-all"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <button onClick={onExit} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">
            ⬅ GERİ DÖN
          </button>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">Oyunlar</h2>
          <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Eğlenerek öğren!</p>
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
