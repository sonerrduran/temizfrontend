import { useNavigate, useParams } from 'react-router-dom';
import { GameCard } from '@egitim-galaksisi/ui';

const categoriesByGrade: Record<string, Array<{ id: string; name: string; icon: string; description: string }>> = {
  '1': [
    { id: 'letters', name: 'Harfler', icon: '🔤', description: 'Harf tanıma oyunları' },
    { id: 'reading', name: 'Okuma', icon: '📖', description: 'Okuma oyunları' },
    { id: 'writing', name: 'Yazma', icon: '✍️', description: 'Yazma oyunları' },
  ],
  '2': [
    { id: 'reading', name: 'Okuma', icon: '📖', description: 'Akıcı okuma' },
    { id: 'writing', name: 'Yazma', icon: '✍️', description: 'Cümle yazma' },
    { id: 'grammar', name: 'Dil Bilgisi', icon: '📝', description: 'Dilbilgisi oyunları' },
    { id: 'vocabulary', name: 'Kelime', icon: '📚', description: 'Kelime oyunları' },
  ],
  '3': [
    { id: 'reading', name: 'Okuma', icon: '📖', description: 'Anlama oyunları' },
    { id: 'writing', name: 'Yazma', icon: '✍️', description: 'Paragraf yazma' },
    { id: 'grammar', name: 'Dil Bilgisi', icon: '📝', description: 'Cümle yapısı' },
    { id: 'vocabulary', name: 'Kelime', icon: '📚', description: 'Kelime hazinesi' },
  ],
  '4': [
    { id: 'reading', name: 'Okuma', icon: '📖', description: 'Eleştirel okuma' },
    { id: 'writing', name: 'Yazma', icon: '✍️', description: 'Metin yazma' },
    { id: 'grammar', name: 'Dil Bilgisi', icon: '📝', description: 'Fiil çekimi' },
    { id: 'vocabulary', name: 'Kelime', icon: '📚', description: 'Deyimler' },
  ],
  '5': [
    { id: 'reading', name: 'Okuma', icon: '📖', description: 'Hızlı okuma' },
    { id: 'writing', name: 'Yazma', icon: '✍️', description: 'Kompozisyon' },
    { id: 'grammar', name: 'Dil Bilgisi', icon: '📝', description: 'Cümle türleri' },
    { id: 'vocabulary', name: 'Kelime', icon: '📚', description: 'Sözcük türleri' },
  ],
  '6': [
    { id: 'reading', name: 'Okuma', icon: '📖', description: 'Anlama stratejileri' },
    { id: 'writing', name: 'Yazma', icon: '✍️', description: 'Yaratıcı yazma' },
    { id: 'grammar', name: 'Dil Bilgisi', icon: '📝', description: 'Fiilimsiler' },
    { id: 'vocabulary', name: 'Kelime', icon: '📚', description: 'Kelime kökeni' },
  ],
  '7': [
    { id: 'reading', name: 'Okuma', icon: '📖', description: 'Metin analizi' },
    { id: 'writing', name: 'Yazma', icon: '✍️', description: 'Makale yazma' },
    { id: 'grammar', name: 'Dil Bilgisi', icon: '📝', description: 'Birleşik cümleler' },
    { id: 'vocabulary', name: 'Kelime', icon: '📚', description: 'Mecaz anlamlar' },
  ],
  '8': [
    { id: 'reading', name: 'Okuma', icon: '📖', description: 'Edebiyat analizi' },
    { id: 'writing', name: 'Yazma', icon: '✍️', description: 'Deneme yazma' },
    { id: 'grammar', name: 'Dil Bilgisi', icon: '📝', description: 'Anlatım bozuklukları' },
    { id: 'vocabulary', name: 'Kelime', icon: '📚', description: 'Söz sanatları' },
  ],
};

export default function TurkishPlaygroundGrade() {
  const navigate = useNavigate();
  const { grade } = useParams<{ grade: string }>();
  const gradeNumber = grade?.replace('grade', '') || '1';
  const categories = categoriesByGrade[gradeNumber] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-orange-600 p-8">
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="mb-8">
          <button
            onClick={() => navigate('/games/turkish/playground')}
            className="text-white/60 hover:text-white mb-4 flex items-center gap-2"
          >
            ← Geri
          </button>
          <div className="text-center">
            <div className="text-7xl mb-4">🎮</div>
            <h1 className="text-4xl font-bold text-white mb-2">{gradeNumber}. Sınıf Oyunları</h1>
            <p className="text-white/60">Kategori seç ve oynamaya başla</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
          {categories.map((category) => (
            <GameCard
              key={category.id}
              title={category.name}
              icon={category.icon}
              color="from-red-500 to-orange-600"
              description={category.description}
              onClick={() => navigate(`/games/turkish/playground/${grade}/${category.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
