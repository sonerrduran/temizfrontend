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
    gradient: 'from-indigo-600 to-blue-700',
    description: 'Sayılar, işlemler ve problem çözme',
    grades: [1, 2, 3, 4, 5, 6, 7, 8],
    path: '/lessons/math',
  },
  {
    id: 'turkish',
    name: 'Türkçe',
    icon: '📚',
    color: '#ef4444',
    gradient: 'from-red-500 to-orange-600',
    description: 'Okuma, yazma ve dil bilgisi',
    grades: [1, 2, 3, 4, 5, 6, 7, 8],
    path: '/lessons/turkish',
  },
  {
    id: 'life-science',
    name: 'Hayat Bilgisi',
    icon: '🌱',
    color: '#10b981',
    gradient: 'from-lime-500 to-green-600',
    description: 'Çevremiz ve yaşam becerileri',
    grades: [1, 2, 3],
    path: '/lessons/life-science',
  },
  {
    id: 'science',
    name: 'Fen Bilgisi',
    icon: '🔬',
    color: '#8b5cf6',
    gradient: 'from-emerald-500 to-teal-700',
    description: 'Canlılar, madde ve enerji',
    grades: [3, 4, 5, 6, 7, 8],
    path: '/lessons/science',
  },
  {
    id: 'english',
    name: 'İngilizce',
    icon: '🇬🇧',
    color: '#f59e0b',
    gradient: 'from-violet-600 to-fuchsia-800',
    description: 'İngilizce dil becerileri',
    grades: [2, 3, 4, 5, 6, 7, 8],
    path: '/lessons/english',
  },
  {
    id: 'german',
    name: 'Almanca',
    icon: '🇩🇪',
    color: '#ec4899',
    gradient: 'from-yellow-500 to-amber-700',
    description: 'Almanca dil becerileri',
    grades: [4, 5, 6, 7, 8],
    path: '/lessons/german',
  },
  {
    id: 'social-studies',
    name: 'Sosyal Bilgiler',
    icon: '🌍',
    color: '#06b6d4',
    gradient: 'from-amber-500 to-yellow-600',
    description: 'Tarih, coğrafya ve vatandaşlık',
    grades: [4, 5, 6, 7],
    path: '/lessons/social-studies',
  },
  {
    id: 'religion',
    name: 'Din Kültürü ve Ahlak Bilgisi',
    icon: '☪️',
    color: '#84cc16',
    gradient: 'from-cyan-600 to-blue-800',
    description: 'İnanç, ibadet ve ahlak',
    grades: [4, 5, 6, 7, 8],
    path: '/lessons/religion',
  },
  {
    id: 'music',
    name: 'Müzik',
    icon: '🎵',
    color: '#a855f7',
    gradient: 'from-indigo-500 to-purple-600',
    description: 'Nota, ritim ve şarkı',
    grades: [1, 2, 3, 4, 5, 6, 7, 8],
    path: '/lessons/music',
  },
  {
    id: 'physical-education',
    name: 'Beden Eğitimi',
    icon: '⚽',
    color: '#14b8a6',
    gradient: 'from-orange-600 to-amber-700',
    description: 'Spor, oyun ve sağlık',
    grades: [1, 2, 3, 4, 5, 6, 7, 8],
    path: '/lessons/physical-education',
  },
  {
    id: 'visual-arts',
    name: 'Görsel Sanatlar',
    icon: '🎨',
    color: '#f97316',
    gradient: 'from-fuchsia-500 to-purple-700',
    description: 'Resim, tasarım ve sanat',
    grades: [1, 2, 3, 4, 5, 6, 7, 8],
    path: '/lessons/visual-arts',
  },
  {
    id: 'history',
    name: 'T.C. İnkılap Tarihi',
    icon: '🇹🇷',
    color: '#dc2626',
    gradient: 'from-red-600 to-red-800',
    description: 'Kurtuluş Savaşı ve Atatürk',
    grades: [8],
    path: '/lessons/history',
  },
  {
    id: 'informatics',
    name: 'Bilişim Teknolojileri',
    icon: '💻',
    color: '#6366f1',
    gradient: 'from-sky-500 to-blue-700',
    description: 'Kodlama ve dijital beceriler',
    grades: [5, 6, 7, 8],
    path: '/lessons/informatics',
  },
];

export const getSubjectsByGrade = (grade: number): Subject[] => {
  return SUBJECTS.filter((subject) => subject.grades.includes(grade));
};

export const getSubjectById = (id: string): Subject | undefined => {
  return SUBJECTS.find((subject) => subject.id === id);
};

export const getSubjectColor = (id: string): string => {
  const subject = getSubjectById(id);
  return subject?.color || '#6b7280';
};

export const getSubjectGradient = (id: string): string => {
  const subject = getSubjectById(id);
  return subject?.gradient || 'from-gray-400 to-gray-600';
};
