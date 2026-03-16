import React, { useState } from 'react';
import { GameMode } from '../../types';

interface FirstAidScenariosProps {
  onExit: () => void;
  gradeLevel: number;
}

interface Scenario {
  id: number;
  title: string;
  icon: string;
  situation: string;
  image: string;
  question: string;
  options: { text: string; correct: boolean; feedback: string }[];
  difficulty: number;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: 'Okul Kazası',
    icon: '🏫',
    situation: 'Teneffüste arkadaşın koşarken düştü ve dizinden kan geliyor.',
    image: '🩸',
    question: 'Ne yapmalısın?',
    options: [
      {
        text: 'Yarayı temiz suyla yıka',
        correct: true,
        feedback: '✅ Doğru! İlk adım yarayı temizlemek.',
      },
      {
        text: 'Yarayı elle ovala',
        correct: false,
        feedback: '❌ Hayır! Bu enfeksiyona neden olabilir.',
      },
      { text: 'Hiçbir şey yapma', correct: false, feedback: '❌ Hayır! Yardım etmelisin.' },
      {
        text: 'Öğretmene haber ver',
        correct: true,
        feedback: '✅ Doğru! Büyüklere haber vermek önemli.',
      },
    ],
    difficulty: 1,
  },
  {
    id: 2,
    title: 'Burun Kanaması',
    icon: '👃',
    situation: 'Sınıf arkadaşının burnu kanıyor.',
    image: '🩸',
    question: 'Doğru müdahale hangisidir?',
    options: [
      { text: 'Başını arkaya yatır', correct: false, feedback: '❌ Hayır! Kan boğaza akabilir.' },
      {
        text: 'Başını öne eğ ve burnu sık',
        correct: true,
        feedback: '✅ Mükemmel! Doğru müdahale bu.',
      },
      { text: 'Soğuk su iç', correct: false, feedback: '❌ Bu yeterli değil.' },
      {
        text: 'Koşarak sağlık odasına git',
        correct: false,
        feedback: '❌ Koşmak kanamayı artırır.',
      },
    ],
    difficulty: 2,
  },
  {
    id: 3,
    title: 'Küçük Yanık',
    icon: '🔥',
    situation: 'Fen laboratuvarında elini hafif yaktın.',
    image: '🔥',
    question: 'İlk yapman gereken ne?',
    options: [
      {
        text: 'Soğuk suya tut (10-15 dk)',
        correct: true,
        feedback: '✅ Harika! Soğuk su yanığı rahatlatır.',
      },
      { text: 'Buz koy', correct: false, feedback: '❌ Buz dokuya zarar verebilir.' },
      { text: 'Diş macunu sür', correct: false, feedback: '❌ Asla! Bu enfeksiyona neden olur.' },
      { text: 'Yağ sür', correct: false, feedback: '❌ Yağ yanığı kötüleştirir.' },
    ],
    difficulty: 2,
  },
  {
    id: 4,
    title: 'Bayılma',
    icon: '😵',
    situation: 'Spor salonunda bir öğrenci bayıldı.',
    image: '😵',
    question: 'İlk yapman gereken ne?',
    options: [
      {
        text: 'Ayağa kaldırmaya çalış',
        correct: false,
        feedback: '❌ Hayır! Bu tehlikeli olabilir.',
      },
      {
        text: 'Yere yatır, bacakları yükselt',
        correct: true,
        feedback: '✅ Doğru! Beyne kan akışını artırır.',
      },
      { text: 'Su dök', correct: false, feedback: '❌ Bu yardımcı olmaz.' },
      { text: 'Tokatlayarak uyandır', correct: false, feedback: '❌ Asla! Zarar verebilirsin.' },
    ],
    difficulty: 3,
  },
  {
    id: 5,
    title: 'Boğulma Tehlikesi',
    icon: '🫁',
    situation: 'Yemekhanede bir öğrenci yemek yerken boğuldu.',
    image: '😰',
    question: 'Ne yapmalısın?',
    options: [
      { text: 'Sırtına sertçe vur', correct: true, feedback: '✅ Doğru! 5 kez sırt vuruşu yap.' },
      { text: 'Su içir', correct: false, feedback: '❌ Bu durumu kötüleştirir.' },
      { text: 'Yatır', correct: false, feedback: '❌ Ayakta tutmalısın.' },
      {
        text: 'Ağzını aç ve parmakla çıkar',
        correct: false,
        feedback: '❌ Daha derine itebilirsin.',
      },
    ],
    difficulty: 4,
  },
  {
    id: 6,
    title: 'Burkulma',
    icon: '🦶',
    situation: 'Basketbol oynarken ayak bileğin burkul du.',
    image: '🦶',
    question: 'Doğru müdahale nedir?',
    options: [
      { text: 'Yürümeye devam et', correct: false, feedback: '❌ Daha fazla zarar verebilir.' },
      {
        text: 'Dinlendir, soğuk uygula, yükselt',
        correct: true,
        feedback: '✅ Mükemmel! RICE protokolü.',
      },
      {
        text: 'Sıcak su ile masaj yap',
        correct: false,
        feedback: '❌ İlk 48 saat soğuk uygulanmalı.',
      },
      { text: 'Sıkıca bandajla ve koş', correct: false, feedback: '❌ Dinlenme şart!' },
    ],
    difficulty: 4,
  },
  {
    id: 7,
    title: 'Trafik Kazası',
    icon: '🚗',
    situation: 'Okul önünde küçük bir trafik kazası oldu. Yaralı var.',
    image: '🚑',
    question: 'İlk yapman gereken ne?',
    options: [
      {
        text: 'Yaralıyı hemen taşı',
        correct: false,
        feedback: '❌ Boyun/sırt yaralanması olabilir.',
      },
      {
        text: '112 yi ara, olay yerini güvenli hale getir',
        correct: true,
        feedback: '✅ Harika! Önce güvenlik, sonra yardım.',
      },
      { text: 'Yaralıya su ver', correct: false, feedback: '❌ İç kanama olabilir.' },
      { text: 'Fotoğraf çek', correct: false, feedback: '❌ Önce yardım et!' },
    ],
    difficulty: 6,
  },
  {
    id: 8,
    title: 'Kalp Durması',
    icon: '❤️',
    situation: 'Spor salonunda bir yetişkin yere yığıldı, nefes almıyor.',
    image: '💔',
    question: 'CPR için doğru sıra nedir?',
    options: [
      {
        text: 'Bilinç kontrol → 112 ara → 30 kompresyon → 2 solunum',
        correct: true,
        feedback: '✅ Mükemmel! CPR protokolünü biliyorsun.',
      },
      { text: 'Solunum → Kompresyon → 112 ara', correct: false, feedback: '❌ Sıra yanlış.' },
      {
        text: 'Su ver → Tokatlayarak uyandır',
        correct: false,
        feedback: '❌ Bu kalp durmasında işe yaramaz.',
      },
      {
        text: 'Sadece 112 yi ara ve bekle',
        correct: false,
        feedback: '❌ CPR hayat kurtarır, hemen başla!',
      },
    ],
    difficulty: 7,
  },
  {
    id: 9,
    title: 'Zehirlenme',
    icon: '☠️',
    situation: 'Küçük kardeşin temizlik malzemesi içmiş.',
    image: '🧴',
    question: 'Ne yapmalısın?',
    options: [
      {
        text: 'Hemen kustur',
        correct: false,
        feedback: '❌ Bazı zehirlerde kusturma tehlikelidir.',
      },
      {
        text: '114 Zehir Danışma ara, ürünü göster',
        correct: true,
        feedback: '✅ Doğru! Uzman yönlendirmesi şart.',
      },
      { text: 'Süt içir', correct: false, feedback: '❌ Her zehirde süt işe yaramaz.' },
      { text: 'Bekle, geçer', correct: false, feedback: '❌ Zehirlenme acildir!' },
    ],
    difficulty: 8,
  },
  {
    id: 10,
    title: 'Elektrik Çarpması',
    icon: '⚡',
    situation: 'Arkadaşın elektrik kablosuna dokundu ve şok geçirdi.',
    image: '⚡',
    question: 'İlk yapman gereken ne?',
    options: [
      { text: 'Hemen yaralıya dokun', correct: false, feedback: '❌ Sen de şok geçirebilirsin!' },
      {
        text: 'Elektriği kes, izole edici kullan',
        correct: true,
        feedback: '✅ Mükemmel! Önce güvenlik.',
      },
      { text: 'Su dök', correct: false, feedback: '❌ Su elektriği iletir, çok tehlikeli!' },
      { text: 'Metal çubukla ayır', correct: false, feedback: '❌ Metal elektriği iletir!' },
    ],
    difficulty: 8,
  },
];

