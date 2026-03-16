# Micro Frontends Mimarisi Rehberi

## Genel Bakış

Bu belge, Eğitim Galaksisi projesinde micro frontends mimarisinin nasıl uygulandığını ve yönetildiğini açıklar.

## Micro Frontend Yapısı

### 3 Ana Micro Frontend

1. **math-games** (Port: 5001)
   - Matematik oyunları (1-8. sınıf)
   - Toplama, çıkarma, çarpma, bölme, kesirler, geometri, vb.

2. **logic-games** (Port: 5002)
   - Mantık oyunları
   - Sudoku, puzzle, memory, two-player oyunlar

3. **language-games** (Port: 5003)
   - Dil oyunları (Türkçe, İngilizce)
   - Harf, hece, kelime, okuma, yazma, dilbilgisi, kelime hazinesi

## Teknoloji Stack

- **Module Federation**: Vite Plugin Federation (@originjs/vite-plugin-federation)
- **Build Tool**: Vite 5.0+
- **Framework**: React 18.2+
- **Routing**: React Router 6.20+
- **Shared Packages**: game-engine, ui, shared

## Dizin Yapısı

```
monorepo-root/
├── apps/
│   ├── web/                    # Host application (port 5000)
│   ├── admin/                  # Admin panel (port 5010)
│   └── teacher/                # Teacher panel (port 5020)
├── micro-frontends/
│   ├── math-games/             # Matematik oyunları MF (port 5001)
│   ├── logic-games/            # Mantık oyunları MF (port 5002)
│   └── language-games/         # Dil oyunları MF (port 5003)
└── packages/
    ├── game-engine/            # Oyun motoru
    ├── ui/                     # UI bileşenleri
    ├── shared/                 # Ortak utilities
    └── mock-data/              # Mock data
```

## Development

### Tüm Servisleri Başlatma

```bash
# Docker Compose ile (önerilen)
npm run dev

# Veya manuel olarak
npm run dev:all
```

### Tek Bir Micro Frontend Başlatma

```bash
# Math games
npm run dev:math

# Logic games
npm run dev:logic

# Language games
npm run dev:language

# Host app
npm run dev:host
```

### URL'ler

- Host App: http://localhost:5000
- Math Games: http://localhost:5001
- Logic Games: http://localhost:5002
- Language Games: http://localhost:5003
- Admin: http://localhost:5010
- Teacher: http://localhost:5020

## Module Federation Yapılandırması

### Micro Frontend (Remote)

```typescript
// micro-frontends/math-games/module-federation.config.ts
import { defineConfig } from '@originjs/vite-plugin-federation';

export default defineConfig({
  name: 'mathGames',
  filename: 'remoteEntry.js',
  exposes: {
    './MathGamesRouter': './src/MathGamesRouter.tsx',
    './Grade1': './src/games/grade1/index.ts',
    './Grade2': './src/games/grade2/index.ts',
    // ...
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.2.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
    'react-router-dom': { singleton: true, requiredVersion: '^6.20.0' },
    '@egitim-galaksisi/game-engine': { singleton: true },
    '@egitim-galaksisi/ui': { singleton: true },
  }
});
```

### Host Application

```typescript
// apps/web/module-federation.config.ts
import { defineConfig } from '@originjs/vite-plugin-federation';

export default defineConfig({
  name: 'host',
  remotes: {
    mathGames: 'http://localhost:5001/assets/remoteEntry.js',
    logicGames: 'http://localhost:5002/assets/remoteEntry.js',
    languageGames: 'http://localhost:5003/assets/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.2.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
    'react-router-dom': { singleton: true, requiredVersion: '^6.20.0' },
    '@egitim-galaksisi/game-engine': { singleton: true },
    '@egitim-galaksisi/ui': { singleton: true },
  }
});
```

## Micro Frontend Yükleme

### MicroFrontendLoader Component

```typescript
// apps/web/src/features/games/components/MicroFrontendLoader.tsx
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@egitim-galaksisi/ui';
import { ErrorBoundary } from '@egitim-galaksisi/ui';

const MathGamesRouter = lazy(() => import('mathGames/MathGamesRouter'));
const LogicGamesRouter = lazy(() => import('logicGames/LogicGamesRouter'));
const LanguageGamesRouter = lazy(() => import('languageGames/LanguageGamesRouter'));

export function MicroFrontendLoader({ category }: { category: string }) {
  const getRouter = () => {
    switch (category) {
      case 'math':
        return <MathGamesRouter />;
      case 'logic':
        return <LogicGamesRouter />;
      case 'language':
        return <LanguageGamesRouter />;
      default:
        return <div>Kategori bulunamadı</div>;
    }
  };

  return (
    <ErrorBoundary fallback={<div>Oyun yüklenemedi</div>}>
      <Suspense fallback={<LoadingSpinner />}>
        {getRouter()}
      </Suspense>
    </ErrorBoundary>
  );
}
```

### Routing

```typescript
// apps/web/src/features/games/routes.tsx
import { Routes, Route } from 'react-router-dom';
import { MicroFrontendLoader } from './components/MicroFrontendLoader';

export function GameRoutes() {
  return (
    <Routes>
      <Route path="/math/*" element={<MicroFrontendLoader category="math" />} />
      <Route path="/logic/*" element={<MicroFrontendLoader category="logic" />} />
      <Route path="/language/*" element={<MicroFrontendLoader category="language" />} />
    </Routes>
  );
}
```

