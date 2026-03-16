import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { GameCard } from '@egitim-galaksisi/ui';

// Tüm sınıflar için konular
const allTopics = [
  { id: 'numbers', name: 'Sayılar', icon: '🔢', description: 'Sayılar ve basamak değeri', grades: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 'addition', name: 'Toplama', icon: '➕', description: 'Toplama işlemleri', grades: [1, 2, 3, 4, 5] },
  { id: 'subtraction', name: 'Çıkarma', icon: '➖', description: 'Çıkarma işlemleri', grades: [1, 2, 3, 4, 5] },
  { id: 'multiplication', name: 'Çarpma', icon: '✖️', description: 'Çarpma işlemleri', grades: [2, 3, 4, 5] },
  { id: 'division', name: 'Bölme', icon: '➗', description: 'Bölme işlemleri', grades: [3, 4, 5] },
  { id: 'fractions', name: 'Kesirler', icon: '½', description: 'Kesirler ve işlemler', grades: [3, 4, 5, 6] },
  { id: 'decimals', name: 'Ondalık Sayılar', icon: '0.5', description: 'Ondalık gösterim', grades: [5, 6] },
  { id: 'geometry', name: 'Geometri', icon: '📐', description: 'Şekiller ve açılar', grades: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 'measurement', name: 'Ölçme', icon: '📏', description: 'Uzunluk, ağırlık, zaman', grades: [1, 2, 3, 4, 5] },
  { id: 'data', name: 'Veri İşleme', icon: '📊', description: 'Grafik ve tablolar', grades: [2, 3, 4, 5, 6, 7, 8] },
  { id: 'integers', name: 'Tam Sayılar', icon: '➖', description: 'Negatif sayılar', grades: [6, 7] },
  { id: 'algebra', name: 'Cebir', icon: 'x=', description: 'Denklemler ve eşitsizlikler', grades: [7, 8] },
  { id: 'powers', name: 'Üslü Sayılar', icon: 'x²', description: 'Üslü ifadeler', grades: [8] },
  { id: 'roots', name: 'Köklü Sayılar', icon: '√', description: 'Karekök işlemleri', grades: [8] },
];

export default function MathPracticeMenu() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  // Kullanıcının sınıfına uygun konuları filtrele
  const availableTopics = allTopics.filter(topic => topic.grades.includes(gradeLevel));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-green-500 p-8">
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="mb-8">
          <button
            onClick={() => navigate('/lessons/math')}
            className="text-white/60 hover:text-white mb-4 flex items-center gap-2"
          >
            ← Geri
          </button>
          <div className="text-center">
            <div className="text-7xl mb-4">✍️</div>
            <h1 className="text-4xl font-bold text-white mb-2">Matematik - Pratik Yap</h1>
            <p className="text-white/60">Pratik yapmak istediğin konuyu seç</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
          {availableTopics.map((topic) => (
            <GameCard
              key={topic.id}
              title={topic.name}
              icon={topic.icon}
              color="bg-gradient-to-br from-green-500 to-emerald-500"
              description={topic.description}
              onClick={() => navigate(`/lessons/math/practice/${topic.id}`)}
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-white/50 text-sm">Senin sınıfın: {gradeLevel}. Sınıf</p>
        </div>
      </div>
    </div>
  );
}
