# Eğitim Galaksisi - Monorepo

Modern, ölçeklenebilir eğitim platformu. Öğrenci, öğretmen ve yönetici uygulamalarını içeren monorepo yapısı.

## 🏗️ Mimari

```
egitim-galaksisi-monorepo/
├── apps/
│   ├── web/          # Öğrenci uygulaması
│   ├── teacher/      # Öğretmen uygulaması
│   └── admin/        # Yönetici uygulaması
└── packages/
    ├── ui/           # Paylaşılan UI component'leri
    ├── game-engine/  # Oyun motoru
    ├── shared/       # Ortak utilities ve types
    └── mock-data/    # Mock data
```

## 🚀 Başlangıç

### Gereksinimler
- Node.js 18+
- npm 9+

### Kurulum
```bash
npm install
```

### Geliştirme

Tüm uygulamaları ayrı ayrı çalıştırabilirsiniz:

```bash
# Öğrenci uygulaması (port 5173)
npm run dev:web

# Öğretmen uygulaması (port 5174)
npm run dev:teacher

# Yönetici uygulaması (port 5175)
npm run dev:admin
```

### Build

```bash
# Tüm uygulamaları build et
npm run build

# Sadece web uygulamasını build et
npm run build:web

# Sadece teacher uygulamasını build et
npm run build:teacher

# Sadece admin uygulamasını build et
npm run build:admin
```

## 📦 Packages

### @egitim-galaksisi/ui
Tüm uygulamalar tarafından kullanılan UI component kütüphanesi.

**Component'ler:**
- Button, Input, Card, Modal, Table
- Select, Toast, Loading
- GameCard, GameWrapper, ErrorBoundary, Layout

### @egitim-galaksisi/game-engine
Oyun mekanikleri ve utilities.

**Özellikler:**
- Animation utilities
- Sound management
- Timer hooks
- Level progression

### @egitim-galaksisi/shared
Ortak types, constants ve utilities.

**İçerik:**
- Types (User, Game, Category)
- Constants (APP_NAME, GRADE_LEVELS)
- Utils (formatters, validators, errors, storage)

### @egitim-galaksisi/mock-data
Geliştirme için mock data.

## 🎯 Uygulamalar

### Web (Öğrenci)
- ✅ Authentication (Login/Register)
- ✅ Dashboard
- ✅ Oyun kategorileri
- ✅ Sınıf seçimi
- ✅ Protected routes

**Giriş Bilgileri (Mock):**
- Email: `student@test.com`
- Şifre: Herhangi bir şifre

### Teacher (Öğretmen)
- ✅ Authentication
- ✅ Dashboard
- ✅ İstatistikler
- ✅ Hızlı işlemler
- ❌ Öğrenci yönetimi (yakında)
- ❌ Ödev/Sınav yönetimi (yakında)

**Giriş Bilgileri (Mock):**
- Email: `teacher@test.com`
- Şifre: Herhangi bir şifre

### Admin (Yönetici)
- ✅ Authentication
- ✅ Dashboard
- ✅ Sistem durumu
- ✅ İstatistikler
- ❌ Kullanıcı yönetimi (yakında)
- ❌ Okul yönetimi (yakında)

**Giriş Bilgileri (Mock):**
- Email: `admin@test.com`
- Şifre: Herhangi bir şifre

## 🛠️ Teknolojiler

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v7
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animation:** Framer Motion
- **HTTP Client:** Axios

## 📝 Geliştirme Notları

### Mock Mode
Tüm uygulamalar şu anda mock mode'da çalışıyor. `.env` dosyalarında `VITE_USE_MOCK=true` ayarı yapılmış durumda.

### Authentication
Mock mode'da herhangi bir e-posta ve şifre ile giriş yapabilirsiniz. Gerçek API entegrasyonu için `VITE_USE_MOCK=false` yapın ve `VITE_API_URL` ayarlayın.

### Workspace
Bu proje npm workspaces kullanıyor. Package'lar arası bağımlılıklar otomatik olarak yönetiliyor.

## 📚 Dokümantasyon

- [Mimari Analiz](./ARCHITECTURE_ANALYSIS.md) - Detaylı mimari analiz ve eksikler
- [Akademik Yapı](./ACADEMIC_STRUCTURE.md) - Akademik içerik yapısı
- [Akademik Uygulama](./ACADEMIC_IMPLEMENTATION.md) - Akademik içerik uygulaması

## 🔄 Versiyon

**v3.0.0** - Monorepo mimarisi

## 📄 Lisans

Özel - Tüm hakları saklıdır
