import React from 'react';
import { useNavigate } from 'react-router-dom';

const TurkishGrade4Menu: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'composition',
      name: 'Kompozisyon',
      icon: '✍️',
      description: 'Yazma ve kompozisyon',
      color: 'from-blue-500 to-cyan-600',
      games: [
        { name: 'Paragraf Yazma', path: '/games/turkish/grade4/composition/paragraph' },
        { name: 'Hikaye Yazma', path: '/games/turkish/grade4/composition/story' },
        { name: 'Mektup Yazma', path: '/games/turkish/grade4/composition/letter' },
        { name: 'Günlük Yazma', path: '/games/turkish/grade4/composition/diary' },
      ],
    },
    {
      id: 'paragraph',
      name: 'Paragraf',
      icon: '📄',
      description: 'Paragraf yapısı ve analizi',
      color: 'from-green-500 to-emerald-600',
      games: [
        { name: 'Ana Fikir', path: '/games/turkish/grade4/paragraph/main-idea' },
        { name: 'Yardımcı Fikirler', path: '/games/turkish/grade4/paragraph/supporting' },
        { name: 'Paragraf Düzenleme', path: '/games/turkish/grade4/paragraph/organization' },
        { name: 'Paragraf Tamamlama', path: '/games/turkish/grade4/paragraph/completion' },
      ],
    },
    {
      id: 'punctuation',
      name: 'Noktalama',
      icon: '❗',
      description: 'Noktalama işaretleri',
      color: 'from-purple-500 to-violet-600',
      games: [
        { name: 'Nokta ve Virgül', path: '/games/turkish/grade4/punctuation/period-comma' },
        { name: 'Soru İşareti', path: '/games/turkish/grade4/punctuation/question' },
        { name: 'Ünlem İşareti', path: '/games/turkish/grade4/punctuation/exclamation' },
        { name: 'Tırnak İşareti', path: '/games/turkish/grade4/punctuation/quotation' },
      ],
    },
    {
      id: 'vocabulary',
      name: 'Kelime Bilgisi',
      icon: '📚',
      description: 'Kelime dağarcığı',
      color: 'from-orange-500 to-red-600',
      games: [
        { name: 'Atasözleri', path: '/games/turkish/grade4/vocabulary/proverbs' },
        { name: 'Deyimler', path: '/games/turkish/grade4/vocabulary/idioms' },
        { name: 'Eş Sesli Kelimeler', path: '/games/turkish/grade4/vocabulary/homophones' },
        { name: 'Kelime Kökeni', path: '/games/turkish/grade4/vocabulary/etymology' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-red-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">4. Sınıf Türkçe</h1>
          <p className="text-white/80 text-lg">Kompozisyon, paragraf ve noktalama</p>
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

export default TurkishGrade4Menu;
