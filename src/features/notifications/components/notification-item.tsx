import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageSquare,
  DollarSign,
  Star,
  Bell,
  FileText,
  Briefcase,
  CheckCircle,
  FileSignature,
  Check,
  MoreVertical,
} from "lucide-react";
import { Notification, getRelativeTime } from "../schema/notifications-data";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
}: NotificationItemProps) {
  const {
    id,
    type,
    title,
    message,
    sender,
    project,
    timestamp,
    isRead,
    isUrgent,
    actionUrl,
    actionLabel,
    amount,
  } = notification;

  const relativeTime = getRelativeTime(timestamp);

  // Get icon based on notification type
  const getNotificationIcon = () => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-primary" />;
      case "payment":
        return <DollarSign className="h-5 w-5 text-green-600" />;
      case "review":
        return <Star className="h-5 w-5 text-yellow-600" />;
      case "project_invite":
        return <Briefcase className="h-5 w-5 text-purple-600" />;
      case "project_update":
        return <FileText className="h-5 w-5 text-indigo-600" />;
      case "milestone":
        return <CheckCircle className="h-5 w-5 text-teal-600" />;
      case "proposal":
        return <FileText className="h-5 w-5 text-orange-600" />;
      case "contract":
        return <FileSignature className="h-5 w-5 text-pink-600" />;
      case "system":
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  // Get background color based on notification type and read status
  const getBackgroundColor = () => {
    if (!isRead) {
      return "bg-primary/10 hover:bg-primary/15";
    }
    return "bg-card hover:bg-primary/5 hover:border-primary/10";
  };

  return (
    <div
      className={`p-4 rounded-lg border ${
        isRead ? "border-border" : "border-primary/20 dark:border-primary/20"
      } ${getBackgroundColor()} transition-colors duration-200`}
    >
      <div className="flex gap-4">
        {/* Avatar or Icon */}
        <div className="flex-shrink-0">
          {sender?.avatar ? (
            <Avatar className="h-10 w-10">
              <AvatarImage src={sender.avatar} alt={sender.name} />
              <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : (
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${
                isRead ? "bg-muted" : "bg-primary/10 dark:bg-primary/20"
              }`}
            >
              {getNotificationIcon()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header with Title and Time */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <h3
                className={`font-semibold ${
                  isRead ? "text-foreground" : "text-primary dark:text-primary"
                }`}
              >
                {title}
              </h3>
              {isUrgent && (
                <Badge variant="destructive" className="text-xs">
                  Urgent
                </Badge>
              )}
              {!isRead && <span className="w-2 h-2 bg-primary rounded-full" />}
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {relativeTime}
            </span>
          </div>

          {/* Message */}
          <p className="text-sm text-muted-foreground mb-2">{message}</p>

          {/* Project Info (if applicable) */}
          {project && (
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                <Briefcase className="h-3 w-3 mr-1" />
                {project.title}
              </Badge>
            </div>
          )}

          {/* Payment Amount (if applicable) */}
          {amount && (
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                <DollarSign className="h-3 w-3 mr-1" />$
                {amount.toLocaleString()}
              </Badge>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
            <div className="flex gap-2">
              {actionUrl && actionLabel && (
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  {actionLabel}
                </Button>
              )}
              {!isRead && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-xs"
                  onClick={() => onMarkAsRead(id)}
                >
                  <Check className="h-3 w-3 mr-1" />
                  Mark as read
                </Button>
              )}
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => onDelete(id)}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
