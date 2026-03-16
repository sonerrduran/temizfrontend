import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface TrafficTestsProps {
  gradeLevel: number;
  onExit: () => void;
}

const testsByGrade: Record<number, Array<{
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}>> = {
  1: [
    { question: 'Kırmızı ışıkta ne yapmalıyız?', options: ['Geçmeliyiz', 'Durmalıyız', 'Koşmalıyız', 'Yavaşlamalıyız'], correct: 1, explanation: 'Kırmızı ışık DUR demektir.' },
    { question: 'Yaya geçidinin rengi nedir?', options: ['Kırmızı-Beyaz', 'Mavi-Beyaz', 'Yeşil-Beyaz', 'Sarı-Beyaz'], correct: 0, explanation: 'Yaya geçitleri kırmızı-beyaz çizgilidir.' },
    { question: 'Karşıdan karşıya geçerken ne yapmalıyız?', options: ['Koşmalıyız', 'Sağa sola bakmalıyız', 'Gözümüzü kapatmalıyız', 'Telefona bakmalıyız'], correct: 1, explanation: 'Geçmeden önce mutlaka sağa sola bakmalıyız.' },
    { question: 'Yeşil ışıkta ne yapabiliriz?', options: ['Durmalıyız', 'Geçebiliriz', 'Beklemeliyiz', 'Geri dönmeliyiz'], correct: 1, explanation: 'Yeşil ışık geçiş izni verir.' },
    { question: 'Nerede yürümeliyiz?', options: ['Yolda', 'Kaldırımda', 'Ortada', 'Arabada'], correct: 1, explanation: 'Yayalar kaldırımda yürür.' }
  ],
  2: [
    { question: 'Okul servisine binerken ne yapmalıyız?', options: ['Koşarak binmeliyiz', 'Servis durduktan sonra binmeliyiz', 'İterken binmeliyiz', 'Atlayarak binmeliyiz'], correct: 1, explanation: 'Servis tamamen durduktan sonra güvenle binmeliyiz.' },
    { question: 'Serviste emniyet kemeri takmak?', options: ['Zorunlu değil', 'Zorunludur', 'İsteğe bağlı', 'Gereksiz'], correct: 1, explanation: 'Emniyet kemeri takmak zorunludur.' },
    { question: 'Kaldırımda nasıl yürümeliyiz?', options: ['Koşarak', 'Yavaş ve dikkatli', 'Zıplayarak', 'Geriye doğru'], correct: 1, explanation: 'Kaldırımda yavaş ve dikkatli yürümeliyiz.' },
    { question: 'Sarı ışık ne anlama gelir?', options: ['Geç', 'Dur', 'Dikkat, hazırlan', 'Koş'], correct: 2, explanation: 'Sarı ışık dikkat ve hazırlık anlamına gelir.' },
    { question: 'Yolda oyun oynamak?', options: ['Güvenlidir', 'Tehlikelidir', 'Eğlencelidir', 'Önerilir'], correct: 1, explanation: 'Yolda oyun oynamak çok tehlikelidir.' }
  ],
  3: [
    { question: 'Bisiklete binerken mutlaka ne takmalıyız?', options: ['Şapka', 'Kask', 'Gözlük', 'Eldiven'], correct: 1, explanation: 'Kask başımızı korur, mutlaka takmalıyız.' },
    { question: 'Bisikletle nerede sürmeliyiz?', options: ['Yolda', 'Kaldırımda', 'Bisiklet yolunda', 'Parkta'], correct: 2, explanation: 'Bisiklet yolu en güvenli yerdir.' },
    { question: 'Dur işaretinin şekli nedir?', options: ['Üçgen', 'Daire', 'Sekizgen', 'Kare'], correct: 2, explanation: 'Dur işareti sekizgen (8 köşeli) şeklindedir.' },
    { question: 'Kırmızı üçgen işaret ne anlama gelir?', options: ['Yasak', 'Dikkat', 'Bilgi', 'Zorunlu'], correct: 1, explanation: 'Kırmızı üçgen tehlike ve dikkat işaretidir.' },
    { question: 'Bisiklette dönüş yaparken ne yapmalıyız?', options: ['Hiçbir şey', 'El işareti vermeliyiz', 'Bağırmalıyız', 'Durmalıyız'], correct: 1, explanation: 'Dönüşlerde el işareti vererek uyarmalıyız.' }
  ],
  4: [
    { question: 'Otobüse binerken nerede beklemeliyiz?', options: ['Yolda', 'Durakta', 'Arabada', 'Evde'], correct: 1, explanation: 'Otobüsü durakta beklemeliyiz.' },
    { question: 'Metroda sarı çizgi ne içindir?', options: ['Süs', 'Güvenlik', 'Oyun', 'Renk'], correct: 1, explanation: 'Sarı çizgi güvenlik sınırıdır.' },
    { question: 'Karanlıkta yürürken ne kullanmalıyız?', options: ['Şapka', 'Reflektör', 'Çanta', 'Oyuncak'], correct: 1, explanation: 'Reflektör bizi görünür kılar.' },
    { question: 'Ambulans geldiğinde ne yapmalıyız?', options: ['Yol vermeliyiz', 'Takip etmeliyiz', 'Durmalıyız', 'Kaçmalıyız'], correct: 0, explanation: 'Acil araçlara yol vermeliyiz.' },
    { question: 'Yağmurlu havada trafik nasıl olur?', options: ['Daha güvenli', 'Daha tehlikeli', 'Aynı', 'Daha hızlı'], correct: 1, explanation: 'Yağmurda yollar kaygan olur, daha tehlikelidir.' }
  ],
  5: [
    { question: 'Scooter kullanırken hangi koruyucuları takmalıyız?', options: ['Sadece kask', 'Kask, dizlik, dirseklik', 'Hiçbiri', 'Sadece eldiven'], correct: 1, explanation: 'Tam koruyucu ekipman kullanmalıyız.' },
    { question: 'Kavşakta sağdan gelen araç?', options: ['Bekler', 'Önceliklidir', 'Geri gider', 'Durur'], correct: 1, explanation: 'Sağdan gelen araç önceliklidir.' },
    { question: 'Park yasağı işareti hangi renktir?', options: ['Yeşil', 'Mavi', 'Kırmızı', 'Sarı'], correct: 2, explanation: 'Yasak işaretleri kırmızıdır.' },
    { question: 'Işıklı kavşakta hangi ışığa uymalıyız?', options: ['Trafik ışığına', 'Güneşe', 'Ay ışığına', 'Yıldızlara'], correct: 0, explanation: 'Trafik ışıklarına uymalıyız.' },
    { question: 'Yayalara ne zaman öncelik vermeliyiz?', options: ['Hiçbir zaman', 'Her zaman', 'Bazen', 'Nadiren'], correct: 1, explanation: 'Yayalara her zaman öncelik verilir.' }
  ],
  6: [
    { question: 'İtfaiye sireni duyduğumuzda ne yapmalıyız?', options: ['Devam etmeliyiz', 'Kenara çekilmeliyiz', 'Hızlanmalıyız', 'Durmalıyız'], correct: 1, explanation: 'Acil araçlar için kenara çekilmeliyiz.' },
    { question: 'Sisli havada görüş mesafesi?', options: ['Artar', 'Azalır', 'Aynı kalır', 'Kaybolur'], correct: 1, explanation: 'Siste görüş mesafesi azalır.' },
    { question: 'Hız limiti işaretleri hangi renktir?', options: ['Kırmızı', 'Mavi', 'Yeşil', 'Sarı'], correct: 0, explanation: 'Hız limiti işaretleri kırmızı çerçevelidir.' },
    { question: 'Telefon kullanırken dikkat?', options: ['Artar', 'Azalır', 'Aynı kalır', 'Kaybolur'], correct: 1, explanation: 'Telefon dikkat dağıtır.' },
    { question: 'Yağmurda fren mesafesi?', options: ['Kısalır', 'Uzar', 'Aynı kalır', 'Kaybolur'], correct: 1, explanation: 'Islak yolda fren mesafesi uzar.' }
  ],
  7: [
    { question: 'Agresif sürücülerle karşılaşınca ne yapmalıyız?', options: ['Yarışmalıyız', 'Uzak durmalıyız', 'Kızmalıyız', 'Takip etmeliyiz'], correct: 1, explanation: 'Agresif sürücülerden uzak durmalıyız.' },
    { question: 'Otoyolda en düşük hız limiti genellikle?', options: ['40 km/s', '60 km/s', '80 km/s', '100 km/s'], correct: 2, explanation: 'Otoyollarda minimum hız genellikle 80 km/s\'dir.' },
    { question: 'Kaza anında ilk yapılması gereken?', options: ['Kaçmak', 'Güvenliği sağlamak', 'Fotoğraf çekmek', 'Beklemek'], correct: 1, explanation: 'İlk önce güvenlik sağlanmalıdır.' },
    { question: 'Yol çizgilerinden kesik çizgi ne anlama gelir?', options: ['Geçilemez', 'Geçilebilir', 'Dur', 'Park et'], correct: 1, explanation: 'Kesik çizgi geçiş yapılabileceğini gösterir.' },
    { question: 'Okul bölgesi işareti hangi renktir?', options: ['Kırmızı', 'Mavi', 'Sarı', 'Yeşil'], correct: 2, explanation: 'Okul bölgesi işaretleri sarıdır.' }
  ],
  8: [
    { question: 'Trafik kurallarına uymamak?', options: ['Önerilmez', 'Cezai sorumluluk getirir', 'Önemli değil', 'İsteğe bağlı'], correct: 1, explanation: 'Kurallara uymamak yasal ceza gerektirir.' },
    { question: 'Ehliyet alabilmek için minimum yaş?', options: ['16', '17', '18', '21'], correct: 2, explanation: 'B sınıfı ehliyet için 18 yaş gerekir.' },
    { question: 'Çevre dostu ulaşım için ne yapmalıyız?', options: ['Sadece araba kullanmalıyız', 'Toplu taşıma ve bisiklet tercih etmeliyiz', 'Hiçbir şey', 'Daha çok araba almalıyız'], correct: 1, explanation: 'Toplu taşıma ve bisiklet çevre dostudur.' },
    { question: 'Trafik akışını yönetmek kimin sorumluluğudur?', options: ['Sadece polisin', 'Sadece sürücülerin', 'Herkesin', 'Kimsenin'], correct: 2, explanation: 'Trafik güvenliği herkesin sorumluluğudur.' },
    { question: 'Eko sürüş ne demektir?', options: ['Hızlı sürüş', 'Çevre dostu sürüş', 'Yavaş sürüş', 'Tehlikeli sürüş'], correct: 1, explanation: 'Eko sürüş yakıt tasarrufu ve çevre koruma sağlar.' }
  ]
};

