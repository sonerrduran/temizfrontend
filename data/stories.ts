export interface Story {
  id: number;
  grade: string;
  title: string;
  characters: string[];
  story: string;
  lesson: string;
  questions: { question: string; answer: string }[];
  newWords: { word: string; meaning: string }[];
  scenes: string[];
  activity: string;
  wordCount: number;
  image?: string;
}

export const stories: Story[] = [
  {
    id: 1,
    grade: 'Anasınıfı',
    title: 'Minik Tavşanın Paylaşımı',
    characters: ['Tavşan Mimo', 'Kaplumbağa Tosi', 'Sincap Sami'],
    story: `Bir zamanlar ormanda Mimo adında sevimli bir tavşan yaşıyormuş. Mimo bahçesinde çok güzel havuçlar yetiştirirmiş. Bir gün Kaplumbağa Tosi ve Sincap Sami, Mimo'yu ziyarete gelmiş. "Vay be! Ne güzel havuçlar!" demiş Tosi. Mimo önce havuçlarını saklamak istemiş. Ama sonra düşünmüş: "Arkadaşlarımla paylaşırsam hepimiz mutlu oluruz!" Mimo havuçları üçe bölmüş. Hepsi birlikte yemişler. Tosi ve Sami çok mutlu olmuş. "Teşekkür ederiz Mimo! Sen harika bir arkadaşsın!" demişler. Mimo de çok mutlu olmuş. Paylaşmanın ne kadar güzel olduğunu anlamış.`,
    lesson: 'Paylaşmak mutluluk getirir. Arkadaşlarımızla paylaştığımızda herkes mutlu olur.',
    questions: [
      { question: 'Mimo ne yetiştiriyordu?', answer: 'Havuç' },
      { question: 'Mimo havuçları kaça böldü?', answer: 'Üçe' },
      { question: 'Mimo paylaşınca nasıl hissetti?', answer: 'Mutlu' },
    ],
    newWords: [
      { word: 'Yetiştirmek', meaning: 'Bir şeyi büyütmek, bakımını yapmak' },
      { word: 'Paylaşmak', meaning: 'Bir şeyi başkalarıyla bölüşmek' },
      { word: 'Ziyaret', meaning: 'Birini görmeye gitmek' },
    ],
    scenes: [
      'Tavşan Mimo bahçesinde havuç topluyorken, Kaplumbağa Tosi ve Sincap Sami uzaktan bakıyor',
      'Mimo havuçları üç eşit parçaya bölerken arkadaşları sevinçle izliyor',
      'Üç arkadaş birlikte havuç yerken gülümsüyor ve mutlu görünüyorlar',
    ],
    activity:
      'Çocuklar evde ailesiyle bir şeyleri paylaşabilir. Örneğin: meyve, oyuncak veya kitap.',
    wordCount: 95,
    image: '/assets/stories/minik-tavsanin-paylasimi.png',
  },
  {
    id: 2,
    grade: 'Anasınıfı',
    title: 'Uykucu Ayıcık',
    characters: ['Ayı Bobo', 'Anne Ayı'],
    story: `Bobo küçük bir ayıcıktı. Her akşam uyku vakti geldiğinde oynamak isterdi. "Bobo, uyku vakti!" derdi annesi. Ama Bobo "Daha oynamak istiyorum!" derdi. Bir gün Bobo çok yorgun olmuş. Okula giderken uyuyakalmış. Oyun oynarken uyuyakalmış. Yemek yerken bile uyuyakalmış! Anne ayı "Gördün mü Bobo? Erken uyumak çok önemli" demiş. O akşam Bobo erken yatmış. Sabah çok dinç uyanmış. Bütün gün oyun oynamış, koşmuş, zıplamış. "Anne haklıymış! Erken uyumak çok güzelmiş!" demiş Bobo. Artık her akşam zamanında yatıyormuş.`,
    lesson:
      'Düzenli uyku çocukların sağlıklı büyümesi için çok önemlidir. Erken uyuyan çocuklar daha dinç ve mutlu olur.',
    questions: [
      { question: 'Bobo akşamları ne yapmak isterdi?', answer: 'Oynamak' },
      { question: 'Bobo neden her yerde uyuyakaldı?', answer: 'Çok yorgundu' },
      { question: 'Erken yatan Bobo sabah nasıl uyandı?', answer: 'Dinç' },
    ],
    newWords: [
      { word: 'Yorgun', meaning: 'Çok çalışmaktan veya oynamaktan bitkin olmak' },
      { word: 'Dinç', meaning: 'Enerjik, zinde, güçlü' },
      { word: 'Düzenli', meaning: 'Her zaman aynı şekilde, kurallı' },
    ],
    scenes: [
      'Bobo yatağında oturuyor, oyuncaklarıyla oynamak istiyor, anne ayı kapıda duruyor',
      'Bobo okulda, oyun oynarken ve yemek yerken uyuklayarak komik durumlar yaşıyor',
      'Bobo sabah dinç uyanmış, kollarını açmış geriniyor, güneş parlıyor',
    ],
    activity:
      'Çocuklar için bir uyku saati tablosu yapın. Her erken yattıklarında bir yıldız koyun.',
    wordCount: 98,
    image: '/assets/stories/uykucu-ayicik.png',
  },
  {
    id: 3,
    grade: 'Anasınıfı',
    title: 'Küçük Fidan',
    characters: ['Ela', 'Öğretmen Ayşe', 'Küçük Fidan'],
    story: `Ela anaokulunda çok heyecanlıydı. Bugün bahçeye fidan dikeceklerdi! Öğretmen Ayşe "Çocuklar, bugün ağaç dikiyoruz. Ağaçlar bize temiz hava verir" dedi. Ela küçük bir çukur kazdı. Fidanı dikkatle yerleştirdi. Toprakla örttü. Su verdi. Her gün fidanını ziyaret etti. Suladı, sevdi. Günler geçti. Fidan büyümeye başladı! Küçük yapraklar çıktı. Ela çok mutluydu. "Bak anne! Benim ağacım büyüyor!" dedi. Öğretmen Ayşe "Aferin Ela! Sen doğayı koruyorsun" dedi. Ela her gün ağacına bakıyordu. Ağaç büyüdükçe Ela da büyüyordu.`,
    lesson:
      'Doğayı korumak hepimizin görevidir. Ağaçlar bize temiz hava verir ve dünyamızı güzelleştirir.',
    questions: [
      { question: 'Ela ne dikti?', answer: 'Fidan' },
      { question: 'Ela her gün ne yaptı?', answer: 'Fidanını suladı' },
      { question: 'Ağaçlar bize ne verir?', answer: 'Temiz hava' },
    ],
    newWords: [
      { word: 'Fidan', meaning: 'Küçük, yeni dikilmiş ağaç' },
      { word: 'Çukur', meaning: 'Toprağa açılan delik' },
      { word: 'Korumak', meaning: 'Bir şeye zarar gelmesini engellemek' },
    ],
    scenes: [
      'Ela bahçede küçük bir çukur kazıyor, öğretmen Ayşe yanında duruyor, elinde fidan var',
      'Ela fidanı suluyor, güneş parlıyor, etrafta çiçekler var',
      'Büyümüş ağaç, Ela yanında duruyor ve gülümsüyor, ağaçta yeşil yapraklar var',
    ],
    activity: 'Evde saksıya tohum ekin. Her gün sulayın ve büyümesini izleyin. Fotoğraf çekin.',
    wordCount: 102,
    image: '/assets/stories/kucuk-fidan.png',
  },
  {
    id: 4,
    grade: '1. Sınıf',
    title: 'Kaybolan Kalem',
    characters: ['Ali', 'Zeynep', 'Öğretmen Mehmet'],
    story: `Ali okulda yeni bir kalem buldu. Çok güzeldi, üzerinde roketler vardı. "Bu kalem artık benim!" dedi Ali. Ama Zeynep üzgün görünüyordu. "Kalemimi kaybettim" dedi ağlayarak. Ali kalemine baktı. Üzerinde "Zeynep" yazıyordu. Ali düşündü. "Bu kalem Zeynep'in. Ama çok güzel, vermek istemiyorum" dedi içinden. Sonra öğretmeninin sözlerini hatırladı: "Dürüst olmak her zaman doğrusudur." Ali kalemi Zeynep'e verdi. "Bu senin kalem, üzerinde ismin var" dedi. Zeynep çok sevindi. "Teşekkür ederim Ali! Sen çok dürüst bir arkadaşsın!" dedi. Öğretmen Mehmet Ali'yi gördü. "Aferin Ali! Dürüst davrandın" dedi. Ali gurur duydu. Doğru olanı yapmak onu mutlu etmişti.`,
    lesson:
      'Dürüst olmak önemlidir. Başkasının eşyasını bulmak onu sahibine vermek gerekir. Dürüstlük bizi mutlu eder.',
    questions: [
      { question: 'Ali ne buldu?', answer: 'Kalem' },
      { question: 'Kalemin üzerinde ne yazıyordu?', answer: 'Zeynep' },
      { question: 'Ali kalemi kime verdi?', answer: "Zeynep'e" },
    ],
    newWords: [
      { word: 'Dürüst', meaning: 'Doğru sözlü, güvenilir' },
      { word: 'Gurur', meaning: 'Kendini iyi hissetme, övünme' },
      { word: 'Davranmak', meaning: 'Bir şekilde hareket etmek' },
    ],
    scenes: [
      'Ali sınıfta yerde roketli bir kalem buluyor, kaleme bakıyor',
      'Zeynep üzgün, Ali düşünceli, kalemde "Zeynep" yazısı görünüyor',
      "Ali kalemi Zeynep'e veriyor, ikisi de gülümsüyor, öğretmen arkada onları izliyor",
    ],
    activity: 'Dürüstlük kartları yapın. Her dürüst davranışta bir kart kazanın. 10 kart = Ödül!',
    wordCount: 145,
    image: '/assets/stories/kaybolan-kalem.png',
  },
  {
    id: 5,
    grade: '1. Sınıf',
    title: 'Yardımsever Kedi',
    characters: ['Kedi Pamuk', 'Kuş Cik', 'Köpek Karabaş'],
    story: `Pamuk beyaz tüylü, sevimli bir kediydi. Bahçede oynarken bir ses duydu. "İmdaaaat!" Yukarı baktı. Küçük bir kuş ağaçta mahsur kalmıştı. "Korkma Cik! Sana yardım edeceğim!" dedi Pamuk. Ağaca tırmandı. Cik'i kurtardı. Cik çok mutlu oldu. Ertesi gün Köpek Karabaş topunu çite takıldı. "Pamuk, yardım eder misin?" dedi. Pamuk hemen koştu. Topu aldı, Karabaş'a verdi. "Teşekkürler Pamuk!" dedi Karabaş. Bir gün Pamuk hastalandı. Cik ve Karabaş hemen geldiler. Ona yemek getirdiler, hikaye anlattılar. Pamuk çok mutlu oldu. "Arkadaşlarım bana yardım ediyor!" dedi. Pamuk anladı ki yardım etmek güzel, ama yardım almak da güzel!`,
    lesson:
      'Yardımlaşmak güzeldir. Başkalarına yardım ettiğimizde, onlar da bize yardım eder. Arkadaşlık karşılıklıdır.',
    questions: [
      { question: 'Pamuk kime yardım etti?', answer: "Cik ve Karabaş'a" },
      { question: 'Pamuk hastalanınca kim geldi?', answer: 'Cik ve Karabaş' },
      { question: 'Hikayeden ne öğrendik?', answer: 'Yardımlaşmak güzel' },
    ],
    newWords: [
      { word: 'Mahsur', meaning: 'Bir yerde sıkışıp kalmak' },
      { word: 'Tırmanmak', meaning: 'Yukarı çıkmak' },
      { word: 'Karşılıklı', meaning: 'İki taraflı, birbirine' },
    ],
    scenes: [
      'Pamuk ağaca tırmanıyor, yukarıda küçük kuş Cik korkmuş bekliyor',
      "Pamuk Karabaş'ın topunu çitten alıyor, Karabaş sevinçle bekliyor",
      'Hasta Pamuk yatakta, Cik ve Karabaş yanında, yemek ve kitap getirmişler',
    ],
    activity:
      'Bu hafta ailenize 3 kez yardım edin. Her yardımda bir kalp çizin. Yardım defteri yapın.',
    wordCount: 138,
    image: '/assets/stories/yardimsever-kedi.png',
  },
];
