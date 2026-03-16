import React, { useState } from 'react';

interface DigitalLessonsProps {
  gradeLevel: number;
  onExit: () => void;
}

interface Lesson {
  id: number;
  title: string;
  icon: string;
  content: string[];
  tips: string[];
}

const DigitalLessons: React.FC<DigitalLessonsProps> = ({ gradeLevel, onExit }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const getLessons = (): Lesson[] => {
    if (gradeLevel <= 2) {
      return [
        {
          id: 1,
          title: 'İnternet Nedir?',
          icon: '🌐',
          content: [
            'İnternet, bilgisayarların birbirine bağlandığı büyük bir ağdır.',
            'İnternette oyun oynayabilir, video izleyebilir ve öğrenebiliriz.',
            'İnternet kullanırken her zaman bir yetişkin yanımızda olmalı.',
            'İnternette gördüğümüz her şey doğru olmayabilir.',
          ],
          tips: [
            'Yetişkin izni olmadan internet kullanma',
            'Sadece güvenli sitelere gir',
            'Ekran süresine dikkat et',
          ],
        },
        {
          id: 2,
          title: 'Güvenli Siteler',
          icon: '🔒',
          content: [
            'Güvenli siteler yeşil kilit işareti gösterir.',
            'Sadece anne-babanın izin verdiği sitelere gir.',
            'Bilinmeyen linklere tıklama.',
            'Şüpheli bir şey görürsen hemen yetişkine söyle.',
          ],
          tips: ['Yeşil kilit işaretine bak', 'Bilinmeyen linklere tıklama', 'Yetişkine danış'],
        },
        {
          id: 3,
          title: 'Ekran Süresi',
          icon: '⏰',
          content: [
            'Çok fazla ekran başında olmak gözlerimize zarar verir.',
            'Her gün belirli bir süre ekran kullanmalıyız.',
            'Ekran dışında da oyunlar oynamalıyız.',
            'Uyumadan önce ekrana bakmamalıyız.',
          ],
          tips: ['Günde 1-2 saat ekran kullan', 'Ara ver ve dinlen', 'Dışarıda da oyna'],
        },
        {
          id: 4,
          title: 'Kişisel Bilgiler',
          icon: '🔐',
          content: [
            'Adın, adresin ve telefon numaran kişisel bilgilerdir.',
            'Kişisel bilgilerini internette kimseyle paylaşma.',
            'Fotoğraflarını yetişkin izni olmadan paylaşma.',
            'Şifrelerini kimseye söyleme.',
          ],
          tips: ['Kişisel bilgileri paylaşma', 'Şifreni gizli tut', 'Yetişkine danış'],
        },
        {
          id: 5,
          title: 'İyi Davranış',
          icon: '😊',
          content: [
            'İnternette de gerçek hayattaki gibi kibar olmalıyız.',
            'Kimseye kötü söz söylememeliyiz.',
            'Başkalarının duygularını düşünmeliyiz.',
            'Yardıma ihtiyacımız olursa yetişkine söylemeliyiz.',
          ],
          tips: ['Kibar ol', 'Kötü söz söyleme', 'Yardım iste'],
        },
      ];
    } else if (gradeLevel <= 4) {
      return [
        {
          id: 1,
          title: 'Güçlü Şifre Oluşturma',
          icon: '🔑',
          content: [
            'Güçlü şifre en az 8 karakter olmalıdır.',
            'Büyük harf, küçük harf, rakam ve özel karakter içermelidir.',
            'Doğum tarihi veya adın gibi kolay tahmin edilebilir şeyler kullanma.',
            'Her hesap için farklı şifre kullan.',
          ],
          tips: ['Karmaşık şifre oluştur', 'Şifreni kimseyle paylaşma', 'Düzenli değiştir'],
        },
        {
          id: 2,
          title: 'Bilinmeyen Kişilerle İletişim',
          icon: '👤',
          content: [
            'İnternette tanımadığın kişilerle konuşma.',
            'Bilinmeyen kişilerden gelen mesajları açma.',
            'Kimse senden kişisel bilgi istememelidir.',
            'Şüpheli bir durum olursa hemen yetişkine söyle.',
          ],
          tips: ['Yabancılarla konuşma', 'Kişisel bilgi verme', 'Yetişkine haber ver'],
        },
        {
          id: 3,
          title: 'Güvenli Oyun Oynama',
          icon: '🎮',
          content: [
            'Sadece yaşına uygun oyunlar oyna.',
            'Oyun içi satın alımlar için yetişkin izni al.',
            'Oyunda tanımadığın kişilerle kişisel bilgi paylaşma.',
            'Oyun bağımlılığından kaçın, ara ver.',
          ],
          tips: ['Yaşına uygun oyunlar seç', 'Ara ver ve dinlen', 'Yetişkin izni al'],
        },
        {
          id: 4,
          title: 'İndirme Güvenliği',
          icon: '⬇️',
          content: [
            'Sadece güvenilir kaynaklardan indirme yap.',
            'Bilinmeyen dosyaları açma.',
            'Virüs taraması yap.',
            'Yetişkin izni olmadan program yükleme.',
          ],
          tips: ['Güvenilir kaynak kullan', 'Virüs taraması yap', 'İzin al'],
        },
        {
          id: 5,
          title: 'Dijital Ayak İzi',
          icon: '👣',
          content: [
            'İnternette yaptığın her şey kayıt altına alınır.',
            'Paylaştığın fotoğraf ve yazılar silinse bile iz bırakır.',
            'Gelecekte seni etkileyebilecek şeyler paylaşma.',
            'Paylaşmadan önce düşün.',
          ],
          tips: ['Paylaşmadan önce düşün', 'Kişisel bilgi paylaşma', 'Sorumlu davran'],
        },
      ];
    } else if (gradeLevel <= 6) {
      return [
        {
          id: 1,
          title: 'Siber Zorbalık',
          icon: '🚫',
          content: [
            'Siber zorbalık, internette başkalarına zarar vermektir.',
            'Kötü mesajlar, hakaret ve tehdit siber zorbalıktır.',
            'Siber zorbalığa maruz kalırsan hemen yetişkine söyle.',
            'Başkalarına karşı her zaman saygılı ol.',
          ],
          tips: ['Zorbalığa karşı dur', 'Yetişkine haber ver', 'Saygılı ol'],
        },
        {
          id: 2,
          title: 'Sosyal Medya Güvenliği',
          icon: '📱',
          content: [
            'Sosyal medya hesaplarını gizli tut.',
            'Sadece tanıdığın kişileri arkadaş olarak ekle.',
            'Konum bilgini paylaşma.',
            'Her şeyi paylaşma, özel hayatını koru.',
          ],
          tips: ['Hesapları gizli tut', 'Konum paylaşma', 'Özel hayatı koru'],
        },
        {
          id: 3,
          title: 'Doğru Bilgi - Yanlış Bilgi',
          icon: '✅',
          content: [
            'İnternetteki her bilgi doğru değildir.',
            'Bilgi kaynaklarını kontrol et.',
            'Şüpheli haberlere inanma.',
            'Güvenilir kaynaklardan araştır.',
          ],
          tips: ['Kaynağı kontrol et', 'Araştır', 'Eleştirel düşün'],
        },
        {
          id: 4,
          title: 'Dijital İtibar',
          icon: '⭐',
          content: [
            'İnternetteki davranışların senin itibarını oluşturur.',
            'Paylaştığın içerikler seni yansıtır.',
            'Olumlu ve yapıcı içerikler paylaş.',
            'Olumsuz içeriklerden uzak dur.',
          ],
          tips: ['Olumlu içerik paylaş', 'İtibarını koru', 'Sorumlu davran'],
        },
        {
          id: 5,
          title: 'Telif Hakları',
          icon: '©️',
          content: [
            'Başkalarının içeriklerini izinsiz kullanma.',
            'Fotoğraf, video ve yazılar telif hakkı ile korunur.',
            'Kaynak göster ve izin al.',
            'Kendi özgün içeriklerini oluştur.',
          ],
          tips: ['İzin al', 'Kaynak göster', 'Özgün ol'],
        },
      ];
    } else {
      return [
        {
          id: 1,
          title: 'Dijital Okuryazarlık',
          icon: '📚',
          content: [
            'Dijital okuryazarlık, teknolojiyi etkili kullanma becerisidir.',
            'Bilgiyi değerlendirme, analiz etme ve kullanma yeteneğidir.',
            'Eleştirel düşünme ve problem çözme içerir.',
            'Sürekli öğrenme ve gelişim gerektirir.',
          ],
          tips: ['Eleştirel düşün', 'Sürekli öğren', 'Etkili kullan'],
        },
        {
          id: 2,
          title: 'Sosyal Medya Sorumluluğu',
          icon: '📲',
          content: [
            'Paylaşımlarının sonuçlarını düşün.',
            'Yanlış bilgi yayma.',
            'Başkalarının haklarına saygı göster.',
            'Yapıcı ve olumlu içerik üret.',
          ],
          tips: ['Sorumlu paylaş', 'Doğruluğu kontrol et', 'Saygılı ol'],
        },
        {
          id: 3,
          title: 'Mahremiyet ve Veri Güvenliği',
          icon: '🔐',
          content: [
            'Kişisel verilerini koru.',
            'İki faktörlü kimlik doğrulama kullan.',
            'Gizlilik ayarlarını düzenle.',
            'Veri ihlallerine karşı dikkatli ol.',
          ],
          tips: ['Verileri koru', 'Güvenlik önlemleri al', 'Gizlilik ayarlarını kontrol et'],
        },
        {
          id: 4,
          title: 'Dijital Bağımlılık',
          icon: '📵',
          content: [
            'Aşırı teknoloji kullanımı bağımlılık yaratabilir.',
            'Dengeli bir dijital yaşam sürdür.',
            'Dijital detoks yap.',
            'Gerçek hayat ilişkilerine öncelik ver.',
          ],
          tips: ['Dengeli kullan', 'Ara ver', 'Gerçek hayata odaklan'],
        },
        {
          id: 5,
          title: 'Dijital Vatandaşlık',
          icon: '🌍',
          content: [
            'Dijital vatandaşlık, online ortamda sorumlu davranmaktır.',
            'Etik kurallara uy.',
            'Topluma katkı sağla.',
            'Dijital hakları ve sorumlulukları bil.',
          ],
          tips: ['Etik davran', 'Sorumlu ol', 'Haklarını bil'],
        },
      ];
    }
  };

  const lessons = getLessons();

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedLesson(null)}
            className="mb-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
          >
            ⬅ Derslere Dön
          </button>

          <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{selectedLesson.icon}</div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                {selectedLesson.title}
              </h2>
            </div>

            <div className="space-y-6 mb-8">
              {selectedLesson.content.map((paragraph, index) => (
                <p key={index} className="text-white/90 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="bg-purple-500/20 rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-black text-purple-300 mb-4">💡 Önemli İpuçları</h3>
              <ul className="space-y-3">
                {selectedLesson.tips.map((tip, index) => (
                  <li key={index} className="text-white/90 flex items-start gap-3">
                    <span className="text-purple-400 text-xl">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onExit}
          className="mb-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
        >
          ⬅ Ana Menüye Dön
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            💻 Dijital Sağlık Dersleri
          </h1>
          <p className="text-white/80 text-lg">{gradeLevel}. Sınıf Seviyesi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="bg-slate-800/60 hover:bg-slate-700/60 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-4">{lesson.icon}</div>
              <h3 className="text-xl font-black text-white mb-2">{lesson.title}</h3>
              <p className="text-white/70 text-sm">Ders {lesson.id}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalLessons;
