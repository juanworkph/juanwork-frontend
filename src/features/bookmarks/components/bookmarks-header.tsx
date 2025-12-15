import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bookmark, 
  Search, 
  Grid, 
  List,
  SlidersHorizontal,
  Clock,
  SortAsc,
  SortDesc,
  Filter
} from 'lucide-react';

interface BookmarksHeaderProps {
  totalCount: number;
  lastUpdated: string;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  sortBy: 'date_added' | 'name' | 'type';
  sortDirection: 'asc' | 'desc';
  onSortChange: (sort: { by: 'date_added' | 'name' | 'type', direction: 'asc' | 'desc' }) => void;
}

export function BookmarksHeader({
  totalCount,
  lastUpdated,
  viewMode,
  onViewModeChange,
  onSearch,
  searchQuery,
  sortBy,
  sortDirection,
  onSortChange
}: BookmarksHeaderProps) {
  const formattedLastUpdated = new Date(lastUpdated).toLocaleString();

  return (
    <div className="space-y-4">
      {/* Header with Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Bookmark className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Bookmarks
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {totalCount} saved items across all categories
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            className="gap-2"
            onClick={() => onViewModeChange('grid')}
          >
            <Grid className="h-4 w-4" />
            <span className="hidden sm:inline">Grid</span>
          </Button>
          
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            className="gap-2"
            onClick={() => onViewModeChange('list')}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">List</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => onSortChange({ 
              by: sortBy, 
              direction: sortDirection === 'asc' ? 'desc' : 'asc' 
            })}
          >
            {sortDirection === 'asc' ? (
              <SortAsc className="h-4 w-4" />
            ) : (
              <SortDesc className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">Sort</span>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Sort By</span>
            <Badge variant="secondary" className="ml-1 font-normal">
              {sortBy === 'date_added' ? 'Date' : sortBy === 'name' ? 'Name' : 'Type'}
            </Badge>
          </Button>
        </div>
      </div>

      {/* Last Updated */}
      <div className="flex items-center justify-end gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Clock className="h-3 w-3" />
        <span>Last updated: {formattedLastUpdated}</span>
      </div>
    </div>
  );
} 