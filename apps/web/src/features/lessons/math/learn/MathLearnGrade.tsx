import { useNavigate, useParams } from 'react-router-dom';
import { GameCard } from '@egitim-galaksisi/ui';

// Topic definitions by grade
const topicsByGrade: Record<string, Array<{ id: string; name: string; icon: string; description: string }>> = {
  '1': [
    { id: 'numbers', name: 'Sayılar', icon: '🔢', description: '0-20 arası sayılar' },
    { id: 'addition', name: 'Toplama', icon: '➕', description: 'Basit toplama işlemleri' },
    { id: 'subtraction', name: 'Çıkarma', icon: '➖', description: 'Basit çıkarma işlemleri' },
    { id: 'shapes', name: 'Şekiller', icon: '🔷', description: 'Temel geometrik şekiller' },
  ],
  '2': [
    { id: 'numbers', name: 'Sayılar', icon: '🔢', description: '0-100 arası sayılar' },
    { id: 'addition', name: 'Toplama', icon: '➕', description: 'İki basamaklı toplama' },
    { id: 'subtraction', name: 'Çıkarma', icon: '➖', description: 'İki basamaklı çıkarma' },
    { id: 'multiplication', name: 'Çarpma', icon: '✖️', description: 'Çarpma tablosu' },
    { id: 'time', name: 'Zaman', icon: '🕐', description: 'Saat okuma' },
  ],
  '3': [
    { id: 'numbers', name: 'Sayılar', icon: '🔢', description: '0-1000 arası sayılar' },
    { id: 'operations', name: 'Dört İşlem', icon: '➗', description: 'Toplama, çıkarma, çarpma, bölme' },
    { id: 'fractions', name: 'Kesirler', icon: '½', description: 'Basit kesirler' },
    { id: 'geometry', name: 'Geometri', icon: '📐', description: 'Şekiller ve açılar' },
  ],
  '4': [
    { id: 'numbers', name: 'Doğal Sayılar', icon: '🔢', description: 'Büyük sayılar' },
    { id: 'operations', name: 'Dört İşlem', icon: '➗', description: 'İleri seviye işlemler' },
    { id: 'fractions', name: 'Kesirler', icon: '½', description: 'Kesirlerle işlemler' },
    { id: 'geometry', name: 'Geometri', icon: '📐', description: 'Alan ve çevre' },
  ],
  '5': [
    { id: 'numbers', name: 'Doğal Sayılar', icon: '🔢', description: 'Çok basamaklı sayılar' },
    { id: 'fractions', name: 'Kesirler', icon: '½', description: 'Kesir işlemleri' },
    { id: 'decimals', name: 'Ondalık Sayılar', icon: '0.5', description: 'Ondalık gösterim' },
    { id: 'geometry', name: 'Geometri', icon: '📐', description: 'Üçgenler ve dörtgenler' },
  ],
  '6': [
    { id: 'integers', name: 'Tam Sayılar', icon: '➖', description: 'Negatif sayılar' },
    { id: 'fractions', name: 'Kesirler', icon: '½', description: 'İleri kesir işlemleri' },
    { id: 'ratio', name: 'Oran-Orantı', icon: '⚖️', description: 'Oran ve orantı' },
    { id: 'geometry', name: 'Geometri', icon: '📐', description: 'Açılar ve çemberler' },
  ],
  '7': [
    { id: 'integers', name: 'Tam Sayılar', icon: '➖', description: 'Tam sayı işlemleri' },
    { id: 'rational', name: 'Rasyonel Sayılar', icon: '½', description: 'Rasyonel sayılar' },
    { id: 'equations', name: 'Denklemler', icon: 'x=', description: 'Birinci derece denklemler' },
    { id: 'geometry', name: 'Geometri', icon: '📐', description: 'Çember ve daire' },
  ],
  '8': [
    { id: 'powers', name: 'Üslü Sayılar', icon: 'x²', description: 'Üslü ifadeler' },
    { id: 'roots', name: 'Köklü Sayılar', icon: '√', description: 'Karekök işlemleri' },
    { id: 'equations', name: 'Denklemler', icon: 'x=', description: 'Denklem sistemleri' },
    { id: 'geometry', name: 'Geometri', icon: '📐', description: 'Pisagor teoremi' },
  ],
};

export default function MathLearnGrade() {
  const navigate = useNavigate();
  const { grade } = useParams<{ grade: string }>();
  const gradeNumber = grade?.replace('grade', '') || '1';
  const topics = topicsByGrade[gradeNumber] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-blue-600 p-8">
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="mb-8">
          <button
            onClick={() => navigate('/lessons/math/learn')}
            className="text-white/60 hover:text-white mb-4 flex items-center gap-2"
          >
            ← Geri
          </button>
          <div className="text-center">
            <div className="text-7xl mb-4">📖</div>
            <h1 className="text-4xl font-bold text-white mb-2">{gradeNumber}. Sınıf Matematik</h1>
            <p className="text-white/60">Öğrenmek istediğin konuyu seç</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
          {topics.map((topic) => (
            <GameCard
              key={topic.id}
              title={topic.name}
              icon={topic.icon}
              color="bg-gradient-to-br from-indigo-600 to-blue-700"
              description={topic.description}
              onClick={() => {
                // Navigate to topic detail page (to be created)
                alert(`${topic.name} konusu yakında eklenecek!`);
              }}
            />
          ))}
        </div>

        {topics.length === 0 && (
          <div className="text-center text-white/60">
            <p>Bu sınıf için henüz konu eklenmemiş.</p>
          </div>
        )}
      </div>
    </div>
  );
}
