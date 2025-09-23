import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Activity, 
  FileText, 
  MessageSquare, 
  Star, 
  DollarSign 
} from 'lucide-react';
import { Activity as ActivityType } from '../schema/dashboard-data';

interface RecentActivityProps {
  activities: ActivityType[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'proposal': return <FileText className="h-4 w-4 text-primary" />;
      case 'message': return <MessageSquare className="h-4 w-4 text-primary" />;
      case 'review': return <Star className="h-4 w-4 text-primary" />;
      case 'payment': return <DollarSign className="h-4 w-4 text-primary" />;
      default: return <Activity className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base lg:text-lg font-semibold flex items-center gap-2">
          <Activity className="h-4 w-4 lg:h-5 lg:w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
            <div className="p-2 bg-primary/10 rounded-full">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="text-sm">{activity.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 