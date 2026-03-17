# 🔐 Giriş Bilgileri - Mock Data

Bu dosya development ortamında kullanılacak test hesaplarını içerir.

## 📱 Uygulamalar ve Portlar

| Uygulama | Port | URL |
|----------|------|-----|
| **Öğrenci Web** | 5173 | http://localhost:5173 |
| **Öğretmen Panel** | 5174 | http://localhost:5174 |
| **Admin Panel** | 5175 | http://localhost:5175 |

## 👨‍🎓 Öğrenci Hesapları

### Öğrenci 1 - Ahmet Yılmaz
- **Email:** `ahmet@example.com`
- **Şifre:** `123456`
- **Sınıf:** 3. Sınıf
- **Özellikler:**
  - Toplam Puan: 15,420
  - Yıldız: 234
  - Oyun Sayısı: 156
  - Rozetler: first-game, math-master, speed-reader

### Öğrenci 2 - Ayşe Demir
- **Email:** `ayse@example.com`
- **Şifre:** `123456`
- **Sınıf:** 4. Sınıf
- **Özellikler:**
  - Toplam Puan: 18,950
  - Yıldız: 287
  - Oyun Sayısı: 203
  - Rozetler: first-game, math-master, language-expert, perfect-score

### Öğrenci 3 - Mehmet Kaya
- **Email:** `mehmet@example.com`
- **Şifre:** `123456`
- **Sınıf:** 2. Sınıf
- **Özellikler:**
  - Toplam Puan: 9,870
  - Yıldız: 145
  - Oyun Sayısı: 98
  - Rozetler: first-game, memory-champion

## 👨‍🏫 Öğretmen Hesapları

### Öğretmen 1 - Zeynep Öztürk
- **Email:** `zeynep.ozturk@school.com`
- **Şifre:** `teacher123`
- **Branş:** Matematik, Fen Bilimleri
- **Deneyim:** 15 yıl
- **Öğrenci Sayısı:** 2 (Ahmet, Ayşe)
- **Sınıflar:** classroom-1, classroom-2

### Öğretmen 2 - Ali Çelik
- **Email:** `ali.celik@school.com`
- **Şifre:** `teacher123`
- **Branş:** Türkçe, Sosyal Bilgiler
- **Deneyim:** 8 yıl
- **Öğrenci Sayısı:** 1 (Mehmet)
- **Sınıflar:** classroom-3

### Öğretmen 3 - Fatma Yıldırım
- **Email:** `fatma.yildirim@school.com`
- **Şifre:** `teacher123`
- **Branş:** İngilizce
- **Deneyim:** 10 yıl
- **Öğrenci Sayısı:** 1 (Ayşe)
- **Sınıflar:** classroom-2

## 👪 Veli Hesapları

### Veli 1 - Mustafa Yılmaz
- **Email:** `mustafa.yilmaz@example.com`
- **Şifre:** `parent123`
- **Çocuklar:** Ahmet Yılmaz
- **Telefon:** +90 555 123 4567

### Veli 2 - Emine Demir
- **Email:** `emine.demir@example.com`
- **Şifre:** `parent123`
- **Çocuklar:** Ayşe Demir
- **Telefon:** +90 555 234 5678

### Veli 3 - Hasan Kaya
- **Email:** `hasan.kaya@example.com`
- **Şifre:** `parent123`
- **Çocuklar:** Mehmet Kaya
- **Telefon:** +90 555 345 6789

## 🔧 Admin Hesabı

### Sistem Yöneticisi
- **Email:** `admin@egitimgalaksisi.com`
- **Şifre:** `admin123`
- **Yetkiler:** Tüm yetkiler (all permissions)
- **Okul:** school-1

## 🚀 Hızlı Başlangıç

### 1. Uygulamaları Başlatma

```bash
# Tüm uygulamaları başlat
npm run dev

# Veya tek tek:
npm run dev:web      # Öğrenci web (port 5173)
npm run dev:teacher  # Öğretmen panel (port 5174)
npm run dev:admin    # Admin panel (port 5175)
```

### 2. Giriş Yapma

#### Öğrenci Girişi
1. http://localhost:5173 adresine git
2. Email: `ahmet@example.com`
3. Şifre: `123456`
4. Giriş Yap butonuna tıkla

