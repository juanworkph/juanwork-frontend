import React from "react";
import { Activity } from "../schema/dashboard-data";
import { cn } from "@/lib/utils";

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="p-6 rounded-xl bg-card-accent border border-border">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        Recent Activity
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium">
          {activities.length}
        </span>
      </h3>

      <div className="relative before:absolute before:inset-y-0 before:left-[9px] before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="relative flex items-start justify-between"
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex-shrink-0 z-10 ring-2 ring-card-accent mt-0.5",
                    activity.color,
                  )}
                />
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {activity.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5 max-w-[200px] sm:max-w-none">
                    {activity.description}
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap pl-2">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
