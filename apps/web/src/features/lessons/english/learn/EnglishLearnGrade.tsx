import { useNavigate, useParams } from 'react-router-dom';
import { GameCard } from '@egitim-galaksisi/ui';

export default function EnglishLearnGrade() {
  const navigate = useNavigate();
  const { grade } = useParams();

  const topics = [
    { id: 'vocabulary', title: 'Kelime Bilgisi', icon: '📖', desc: 'Yeni kelimeler öğren' },
    { id: 'grammar', title: 'Dilbilgisi', icon: '📝', desc: 'Gramer kurallarını öğren' },
    { id: 'reading', title: 'Okuma', icon: '📚', desc: 'İngilizce metinler oku' },
    { id: 'listening', title: 'Dinleme', icon: '🎧', desc: 'Dinleme pratiği yap' },
    { id: 'speaking', title: 'Konuşma', icon: '🗣️', desc: 'Konuşma pratiği yap' },
    { id: 'writing', title: 'Yazma', icon: '✍️', desc: 'Yazma becerilerini geliştir' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-sky-700 to-blue-600 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/lessons/english/learn')}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="text-7xl mb-4">🇬🇧</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            İngilizce - {grade}. Sınıf
          </h1>
          <p className="text-white/80 text-lg">Konu seç ve öğrenmeye başla!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <GameCard
              key={topic.id}
              title={topic.title}
              icon={topic.icon}
              color="bg-gradient-to-br from-blue-500 to-cyan-600"
              description={topic.desc}
              onClick={() => navigate(`/lessons/english/learn/grade${grade}/${topic.id}`)}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <p className="text-white text-lg">İçerik geliştiriliyor...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
