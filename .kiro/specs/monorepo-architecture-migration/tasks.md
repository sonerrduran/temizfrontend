# Implementation Plan: Monorepo Architecture Migration

## Overview

Bu plan, Eğitim Galaksisi projesinin monolitik yapıdan modern monorepo mimarisine geçişini kapsar. 8 faz, 13 hafta sürecek ve micro frontends mimarisi ile ölçeklenebilir bir yapı oluşturulacak.

## Tasks

- [x] 1. Faz 1: Hazırlık ve Monorepo Kurulumu (1 hafta)
  - [x] 1.1 Turbo monorepo yapısını kurma
    - Root package.json oluştur
    - Turbo yapılandırması (turbo.json)
    - Workspace yapılandırması
    - _Requirements: FR-1.1, FR-1.2, FR-1.3, FR-1.4_
  
  - [x] 1.2 Shared packages dizin yapısını oluşturma
    - packages/game-engine/ dizini ve package.json
    - packages/ui/ dizini ve package.json
    - packages/shared/ dizini ve package.json
    - packages/mock-data/ dizini ve package.json
    - _Requirements: FR-1.2_
  
  - [x] 1.3 Micro frontends dizin yapısını oluşturma
    - micro-frontends/math-games/ dizini
    - micro-frontends/logic-games/ dizini
    - micro-frontends/language-games/ dizini
    - Her micro frontend için package.json
    - _Requirements: FR-1.3, FR-4.1_
  
  - [x] 1.4 Module Federation yapılandırması
    - @originjs/vite-plugin-federation kurulumu
    - Her micro frontend için module-federation.config.ts
    - Host app (apps/web) için remote yapılandırması
    - Shared dependencies singleton pattern
    - _Requirements: FR-1.5, FR-4.6_


  - [x] 1.5 Build ve dev scriptlerini yapılandırma
    - Root package.json'a turbo scriptleri ekle
    - Her workspace için build/dev/test scriptleri
    - Docker Compose yapılandırması (tüm micro frontends)
    - _Requirements: FR-1.4, NFR-8.1_
  
  - [x] 1.6 Development environment testleri
    - Tüm workspace'lerin build olduğunu doğrula
    - Dev server'ların çalıştığını test et
    - Workspace bağımlılıklarını test et
    - _Requirements: NFR-3.1_

- [x] 2. Checkpoint - Monorepo altyapısı hazır
  - Ensure all packages build successfully, workspace dependencies resolve, and dev environment is working. Ask the user if questions arise.

- [x] 3. Faz 2: Routing Standardizasyonu (2 hafta)
  - [x] 3.1 AppRouter.tsx'i genişletme ve route yapısını oluşturma
    - Merkezi AppRouter.tsx oluştur
    - Public routes tanımla (/login, /register)
    - Protected routes yapısı oluştur
    - Role-based routing yapısı
    - _Requirements: FR-2.1, FR-2.3_
  
  - [x] 3.2 Feature-based routes dosyaları oluşturma
    - features/dashboard/routes.tsx
    - features/auth/routes.tsx
    - features/profile/routes.tsx
    - features/leaderboard/routes.tsx
    - features/lessons/routes.tsx
    - _Requirements: FR-2.2_
  
  - [x] 3.3 Switch/case routing'i React Router'a dönüştürme
    - App.tsx'teki switch/case kodlarını analiz et
    - Her case'i route'a dönüştür
    - setMode() çağrılarını navigate() ile değiştir
    - State-based navigation'ı kaldır
    - _Requirements: FR-2.1_
  
  - [x] 3.4 Route guards implementasyonu
    - ProtectedRoute component'i oluştur
    - Role-based route guard logic
    - Authentication check
    - Redirect logic
    - _Requirements: FR-2.3, FR-7.1_
  
  - [x] 3.5 Lazy loading implementasyonu
    - React.lazy() ile route-based code splitting
    - Suspense fallback component'leri
    - Loading states
    - _Requirements: FR-2.4, NFR-1.6_
  
  - [x] 3.6 Route testleri yazma
    - Public route testleri
    - Protected route testleri
    - Role-based access testleri
    - Redirect testleri
    - _Requirements: NFR-3.1_

