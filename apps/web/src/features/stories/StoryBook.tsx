import React, { useState } from 'react';
import { stories, Story } from '../../data/stories';

interface StoryBookProps {
  onBack: () => void;
}

const StoryBook: React.FC<StoryBookProps> = ({ onBack }) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState<string>('Tümü');

  const grades = ['Tümü', 'Anasınıfı', '1. Sınıf', '2. Sınıf', '3. Sınıf', '4. Sınıf'];

  const filteredStories =
    selectedGrade === 'Tümü' ? stories : stories.filter((s) => s.grade === selectedGrade);

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story);
    setCurrentPage(0);
  };

  const handleBackToList = () => {
    setSelectedStory(null);
    setCurrentPage(0);
  };

  const nextPage = () => {
    if (selectedStory && currentPage < 5) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (selectedStory) {
    // Sayfa içerikleri
    const pages = [
      // Sayfa 0: Kapak
      <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="text-8xl mb-6 animate-bounce">📖</div>
        <h1 className="text-4xl md:text-6xl font-black text-amber-400 text-center mb-4 leading-tight">
          {selectedStory.title}
        </h1>
        <div className="inline-block px-6 py-3 bg-amber-500 text-slate-900 rounded-full text-lg font-bold mb-6">
          {selectedStory.grade}
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {selectedStory.characters.map((char, idx) => (
            <div
              key={idx}
              className="px-4 py-2 bg-slate-700 rounded-full text-amber-300 font-bold shadow-md"
            >
              {char}
            </div>
          ))}
        </div>
        <p className="text-amber-300 text-lg font-semibold">📝 {selectedStory.wordCount} kelime</p>
      </div>,

      // Sayfa 1: Hikaye
      <div className="h-full flex flex-col p-8 bg-gradient-to-br from-slate-800 to-slate-900">
        <h2 className="text-3xl font-black text-amber-400 mb-6 text-center border-b-4 border-amber-500 pb-4">
          📚 Hikaye
        </h2>
        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
          {/* Resim Alanı */}
          {selectedStory.image && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-500/30">
                <img
                  src={selectedStory.image}
                  alt={selectedStory.title}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    // Resim yüklenemezse emoji göster
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML =
                        '<div class="w-full h-64 flex items-center justify-center bg-slate-700/50 text-8xl">📖</div>';
                    }
                  }}
                />
              </div>
            </div>
          )}
          <p className="text-xl md:text-2xl leading-relaxed text-white font-medium whitespace-pre-line">
            {selectedStory.story}
          </p>
        </div>
      </div>,

      // Sayfa 2: Ders ve Kelimeler
      <div className="h-full flex flex-col p-8 bg-gradient-to-br from-slate-800 to-slate-900">
        <h2 className="text-3xl font-black text-green-400 mb-6 text-center border-b-4 border-green-500 pb-4">
          💡 Hikayeden Öğrendiklerimiz
        </h2>
        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-6">
          <div className="bg-slate-700/50 rounded-3xl p-6 shadow-lg border-4 border-green-500/30">
            <h3 className="text-2xl font-black text-green-400 mb-3">Ders:</h3>
            <p className="text-xl text-white font-semibold leading-relaxed">
              {selectedStory.lesson}
            </p>
          </div>

          <div className="bg-slate-700/50 rounded-3xl p-6 shadow-lg border-4 border-purple-500/30">
            <h3 className="text-2xl font-black text-purple-400 mb-4">📚 Yeni Kelimeler:</h3>
            <div className="space-y-3">
              {selectedStory.newWords.map((word, idx) => (
                <div key={idx} className="bg-slate-600/50 rounded-xl p-4">
                  <span className="font-black text-purple-300 text-lg">{word.word}:</span>
                  <p className="text-white mt-1">{word.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>,

      // Sayfa 3: Sorular
      <div className="h-full flex flex-col p-8 bg-gradient-to-br from-slate-800 to-slate-900">
        <h2 className="text-3xl font-black text-blue-400 mb-6 text-center border-b-4 border-blue-500 pb-4">
          ❓ Anlama Soruları
        </h2>
        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-4">
          {selectedStory.questions.map((q, idx) => (
            <div
              key={idx}
              className="bg-slate-700/50 rounded-3xl p-6 shadow-lg border-4 border-blue-500/30"
            >
              <h3 className="text-xl font-black text-blue-300 mb-3">
                {idx + 1}. {q.question}
              </h3>
              <details className="cursor-pointer">
                <summary className="text-lg font-bold text-gray-300 hover:text-blue-300 transition-colors">
                  Cevabı Göster 👆
                </summary>
                <div className="mt-3 p-4 bg-green-900/50 rounded-xl border-2 border-green-500">
                  <p className="text-lg font-bold text-green-300">✓ {q.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>,

      // Sayfa 4: Sahneler
      <div className="h-full flex flex-col p-8 bg-gradient-to-br from-slate-800 to-slate-900">
        <h2 className="text-3xl font-black text-pink-400 mb-6 text-center border-b-4 border-pink-500 pb-4">
          🎨 Hikaye Sahneleri
        </h2>
        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-4">
          {selectedStory.scenes.map((scene, idx) => (
            <div
              key={idx}
              className="bg-slate-700/50 rounded-3xl p-6 shadow-lg border-4 border-pink-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-black text-xl flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-lg text-white font-semibold leading-relaxed flex-1">{scene}</p>
              </div>
            </div>
          ))}
        </div>
      </div>,

      // Sayfa 5: Etkinlik
      <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="text-8xl mb-6">🎯</div>
        <h2 className="text-4xl font-black text-orange-400 mb-6 text-center">Etkinlik Zamanı!</h2>
        <div className="bg-slate-700/50 rounded-3xl p-8 shadow-2xl border-4 border-orange-500/30 max-w-2xl">
          <p className="text-2xl text-white font-bold leading-relaxed text-center">
            {selectedStory.activity}
          </p>
        </div>
        <button
          onClick={handleBackToList}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-black text-xl hover:scale-105 transition-all shadow-xl"
        >
          📚 Başka Hikaye Oku
        </button>
      </div>,
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex items-center justify-center">
        <div className="max-w-5xl w-full">
          {/* Kitap */}
          <div className="relative">
            {/* Kitap Sayfası */}
            <div
              className="bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border-8 border-amber-600"
              style={{ minHeight: '600px', maxHeight: '80vh' }}
            >
              {/* Sayfa İçeriği */}
              <div className="h-full">{pages[currentPage]}</div>
            </div>

            {/* Navigasyon */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`px-6 py-3 rounded-full font-black text-lg transition-all ${
                  currentPage === 0
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-600 text-white hover:bg-amber-700 hover:scale-105 shadow-lg'
                }`}
              >
                ← Önceki Sayfa
              </button>

              <div className="flex items-center gap-2">
                {pages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentPage === idx ? 'bg-amber-500 w-8' : 'bg-amber-700 hover:bg-amber-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === pages.length - 1}
                className={`px-6 py-3 rounded-full font-black text-lg transition-all ${
                  currentPage === pages.length - 1
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-600 text-white hover:bg-amber-700 hover:scale-105 shadow-lg'
                }`}
              >
                Sonraki Sayfa →
              </button>
            </div>

            {/* Kapat Butonu */}
            <button
              onClick={handleBackToList}
              className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 text-white rounded-full font-black text-2xl hover:bg-red-600 hover:scale-110 transition-all shadow-xl"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-6 py-3 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-all shadow-lg"
        >
          ← Ana Menü
        </button>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="text-9xl animate-bounce">📚</div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-amber-400 mb-4 drop-shadow-lg">
            Hikaye Kitabı
          </h1>
          <p className="text-amber-300 text-xl md:text-2xl font-bold">
            Eğlenceli hikayeler oku, yeni şeyler öğren!
          </p>
        </div>

        {/* Sınıf Filtreleri */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-6 py-3 rounded-full font-bold transition-all shadow-lg ${
                selectedGrade === grade
                  ? 'bg-amber-500 text-slate-900 scale-110'
                  : 'bg-slate-700 text-amber-300 hover:bg-slate-600'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>

        {/* Hikaye Kartları - Kitap Rafı Görünümü */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredStories.map((story) => (
            <button
              key={story.id}
              onClick={() => handleStorySelect(story)}
              className="group relative bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl p-4 shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-4 border-amber-800"
              style={{ minHeight: '280px' }}
            >
              {/* Kitap Sırtı Efekti */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-transparent rounded-2xl pointer-events-none"></div>

              <div className="relative h-full flex flex-col">
                {/* Sınıf Etiketi */}
                <div className="absolute -top-2 -right-2 px-3 py-1 bg-yellow-400 text-amber-900 rounded-full text-xs font-black shadow-md z-10">
                  {story.grade}
                </div>

                {/* Kitap İkonu */}
                <div className="text-6xl mb-3 group-hover:scale-110 transition-transform">📖</div>

                {/* Başlık */}
                <h3 className="text-lg font-black text-white mb-2 leading-tight line-clamp-3 flex-1">
                  {story.title}
                </h3>

                {/* Alt Bilgi */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between text-xs text-amber-100 font-bold mb-2">
                    <span>📝 {story.wordCount} kelime</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 text-center">
                    <span className="text-white font-bold text-sm">Oku →</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-20">
            <div className="text-9xl mb-6">📚</div>
            <h3 className="text-4xl font-black text-amber-400 mb-4">
              Bu sınıf için henüz hikaye yok
            </h3>
            <p className="text-amber-300 text-xl">Yakında yeni hikayeler eklenecek!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryBook;
