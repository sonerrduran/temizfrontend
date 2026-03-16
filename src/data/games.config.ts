// Oyun Konfigürasyonu - Tüm oyunlar burada tanımlanır

export interface GameConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'turkish' | 'math' | 'logic' | 'science';
  grade: number;
  subcategory: string;
  type: 'quiz' | 'match' | 'builder' | 'interactive';
  data: any; // Oyuna özel veri
}

export const TURKISH_GAMES: GameConfig[] = [
  // 1. Sınıf - Harfler
  {
    id: 'turkish-1-letters-match',
    title: 'Harf Eşleştirme',
    description: 'Harfleri eşleştir',
    icon: '🔤',
    category: 'turkish',
    grade: 1,
    subcategory: 'Harfler',
    type: 'match',
    data: {
      pairs: [
        { letter: 'A', word: 'Araba', image: '🚗' },
        { letter: 'B', word: 'Balon', image: '🎈' },
        { letter: 'C', word: 'Ceket', image: '🧥' },
        // ... daha fazla
      ],
    },
  },
  {
    id: 'turkish-1-letters-vowel-consonant',
    title: 'Sesli-Sessiz Harf',
    description: 'Harfleri sesli ve sessiz olarak ayır',
    icon: '🎵',
    category: 'turkish',
    grade: 1,
    subcategory: 'Harfler',
    type: 'quiz',
    data: {
      vowels: ['A', 'E', 'I', 'İ', 'O', 'Ö', 'U', 'Ü'],
      consonants: [
        'B',
        'C',
        'Ç',
        'D',
        'F',
        'G',
        'Ğ',
        'H',
        'J',
        'K',
        'L',
        'M',
        'N',
        'P',
        'R',
        'S',
        'Ş',
        'T',
        'V',
        'Y',
        'Z',
      ],
    },
  },

  // 2. Sınıf - Okuma
  {
    id: 'turkish-2-reading-comprehension',
    title: 'Okuduğunu Anlama',
    description: 'Hikaye oku ve soruları cevapla',
    icon: '📖',
    category: 'turkish',
    grade: 2,
    subcategory: 'Okuma',
    type: 'quiz',
    data: {
      stories: [
        {
          title: 'Yardımsever Kedi',
          text: 'Bir zamanlar küçük bir köyde yaşlı bir kedi vardı...',
          questions: [
            {
              question: 'Kedi nerede yaşıyordu?',
              options: ['Şehirde', 'Köyde', 'Ormanda', 'Dağda'],
              correct: 1,
            },
          ],
        },
      ],
    },
  },

  // ... daha fazla oyun
];

export const MATH_GAMES: GameConfig[] = [
  {
    id: 'math-1-addition',
    title: 'Toplama İşlemi',
    description: 'Sayıları topla',
    icon: '➕',
    category: 'math',
    grade: 1,
    subcategory: 'Dört İşlem',
    type: 'quiz',
    data: {
      range: [1, 10],
      operation: 'addition',
    },
  },
  // ... daha fazla
];

export const LOGIC_GAMES: GameConfig[] = [
  {
    id: 'logic-chess',
    title: 'Satranç',
    description: 'Klasik satranç oyunu',
    icon: '♟️',
    category: 'logic',
    grade: 0,
    subcategory: 'İki Kişilik',
    type: 'interactive',
    data: {},
  },
  // ... daha fazla
];

// Tüm oyunları birleştir
export const ALL_GAMES = [...TURKISH_GAMES, ...MATH_GAMES, ...LOGIC_GAMES];

// Yardımcı fonksiyonlar
export const getGamesByCategory = (category: string) =>
  ALL_GAMES.filter((game) => game.category === category);

export const getGamesByGrade = (grade: number) =>
  ALL_GAMES.filter((game) => game.grade === grade || game.grade === 0);

export const getGameById = (id: string) => ALL_GAMES.find((game) => game.id === id);

export const getGamesBySubcategory = (category: string, subcategory: string) =>
  ALL_GAMES.filter((game) => game.category === category && game.subcategory === subcategory);
