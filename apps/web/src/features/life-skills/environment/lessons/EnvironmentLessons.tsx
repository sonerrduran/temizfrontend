import React, { useState } from 'react';

interface EnvironmentLessonsProps {
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

const EnvironmentLessons: React.FC<EnvironmentLessonsProps> = ({ gradeLevel, onExit }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const getLessons = (): Lesson[] => {
    if (gradeLevel <= 2) {
      return [
        {
          id: 1,
          title: 'Doğa Nedir?',
          icon: '🌳',
          content: [
            'Doğa, etrafımızdaki ağaçlar, çiçekler, hayvanlar ve gökyüzüdür.',
            'Doğa bize temiz hava, su ve yiyecek verir.',
            'Doğayı korumak hepimizin görevidir.',
            'Ağaçlar oksijen üretir, biz de nefes alırız.',
          ],
          tips: ['Ağaçlara zarar verme', 'Çiçekleri kopma', 'Hayvanlara iyi davran'],
        },
        {
          id: 2,
          title: 'Çöp Atmak',
          icon: '🗑️',
          content: [
            'Çöpleri yere değil, çöp kutusuna atmalıyız.',
            'Yere atılan çöpler doğayı kirletir.',
            'Hayvanlar çöpleri yiyebilir ve hastalanabilir.',
            'Temiz bir çevre hepimizin hakkıdır.',
          ],
          tips: ['Çöpü çöp kutusuna at', 'Piknikte çöplerini topla', 'Temiz tut'],
        },
        {
          id: 3,
          title: 'Su Tasarrufu',
          icon: '💧',
          content: [
            'Su çok değerlidir, israf etmemeliyiz.',
            'Dişlerimizi fırçalarken musluğu kapatmalıyız.',
            'Kısa duş yapmalıyız.',
            'Suyun bitebileceğini unutmamalıyız.',
          ],
          tips: ['Musluğu kapat', 'Kısa duş yap', 'Suyu israf etme'],
        },
        {
          id: 4,
          title: 'Hayvanları Sevmek',
          icon: '🐶',
          content: [
            'Hayvanlar bizim arkadaşlarımızdır.',
            'Hayvanlara iyi davranmalıyız.',
            'Sokak hayvanlarına su ve yemek verebiliriz.',
            'Hayvanlara zarar vermek yanlıştır.',
          ],
          tips: ['Hayvanlara iyi davran', 'Sokak hayvanlarına yardım et', 'Zarar verme'],
        },
        {
          id: 5,
          title: 'Temiz Hava',
          icon: '🌬️',
          content: [
            'Temiz hava sağlıklı yaşam için gereklidir.',
            'Ağaçlar havayı temizler.',
            'Arabalar havayı kirletir.',
            'Yürümek veya bisiklete binmek daha iyidir.',
          ],
          tips: ['Ağaç dik', 'Yürü veya bisiklet kullan', 'Havayı kirletme'],
        },
      ];
    } else if (gradeLevel <= 4) {
      return [
        {
          id: 1,
          title: 'Geri Dönüşüm',
          icon: '♻️',
          content: [
            'Geri dönüşüm, atıkları tekrar kullanmaktır.',
            'Kağıt, plastik, cam ve metal geri dönüştürülebilir.',
            'Geri dönüşüm doğal kaynakları korur.',
            'Atıkları doğru kutulara atmalıyız.',
          ],
          tips: ['Atıkları ayır', 'Geri dönüşüm kutularını kullan', 'Tekrar kullan'],
        },
        {
          id: 2,
          title: 'Enerji Tasarrufu',
          icon: '💡',
          content: [
            'Enerji tasarrufu çevreyi korur.',
            'Kullanmadığımız ışıkları kapatmalıyız.',
            'Elektronik cihazları gereksiz açık bırakmamalıyız.',
            'Doğal ışıktan faydalanmalıyız.',
          ],
          tips: ['Işıkları kapat', 'Cihazları kapat', 'Doğal ışık kullan'],
        },
        {
          id: 3,
          title: 'Plastik Kirliliği',
          icon: '🚫',
          content: [
            'Plastik doğada yüzlerce yıl bozulmaz.',
            'Denizlerdeki plastikler hayvanları öldürür.',
            'Tek kullanımlık plastiklerden kaçınmalıyız.',
            'Bez çanta kullanmalıyız.',
          ],
          tips: ['Plastik kullanımını azalt', 'Bez çanta kullan', 'Geri dönüştür'],
        },
        {
          id: 4,
          title: 'Kompost Yapımı',
          icon: '🌱',
          content: [
            'Kompost, organik atıklardan gübre yapmaktır.',
            'Meyve ve sebze artıkları kompost olabilir.',
            'Kompost toprağı besler.',
            'Evde kompost yapabiliriz.',
          ],
          tips: ['Organik atıkları ayır', 'Kompost yap', 'Toprağı besle'],
        },
        {
          id: 5,
          title: 'Yerel Ürünler',
          icon: '🍎',
          content: [
            'Yerel ürünler çevreye daha az zarar verir.',
            'Uzaktan gelen ürünler daha çok yakıt harcar.',
            'Mevsim meyve ve sebzeleri tüketmeliyiz.',
            'Yerel üreticileri desteklemeliyiz.',
          ],
          tips: ['Yerel ürün al', 'Mevsiminde ye', 'Üreticiyi destekle'],
        },
      ];
    } else if (gradeLevel <= 6) {
      return [
        {
          id: 1,
          title: 'İklim Değişikliği',
          icon: '🌍',
          content: [
            'İklim değişikliği dünyamızın en büyük sorunudur.',
            'Sera gazları atmosferi ısıtır.',
            'Buzullar eriyor, deniz seviyesi yükseliyor.',
            'Karbon ayak izimizi azaltmalıyız.',
          ],
          tips: ['Enerji tasarrufu yap', 'Toplu taşıma kullan', 'Ağaç dik'],
        },
        {
          id: 2,
          title: 'Biyoçeşitlilik',
          icon: '🦋',
          content: [
            'Biyoçeşitlilik, canlı türlerinin çeşitliliğidir.',
            'Her tür ekosistemin bir parçasıdır.',
            'Türler yok olursa denge bozulur.',
            'Doğal yaşam alanlarını korumalıyız.',
          ],
          tips: ['Türleri koru', 'Yaşam alanlarını koru', 'Farkındalık yarat'],
        },
        {
          id: 3,
          title: 'Su Kirliliği',
          icon: '🌊',
          content: [
            'Su kirliliği denizleri ve nehirleri etkiler.',
            'Atık sular arıtılmadan bırakılmamalı.',
            'Kimyasallar suyu kirletir.',
            'Temiz su hakkımızdır.',
          ],
          tips: ['Suyu kirletme', 'Kimyasal kullanma', 'Temiz tut'],
        },
        {
          id: 4,
          title: 'Hayvan Hakları',
          icon: '🐾',
          content: [
            'Hayvanların da hakları vardır.',
            'Hayvanlara işkence yasaktır.',
            'Hayvan barınaklarını desteklemeliyiz.',
            'Sahiplenmek sorumluluk gerektirir.',
          ],
          tips: ['Hayvanlara saygı göster', 'Barınakları destekle', 'Sorumlu sahiplen'],
        },
        {
          id: 5,
          title: 'Sürdürülebilir Yaşam',
          icon: '🌿',
          content: [
            'Sürdürülebilir yaşam, gelecek nesilleri düşünmektir.',
            'Az tüket, çok kullan.',
            'Yenilenebilir enerji kullan.',
            'Doğa dostu ürünler tercih et.',
          ],
          tips: ['Az tüket', 'Yenilenebilir enerji', 'Doğa dostu ol'],
        },
      ];
    } else {
      return [
        {
          id: 1,
          title: 'Karbon Ayak İzi',
          icon: '👣',
          content: [
            'Karbon ayak izi, ürettiğimiz sera gazı miktarıdır.',
            'Ulaşım, enerji ve tüketim ayak izini etkiler.',
            'Ayak izimizi azaltmak için bilinçli seçimler yapmalıyız.',
            'Karbon nötr yaşam mümkündür.',
          ],
          tips: ['Ayak izini hesapla', 'Azaltmaya çalış', 'Bilinçli tüket'],
        },
        {
          id: 2,
          title: 'Gönüllülük',
          icon: '🤝',
          content: [
            'Gönüllülük, topluma katkı sağlamaktır.',
            'Çevre temizliği, ağaç dikimi gibi etkinliklere katılabiliriz.',
            'Gönüllülük sosyal sorumluluktur.',
            'Küçük katkılar büyük fark yaratır.',
          ],
          tips: ['Gönüllü ol', 'Etkinliklere katıl', 'Fark yarat'],
        },
        {
          id: 3,
          title: 'Döngüsel Ekonomi',
          icon: '🔄',
          content: [
            'Döngüsel ekonomi, atık üretmeyen sistemdir.',
            'Ürünler tamir edilir, yeniden kullanılır.',
            'Kaynaklar verimli kullanılır.',
            'Sıfır atık hedeflenir.',
          ],
          tips: ['Tamir et', 'Yeniden kullan', 'Atık azalt'],
        },
        {
          id: 4,
          title: 'Çevre Aktivizmi',
          icon: '📢',
          content: [
            'Çevre aktivizmi, çevre sorunlarına karşı mücadeledir.',
            'Sesini duyur, farkındalık yarat.',
            'Kampanyalara katıl, imza topla.',
            'Değişim seninle başlar.',
          ],
          tips: ['Sesini duyur', 'Kampanyalara katıl', 'Değişim yarat'],
        },
        {
          id: 5,
          title: 'Toplumsal Sorumluluk',
          icon: '🌟',
          content: [
            'Toplumsal sorumluluk, topluma katkı sağlamaktır.',
            'Çevre, eğitim, sağlık gibi alanlarda çalışabiliriz.',
            'Herkes bir şeyler yapabilir.',
            'Birlikte daha güçlüyüz.',
          ],
          tips: ['Sorumluluk al', 'Katkı sağla', 'Birlikte hareket et'],
        },
      ];
    }
  };

  const lessons = getLessons();

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedLesson(null)}
            className="mb-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
          >
            ⬅ Derslere Dön
          </button>

          <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-teal-500/30">
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

            <div className="bg-teal-500/20 rounded-2xl p-6 border border-teal-500/30">
              <h3 className="text-xl font-black text-teal-300 mb-4">💡 Önemli İpuçları</h3>
              <ul className="space-y-3">
                {selectedLesson.tips.map((tip, index) => (
                  <li key={index} className="text-white/90 flex items-start gap-3">
                    <span className="text-teal-400 text-xl">✓</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onExit}
          className="mb-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
        >
          ⬅ Ana Menüye Dön
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            🌍 Çevre ve Toplum Dersleri
          </h1>
          <p className="text-white/80 text-lg">{gradeLevel}. Sınıf Seviyesi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="bg-slate-800/60 hover:bg-slate-700/60 backdrop-blur-xl rounded-2xl p-6 border border-teal-500/30 hover:border-teal-400/50 transition-all transform hover:scale-105"
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

export default EnvironmentLessons;
