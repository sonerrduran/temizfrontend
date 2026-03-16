import { useState } from 'react';

interface TrafficLessonsProps {
  gradeLevel: number;
  onExit: () => void;
}

const lessonsByGrade: Record<number, Array<{
  title: string;
  icon: string;
  topics: string[];
  content: string[];
}>> = {
  1: [
    {
      title: 'Trafik Işıkları',
      icon: '🚦',
      topics: ['Kırmızı ışık', 'Sarı ışık', 'Yeşil ışık'],
      content: [
        'Kırmızı ışık: DUR! Geçme, bekle.',
        'Sarı ışık: DİKKAT! Hazırlan.',
        'Yeşil ışık: GEÇ! Ama önce sağa sola bak.',
        'Işıklar bizi güvende tutar.'
      ]
    },
    {
      title: 'Yaya Geçidi',
      icon: '🚶',
      topics: ['Zebra geçit', 'Güvenli geçiş', 'Sağa sola bakmak'],
      content: [
        'Yaya geçidinden geç.',
        'Geçmeden önce sağa sola bak.',
        'Araçlar durduğunda geç.',
        'Koşarak geçme, yürüyerek geç.'
      ]
    }
  ],
  2: [
    {
      title: 'Kaldırımda Yürümek',
      icon: '👣',
      topics: ['Kaldırım kuralları', 'Güvenli yürüyüş'],
      content: [
        'Her zaman kaldırımda yürü.',
        'Yolda oynama.',
        'Kaldırım kenarından uzak dur.',
        'Büyüklerle birlikte yürü.'
      ]
    },
    {
      title: 'Okul Servisi Güvenliği',
      icon: '🚌',
      topics: ['Servise binme', 'Serviste davranış'],
      content: [
        'Servis durduktan sonra bin.',
        'Oturduğun yerde kal.',
        'Emniyet kemerini tak.',
        'Şoförü rahatsız etme.'
      ]
    }
  ],
  3: [
    {
      title: 'Bisiklet Güvenliği',
      icon: '🚲',
      topics: ['Kask kullanımı', 'Bisiklet yolu', 'El işaretleri'],
      content: [
        'Mutlaka kask tak.',
        'Bisiklet yolunda sür.',
        'Dönüşlerde el işareti ver.',
        'Işıkları ve reflektörleri kullan.'
      ]
    },
    {
      title: 'Temel Trafik İşaretleri',
      icon: '🔺',
      topics: ['Dur işareti', 'Dikkat işaretleri', 'Bilgi işaretleri'],
      content: [
        'Kırmızı üçgen: DİKKAT!',
        'Kırmızı daire: YASAK!',
        'Mavi daire: ZORUNLU!',
        'Yeşil kare: BİLGİ!'
      ]
    }
  ],
  4: [
    {
      title: 'Toplu Taşıma Güvenliği',
      icon: '🚇',
      topics: ['Otobüs', 'Metro', 'Tramvay'],
      content: [
        'Sırayla bin ve in.',
        'Sarı çizginin gerisinde bekle.',
        'Tutunma yerlerini kullan.',
        'Acil çıkışları bil.'
      ]
    },
    {
      title: 'Gece Görünürlüğü',
      icon: '🌙',
      topics: ['Reflektör', 'Açık renkli giysiler'],
      content: [
        'Karanlıkta reflektör kullan.',
        'Açık renkli kıyafet giy.',
        'Işıklı yerlerde yürü.',
        'Sürücülerin seni görmesini sağla.'
      ]
    }
  ],
  5: [
    {
      title: 'Scooter ve Kaykay Güvenliği',
      icon: '🛴',
      topics: ['Koruyucu ekipman', 'Güvenli alanlar'],
      content: [
        'Kask, dizlik ve dirseklik tak.',
        'Kaldırımda kullan.',
        'Yoğun yerlerde yavaşla.',
        'Hız limitine uy.'
      ]
    },
    {
      title: 'Kavşak Kuralları',
      icon: '✖️',
      topics: ['Öncelik', 'Sağdan gelen', 'Işıklı kavşak'],
      content: [
        'Sağdan gelen önceliklidir.',
        'Ana yol önceliklidir.',
        'Işıklı kavşakta ışığa uy.',
        'Yayalara öncelik ver.'
      ]
    }
  ],
  6: [
    {
      title: 'Acil Durum Araçları',
      icon: '🚑',
      topics: ['Ambulans', 'İtfaiye', 'Polis'],
      content: [
        'Sireni duyunca kenara çekil.',
        'Yol ver, bekle.',
        'Acil araçları takip etme.',
        'Hayat kurtarıyorlar, saygı göster.'
      ]
    },
    {
      title: 'Hava Koşulları ve Trafik',
      icon: '🌧️',
      topics: ['Yağmur', 'Kar', 'Sis'],
      content: [
        'Yağmurda yavaş git.',
        'Kaygan yollarda dikkatli ol.',
        'Görüş mesafesi azalır.',
        'Daha fazla zaman ayır.'
      ]
    }
  ],
  7: [
    {
      title: 'Trafik Psikolojisi',
      icon: '🧠',
      topics: ['Sürücü davranışları', 'Öfke kontrolü'],
      content: [
        'Sakin ve sabırlı ol.',
        'Agresif sürücülerden uzak dur.',
        'Empati yap.',
        'Hatalar olabilir, anlayışlı ol.'
      ]
    },
    {
      title: 'İleri Seviye İşaretler',
      icon: '📋',
      topics: ['Tüm işaret türleri', 'Yol çizgileri'],
      content: [
        'Tehlike uyarı işaretleri',
        'Trafik tanzim işaretleri',
        'Bilgi işaretleri',
        'Yol çizgilerinin anlamları'
      ]
    }
  ],
  8: [
    {
      title: 'Trafik Kanunları',
      icon: '⚖️',
      topics: ['Yasal kurallar', 'Cezalar', 'Sorumluluklar'],
      content: [
        'Trafik kuralları yasalarla korunur.',
        'Kurallara uymamak cezai sorumluluk getirir.',
        'Herkes kurallara uymak zorundadır.',
        'Güvenlik herkesin sorumluluğudur.'
      ]
    },
    {
      title: 'Çevre Dostu Ulaşım',
      icon: '🌱',
      topics: ['Eko sürüş', 'Toplu taşıma', 'Bisiklet'],
      content: [
        'Toplu taşımayı tercih et.',
        'Bisiklet kullan.',
        'Yürüyüş yap.',
        'Çevreyi koru, trafiği azalt.'
      ]
    }
  ]
};

