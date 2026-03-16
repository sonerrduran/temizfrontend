import { useNavigate, useParams } from 'react-router-dom';
import { GameCard } from '@egitim-galaksisi/ui';

// Kategorilere göre oyunlar
const gamesByCategory: Record<string, Array<{ id: string; name: string; icon: string; description: string; color: string }>> = {
  'numbers': [
    { id: 'number-recognition', name: 'Sayı Tanıma', icon: '🔢', description: 'Sayıları tanı ve eşleştir', color: 'from-blue-500 to-cyan-500' },
    { id: 'counting', name: 'Sayma Oyunu', icon: '🧮', description: 'Nesneleri say', color: 'from-green-500 to-emerald-500' },
    { id: 'number-order', name: 'Sayı Sırala', icon: '📊', description: 'Sayıları sıraya koy', color: 'from-purple-500 to-pink-500' },
  ],
  'addition': [
    { id: 'addition-basic', name: 'Toplama Pratik', icon: '➕', description: 'Basit toplama işlemleri', color: 'from-green-500 to-emerald-500' },
    { id: 'addition-speed', name: 'Hızlı Toplama', icon: '⚡', description: 'Süre yarışı', color: 'from-orange-500 to-red-500' },
  ],
  'subtraction': [
    { id: 'subtraction-basic', name: 'Çıkarma Pratik', icon: '➖', description: 'Basit çıkarma işlemleri', color: 'from-red-500 to-pink-500' },
    { id: 'subtraction-speed', name: 'Hızlı Çıkarma', icon: '⚡', description: 'Süre yarışı', color: 'from-orange-500 to-amber-500' },
  ],
  'multiplication': [
    { id: 'multiplication-table', name: 'Çarpım Tablosu', icon: '✖️', description: 'Çarpım tablosunu öğren', color: 'from-indigo-500 to-purple-500' },
    { id: 'multiplication-speed', name: 'Hızlı Çarpma', icon: '⚡', description: 'Süre yarışı', color: 'from-yellow-500 to-orange-500' },
  ],
  'shapes': [
    { id: 'shape-match', name: 'Şekil Eşleştir', icon: '🔷', description: 'Şekilleri eşleştir', color: 'from-cyan-500 to-blue-500' },
    { id: 'shape-build', name: 'Şekil Oluştur', icon: '🏗️', description: 'Şekiller oluştur', color: 'from-pink-500 to-rose-500' },
  ],
};

const categoryNames: Record<string, string> = {
  'numbers': 'Sayılar',
  'addition': 'Toplama',
  'subtraction': 'Çıkarma',
  'multiplication': 'Çarpma',
  'operations': 'Dört İşlem',
  'fractions': 'Kesirler',
  'decimals': 'Ondalık Sayılar',
  'geometry': 'Geometri',
  'integers': 'Tam Sayılar',
  'algebra': 'Cebir',
  'powers': 'Üslü Sayılar',
  'roots': 'Köklü Sayılar',
  'shapes': 'Şekiller',
};

export default function MathPlaygroundCategory() {
  const navigate = useNavigate();
  const { grade, category } = useParams<{ grade: string; category: string }>();
  const gradeNumber = grade?.replace('grade', '') || '1';
  const categoryName = categoryNames[category || ''] || category;
  const games = gamesByCategory[category || ''] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-blue-600 p-8">
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="mb-8">
          <button
            onClick={() => navigate(`/games/math/playground/${grade}`)}
            className="text-white/60 hover:text-white mb-4 flex items-center gap-2"
          >
            ← Geri
          </button>
          <div className="text-center">
            <div className="text-7xl mb-4">🎮</div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {gradeNumber}. Sınıf - {categoryName}
            </h1>
            <p className="text-white/60">Oyun seç ve oyna</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.name}
              icon={game.icon}
              color={game.color}
              description={game.description}
              onClick={() => alert(`${game.name} oyunu yakında eklenecek!`)}
            />
          ))}
        </div>

        {games.length === 0 && (
          <div className="text-center text-white/60">
            <p>Bu kategori için henüz oyun eklenmemiş.</p>
          </div>
        )}
      </div>
    </div>
  );
}
