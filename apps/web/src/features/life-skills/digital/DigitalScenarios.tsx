import React, { useState } from 'react';

interface DigitalScenariosProps {
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
      title: 'Bilinmeyen Link',
      icon: '🔗',
      scenario: 'Oyun oynarken ekrana "Tıkla ve hediye kazan!" yazan bir link çıktı.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Hemen tıklamalıyım',
          isCorrect: false,
          feedback: 'Bilinmeyen linklere tıklamak tehlikelidir.',
        },
        {
          text: 'Yetişkine göstermeliyim',
          isCorrect: true,
          feedback: 'Doğru! Şüpheli durumlarda mutlaka yetişkine danış.',
        },
        {
          text: 'Arkadaşıma göstermeliyim',
          isCorrect: false,
          feedback: 'Yetişkin yardımı gerekli.',
        },
      ],
    },
  ],
  2: [
    {
      title: 'Uzun Ekran Süresi',
      icon: '⏰',
      scenario: '3 saattir tablet başındasın. Gözlerin yoruldu ama oyunu bitirmek istiyorsun.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Oyunu bitirmeliyim',
          isCorrect: false,
          feedback: 'Uzun ekran süresi sağlığa zararlıdır.',
        },
        {
          text: 'Ara vermeli ve dinlenmeliyim',
          isCorrect: true,
          feedback: 'Doğru! Gözlerini dinlendirmek önemli.',
        },
        { text: 'Daha hızlı oynamalıyım', isCorrect: false, feedback: 'Bu sorunu çözmez.' },
      ],
    },
  ],
  3: [
    {
      title: 'Şifre İsteği',
      icon: '🔑',
      scenario: 'En iyi arkadaşın oyun hesabına girmek için şifreni istiyor.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Şifremi vermeliyim',
          isCorrect: false,
          feedback: 'Şifreni kimseyle paylaşmamalısın.',
        },
        {
          text: 'Şifremi vermemeli, açıklama yapmalıyım',
          isCorrect: true,
          feedback: 'Doğru! Şifreler kişiseldir, en yakın arkadaşınla bile paylaşma.',
        },
        {
          text: 'Başka bir şifre uydurup vermeliyim',
          isCorrect: false,
          feedback: 'Dürüst olmalısın.',
        },
      ],
    },
  ],
  4: [
    {
      title: 'Bilinmeyen Mesaj',
      icon: '💬',
      scenario: 'Tanımadığın biri sana mesaj attı ve "Seni tanıyorum, konuşalım mı?" diyor.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Cevap vermeliyim',
          isCorrect: false,
          feedback: 'Bilinmeyen kişilerle konuşmak tehlikelidir.',
        },
        {
          text: 'Mesajı görmezden gelmeli ve yetişkine söylemeliyim',
          isCorrect: true,
          feedback: 'Doğru! Bilinmeyen kişilerden gelen mesajları yetişkine göster.',
        },
        {
          text: 'Arkadaşlarıma göstermeliyim',
          isCorrect: false,
          feedback: 'Önce yetişkine göstermelisin.',
        },
      ],
    },
  ],
  5: [
    {
      title: 'Siber Zorbalık',
      icon: '🚫',
      scenario: 'Sınıf grubunda bir arkadaşına kötü mesajlar yazılıyor ve dalga geçiliyor.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Karışmamalıyım',
          isCorrect: false,
          feedback: 'Sessiz kalmak zorbalığı destekler.',
        },
        {
          text: 'Arkadaşımı savunmalı ve yetişkine haber vermeliyim',
          isCorrect: true,
          feedback: 'Doğru! Siber zorbalığa karşı dur ve yardım iste.',
        },
        {
          text: 'Ben de dalga geçmeliyim',
          isCorrect: false,
          feedback: 'Bu zorbalığa katılmak olur.',
        },
      ],
    },
  ],
  6: [
    {
      title: 'Konum Paylaşımı',
      icon: '📍',
      scenario:
        'Tatildeyken çektiğin fotoğrafı sosyal medyada paylaşmak istiyorsun. Konum bilgisi de eklenmiş.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Konum bilgisiyle paylaşmalıyım',
          isCorrect: false,
          feedback: 'Konum paylaşmak güvenlik riski oluşturur.',
        },
        {
          text: 'Konum bilgisini kaldırıp sonra paylaşmalıyım',
          isCorrect: true,
          feedback: 'Doğru! Konum bilgini paylaşma, güvenliğin için önemli.',
        },
        {
          text: 'Hiç paylaşmamalıyım',
          isCorrect: false,
          feedback: 'Konum bilgisini kaldırırsan paylaşabilirsin.',
        },
      ],
    },
  ],
  7: [
    {
      title: 'Yanlış Bilgi',
      icon: '❌',
      scenario:
        'Sosyal medyada çok şaşırtıcı bir haber gördün. Arkadaşların paylaşıyor ama kaynak belirsiz.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Hemen paylaşmalıyım',
          isCorrect: false,
          feedback: 'Doğruluğunu kontrol etmeden paylaşmak yanlış bilgi yayar.',
        },
        {
          text: 'Kaynağını araştırmalı, doğruluğunu kontrol etmeliyim',
          isCorrect: true,
          feedback: 'Doğru! Paylaşmadan önce bilginin doğruluğunu kontrol et.',
        },
        {
          text: 'Arkadaşlarım paylaşıyorsa doğrudur',
          isCorrect: false,
          feedback: 'Herkes yanlış bilgi paylaşabilir.',
        },
      ],
    },
  ],
  8: [
    {
      title: 'Dijital Bağımlılık',
      icon: '📱',
      scenario:
        'Telefonunu sürekli kontrol ediyorsun, arkadaşlarınla birlikteyken bile. Gerçek hayattan koptuğunu hissediyorsun.',
      question: 'Ne yapmalısın?',
      options: [
        {
          text: 'Devam etmeliyim, sorun yok',
          isCorrect: false,
          feedback: 'Dijital bağımlılık ciddi bir sorundur.',
        },
        {
          text: 'Dijital detoks yapmalı, telefon kullanımımı sınırlamalıyım',
          isCorrect: true,
          feedback: 'Doğru! Dengeli bir dijital yaşam için ara ver ve gerçek hayata odaklan.',
        },
        {
          text: 'Daha fazla uygulama indirmeliyim',
          isCorrect: false,
          feedback: 'Bu sorunu daha kötü yapar.',
        },
      ],
    },
  ],
};

