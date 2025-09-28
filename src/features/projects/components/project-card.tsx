import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  DollarSign, 
  Calendar,
  MapPin,
  CheckCircle,
  Star,
  ExternalLink,
  MessageCircle,
  Pin,
  AlertTriangle,
  Flag
} from 'lucide-react';
import { 
  Project, 
  formatCurrency, 
  getTimeLeft, 
  getStatusColor, 
  getPriorityColor 
} from '../schema';

interface ProjectCardProps {
  project: Project;
  onPin?: (id: string) => void;
  onPause?: (id: string) => void;
  onResume?: (id: string) => void;
  onComplete?: (id: string) => void;
}

export function ProjectCard({ project, onPin, onPause, onResume, onComplete }: ProjectCardProps) {
  const formattedBudget = formatCurrency(project.budget.amount, project.budget.currency);
  const timeLeft = getTimeLeft(project.deadline.endDate);

  return (
    <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 py-0 overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${getStatusColor(project.status)} border`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
              <Badge variant="outline" className={`${getPriorityColor(project.priority)} border`}>
                <Flag className="h-3 w-3 mr-1" />
                {project.priority}
              </Badge>
              {project.isPinned && (
                <Badge variant="outline" className="border-amber-300 text-amber-600">
                  <Pin className="h-3 w-3 mr-1" />Pinned
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {project.description}
            </p>
          </div>
        </div>

        {/* Client Info */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Image 
            src={project.client.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"} 
            alt={project.client.name} 
            width={40} 
            height={40} 
            className="rounded-full border-2 border-white shadow-sm" 
          />
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm font-medium">{project.client.name}</span>
              {project.client.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin className="h-3.5 w-3.5" />
              <span>{project.client.country}</span>
              {project.client.rating && (
                <>
                  <span>•</span>
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span>{project.client.rating}</span>
                </>
              )}
            </div>
          </div>
          {project.hasUnreadMessages && (
            <div className="flex items-center gap-1 text-xs">
              <MessageCircle className="h-4 w-4 text-blue-500" />
              <span className="text-blue-600 font-medium">{project.messageCount} new</span>
            </div>
          )}
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Budget</p>
            <p className="font-bold text-sm flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-green-500" />
              {formattedBudget}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {project.budget.type === 'fixed' ? 'Fixed Price' : `$${project.budget.hourlyRate}/hr`}
            </p>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Time Left</p>
            <p className={`font-bold text-sm flex items-center gap-1.5 ${project.deadline.isOverdue ? 'text-red-600' : ''}`}>
              <Clock className={`h-4 w-4 ${project.deadline.isOverdue ? 'text-red-500' : 'text-blue-500'}`} />
              {timeLeft}
            </p>
            <p className="text-xs text-gray-500 mt-1">{project.deadline.deliveryDays} days delivery</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-600">{project.progress.progressPercentage}%</span>
          </div>
          <Progress value={project.progress.progressPercentage} className="h-2 mb-2" />
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{project.progress.completedTasks}/{project.progress.totalTasks} tasks</span>
            <span>{project.progress.completedMilestones}/{project.progress.totalMilestones} milestones</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 border-t bg-gray-50/80 dark:bg-gray-800/80">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2">
            {project.status === 'active' && onPause && (
              <Button variant="outline" size="sm" className="text-xs h-8 px-3" onClick={() => onPause(project.id)}>
                Pause
              </Button>
            )}
            {project.status === 'paused' && onResume && (
              <Button variant="outline" size="sm" className="text-xs h-8 px-3" onClick={() => onResume(project.id)}>
                Resume
              </Button>
            )}
            {project.status === 'active' && onComplete && (
              <Button size="sm" className="text-xs h-8 px-3 bg-green-600 hover:bg-green-700" onClick={() => onComplete(project.id)}>
                Complete
              </Button>
            )}
          </div>
          <Link href={project.projectUrl}>
            <Button variant="outline" size="sm" className="text-xs h-8 px-3">
              <ExternalLink className="h-3 w-3 mr-1" />View
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
} 