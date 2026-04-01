import { useState } from 'react';
import { User, Store, Bell, Shield, Palette, Save, Check, Sun, Moon, Monitor, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme, type Theme, type AccentColor, type FontSize } from '@/hooks/useTheme';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [compactMode, setCompactMode] = useState(false);
  const { toast } = useToast();
  const { theme, accent, fontSize, setTheme, setAccent, setFontSize, resolvedTheme } = useTheme();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'store', label: 'Store', icon: Store },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const accentColors: { name: string; id: AccentColor; color: string }[] = [
    { name: 'Blue', id: 'blue', color: 'bg-[hsl(239,84%,67%)]' },
    { name: 'Purple', id: 'purple', color: 'bg-violet-500' },
    { name: 'Green', id: 'green', color: 'bg-emerald-500' },
    { name: 'Orange', id: 'orange', color: 'bg-orange-500' },
    { name: 'Rose', id: 'rose', color: 'bg-rose-500' },
  ];

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  const handleSaveStore = () => {
    toast({
      title: "Store Updated",
      description: "Your store settings have been saved successfully.",
    });
  };

  const handleUpdatePassword = () => {
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    toast({
      title: "Theme Changed",
      description: `Theme set to ${newTheme === 'system' ? 'System' : newTheme === 'dark' ? 'Dark' : 'Light'} mode.`,
    });
  };

  const handleAccentChange = (newAccent: AccentColor) => {
    setAccent(newAccent);
    const colorName = accentColors.find(c => c.id === newAccent)?.name || newAccent;
    toast({
      title: "Accent Color Changed",
      description: `Accent color set to ${colorName}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-description">Manage your account and store preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-card rounded-xl border border-border p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-card rounded-xl border border-border p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground">Profile Settings</h2>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center">
                  <User className="w-10 h-10 text-primary-foreground" />
                </div>
                <div>
                  <button className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    Upload Photo
                  </button>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                  <input
                    type="text"
                    defaultValue="Admin"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <input
                    type="text"
                    defaultValue="User"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="admin@techsmartz.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+1 234-567-8900"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <button 
                onClick={handleSaveProfile}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'store' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground">Store Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Store Name</label>
                  <input
                    type="text"
                    defaultValue="TechSmartzGuru Store"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Store Description</label>
                  <textarea
                    rows={3}
                    defaultValue="Your one-stop shop for premium tech products and accessories."
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Currency</label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>INR (₹)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option>UTC+5:30 (IST)</option>
                      <option>UTC-5 (Eastern)</option>
                      <option>UTC-8 (Pacific)</option>
                      <option>UTC+0 (GMT)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Store Address</label>
                  <textarea
                    rows={2}
                    defaultValue="123 Tech Street, Silicon Valley, CA 94000"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
              </div>
              <button 
                onClick={handleSaveStore}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: 'New Order Notifications', description: 'Get notified when you receive a new order', defaultChecked: true },
                  { label: 'Low Stock Alerts', description: 'Alerts when products are running low', defaultChecked: true },
                  { label: 'Customer Messages', description: 'Notifications for customer inquiries', defaultChecked: true },
                  { label: 'Weekly Reports', description: 'Receive weekly performance summaries', defaultChecked: false },
                  { label: 'Marketing Updates', description: 'Tips and updates about marketing features', defaultChecked: false },
                  { label: 'Security Alerts', description: 'Get notified about security-related activities', defaultChecked: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground">Security Settings</h2>
              
              {/* Change Password */}
              <div className="space-y-4">
                <h3 className="text-md font-medium text-foreground">Change Password</h3>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <button 
                  onClick={handleUpdatePassword}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Update Password
                </button>
              </div>

              {/* Two-Factor Authentication */}
              <div className="pt-4 border-t border-border">
                <h3 className="text-md font-medium text-foreground mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground mt-0.5">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              {/* Session Management */}
              <div className="pt-4 border-t border-border">
                <h3 className="text-md font-medium text-foreground mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  {[
                    { device: 'Chrome on Windows', location: 'New Delhi, India', current: true },
                    { device: 'Safari on iPhone', location: 'Mumbai, India', current: false },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                      <div>
                        <p className="font-medium text-foreground flex items-center gap-2">
                          {session.device}
                          {session.current && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-success/10 text-success">Current</span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">{session.location}</p>
                      </div>
                      {!session.current && (
                        <button className="text-sm text-destructive hover:underline">Revoke</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground">Appearance Settings</h2>
              
              {/* Theme Selection */}
              <div>
                <p className="text-sm font-medium text-foreground mb-4">Theme</p>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      theme === 'light' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                        <Sun className="w-6 h-6 text-amber-500" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Light</span>
                      {theme === 'light' && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      theme === 'dark' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                        <Moon className="w-6 h-6 text-slate-300" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Dark</span>
                      {theme === 'dark' && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => handleThemeChange('system')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      theme === 'system' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-slate-800 flex items-center justify-center">
                        <Monitor className="w-6 h-6 text-slate-600" />
                      </div>
                      <span className="text-sm font-medium text-foreground">System</span>
                      {theme === 'system' && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Currently using: <span className="font-medium capitalize">{resolvedTheme}</span> mode
                </p>
              </div>

              {/* Accent Color */}
              <div>
                <p className="text-sm font-medium text-foreground mb-4">Accent Color</p>
                <div className="flex flex-wrap gap-3">
                  {accentColors.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleAccentChange(item.id)}
                      className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center transition-transform hover:scale-110 ${
                        accent === item.id ? 'ring-2 ring-offset-2 ring-offset-background ring-primary scale-110' : ''
                      }`}
                      title={item.name}
                    >
                      {accent === item.id && (
                        <Check className="w-5 h-5 text-white" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Selected: {accentColors.find(c => c.id === accent)?.name}
                </p>
              </div>

              {/* Font Size */}
              <div>
                <p className="text-sm font-medium text-foreground mb-4">Font Size</p>
                <div className="flex gap-2">
                  {([
                    { id: 'small', label: 'Small', sample: 'Aa' },
                    { id: 'medium', label: 'Medium', sample: 'Aa' },
                    { id: 'large', label: 'Large', sample: 'Aa' },
                  ] as const).map((size) => (
                    <button
                      key={size.id}
                      onClick={() => {
                        setFontSize(size.id);
                        toast({
                          title: "Font Size Changed",
                          description: `Font size set to ${size.label}.`,
                        });
                      }}
                      className={`flex flex-col items-center gap-1 px-5 py-3 rounded-xl border-2 transition-all ${
                        fontSize === size.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span className={`font-bold ${size.id === 'small' ? 'text-sm' : size.id === 'large' ? 'text-xl' : 'text-base'}`}>
                        {size.sample}
                      </span>
                      <span className="text-xs text-muted-foreground">{size.label}</span>
                      {fontSize === size.id && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Current: <span className="font-medium capitalize">{fontSize}</span>
                </p>
              </div>

              {/* Compact Mode */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium text-foreground">Compact Mode</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Reduce spacing and padding throughout the interface
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={compactMode}
                    onChange={(e) => setCompactMode(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Live Preview */}
              <div>
                <p className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Live Preview
                </p>
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                      <Palette className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Sample Card Title</p>
                      <p className="text-sm text-muted-foreground">This is how your content will look</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                      Primary
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      Muted
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-success text-success-foreground">
                      Success
                    </span>
                  </div>
                  <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                    Sample Button
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
