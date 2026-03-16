/**
 * MERKEZI KATEGORİ AKTİVİTE TANIMLARI
 * 
 * Bu dosyadan tüm kategorilerin alt aktivitelerini yönetebilirsiniz.
 * Bir aktivite eklemek/çıkarmak/değiştirmek için sadece bu dosyayı düzenleyin.
 */

export interface Activity {
  id: string;
  title: string;
  icon: string;
  description: string;
}

/**
 * AKADEMİK DERSLER için aktiviteler
 * Matematik, Türkçe, İngilizce vb. tüm dersler bu yapıyı kullanır
 */
export const ACADEMIC_ACTIVITIES: Activity[] = [
  {
    id: 'learn',
    title: 'Öğren',
    icon: '📖',
    description: 'Konuları öğren ve anla'
  },
  {
    id: 'practice',
    title: 'Pratik Yap',
    icon: '✏️',
    description: 'Sorular çöz, pratik yap'
  },
  {
    id: 'playground',
    title: 'Oyun Alanı',
    icon: '🎮',
    description: 'Eğlenceli oyunlarla pekiştir'
  }
];

/**
 * YAŞAM BECERİLERİ için aktiviteler
 * Trafik, Hijyen, İlk Yardım vb. tüm yaşam becerileri bu yapıyı kullanır
 */
export const LIFE_SKILLS_ACTIVITIES: Activity[] = [
  {
    id: 'lessons',
    title: 'Dersler',
    icon: '📚',
    description: 'Temel bilgileri öğren'
  },
  {
    id: 'tests',
    title: 'Testler',
    icon: '📝',
    description: 'Bilgini test et'
  },
  {
    id: 'scenarios',
    title: 'Senaryolar',
    icon: '🎬',
    description: 'Gerçek durumları simüle et'
  },
  {
    id: 'games',
    title: 'Oyunlar',
    icon: '🎮',
    description: 'Eğlenceli oyunlarla öğren'
  }
];

/**
 * ZİHİNSEL GELİŞİM için aktiviteler
 * Hızlı Okuma, Konsantrasyon, Hızlı Öğrenme modülleri bu yapıyı kullanır
 */
export const MENTAL_DEVELOPMENT_ACTIVITIES: Activity[] = [
  {
    id: 'measurement',
    title: 'Ölçüm & Eğitim',
    icon: '📚',
    description: 'Seviyeni ölç ve teknikler öğren'
  },
  {
    id: 'exercises',
    title: 'Egzersizler',
    icon: '🧠',
    description: 'Zihinsel egzersizler yap'
  },
  {
    id: 'games',
    title: 'Oyunlar',
    icon: '🎯',
    description: 'Eğlenceli oyunlarla geliştir'
  }
];

/**
 * DİL VE İLETİŞİM için aktiviteler
 * Hikayeler, Dil Oyunları modülleri bu yapıyı kullanır
 */
export const LANGUAGE_COMMUNICATION_ACTIVITIES: Activity[] = [
  {
    id: 'daily-words',
    title: 'Günlük Kelimeler',
    icon: '📖',
    description: 'Sık kullanılan kelimeleri öğren'
  },
  {
    id: 'synonyms',
    title: 'Eş Anlamlılar',
    icon: '🔄',
    description: 'Eş anlamlı kelimeleri keşfet'
  },
  {
    id: 'antonyms',
    title: 'Zıt Anlamlılar',
    icon: '⚖️',
    description: 'Zıt anlamlı kelimeleri öğren'
  },
  {
    id: 'idioms',
    title: 'Deyimler',
    icon: '💬',
    description: 'Türkçe deyimleri öğren'
  },
  {
    id: 'proverbs',
    title: 'Atasözleri',
    icon: '🎓',
    description: 'Atasözlerini keşfet'
  },
  {
    id: 'metaphors',
    title: 'Mecaz Anlamlar',
    icon: '🎭',
    description: 'Mecaz anlamları öğren'
  },
  {
    id: 'word-games',
    title: 'Kelime Oyunları',
    icon: '🎮',
    description: 'Eğlenceli kelime oyunları'
  },
  {
    id: 'ai-quiz',
    title: 'AI Kelime Testi',
    icon: '🤖',
    description: 'Yapay zeka ile test çöz'
  },
  {
    id: 'dialogue',
    title: 'Diyalog Simülatörü',
    icon: '💭',
    description: 'Gerçek hayat senaryoları'
  }
];

/**
 * OYUN VE EĞLENCE için aktiviteler
 * Bulmacalar, Hafıza, Strateji, Arcade modülleri bu yapıyı kullanır
 */
export const FUN_GAMES_ACTIVITIES: Activity[] = [
  {
    id: 'sudoku',
    title: 'Sudoku',
    icon: '🔢',
    description: 'Sudoku bulmacaları çöz'
  },
  {
    id: 'puzzle',
    title: 'Puzzle',
    icon: '🧩',
    description: 'Puzzle oyunları'
  },
  {
    id: 'two-player',
    title: 'İki Kişilik',
    icon: '👥',
    description: 'Arkadaşınla oyna'
  }
];

/**
 * Kategori tipine göre aktiviteleri döndürür
 */
export function getActivitiesForCategory(category: 'academic' | 'life-skills' | 'mental-development' | 'language-communication' | 'fun-games'): Activity[] {
  switch (category) {
    case 'academic':
      return ACADEMIC_ACTIVITIES;
    case 'life-skills':
      return LIFE_SKILLS_ACTIVITIES;
    case 'mental-development':
      return MENTAL_DEVELOPMENT_ACTIVITIES;
    case 'language-communication':
      return LANGUAGE_COMMUNICATION_ACTIVITIES;
    case 'fun-games':
      return FUN_GAMES_ACTIVITIES;
    default:
      return [];
  }
}
