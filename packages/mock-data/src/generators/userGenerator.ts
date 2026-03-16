/**
 * User Data Generator
 * Kullanıcı mock data üreteci
 */

import type { User, Student, UserRole, Gender } from '../contracts/user';

const firstNames = {
  male: [
    'Ahmet',
    'Mehmet',
    'Mustafa',
    'Ali',
    'Hasan',
    'Hüseyin',
    'İbrahim',
    'Yusuf',
    'Emre',
    'Can',
  ],
  female: [
    'Ayşe',
    'Fatma',
    'Zeynep',
    'Elif',
    'Emine',
    'Hatice',
    'Merve',
    'Selin',
    'Deniz',
    'Büşra',
  ],
};

const lastNames = [
  'Yılmaz',
  'Kaya',
  'Demir',
  'Çelik',
  'Şahin',
  'Yıldız',
  'Öztürk',
  'Aydın',
  'Arslan',
  'Koç',
];

/**
 * Rastgele isim üretir
 */
function generateRandomName(gender: Gender): { firstName: string; lastName: string } {
  const genderKey = gender === 'male' || gender === 'female' ? gender : 'male';
  const firstName = firstNames[genderKey][Math.floor(Math.random() * firstNames[genderKey].length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return { firstName, lastName };
}

/**
 * Rastgele email üretir
 */
function generateEmail(firstName: string, lastName: string): string {
  const normalized = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  const random = Math.floor(Math.random() * 1000);
  return `${normalized}${random}@example.com`;
}

/**
 * Rastgele username üretir
 */
function generateUsername(firstName: string, lastName: string): string {
  const normalized = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
  const random = Math.floor(Math.random() * 1000);
  return `${normalized}${random}`;
}

/**
 * Rastgele doğum tarihi üretir
 */
function generateBirthDate(minAge: number = 6, maxAge: number = 12): Date {
  const now = new Date();
  const age = minAge + Math.floor(Math.random() * (maxAge - minAge + 1));
  const year = now.getFullYear() - age;
  const month = Math.floor(Math.random() * 12);
  const day = Math.floor(Math.random() * 28) + 1;
  return new Date(year, month, day);
}

/**
 * Mock kullanıcı üretir
 */
export function generateMockUser(
  role: UserRole = 'student',
  options: {
    gender?: Gender;
    gradeLevel?: number;
    schoolId?: string;
    classroomId?: string;
  } = {}
): User {
  const gender = options.gender || (Math.random() > 0.5 ? 'male' : 'female');
  const { firstName, lastName } = generateRandomName(gender);
  const id = `${role}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const baseUser: User = {
    id,
    username: generateUsername(firstName, lastName),
    email: generateEmail(firstName, lastName),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    avatar: `/avatars/${role}-${Math.floor(Math.random() * 10) + 1}.png`,
    role,
    gender,
    birthDate: generateBirthDate(),
    isActive: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date(),
  };

  if (role === 'student') {
    return {
      ...baseUser,
      gradeLevel: options.gradeLevel || Math.floor(Math.random() * 8) + 1,
      schoolId: options.schoolId || 'school-1',
      classroomId: options.classroomId || 'classroom-1',
    };
  }

  return baseUser;
}

/**
 * Birden fazla mock kullanıcı üretir
 */
export function generateMockUsers(count: number, role: UserRole = 'student'): User[] {
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    users.push(generateMockUser(role));
  }
  return users;
}

/**
 * Mock öğrenci üretir
 */
export function generateMockStudent(
  gradeLevel: number = 3,
  schoolId: string = 'school-1',
  classroomId: string = 'classroom-1'
): Student {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const { firstName, lastName } = generateRandomName(gender);
  const id = `student-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  return {
    id,
    username: generateUsername(firstName, lastName),
    email: generateEmail(firstName, lastName),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    avatar: `/avatars/student-${Math.floor(Math.random() * 10) + 1}.png`,
    role: 'student',
    gender,
    birthDate: generateBirthDate(6, 14),
    gradeLevel,
    schoolId,
    classroomId,
    teacherIds: [],
    totalScore: Math.floor(Math.random() * 20000),
    totalStars: Math.floor(Math.random() * 300),
    gamesPlayed: Math.floor(Math.random() * 200),
    achievements: [],
    favoriteGames: [],
    isActive: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date(),
  };
}

/**
 * Birden fazla mock öğrenci üretir
 */
export function generateMockStudents(
  count: number,
  gradeLevel?: number,
  schoolId?: string,
  classroomId?: string
): Student[] {
  const students: Student[] = [];
  for (let i = 0; i < count; i++) {
    students.push(generateMockStudent(gradeLevel, schoolId, classroomId));
  }
  return students;
}
