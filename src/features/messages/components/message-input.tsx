import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Image as ImageIcon,
  Smile,
  Send,
  ThumbsUp,
  Mic,
} from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex-shrink-0">
      <div className="flex items-center gap-2">
        {/* Action Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-[#F45A0B] hover:bg-[#F45A0B]/10 dark:hover:bg-[#F45A0B]/20"
        >
          <Plus className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-[#F45A0B] hover:bg-[#F45A0B]/10 dark:hover:bg-[#F45A0B]/20"
        >
          <ImageIcon className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-[#F45A0B] hover:bg-[#F45A0B]/10 dark:hover:bg-[#F45A0B]/20"
        >
          <Mic className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-[#F45A0B] hover:bg-[#F45A0B]/10 dark:hover:bg-[#F45A0B]/20"
        >
          <Smile className="h-5 w-5" />
        </Button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Aa"
            className="rounded-full bg-gray-100 dark:bg-gray-700 border-0 focus-visible:ring-1 focus-visible:ring-[#F45A0B] pr-10"
          />
        </div>

        {/* Send Button */}
        {message.trim() ? (
          <Button
            onClick={handleSend}
            size="icon"
            className="rounded-full bg-[#F45A0B] hover:bg-[#F45A0B]/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#F45A0B] hover:bg-[#F45A0B]/10 dark:hover:bg-[#F45A0B]/20"
          >
            <ThumbsUp className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
