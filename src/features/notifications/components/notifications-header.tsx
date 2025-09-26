import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  CheckCheck, 
  Settings, 
  Filter,
  RefreshCw
} from 'lucide-react';

interface NotificationsHeaderProps {
  unreadCount: number;
  totalCount: number;
  showUnreadOnly: boolean;
  onToggleUnreadOnly: () => void;
  onMarkAllAsRead: () => void;
  onRefresh: () => void;
  lastChecked: string;
}

export function NotificationsHeader({
  unreadCount,
  totalCount,
  showUnreadOnly,
  onToggleUnreadOnly,
  onMarkAllAsRead,
  onRefresh,
  lastChecked
}: NotificationsHeaderProps) {
  const formattedLastChecked = new Date(lastChecked).toLocaleString();

  return (
    <div className="space-y-4">
      {/* Header with Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {unreadCount > 0 ? (
                <>You have <span className="font-semibold text-blue-600">{unreadCount} unread</span> notifications</>
              ) : (
                "All caught up! No unread notifications."
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={onMarkAllAsRead}
            className="gap-2"
            disabled={unreadCount === 0}
          >
            <CheckCheck className="h-4 w-4" />
            <span>Mark All Read</span>
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </div>
      </div>

      {/* Filters and Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-2 py-1">
              {totalCount}
            </Badge>
            <span className="text-sm text-gray-600 dark:text-gray-400">Total</span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1">
              {unreadCount}
            </Badge>
            <span className="text-sm text-gray-600 dark:text-gray-400">Unread</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Show unread only</span>
            <Switch 
              checked={showUnreadOnly} 
              onCheckedChange={onToggleUnreadOnly} 
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Last checked: {formattedLastChecked}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 