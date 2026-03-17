import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { navigateByRole } from '@egitim-galaksisi/shared';

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, isLoading, error, clearError } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        await login(email, password);
        const user = useAuthStore.getState().user;
        if (user) navigateByRole(user.role, navigate);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div key={i} className="absolute rounded-full bg-white/5 animate-pulse"
                        style={{ width: Math.random() * 6 + 2, height: Math.random() * 6 + 2, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${Math.random() * 3 + 2}s` }} />
                ))}
            </div>

            <div className="relative w-full max-w-md">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-[#1a1a2e]/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
                    <div className="text-center mb-8">
                        <div className="text-5xl mb-3">🚀</div>
                        <h1 className="text-3xl font-bold text-white">Eğitim Galaksisi</h1>
                        <p className="text-white/50 mt-2">Akıllı Okul Platformuna Giriş Yap</p>
                        {USE_MOCK && (
                            <div className="mt-3 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                                <p className="text-green-300 text-xs font-medium">🧪 Mock Mode Active</p>
                                <p className="text-green-400/70 text-xs mt-1">Test: ahmet@example.com</p>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-white/70 text-sm mb-1.5">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                placeholder="ornek@okul.com" />
                        </div>
                        <div>
                            <label className="block text-white/70 text-sm mb-1.5">Şifre</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                placeholder="••••••" />
                        </div>
                        <button type="submit" disabled={isLoading}
                            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:from-purple-500 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? (
                                <span className="inline-flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                    Giriş yapılıyor...
                                </span>
                            ) : 'Giriş Yap'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/40 text-sm">
                            Hesabınız yok mu? <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium">Kayıt Ol</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
