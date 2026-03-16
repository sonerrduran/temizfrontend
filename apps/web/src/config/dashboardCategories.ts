// Dashboard kategorileri ve kartları için merkezi konfigürasyon

export interface DashboardCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  path: string;
  minGrade?: number; // Minimum sınıf seviyesi
  comingSoon?: boolean;
}

export interface DashboardCategory {
  id: string;
  title: string;
  icon: string;
  cards: DashboardCard[];
}

// Yaşam Becerileri Kartları
export const LIFE_SKILLS_CARDS: DashboardCard[] = [
  {
    id: 'traffic',
    title: 'Trafik Güvenliği',
    description: 'Yaya ve araç güvenliği kurallarını öğren!',
    icon: '🚦',
    gradient: 'from-red-500 to-orange-600',
    path: '/life-skills/traffic'
  },
  {
    id: 'hygiene',
    title: 'Hijyen',
    description: 'Temizlik ve sağlık alışkanlıklarını keşfet!',
    icon: '🧼',
    gradient: 'from-blue-500 to-cyan-600',
    path: '/life-skills/hygiene'
  },
  {
    id: 'first-aid',
    title: 'İlk Yardım',
    description: 'Temel ilk yardım bilgilerini öğren!',
    icon: '🏥',
    gradient: 'from-green-500 to-emerald-600',
    path: '/life-skills/first-aid'
  },
  {
    id: 'nutrition',
    title: 'Beslenme',
    description: 'Sağlıklı beslenme alışkanlıklarını öğren!',
    icon: '🥗',
    gradient: 'from-yellow-500 to-orange-600',
    path: '/life-skills/nutrition'
  },
  {
    id: 'environment',
    title: 'Çevre Bilinci',
    description: 'Doğayı koruma ve geri dönüşümü öğren!',
    icon: '🌍',
    gradient: 'from-green-600 to-teal-600',
    path: '/life-skills/environment'
  },
  {
    id: 'financial',
    title: 'Finansal Okuryazarlık',
    description: 'Para yönetimi ve tasarruf becerilerini öğren!',
    icon: '💰',
    gradient: 'from-purple-500 to-pink-600',
    path: '/life-skills/financial'
  },
  {
    id: 'digital',
    title: 'Dijital Okuryazarlık',
    description: 'İnternet ve teknoloji kullanımını öğren!',
    icon: '💻',
    gradient: 'from-indigo-500 to-blue-600',
    path: '/life-skills/digital'
  },
  {
    id: 'digital-security',
    title: 'Dijital Güvenlik',
    description: 'İnternet ve dijital dünyada güvende kal!',
    icon: '🔒',
    gradient: 'from-purple-600 to-indigo-700',
    path: '/life-skills/digital-security'
  },
  {
    id: 'digital-health',
    title: 'Dijital Sağlık',
    description: 'Ekran süresi dengesi ve sağlıklı teknoloji kullanımı!',
    icon: '📱',
    gradient: 'from-indigo-600 to-violet-700',
    path: '/life-skills/digital-health'
  },
  {
    id: 'social',
    title: 'Sosyal Beceriler',
    description: 'İletişim ve empati becerilerini geliştir!',
    icon: '🤝',
    gradient: 'from-pink-500 to-rose-600',
    path: '/life-skills/social'
  },
  {
    id: 'law',
    title: 'Temel Hukuk',
    description: 'Haklarını öğren, sorumluluklarını bil!',
    icon: '⚖️',
    gradient: 'from-slate-600 to-gray-700',
    path: '/life-skills/law',
    minGrade: 7
  }
];

// Zihinsel Gelişim Kartları
export const MENTAL_DEVELOPMENT_CARDS: DashboardCard[] = [
  {
    id: 'fast-reading',
    title: 'Hızlı Okuma',
    description: 'Okuma hızını ve odaklanmanı geliştir!',
    icon: '⚡',
    gradient: 'from-blue-500 to-indigo-600',
    path: '/games/fast-reading',
    comingSoon: true
  },
  {
    id: 'focus',
    title: 'Konsantrasyon',
    description: 'Odaklanma ve dikkatini zirveye taşı!',
    icon: '🧘',
    gradient: 'from-cyan-600 to-teal-700',
    path: '/games/focus',
    comingSoon: true
  },
  {
    id: 'learning',
    title: 'Hızlı Öğrenme',
    description: 'Öğrenme hızını ve tekniklerini keşfet!',
    icon: '🚀',
    gradient: 'from-amber-600 to-orange-700',
    path: '/games/learning',
    comingSoon: true
  }
];

// Dil ve İletişim Kartları
export const LANGUAGE_COMMUNICATION_CARDS: DashboardCard[] = [
  {
    id: 'stories',
    title: 'Hikayeler',
    description: 'Eğlenceli hikayeler oku ve dinle!',
    icon: '📖',
    gradient: 'from-rose-500 to-pink-600',
    path: '/games/stories',
    comingSoon: true
  },
  {
    id: 'language-games',
    title: 'Dil Oyunları',
    description: 'Kelime hazneni zenginleştir!',
    icon: '💬',
    gradient: 'from-purple-500 to-fuchsia-600',
    path: '/games/language'
  }
];

// Oyun ve Eğlence Kartları
export const FUN_GAMES_CARDS: DashboardCard[] = [
  {
    id: 'puzzles',
    title: 'Bulmacalar',
    description: 'Zeka oyunları ve bulmacalar çöz!',
    icon: '🧩',
    gradient: 'from-green-500 to-emerald-600',
    path: '/games/logic'
  },
  {
    id: 'memory',
    title: 'Hafıza Oyunları',
    description: 'Hafızanı güçlendir, eğlen!',
    icon: '🎴',
    gradient: 'from-blue-500 to-cyan-600',
    path: '/games/memory',
    comingSoon: true
  },
  {
    id: 'strategy',
    title: 'Strateji Oyunları',
    description: 'Düşün, planla ve kazan!',
    icon: '🎯',
    gradient: 'from-orange-500 to-red-600',
    path: '/games/strategy',
    comingSoon: true
  },
  {
    id: 'arcade',
    title: 'Arcade Oyunları',
    description: 'Klasik arcade oyunlarıyla eğlen!',
    icon: '🕹️',
    gradient: 'from-purple-500 to-pink-600',
    path: '/games/arcade',
    comingSoon: true
  }
];

// Tüm kategoriler
export const DASHBOARD_CATEGORIES: DashboardCategory[] = [
  {
    id: 'academic',
    title: 'Akademik Dersler',
    icon: '📚',
    cards: [] // SUBJECTS'ten gelecek
  },
  {
    id: 'life-skills',
    title: 'Yaşam Becerileri',
    icon: '🌟',
    cards: LIFE_SKILLS_CARDS
  },
  {
    id: 'mental-development',
    title: 'Zihinsel Gelişim',
    icon: '🧠',
    cards: MENTAL_DEVELOPMENT_CARDS
  },
  {
    id: 'language-communication',
    title: 'Dil ve İletişim',
    icon: '💬',
    cards: LANGUAGE_COMMUNICATION_CARDS
  },
  {
    id: 'fun-games',
    title: 'Oyun ve Eğlence',
    icon: '🎮',
    cards: FUN_GAMES_CARDS
  }
];
