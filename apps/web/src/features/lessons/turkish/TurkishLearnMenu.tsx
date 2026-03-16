import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { GameCard } from '@egitim-galaksisi/ui';

export default function TurkishLearnMenu() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const grades = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-orange-600 p-8">
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="mb-8">
          <button
            onClick={() => navigate('/lessons/turkish')}
            className="text-white/60 hover:text-white mb-4 flex items-center gap-2"
          >
            ← Geri
          </button>
          <div className="text-center">
            <div className="text-7xl mb-4">📖</div>
            <h1 className="text-4xl font-bold text-white mb-2">Türkçe - Öğren</h1>
            <p className="text-white/60">Sınıfını seç ve konuları öğrenmeye başla</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-7xl mx-auto pb-32">
          {grades.map((grade) => (
            <GameCard
              key={grade}
              title={`${grade}. Sınıf`}
              icon="📚"
              color="bg-gradient-to-br from-red-500 to-orange-600"
              description={`${grade}. sınıf Türkçe konuları`}
              onClick={() => navigate(`/lessons/turkish/learn/grade${grade}`)}
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
