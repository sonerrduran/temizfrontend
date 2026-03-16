import { useNavigate, useParams } from 'react-router-dom';
import { GameCard } from '@egitim-galaksisi/ui';

// Sınıflara göre kategoriler
const categoriesByGrade: Record<string, Array<{ id: string; name: string; icon: string; description: string }>> = {
  '1': [
    { id: 'numbers', name: 'Sayılar', icon: '🔢', description: '0-20 arası sayılar' },
    { id: 'addition', name: 'Toplama', icon: '➕', description: 'Basit toplama' },
    { id: 'subtraction', name: 'Çıkarma', icon: '➖', description: 'Basit çıkarma' },
    { id: 'shapes', name: 'Şekiller', icon: '🔷', description: 'Geometrik şekiller' },
  ],
  '2': [
    { id: 'numbers', name: 'Sayılar', icon: '🔢', description: '0-100 arası sayılar' },
    { id: 'addition', name: 'Toplama', icon: '➕', description: 'İki basamaklı toplama' },
    { id: 'subtraction', name: 'Çıkarma', icon: '➖', description: 'İki basamaklı çıkarma' },
    { id: 'multiplication', name: 'Çarpma', icon: '✖️', description: 'Çarpma tablosu' },
  ],
  '3': [
    { id: 'operations', name: 'Dört İşlem', icon: '➗', description: 'Toplama, çıkarma, çarpma, bölme' },
    { id: 'fractions', name: 'Kesirler', icon: '½', description: 'Basit kesirler' },
    { id: 'geometry', name: 'Geometri', icon: '📐', description: 'Şekiller ve açılar' },
  ],
  '4': [
    { id: 'operations', name: 'Dört İşlem', icon: '➗', description: 'İleri seviye işlemler' },
    { id: 'fractions', name: 'Kesirler', icon: '½', description: 'Kesirlerle işlemler' },
    { id: 'geometry', name: 'Geometri', icon: '📐', description: 'Alan ve çevre' },
  ],
  '5': [
    { id: 'fractions', name: 'Kesirler', icon: '½', description: 'Kesir işlemleri' },
    { id: 'decimals', name: 'Ondalık Sayılar', icon: '0.5', description: 'Ondalık gösterim' },
    { id: 'geometry', name: 'Geometri', icon: '📐', description: 'Üçgenler ve dörtgenler' },
  ],
  '6': [
    { id: 'integers', name: 'Tam Sayılar', icon: '➖', description: 'Negatif sayılar' },
    { id: 'fractions', name: 'Kesirler', icon: '½', description: 'İleri kesir işlemleri' },
    { id: 'geometry', name: 'Geometri', icon: '📐', description: 'Açılar ve çemberler' },
  ],
  '7': [
    { id: 'integers', name: 'Tam Sayılar', icon: '➖', description: 'Tam sayı işlemleri' },
    { id: 'algebra', name: 'Cebir', icon: 'x=', description: 'Denklemler' },
    { id: 'geometry', name: 'Geometri', icon: '📐', description: 'Çember ve daire' },
  ],
  '8': [
    { id: 'powers', name: 'Üslü Sayılar', icon: 'x²', description: 'Üslü ifadeler' },
    { id: 'roots', name: 'Köklü Sayılar', icon: '√', description: 'Karekök işlemleri' },
    { id: 'algebra', name: 'Cebir', icon: 'x=', description: 'Denklem sistemleri' },
  ],
};

export default function MathPlaygroundGrade() {
  const navigate = useNavigate();
  const { grade } = useParams<{ grade: string }>();
  const gradeNumber = grade?.replace('grade', '') || '1';
  const categories = categoriesByGrade[gradeNumber] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-blue-600 p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/games/math/playground')}
            className="mb-4 text-white/60 hover:text-white flex items-center gap-2"
          >
            ← Geri
          </button>
          <div className="text-7xl mb-4">🎮</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{gradeNumber}. Sınıf Oyunları</h1>
          <p className="text-white/80 text-lg">Kategori seç ve oynamaya başla</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
          {categories.map((category) => (
            <GameCard
              key={category.id}
              title={category.name}
              icon={category.icon}
              color="from-indigo-600 to-blue-700"
              description={category.description}
              onClick={() => navigate(`/games/math/playground/${grade}/${category.id}`)}
            />
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center text-white/60">
            <p>Bu sınıf için henüz kategori eklenmemiş.</p>
          </div>
        )}
      </div>
    </div>
  );
}
