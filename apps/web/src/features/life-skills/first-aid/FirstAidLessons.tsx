import React, { useState } from 'react';
import { GameMode } from '../../types';

interface FirstAidLessonsProps {
  onExit: () => void;
  gradeLevel: number;
}

// Sınıf seviyesine göre ders içerikleri
const LESSON_CONTENT = {
  1: {
    title: '🟢 1. Sınıf - Temel Güvenlik',
    lessons: [
      {
        id: 1,
        title: 'Tehlikeli Durumları Tanıma',
        icon: '⚠️',
        content: [
          'Keskin cisimler tehlikelidir',
          'Sıcak şeylerden uzak dur',
          'Yüksek yerlerden düşme',
          'Elektrik prizlerine dokunma',
        ],
        activity: 'Tehlikeyi Bul Oyunu',
      },
      {
        id: 2,
        title: 'Acil Durum Numarası',
        icon: '📞',
        content: [
          'Acil durumlarda 112 yi ara',
          'Adını ve yerini söyle',
          'Sakin ol ve dinle',
          'Büyüklerden yardım iste',
        ],
        activity: '112 Arama Simülasyonu',
      },
    ],
  },
  2: {
    title: '🟢 2. Sınıf - Basit İlk Yardım Bilinci',
    lessons: [
      {
        id: 1,
        title: 'İlk Yardım Nedir?',
        icon: '🏥',
        content: [
          'İlk yardım yaralanmalarda ilk müdahaledir',
          'Büyüklere haber ver',
          'Yaralıya yardım et',
          'Sakin kal',
        ],
        activity: 'İlk Yardım Çantası Tanıma',
      },
      {
        id: 2,
        title: 'Küçük Yaralanmalar',
        icon: '🩹',
        content: [
          'Küçük kesikler olabilir',
          'Kanama görürsen büyüklere söyle',
          'Yarayı temiz tut',
          'Yardım iste',
        ],
        activity: 'Yaralanma Senaryosu',
      },
    ],
  },
  3: {
    title: '🟡 3. Sınıf - Temel Müdahale',
    lessons: [
      {
        id: 1,
        title: 'Kesikler ve Kanamalar',
        icon: '🩸',
        content: [
          'Yarayı temiz suyla yıka',
          'Temiz bezle baskı yap',
          'Kanama durmazsa yardım çağır',
          'Yarayı bandajla',
        ],
        activity: 'Doğru Müdahaleyi Seç',
      },
      {
        id: 2,
        title: 'Küçük Yanıklar',
        icon: '🔥',
        content: [
          'Soğuk suya tut (10-15 dakika)',
          'Buz kullanma',
          'Patlayan kabarcıklara dokunma',
          'Büyük yanıklarda 112 ara',
        ],
        activity: 'Yanık Müdahale Oyunu',
      },
      {
        id: 3,
        title: 'Burun Kanaması',
        icon: '👃',
        content: [
          'Başı öne eğ',
          'Burnun yumuşak kısmını sık',
          '10 dakika bekle',
          'Durmazsa yardım iste',
        ],
        activity: 'Adım Adım Uygulama',
      },
    ],
  },
  4: {
    title: '🟡 4. Sınıf - Acil Durum Bilinci',
    lessons: [
      {
        id: 1,
        title: 'Bayılma',
        icon: '😵',
        content: [
          'Kişiyi yere yatır',
          'Bacakları yükselt',
          'Hava sirkülasyonu sağla',
          'Hemen 112 ara',
        ],
        activity: 'Bayılma Senaryosu',
      },
      {
        id: 2,
        title: 'Boğulma Tehlikesi',
        icon: '🫁',
        content: [
          'Küçük parçaları ağza alma',
          'Yemek yerken koşma',
          'Boğulursa sırtına vur',
          'Heimlich manevrası (basit)',
        ],
        activity: 'Hızlı Karar Oyunu',
      },
    ],
  },
  5: {
    title: '🟠 5. Sınıf - İlk Yardım Temelleri',
    lessons: [
      {
        id: 1,
        title: 'İlk Yardımın Amacı',
        icon: '🎯',
        content: [
          'Hayat kurtarmak',
          'Durumu kötüleştirmemek',
          'İyileşmeyi hızlandırmak',
          'Profesyonel yardım çağırmak',
        ],
        activity: 'Vaka Analizi',
      },
      {
        id: 2,
        title: 'Yanık Türleri',
        icon: '🔥',
        content: [
          '1. Derece: Kızarıklık',
          '2. Derece: Kabarcık',
          '3. Derece: Derin hasar',
          'Müdahale yöntemleri',
        ],
        activity: 'Yanık Türü Tanıma',
      },
      {
        id: 3,
        title: 'Kırık ve Burkulma',
        icon: '🦴',
        content: ['Yaralı bölgeyi hareket ettirme', 'Soğuk uygula', 'Yüksekte tut', 'Atel yapımı'],
        activity: 'Atel Yapma Simülasyonu',
      },
    ],
  },
  6: {
    title: '🟠 6. Sınıf - Müdahale Teknikleri',
    lessons: [
      {
        id: 1,
        title: 'Kanama Kontrolü',
        icon: '🩸',
        content: ['Doğrudan baskı', 'Yüksekte tutma', 'Baskı noktaları', 'Turnike (son çare)'],
        activity: 'Kanama Kontrolü Simülasyonu',
      },
      {
        id: 2,
        title: 'Yaralı Taşıma',
        icon: '🚑',
        content: [
          'Boyun ve sırt yaralanması kontrolü',
          'Tek kişilik taşıma',
          'İki kişilik taşıma',
          'Sedye kullanımı',
        ],
        activity: 'Taşıma Tekniği Seçimi',
      },
      {
        id: 3,
        title: 'Temel Bandajlama',
        icon: '🩹',
        content: ['Spiral bandaj', 'Sekiz bandajı', 'Üçgen bandaj', 'Baskı bandajı'],
        activity: 'Bandaj Yapma Oyunu',
      },
    ],
  },
  7: {
    title: '🔴 7. Sınıf - Acil Durum Yönetimi',
    lessons: [
      {
        id: 1,
        title: 'Kalp Durması ve CPR',
        icon: '❤️',
        content: [
          'Bilinç kontrolü',
          'Solunum kontrolü',
          'Göğüs kompresyonları (30)',
          'Suni solunum (2)',
          'CPR döngüsü',
        ],
        activity: 'CPR Adım Sıralama',
      },
      {
        id: 2,
        title: 'Suni Solunum',
        icon: '🫁',
        content: [
          'Hava yolu açma',
          'Baş-çene manevrası',
          'Ağızdan ağıza solunum',
          'Göğüs hareketini kontrol',
        ],
        activity: 'Suni Solunum Simülasyonu',
      },
      {
        id: 3,
        title: 'Kaza Yerinde Yapılacaklar',
        icon: '🚗',
        content: [
          'Kendi güvenliğin önce',
          'Olay yerini güvenli hale getir',
          '112 yi ara',
          'Yaralılara müdahale et',
        ],
        activity: 'Kaza Senaryosu',
      },
    ],
  },
  8: {
    title: '🔴 8. Sınıf - Gelişmiş İlk Yardım',
    lessons: [
      {
        id: 1,
        title: 'Trafik Kazası Müdahalesi',
        icon: '🚑',
        content: [
          'Olay yeri güvenliği',
          'Çoklu yaralı triyajı',
          'Boyun stabilizasyonu',
          'Kanamalı yaralara müdahale',
        ],
        activity: 'Gerçek Senaryo Simülasyonu',
      },
      {
        id: 2,
        title: 'Zehirlenmeler',
        icon: '☠️',
        content: [
          'Zehirlenme türleri',
          'Yutma, soluma, temas',
          'Zehir Danışma: 114',
          'Kusturma/Kusturmama',
        ],
        activity: 'Zehirlenme Vaka Analizi',
      },
      {
        id: 3,
        title: 'Elektrik Çarpması',
        icon: '⚡',
        content: ['Elektriği kes', 'Yaralıya dokunma', 'İzole edici kullan', 'CPR hazırlığı'],
        activity: 'Elektrik Kazası Müdahalesi',
      },
      {
        id: 4,
        title: 'Afet Durumları',
        icon: '🌪️',
        content: ['Deprem sonrası', 'Yangın durumunda', 'Su baskını', 'Toplu yaralanmalar'],
        activity: 'Kriz Yönetimi Oyunu',
      },
    ],
  },
};

