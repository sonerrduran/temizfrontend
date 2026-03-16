# Gereksinimler Belgesi: Monorepo Mimari Yeniden Yapılandırma

## Genel Bakış

Bu belge, Eğitim Galaksisi projesinin monorepo mimarisine geçişi için fonksiyonel ve fonksiyonel olmayan gereksinimleri tanımlar.

## Fonksiyonel Gereksinimler

### FR-1: Monorepo Yapısı

**FR-1.1**: Sistem, 3 ayrı uygulama içeren monorepo yapısına sahip olmalıdır
- apps/web: Öğrenci uygulaması (Host application)
- apps/admin: Admin paneli
- apps/teacher: Öğretmen paneli

**FR-1.2**: Sistem, shared packages yapısına sahip olmalıdır
- packages/game-engine: Oyun motoru
- packages/ui: UI bileşenleri
- packages/shared: Ortak utilities
- packages/mock-data: Test verileri

**FR-1.3**: Sistem, micro frontends yapısına sahip olmalıdır
- micro-frontends/math-games: Matematik oyunları
- micro-frontends/logic-games: Mantık oyunları
- micro-frontends/language-games: Dil oyunları

**FR-1.4**: Tüm uygulamalar workspace bağımlılıklarını kullanmalıdır

**FR-1.5**: Micro frontends Module Federation ile yönetilmelidir
- Vite Plugin Federation kullanımı
- Runtime'da dinamik yükleme
- Shared dependencies singleton pattern

### FR-2: Routing Sistemi

**FR-2.1**: Tüm routing React Router ile yapılmalıdır
- Switch/case tabanlı routing tamamen kaldırılmalı
- setMode() gibi state-based navigation kaldırılmalı

**FR-2.2**: Her feature kendi routes.tsx dosyasına sahip olmalıdır

**FR-2.3**: Route guards implementasyonu olmalıdır
- Public routes (login, register)
- Protected routes (authenticated users)
- Role-based routes (STUDENT, TEACHER, ADMIN)

**FR-2.4**: Lazy loading ile route-based code splitting olmalıdır

### FR-3: Feature-Based Architecture

**FR-3.1**: Tüm componentler features/ klasörü altında organize edilmelidir

**FR-3.2**: components/ klasörü tamamen kaldırılmalıdır

**FR-3.3**: Her feature şu yapıya sahip olmalıdır:
- components/: Feature-specific components
- hooks/: Feature-specific hooks
- types/: Feature-specific types
- routes.tsx: Feature routes
- index.ts: Public exports

### FR-4: Oyun Sistemi

**FR-4.1**: Oyunlar micro frontends olarak organize edilmelidir
- math-games: Matematik oyunları (1-8. sınıf)
- logic-games: Mantık oyunları (Sudoku, Puzzle, Memory, Two-Player)
- language-games: Dil oyunları (Türkçe, İngilizce, 1-8. sınıf)

**FR-4.2**: Her micro frontend bağımsız olarak build ve deploy edilebilmelidir

**FR-4.3**: Dil oyunları sınıf seviyelerine göre organize edilmelidir
- turkish/grade1/, turkish/grade2/, vb.
- english/grade1/, english/grade2/, vb.

**FR-4.4**: Her oyun route-based erişime sahip olmalıdır
- Örnek: /games/math/grade1/addition
- Örnek: /games/language/turkish/grade1/letters/match

**FR-4.5**: Oyunlar game-engine package'ını kullanmalıdır

**FR-4.6**: Micro frontends host app tarafından dinamik olarak yüklenmelidir
- Lazy loading
- Error boundaries
- Fallback UI


### FR-5: Ders Sistemi

**FR-5.1**: Tüm dersler features/lessons/ altında organize edilmelidir

**FR-5.2**: Her ders konusu kendi klasörüne sahip olmalıdır
- turkish/, math/, science/, english/, vb.

**FR-5.3**: Sınıf seviyeleri alt klasörlerde organize edilmelidir
- turkish/grade1/, turkish/grade2/, vb.

**FR-5.4**: Ders menüleri route-based olmalıdır
- /lessons/turkish
- /lessons/turkish/grade1

### FR-6: Dashboard Sistemi

**FR-6.1**: Her rol için ayrı dashboard olmalıdır
- StudentDashboard
- TeacherDashboard
- AdminDashboard
- ParentDashboard

