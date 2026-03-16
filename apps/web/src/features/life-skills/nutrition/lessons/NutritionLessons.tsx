import React, { useState } from 'react';

interface NutritionLessonsProps {
  gradeLevel: number;
  onExit: () => void;
}

interface Lesson {
  id: number;
  title: string;
  icon: string;
  content: string[];
  tips: string[];
}

const NutritionLessons: React.FC<NutritionLessonsProps> = ({ gradeLevel, onExit }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const getLessons = (): Lesson[] => {
    if (gradeLevel <= 2) {
      return [
        {
          id: 1,
          title: 'Besin Grupları',
          icon: '🍽️',
          content: [
            'Besinler farklı gruplara ayrılır.',
            'Süt ve süt ürünleri: Süt, peynir, yoğurt',
            'Et ve et ürünleri: Tavuk, balık, yumurta',
            'Tahıllar: Ekmek, makarna, pirinç',
            'Meyve ve sebzeler: Elma, muz, havuç, domates',
          ],
          tips: ['Her gruptan ye', 'Renkli beslen', 'Dengeli ol'],
        },
        {
          id: 2,
          title: 'Meyve ve Sebzeler',
          icon: '🍎',
          content: [
            'Meyve ve sebzeler çok sağlıklıdır.',
            'Vitamin ve mineral içerirler.',
            'Günde 5 porsiyon meyve-sebze yemeliyiz.',
            'Farklı renklerde meyve-sebze seçmeliyiz.',
          ],
          tips: ['Günde 5 porsiyon', 'Renkli seç', 'Taze ye'],
        },
        {
          id: 3,
          title: 'Su İçmek',
          icon: '💧',
          content: [
            'Su vücudumuz için çok önemlidir.',
            'Günde 6-8 bardak su içmeliyiz.',
            'Su yerine şekerli içecekler içmemeliyiz.',
            'Susadığımızda su içmeliyiz.',
          ],
          tips: ['Bol su iç', 'Şekerli içecekten kaçın', 'Susadığında iç'],
        },
        {
          id: 4,
          title: 'Kahvaltı',
          icon: '🥣',
          content: [
            'Kahvaltı günün en önemli öğünüdür.',
            'Kahvaltı yapmak bize enerji verir.',
            'Kahvaltıda süt, ekmek, peynir, yumurta yiyebiliriz.',
            'Kahvaltıyı asla atlamamalıyız.',
          ],
          tips: ['Kahvaltı yap', 'Atlama', 'Dengeli beslen'],
        },
        {
          id: 5,
          title: 'Şeker ve Tatlılar',
          icon: '🍬',
          content: [
            'Çok fazla şeker sağlığa zararlıdır.',
            'Şeker dişlerimizi çürütür.',
            'Tatlıları az ve özel günlerde yemeliyiz.',
            'Meyve doğal tatlıdır, daha sağlıklıdır.',
          ],
          tips: ['Az şeker', 'Meyve tercih et', 'Dişlerini fırçala'],
        },
      ];
    } else if (gradeLevel <= 4) {
      return [
        {
          id: 1,
          title: 'Dengeli Beslenme',
          icon: '⚖️',
          content: [
            'Dengeli beslenme her besin grubundan yemektir.',
            'Tabağımızın yarısı sebze olmalı.',
            'Çeyreği protein, çeyreği tahıl olmalı.',
            'Her öğünde dengeli beslenmeliyiz.',
          ],
          tips: ['Dengeli tabak', 'Bol sebze', 'Çeşitli beslen'],
        },
        {
          id: 2,
          title: 'Hareket ve Egzersiz',
          icon: '🏃',
          content: [
            'Günde en az 60 dakika hareket etmeliyiz.',
            'Koşmak, oynamak, bisiklete binmek egzersizdir.',
            'Hareket kalp ve kasları güçlendirir.',
            'Ekran başında çok oturmamalıyız.',
          ],
          tips: ['Günde 60 dakika', 'Aktif ol', 'Oyna'],
        },
        {
          id: 3,
          title: 'Öğün Düzeni',
          icon: '🕐',
          content: [
            'Günde 3 ana öğün yemeliyiz.',
            'Ara öğünlerde meyve, yoğurt yiyebiliriz.',
            'Düzenli yemek yemek önemlidir.',
            'Öğün atlamak sağlıksızdır.',
          ],
          tips: ['3 ana öğün', 'Düzenli ye', 'Atlama'],
        },
        {
          id: 4,
          title: 'Fast Food',
          icon: '🍔',
          content: [
            'Fast food çok yağlı ve tuzludur.',
            'Sık fast food yemek sağlıksızdır.',
            'Ev yemeği daha sağlıklıdır.',
            'Fast food nadiren yenmelidir.',
          ],
          tips: ['Az fast food', 'Ev yemeği tercih et', 'Sağlıklı seç'],
        },
        {
          id: 5,
          title: 'Porsiyon Kontrolü',
          icon: '🍽️',
          content: [
            'Çok fazla yemek obeziteye neden olur.',
            'Porsiyonlarımızı kontrol etmeliyiz.',
            'Tok hissettiğimizde durmalıyız.',
            'Yavaş yemek daha sağlıklıdır.',
          ],
          tips: ['Porsiyon kontrol et', 'Yavaş ye', 'Tok hissedince dur'],
        },
      ];
    } else if (gradeLevel <= 6) {
      return [
        {
          id: 1,
          title: 'Protein ve Kaslar',
          icon: '💪',
          content: [
            'Protein kaslarımızı güçlendirir.',
            'Et, tavuk, balık, yumurta, baklagiller protein içerir.',
            'Spor yapanlar daha fazla protein ihtiyacı duyar.',
            'Her öğünde protein tüketmeliyiz.',
          ],
          tips: ['Protein ye', 'Çeşitli kaynak', 'Düzenli tüket'],
        },
        {
          id: 2,
          title: 'Karbonhidrat ve Enerji',
          icon: '⚡',
          content: [
            'Karbonhidrat bize enerji verir.',
            'Ekmek, makarna, pirinç, patates karbonhidrattır.',
            'Tam tahıllı ürünler daha sağlıklıdır.',
            'Aşırı karbonhidrat kilo aldırır.',
          ],
          tips: ['Tam tahıl seç', 'Dengeli tüket', 'Enerji kaynağı'],
        },
        {
          id: 3,
          title: 'Spor ve Beslenme',
          icon: '⚽',
          content: [
            'Spor yaparken beslenme çok önemlidir.',
            'Spordan önce hafif yemek yemeliyiz.',
            'Spordan sonra protein tüketmeliyiz.',
            'Bol su içmeliyiz.',
          ],
          tips: ['Spordan önce ye', 'Sonra protein', 'Bol su iç'],
        },
        {
          id: 4,
          title: 'Vitamin ve Mineraller',
          icon: '💊',
          content: [
            'Vitaminler vücudumuz için gereklidir.',
            'Meyve ve sebzeler vitamin içerir.',
            'D vitamini güneşten alınır.',
            'Dengeli beslenme vitamin sağlar.',
          ],
          tips: ['Bol meyve-sebze', 'Güneş gör', 'Dengeli beslen'],
        },
        {
          id: 5,
          title: 'Uyku ve Beslenme',
          icon: '😴',
          content: [
            'Uyku ve beslenme birbirine bağlıdır.',
            'Yeterli uyku metabolizmayı düzenler.',
            'Uykusuzluk aşırı yemeye neden olur.',
            'Yatmadan önce ağır yemek yememeliyiz.',
          ],
          tips: ['Yeterli uyu', 'Gece hafif ye', 'Düzenli ol'],
        },
      ];
    } else {
      return [
        {
          id: 1,
          title: 'Metabolizma',
          icon: '🔥',
          content: [
            'Metabolizma vücudun enerji harcama hızıdır.',
            'Düzenli egzersiz metabolizmayı hızlandırır.',
            'Kahvaltı yapmak metabolizmayı başlatır.',
            'Su içmek metabolizmayı destekler.',
          ],
          tips: ['Egzersiz yap', 'Kahvaltı et', 'Su iç'],
        },
        {
          id: 2,
          title: 'Stres ve Beslenme',
          icon: '😰',
          content: [
            'Stres beslenme alışkanlıklarını etkiler.',
            'Stresli anlar aşırı yemeye neden olabilir.',
            'Sağlıklı atıştırmalıklar tercih etmeliyiz.',
            'Stres yönetimi önemlidir.',
          ],
          tips: ['Stresi yönet', 'Sağlıklı atıştır', 'Bilinçli ye'],
        },
        {
          id: 3,
          title: 'Spor Beslenmesi',
          icon: '🏋️',
          content: [
            'Sporcular özel beslenme planı gerektirir.',
            'Antrenman öncesi karbonhidrat önemlidir.',
            'Antrenman sonrası protein gereklidir.',
            'Hidrasyon kritiktir.',
          ],
          tips: ['Plan yap', 'Zamanla', 'Hidrate kal'],
        },
        {
          id: 4,
          title: 'Sağlıklı Kilo',
          icon: '⚖️',
          content: [
            'Sağlıklı kilo boy ve yaşa göre değişir.',
            'Hızlı kilo verme sağlıksızdır.',
            'Dengeli beslenme ve egzersiz önemlidir.',
            'Vücut kitle indeksi (VKİ) hesaplanabilir.',
          ],
          tips: ['Dengeli beslen', 'Egzersiz yap', 'Sabırlı ol'],
        },
        {
          id: 5,
          title: 'Yaşam Tarzı',
          icon: '🌟',
          content: [
            'Sağlıklı yaşam bir yaşam tarzıdır.',
            'Beslenme, egzersiz, uyku ve stres yönetimi önemlidir.',
            'Küçük değişiklikler büyük fark yaratır.',
            'Sürdürülebilir alışkanlıklar geliştirmeliyiz.',
          ],
          tips: ['Dengeli yaşa', 'Alışkanlık edin', 'Sürdürülebilir ol'],
        },
      ];
    }
  };

  const lessons = getLessons();

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-lime-900 to-slate-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedLesson(null)}
            className="mb-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
          >
            ⬅ Derslere Dön
          </button>

          <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-lime-500/30">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{selectedLesson.icon}</div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                {selectedLesson.title}
              </h2>
            </div>

            <div className="space-y-6 mb-8">
              {selectedLesson.content.map((paragraph, index) => (
                <p key={index} className="text-white/90 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="bg-lime-500/20 rounded-2xl p-6 border border-lime-500/30">
              <h3 className="text-xl font-black text-lime-300 mb-4">💡 Önemli İpuçları</h3>
              <ul className="space-y-3">
                {selectedLesson.tips.map((tip, index) => (
                  <li key={index} className="text-white/90 flex items-start gap-3">
                    <span className="text-lime-400 text-xl">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-lime-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onExit}
          className="mb-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
        >
          ⬅ Ana Menüye Dön
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            🍎 Sağlıklı Beslenme Dersleri
          </h1>
          <p className="text-white/80 text-lg">{gradeLevel}. Sınıf Seviyesi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="bg-slate-800/60 hover:bg-slate-700/60 backdrop-blur-xl rounded-2xl p-6 border border-lime-500/30 hover:border-lime-400/50 transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-4">{lesson.icon}</div>
              <h3 className="text-xl font-black text-white mb-2">{lesson.title}</h3>
              <p className="text-white/70 text-sm">Ders {lesson.id}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionLessons;
