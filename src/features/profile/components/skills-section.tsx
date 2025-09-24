import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Code, 
  Palette, 
  Briefcase, 
  MessageSquare,
  Edit,
  Plus,
  Star,
  TrendingUp
} from 'lucide-react';
import { Skill } from '../schema/profile-data';

interface SkillsSectionProps {
  skills: Skill[];
  isOwnProfile?: boolean;
}

export function SkillsSection({ skills, isOwnProfile = false }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { name: 'All', icon: Star, color: 'text-gray-600' },
    { name: 'Technical', icon: Code, color: 'text-blue-600' },
    { name: 'Design', icon: Palette, color: 'text-purple-600' },
    { name: 'Business', icon: Briefcase, color: 'text-green-600' },
    { name: 'Communication', icon: MessageSquare, color: 'text-orange-600' }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technical': return Code;
      case 'Design': return Palette;
      case 'Business': return Briefcase;
      case 'Communication': return MessageSquare;
      default: return Star;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'Design': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800';
      case 'Business': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'Communication': return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800';
      default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const getSkillLevelText = (level: number) => {
    switch (level) {
      case 5: return 'Expert';
      case 4: return 'Advanced';
      case 3: return 'Intermediate';
      case 2: return 'Basic';
      case 1: return 'Beginner';
      default: return 'Unknown';
    }
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 4) return 'text-green-600';
    if (level >= 3) return 'text-blue-600';
    if (level >= 2) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const groupedSkills = categories.slice(1).reduce((acc, category) => {
    acc[category.name] = skills.filter(skill => skill.category === category.name);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-xl font-semibold">Skills & Expertise</CardTitle>
          </div>
          {isOwnProfile && (
            <Button variant="ghost" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Skills
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = selectedCategory === category.name;
            return (
              <Button
                key={category.name}
                variant={isActive ? "default" : "outline"}
                size="sm"
                className={`gap-2 ${!isActive ? 'hover:bg-gray-50 dark:hover:bg-gray-800' : ''}`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <IconComponent className="h-4 w-4" />
                {category.name}
                {category.name !== 'All' && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {groupedSkills[category.name]?.length || 0}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((skill, index) => {
            const IconComponent = getCategoryIcon(skill.category);
            return (
              <div
                key={index}
                className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getCategoryColor(skill.category).split(' ').slice(0, 1).join(' ')}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} experience
                      </p>
                    </div>
                  </div>
                  <Badge className={getCategoryColor(skill.category)}>
                    {skill.category}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${getSkillLevelColor(skill.level)}`}>
                      {getSkillLevelText(skill.level)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {skill.level}/5
                    </span>
                  </div>
                  <Progress value={skill.level * 20} className="h-2" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Skill Button (for own profile) */}
        {isOwnProfile && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              Add New Skill
            </Button>
          </div>
        )}

        {/* Skills Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {categories.slice(1).map((category) => {
            const categorySkills = groupedSkills[category.name] || [];
            const avgLevel = categorySkills.length > 0 
              ? categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length 
              : 0;
            const IconComponent = category.icon;

            return (
              <div key={category.name} className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <div className={`p-2 rounded-lg ${getCategoryColor(category.name).split(' ').slice(0, 1).join(' ')}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {category.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {categorySkills.length} skill{categorySkills.length !== 1 ? 's' : ''}
                </p>
                {avgLevel > 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Avg: {avgLevel.toFixed(1)}/5
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
} 