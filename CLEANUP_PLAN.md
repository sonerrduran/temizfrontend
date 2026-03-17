# Kod Temizliği Planı - GÖREV 1.12-1.14

**Tarih:** 17 Mart 2026  
**Durum:** 📋 PLANLAMA

---

## 🎯 AMAÇ

Eski `components/` klasöründeki entegre edilmiş bileşenleri temizlemek ve kod tabanını optimize etmek.

---

## 📂 SİLİNEBİLECEK KLASÖRLER

### ✅ Kesinlikle Silinebilir (Yeni Yapıda Mevcut)

#### 1. `components/traffic/` (10 dosya)
**Yeni Konum:** `apps/web/src/features/life-skills/traffic/`
- TrafficCity.tsx → TrafficGames içinde
- TrafficDashboard.tsx → Merkezi dashboard
- TrafficGames.tsx → TrafficGames.tsx (genişletilmiş)
- TrafficLaneGame.tsx → TrafficGames içinde
- TrafficMenu.tsx → TrafficMenu.tsx (modernize)
- TrafficPedestrianGame.tsx → TrafficGames içinde
- TrafficQuiz.tsx → TrafficTests.tsx
- TrafficSignMatch.tsx → TrafficGames içinde
- TrafficSignsLearn.tsx → TrafficLessons içinde
- TrafficSimulator.tsx → TrafficGames içinde

**Durum:** ✅ Tüm özellikler yeni yapıda mevcut ve genişletilmiş

#### 2. `components/first-aid/` (4 dosya)
**Yeni Konum:** `apps/web/src/features/life-skills/first-aid/`
- FirstAidDashboard.tsx → Merkezi dashboard
- FirstAidEmergencies.tsx → FirstAidScenarios.tsx
- FirstAidMenu.tsx → FirstAidMenu.tsx (modernize)
- FirstAidScenarios.tsx → FirstAidScenarios.tsx

**Durum:** ✅ Tüm özellikler yeni yapıda mevcut

#### 3. `components/fast-reading/` (26 dosya)
**Yeni Konum:** `apps/web/src/features/fast-reading/`
- Tüm bileşenler zaten yeni yapıda mevcut
- exercises/, games/, tests/, techniques/ klasörleri
- FastReadingMenu.tsx, routes.tsx

**Durum:** ✅ Tüm bileşenler yeni yapıda mevcut

#### 4. `components/focus/` (6 dosya)
**Yeni Konum:** `apps/web/src/features/focus/`
- AttentionTrackingGame.tsx
- ColorMatchGame.tsx
- FocusExercise.tsx
- MemoryCardsGame.tsx
- PomodoroTimer.tsx
- FocusMenu.tsx

**Durum:** ✅ Tüm oyunlar yeni yapıda mevcut

#### 5. `components/language/` (11 dosya)
**Yeni Konum:** `apps/web/src/features/language/`
- DailyVocabulary.tsx
- LanguageAIQuiz.tsx
- LanguageAntonyms.tsx
- LanguageDailyWords.tsx
- LanguageIdioms.tsx
- LanguageMetaphors.tsx
- LanguageProverbs.tsx
- LanguageSim.tsx
- LanguageSynonyms.tsx
- LanguageWordGame.tsx
- LanguageMenu.tsx

**Durum:** ✅ Tüm oyunlar yeni yapıda mevcut

#### 6. `components/learning/` (11 dosya)
**Yeni Konum:** `apps/web/src/features/learning/`
- BlockCodingGame.tsx
- CanvasDrawTool.tsx
- DecisionSimulator.tsx
- FlashcardSystem.tsx
- MindMapTool.tsx
- MnemonicTraining.tsx
- ParaphraseExercise.tsx
- RhythmGame.tsx
- StoryBuilder.tsx
- WordMemoryGame.tsx
- LearningMenu.tsx

**Durum:** ✅ Tüm oyunlar yeni yapıda mevcut

#### 7. `components/stories/` (1 dosya)
**Yeni Konum:** `apps/web/src/features/stories/`
- StoryBook.tsx

**Durum:** ✅ Yeni yapıda mevcut

