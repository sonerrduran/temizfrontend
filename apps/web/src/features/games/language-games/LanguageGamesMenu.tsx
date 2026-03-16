import { useNavigate } from 'react-router-dom';

export default function LanguageGamesMenu() {
  const navigate = useNavigate();

  const languages = [
    {
      name: 'Türkçe',
      icon: '🇹🇷',
      color: 'from-red-500 to-orange-600',
      path: '/lessons/turkish',
      description: 'Okuma, yazma ve dilbilgisi',
    },
    {
      name: 'İngilizce',
      icon: '🇬🇧',
      color: 'from-blue-500 to-indigo-600',
      path: '/lessons/english',
      description: 'Kelimeler ve gramer',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white/60 hover:text-white mb-4 flex items-center gap-2"
          >
            ← Geri
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">🔤 Dil Oyunları</h1>
          <p className="text-white/60">Hangi dilde pratik yapmak istersin?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {languages.map((lang) => (
            <button
              key={lang.name}
              onClick={() => navigate(lang.path)}
              className={`bg-gradient-to-br ${lang.color} rounded-2xl p-8 text-left hover:scale-105 transition-all duration-300 group`}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {lang.icon}
              </div>
              <div className="text-white font-bold text-2xl mb-2">{lang.name}</div>
              <div className="text-white/80">{lang.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
