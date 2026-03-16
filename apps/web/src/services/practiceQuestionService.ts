import { generateQuestions } from './geminiService';

// Topic mapping to Gemini mode
const topicToMode: Record<string, string> = {
  // Math topics
  numbers: 'MATH_NUMBERS',
  operations: 'MATH_OPERATIONS',
  geometry: 'MATH_GEOMETRY',
  data: 'MATH_DATA',

  // Turkish topics
  listening: 'TURKISH_LISTENING',
  speaking: 'TURKISH_SPEAKING',
  reading: 'TURKISH_READING',
  writing: 'TURKISH_WRITING',

  // Science topics
  life: 'SCIENCE_LIFE',
  matter: 'SCIENCE_MATTER',
  physical: 'SCIENCE_PHYSICAL',
  earth: 'SCIENCE_EARTH',

  // English topics (using general mode for now)
  communication: 'ENGLISH_COMMUNICATION',
  'daily-life': 'ENGLISH_DAILY_LIFE',
  grammar: 'ENGLISH_LANGUAGE_STRUCTURES',
  vocabulary: 'ENGLISH_EXPRESSIONS',

  // Social Studies topics
  history: 'SOCIAL_STUDIES',
  geography: 'SOCIAL_STUDIES',
  citizenship: 'SOCIAL_STUDIES',
  culture: 'SOCIAL_STUDIES',

  // Religion topics
  belief: 'RELIGION_BELIEF',
  worship: 'RELIGION_WORSHIP',
  prophet: 'RELIGION_PROPHET',
  quran: 'RELIGION_QURAN',
  morals: 'RELIGION_MORALS',

  // Life Science topics
  school: 'LIFE_SCIENCE_SCHOOL',
  home: 'LIFE_SCIENCE_HOME',
  health: 'LIFE_SCIENCE_HEALTH',
  safe: 'LIFE_SCIENCE_SAFE',
  country: 'LIFE_SCIENCE_COUNTRY',

  // Physical Education topics
  movement: 'PE_MOVEMENT',
  'healthy-life': 'PE_HEALTHY_LIFE',
  'social-emotional': 'PE_SOCIAL_EMOTIONAL',

  // Visual Arts topics
  'visual-communication': 'ART_VISUAL_COMMUNICATION',
  'cultural-heritage': 'ART_CULTURAL_HERITAGE',
  'criticism-aesthetics': 'ART_CRITICISM_AESTHETICS',

  // Music topics
  'music-theory': 'MUSIC',
  'music-practice': 'MUSIC',
  'music-culture': 'MUSIC',

  // IT Software topics
  algorithms: 'IT_SOFTWARE_ALGORITHMS',
  programming: 'IT_SOFTWARE_PROGRAMMING',
  'problem-solving': 'IT_SOFTWARE_PROBLEM_SOLVING',
  'computational-thinking': 'IT_SOFTWARE_COMPUTATIONAL_THINKING',

  // Chess topics
  'chess-basics': 'CHESS',
  'chess-tactics': 'CHESS',
  'chess-strategy': 'CHESS',
  'chess-endgame': 'CHESS',
};

// Difficulty mapping based on grade
const getDifficultyByGrade = (grade: number): string => {
  if (grade <= 2) return 'VERY_EASY';
  if (grade <= 4) return 'EASY';
  if (grade <= 6) return 'MEDIUM';
  if (grade <= 7) return 'HARD';
  return 'VERY_HARD';
};

export interface PracticeQuestion {
  text: string;
  options: string[];
  correctAnswer: string;
  type?: 'true-false' | 'fill-blank' | 'classic' | 'test';
}

/**
 * Get cache key for questions
 */
const getCacheKey = (grade: number, topic: string, questionType: string): string => {
  return `practice_${grade}_${topic}_${questionType}`;
};

/**
 * Get questions from cache
 */
const getFromCache = (cacheKey: string, count: number): PracticeQuestion[] | null => {
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const questions = JSON.parse(cached);
      if (Array.isArray(questions) && questions.length >= count) {
        console.log(`[PracticeCache] Serving ${count} questions from cache: ${cacheKey}`);
        return questions.slice(0, count);
      }
    }
  } catch (error) {
    console.warn('[PracticeCache] Failed to read cache:', error);
  }
  return null;
};

/**
 * Save questions to cache
 */
const saveToCache = (cacheKey: string, questions: PracticeQuestion[]): void => {
  try {
    localStorage.setItem(cacheKey, JSON.stringify(questions));
    console.log(`[PracticeCache] Saved ${questions.length} questions to cache: ${cacheKey}`);
  } catch (error) {
    console.warn('[PracticeCache] Failed to save cache:', error);
  }
};

