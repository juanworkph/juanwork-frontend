import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

export function Notes() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base lg:text-lg font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4 lg:h-5 lg:w-5" />
            Notes
          </CardTitle>
          <Button variant="ghost" size="sm" className="gap-1 px-2">
            <Plus className="h-3 w-3" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg dark:bg-yellow-950/20">
          <h4 className="font-medium text-sm text-yellow-800 dark:text-yellow-200">
            Client Meeting
          </h4>
          <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
            Discuss project requirements with TechCorp Inc. at 3 PM
          </p>
          <span className="text-xs text-yellow-600 dark:text-yellow-400">
            Today
          </span>
        </div>

        <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-lg dark:bg-blue-950/20">
          <h4 className="font-medium text-sm text-blue-800 dark:text-blue-200">
            Design Inspiration
          </h4>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
            Check out the new design trends for mobile apps
          </p>
          <span className="text-xs text-blue-600 dark:text-blue-400">
            Yesterday
          </span>
        </div>

        <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded-lg dark:bg-green-950/20">
          <h4 className="font-medium text-sm text-green-800 dark:text-green-200">
            Code Review
          </h4>
          <p className="text-xs text-green-700 dark:text-green-300 mt-1">
            Review React components for the dashboard project
          </p>
          <span className="text-xs text-green-600 dark:text-green-400">
            2 days ago
          </span>
        </div>

        <Button variant="outline" className="w-full text-xs h-8 mt-2">
          View All Notes
        </Button>
      </CardContent>
    </Card>
  );
}
