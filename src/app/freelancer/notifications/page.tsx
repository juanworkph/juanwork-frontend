"use client";

import React, { useState } from 'react';
import {
  NotificationsHeader,
  NotificationsList,
  NotificationSettings
} from '@/features/notifications/components';
import {
  mockNotificationsData
} from '@/features/notifications/schema';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export default function FreelancerNotificationsPage() {
  // State for notifications data
  const [notificationsState, setNotificationsState] = useState(mockNotificationsData);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle marking a single notification as read
  const handleMarkAsRead = (id: string) => {
    setNotificationsState(prev => {
      const updatedNotifications = prev.notifications.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      );
      
      const unreadCount = updatedNotifications.filter(n => !n.isRead).length;
      
      return {
        ...prev,
        notifications: updatedNotifications,
        unreadCount
      };
    });
  };

  // Handle marking all notifications as read
  const handleMarkAllAsRead = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setNotificationsState(prev => {
        const updatedNotifications = prev.notifications.map(notification => ({
          ...notification,
          isRead: true
        }));
        
        return {
          ...prev,
          notifications: updatedNotifications,
          unreadCount: 0
        };
      });
      
      setIsLoading(false);
    }, 500);
  };

  // Handle deleting a notification
  const handleDeleteNotification = (id: string) => {
    setNotificationsState(prev => {
      const updatedNotifications = prev.notifications.filter(notification => notification.id !== id);
      const unreadCount = updatedNotifications.filter(n => !n.isRead).length;
      
      return {
        ...prev,
        notifications: updatedNotifications,
        unreadCount
      };
    });
  };

  // Handle refreshing notifications
  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, we would fetch new notifications here
      setNotificationsState(mockNotificationsData);
      setIsLoading(false);
    }, 800);
  };

  // Handle toggling unread only filter
  const handleToggleUnreadOnly = () => {
    setNotificationsState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        showUnreadOnly: !prev.settings.showUnreadOnly
      }
    }));
  };

  // Handle updating notification settings
  const handleUpdateSettings = (newSettings: any) => {
    setNotificationsState(prev => ({
      ...prev,
      settings: newSettings
    }));
  };

  // Toggle settings visibility
  const toggleSettings = () => {
    setIsSettingsVisible(prev => !prev);
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Notifications Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {notificationsState.unreadCount > 0 ? (
                <>You have <span className="font-semibold text-blue-600 dark:text-blue-400">{notificationsState.unreadCount} unread</span> notifications</>
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
            className="gap-2"
            onClick={handleRefresh}
          >
            <span>Refresh</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleMarkAllAsRead}
            disabled={notificationsState.unreadCount === 0}
          >
            <span>Mark All Read</span>
          </Button>
          
          <Button
            variant={isSettingsVisible ? "default" : "outline"}
            size="sm"
            className="gap-2"
            onClick={toggleSettings}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">Total:</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {notificationsState.notifications.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">Unread:</span>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {notificationsState.unreadCount}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Show unread only</span>
            <Button 
              variant={notificationsState.settings.showUnreadOnly ? "default" : "outline"}
              size="sm"
              className="h-8 px-3"
              onClick={handleToggleUnreadOnly}
            >
              {notificationsState.settings.showUnreadOnly ? "On" : "Off"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Notifications List */}
        <div className={`${isSettingsVisible ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <NotificationsList
            notifications={notificationsState.notifications}
            showUnreadOnly={notificationsState.settings.showUnreadOnly}
            isLoading={isLoading}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDeleteNotification}
            hasMoreNotifications={false}
          />
        </div>

        {/* Notification Settings (conditionally rendered) */}
        {isSettingsVisible && (
          <div className="lg:col-span-1">
            <NotificationSettings
              settings={notificationsState.settings}
              onUpdateSettings={handleUpdateSettings}
            />
          </div>
        )}
      </div>
    </div>
  );
}
