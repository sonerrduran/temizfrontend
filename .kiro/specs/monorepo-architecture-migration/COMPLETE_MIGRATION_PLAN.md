# KAPSAMLI MİGRASYON PLANI
## Eski Projeden Yeni Mimariye Tam Entegrasyon

**Tarih:** 16 Mart 2026  
**Durum:** Planlama Aşaması  
**Hedef:** Tüm eski component'leri yeni mimariye hatasız entegre etmek

---

## 📋 GENEL BAKIŞ

### Mevcut Durum
- ✅ Traffic (Trafik Güvenliği) modülü yeni mimariye taşındı
- ❌ Diğer yaşam becerileri kategorileri eski yapıda
- ❌ Zihinsel gelişim modülleri eski yapıda
- ❌ Dil ve iletişim modülleri eski yapıda
- ❌ Oyun ve eğlence modülleri eski yapıda

### Hedef Mimari Yapı
```
apps/web/src/features/
├── dashboard/
│   └── StudentDashboard.tsx (Ana sayfa - kategoriler burada)
├── lessons/ (📚 Akademik Dersler)
│   ├── math/
│   ├── turkish/
│   └── ... (13 ders)
├── life-skills/ (🌟 Yaşam Becerileri)
│   ├── routes.tsx
│   ├── traffic/
│   ├── hygiene/
│   ├── first-aid/
│   ├── nutrition/
│   ├── environment/
│   ├── financial/
│   ├── digital/
│   ├── digital-health/
│   ├── social/
│   └── law/
├── mental-development/ (🧠 Zihinsel Gelişim)
│   ├── routes.tsx
│   ├── memory/
│   ├── attention/
│   ├── logic/
│   └── creativity/
├── language-communication/ (🌐 Dil ve İletişim)
│   ├── routes.tsx
│   ├── story-books/
│   ├── speech/
│   └── communication/
└── games/ (🎮 Oyun ve Eğlence)
    ├── routes.tsx
    ├── math-games/
    ├── language-games/
    └── fun-games/
```

---

## 🎯 MİGRASYON STRATEJİSİ

### Prensip 1: Modüler Yapı
Her kategori kendi klasöründe, her modül kendi alt yapısında:
- `{module}/routes.tsx` - Routing tanımları
- `{module}/{category}/{Category}Menu.tsx` - Ana menü
- `{module}/{category}/lessons/` - Dersler
- `{module}/{category}/tests/` - Testler
- `{module}/{category}/scenarios/` - Senaryolar
- `{module}/{category}/games/` - Oyunlar

### Prensip 2: Merkezi Component Kullanımı
- `@egitim-galaksisi/ui` paketinden `GameCard` kullan
- Ortak wrapper'lar için shared components
- Duplicate kod ASLA olmamalı

### Prensip 3: Routing Hiyerarşisi
```
/life-skills → LifeSkillsRoutes
  /life-skills/hygiene → HygieneMenu
    /life-skills/hygiene/lessons → HygieneLessons
    /life-skills/hygiene/tests → HygieneTests
    /life-skills/hygiene/scenarios → HygieneScenarios
    /life-skills/hygiene/games → HygieneGames
```

---

## 📦 PHASE 1: YAŞAM BECERİLERİ (Life Skills)

### 1.1 Hijyen (Hygiene) ✅ ÖNCE BU

**Kaynak:** `components/life-skills/hygiene/`  
**Hedef:** `apps/web/src/features/life-skills/hygiene/`

**Dosyalar:**
1. `HygieneMenu.tsx` → Ana menü (4 kategori kartı)
2. `lessons/HygieneLessons.tsx` → 16 ders (8 sınıf x 2 ders)
3. `tests/HygieneTests.tsx` → 40 test sorusu (8 sınıf x 5 soru)
4. `scenarios/HygieneScenarios.tsx` → 8 senaryo (8 sınıf x 1 senaryo)
5. `games/HygieneGames.tsx` → 40 oyun placeholder (8 sınıf x 5 oyun)

**Değişiklikler:**
- ❌ `import GameCard from '../../core/GameCard'`
- ✅ `import { GameCard } from '@egitim-galaksisi/ui'`
- Gradient renkler: `from-blue-500 to-cyan-600` (Hijyen teması)
- Route: `/life-skills/hygiene`

