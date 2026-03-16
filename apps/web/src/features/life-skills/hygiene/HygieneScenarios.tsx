import React, { useState } from 'react';

interface HygieneScenariosProps {
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
      title: 'El Yıkama Zamanı',
      icon: '🧼',
      scenario: 'Tuvaletten çıktın. Ellerini yıkamadan yemek masasına oturmak istiyorsun.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Hemen yemek yemeliyim',
          isCorrect: false,
          feedback: 'Tuvaletten sonra el yıkamak çok önemli!',
        },
        {
          text: 'Ellerimi yıkamalıyım',
          isCorrect: true,
          feedback: 'Doğru! Tuvaletten sonra mutlaka el yıka.',
        },
        {
          text: 'Sadece suyla çalkalamalıyım',
          isCorrect: false,
          feedback: 'Sabun kullanmak gerekli.',
        },
      ],
    },
  ],
  2: [
    {
      title: 'Banyo Günü',
      icon: '🛁',
      scenario: 'Bir haftadır banyo yapmadın. Arkadaşların seninle oynamak istemiyor.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Umursamamalıyım',
          isCorrect: false,
          feedback: 'Temizlik sosyal ilişkiler için önemli.',
        },
        {
          text: 'Hemen banyo yapmalıyım',
          isCorrect: true,
          feedback: 'Doğru! Düzenli banyo çok önemli.',
        },
        { text: 'Parfüm sıkmalıyım', isCorrect: false, feedback: 'Parfüm banyo yerine geçmez.' },
      ],
    },
  ],
  3: [
    {
      title: 'Hasta Arkadaş',
      icon: '🤧',
      scenario: 'Arkadaşın grip olmuş, hapşırıyor. Seninle oyuncağını paylaşmak istiyor.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Hemen almalıyım',
          isCorrect: false,
          feedback: 'Hasta kişilerden uzak durmalısın.',
        },
        {
          text: 'Kibarca reddetmeli, iyileşince oynamalıyım',
          isCorrect: true,
          feedback: 'Doğru! Hastalık bulaşabilir.',
        },
        { text: 'Alıp yüzüme sürtmeliyim', isCorrect: false, feedback: 'Bu çok tehlikeli!' },
      ],
    },
  ],
  4: [
    {
      title: 'Bozuk Yemek',
      icon: '🍎',
      scenario: 'Buzdolabında bir haftalık yemek var. Acıktın ama yemek kokuyor.',
      question: 'Ne yapmalısın?',
      options: [
        { text: 'Yine de yemeliyim', isCorrect: false, feedback: 'Bozuk yemek hastalandırır!' },
        {
          text: 'Yememeli, taze yemek yapmalıyım',
          isCorrect: true,
          feedback: 'Doğru! Bozuk yemek yeme.',
        },
        {
          text: 'Kokusunu almadan yemeliyim',
          isCorrect: false,
          feedback: 'Bozuk yemek her zaman zararlıdır.',
        },
      ],
    },
  ],
  5: [
    {
      title: 'Spor Sonrası',
      icon: '⚽',
      scenario: 'Futbol oynadın, çok terledin. Arkadaşların sinemaya gitmek istiyor.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Hemen gitmeliyim',
          isCorrect: false,
          feedback: 'Terli kıyafetle gitmek hijyenik değil.',
        },
        {
          text: 'Duş alıp temiz kıyafet giymeliyim',
          isCorrect: true,
          feedback: 'Doğru! Spordan sonra temizlik önemli.',
        },
        { text: 'Sadece parfüm sıkmalıyım', isCorrect: false, feedback: 'Duş almak gerekli.' },
      ],
    },
  ],
  6: [
    {
      title: 'Diş Ağrısı',
      icon: '🦷',
      scenario: 'Dişin ağrıyor ama diş hekiminden korkuyorsun.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Görmezden gelmeliyim',
          isCorrect: false,
          feedback: 'Diş ağrısı ciddiye alınmalı.',
        },
        {
          text: 'Diş hekimine gitmeliyim',
          isCorrect: true,
          feedback: 'Doğru! Erken tedavi önemli.',
        },
        {
          text: 'Sadece ağrı kesici almalıyım',
          isCorrect: false,
          feedback: 'Tedavi gerekli, ağrı kesici geçici çözüm.',
        },
      ],
    },
  ],
  7: [
    {
      title: 'Akne Problemi',
      icon: '🧴',
      scenario: 'Yüzünde sivilceler çıktı. Arkadaşların dalga geçiyor.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Sivilceleri sıkmalıyım',
          isCorrect: false,
          feedback: 'Sivilce sıkmak iz bırakır!',
        },
        {
          text: 'Yüzümü düzenli temizlemeli, gerekirse dermatoloğa gitmeliyim',
          isCorrect: true,
          feedback: 'Doğru! Düzenli temizlik ve profesyonel yardım önemli.',
        },
        {
          text: 'Makyajla kapatmalıyım',
          isCorrect: false,
          feedback: 'Makyaj sorunu çözmez, daha kötü yapabilir.',
        },
      ],
    },
  ],
  8: [
    {
      title: 'Sağlık Kontrolü',
      icon: '🩺',
      scenario: 'Bir yıldır doktora gitmedin. Kendini iyi hissediyorsun.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Hasta olmadığım için gitmem',
          isCorrect: false,
          feedback: 'Düzenli kontrol önleyici sağlık için önemli.',
        },
        {
          text: 'Düzenli sağlık kontrolü yaptırmalıyım',
          isCorrect: true,
          feedback: 'Doğru! Erken teşhis hayat kurtarır.',
        },
        {
          text: 'Sadece hasta olunca giderim',
          isCorrect: false,
          feedback: 'Önleyici sağlık daha önemli.',
        },
      ],
    },
  ],
};

export default function HygieneScenarios({ gradeLevel, onExit }: HygieneScenariosProps) {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
        <div className="w-full max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
          >
            ⬅ Senaryolara Dön
          </button>

          <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-blue-500/30">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4">{scenario.icon}</div>
              <h2 className="text-3xl font-black text-white mb-2">{scenario.title}</h2>
              <span className="inline-block bg-blue-500/20 px-4 py-2 rounded-full text-blue-300 font-bold text-sm">
                Seviye {scenario.grade}
              </span>
            </div>

            <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-6 rounded-2xl mb-6 border border-cyan-500/30">
              <h3 className="font-black text-xl mb-3 text-white">📋 Durum:</h3>
              <p className="text-lg leading-relaxed text-white/90">{scenario.scenario}</p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl mb-6">
              <h3 className="font-black text-2xl text-cyan-400">❓ {scenario.question}</h3>
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
              <div className="inline-block bg-cyan-500/20 px-6 py-3 rounded-full">
                <span className="text-cyan-300 font-black text-xl">Puan: {score}</span>
              </div>
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
            Senaryo Simülasyonları
          </h2>
          <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
            Gerçek hayat durumlarında doğru kararları ver!
          </p>

          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
              <span className="text-green-300 font-bold">Puan: {score}</span>
            </div>
            <div className="bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30">
              <span className="text-blue-300 font-bold">
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
                className="bg-gradient-to-br from-blue-600/50 to-cyan-700/50 backdrop-blur-xl rounded-3xl p-6 border-2 border-blue-500/30 hover:border-blue-400/60 transition-all transform hover:scale-105 text-left relative overflow-hidden group"
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
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold">
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
