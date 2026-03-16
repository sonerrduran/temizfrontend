import React, { useState } from 'react';

const BionicReadingModule: React.FC = () => {
  const [inputText, setInputText] = useState(
    'Biyonik okuma, metinleri daha hızlı ve odaklı okumanıza yardımcı olan bir tekniktir. Her kelimenin ilk birkaç harfi kalın yapılarak, beyninizin kelimeyi daha hızlı tanıması sağlanır.'
  );

  const convertToBionic = (text: string) => {
    return text.split(/\s+/).map((word, i) => {
      if (word.length === 0) return null;
      if (word.length === 1)
        return (
          <span key={i} className="font-black">
            {word}{' '}
          </span>
        );

      const mid = Math.ceil(word.length / 2);
      const bold = word.substring(0, mid);
      const rest = word.substring(mid);

      return (
        <span key={i} className="inline-block mr-1">
          <span className="font-black text-white">{bold}</span>
          <span className="opacity-60">{rest}</span>
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-4 text-white">
      <div className="w-full max-w-4xl bg-slate-900/80 backdrop-blur-2xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl">
        <div className="text-center mb-10">
          <h3 className="font-black tracking-widest text-xs uppercase mb-2 opacity-60">
            BİYONİK ODAKLANMA
          </h3>
          <h2 className="text-3xl font-black text-white mb-4">Gözlerini Eğit, Daha Hızlı Oku</h2>
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            Aşağıdaki alana herhangi bir metin yapıştırın. Biyonik format, beyninizin kelimeleri
            "tamamlamasına" yardımcı olarak odağınızı artıracaktır.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <label className="text-xs font-black uppercase opacity-40 ml-4">Giriş Metni</label>
            <textarea
              className="w-full h-[300px] bg-white/5 border border-white/10 rounded-[32px] p-8 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none font-medium leading-relaxed"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Buraya bir metin yapıştırın..."
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-xs font-black uppercase opacity-40 ml-4">
              Biyonik Görünüm (Odaklı)
            </label>
            <div className="w-full h-[300px] bg-slate-800/50 border border-white/5 rounded-[32px] p-8 overflow-y-auto leading-relaxed text-lg tracking-wide custom-scrollbar">
              {convertToBionic(inputText)}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={() =>
              setInputText(
                'Hızlı okuma sadece gözlerin hızlı hareket etmesi değildir. Beynin bilgiyi işleme hızını artırmak ve görsel odaklanmayı keskinleştirmek temel amaçtır.'
              )
            }
            className="bg-white/5 hover:bg-white/10 px-6 py-3 rounded-2xl text-xs font-bold transition-all"
          >
            ÖRNEK 1
          </button>
          <button
            onClick={() =>
              setInputText(
                'Dikkat dağınıklığını önlemek için sadece küçük bir alana odaklanmak çok önemlidir. Biyonik okuma tekniği, dikkatin dağılmasını engellemek için mükemmel bir araçtır.'
              )
            }
            className="bg-white/5 hover:bg-white/10 px-6 py-3 rounded-2xl text-xs font-bold transition-all"
          >
            ÖRNEK 2
          </button>
        </div>
      </div>
    </div>
  );
};

export default BionicReadingModule;
