"use client";

import React, { useState } from "react";
import {
  NotificationsList,
  NotificationSettings,
  NotificationsHeader,
} from "@/features/notifications/components";
import { mockNotificationsData } from "@/features/notifications/schema";
import { Button } from "@/components/ui/button";

export default function ClientNotificationsPage() {
  // State for notifications data
  const [notificationsState, setNotificationsState] = useState(
    mockNotificationsData
  );
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle marking a single notification as read
  const handleMarkAsRead = (id: string) => {
    setNotificationsState((prev) => {
      const updatedNotifications = prev.notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      );

      const unreadCount = updatedNotifications.filter((n) => !n.isRead).length;

      return {
        ...prev,
        notifications: updatedNotifications,
        unreadCount,
      };
    });
  };

  // Handle marking all notifications as read
  const handleMarkAllAsRead = () => {
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setNotificationsState((prev) => {
        const updatedNotifications = prev.notifications.map((notification) => ({
          ...notification,
          isRead: true,
        }));

        return {
          ...prev,
          notifications: updatedNotifications,
          unreadCount: 0,
        };
      });

      setIsLoading(false);
    }, 500);
  };

  // Handle deleting a notification
  const handleDeleteNotification = (id: string) => {
    setNotificationsState((prev) => {
      const updatedNotifications = prev.notifications.filter(
        (notification) => notification.id !== id
      );
      const unreadCount = updatedNotifications.filter((n) => !n.isRead).length;

      return {
        ...prev,
        notifications: updatedNotifications,
        unreadCount,
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
    setNotificationsState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        showUnreadOnly: !prev.settings.showUnreadOnly,
      },
    }));
  };

  // Handle updating notification settings
  const handleUpdateSettings = (newSettings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    soundEnabled: boolean;
    showUnreadOnly: boolean;
  }) => {
    setNotificationsState((prev) => ({
      ...prev,
      settings: newSettings,
    }));
  };

  // Toggle settings visibility
  const toggleSettings = () => {
    setIsSettingsVisible((prev) => !prev);
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Notifications Header */}
      <NotificationsHeader
        unreadCount={notificationsState.unreadCount}
        totalCount={notificationsState.notifications.length}
        showUnreadOnly={notificationsState.settings.showUnreadOnly}
        onToggleUnreadOnly={handleToggleUnreadOnly}
        onMarkAllAsRead={handleMarkAllAsRead}
        onRefresh={handleRefresh}
        onToggleSettings={toggleSettings}
        lastChecked={new Date().toISOString()}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Notifications List */}
        <div
          className={`${isSettingsVisible ? "lg:col-span-2" : "lg:col-span-3"}`}
        >
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
