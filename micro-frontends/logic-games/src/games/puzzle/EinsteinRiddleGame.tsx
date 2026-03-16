import React, { useState, useEffect } from 'react';

interface EinsteinRiddleGameProps {
  onBack: () => void;
}

type Category = 'nationality' | 'color' | 'pet' | 'drink' | 'sport';

const EinsteinRiddleGame: React.FC<EinsteinRiddleGameProps> = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showLevelSelect, setShowLevelSelect] = useState(true);
  const [grid, setGrid] = useState<{ [key: string]: string }[]>([]);
  const [solution, setSolution] = useState<{ [key: string]: string }[]>([]);
  const [selectedCell, setSelectedCell] = useState<{ house: number; category: Category } | null>(
    null
  );
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [cluesVisible, setCluesVisible] = useState(true);

  const levels = [
    { level: 1, name: 'Başlangıç', description: 'Klasik Einstein bulmacası' },
    { level: 2, name: 'Kolay', description: 'Farklı özellikler' },
    { level: 3, name: 'Orta', description: 'Daha karmaşık ipuçları' },
    { level: 4, name: 'Zor', description: 'Zorlu kombinasyonlar' },
    { level: 5, name: 'Uzman', description: 'Uzman seviye bulmaca' },
  ];

  const categories: { key: Category; label: string; options: string[] }[] =
    currentLevel === 1
      ? [
          {
            key: 'nationality',
            label: 'Uyruk',
            options: ['İngiliz', 'İsveçli', 'Danimarkalı', 'Norveçli', 'Alman'],
          },
          { key: 'color', label: 'Renk', options: ['Kırmızı', 'Yeşil', 'Beyaz', 'Sarı', 'Mavi'] },
          { key: 'pet', label: 'Hayvan', options: ['Köpek', 'Kuş', 'Kedi', 'At', 'Balık'] },
          { key: 'drink', label: 'İçecek', options: ['Çay', 'Kahve', 'Süt', 'Bira', 'Su'] },
          {
            key: 'sport',
            label: 'Spor',
            options: ['Futbol', 'Basketbol', 'Tenis', 'Yüzme', 'Koşu'],
          },
        ]
      : currentLevel === 2
        ? [
            {
              key: 'nationality',
              label: 'Meslek',
              options: ['Doktor', 'Öğretmen', 'Mühendis', 'Sanatçı', 'Avukat'],
            },
            { key: 'color', label: 'Araba', options: ['BMW', 'Audi', 'Toyota', 'Ford', 'Honda'] },
            { key: 'pet', label: 'Hobi', options: ['Resim', 'Müzik', 'Okuma', 'Bahçe', 'Yemek'] },
            {
              key: 'drink',
              label: 'Yemek',
              options: ['Pizza', 'Sushi', 'Kebap', 'Makarna', 'Salata'],
            },
            { key: 'sport', label: 'Renk', options: ['Kırmızı', 'Mavi', 'Yeşil', 'Sarı', 'Mor'] },
          ]
        : currentLevel === 3
          ? [
              {
                key: 'nationality',
                label: 'İsim',
                options: ['Ali', 'Ayşe', 'Mehmet', 'Fatma', 'Can'],
              },
              { key: 'color', label: 'Yaş', options: ['20', '25', '30', '35', '40'] },
              {
                key: 'pet',
                label: 'Şehir',
                options: ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'],
              },
              {
                key: 'drink',
                label: 'Meyve',
                options: ['Elma', 'Armut', 'Muz', 'Portakal', 'Üzüm'],
              },
              { key: 'sport', label: 'Müzik', options: ['Rock', 'Pop', 'Jazz', 'Klasik', 'Rap'] },
            ]
          : currentLevel === 4
            ? [
                {
                  key: 'nationality',
                  label: 'Ülke',
                  options: ['Türkiye', 'Fransa', 'İtalya', 'İspanya', 'Yunanistan'],
                },
                {
                  key: 'color',
                  label: 'Dil',
                  options: ['Türkçe', 'Fransızca', 'İtalyanca', 'İspanyolca', 'Yunanca'],
                },
                {
                  key: 'pet',
                  label: 'Yemek',
                  options: ['Kebap', 'Croissant', 'Pizza', 'Paella', 'Moussaka'],
                },
                {
                  key: 'drink',
                  label: 'İçecek',
                  options: ['Çay', 'Şarap', 'Espresso', 'Sangria', 'Ouzo'],
                },
                {
                  key: 'sport',
                  label: 'Dans',
                  options: ['Halay', 'Vals', 'Tango', 'Flamenco', 'Sirtaki'],
                },
              ]
            : [
                {
                  key: 'nationality',
                  label: 'Gezegen',
                  options: ['Merkür', 'Venüs', 'Mars', 'Jüpiter', 'Satürn'],
                },
                {
                  key: 'color',
                  label: 'Element',
                  options: ['Ateş', 'Su', 'Toprak', 'Hava', 'Metal'],
                },
                {
                  key: 'pet',
                  label: 'Kristal',
                  options: ['Elmas', 'Yakut', 'Zümrüt', 'Safir', 'Ametist'],
                },
                {
                  key: 'drink',
                  label: 'Güç',
                  options: ['Işık', 'Karanlık', 'Zaman', 'Uzay', 'Enerji'],
                },
                {
                  key: 'sport',
                  label: 'Sembol',
                  options: ['Yıldız', 'Ay', 'Güneş', 'Yıldırım', 'Bulut'],
                },
              ];

  const clues =
    currentLevel === 1
      ? [
          '1. İngiliz kırmızı evde yaşar',
          '2. İsveçli köpek besler',
          '3. Danimarkalı çay içer',
          '4. Yeşil ev beyaz evin solundadır',
          '5. Yeşil ev sahibi kahve içer',
          '6. Futbol oynayan kuş besler',
          '7. Sarı ev sahibi basketbol oynar',
          '8. Ortadaki evde süt içilir',
          '9. Norveçli ilk evde yaşar',
          '10. Tenis oynayan kedi sahibinin yanında yaşar',
          '11. At sahibi basketbol oynayanın yanında yaşar',
          '12. Yüzme yapan bira içer',
          '13. Alman koşu yapar',
          '14. Norveçli mavi evin yanında yaşar',
          '15. Tenis oynayan su içenin yanında yaşar',
        ]
      : currentLevel === 2
        ? [
            '1. Doktor BMW kullanır',
            '2. Öğretmen resim yapar',
            '3. Mühendis pizza sever',
            '4. Audi sahibi müzikle ilgilenir',
            '5. Toyota sahibi kebap yer',
            '6. Okuma hobisi olan salata yer',
            '7. Ford sahibi bahçeyle ilgilenir',
            '8. Ortadaki kişi sushi yer',
            '9. Sanatçı ilk sıradadır',
            '10. Yemek hobisi olan avukatın yanındadır',
            '11. Bahçe hobisi olan Honda sahibinin yanındadır',
            '12. Makarna yiyen kırmızı rengi sever',
            '13. Avukat mavi rengi sever',
            '14. Sanatçı yeşil rengi sevenin yanındadır',
            '15. Yemek hobisi olan sarı rengi sevenin yanındadır',
          ]
        : currentLevel === 3
          ? [
              '1. Ali 20 yaşında',
              "2. Ayşe İstanbul'da yaşar",
              '3. Mehmet elma sever',
              "4. 25 yaşındaki Ankara'da yaşar",
              '5. 30 yaşındaki armut sever',
              '6. Rock dinleyen muz sever',
              "7. İzmir'de yaşayan pop dinler",
              '8. Ortadaki kişi 30 yaşında',
              '9. Fatma ilk sıradadır',
              "10. Jazz dinleyen Can'ın yanındadır",
              "11. Muz seven Bursa'da yaşayanın yanındadır",
              '12. Portakal seven klasik dinler',
              '13. Can rap dinler',
              '14. Fatma üzüm sevenin yanındadır',
              '15. Jazz dinleyen 35 yaşındakinin yanındadır',
            ]
          : currentLevel === 4
            ? [
                "1. Türkiye'den gelen Türkçe konuşur",
                "2. Fransa'dan gelen croissant yer",
                "3. İtalya'dan gelen çay içer",
                '4. Fransızca konuşan pizza yer',
                '5. İtalyanca konuşan kebap yer',
                '6. Paella yiyen sangria içer',
                '7. Espresso içen vals yapar',
                '8. Ortadaki kişi pizza yer',
                "9. Yunanistan'dan gelen ilk sıradadır",
                "10. Tango yapan İspanya'dan gelenin yanındadır",
                '11. Kebap yiyen vals yapanın yanındadır',
                '12. Moussaka yiyen ouzo içer',
                "13. İspanya'dan gelen flamenco yapar",
                "14. Yunanistan'dan gelen croissant yiyenin yanındadır",
                '15. Tango yapan şarap içenin yanındadır',
              ]
            : [
                '1. Merkür ateş elementi taşır',
                '2. Venüs elmas kristali tutar',
                '3. Mars ışık gücüne sahip',
                '4. Su elementi yakut kristali tutar',
                '5. Toprak elementi zümrüt kristali tutar',
                '6. Zaman gücü safir kristali tutar',
                '7. Hava elementi uzay gücüne sahip',
                '8. Ortadaki gezegen toprak elementi taşır',
                '9. Jüpiter ilk sıradadır',
                "10. Enerji gücü Satürn'ün yanındadır",
                '11. Zümrüt kristali yıldırım sembolünün yanındadır',
                '12. Ametist kristali karanlık gücüne sahip',
                '13. Satürn bulut sembolü taşır',
                '14. Jüpiter elmas kristalinin yanındadır',
                '15. Enerji gücü ay sembolünün yanındadır',
              ];

  useEffect(() => {
    if (!showLevelSelect) {
      initializePuzzle();
    }
  }, [showLevelSelect, currentLevel]);

  useEffect(() => {
    if (!isComplete && !showLevelSelect) {
      const timer = setInterval(() => setTime((t) => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isComplete, showLevelSelect]);

  const initializePuzzle = () => {
    // Create solution based on Einstein's riddle
    const newSolution = [
      { nationality: 'Norveçli', color: 'Sarı', pet: 'Kedi', drink: 'Su', sport: 'Basketbol' },
      { nationality: 'Danimarkalı', color: 'Mavi', pet: 'At', drink: 'Çay', sport: 'Tenis' },
      { nationality: 'İngiliz', color: 'Kırmızı', pet: 'Kuş', drink: 'Süt', sport: 'Futbol' },
      { nationality: 'Alman', color: 'Yeşil', pet: 'Balık', drink: 'Kahve', sport: 'Koşu' },
      { nationality: 'İsveçli', color: 'Beyaz', pet: 'Köpek', drink: 'Bira', sport: 'Yüzme' },
    ];

    // Create empty grid
    const newGrid = Array(5)
      .fill(0)
      .map(() => ({
        nationality: '',
        color: '',
        pet: '',
        drink: '',
        sport: '',
      }));

    // Add some hints
    newGrid[0].nationality = 'Norveçli'; // Clue 9
    newGrid[2].drink = 'Süt'; // Clue 8

    setGrid(newGrid);
    setSolution(newSolution);
    setMistakes(0);
    setTime(0);
    setIsComplete(false);
  };

  const handleCellClick = (house: number, category: Category) => {
    setSelectedCell({ house, category });
  };

  const handleOptionSelect = (option: string) => {
    if (!selectedCell) return;

    const { house, category } = selectedCell;

    // Check if option is already used in this category
    const isUsed = grid.some((h, idx) => idx !== house && h[category] === option);
    if (isUsed && option !== '') {
      setMistakes((m) => m + 1);
      return;
    }

    const newGrid = grid.map((h, idx) => {
      if (idx === house) {
        return { ...h, [category]: option };
      }
      return h;
    });

    setGrid(newGrid);

    // Check if wrong
    if (option !== '' && option !== solution[house][category]) {
      setMistakes((m) => m + 1);
    }

    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid: { [key: string]: string }[]) => {
    for (let i = 0; i < 5; i++) {
      for (const cat of categories) {
        if (currentGrid[i][cat.key] !== solution[i][cat.key]) return;
      }
    }
    setIsComplete(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-white/20"
          >
            ⬅ GERİ DÖN
          </button>
          <h1 className="text-3xl md:text-4xl font-black text-white">Einstein Bulmacası</h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-white/70 text-sm">Süre</div>
            <div className="text-2xl font-bold text-white">{formatTime(time)}</div>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-white/70 text-sm">Hatalar</div>
            <div className="text-2xl font-bold text-white">{mistakes}</div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 rounded-xl p-4 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-white font-bold mb-2">📖 Nasıl Oynanır?</h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• 5 ev, 5 kişi ve her birinin özellikleri var</li>
                  <li>• İpuçlarını kullanarak tabloyu doldurun</li>
                  <li>• Her özellik sadece bir evde bulunabilir</li>
                  <li>• Soru: Balığı kim besliyor?</li>
                </ul>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-white/70 hover:text-white ml-4"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Grid */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-2 border-white/30 p-2 bg-purple-600/50 text-white font-bold">
                    Ev
                  </th>
                  {categories.map((cat) => (
                    <th
                      key={cat.key}
                      className="border-2 border-white/30 p-2 bg-purple-600/50 text-white font-bold text-sm"
                    >
                      {cat.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grid.map((house, idx) => (
                  <tr key={idx}>
                    <td className="border-2 border-white/30 p-2 bg-purple-500/30 text-white font-bold text-center">
                      {idx + 1}
                    </td>
                    {categories.map((cat) => (
                      <td
                        key={cat.key}
                        onClick={() => handleCellClick(idx, cat.key)}
                        className={`border-2 border-white/30 p-2 cursor-pointer transition-all text-center text-sm ${
                          selectedCell?.house === idx && selectedCell?.category === cat.key
                            ? 'bg-yellow-400/50 ring-2 ring-yellow-400'
                            : house[cat.key]
                              ? 'bg-green-500/30 text-white'
                              : 'bg-white/20 hover:bg-white/30 text-white/50'
                        }`}
                      >
                        {house[cat.key] || '?'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Options Panel */}
            {selectedCell && (
              <div className="mt-4 p-4 bg-purple-500/20 rounded-xl border border-purple-300/30">
                <h4 className="text-white font-bold mb-2">
                  {categories.find((c) => c.key === selectedCell.category)?.label} Seçin:
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {categories
                    .find((c) => c.key === selectedCell.category)
                    ?.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className="py-2 px-3 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-all"
                      >
                        {option}
                      </button>
                    ))}
                  <button
                    onClick={() => handleOptionSelect('')}
                    className="py-2 px-3 bg-red-500/30 hover:bg-red-500/40 rounded-lg text-white text-sm font-medium transition-all"
                  >
                    Temizle
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Clues Panel */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">İpuçları</h3>
              <button
                onClick={() => setCluesVisible(!cluesVisible)}
                className="text-white/70 hover:text-white text-sm"
              >
                {cluesVisible ? '▼' : '▶'}
              </button>
            </div>
            {cluesVisible && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {clues.map((clue, idx) => (
                  <div key={idx} className="text-white/90 text-sm p-2 bg-white/5 rounded-lg">
                    {clue}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={initializePuzzle}
          className="w-full mt-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-xl text-white font-bold text-lg transition-all shadow-lg"
        >
          🔄 Yeniden Başlat
        </button>

        {/* Completion Modal */}
        {isComplete && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-black text-white mb-4">Harika!</h2>
              <p className="text-white/90 mb-4">
                Einstein Bulmacası'nı {formatTime(time)} sürede, {mistakes} hata ile çözdünüz!
              </p>
              <p className="text-white font-bold mb-6">Cevap: Balığı Alman besliyor! 🐟</p>
              <div className="flex gap-3">
                <button
                  onClick={initializePuzzle}
                  className="flex-1 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all"
                >
                  Yeni Oyun
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all"
                >
                  Menüye Dön
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EinsteinRiddleGame;
