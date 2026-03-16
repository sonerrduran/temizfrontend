import React, { useState } from 'react';

interface NutritionTestsProps {
  gradeLevel: number;
  onExit: () => void;
}

const testsByGrade: Record<
  number,
  Array<{ question: string; options: string[]; correctAnswer: number; explanation: string }>
> = {
  1: [
    {
      question: 'Hangi besin grubu kemiklerimizi güçlendirir?',
      options: ['Süt ve süt ürünleri', 'Şekerler', 'Gazlı içecekler', 'Cipsler'],
      correctAnswer: 0,
      explanation: 'Süt ve süt ürünleri kalsiyum içerir ve kemikleri güçlendirir.',
    },
    {
      question: 'Günde kaç öğün yemek yemeliyiz?',
      options: ['1 öğün', '2 öğün', '3 öğün', '5 öğün'],
      correctAnswer: 2,
      explanation: 'Düzenli 3 öğün yemek yemek sağlıklıdır.',
    },
    {
      question: 'Hangi besin C vitamini açısından zengindir?',
      options: ['Portakal', 'Ekmek', 'Yağ', 'Şeker'],
      correctAnswer: 0,
      explanation: 'Portakal C vitamini açısından çok zengindir.',
    },
    {
      question: 'Sabah kahvaltısı neden önemlidir?',
      options: ['Önemli değil', 'Güne enerjik başlamak için', 'Sadece acıkınca', 'Zayıflamak için'],
      correctAnswer: 1,
      explanation: 'Kahvaltı güne enerjik başlamamızı sağlar.',
    },
    {
      question: 'Hangi içecek en sağlıklıdır?',
      options: ['Kola', 'Su', 'Meyve suyu (şekerli)', 'Enerji içeceği'],
      correctAnswer: 1,
      explanation: 'Su vücudumuz için en sağlıklı içecektir.',
    },
  ],
  2: [
    {
      question: 'Hangi besin grubu enerji verir?',
      options: ['Ekmek, makarna, pirinç', 'Sadece su', 'Sadece sebze', 'Sadece meyve'],
      correctAnswer: 0,
      explanation: 'Karbonhidratlar (ekmek, makarna) enerji kaynağıdır.',
    },
    {
      question: 'Günde kaç bardak su içmeliyiz?',
      options: ['1-2 bardak', '3-4 bardak', '6-8 bardak', '10-12 bardak'],
      correctAnswer: 2,
      explanation: 'Günde 6-8 bardak su içmek önerilir.',
    },
    {
      question: 'Hangi besin protein açısından zengindir?',
      options: ['Şeker', 'Et, tavuk, balık', 'Gazoz', 'Cips'],
      correctAnswer: 1,
      explanation: 'Et, tavuk ve balık protein kaynağıdır.',
    },
    {
      question: 'Sebze ve meyveleri neden yemeliyiz?',
      options: [
        'Sadece lezzet için',
        'Vitamin ve mineral için',
        'Zayıflamak için',
        'Hiç yememeliyiz',
      ],
      correctAnswer: 1,
      explanation: 'Sebze ve meyveler vitamin ve mineral açısından zengindir.',
    },
    {
      question: 'Hangi yemek öğünü atlanmamalıdır?',
      options: ['Kahvaltı', 'Öğle yemeği', 'Akşam yemeği', 'Hiçbiri atlanmamalı'],
      correctAnswer: 3,
      explanation: 'Tüm öğünler düzenli yenmelidir.',
    },
  ],
  3: [
    {
      question: 'Fast food neden sağlıksızdır?',
      options: [
        'Lezzetli olduğu için',
        'Çok yağlı ve tuzlu olduğu için',
        'Ucuz olduğu için',
        'Hızlı hazırlandığı için',
      ],
      correctAnswer: 1,
      explanation: 'Fast food çok yağlı, tuzlu ve sağlıksızdır.',
    },
    {
      question: 'Hangi besin demir açısından zengindir?',
      options: ['Şeker', 'Ispanak', 'Gazoz', 'Cips'],
      correctAnswer: 1,
      explanation: 'Ispanak demir açısından zengindir.',
    },
    {
      question: 'Günde kaç porsiyon meyve yemeliyiz?',
      options: ['Hiç', '1 porsiyon', '2-3 porsiyon', '10 porsiyon'],
      correctAnswer: 2,
      explanation: 'Günde 2-3 porsiyon meyve yemek önerilir.',
    },
    {
      question: 'Hangi besin kötü kolesterolü artırır?',
      options: ['Sebze', 'Meyve', 'Kızartmalar', 'Su'],
      correctAnswer: 2,
      explanation: 'Kızartmalar kötü kolesterolü artırır.',
    },
    {
      question: 'Dengeli beslenme ne demektir?',
      options: [
        'Sadece et yemek',
        'Tüm besin gruplarından yeterli miktarda almak',
        'Sadece sebze yemek',
        'Hiç yemek yememek',
      ],
      correctAnswer: 1,
      explanation: 'Dengeli beslenme tüm besin gruplarını içerir.',
    },
  ],
  4: [
    {
      question: 'Hangi vitamin bağışıklık sistemini güçlendirir?',
      options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin K'],
      correctAnswer: 2,
      explanation: 'Vitamin C bağışıklık sistemini güçlendirir.',
    },
    {
      question: 'Egzersiz neden önemlidir?',
      options: [
        'Önemli değil',
        'Kalp sağlığı ve kilo kontrolü için',
        'Sadece sporcular için',
        'Zayıflamak için',
      ],
      correctAnswer: 1,
      explanation: 'Egzersiz kalp sağlığı ve genel sağlık için önemlidir.',
    },
    {
      question: 'Hangi besin Omega-3 açısından zengindir?',
      options: ['Cips', 'Balık', 'Şeker', 'Gazoz'],
      correctAnswer: 1,
      explanation: 'Balık Omega-3 yağ asitleri açısından zengindir.',
    },
    {
      question: 'Günde kaç saat uyumalıyız?',
      options: ['2-3 saat', '4-5 saat', '8-10 saat', '15 saat'],
      correctAnswer: 2,
      explanation: 'Çocuklar günde 8-10 saat uyumalıdır.',
    },
    {
      question: 'Hangi besin kalsiyum açısından zengindir?',
      options: ['Peynir', 'Şeker', 'Cips', 'Kola'],
      correctAnswer: 0,
      explanation: 'Peynir kalsiyum açısından zengindir.',
    },
  ],
  5: [
    {
      question: 'Metabolizma ne demektir?',
      options: [
        'Sadece yemek yemek',
        'Vücudun enerji üretme süreci',
        'Sadece uyumak',
        'Sadece spor yapmak',
      ],
      correctAnswer: 1,
      explanation: 'Metabolizma vücudun enerji üretme ve kullanma sürecidir.',
    },
    {
      question: 'Hangi besin lif açısından zengindir?',
      options: ['Beyaz ekmek', 'Tam tahıllı ekmek', 'Şeker', 'Yağ'],
      correctAnswer: 1,
      explanation: 'Tam tahıllı ürünler lif açısından zengindir.',
    },
    {
      question: 'Spor yapmadan önce ne yemeliyiz?',
      options: ['Ağır yemek', 'Hafif karbonhidrat', 'Hiçbir şey', 'Çok yağlı yemek'],
      correctAnswer: 1,
      explanation: 'Spor öncesi hafif karbonhidrat enerji verir.',
    },
    {
      question: 'Hangi içecek dehidrasyon yapar?',
      options: ['Su', 'Süt', 'Kafeinli içecekler', 'Meyve suyu'],
      correctAnswer: 2,
      explanation: 'Kafeinli içecekler dehidrasyona neden olabilir.',
    },
    {
      question: 'Günde kaç porsiyon sebze yemeliyiz?',
      options: ['Hiç', '1 porsiyon', '3-5 porsiyon', '10 porsiyon'],
      correctAnswer: 2,
      explanation: 'Günde 3-5 porsiyon sebze yemek önerilir.',
    },
  ],
  6: [
    {
      question: 'Hangi besin grubu kas yapımında önemlidir?',
      options: ['Şeker', 'Protein', 'Yağ', 'Sadece su'],
      correctAnswer: 1,
      explanation: 'Protein kas yapımı için gereklidir.',
    },
    {
      question: 'Glisemik indeks ne demektir?',
      options: [
        'Yemeğin tadı',
        'Besinlerin kan şekerine etkisi',
        'Yemeğin rengi',
        'Yemeğin fiyatı',
      ],
      correctAnswer: 1,
      explanation: 'Glisemik indeks besinlerin kan şekerine etkisini gösterir.',
    },
    {
      question: 'Hangi vitamin kemik sağlığı için önemlidir?',
      options: ['Vitamin A', 'Vitamin D', 'Vitamin E', 'Vitamin B12'],
      correctAnswer: 1,
      explanation: 'Vitamin D kemik sağlığı için çok önemlidir.',
    },
    {
      question: 'Aşırı tuz tüketimi neye neden olur?',
      options: ['Hiçbir şey', 'Yüksek tansiyon', 'Zayıflama', 'Güçlenme'],
      correctAnswer: 1,
      explanation: 'Aşırı tuz yüksek tansiyona neden olabilir.',
    },
    {
      question: 'Hangi besin antioksidan açısından zengindir?',
      options: ['Cips', 'Yaban mersini', 'Şeker', 'Gazoz'],
      correctAnswer: 1,
      explanation: 'Yaban mersini antioksidan açısından zengindir.',
    },
  ],
  7: [
    {
      question: 'Vücut kitle indeksi (BMI) neyi ölçer?',
      options: ['Sadece boy', 'Kilo ve boy oranı', 'Sadece kilo', 'Yaş'],
      correctAnswer: 1,
      explanation: 'BMI kilo ve boy oranını ölçer.',
    },
    {
      question: 'Hangi besin folat açısından zengindir?',
      options: ['Şeker', 'Yeşil yapraklı sebzeler', 'Cips', 'Kola'],
      correctAnswer: 1,
      explanation: 'Yeşil yapraklı sebzeler folat açısından zengindir.',
    },
    {
      question: 'Aerobik egzersiz nedir?',
      options: [
        'Sadece uyumak',
        'Kalp atışını artıran egzersiz',
        'Hiç hareket etmemek',
        'Sadece yemek yemek',
      ],
      correctAnswer: 1,
      explanation: 'Aerobik egzersiz kalp atışını artırır ve dayanıklılık geliştirir.',
    },
    {
      question: 'Hangi besin probiyotik içerir?',
      options: ['Şeker', 'Yoğurt', 'Cips', 'Gazoz'],
      correctAnswer: 1,
      explanation: 'Yoğurt probiyotik içerir ve bağırsak sağlığına iyi gelir.',
    },
    {
      question: 'Stres yönetimi neden önemlidir?',
      options: [
        'Önemli değil',
        'Genel sağlık ve beslenme için',
        'Sadece yaşlılar için',
        'Hiçbir etkisi yok',
      ],
      correctAnswer: 1,
      explanation: 'Stres yönetimi genel sağlık ve beslenme alışkanlıklarını etkiler.',
    },
  ],
  8: [
    {
      question: 'Hangi besin grubu esansiyel yağ asitleri içerir?',
      options: ['Şeker', 'Fındık ve tohumlar', 'Gazoz', 'Cips'],
      correctAnswer: 1,
      explanation: 'Fındık ve tohumlar esansiyel yağ asitleri içerir.',
    },
    {
      question: 'Uyku kalitesi beslenmeyi nasıl etkiler?',
      options: [
        'Etkilemez',
        'Hormonları ve iştahı etkiler',
        'Sadece yaşlıları etkiler',
        'Hiçbir etkisi yok',
      ],
      correctAnswer: 1,
      explanation: 'Uyku kalitesi hormonları ve iştahı etkiler.',
    },
    {
      question: 'Hangi mineral tiroid fonksiyonu için önemlidir?',
      options: ['İyot', 'Şeker', 'Tuz', 'Yağ'],
      correctAnswer: 0,
      explanation: 'İyot tiroid fonksiyonu için gereklidir.',
    },
    {
      question: 'Dengeli diyet planı nasıl olmalıdır?',
      options: ['Sadece et', 'Tüm besin gruplarını içermeli', 'Sadece sebze', 'Sadece meyve'],
      correctAnswer: 1,
      explanation: 'Dengeli diyet tüm besin gruplarını içermelidir.',
    },
    {
      question: 'Hangi egzersiz türü kemik yoğunluğunu artırır?',
      options: ['Sadece uyumak', 'Ağırlık kaldırma', 'Hiç hareket etmemek', 'Sadece yürümek'],
      correctAnswer: 1,
      explanation: 'Ağırlık kaldırma kemik yoğunluğunu artırır.',
    },
  ],
};

