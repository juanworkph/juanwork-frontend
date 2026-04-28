/**
 * PortfolioHeader Component
 * 
 * Displays the header section for the Portfolio Management page including:
 * - Page title and description
 * - Statistics cards (Total, Completed, Featured, Average Rating, Total Clients)
 * - Action buttons (Add New Portfolio, Refresh)
 * - View mode toggle (Grid/List)
 * 
 * Requirements: 4.1-4.4, 5.1, 11.1-11.6, 19.1-19.4
 */

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  RefreshCw,
  Grid,
  List,
  Briefcase,
  CheckCircle,
  Star,
  Users,
} from "lucide-react";

/**
 * Props interface for PortfolioHeader component
 */
interface PortfolioHeaderProps {
  totalProjects: number;
  completedProjects: number;
  featuredProjects: number;
  averageRating: number;
  totalClients: number;
  onCreateNew: () => void;
  onRefresh: () => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  isLoading: boolean;
}

/**
 * StatCard Sub-component
 * 
 * Displays a single statistic card with icon, title, and value
 */
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  colorClass,
  bgClass 
}) => {
  return (
    <Card className="overflow-hidden" role="article" aria-label={`${title}: ${value}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1" id={`stat-${title.replace(/\s+/g, '-').toLowerCase()}-label`}>
              {title}
            </p>
            <p 
              className={`text-2xl font-bold ${colorClass}`}
              aria-labelledby={`stat-${title.replace(/\s+/g, '-').toLowerCase()}-label`}
            >
              {value}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${bgClass}`} aria-hidden="true">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * PortfolioHeader Component
 * 
 * Main header component for the Portfolio Management page with statistics,
 * action buttons, and view mode toggle.
 * 
 * Optimized with React.memo to prevent unnecessary re-renders
 */
export const PortfolioHeader = React.memo<PortfolioHeaderProps>(({
  totalProjects,
  completedProjects,
  featuredProjects,
  averageRating,
  totalClients,
  onCreateNew,
  onRefresh,
  viewMode,
  onViewModeChange,
  isLoading,
}) => {
  // Format average rating to 1 decimal place
  const formattedRating = averageRating.toFixed(1);

  return (
    <div className="space-y-6" role="region" aria-label="Portfolio header and statistics">
      {/* Header Section - Title, Description, Action Buttons, and View Toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Showcase and manage your professional work portfolio
          </p>
        </div>

        {/* Action Buttons and View Toggle - Requirements 4.1-4.4, 5.1, 19.1-19.4 */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* View Mode Toggle - Requirements 4.1-4.4 */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              className="gap-2"
              onClick={() => onViewModeChange('grid')}
              aria-label="Switch to grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <Grid className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Grid</span>
            </Button>
            
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              className="gap-2"
              onClick={() => onViewModeChange('list')}
              aria-label="Switch to list view"
              aria-pressed={viewMode === 'list'}
            >
              <List className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">List</span>
            </Button>
          </div>

          {/* Refresh Button - Requirements 19.1-19.4 */}
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            aria-label="Refresh portfolio list"
            aria-busy={isLoading}
          >
            <RefreshCw 
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} 
              aria-hidden="true" 
            />
            <span className="ml-2">Refresh</span>
          </Button>

          {/* Add New Portfolio Button - Requirement 5.1 */}
          <Button
            size="sm"
            onClick={onCreateNew}
            aria-label="Create and add a new portfolio project"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="ml-2">Add New Portfolio</span>
          </Button>
        </div>
      </div>

      {/* Statistics Cards Section - Requirements 11.1-11.6 */}
      <div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" 
        role="group" 
        aria-label="Portfolio statistics"
      >
        {/* Total Projects Card - Requirement 11.1 */}
        <StatCard
          title="Total Projects"
          value={totalProjects}
          icon={<Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          colorClass="text-blue-900 dark:text-blue-100"
          bgClass="bg-blue-100 dark:bg-blue-900/30"
        />

        {/* Completed Projects Card - Requirement 11.2 */}
        <StatCard
          title="Completed"
          value={completedProjects}
          icon={<CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />}
          colorClass="text-green-900 dark:text-green-100"
          bgClass="bg-green-100 dark:bg-green-900/30"
        />

        {/* Featured Projects Card - Requirement 11.3 */}
        <StatCard
          title="Featured"
          value={featuredProjects}
          icon={<Star className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
          colorClass="text-purple-900 dark:text-purple-100"
          bgClass="bg-purple-100 dark:bg-purple-900/30"
        />

        {/* Average Rating Card - Requirement 11.4 */}
        <StatCard
          title="Avg Rating"
          value={formattedRating}
          icon={<Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
          colorClass="text-yellow-900 dark:text-yellow-100"
          bgClass="bg-yellow-100 dark:bg-yellow-900/30"
        />

        {/* Total Clients Card - Requirement 11.5 */}
        <StatCard
          title="Total Clients"
          value={totalClients}
          icon={<Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />}
          colorClass="text-orange-900 dark:text-orange-100"
          bgClass="bg-orange-100 dark:bg-orange-900/30"
        />
      </div>
    </div>
  );
});

// Add display name for debugging
PortfolioHeader.displayName = "PortfolioHeader";
