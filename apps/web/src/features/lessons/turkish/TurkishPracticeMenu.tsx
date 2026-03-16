import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { GameCard } from '@egitim-galaksisi/ui';

const allTopics = [
  { id: 'reading', name: 'Okuma', icon: '📖', description: 'Akıcı okuma ve anlama', grades: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 'writing', name: 'Yazma', icon: '✍️', description: 'Yazma becerileri', grades: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 'grammar', name: 'Dil Bilgisi', icon: '📝', description: 'Dilbilgisi kuralları', grades: [2, 3, 4, 5, 6, 7, 8] },
  { id: 'vocabulary', name: 'Kelime Bilgisi', icon: '📚', description: 'Kelime hazinesi', grades: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 'listening', name: 'Dinleme', icon: '👂', description: 'Dinleme ve anlama', grades: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 'speaking', name: 'Konuşma', icon: '🗣️', description: 'Sözlü anlatım', grades: [1, 2, 3, 4, 5, 6, 7, 8] },
];

export default function TurkishPracticeMenu() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const availableTopics = allTopics.filter(topic => topic.grades.includes(gradeLevel));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-green-500 p-8">
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="mb-8">
          <button
            onClick={() => navigate('/lessons/turkish')}
            className="text-white/60 hover:text-white mb-4 flex items-center gap-2"
          >
            ← Geri
          </button>
          <div className="text-center">
            <div className="text-7xl mb-4">✍️</div>
            <h1 className="text-4xl font-bold text-white mb-2">Türkçe - Pratik Yap</h1>
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
              onClick={() => navigate(`/lessons/turkish/practice/${topic.id}`)}
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