const FirstAidScenarios: React.FC<FirstAidScenariosProps> = ({ onExit, gradeLevel }) => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  // Sınıf seviyesine göre senaryoları filtrele
  const availableScenarios = SCENARIOS.filter((s) => s.difficulty <= gradeLevel);

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);

    if (selectedScenario && selectedScenario.options[index].correct) {
      setScore(score + 10);
      if (!completedScenarios.includes(selectedScenario.id)) {
        setCompletedScenarios([...completedScenarios, selectedScenario.id]);
      }
    }
  };

  const handleNextScenario = () => {
    setSelectedScenario(null);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  if (selectedScenario) {
    return (
      <div className="min-h-screen text-white p-4">
        <div className="w-full max-w-4xl mx-auto">
          <button
            onClick={handleNextScenario}
            className="mb-6 px-6 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-bold"
          >
            ⬅ Senaryolara Dön
          </button>

          <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-red-500/30 shadow-2xl">
            {/* Senaryo Başlığı */}
            <div className="text-center mb-8">
              <div className="text-7xl mb-4">{selectedScenario.image}</div>
              <h2 className="text-3xl font-black mb-2">{selectedScenario.title}</h2>
              <div className="inline-block bg-red-500/20 px-4 py-2 rounded-full">
                <span className="text-red-300 font-bold text-sm">
                  Seviye {selectedScenario.difficulty}
                </span>
              </div>
            </div>

            {/* Durum */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-2xl mb-6 border border-purple-500/30">
              <h3 className="font-black text-xl mb-3">📋 Durum:</h3>
              <p className="text-lg leading-relaxed">{selectedScenario.situation}</p>
            </div>

            {/* Soru */}
            <div className="bg-white/5 p-6 rounded-2xl mb-6">
              <h3 className="font-black text-2xl mb-4 text-yellow-400">
                ❓ {selectedScenario.question}
              </h3>
            </div>

            {/* Seçenekler */}
            <div className="space-y-4 mb-6">
              {selectedScenario.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = option.correct;
                const showResult = showFeedback && isSelected;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-xl text-left transition-all font-bold text-lg ${
                      showResult
                        ? isCorrect
                          ? 'bg-green-500 border-2 border-green-300'
                          : 'bg-red-500 border-2 border-red-300'
                        : 'bg-white/10 hover:bg-white/20 border-2 border-white/10'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-black">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option.text}</span>
                    </div>
                    {showResult && (
                      <div className="mt-3 pt-3 border-t border-white/20">
                        <p className="text-sm">{option.feedback}</p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Sonraki Buton */}
            {showFeedback && (
              <button
                onClick={handleNextScenario}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
              >
                Sonraki Senaryo →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-4">
      <div className="w-full max-w-6xl mx-auto">
        <button
          onClick={onExit}
          className="mb-6 px-6 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-bold"
        >
          ⬅ Ana Menüye Dön
        </button>

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black mb-4">🎭 Senaryo Simülasyonları</h2>
          <p className="text-white/70 mb-6">Gerçek hayat durumlarında doğru kararları ver!</p>
          <div className="flex justify-center gap-4">
            <div className="bg-green-500/20 px-6 py-3 rounded-full">
              <span className="text-green-300 font-bold">Puan: {score}</span>
            </div>
            <div className="bg-blue-500/20 px-6 py-3 rounded-full">
              <span className="text-blue-300 font-bold">
                Tamamlanan: {completedScenarios.length}/{availableScenarios.length}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableScenarios.map((scenario) => {
            const isCompleted = completedScenarios.includes(scenario.id);
            return (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario)}
                className={`relative p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                  isCompleted
                    ? 'bg-green-500/20 border-green-500'
                    : 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30 hover:border-purple-500'
                }`}
              >
                {isCompleted && <div className="absolute top-4 right-4 text-3xl">✅</div>}
                <div className="text-5xl mb-4">{scenario.icon}</div>
                <h3 className="font-black text-xl mb-2">{scenario.title}</h3>
                <p className="text-sm text-white/60 mb-3">
                  {scenario.situation.substring(0, 60)}...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-red-500/20 text-red-300 px-3 py-1 rounded-full font-bold">
                    Seviye {scenario.difficulty}
                  </span>
                  <span className="text-2xl">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FirstAidScenarios;