### 1.2 İlk Yardım (First Aid)
**Kaynak:** `components/life-skills/first-aid/`  
**Hedef:** `apps/web/src/features/life-skills/first-aid/`

**Dosyalar:**
1. `FirstAidMenu.tsx`
2. `lessons/FirstAidLessons.tsx`
3. `tests/FirstAidTests.tsx`
4. `scenarios/FirstAidScenarios.tsx`
5. `games/FirstAidGames.tsx`

**Değişiklikler:**
- Gradient renkler: `from-red-500 to-rose-600` (İlk yardım teması)
- Route: `/life-skills/first-aid`

### 1.3 Beslenme (Nutrition)
**Kaynak:** `components/life-skills/nutrition/`  
**Hedef:** `apps/web/src/features/life-skills/nutrition/`

**Dosyalar:**
1. `NutritionMenu.tsx`
2. `lessons/NutritionLessons.tsx`
3. `tests/NutritionTests.tsx`
4. `scenarios/NutritionScenarios.tsx`
5. `games/NutritionGames.tsx`

**Değişiklikler:**
- Gradient renkler: `from-green-500 to-emerald-600` (Beslenme teması)
- Route: `/life-skills/nutrition`

### 1.4 Çevre Bilinci (Environment)
**Kaynak:** `components/life-skills/environment/`  
**Hedef:** `apps/web/src/features/life-skills/environment/`

**Dosyalar:**
1. `EnvironmentMenu.tsx`
2. `lessons/EnvironmentLessons.tsx`
3. `tests/EnvironmentTests.tsx`
4. `scenarios/EnvironmentScenarios.tsx`
5. `games/EnvironmentGames.tsx`

**Değişiklikler:**
- Gradient renkler: `from-emerald-500 to-green-600` (Çevre teması)
- Route: `/life-skills/environment`

### 1.5 Finansal Okuryazarlık (Financial)
**Kaynak:** `components/life-skills/financial/`  
**Hedef:** `apps/web/src/features/life-skills/financial/`

**Dosyalar:**
1. `FinancialMenu.tsx`
2. `lessons/FinancialLessons.tsx`
3. `tests/FinancialTests.tsx`
4. `scenarios/FinancialScenarios.tsx`
5. `games/FinancialGames.tsx`

**Değişiklikler:**
- Gradient renkler: `from-yellow-500 to-amber-600` (Para teması)
- Route: `/life-skills/financial`

### 1.6 Dijital Okuryazarlık (Digital)
**Kaynak:** `components/life-skills/digital/`  
**Hedef:** `apps/web/src/features/life-skills/digital/`

**Dosyalar:**
1. `DigitalMenu.tsx`
2. `lessons/DigitalLessons.tsx`
3. `tests/DigitalTests.tsx`
4. `scenarios/DigitalScenarios.tsx`
5. `games/DigitalGames.tsx`

**Değişiklikler:**
- Gradient renkler: `from-purple-500 to-violet-600` (Dijital teması)
- Route: `/life-skills/digital`

### 1.7 Dijital Güvenlik (Digital Security) - AYRI MODÜL
**Not:** Digital ile birleştirilebilir VEYA ayrı tutulabilir
**Karar:** Ayrı tut (güvenlik önemli bir konu)

### 1.8 Dijital Sağlık (Digital Health)
**Kaynak:** `components/life-skills/digital-health/`  
**Hedef:** `apps/web/src/features/life-skills/digital-health/`

### 1.9 Sosyal Beceriler (Social)
**Kaynak:** `components/life-skills/social/`  
**Hedef:** `apps/web/src/features/life-skills/social/`

**Değişiklikler:**
- Gradient renkler: `from-pink-500 to-rose-600` (Sosyal teması)
- Route: `/life-skills/social`

### 1.10 Temel Hukuk (Law) - SADECE 7-8. SINIF
**Kaynak:** `components/life-skills/law/`  
**Hedef:** `apps/web/src/features/life-skills/law/`

**Özel Not:** Sadece 7. ve 8. sınıf içeriği var
**Değişiklikler:**
- Gradient renkler: `from-slate-600 to-gray-700` (Hukuk teması)
- Route: `/life-skills/law`

### 1.11 Routes Güncellemesi
**Dosya:** `apps/web/src/features/life-skills/routes.tsx`

Tüm modüller eklenmeli:
```typescript
<Route path="hygiene" element={<HygieneMenu />} />
<Route path="hygiene/lessons" element={<HygieneLessons />} />
<Route path="hygiene/tests" element={<HygieneTests />} />
// ... tüm modüller için
```

