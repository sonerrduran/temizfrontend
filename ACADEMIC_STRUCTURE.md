# Akademik Dersler Yapısı

## 📚 Dersler

### 1. Matematik

- Sınıflar: 1-8
- Konular: Dört işlem, Kesirler, Geometri, Ölçme, Problem Çözme

### 2. Türkçe

- Sınıflar: 1-8
- Konular: Okuma, Yazma, Dilbilgisi, Edebiyat

### 3. Hayat Bilgisi

- Sınıflar: 1-3
- Konular: Benim Eşsiz Yuvam, Hayat Bilgisi

### 4. Fen Bilgisi

- Sınıflar: 3-8
- Konular: Canlılar, Madde, Enerji, Dünya ve Evren

### 5. İngilizce

- Sınıflar: 2-8
- Konular: Kelimeler, Gramer, Okuma, Dinleme, Konuşma

### 6. Almanca

- Sınıflar: 4-8 (Seçmeli)
- Konular: Kelimeler, Gramer, Okuma, Dinleme

### 7. Sosyal Bilgiler

- Sınıflar: 4-7
- Konular: Tarih, Coğrafya, Vatandaşlık

### 8. Din Kültürü ve Ahlak Bilgisi

- Sınıflar: 4-8
- Konular: İnanç, İbadet, Ahlak, Dinler Tarihi

### 9. Müzik

- Sınıflar: 1-8
- Konular: Nota, Ritim, Şarkı, Enstrüman

### 10. Beden Eğitimi

- Sınıflar: 1-8
- Konular: Spor, Oyun, Jimnastik, Sağlık

### 11. Görsel Sanatlar

- Sınıflar: 1-8
- Konular: Resim, Heykel, Tasarım, Sanat Tarihi

### 12. T.C. İnkılap Tarihi ve Atatürkçülük

- Sınıflar: 8
- Konular: Kurtuluş Savaşı, Atatürk İlkeleri, Cumhuriyet

### 13. Bilişim Teknolojileri

- Sınıflar: 5-8
- Konular: Kodlama, Algoritma, Dijital Okuryazarlık

## 📁 Klasör Yapısı

```
Frontend/components/academic/
├── math/                    # Matematik
│   ├── grade1/
│   ├── grade2/
│   └── ...
│
├── turkish/                 # Türkçe
│   ├── grade1/
│   └── ...
│
├── life-science/           # Hayat Bilgisi (1-3)
│   ├── grade1/
│   ├── grade2/
│   └── grade3/
│
├── science/                # Fen Bilgisi (3-8)
│   ├── grade3/
│   └── ...
│
├── english/                # İngilizce (2-8)
│   ├── grade2/
│   └── ...
│
├── german/                 # Almanca (4-8)
│   ├── grade4/
│   └── ...
│
├── social-studies/         # Sosyal Bilgiler (4-7)
│   ├── grade4/
│   └── ...
│
├── religion/               # Din Kültürü (4-8)
│   ├── grade4/
│   └── ...
│
├── music/                  # Müzik (1-8)
│   ├── grade1/
│   └── ...
│
├── physical-education/     # Beden Eğitimi (1-8)
│   ├── grade1/
│   └── ...
│
├── visual-arts/           # Görsel Sanatlar (1-8)
│   ├── grade1/
│   └── ...
│
├── history/               # T.C. İnkılap (8)
│   └── grade8/
│
└── informatics/           # Bilişim (5-8)
    ├── grade5/
    └── ...
```

## 🎮 Component Yapısı

Her ders için:

- `{Ders}Menu.tsx` - Ana menü
- `{Ders}GradeMenu.tsx` - Sınıf seçimi
- `grade{X}/` - Sınıf bazlı oyunlar

## 🎨 Renk Paleti

```typescript
const SUBJECT_COLORS = {
  math: '#3b82f6', // Mavi
  turkish: '#ef4444', // Kırmızı
  lifeScience: '#10b981', // Yeşil
  science: '#8b5cf6', // Mor
  english: '#f59e0b', // Turuncu
  german: '#ec4899', // Pembe
  socialStudies: '#06b6d4', // Cyan
  religion: '#84cc16', // Lime
  music: '#a855f7', // Mor-Pembe
  physicalEd: '#14b8a6', // Teal
  visualArts: '#f97316', // Turuncu-Kırmızı
  history: '#dc2626', // Koyu Kırmızı
  informatics: '#6366f1', // İndigo
};
```

## 📝 Sonraki Adımlar

1. ✅ Klasör yapısını oluştur
2. ✅ Her ders için menu component'i
3. ✅ Tema renklerini ekle
4. ✅ Router'a ekle
5. ✅ Ana dashboard'a entegre et
