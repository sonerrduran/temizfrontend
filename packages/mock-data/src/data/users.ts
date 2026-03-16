/**
 * Mock User Data
 * Kullanıcılar için mock data
 */

import type { User, Student, Teacher, Parent, Admin, UserRole } from '../contracts/user';

/**
 * Mock passwords (sadece development için!)
 * Production'da asla böyle yapılmamalı!
 */
export const mockPasswords: Record<string, string> = {
  'ahmet@example.com': '123456',
  'ayse@example.com': '123456',
  'mehmet@example.com': '123456',
  'zeynep.ozturk@school.com': 'teacher123',
  'ali.celik@school.com': 'teacher123',
  'fatma.yildirim@school.com': 'teacher123',
  'mustafa.yilmaz@example.com': 'parent123',
  'emine.demir@example.com': 'parent123',
  'hasan.kaya@example.com': 'parent123',
  'admin@egitimgalaksisi.com': 'admin123',
};

export const mockStudents: Student[] = [
  {
    id: 'student-1',
    username: 'ahmet_yilmaz',
    email: 'ahmet@example.com',
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    fullName: 'Ahmet Yılmaz',
    avatar: '/avatars/student-1.png',
    role: 'student',
    gender: 'male',
    birthDate: new Date('2015-03-15'),
    gradeLevel: 3,
    schoolId: 'school-1',
    classroomId: 'classroom-1',
    parentId: 'parent-1',
    teacherIds: ['teacher-1', 'teacher-2'],
    totalScore: 15420,
    totalStars: 234,
    gamesPlayed: 156,
    achievements: ['first-game', 'math-master', 'speed-reader'],
    favoriteGames: ['game-math-addition', 'game-memory-cards'],
    isActive: true,
    isVerified: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-03-15'),
    lastLoginAt: new Date('2024-03-15'),
  },
  {
    id: 'student-2',
    username: 'ayse_demir',
    email: 'ayse@example.com',
    firstName: 'Ayşe',
    lastName: 'Demir',
    fullName: 'Ayşe Demir',
    avatar: '/avatars/student-2.png',
    role: 'student',
    gender: 'female',
    birthDate: new Date('2014-07-22'),
    gradeLevel: 4,
    schoolId: 'school-1',
    classroomId: 'classroom-2',
    parentId: 'parent-2',
    teacherIds: ['teacher-1', 'teacher-3'],
    totalScore: 18950,
    totalStars: 287,
    gamesPlayed: 203,
    achievements: ['first-game', 'math-master', 'language-expert', 'perfect-score'],
    favoriteGames: ['game-lang-vocabulary', 'game-math-multiplication'],
    isActive: true,
    isVerified: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-03-15'),
    lastLoginAt: new Date('2024-03-15'),
  },
  {
    id: 'student-3',
    username: 'mehmet_kaya',
    email: 'mehmet@example.com',
    firstName: 'Mehmet',
    lastName: 'Kaya',
    fullName: 'Mehmet Kaya',
    avatar: '/avatars/student-3.png',
    role: 'student',
    gender: 'male',
    birthDate: new Date('2016-11-08'),
    gradeLevel: 2,
    schoolId: 'school-1',
    classroomId: 'classroom-3',
    parentId: 'parent-3',
    teacherIds: ['teacher-2'],
    totalScore: 9870,
    totalStars: 145,
    gamesPlayed: 98,
    achievements: ['first-game', 'memory-champion'],
    favoriteGames: ['game-memory-cards', 'game-logic-puzzle'],
    isActive: true,
    isVerified: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-14'),
    lastLoginAt: new Date('2024-03-14'),
  },
];

export const mockTeachers: Teacher[] = [
  {
    id: 'teacher-1',
    username: 'zeynep_ozturk',
    email: 'zeynep.ozturk@school.com',
    firstName: 'Zeynep',
    lastName: 'Öztürk',
    fullName: 'Zeynep Öztürk',
    avatar: '/avatars/teacher-1.png',
    role: 'teacher',
    gender: 'female',
    birthDate: new Date('1985-05-12'),
    schoolId: 'school-1',
    classroomIds: ['classroom-1', 'classroom-2'],
    studentIds: ['student-1', 'student-2'],
    subjects: ['Matematik', 'Fen Bilimleri'],
    bio: '15 yıllık deneyimli matematik öğretmeni',
    isActive: true,
    isVerified: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-03-10'),
    lastLoginAt: new Date('2024-03-15'),
  },
  {
    id: 'teacher-2',
    username: 'ali_celik',
    email: 'ali.celik@school.com',
    firstName: 'Ali',
    lastName: 'Çelik',
    fullName: 'Ali Çelik',
    avatar: '/avatars/teacher-2.png',
    role: 'teacher',
    gender: 'male',
    birthDate: new Date('1990-09-20'),
    schoolId: 'school-1',
    classroomIds: ['classroom-3'],
    studentIds: ['student-3'],
    subjects: ['Türkçe', 'Sosyal Bilgiler'],
    bio: '8 yıllık deneyimli Türkçe öğretmeni',
    isActive: true,
    isVerified: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-03-10'),
    lastLoginAt: new Date('2024-03-15'),
  },
  {
    id: 'teacher-3',
    username: 'fatma_yildirim',
    email: 'fatma.yildirim@school.com',
    firstName: 'Fatma',
    lastName: 'Yıldırım',
    fullName: 'Fatma Yıldırım',
    avatar: '/avatars/teacher-3.png',
    role: 'teacher',
    gender: 'female',
    birthDate: new Date('1988-03-18'),
    schoolId: 'school-1',
    classroomIds: ['classroom-2'],
    studentIds: ['student-2'],
    subjects: ['İngilizce'],
    bio: '10 yıllık deneyimli İngilizce öğretmeni',
    isActive: true,
    isVerified: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-03-10'),
    lastLoginAt: new Date('2024-03-14'),
  },
];

