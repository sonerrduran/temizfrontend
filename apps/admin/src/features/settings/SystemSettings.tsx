import { useState } from 'react';
import { Card, Button } from '@egitim-galaksisi/ui';
import { 
  Settings, 
  Save,
  Globe,
  Mail,
  Bell,
  Database,
  Shield,
  School,
  Clock,
  FileText
} from 'lucide-react';

interface SettingsData {
  // General Settings
  schoolName: string;
  schoolCode: string;
  academicYear: string;
  language: string;
  timezone: string;
  
  // Email Settings
  emailHost: string;
  emailPort: string;
  emailUsername: string;
  emailPassword: string;
  emailFrom: string;
  
  // Notification Settings
  enableEmailNotifications: boolean;
  enableSmsNotifications: boolean;
  enablePushNotifications: boolean;
  notifyOnNewStudent: boolean;
  notifyOnAbsence: boolean;
  
  // Backup Settings
  autoBackup: boolean;
  backupFrequency: string;
  backupTime: string;
  backupRetention: string;
  
  // Security Settings
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireSymbols: boolean;
  sessionTimeout: number;
  twoFactorAuth: boolean;
}

const defaultSettings: SettingsData = {
  schoolName: 'Atatürk İlkokulu',
  schoolCode: 'ATK001',
  academicYear: '2023-2024',
  language: 'tr',
  timezone: 'Europe/Istanbul',
  
  emailHost: 'smtp.gmail.com',
  emailPort: '587',
  emailUsername: 'okul@example.com',
  emailPassword: '••••••••',
  emailFrom: 'noreply@okul.com',
  
  enableEmailNotifications: true,
  enableSmsNotifications: false,
  enablePushNotifications: true,
  notifyOnNewStudent: true,
  notifyOnAbsence: true,
  
  autoBackup: true,
  backupFrequency: 'daily',
  backupTime: '02:00',
  backupRetention: '30',
  
  passwordMinLength: 8,
  passwordRequireUppercase: true,
  passwordRequireNumbers: true,
  passwordRequireSymbols: false,
  sessionTimeout: 30,
  twoFactorAuth: false,
};

