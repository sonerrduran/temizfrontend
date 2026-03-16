/**
 * Merkezi Oyun Tasarım Konfigürasyonu
 *
 * Bu dosya tüm oyunların tasarım özelliklerini tek bir yerden yönetir.
 * Tasarımı değiştirmek istediğinizde sadece bu dosyayı düzenleyin.
 */

// ============================================
// RENK PALETLERİ
// ============================================

export const colorPalettes = {
  // Ana arka plan (tüm oyunlarda sabit)
  background: 'from-slate-900 via-slate-800 to-slate-900',

  // Dış kart (tüm oyunlarda sabit)
  outerCard: {
    bg: 'bg-slate-800/80',
    border: 'border-white/10',
    blur: 'backdrop-blur-sm',
  },

  // Oyun kategorilerine göre iç kart renkleri
  innerCard: {
    // Trafik Oyunları
    traffic: {
      light: 'from-red-600/40 via-yellow-600/40 to-green-600/40',
      bike: 'from-cyan-600/40 via-blue-600/40 to-cyan-700/40',
      crosswalk: 'from-blue-600/40 via-cyan-600/40 to-blue-700/40',
      sign: 'from-green-600/40 via-emerald-600/40 to-green-700/40',
      walk: 'from-purple-600/40 via-pink-600/40 to-purple-700/40',
      stopGo: 'from-orange-600/40 via-red-600/40 to-orange-700/40',
      emergency: 'from-red-600/40 via-rose-600/40 to-red-700/40',
    },

    // Hijyen Oyunları
    hygiene: {
      handWash: 'from-blue-600/40 via-cyan-600/40 to-blue-700/40',
      teeth: 'from-teal-600/40 via-emerald-600/40 to-teal-700/40',
      bath: 'from-cyan-600/40 via-teal-600/40 to-cyan-700/40',
      germs: 'from-green-600/40 via-emerald-600/40 to-green-700/40',
    },

    // Zeka Oyunları
    logic: {
      akari: 'from-yellow-600/40 to-amber-700/40',
      minesweeper: 'from-emerald-600/40 to-teal-700/40',
      sudoku: 'from-purple-600/40 to-indigo-700/40',
      kakuro: 'from-orange-600/40 to-amber-700/40',
      puzzle: 'from-blue-600/40 to-cyan-700/40',
      memory: 'from-pink-600/40 to-rose-700/40',
    },
  },

  // Accent renkler (overlay'ler için)
  accents: {
    yellow: 'yellow',
    blue: 'blue',
    green: 'green',
    red: 'red',
    purple: 'purple',
    orange: 'orange',
    pink: 'pink',
    cyan: 'cyan',
    teal: 'teal',
    emerald: 'emerald',
  },
};

// ============================================
// BUTON STİLLERİ
// ============================================

export const buttonStyles = {
  // Çıkış butonu (header'da sol)
  exit: 'px-6 py-3 bg-red-600/90 hover:bg-red-700 text-white rounded-xl font-bold transition-all transform hover:scale-105',

  // Nasıl Oynanır butonu
  rules:
    'px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-all transform hover:scale-105',

  // Oyun içi ana butonlar
  primary:
    'px-8 py-6 rounded-2xl font-black text-2xl transition-all transform hover:scale-105 shadow-lg',

  // Oyun içi ikincil butonlar
  secondary: 'px-6 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105',

  // Overlay butonları
  overlayPrimary: 'w-full py-4 rounded-xl font-bold transition-all transform hover:scale-105',
  overlaySecondary:
    'w-full bg-slate-700/50 hover:bg-slate-600/50 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105',
};

// ============================================
// KART STİLLERİ
// ============================================

export const cardStyles = {
  // Dış kart
  outer: 'bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10',

  // İç kart (gradient eklenecek)
  inner: 'rounded-2xl p-8 border border-white/10',

  // Info kartları (header'da)
  info: 'px-6 py-3 bg-slate-700/50 backdrop-blur-sm rounded-xl border border-white/10',

  // Mesaj kartları
  message: 'bg-slate-900/50 rounded-2xl p-4 text-center',

  // Oyun alanı
  gameArea: 'bg-slate-900/80 rounded-2xl p-4 border-4 border-slate-700',
};

// ============================================
// LAYOUT AYARLARI
// ============================================