**FR-6.2**: Dashboard, kullanıcı rolüne göre otomatik yönlendirme yapmalıdır

**FR-6.3**: Dashboard'da kullanıcı istatistikleri gösterilmelidir
- Toplam oyun sayısı
- Toplam skor
- Toplam yıldız
- Seviye
- Sıralama

### FR-7: Kimlik Doğrulama

**FR-7.1**: JWT token tabanlı authentication olmalıdır

**FR-7.2**: Refresh token mekanizması olmalıdır

**FR-7.3**: Login ve register sayfaları olmalıdır

**FR-7.4**: Kullanıcı rolleri desteklenmelidir
- STUDENT
- TEACHER
- PARENT
- SCHOOL_ADMIN
- SUPER_ADMIN

### FR-8: Profil Yönetimi

**FR-8.1**: Kullanıcı profil sayfası olmalıdır

**FR-8.2**: Profil bilgileri güncellenebilmelidir
- Ad, soyad
- Avatar
- Sınıf seviyesi

**FR-8.3**: Kullanıcı istatistikleri görüntülenebilmelidir

**FR-8.4**: Başarılar (achievements) gösterilmelidir

### FR-9: Sıralama Tablosu

**FR-9.1**: Global sıralama tablosu olmalıdır

**FR-9.2**: Oyun bazlı sıralama tablosu olmalıdır

**FR-9.3**: Sıralama tablosu filtrelenebilmelidir
- Günlük, haftalık, aylık, tüm zamanlar

**FR-9.4**: Kullanıcının kendi sıralaması vurgulanmalıdır

### FR-10: Admin Paneli

**FR-10.1**: Okul yönetimi (CRUD) olmalıdır

**FR-10.2**: Öğretmen yönetimi (CRUD) olmalıdır

**FR-10.3**: Öğrenci yönetimi (CRUD) olmalıdır

**FR-10.4**: Sistem ayarları yönetimi olmalıdır

**FR-10.5**: Raporlama ve analitik olmalıdır

### FR-11: Öğretmen Paneli

**FR-11.1**: Sınıf yönetimi olmalıdır

**FR-11.2**: Öğrenci performans takibi olmalıdır

**FR-11.3**: Ödev atama ve değerlendirme olmalıdır

**FR-11.4**: İçerik oluşturma olmalıdır

**FR-11.5**: Öğretmen araçları erişimi olmalıdır
- Whiteboard, Timer, Random Picker, vb.

## Fonksiyonel Olmayan Gereksinimler

### NFR-1: Performans

**NFR-1.1**: İlk sayfa yükleme süresi (FCP) 1.5 saniyeden az olmalıdır

**NFR-1.2**: Etkileşime hazır süre (TTI) 3 saniyeden az olmalıdır

**NFR-1.3**: Oyun başlatma süresi 500ms'den az olmalıdır

**NFR-1.4**: Route değişim süresi 200ms'den az olmalıdır

**NFR-1.5**: Ana bundle boyutu 200KB'den (gzipped) küçük olmalıdır

**NFR-1.6**: Feature chunk'ları 50KB'den (gzipped) küçük olmalıdır

**NFR-1.7**: Micro frontend bundle'ları 150KB'den (gzipped) küçük olmalıdır

**NFR-1.8**: Micro frontend yükleme süresi 1 saniyeden az olmalıdır

### NFR-2: Ölçeklenebilirlik

**NFR-2.1**: Sistem, yeni feature eklemeyi kolaylaştırmalıdır

**NFR-2.2**: Sistem, yeni oyun eklemeyi kolaylaştırmalıdır

**NFR-2.3**: Sistem, yeni ders konusu eklemeyi kolaylaştırmalıdır

**NFR-2.4**: Kod tekrarı %5'ten az olmalıdır

**NFR-2.5**: Cyclomatic complexity 10'dan az olmalıdır

### NFR-3: Bakım Kolaylığı

**NFR-3.1**: Test coverage %80'den fazla olmalıdır

**NFR-3.2**: TypeScript strict mode aktif olmalıdır

**NFR-3.3**: ESLint hata sayısı 0 olmalıdır

**NFR-3.4**: Tüm public API'ler dokümante edilmelidir

