import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  Mail, 
  Bell, 
  Volume2, 
  Save,
  Smartphone
} from 'lucide-react';

interface NotificationSettingsProps {
  settings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    soundEnabled: boolean;
    showUnreadOnly: boolean;
  };
  onUpdateSettings: (settings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    soundEnabled: boolean;
    showUnreadOnly: boolean;
  }) => void;
}

export function NotificationSettings({ settings, onUpdateSettings }: NotificationSettingsProps) {
  const [localSettings, setLocalSettings] = React.useState(settings);
  const [isChanged, setIsChanged] = React.useState(false);

  const handleSettingChange = (key: string, value: boolean) => {
    const updatedSettings = { ...localSettings, [key]: value };
    setLocalSettings(updatedSettings);
    setIsChanged(true);
  };

  const handleSave = () => {
    onUpdateSettings(localSettings);
    setIsChanged(false);
  };

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <Settings className="h-5 w-5 text-gray-500" />
          Notification Settings
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <Label htmlFor="emailNotifications" className="font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive notifications via email
                </p>
              </div>
            </div>
            <Switch
              id="emailNotifications"
              checked={localSettings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
            />
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Smartphone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <Label htmlFor="pushNotifications" className="font-medium">
                  Push Notifications
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive push notifications in browser
                </p>
              </div>
            </div>
            <Switch
              id="pushNotifications"
              checked={localSettings.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
            />
          </div>

          {/* Sound Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Volume2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <Label htmlFor="soundEnabled" className="font-medium">
                  Sound Notifications
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Play sound when new notifications arrive
                </p>
              </div>
            </div>
            <Switch
              id="soundEnabled"
              checked={localSettings.soundEnabled}
              onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
            />
          </div>

          {/* Show Unread Only */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <Label htmlFor="showUnreadOnly" className="font-medium">
                  Show Unread Only
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Only show unread notifications by default
                </p>
              </div>
            </div>
            <Switch
              id="showUnreadOnly"
              checked={localSettings.showUnreadOnly}
              onCheckedChange={(checked) => handleSettingChange('showUnreadOnly', checked)}
            />
          </div>
        </div>

        {/* Save Button */}
        {isChanged && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button 
              onClick={handleSave}
              className="w-full sm:w-auto gap-2"
            >
              <Save className="h-4 w-4" />
              Save Settings
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 