export default function DigitalScenarios({ gradeLevel, onExit }: DigitalScenariosProps) {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="w-full max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
          >
            ⬅ Senaryolara Dön
          </button>

          <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-purple-500/30">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4">{scenario.icon}</div>
              <h2 className="text-3xl font-black text-white mb-2">{scenario.title}</h2>
              <span className="inline-block bg-purple-500/20 px-4 py-2 rounded-full text-purple-300 font-bold text-sm">
                Seviye {scenario.grade}
              </span>
            </div>

            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-6 rounded-2xl mb-6 border border-indigo-500/30">
              <h3 className="font-black text-xl mb-3 text-white">📋 Durum:</h3>
              <p className="text-lg leading-relaxed text-white/90">{scenario.scenario}</p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl mb-6">
              <h3 className="font-black text-2xl text-indigo-400">❓ {scenario.question}</h3>
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
              <div className="inline-block bg-indigo-500/20 px-6 py-3 rounded-full">
                <span className="text-indigo-300 font-black text-xl">Puan: {score}</span>
              </div>
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
            Senaryo Simülasyonları
          </h2>
          <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
            Gerçek hayat durumlarında doğru kararları ver!
          </p>

          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
              <span className="text-green-300 font-bold">Puan: {score}</span>
            </div>
            <div className="bg-purple-500/20 px-4 py-2 rounded-full border border-purple-500/30">
              <span className="text-purple-300 font-bold">
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
                className="bg-gradient-to-br from-purple-600/50 to-indigo-700/50 backdrop-blur-xl rounded-3xl p-6 border-2 border-purple-500/30 hover:border-purple-400/60 transition-all transform hover:scale-105 text-left relative overflow-hidden group"
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
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-bold">
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
