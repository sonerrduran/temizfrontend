import React, { useState, useEffect, useRef } from 'react';

interface Props {
  onExit: () => void;
}

const NoiseMeter: React.FC<Props> = ({ onExit }) => {
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopListening();
    };
  }, []);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);

      analyserRef.current.smoothingTimeConstant = 0.8;
      analyserRef.current.fftSize = 256;

      microphoneRef.current.connect(analyserRef.current);

      setIsListening(true);
      setError(null);
      updateVolume();
    } catch (err: any) {
      setError(
        'Mikrofon izni alınamadı. Lütfen tarayıcı ayarlarından mikrofon erişimine izin verin.'
      );
      console.error(err);
    }
  };

  const stopListening = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (microphoneRef.current) {
      microphoneRef.current.mediaStream.getTracks().forEach((track) => track.stop());
      microphoneRef.current.disconnect();
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    setIsListening(false);
    setVolume(0);
  };

  const updateVolume = () => {
    if (!analyserRef.current || !isListening) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }

    const avg = sum / dataArray.length;
    // Map back to a simplified 0-100 scale roughly
    const finalVolume = Math.min(100, Math.max(0, (avg / 128) * 100));
    setVolume(finalVolume);

    requestRef.current = requestAnimationFrame(updateVolume);
  };

  const toggleListening = () => {
    if (isListening) stopListening();
    else startListening();
  };

  // Determine status based on volume
  let statusColor = 'bg-emerald-500';
  let statusText = 'Sessiz ve Sakin';
  let emoji = '😌';

  if (volume > 80) {
    statusColor = 'bg-rose-600';
    statusText = 'ÇOK GÜRÜLTÜLÜ!';
    emoji = '🙉';
  } else if (volume > 50) {
    statusColor = 'bg-amber-500';
    statusText = 'Dikkat! Ses Yükseliyor';
    emoji = '🤔';
  }

  // Bar heights array to create a neat equalizer effect
  const barHeights = Array.from({ length: 15 }, (_, i) => {
    // Create a curve so middle reacts more
    const curve = Math.sin(Math.PI * (i / 14));
    return Math.max(5, volume * curve + Math.random() * 10); // Add bits of random jitter
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-4 relative">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onExit}
          className="px-6 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700 font-bold"
        >
          <span>⬅</span> Çıkış
        </button>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[50px] shadow-2xl border border-white/10 w-full max-w-4xl flex flex-col items-center">
        <h2 className="text-4xl font-black text-fuchsia-400 italic mb-2">Gürültü Ölçer</h2>
        <p className="text-white/60 mb-8">Sınıfın ses seviyesini takip edin.</p>

        {error ? (
          <div className="bg-rose-500/20 text-rose-300 p-4 rounded-xl border border-rose-500/30 mb-8 text-center max-w-md">
            {error}
          </div>
        ) : (
          <>
            {/* Visualizer */}
            <div
              className={`relative w-full max-w-2xl h-64 bg-slate-950 rounded-[40px] flex items-end justify-center gap-2 p-8 mb-8 overflow-hidden transition-all duration-300 border-2 ${volume > 80 ? 'border-rose-500 shadow-[0_0_50px_rgba(225,29,72,0.4)]' : 'border-slate-800'}`}
            >
              <div className="absolute top-4 left-4 right-4 flex justify-between px-4">
                <span className="text-emerald-500 font-bold text-xs">Sıfır</span>
                <span className="text-amber-500 font-bold text-xs">Orta</span>
                <span className="text-rose-500 font-bold text-xs">Max</span>
              </div>

              {barHeights.map((h, i) => (
                <div
                  key={i}
                  className={`w-8 rounded-t-full transition-all duration-75 ease-out ${statusColor}`}
                  style={{ height: `${Math.min(100, h)}%` }}
                ></div>
              ))}
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-6 mb-10">
              <span className="text-7xl">{emoji}</span>
              <div className="flex flex-col">
                <span className={`text-5xl font-black ${statusColor.replace('bg-', 'text-')}`}>
                  {volume > 0 ? Math.round(volume) : 0}{' '}
                  <span className="text-xl text-white/50">dB(tahmini)</span>
                </span>
                <span
                  className={`text-xl font-bold tracking-widest uppercase ${statusColor.replace('bg-', 'text-')} mt-1`}
                >
                  {statusText}
                </span>
              </div>
            </div>
          </>
        )}

        <button
          onClick={toggleListening}
          className={`px-12 py-4 rounded-full font-black text-2xl transition-all shadow-xl
                ${isListening ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white hover:-translate-y-1 hover:shadow-fuchsia-500/30'}
            `}
        >
          {isListening ? 'DİNLemeyi DURDUR' : 'DİNLEMEYE BAŞLA 🎤'}
        </button>
      </div>
    </div>
  );
};

export default NoiseMeter;
