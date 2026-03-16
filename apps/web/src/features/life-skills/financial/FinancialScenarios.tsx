import React, { useState } from 'react';

interface FinancialScenariosProps {
  gradeLevel: number;
  onExit: () => void;
}

const scenariosByGrade: Record<
  number,
  Array<{
    title: string;
    scenario: string;
    question: string;
    icon: string;
    options: Array<{ text: string; isCorrect: boolean; feedback: string }>;
  }>
> = {
  1: [
    {
      title: 'Kumbara Seçimi',
      icon: '🏦',
      scenario: 'Annen sana harçlık verdi. Para biriktirmek istiyorsun ama kumbaranın yok.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Hepsini harcamalıyım',
          isCorrect: false,
          feedback: 'Para biriktirmek önemli bir alışkanlıktır.',
        },
        {
          text: 'Kumbara almalı ve biriktirmeye başlamalıyım',
          isCorrect: true,
          feedback: 'Doğru! Kumbara para biriktirmek için harika bir araçtır.',
        },
        {
          text: 'Yastık altına koymalıyım',
          isCorrect: false,
          feedback: 'Kumbara daha güvenli ve düzenli bir yöntemdir.',
        },
      ],
    },
  ],
  2: [
    {
      title: 'Alışveriş Listesi',
      icon: '🛒',
      scenario: 'Annenle markete gidiyorsun. Çok fazla şey almak istiyorsun ama para sınırlı.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'İstediğim her şeyi almalıyım',
          isCorrect: false,
          feedback: 'Para sınırlı olduğunda öncelik belirlemek önemli.',
        },
        {
          text: 'Önce ihtiyaçları almalı, sonra para kalırsa isteklerimi almalıyım',
          isCorrect: true,
          feedback: 'Doğru! Önce ihtiyaçlar, sonra istekler gelir.',
        },
        {
          text: 'Hiçbir şey almamalıyım',
          isCorrect: false,
          feedback: 'İhtiyaçları karşılamak gerekli.',
        },
      ],
    },
  ],
  3: [
    {
      title: 'Oyuncak Mı Kitap Mı?',
      icon: '🎮',
      scenario:
        'Kumbarandaki para ile ya oyuncak ya da kitap alabilirsin. İkisini birden alamazsın.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Hemen oyuncak almalıyım',
          isCorrect: false,
          feedback: 'Acele karar vermek yerine düşünmelisin.',
        },
        {
          text: 'Hangisine daha çok ihtiyacım var düşünmeli ve ona göre karar vermeliyim',
          isCorrect: true,
          feedback: 'Doğru! Bilinçli karar vermek önemli.',
        },
        {
          text: 'İkisini de almalıyım',
          isCorrect: false,
          feedback: 'Paran yetmiyor, seçim yapmalısın.',
        },
      ],
    },
  ],
  4: [
    {
      title: 'Harçlık Planı',
      icon: '💰',
      scenario: 'Haftalık 50₺ harçlık alıyorsun. Arkadaşların her gün kantinden bir şeyler alıyor.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Ben de her gün kantinden almalıyım',
          isCorrect: false,
          feedback: 'Her gün harcamak paranı hızla bitirir.',
        },
        {
          text: 'Harçlığımı planlayarak harcamalı, bir kısmını biriktirmeliyim',
          isCorrect: true,
          feedback: 'Doğru! Planlı harcamak ve biriktirmek önemli.',
        },
        {
          text: 'Hiç harcamamalıyım',
          isCorrect: false,
          feedback: 'Dengeli harcamak önemli, hiç harcamamak da doğru değil.',
        },
      ],
    },
  ],
  5: [
    {
      title: 'İndirim Fırsatı',
      icon: '🏷️',
      scenario:
        'İstediğin bisiklet %50 indirimde. Ama kumbarandaki para yetmiyor, biraz daha biriktirmen gerekiyor.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'İndirimi kaçırmamalıyım, ailemden borç almalıyım',
          isCorrect: false,
          feedback: 'Borç almak yerine sabırlı olmalısın.',
        },
        {
          text: 'Sabırla biriktirmeye devam etmeli, başka indirim fırsatlarını takip etmeliyim',
          isCorrect: true,
          feedback: 'Doğru! Sabır ve planlama önemli.',
        },
        { text: 'Vazgeçmeliyim', isCorrect: false, feedback: 'Vazgeçmek yerine plan yapmalısın.' },
      ],
    },
  ],
  6: [
    {
      title: 'Banka Hesabı',
      icon: '🏦',
      scenario: 'Kumbarandaki para çok oldu. Baban sana banka hesabı açmayı öneriyor.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Kumbaramda tutmalıyım',
          isCorrect: false,
          feedback: 'Çok para olunca banka daha güvenli.',
        },
        {
          text: 'Banka hesabı açmalı, faiz kazanmalıyım',
          isCorrect: true,
          feedback: 'Doğru! Bankada para hem güvende hem de faiz kazanır.',
        },
        {
          text: 'Hepsini harcamalıyım',
          isCorrect: false,
          feedback: 'Biriktirdiğin parayı harcamak yerine değerlendirmelisin.',
        },
      ],
    },
  ],
  7: [
    {
      title: 'Yatırım Kararı',
      icon: '📈',
      scenario:
        'Biriktirdiğin 1000₺ var. Ablan sana altın almayı öneriyor, arkadaşın ise hisse senedi.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Hemen karar vermeliyim',
          isCorrect: false,
          feedback: 'Yatırım kararları acele verilmemeli.',
        },
        {
          text: 'Her iki seçeneği de araştırmalı, ailemle konuşmalı ve bilinçli karar vermeliyim',
          isCorrect: true,
          feedback: 'Doğru! Yatırım yapmadan önce araştırma ve danışma önemli.',
        },
        {
          text: 'Hepsini harcamalıyım',
          isCorrect: false,
          feedback: 'Biriktirdiğin parayı değerlendirmek daha akıllıca.',
        },
      ],
    },
  ],
  8: [
    {
      title: 'Kredi Kartı Teklifi',
      icon: '💳',
      scenario:
        '18 yaşına geldin. Banka sana kredi kartı teklif ediyor. Arkadaşların "Çok rahat, istediğini al" diyor.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Hemen almalı ve istediğim her şeyi almalıyım',
          isCorrect: false,
          feedback: 'Kredi kartı borçtur, dikkatli kullanılmalı.',
        },
        {
          text: 'Kredi kartının avantaj ve dezavantajlarını öğrenmeli, gerçekten ihtiyacım varsa sorumlu kullanmalıyım',
          isCorrect: true,
          feedback: 'Doğru! Kredi kartı sorumlu kullanılmalı, borç tuzağına düşmemelisin.',
        },
        {
          text: 'Kesinlikle almamalıyım',
          isCorrect: false,
          feedback: 'Kredi kartı doğru kullanılırsa faydalı olabilir.',
        },
      ],
    },
  ],
};

