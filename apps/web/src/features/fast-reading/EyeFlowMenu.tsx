import { useNavigate } from 'react-router-dom';

export default function EyeFlowMenu() {
  const navigate = useNavigate();

  const exercises = [
    {
      id: 'word-flow',
      title: 'Kelime Akışı',
      icon: '⚡',
      description: 'Ekranda belirip kaybolan kelimelerle refleksini güçlendir!',
      gradient: 'from-purple-500 to-fuchsia-700',
      path: '/fast-reading/word-flow'
    },
    {
      id: 'word-grouping',
      title: 'Kelime Gruplama',
      icon: '🔠',
      description: 'Kelimeleri bloklar halinde okuyarak sıçramaları azalt!',
      gradient: 'from-emerald-500 to-teal-700',
      path: '/fast-reading/word-grouping'
    },
    {
      id: 'line-tracking',
      title: 'Satır Takibi',
      icon: '📏',
      description: 'Satırları kaybetmeden hızlıca takip etme pratiği!',
      gradient: 'from-sky-500 to-blue-600',
      path: '/fast-reading/line-tracking'
    },
    {
      id: 'saccade',
      title: 'Sakkad Egzersizi',
      icon: '↔️',
      description: 'Göz sıçramalarını hızlandır ve kontrol et!',
      gradient: 'from-blue-500 to-indigo-700',
      path: '/fast-reading/saccade'
    },
    {
      id: 'expanding',
      title: 'Genişleyen Şekiller',
      icon: '🔷',
      description: 'Görüş alanını genişlet ve odaklan!',
      gradient: 'from-pink-500 to-rose-700',
      path: '/fast-reading/expanding-shapes'
    },
    {
      id: 'visual-search',
      title: 'Görsel Arama',
      icon: '🔍',
      description: 'Hızlı görsel tarama ve kelime bulma!',
      gradient: 'from-yellow-500 to-orange-700',
      path: '/fast-reading/visual-search'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/fast-reading/menu')}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
          >
            ⬅ GERİ DÖN
          </button>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
            👁️ Göz & Akış
          </h2>
          <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
            Kelime akışını hızlandır, gruplama yap ve satır takibini geliştir!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => navigate(exercise.path)}
              className={`bg-gradient-to-br ${exercise.gradient} p-6 rounded-2xl text-white hover:scale-105 transition-all duration-300 text-left border-2 border-white/10`}
            >
              <div className="text-5xl mb-4">{exercise.icon}</div>
              <h3 className="text-xl font-bold mb-2">{exercise.title}</h3>
              <p className="text-white/80 text-sm">{exercise.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
