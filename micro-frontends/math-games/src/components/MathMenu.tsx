import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubjectById } from '../../../../apps/web/src/config/subjects';

const MathMenu: React.FC = () => {
  const navigate = useNavigate();
  const subject = getSubjectById('math');

  if (!subject) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">{subject.icon}</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{subject.name}</h1>
          <p className="text-white/80 text-lg">{subject.description}</p>
        </div>

        {/* Grade Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {subject.grades.map((grade) => (
            <button
              key={grade}
              onClick={() => navigate(`/academic/math/grade${grade}`)}
              className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-sm p-8 rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-5xl font-black text-white mb-2">{grade}</div>
              <div className="text-white/80 text-sm font-semibold">Sınıf</div>
            </button>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/academic')}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-300 border border-white/20"
          >
            ← Dersler
          </button>
        </div>
      </div>
    </div>
  );
};

export default MathMenu;
