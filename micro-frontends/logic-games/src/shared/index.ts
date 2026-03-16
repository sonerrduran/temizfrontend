/**
 * Merkezi Zeka Oyunu Tasarım Sistemi
 *
 * Bu modül tüm zeka oyunları için standart tasarım ve davranış sağlar.
 *
 * Kullanım:
 * 1. LogicGameWrapper: Ana oyun container'ı
 * 2. RulesOverlay: "Nasıl Oynanır" ekranı
 * 3. GameOverOverlay: Oyun sonu ekranı
 * 4. useLogicGame: Oyun state ve logic yönetimi
 *
 * Renk Şemaları:
 * - emerald: Yeşil oyunlar (Minesweeper, vb.)
 * - orange: Turuncu oyunlar (Kakuro, vb.)
 * - purple: Mor oyunlar (Killer Sudoku, vb.)
 * - pink: Pembe oyunlar (Nonogram, vb.)
 * - blue: Mavi oyunlar
 * - red: Kırmızı oyunlar
 * - yellow: Sarı oyunlar
 * - teal: Turkuaz oyunlar
 */

export { default as LogicGameWrapper } from './LogicGameWrapper';
export { default as TwoPlayerGameWrapper } from './TwoPlayerGameWrapper';
export { default as RulesOverlay } from './RulesOverlay';
export { default as GameOverOverlay } from './GameOverOverlay';
export { useLogicGame } from './useLogicGame';
