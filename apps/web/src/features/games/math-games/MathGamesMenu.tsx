import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { GameCard } from '@egitim-galaksisi/ui';

export default function MathGamesMenu() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const categories = [
    {
      id: 'learn',
      name: 'Öğren',
      icon: '📖',
      color: 'from-blue-500 to-cyan-500',
      description: 'Konuları öğren, videolar izle',
      path: '/lessons/math/learn',
    },
    {
      id: 'practice',
      name: 'Pratik Yap',
      icon: '✍️',
      color: 'from-green-500 to-emerald-500',
      description: 'Test çöz, alıştırma yap',
      path: '/lessons/math/practice',
    },
    {
      id: 'games',
      name: 'Oyun Alanı',
      icon: '🎮',
      color: 'from-purple-500 to-pink-500',
      description: 'Eğlenceli oyunlarla öğren',
      path: '/games/math/playground',
    },
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
            <h1 className="text-4xl font-bold text-white mb-2">Matematik</h1>
            <p className="text-white/60">Nasıl öğrenmek istersin?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => (
            <GameCard
              key={category.id}
              title={category.name}
              icon={category.icon}
              color={category.color}
              description={category.description}
              onClick={() => navigate(category.path)}
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