export default function TrafficTests({ gradeLevel, onExit }: TrafficTestsProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Tüm sınıfların testlerini birleştir
  const allTests = Object.entries(testsByGrade).flatMap(([grade, tests]) => 
    tests.map(test => ({ ...test, grade: parseInt(grade) }))
  );
  
  const test = allTests[currentQ];

  const handleAnswer = (index: number) => {
    setSelected(index);
    if (index === test.correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQ < allTests.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Test Tamamlandı!</h2>
            <div className="text-6xl mb-6">{score >= allTests.length * 0.7 ? '🎉' : '📚'}</div>
            <p className="text-3xl text-white mb-8">Skorun: {score} / {allTests.length}</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => { setCurrentQ(0); setSelected(null); setScore(0); setShowResult(false); }} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Tekrar Dene</button>
              <button onClick={onExit} className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Menüye Dön</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <button onClick={onExit} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">
            ⬅ GERİ DÖN
          </button>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">Testler</h2>
          <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Bilgini test et!</p>
          <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{test.grade}. SINIF SORUSU</span>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <div className="mb-6 text-center">
              <p className="text-white/70 mb-2">Soru {currentQ + 1} / {allTests.length}</p>
              <p className="text-white font-semibold">Skor: {score}</p>
            </div>

            <h3 className="text-2xl font-bold text-white mb-8 text-center">{test.question}</h3>

            <div className="space-y-4">
              {test.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selected !== null}
                  className={`w-full p-4 rounded-xl text-left text-lg transition-all ${
                    selected === null ? 'bg-white/10 hover:bg-white/20 text-white' :
                    selected === index ? index === test.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white' :
                    index === test.correct ? 'bg-green-500 text-white' : 'bg-white/5 text-white/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selected !== null && (
                      <>{index === test.correct && <CheckCircle size={24} />}
                      {selected === index && index !== test.correct && <XCircle size={24} />}</>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {selected !== null && (
              <div className="mt-6 p-4 bg-blue-500/20 rounded-xl">
                <p className="text-white">{test.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
