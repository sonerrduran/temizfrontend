import React, { useState } from 'react';

const TECHNIQUES = [
  {
    title: 'Loci Yöntemi (Hafıza Sarayı)',
    description:
      'Bildiğiniz bir mekanı (eviniz gibi) hayal edin ve hatırlamanız gereken şeyleri bu mekanın farklı köşelerine yerleştirin.',
    example: 'Alışveriş listenizdekileri evin girişinden mutfağına kadar sırayla odalara bırakın.',
  },
  {
    title: 'Bağlama Yöntemi',
    description:
      'Kelimeler arasında komik veya ilginç hikayeler kurarak onları birbirine bağlayın.',
    example: 'Elma, Araba, Köpek -> Elma yiyen bir köpek arabaya biniyor.',
  },
  {
    title: 'Akrostiş',
    description: 'Her kelimenin ilk harfiyle yeni ve akılda kalıcı bir cümle kurun.',
    example: 'Gezegenler: Meraklı Valiz Dünyadan Marsa Jüpiterle Satürnü Uğurlamaya Neptüne gitti.',
  },
];

const MnemonicTraining: React.FC = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-4 text-white">
      <div className="w-full max-w-4xl bg-slate-900/80 backdrop-blur-2xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl">
        <div className="text-center mb-12">
          <h3 className="font-black tracking-widest text-xs uppercase mb-2 opacity-40">
            MNEMONİK HAFIZA TEKNİKLERİ
          </h3>
          <h2 className="text-4xl font-black">Daha Güçlü Bir Hafıza İçin Eğitim</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {TECHNIQUES.map((tech, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-full text-left p-6 rounded-3xl transition-all border ${index === i ? 'bg-indigo-600 border-white/50 shadow-xl scale-[1.02]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
              >
                <h4 className="font-black text-lg mb-1">{tech.title}</h4>
                <p className="text-xs opacity-60">Tekniği öğrenmek için tıkla</p>
              </button>
            ))}
          </div>

          <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 animate-in slide-in-from-right-10 duration-500">
            <div className="text-4xl mb-6">💡</div>
            <h3 className="text-2xl font-black mb-4 text-cyan-400 uppercase">
              {TECHNIQUES[index].title}
            </h3>
            <p className="text-lg text-white/90 leading-relaxed mb-8">
              {TECHNIQUES[index].description}
            </p>
            <div className="bg-black/30 p-6 rounded-2xl border-l-4 border-yellow-400">
              <p className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-2">
                Örnek Kullanım
              </p>
              <p className="text-white/70 italic font-medium">"{TECHNIQUES[index].example}"</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="bg-indigo-500/20 text-indigo-300 px-8 py-4 rounded-2xl font-black text-sm uppercase border border-indigo-500/20 flex items-center gap-3">
            <span>🚀</span> BU TEKNİKLERİ DERS ÇALIŞIRKEN UYGULAYIN!
          </div>
        </div>
      </div>
    </div>
  );
};

export default MnemonicTraining;
