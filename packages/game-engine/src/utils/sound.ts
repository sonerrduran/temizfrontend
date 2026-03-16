/**
 * Sound Utilities
 * Ses efektleri ve müzik yönetimi
 */

export type SoundType =
  | 'correct'
  | 'incorrect'
  | 'click'
  | 'success'
  | 'fail'
  | 'levelUp'
  | 'gameOver'
  | 'warning'
  | 'coin'
  | 'powerup';

export interface SoundOptions {
  volume?: number; // 0-1 arası
  loop?: boolean;
  playbackRate?: number; // Oynatma hızı (0.5-2.0)
}

// Ses dosyaları için URL mapping
const SOUND_URLS: Record<SoundType, string> = {
  correct: '/sounds/correct.mp3',
  incorrect: '/sounds/incorrect.mp3',
  click: '/sounds/click.mp3',
  success: '/sounds/success.mp3',
  fail: '/sounds/fail.mp3',
  levelUp: '/sounds/level-up.mp3',
  gameOver: '/sounds/game-over.mp3',
  warning: '/sounds/warning.mp3',
  coin: '/sounds/coin.mp3',
  powerup: '/sounds/powerup.mp3',
};

// Ses cache
const audioCache = new Map<SoundType, HTMLAudioElement>();

// Global ses ayarları
let globalVolume = 1.0;
let isMuted = false;

/**
 * Ses dosyasını önceden yükler
 * @param type - Ses tipi
 */
export function preloadSound(type: SoundType): void {
  if (audioCache.has(type)) return;

  const audio = new Audio(SOUND_URLS[type]);
  audio.preload = 'auto';
  audioCache.set(type, audio);
}

/**
 * Tüm sesleri önceden yükler
 */
export function preloadAllSounds(): void {
  Object.keys(SOUND_URLS).forEach((type) => {
    preloadSound(type as SoundType);
  });
}

/**
 * Ses çalar
 * @param type - Ses tipi
 * @param options - Ses seçenekleri
 */
export function playSound(type: SoundType, options: SoundOptions = {}): void {
  if (isMuted) return;

  const { volume = 1.0, loop = false, playbackRate = 1.0 } = options;

  let audio = audioCache.get(type);

  if (!audio) {
    audio = new Audio(SOUND_URLS[type]);
    audioCache.set(type, audio);
  }

  // Ses zaten çalıyorsa başa sar
  audio.currentTime = 0;
  audio.volume = Math.min(1, Math.max(0, volume * globalVolume));
  audio.loop = loop;
  audio.playbackRate = Math.min(2, Math.max(0.5, playbackRate));

  audio.play().catch((error) => {
    console.warn(`Ses çalınamadı: ${type}`, error);
  });
}

/**
 * Doğru cevap sesi çalar
 */
export function playCorrectSound(): void {
  playSound('correct', { volume: 0.7 });
}

/**
 * Yanlış cevap sesi çalar
 */
export function playIncorrectSound(): void {
  playSound('incorrect', { volume: 0.7 });
}

/**
 * Tıklama sesi çalar
 */
export function playClickSound(): void {
  playSound('click', { volume: 0.5 });
}

/**
 * Başarı sesi çalar
 */
export function playSuccessSound(): void {
  playSound('success', { volume: 0.8 });
}

/**
 * Başarısızlık sesi çalar
 */
export function playFailSound(): void {
  playSound('fail', { volume: 0.8 });
}

/**
 * Seviye atlama sesi çalar
 */
export function playLevelUpSound(): void {
  playSound('levelUp', { volume: 0.9 });
}

/**
 * Oyun bitti sesi çalar
 */
export function playGameOverSound(): void {
  playSound('gameOver', { volume: 0.8 });
}

/**
 * Uyarı sesi çalar
 */
export function playWarningSound(): void {
  playSound('warning', { volume: 0.6 });
}

/**
 * Coin sesi çalar
 */
export function playCoinSound(): void {
  playSound('coin', { volume: 0.6 });
}

/**
 * Power-up sesi çalar
 */
export function playPowerupSound(): void {
  playSound('powerup', { volume: 0.7 });
}

/**
 * Tüm sesleri durdurur
 */
export function stopAllSounds(): void {
  audioCache.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}

/**
 * Belirli bir sesi durdurur
 * @param type - Ses tipi
 */
export function stopSound(type: SoundType): void {
  const audio = audioCache.get(type);
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

/**
 * Global ses seviyesini ayarlar
 * @param volume - Ses seviyesi (0-1)
 */
export function setGlobalVolume(volume: number): void {
  globalVolume = Math.min(1, Math.max(0, volume));
}

/**
 * Global ses seviyesini döndürür
 * @returns Ses seviyesi (0-1)
 */
export function getGlobalVolume(): number {
  return globalVolume;
}

/**
 * Sesi kapat/aç
 * @param mute - Kapatılsın mı
 */
export function setMuted(mute: boolean): void {
  isMuted = mute;
  if (mute) {
    stopAllSounds();
  }
}

/**
 * Ses kapalı mı kontrol eder
 * @returns Ses kapalı mı
 */
export function isSoundMuted(): boolean {
  return isMuted;
}

/**
 * Ses toggle (aç/kapat)
 */
export function toggleMute(): void {
  setMuted(!isMuted);
}

/**
 * Ses cache'ini temizler
 */
export function clearSoundCache(): void {
  stopAllSounds();
  audioCache.clear();
}
