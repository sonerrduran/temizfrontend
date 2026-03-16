import { useState } from 'react';

interface TrafficScenariosProps {
  gradeLevel: number;
  onExit: () => void;
}

const scenariosByGrade: Record<number, Array<{
  title: string;
  scenario: string;
  question: string;
  icon: string;
  options: Array<{ text: string; isCorrect: boolean; feedback: string }>;
}>> = {
  1: [
    {
      title: 'Yaya Geçidinde',
      icon: '🚦',
      scenario: 'Okula giderken yaya geçidine geldin. Trafik ışığı kırmızı yanıyor.',
      question: 'Ne yapmalısın?',
      options: [
        { text: 'Hemen geçmeliyim', isCorrect: false, feedback: 'Kırmızı ışıkta geçmek tehlikelidir.' },
        { text: 'Yeşil ışık yanana kadar beklemeliyim', isCorrect: true, feedback: 'Doğru! Yeşil ışığı bekle ve sağa sola bak.' },
        { text: 'Koşarak geçmeliyim', isCorrect: false, feedback: 'Koşmak daha tehlikelidir.' }
      ]
    }
  ],
  2: [
    {
      title: 'Okul Servisi',
      icon: '🚌',
      scenario: 'Okul servisi durdu. Arkadaşların hızlıca binmeye başladı.',
      question: 'Sen ne yapmalısın?',
      options: [
        { text: 'Ben de koşarak binmeliyim', isCorrect: false, feedback: 'Koşmak tehlikelidir.' },
        { text: 'Sırayla ve yavaşça binmeliyim', isCorrect: true, feedback: 'Doğru! Güvenlik için sırayla ve yavaşça bin.' },
        { text: 'İterek öne geçmeliyim', isCorrect: false, feedback: 'İtmek kazaya neden olabilir.' }
      ]
    }
  ],
  3: [
    {
      title: 'Bisiklet Sürüşü',
      icon: '🚲',
      scenario: 'Bisikletinle parka gidiyorsun. Kaskını evde unuttun.',
      question: 'Ne yapmalısın?',
      options: [
        { text: 'Kasksız gidebilirim', isCorrect: false, feedback: 'Kask olmadan bisiklet sürmek tehlikelidir.' },
        { text: 'Geri dönüp kaskımı almalıyım', isCorrect: true, feedback: 'Doğru! Kask başını korur, mutlaka tak.' },
        { text: 'Yavaş gidersem sorun olmaz', isCorrect: false, feedback: 'Kask her zaman gereklidir.' }
      ]
    }
  ],
  4: [
    {
      title: 'Ambulans Geliyor',
      icon: '🚑',
      scenario: 'Yolda yürürken arkandan ambulans sireni duydun.',
      question: 'Ne yapmalısın?',
      options: [
        { text: 'Yolda durmalıyım', isCorrect: false, feedback: 'Yolda durmak ambulansı engelleyebilir.' },
        { text: 'Kenara çekilip yol vermeliyim', isCorrect: true, feedback: 'Doğru! Acil araçlara her zaman yol ver.' },
        { text: 'Koşarak kaçmalıyım', isCorrect: false, feedback: 'Panik yapmak tehlikelidir.' }
      ]
    }
  ],
  5: [
    {
      title: 'Kavşakta Karar',
      icon: '✖️',
      scenario: 'Bisikletinle kavşağa geldin. Sağdan bir araba geliyor.',
      question: 'Ne yapmalısın?',
      options: [
        { text: 'Hızlıca geçmeliyim', isCorrect: false, feedback: 'Sağdan gelen önceliklidir.' },
        { text: 'Arabaya yol vermeli ve beklemeliyim', isCorrect: true, feedback: 'Doğru! Sağdan gelen araç önceliklidir.' },
        { text: 'Korna çalmalıyım', isCorrect: false, feedback: 'Öncelik kurallarına uymalısın.' }
      ]
    }
  ],
  6: [
    {
      title: 'Yağmurlu Hava',
      icon: '🌧️',
      scenario: 'Yağmur yağıyor ve yollar ıslak. Bisikletinle eve dönüyorsun.',
      question: 'Ne yapmalısın?',
      options: [
        { text: 'Normal hızda gitmeliyim', isCorrect: false, feedback: 'Islak yolda normal hız tehlikelidir.' },
        { text: 'Yavaşlamalı ve daha dikkatli olmalıyım', isCorrect: true, feedback: 'Doğru! Yağmurda yavaş git ve dikkatli ol.' },
        { text: 'Daha hızlı gitmeliyim', isCorrect: false, feedback: 'Hızlanmak çok tehlikelidir.' }
      ]
    }
  ],
  7: [
    {
      title: 'Agresif Sürücü',
      icon: '😤',
      scenario: 'Bisikletinle giderken bir araba çok yakından geçti ve korna çaldı.',
      question: 'Ne yapmalısın?',
      options: [
        { text: 'Kızıp bağırmalıyım', isCorrect: false, feedback: 'Öfke durumu daha kötü yapar.' },
        { text: 'Sakin kalmalı ve güvenli bir yere çekilmeliyim', isCorrect: true, feedback: 'Doğru! Sakin kal ve güvenliğini sağla.' },
        { text: 'Arabayı takip etmeliyim', isCorrect: false, feedback: 'Takip etmek tehlikelidir.' }
      ]
    }
  ],
  8: [
    {
      title: 'Trafik Kazası',
      icon: '🚨',
      scenario: 'Yolda bir trafik kazası gördün. İnsanlar yaralanmış görünüyor.',
      question: 'Ne yapmalısın?',
      options: [
        { text: 'Fotoğraf çekmeliyim', isCorrect: false, feedback: 'İlk önce yardım etmelisin.' },
        { text: '112\'yi aramalı ve güvenli bir yerden yardım etmeliyim', isCorrect: true, feedback: 'Doğru! Acil servisleri ara ve güvenliği sağla.' },
        { text: 'Oradan uzaklaşmalıyım', isCorrect: false, feedback: 'Yardım etmek önemlidir.' }
      ]
    }
  ]
};

