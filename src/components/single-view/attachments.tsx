"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Layers } from "lucide-react";

interface Attachment {
  name: string;
  size: string;
  type: string;
  url?: string;
}

interface SingleViewAttachmentsProps {
  attachments?: Attachment[];
}

export const SingleViewAttachments = ({
  attachments,
}: SingleViewAttachmentsProps) => {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  const displayAttachments = attachments;

  const getShortType = (type: string) => {
    if (!type) return "";
    const upperType = type.toUpperCase();

    if (
      upperType.includes("DOCUMENT") ||
      upperType.includes("WORDPROCESSINGML")
    )
      return "DOCUMENT";
    if (upperType.includes("SPREADSHEETML") || upperType.includes("EXCEL"))
      return "SPREADSHEET";
    if (
      upperType.includes("PRESENTATIONML") ||
      upperType.includes("POWERPOINT")
    )
      return "PRESENTATION";
    if (upperType.includes("PDF")) return "PDF";
    if (upperType.includes("IMAGE")) return "IMAGE";
    if (upperType.includes("VIDEO")) return "VIDEO";
    if (upperType.includes("AUDIO")) return "AUDIO";
    if (upperType.includes("ZIP") || upperType.includes("COMPRESSED"))
      return "ARCHIVE";

    // Fallback: extract last part of path/type
    if (type.includes("/") || type.includes(".")) {
      const parts = type.split(/[./]/);
      return parts[parts.length - 1].toUpperCase();
    }
    return upperType;
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
        <span className="w-1 h-3 bg-primary rounded-full"></span>
        Attachments
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayAttachments.map((attachment, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">
                  {attachment.name}
                </p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5 font-bold">
                  {attachment.size} • {getShortType(attachment.type)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 group-hover:text-primary"
              onClick={() => {
                if (attachment.url) {
                  window.open(attachment.url, "_blank");
                }
              }}
            >
              <Download className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
