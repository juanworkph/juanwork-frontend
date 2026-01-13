import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  X
} from 'lucide-react';

interface PortfolioFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showFeaturedOnly: boolean;
  onFeaturedToggle: () => void;
  totalResults: number;
}

export function PortfolioFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  showFeaturedOnly,
  onFeaturedToggle,
  totalResults
}: PortfolioFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const clearFilters = () => {
    onCategoryChange('All');
    onSearchChange('');
    if (showFeaturedOnly) {
      onFeaturedToggle();
    }
  };

  const hasActiveFilters = selectedCategory !== 'All' || searchQuery || showFeaturedOnly;

  return (
    <div className="space-y-4" role="search" aria-label="Portfolio filters">
      {/* Main Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
            aria-label="Search portfolio projects"
            type="search"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden gap-2"
          aria-label={showMobileFilters ? "Hide filters" : "Show filters"}
          aria-expanded={showMobileFilters}
          aria-controls="portfolio-filters-panel"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs" aria-label={`${[selectedCategory !== 'All', searchQuery, showFeaturedOnly].filter(Boolean).length} active filters`}>
              {[selectedCategory !== 'All', searchQuery, showFeaturedOnly].filter(Boolean).length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Category Filters */}
      <div 
        id="portfolio-filters-panel"
        className={`${showMobileFilters ? 'block' : 'hidden'} lg:block space-y-4`}
        role="group"
        aria-label="Filter options"
      >
        <div className="flex flex-wrap gap-2" role="group" aria-label="Category filters">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('All')}
            className="gap-2"
            aria-label="Show all categories"
            aria-pressed={selectedCategory === 'All'}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category)}
              aria-label={`Filter by ${category}`}
              aria-pressed={selectedCategory === category}
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
            onClick={onFeaturedToggle}
            className="gap-2"
            aria-label="Show featured projects only"
            aria-pressed={showFeaturedOnly}
          >
            <Filter className="h-4 w-4" aria-hidden="true" />
            Featured Only
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="gap-2 text-gray-600 hover:text-gray-900"
              aria-label="Clear all filters"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Results Count */}
        <div 
          className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
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
            <div className="flex gap-2" role="group" aria-label="Active filters">
              {selectedCategory !== 'All' && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCategory}
                  <button 
                    onClick={() => onCategoryChange('All')}
                    aria-label={`Remove ${selectedCategory} filter`}
                  >
                    <X className="h-3 w-3" aria-hidden="true" />
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  "{searchQuery}"
                  <button 
                    onClick={() => onSearchChange('')}
                    aria-label="Remove search filter"
                  >
                    <X className="h-3 w-3" aria-hidden="true" />
                  </button>
                </Badge>
              )}
              {showFeaturedOnly && (
                <Badge variant="secondary" className="gap-1">
                  Featured
                  <button 
                    onClick={onFeaturedToggle}
                    aria-label="Remove featured filter"
                  >
                    <X className="h-3 w-3" aria-hidden="true" />
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