import { useNavigate } from 'react-router-dom';

export default function LanguageMenu() {
  const navigate = useNavigate();

  const activities = [
    {
      id: 'daily-words',
      title: 'Günlük Kelimeler',
      icon: '📖',
      description: 'Günlük konuşmada en sık kullanılan kelimeleri öğren.',
      gradient: 'from-blue-500 to-blue-700',
      path: '/language/daily-words'
    },
    {
      id: 'synonyms',
      title: 'Eş Anlamlı Kelimeler',
      icon: '🔄',
      description: 'Anlamı aynı veya yakın olan kelimeleri keşfet.',
      gradient: 'from-green-500 to-emerald-700',
      path: '/language/synonyms'
    },
    {
      id: 'antonyms',
      title: 'Zıt Anlamlı Kelimeler',
      icon: '⚖️',
      description: 'Birbirinin tam tersi anlamlı kelimeleri öğren.',
      gradient: 'from-orange-500 to-red-700',
      path: '/language/antonyms'
    },
    {
      id: 'idioms',
      title: 'Deyimler',
      icon: '💬',
      description: 'Türkçe\'nin zengin deyimlerini ve anlamlarını öğren.',
      gradient: 'from-purple-500 to-fuchsia-700',
      path: '/language/idioms'
    },
    {
      id: 'proverbs',
      title: 'Atasözleri',
      icon: '🎓',
      description: 'Toplumun tecrübelerini anlatan atasözlerini keşfet.',
      gradient: 'from-cyan-500 to-blue-700',
      path: '/language/proverbs'
    },
    {
      id: 'metaphors',
      title: 'Mecaz Anlamlar',
      icon: '🎭',
      description: 'Kelimelerin gerçek anlamından farklı kullanımlarını öğren.',
      gradient: 'from-pink-500 to-rose-700',
      path: '/language/metaphors'
    },
    {
      id: 'word-game',
      title: 'Kelime Oyunları',
      icon: '🎮',
      description: 'Eğlenceli oyunlarla kelime dağarcığını geliştir.',
      gradient: 'from-amber-500 to-orange-700',
      path: '/language/word-game'
    },
    {
      id: 'ai-quiz',
      title: 'AI Kelime Testi',
      icon: '🤖',
      description: 'Yapay zeka ile interaktif kelime testleri çöz.',
      gradient: 'from-indigo-500 to-purple-700',
      path: '/language/ai-quiz'
    },
    {
      id: 'sim',
      title: 'Diyalog Simülatörü',
      icon: '💭',
      description: 'Gerçek hayat senaryolarında doğru cümleleri kur.',
      gradient: 'from-rose-500 to-pink-700',
      path: '/language/sim'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/dashboard')}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
          >
            ⬅ GERİ DÖN
          </button>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
            FİLOLOJİ & DİL ÜSSÜ
          </h2>
          <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
            Kelime hazneni zenginleştir, dil bilgisini geliştir ve Türkçe'nin inceliklerini keşfet!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <button
              key={activity.id}
              onClick={() => navigate(activity.path)}
              className={`bg-gradient-to-br ${activity.gradient} p-8 rounded-2xl text-white hover:scale-105 transition-all duration-300 text-left border-2 border-white/10`}
            >
              <div className="text-5xl mb-4">{activity.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
              <p className="text-white/80 text-sm">{activity.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