---

## 📦 PHASE 2: ZİHİNSEL GELİŞİM (Mental Development)

### Yeni Klasör Yapısı
```
apps/web/src/features/mental-development/
├── routes.tsx
├── memory/
│   ├── MemoryMenu.tsx
│   ├── lessons/MemoryLessons.tsx
│   ├── tests/MemoryTests.tsx
│   ├── scenarios/MemoryScenarios.tsx
│   └── games/MemoryGames.tsx
├── attention/
├── logic/
└── creativity/
```

### 2.1 Hafıza Geliştirme (Memory)
**Kaynak:** `components/mental-development/memory/` (varsa)  
**Hedef:** `apps/web/src/features/mental-development/memory/`

**Gradient:** `from-indigo-500 to-purple-600`  
**Route:** `/mental-development/memory`

### 2.2 Dikkat Geliştirme (Attention)
**Gradient:** `from-cyan-500 to-blue-600`  
**Route:** `/mental-development/attention`

### 2.3 Mantık ve Problem Çözme (Logic)
**Gradient:** `from-orange-500 to-red-600`  
**Route:** `/mental-development/logic`

### 2.4 Yaratıcılık (Creativity)
**Gradient:** `from-pink-500 to-fuchsia-600`  
**Route:** `/mental-development/creativity`

---

## 📦 PHASE 3: DİL VE İLETİŞİM (Language & Communication)

### Yeni Klasör Yapısı
```
apps/web/src/features/language-communication/
├── routes.tsx
├── story-books/
│   ├── StoryBooksMenu.tsx
│   ├── stories/StoryReader.tsx
│   └── games/StoryGames.tsx
├── speech/
└── communication/
```

### 3.1 Hikaye Kitabı (Story Books)
**Kaynak:** `components/story-books/` (varsa)  
**Hedef:** `apps/web/src/features/language-communication/story-books/`

**Özellikler:**
- Hikaye okuma arayüzü
- Sesli okuma desteği
- Anlama soruları
- Kelime öğrenme

**Gradient:** `from-amber-500 to-orange-600`  
**Route:** `/language-communication/story-books`

### 3.2 Konuşma Becerileri (Speech)
**Gradient:** `from-teal-500 to-cyan-600`  
**Route:** `/language-communication/speech`

### 3.3 İletişim Becerileri (Communication)
**Gradient:** `from-violet-500 to-purple-600`  
**Route:** `/language-communication/communication`

---

## 📦 PHASE 4: OYUN VE EĞLENCE (Games & Entertainment)

### Mevcut Yapı (Zaten Var)
```
apps/web/src/features/games/
├── math-games/ ✅
├── language-games/ ✅
└── fun-games/ (eklenecek)
```

### 4.1 Eğlence Oyunları (Fun Games)
**Yeni Modül:** `apps/web/src/features/games/fun-games/`

**Kategoriler:**
- Bulmaca oyunları
- Hafıza oyunları
- Hız oyunları
- Strateji oyunları

**Gradient:** `from-rose-500 to-pink-600`  
**Route:** `/games/fun`

---

## 🔧 TEKNİK DETAYLAR

### Shared Components Kullanımı

#### GameCard Component
```typescript
import { GameCard } from '@egitim-galaksisi/ui';

<GameCard
  title="Oyun Adı"
  icon="🎮"
  color="from-blue-500 to-cyan-600"
  description="Açıklama"
  onClick={() => handleClick()}
/>
```

#### Gradient Renk Paleti


**Yaşam Becerileri:**
- Trafik: `from-red-500 to-orange-600`
- Hijyen: `from-blue-500 to-cyan-600`
- İlk Yardım: `from-red-500 to-rose-600`
- Beslenme: `from-green-500 to-emerald-600`
- Çevre: `from-emerald-500 to-green-600`
- Finansal: `from-yellow-500 to-amber-600`
- Dijital: `from-purple-500 to-violet-600`
- Dijital Sağlık: `from-indigo-500 to-purple-600`
- Sosyal: `from-pink-500 to-rose-600`
- Hukuk: `from-slate-600 to-gray-700`

**Zihinsel Gelişim:**
- Hafıza: `from-indigo-500 to-purple-600`
- Dikkat: `from-cyan-500 to-blue-600`
- Mantık: `from-orange-500 to-red-600`
- Yaratıcılık: `from-pink-500 to-fuchsia-600`

