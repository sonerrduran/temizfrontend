import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { GameCard } from '@egitim-galaksisi/ui';

export default function MathGamesMenu() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const grades = [
    {
      id: 'preschool',
      name: 'Okul Öncesi',
      icon: '🎈',
      color: 'from-orange-500 to-pink-500',
      description: 'Okul öncesi matematik oyunları',
      path: '/games/math/preschool',
    },
    ...Array.from({ length: 8 }, (_, i) => ({
      id: `grade${i + 1}`,
      name: `${i + 1}. Sınıf`,
      icon: '🎮',
      color: 'from-blue-500 to-indigo-500',
      description: `${i + 1}. sınıf matematik oyunları`,
      path: `/games/math/grade${i + 1}`,
    })),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white/60 hover:text-white mb-4 flex items-center gap-2"
          >
            ← Geri
          </button>
          <div className="text-center">
            <div className="text-7xl mb-4">🔢</div>
            <h1 className="text-4xl font-bold text-white mb-2">Matematik Oyunları</h1>
            <p className="text-white/60">Sınıfını seç ve oynamaya başla</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
          {grades.map((grade) => (
            <GameCard
              key={grade.id}
              title={grade.name}
              icon={grade.icon}
              color={grade.color}
              description={grade.description}
              onClick={() => navigate(grade.path)}
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-white/50 text-sm mb-4">Senin sınıfın: {gradeLevel}. Sınıf</p>
        </div>
      </div>
    </div>
  );
}
