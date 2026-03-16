# YAŞAM BECERİLERİ STANDART MİMARİ

**Tarih:** 16 Mart 2026  
**Durum:** STANDART BELİRLENDİ  

---

## 🎯 AMAÇ

Tüm yaşam becerileri kategorileri için **tek bir merkezi component** kullanarak:
- ✅ Kod tekrarını önlemek
- ✅ Tutarlı görünüm sağlamak
- ✅ Kolay bakım ve güncelleme
- ✅ Sadece içerik değişmeli, yapı aynı kalmalı

---

## 📦 MERKEZİ COMPONENT

### Dosya: `apps/web/src/features/life-skills/components/LifeSkillsCategoryMenu.tsx`

Bu component TÜM yaşam becerileri kategorileri için kullanılır.

### Props:
```typescript
interface LifeSkillsCategoryMenuProps {
  title: string;              // "Trafik ve Yol Güvenliği"
  subtitle: string;            // "Güvenli trafik için öğren!"
  bgGradient: string;          // "from-slate-900 via-red-900 to-slate-900"
  badgeColor: string;          // "bg-red-500/20 text-red-300"
  activities: Activity[];      // 4 aktivite: Dersler, Testler, Senaryolar, Oyunlar
  components: {                // Her aktivite için component
    lessons: ReactNode;
    tests: ReactNode;
    scenarios: ReactNode;
    games: ReactNode;
  };
}
```

### Sabit Özellikler (Tüm kategorilerde aynı):
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Padding: `p-4 md:p-8`
- Container: `max-w-7xl mx-auto px-2`
- Button margin: `mb-8`
- Subtitle size: `text-lg`
- Badge style: `text-[10px] font-black uppercase tracking-widest`

---

## 📝 KULLANIM ÖRNEĞİ

### Traffic (Trafik Güvenliği)

```typescript
import { useAuthStore } from '../../../stores/authStore';
import LifeSkillsCategoryMenu from '../components/LifeSkillsCategoryMenu';
import TrafficLessons from './lessons/TrafficLessons';
import TrafficTests from './tests/TrafficTests';
import TrafficScenarios from './scenarios/TrafficScenarios';
import TrafficGames from './games/TrafficGames';

export default function TrafficMenu() {
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const activities = [
    { 
      id: 'lessons' as const, 
      title: 'Dersler', 
      icon: '📚', 
      description: 'Trafik güvenliği dersleri', 
      color: 'from-red-500 to-orange-600' 
    },
    { 
      id: 'tests' as const, 
      title: 'Testler', 
      icon: '📝', 
      description: 'Trafik bilgisi testleri', 
      color: 'from-orange-500 to-amber-600' 
    },
    { 
      id: 'scenarios' as const, 
      title: 'Senaryolar', 
      icon: '🎬', 
      description: 'Gerçek trafik durumları', 
      color: 'from-amber-500 to-yellow-600' 
    },
    { 
      id: 'games' as const, 
      title: 'Oyunlar', 
      icon: '🎮', 
      description: 'Eğlenceli trafik oyunları', 
      color: 'from-yellow-500 to-orange-600' 
    }
  ];

  return (
    <LifeSkillsCategoryMenu
      title="Trafik ve Yol Güvenliği"
      subtitle="Güvenli trafik için öğren!"
      bgGradient="from-slate-900 via-red-900 to-slate-900"
      badgeColor="bg-red-500/20 text-red-300"
      activities={activities}
      components={{
        lessons: <TrafficLessons gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        tests: <TrafficTests gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        scenarios: <TrafficScenarios gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        games: <TrafficGames gradeLevel={gradeLevel} onExit={() => window.history.back()} />
      }}
    />
  );
}
```

---

## 🎨 KATEGORİ RENK PALETİ

Her kategori için özel renkler:

| Kategori | bgGradient | badgeColor | Activity Colors |
|----------|-----------|------------|-----------------|
| **Trafik** | `from-slate-900 via-red-900 to-slate-900` | `bg-red-500/20 text-red-300` | red→orange→amber→yellow |
| **Hijyen** | `from-slate-900 via-blue-900 to-slate-900` | `bg-blue-500/20 text-blue-300` | blue→cyan→teal→emerald |
| **İlk Yardım** | `from-slate-900 via-red-900 to-slate-900` | `bg-red-500/20 text-red-300` | red→rose→pink→fuchsia |
| **Beslenme** | `from-slate-900 via-green-900 to-slate-900` | `bg-green-500/20 text-green-300` | green→emerald→lime→teal |
| **Çevre** | `from-slate-900 via-emerald-900 to-slate-900` | `bg-emerald-500/20 text-emerald-300` | emerald→green→teal→cyan |
| **Finansal** | `from-slate-900 via-yellow-900 to-slate-900` | `bg-yellow-500/20 text-yellow-300` | yellow→amber→orange→gold |
| **Dijital** | `from-slate-900 via-purple-900 to-slate-900` | `bg-purple-500/20 text-purple-300` | purple→violet→indigo→blue |
| **Dijital Sağlık** | `from-slate-900 via-indigo-900 to-slate-900` | `bg-indigo-500/20 text-indigo-300` | indigo→purple→violet→blue |
| **Sosyal** | `from-slate-900 via-pink-900 to-slate-900` | `bg-pink-500/20 text-pink-300` | pink→rose→red→fuchsia |
| **Hukuk** | `from-slate-900 via-slate-800 to-slate-900` | `bg-slate-500/20 text-slate-300` | slate→gray→zinc→stone |