#### 8. `components/teacher-tools/` (17 dosya)
**Yeni Konum:** `apps/web/src/features/teacher-tools/`
- AttendanceTracker.tsx
- BirthdayCalendar.tsx
- ClassGoals.tsx
- ClassTimer.tsx
- DiceRoller.tsx
- GroupMaker.tsx
- NoiseMeter.tsx
- NoticeBulletin.tsx
- QuickPoll.tsx
- RandomStudentPicker.tsx
- Scoreboard.tsx
- SeatingChart.tsx
- SpinWheel.tsx
- StickyNotes.tsx
- Whiteboard.tsx
- WordCloud.tsx
- TeacherToolsMenu.tsx

**Durum:** ✅ Tüm araçlar yeni yapıda mevcut

#### 9. `components/math/preschool/` (7 dosya)
**Yeni Konum:** `micro-frontends/math-games/src/games/preschool/`
- DirectionGame.tsx
- MazeGame.tsx
- NumberComparisonGame.tsx
- NumberRecognitionGame.tsx
- PatternPuzzleGame.tsx
- SequencePatternGame.tsx
- ShapeMatchingGame.tsx

**Durum:** ✅ Yeni yapıda entegre edildi

#### 10. `components/math/playground/` (11 dosya)
**Yeni Konum:** `apps/web/src/features/games/math-games/playground/games/`
- ClassicQuestionGame.tsx
- CosmicBalanceGame.tsx
- FillBlankGame.tsx
- MathGame.tsx
- MemoryMatchGame.tsx
- NumberCatcherGame.tsx
- ShapesGame.tsx
- SpeedMathGame.tsx
- TestGame.tsx
- TrueFalseGame.tsx

**Durum:** ✅ Yeni yapıda entegre edildi

---

### ⚠️ Kontrol Edilmesi Gereken Klasörler

#### 1. `components/math/` (preschool ve playground hariç)
**Durum:** Kontrol edilmeli
- Diğer sınıf seviyelerinin oyunları zaten entegre mi?
- Grade1-8 klasörleri var mı?

#### 2. `components/logic-games/`
**Durum:** Kontrol edilmeli
- Sudoku, puzzle, two-player oyunları entegre mi?
- Yeni yapıda: `apps/web/src/features/games/logic-games/`

#### 3. `components/academic/`
**Durum:** Kontrol edilmeli
- Akademik ders içerikleri
- Yeni yapıda: `apps/web/src/features/lessons/`

#### 4. `components/life-skills/`
**Durum:** Kontrol edilmeli
- Hygiene, nutrition, digital, environment
- Yeni yapıda: `apps/web/src/features/life-skills/`

#### 5. `components/core/`
**Durum:** Kontrol edilmeli
- Ortak bileşenler (Button, Card, Modal, vb.)
- Yeni yapıda: `packages/ui/` veya `packages/shared/`

#### 6. `components/common/`
**Durum:** Kontrol edilmeli
- Ortak utility bileşenler
- Yeni yapıda nerede kullanılıyor?

---

## 🗑️ SİLME PLANI

### Aşama 1: Kesin Silinebilirler (10 klasör)
```bash
# Yedek al (opsiyonel)
mkdir -p backup/components
cp -r components/traffic backup/components/
cp -r components/first-aid backup/components/
cp -r components/fast-reading backup/components/
cp -r components/focus backup/components/
cp -r components/language backup/components/
cp -r components/learning backup/components/
cp -r components/stories backup/components/
cp -r components/teacher-tools backup/components/
cp -r components/math/preschool backup/components/
cp -r components/math/playground backup/components/

# Sil
rm -rf components/traffic
rm -rf components/first-aid
rm -rf components/fast-reading
rm -rf components/focus
rm -rf components/language
rm -rf components/learning
rm -rf components/stories
rm -rf components/teacher-tools
rm -rf components/math/preschool
rm -rf components/math/playground
```

### Aşama 2: Kontrol Sonrası Silme
- `components/math/` (diğer klasörler kontrol edilecek)
- `components/logic-games/` (kontrol edilecek)
- `components/academic/` (kontrol edilecek)
- `components/life-skills/` (kontrol edilecek)
- `components/core/` (kontrol edilecek)
- `components/common/` (kontrol edilecek)

---

## 🔍 GÖREV 1.13: Import ve Dependency Temizliği

### Import Temizliği
```bash
# Kullanılmayan import'ları bul
npx eslint . --ext .ts,.tsx --fix

# Manuel kontrol gerekebilir
# - Eski components/ import'ları
# - Kullanılmayan type import'ları
```

