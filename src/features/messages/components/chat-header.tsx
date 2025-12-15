import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, Video, Search, Info, MoreVertical } from "lucide-react";
import { Conversation } from "../schema";

interface ChatHeaderProps {
  conversation: Conversation | null;
  onToggleInfo: () => void;
}

export function ChatHeader({ conversation, onToggleInfo }: ChatHeaderProps) {
  if (!conversation) {
    return null;
  }

  const participant = conversation.participants[0];

  return (
    <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 flex-shrink-0">
      {/* Left - User Info */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Image
            src={
              conversation.groupAvatar ||
              participant?.avatar ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            }
            alt={conversation.groupName || participant?.name || "User"}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          {participant?.status === "online" && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">
            {conversation.groupName || participant?.name}
          </h2>
          {participant?.status === "online" && (
            <p className="text-xs text-green-600 dark:text-green-400">
              Active now
            </p>
          )}
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-[#F45A0B] hover:bg-[#F45A0B]/10 dark:hover:bg-[#F45A0B]/20"
        >
          <Phone className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-[#F45A0B] hover:bg-[#F45A0B]/10 dark:hover:bg-[#F45A0B]/20"
        >
          <Video className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-[#F45A0B] hover:bg-[#F45A0B]/10 dark:hover:bg-[#F45A0B]/20"
        >
          <Search className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleInfo}
          className="rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
