import { useNavigate } from 'react-router-dom';

export default function MeasurementMenu() {
  const navigate = useNavigate();

  const exercises = [
    {
      id: 'speed-test',
      title: 'Okuma Hızı Testi',
      icon: '⏱️',
      description: 'Hızını ve anlama seviyeni metinlerle test et!',
      gradient: 'from-indigo-500 to-blue-700',
      path: '/fast-reading/speed-test'
    },
    {
      id: 'techniques',
      title: 'Okuma Teknikleri',
      icon: '📖',
      description: 'İçten seslendirmeyi bırak, geriye dönüşleri engelle!',
      gradient: 'from-fuchsia-500 to-purple-700',
      path: '/fast-reading/techniques'
    },
    {
      id: 'speed-comprehension',
      title: 'Hız & Anlama',
      icon: '📊',
      description: 'Hızlı okurken anlamayı geliştir!',
      gradient: 'from-blue-500 to-indigo-700',
      path: '/fast-reading/speed-comprehension'
    },
    {
      id: 'bionic',
      title: 'Biyonik Okuma',
      icon: '🔤',
      description: 'Kelimelerin ilk harflerini vurgulayarak oku!',
      gradient: 'from-purple-500 to-pink-700',
      path: '/fast-reading/bionic-reading'
    },
    {
      id: 'rhythmic',
      title: 'Ritmik Okuma',
      icon: '🎵',
      description: 'Belirli bir ritimde okuma pratiği yap!',
      gradient: 'from-cyan-500 to-blue-700',
      path: '/fast-reading/rhythmic-reading'
    },
    {
      id: 'teacher',
      title: 'Hızlı Okuma Öğretmeni',
      icon: '👨‍🏫',
      description: 'Adım adım hızlı okuma teknikleri öğren!',
      gradient: 'from-green-500 to-emerald-700',
      path: '/fast-reading/teacher'
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
            📚 Ölçüm & Eğitim
          </h2>
          <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
            Okuma hızını ölç, tekniklerini geliştir ve anlama seviyeni artır!
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
