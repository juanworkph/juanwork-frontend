import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function ProfileVisitChart() {
  return (
    <Card className="lg:col-span-2 shadow-sm">
      <CardContent className="p-4 lg:p-6 h-full w-full">
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center space-y-2">
            <p className="text-2xl font-semibold text-muted-foreground">
              Profile Visits
            </p>
            <p className="text-sm text-muted-foreground">
              Profile analytics coming soon
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
