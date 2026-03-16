import React, { useState } from 'react';

interface FinancialLessonsProps {
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

const FinancialLessons: React.FC<FinancialLessonsProps> = ({ gradeLevel, onExit }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const getLessons = (): Lesson[] => {
    if (gradeLevel <= 4) {
      return [
        {
          id: 1,
          title: 'Para Nedir?',
          icon: '💰',
          content: [
            'Para, alışveriş yapmak için kullandığımız özel kağıt ve metallerdir.',
            'Türkiye\'de para birimine "Türk Lirası" denir ve ₺ işareti ile gösterilir.',
            'Paralar farklı değerlerde olur: 5₺, 10₺, 20₺, 50₺, 100₺, 200₺',
            'Bozuk paralar da vardır: 5 kuruş, 10 kuruş, 25 kuruş, 50 kuruş, 1₺',
          ],
          tips: ['Paraları tanımayı öğren', 'Paraları saymayı pratik et', 'Paranın değerini anla'],
        },
        {
          id: 2,
          title: 'Harçlık Nedir?',
          icon: '🪙',
          content: [
            'Harçlık, ailenin sana verdiği küçük paradır.',
            'Harçlığı istediğin şeyleri almak için kullanabilirsin.',
            'Harçlığını akıllıca harcamalısın.',
            'Bir kısmını biriktirmek güzel bir alışkanlıktır.',
          ],
          tips: ['Harçlığını kumbara da biriktir', 'Gereksiz şeyler alma', 'Ailenle konuş'],
        },
        {
          id: 3,
          title: 'İhtiyaç ve İstek',
          icon: '🎯',
          content: [
            'İhtiyaç: Yaşamak için gerekli şeylerdir (yemek, su, giysi, ev)',
            'İstek: Olsa güzel olur ama olmasa da olur (oyuncak, çikolata)',
            'Önce ihtiyaçlarımızı karşılamalıyız.',
            'İsteklerimiz için para biriktirmeliyiz.',
          ],
          tips: [
            'İhtiyaç mı istek mi ayırt et',
            'Önce ihtiyaçları karşıla',
            'İstekler için bekle ve biriktir',
          ],
        },
        {
          id: 4,
          title: 'Alışveriş Yapmak',
          icon: '🛒',
          content: [
            'Alışverişe gitmeden önce ne alacağını planla.',
            'Fiyatları karşılaştır, en uygununu seç.',
            'Paranın yetip yetmediğini kontrol et.',
            'Para üstünü kontrol etmeyi unutma.',
          ],
          tips: ['Liste yap', 'Fiyatlara bak', 'Para üstünü say'],
        },
        {
          id: 5,
          title: 'Para Biriktirmek',
          icon: '🏦',
          content: [
            'Kumbara kullanarak para biriktirebilirsin.',
            'Her gün küçük miktarlar biriktirmek büyük sonuç verir.',
            'Hedef belirle: "Oyuncak almak için 50₺ biriktireceğim"',
            'Sabırlı ol, biriktirmek zaman alır.',
          ],
          tips: ['Kumbara edin', 'Düzenli biriktir', 'Hedef koy'],
        },
      ];
    } else if (gradeLevel <= 6) {
      return [
        {
          id: 1,
          title: 'Bütçe Nedir?',
          icon: '📊',
          content: [
            'Bütçe, gelir ve giderlerin planlanmasıdır.',
            'Gelir: Aldığın para (harçlık, hediye)',
            'Gider: Harcadığın para (alışveriş, eğlence)',
            'Gelir > Gider olmalı ki para biriktirebilesin.',
          ],
          tips: ['Gelir ve giderlerini yaz', 'Dengeli harca', 'Fazlasını biriktir'],
        },
        {
          id: 2,
          title: 'Tasarruf Yapmak',
          icon: '💎',
          content: [
            'Tasarruf, gelecek için para biriktirmektir.',
            "Harçlığının %20-30'unu biriktirmeye çalış.",
            'Kısa vadeli hedefler: Oyuncak, kitap',
            'Uzun vadeli hedefler: Bisiklet, bilgisayar',
          ],
          tips: ['Düzenli tasarruf et', 'Hedef belirle', 'Sabırlı ol'],
        },
        {
          id: 3,
          title: 'Akıllı Alışveriş',
          icon: '🛍️',
          content: [
            'İndirim zamanlarını takip et.',
            'Kaliteli ve uzun ömürlü ürünler al.',
            'Marka yerine kaliteye bak.',
            'İkinci el ürünleri değerlendir.',
          ],
          tips: ['Fiyat karşılaştır', 'İndirim bekle', 'Kaliteye önem ver'],
        },
        {
          id: 4,
          title: 'Banka ve Hesap',
          icon: '🏦',
          content: [
            'Banka, paranı güvenle saklayabileceğin yerdir.',
            'Tasarruf hesabı açabilirsin.',
            'Bankada para biriktirince faiz kazanırsın.',
            'ATM kartı ile para çekebilirsin.',
          ],
          tips: ['Banka hesabı aç', 'Düzenli yatır', 'Faiz kazan'],
        },
        {
          id: 5,
          title: 'Dijital Para',
          icon: '💳',
          content: [
            'Kredi kartı, banka kartı gibi dijital ödeme araçları var.',
            'Online alışveriş yapılabilir.',
            'Dijital cüzdanlar kullanılabilir.',
            'Güvenlik çok önemli, şifreni kimseyle paylaşma.',
          ],
          tips: ['Güvenli alışveriş yap', 'Şifreni sakla', 'Ailenle birlikte kullan'],
        },
      ];
    } else {
      return [
        {
          id: 1,
          title: 'Finansal Planlama',
          icon: '📈',
          content: [
            'Finansal planlama, gelecek için para yönetimidir.',
            'Kısa, orta ve uzun vadeli hedefler belirle.',
            'Acil durum fonu oluştur.',
            'Gelirinin %50 ihtiyaç, %30 istek, %20 tasarruf olmalı.',
          ],
          tips: ['50-30-20 kuralını uygula', 'Hedeflerini yaz', 'Düzenli takip et'],
        },
        {
          id: 2,
          title: 'Yatırım Temelleri',
          icon: '📊',
          content: [
            'Yatırım, paranı çalıştırarak kazanç elde etmektir.',
            'Hisse senedi, tahvil, altın gibi yatırım araçları var.',
            'Risk ve getiri birlikte değerlendirilmeli.',
            'Çeşitlendirme önemli: "Tüm yumurtaları bir sepete koyma"',
          ],
          tips: ['Araştır ve öğren', 'Küçük başla', 'Çeşitlendir'],
        },
        {
          id: 3,
          title: 'Kredi ve Borç',
          icon: '💳',
          content: [
            'Kredi, ödünç alınan paradır ve faizi ile geri ödenir.',
            'Kredi kartı kullanımı dikkatli olmalı.',
            'Borçlanmadan önce iyi düşün.',
            'Borcunu zamanında öde, faiz artmasın.',
          ],
          tips: ['Gereksiz borçlanma', 'Zamanında öde', 'Faiz oranlarını karşılaştır'],
        },
        {
          id: 4,
          title: 'Girişimcilik',
          icon: '💼',
          content: [
            'Girişimcilik, kendi işini kurarak para kazanmaktır.',
            'Küçük yaşta lemonade standı, el işi satışı yapabilirsin.',
            'İş planı yap: Ne satacaksın, maliyeti ne, kârın ne olacak?',
            'Risk al ama hesaplı ol.',
          ],
          tips: ['Küçük başla', 'İş planı yap', 'Deneyim kazan'],
        },
        {
          id: 5,
          title: 'Vergi ve Sigorta',
          icon: '📋',
          content: [
            'Vergi, devlete ödenen paradır ve kamu hizmetleri için kullanılır.',
            'Sigorta, olası risklere karşı güvencedir.',
            'Sağlık sigortası, araç sigortası gibi türleri var.',
            'Vergi ve sigorta vatandaşlık görevidir.',
          ],
          tips: ['Vergi bilincini geliştir', 'Sigortanın önemini anla', 'Sorumlu ol'],
        },
      ];
    }
  };

  const lessons = getLessons();

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedLesson(null)}
            className="mb-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
          >
            ⬅ Derslere Dön
          </button>

          <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-green-500/30">
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

            <div className="bg-green-500/20 rounded-2xl p-6 border border-green-500/30">
              <h3 className="text-xl font-black text-green-300 mb-4">💡 Önemli İpuçları</h3>
              <ul className="space-y-3">
                {selectedLesson.tips.map((tip, index) => (
                  <li key={index} className="text-white/90 flex items-start gap-3">
                    <span className="text-green-400 text-xl">✓</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onExit}
          className="mb-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
        >
          ⬅ Ana Menüye Dön
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            💰 Finansal Okuryazarlık Dersleri
          </h1>
          <p className="text-white/80 text-lg">{gradeLevel}. Sınıf Seviyesi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="bg-slate-800/60 hover:bg-slate-700/60 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all transform hover:scale-105"
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

export default FinancialLessons;