#### Öğretmen Girişi
1. http://localhost:5174 adresine git
2. Email: `zeynep.ozturk@school.com`
3. Şifre: `teacher123`
4. Giriş Yap butonuna tıkla

#### Admin Girişi
1. http://localhost:5175 adresine git
2. Email: `admin@egitimgalaksisi.com`
3. Şifre: `admin123`
4. Giriş Yap butonuna tıkla

## 💡 Development Mode Özellikleri

### Hızlı Giriş Butonu
Development modunda login sayfalarında "Hızlı Giriş" butonu bulunur. Bu butona tıklayarak otomatik olarak email ve şifre alanları doldurulur.

### Console Logları
Tarayıcı console'unda tüm giriş bilgileri otomatik olarak gösterilir:
```javascript
🔐 Admin Login Credentials:
Email: admin@egitimgalaksisi.com
Password: admin123

📋 All Mock Passwords: {...}
```

## 🔒 Güvenlik Notları

### ⚠️ UYARI: Sadece Development İçin!

Bu giriş bilgileri **SADECE DEVELOPMENT** ortamı içindir. Production'da:

1. ❌ Şifreler asla kodda saklanmamalı
2. ❌ Mock data kullanılmamalı
3. ✅ Gerçek authentication API kullanılmalı
4. ✅ Şifreler hash'lenmeli (bcrypt, argon2)
5. ✅ JWT token kullanılmalı
6. ✅ HTTPS zorunlu olmalı
7. ✅ Rate limiting uygulanmalı
8. ✅ 2FA (Two-Factor Authentication) eklenebilir

## 📊 Mock Data Yapısı

Mock data şu dosyalarda tanımlı:
- `packages/mock-data/src/data/users.ts` - Kullanıcı verileri
- `packages/mock-data/src/data/games.ts` - Oyun verileri
- `packages/mock-data/src/data/leaderboard.ts` - Lider tablosu

## 🧪 Test Senaryoları

### Senaryo 1: Öğrenci Deneyimi
1. Ahmet olarak giriş yap
2. Dashboard'u incele (15,420 puan, 234 yıldız)
3. Matematik oyunlarını dene
4. Hızlı okuma modülünü test et

### Senaryo 2: Öğretmen Deneyimi
1. Zeynep öğretmen olarak giriş yap
2. Öğrenci listesini görüntüle (Ahmet ve Ayşe)
3. Sınıf performansını incele
4. Ödev ataması yap

### Senaryo 3: Admin Deneyimi
1. Admin olarak giriş yap
2. Tüm kullanıcıları listele
3. Okul ayarlarını düzenle
4. Raporları görüntüle

## 🔄 Veri Sıfırlama

Mock data localStorage'da saklanır. Sıfırlamak için:

```javascript
// Browser console'da çalıştır
localStorage.clear();
// Sayfayı yenile
location.reload();
```

Veya:
- Chrome DevTools > Application > Local Storage > Clear All

## 📝 Yeni Kullanıcı Ekleme

Mock data'ya yeni kullanıcı eklemek için:

1. `packages/mock-data/src/data/users.ts` dosyasını aç
2. İlgili array'e yeni kullanıcı ekle (mockStudents, mockTeachers, vb.)
3. `mockPasswords` objesine şifre ekle
4. Uygulamayı yeniden başlat

Örnek:
```typescript
export const mockPasswords: Record<string, string> = {
  // ... mevcut şifreler
  'yeni@example.com': 'yeni123',
};

export const mockStudents: Student[] = [
  // ... mevcut öğrenciler
  {
    id: 'student-4',
    email: 'yeni@example.com',
    firstName: 'Yeni',
    lastName: 'Öğrenci',
    // ... diğer alanlar
  },
];
```

## 🎯 Sonraki Adımlar

1. ✅ Mock data ile giriş yapabiliyorsunuz
2. ⏳ Backend API entegrasyonu yapılacak
3. ⏳ Gerçek authentication sistemi eklenecek
4. ⏳ Database bağlantısı kurulacak

## 📞 Destek

Sorun yaşarsanız:
1. Console loglarını kontrol edin
2. localStorage'ı temizleyin
3. Uygulamayı yeniden başlatın
4. Bu dosyayı tekrar okuyun

---

**Son Güncelleme:** 2026-03-17
**Durum:** ✅ Aktif ve Çalışıyor