---

## 📁 KLASÖR YAPISI

Her kategori için standart yapı:

```
apps/web/src/features/life-skills/
├── components/
│   └── LifeSkillsCategoryMenu.tsx  ← MERKEZİ COMPONENT
├── traffic/
│   ├── TrafficMenu.tsx              ← Sadece içerik tanımlar
│   ├── lessons/TrafficLessons.tsx
│   ├── tests/TrafficTests.tsx
│   ├── scenarios/TrafficScenarios.tsx
│   └── games/TrafficGames.tsx
├── hygiene/
│   ├── HygieneMenu.tsx              ← Sadece içerik tanımlar
│   ├── lessons/HygieneLessons.tsx
│   ├── tests/HygieneTests.tsx
│   ├── scenarios/HygieneScenarios.tsx
│   └── games/HygieneGames.tsx
└── ... (diğer kategoriler)
```

---

## ✅ AVANTAJLAR

### 1. Tek Yerden Yönetim
- Layout değişikliği → Sadece `LifeSkillsCategoryMenu.tsx` güncellenir
- Grid düzeni → Tüm kategorilerde otomatik değişir
- Stil güncellemesi → Tek dosyada yapılır

### 2. Kod Tekrarı YOK
- Her kategori menüsü ~100 satır → ~30 satıra düştü
- 10 kategori x 70 satır = 700 satır kod tasarrufu

### 3. Tutarlılık
- Tüm kategoriler aynı görünür
- Aynı animasyonlar
- Aynı responsive davranış

### 4. Kolay Ekleme
Yeni kategori eklemek için:
1. Klasör oluştur
2. 4 component yaz (lessons, tests, scenarios, games)
3. Menu.tsx'de sadece içeriği tanımla
4. Bitti!

---

## 🚀 YENİ KATEGORİ EKLEME ŞABLONU

```typescript
// apps/web/src/features/life-skills/[category]/[Category]Menu.tsx

import { useAuthStore } from '../../../stores/authStore';
import LifeSkillsCategoryMenu from '../components/LifeSkillsCategoryMenu';
import [Category]Lessons from './lessons/[Category]Lessons';
import [Category]Tests from './tests/[Category]Tests';
import [Category]Scenarios from './scenarios/[Category]Scenarios';
import [Category]Games from './games/[Category]Games';

export default function [Category]Menu() {
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const activities = [
    { 
      id: 'lessons' as const, 
      title: 'Dersler', 
      icon: '📚', 
      description: '[Kategori] dersleri', 
      color: 'from-[color1] to-[color2]' 
    },
    { 
      id: 'tests' as const, 
      title: 'Testler', 
      icon: '📝', 
      description: '[Kategori] testleri', 
      color: 'from-[color2] to-[color3]' 
    },
    { 
      id: 'scenarios' as const, 
      title: 'Senaryolar', 
      icon: '🎬', 
      description: 'Gerçek [kategori] durumları', 
      color: 'from-[color3] to-[color4]' 
    },
    { 
      id: 'games' as const, 
      title: 'Oyunlar', 
      icon: '🎮', 
      description: 'Eğlenceli [kategori] oyunları', 
      color: 'from-[color4] to-[color1]' 
    }
  ];

  return (
    <LifeSkillsCategoryMenu
      title="[Kategori Başlığı]"
      subtitle="[Alt başlık]"
      bgGradient="from-slate-900 via-[color]-900 to-slate-900"
      badgeColor="bg-[color]-500/20 text-[color]-300"
      activities={activities}
      components={{
        lessons: <[Category]Lessons gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        tests: <[Category]Tests gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        scenarios: <[Category]Scenarios gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        games: <[Category]Games gradeLevel={gradeLevel} onExit={() => window.history.back()} />
      }}
    />
  );
}
```

---

## 📊 DURUM

- ✅ Merkezi component oluşturuldu
- ✅ Traffic güncellendi
- ✅ Hygiene güncellendi
- ⏳ 8 kategori daha güncellenecek

**Sonuç:** Artık tüm yaşam becerileri kategorileri aynı standart yapıyı kullanıyor! 🎉