export default function NutritionTests({ gradeLevel, onExit }: NutritionTestsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const allQuestions = Object.entries(testsByGrade).flatMap(([grade, questions]) =>
    questions.map((q, index) => ({ ...q, grade: parseInt(grade), id: `${grade}-${index}` }))
  );

  const question = allQuestions[currentQuestion];

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === question.correctAnswer) {
      setScore(score + 10);
    }

    if (!answeredQuestions.includes(currentQuestion)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    }
  };

  const handleNext = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-lime-900 to-slate-900 p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="flex gap-4">
            <div className="bg-lime-500/20 px-4 py-2 rounded-full border border-lime-500/30">
              <span className="text-lime-300 font-bold">Puan: {score}</span>
            </div>
            <div className="bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
              <span className="text-green-300 font-bold">
                {currentQuestion + 1}/{allQuestions.length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-lime-500/30">
          <div className="text-center mb-8">
            <span className="inline-block bg-lime-500/20 px-4 py-2 rounded-full text-lime-300 font-bold text-sm mb-4">
              Seviye {question.grade}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">{question.question}</h2>
          </div>

          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left transition-all font-bold text-lg ${
                    showCorrect
                      ? 'bg-green-500 border-2 border-green-300 text-white'
                      : showIncorrect
                        ? 'bg-red-500 border-2 border-red-300 text-white'
                        : 'bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div
              className={`p-6 rounded-2xl mb-6 ${
                selectedAnswer === question.correctAnswer
                  ? 'bg-green-500/20 border border-green-500/50'
                  : 'bg-red-500/20 border border-red-500/50'
              }`}
            >
              <p className="text-white font-bold text-lg">{question.explanation}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all"
            >
              ← Önceki
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestion === allQuestions.length - 1}
              className="flex-1 bg-lime-600 hover:bg-lime-500 disabled:bg-slate-800 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all"
            >
              Sonraki →
            </button>
          </div>
        </div>

        <div className="mt-6 bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 border border-lime-500/20">
          <div className="flex gap-2 flex-wrap justify-center">
            {allQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentQuestion(index);
                  setSelectedAnswer(null);
                  setShowResult(false);
                }}
                className={`w-10 h-10 rounded-lg font-bold transition-all ${
                  index === currentQuestion
                    ? 'bg-lime-500 text-white'
                    : answeredQuestions.includes(index)
                      ? 'bg-green-500/50 text-white'
                      : 'bg-white/10 text-white/50 hover:bg-white/20'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
