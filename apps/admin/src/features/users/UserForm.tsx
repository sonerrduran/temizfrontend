import { useState } from 'react';
import { Card, Button } from '@egitim-galaksisi/ui';
import { X, Save, User } from 'lucide-react';

interface UserFormProps {
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  };
  onClose: () => void;
  onSave: (user: any) => void;
}

export function UserForm({ user, onClose, onSave }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    role: user?.role || 'student',
    status: user?.status || 'active',
    gradeLevel: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'İsim gereklidir';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi giriniz';
    }

    if (!user && !formData.password) {
      newErrors.password = 'Şifre gereklidir';
    } else if (!user && formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSave({
        ...user,
        ...formData,
        id: user?.id || Date.now().toString(),
      });
      onClose();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {user ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
              </h2>
              <p className="text-white/60 text-sm">Kullanıcı bilgilerini giriniz</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={24} className="text-white/60" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Temel Bilgiler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  İsim Soyisim <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-4 py-2 bg-white/5 border ${
                    errors.name ? 'border-red-500' : 'border-white/10'
                  } rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500`}
                  placeholder="Ahmet Yılmaz"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-4 py-2 bg-white/5 border ${
                    errors.email ? 'border-red-500' : 'border-white/10'
                  } rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500`}
                  placeholder="ahmet@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              {!user && (
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Şifre <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className={`w-full px-4 py-2 bg-white/5 border ${
                      errors.password ? 'border-red-500' : 'border-white/10'
                    } rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                  )}
                </div>
              )}

              {/* Phone */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                  placeholder="0555 123 45 67"
                />
              </div>
            </div>
          </div>

          {/* Role & Status */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Rol ve Durum</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Role */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Rol <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="student">Öğrenci</option>
                  <option value="teacher">Öğretmen</option>
                  <option value="admin">Yönetici</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Durum <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Pasif</option>
                </select>
              </div>

              {/* Grade Level (for students) */}
              {formData.role === 'student' && (
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Sınıf Seviyesi
                  </label>
                  <select
                    value={formData.gradeLevel}
                    onChange={(e) => handleChange('gradeLevel', e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Seçiniz</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(grade => (
                      <option key={grade} value={grade}>{grade}. Sınıf</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Adres Bilgileri</h3>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Adres
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500 resize-none"
                placeholder="Tam adres giriniz..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              İptal
            </Button>
            <Button
              type="submit"
              className="flex items-center gap-2"
            >
              <Save size={18} />
              {user ? 'Güncelle' : 'Kaydet'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
