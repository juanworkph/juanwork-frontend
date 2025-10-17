import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Languages, 
  Edit,
  Plus,
  Globe
} from 'lucide-react';
import { Language } from '../schema/profile-data';

interface LanguagesSectionProps {
  languages: Language[];
  isOwnProfile?: boolean;
}

export function LanguagesSection({ languages, isOwnProfile = false }: LanguagesSectionProps) {
  const getLevelValue = (level: string) => {
    switch (level) {
      case 'Native': return 100;
      case 'Fluent': return 85;
      case 'Conversational': return 65;
      case 'Basic': return 35;
      default: return 0;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Native': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'Fluent': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'Conversational': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      case 'Basic': return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800';
      default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  // const getProgressColor = (level: string) => {
  //   switch (level) {
  //     case 'Native': return 'bg-green-500';
  //     case 'Fluent': return 'bg-blue-500';
  //     case 'Conversational': return 'bg-yellow-500';
  //     case 'Basic': return 'bg-orange-500';
  //     default: return 'bg-gray-500';
  //   }
  // };

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Languages className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <CardTitle className="text-xl font-semibold">Languages</CardTitle>
          </div>
          {isOwnProfile && (
            <Button variant="ghost" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Languages
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Languages List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {languages.map((language, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {language.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language.level} proficiency
                    </p>
                  </div>
                </div>
                <Badge className={getLevelColor(language.level)}>
                  {language.level}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {getLevelValue(language.level)}%
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={getLevelValue(language.level)} 
                    className="h-2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Language Button (for own profile) */}
        {isOwnProfile && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              Add Language
            </Button>
          </div>
        )}

        {/* Languages Summary */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Communication Abilities
            </h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Native Languages</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {languages.filter(l => l.level === 'Native').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Fluent Languages</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {languages.filter(l => l.level === 'Fluent').length}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Languages</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {languages.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Communication Level</span>
                <span className="font-medium text-green-600">
                  {languages.some(l => l.level === 'Native' || l.level === 'Fluent') 
                    ? 'Excellent' 
                    : 'Good'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Language Highlights */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Multilingual Professional
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Can effectively communicate with clients from diverse backgrounds and markets. 
                {languages.filter(l => l.level === 'Native' || l.level === 'Fluent').length > 1 && 
                  ' Fluent in multiple languages for international projects.'
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 