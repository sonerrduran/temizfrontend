/**
 * Eğitim Galaksisi - Merkezi Tema Sistemi
 * Tüm uygulama için tutarlı tasarım
 */

export const theme = {
  // ==================== RENKLER ====================
  colors: {
    // Ana Renkler
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },

    // İkincil Renkler
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
    },

    // Başarı
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },

    // Uyarı
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },

    // Hata
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },

    // Nötr
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },

    // Kategori Renkleri
    categories: {
      math: '#3b82f6', // Mavi
      turkish: '#ef4444', // Kırmızı
      logic: '#8b5cf6', // Mor
      science: '#10b981', // Yeşil
      reading: '#f59e0b', // Turuncu
      focus: '#06b6d4', // Cyan
      life: '#ec4899', // Pembe
    },
  },

  // ==================== GRADIENTLER ====================
  gradients: {
    // Ana Gradientler
    primary: 'from-blue-500 to-indigo-600',
    secondary: 'from-purple-500 to-pink-600',
    success: 'from-green-500 to-emerald-600',
    warning: 'from-yellow-500 to-orange-600',
    error: 'from-red-500 to-rose-600',

    // Arka Plan Gradientleri
    background: {
      light: 'from-indigo-50 via-purple-50 to-pink-50',
      dark: 'from-slate-900 via-purple-900 to-slate-900',
      cosmic: 'from-[#0f0c29] via-[#302b63] to-[#24243e]',
    },

    // Kategori Gradientleri
    categories: {
      math: 'from-blue-400 to-blue-600',
      turkish: 'from-red-400 to-red-600',
      logic: 'from-purple-400 to-purple-600',
      science: 'from-green-400 to-green-600',
      reading: 'from-orange-400 to-orange-600',
      focus: 'from-cyan-400 to-cyan-600',
      life: 'from-pink-400 to-pink-600',
    },

    // Sınıf Gradientleri
    grades: {
      1: 'from-green-400 to-emerald-500',
      2: 'from-blue-400 to-indigo-500',
      3: 'from-orange-400 to-red-500',
      4: 'from-pink-400 to-purple-500',
      5: 'from-cyan-400 to-blue-500',
      6: 'from-teal-400 to-green-500',
      7: 'from-violet-400 to-purple-500',
      8: 'from-emerald-400 to-teal-500',
    },
  },

  // ==================== TİPOGRAFİ ====================
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      display: 'Poppins, Inter, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },

    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
      '6xl': '3.75rem', // 60px
    },

    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      black: '900',
    },
  },

  // ==================== SPACING ====================
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
  },

  // ==================== BORDER RADIUS ====================
  borderRadius: {
    none: '0',
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem', // 32px
    full: '9999px',
  },

  // ==================== GÖLGELER ====================
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    glow: {
      primary: '0 0 30px rgba(59, 130, 246, 0.4)',
      secondary: '0 0 30px rgba(168, 85, 247, 0.4)',
      success: '0 0 30px rgba(34, 197, 94, 0.4)',
      warning: '0 0 30px rgba(245, 158, 11, 0.4)',
      error: '0 0 30px rgba(239, 68, 68, 0.4)',
    },
  },

  // ==================== ANİMASYONLAR ====================
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },

    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },

  // ==================== BREAKPOINTS ====================
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // ==================== COMPONENT STYLES ====================
  components: {
    // Button Stilleri
    button: {
      base: 'px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2',
      variants: {
        primary:
          'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl',
        secondary:
          'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-xl',
        success:
          'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl',
        warning:
          'bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-700 shadow-lg hover:shadow-xl',
        error:
          'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 shadow-lg hover:shadow-xl',
        outline: 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50',
        ghost: 'text-gray-700 hover:bg-gray-100',
      },
      sizes: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
    },

    // Card Stilleri
    card: {
      base: 'bg-white rounded-2xl shadow-xl p-6 transition-all duration-300',
      hover: 'hover:shadow-2xl hover:-translate-y-1',
      variants: {
        default: 'border border-gray-200',
        primary: 'border-2 border-blue-500',
        success: 'border-2 border-green-500',
        warning: 'border-2 border-yellow-500',
        error: 'border-2 border-red-500',
      },
    },

    // Input Stilleri
    input: {
      base: 'w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors',
      error: 'border-red-500 focus:border-red-600',
      success: 'border-green-500 focus:border-green-600',
    },

    // Badge Stilleri
    badge: {
      base: 'px-3 py-1 rounded-full text-sm font-medium',
      variants: {
        primary: 'bg-blue-100 text-blue-700',
        secondary: 'bg-purple-100 text-purple-700',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-yellow-100 text-yellow-700',
        error: 'bg-red-100 text-red-700',
        gray: 'bg-gray-100 text-gray-700',
      },
    },
  },
};

// ==================== YARDIMCI FONKSİYONLAR ====================

/**
 * Kategori rengini al
 */
export const getCategoryColor = (category: string): string => {
  return (
    theme.colors.categories[category as keyof typeof theme.colors.categories] ||
    theme.colors.primary[500]
  );
};

/**
 * Kategori gradientini al
 */
export const getCategoryGradient = (category: string): string => {
  return (
    theme.gradients.categories[category as keyof typeof theme.gradients.categories] ||
    theme.gradients.primary
  );
};

/**
 * Sınıf gradientini al
 */
export const getGradeGradient = (grade: number): string => {
  return (
    theme.gradients.grades[grade as keyof typeof theme.gradients.grades] || theme.gradients.primary
  );
};

/**
 * Button class'ını oluştur
 */
export const getButtonClass = (
  variant: keyof typeof theme.components.button.variants = 'primary',
  size: keyof typeof theme.components.button.sizes = 'md'
): string => {
  return `${theme.components.button.base} ${theme.components.button.variants[variant]} ${theme.components.button.sizes[size]}`;
};

/**
 * Card class'ını oluştur
 */
export const getCardClass = (
  variant: keyof typeof theme.components.card.variants = 'default',
  hoverable: boolean = true
): string => {
  return `${theme.components.card.base} ${theme.components.card.variants[variant]} ${hoverable ? theme.components.card.hover : ''}`;
};

/**
 * Badge class'ını oluştur
 */
export const getBadgeClass = (
  variant: keyof typeof theme.components.badge.variants = 'primary'
): string => {
  return `${theme.components.badge.base} ${theme.components.badge.variants[variant]}`;
};

export default theme;
