import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../../../stores/authStore';
import { GameCard } from '@egitim-galaksisi/ui';

const practiceTypes = [
  {
    id: 'test',
    name: 'Test Çöz',
    icon: '📝',
    color: 'from-amber-500 to-yellow-500',
    description: 'Çoktan seçmeli sorular',
  },
  {
    id: 'true-false',
    name: 'Doğru/Yanlış',
    icon: '✓✗',
    color: 'from-green-500 to-emerald-500',
    description: 'Doğru yanlış soruları',
  },
  {
    id: 'fill-blank',
    name: 'Boşluk Doldurma',
    icon: '📋',
    color: 'from-blue-500 to-cyan-500',
    description: 'Boşlukları doldur',
  },
  {
    id: 'classic',
    name: 'Klasik Soru',
    icon: '✍️',
    color: 'from-purple-500 to-violet-500',
    description: 'Açık uçlu sorular',
  },
];

// Konu isimleri
const topicNames: Record<string, string> = {
  'numbers': 'Sayılar',
  'addition': 'Toplama',
  'subtraction': 'Çıkarma',
  'multiplication': 'Çarpma',
  'division': 'Bölme',
  'fractions': 'Kesirler',
  'decimals': 'Ondalık Sayılar',
  'geometry': 'Geometri',
  'measurement': 'Ölçme',
  'data': 'Veri İşleme',
  'integers': 'Tam Sayılar',
  'algebra': 'Cebir',
  'powers': 'Üslü Sayılar',
  'roots': 'Köklü Sayılar',
};

export default function MathPracticeTopic() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { topic } = useParams<{ topic: string }>();
  const gradeLevel = user?.gradeLevel || 1;
  const topicName = topicNames[topic || ''] || topic;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-green-500 p-8">
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="mb-8">
          <button
            onClick={() => navigate('/lessons/math/practice')}
            className="text-white/60 hover:text-white mb-4 flex items-center gap-2"
          >
            ← Geri
          </button>
          <div className="text-center">
            <div className="text-7xl mb-4">✍️</div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {topicName}
            </h1>
            <p className="text-white/60">Pratik türünü seç</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-7xl mx-auto pb-32">
          {practiceTypes.map((type) => (
            <GameCard
              key={type.id}
              title={type.name}
              icon={type.icon}
              color={`bg-gradient-to-br ${type.color}`}
              description={type.description}
              onClick={() => {
                // Navigate to practice activity (to be created)
                alert(`${type.name} yakında eklenecek!`);
              }}
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
