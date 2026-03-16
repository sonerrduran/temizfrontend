import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface HygieneTestsProps {
  gradeLevel: number;
  onExit: () => void;
}

const testsByGrade: Record<
  number,
  Array<{
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }>
> = {
  1: [
    {
      question: 'Ellerimizi ne zaman yıkamalıyız?',
      options: ['Sadece sabah', 'Tuvaletten sonra', 'Hiç', 'Ayda bir'],
      correct: 1,
      explanation: 'Tuvaletten sonra mutlaka el yıkamalıyız.',
    },
    {
      question: 'Dişlerimizi günde kaç kez fırçalamalıyız?',
      options: ['1 kez', '2 kez', '3 kez', 'Hiç'],
      correct: 1,
      explanation: 'Sabah ve akşam olmak üzere günde 2 kez.',
    },
    {
      question: 'El yıkarken ne kullanmalıyız?',
      options: ['Sadece su', 'Sabun ve su', 'Sadece sabun', 'Hiçbiri'],
      correct: 1,
      explanation: 'Sabun ve su birlikte kullanmalıyız.',
    },
    {
      question: 'Diş fırçalama ne kadar sürmeli?',
      options: ['10 saniye', '30 saniye', '2 dakika', '10 dakika'],
      correct: 2,
      explanation: 'En az 2 dakika fırçalamalıyız.',
    },
    {
      question: 'Tırnaklarımızı nasıl tutmalıyız?',
      options: ['Uzun', 'Kısa ve temiz', 'Kirli', 'Boyalı'],
      correct: 1,
      explanation: 'Tırnaklarımız kısa ve temiz olmalı.',
    },
  ],
  2: [
    {
      question: 'Haftada kaç kez banyo yapmalıyız?',
      options: ['Hiç', '1 kez', '2-3 kez', 'Her gün'],
      correct: 2,
      explanation: 'Haftada en az 2-3 kez banyo yapmalıyız.',
    },
    {
      question: 'İç çamaşırımızı ne sıklıkla değiştirmeliyiz?',
      options: ['Haftada bir', 'Her gün', 'Ayda bir', 'Hiç'],
      correct: 1,
      explanation: 'İç çamaşırı her gün değiştirilmeli.',
    },
    {
      question: 'Saçımızı ne sıklıkla yıkamalıyız?',
      options: ['Ayda bir', 'Yılda bir', 'Düzenli olarak', 'Hiç'],
      correct: 2,
      explanation: 'Saçımızı düzenli olarak yıkamalıyız.',
    },
    {
      question: 'Kirli kıyafetleri nereye atmalıyız?',
      options: ['Yere', 'Çamaşır sepetine', 'Dolaba', 'Dışarı'],
      correct: 1,
      explanation: 'Kirli kıyafetler çamaşır sepetine atılır.',
    },
    {
      question: 'Okul üniformamızı nasıl tutmalıyız?',
      options: ['Kirli', 'Temiz', 'Yırtık', 'Lekeli'],
      correct: 1,
      explanation: 'Üniformamız her zaman temiz olmalı.',
    },
  ],
  3: [
    {
      question: 'Mikroplar ne kadardır?',
      options: ['Çok büyük', 'Göremeyeceğimiz kadar küçük', 'Orta boy', 'Dev'],
      correct: 1,
      explanation: 'Mikroplar çok küçüktür, göremeyiz.',
    },
    {
      question: 'Hapşırırken ne yapmalıyız?',
      options: ['Ağzımızı kapatmalıyız', 'Bağırmalıyız', 'Hiçbir şey', 'Koşmalıyız'],
      correct: 0,
      explanation: 'Hapşırırken ağzımızı kapatmalıyız.',
    },
    {
      question: 'Çocuklar kaç saat uyumalı?',
      options: ['3-4 saat', '5-6 saat', '9-11 saat', '15 saat'],
      correct: 2,
      explanation: 'Çocuklar 9-11 saat uyumalı.',
    },
    {
      question: 'Yatmadan önce ne yapmalıyız?',
      options: ['Dişlerimizi fırçalamalıyız', 'Yemek yemeliyiz', 'Koşmalıyız', 'TV izlemeliyiz'],
      correct: 0,
      explanation: 'Yatmadan önce dişlerimizi fırçalamalıyız.',
    },
    {
      question: 'Hasta olduğumuzda ne yapmalıyız?',
      options: ['Okula gitmeliyiz', 'Evde dinlenmeliyiz', 'Dışarı çıkmalıyız', 'Spor yapmalıyız'],
      correct: 1,
      explanation: 'Hasta olunca evde dinlenmeliyiz.',
    },
  ],
  4: [
    {
      question: 'Grip belirtileri nelerdir?',
      options: ['Mutluluk', 'Ateş ve öksürük', 'Açlık', 'Uyku'],
      correct: 1,
      explanation: 'Grip ateş, öksürük ve burun akıntısı yapar.',
    },
    {
      question: 'Grip nasıl bulaşır?',
      options: ['Dokunarak', 'Hapşırık ve öksürükle', 'Bakarak', 'Yürüyerek'],
      correct: 1,
      explanation: 'Grip hapşırık ve öksürükle bulaşır.',
    },
    {
      question: 'Meyve ve sebzeleri ne yapmalıyız?',
      options: ['Yıkamalıyız', 'Kirli yemeliyiz', 'Atmalıyız', 'Saklamalıyız'],
      correct: 0,
      explanation: 'Meyve ve sebzeleri yıkamalıyız.',
    },
    {
      question: 'Bozuk yiyecek yersek ne olur?',
      options: ['Güçleniriz', 'Hastalanırız', 'Mutlu oluruz', 'Hiçbir şey'],
      correct: 1,
      explanation: 'Bozuk yiyecek hastalandırır.',
    },
    {
      question: 'Mendil kullanımı neden önemli?',
      options: ['Süs için', 'Mikrop yayılmasını önler', 'Oyun için', 'Gereksiz'],
      correct: 1,
      explanation: 'Mendil mikrop yayılmasını önler.',
    },
  ],
  5: [
    {
      question: 'Yüzümüzü günde kaç kez yıkamalıyız?',
      options: ['Hiç', '1 kez', '2 kez', '10 kez'],
      correct: 2,
      explanation: 'Yüzümüzü günde 2 kez yıkamalıyız.',
    },
    {
      question: 'Güneşten korunmak için ne yapmalıyız?',
      options: ['Şapka takmalıyız', 'Hiçbir şey', 'Dışarı çıkmamalıyız', 'Koşmalıyız'],
      correct: 0,
      explanation: 'Güneşten korunmak için şapka takmalıyız.',
    },
    {
      question: 'Spordan sonra ne yapmalıyız?',
      options: ['Hiçbir şey', 'Duş almalıyız', 'Uyumalıyız', 'Yemek yemeliyiz'],
      correct: 1,
      explanation: 'Spordan sonra duş almalıyız.',
    },
    {
      question: 'Spor kıyafetlerini ne yapmalıyız?',
      options: ['Yıkamalıyız', 'Atmalıyız', 'Saklamalıyız', 'Kirli bırakmalıyız'],
      correct: 0,
      explanation: 'Spor kıyafetlerini yıkamalıyız.',
    },
    {
      question: 'Yaralandığımızda ne yapmalıyız?',
      options: ['Temizlemeliyiz', 'Kirletmeliyiz', 'Hiçbir şey', 'Saklamalıyız'],
      correct: 0,
      explanation: 'Yaraları temizlemeliyiz.',
    },
  ],
  6: [
    {
      question: 'Ergenlikte ter kokusu neden artar?',
      options: ['Vücut değişir', 'Hastalık', 'Yemek', 'Uyku'],
      correct: 0,
      explanation: 'Ergenlikte vücut değişir, ter artar.',
    },
    {
      question: 'Deodorant ne için kullanılır?',
      options: ['Süs', 'Ter kokusu için', 'Oyun', 'Yemek'],
      correct: 1,
      explanation: 'Deodorant ter kokusunu önler.',
    },
    {
      question: 'Diş ipi neden kullanılır?',
      options: ['Oyun', 'Dişler arası temizlik', 'Süs', 'Gereksiz'],
      correct: 1,
      explanation: 'Diş ipi dişler arası temizler.',
    },
    {
      question: 'Diş hekimine ne sıklıkla gitmeliyiz?',
      options: ['Hiç', '6 ayda bir', '10 yılda bir', 'Her gün'],
      correct: 1,
      explanation: '6 ayda bir diş kontrolü yaptırmalıyız.',
    },
    {
      question: 'Şekerli yiyecekler dişlere ne yapar?',
      options: ['İyi gelir', 'Çürütür', 'Güçlendirir', 'Hiçbir şey'],
      correct: 1,
      explanation: 'Şeker dişleri çürütür.',
    },
  ],
  7: [
    {
      question: 'Akne neden olur?',
      options: ['Ergenlik', 'Yaşlılık', 'Bebeklik', 'Hiçbiri'],
      correct: 0,
      explanation: 'Akne ergenlikte normaldir.',
    },
    {
      question: 'Sivilceleri ne yapmalıyız?',
      options: ['Sıkmamalıyız', 'Sıkmalıyız', 'Kirletmeliyiz', 'Hiçbir şey'],
      correct: 0,
      explanation: 'Sivilceleri sıkmamalıyız.',
    },
    {
      question: 'Stres sağlığı nasıl etkiler?',
      options: ['Olumsuz etkiler', 'İyi gelir', 'Etkilemez', 'Güçlendirir'],
      correct: 0,
      explanation: 'Stres sağlığı olumsuz etkiler.',
    },
    {
      question: 'Stresle başa çıkmak için ne yapmalıyız?',
      options: ['Spor yapmalıyız', 'Uyumamalıyız', 'Yemek yememeliyiz', 'Hiçbir şey'],
      correct: 0,
      explanation: 'Spor stresle başa çıkmaya yardımcı olur.',
    },
    {
      question: 'Düzenli uyku neden önemli?',
      options: ['Sağlık için', 'Gereksiz', 'Zaman kaybı', 'Hiçbiri'],
      correct: 0,
      explanation: 'Düzenli uyku sağlık için çok önemli.',
    },
  ],
  8: [
    {
      question: 'Kişisel hijyen neden önemli?',
      options: ['Sağlık için', 'Süs için', 'Gereksiz', 'Hiçbiri'],
      correct: 0,
      explanation: 'Kişisel hijyen sağlık için çok önemli.',
    },
    {
      question: 'Pamuklu iç çamaşırı neden tercih edilmeli?',
      options: ['Sağlıklı', 'Ucuz', 'Pahalı', 'Gereksiz'],
      correct: 0,
      explanation: 'Pamuklu iç çamaşırı daha sağlıklı.',
    },
    {
      question: 'Düzenli sağlık kontrolü neden yapılmalı?',
      options: ['Erken teşhis için', 'Gereksiz', 'Zaman kaybı', 'Hiçbiri'],
      correct: 0,
      explanation: 'Düzenli kontrol erken teşhis sağlar.',
    },
    {
      question: 'Sigara ve alkol sağlığa ne yapar?',
      options: ['Zarar verir', 'İyi gelir', 'Etkilemez', 'Güçlendirir'],
      correct: 0,
      explanation: 'Sigara ve alkol çok zararlıdır.',
    },
    {
      question: 'Dengeli yaşam için ne gerekli?',
      options: ['Egzersiz, beslenme, uyku', 'Sadece yemek', 'Sadece uyku', 'Hiçbiri'],
      correct: 0,
      explanation: 'Dengeli yaşam için hepsi gerekli.',
    },
  ],
};

