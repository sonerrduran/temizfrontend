/**
 * Game Engine Utilities
 * Barrel export for all game engine utilities
 */

// Scoring utilities
export {
  calculateScore,
  calculateStars,
  getPerformanceMessage,
  calculateTimeBonus,
  calculateComboBonus,
  calculateTotalScore,
} from './scoring';

// Level progression utilities
export {
  calculateDifficulty,
  calculateTargetScore,
  calculateTimeLimit,
  calculateQuestionsCount,
  calculateLivesCount,
  generateLevelConfig,
  canProgressToNextLevel,
  calculateLevelBonus,
  getDifficultyMultiplier,
  generateLevelRange,
  type LevelConfig,
  type DifficultyScaling,
} from './levelProgression';

// Timer utilities
export {
  formatTime,
  formatTimeWithHours,
  msToSeconds,
  secondsToMs,
  calculateTimeDifference,
  calculateRemainingTime,
  isTimeUp,
  calculateTimePercentage,
  getTimeColor,
  shouldShowTimeWarning,
} from './timer';

// Sound utilities
export {
  preloadSound,
  preloadAllSounds,
  playSound,
  playCorrectSound,
  playIncorrectSound,
  playClickSound,
  playSuccessSound,
  playFailSound,
  playLevelUpSound,
  playGameOverSound,
  playWarningSound,
  playCoinSound,
  playPowerupSound,
  stopAllSounds,
  stopSound,
  setGlobalVolume,
  getGlobalVolume,
  setMuted,
  isSoundMuted,
  toggleMute,
  clearSoundCache,
  type SoundType,
  type SoundOptions,
} from './sound';

// Animation utilities
export {
  getAnimationClass,
  getAnimationStyle,
  fadeIn,
  fadeOut,
  slideIn,
  slideOut,
  bounce,
  shake,
  pulse,
  flip,
  zoom,
  rotate,
  animate,
  animateCorrectAnswer,
  animateIncorrectAnswer,
  animateLevelUp,
  animateScoreIncrease,
  animateCardFlip,
  animateDisappear,
  animateAppear,
  staggerAnimate,
  createConfetti,
  createParticles,
  type AnimationType,
  type AnimationDirection,
  type AnimationConfig,
} from './animation';
