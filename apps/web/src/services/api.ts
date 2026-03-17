import axios from 'axios';
import type { Game, Category, User } from '@egitim-galaksisi/shared';
import {
  mockCategories,
  mockGames,
  mockUsers,
  mockLeaderboard,
  mockDashboardStats,
  mockNotifications,
  mockDelay,
} from './mockData';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// Request interceptor — attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle 401 + extract data
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      // Try refresh token
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken && !error.config._retry) {
        error.config._retry = true;
        try {
          const res = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });
          const { token, refreshToken: newRefresh } = res.data.data;
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', newRefresh);
          error.config.headers.Authorization = `Bearer ${token}`;
          return api(error.config);
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default api;

// ─── Auth ────────────────────────────────────────────────
export const authAPI = {
  register: async (data: {
    email: string;
    password: string;
    name: string;
    role?: string;
    gradeLevel?: number;
    schoolCode?: string;
  }) => {
    if (USE_MOCK) {
      await mockDelay();
      const newUser = {
        id: String(mockUsers.length + 1),
        email: data.email,
        name: data.name,
        role: (data.role || 'STUDENT') as any,
        gradeLevel: data.gradeLevel || 1,
        stars: 0,
        xp: 0,
        level: 1,
        avatar: '👤',
        solvedProblems: 0,
        streakDays: 0,
        schoolId: 'school-1',
        school: { id: 'school-1', name: 'Özel Edirne Koleji', code: 'OEK2024' },
      };
      mockUsers.push(newUser);
      return {
        success: true,
        data: {
          user: newUser,
          token: 'mock-jwt-token-' + newUser.id,
          refreshToken: 'mock-refresh-token-' + newUser.id,
        },
      };
    }
    return api.post('/auth/register', data);
  },
  login: async (email: string, password: string) => {
    if (USE_MOCK) {
      await mockDelay();
      const user = mockUsers.find((u) => u.email === email);
      if (!user) {
        throw { error: 'Kullanıcı bulunamadı' };
      }
      // Mock password check - accept any password for demo
      const response = {
        success: true,
        data: {
          user,
          token: 'mock-jwt-token-' + user.id,
          refreshToken: 'mock-refresh-token-' + user.id,
        },
      };
      return response;
    }
    return api.post('/auth/login', { email, password });
  },
  me: async () => {
    if (USE_MOCK) {
      await mockDelay();
      const token = localStorage.getItem('token');
      if (!token || !token.startsWith('mock-jwt-token-')) {
        throw { error: 'Token bulunamadı' };
      }
      const userId = token.replace('mock-jwt-token-', '');
      const user = mockUsers.find((u) => u.id === userId) || mockUsers[0];
      return {
        success: true,
        data: user,
      };
    }
    return api.get('/auth/me');
  },
  getMe: async () => {
    if (USE_MOCK) {
      await mockDelay();
      const token = localStorage.getItem('token');
      if (!token || !token.startsWith('mock-jwt-token-')) {
        throw { error: 'Token bulunamadı' };
      }
      const userId = token.replace('mock-jwt-token-', '');
      const user = mockUsers.find((u) => u.id === userId) || mockUsers[0];
      return {
        success: true,
        data: user,
      };
    }
    return api.get('/auth/me');
  },
  refresh: (refreshToken: string) => api.post('/auth/refresh', { refreshToken }),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put('/auth/change-password', data),
};

// ─── Users ───────────────────────────────────────────────
export const userAPI = {
  updateProfile: (data: { name?: string; avatar?: string; gradeLevel?: number }) =>
    api.put('/users/profile', data),
  getDashboard: () => api.get('/users/dashboard'),
  getStats: (id: string) => api.get(`/users/${id}/stats`),
  getChildren: () => api.get('/users/children'),
  linkParent: (parentEmail: string) => api.post('/users/link-parent', { parentEmail }),
  listUsers: (params?: { schoolId?: string; role?: string; page?: number; limit?: number }) =>
    api.get('/users/list', { params }),
};

// ─── Sessions ────────────────────────────────────────────
export const sessionAPI = {
  create: (data: any) => api.post('/sessions', data),
  list: (limit?: number) => api.get('/sessions', { params: { limit } }),
};

// ─── Leaderboard ─────────────────────────────────────────
export const leaderboardAPI = {
  general: (params?: { schoolId?: string; grade?: number; limit?: number }) =>
    api.get('/leaderboard', { params }),
  weekly: (limit?: number) => api.get('/leaderboard/weekly', { params: { limit } }),
  byGame: (gameMode: string) => api.get(`/leaderboard/by-game/${gameMode}`),
  classroom: (id: string) => api.get(`/leaderboard/classroom/${id}`),
};

