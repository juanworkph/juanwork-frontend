import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ListFilter, Edit, Star, StarHalf, StarOff } from "lucide-react";
import { ProjectPreference } from "../schema";

interface ProjectPreferencesSectionProps {
  preferences: ProjectPreference[];
  isOwnProfile?: boolean;
}

export function ProjectPreferencesSection({
  preferences,
  isOwnProfile = false,
}: ProjectPreferencesSectionProps) {
  // Sort preferences by importance (highest first)
  const sortedPreferences = [...preferences].sort(
    (a, b) => b.importance - a.importance
  );

  const renderImportanceStars = (importance: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= importance) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else {
        stars.push(
          <StarOff
            key={i}
            className="h-4 w-4 text-gray-300 dark:text-gray-600"
          />
        );
      }
    }
    return stars;
  };

  return (
    <Card className="shadow-sm bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <ListFilter className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-xl font-semibold">
              Project Preferences
            </CardTitle>
          </div>
          {isOwnProfile && (
            <Button variant="ghost" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Categories this client is most interested in for their projects
        </p>

        <div className="space-y-4">
          {sortedPreferences.map((preference) => (
            <div
              key={preference.category}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="mb-2 sm:mb-0">
                <Badge
                  variant="outline"
                  className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 mb-2"
                >
                  {preference.category}
                </Badge>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                    Priority:
                  </p>
                  <div className="flex">
                    {renderImportanceStars(preference.importance)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isOwnProfile && preferences.length < 5 && (
          <Button
            variant="outline"
            className="w-full mt-4 border-dashed text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            + Add More Preferences
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
