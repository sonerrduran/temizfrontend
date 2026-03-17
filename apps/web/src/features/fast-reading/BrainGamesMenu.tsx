import { useNavigate } from 'react-router-dom';

export default function BrainGamesMenu() {
  const navigate = useNavigate();

  const games = [
    {
      id: 'catch-word',
      title: 'Kelime Yakalama',
      icon: '🏃',
      description: 'Ekranda hızla kayan kelimeler arasından hedef kelimeyi bul.',
      gradient: 'from-orange-500 to-red-600',
      path: '/fast-reading/catch-word'
    },
    {
      id: 'flash-memory',
      title: 'Hafıza Kartları (Flaş)',
      icon: '🧠',
      description: 'Ekranda çok kısa süre beliren kelimeleri hafızanda tut.',
      gradient: 'from-indigo-500 to-purple-600',
      path: '/fast-reading/flash-memory'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/fast-reading/focus-training')}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
          >
            ⬅ GERİ DÖN
          </button>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
            Beyin Hızı Egzersizleri
          </h2>
          <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
            Görsel hafızanı güçlendiren ve algılama hızını artıran oyunlar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => navigate(game.path)}
              className={`bg-gradient-to-br ${game.gradient} p-8 rounded-2xl text-white hover:scale-105 transition-all duration-300 text-left border-2 border-white/10`}
            >
              <div className="text-6xl mb-4">{game.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
              <p className="text-white/80">{game.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
