import { useNavigate } from 'react-router-dom';

export default function FastReadingMenu() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'measurement',
      title: 'Ölçüm & Eğitim',
      icon: '📚',
      description: 'Okuma hızı testi, teknikler ve anlama egzersizleri',
      gradient: 'from-indigo-500 to-blue-700',
      path: '/fast-reading/measurement'
    },
    {
      id: 'eye-flow',
      title: 'Göz & Akış',
      icon: '👁️',
      description: 'Kelime akışı, gruplama ve satır takibi',
      gradient: 'from-emerald-500 to-teal-700',
      path: '/fast-reading/eye-flow'
    },
    {
      id: 'focus-training',
      title: 'Odak & Antrenman',
      icon: '🧠',
      description: 'Göz kasları, periferik görüş ve beyin oyunları',
      gradient: 'from-orange-500 to-red-600',
      path: '/fast-reading/focus-training'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="text-6xl mb-4">⚡</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">Hızlı Okuma Merkezi</h1>
          <p className="text-white/80 text-lg">Okuma hızını artır, göz kaslarını geliştir ve odaklanmayı öğren!</p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(category.path)}
              className={`bg-gradient-to-br ${category.gradient} p-8 rounded-2xl text-white hover:scale-105 transition-all duration-300 text-left border-2 border-white/10`}
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
              <p className="text-white/80 text-sm">{category.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
