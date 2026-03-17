# Eski Mimari Componentlerin Modernizasyonu

## Yapılacak Güncellemeler

### ✅ Tamamlanan Modüller

#### Focus Modülü
- ✅ PomodoroTimer.tsx
- ✅ ColorMatchGame.tsx
- ✅ MemoryCardsGame.tsx
- ✅ AttentionTrackingGame.tsx
- ✅ FocusExercise.tsx
- ✅ routes.tsx (index route kullanımı)

#### Fast Reading Menüleri
- ✅ FastReadingDashboard.tsx
- ✅ FastReadingMenu.tsx
- ✅ EyeFlowMenu.tsx
- ✅ MeasurementMenu.tsx
- ✅ FocusTrainingMenu.tsx
- ✅ BrainGamesMenu.tsx
- ✅ routes.tsx

### 🔄 Devam Eden Modüller

#### Fast Reading Egzersizleri (20 dosya)
Tüm egzersizler aynı pattern'i takip ediyor:
- Props: `{ stats: UserStats, setMode: (mode: GameMode) => void }`
- Navigation: `setMode(GameMode.FAST_READING_MENU)`

**Güncellenecek Dosyalar:**
1. PeripheralVisionExercise.tsx
2. SaccadeExercise.tsx
3. LineTrackingExercise.tsx
4. ExpandingShapes.tsx
5. RhythmicReading.tsx
6. RhythmicReadingExercises.tsx
7. WordFlowExercise.tsx
8. WordGroupingExercise.tsx
9. SpeedReadingTest.tsx
10. SpeedComprehension.tsx
11. CatchWordGame.tsx
12. FlashMemoryGame.tsx
13. VisualSearch.tsx
14. VisualPerceptionGames.tsx
15. Tachistoscope.tsx
16. TechniquesModule.tsx
17. BionicReadingModule.tsx
18. FastReadingTeacher.tsx
19. EyeExercise.tsx
20. AdvancedEyeExercises.tsx

#### Language Modülü
- ❌ LanguageMenu.tsx - Props ve GameMode kullanımı
- ❌ DailyVocabulary.tsx
- ❌ LanguageAIQuiz.tsx
- ❌ LanguageAntonyms.tsx
- ❌ LanguageDailyWords.tsx
- ❌ LanguageIdioms.tsx
- ❌ LanguageMetaphors.tsx
- ❌ LanguageProverbs.tsx
- ❌ LanguageSim.tsx
- ❌ LanguageSynonyms.tsx
- ❌ LanguageWordGame.tsx
- ❌ routes.tsx

## Güncelleme Pattern'i

### Önceki Yapı
```typescript
import React from 'react';
import { GameMode, UserStats } from '../../types';

interface ComponentProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const Component: React.FC<ComponentProps> = ({ stats, setMode }) => {
  // ...
  onClick={() => setMode(GameMode.FAST_READING_MENU)}
  // ...
};

export default Component;
```

### Yeni Yapı
```typescript
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function Component() {
  const navigate = useNavigate();
  const { user } = useAuthStore(); // stats yerine
  
  // ...
  onClick={() => navigate('/fast-reading/menu')}
  // ...
}
```

## Toplu Güncelleme Stratejisi

### 1. Fast Reading Egzersizleri
Tüm egzersizler için:
- Import'ları güncelle
- Props'ları kaldır
- useNavigate ekle
- setMode çağrılarını navigate ile değiştir
- stats kullanımını useAuthStore ile değiştir

### 2. Language Modülü
- LanguageMenu'yü route-based yap
- Her dil aktivitesi için ayrı route
- GameMode enum'ını kaldır

### 3. Route Yapıları
Tüm modüller için:
- `path="/"` yerine `index` kullan
- `path="/exercise"` yerine `path="exercise"` kullan

## Sonraki Adımlar

1. Fast reading egzersizlerini toplu güncelle
2. Language modülünü modernize et
3. Kalan GameMode kullanımlarını temizle
4. Test et ve doğrula
