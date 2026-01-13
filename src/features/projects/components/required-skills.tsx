import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

interface RequiredSkillsProps {
  skills: Array<{
    id: string;
    name: string;
  }>;
}

export const RequiredSkills: React.FC<RequiredSkillsProps> = ({ skills }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#F45A0B] flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Required Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill.id}
              variant="secondary"
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
