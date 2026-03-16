import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface FinancialTestsProps {
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
      question: 'Para ne için kullanılır?',
      options: ['Oynamak için', 'Alışveriş yapmak için', 'Atmak için', 'Saklamak için'],
      correct: 1,
      explanation: 'Para alışveriş yapmak için kullanılır.',
    },
    {
      question: "Türkiye'de para birimine ne denir?",
      options: ['Dolar', 'Euro', 'Türk Lirası', 'Yen'],
      correct: 2,
      explanation: "Türkiye'de para birimi Türk Lirası'dır.",
    },
    {
      question: 'Harçlık nedir?',
      options: ['Oyuncak', 'Ailenin verdiği para', 'Yemek', 'Kitap'],
      correct: 1,
      explanation: 'Harçlık ailenin verdiği küçük paradır.',
    },
    {
      question: 'İhtiyaç nedir?',
      options: ['Oyuncak', 'Yemek ve su', 'Çikolata', 'Oyun'],
      correct: 1,
      explanation: 'İhtiyaç yaşamak için gerekli şeylerdir.',
    },
    {
      question: 'Para biriktirmek için ne kullanırız?',
      options: ['Kumbara', 'Çanta', 'Kutu', 'Dolap'],
      correct: 0,
      explanation: 'Kumbara para biriktirmek için kullanılır.',
    },
  ],
  2: [
    {
      question: 'Alışverişe gitmeden önce ne yapmalıyız?',
      options: ['Uyumalıyız', 'Plan yapmalıyız', 'Koşmalıyız', 'Oyun oynamalıyız'],
      correct: 1,
      explanation: 'Alışverişe gitmeden önce plan yapmalıyız.',
    },
    {
      question: 'Para üstünü ne yapmalıyız?',
      options: ['Atmalıyız', 'Kontrol etmeliyiz', 'Vermeliyiz', 'Saklamalıyız'],
      correct: 1,
      explanation: 'Para üstünü kontrol etmeliyiz.',
    },
    {
      question: 'Fiyatları neden karşılaştırmalıyız?',
      options: ['Eğlence için', 'En uygununu bulmak için', 'Zaman geçirmek için', 'Gereksiz'],
      correct: 1,
      explanation: 'En uygun fiyatı bulmak için karşılaştırmalıyız.',
    },
    {
      question: 'Her gün küçük miktarlar biriktirmek ne yapar?',
      options: ['Hiçbir şey', 'Büyük sonuç verir', 'Para kaybettirir', 'Gereksizdir'],
      correct: 1,
      explanation: 'Küçük birikimler büyük sonuç verir.',
    },
    {
      question: 'Önce ne yapmalıyız?',
      options: [
        'İsteklerimizi karşılamalıyız',
        'İhtiyaçlarımızı karşılamalıyız',
        'Oyun oynamalıyız',
        'Uyumalıyız',
      ],
      correct: 1,
      explanation: 'Önce ihtiyaçlarımızı karşılamalıyız.',
    },
  ],
  3: [
    {
      question: 'Kumbara kullanmanın faydası nedir?',
      options: ['Süs olur', 'Para biriktiririz', 'Oyuncak olur', 'Gereksizdir'],
      correct: 1,
      explanation: 'Kumbara para biriktirmemizi sağlar.',
    },
    {
      question: 'Hedef belirlemek neden önemli?',
      options: ['Gereksiz', 'Motivasyon sağlar', 'Zaman kaybı', 'Hiçbir şey'],
      correct: 1,
      explanation: 'Hedef belirlemek motivasyon sağlar.',
    },
    {
      question: 'Sabırlı olmak neden önemli?',
      options: ['Gereksiz', 'Biriktirmek zaman alır', 'Hiçbir şey', 'Zaman kaybı'],
      correct: 1,
      explanation: 'Biriktirmek zaman alır, sabırlı olmalıyız.',
    },
    {
      question: 'İstek nedir?',
      options: ['Yaşamak için gerekli', 'Olsa güzel olur', 'Zorunlu', 'Acil'],
      correct: 1,
      explanation: 'İstek olsa güzel olur ama olmasa da olur.',
    },
    {
      question: 'Alışverişte ne yapmalıyız?',
      options: ['Her şeyi almalıyız', 'Planımıza uymalıyız', 'Rastgele almalıyız', 'Hiçbir şey'],
      correct: 1,
      explanation: 'Alışverişte planımıza uymalıyız.',
    },
  ],
  4: [
    {
      question: 'Bütçe nedir?',
      options: ['Oyun', 'Gelir ve gider planı', 'Yemek', 'Kitap'],
      correct: 1,
      explanation: 'Bütçe gelir ve giderlerin planlanmasıdır.',
    },
    {
      question: 'Gelir nedir?',
      options: ['Harcadığımız para', 'Aldığımız para', 'Oyuncak', 'Yemek'],
      correct: 1,
      explanation: 'Gelir aldığımız paradır.',
    },
    {
      question: 'Gider nedir?',
      options: ['Aldığımız para', 'Harcadığımız para', 'Biriktirdiğimiz para', 'Bulduğumuz para'],
      correct: 1,
      explanation: 'Gider harcadığımız paradır.',
    },
    {
      question: 'Gelir ve gider arasında nasıl bir ilişki olmalı?',
      options: ['Gelir > Gider', 'Gider > Gelir', 'Eşit olmalı', 'Fark etmez'],
      correct: 0,
      explanation: 'Gelir giderden fazla olmalı ki para biriktirebilesin.',
    },
    {
      question: 'Harçlığın yüzde kaçını biriktirmelisin?',
      options: ['%0', '%20-30', '%100', '%5'],
      correct: 1,
      explanation: "Harçlığın %20-30'unu biriktirmeye çalış.",
    },
  ],
  5: [
    {
      question: 'Tasarruf nedir?',
      options: ['Para harcamak', 'Gelecek için para biriktirmek', 'Borç almak', 'Para kaybetmek'],
      correct: 1,
      explanation: 'Tasarruf gelecek için para biriktirmektir.',
    },
    {
      question: 'Kısa vadeli hedef örneği nedir?',
      options: ['Ev almak', 'Araba almak', 'Oyuncak almak', 'İş kurmak'],
      correct: 2,
      explanation: 'Oyuncak almak kısa vadeli hedeftir.',
    },
    {
      question: 'Uzun vadeli hedef örneği nedir?',
      options: ['Çikolata almak', 'Bisiklet almak', 'Dondurma almak', 'Kalem almak'],
      correct: 1,
      explanation: 'Bisiklet almak uzun vadeli hedeftir.',
    },
    {
      question: 'Akıllı alışveriş için ne yapmalıyız?',
      options: [
        'İlk gördüğümüzü almalıyız',
        'Fiyat karşılaştırmalıyız',
        'En pahalıyı almalıyız',
        'Rastgele seçmeliyiz',
      ],
      correct: 1,
      explanation: 'Akıllı alışveriş için fiyat karşılaştırmalıyız.',
    },
    {
      question: 'İndirim zamanlarını takip etmek neden önemli?',
      options: ['Gereksiz', 'Para tasarrufu sağlar', 'Zaman kaybı', 'Hiçbir şey'],
      correct: 1,
      explanation: 'İndirim zamanları para tasarrufu sağlar.',
    },
  ],
  6: [
    {
      question: 'Banka nedir?',
      options: ['Market', 'Paranı güvenle saklayabileceğin yer', 'Okul', 'Park'],
      correct: 1,
      explanation: 'Banka paranı güvenle saklayabileceğin yerdir.',
    },
    {
      question: 'Tasarruf hesabı ne işe yarar?',
      options: ['Oyun oynamak', 'Para biriktirmek', 'Yemek yemek', 'Uyumak'],
      correct: 1,
      explanation: 'Tasarruf hesabı para biriktirmek için kullanılır.',
    },
    {
      question: 'Faiz nedir?',
      options: ['Vergi', 'Bankada para biriktirince kazanılan para', 'Borç', 'Ceza'],
      correct: 1,
      explanation: 'Faiz bankada para biriktirince kazanılan paradır.',
    },
    {
      question: 'ATM ne işe yarar?',
      options: ['Yemek almak', 'Para çekmek', 'Oyun oynamak', 'Uyumak'],
      correct: 1,
      explanation: 'ATM para çekmek için kullanılır.',
    },
    {
      question: 'Dijital para kullanırken en önemli şey nedir?',
      options: ['Hız', 'Güvenlik', 'Renk', 'Boyut'],
      correct: 1,
      explanation: 'Dijital para kullanırken güvenlik çok önemlidir.',
    },
  ],
  7: [
    {
      question: 'Finansal planlama nedir?',
      options: ['Oyun', 'Gelecek için para yönetimi', 'Yemek', 'Spor'],
      correct: 1,
      explanation: 'Finansal planlama gelecek için para yönetimidir.',
    },
    {
      question: '50-30-20 kuralı nedir?',
      options: [
        'Oyun kuralı',
        '%50 ihtiyaç, %30 istek, %20 tasarruf',
        'Spor kuralı',
        'Yemek kuralı',
      ],
      correct: 1,
      explanation: '50-30-20 kuralı bütçe dağılımıdır.',
    },
    {
      question: 'Acil durum fonu nedir?',
      options: [
        'Oyuncak parası',
        'Beklenmedik durumlar için ayrılan para',
        'Tatil parası',
        'Yemek parası',
      ],
      correct: 1,
      explanation: 'Acil durum fonu beklenmedik durumlar içindir.',
    },
    {
      question: 'Yatırım nedir?',
      options: [
        'Para harcamak',
        'Paranı çalıştırarak kazanç elde etmek',
        'Para kaybetmek',
        'Borç almak',
      ],
      correct: 1,
      explanation: 'Yatırım paranı çalıştırarak kazanç elde etmektir.',
    },
    {
      question: 'Çeşitlendirme neden önemli?',
      options: ['Gereksiz', 'Riski azaltır', 'Zaman kaybı', 'Hiçbir şey'],
      correct: 1,
      explanation: 'Çeşitlendirme riski azaltır.',
    },
  ],
  8: [
    {
      question: 'Kredi nedir?',
      options: ['Hediye', 'Ödünç alınan para', 'Kazanılan para', 'Bulunan para'],
      correct: 1,
      explanation: 'Kredi ödünç alınan paradır ve faizi ile geri ödenir.',
    },
    {
      question: 'Kredi kartı kullanımında dikkat edilmesi gereken nedir?',
      options: ['Renk', 'Dikkatli kullanım', 'Boyut', 'Ağırlık'],
      correct: 1,
      explanation: 'Kredi kartı dikkatli kullanılmalıdır.',
    },
    {
      question: 'Girişimcilik nedir?',
      options: ['İşe girmek', 'Kendi işini kurmak', 'Uyumak', 'Yemek yemek'],
      correct: 1,
      explanation: 'Girişimcilik kendi işini kurarak para kazanmaktır.',
    },
    {
      question: 'Vergi nedir?',
      options: ['Hediye', 'Devlete ödenen para', 'Borç', 'Maaş'],
      correct: 1,
      explanation: 'Vergi devlete ödenen paradır.',
    },
    {
      question: 'Sigorta neden önemli?',
      options: ['Gereksiz', 'Risklere karşı güvence', 'Zaman kaybı', 'Hiçbir şey'],
      correct: 1,
      explanation: 'Sigorta olası risklere karşı güvencedir.',
    },
  ],
};

export default function FinancialTests({ gradeLevel, onExit }: FinancialTestsProps) {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4">
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
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4">
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
          <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
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
              <div className="mt-6 p-4 bg-green-500/20 rounded-xl">
                <p className="text-white">{test.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