export default function HygieneTests({ gradeLevel, onExit }: HygieneTestsProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const allTests = Object.entries(testsByGrade).flatMap(([grade, tests]) =>
    tests.map((test) => ({ ...test, grade: parseInt(grade) }))
  );

  const test = allTests[currentQ];

  const handleAnswer = (index: number) => {
    setSelected(index);
    if (index === test.correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQ < allTests.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Test Tamamlandı!</h2>
            <div className="text-6xl mb-6">{score >= allTests.length * 0.7 ? '🎉' : '📚'}</div>
            <p className="text-3xl text-white mb-8">
              Skorun: {score} / {allTests.length}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setCurrentQ(0);
                  setSelected(null);
                  setScore(0);
                  setShowResult(false);
                }}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Tekrar Dene
              </button>
              <button
                onClick={onExit}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Menüye Dön
              </button>
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
            Testler
          </h2>
          <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
            Bilgini test et!
          </p>
          <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            {test.grade}. SINIF SORUSU
          </span>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <div className="mb-6 text-center">
              <p className="text-white/70 mb-2">
                Soru {currentQ + 1} / {allTests.length}
              </p>
              <p className="text-white font-semibold">Skor: {score}</p>
            </div>

            <h3 className="text-2xl font-bold text-white mb-8 text-center">{test.question}</h3>

            <div className="space-y-4">
              {test.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selected !== null}
                  className={`w-full p-4 rounded-xl text-left text-lg transition-all ${
                    selected === null
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : selected === index
                        ? index === test.correct
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : index === test.correct
                          ? 'bg-green-500 text-white'
                          : 'bg-white/5 text-white/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selected !== null && (
                      <>
                        {index === test.correct && <CheckCircle size={24} />}
                        {selected === index && index !== test.correct && <XCircle size={24} />}
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {selected !== null && (
              <div className="mt-6 p-4 bg-blue-500/20 rounded-xl">
                <p className="text-white">{test.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
