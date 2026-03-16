import { useNavigate, useParams } from 'react-router-dom';
import { GameCard } from '@egitim-galaksisi/ui';

const gamesByCategory: Record<string, Array<{ id: string; name: string; icon: string; description: string; color: string }>> = {
  'letters': [
    { id: 'letter-match', name: 'Harf Eşleştir', icon: '🔤', description: 'Harfleri eşleştir', color: 'from-blue-500 to-cyan-500' },
    { id: 'letter-sound', name: 'Harf Sesi', icon: '🔊', description: 'Harf seslerini öğren', color: 'from-green-500 to-emerald-500' },
  ],
  'reading': [
    { id: 'fluency', name: 'Akıcı Okuma', icon: '📖', description: 'Hızlı ve doğru oku', color: 'from-blue-500 to-cyan-500' },
    { id: 'comprehension', name: 'Anlama', icon: '🧠', description: 'Okuduğunu anla', color: 'from-purple-500 to-pink-500' },
  ],
  'writing': [
    { id: 'sentence', name: 'Cümle Yazma', icon: '✍️', description: 'Cümle kur', color: 'from-green-500 to-emerald-500' },
    { id: 'paragraph', name: 'Paragraf Yazma', icon: '📝', description: 'Paragraf oluştur', color: 'from-orange-500 to-red-500' },
  ],
  'grammar': [
    { id: 'nouns', name: 'İsimler', icon: '📝', description: 'İsim türlerini öğren', color: 'from-indigo-500 to-purple-500' },
    { id: 'verbs', name: 'Fiiller', icon: '⚡', description: 'Fiil çekimlerini öğren', color: 'from-yellow-500 to-orange-500' },
  ],
  'vocabulary': [
    { id: 'antonyms', name: 'Zıt Anlamlı', icon: '↔️', description: 'Zıt anlamlı kelimeler', color: 'from-cyan-500 to-blue-500' },
    { id: 'synonyms', name: 'Eş Anlamlı', icon: '=', description: 'Eş anlamlı kelimeler', color: 'from-pink-500 to-rose-500' },
  ],
};

const categoryNames: Record<string, string> = {
  'letters': 'Harfler',
  'reading': 'Okuma',
  'writing': 'Yazma',
  'grammar': 'Dil Bilgisi',
  'vocabulary': 'Kelime',
};

export default function TurkishPlaygroundCategory() {
  const navigate = useNavigate();
  const { grade, category } = useParams<{ grade: string; category: string }>();
  const gradeNumber = grade?.replace('grade', '') || '1';
  const categoryName = categoryNames[category || ''] || category;
  const games = gamesByCategory[category || ''] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-orange-600 p-8">
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="mb-8">
          <button
            onClick={() => navigate(`/games/turkish/playground/${grade}`)}
            className="text-white/60 hover:text-white mb-4 flex items-center gap-2"
          >
            ← Geri
          </button>
          <div className="text-center">
            <div className="text-7xl mb-4">🎮</div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {gradeNumber}. Sınıf - {categoryName}
            </h1>
            <p className="text-white/60">Oyun seç ve oyna</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.name}
              icon={game.icon}
              color={game.color}
              description={game.description}
              onClick={() => alert(`${game.name} oyunu yakında eklenecek!`)}
            />
          ))}
        </div>

        {games.length === 0 && (
          <div className="text-center text-white/60">
            <p>Bu kategori için henüz oyun eklenmemiş.</p>
          </div>
        )}
      </div>
    </div>
  );
}
