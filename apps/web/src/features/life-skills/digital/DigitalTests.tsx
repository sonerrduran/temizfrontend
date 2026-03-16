import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface DigitalTestsProps {
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
      question: 'İnternet kullanırken yanımızda kim olmalı?',
      options: ['Kimse', 'Yetişkin', 'Arkadaş', 'Kardeş'],
      correct: 1,
      explanation: 'İnternet kullanırken mutlaka bir yetişkin yanımızda olmalı.',
    },
    {
      question: 'Güvenli sitelerin işareti nedir?',
      options: ['Kırmızı X', 'Yeşil kilit', 'Sarı ünlem', 'Mavi yıldız'],
      correct: 1,
      explanation: 'Güvenli siteler yeşil kilit işareti gösterir.',
    },
    {
      question: 'Kişisel bilgilerimizi kimseyle paylaşmalı mıyız?',
      options: ['Evet', 'Hayır', 'Bazen', 'Her zaman'],
      correct: 1,
      explanation: 'Kişisel bilgilerimizi asla kimseyle paylaşmamalıyız.',
    },
    {
      question: 'Günde kaç saat ekran kullanmalıyız?',
      options: ['10 saat', '1-2 saat', '5 saat', 'Sınırsız'],
      correct: 1,
      explanation: 'Günde 1-2 saat ekran kullanmalıyız.',
    },
    {
      question: 'Bilinmeyen linklere ne yapmalıyız?',
      options: ['Tıklamalıyız', 'Tıklamamalıyız', 'Paylaşmalıyız', 'İndirmeliyiz'],
      correct: 1,
      explanation: 'Bilinmeyen linklere asla tıklamamalıyız.',
    },
  ],
  2: [
    {
      question: 'Şifremizi kimseyle paylaşmalı mıyız?',
      options: ['Evet', 'Hayır', 'Arkadaşlarla', 'Ailemizle'],
      correct: 1,
      explanation: 'Şifremizi kimseyle paylaşmamalıyız.',
    },
    {
      question: 'İnternette kibar olmalı mıyız?',
      options: ['Hayır', 'Evet', 'Bazen', 'Hiç'],
      correct: 1,
      explanation: 'İnternette de gerçek hayattaki gibi kibar olmalıyız.',
    },
    {
      question: 'Uyumadan önce ekrana bakmalı mıyız?',
      options: ['Evet', 'Hayır', 'Her zaman', 'Bazen'],
      correct: 1,
      explanation: 'Uyumadan önce ekrana bakmamalıyız.',
    },
    {
      question: 'Fotoğraflarımızı ne zaman paylaşabiliriz?',
      options: ['Her zaman', 'Yetişkin izniyle', 'Hiç', 'Arkadaşlarla'],
      correct: 1,
      explanation: 'Fotoğraflarımızı sadece yetişkin izniyle paylaşabiliriz.',
    },
    {
      question: 'İnternette gördüğümüz her şey doğru mudur?',
      options: ['Evet', 'Hayır', 'Her zaman', 'Çoğunlukla'],
      correct: 1,
      explanation: 'İnternette gördüğümüz her şey doğru olmayabilir.',
    },
  ],
  3: [
    {
      question: 'Güçlü şifre kaç karakter olmalıdır?',
      options: ['3', '5', '8 veya daha fazla', '1'],
      correct: 2,
      explanation: 'Güçlü şifre en az 8 karakter olmalıdır.',
    },
    {
      question: 'Bilinmeyen kişilerle konuşmalı mıyız?',
      options: ['Evet', 'Hayır', 'Bazen', 'Her zaman'],
      correct: 1,
      explanation: 'İnternette bilinmeyen kişilerle konuşmamalıyız.',
    },
    {
      question: 'Oyun içi satın alım için ne yapmalıyız?',
      options: [
        'Hemen almalıyız',
        'Yetişkin izni almalıyız',
        'Gizlice almalıyız',
        'Arkadaşa sormalıyız',
      ],
      correct: 1,
      explanation: 'Oyun içi satın alım için yetişkin izni almalıyız.',
    },
    {
      question: 'Dijital ayak izi nedir?',
      options: ['Ayak izi', 'İnternette bıraktığımız izler', 'Oyun', 'Program'],
      correct: 1,
      explanation: 'Dijital ayak izi internette bıraktığımız izlerdir.',
    },
    {
      question: 'Virüs taraması ne zaman yapılmalı?',
      options: ['Hiç', 'İndirmeden önce', 'Sonra', 'Bazen'],
      correct: 1,
      explanation: 'İndirmeden önce virüs taraması yapmalıyız.',
    },
  ],
  4: [
    {
      question: 'Her hesap için aynı şifre kullanmalı mıyız?',
      options: ['Evet', 'Hayır', 'Bazen', 'Her zaman'],
      correct: 1,
      explanation: 'Her hesap için farklı şifre kullanmalıyız.',
    },
    {
      question: 'Şüpheli mesaj gelirse ne yapmalıyız?',
      options: ['Açmalıyız', 'Yetişkine söylemeliyiz', 'Silmeliyiz', 'Paylaşmalıyız'],
      correct: 1,
      explanation: 'Şüpheli mesaj gelirse yetişkine söylemeliyiz.',
    },
    {
      question: 'Sadece nereden indirme yapmalıyız?',
      options: ['Her yerden', 'Güvenilir kaynaklardan', 'Bilinmeyen sitelerden', 'Arkadaştan'],
      correct: 1,
      explanation: 'Sadece güvenilir kaynaklardan indirme yapmalıyız.',
    },
    {
      question: 'Paylaşmadan önce ne yapmalıyız?',
      options: ['Hemen paylaşmalıyız', 'Düşünmeliyiz', 'Silmeliyiz', 'Hiçbir şey'],
      correct: 1,
      explanation: 'Paylaşmadan önce düşünmeliyiz.',
    },
    {
      question: 'Yaşımıza uygun olmayan oyunlar oynamalı mıyız?',
      options: ['Evet', 'Hayır', 'Bazen', 'Her zaman'],
      correct: 1,
      explanation: 'Sadece yaşımıza uygun oyunlar oynamalıyız.',
    },
  ],
  5: [
    {
      question: 'Siber zorbalık nedir?',
      options: ['Oyun', 'İnternette zarar vermek', 'Program', 'Site'],
      correct: 1,
      explanation: 'Siber zorbalık internette başkalarına zarar vermektir.',
    },
    {
      question: 'Sosyal medya hesaplarımızı nasıl tutmalıyız?',
      options: ['Açık', 'Gizli', 'Herkese açık', 'Paylaşımlı'],
      correct: 1,
      explanation: 'Sosyal medya hesaplarımızı gizli tutmalıyız.',
    },
    {
      question: 'Konum bilgimizi paylaşmalı mıyız?',
      options: ['Evet', 'Hayır', 'Her zaman', 'Bazen'],
      correct: 1,
      explanation: 'Konum bilgimizi paylaşmamalıyız.',
    },
    {
      question: 'İnternetteki her bilgi doğru mudur?',
      options: ['Evet', 'Hayır', 'Her zaman', 'Çoğunlukla'],
      correct: 1,
      explanation: 'İnternetteki her bilgi doğru değildir.',
    },
    {
      question: 'Telif hakkı nedir?',
      options: ['Oyun', 'İçeriklerin korunması', 'Program', 'Site'],
      correct: 1,
      explanation: 'Telif hakkı içeriklerin korunmasıdır.',
    },
  ],
  6: [
    {
      question: 'Siber zorbalığa maruz kalırsak ne yapmalıyız?',
      options: [
        'Gizlemeliyiz',
        'Yetişkine söylemeliyiz',
        'Karşılık vermeliyiz',
        'Görmezden gelmeliyiz',
      ],
      correct: 1,
      explanation: 'Siber zorbalığa maruz kalırsak yetişkine söylemeliyiz.',
    },
    {
      question: 'Sadece kimleri arkadaş eklemeliyiz?',
      options: ['Herkesi', 'Tanıdıklarımızı', 'Yabancıları', 'Kimseyi'],
      correct: 1,
      explanation: 'Sadece tanıdıklarımızı arkadaş eklemeliyiz.',
    },
    {
      question: 'Bilgi kaynağını kontrol etmeli miyiz?',
      options: ['Hayır', 'Evet', 'Bazen', 'Hiç'],
      correct: 1,
      explanation: 'Bilgi kaynağını mutlaka kontrol etmeliyiz.',
    },
    {
      question: 'Dijital itibar nedir?',
      options: ['Oyun', 'İnternetteki davranışlarımız', 'Program', 'Site'],
      correct: 1,
      explanation: 'Dijital itibar internetteki davranışlarımızdır.',
    },
    {
      question: 'Başkalarının içeriklerini izinsiz kullanabilir miyiz?',
      options: ['Evet', 'Hayır', 'Bazen', 'Her zaman'],
      correct: 1,
      explanation: 'Başkalarının içeriklerini izinsiz kullanamayız.',
    },
  ],
  7: [
    {
      question: 'Dijital okuryazarlık nedir?',
      options: ['Okuma', 'Teknolojiyi etkili kullanma', 'Yazma', 'Oyun'],
      correct: 1,
      explanation: 'Dijital okuryazarlık teknolojiyi etkili kullanma becerisidir.',
    },
    {
      question: 'İki faktörlü kimlik doğrulama kullanmalı mıyız?',
      options: ['Hayır', 'Evet', 'Bazen', 'Hiç'],
      correct: 1,
      explanation: 'İki faktörlü kimlik doğrulama kullanmalıyız.',
    },
    {
      question: 'Yanlış bilgi yaymalı mıyız?',
      options: ['Evet', 'Hayır', 'Bazen', 'Her zaman'],
      correct: 1,
      explanation: 'Yanlış bilgi yaymamalıyız.',
    },
    {
      question: 'Dijital bağımlılık nedir?',
      options: ['Oyun', 'Aşırı teknoloji kullanımı', 'Program', 'Site'],
      correct: 1,
      explanation: 'Dijital bağımlılık aşırı teknoloji kullanımıdır.',
    },
    {
      question: 'Gizlilik ayarlarını kontrol etmeli miyiz?',
      options: ['Hayır', 'Evet', 'Bazen', 'Hiç'],
      correct: 1,
      explanation: 'Gizlilik ayarlarını düzenli kontrol etmeliyiz.',
    },
  ],
  8: [
    {
      question: 'Dijital vatandaşlık nedir?',
      options: ['Oyun', 'Online ortamda sorumlu davranmak', 'Program', 'Site'],
      correct: 1,
      explanation: 'Dijital vatandaşlık online ortamda sorumlu davranmaktır.',
    },
    {
      question: 'Veri ihlallerine karşı ne yapmalıyız?',
      options: ['Hiçbir şey', 'Dikkatli olmalıyız', 'Görmezden gelmeliyiz', 'Paylaşmalıyız'],
      correct: 1,
      explanation: 'Veri ihlallerine karşı dikkatli olmalıyız.',
    },
    {
      question: 'Dijital detoks nedir?',
      options: ['Oyun', 'Teknolojiden ara vermek', 'Program', 'Site'],
      correct: 1,
      explanation: 'Dijital detoks teknolojiden ara vermektir.',
    },
    {
      question: 'Etik kurallara uymalı mıyız?',
      options: ['Hayır', 'Evet', 'Bazen', 'Hiç'],
      correct: 1,
      explanation: 'Dijital ortamda etik kurallara uymalıyız.',
    },
    {
      question: 'Gerçek hayat ilişkilerine öncelik vermeli miyiz?',
      options: ['Hayır', 'Evet', 'Bazen', 'Hiç'],
      correct: 1,
      explanation: 'Gerçek hayat ilişkilerine öncelik vermeliyiz.',
    },
  ],
};

export default function DigitalTests({ gradeLevel, onExit }: DigitalTestsProps) {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
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
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
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
          <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
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
              <div className="mt-6 p-4 bg-purple-500/20 rounded-xl">
                <p className="text-white">{test.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
