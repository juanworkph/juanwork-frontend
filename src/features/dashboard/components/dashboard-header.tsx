import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
}

export function DashboardHeader({ userName = "Alex" }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Welcome back, {userName}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm lg:text-base">
          Ready to manage your workspace?
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
        <Button variant="outline" className="gap-2 text-xs lg:text-sm">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>
    </div>
  );
}
