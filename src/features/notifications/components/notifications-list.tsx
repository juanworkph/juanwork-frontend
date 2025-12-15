import React from 'react';
import { NotificationItem } from './notification-item';
import { Notification } from '../schema/notifications-data';
import { Button } from '@/components/ui/button';
import { RefreshCw, Bell, InboxIcon } from 'lucide-react';

interface NotificationsListProps {
  notifications: Notification[];
  showUnreadOnly: boolean;
  isLoading?: boolean;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onLoadMore?: () => void;
  hasMoreNotifications?: boolean;
}

export function NotificationsList({
  notifications,
  showUnreadOnly,
  isLoading = false,
  onMarkAsRead,
  onDelete,
  onLoadMore,
  hasMoreNotifications = false
}: NotificationsListProps) {
  // Filter notifications if showUnreadOnly is true
  const displayedNotifications = showUnreadOnly
    ? notifications.filter(notification => !notification.isRead)
    : notifications;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (displayedNotifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          {showUnreadOnly ? (
            <Bell className="h-8 w-8 text-gray-400" />
          ) : (
            <InboxIcon className="h-8 w-8 text-gray-400" />
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {showUnreadOnly ? "No unread notifications" : "No notifications yet"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          {showUnreadOnly
            ? "You're all caught up! Check back later for new notifications."
            : "You don't have any notifications yet. We'll notify you when something important happens."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Group notifications by date */}
      {displayedNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      ))}

      {/* Load More Button */}
      {hasMoreNotifications && onLoadMore && (
        <div className="flex justify-center pt-4">
          <Button 
            variant="outline" 
            onClick={onLoadMore}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Load More
          </Button>
        </div>
      )}
    </div>
  );
} 