export default function TrafficScenarios({ gradeLevel, onExit }: TrafficScenariosProps) {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  // Tüm sınıfların senaryolarını birleştir
  const allScenarios = Object.entries(scenariosByGrade).flatMap(([grade, scenarios]) => 
    scenarios.map((scenario, index) => ({ ...scenario, grade: parseInt(grade), id: `${grade}-${index}` }))
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

  // Senaryo detay sayfası
  if (selectedScenario !== null) {
    const scenario = allScenarios[selectedScenario];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-4">
        <div className="w-full max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
          >
            ⬅ Senaryolara Dön
          </button>

          <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-red-500/30 shadow-2xl">
            {/* Başlık */}
            <div className="text-center mb-8">
              <div className="text-7xl mb-4">{scenario.icon}</div>
              <h2 className="text-3xl font-black text-white mb-2">{scenario.title}</h2>
              <span className="inline-block bg-red-500/20 px-4 py-2 rounded-full text-red-300 font-bold text-sm">
                Seviye {scenario.grade}
              </span>
            </div>

            {/* Durum */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-2xl mb-6 border border-purple-500/30">
              <h3 className="font-black text-xl mb-3 text-white">📋 Durum:</h3>
              <p className="text-lg leading-relaxed text-white/90">{scenario.scenario}</p>
            </div>

            {/* Soru */}
            <div className="bg-white/5 p-6 rounded-2xl mb-6">
              <h3 className="font-black text-2xl text-yellow-400">❓ {scenario.question}</h3>
            </div>

            {/* Seçenekler */}
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

            {/* Geri Bildirim */}
            {showFeedback && selectedAnswer !== null && (
              <div className={`p-6 rounded-2xl mb-6 ${
                scenario.options[selectedAnswer].isCorrect
                  ? 'bg-green-500/20 border border-green-500/50'
                  : 'bg-red-500/20 border border-red-500/50'
              }`}>
                <p className="text-white font-bold text-lg">
                  {scenario.options[selectedAnswer].feedback}
                </p>
              </div>
            )}

            {/* Puan */}
            <div className="text-center">
              <div className="inline-block bg-yellow-500/20 px-6 py-3 rounded-full">
                <span className="text-yellow-300 font-black text-xl">Puan: {score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Senaryo listesi
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <button onClick={onExit} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">
            ⬅ GERİ DÖN
          </button>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">Senaryo Simülasyonları</h2>
          <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Gerçek hayat durumlarında doğru kararları ver!</p>
          
          {/* Puan ve İlerleme */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
              <span className="text-green-300 font-bold">Puan: {score}</span>
            </div>
            <div className="bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30">
              <span className="text-blue-300 font-bold">Tamamlanan: {completedScenarios.length}/{allScenarios.length}</span>
            </div>
          </div>
        </div>

        {/* Senaryo Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
          {allScenarios.map((scenario, index) => {
            const isCompleted = completedScenarios.includes(index);
            
            return (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(index)}
                className="bg-gradient-to-br from-red-600/50 to-orange-700/50 backdrop-blur-xl rounded-3xl p-6 border-2 border-red-500/30 hover:border-red-400/60 transition-all transform hover:scale-105 text-left relative overflow-hidden group"
              >
                {/* Tamamlandı İşareti */}
                {isCompleted && (
                  <div className="absolute top-4 right-4 bg-green-500 rounded-full p-2">
                    <span className="text-white text-xl">✓</span>
                  </div>
                )}

                {/* İkon */}
                <div className="text-6xl mb-4 text-center">{scenario.icon}</div>

                {/* Başlık */}
                <h3 className="text-2xl font-black text-white mb-3 text-center">{scenario.title}</h3>

                {/* Açıklama */}
                <p className="text-white/70 text-sm mb-4 line-clamp-2">{scenario.scenario}</p>

                {/* Seviye */}
                <div className="flex items-center justify-between">
                  <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-bold">
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
