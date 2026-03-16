/**
 * Paragraf Yazma Oyunu - 2. Sınıf
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Lightbulb } from 'lucide-react';

const TOPICS = [
  {
    title: 'En Sevdiğim Hayvan',
    prompts: [
      'Hangi hayvanı seviyorsun?',
      'Neden onu seviyorsun?',
      'Nasıl görünüyor?',
      'Ne yapmayı sever?',
    ],
    minWords: 30,
  },
  {
    title: 'Okulum',
    prompts: [
      'Okulunun adı nedir?',
      'Okulunda neler var?',
      'En sevdiğin ders hangisi?',
      'Okulda neler yapıyorsun?',
    ],
    minWords: 30,
  },
  {
    title: 'Ailem',
    prompts: [
      'Ailende kimler var?',
      'Birlikte neler yaparsınız?',
      'En çok neyi seversiniz?',
      'Hafta sonları ne yaparsınız?',
    ],
    minWords: 30,
  },
];

const ParagraphWritingGame: React.FC = () => {
  const navigate = useNavigate();
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [text, setText] = useState('');
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentTopic = TOPICS[currentTopicIndex];
  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  const handleSubmit = () => {
    if (wordCount >= currentTopic.minWords) {
      const points = Math.min(50, wordCount * 2);
      setScore(score + points);
      setShowFeedback(true);
    } else {
      alert(`En az ${currentTopic.minWords} kelime yazmalısın!`);
    }
  };

  const nextTopic = () => {
    if (currentTopicIndex < TOPICS.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
      setText('');
      setShowFeedback(false);
    } else {
      alert(`Tebrikler! Tüm konuları tamamladın! Toplam Puan: ${score}`);
      navigate('/turkish/grade/2');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <button
        onClick={() => navigate('/turkish/grade/2')}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Geri Dön
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Paragraf Yazma</h1>
              <p className="text-gray-600">
                Konu {currentTopicIndex + 1}/{TOPICS.length}
              </p>
            </div>
            <div className="flex items-center gap-2 text-yellow-500">
              <Star className="w-6 h-6 fill-current" />
              <span className="text-2xl font-bold">{score}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">{currentTopic.title}</h2>

            <div className="bg-pink-50 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-pink-600 mt-1" />
                <span className="font-bold text-gray-800">Yardımcı Sorular:</span>
              </div>
              <ul className="space-y-1 ml-7">
                {currentTopic.prompts.map((prompt, index) => (
                  <li key={index} className="text-gray-700">
                    • {prompt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {!showFeedback ? (
            <>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paragrafını buraya yaz..."
                className="w-full p-4 text-lg border-2 border-pink-300 rounded-lg focus:outline-none focus:border-pink-500 mb-4"
                rows={10}
              />

              <div className="flex justify-between items-center mb-4">
                <span
                  className={`text-lg font-medium ${
                    wordCount >= currentTopic.minWords ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  Kelime sayısı: {wordCount} / {currentTopic.minWords}
                </span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={wordCount < currentTopic.minWords}
                className="w-full py-3 bg-pink-500 text-white text-xl font-bold rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Gönder
              </button>
            </>
          ) : (
            <div>
              <div className="mb-6 p-6 bg-green-50 rounded-xl">
                <h3 className="text-xl font-bold text-green-600 mb-3">
                  Harika! Paragrafını tamamladın! 🎉
                </h3>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <p className="text-gray-800 whitespace-pre-wrap">{text}</p>
                </div>
                <div className="text-gray-700">
                  <p>
                    • Kelime sayısı: <strong>{wordCount}</strong>
                  </p>
                  <p>
                    • Kazandığın puan: <strong>{Math.min(50, wordCount * 2)}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={nextTopic}
                className="w-full py-3 bg-pink-500 text-white text-xl font-bold rounded-lg hover:bg-pink-600"
              >
                {currentTopicIndex < TOPICS.length - 1 ? 'Sonraki Konu' : 'Bitir'}
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 bg-pink-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-2">İpuçları</h3>
          <ul className="text-gray-700 space-y-1">
            <li>• Yardımcı soruları kullan</li>
            <li>• Cümlelerini noktalama işaretleriyle bitir</li>
            <li>• Düşüncelerini sırayla yaz</li>
            <li>• En az {currentTopic.minWords} kelime kullan</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParagraphWritingGame;
