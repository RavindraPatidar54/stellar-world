import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  Database, 
  Mail, 
  Globe,
  Download,
  Upload,
  Trash2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function Settings() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
      policyUpdates: true,
      securityAlerts: true,
      systemMaintenance: false,
    },
    security: {
      twoFactor: true,
      sessionTimeout: '30',
      autoLogout: true,
      ipWhitelist: false,
    },
    preferences: {
      language: 'en',
      timezone: 'UTC-8',
      dateFormat: 'MM/DD/YYYY',
      pageSize: '25',
    },
    data: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: '90',
      exportFormat: 'json',
    }
  });

  const handleSidebarClick = (item: string) => {
    switch (item) {
      case 'home':
        navigate('/dashboard');
        break;
      case 'policies':
        navigate('/policies');
        break;
      case 'reports':
        navigate('/reports');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        navigate('/login');
        break;
    }
  };

  const updateNotificationSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  const updateSecuritySetting = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      security: { ...prev.security, [key]: value }
    }));
  };

  const updatePreferenceSetting = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value }
    }));
  };

  const updateDataSetting = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      data: { ...prev.data, [key]: value }
    }));
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar activeItem="settings" onItemClick={handleSidebarClick} />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-slate-800 bg-slate-900 px-6 py-4">
          <h1 className="text-xl font-semibold text-white">Settings</h1>
          <p className="text-slate-400 mt-1">Manage your application preferences and security settings</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Theme Settings */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                Appearance
              </CardTitle>
              <CardDescription className="text-slate-400">Choose your preferred theme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Theme</Label>
                  <p className="text-sm text-slate-400">
                    Switch between light and dark mode
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-slate-400" />
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                  />
                  <Moon className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
              <CardDescription className="text-slate-400">Configure how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Email Notifications</Label>
                  <p className="text-sm text-slate-400">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => updateNotificationSetting('email', checked)}
                />
              </div>

              <Separator className="bg-slate-800" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Push Notifications</Label>
                  <p className="text-sm text-slate-400">Receive browser notifications</p>
                </div>
                <Switch
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => updateNotificationSetting('push', checked)}
                />
              </div>

              <Separator className="bg-slate-800" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Policy Updates</Label>
                  <p className="text-sm text-slate-400">Get notified when policies are updated</p>
                </div>
                <Switch
                  checked={settings.notifications.policyUpdates}
                  onCheckedChange={(checked) => updateNotificationSetting('policyUpdates', checked)}
                />
              </div>

              <Separator className="bg-slate-800" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Security Alerts</Label>
                  <p className="text-sm text-slate-400">Critical security notifications</p>
                </div>
                <Switch
                  checked={settings.notifications.securityAlerts}
                  onCheckedChange={(checked) => updateNotificationSetting('securityAlerts', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5" />
                Security
              </CardTitle>
              <CardDescription className="text-slate-400">Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Two-Factor Authentication</Label>
                  <p className="text-sm text-slate-400">Add an extra layer of security</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={settings.security.twoFactor}
                    onCheckedChange={(checked) => updateSecuritySetting('twoFactor', checked)}
                  />
                  <Badge className={settings.security.twoFactor ? "bg-green-600 hover:bg-green-600" : "bg-slate-600 hover:bg-slate-600"}>
                    {settings.security.twoFactor ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </div>

              <Separator className="bg-slate-800" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout" className="text-white">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSecuritySetting('sessionTimeout', e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-7">
                  <Switch
                    checked={settings.security.autoLogout}
                    onCheckedChange={(checked) => updateSecuritySetting('autoLogout', checked)}
                  />
                  <Label className="text-white">Auto logout on inactivity</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Globe className="w-5 h-5" />
                Preferences
              </CardTitle>
              <CardDescription className="text-slate-400">Customize your application experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Language</Label>
                  <Select value={settings.preferences.language} onValueChange={(value) => updatePreferenceSetting('language', value)}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Timezone</Label>
                  <Select value={settings.preferences.timezone} onValueChange={(value) => updatePreferenceSetting('timezone', value)}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="UTC-8">UTC-8 (PST)</SelectItem>
                      <SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
                      <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                      <SelectItem value="UTC+1">UTC+1 (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Date Format</Label>
                  <Select value={settings.preferences.dateFormat} onValueChange={(value) => updatePreferenceSetting('dateFormat', value)}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Items per page</Label>
                  <Select value={settings.preferences.pageSize} onValueChange={(value) => updatePreferenceSetting('pageSize', value)}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Database className="w-5 h-5" />
                Data Management
              </CardTitle>
              <CardDescription className="text-slate-400">Manage your data backup and export settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Automatic Backup</Label>
                  <p className="text-sm text-slate-400">Automatically backup your data</p>
                </div>
                <Switch
                  checked={settings.data.autoBackup}
                  onCheckedChange={(checked) => updateDataSetting('autoBackup', checked)}
                />
              </div>

              <Separator className="bg-slate-800" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Backup Frequency</Label>
                  <Select value={settings.data.backupFrequency} onValueChange={(value) => updateDataSetting('backupFrequency', value)}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Retention Period (days)</Label>
                  <Input
                    type="number"
                    value={settings.data.retentionPeriod}
                    onChange={(e) => updateDataSetting('retentionPeriod', e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>

              <Separator className="bg-slate-800" />

              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2 border-slate-600 text-slate-300 hover:bg-slate-800">
                  <Download className="w-4 h-4" />
                  Export Data
                </Button>
                <Button variant="outline" className="flex items-center gap-2 border-slate-600 text-slate-300 hover:bg-slate-800">
                  <Upload className="w-4 h-4" />
                  Import Data
                </Button>
                <Button variant="destructive" className="flex items-center gap-2 ml-auto">
                  <Trash2 className="w-4 h-4" />
                  Clear All Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Save All Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
