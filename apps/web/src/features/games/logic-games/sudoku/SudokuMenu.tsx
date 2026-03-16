import { useNavigate } from 'react-router-dom';
import { GameCard } from '@egitim-galaksisi/ui';

export default function SudokuMenu() {
  const navigate = useNavigate();

  const sudokuVariants = [
    { id: 'classic', title: 'Klasik Sudoku', icon: '🔢', color: 'from-blue-500 to-indigo-700', description: '9x9 klasik sudoku' },
    { id: 'alphabet', title: 'Alphabet Sudoku', icon: '🔤', color: 'from-purple-500 to-pink-700', description: 'Harflerle sudoku' },
    { id: 'anti-king', title: 'Anti-King Sudoku', icon: '♔', color: 'from-yellow-600 to-orange-800', description: 'Kral kuralı ile' },
    { id: 'anti-knight', title: 'Anti-Knight Sudoku', icon: '♞', color: 'from-green-600 to-emerald-800', description: 'At kuralı ile' },
    { id: 'arrow', title: 'Arrow Sudoku', icon: '➡️', color: 'from-cyan-500 to-blue-700', description: 'Ok işaretli sudoku' },
    { id: 'chaos', title: 'Chaos Sudoku', icon: '🌀', color: 'from-purple-600 to-fuchsia-800', description: 'Kaotik bölgeler' },
    { id: 'color', title: 'Renkli Sudoku', icon: '🎨', color: 'from-pink-500 to-rose-700', description: 'Renklerle sudoku' },
    { id: 'consecutive', title: 'Consecutive Sudoku', icon: '↔️', color: 'from-teal-500 to-cyan-700', description: 'Ardışık sayılar' },
    { id: 'diagonal', title: 'Diagonal Sudoku', icon: '↗️', color: 'from-indigo-500 to-purple-700', description: 'Çapraz kuralı' },
    { id: 'even-odd', title: 'Even-Odd Sudoku', icon: '⚖️', color: 'from-orange-500 to-red-700', description: 'Çift-tek sudoku' },
    { id: 'greater-than', title: 'Greater Than Sudoku', icon: '>', color: 'from-red-600 to-orange-800', description: 'Büyüktür işaretli' },
    { id: 'hex', title: 'Hex Sudoku', icon: '⬡', color: 'from-violet-500 to-purple-700', description: '16x16 sudoku' },
    { id: 'hyper', title: 'Hyper Sudoku', icon: '✨', color: 'from-yellow-500 to-orange-700', description: 'Ekstra bölgeler' },
    { id: 'irregular', title: 'Irregular Sudoku', icon: '🧩', color: 'from-green-500 to-emerald-700', description: 'Düzensiz bölgeler' },
    { id: 'jigsaw', title: 'Jigsaw Sudoku', icon: '🔨', color: 'from-amber-600 to-orange-800', description: 'Yapboz şeklinde' },
    { id: 'killer', title: 'Killer Sudoku', icon: '🔪', color: 'from-red-500 to-orange-700', description: 'Toplama ile sudoku' },
    { id: 'kropki', title: 'Kropki Sudoku', icon: '⚫⚪', color: 'from-gray-600 to-slate-800', description: 'Nokta işaretli' },
    { id: 'little-killer', title: 'Little Killer Sudoku', icon: '🗡️', color: 'from-rose-600 to-pink-800', description: 'Küçük katil sudoku' },
    { id: 'mini', title: 'Mini Sudoku', icon: '🔹', color: 'from-cyan-500 to-blue-700', description: '4x4 ve 6x6' },
    { id: 'non-consecutive', title: 'Non-Consecutive', icon: '↮', color: 'from-purple-500 to-fuchsia-700', description: 'Ardışık olmayan' },
    { id: 'samurai', title: 'Samurai Sudoku', icon: '⚔️', color: 'from-red-600 to-orange-800', description: '5 sudoku birleşimi' },
    { id: 'samurai-killer', title: 'Samurai Killer', icon: '⚔️🔪', color: 'from-orange-600 to-red-800', description: 'Samurai killer' },
    { id: 'sandwich', title: 'Sandwich Sudoku', icon: '🥪', color: 'from-yellow-600 to-orange-800', description: 'Sandviç sudoku' },
    { id: 'sudoku-x', title: 'Sudoku X', icon: '❌', color: 'from-blue-600 to-indigo-800', description: 'X şeklinde' },
    { id: 'sudoku-y', title: 'Sudoku Y', icon: 'Y', color: 'from-green-600 to-teal-800', description: 'Y şeklinde' },
    { id: 'thermo', title: 'Thermo Sudoku', icon: '🌡️', color: 'from-orange-500 to-red-700', description: 'Termometre sudoku' },
    { id: 'windoku', title: 'Windoku', icon: '💨', color: 'from-cyan-600 to-blue-800', description: 'Rüzgar sudoku' },
    { id: 'wordoku', title: 'Wordoku', icon: '📝', color: 'from-purple-600 to-pink-800', description: 'Kelime sudoku' },
    { id: 'xv', title: 'XV Sudoku', icon: 'XV', color: 'from-indigo-600 to-purple-800', description: 'XV işaretli' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/games/logic')}
            className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm relative z-50"
          >
            ⬅ GERİ DÖN
          </button>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
            Sudoku Çeşitleri
          </h2>
          <p className="text-white/80 text-lg mt-4">
            29 farklı sudoku türünü keşfet!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto pb-32">
          {sudokuVariants.map((variant) => (
            <GameCard
              key={variant.id}
              title={variant.title}
              icon={variant.icon}
              color={variant.color}
              description={variant.description}
              onClick={() => navigate(`/games/logic/sudoku/${variant.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
