"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Paperclip, Download, FileText } from "lucide-react";
import type { ProjectAttachment } from "../schema";

interface SingleViewDetailsCardProps {
  description: string;
  attachments?: ProjectAttachment[];
}

export const SingleViewDetailsCard = ({
  description,
  attachments = [],
}: SingleViewDetailsCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const descriptionLength = description.length;
  const shouldShowToggle = descriptionLength > 500;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) {
      return <FileText className="h-5 w-5 text-red-500" aria-hidden="true" />;
    }
    if (type.includes("image")) {
      return <FileText className="h-5 w-5 text-blue-500" aria-hidden="true" />;
    }
    if (type.includes("spreadsheet") || type.includes("excel")) {
      return <FileText className="h-5 w-5 text-green-500" aria-hidden="true" />;
    }
    return <FileText className="h-5 w-5 text-gray-500" aria-hidden="true" />;
  };

  const handleDownload = (attachment: ProjectAttachment) => {
    // In a real implementation, this would trigger a download
    console.log("Downloading:", attachment.name);
    // window.open(attachment.url, '_blank');
  };

  return (
    <Card
      className="border border-gray-200 dark:border-gray-700"
      role="region"
      aria-labelledby="project-details-heading"
    >
      <CardHeader>
        <h2
          id="project-details-heading"
          className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-none"
        >
          Project Description
        </h2>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Description */}
        <article className="space-y-3">
          <div
            id="project-description"
            className={`prose prose-gray dark:prose-invert max-w-none ${
              !isExpanded && shouldShowToggle ? "line-clamp-6" : ""
            }`}
            aria-label="Project description content"
          >
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Expand/Collapse Toggle */}
          {shouldShowToggle && (
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2 text-[#F45A0B] hover:text-[#F45A0B]/90 hover:bg-[#F45A0B]/10 -ml-2"
              aria-expanded={isExpanded}
              aria-controls="project-description"
              aria-label={isExpanded ? "Show less description" : "Show more description"}
            >
              {isExpanded ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="h-4 w-4" aria-hidden="true" />
                </>
              ) : (
                <>
                  <span>Show More</span>
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </Button>
          )}
        </article>

        {/* Attachments */}
        {attachments.length > 0 && (
          <section className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700" aria-labelledby="attachments-heading">
            <div className="flex items-center gap-2">
              <Paperclip className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              <h3 id="attachments-heading" className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Attachments
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400" aria-label={`${attachments.length} attachments`}>
                ({attachments.length})
              </span>
            </div>

            <ul className="space-y-2" role="list" aria-label="Project attachments list">
              {attachments.map((attachment) => (
                <li
                  key={attachment.id}
                  className="flex items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {getFileIcon(attachment.type)}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400" aria-label={`File size: ${formatFileSize(attachment.size)}`}>
                        {formatFileSize(attachment.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(attachment)}
                    className="flex-shrink-0 gap-2 text-[#F45A0B] hover:text-[#F45A0B]/90 hover:bg-[#F45A0B]/10"
                    aria-label={`Download attachment ${attachment.name}, size ${formatFileSize(attachment.size)}`}
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </li>
              ))}
            </ul>

            {/* Attachment Info */}
            <div
              className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30"
              role="note"
              aria-label="Important information about attachments"
            >
              <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
                Review all attachments carefully before submitting your proposal. They contain
                important project requirements and specifications.
              </p>
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
};
