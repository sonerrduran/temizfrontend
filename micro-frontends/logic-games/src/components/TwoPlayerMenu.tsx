import GameCard from '../core/GameCard';
import React from 'react';
import { GameMode } from '../types';

interface Props {
  onNavigate: (mode: GameMode) => void;
  onExit: () => void;
}

const TwoPlayerMenu: React.FC<Props> = ({ onNavigate, onExit }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-2 bounce-in relative z-20">
      <div className="text-center mb-8">
        <button
          onClick={onExit}
          className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
        >
          ⬅ ANA ÜSSE DÖN
        </button>
        <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
          İki Kişilik Oyunlar
        </h2>
        <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
          Arkadaşınla karşı karşıya gel, kozlarını paylaş! Hedefin zafer olsun.
        </p>
        <div className="flex justify-center gap-3">
          <span className="bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-500/30">
            AYNI CİHAZDA BERABER OYNA 🧑‍🤝‍🧑
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
        <GameCard
          title="Tic-Tac-Toe"
          icon="✖️⭕"
          color="bg-gradient-to-br from-indigo-600 to-blue-800 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all text-left relative overflow-hidden h-48"
          description="Klasik XOX macerası. 3'lüyü önce diz, oyunu kazan."
          onClick={() => onNavigate(GameMode.TWO_PLAYER_TIC_TAC_TOE)}
        />

        <GameCard
          title="Hedef 4"
          icon="🔴🟡"
          color="bg-gradient-to-br from-rose-600 to-red-800 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-500/30 transition-all text-left relative overflow-hidden h-48"
          description="Pulları yukarıdan at, 4 rengi peş peşe hizalamaya çalış!"
          onClick={() => onNavigate(GameMode.TWO_PLAYER_CONNECT_FOUR)}
        />

        <GameCard
          title="SOS"
          icon="🆘"
          color="bg-gradient-to-br from-amber-500 to-orange-700 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/30 transition-all text-left relative overflow-hidden h-48"
          description="S ve O harfleriyle ızgarada en çok SOS yapan kazanır."
          onClick={() => onNavigate(GameMode.TWO_PLAYER_SOS)}
        />

        <GameCard
          title="Noktalar & Kutular"
          icon="🟩"
          color="bg-gradient-to-br from-emerald-600 to-teal-800 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all text-left relative overflow-hidden h-48"
          description="Satırları birleştir, kutuları kapat ve en çok bölgeyi ele geçir!"
          onClick={() => onNavigate(GameMode.TWO_PLAYER_DOTS_BOXES)}
        />

        <GameCard
          title="Mangala"
          icon="🕳️"
          color="bg-gradient-to-br from-yellow-700 to-amber-900 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-700/30 transition-all text-left relative overflow-hidden h-48"
          description="Kuyulardaki taşları dağıt, en çok taşı hazinende biriktir."
          onClick={() => onNavigate(GameMode.TWO_PLAYER_MANCALA)}
        />

        <GameCard
          title="Satranç"
          icon="♟️"
          color="bg-gradient-to-br from-slate-600 to-zinc-800 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-500/30 transition-all text-left relative overflow-hidden h-48"
          description="Şahları koru, piyonları sür! Klasik satranç düellosu."
          onClick={() => onNavigate(GameMode.TWO_PLAYER_CHESS)}
        />

        <GameCard
          title="Dama"
          icon="🔴"
          color="bg-gradient-to-br from-red-600 to-red-900 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/30 transition-all text-left relative overflow-hidden h-48"
          description="Taşlarını koru, rakip taşların üzerinden atlayarak şampiyon ol!"
          onClick={() => onNavigate(GameMode.TWO_PLAYER_CHECKERS)}
        />

        <GameCard
          title="Reversi (Othello)"
          icon="⚫⚪"
          color="bg-gradient-to-br from-emerald-600 to-emerald-900 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all text-left relative overflow-hidden h-48"
          description="Taşları araya sıkıştır, rakibin rengini kendi rengine çevir."
          onClick={() => onNavigate(GameMode.TWO_PLAYER_REVERSI)}
        />

        <GameCard
          title="Nim Oyunu"
          icon="🥢"
          color="bg-gradient-to-br from-amber-600 to-yellow-900 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/30 transition-all text-left relative overflow-hidden h-48"
          description="Sırayla çubukları al. Son çubuğu kim alırsa, kaybeden o olur!"
          onClick={() => onNavigate(GameMode.TWO_PLAYER_NIM)}
        />
      </div>
    </div>
  );
};

export default TwoPlayerMenu;
