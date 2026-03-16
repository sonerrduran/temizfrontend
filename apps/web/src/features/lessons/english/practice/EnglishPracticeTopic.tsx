import { useNavigate, useParams } from 'react-router-dom';

export default function EnglishPracticeTopic() {
  const navigate = useNavigate();
  const { grade } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-sky-700 to-blue-600 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/lessons/english/practice')}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="text-7xl mb-4">🇬🇧</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            İngilizce Pratik - {grade}. Sınıf
          </h1>
          <p className="text-white/80 text-lg">Pratik alıştırmaları</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <p className="text-white text-lg text-center">İçerik geliştiriliyor...</p>
        </div>
      </div>
    </div>
  );
}
