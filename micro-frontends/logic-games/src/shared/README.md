# Zeka Oyunları Merkezi Tasarım Sistemi

Bu klasör, tüm zeka oyunları için merkezi tasarım ve davranış yönetimi sağlar.

## 📦 Componentler

### 1. LogicGameWrapper

Ana oyun container'ı. Tüm oyunlar için standart layout sağlar.

**Özellikler:**

- Tam ekran centered layout
- Dış kart (slate-800) + İç kart (oyun rengi)
- Sol üst: Kırmızı çıkış butonu (✕)
- Sağ üst: Info card (süre, hata, vb.)
- Orta: Oyun başlığı ve emoji
- "Nasıl Oynanır" butonu

**Kullanım:**

```tsx
<LogicGameWrapper
  title="Mayın Tarlası"
  emoji="💣"
  subtitle="8x8 Alan"
  gradientFrom="from-emerald-600"
  gradientTo="to-teal-700"
  onExit={onExit}
  onShowRules={() => setShowRules(true)}
  infoCard={<div>Süre: {time}</div>}
>
  {/* Oyun içeriği */}
</LogicGameWrapper>
```

### 2. RulesOverlay

"Nasıl Oynanır" tam ekran overlay'i.

**Özellikler:**

- Tam ekran backdrop blur
- Oyun emoji ve başlık
- Numaralandırılmış kurallar listesi
- "ANLADIM, BAŞLA!" butonu

**Kullanım:**

```tsx
<RulesOverlay
  show={showRules}
  onClose={() => setShowRules(false)}
  title="Mayın Tarlası"
  emoji="💣"
  rules={['Kural 1...', 'Kural 2...', 'Kural 3...']}
  accentColor="emerald"
/>
```

### 3. GameOverOverlay

Oyun sonu tam ekran overlay'i.

**Özellikler:**

- Kazanma/kaybetme durumuna göre farklı görünüm
- Yıldız puanı gösterimi
- "Tekrar Oyna" ve "Ana Menüye Dön" butonları

**Kullanım:**

```tsx
<GameOverOverlay
  show={isGameOver}
  won={gameWon}
  score={score}
  onRestart={() => resetGame(initBoard)}
  onExit={() => onComplete(score)}
  accentColor="emerald"
  winTitle="GÖREV TAMAM"
  loseTitle="GÜÜÜLM!"
/>
```

## 🎣 Hook

### useLogicGame

Oyun state ve logic yönetimi için merkezi hook.

**Özellikler:**

- Otomatik süre yönetimi (zorluk seviyesine göre)
- Hata sayacı
- Oyun sonu logic'i
- Yıldız hesaplama
- "Nasıl Oynanır" state'i

**Kullanım:**

```tsx
const {
  timeLeft,
  mistakes,
  isGameOver,
  gameWon,
  score,
  showRules,
  setShowRules,
  addMistake,
  endGame,
  resetGame,
  formatTime,
} = useLogicGame({
  difficulty,
  onComplete,
  maxMistakes: 5,
  timeMultiplier: 1,
});
```

## 🎨 Renk Şemaları

Her oyun kategorisi için standart renkler:

| Renk    | Gradient                        | Kullanım               |
| ------- | ------------------------------- | ---------------------- |
| emerald | `from-emerald-600 to-teal-700`  | Mayın Tarlası, vb.     |
| orange  | `from-orange-600 to-amber-700`  | Kakuro, KenKen, vb.    |
| purple  | `from-purple-600 to-indigo-700` | Killer Sudoku, vb.     |
| pink    | `from-pink-600 to-rose-700`     | Nonogram, Picross, vb. |
| blue    | `from-blue-600 to-cyan-700`     | Sudoku varyantları     |
| red     | `from-red-600 to-rose-700`      | Zor oyunlar            |
| yellow  | `from-yellow-600 to-amber-700`  | Mantık oyunları        |
| teal    | `from-teal-600 to-cyan-700`     | Bulmaca oyunları       |

## 📝 Örnek Oyun Implementasyonu

```tsx
import React, { useState } from 'react';
import { Difficulty } from '../../../types';
import { LogicGameWrapper, RulesOverlay, GameOverOverlay, useLogicGame } from '../shared';

interface MyGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

const MyGame: React.FC<MyGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
  // Merkezi oyun state
  const {
    timeLeft,
    mistakes,
    isGameOver,
    gameWon,
    score,
    showRules,
    setShowRules,
    addMistake,
    endGame,
    resetGame,
    formatTime,
  } = useLogicGame({ difficulty, onComplete, maxMistakes: 5 });

  // Oyuna özel state
  const [board, setBoard] = useState([]);

  const initGame = () => {
    // Oyun başlatma logic'i
    setBoard([]);
  };

  const gameRules = ['Oyun kuralı 1', 'Oyun kuralı 2', 'Oyun kuralı 3'];

  return (
    <>
      <LogicGameWrapper
        title="Oyun İsmi"
        emoji="🎮"
        subtitle="Alt başlık"
        gradientFrom="from-emerald-600"
        gradientTo="to-teal-700"
        onExit={onExit}
        onShowRules={() => setShowRules(true)}
        infoCard={
          <div className="flex gap-4">
            <div className="text-white">❌ {mistakes}/5</div>
            <div className="text-emerald-400">⏱️ {formatTime(timeLeft)}</div>
          </div>
        }
      >
        {/* Oyun içeriği buraya */}
      </LogicGameWrapper>

      <RulesOverlay
        show={showRules}
        onClose={() => setShowRules(false)}
        title="Oyun İsmi"
        emoji="🎮"
        rules={gameRules}
        accentColor="emerald"
      />

      <GameOverOverlay
        show={isGameOver}
        won={gameWon}
        score={score}
        onRestart={() => resetGame(initGame)}
        onExit={() => onComplete(score)}
        accentColor="emerald"
      />
    </>
  );
};

export default MyGame;
```

## ✅ Avantajlar

1. **Tutarlılık**: Tüm oyunlar aynı tasarım dilini kullanır
2. **Bakım Kolaylığı**: Tasarım değişiklikleri tek yerden yapılır
3. **Hızlı Geliştirme**: Yeni oyunlar çok daha hızlı oluşturulur
4. **Kod Tekrarı Yok**: Ortak logic merkezi hook'ta
5. **Responsive**: Tüm componentler mobil uyumlu
6. **Accessibility**: Standart klavye ve ekran okuyucu desteği

## 🔄 Mevcut Oyunları Güncelleme

Mevcut bir oyunu bu sisteme geçirmek için:

1. Import ekle: `import { LogicGameWrapper, RulesOverlay, GameOverOverlay, useLogicGame } from '../shared';`
2. `useLogicGame` hook'unu kullan
3. Render kısmını wrapper componentlerle değiştir
4. Oyuna özel logic'i koru, ortak logic'i hook'a bırak

## 📚 Daha Fazla Bilgi

- `OYUN_TASARIM_STANDARDI.md` - Genel tasarım kuralları
- `OYUN_TASARIM_SISTEMI.md` - Sistem mimarisi
