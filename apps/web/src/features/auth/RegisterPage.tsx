import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore, UserRole } from '../../stores/authStore';
import { navigateByRole } from '@egitim-galaksisi/shared';

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register, isLoading, error, clearError } = useAuthStore();
    const [form, setForm] = useState({
        email: '', password: '', name: '', role: 'STUDENT' as string,
        gradeLevel: 5, schoolCode: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: name === 'gradeLevel' ? parseInt(value) : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        await register({
            email: form.email, password: form.password, name: form.name,
            role: form.role, gradeLevel: form.gradeLevel,
            schoolCode: form.schoolCode || undefined,
        });
        const user = useAuthStore.getState().user;
        if (user) navigateByRole(user.role, navigate);
    };

    const roles = [
        { value: 'STUDENT', label: '🎓 Öğrenci', emoji: '🎓' },
        { value: 'TEACHER', label: '👩‍🏫 Öğretmen', emoji: '👩‍🏫' },
        { value: 'PARENT', label: '👨‍👩‍👧 Veli', emoji: '👨‍👩‍👧' },
        { value: 'SCHOOL_ADMIN', label: '🏫 Okul Müdürü', emoji: '🏫' },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 py-8">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div key={i} className="absolute rounded-full bg-white/5 animate-pulse"
                        style={{ width: Math.random() * 6 + 2, height: Math.random() * 6 + 2, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${Math.random() * 3 + 2}s` }} />
                ))}
            </div>

            <div className="relative w-full max-w-md">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-[#1a1a2e]/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
                    <div className="text-center mb-6">
                        <div className="text-5xl mb-3">✨</div>
                        <h1 className="text-3xl font-bold text-white">Kayıt Ol</h1>
                        <p className="text-white/50 mt-2">Galaksideki yerini al!</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm">{error}</div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Role Selection */}
                        <div>
                            <label className="block text-white/70 text-sm mb-2">Hesap Türü</label>
                            <div className="grid grid-cols-2 gap-2">
                                {roles.map(r => (
                                    <button key={r.value} type="button" onClick={() => setForm({ ...form, role: r.value })}
                                        className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all border ${form.role === r.value
                                            ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                                            : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'}`}>
                                        {r.emoji} {r.label.split(' ').slice(1).join(' ')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-white/70 text-sm mb-1.5">Ad Soyad</label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                placeholder="Adınız Soyadınız" />
                        </div>

                        <div>
                            <label className="block text-white/70 text-sm mb-1.5">Email</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                placeholder="ornek@okul.com" />
                        </div>

                        <div>
                            <label className="block text-white/70 text-sm mb-1.5">Şifre</label>
                            <input type="password" name="password" value={form.password} onChange={handleChange} required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                placeholder="En az 6 karakter" />
                        </div>

                        {form.role === 'STUDENT' && (
                            <div>
                                <label className="block text-white/70 text-sm mb-1.5">Sınıf Seviyesi</label>
                                <select name="gradeLevel" value={form.gradeLevel} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 outline-none transition-all">
                                    <option value="0" className="bg-[#1a1a2e]">Anasınıfı</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(g => (
                                        <option key={g} value={g} className="bg-[#1a1a2e]">{g}. Sınıf</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div>
                            <label className="block text-white/70 text-sm mb-1.5">Okul Kodu <span className="text-white/30">(Opsiyonel)</span></label>
                            <input type="text" name="schoolCode" value={form.schoolCode} onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                placeholder="Okul kodunuz varsa girin" />
                        </div>

                        <button type="submit" disabled={isLoading}
                            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 disabled:opacity-50">
                            {isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/40 text-sm">
                            Zaten hesabın var mı? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">Giriş Yap</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
