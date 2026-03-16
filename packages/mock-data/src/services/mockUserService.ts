/**
 * Mock User Service
 * Kullanıcı API'si için mock servis
 */

import type {
  User,
  UserRole,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateProfileRequest,
} from '../contracts/user';
import { mockUsers, getUserByEmail, getUserByUsername } from '../data/users';

/**
 * Simulated API delay
 */
function delay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Mock session token üretir
 */
function generateToken(): string {
  return `mock-token-${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

/**
 * Kullanıcı girişi
 */
export async function login(request: LoginRequest): Promise<LoginResponse> {
  await delay(800);

  const user = getUserByEmail(request.email);

  if (!user) {
    throw new Error('Kullanıcı bulunamadı');
  }

  // Mock password check (gerçek uygulamada hash karşılaştırması yapılacak)
  if (request.password !== 'password123') {
    throw new Error('Hatalı şifre');
  }

  return {
    user,
    session: {
      userId: user.id,
      token: generateToken(),
      refreshToken: generateToken(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 saat
      createdAt: new Date(),
    },
  };
}

/**
 * Kullanıcı kaydı
 */
export async function register(request: RegisterRequest): Promise<RegisterResponse> {
  await delay(1000);

  // Email kontrolü
  if (getUserByEmail(request.email)) {
    throw new Error('Bu email zaten kullanılıyor');
  }

  // Username kontrolü
  if (getUserByUsername(request.username)) {
    throw new Error('Bu kullanıcı adı zaten kullanılıyor');
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    username: request.username,
    email: request.email,
    firstName: request.firstName,
    lastName: request.lastName,
    fullName: `${request.firstName} ${request.lastName}`,
    role: request.role,
    gradeLevel: request.gradeLevel,
    birthDate: request.birthDate,
    isActive: true,
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  mockUsers.push(newUser);

  return {
    user: newUser,
    session: {
      userId: newUser.id,
      token: generateToken(),
      refreshToken: generateToken(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      createdAt: new Date(),
    },
  };
}

/**
 * Kullanıcı çıkışı
 */
export async function logout(userId: string): Promise<void> {
  await delay(200);
  // Mock logout - gerçek uygulamada session invalidate edilecek
}

/**
 * Kullanıcı bilgilerini getirir
 */
export async function getUser(userId: string): Promise<User | null> {
  await delay(300);
  return mockUsers.find((user) => user.id === userId) || null;
}

/**
 * Kullanıcı profilini günceller
 */
export async function updateProfile(userId: string, updates: UpdateProfileRequest): Promise<User> {
  await delay(600);

  const user = mockUsers.find((u) => u.id === userId);

  if (!user) {
    throw new Error('Kullanıcı bulunamadı');
  }

  if (updates.firstName) user.firstName = updates.firstName;
  if (updates.lastName) user.lastName = updates.lastName;
  if (updates.firstName || updates.lastName) {
    user.fullName = `${user.firstName} ${user.lastName}`;
  }
  if (updates.avatar) user.avatar = updates.avatar;

  user.updatedAt = new Date();

  return user;
}

/**
 * Role'e göre kullanıcıları getirir
 */
export async function getUsersByRole(role: UserRole): Promise<User[]> {
  await delay(400);
  return mockUsers.filter((user) => user.role === role);
}

/**
 * Kullanıcı arama
 */
export async function searchUsers(query: string): Promise<User[]> {
  await delay(500);
  const lowerQuery = query.toLowerCase();
  return mockUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(lowerQuery) ||
      user.fullName.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Şifre değiştirme
 */
export async function changePassword(
  userId: string,
  oldPassword: string,
  newPassword: string
): Promise<void> {
  await delay(600);

  // Mock password change
  if (oldPassword !== 'password123') {
    throw new Error('Mevcut şifre hatalı');
  }

  if (newPassword.length < 6) {
    throw new Error('Yeni şifre en az 6 karakter olmalı');
  }

  // Gerçek uygulamada şifre hash'lenip kaydedilecek
}

/**
 * Email doğrulama
 */
export async function verifyEmail(userId: string, token: string): Promise<void> {
  await delay(400);

  const user = mockUsers.find((u) => u.id === userId);

  if (!user) {
    throw new Error('Kullanıcı bulunamadı');
  }

  user.isVerified = true;
  user.updatedAt = new Date();
}
