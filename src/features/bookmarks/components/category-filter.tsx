import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Briefcase, 
  Users, 
  FileText, 
  BookOpen, 
  Folder,
  BookMarked
} from 'lucide-react';

interface CategoryFilterProps {
  categories: {
    name: string;
    count: number;
  }[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange
}: CategoryFilterProps) {
  // Get icon for category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'projects':
        return <Briefcase className="h-4 w-4" />;
      case 'clients':
        return <Users className="h-4 w-4" />;
      case 'jobs':
        return <FileText className="h-4 w-4" />;
      case 'articles':
        return <BookOpen className="h-4 w-4" />;
      case 'resources':
        return <Folder className="h-4 w-4" />;
      default:
        return <BookMarked className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-medium text-gray-900 dark:text-white">Categories</h2>
      </div>
      
      <div className="p-2">
        {/* All Categories */}
        <button
          onClick={() => onCategoryChange(null)}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm",
            selectedCategory === null
              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
          )}
        >
          <div className="flex items-center gap-2">
            <BookMarked className="h-4 w-4" />
            <span>All Bookmarks</span>
          </div>
          <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
            {categories.reduce((total, cat) => total + cat.count, 0)}
          </span>
        </button>
        
        {/* Category List */}
        <div className="mt-2 space-y-1">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm",
                selectedCategory === category.name
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
              )}
            >
              <div className="flex items-center gap-2">
                {getCategoryIcon(category.name)}
                <span>{category.name}</span>
              </div>
              <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 