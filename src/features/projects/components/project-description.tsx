import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectDescriptionProps {
  description: string;
}

export const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
  description,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#F45A0B]">
          Project Description
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
