import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card } from '@egitim-galaksisi/ui';
import { useAuthStore } from '../../stores/authStore';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Öğretmen Girişi
          </h1>
          <p className="text-white/60">
            Eğitim Galaksisi Öğretmen Paneli
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            label="E-posta"
            value={email}
            onChange={(value) => setEmail(value)}
            placeholder="ornek@okul.com"
            required
          />

          <Input
            type="password"
            label="Şifre"
            value={password}
            onChange={(value) => setPassword(value)}
            placeholder="••••••••"
            required
          />

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-white/50">
          <p>Mock Mode: Herhangi bir şifre ile giriş yapabilirsiniz</p>
        </div>
      </Card>
    </div>
  );
}
