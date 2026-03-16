/**
 * Akademik Dersler Konfigürasyonu
 */

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  grades: number[];
  path: string;
}

export const SUBJECTS: Subject[] = [
  {
    id: 'math',
    name: 'Matematik',
    icon: '🔢',
    color: '#3b82f6',
    gradient: 'from-blue-400 to-blue-600',
    description: 'Sayılar, işlemler ve problem çözme',
    grades: [1, 2, 3, 4, 5, 6, 7, 8],
    path: '/academic/math',
  },
  {
    id: 'turkish',
    name: 'Türkçe',
    icon: '📚',
    color: '#ef4444',
    gradient: 'from-red-400 to-red-600',
    description: 'Okuma, yazma ve dil bilgisi',
    grades: [1, 2, 3, 4, 5, 6, 7, 8],
    path: '/academic/turkish',
  },
  {
    id: 'life-science',
    name: 'Hayat Bilgisi',
    icon: '🌱',
    color: '#10b981',
    gradient: 'from-green-400 to-green-600',
    description: 'Çevremiz ve yaşam becerileri',
    grades: [1, 2, 3],
    path: '/academic/life-science',
  },
  {
    id: 'science',
    name: 'Fen Bilgisi',
    icon: '🔬',
    color: '#8b5cf6',
    gradient: 'from-purple-400 to-purple-600',
    description: 'Canlılar, madde ve enerji',
    grades: [3, 4, 5, 6, 7, 8],
    path: '/academic/science',
  },
  {
    id: 'english',
    name: 'İngilizce',
    icon: '🇬🇧',
    color: '#f59e0b',
    gradient: 'from-orange-400 to-orange-600',
    description: 'İngilizce dil becerileri',
    grades: [2, 3, 4, 5, 6, 7, 8],
    path: '/academic/english',
  },
  {
    id: 'german',
    name: 'Almanca',
    icon: '🇩🇪',
    color: '#ec4899',
    gradient: 'from-pink-400 to-pink-600',
    description: 'Almanca dil becerileri',
    grades: [4, 5, 6, 7, 8],
    path: '/academic/german',
  },
  {
    id: 'social-studies',
    name: 'Sosyal Bilgiler',
    icon: '🌍',
    color: '#06b6d4',
    gradient: 'from-cyan-400 to-cyan-600',
    description: 'Tarih, coğrafya ve vatandaşlık',
    grades: [4, 5, 6, 7],
    path: '/academic/social-studies',
  },
  {
    id: 'religion',
    name: 'Din Kültürü ve Ahlak Bilgisi',
    icon: '☪️',
    color: '#84cc16',
    gradient: 'from-lime-400 to-lime-600',
    description: 'İnanç, ibadet ve ahlak',
    grades: [4, 5, 6, 7, 8],
    path: '/academic/religion',
  },
  {
    id: 'music',
    name: 'Müzik',
    icon: '🎵',
    color: '#a855f7',
    gradient: 'from-violet-400 to-violet-600',
    description: 'Nota, ritim ve şarkı',
    grades: [1, 2, 3, 4, 5, 6, 7, 8],
    path: '/academic/music',
  },
  {
    id: 'physical-education',
    name: 'Beden Eğitimi',
    icon: '⚽',
    color: '#14b8a6',
    gradient: 'from-teal-400 to-teal-600',
    description: 'Spor, oyun ve sağlık',
    grades: [1, 2, 3, 4, 5, 6, 7, 8],
    path: '/academic/physical-education',
  },
  {
    id: 'visual-arts',
    name: 'Görsel Sanatlar',
    icon: '🎨',
    color: '#f97316',
    gradient: 'from-orange-400 to-red-500',
    description: 'Resim, tasarım ve sanat',
    grades: [1, 2, 3, 4, 5, 6, 7, 8],
    path: '/academic/visual-arts',
  },
  {
    id: 'history',
    name: 'T.C. İnkılap Tarihi',
    icon: '🇹🇷',
    color: '#dc2626',
    gradient: 'from-red-500 to-red-700',
    description: 'Kurtuluş Savaşı ve Atatürk',
    grades: [8],
    path: '/academic/history',
  },
  {
    id: 'informatics',
    name: 'Bilişim Teknolojileri',
    icon: '💻',
    color: '#6366f1',
    gradient: 'from-indigo-400 to-indigo-600',
    description: 'Kodlama ve dijital beceriler',
    grades: [5, 6, 7, 8],
    path: '/academic/informatics',
  },
];

/**
 * Sınıfa göre dersleri filtrele
 */
export const getSubjectsByGrade = (grade: number): Subject[] => {
  return SUBJECTS.filter((subject) => subject.grades.includes(grade));
};

/**
 * ID'ye göre ders bul
 */
export const getSubjectById = (id: string): Subject | undefined => {
  return SUBJECTS.find((subject) => subject.id === id);
};

/**
 * Ders rengini al
 */
export const getSubjectColor = (id: string): string => {
  const subject = getSubjectById(id);
  return subject?.color || '#6b7280';
};

/**
 * Ders gradientini al
 */
export const getSubjectGradient = (id: string): string => {
  const subject = getSubjectById(id);
  return subject?.gradient || 'from-gray-400 to-gray-600';
};
