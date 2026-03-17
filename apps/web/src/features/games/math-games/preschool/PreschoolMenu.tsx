import React from 'react';
import { useNavigate } from 'react-router-dom';

const PreschoolMenu: React.FC = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'direction',
      name: 'Yön Oyunu',
      icon: '🧭',
      description: 'Yönleri öğren',
      path: '/games/math/preschool/direction',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'maze',
      name: 'Labirent',
      icon: '🌀',
      description: 'Labirentten çık',
      path: '/games/math/preschool/maze',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'number-comparison',
      name: 'Sayı Karşılaştırma',
      icon: '⚖️',
      description: 'Büyük-küçük karşılaştır',
      path: '/games/math/preschool/number-comparison',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'number-recognition',
      name: 'Sayı Tanıma',
      icon: '🔢',
      description: 'Sayıları tanı',
      path: '/games/math/preschool/number-recognition',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'pattern-puzzle',
      name: 'Örüntü Bulmacası',
      icon: '🧩',
      description: 'Örüntüleri tamamla',
      path: '/games/math/preschool/pattern-puzzle',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'sequence-pattern',
      name: 'Sıralama Örüntüsü',
      icon: '🎯',
      description: 'Sıralamayı öğren',
      path: '/games/math/preschool/sequence-pattern',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'shape-matching',
      name: 'Şekil Eşleştirme',
      icon: '🔷',
      description: 'Şekilleri eşleştir',
      path: '/games/math/preschool/shape-matching',
      color: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-700 to-orange-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/games/math')}
            className="mb-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold border border-white/20 transition-all"
          >
            ⬅ GERİ DÖN
          </button>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 drop-shadow-2xl">
            🎈 OKUL ÖNCESİ MATEMATİK
          </h1>
          <p className="text-white/80 text-lg">Eğlenceli oyunlarla matematik öğren!</p>
          <div className="flex justify-center gap-3 mt-4">
            <span className="bg-white/20 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-white">
              OKUL ÖNCESİ
            </span>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => navigate(game.path)}
              className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border-2 border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Icon */}
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                {game.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">
                {game.name}
              </h3>

              {/* Description */}
              <p className="text-white/70 text-sm mb-4">
                {game.description}
              </p>

              {/* Play Button */}
              <div className={`mt-4 px-4 py-2 bg-gradient-to-r ${game.color} rounded-xl font-bold text-white text-sm shadow-lg`}>
                OYNA →
              </div>
            </button>
          ))}
        </div>

        {/* Info */}
        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-3">💡 Okul Öncesi Matematik</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Bu oyunlar okul öncesi çocuklar için özel olarak tasarlanmıştır. 
              Temel matematik kavramlarını eğlenceli bir şekilde öğrenin: 
              sayılar, şekiller, yönler, örüntüler ve daha fazlası!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreschoolMenu;
