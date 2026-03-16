import React from 'react';

interface SubjectLayoutProps {
  title: string;
  subtitle?: string;
  badge?: string;
  onBack: () => void;
  children: React.ReactNode;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
}

/**
 * Tüm dersler için ortak layout component
 * Matematik, Türkçe, İngilizce vb. tüm derslerde kullanılır
 */
export const SubjectLayout: React.FC<SubjectLayoutProps> = ({
  title,
  subtitle,
  badge,
  onBack,
  children,
  gradientFrom,
  gradientVia,
  gradientTo,
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradientFrom} ${gradientVia} ${gradientTo} p-4 md:p-8`}>
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="text-center mb-12">
          <button
            onClick={onBack}
            className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm relative z-50"
          >
            ⬅ GERİ DÖN
          </button>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
            {title}
          </h2>
          {badge && (
            <div className="flex justify-center gap-3">
              <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {badge}
              </span>
            </div>
          )}
          {subtitle && <p className="text-white/80 text-lg mt-4">{subtitle}</p>}
        </div>

        {children}
      </div>
    </div>
  );
};

export default SubjectLayout;
