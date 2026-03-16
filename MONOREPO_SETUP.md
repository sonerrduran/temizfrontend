# Eğitim Galaksisi Monorepo

Bu proje, Turbo ile yönetilen modern bir monorepo mimarisine sahiptir.

## Yapı

```
egitim-galaksisi/
├── apps/                    # Uygulamalar
│   ├── web/                # Öğrenci uygulaması (Host App)
│   ├── admin/              # Admin paneli
│   └── teacher/            # Öğretmen paneli
├── packages/               # Paylaşılan paketler
│   ├── ui/                 # UI bileşenleri
│   ├── game-engine/        # Oyun motoru
│   ├── shared/             # Ortak utilities
│   └── mock-data/          # Test verileri
├── micro-frontends/        # Micro frontend'ler (gelecek)
│   ├── math-games/         # Matematik oyunları
│   ├── logic-games/        # Mantık oyunları
│   └── language-games/     # Dil oyunları
├── package.json            # Root package.json
└── turbo.json              # Turbo yapılandırması
```

## Workspace'ler

### Apps

- **@egitim-galaksisi/web**: Öğrenci uygulaması (port 5173)
- **@egitim-galaksisi/admin**: Admin paneli (port 5174)
- **@egitim-galaksisi/teacher**: Öğretmen paneli (port 5175)

### Packages

- **@egitim-galaksisi/ui**: Ortak UI bileşenleri
- **@egitim-galaksisi/game-engine**: Oyun motoru ve oyun logic'i
- **@egitim-galaksisi/shared**: Utilities, hooks, types
- **@egitim-galaksisi/mock-data**: Test ve development için mock data

## Komutlar

### Development

```bash
# Tüm uygulamaları çalıştır
npm run dev

# Belirli bir uygulamayı çalıştır
npm run dev:web
npm run dev:admin
npm run dev:teacher
```

### Build

```bash
# Tüm workspace'leri build et
npm run build

# Sadece packages'ları build et
npm run build:packages

# Sadece apps'leri build et
npm run build:apps

# Belirli bir app'i build et
npm run build:web
npm run build:admin
npm run build:teacher
```

### Test

```bash
# Tüm testleri çalıştır
npm run test

# Unit testler
npm run test:unit

# Property-based testler
npm run test:property

# Integration testler
npm run test:integration

# E2E testler
npm run test:e2e

# Watch mode
npm run test:watch
```

### Lint & Format

```bash
# Lint tüm workspace'leri
npm run lint

# Format tüm dosyaları
npm run format
```

### Clean

```bash
# Tüm node_modules ve build output'larını temizle
npm run clean
```

## Turbo Özellikleri

### Caching

Turbo, build ve test sonuçlarını cache'ler. Bu sayede:
- Değişmeyen workspace'ler tekrar build edilmez
- Test sonuçları cache'den gelir
- CI/CD süreleri kısalır

### Paralel Execution

Turbo, bağımlılıkları analiz ederek mümkün olan tüm task'ları paralel çalıştırır.

### Dependency Graph

```bash
# Dependency graph'i görüntüle
npx turbo run build --graph
```

## Workspace Bağımlılıkları

### apps/web bağımlılıkları:
- @egitim-galaksisi/ui
- @egitim-galaksisi/game-engine
- @egitim-galaksisi/shared
- @egitim-galaksisi/mock-data

### apps/admin bağımlılıkları:
- @egitim-galaksisi/ui
- @egitim-galaksisi/shared
- @egitim-galaksisi/mock-data

### apps/teacher bağımlılıkları:
- @egitim-galaksisi/ui
- @egitim-galaksisi/game-engine
- @egitim-galaksisi/shared
- @egitim-galaksisi/mock-data

### packages/game-engine bağımlılıkları:
- @egitim-galaksisi/ui

### packages/mock-data bağımlılıkları:
- @egitim-galaksisi/shared

## Yeni Workspace Ekleme

### Yeni App Ekleme

1. `apps/` klasörü altında yeni klasör oluştur
2. `package.json` oluştur:
```json
{
  "name": "@egitim-galaksisi/yeni-app",
  "private": true,
  "version": "3.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```
3. Root `package.json`'a script ekle

### Yeni Package Ekleme

1. `packages/` klasörü altında yeni klasör oluştur
2. `package.json` oluştur:
```json
{
  "name": "@egitim-galaksisi/yeni-package",
  "version": "3.0.0",
  "main": "./src/index.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  }
}
```

## Environment Variables

Her app kendi `.env` dosyasına sahiptir:
- `apps/web/.env`
- `apps/admin/.env`
- `apps/teacher/.env`

## Port Yapılandırması

- **apps/web**: 5173 (default Vite port)
- **apps/admin**: 5174
- **apps/teacher**: 5175
- **micro-frontends/math-games**: 5001 (gelecek)
- **micro-frontends/logic-games**: 5002 (gelecek)
- **micro-frontends/language-games**: 5003 (gelecek)

## Troubleshooting

### Cache sorunları

```bash
# Turbo cache'i temizle
npx turbo run build --force

# Tüm cache'i temizle
rm -rf .turbo
```

### Dependency sorunları

```bash
# Tüm node_modules'leri temizle ve yeniden yükle
npm run clean
npm install
```

### Build sorunları

```bash
# Packages'ları önce build et
npm run build:packages

# Sonra apps'leri build et
npm run build:apps
```

## Gelecek Adımlar

1. **Micro Frontends**: Oyun kategorilerini micro frontend'lere taşıma
2. **Module Federation**: Vite Plugin Federation entegrasyonu
3. **Docker Compose**: Tüm servisleri birlikte çalıştırma
4. **CI/CD**: GitHub Actions ile otomatik deployment

## Daha Fazla Bilgi

- [Turbo Documentation](https://turbo.build/repo/docs)
- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [Vite Documentation](https://vitejs.dev/)
