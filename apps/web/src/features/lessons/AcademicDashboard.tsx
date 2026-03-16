import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SUBJECTS } from '../../src/config/subjects';

const AcademicDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">📚 Akademik Dersler</h1>
          <p className="text-white/70 text-lg">Dersini seç, öğrenmeye başla!</p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {SUBJECTS.map((subject) => (
            <button
              key={subject.id}
              onClick={() => navigate(subject.path)}
              className={`group relative bg-gradient-to-br ${subject.gradient} p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 hover:border-white/40`}
            >
              {/* Icon */}
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {subject.icon}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-white mb-2">{subject.name}</h3>

              {/* Description */}
              <p className="text-white/80 text-sm mb-3">{subject.description}</p>

              {/* Grades */}
              <div className="flex flex-wrap gap-1 justify-center">
                {subject.grades.map((grade) => (
                  <span
                    key={grade}
                    className="px-2 py-1 bg-white/20 rounded-full text-xs font-semibold text-white"
                  >
                    {grade}. Sınıf
                  </span>
                ))}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-2xl transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-300 border border-white/20"
          >
            ← Ana Menüye Dön
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademicDashboard;
