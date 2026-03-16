import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { GameCard } from '@egitim-galaksisi/ui';

export default function TurkishPlayground() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const grades = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-orange-600 p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/lessons/turkish')}
            className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm relative z-50"
          >
            ⬅ GERİ DÖN
          </button>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
            Oyun Alanı
          </h2>
          <div className="flex justify-center gap-3">
            <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              EĞLENCE MOLA ZAMANI! 🎮
            </span>
          </div>
          <p className="text-white/80 text-lg mt-4">Sınıfını seç ve oyunlara başla</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-7xl mx-auto pb-32">
          {grades.map((grade) => (
            <GameCard
              key={grade}
              title={`${grade}. Sınıf`}
              icon="🎮"
              color="from-red-500 to-orange-600"
              description={`${grade}. sınıf oyunları`}
              onClick={() => navigate(`/games/turkish/playground/grade${grade}`)}
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
