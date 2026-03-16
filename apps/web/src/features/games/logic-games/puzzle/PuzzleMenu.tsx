import { useNavigate } from 'react-router-dom';
import { GameCard } from '@egitim-galaksisi/ui';

export default function PuzzleMenu() {
  const navigate = useNavigate();

  const puzzles = [
    { id: 'akari', title: 'Akari', icon: '💡', color: 'from-yellow-500 to-orange-700', description: 'Işık yerleştirme bulmacası' },
    { id: 'arukone', title: 'Arukone', icon: '🔗', color: 'from-blue-500 to-cyan-700', description: 'Noktaları birleştir' },
    { id: 'battleships', title: 'Battleships', icon: '🚢', color: 'from-slate-500 to-gray-700', description: 'Savaş gemileri bul' },
    { id: 'binairo', title: 'Binairo', icon: '⚫⚪', color: 'from-purple-500 to-pink-700', description: 'İkili sayı bulmacası' },
    { id: 'binoxxo', title: 'Binoxxo', icon: '❌⭕', color: 'from-red-500 to-orange-700', description: 'X ve O yerleştir' },
    { id: 'blocked-sudoku', title: 'Blocked Sudoku', icon: '🔒', color: 'from-indigo-500 to-purple-700', description: 'Bloklu sudoku' },
    { id: 'calcudoku', title: 'Calcudoku', icon: '🧮', color: 'from-green-500 to-emerald-700', description: 'Matematik bulmacası' },
    { id: 'cave', title: 'Cave', icon: '🕳️', color: 'from-amber-700 to-orange-900', description: 'Mağara bulmacası' },
    { id: 'cross-logic', title: 'Cross Logic', icon: '➕', color: 'from-cyan-500 to-blue-700', description: 'Çapraz mantık' },
    { id: 'cross-sums', title: 'Cross Sums', icon: '➕', color: 'from-rose-500 to-pink-700', description: 'Çapraz toplama' },
    { id: 'dominosa', title: 'Dominosa', icon: '🎲', color: 'from-violet-500 to-purple-700', description: 'Domino yerleştir' },
    { id: 'domino-sudoku', title: 'Domino Sudoku', icon: '🎲', color: 'from-blue-600 to-indigo-800', description: 'Domino sudoku' },
    { id: 'dot-sudoku', title: 'Dot Sudoku', icon: '⚫', color: 'from-gray-600 to-slate-800', description: 'Noktalı sudoku' },
    { id: 'einstein-riddle', title: 'Einstein Riddle', icon: '🧠', color: 'from-purple-600 to-fuchsia-800', description: 'Einstein bulmacası' },
    { id: 'fillomino', title: 'Fillomino', icon: '🔲', color: 'from-teal-500 to-cyan-700', description: 'Bölge doldur' },
    { id: 'futoshiki', title: 'Futoshiki', icon: '⚖️', color: 'from-orange-500 to-red-700', description: 'Büyüklük karşılaştırma' },
    { id: 'greater-than-killer-sudoku', title: 'Greater Than Killer', icon: '>', color: 'from-red-600 to-orange-800', description: 'Büyüktür killer sudoku' },
    { id: 'griddlers', title: 'Griddlers', icon: '🎨', color: 'from-pink-500 to-rose-700', description: 'Izgara boyama' },
    { id: 'hashi', title: 'Hashi', icon: '🌉', color: 'from-cyan-500 to-blue-700', description: 'Köprü bulmacası' },
    { id: 'hidato', title: 'Hidato', icon: '🔢', color: 'from-indigo-500 to-blue-700', description: 'Sayı zinciri' },
    { id: 'hitori', title: 'Hitori', icon: '⬛', color: 'from-slate-600 to-gray-800', description: 'Sayı silme' },
    { id: 'kakuro', title: 'Kakuro', icon: '➕', color: 'from-green-600 to-emerald-800', description: 'Çapraz toplama' },
    { id: 'kenken', title: 'KenKen', icon: '🧮', color: 'from-yellow-500 to-orange-700', description: 'Matematik kafesi' },
    { id: 'kuromasu', title: 'Kuromasu', icon: '⬛', color: 'from-gray-700 to-slate-900', description: 'Kara kare' },
    { id: 'latin-squares', title: 'Latin Squares', icon: '🔤', color: 'from-purple-500 to-pink-700', description: 'Latin kareleri' },
    { id: 'light-and-shadow', title: 'Light and Shadow', icon: '🌓', color: 'from-yellow-600 to-gray-800', description: 'Işık ve gölge' },
    { id: 'lits', title: 'LITS', icon: '🔲', color: 'from-blue-500 to-indigo-700', description: 'Tetromino yerleştir' },
    { id: 'logic-grid-puzzle', title: 'Logic Grid', icon: '📊', color: 'from-cyan-600 to-blue-800', description: 'Mantık ızgarası' },
    { id: 'loop-puzzle', title: 'Loop Puzzle', icon: '🔄', color: 'from-green-500 to-teal-700', description: 'Döngü oluştur' },
    { id: 'magnets', title: 'Magnets', icon: '🧲', color: 'from-red-500 to-blue-700', description: 'Mıknatıs yerleştir' },
    { id: 'mastermind', title: 'Mastermind', icon: '🎯', color: 'from-rose-500 to-pink-700', description: 'Kod kırma' },
    { id: 'masyu', title: 'Masyu', icon: '⚫⚪', color: 'from-gray-600 to-slate-800', description: 'Nokta döngüsü' },
    { id: 'mathdoku', title: 'Mathdoku', icon: '🔢', color: 'from-orange-500 to-red-700', description: 'Matematik sudoku' },
    { id: 'minesweeper', title: 'Mayın Tarlası', icon: '💣', color: 'from-red-600 to-orange-800', description: 'Mayınları bul' },
    { id: 'mosaic-puzzle', title: 'Mosaic', icon: '🎨', color: 'from-purple-500 to-fuchsia-700', description: 'Mozaik bulmacası' },
    { id: 'nim', title: 'Nim', icon: '🥢', color: 'from-amber-600 to-yellow-800', description: 'Çubuk alma oyunu' },
    { id: 'nonogram', title: 'Nonogram', icon: '🖼️', color: 'from-indigo-500 to-purple-700', description: 'Resim bulmacası' },
    { id: 'numberlink', title: 'Numberlink', icon: '🔗', color: 'from-blue-500 to-cyan-700', description: 'Sayı bağlantısı' },
    { id: 'number-snake', title: 'Number Snake', icon: '🐍', color: 'from-green-600 to-emerald-800', description: 'Sayı yılanı' },
    { id: 'numbrix', title: 'Numbrix', icon: '🔢', color: 'from-cyan-500 to-blue-700', description: 'Sayı yolu' },
    { id: 'nurikabe', title: 'Nurikabe', icon: '🏝️', color: 'from-teal-500 to-cyan-700', description: 'Ada oluşturma' },
    { id: 'nurimisaki', title: 'Nurimisaki', icon: '🏝️', color: 'from-green-500 to-teal-700', description: 'Burun adası' },
    { id: 'pentomino-puzzle', title: 'Pentomino', icon: '🧩', color: 'from-purple-600 to-pink-800', description: 'Pentomino yerleştir' },
    { id: 'picross', title: 'Picross', icon: '🎨', color: 'from-rose-500 to-pink-700', description: 'Resim çiz' },
    { id: 'polyomino-puzzle', title: 'Polyomino', icon: '🔲', color: 'from-violet-500 to-purple-700', description: 'Polyomino yerleştir' },
    { id: 'quad-sudoku', title: 'Quad Sudoku', icon: '4️⃣', color: 'from-blue-600 to-indigo-800', description: 'Dörtlü sudoku' },
    { id: 'ripple-effect', title: 'Ripple Effect', icon: '〰️', color: 'from-cyan-500 to-blue-700', description: 'Dalga etkisi' },
    { id: 'shikaku', title: 'Shikaku', icon: '▭', color: 'from-orange-500 to-red-700', description: 'Dikdörtgen oluştur' },
    { id: 'skyscrapers', title: 'Skyscrapers', icon: '🏙️', color: 'from-indigo-600 to-purple-800', description: 'Gökdelen bulmacası' },
    { id: 'slant', title: 'Slant', icon: '⟋', color: 'from-green-500 to-emerald-700', description: 'Eğik çizgiler' },
    { id: 'slitherlink', title: 'Slitherlink', icon: '🔗', color: 'from-blue-500 to-cyan-700', description: 'Döngü çiz' },
    { id: 'spiral-galaxies', title: 'Spiral Galaxies', icon: '🌀', color: 'from-purple-600 to-fuchsia-800', description: 'Spiral galaksiler' },
    { id: 'star-battle', title: 'Star Battle', icon: '⭐', color: 'from-yellow-500 to-orange-700', description: 'Yıldız savaşı' },
    { id: 'strimko', title: 'Strimko', icon: '🔢', color: 'from-teal-500 to-cyan-700', description: 'Zincir sudoku' },
    { id: 'suguru', title: 'Suguru', icon: '🔢', color: 'from-rose-500 to-pink-700', description: 'Sayı yerleştir' },
    { id: 'takuzu', title: 'Takuzu', icon: '⚫⚪', color: 'from-gray-600 to-slate-800', description: 'İkili bulmaca' },
    { id: 'tapa', title: 'Tapa', icon: '⬛', color: 'from-slate-700 to-gray-900', description: 'Duvar bulmacası' },
    { id: 'tectonics', title: 'Tectonics', icon: '🗺️', color: 'from-amber-600 to-orange-800', description: 'Tektonik bulmaca' },
    { id: 'tents-trees', title: 'Tents & Trees', icon: '🏕️', color: 'from-green-600 to-emerald-800', description: 'Çadır ve ağaç' },
    { id: 'tower-puzzle', title: 'Tower Puzzle', icon: '🗼', color: 'from-indigo-500 to-purple-700', description: 'Kule bulmacası' },
    { id: 'train-tracks', title: 'Train Tracks', icon: '🚂', color: 'from-orange-600 to-red-800', description: 'Tren rayları' },
    { id: 'triple-sudoku', title: 'Triple Sudoku', icon: '3️⃣', color: 'from-blue-600 to-indigo-800', description: 'Üçlü sudoku' },
    { id: 'two-not-touch', title: 'Two Not Touch', icon: '2️⃣', color: 'from-cyan-500 to-blue-700', description: 'İki değmesin' },
    { id: 'yajilin', title: 'Yajilin', icon: '➡️', color: 'from-purple-500 to-pink-700', description: 'Ok bulmacası' },
    { id: 'zebra-puzzle', title: 'Zebra Puzzle', icon: '🦓', color: 'from-gray-600 to-slate-800', description: 'Zebra bulmacası' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/games/logic')}
            className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm relative z-50"
          >
            ⬅ GERİ DÖN
          </button>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
            Bulmacalar
          </h2>
          <p className="text-white/80 text-lg mt-4">
            67 farklı zeka ve mantık bulmacası!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto pb-32">
          {puzzles.map((puzzle) => (
            <GameCard
              key={puzzle.id}
              title={puzzle.title}
              icon={puzzle.icon}
              color={puzzle.color}
              description={puzzle.description}
              onClick={() => navigate(`/games/logic/puzzle/${puzzle.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
