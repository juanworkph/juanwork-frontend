import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, CheckCheck, Settings, Filter, RefreshCw } from "lucide-react";

interface NotificationsHeaderProps {
  unreadCount: number;
  totalCount: number;
  showUnreadOnly: boolean;
  onToggleUnreadOnly: () => void;
  onMarkAllAsRead: () => void;
  onRefresh: () => void;
  onToggleSettings: () => void;
  lastChecked: string;
}

export function NotificationsHeader({
  unreadCount,
  totalCount,
  showUnreadOnly,
  onToggleUnreadOnly,
  onMarkAllAsRead,
  onRefresh,
  onToggleSettings,
  lastChecked,
}: NotificationsHeaderProps) {
  const formattedLastChecked = new Date(lastChecked).toLocaleString();

  return (
    <div className="space-y-4">
      {/* Header with Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
            <Bell className="h-6 w-6 text-primary dark:text-primary" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Notifications
            </h1>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? (
                <>
                  You have{" "}
                  <span className="font-semibold text-primary">
                    {unreadCount} unread
                  </span>{" "}
                  notifications
                </>
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
            onClick={onToggleSettings}
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </div>
      </div>

      {/* Filters and Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-muted/30 rounded-lg border border-border">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-2 py-1">
              {totalCount}
            </Badge>
            <span className="text-sm text-muted-foreground">Total</span>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary px-2 py-1"
            >
              {unreadCount}
            </Badge>
            <span className="text-sm text-muted-foreground">Unread</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Show unread only
            </span>
            <Switch
              checked={showUnreadOnly}
              onCheckedChange={onToggleUnreadOnly}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Last checked: {formattedLastChecked}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
