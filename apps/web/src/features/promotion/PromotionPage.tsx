import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PromotionPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: '🤖',
      title: 'Yapay Zeka Destekli Öğrenme',
      description: 'Her öğrenciye özel AI asistan ile kişiselleştirilmiş eğitim deneyimi',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: '�',
      title: 'Akıllı Pratik Sistemi',
      description: 'AI ile oluşturulan sınırsız soru ve alıştırma - Öğren, Pratik Yap, Başar!',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: '📚',
      title: 'MEB Uyumlu Müfredat',
      description: 'Tüm dersler ve konular, güncel müfredata uygun şekilde hazırlandı',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: '�',
      title: 'Anlık Performans Analizi',
      description: 'AI destekli detaylı raporlama ile öğrenci gelişimini takip edin',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: '🎮',
      title: '1000+ Eğitici Oyun',
      description: 'Gamification ile öğrenme eğlenceli ve motive edici hale gelir',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: '🏆',
      title: 'Kişisel Gelişim Takibi',
      description: 'Rozetler, başarı sistemi ve liderlik tablosu ile motivasyon',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  const stats = [
    { value: '∞', label: 'AI Soru Üretimi', icon: '🤖' },
    { value: '1000+', label: 'Eğitici Oyun', icon: '🎮' },
    { value: '50+', label: 'Ders Konusu', icon: '📚' },
    { value: '7/24', label: 'AI Asistan', icon: '💬' },
  ];

  const aiFeatures = [
    {
      title: 'Öğren',
      description: 'AI destekli interaktif dersler',
      icon: '📖',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Pratik Yap',
      description: 'Sınırsız AI soru üretimi',
      icon: '✍️',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Başar',
      description: 'Kişiselleştirilmiş geri bildirim',
      icon: '🎯',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const getFeatureDetails = (index: number): string[] => {
    const details = [
      [
        'Her öğrenciye özel AI asistan',
        'Kişiselleştirilmiş öğrenme yolu',
        'Anlık geri bildirim ve açıklamalar',
        'Zayıf konularda otomatik pekiştirme',
      ],
      [
        'Sınırsız soru üretimi',
        'Her seviyeye uygun sorular',
        'Öğren, Pratik Yap, Başar döngüsü',
        'Kalıcı öğrenme garantisi',
      ],
      [
        'Tüm dersler ve konular',
        'Güncel müfredata uygun',
        'İnteraktif ders içerikleri',
        '1-8. sınıf tam destek',
      ],
      [
        'AI destekli performans takibi',
        'Detaylı raporlama sistemi',
        'Güçlü ve zayıf yönler analizi',
        'Gelişim grafikler ve istatistikler',
      ],
      [
        '1000+ eğitici oyun',
        'Gamification ile motivasyon',
        'Eğlenceli öğrenme deneyimi',
        'Rozetler ve ödüller',
      ],
      [
        'Kişisel başarı takibi',
        'Liderlik tablosu',
        'Rozet ve başarı sistemi',
        'Motivasyon araçları',
      ],
    ];
    return details[index] || [];
  };

  const getFeatureMessages = (index: number) => {
    const messages = [
      [
        { icon: '🤖', title: 'AI Asistan', text: '"Matematik konusunda zorlanıyorsun. Sana özel 5 soru hazırladım!"' },
        { icon: '📊', title: 'Akıllı Analiz', text: '"Geometri konusunda %90 başarılısın! Harika gidiyorsun."' },
        { icon: '💡', title: 'Öneriler', text: '"Kesirler konusunu tekrar etmeni öneriyorum. 3 alıştırma hazırladım."' },
      ],
      [
        { icon: '✍️', title: 'Soru Üretimi', text: '"Senin seviyene uygun 10 yeni soru hazırladım. Başlayalım mı?"' },
        { icon: '🎯', title: 'Pratik Sonucu', text: '"Harika! %85 başarı oranı. Bir sonraki seviyeye geçmeye hazırsın."' },
        { icon: '📈', title: 'İlerleme', text: '"Bu hafta 50 soru çözdün. Hedefine %80 ulaştın!"' },
      ],
      [
        { icon: '📚', title: 'Ders İçeriği', text: '"Matematik 5. Sınıf - Kesirler konusu için 8 ders hazır."' },
        { icon: '🎓', title: 'Konu Tamamlama', text: '"Tebrikler! Toplama-Çıkarma konusunu tamamladın."' },
        { icon: '📖', title: 'Yeni Konu', text: '"Çarpma tablosu konusuna başlamaya hazır mısın?"' },
      ],
      [
        { icon: '📊', title: 'Performans', text: '"Bu ay 120 soru çözdün ve %88 başarı oranına ulaştın."' },
        { icon: '📈', title: 'Gelişim', text: '"Geçen aya göre %15 daha iyi performans gösteriyorsun!"' },
        { icon: '🎯', title: 'Hedef', text: '"Aylık hedefine ulaşmak için 30 soru daha çözmen yeterli."' },
      ],
      [
        { icon: '🎮', title: 'Oyun Daveti', text: '"Matematik Macerası oyununda yeni seviye açıldı!"' },
        { icon: '🏆', title: 'Başarı', text: '"Tebrikler! Matematik Ustası rozetini kazandın!"' },
        { icon: '⭐', title: 'Puan', text: '"Bu hafta 500 puan kazandın. Liderlik tablosunda 3. sıradasın!"' },
      ],
      [
        { icon: '🏆', title: 'Rozet', text: '"Yeni rozet kazandın: Matematik Şampiyonu 🎉"' },
        { icon: '📊', title: 'Sıralama', text: '"Sınıf liderlik tablosunda 2. sıraya yükseldin!"' },
        { icon: '⭐', title: 'Seviye', text: '"Tebrikler! 5. seviyeye ulaştın. Yeni özellikler açıldı."' },
      ],
    ];
    return messages[index] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white">Eğitim Galaksisi</span>
              <div className="flex items-center space-x-1 text-xs text-cyan-400">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                <span>AI Powered</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold hover:bg-white/20 transition-all border border-white/20"
          >
            Giriş Yap
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-full border border-cyan-500/30 mb-8">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
          <span className="text-cyan-300 text-sm font-semibold">Yapay Zeka Destekli Eğitim Platformu</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
          Eğitimde Yeni Bir{' '}
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 blur-xl opacity-50"></span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
              Çağ Başlıyor
            </span>
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed">
          <span className="font-bold text-cyan-300">Yapay Zeka</span> ile kişiselleştirilmiş öğrenme deneyimi.
          <br />
          <span className="text-slate-300">Sınırsız soru üretimi, akıllı pratik sistemi ve anlık geri bildirim.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => navigate('/register')}
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-blue-500/50 relative overflow-hidden"
          >
            <span className="relative z-10">Ücretsiz Deneyin</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30"
          >
            Demo İzleyin
          </button>
        </div>

        {/* AI Features Showcase */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {aiFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-blue-200 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Platform İçeriği Showcase */}
        <div className="max-w-7xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Zengin İçerik Kütüphanesi
            </h2>
            <p className="text-lg text-blue-200">
              Akademik derslerden yaşam becerilerine, oyunlardan zihinsel gelişime kadar her şey bir arada
            </p>
          </div>

          <div className="space-y-8">
            {/* Akademik Dersler */}
            <div>
              <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all mb-4">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">📚</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">Akademik Dersler</h3>
                    <p className="text-blue-200 text-sm">Matematik, Türkçe, İngilizce ve daha fazlası</p>
                  </div>
                  <div className="text-cyan-300 text-xs font-semibold">MEB Uyumlu</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
                  <div className="text-4xl mb-3">🔢</div>
                  <div className="text-white text-lg font-semibold">Matematik</div>
                  <div className="text-blue-300 text-sm">1-8. Sınıf</div>
                </div>
                <div className="bg-indigo-500/10 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20 hover:border-indigo-400/40 transition-all">
                  <div className="text-4xl mb-3">📝</div>
                  <div className="text-white text-lg font-semibold">Türkçe</div>
                  <div className="text-blue-300 text-sm">1-8. Sınıf</div>
                </div>
                <div className="bg-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all">
                  <div className="text-4xl mb-3">🇬🇧</div>
                  <div className="text-white text-lg font-semibold">İngilizce</div>
                  <div className="text-blue-300 text-sm">2-8. Sınıf</div>
                </div>
                <div className="bg-cyan-500/10 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                  <div className="text-4xl mb-3">🔬</div>
                  <div className="text-white text-lg font-semibold">Fen Bilimleri</div>
                  <div className="text-blue-300 text-sm">3-8. Sınıf</div>
                </div>
              </div>
            </div>

            {/* Yaşam Becerileri */}
            <div>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all mb-4">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">🌟</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">Yaşam Becerileri</h3>
                    <p className="text-blue-200 text-sm">Günlük hayatta ihtiyaç duyulan beceriler</p>
                  </div>
                  <div className="text-cyan-300 text-xs font-semibold">11 Beceri Alanı</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-red-500/10 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 hover:border-red-400/40 transition-all">
                  <div className="text-4xl mb-3">🚦</div>
                  <div className="text-white text-lg font-semibold">Trafik</div>
                  <div className="text-blue-300 text-sm">Güvenlik</div>
                </div>
                <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
                  <div className="text-4xl mb-3">🧼</div>
                  <div className="text-white text-lg font-semibold">Hijyen</div>
                  <div className="text-blue-300 text-sm">Temizlik</div>
                </div>
                <div className="bg-green-500/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all">
                  <div className="text-4xl mb-3">🏥</div>
                  <div className="text-white text-lg font-semibold">İlk Yardım</div>
                  <div className="text-blue-300 text-sm">Sağlık</div>
                </div>
                <div className="bg-yellow-500/10 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-400/40 transition-all">
                  <div className="text-4xl mb-3">🥗</div>
                  <div className="text-white text-lg font-semibold">Beslenme</div>
                  <div className="text-blue-300 text-sm">Sağlıklı Yaşam</div>
                </div>
              </div>
            </div>

            {/* Zihinsel Gelişim */}
            <div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all mb-4">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">🧠</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">Zihinsel Gelişim</h3>
                    <p className="text-blue-200 text-sm">Bilişsel yetenekleri geliştiren programlar</p>
                  </div>
                  <div className="text-cyan-300 text-xs font-semibold">Bilimsel Yöntem</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
                  <div className="text-4xl mb-3">⚡</div>
                  <div className="text-white text-lg font-semibold">Hızlı Okuma</div>
                  <div className="text-blue-300 text-sm">Speed Reading</div>
                </div>
                <div className="bg-cyan-500/10 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                  <div className="text-4xl mb-3">🧘</div>
                  <div className="text-white text-lg font-semibold">Konsantrasyon</div>
                  <div className="text-blue-300 text-sm">Odaklanma</div>
                </div>
                <div className="bg-orange-500/10 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 hover:border-orange-400/40 transition-all">
                  <div className="text-4xl mb-3">🚀</div>
                  <div className="text-white text-lg font-semibold">Hızlı Öğrenme</div>
                  <div className="text-blue-300 text-sm">Teknikler</div>
                </div>
                <div className="bg-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all">
                  <div className="text-4xl mb-3">🎴</div>
                  <div className="text-white text-lg font-semibold">Hafıza</div>
                  <div className="text-blue-300 text-sm">Memory</div>
                </div>
              </div>
            </div>

            {/* Oyun ve Eğlence */}
            <div>
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-500/30 hover:border-orange-400/50 transition-all mb-4">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">🎮</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">Oyun ve Eğlence</h3>
                    <p className="text-blue-200 text-sm">Eğlenerek öğrenme deneyimi</p>
                  </div>
                  <div className="text-cyan-300 text-xs font-semibold">1000+ Oyun</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
                  <div className="text-4xl mb-3">🔢</div>
                  <div className="text-white text-lg font-semibold">Matematik</div>
                  <div className="text-blue-300 text-sm">Oyunları</div>
                </div>
                <div className="bg-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all">
                  <div className="text-4xl mb-3">💬</div>
                  <div className="text-white text-lg font-semibold">Dil Oyunları</div>
                  <div className="text-blue-300 text-sm">Kelime</div>
                </div>
                <div className="bg-green-500/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all">
                  <div className="text-4xl mb-3">🧩</div>
                  <div className="text-white text-lg font-semibold">Bulmaca</div>
                  <div className="text-blue-300 text-sm">Mantık</div>
                </div>
                <div className="bg-orange-500/10 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 hover:border-orange-400/40 transition-all">
                  <div className="text-4xl mb-3">🎯</div>
                  <div className="text-white text-lg font-semibold">Strateji</div>
                  <div className="text-blue-300 text-sm">Düşünme</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Detailed */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Neden Eğitim Galaksisi?
          </h2>
          <p className="text-xl text-blue-200">
            Yapay zeka destekli, modern ve etkili eğitim çözümü
          </p>
        </div>

        <div className="space-y-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${feature.gradient} p-[2px] rounded-3xl`}
            >
              <div className="bg-slate-950/90 backdrop-blur-md rounded-3xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Sol taraf - Açıklama */}
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black text-white">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-blue-200 text-lg mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-4">
                      {getFeatureDetails(index).map((detail, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <div className={`w-6 h-6 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-blue-100">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sağ taraf - Örnek Mesajlar */}
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20">
                      <div className="space-y-4">
                        {getFeatureMessages(index).map((message, idx) => (
                          <div key={idx} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/15 transition-all">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`w-10 h-10 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center text-xl`}>
                                {message.icon}
                              </div>
                              <span className="text-white font-semibold">{message.title}</span>
                            </div>
                            <p className="text-blue-200 text-sm pl-13">
                              {message.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Okulunuz İçin Özel Fiyat Alın
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Kurumsal paketlerimiz hakkında bilgi almak ve <span className="font-bold">ücretsiz demo</span> talep etmek için
              hemen iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30"
              >
                Teklif Alın
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30"
              >
                Ücretsiz Deneyin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/30 backdrop-blur-md py-8 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-blue-200">© 2026 Eğitim Galaksisi. Tüm hakları saklıdır.</p>
          <p className="text-blue-300 text-sm mt-2">SONER DURAN </p>
        </div>
      </footer>
    </div>
  );
};