## Build ve Deployment

### Development Build

```bash
# Tüm micro frontend'leri build et
npm run build

# Tek bir micro frontend build et
npm run build:math
npm run build:logic
npm run build:language
```

### Production Deployment

Her micro frontend bağımsız olarak CDN'e deploy edilir:

```bash
# Math games deployment
cd micro-frontends/math-games
npm run build
aws s3 sync dist/ s3://cdn.egitimgalaksisi.com/math-games/
aws cloudfront create-invalidation --distribution-id $CF_DIST_ID

# Logic games deployment
cd micro-frontends/logic-games
npm run build
aws s3 sync dist/ s3://cdn.egitimgalaksisi.com/logic-games/

# Language games deployment
cd micro-frontends/language-games
npm run build
aws s3 sync dist/ s3://cdn.egitimgalaksisi.com/language-games/
```

### Production URL'ler

```typescript
// apps/web/.env.production
VITE_MATH_GAMES_URL=https://cdn.egitimgalaksisi.com/math-games/assets/remoteEntry.js
VITE_LOGIC_GAMES_URL=https://cdn.egitimgalaksisi.com/logic-games/assets/remoteEntry.js
VITE_LANGUAGE_GAMES_URL=https://cdn.egitimgalaksisi.com/language-games/assets/remoteEntry.js
```

## Yeni Oyun Ekleme

### 1. Doğru Micro Frontend'i Seç

- Matematik oyunu → `micro-frontends/math-games/`
- Mantık oyunu → `micro-frontends/logic-games/`
- Dil oyunu → `micro-frontends/language-games/`

### 2. Oyun Bileşenini Oluştur

```typescript
// micro-frontends/math-games/src/games/grade1/addition/NewAdditionGame.tsx
import { GameTemplate } from '@egitim-galaksisi/game-engine';

export function NewAdditionGame() {
  // Oyun logic'i
  return (
    <GameTemplate
      title="Yeni Toplama Oyunu"
      // ...
    >
      {/* Oyun içeriği */}
    </GameTemplate>
  );
}
```

### 3. Export Et

```typescript
// micro-frontends/math-games/src/games/grade1/addition/index.ts
export { NewAdditionGame } from './NewAdditionGame';
```

### 4. Route Ekle

```typescript
// micro-frontends/math-games/src/MathGamesRouter.tsx
import { NewAdditionGame } from './games/grade1/addition';

export function MathGamesRouter() {
  return (
    <Routes>
      <Route path="/grade1/addition/new" element={<NewAdditionGame />} />
      {/* Diğer route'lar */}
    </Routes>
  );
}
```

### 5. Test Et

```bash
cd micro-frontends/math-games
npm run dev
# http://localhost:5001/grade1/addition/new adresine git
```

## Troubleshooting

### Micro Frontend Yüklenmiyor

1. Micro frontend dev server'ı çalışıyor mu kontrol et
2. Module Federation yapılandırmasını kontrol et
3. Browser console'da hata var mı kontrol et
4. Network tab'de remoteEntry.js yükleniyor mu kontrol et

### Shared Dependency Conflicts

1. Tüm micro frontend'lerde aynı React versiyonu kullanılıyor mu?
2. Singleton: true ayarı yapıldı mı?
3. RequiredVersion uyumlu mu?

### Build Hataları

1. TypeScript hatalarını kontrol et
2. Import path'leri doğru mu?
3. Workspace bağımlılıkları yüklü mü? (`npm install`)

## Best Practices

### 1. Shared Dependencies

- React, React DOM, React Router her zaman singleton olmalı
- Game engine ve UI packages singleton olmalı
- Version uyumluluğuna dikkat et

### 2. Error Handling

- Her micro frontend ErrorBoundary ile sarmalı
- Fallback UI göster
- Hataları monitoring servisine logla

### 3. Performance

- Lazy loading kullan
- Code splitting uygula
- Bundle size'ı küçük tut (< 150KB gzipped)
- Preload kritik micro frontend'leri

### 4. Testing

- Her micro frontend'i bağımsız test et
- Integration testleri yaz
- E2E testlerde tüm micro frontend'leri birlikte test et

### 5. Versioning

- Semantic versioning kullan
- Breaking change'lerde major version artır
- Backward compatibility'yi koru

## Monitoring

### Metrics

- Micro frontend load time
- Error rate
- User interactions
- Bundle size

### Alerting

- Load time > 3s
- Error rate > 1%
- Failed loads

## Rollback Stratejisi

1. Önceki versiyon CDN'de tutulur
2. Environment variable ile versiyon değiştir
3. CloudFront invalidation
4. Monitoring ile doğrula

```bash
# Rollback example
aws s3 sync s3://cdn.egitimgalaksisi.com/math-games-backup/ s3://cdn.egitimgalaksisi.com/math-games/
aws cloudfront create-invalidation --distribution-id $CF_DIST_ID
```

## Kaynaklar

- [Module Federation Docs](https://module-federation.github.io/)
- [Vite Plugin Federation](https://github.com/originjs/vite-plugin-federation)
- [Micro Frontends Pattern](https://martinfowler.com/articles/micro-frontends.html)