export const mockParents: Parent[] = [
  {
    id: 'parent-1',
    username: 'mustafa_yilmaz',
    email: 'mustafa.yilmaz@example.com',
    firstName: 'Mustafa',
    lastName: 'Yılmaz',
    fullName: 'Mustafa Yılmaz',
    avatar: '/avatars/parent-1.png',
    role: 'parent',
    gender: 'male',
    childrenIds: ['student-1'],
    phone: '+90 555 123 4567',
    isActive: true,
    isVerified: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-03-10'),
    lastLoginAt: new Date('2024-03-14'),
  },
  {
    id: 'parent-2',
    username: 'emine_demir',
    email: 'emine.demir@example.com',
    firstName: 'Emine',
    lastName: 'Demir',
    fullName: 'Emine Demir',
    avatar: '/avatars/parent-2.png',
    role: 'parent',
    gender: 'female',
    childrenIds: ['student-2'],
    phone: '+90 555 234 5678',
    isActive: true,
    isVerified: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-03-10'),
    lastLoginAt: new Date('2024-03-15'),
  },
  {
    id: 'parent-3',
    username: 'hasan_kaya',
    email: 'hasan.kaya@example.com',
    firstName: 'Hasan',
    lastName: 'Kaya',
    fullName: 'Hasan Kaya',
    avatar: '/avatars/parent-3.png',
    role: 'parent',
    gender: 'male',
    childrenIds: ['student-3'],
    phone: '+90 555 345 6789',
    isActive: true,
    isVerified: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-10'),
    lastLoginAt: new Date('2024-03-13'),
  },
];

export const mockAdmins: Admin[] = [
  {
    id: 'admin-1',
    username: 'admin',
    email: 'admin@egitimgalaksisi.com',
    firstName: 'Admin',
    lastName: 'User',
    fullName: 'Admin User',
    avatar: '/avatars/admin-1.png',
    role: 'admin',
    schoolId: 'school-1',
    permissions: ['all'],
    isActive: true,
    isVerified: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-10'),
    lastLoginAt: new Date('2024-03-15'),
  },
];

export const mockUsers: User[] = [...mockStudents, ...mockTeachers, ...mockParents, ...mockAdmins];

/**
 * Role'e göre kullanıcıları filtreler
 */
export function getUsersByRole(role: UserRole): User[] {
  return mockUsers.filter((user) => user.role === role);
}

/**
 * ID'ye göre kullanıcı bulur
 */
export function getUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id);
}

/**
 * Email'e göre kullanıcı bulur
 */
export function getUserByEmail(email: string): User | undefined {
  return mockUsers.find((user) => user.email === email);
}

/**
 * Username'e göre kullanıcı bulur
 */
export function getUserByUsername(username: string): User | undefined {
  return mockUsers.find((user) => user.username === username);
}

/**
 * Okula göre öğrencileri filtreler
 */
export function getStudentsBySchool(schoolId: string): Student[] {
  return mockStudents.filter((student) => student.schoolId === schoolId);
}

/**
 * Sınıfa göre öğrencileri filtreler
 */
export function getStudentsByClassroom(classroomId: string): Student[] {
  return mockStudents.filter((student) => student.classroomId === classroomId);
}

/**
 * Öğretmene göre öğrencileri filtreler
 */
export function getStudentsByTeacher(teacherId: string): Student[] {
  return mockStudents.filter((student) => student.teacherIds.includes(teacherId));
}

/**
 * Veliye göre öğrencileri filtreler
 */
export function getStudentsByParent(parentId: string): Student[] {
  return mockStudents.filter((student) => student.parentId === parentId);
}

/**
 * Login fonksiyonu - email ve password ile giriş
 */
export function loginUser(email: string, password: string): User | null {
  const user = getUserByEmail(email);
  if (!user) {
    return null;
  }

  // Password kontrolü
  if (mockPasswords[email] === password) {
    return user;
  }

  return null;
}
