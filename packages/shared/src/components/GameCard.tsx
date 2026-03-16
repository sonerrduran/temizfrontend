import React from 'react';

interface GameCardProps {
  title: string;
  icon: string;
  color: string;
  description: string;
  onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ title, icon, color, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative bg-gradient-to-br ${color} p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left overflow-hidden h-48 w-full block flex flex-col`}
    >
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">{icon}</div>
      <h3 className="text-white font-black text-xl mb-1 mt-auto">{title}</h3>
      <p className="text-white/80 text-xs font-medium relative z-10">{description}</p>

      {/* Right Arrow */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
        <span className="text-white text-xl font-black">›</span>
      </div>

      <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">{icon}</div>
    </button>
  );
};

export default GameCard;
