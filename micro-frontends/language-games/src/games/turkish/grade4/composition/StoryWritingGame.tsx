import { useState } from 'react';
import { ArrowLeft, PenTool, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const prompts = [
  {
    title: 'Sihirli Orman',
    starter: 'Bir gün ormanda yürürken sihirli bir kapı buldum...',
    keywords: ['macera', 'sihir', 'keşif'],
  },
  {
    title: 'Uzay Yolculuğu',
    starter: 'Roketim uzaya fırladığında, pencereden dünyayı gördüm...',
    keywords: ['uzay', 'gezegen', 'yıldız'],
  },
  {
    title: 'Konuşan Hayvan',
    starter: 'Sabah uyandığımda kedimin benimle konuştuğunu fark ettim...',
    keywords: ['hayvan', 'konuşma', 'sürpriz'],
  },
];

export default function StoryWritingGame() {
  const navigate = useNavigate();
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
  const [story, setStory] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleStoryChange = (text: string) => {
    setStory(text);
    const words = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    setWordCount(words.length);
  };

  const submitStory = () => {
    if (wordCount >= 50) {
      setShowFeedback(true);
    }
  };

  if (selectedPrompt === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
        <button
          onClick={() => navigate('/turkish/grade4')}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          Geri Dön
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <PenTool className="text-pink-500" size={32} />
              <h1 className="text-3xl font-bold text-gray-800">Hikaye Yazma</h1>
            </div>

            <p className="text-gray-600 mb-8 text-center">
              Bir hikaye konusu seç ve yaratıcılığını kullan!
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {prompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPrompt(index)}
                  className="p-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{prompt.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{prompt.starter}</p>
                  <div className="flex flex-wrap gap-2">
                    {prompt.keywords.map((keyword, i) => (
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

  const prompt = prompts[selectedPrompt];

  if (showFeedback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <Sparkles className="mx-auto text-yellow-500 mb-4" size={64} />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Harika Hikaye!</h2>
          <p className="text-xl text-gray-700 mb-6">
            {wordCount} kelimelik güzel bir hikaye yazdın!
          </p>
          <div className="bg-pink-50 p-6 rounded-xl mb-6">
            <p className="text-gray-700 whitespace-pre-wrap text-left">{story}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setSelectedPrompt(null);
                setStory('');
                setWordCount(0);
                setShowFeedback(false);
              }}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
            >
              Yeni Hikaye Yaz
            </button>
            <button
              onClick={() => navigate('/turkish/grade4')}
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <button
        onClick={() => setSelectedPrompt(null)}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        Geri Dön
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{prompt.title}</h2>
          <div className="mb-6 p-4 bg-pink-50 rounded-xl">
            <p className="text-gray-700 italic">"{prompt.starter}"</p>
          </div>

          <textarea
            value={story}
            onChange={(e) => handleStoryChange(e.target.value)}
            placeholder="Hikayeni buraya yaz..."
            className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none resize-none"
          />

          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600">
              Kelime sayısı: {wordCount} {wordCount < 50 && '(En az 50 kelime)'}
            </p>
            <button
              onClick={submitStory}
              disabled={wordCount < 50}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Hikayeyi Tamamla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