**Dil ve İletişim:**
- Hikaye: `from-amber-500 to-orange-600`
- Konuşma: `from-teal-500 to-cyan-600`
- İletişim: `from-violet-500 to-purple-600`

### Routing Yapısı

#### Ana Router (AppRouter.tsx)
```typescript
<Route path="/life-skills/*" element={<LifeSkillsRoutes />} />
<Route path="/mental-development/*" element={<MentalDevelopmentRoutes />} />
<Route path="/language-communication/*" element={<LanguageCommunicationRoutes />} />
<Route path="/games/*" element={<GamesRoutes />} />
```

#### Alt Router Örneği (life-skills/routes.tsx)
```typescript
export default function LifeSkillsRoutes() {
  return (
    <Routes>
      <Route path="traffic" element={<TrafficMenu />} />
      <Route path="traffic/lessons" element={<TrafficLessons />} />
      <Route path="traffic/tests" element={<TrafficTests />} />
      <Route path="traffic/scenarios" element={<TrafficScenarios />} />
      <Route path="traffic/games" element={<TrafficGames />} />
      
      <Route path="hygiene" element={<HygieneMenu />} />
      <Route path="hygiene/lessons" element={<HygieneLessons />} />
      // ... tüm modüller
    </Routes>
  );
}
```

### StudentDashboard Entegrasyonu

```typescript
// Yaşam Becerileri Kategorisi
<div className="mb-16">
  <div className="flex items-center gap-3 mb-6">
    <span className="text-2xl md:text-3xl">🌟</span>
    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
      Yaşam Becerileri
    </h2>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <GameCard title="Trafik Güvenliği" icon="🚦" color="from-red-500 to-orange-600" onClick={() => navigate('/life-skills/traffic')} />
    <GameCard title="Kişisel Hijyen" icon="🧼" color="from-blue-500 to-cyan-600" onClick={() => navigate('/life-skills/hygiene')} />
    <GameCard title="İlk Yardım" icon="🩹" color="from-red-500 to-rose-600" onClick={() => navigate('/life-skills/first-aid')} />
    // ... diğer kartlar
  </div>
</div>
```

---

## 📝 ADIM ADIM UYGULAMA PLANI

### STEP 1: Hijyen Modülü (Pilot)
1. ✅ Klasör oluştur: `apps/web/src/features/life-skills/hygiene/`
2. ✅ `HygieneMenu.tsx` oluştur
3. ✅ `lessons/HygieneLessons.tsx` oluştur
4. ✅ `tests/HygieneTests.tsx` oluştur
5. ✅ `scenarios/HygieneScenarios.tsx` oluştur
6. ✅ `games/HygieneGames.tsx` oluştur
7. ✅ `routes.tsx` güncelle
8. ✅ Test et
9. ✅ Eski dosyaları sil

### STEP 2: Diğer Yaşam Becerileri (Sırayla)
Her modül için STEP 1'i tekrarla:
- İlk Yardım
- Beslenme
- Çevre
- Finansal
- Dijital
- Dijital Sağlık
- Sosyal
- Hukuk

### STEP 3: Zihinsel Gelişim
1. ✅ Ana klasör: `apps/web/src/features/mental-development/`
2. ✅ `routes.tsx` oluştur
3. ✅ Her modül için klasör ve dosyalar
4. ✅ StudentDashboard'a ekle
5. ✅ Test et

### STEP 4: Dil ve İletişim
1. ✅ Ana klasör: `apps/web/src/features/language-communication/`
2. ✅ `routes.tsx` oluştur
3. ✅ Hikaye Kitabı modülü
4. ✅ Diğer modüller
5. ✅ StudentDashboard'a ekle
6. ✅ Test et

### STEP 5: Oyun ve Eğlence
1. ✅ `fun-games` klasörü ekle
2. ✅ Oyun kategorileri
3. ✅ StudentDashboard'a ekle
4. ✅ Test et

### STEP 6: Temizlik
1. ✅ Eski `components/` klasörünü sil
2. ✅ Kullanılmayan import'ları temizle
3. ✅ Tüm route'ları test et
4. ✅ Build test et

---

## ✅ KONTROL LİSTESİ