- [x] 4. Checkpoint - Routing standardizasyonu tamamlandı
  - Ensure all switch/case routing is removed, React Router is working, route guards are active, and lazy loading is functional. Ask the user if questions arise.


- [x] 5. Faz 3: Component Migration (3 hafta)
  - [x] 5.1 Matematik oyunlarını micro frontend'e taşıma
    - components/academic/math/grade1-8/ → micro-frontends/math-games/src/games/
    - Her grade için klasör yapısı oluştur
    - Oyun component'lerini taşı
    - Index dosyalarını oluştur
    - _Requirements: FR-4.1, FR-4.3_
  
  - [x] 5.2 Mantık oyunlarını micro frontend'e taşıma
    - components/logic-games/sudoku/ → micro-frontends/logic-games/src/games/sudoku/
    - components/logic-games/puzzle/ → micro-frontends/logic-games/src/games/puzzle/
    - components/logic-games/memory/ → micro-frontends/logic-games/src/games/memory/
    - components/logic-games/two-player/ → micro-frontends/logic-games/src/games/two-player/
    - _Requirements: FR-4.1_
  
  - [x] 5.3 Türkçe oyunlarını micro frontend'e taşıma
    - components/academic/turkish/grade1-8/ → micro-frontends/language-games/src/games/turkish/
    - Her grade için klasör yapısı (letters, syllables, words, reading, writing, grammar, vocabulary)
    - Oyun component'lerini taşı
    - Index dosyalarını oluştur
    - _Requirements: FR-4.1, FR-4.3_
  
  - [x] 5.4 İngilizce oyunlarını micro frontend'e taşıma
    - components/academic/english/grade1-8/ → micro-frontends/language-games/src/games/english/
    - Her grade için klasör yapısı
    - Oyun component'lerini taşı
    - Index dosyalarını oluştur
    - _Requirements: FR-4.1, FR-4.3_
  
  - [x] 5.5 Diğer feature'ları apps/web/features/'a taşıma
    - components/fast-reading/ → apps/web/src/features/fast-reading/
    - components/focus/ → apps/web/src/features/focus/
    - components/learning/ → apps/web/src/features/learning/
    - components/language/ → apps/web/src/features/language/
    - components/stories/ → apps/web/src/features/stories/
    - components/teacher-tools/ → apps/web/src/features/teacher-tools/
    - _Requirements: FR-3.1, FR-3.2_
  
  - [x] 5.6 Yaşam becerileri feature'larını taşıma
    - components/first-aid/ → apps/web/src/features/life-skills/first-aid/
    - components/traffic/ → apps/web/src/features/life-skills/traffic/
    - components/hygiene/ → apps/web/src/features/life-skills/hygiene/
    - components/digital/ → apps/web/src/features/life-skills/digital/
    - components/financial/ → apps/web/src/features/life-skills/financial/
    - _Requirements: FR-3.1_
  
  - [x] 5.7 Ortak component'leri packages/ui'ya taşıma
    - components/common/GameTemplate.tsx → packages/ui/src/components/
    - components/common/GameWrapper.tsx → packages/ui/src/components/
    - components/common/LoadingSpinner.tsx → packages/ui/src/components/
    - components/core/ → packages/ui/src/components/
    - _Requirements: FR-1.2, FR-3.2_
  
  - [x] 5.8 Import path'lerini güncelleme
    - Tüm dosyalarda import path'lerini güncelle
    - Relative import'ları workspace import'larına dönüştür
    - TypeScript path mapping yapılandırması
    - _Requirements: FR-1.4_
  
  - [x] 5.9 Component migration testleri
    - Her taşınan component'in çalıştığını doğrula
    - Import path'lerinin doğru olduğunu test et
    - Broken import kontrolü
    - _Requirements: NFR-3.1_

- [x] 6. Checkpoint - Component migration tamamlandı
  - Ensure all components are moved to correct locations, import paths are updated, and no broken imports exist. Ask the user if questions arise.