export default function FinancialScenarios({ gradeLevel, onExit }: FinancialScenariosProps) {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  const allScenarios = Object.entries(scenariosByGrade).flatMap(([grade, scenarios]) =>
    scenarios.map((scenario, index) => ({
      ...scenario,
      grade: parseInt(grade),
      id: `${grade}-${index}`,
    }))
  );

  const handleAnswerSelect = (index: number) => {
    if (showFeedback || selectedScenario === null) return;

    const scenario = allScenarios[selectedScenario];
    setSelectedAnswer(index);
    setShowFeedback(true);

    if (scenario.options[index].isCorrect) {
      setScore(score + 10);
      if (!completedScenarios.includes(selectedScenario)) {
        setCompletedScenarios([...completedScenarios, selectedScenario]);
      }
    }
  };

  const handleBack = () => {
    setSelectedScenario(null);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  if (selectedScenario !== null) {
    const scenario = allScenarios[selectedScenario];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4">
        <div className="w-full max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
          >
            ⬅ Senaryolara Dön
          </button>

          <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-green-500/30">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4">{scenario.icon}</div>
              <h2 className="text-3xl font-black text-white mb-2">{scenario.title}</h2>
              <span className="inline-block bg-green-500/20 px-4 py-2 rounded-full text-green-300 font-bold text-sm">
                Seviye {scenario.grade}
              </span>
            </div>

            <div className="bg-gradient-to-r from-emerald-600/20 to-green-600/20 p-6 rounded-2xl mb-6 border border-emerald-500/30">
              <h3 className="font-black text-xl mb-3 text-white">📋 Durum:</h3>
              <p className="text-lg leading-relaxed text-white/90">{scenario.scenario}</p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl mb-6">
              <h3 className="font-black text-2xl text-emerald-400">❓ {scenario.question}</h3>
            </div>

            <div className="space-y-4 mb-6">
              {scenario.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = option.isCorrect;
                const showResult = showFeedback && isSelected;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-xl text-left transition-all font-bold text-lg ${
                      showResult
                        ? isCorrect
                          ? 'bg-green-500 border-2 border-green-300 text-white'
                          : 'bg-red-500 border-2 border-red-300 text-white'
                        : showFeedback && isCorrect
                          ? 'bg-green-500/50 border-2 border-green-300 text-white'
                          : 'bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>

            {showFeedback && selectedAnswer !== null && (
              <div
                className={`p-6 rounded-2xl mb-6 ${
                  scenario.options[selectedAnswer].isCorrect
                    ? 'bg-green-500/20 border border-green-500/50'
                    : 'bg-red-500/20 border border-red-500/50'
                }`}
              >
                <p className="text-white font-bold text-lg">
                  {scenario.options[selectedAnswer].feedback}
                </p>
              </div>
            )}

            <div className="text-center">
              <div className="inline-block bg-emerald-500/20 px-6 py-3 rounded-full">
                <span className="text-emerald-300 font-black text-xl">Puan: {score}</span>
              </div>
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
            Senaryo Simülasyonları
          </h2>
          <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
            Gerçek hayat durumlarında doğru kararları ver!
          </p>

          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
              <span className="text-green-300 font-bold">Puan: {score}</span>
            </div>
            <div className="bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/30">
              <span className="text-emerald-300 font-bold">
                Tamamlanan: {completedScenarios.length}/{allScenarios.length}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
          {allScenarios.map((scenario, index) => {
            const isCompleted = completedScenarios.includes(index);

            return (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(index)}
                className="bg-gradient-to-br from-green-600/50 to-emerald-700/50 backdrop-blur-xl rounded-3xl p-6 border-2 border-green-500/30 hover:border-green-400/60 transition-all transform hover:scale-105 text-left relative overflow-hidden group"
              >
                {isCompleted && (
                  <div className="absolute top-4 right-4 bg-green-500 rounded-full p-2">
                    <span className="text-white text-xl">✓</span>
                  </div>
                )}

                <div className="text-6xl mb-4 text-center">{scenario.icon}</div>
                <h3 className="text-2xl font-black text-white mb-3 text-center">
                  {scenario.title}
                </h3>
                <p className="text-white/70 text-sm mb-4 line-clamp-2">{scenario.scenario}</p>

                <div className="flex items-center justify-between">
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-bold">
                    Seviye {scenario.grade}
                  </span>
                  <span className="text-white/50 group-hover:text-white transition-colors">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
