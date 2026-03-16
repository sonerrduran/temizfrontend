/**
 * Animation Utilities
 * Animasyon ve geçiş efektleri
 */

export type AnimationType =
  | 'fadeIn'
  | 'fadeOut'
  | 'slideIn'
  | 'slideOut'
  | 'bounce'
  | 'shake'
  | 'pulse'
  | 'flip'
  | 'zoom'
  | 'rotate';

export type AnimationDirection = 'up' | 'down' | 'left' | 'right';

export interface AnimationConfig {
  duration?: number; // Milisaniye
  delay?: number; // Milisaniye
  easing?: string; // CSS easing function
  iterations?: number | 'infinite';
  direction?: AnimationDirection;
}

/**
 * CSS animasyon sınıfı oluşturur
 * @param type - Animasyon tipi
 * @param config - Animasyon konfigürasyonu
 * @returns CSS sınıf adı
 */
export function getAnimationClass(type: AnimationType, config: AnimationConfig = {}): string {
  const { direction } = config;

  if (direction && (type === 'slideIn' || type === 'slideOut')) {
    return `animate-${type}-${direction}`;
  }

  return `animate-${type}`;
}

/**
 * CSS animasyon stilini oluşturur
 * @param config - Animasyon konfigürasyonu
 * @returns CSS stil objesi
 */
export function getAnimationStyle(config: AnimationConfig = {}): Record<string, string | number> {
  const { duration = 300, delay = 0, easing = 'ease-in-out', iterations = 1 } = config;

  return {
    animationDuration: `${duration}ms`,
    animationDelay: `${delay}ms`,
    animationTimingFunction: easing,
    animationIterationCount: iterations,
  };
}

/**
 * Fade in animasyonu uygular
 * @param element - HTML element
 * @param config - Animasyon konfigürasyonu
 */
export function fadeIn(element: HTMLElement, config: AnimationConfig = {}): Promise<void> {
  return animate(element, 'fadeIn', config);
}

/**
 * Fade out animasyonu uygular
 * @param element - HTML element
 * @param config - Animasyon konfigürasyonu
 */
export function fadeOut(element: HTMLElement, config: AnimationConfig = {}): Promise<void> {
  return animate(element, 'fadeOut', config);
}

/**
 * Slide in animasyonu uygular
 * @param element - HTML element
 * @param direction - Yön
 * @param config - Animasyon konfigürasyonu
 */
export function slideIn(
  element: HTMLElement,
  direction: AnimationDirection = 'up',
  config: AnimationConfig = {}
): Promise<void> {
  return animate(element, 'slideIn', { ...config, direction });
}

/**
 * Slide out animasyonu uygular
 * @param element - HTML element
 * @param direction - Yön
 * @param config - Animasyon konfigürasyonu
 */
export function slideOut(
  element: HTMLElement,
  direction: AnimationDirection = 'down',
  config: AnimationConfig = {}
): Promise<void> {
  return animate(element, 'slideOut', { ...config, direction });
}

/**
 * Bounce animasyonu uygular
 * @param element - HTML element
 * @param config - Animasyon konfigürasyonu
 */
export function bounce(element: HTMLElement, config: AnimationConfig = {}): Promise<void> {
  return animate(element, 'bounce', config);
}

/**
 * Shake animasyonu uygular
 * @param element - HTML element
 * @param config - Animasyon konfigürasyonu
 */
export function shake(element: HTMLElement, config: AnimationConfig = {}): Promise<void> {
  return animate(element, 'shake', { ...config, duration: 500 });
}

/**
 * Pulse animasyonu uygular
 * @param element - HTML element
 * @param config - Animasyon konfigürasyonu
 */
export function pulse(element: HTMLElement, config: AnimationConfig = {}): Promise<void> {
  return animate(element, 'pulse', config);
}

/**
 * Flip animasyonu uygular
 * @param element - HTML element
 * @param config - Animasyon konfigürasyonu
 */
export function flip(element: HTMLElement, config: AnimationConfig = {}): Promise<void> {
  return animate(element, 'flip', { ...config, duration: 600 });
}

/**
 * Zoom animasyonu uygular
 * @param element - HTML element
 * @param config - Animasyon konfigürasyonu
 */
export function zoom(element: HTMLElement, config: AnimationConfig = {}): Promise<void> {
  return animate(element, 'zoom', config);
}

