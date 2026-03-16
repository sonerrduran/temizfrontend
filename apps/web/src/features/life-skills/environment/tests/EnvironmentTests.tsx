import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface EnvironmentTestsProps {
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
      question: 'Çöpleri nereye atmalıyız?',
      options: ['Yere', 'Çöp kutusuna', 'Denize', 'Ağaca'],
      correct: 1,
      explanation: 'Çöpleri çöp kutusuna atmalıyız.',
    },
    {
      question: 'Ağaçlar bize ne verir?',
      options: ['Para', 'Oksijen', 'Oyuncak', 'Yemek'],
      correct: 1,
      explanation: 'Ağaçlar oksijen üretir.',
    },
    {
      question: 'Dişlerimizi fırçalarken musluğu ne yapmalıyız?',
      options: ['Açık bırakmalıyız', 'Kapatmalıyız', 'Kırmalıyız', 'Hiçbir şey'],
      correct: 1,
      explanation: 'Su tasarrufu için musluğu kapatmalıyız.',
    },
    {
      question: 'Hayvanlara nasıl davranmalıyız?',
      options: ['Kötü', 'İyi', 'Vurmalıyız', 'Kaçmalıyız'],
      correct: 1,
      explanation: 'Hayvanlara iyi davranmalıyız.',
    },
    {
      question: 'Temiz hava için ne yapmalıyız?',
      options: ['Ağaç dikmeliyiz', 'Ağaç kesmeliyiz', 'Çöp atmalıyız', 'Hiçbir şey'],
      correct: 0,
      explanation: 'Ağaçlar havayı temizler.',
    },
  ],
  2: [
    {
      question: 'Piknikte çöplerimizi ne yapmalıyız?',
      options: ['Yere atmalıyız', 'Toplamalıyız', 'Bırakmalıyız', 'Gömmeliyiz'],
      correct: 1,
      explanation: 'Piknikte çöplerimizi toplamalıyız.',
    },
    {
      question: 'Su neden değerlidir?',
      options: ['Ucuz', 'Sınırsız', 'Bitebilir', 'Gereksiz'],
      correct: 2,
      explanation: 'Su sınırlıdır ve bitebilir.',
    },
    {
      question: 'Sokak hayvanlarına ne yapabiliriz?',
      options: ['Zarar verebiliriz', 'Yardım edebiliriz', 'Kaçabiliriz', 'Hiçbir şey'],
      correct: 1,
      explanation: 'Sokak hayvanlarına yardım edebiliriz.',
    },
    {
      question: 'Arabalar havayı nasıl etkiler?',
      options: ['Temizler', 'Kirletir', 'Etkilemez', 'İyileştirir'],
      correct: 1,
      explanation: 'Arabalar havayı kirletir.',
    },
    {
      question: 'Bisiklet kullanmak neden iyidir?',
      options: ['Hızlı', 'Çevre dostu', 'Pahalı', 'Zor'],
      correct: 1,
      explanation: 'Bisiklet çevre dostudur.',
    },
  ],
  3: [
    {
      question: 'Geri dönüşüm nedir?',
      options: ['Çöp atmak', 'Atıkları tekrar kullanmak', 'Yakmak', 'Gömmek'],
      correct: 1,
      explanation: 'Geri dönüşüm atıkları tekrar kullanmaktır.',
    },
    {
      question: 'Hangi malzemeler geri dönüştürülebilir?',
      options: ['Sadece kağıt', 'Kağıt, plastik, cam', 'Hiçbiri', 'Sadece plastik'],
      correct: 1,
      explanation: 'Kağıt, plastik ve cam geri dönüştürülebilir.',
    },
    {
      question: 'Kullanmadığımız ışıkları ne yapmalıyız?',
      options: ['Açık bırakmalıyız', 'Kapatmalıyız', 'Kırmalıyız', 'Hiçbir şey'],
      correct: 1,
      explanation: 'Enerji tasarrufu için ışıkları kapatmalıyız.',
    },
    {
      question: 'Plastik doğada ne kadar kalır?',
      options: ['1 gün', '1 ay', 'Yüzlerce yıl', '1 yıl'],
      correct: 2,
      explanation: 'Plastik yüzlerce yıl bozulmaz.',
    },
    {
      question: 'Tek kullanımlık plastik yerine ne kullanmalıyız?',
      options: ['Daha fazla plastik', 'Bez çanta', 'Hiçbir şey', 'Kağıt'],
      correct: 1,
      explanation: 'Bez çanta kullanmalıyız.',
    },
  ],
  4: [
    {
      question: 'Kompost nedir?',
      options: ['Çöp', 'Organik gübre', 'Plastik', 'Metal'],
      correct: 1,
      explanation: 'Kompost organik atıklardan yapılan gübredir.',
    },
    {
      question: 'Yerel ürünler neden önemli?',
      options: ['Ucuz', 'Çevreye daha az zarar', 'Pahalı', 'Gereksiz'],
      correct: 1,
      explanation: 'Yerel ürünler daha az yakıt harcar.',
    },
    {
      question: 'Mevsim meyveleri ne zaman yemeliyiz?',
      options: ['Her zaman', 'Mevsiminde', 'Hiç', 'Kışın'],
      correct: 1,
      explanation: 'Mevsim meyveleri mevsiminde yenmelidir.',
    },
    {
      question: 'Enerji tasarrufu neden önemli?',
      options: ['Gereksiz', 'Çevreyi korur', 'Zor', 'Pahalı'],
      correct: 1,
      explanation: 'Enerji tasarrufu çevreyi korur.',
    },
    {
      question: 'Organik atıklar ne yapılabilir?',
      options: ['Yakılır', 'Kompost yapılır', 'Atılır', 'Gömülür'],
      correct: 1,
      explanation: 'Organik atıklardan kompost yapılır.',
    },
  ],
  5: [
    {
      question: 'İklim değişikliği neden oluşur?',
      options: ['Doğal', 'Sera gazları', 'Yağmur', 'Kar'],
      correct: 1,
      explanation: 'Sera gazları iklim değişikliğine neden olur.',
    },
    {
      question: 'Buzullar neden eriyor?',
      options: ['Soğuk', 'Küresel ısınma', 'Yağmur', 'Kar'],
      correct: 1,
      explanation: 'Küresel ısınma buzulları eritiyor.',
    },
    {
      question: 'Karbon ayak izi nedir?',
      options: ['Ayak izi', 'Ürettiğimiz sera gazı', 'Yürümek', 'Koşmak'],
      correct: 1,
      explanation: 'Karbon ayak izi ürettiğimiz sera gazı miktarıdır.',
    },
    {
      question: 'Toplu taşıma neden önemli?',
      options: ['Hızlı', 'Çevre dostu', 'Pahalı', 'Zor'],
      correct: 1,
      explanation: 'Toplu taşıma daha az karbon üretir.',
    },
    {
      question: 'Ağaç dikmek neden önemli?',
      options: ['Süs', 'Oksijen üretir', 'Gereksiz', 'Zor'],
      correct: 1,
      explanation: 'Ağaçlar oksijen üretir ve karbon tutar.',
    },
  ],
  6: [
    {
      question: 'Biyoçeşitlilik nedir?',
      options: ['Tek tür', 'Canlı çeşitliliği', 'Bitki', 'Hayvan'],
      correct: 1,
      explanation: 'Biyoçeşitlilik canlı türlerinin çeşitliliğidir.',
    },
    {
      question: 'Su kirliliği neyi etkiler?',
      options: ['Hiçbir şey', 'Denizler ve nehirler', 'Sadece balıklar', 'Sadece insanlar'],
      correct: 1,
      explanation: 'Su kirliliği tüm su kaynaklarını etkiler.',
    },
    {
      question: 'Hayvan hakları neden önemli?',
      options: ['Gereksiz', 'Hayvanlar da canlıdır', 'Sadece insanlar önemli', 'Hiçbir şey'],
      correct: 1,
      explanation: 'Hayvanların da hakları vardır.',
    },
    {
      question: 'Sürdürülebilir yaşam nedir?',
      options: ['Lüks yaşam', 'Gelecek nesilleri düşünmek', 'Tüketmek', 'Hiçbir şey'],
      correct: 1,
      explanation: 'Sürdürülebilir yaşam gelecek nesilleri düşünmektir.',
    },
    {
      question: 'Yenilenebilir enerji nedir?',
      options: ['Kömür', 'Güneş, rüzgar', 'Petrol', 'Gaz'],
      correct: 1,
      explanation: 'Güneş ve rüzgar yenilenebilir enerjidir.',
    },
  ],
  7: [
    {
      question: 'Karbon nötr yaşam mümkün mü?',
      options: ['Hayır', 'Evet', 'Bilmiyorum', 'Belki'],
      correct: 1,
      explanation: 'Bilinçli seçimlerle karbon nötr yaşam mümkündür.',
    },
    {
      question: 'Gönüllülük nedir?',
      options: ['Zorunluluk', 'Topluma katkı', 'İş', 'Hobi'],
      correct: 1,
      explanation: 'Gönüllülük topluma katkı sağlamaktır.',
    },
    {
      question: 'Döngüsel ekonomi nedir?',
      options: ['Normal ekonomi', 'Atık üretmeyen sistem', 'Pahalı sistem', 'Gereksiz'],
      correct: 1,
      explanation: 'Döngüsel ekonomi atık üretmeyen sistemdir.',
    },
    {
      question: 'Çevre aktivizmi nedir?',
      options: ['Pasif olmak', 'Çevre için mücadele', 'Hiçbir şey', 'Sadece konuşmak'],
      correct: 1,
      explanation: 'Çevre aktivizmi çevre sorunlarına karşı mücadeledir.',
    },
    {
      question: 'Sıfır atık hedefi nedir?',
      options: ['Çok atık', 'Hiç atık üretmemek', 'Az atık', 'Gereksiz'],
      correct: 1,
      explanation: 'Sıfır atık hiç atık üretmemektir.',
    },
  ],
  8: [
    {
      question: 'Toplumsal sorumluluk nedir?',
      options: ['Sadece kendini düşünmek', 'Topluma katkı', 'Hiçbir şey', 'Gereksiz'],
      correct: 1,
      explanation: 'Toplumsal sorumluluk topluma katkı sağlamaktır.',
    },
    {
      question: 'Çevre kampanyalarına neden katılmalıyız?',
      options: ['Gereksiz', 'Fark yaratmak için', 'Zaman kaybı', 'Hiçbir şey'],
      correct: 1,
      explanation: 'Kampanyalar fark yaratır.',
    },
    {
      question: 'Değişim kimle başlar?',
      options: ['Başkalarıyla', 'Seninle', 'Hükümetle', 'Hiç kimseyle'],
      correct: 1,
      explanation: 'Değişim seninle başlar.',
    },
    {
      question: 'Birlikte hareket etmek neden önemli?',
      options: ['Gereksiz', 'Daha güçlüyüz', 'Zor', 'Yavaş'],
      correct: 1,
      explanation: 'Birlikte daha güçlüyüz.',
    },
    {
      question: 'Herkes bir şeyler yapabilir mi?',
      options: ['Hayır', 'Evet', 'Sadece zenginler', 'Sadece yetişkinler'],
      correct: 1,
      explanation: 'Herkes bir şeyler yapabilir.',
    },
  ],
};

export default function EnvironmentTests({ gradeLevel, onExit }: EnvironmentTestsProps) {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-4">
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
                className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-4">
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
          <span className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
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
              <div className="mt-6 p-4 bg-teal-500/20 rounded-xl">
                <p className="text-white">{test.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