// ─── Questions ───────────────────────────────────────────
export const questionAPI = {
  list: (params?: any) => api.get('/questions', { params }),
  getNext: (data: {
    subjectId?: string;
    topicId?: string;
    difficulty?: string;
    gradeLevel?: number;
    count?: number;
  }) => api.post('/questions/next', data),
  create: (data: any) => api.post('/questions', data),
  bulkCreate: (data: { questions: any[]; setName?: string }) => api.post('/questions/bulk', data),
  answer: (id: string, isCorrect: boolean) => api.post(`/questions/${id}/answer`, { isCorrect }),
  generate: (data: any) => api.post('/ai/questions', data),
};

// ─── Curriculum ──────────────────────────────────────────
export const curriculumAPI = {
  subjects: (grade?: number) => api.get('/curriculum/subjects', { params: { grade } }),
  topics: (subjectId: string, grade?: number) =>
    api.get('/curriculum/topics', { params: { subjectId, grade } }),
  subtopics: (topicId: string) => api.get('/curriculum/subtopics', { params: { topicId } }),
  tree: (grade?: number) => api.get('/curriculum/tree', { params: { grade } }),
  createSubject: (data: any) => api.post('/curriculum/subjects', data),
  createTopic: (data: any) => api.post('/curriculum/topics', data),
  createSubTopic: (data: any) => api.post('/curriculum/subtopics', data),
};

// ─── Classrooms ──────────────────────────────────────────
export const classroomAPI = {
  list: () => api.get('/classrooms'),
  create: (data: { name: string; gradeLevel: number }) => api.post('/classrooms', data),
  addStudent: (id: string, studentEmail: string) =>
    api.post(`/classrooms/${id}/students`, { studentEmail }),
  removeStudent: (id: string, studentId: string) =>
    api.delete(`/classrooms/${id}/students/${studentId}`),
  getStats: (id: string) => api.get(`/classrooms/${id}/stats`),
};

// ─── Badges ──────────────────────────────────────────────
export const badgeAPI = {
  list: () => api.get('/badges'),
  my: () => api.get('/badges/my'),
  check: () => api.post('/badges/check'),
  create: (data: any) => api.post('/badges', data),
};

// ─── Notifications ───────────────────────────────────────
export const notificationAPI = {
  list: (limit?: number) => api.get('/notifications', { params: { limit } }),
  unreadCount: () => api.get('/notifications/unread-count'),
  markRead: (id: string) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
};

// ─── Schools ─────────────────────────────────────────────
export const schoolAPI = {
  list: () => api.get('/schools'),
  get: (id: string) => api.get(`/schools/${id}`),
  getByCode: (code: string) => api.get(`/schools/code/${code}`),
  create: (data: any) => api.post('/schools', data),
  update: (id: string, data: any) => api.put(`/schools/${id}`, data),
};

// ─── Timetable ──────────────────────────────────────────
export const timetableAPI = {
  list: () => api.get('/timetable'),
  get: (id: string) => api.get(`/timetable/${id}`),
  create: (data: { name: string }) => api.post('/timetable', data),
  delete: (id: string) => api.delete(`/timetable/${id}`),
  getActive: () => api.get('/timetable/school/active'),
  addSlot: (id: string, data: any) => api.post(`/timetable/${id}/slots`, data),
  bulkSlots: (id: string, slots: any[]) => api.post(`/timetable/${id}/slots/bulk`, { slots }),
  deleteSlot: (id: string, slotId: string) => api.delete(`/timetable/${id}/slots/${slotId}`),
};

// ─── Duty Schedule ──────────────────────────────────────
export const dutyAPI = {
  list: () => api.get('/duty'),
  get: (id: string) => api.get(`/duty/${id}`),
  create: (data: { name: string; weekStart: string; weekEnd: string }) => api.post('/duty', data),
  delete: (id: string) => api.delete(`/duty/${id}`),
  getActive: () => api.get('/duty/school/active'),
  getTeachers: () => api.get('/duty/school/teachers'),
  addAssignment: (id: string, data: any) => api.post(`/duty/${id}/assignments`, data),
  bulkAssignments: (id: string, assignments: any[]) =>
    api.post(`/duty/${id}/assignments/bulk`, { assignments }),
  deleteAssignment: (id: string, assignmentId: string) =>
    api.delete(`/duty/${id}/assignments/${assignmentId}`),
};

