import React, { useState } from 'react';

interface NutritionScenariosProps {
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
      title: 'Kahvaltı Seçimi',
      icon: '🥣',
      scenario:
        'Sabah okula gitmeden önce kahvaltı yapacaksın. Masada süt, meyve, ekmek ve çikolata var.',
      question: 'Sağlıklı bir kahvaltı için ne seçmelisin?',
      options: [
        {
          text: 'Sadece çikolata yemeliyim',
          isCorrect: false,
          feedback: 'Çikolata tek başına sağlıklı bir kahvaltı değil.',
        },
        {
          text: 'Süt, meyve ve ekmek yemeliyim',
          isCorrect: true,
          feedback: 'Doğru! Dengeli bir kahvaltı enerji verir.',
        },
        { text: 'Hiçbir şey yememeliyim', isCorrect: false, feedback: 'Kahvaltı atlanmamalı.' },
      ],
    },
  ],
  2: [
    {
      title: 'Kantinde Seçim',
      icon: '🏫',
      scenario:
        'Teneffüste kantinden bir şeyler almak istiyorsun. Cips, meyve suyu, süt ve meyve var.',
      question: 'En sağlıklı seçim hangisi?',
      options: [
        { text: 'Cips almalıyım', isCorrect: false, feedback: 'Cips sağlıksız bir atıştırmalık.' },
        {
          text: 'Meyve ve süt almalıyım',
          isCorrect: true,
          feedback: 'Doğru! Meyve ve süt sağlıklı seçimler.',
        },
        {
          text: 'Sadece meyve suyu almalıyım',
          isCorrect: false,
          feedback: 'Taze meyve daha sağlıklı.',
        },
      ],
    },
  ],
  3: [
    {
      title: 'Akşam Yemeği',
      icon: '🍽️',
      scenario: 'Akşam yemeğinde annen sebze yemeği yaptı ama sen hamburger istiyorsun.',
      question: 'Ne yapmalısın?',
      options: [
        { text: 'Hiçbir şey yememeliyim', isCorrect: false, feedback: 'Öğün atlamak sağlıksız.' },
        {
          text: 'Sebze yemeğini yemeli, bazen hamburger yiyebilirim',
          isCorrect: true,
          feedback: 'Doğru! Dengeli beslenme önemli.',
        },
        {
          text: 'Her gün hamburger yemeliyim',
          isCorrect: false,
          feedback: 'Fast food her gün yenmemeli.',
        },
      ],
    },
  ],
  4: [
    {
      title: 'Spor Öncesi Beslenme',
      icon: '⚽',
      scenario: 'Futbol maçından 1 saat öncesin. Ne yemelisin?',
      question: 'En iyi seçim hangisi?',
      options: [
        {
          text: 'Ağır bir yemek yemeliyim',
          isCorrect: false,
          feedback: 'Ağır yemek spor performansını düşürür.',
        },
        {
          text: 'Muz veya hafif sandviç yemeliyim',
          isCorrect: true,
          feedback: 'Doğru! Hafif karbonhidrat enerji verir.',
        },
        {
          text: 'Hiçbir şey yememeliyim',
          isCorrect: false,
          feedback: 'Spor öncesi enerji gerekir.',
        },
      ],
    },
  ],
  5: [
    {
      title: 'Su İçme Alışkanlığı',
      icon: '💧',
      scenario: 'Gün boyunca çok az su içiyorsun ve başın ağrıyor.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Gazlı içecek içmeliyim',
          isCorrect: false,
          feedback: 'Gazlı içecekler su yerine geçmez.',
        },
        {
          text: 'Düzenli su içme alışkanlığı edinmeliyim',
          isCorrect: true,
          feedback: 'Doğru! Günde 6-8 bardak su içmek önemli.',
        },
        {
          text: 'Sadece aç olunca su içmeliyim',
          isCorrect: false,
          feedback: 'Düzenli su içmek gerekir.',
        },
      ],
    },
  ],
  6: [
    {
      title: 'Kilo Kontrolü',
      icon: '⚖️',
      scenario: 'Arkadaşların diyet yapıyor ve öğün atlıyor. Sen de kilo vermek istiyorsun.',
      question: 'Ne yapmalısın?',
      options: [
        { text: 'Ben de öğün atlamalıyım', isCorrect: false, feedback: 'Öğün atlamak sağlıksız.' },
        {
          text: 'Dengeli beslenip düzenli egzersiz yapmalıyım',
          isCorrect: true,
          feedback: 'Doğru! Sağlıklı kilo kontrolü dengeli beslenme ve egzersizle olur.',
        },
        { text: 'Hiçbir şey yememeliyim', isCorrect: false, feedback: 'Aç kalmak tehlikeli.' },
      ],
    },
  ],
  7: [
    {
      title: 'Enerji İçeceği',
      icon: '⚡',
      scenario: 'Sınav haftası ve arkadaşların enerji içeceği içiyor. Sana da önerdiler.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Ben de içmeliyim',
          isCorrect: false,
          feedback: 'Enerji içecekleri sağlıksız ve zararlı.',
        },
        {
          text: 'Yeterli uyku, dengeli beslenme ve su içmeliyim',
          isCorrect: true,
          feedback: 'Doğru! Doğal yollarla enerji sağlamak daha sağlıklı.',
        },
        { text: 'Çok fazla kahve içmeliyim', isCorrect: false, feedback: 'Aşırı kafein zararlı.' },
      ],
    },
  ],
  8: [
    {
      title: 'Vejetaryen Diyet',
      icon: '🥗',
      scenario: 'Vejetaryen olmayı düşünüyorsun ama protein ihtiyacın konusunda endişelisin.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Hemen başlamalıyım',
          isCorrect: false,
          feedback: 'Plansız başlamak eksikliklere neden olur.',
        },
        {
          text: 'Araştırma yapmalı, diyetisyene danışmalı ve dengeli plan yapmalıyım',
          isCorrect: true,
          feedback: 'Doğru! Bilinçli ve planlı geçiş önemli.',
        },
        {
          text: 'Sadece sebze yemeliyim',
          isCorrect: false,
          feedback: 'Protein kaynakları da gerekli.',
        },
      ],
    },
  ],
};

