import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Conversation, formatMessageTime } from "../schema";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
}

export function ConversationList({
  conversations,
  activeConversationId,
  onSelectConversation,
}: ConversationListProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conversation) => {
        const participant = conversation.participants[0];
        const isActive = conversation.id === activeConversationId;
        const isCurrentUserMessage =
          conversation.lastMessage.senderId === "current-user";

        return (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              isActive ? "bg-gray-100 dark:bg-gray-800" : ""
            }`}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <Image
                src={
                  conversation.groupAvatar ||
                  participant?.avatar ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                }
                alt={conversation.groupName || participant?.name || "User"}
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
              {participant?.status === "online" && (
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                  {conversation.groupName || participant?.name}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                  {mounted
                    ? formatMessageTime(conversation.lastMessage.timestamp)
                    : "..."}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className={`text-sm truncate ${
                    conversation.unreadCount > 0
                      ? "font-semibold text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {isCurrentUserMessage && "You: "}
                  {conversation.lastMessage.content}
                </p>
                {conversation.unreadCount > 0 && (
                  <Badge className="ml-2 bg-[#F45A0B] hover:bg-[#F45A0B]/90 text-white flex-shrink-0">
                    {conversation.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
