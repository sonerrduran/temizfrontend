import React from 'react';
import { useNavigate } from 'react-router-dom';

const TurkishGrade3Menu: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'idioms',
      name: 'Deyimler',
      icon: '💬',
      description: 'Deyim öğrenme ve kullanma',
      color: 'from-pink-500 to-rose-600',
      games: [
        { name: 'Deyim Öğrenme', path: '/games/turkish/grade3/idioms/learning' },
        { name: 'Deyim Eşleştirme', path: '/games/turkish/grade3/idioms/matching' },
        { name: 'Deyim Anlamı Bulma', path: '/games/turkish/grade3/idioms/meaning' },
        { name: 'Deyim Cümle Kurma', path: '/games/turkish/grade3/idioms/sentences' },
      ],
    },
    {
      id: 'grammar',
      name: 'Dilbilgisi',
      icon: '📝',
      description: 'Dilbilgisi kuralları',
      color: 'from-blue-500 to-cyan-600',
      games: [
        { name: 'Sözcük Türleri', path: '/games/turkish/grade3/grammar/word-types' },
        { name: 'Ekler', path: '/games/turkish/grade3/grammar/suffixes' },
        { name: 'Çoğul Ekler', path: '/games/turkish/grade3/grammar/plural' },
        { name: 'İyelik Ekleri', path: '/games/turkish/grade3/grammar/possessive' },
      ],
    },
    {
      id: 'sentence',
      name: 'Cümle Yapısı',
      icon: '🔤',
      description: 'Cümle kurma ve analiz',
      color: 'from-green-500 to-emerald-600',
      games: [
        { name: 'Cümle Kurma', path: '/games/turkish/grade3/sentence/building' },
        { name: 'Cümle Öğeleri', path: '/games/turkish/grade3/sentence/elements' },
        { name: 'Özne-Yüklem', path: '/games/turkish/grade3/sentence/subject-predicate' },
        { name: 'Cümle Tamamlama', path: '/games/turkish/grade3/sentence/completion' },
      ],
    },
    {
      id: 'comprehension',
      name: 'Anlama',
      icon: '🧠',
      description: 'Metin anlama ve yorumlama',
      color: 'from-purple-500 to-violet-600',
      games: [
        { name: 'Metin Anlama', path: '/games/turkish/grade3/comprehension/text' },
        { name: 'Ana Fikir Bulma', path: '/games/turkish/grade3/comprehension/main-idea' },
        { name: 'Detay Soruları', path: '/games/turkish/grade3/comprehension/details' },
        { name: 'Çıkarım Yapma', path: '/games/turkish/grade3/comprehension/inference' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-red-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">3. Sınıf Türkçe</h1>
          <p className="text-white/80 text-lg">Deyimler, dilbilgisi ve cümle yapısı</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 p-6 hover:bg-white/15 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{category.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  <p className="text-white/70 text-sm">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {category.games.map((game, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(game.path)}
                    className={`bg-gradient-to-r ${category.color} p-4 rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300 text-left`}
                  >
                    {game.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/lessons/turkish')}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-300 border border-white/20"
          >
            ← Sınıflar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TurkishGrade3Menu;