**NFR-3.5**: Her feature README.md dosyasına sahip olmalıdır

### NFR-4: Güvenlik

**NFR-4.1**: Tüm API çağrıları HTTPS üzerinden yapılmalıdır

**NFR-4.2**: JWT token'lar güvenli şekilde saklanmalıdır (httpOnly cookie)

**NFR-4.3**: XSS koruması aktif olmalıdır

**NFR-4.4**: CSRF koruması aktif olmalıdır

**NFR-4.5**: Input validation hem client hem server tarafında yapılmalıdır

**NFR-4.6**: Rate limiting implementasyonu olmalıdır

**NFR-4.7**: Hassas veriler client-side'da saklanmamalıdır

### NFR-5: Kullanılabilirlik

**NFR-5.1**: Arayüz responsive olmalıdır (mobile, tablet, desktop)

**NFR-5.2**: Lighthouse accessibility score 90'dan fazla olmalıdır

**NFR-5.3**: Keyboard navigation desteklenmelidir

**NFR-5.4**: Screen reader uyumlu olmalıdır

**NFR-5.5**: Hata mesajları kullanıcı dostu olmalıdır

**NFR-5.6**: Loading states gösterilmelidir

### NFR-6: Tarayıcı Uyumluluğu

**NFR-6.1**: Chrome (son 2 versiyon) desteklenmelidir

**NFR-6.2**: Firefox (son 2 versiyon) desteklenmelidir

**NFR-6.3**: Safari (son 2 versiyon) desteklenmelidir

**NFR-6.4**: Edge (son 2 versiyon) desteklenmelidir

### NFR-7: Monitoring ve Logging

**NFR-7.1**: Error tracking sistemi olmalıdır (Sentry)

**NFR-7.2**: Analytics sistemi olmalıdır (Google Analytics)

**NFR-7.3**: Performance monitoring olmalıdır

**NFR-7.4**: User behavior tracking olmalıdır

### NFR-8: Deployment

**NFR-8.1**: CI/CD pipeline olmalıdır

**NFR-8.2**: Automated testing pipeline olmalıdır

**NFR-8.3**: Staging environment olmalıdır

**NFR-8.4**: Rollback mekanizması olmalıdır

**NFR-8.5**: Zero-downtime deployment desteklenmelidir

**NFR-8.6**: Her micro frontend bağımsız deploy edilebilmelidir

**NFR-8.7**: Micro frontends CDN'e deploy edilmelidir

**NFR-8.8**: Paralel deployment desteklenmelidir

## Kabul Kriterleri

### AC-1: Monorepo Yapısı

- [ ] 3 ayrı app çalışıyor (web, admin, teacher)
- [ ] 4 shared package çalışıyor (game-engine, ui, shared, mock-data)
- [ ] 3 micro frontend çalışıyor (math-games, logic-games, language-games)
- [ ] Workspace bağımlılıkları çözülüyor
- [ ] Turbo build sistemi çalışıyor
- [ ] Module Federation yapılandırması tamamlandı

### AC-2: Routing Sistemi

- [ ] App.tsx'te switch/case kalmadı
- [ ] Tüm routing React Router ile yapılıyor
- [ ] Route guards çalışıyor
- [ ] Lazy loading aktif
- [ ] 404 sayfası çalışıyor

### AC-3: Feature Organization

- [ ] components/ klasörü boş
- [ ] Tüm componentler features/ altında
- [ ] Her feature kendi routes.tsx'e sahip
- [ ] Import path'leri doğru

### AC-4: Oyun Sistemi

- [ ] Tüm oyunlar micro frontends'te organize
- [ ] Her micro frontend bağımsız çalışıyor
- [ ] Oyun kategorileri organize
- [ ] Sınıf seviyeleri organize
- [ ] Game engine çalışıyor
- [ ] Oyun başlatma/bitirme akışı çalışıyor
- [ ] Micro frontend yükleme çalışıyor
- [ ] Error boundaries aktif
- [ ] Fallback UI gösteriliyor

### AC-5: Performans

- [ ] FCP < 1.5s
- [ ] TTI < 3s
- [ ] Bundle size < 200KB
- [ ] Micro frontend bundle size < 150KB
- [ ] Micro frontend load time < 1s
- [ ] Lighthouse score > 90

