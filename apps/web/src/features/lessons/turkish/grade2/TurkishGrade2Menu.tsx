import React from 'react';
import { useNavigate } from 'react-router-dom';

const TurkishGrade2Menu: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'reading',
      name: 'Okuma',
      icon: '📚',
      description: 'Okuma ve anlama becerileri',
      color: 'from-purple-500 to-violet-600',
      lessons: [
        { name: 'Akıcı Okuma', path: '/lessons/turkish/grade2/reading/fluency' },
        { name: 'Okuduğunu Anlama', path: '/lessons/turkish/grade2/reading/comprehension' },
      ],
    },
    {
      id: 'writing',
      name: 'Yazma',
      icon: '✍️',
      description: 'Yazma ve ifade becerileri',
      color: 'from-blue-500 to-cyan-600',
      lessons: [
        { name: 'Cümle Kurma', path: '/lessons/turkish/grade2/writing/sentences' },
        { name: 'Paragraf Yazma', path: '/lessons/turkish/grade2/writing/paragraphs' },
      ],
    },
    {
      id: 'vocabulary',
      name: 'Kelime Bilgisi',
      icon: '📖',
      description: 'Kelime hazinesi geliştirme',
      color: 'from-green-500 to-emerald-600',
      lessons: [
        { name: 'Eş Anlamlı Kelimeler', path: '/lessons/turkish/grade2/vocabulary/synonyms' },
        { name: 'Zıt Anlamlı Kelimeler', path: '/lessons/turkish/grade2/vocabulary/antonyms' },
      ],
    },
    {
      id: 'grammar',
      name: 'Dilbilgisi',
      icon: '📝',
      description: 'Temel dilbilgisi kuralları',
      color: 'from-pink-500 to-rose-600',
      lessons: [
        { name: 'İsimler', path: '/lessons/turkish/grade2/grammar/nouns' },
        { name: 'Fiiller', path: '/lessons/turkish/grade2/grammar/verbs' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-red-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">2. Sınıf Türkçe</h1>
          <p className="text-white/80 text-lg">Okuma, yazma ve dilbilgisi</p>
        </div>

        {/* Categories */}
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
                {category.lessons.map((lesson, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(lesson.path)}
                    className={`bg-gradient-to-r ${category.color} p-4 rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300 text-left`}
                  >
                    {lesson.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
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

export default TurkishGrade2Menu;
