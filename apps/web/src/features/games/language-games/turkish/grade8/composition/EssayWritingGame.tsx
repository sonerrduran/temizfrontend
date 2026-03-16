import React, { useState } from 'react';
import { ArrowLeft, FileText, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const topics = [
  {
    title: 'Teknolojinin Eğitime Etkisi',
    description: 'Teknolojinin eğitim sistemindeki olumlu ve olumsuz etkilerini tartışın.',
    keywords: ['teknoloji', 'eğitim', 'dijital', 'öğrenme'],
  },
  {
    title: 'Çevre Kirliliği ve Çözümleri',
    description: 'Çevre kirliliğinin nedenleri ve alınabilecek önlemleri açıklayın.',
    keywords: ['çevre', 'kirlilik', 'doğa', 'çözüm'],
  },
  {
    title: 'Kitap Okuma Alışkanlığı',
    description: 'Kitap okumanın önemi ve gençlerde okuma alışkanlığının geliştirilmesi.',
    keywords: ['kitap', 'okuma', 'kültür', 'gelişim'],
  },
];

const structure = [
  { name: 'Giriş', minWords: 30, description: 'Konuyu tanıtın ve tezinizi belirtin' },
  { name: 'Gelişme', minWords: 100, description: 'Argümanlarınızı örneklerle destekleyin' },
  { name: 'Sonuç', minWords: 30, description: 'Fikirlerinizi özetleyin ve sonuca bağlayın' },
];

export default function EssayWritingGame() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [sections, setSections] = useState<string[]>(['', '', '']);
  const [wordCounts, setWordCounts] = useState<number[]>([0, 0, 0]);
  const [completed, setCompleted] = useState(false);

  const handleSectionChange = (text: string) => {
    const newSections = [...sections];
    newSections[currentSection] = text;
    setSections(newSections);

    const words = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    const newWordCounts = [...wordCounts];
    newWordCounts[currentSection] = words.length;
    setWordCounts(newWordCounts);
  };

  const nextSection = () => {
    if (currentSection < structure.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setCompleted(true);
    }
  };

  const canProceed = wordCounts[currentSection] >= structure[currentSection].minWords;

  if (selectedTopic === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
        <button
          onClick={() => navigate('/turkish/grade8')}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          Geri Dön
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-emerald-500" size={32} />
              <h1 className="text-3xl font-bold text-gray-800">Kompozisyon Yazma</h1>
            </div>

            <p className="text-gray-600 mb-8 text-center">
              Bir konu seç ve yapılandırılmış kompozisyon yaz
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {topics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTopic(index)}
                  className="p-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl hover:shadow-lg transition-all text-left"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{topic.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {topic.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white rounded-full text-xs text-gray-600"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const topic = topics[selectedTopic];
  const section = structure[currentSection];

  if (completed) {
    const totalWords = wordCounts.reduce((sum, count) => sum + count, 0);
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Kompozisyon Tamamlandı!</h2>
            <p className="text-xl text-gray-700">Toplam {totalWords} kelime yazdın</p>
          </div>

          <div className="space-y-6">
            {structure.map((sec, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{sec.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{wordCounts[index]} kelime</p>
                <p className="text-gray-700 whitespace-pre-wrap">{sections[index]}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={() => {
                setSelectedTopic(null);
                setCurrentSection(0);
                setSections(['', '', '']);
                setWordCounts([0, 0, 0]);
                setCompleted(false);
              }}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
              Yeni Kompozisyon
            </button>
            <button
              onClick={() => navigate('/turkish/grade8')}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Menüye Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
      <button
        onClick={() => setSelectedTopic(null)}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        Geri Dön
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{topic.title}</h2>
          <p className="text-gray-600 mb-6">{topic.description}</p>

          <div className="flex items-center gap-4 mb-6">
            {structure.map((sec, index) => (
              <div
                key={index}
                className={`flex-1 p-3 rounded-lg text-center ${
                  index === currentSection
                    ? 'bg-emerald-500 text-white'
                    : index < currentSection
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                }`}
              >
                <div className="font-semibold">{sec.name}</div>
                <div className="text-sm">
                  {wordCounts[index]} / {sec.minWords} kelime
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6 p-4 bg-emerald-50 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-2">{section.name}</h3>
            <p className="text-gray-600 text-sm">{section.description}</p>
          </div>

          <textarea
            value={sections[currentSection]}
            onChange={(e) => handleSectionChange(e.target.value)}
            placeholder={`${section.name} bölümünü buraya yaz...`}
            className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none"
          />

          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600">
              Kelime sayısı: {wordCounts[currentSection]} / {section.minWords}
            </p>
            <button
              onClick={nextSection}
              disabled={!canProceed}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {currentSection < structure.length - 1 ? 'Sonraki Bölüm' : 'Tamamla'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
