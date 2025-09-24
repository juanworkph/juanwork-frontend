import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, Plus } from 'lucide-react';

interface DashboardHeaderProps {
  userName?: string;
}

export function DashboardHeader({ userName = "Alex" }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Good morning, {userName}! 👋
        </h1>
        <p className="text-muted-foreground mt-1 text-sm lg:text-base">
          Here's what's happening with your freelance business today.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
        <Button variant="outline" className="gap-2 text-xs lg:text-sm">
          <BarChart3 className="h-4 w-4" />
          Analytics
        </Button>
        <Button className="gap-2 text-xs lg:text-sm">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </div>
  );
} 