/**
 * Rotate animasyonu uygular
 * @param element - HTML element
 * @param config - Animasyon konfigürasyonu
 */
export function rotate(element: HTMLElement, config: AnimationConfig = {}): Promise<void> {
  return animate(element, 'rotate', { ...config, duration: 600 });
}

/**
 * Genel animasyon fonksiyonu
 * @param element - HTML element
 * @param type - Animasyon tipi
 * @param config - Animasyon konfigürasyonu
 */
export function animate(
  element: HTMLElement,
  type: AnimationType,
  config: AnimationConfig = {}
): Promise<void> {
  return new Promise((resolve) => {
    const className = getAnimationClass(type, config);
    const style = getAnimationStyle(config);

    // Stil uygula
    Object.assign(element.style, style);

    // Sınıf ekle
    element.classList.add(className);

    // Animasyon bittiğinde
    const handleAnimationEnd = () => {
      element.classList.remove(className);
      element.removeEventListener('animationend', handleAnimationEnd);
      resolve();
    };

    element.addEventListener('animationend', handleAnimationEnd);
  });
}

/**
 * Doğru cevap animasyonu
 * @param element - HTML element
 */
export function animateCorrectAnswer(element: HTMLElement): Promise<void> {
  return bounce(element, { duration: 500 });
}

/**
 * Yanlış cevap animasyonu
 * @param element - HTML element
 */
export function animateIncorrectAnswer(element: HTMLElement): Promise<void> {
  return shake(element, { duration: 500 });
}

/**
 * Seviye atlama animasyonu
 * @param element - HTML element
 */
export function animateLevelUp(element: HTMLElement): Promise<void> {
  return zoom(element, { duration: 800 });
}

/**
 * Skor artışı animasyonu
 * @param element - HTML element
 */
export function animateScoreIncrease(element: HTMLElement): Promise<void> {
  return pulse(element, { duration: 400 });
}

/**
 * Kart çevirme animasyonu
 * @param element - HTML element
 */
export function animateCardFlip(element: HTMLElement): Promise<void> {
  return flip(element, { duration: 600 });
}

/**
 * Eleman kaybolma animasyonu
 * @param element - HTML element
 */
export function animateDisappear(element: HTMLElement): Promise<void> {
  return fadeOut(element, { duration: 300 });
}

/**
 * Eleman görünme animasyonu
 * @param element - HTML element
 */
export function animateAppear(element: HTMLElement): Promise<void> {
  return fadeIn(element, { duration: 300 });
}

/**
 * Stagger animasyon (sıralı animasyon)
 * @param elements - HTML elementler
 * @param type - Animasyon tipi
 * @param config - Animasyon konfigürasyonu
 * @param staggerDelay - Her eleman arası gecikme (ms)
 */
export async function staggerAnimate(
  elements: HTMLElement[],
  type: AnimationType,
  config: AnimationConfig = {},
  staggerDelay: number = 100
): Promise<void> {
  for (let i = 0; i < elements.length; i++) {
    const delay = (config.delay || 0) + i * staggerDelay;
    animate(elements[i], type, { ...config, delay });
  }
}

/**
 * Confetti efekti (kutlama animasyonu)
 * @param container - Container element
 * @param count - Confetti sayısı
 */
export function createConfetti(container: HTMLElement, count: number = 50): void {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}%;
      top: -10px;
      opacity: ${Math.random()};
      transform: rotate(${Math.random() * 360}deg);
      animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
    `;

    container.appendChild(confetti);

    // Animasyon bitince temizle
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

/**
 * Particle efekti oluşturur
 * @param x - X koordinatı
 * @param y - Y koordinatı
 * @param color - Renk
 * @param count - Particle sayısı
 */
export function createParticles(
  x: number,
  y: number,
  color: string = '#FFD700',
  count: number = 10
): void {
  const container = document.body;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    const angle = (Math.PI * 2 * i) / count;
    const velocity = 50 + Math.random() * 50;

    particle.className = 'particle';
    particle.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      background-color: ${color};
      border-radius: 50%;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      animation: particle-burst 0.6s ease-out forwards;
      --tx: ${Math.cos(angle) * velocity}px;
      --ty: ${Math.sin(angle) * velocity}px;
    `;

    container.appendChild(particle);

    // Animasyon bitince temizle
    setTimeout(() => {
      particle.remove();
    }, 600);
  }
}