### AC-6: Test Coverage

- [ ] Unit test coverage > %80
- [ ] Integration testler yazıldı
- [ ] E2E testler yazıldı
- [ ] Tüm testler geçiyor

### AC-7: Güvenlik

- [ ] HTTPS zorunlu
- [ ] JWT authentication çalışıyor
- [ ] Route guards çalışıyor
- [ ] Input validation aktif
- [ ] XSS/CSRF koruması aktif

### AC-8: Documentation

- [ ] README.md güncel
- [ ] API documentation tamamlandı
- [ ] Migration guide hazırlandı
- [ ] Deployment guide hazırlandı
- [ ] Micro frontends guide hazırlandı

## Kısıtlamalar

### Teknik Kısıtlamalar

**C-1**: React 18.2+ kullanılmalıdır

**C-2**: TypeScript 5.2+ kullanılmalıdır

**C-3**: Vite 5.0+ build tool olarak kullanılmalıdır

**C-4**: Turbo monorepo tool olarak kullanılmalıdır

**C-5**: React Router 6.20+ routing için kullanılmalıdır

**C-6**: Module Federation (Vite Plugin) kullanılmalıdır

### İş Kısıtlamaları

**C-7**: Migration 13 haftada tamamlanmalıdır

**C-8**: Migration sırasında production downtime olmamalıdır

**C-9**: Mevcut kullanıcı verileri korunmalıdır

**C-10**: Mevcut oyun ilerlemeleri korunmalıdır

### Kaynak Kısıtlamaları

**C-11**: Migration için maksimum 2 full-time developer

**C-12**: Staging environment mevcut

**C-13**: Production environment mevcut

**C-14**: CDN infrastructure mevcut (micro frontends için)

## Bağımlılıklar

### Harici Bağımlılıklar

**D-1**: Backend API hazır olmalıdır

**D-2**: Authentication servisi çalışıyor olmalıdır

**D-3**: Database migration tamamlanmış olmalıdır

### Dahili Bağımlılıklar

**D-4**: Design system tamamlanmış olmalıdır

**D-5**: Game engine API finalize edilmiş olmalıdır

**D-6**: Shared utilities tamamlanmış olmalıdır

**D-7**: CDN infrastructure hazır olmalıdır

## Riskler

### Yüksek Riskler

**R-1**: Migration sırasında production downtime
- Azaltma: Feature branch, staging test, gradual rollout

**R-2**: Broken dependencies
- Azaltma: TypeScript, automated tests, import validation

### Orta Riskler

**R-3**: Performance degradation
- Azaltma: Performance monitoring, bundle analysis, optimization, lazy loading

**R-4**: User experience disruption
- Azaltma: Gradual migration, feature flags, user testing

**R-5**: Micro frontend load failures
- Azaltma: Fallback URLs, error boundaries, CDN redundancy, monitoring

### Düşük Riskler

**R-6**: Documentation eksikliği
- Azaltma: Continuous documentation, code reviews

**R-7**: Test coverage yetersizliği
- Azaltma: TDD approach, automated coverage reports

**R-8**: Shared dependency conflicts
- Azaltma: Singleton pattern, version pinning, peer dependency management

## Başarı Metrikleri

### Teknik Metrikler

- Test coverage: %80+
- Bundle size: < 200KB
- Micro frontend bundle size: < 150KB
- FCP: < 1.5s
- TTI: < 3s
- Micro frontend load time: < 1s
- Lighthouse score: > 90
- ESLint errors: 0

### İş Metrikleri

- Yeni feature ekleme süresi: -50%
- Bug fix süresi: -40%
- Code review süresi: -30%
- Sayfa yükleme süresi: -60%
- Deployment süresi: -60% (paralel deployment)
- Hata oranı: -80%
- Kullanıcı memnuniyeti: +40%

## Öncelikler

### P0 (Kritik)

- Monorepo yapısı kurulumu
- Routing standardizasyonu
- Component migration
- Basic testing

### P1 (Yüksek)

- App separation (admin, teacher)
- Performance optimization
- Security implementation
- Comprehensive testing

### P2 (Orta)

- Advanced features
- Analytics integration
- Monitoring setup
- Documentation

### P3 (Düşük)

- Nice-to-have features
- Advanced optimizations
- Additional tooling
