import { useNavigate, useParams } from 'react-router-dom';
import { GameCard } from '@egitim-galaksisi/ui';

// Kategorilere göre oyunlar
const gamesByCategory: Record<string, Array<{ id: string; name: string; icon: string; description: string; color: string; component: string }>> = {
  'numbers': [
    { id: 'number-catcher', name: 'Sayı Yakalayıcı', icon: '🎯', description: 'Doğru sayıları yakala', color: 'from-blue-500 to-cyan-500', component: 'NumberCatcherGame' },
  ],
  'addition': [
    { id: 'speed-math', name: 'Hızlı Matematik', icon: '⚡', description: 'Hızlı toplama ve çıkarma', color: 'from-green-500 to-emerald-500', component: 'SpeedMathGame' },
  ],
  'subtraction': [
    { id: 'speed-math', name: 'Hızlı Matematik', icon: '⚡', description: 'Hızlı toplama ve çıkarma', color: 'from-red-500 to-pink-500', component: 'SpeedMathGame' },
  ],
  'multiplication': [
    { id: 'speed-math', name: 'Hızlı Matematik', icon: '⚡', description: 'Hızlı çarpma işlemleri', color: 'from-indigo-500 to-purple-500', component: 'SpeedMathGame' },
  ],
  'shapes': [
    { id: 'shapes-game', name: 'Şekiller Oyunu', icon: '🔷', description: 'Şekilleri tanı ve eşleştir', color: 'from-cyan-500 to-blue-500', component: 'ShapesGame' },
    { id: 'memory-match', name: 'Hafıza Eşleştirme', icon: '🧠', description: 'Kartları eşleştir', color: 'from-purple-500 to-pink-500', component: 'MemoryMatchGame' },
  ],
  'operations': [
    { id: 'test-game', name: 'Test Oyunu', icon: '📝', description: 'Dört işlem testi', color: 'from-blue-500 to-indigo-500', component: 'TestGame' },
    { id: 'classic-question', name: 'Klasik Sorular', icon: '❓', description: 'Klasik matematik soruları', color: 'from-green-500 to-teal-500', component: 'ClassicQuestionGame' },
    { id: 'true-false', name: 'Doğru-Yanlış', icon: '✓✗', description: 'Doğru mu yanlış mı?', color: 'from-orange-500 to-red-500', component: 'TrueFalseGame' },
    { id: 'fill-blank', name: 'Boşluk Doldur', icon: '📋', description: 'Boşlukları doldur', color: 'from-yellow-500 to-orange-500', component: 'FillBlankGame' },
    { id: 'cosmic-balance', name: 'Kozmik Denge', icon: '⚖️', description: 'Dengeyi sağla', color: 'from-purple-500 to-indigo-500', component: 'CosmicBalanceGame' },
  ],
  'fractions': [
    { id: 'test-game', name: 'Kesir Testi', icon: '📝', description: 'Kesirler testi', color: 'from-pink-500 to-rose-500', component: 'TestGame' },
    { id: 'classic-question', name: 'Kesir Soruları', icon: '½', description: 'Kesir problemleri', color: 'from-indigo-500 to-purple-500', component: 'ClassicQuestionGame' },
  ],
  'geometry': [
    { id: 'shapes-game', name: 'Geometri Oyunu', icon: '📐', description: 'Geometrik şekiller', color: 'from-cyan-500 to-blue-500', component: 'ShapesGame' },
    { id: 'test-game', name: 'Geometri Testi', icon: '📝', description: 'Geometri soruları', color: 'from-green-500 to-emerald-500', component: 'TestGame' },
  ],
  'decimals': [
    { id: 'test-game', name: 'Ondalık Test', icon: '📝', description: 'Ondalık sayılar testi', color: 'from-blue-500 to-cyan-500', component: 'TestGame' },
  ],
  'integers': [
    { id: 'test-game', name: 'Tam Sayılar Testi', icon: '📝', description: 'Tam sayılar testi', color: 'from-red-500 to-orange-500', component: 'TestGame' },
  ],
  'algebra': [
    { id: 'test-game', name: 'Cebir Testi', icon: '📝', description: 'Denklem soruları', color: 'from-purple-500 to-pink-500', component: 'TestGame' },
  ],
  'powers': [
    { id: 'test-game', name: 'Üslü Sayılar Testi', icon: '📝', description: 'Üslü sayılar testi', color: 'from-yellow-500 to-orange-500', component: 'TestGame' },
  ],
  'roots': [
    { id: 'test-game', name: 'Köklü Sayılar Testi', icon: '📝', description: 'Karekök soruları', color: 'from-green-500 to-teal-500', component: 'TestGame' },
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
              onClick={() => navigate(`/games/math/playground/${grade}/${category}/${game.id}`)}
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