export default function TrafficLessons({ gradeLevel, onExit }: TrafficLessonsProps) {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  
  // Tüm sınıfların derslerini birleştir
  const allLessons = Object.entries(lessonsByGrade).flatMap(([grade, lessons]) => 
    lessons.map(lesson => ({ ...lesson, grade: parseInt(grade) }))
  );

  if (selectedLesson !== null) {
    const lesson = allLessons[selectedLesson];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <button onClick={() => setSelectedLesson(null)} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">
              ⬅ GERİ DÖN
            </button>
            <div className="text-6xl mb-4">{lesson.icon}</div>
            <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">{lesson.title}</h2>
            <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{lesson.grade}. SINIF</span>
          </div>

          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">📚 Konular:</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {lesson.topics.map((topic, index) => (
                  <span key={index} className="px-4 py-2 bg-red-500/30 text-white rounded-full">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-white mb-4">💡 Öğreneceklerimiz:</h3>
              <ul className="space-y-3">
                {lesson.content.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/90 text-lg">
                    <span className="text-yellow-400 font-bold">•</span>
                    <span>{item}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <button onClick={onExit} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">
            ⬅ GERİ DÖN
          </button>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">Dersler</h2>
          <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Trafik güvenliğini öğren!</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
          {allLessons.map((lesson, index) => (
            <button
              key={index}
              onClick={() => setSelectedLesson(index)}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-all transform hover:scale-105 text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-5xl">{lesson.icon}</div>
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-[10px] font-black uppercase">{lesson.grade}. SINIF</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{lesson.title}</h3>
              <p className="text-white/70">{lesson.topics.join(' • ')}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