export function SystemSettings() {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [activeTab, setActiveTab] = useState<string>('general');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Ayarlar başarıyla kaydedildi!');
    }, 1000);
  };

  const tabs = [
    { id: 'general', label: 'Genel Ayarlar', icon: Globe },
    { id: 'email', label: 'Email Ayarları', icon: Mail },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'backup', label: 'Yedekleme', icon: Database },
    { id: 'security', label: 'Güvenlik', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Settings size={32} />
              Sistem Ayarları
            </h1>
            <p className="text-white/60">Sistem yapılandırmasını yönetin</p>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            <Save size={18} />
            {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tabs Sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {/* General Settings */}
            {activeTab === 'general' && (
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <School className="text-purple-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Genel Ayarlar</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Okul Adı</label>
                    <input
                      type="text"
                      value={settings.schoolName}
                      onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Okul Kodu</label>
                    <input
                      type="text"
                      value={settings.schoolCode}
                      onChange={(e) => setSettings({ ...settings, schoolCode: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Akademik Yıl</label>
                    <select
                      value={settings.academicYear}
                      onChange={(e) => setSettings({ ...settings, academicYear: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="2023-2024">2023-2024</option>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Dil</label>
                      <select
                        value={settings.language}
                        onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="tr">Türkçe</option>
                        <option value="en">English</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white/60 text-sm mb-2">Saat Dilimi</label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="Europe/Istanbul">İstanbul (GMT+3)</option>
                        <option value="Europe/London">London (GMT+0)</option>
                        <option value="America/New_York">New York (GMT-5)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="text-cyan-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Email Ayarları</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-sm mb-2">SMTP Host</label>
                      <input
                        type="text"
                        value={settings.emailHost}
                        onChange={(e) => setSettings({ ...settings, emailHost: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-white/60 text-sm mb-2">SMTP Port</label>
                      <input
                        type="text"
                        value={settings.emailPort}
                        onChange={(e) => setSettings({ ...settings, emailPort: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Email Kullanıcı Adı</label>
                    <input
                      type="email"
                      value={settings.emailUsername}
                      onChange={(e) => setSettings({ ...settings, emailUsername: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Email Şifre</label>
                    <input
                      type="password"
                      value={settings.emailPassword}
                      onChange={(e) => setSettings({ ...settings, emailPassword: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Gönderen Email</label>
                    <input
                      type="email"
                      value={settings.emailFrom}
                      onChange={(e) => setSettings({ ...settings, emailFrom: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <Button variant="secondary" className="w-full">
                    Email Bağlantısını Test Et
                  </Button>
                </div>
              </Card>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="text-green-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Bildirim Ayarları</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-4">Bildirim Kanalları</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-white">Email Bildirimleri</span>
                        <input
                          type="checkbox"
                          checked={settings.enableEmailNotifications}
                          onChange={(e) => setSettings({ ...settings, enableEmailNotifications: e.target.checked })}
                          className="w-5 h-5"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-white">SMS Bildirimleri</span>
                        <input
                          type="checkbox"
                          checked={settings.enableSmsNotifications}
                          onChange={(e) => setSettings({ ...settings, enableSmsNotifications: e.target.checked })}
                          className="w-5 h-5"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-white">Push Bildirimleri</span>
                        <input
                          type="checkbox"
                          checked={settings.enablePushNotifications}
                          onChange={(e) => setSettings({ ...settings, enablePushNotifications: e.target.checked })}
                          className="w-5 h-5"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-4">Bildirim Türleri</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-white">Yeni Öğrenci Kaydı</span>
                        <input
                          type="checkbox"
                          checked={settings.notifyOnNewStudent}
                          onChange={(e) => setSettings({ ...settings, notifyOnNewStudent: e.target.checked })}
                          className="w-5 h-5"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-white">Devamsızlık Bildirimi</span>
                        <input
                          type="checkbox"
                          checked={settings.notifyOnAbsence}
                          onChange={(e) => setSettings({ ...settings, notifyOnAbsence: e.target.checked })}
                          className="w-5 h-5"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Backup Settings */}
            {activeTab === 'backup' && (
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <Database className="text-orange-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Yedekleme Ayarları</h2>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                    <span className="text-white">Otomatik Yedekleme</span>
                    <input
                      type="checkbox"
                      checked={settings.autoBackup}
                      onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })}
                      className="w-5 h-5"
                    />
                  </label>

                  {settings.autoBackup && (
                    <>
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Yedekleme Sıklığı</label>
                        <select
                          value={settings.backupFrequency}
                          onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value="hourly">Saatlik</option>
                          <option value="daily">Günlük</option>
                          <option value="weekly">Haftalık</option>
                          <option value="monthly">Aylık</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/60 text-sm mb-2">Yedekleme Saati</label>
                        <input
                          type="time"
                          value={settings.backupTime}
                          onChange={(e) => setSettings({ ...settings, backupTime: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-white/60 text-sm mb-2">Yedek Saklama Süresi (Gün)</label>
                        <input
                          type="number"
                          value={settings.backupRetention}
                          onChange={(e) => setSettings({ ...settings, backupRetention: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </>
                  )}

                  <div className="pt-4 border-t border-white/10">
                    <Button variant="secondary" className="w-full">
                      Manuel Yedekleme Başlat
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="text-red-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Güvenlik Ayarları</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-4">Şifre Politikası</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Minimum Şifre Uzunluğu</label>
                        <input
                          type="number"
                          value={settings.passwordMinLength}
                          onChange={(e) => setSettings({ ...settings, passwordMinLength: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-white">Büyük Harf Zorunlu</span>
                        <input
                          type="checkbox"
                          checked={settings.passwordRequireUppercase}
                          onChange={(e) => setSettings({ ...settings, passwordRequireUppercase: e.target.checked })}
                          className="w-5 h-5"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-white">Rakam Zorunlu</span>
                        <input
                          type="checkbox"
                          checked={settings.passwordRequireNumbers}
                          onChange={(e) => setSettings({ ...settings, passwordRequireNumbers: e.target.checked })}
                          className="w-5 h-5"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-white">Özel Karakter Zorunlu</span>
                        <input
                          type="checkbox"
                          checked={settings.passwordRequireSymbols}
                          onChange={(e) => setSettings({ ...settings, passwordRequireSymbols: e.target.checked })}
                          className="w-5 h-5"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-4">Oturum Ayarları</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Oturum Zaman Aşımı (Dakika)</label>
                        <input
                          type="number"
                          value={settings.sessionTimeout}
                          onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-white">İki Faktörlü Kimlik Doğrulama</span>
                        <input
                          type="checkbox"
                          checked={settings.twoFactorAuth}
                          onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                          className="w-5 h-5"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