### Dependency Temizliği
```bash
# Kullanılmayan dependency'leri bul
npx depcheck

# package.json'dan sil
# - Kullanılmayan paketler
# - Duplicate paketler
```

### Import Path Güncellemeleri
Eski import'lar:
```typescript
import { Component } from '../../components/traffic/TrafficMenu';
```

Yeni import'lar:
```typescript
import { Component } from '@/features/life-skills/traffic/TrafficMenu';
```

---

## 🐛 GÖREV 1.14: Console ve Debug Temizliği

### Console.log Temizliği
```bash
# console.log'ları bul
grep -r "console.log" apps/ micro-frontends/ packages/ --include="*.ts" --include="*.tsx"

# Otomatik temizlik (dikkatli kullan)
find apps/ micro-frontends/ packages/ -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '/console\.log/d' {} +
```

### Debug Code Temizliği
- Commented-out code'u kaldır
- TODO/FIXME yorumlarını kontrol et
- Development-only code'u kaldır veya flag'le

### Production-Ready Kontroller
- [ ] Environment variables doğru mu?
- [ ] API endpoint'leri production'a hazır mı?
- [ ] Error handling yeterli mi?
- [ ] Loading states var mı?

---

## 📋 KONTROL LİSTESİ

### Silme Öncesi Kontroller
- [ ] Tüm bileşenler yeni yapıda mevcut mi?
- [ ] Import'lar güncellenmiş mi?
- [ ] Test'ler çalışıyor mu?
- [ ] Build başarılı mı?
- [ ] Yedek alındı mı? (opsiyonel)

### Silme Sonrası Kontroller
- [ ] Build hala başarılı mı?
- [ ] Test'ler hala geçiyor mu?
- [ ] Import hataları var mı?
- [ ] Runtime hataları var mı?
- [ ] Tüm özellikler çalışıyor mu?

---

## ⚡ HIZLI BAŞLANGIÇ

### 1. Kontrol Aşaması (30 dakika)
```bash
# Kalan klasörleri kontrol et
ls -la components/math/
ls -la components/logic-games/
ls -la components/academic/
ls -la components/life-skills/
ls -la components/core/
ls -la components/common/

# Build test
npm run build

# Test çalıştır
npm run test
```

### 2. Silme Aşaması (15 dakika)
```bash
# Kesin silinebilirleri sil
rm -rf components/traffic
rm -rf components/first-aid
rm -rf components/fast-reading
rm -rf components/focus
rm -rf components/language
rm -rf components/learning
rm -rf components/stories
rm -rf components/teacher-tools
rm -rf components/math/preschool
rm -rf components/math/playground

# Build test
npm run build
```

### 3. Temizlik Aşaması (30 dakika)
```bash
# Import temizliği
npx eslint . --ext .ts,.tsx --fix

# Console.log temizliği
grep -r "console.log" apps/ --include="*.ts" --include="*.tsx"

# Dependency kontrolü
npx depcheck
```

---

## 📊 TAHMİNİ SÜRE

| Görev | Süre | Durum |
|-------|------|-------|
| 1.12.1: Klasör kontrolü | 30 dk | ⏳ |
| 1.12.2: Kesin silinebilirleri sil | 15 dk | ⏳ |
| 1.12.3: Build ve test | 15 dk | ⏳ |
| 1.13.1: Import temizliği | 30 dk | ⏳ |
| 1.13.2: Dependency temizliği | 15 dk | ⏳ |
| 1.14.1: Console temizliği | 20 dk | ⏳ |
| 1.14.2: Debug temizliği | 20 dk | ⏳ |
| 1.14.3: Production kontrol | 15 dk | ⏳ |

**TOPLAM:** ~2.5 saat

---

## 🎯 BAŞARI KRİTERLERİ

- ✅ Eski components/ klasörü temizlendi
- ✅ Kullanılmayan import'lar kaldırıldı
- ✅ Console.log'lar temizlendi
- ✅ Build başarılı
- ✅ Test'ler geçiyor
- ✅ Tüm özellikler çalışıyor
- ✅ Production-ready

---

**Hazırlayan:** Kiro AI Assistant  
**Tarih:** 17 Mart 2026  
**Durum:** 📋 PLAN HAZIR - Onay Bekleniyor