const FirstAidLessons: React.FC<FirstAidLessonsProps> = ({ onExit, gradeLevel }) => {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const currentContent =
    LESSON_CONTENT[gradeLevel as keyof typeof LESSON_CONTENT] || LESSON_CONTENT[1];

  const handleLessonComplete = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
    setSelectedLesson(null);
  };

  if (selectedLesson !== null) {
    const lesson = currentContent.lessons.find((l) => l.id === selectedLesson);
    if (!lesson) return null;

    return (
      <div className="min-h-screen text-white p-4">
        <div className="w-full max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedLesson(null)}
            className="mb-6 px-6 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-bold"
          >
            ⬅ Derslere Dön
          </button>

          <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-white/10 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{lesson.icon}</div>
              <h2 className="text-3xl font-black mb-2">{lesson.title}</h2>
            </div>

            <div className="space-y-4 mb-8">
              {lesson.content.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center font-black">
                    {idx + 1}
                  </div>
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-2xl mb-6">
              <h3 className="font-black text-xl mb-2">🎮 Aktivite</h3>
              <p className="text-white/90">{lesson.activity}</p>
            </div>

            <button
              onClick={() => handleLessonComplete(lesson.id)}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
            >
              ✅ Dersi Tamamla
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-4">
      <div className="w-full max-w-6xl mx-auto">
        <button
          onClick={onExit}
          className="mb-6 px-6 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-bold"
        >
          ⬅ Ana Menüye Dön
        </button>

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black mb-4">{currentContent.title}</h2>
          <p className="text-white/70">Derslerini tamamla, hayat kurtaran bilgiler öğren!</p>
          <div className="mt-4">
            <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-bold">
              {completedLessons.length} / {currentContent.lessons.length} Ders Tamamlandı
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentContent.lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <button
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson.id)}
                className={`relative p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                  isCompleted
                    ? 'bg-green-500/20 border-green-500'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                {isCompleted && <div className="absolute top-4 right-4 text-3xl">✅</div>}
                <div className="text-5xl mb-4">{lesson.icon}</div>
                <h3 className="font-black text-xl mb-2">{lesson.title}</h3>
                <p className="text-sm text-white/60">Ders {lesson.id}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FirstAidLessons;
