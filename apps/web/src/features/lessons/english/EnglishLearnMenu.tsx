import { useNavigate } from 'react-router-dom';
import { GameCard } from '@egitim-galaksisi/ui';

export default function EnglishLearnMenu() {
  const navigate = useNavigate();

  const grades = [2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-sky-700 to-blue-600 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/lessons/english')}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="text-7xl mb-4">🇬🇧</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">İngilizce - Öğren</h1>
          <p className="text-white/80 text-lg">Sınıfını seç ve öğrenmeye başla!</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {grades.map((grade) => (
            <GameCard
              key={grade}
              title={`${grade}. Sınıf`}
              icon={`${grade}`}
              color="bg-gradient-to-br from-blue-500 to-cyan-600"
              description={`${grade}. sınıf İngilizce dersleri`}
              onClick={() => navigate(`/lessons/english/learn/grade${grade}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
