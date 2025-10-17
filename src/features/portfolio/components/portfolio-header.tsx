import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Users, 
  Star, 
  Trophy, 
  Plus,
  Download
} from 'lucide-react';
import { PortfolioStats } from '../schema/portfolio-data';

interface PortfolioHeaderProps {
  stats: PortfolioStats;
  isOwnProfile?: boolean;
}

export function PortfolioHeader({ stats, isOwnProfile = false }: PortfolioHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Portfolio
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Showcasing {stats.completedProjects} completed projects across {stats.yearsExperience} years of experience
          </p>
        </div>
        
        {isOwnProfile && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Portfolio
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-blue-900 dark:text-blue-100">
                  {stats.totalProjects}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Total Projects
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-green-900 dark:text-green-100">
                  {stats.happyClients}
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Happy Clients
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-yellow-900 dark:text-yellow-100">
                  {stats.averageRating}
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Avg Rating
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Trophy className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-purple-900 dark:text-purple-100">
                  {stats.onTimeDelivery}%
                </p>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  On-Time Delivery
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Highlight */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Top Rated Freelancer
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Maintaining {stats.averageRating}/5.0 rating with {stats.onTimeDelivery}% on-time delivery across {stats.completedProjects} completed projects
              </p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                Top Rated
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                {stats.yearsExperience}+ Years
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 