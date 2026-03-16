import React, { useState } from 'react';

const SCENARIOS = [
  {
    title: 'Resmi Toplantı',
    context: "Müdürünüz size 'Bu projeyi ne zaman bitirebilirsiniz?' diye soruyor.",
    options: [
      {
        text: 'Müsaadenizle, önümüzdeki hafta teslim edebilirim.',
        correct: true,
        feedback: 'Mükemmel! Hem kibar hem de net bir cevap.',
      },
      {
        text: 'Bilmem, belki yaparım.',
        correct: false,
        feedback: 'Çok belirsiz ve profesyonel değil.',
      },
      {
        text: 'Hemen şimdi bitecek.',
        correct: false,
        feedback: 'Gerçekçi olmayan bir söz vermek doğru değil.',
      },
    ],
  },
  {
    title: 'Özür Dileme',
    context: 'Arkadaşınızın doğum gününü unuttunuz ve özür dilemek istiyorsunuz.',
    options: [
      {
        text: 'Kusura bakma, tamamen unutmuşum.',
        correct: false,
        feedback: 'Samimi ama daha içten olabilir.',
      },
      {
        text: 'Çok özür dilerim, telafi edeceğim.',
        correct: true,
        feedback: 'Harika! Hem özür diliyor hem de çözüm sunuyorsunuz.',
      },
      {
        text: 'Neyse işte, önemli değil.',
        correct: false,
        feedback: 'Bu çok umursamaz bir tavır.',
      },
    ],
  },
  {
    title: 'İş Görüşmesi',
    context: "İşveren size 'Kendinizden bahseder misiniz?' diyor.",
    options: [
      {
        text: 'Ben çok iyiyim, her şeyi bilirim.',
        correct: false,
        feedback: 'Çok kibirli bir ifade.',
      },
      {
        text: 'Kendimi geliştirmeye açık, öğrenmeye hevesli biriyim.',
        correct: true,
        feedback: 'Mükemmel! Hem alçakgönüllü hem de istekli görünüyorsunuz.',
      },
      {
        text: 'Bilmiyorum, ne diyeyim ki?',
        correct: false,
        feedback: 'Çok hazırlıksız ve özgüvensiz görünüyor.',
      },
    ],
  },
  {
    title: 'Yardım İsteme',
    context: 'Bir konuyu anlamadınız ve öğretmeninizden yardım isteyeceksiniz.',
    options: [
      {
        text: 'Anlayamadım, tekrar anlatır mısınız?',
        correct: true,
        feedback: 'Doğru! Açık ve kibar bir istek.',
      },
      {
        text: 'Siz yanlış anlattınız.',
        correct: false,
        feedback: 'Suçlayıcı bir ifade, doğru değil.',
      },
      {
        text: 'Boş ver, önemli değil.',
        correct: false,
        feedback: 'Öğrenme fırsatını kaçırıyorsunuz.',
      },
    ],
  },
  {
    title: 'Teşekkür Etme',
    context: 'Biri size yardım etti ve teşekkür etmek istiyorsunuz.',
    options: [
      { text: 'Sağ ol.', correct: false, feedback: 'Kullanılabilir ama daha samimi olabilir.' },
      {
        text: 'Çok teşekkür ederim, çok yardımcı oldunuz.',
        correct: true,
        feedback: 'Harika! Samimi ve içten bir teşekkür.',
      },
      { text: 'Tamam.', correct: false, feedback: 'Çok kısa ve ilgisiz görünüyor.' },
    ],
  },
  {
    title: 'Fikir Belirtme',
    context: 'Grup çalışmasında fikrinizi paylaşmak istiyorsunuz.',
    options: [
      {
        text: 'Bence şöyle yapsak daha iyi olur.',
        correct: true,
        feedback: 'Mükemmel! Kibar ve yapıcı bir öneri.',
      },
      {
        text: 'Sizin fikriniz yanlış, benimki doğru.',
        correct: false,
        feedback: 'Çok saldırgan ve saygısız.',
      },
      { text: 'Ne derseniz o olsun.', correct: false, feedback: 'Pasif ve katkısız bir tavır.' },
    ],
  },
];

const LanguageSim: React.FC<{ onExit?: () => void }> = ({ onExit }) => {
  const [index, setIndex] = useState(0);
  const [selection, setSelection] = useState<number | null>(null);

  const scenario = SCENARIOS[index];

  const handleNext = () => {
    setIndex((index + 1) % SCENARIOS.length);
    setSelection(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white">
      {onExit && (
        <button
          onClick={onExit}
          className="absolute top-4 left-4 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl border border-white/10 transition-all font-bold"
        >
          ⬅ GERİ
        </button>
      )}
      <div className="w-full max-w-3xl bg-slate-900/80 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl">
        <div className="text-center mb-10">
          <h3 className="font-black tracking-widest text-xs uppercase mb-2 opacity-40">
            DİYALOG SİMÜLASYONU
          </h3>
          <h2 className="text-3xl font-black uppercase italic">Dil Pratiği</h2>
        </div>

        <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 mb-10 relative">
          <label className="absolute -top-3 left-6 bg-slate-900 px-3 text-[10px] font-black tracking-widest uppercase text-rose-400">
            Senaryo: {scenario.title}
          </label>
          <p className="text-xl font-medium leading-relaxed italic text-white/90">
            "{scenario.context}"
          </p>
        </div>

        <div className="space-y-4">
          {scenario.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelection(i)}
              disabled={selection !== null}
              className={`w-full text-left p-6 rounded-3xl transition-all border ${selection === i ? (opt.correct ? 'bg-emerald-600 border-white' : 'bg-rose-600 border-white') : 'bg-white/5 border-white/10 hover:bg-white/20'}`}
            >
              <span className="font-bold text-lg">{opt.text}</span>
            </button>
          ))}
        </div>

        {selection !== null && (
          <div className="mt-10 p-8 bg-black/40 rounded-[32px] border border-white/10 animate-in zoom-in text-center">
            <p
              className={`text-xl font-black mb-4 ${scenario.options[selection].correct ? 'text-emerald-400' : 'text-rose-400'}`}
            >
              {scenario.options[selection].correct ? 'DOĞRU! 🎉' : 'GELİŞTİRİLEBİLİR 💡'}
            </p>
            <p className="text-lg font-medium mb-8 text-white/70 italic">
              "{scenario.options[selection].feedback}"
            </p>
            <button
              onClick={handleNext}
              className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              SIRADAKİ SENARYO ➡️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSim;