### Her Modül İçin
- [ ] Klasör yapısı doğru
- [ ] Menu component var
- [ ] Lessons component var
- [ ] Tests component var
- [ ] Scenarios component var
- [ ] Games component var
- [ ] GameCard import doğru (`@egitim-galaksisi/ui`)
- [ ] Gradient renkler uygulandı
- [ ] Route tanımlandı
- [ ] StudentDashboard'a eklendi
- [ ] Navigation çalışıyor
- [ ] Geri dönüş butonları çalışıyor
- [ ] Eski dosyalar silindi

### Genel Kontrol
- [ ] Tüm route'lar çalışıyor
- [ ] Hiç duplicate kod yok
- [ ] Tüm import'lar doğru
- [ ] Build başarılı
- [ ] Lint hatasız
- [ ] TypeScript hatasız
- [ ] Responsive tasarım çalışıyor
- [ ] Tüm butonlar çalışıyor

---

## 🚨 DİKKAT EDİLECEK NOKTALAR

### 1. Import Yolları
❌ YANLIŞ:
```typescript
import GameCard from '../../core/GameCard';
import GameWrapper from '../../../common/GameWrapper';
```

✅ DOĞRU:
```typescript
import { GameCard } from '@egitim-galaksisi/ui';
import { GameWrapper } from '@egitim-galaksisi/ui';
```

### 2. Navigation
❌ YANLIŞ:
```typescript
onExit={() => window.history.back()}
```

✅ DOĞRU:
```typescript
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
onExit={() => navigate('/life-skills/hygiene')}
```

### 3. Gradient Renkler
❌ YANLIŞ:
```typescript
color="bg-gradient-to-br from-blue-500 to-cyan-600"
```

✅ DOĞRU:
```typescript
color="from-blue-500 to-cyan-600"
```

### 4. Props Interface
Her component için doğru interface:
```typescript
interface HygieneMenuProps {
  gradeLevel?: number;
  onExit?: () => void;
}
```

### 5. Route Hiyerarşisi
Doğru parent-child ilişkisi:
```
/life-skills (parent)
  /life-skills/hygiene (child)
    /life-skills/hygiene/lessons (grandchild)
```

---

## 📊 İLERLEME TAKİBİ

### Yaşam Becerileri (10 modül)
- [x] Trafik Güvenliği (Traffic) - TAMAMLANDI
- [ ] Kişisel Hijyen (Hygiene) - ŞİMDİ
- [ ] İlk Yardım (First Aid)
- [ ] Beslenme (Nutrition)
- [ ] Çevre Bilinci (Environment)
- [ ] Finansal Okuryazarlık (Financial)
- [ ] Dijital Okuryazarlık (Digital)
- [ ] Dijital Sağlık (Digital Health)
- [ ] Sosyal Beceriler (Social)
- [ ] Temel Hukuk (Law)

### Zihinsel Gelişim (4 modül)
- [ ] Hafıza Geliştirme (Memory)
- [ ] Dikkat Geliştirme (Attention)
- [ ] Mantık ve Problem Çözme (Logic)
- [ ] Yaratıcılık (Creativity)

### Dil ve İletişim (3 modül)
- [ ] Hikaye Kitabı (Story Books)
- [ ] Konuşma Becerileri (Speech)
- [ ] İletişim Becerileri (Communication)

### Oyun ve Eğlence (1 modül)
- [ ] Eğlence Oyunları (Fun Games)

**TOPLAM:** 18 modül  
**TAMAMLANAN:** 1 modül (5.5%)  
**KALAN:** 17 modül

---

## 🎯 ÖNCELİK SIRASI

### Yüksek Öncelik (Hemen)
1. Hijyen - En çok kullanılan yaşam becerisi
2. İlk Yardım - Kritik bilgi
3. Beslenme - Günlük hayat

### Orta Öncelik
4. Çevre Bilinci
5. Finansal Okuryazarlık
6. Sosyal Beceriler
7. Hikaye Kitabı

### Düşük Öncelik
8. Dijital modüller
9. Zihinsel gelişim modülleri
10. Eğlence oyunları

---

## 📞 SONRAKI ADIM

**ŞİMDİ YAPILACAK:**
1. Hijyen modülünü tamamen oluştur
2. Test et ve doğrula
3. Eski dosyaları sil
4. Bir sonraki modüle geç

**ONAY BEKLİYOR:**
Bu planı onaylıyor musun? Hijyen modülü ile başlayalım mı?
