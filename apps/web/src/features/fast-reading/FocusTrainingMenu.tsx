import { useNavigate } from 'react-router-dom';

export default function FocusTrainingMenu() {
  const navigate = useNavigate();

  const exercises = [
    {
      id: 'eye-tracking',
      title: 'Göz Kasları',
      icon: '👀',
      description: 'Akar nokta takibi ile geniş görüş ve sıçrama!',
      gradient: 'from-orange-500 to-red-600',
      path: '/fast-reading/eye-exercise'
    },
    {
      id: 'peripheral',
      title: 'Periferik Görüş',
      icon: '🎯',
      description: 'Merkeze bakarken yanlardaki kelimeleri algıla!',
      gradient: 'from-cyan-500 to-blue-600',
      path: '/fast-reading/peripheral-vision'
    },
    {
      id: 'brain-games',
      title: 'Beyin Hızı Egzersizleri',
      icon: '🎮',
      description: 'Kelime yakalama ve görsel algı oyunları!',
      gradient: 'from-pink-500 to-rose-600',
      path: '/fast-reading/brain-games'
    },
    {
      id: 'advanced-eye',
      title: 'İleri Seviye Göz Egzersizleri',
      icon: '👁️‍🗨️',
      description: 'Profesyonel göz kasları antrenmanı!',
      gradient: 'from-purple-500 to-indigo-700',
      path: '/fast-reading/advanced-eye'
    },
    {
      id: 'tachistoscope',
      title: 'Taşistoskop',
      icon: '⚡',
      description: 'Anlık görsel algı ve hız egzersizi!',
      gradient: 'from-yellow-500 to-orange-700',
      path: '/fast-reading/tachistoscope'
    },
    {
      id: 'visual-perception',
      title: 'Görsel Algı Oyunları',
      icon: '🎨',
      description: 'Eğlenceli görsel algı ve dikkat oyunları!',
      gradient: 'from-green-500 to-emerald-700',
      path: '/fast-reading/visual-perception'
    },
    {
      id: 'catch-word',
      title: 'Kelime Yakalama',
      icon: '🎯',
      description: 'Hızlı hareket eden kelimeleri yakala!',
      gradient: 'from-blue-500 to-cyan-700',
      path: '/fast-reading/catch-word'
    },
    {
      id: 'flash-memory',
      title: 'Flaş Hafıza',
      icon: '💡',
      description: 'Anlık görsel hafıza geliştirme!',
      gradient: 'from-red-500 to-pink-700',
      path: '/fast-reading/flash-memory'
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
            🧠 Odak & Antrenman
          </h2>
          <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
            Göz kaslarını güçlendir, periferik görüşü geliştir ve beyin hızını artır!
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