/**
 * Fetch practice questions based on grade, topic, and question type
 * Uses cache first, then fetches from API if needed
 */
export const fetchPracticeQuestions = async (
  grade: number,
  topic: string,
  questionType: 'true-false' | 'fill-blank' | 'classic' | 'test',
  count: number = 10
): Promise<PracticeQuestion[]> => {
  const cacheKey = getCacheKey(grade, topic, questionType);

  // Try cache first
  const cachedQuestions = getFromCache(cacheKey, count);
  if (cachedQuestions) {
    return cachedQuestions;
  }

  // Cache miss - fetch from API
  console.log(`[PracticeCache] Cache miss for ${cacheKey}, fetching from API...`);

  const mode = topicToMode[topic] || 'MATH_NUMBERS';
  const difficulty = getDifficultyByGrade(grade);

  try {
    // Fetch more questions than needed for better caching
    const fetchCount = count * 3;
    const questions = await generateQuestions(mode, difficulty, grade, fetchCount);

    const formattedQuestions = questions.map((q: any) => ({
      text: q.text,
      options: q.options || [],
      correctAnswer: q.correctAnswer,
      type: questionType,
    }));

    // Save to cache
    if (formattedQuestions.length > 0) {
      saveToCache(cacheKey, formattedQuestions);
    }

    return formattedQuestions.slice(0, count);
  } catch (error) {
    console.error('[PracticeCache] Error fetching from API:', error);
    // Return fallback questions
    return generateFallbackQuestions(grade, topic, questionType, count);
  }
};

/**
 * Preload questions in background for better UX
 */
export const preloadQuestions = async (
  grade: number,
  topic: string,
  questionTypes: string[] = ['true-false', 'fill-blank', 'classic', 'test']
): Promise<void> => {
  console.log(`[PracticeCache] Preloading questions for grade ${grade}, topic ${topic}...`);

  const promises = questionTypes.map(async (type) => {
    const cacheKey = getCacheKey(grade, topic, type);
    const cached = getFromCache(cacheKey, 10);

    if (!cached) {
      // Cache miss - fetch in background
      await fetchPracticeQuestions(grade, topic, type as any, 10);
    }
  });

  await Promise.all(promises);
  console.log(`[PracticeCache] Preload complete for grade ${grade}, topic ${topic}`);
};

/**
 * Generate fallback questions when API fails
 */
const generateFallbackQuestions = (
  grade: number,
  topic: string,
  questionType: string,
  count: number
): PracticeQuestion[] => {
  const questions: PracticeQuestion[] = [];

  for (let i = 0; i < count; i++) {
    if (topic === 'operations') {
      const num1 = Math.floor(Math.random() * (10 * grade)) + 1;
      const num2 = Math.floor(Math.random() * (10 * grade)) + 1;
      const result = num1 + num2;

      questions.push({
        text: `${num1} + ${num2} = ?`,
        options: [
          result.toString(),
          (result + 1).toString(),
          (result - 1).toString(),
          (result + 2).toString(),
        ].sort(() => Math.random() - 0.5),
        correctAnswer: result.toString(),
        type: questionType as any,
      });
    } else if (topic === 'geometry') {
      const shapes = ['Üçgen', 'Kare', 'Dikdörtgen', 'Daire'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      questions.push({
        text: `${shape} kaç kenara sahiptir?`,
        options: ['3', '4', '0', '5'],
        correctAnswer: shape === 'Üçgen' ? '3' : shape === 'Daire' ? '0' : '4',
        type: questionType as any,
      });
    } else {
      questions.push({
        text: `${grade}. Sınıf ${topic} - Soru ${i + 1}`,
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 'A',
        type: questionType as any,
      });
    }
  }

  return questions;
};

/**
 * Clear cache for specific grade/topic or all
 */
export const clearCache = (grade?: number, topic?: string): void => {
  if (grade && topic) {
    const types = ['true-false', 'fill-blank', 'classic', 'test'];
    types.forEach((type) => {
      const key = getCacheKey(grade, topic, type);
      localStorage.removeItem(key);
    });
    console.log(`[PracticeCache] Cleared cache for grade ${grade}, topic ${topic}`);
  } else {
    // Clear all practice caches
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith('practice_')) {
        localStorage.removeItem(key);
      }
    });
    console.log('[PracticeCache] Cleared all practice caches');
  }
};
