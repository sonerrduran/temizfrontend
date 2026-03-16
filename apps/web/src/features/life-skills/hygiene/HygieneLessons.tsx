import React, { useState } from 'react';

interface HygieneLessonsProps {
  gradeLevel: number;
  onExit: () => void;
}

const lessonsByGrade: Record<
  number,
  Array<{
    title: string;
    icon: any;
    topics: string[];
    content: string[];
  }>
> = {
  1: [
    {
      title: 'El Yıkama',
      icon: '🧼',
      topics: ['Doğru el yıkama', 'Ne zaman yıkamalı', 'Sabun kullanımı'],
      content: [
        'Ellerimizi günde birçok kez yıkamalıyız.',
        'Tuvaletten sonra mutlaka yıka.',
        'Yemekten önce ve sonra yıka.',
        'Sabunla en az 20 saniye ovuştur.',
        'Parmak aralarını unutma!',
      ],
    },
    {
      title: 'Diş Fırçalama',
      icon: '🦷',
      topics: ['Günde 2 kez', 'Doğru teknik', 'Diş macunu'],
      content: [
        'Sabah ve akşam dişlerini fırçala.',
        'Her dişi dikkatlice fırçala.',
        'Yukarıdan aşağıya, yuvarlak hareketler.',
        'En az 2 dakika fırçala.',
        'Dilini de temizle!',
      ],
    },
  ],
  2: [
    {
      title: 'Banyo Yapma',
      icon: '🛁',
      topics: ['Düzenli banyo', 'Vücut temizliği'],
      content: [
        'Haftada en az 2-3 kez banyo yap.',
        'Saçını düzenli yıka.',
        'Vücudunu sabunla yıka.',
        'Kulaklarını temizle.',
        'Tırnaklarını kes ve temiz tut.',
      ],
    },
    {
      title: 'Temiz Kıyafet',
      icon: '👕',
      topics: ['Günlük kıyafet değişimi', 'Temizlik'],
      content: [
        'Her gün temiz kıyafet giy.',
        'İç çamaşırını mutlaka değiştir.',
        'Kirli kıyafetleri çamaşır sepetine at.',
        'Okul üniformanı temiz tut.',
        'Ayakkabılarını temizle.',
      ],
    },
  ],
  3: [
    {
      title: 'Mikroplar ve Hastalıklar',
      icon: '🦠',
      topics: ['Mikrop nedir', 'Nasıl bulaşır', 'Korunma yolları'],
      content: [
        'Mikroplar çok küçük canlılardır.',
        'Hasta eder, göremeyiz.',
        'El yıkama en iyi korunma.',
        'Hapşırırken ağzını kapat.',
        'Hasta kişilerden uzak dur.',
      ],
    },
    {
      title: 'Sağlıklı Uyku',
      icon: '😴',
      topics: ['Uyku saatleri', 'Uyku hijyeni'],
      content: [
        'Çocuklar 9-11 saat uyumalı.',
        'Her gün aynı saatte yat.',
        'Yatmadan önce dişini fırçala.',
        'Odanı karanlık ve sessiz tut.',
        'Yatmadan önce ekran kullanma.',
      ],
    },
  ],
  4: [
    {
      title: 'Grip ve Nezleden Korunma',
      icon: '🤧',
      topics: ['Belirtiler', 'Bulaşma', 'Korunma'],
      content: [
        'Ateş, öksürük, burun akıntısı belirtileridir.',
        'Hapşırık ve öksürükle bulaşır.',
        'Ellerini sık sık yıka.',
        'Mendil kullan, paylaşma.',
        'Hasta olunca evde kal.',
      ],
    },
    {
      title: 'Beslenme ve Hijyen',
      icon: '🍎',
      topics: ['Yemek öncesi hijyen', 'Gıda güvenliği'],
      content: [
        'Yemekten önce el yıka.',
        'Meyve ve sebzeleri yıka.',
        'Bozuk yiyecek yeme.',
        'Temiz su iç.',
        'Yemek sonrası ağzını çalkala.',
      ],
    },
  ],
  5: [
    {
      title: 'Kişisel Bakım',
      icon: '💆',
      topics: ['Cilt bakımı', 'Saç bakımı', 'Tırnak bakımı'],
      content: [
        'Yüzünü günde 2 kez yıka.',
        'Saçını düzenli tara ve yıka.',
        'Tırnaklarını kısa ve temiz tut.',
        'Güneşten korun, şapka tak.',
        'Nemlendirici kullan.',
      ],
    },
    {
      title: 'Spor ve Hijyen',
      icon: '⚽',
      topics: ['Spor sonrası temizlik', 'Kıyafet hijyeni'],
      content: [
        'Spordan sonra duş al.',
        'Spor kıyafetlerini yıka.',
        'Ayakkabılarını havalandır.',
        'Bol su iç.',
        'Yaralanmalarda temizlik önemli.',
      ],
    },
  ],
  6: [
    {
      title: 'Ergenlik ve Hijyen',
      icon: '🧑',
      topics: ['Vücut değişiklikleri', 'Özel hijyen'],
      content: [
        'Ergenlikte vücut değişir.',
        'Ter kokusu artar, deodorant kullan.',
        'Cilt yağlanır, yüzünü temizle.',
        'Saç yağlanması artar.',
        'Kişisel hijyene daha çok dikkat et.',
      ],
    },
    {
      title: 'Ağız ve Diş Sağlığı',
      icon: '🦷',
      topics: ['Diş çürükleri', 'Diş eti sağlığı'],
      content: [
        'Şekerli yiyeceklerden kaçın.',
        'Günde 2 kez fırçala.',
        'Diş ipi kullan.',
        '6 ayda bir diş hekimine git.',
        'Ağız kokusu hijyen eksikliği olabilir.',
      ],
    },
  ],
  7: [
    {
      title: 'Cilt Bakımı ve Akne',
      icon: '🧴',
      topics: ['Akne nedenleri', 'Cilt temizliği', 'Tedavi'],
      content: [
        'Ergenlikte akne normaldir.',
        'Yüzünü günde 2 kez yıka.',
        'Sivilceleri sıkma.',
        'Yağlı yiyeceklerden kaçın.',
        'Gerekirse dermatoloğa git.',
      ],
    },
    {
      title: 'Stres ve Sağlık',
      icon: '🧘',
      topics: ['Stres yönetimi', 'Ruh sağlığı'],
      content: [
        'Stres sağlığı etkiler.',
        'Düzenli uyku önemli.',
        'Spor yap, rahatla.',
        'Arkadaşlarınla konuş.',
        'Hobi edin, eğlen.',
      ],
    },
  ],
  8: [
    {
      title: 'Cinsel Sağlık ve Hijyen',
      icon: '🩺',
      topics: ['Üreme sağlığı', 'Hijyen kuralları'],
      content: [
        'Kişisel hijyen çok önemli.',
        'Günlük duş al.',
        'Pamuklu iç çamaşırı giy.',
        'Sorularını büyüklerine sor.',
        'Düzenli sağlık kontrolü yaptır.',
      ],
    },
    {
      title: 'Sağlıklı Yaşam Alışkanlıkları',
      icon: '🏃',
      topics: ['Dengeli yaşam', 'Sağlık bilinci'],
      content: [
        'Düzenli egzersiz yap.',
        'Sağlıklı beslen.',
        'Yeterli uyku.',
        'Sigara ve alkol kullanma.',
        'Düzenli sağlık kontrolü.',
      ],
    },
  ],
};

export default function HygieneLessons({ gradeLevel, onExit }: HygieneLessonsProps) {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  const allLessons = Object.entries(lessonsByGrade).flatMap(([grade, lessons]) =>
    lessons.map((lesson) => ({ ...lesson, grade: parseInt(grade) }))
  );

  if (selectedLesson !== null) {
    const lesson = allLessons[selectedLesson];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <button
              onClick={() => setSelectedLesson(null)}
              className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
            >
              ⬅ GERİ DÖN
            </button>
            <div className="text-6xl mb-4">{lesson.icon}</div>
            <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
              {lesson.title}
            </h2>
            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              {lesson.grade}. SINIF
            </span>
          </div>

          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">📚 Konular:</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {lesson.topics.map((topic, index) => (
                  <span key={index} className="px-4 py-2 bg-blue-500/30 text-white rounded-full">
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
                    <span className="text-cyan-400 font-bold">•</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <button
            onClick={onExit}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
          >
            ⬅ GERİ DÖN
          </button>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
            Dersler
          </h2>
          <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
            Hijyen ve sağlığı öğren!
          </p>
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
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  {lesson.grade}. SINIF
                </span>
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
