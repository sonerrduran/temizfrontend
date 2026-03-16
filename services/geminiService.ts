// Mock Gemini Service - Frontend Only Mode
// Bu servis backend olmadan çalışır

export const generateQuestions = async (
  mode: string,
  difficulty: string,
  grade: number,
  count: number = 10
) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const questions = [];

  for (let i = 0; i < count; i++) {
    questions.push({
      id: `q_${Date.now()}_${i}`,
      question: `${mode} sorusu ${i + 1} (${difficulty} seviye, ${grade}. sınıf)`,
      options: ['A) Birinci şık', 'B) İkinci şık', 'C) Üçüncü şık', 'D) Dördüncü şık'],
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: 'Bu bir örnek açıklamadır.',
      difficulty,
      grade,
      mode,
      points: 10,
    });
  }

  return questions;
};

export const generateStory = async (
  theme: string,
  length: 'short' | 'medium' | 'long' = 'medium'
) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    title: `${theme} Hikayesi`,
    content: `Bu ${theme} hakkında bir hikayedir. Bir zamanlar...`,
    questions: [
      {
        question: 'Hikayenin konusu nedir?',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
      },
    ],
  };
};

export const generateExercise = async (type: string, difficulty: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    type,
    difficulty,
    content: 'Örnek egzersiz içeriği',
    instructions: 'Talimatlar burada',
  };
};

// Export default
export default {
  generateQuestions,
  generateStory,
  generateExercise,
};
