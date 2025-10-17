"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Edit, MoreHorizontal } from "lucide-react";
import {
  ConversationList,
  ChatHeader,
  MessageList,
  MessageInput,
  ChatInfoSidebar,
} from "@/features/messages/components";
import {
  mockMessagesData,
  MessagesState,
  Message,
} from "@/features/messages/schema";

export default function MessagesPage() {
  const [messagesData, setMessagesData] =
    useState<MessagesState>(mockMessagesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInfo, setShowInfo] = useState(true);

  const activeConversation = messagesData.conversations.find(
    (c) => c.id === messagesData.activeConversation
  );

  const activeMessages = messagesData.activeConversation
    ? messagesData.messages[messagesData.activeConversation] || []
    : [];

  const handleSelectConversation = (conversationId: string) => {
    setMessagesData({
      ...messagesData,
      activeConversation: conversationId,
    });
    setShowInfo(true);
  };

  const handleSendMessage = (content: string) => {
    if (!messagesData.activeConversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: messagesData.activeConversation,
      senderId: messagesData.currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    const updatedMessages = {
      ...messagesData.messages,
      [messagesData.activeConversation]: [
        ...(messagesData.messages[messagesData.activeConversation] || []),
        newMessage,
      ],
    };

    const updatedConversations = messagesData.conversations.map((conv) => {
      if (conv.id === messagesData.activeConversation) {
        return {
          ...conv,
          lastMessage: newMessage,
        };
      }
      return conv;
    });

    setMessagesData({
      ...messagesData,
      messages: updatedMessages,
      conversations: updatedConversations,
    });
  };

  const filteredConversations = messagesData.conversations.filter((conv) => {
    const participant = conv.participants[0];
    const name = conv.groupName || participant?.name || "";
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex overflow-hidden h-full">
      {/* Left Sidebar - Conversations */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Chats
            </h1>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MoreHorizontal className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Edit className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Messenger"
              className="pl-10 bg-gray-100 dark:bg-gray-700 border-0 focus-visible:ring-1 focus-visible:ring-[#F45A0B]"
            />
          </div>
        </div>

        {/* Conversations List */}
        <ConversationList
          conversations={filteredConversations}
          activeConversationId={messagesData.activeConversation}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      {/* Main Chat Area */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <ChatHeader
            conversation={activeConversation}
            onToggleInfo={() => setShowInfo(!showInfo)}
          />

          {/* Messages */}
          <MessageList
            messages={activeMessages}
            currentUserId={messagesData.currentUser.id}
            participant={activeConversation.participants[0]}
          />

          {/* Message Input */}
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Select a conversation
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose from your existing conversations or start a new one
            </p>
          </div>
        </div>
      )}

      {/* Right Sidebar - Chat Info */}
      <ChatInfoSidebar
        conversation={activeConversation || null}
        isOpen={showInfo}
      />
    </div>
  );
}
