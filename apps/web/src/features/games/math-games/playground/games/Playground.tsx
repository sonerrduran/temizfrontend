import React from 'react';
import { GameMode } from '../../../types';
import GameCard from '../../core/GameCard';

interface PlaygroundProps {
    onNavigate: (mode: GameMode) => void;
    onExit: () => void;
}

const Playground: React.FC<PlaygroundProps> = ({ onNavigate, onExit }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
                <button onClick={onExit} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm relative z-50">⬅ GERİ DÖN</button>
                <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">Oyun Alanı</h2>
                <div className="flex justify-center gap-3">
                    <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">EĞLENCE MOLA ZAMANI! 🎮</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto pb-32">
                <GameCard
                    title="Kozmik Hafıza"
                    icon="🧩"
                    color="bg-gradient-to-br from-indigo-500 to-purple-600"
                    description="Kartları eşleştirerek hafızanı güçlendirmeye var mısın?"
                    onClick={() => onNavigate(GameMode.PLAYGROUND_MEMORY)}
                />
                <GameCard
                    title="Kuyruklu Yıldız"
                    icon="☄️"
                    color="bg-gradient-to-br from-orange-500 to-red-600"
                    description="Süre bitmeden şimşek hızında işlemleri çöz!"
                    onClick={() => onNavigate(GameMode.PLAYGROUND_SPEED_MATH)}
                />
                <GameCard
                    title="Sayı Avcısı"
                    icon="🎈"
                    color="bg-gradient-to-br from-cyan-400 to-blue-600"
                    description="Doğru sayıları yakala, patlat ve puanları topla!"
                    onClick={() => onNavigate(GameMode.PLAYGROUND_NUMBER_CATCHER)}
                />
                <GameCard
                    title="Kozmik Terazi"
                    icon="⚖️"
                    color="bg-gradient-to-br from-fuchsia-500 to-purple-700"
                    description="Matematik terazisini dengeleyebilir misin?"
                    onClick={() => onNavigate(GameMode.PLAYGROUND_BALANCE)}
                />
                <GameCard
                    title="Kozmik Sudoku"
                    icon="🔢"
                    color="bg-gradient-to-br from-emerald-500 to-teal-700"
                    description="Sayıları yerleştir ve tabloyu doğru şekilde tamamla!"
                    onClick={() => onNavigate(GameMode.PLAYGROUND_SUDOKU)}
                />
                <GameCard
                    title="Zeka Oyunları"
                    icon="🧠"
                    color="bg-gradient-to-br from-pink-500 to-rose-700"
                    description="90'dan fazla mantık ve zeka oyunu seni bekliyor!"
                    onClick={() => onNavigate(GameMode.PLAYGROUND_LOGIC_MENU)}
                />
                <GameCard
                    title="İki Kişilik Oyunlar"
                    icon="👥"
                    color="bg-gradient-to-br from-amber-500 to-orange-700"
                    description="Arkadaşınla yarış! Klasik iki kişilik oyunlar!"
                    onClick={() => onNavigate(GameMode.TWO_PLAYER_MENU)}
                />
            </div>
        </div>
    );
};

export default Playground;
