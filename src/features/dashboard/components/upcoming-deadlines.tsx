import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Deadline } from "../schema/dashboard-data";

interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
}

export function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base lg:text-lg font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 lg:h-5 lg:w-5" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {deadlines.map((deadline, index) => (
          <div
            key={index}
            className={`p-3 bg-muted/30 rounded-lg border-l-4 ${getPriorityColor(
              deadline.priority
            )}`}
          >
            <h4 className="font-medium text-sm">{deadline.project}</h4>
            <p className="text-xs text-muted-foreground mt-1">
              {deadline.deadline}
            </p>
            <Badge variant="outline" className="mt-2 capitalize text-xs">
              {deadline.priority} Priority
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