- [x] 7. Faz 4: Micro Frontends Kurulumu (2 hafta)
  - [x] 7.1 math-games micro frontend yapılandırması
    - Vite config oluştur (port 5001)
    - Module Federation config oluştur
    - Exposed modules tanımla (MathGamesRouter, Grade1-8)
    - Shared dependencies yapılandır (React, React Router, game-engine, ui)
    - MathGamesRouter.tsx oluştur
    - _Requirements: FR-1.5, FR-4.2, FR-4.6_
  
  - [x] 7.2 logic-games micro frontend yapılandırması
    - Vite config oluştur (port 5002)
    - Module Federation config oluştur
    - Exposed modules tanımla (LogicGamesRouter, Sudoku, Puzzle, Memory, TwoPlayer)
    - Shared dependencies yapılandır
    - LogicGamesRouter.tsx oluştur
    - _Requirements: FR-1.5, FR-4.2, FR-4.6_
  
  - [x] 7.3 language-games micro frontend yapılandırması
    - Vite config oluştur (port 5003)
    - Module Federation config oluştur
    - Exposed modules tanımla (LanguageGamesRouter, TurkishGrade1-8, EnglishGrade1-8)
    - Shared dependencies yapılandır
    - LanguageGamesRouter.tsx oluştur
    - _Requirements: FR-1.5, FR-4.2, FR-4.6_
  
  - [x] 7.4 Host app (apps/web) Module Federation entegrasyonu
    - Vite config'e Module Federation plugin ekle
    - Remote'ları tanımla (mathGames, logicGames, languageGames)
    - MicroFrontendLoader component'i oluştur
    - Error boundary implementasyonu
    - Fallback UI component'leri
    - _Requirements: FR-4.6_
  
  - [x] 7.5 Micro frontend routing entegrasyonu
    - apps/web/src/features/games/routes.tsx güncelle
    - /games/math/* → MicroFrontendLoader (math)
    - /games/logic/* → MicroFrontendLoader (logic)
    - /games/language/* → MicroFrontendLoader (language)
    - Lazy loading implementasyonu
    - _Requirements: FR-4.4, FR-4.6_
  
  - [x] 7.6 Docker Compose yapılandırması
    - docker-compose.yml oluştur
    - math-games service (port 5001)
    - logic-games service (port 5002)
    - language-games service (port 5003)
    - host app service (port 5000)
    - _Requirements: NFR-8.1_
  
  - [x] 7.7 CI/CD pipeline'ları oluşturma
    - .github/workflows/deploy-math-games.yml
    - .github/workflows/deploy-logic-games.yml
    - .github/workflows/deploy-language-games.yml
    - CDN deployment yapılandırması
    - Versioning stratejisi
    - _Requirements: NFR-8.1, NFR-8.6, NFR-8.7_
  
  - [x] 7.8 Micro frontend testleri
    - Her micro frontend'in bağımsız çalıştığını test et
    - Host app'in micro frontend'leri yüklediğini test et
    - Module Federation çalışmasını doğrula
    - Shared dependencies singleton kontrolü
    - _Requirements: NFR-3.1_

- [x] 8. Checkpoint - Micro frontends kurulumu tamamlandı
  - Ensure all micro frontends are working independently, host app loads them correctly, Module Federation is functional, and Docker Compose runs all services. Ask the user if questions arise.


- [x] 9. Faz 5: App Separation (2 hafta)
  - [x] 9.1 Admin dashboard geliştirme
    - apps/admin/src/features/dashboard/AdminDashboard.tsx
    - Okul yönetimi UI (schools/)
    - Öğretmen yönetimi UI (teachers/)
    - Öğrenci yönetimi UI (students/)
    - Sistem ayarları UI (settings/)
    - Raporlama UI (reports/)
    - _Requirements: FR-10.1, FR-10.2, FR-10.3, FR-10.4, FR-10.5_
  
  - [x] 9.2 Teacher dashboard geliştirme
    - apps/teacher/src/features/dashboard/TeacherDashboard.tsx
    - Sınıf yönetimi UI (classes/)
    - Öğrenci takibi UI (students/)
    - Ödev yönetimi UI (assignments/)
    - İçerik yönetimi UI (content/)
    - Öğretmen araçları UI (tools/)
    - _Requirements: FR-11.1, FR-11.2, FR-11.3, FR-11.4, FR-11.5_
  
  - [x] 9.3 Role-based route guards implementasyonu
    - Admin routes için role guard (SCHOOL_ADMIN, SUPER_ADMIN)
    - Teacher routes için role guard (TEACHER)
    - Student routes için role guard (STUDENT)
    - Unauthorized access handling
    - _Requirements: FR-2.3, FR-7.4_
  
  - [x] 9.4 Shared components kullanımı
    - packages/ui component'lerini admin/teacher app'lerde kullan
    - Layout component'leri
    - Form component'leri
    - Table component'leri
    - _Requirements: FR-1.2_
  
  - [x] 9.5 API integration
    - Admin API servisleri (schools, teachers, students)
    - Teacher API servisleri (classes, assignments)
    - Authentication servisleri
    - Error handling
    - _Requirements: FR-7.1, FR-10.1, FR-11.1_
  
  - [x] 9.6 App separation testleri
    - Admin app çalışma testi
    - Teacher app çalışma testi
    - Role-based routing testi
    - API integration testi
    - _Requirements: NFR-3.1_

- [x] 10. Checkpoint - App separation tamamlandı
  - Ensure all three apps (web, admin, teacher) are working, role-based routing is active, and shared packages are being used. Ask the user if questions arise.


- [x] 11. Faz 6: Testing & Optimization (2 hafta)
  - [x] 11.1 Unit testler yazma
    - packages/game-engine unit testleri
    - packages/ui component testleri
    - packages/shared utility testleri
    - Feature component testleri
    - Target: %80+ coverage
    - _Requirements: NFR-3.1_
  
  - [x] 11.2 Integration testler yazma
    - Auth flow integration testleri
    - Game flow integration testleri
    - Dashboard integration testleri
    - API integration testleri
    - _Requirements: NFR-3.1_
  
  - [x] 11.3 Micro frontend testleri yazma
    - Micro frontend load testleri
    - Module Federation testleri
    - Shared dependency testleri
    - Error boundary testleri
    - _Requirements: NFR-3.1_
  
  - [x] 11.4 Bundle analysis ve optimization
    - webpack-bundle-analyzer veya vite-plugin-visualizer kullan
    - Her app için bundle size analizi
    - Her micro frontend için bundle size analizi
    - Büyük dependency'leri tespit et
    - _Requirements: NFR-1.5, NFR-1.6, NFR-1.7_
  
  - [x] 11.5 Code splitting optimization
    - Route-based code splitting doğrula
    - Component-based code splitting ekle
    - Dynamic import'ları optimize et
    - Chunk size'ları optimize et
    - _Requirements: NFR-1.6_
  
  - [x] 11.6 Performance monitoring kurulumu
    - Web Vitals tracking (FCP, TTI, LCP)
    - Micro frontend load time tracking
    - Route change performance tracking
    - Performance budget tanımla
    - _Requirements: NFR-1.1, NFR-1.2, NFR-1.8, NFR-7.3_
  
  - [x] 11.7 Accessibility testleri
    - Lighthouse accessibility audit
    - Keyboard navigation testleri
    - Screen reader testleri
    - ARIA attributes kontrolü
    - Target: Score > 90
    - _Requirements: NFR-5.2, NFR-5.3, NFR-5.4_

- [x] 12. Checkpoint - Testing ve optimization tamamlandı
  - Ensure test coverage is above 80%, bundle sizes meet targets, performance metrics are within limits, and accessibility score is above 90. Ask the user if questions arise.


- [x] 13. Faz 7: Kod Temizleme ve Optimizasyon (2 hafta)
  - [x] 13.1 Kullanılmayan bileşenleri tespit ve kaldırma
    - components/ klasörünü tamamen kaldır
    - Kullanılmayan .tsx/.ts dosyalarını tespit et
    - Import edilmeyen bileşenleri bul ve sil
    - Gereksiz export'ları kaldır
    - Dead code elimination
    - _Requirements: FR-3.2, NFR-2.4_
  
  - [x] 13.2 Kullanılmayan dependency'leri kaldırma
    - Her workspace için depcheck çalıştır
    - Kullanılmayan npm paketlerini tespit et
    - package.json'lardan gereksiz dependency'leri kaldır
    - Peer dependency'leri kontrol et
    - _Requirements: NFR-2.4_
  
  - [x] 13.3 Duplicate code consolidation
    - jscpd ile duplicate code tespit et
    - Game initialization logic'i packages/game-engine'e taşı
    - Score calculation logic'i consolidate et
    - Timer logic'i consolidate et
    - Animation logic'i consolidate et
    - Sound effect logic'i consolidate et
    - Validation logic'i packages/shared'e taşı
    - Target: Duplicate code < %5
    - _Requirements: NFR-2.4_
  
  - [x] 13.4 Commented-out code kaldırma
    - Tüm dosyalarda commented-out code block'larını bul
    - Gereksiz comment'leri kaldır
    - TODO/FIXME comment'lerini issue'ya dönüştür
    - console.log statement'larını kaldır
    - Debug code'larını kaldır
    - _Requirements: NFR-3.2_
  
  - [x] 13.5 Import statement standardizasyonu
    - Tüm dosyalarda import'ları alfabetik sırala
    - Import grouping uygula (external, internal, relative)
    - Unused import'ları kaldır
    - Absolute import'ları standardize et
    - _Requirements: NFR-3.2_
  
  - [x] 13.6 ESLint ve Prettier yapılandırması
    - Root .eslintrc.js oluştur
    - Monorepo için ESLint kuralları ekle
    - .prettierrc yapılandırması
    - Husky + lint-staged kurulumu
    - Pre-commit hooks yapılandırması
    - Tüm dosyalarda ESLint çalıştır ve hataları düzelt
    - Target: 0 ESLint errors
    - _Requirements: NFR-3.3_
  
  - [x] 13.7 TypeScript strict mode aktivasyonu
    - tsconfig.json'da strict: true yap
    - noImplicitAny hatalarını düzelt
    - strictNullChecks hatalarını düzelt
    - any kullanımını azalt
    - Type safety iyileştirmeleri
    - _Requirements: NFR-3.2_
  
  - [x] 13.8 Bundle size optimization
    - Bundle analyzer çalıştır (her app + micro frontend)
    - Büyük dependency'leri optimize et veya değiştir
    - Tree shaking yapılandırmasını doğrula
    - Code splitting'i optimize et
    - Target: Main bundle < 200KB, Feature chunks < 50KB, Micro frontends < 150KB
    - _Requirements: NFR-1.5, NFR-1.6, NFR-1.7_
  
  - [x] 13.9 Asset optimization
    - Image'leri WebP formatına dönüştür
    - SVG'leri optimize et (SVGO)
    - Font subsetting uygula
    - Lazy loading images implementasyonu
    - Asset compression
    - _Requirements: NFR-1.1_
  
  - [x] 13.10 Dead code elimination doğrulama
    - ts-prune ile unused exports tespit et
    - unimported ile dead code bul
    - Tree shaking'in çalıştığını doğrula
    - Final cleanup
    - _Requirements: NFR-2.4_

- [x] 14. Checkpoint - Kod temizleme tamamlandı
  - Ensure components/ folder is removed, unused dependencies are cleaned, duplicate code is below 5%, ESLint errors are 0, TypeScript strict mode is active, and bundle sizes meet targets. Ask the user if questions arise.


- [x] 15. Faz 8: Deployment & Monitoring (1 hafta)
  - [x] 15.1 Production build yapılandırması
    - Her app için production build scripti
    - Her micro frontend için production build scripti
    - Environment variables yapılandırması
    - Build optimization flags
    - _Requirements: NFR-8.1_
  
  - [x] 15.2 CDN deployment yapılandırması (Micro Frontends)
    - AWS S3 bucket'ları oluştur (math-games, logic-games, language-games)
    - CloudFront distribution'ları yapılandır
    - CDN URL'lerini environment variable'lara ekle
    - Versioning stratejisi implementasyonu
    - _Requirements: NFR-8.6, NFR-8.7_
  
  - [x] 15.3 Host app deployment yapılandırması
    - Production server yapılandırması
    - Environment-specific config (dev, staging, production)
    - Remote URL'leri yapılandır (CDN URL'leri)
    - Fallback URL'leri yapılandır
    - _Requirements: NFR-8.1, NFR-8.5_
  
  - [x] 15.4 CI/CD pipeline'larını finalize etme
    - GitHub Actions workflow'larını test et
    - Paralel deployment yapılandırması
    - Automated testing pipeline
    - Build cache optimization
    - _Requirements: NFR-8.1, NFR-8.2, NFR-8.8_
  
  - [x] 15.5 Error tracking kurulumu (Sentry)
    - Sentry projesi oluştur
    - Her app için Sentry entegrasyonu
    - Her micro frontend için Sentry entegrasyonu
    - Error boundary'lerde Sentry reporting
    - Source map upload yapılandırması
    - _Requirements: NFR-7.1_
  
  - [x] 15.6 Analytics kurulumu (Google Analytics)
    - GA4 property oluştur
    - Her app için GA entegrasyonu
    - Custom event tracking (game_started, game_completed, etc.)
    - User behavior tracking
    - Micro frontend load tracking
    - _Requirements: NFR-7.2, NFR-7.4_
  
  - [x] 15.7 Performance monitoring kurulumu
    - Web Vitals tracking implementasyonu
    - Micro frontend load time monitoring
    - API response time tracking
    - Performance budget alerts
    - _Requirements: NFR-7.3_
  
  - [x] 15.8 Rollback mekanizması implementasyonu
    - Micro frontend versioning sistemi
    - Fallback URL mekanizması
    - Feature flag sistemi (yeni/eski versiyon)
    - Automated rollback on error threshold
    - _Requirements: NFR-8.4_
  
  - [x] 15.9 Documentation tamamlama
    - README.md güncelle (root + her workspace)
    - API documentation
    - Migration guide
    - Deployment guide
    - Micro frontends guide
    - Developer onboarding guide
    - _Requirements: NFR-3.4, NFR-3.5_
  
  - [x] 15.10 Production deployment ve smoke tests
    - Staging environment'a deploy et
    - Smoke tests çalıştır
    - Production'a deploy et
    - Post-deployment verification
    - Monitoring dashboard'larını kontrol et
    - _Requirements: NFR-8.3, NFR-8.5_

- [x] 16. Final Checkpoint - Migration tamamlandı
  - Ensure all apps and micro frontends are deployed to production, monitoring is active, documentation is complete, and rollback plan is ready. Verify all acceptance criteria are met. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at the end of each phase
- Total timeline: 13 weeks (8 phases)
- Micro frontends enable independent deployment and scaling
- Focus on code quality, performance, and maintainability throughout

## Migration Timeline

- Faz 1: Hazırlık (1 hafta) - Tasks 1-2
- Faz 2: Routing Standardizasyonu (2 hafta) - Tasks 3-4
- Faz 3: Component Migration (3 hafta) - Tasks 5-6
- Faz 4: Micro Frontends Kurulumu (2 hafta) - Tasks 7-8
- Faz 5: App Separation (2 hafta) - Tasks 9-10
- Faz 6: Testing & Optimization (2 hafta) - Tasks 11-12
- Faz 7: Kod Temizleme ve Optimizasyon (2 hafta) - Tasks 13-14
- Faz 8: Deployment & Monitoring (1 hafta) - Tasks 15-16

## Success Metrics

- Test coverage: %80+
- Bundle size: Main < 200KB, Features < 50KB, Micro frontends < 150KB
- FCP: < 1.5s
- TTI: < 3s
- Micro frontend load time: < 1s
- Lighthouse score: > 90
- ESLint errors: 0
- Duplicate code: < %5
- Zero production downtime during migration
