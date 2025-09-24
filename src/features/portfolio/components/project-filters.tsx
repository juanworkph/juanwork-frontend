import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Grid, 
  List,
  SlidersHorizontal,
  X
} from 'lucide-react';

interface ProjectFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  showFeaturedOnly: boolean;
  onShowFeaturedChange: (show: boolean) => void;
  totalResults: number;
}

export function ProjectFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  showFeaturedOnly,
  onShowFeaturedChange,
  totalResults
}: ProjectFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const clearFilters = () => {
    onCategoryChange('All');
    onSearchChange('');
    onShowFeaturedChange(false);
  };

  const hasActiveFilters = selectedCategory !== 'All' || searchQuery || showFeaturedOnly;

  return (
    <div className="space-y-4">
      {/* Main Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="gap-2"
          >
            <Grid className="h-4 w-4" />
            <span className="hidden sm:inline">Grid</span>
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="gap-2"
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">List</span>
          </Button>
        </div>

        {/* Mobile Filter Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
              {[selectedCategory !== 'All', searchQuery, showFeaturedOnly].filter(Boolean).length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Category Filters */}
      <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block space-y-4`}>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('All')}
            className="gap-2"
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Additional Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <Button
            variant={showFeaturedOnly ? 'default' : 'outline'}
            size="sm"
            onClick={() => onShowFeaturedChange(!showFeaturedOnly)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Featured Only
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="gap-2 text-gray-600 hover:text-gray-900"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {totalResults} project{totalResults !== 1 ? 's' : ''} found
            {selectedCategory !== 'All' && (
              <span> in <strong>{selectedCategory}</strong></span>
            )}
            {searchQuery && (
              <span> matching "<strong>{searchQuery}</strong>"</span>
            )}
          </p>
          
          {hasActiveFilters && (
            <div className="flex gap-2">
              {selectedCategory !== 'All' && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCategory}
                  <button onClick={() => onCategoryChange('All')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  "{searchQuery}"
                  <button onClick={() => onSearchChange('')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {showFeaturedOnly && (
                <Badge variant="secondary" className="gap-1">
                  Featured
                  <button onClick={() => onShowFeaturedChange(false)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 