// ─── Analytics ──────────────────────────────────────────
export const analyticsAPI = {
  student: (id: string) => api.get(`/analytics/student/${id}`),
  classroom: (id: string) => api.get(`/analytics/classroom/${id}`),
  school: () => api.get('/analytics/school'),
};

// ─── Audit Log ──────────────────────────────────────────
export const auditAPI = {
  list: (params?: { page?: number; limit?: number; action?: string; entity?: string }) =>
    api.get('/audit', { params }),
  create: (data: { action: string; entity: string; entityId?: string; details?: any }) =>
    api.post('/audit', data),
};

// ─── Assignments ─────────────────────────────────────────
export const assignmentAPI = {
  list: () => api.get('/assignments'),
  get: (id: string) => api.get(`/assignments/${id}`),
  create: (data: any) => api.post('/assignments', data),
  submit: (id: string, data: { score: number; correctAnswers: number; totalQuestions: number }) =>
    api.post(`/assignments/${id}/submit`, data),
  delete: (id: string) => api.delete(`/assignments/${id}`),
};

// ─── Messages ────────────────────────────────────────────
export const messageAPI = {
  conversations: () => api.get('/messages'),
  getThread: (userId: string) => api.get(`/messages/${userId}`),
  send: (userId: string, content: string) => api.post(`/messages/${userId}`, { content }),
  teachers: () => api.get('/messages/contacts/teachers'),
  unreadCount: () => api.get('/messages/unread/count'),
};

// ─── Exams ───────────────────────────────────────────────
export const examAPI = {
  list: () => api.get('/exams'),
  get: (id: string) => api.get(`/exams/${id}`),
  create: (data: any) => api.post('/exams', data),
  start: (id: string) => api.post(`/exams/${id}/start`, {}),
  submit: (id: string, answers: { questionId: string; answer: string }[]) =>
    api.post(`/exams/${id}/submit`, { answers }),
  results: (id: string) => api.get(`/exams/${id}/results`),
  publish: (id: string, isPublished: boolean) => api.patch(`/exams/${id}/publish`, { isPublished }),
  delete: (id: string) => api.delete(`/exams/${id}`),
};

// ─── Games ───────────────────────────────────────────────
export const gameAPI = {
  categories: async () => {
    if (USE_MOCK) {
      await mockDelay();
      return { success: true, data: mockCategories };
    }
    return api.get('/games/categories');
  },
  getCategoryById: async (id: string) => {
    if (USE_MOCK) {
      await mockDelay();
      const category = mockCategories.find((c) => c.id === id);
      return { success: true, data: category };
    }
    return api.get(`/games/categories/${id}`);
  },
  games: async (params?: {
    categoryId?: string;
    gradeLevel?: number;
    difficulty?: string;
    featured?: boolean;
  }) => {
    if (USE_MOCK) {
      await mockDelay();
      let filtered = [...mockGames];
      if (params?.categoryId) {
        filtered = filtered.filter((g) => g.categoryId === params.categoryId);
      }
      if (params?.gradeLevel) {
        filtered = filtered.filter(
          (g) => g.gradeMin <= params.gradeLevel! && g.gradeMax >= params.gradeLevel!
        );
      }
      if (params?.difficulty) {
        filtered = filtered.filter((g) => g.difficulty === params.difficulty);
      }
      if (params?.featured) {
        filtered = filtered.filter((g) => g.isFeatured);
      }
      return { success: true, data: filtered };
    }
    return api.get('/games', { params });
  },
  getGame: async (id: string) => {
    if (USE_MOCK) {
      await mockDelay();
      const game = mockGames.find((g) => g.id === id);
      return { success: true, data: game };
    }
    return api.get(`/games/${id}`);
  },
  getContent: async (id: string, type?: string) => {
    if (USE_MOCK) {
      await mockDelay();
      return { success: true, data: { questions: [] } };
    }
    return api.get(`/games/${id}/content`, { params: { type } });
  },
  play: async (id: string) => {
    if (USE_MOCK) {
      await mockDelay(200);
      return { success: true, data: { message: 'Play count updated' } };
    }
    return api.post(`/games/${id}/play`, {});
  },
  createCategory: (data: any) => api.post('/games/categories', data),
  updateCategory: (id: string, data: any) => api.put(`/games/categories/${id}`, data),
  deleteCategory: (id: string) => api.delete(`/games/categories/${id}`),
  createGame: (data: any) => api.post('/games', data),
  updateGame: (id: string, data: any) => api.put(`/games/${id}`, data),
  deleteGame: (id: string) => api.delete(`/games/${id}`),
};
