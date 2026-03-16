import React, { useState } from 'react';

interface EnvironmentScenariosProps {
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
      title: 'Çöp Kutusu',
      icon: '🗑️',
      scenario: 'Parkta oynarken elindeki kağıt çöp oldu. Çöp kutusu biraz uzakta.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Yere atmalıyım',
          isCorrect: false,
          feedback: 'Çöpleri yere atmak çevreyi kirletir.',
        },
        {
          text: 'Çöp kutusuna kadar gitmeli ve oraya atmalıyım',
          isCorrect: true,
          feedback: 'Doğru! Çöpleri her zaman çöp kutusuna atmalıyız.',
        },
        {
          text: 'Ağacın altına bırakmalıyım',
          isCorrect: false,
          feedback: 'Bu da çevreyi kirletir.',
        },
      ],
    },
  ],
  2: [
    {
      title: 'Su Tasarrufu',
      icon: '💧',
      scenario: 'Dişlerini fırçalarken musluk açık kaldı. Annen su israfı olduğunu söyledi.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Musluğu açık bırakmalıyım',
          isCorrect: false,
          feedback: 'Su israfı çevreye zarar verir.',
        },
        {
          text: 'Dişlerimi fırçalarken musluğu kapatmalıyım',
          isCorrect: true,
          feedback: 'Doğru! Su tasarrufu yapmak çok önemli.',
        },
        {
          text: 'Hızlıca fırçalamalıyım',
          isCorrect: false,
          feedback: 'Musluğu kapatmak daha doğru.',
        },
      ],
    },
  ],
  3: [
    {
      title: 'Geri Dönüşüm',
      icon: '♻️',
      scenario: 'Evde plastik şişeler, cam kavanozlar ve kağıtlar birikti.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Hepsini aynı çöp kutusuna atmalıyım',
          isCorrect: false,
          feedback: 'Geri dönüşüm için ayırmalıyız.',
        },
        {
          text: 'Plastik, cam ve kağıtları ayırarak geri dönüşüm kutularına atmalıyım',
          isCorrect: true,
          feedback: 'Doğru! Geri dönüşüm çevreyi korur.',
        },
        { text: 'Bahçeye atmalıyım', isCorrect: false, feedback: 'Bu çevreyi kirletir.' },
      ],
    },
  ],
  4: [
    {
      title: 'Enerji Tasarrufu',
      icon: '💡',
      scenario: 'Odandan çıkarken ışıklar açık kaldı. Kimse odada yok.',
      question: 'Ne yapmalısın?',
      options: [
        { text: 'Açık bırakmalıyım', isCorrect: false, feedback: 'Enerji israfı olur.' },
        {
          text: 'Geri dönüp ışıkları kapatmalıyım',
          isCorrect: true,
          feedback: 'Doğru! Enerji tasarrufu çevreyi korur.',
        },
        {
          text: 'Başkası kapatır',
          isCorrect: false,
          feedback: 'Herkes kendi sorumluluğunu almalı.',
        },
      ],
    },
  ],
  5: [
    {
      title: 'Hayvan Hakları',
      icon: '🐕',
      scenario: 'Sokakta aç ve susuz bir köpek gördün.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Görmezden gelmeliyim',
          isCorrect: false,
          feedback: 'Hayvanlara yardım etmek önemli.',
        },
        {
          text: 'Su ve yemek vermeliyim, gerekirse yetişkinlerden yardım istemeliyim',
          isCorrect: true,
          feedback: 'Doğru! Hayvanlara şefkatle davranmalıyız.',
        },
        { text: 'Korkutmalıyım', isCorrect: false, feedback: 'Hayvanlara zarar vermek yanlış.' },
      ],
    },
  ],
  6: [
    {
      title: 'Plastik Kullanımı',
      icon: '🛍️',
      scenario: 'Markete gidiyorsun. Poşet almak için para istiyorlar.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Plastik poşet almalıyım',
          isCorrect: false,
          feedback: 'Plastik çevreye zarar verir.',
        },
        {
          text: 'Bez çanta kullanmalıyım',
          isCorrect: true,
          feedback: 'Doğru! Bez çanta çevre dostu bir seçim.',
        },
        {
          text: 'Çok poşet almalıyım',
          isCorrect: false,
          feedback: 'Plastik kullanımını azaltmalıyız.',
        },
      ],
    },
  ],
  7: [
    {
      title: 'Gönüllülük',
      icon: '🤝',
      scenario: 'Okulda çevre temizliği için gönüllü aranıyor. Arkadaşların katılmıyor.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Ben de katılmamalıyım',
          isCorrect: false,
          feedback: 'Gönüllülük önemli bir sorumluluktur.',
        },
        {
          text: 'Gönüllü olmalı ve arkadaşlarımı da teşvik etmeliyim',
          isCorrect: true,
          feedback: 'Doğru! Topluma katkı sağlamak önemli.',
        },
        { text: 'Başkaları yapar', isCorrect: false, feedback: 'Herkes sorumluluk almalı.' },
      ],
    },
  ],
  8: [
    {
      title: 'İklim Değişikliği',
      icon: '🌍',
      scenario: 'Okula her gün arabayla gidiyorsun. Ama okul yürüme mesafesinde.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Arabayla gitmeye devam etmeliyim',
          isCorrect: false,
          feedback: 'Karbon ayak izini artırır.',
        },
        {
          text: 'Yürüyerek veya bisikletle gitmeliyim',
          isCorrect: true,
          feedback: 'Doğru! Sürdürülebilir ulaşım çevreyi korur.',
        },
        {
          text: 'Her gün farklı arabayla gitmeliyim',
          isCorrect: false,
          feedback: 'Bu daha fazla kirlilik yaratır.',
        },
      ],
    },
  ],
};

export default function EnvironmentScenarios({ gradeLevel, onExit }: EnvironmentScenariosProps) {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-4">
        <div className="w-full max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
          >
            ⬅ Senaryolara Dön
          </button>

          <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-teal-500/30">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4">{scenario.icon}</div>
              <h2 className="text-3xl font-black text-white mb-2">{scenario.title}</h2>
              <span className="inline-block bg-teal-500/20 px-4 py-2 rounded-full text-teal-300 font-bold text-sm">
                Seviye {scenario.grade}
              </span>
            </div>

            <div className="bg-gradient-to-r from-cyan-600/20 to-teal-600/20 p-6 rounded-2xl mb-6 border border-cyan-500/30">
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
            Senaryo Simülasyonları
          </h2>
          <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
            Gerçek hayat durumlarında doğru kararları ver!
          </p>

          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-teal-500/20 px-4 py-2 rounded-full border border-teal-500/30">
              <span className="text-teal-300 font-bold">Puan: {score}</span>
            </div>
            <div className="bg-cyan-500/20 px-4 py-2 rounded-full border border-cyan-500/30">
              <span className="text-cyan-300 font-bold">
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
                className="bg-gradient-to-br from-teal-600/50 to-cyan-700/50 backdrop-blur-xl rounded-3xl p-6 border-2 border-teal-500/30 hover:border-teal-400/60 transition-all transform hover:scale-105 text-left relative overflow-hidden group"
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
                  <span className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-bold">
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
