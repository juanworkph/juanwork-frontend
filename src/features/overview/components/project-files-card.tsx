import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Upload, ExternalLink } from "lucide-react";
import {
  ProjectFile,
  formatFileSize,
  formatDateTime,
} from "../schema/overview-data";

interface ProjectFilesCardProps {
  files: ProjectFile[];
  onUpload?: () => void;
}

export function ProjectFilesCard({ files, onUpload }: ProjectFilesCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <CardTitle className="text-[#F45A0B] flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Project Files
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={onUpload}
        >
          <Upload className="h-4 w-4" />
          Upload
        </Button>
      </CardHeader>
      <CardContent>
        {files.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No files uploaded yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file) => {
              return (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-[#F45A0B]/30 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(file.size)}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDateTime(file.uploadedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-600 hover:text-[#F45A0B] dark:text-gray-400"
                      title="Preview"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-600 hover:text-[#F45A0B] dark:text-gray-400"
                      title="Download"
                      onClick={() => window.open(file.url, "_blank")}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-600 hover:text-[#F45A0B] dark:text-gray-400"
                      title="Open"
                      onClick={() => window.open(file.url, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
