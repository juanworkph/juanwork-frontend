import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Search,
  ImageIcon,
  FileText,
  Link as LinkIcon,
  ChevronRight,
  ChevronDown,
  Shield,
  UserMinus,
} from "lucide-react";
import { Conversation } from "../schema";

interface ChatInfoSidebarProps {
  conversation: Conversation | null;
  isOpen: boolean;
}

export function ChatInfoSidebar({
  conversation,
  isOpen,
}: ChatInfoSidebarProps) {
  const [mediaOpen, setMediaOpen] = React.useState(true);

  if (!conversation || !isOpen) {
    return null;
  }

  const participant = conversation.participants[0];

  return (
    <div className="w-80 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-6">
          <Image
            src={
              conversation.groupAvatar ||
              participant?.avatar ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            }
            alt={conversation.groupName || participant?.name || "User"}
            width={80}
            height={80}
            className="rounded-full object-cover mb-3"
          />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {conversation.groupName || participant?.name}
          </h2>
          {participant?.status === "online" && (
            <p className="text-sm text-green-600 dark:text-green-400">
              Active now
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-6">
          <Button
            variant="outline"
            className="flex-1 flex flex-col items-center gap-1 h-auto py-3"
          >
            <Bell className="h-5 w-5" />
            <span className="text-xs">Mute</span>
          </Button>
          <Button
            variant="outline"
            className="flex-1 flex flex-col items-center gap-1 h-auto py-3"
          >
            <Search className="h-5 w-5" />
            <span className="text-xs">Search</span>
          </Button>
        </div>

        {/* Chat Info */}
        <div className="space-y-1">
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Chat info
            </span>
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </button>

          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Customize chat
            </span>
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </button>

          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Chat members
            </span>
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Media, files and links */}
        <div className="mt-4">
          <button
            onClick={() => setMediaOpen(!mediaOpen)}
            className="w-full flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
          >
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Media, files and links
            </span>
            {mediaOpen ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )}
          </button>

          {mediaOpen && (
            <div className="mt-2 space-y-1">
              <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
                <ImageIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-900 dark:text-white">
                  Media
                </span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
                <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-900 dark:text-white">
                  Files
                </span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
                <LinkIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-900 dark:text-white">
                  Links
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Privacy & Support */}
        <div className="mt-4 space-y-1">
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Privacy & support
            </span>
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
