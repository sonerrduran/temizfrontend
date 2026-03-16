import { useNavigate } from 'react-router-dom';
import type { DashboardCard } from '../../../config/dashboardCategories';

interface CategorySectionProps {
  title: string;
  icon: string;
  cards: DashboardCard[];
  userGrade?: number;
}

export default function CategorySection({ title, icon, cards, userGrade = 1 }: CategorySectionProps) {
  const navigate = useNavigate();

  // Sınıf seviyesine göre kartları filtrele
  const filteredCards = cards.filter(card => !card.minGrade || userGrade >= card.minGrade);

  if (filteredCards.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">{icon}</div>
        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredCards.map((card) => (
          <button
            key={card.id}
            onClick={() => navigate(card.path)}
            disabled={card.comingSoon}
            className={`group relative bg-gradient-to-br ${card.gradient} p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left overflow-hidden h-48 ${
              card.comingSoon ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">
              {card.icon}
            </div>
            <h3 className="text-white font-black text-xl mb-1 mt-auto">
              {card.title}
            </h3>
            <p className="text-white/80 text-xs font-medium relative z-10">
              {card.description}
            </p>
            
            {/* Coming Soon Badge */}
            {card.comingSoon && (
              <div className="absolute top-4 left-4 bg-yellow-500/90 text-black text-[10px] font-black px-2 py-1 rounded-full z-30">
                YAKINDA
              </div>
            )}
            
            {/* Right Arrow */}
            {!card.comingSoon && (
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                <span className="text-white text-xl font-black">›</span>
              </div>
            )}

            {/* Background Icon */}
            <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              {card.icon}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
