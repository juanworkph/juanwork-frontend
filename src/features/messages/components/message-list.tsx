import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Message, User, formatFullTime } from "../schema";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  participant: User;
}

export function MessageList({
  messages,
  currentUserId,
  participant,
}: MessageListProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === currentUserId;
        const showAvatar =
          !isCurrentUser &&
          (index === messages.length - 1 ||
            messages[index + 1]?.senderId !== message.senderId);

        return (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${
              isCurrentUser ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            {!isCurrentUser && (
              <div className="flex-shrink-0 w-7 h-7">
                {showAvatar && (
                  <Image
                    src={
                      participant?.avatar ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    }
                    alt={participant?.name || "User"}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                )}
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`group relative max-w-[70%] ${
                isCurrentUser ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl ${
                  isCurrentUser
                    ? "bg-[#F45A0B] text-white rounded-br-sm"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm"
                }`}
              >
                <p className="text-sm break-words">{message.content}</p>
              </div>

              {/* Reactions */}
              {message.reactions && message.reactions.length > 0 && (
                <div className="absolute -bottom-2 right-0 flex gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5 shadow-sm">
                  {message.reactions.map((reaction, idx) => (
                    <span key={idx} className="text-xs">
                      {reaction}
                    </span>
                  ))}
                </div>
              )}

              {/* Timestamp on hover */}
              {mounted && (
                <div
                  className={`absolute -top-6 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isCurrentUser ? "right-0" : "left-0"
                  }`}
                >
                  {formatFullTime(message.timestamp)}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
