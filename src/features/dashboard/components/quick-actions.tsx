import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Plus, 
  MessageSquare, 
  Calendar, 
  Award 
} from 'lucide-react';

export function QuickActions() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base lg:text-lg font-semibold flex items-center gap-2">
          <Zap className="h-4 w-4 lg:h-5 lg:w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start gap-3 h-10 lg:h-12 text-sm" variant="outline">
          <Plus className="h-4 w-4 lg:h-5 lg:w-5" />
          Submit New Proposal
        </Button>
        <Button className="w-full justify-start gap-3 h-10 lg:h-12 text-sm" variant="outline">
          <MessageSquare className="h-4 w-4 lg:h-5 lg:w-5" />
          Message Clients
        </Button>
        <Button className="w-full justify-start gap-3 h-10 lg:h-12 text-sm" variant="outline">
          <Calendar className="h-4 w-4 lg:h-5 lg:w-5" />
          Schedule Meeting
        </Button>
        <Button className="w-full justify-start gap-3 h-10 lg:h-12 text-sm" variant="outline">
          <Award className="h-4 w-4 lg:h-5 lg:w-5" />
          Update Portfolio
        </Button>
      </CardContent>
    </Card>
  );
} 