export const layoutConfig = {
  // Container
  container: 'max-w-4xl mx-auto',

  // Header
  header: {
    wrapper: 'flex justify-between items-center mb-8',
    infoGroup: 'flex gap-4',
  },

  // Başlık
  title: {
    wrapper: 'text-center mb-8',
    main: 'text-white text-4xl md:text-5xl font-black mb-2',
    subtitle: 'text-white/70 text-lg',
  },

  // Grid sistemleri
  grid: {
    twoColumn: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    threeColumn: 'grid grid-cols-1 md:grid-cols-3 gap-4',
    fourColumn: 'grid grid-cols-2 md:grid-cols-4 gap-4',
  },
};

// ============================================
// OYUN MEKANİKLERİ
// ============================================

export const gameConfig = {
  // Varsayılan süre ayarları (saniye)
  defaultTime: {
    easy: 180, // 3 dakika
    medium: 120, // 2 dakika
    hard: 90, // 1.5 dakika
  },

  // Varsayılan hata sayıları
  defaultMistakes: {
    easy: 5,
    medium: 3,
    hard: 2,
  },

  // Süre uyarı eşiği (saniye)
  timeWarningThreshold: 30,

  // Yıldız hesaplama eşikleri (%)
  starThresholds: {
    five: 90,
    four: 70,
    three: 50,
    two: 30,
    one: 0,
  },
};

// ============================================
// ANİMASYON AYARLARI
// ============================================

export const animationConfig = {
  // Transition süreleri
  transition: {
    fast: 'transition-all duration-150',
    normal: 'transition-all duration-300',
    slow: 'transition-all duration-500',
  },

  // Hover efektleri
  hover: {
    scale: 'hover:scale-105',
    scaleSmall: 'hover:scale-102',
    brightness: 'hover:brightness-110',
  },

  // Pulse animasyonu
  pulse: 'animate-pulse',

  // Bounce animasyonu
  bounce: 'animate-bounce',
};

// ============================================
// TİMER AYARLARI
// ============================================

export const timerConfig = {
  // Normal timer stili
  normal: (timeLeft: number, threshold: number) =>
    `px-6 py-3 rounded-xl border-2 font-bold ${
      timeLeft <= threshold
        ? 'border-red-500 text-red-500 bg-red-500/10 animate-pulse'
        : 'border-yellow-400 text-yellow-400 bg-yellow-500/10'
    }`,

  // Renkli timer stili (oyuna göre)
  colored: (timeLeft: number, threshold: number, color: string) =>
    `px-6 py-3 rounded-xl border-2 font-bold ${
      timeLeft <= threshold
        ? 'border-red-500 text-red-500 bg-red-500/10 animate-pulse'
        : `border-${color}-400 text-${color}-400 bg-${color}-500/10`
    }`,
};

// ============================================
// YARDIMCI FONKSİYONLAR
// ============================================

/**
 * Süreyi formatlar (MM:SS)
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Yıldız sayısını hesaplar
 */
export const calculateStars = (
  score: number,
  maxScore: number,
  mistakes: number,
  maxMistakes: number,
  timeLeft: number,
  totalTime: number
): number => {
  // Oyun kaybedildiyse
  if (mistakes >= maxMistakes || timeLeft === 0) return 1;

  // Skor yüzdesini hesapla
  const scorePercent = (score / maxScore) * 100;

  // Yıldız hesapla
  let stars = 1;
  if (scorePercent >= gameConfig.starThresholds.five) stars = 5;
  else if (scorePercent >= gameConfig.starThresholds.four) stars = 4;
  else if (scorePercent >= gameConfig.starThresholds.three) stars = 3;
  else if (scorePercent >= gameConfig.starThresholds.two) stars = 2;

  // Bonus: Süre bonusu
  if (timeLeft > totalTime * 0.5 && stars < 5) {
    stars += 1;
  }

  return Math.min(5, stars);
};

/**
 * Gradient class'ını oluşturur
 */
export const getGradientClass = (from: string, via?: string, to?: string): string => {
  if (via && to) {
    return `bg-gradient-to-br ${from} ${via} ${to}`;
  } else if (to) {
    return `bg-gradient-to-br ${from} ${to}`;
  }
  return from;
};

/**
 * Tam oyun wrapper class'ını oluşturur
 */
export const getGameWrapperClasses = () => ({
  background: `min-h-screen bg-gradient-to-br ${colorPalettes.background} p-4 md:p-8`,
  container: layoutConfig.container,
  outerCard: cardStyles.outer,
  innerCard: cardStyles.inner,
});

// ============================================
// EXPORT
// ============================================

export default {
  colorPalettes,
  buttonStyles,
  cardStyles,
  layoutConfig,
  gameConfig,
  animationConfig,
  timerConfig,
  formatTime,
  calculateStars,
  getGradientClass,
  getGameWrapperClasses,
};