export default function NutritionScenarios({ gradeLevel, onExit }: NutritionScenariosProps) {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-lime-900 to-slate-900 p-4">
        <div className="w-full max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
          >
            ⬅ Senaryolara Dön
          </button>

          <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-lime-500/30">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4">{scenario.icon}</div>
              <h2 className="text-3xl font-black text-white mb-2">{scenario.title}</h2>
              <span className="inline-block bg-lime-500/20 px-4 py-2 rounded-full text-lime-300 font-bold text-sm">
                Seviye {scenario.grade}
              </span>
            </div>

            <div className="bg-gradient-to-r from-green-600/20 to-lime-600/20 p-6 rounded-2xl mb-6 border border-green-500/30">
              <h3 className="font-black text-xl mb-3 text-white">📋 Durum:</h3>
              <p className="text-lg leading-relaxed text-white/90">{scenario.scenario}</p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl mb-6">
              <h3 className="font-black text-2xl text-lime-400">❓ {scenario.question}</h3>
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
              <div className="inline-block bg-lime-500/20 px-6 py-3 rounded-full">
                <span className="text-lime-300 font-black text-xl">Puan: {score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-lime-900 to-slate-900 p-4">
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
            <div className="bg-lime-500/20 px-4 py-2 rounded-full border border-lime-500/30">
              <span className="text-lime-300 font-bold">Puan: {score}</span>
            </div>
            <div className="bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
              <span className="text-green-300 font-bold">
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
                className="bg-gradient-to-br from-lime-600/50 to-green-700/50 backdrop-blur-xl rounded-3xl p-6 border-2 border-lime-500/30 hover:border-lime-400/60 transition-all transform hover:scale-105 text-left relative overflow-hidden group"
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
                  <span className="bg-lime-500/20 text-lime-300 px-3 py-1 rounded-full text-xs font-bold">
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
