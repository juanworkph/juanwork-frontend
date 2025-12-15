import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Clock, ArrowRight } from "lucide-react";
import { Project } from "../schema/dashboard-data";

interface RecentProjectsProps {
  projects: Project[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in progress":
        return "bg-blue-100 text-blue-700";
      case "review":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="text-base lg:text-lg font-semibold">
              Recent Projects
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Your latest project activities
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 self-start sm:self-auto"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[350px] overflow-y-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group p-4 bg-gradient-to-r from-muted/20 to-muted/10 hover:from-muted/30 hover:to-muted/20 rounded-xl border border-muted/40 hover:border-primary/20 transition-all duration-300"
          >
            {/* Project Header */}
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-primary/10 to-accent/10">
                  {project.client.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                      {project.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {project.client}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{project.clientRating}</span>
                  </div>
                </div>

                {/* Project Type & Budget */}
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    {project.type}
                  </Badge>
                  <span className="text-xs font-semibold text-green-600">
                    ${project.budget.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {project.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Progress & Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${getStatusColor(
                      project.status
                    )} text-xs font-medium`}
                  >
                    {project.status}
                  </Badge>
                  {project.urgency === "high" && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium">{project.progress}%</span>
              </div>

              <Progress value={project.progress} className="h-2" />

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Due: {project.dueDate}</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    {new Date(project.dueDate) > new Date()
                      ? `${Math.ceil(
                          (new Date(project.dueDate).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        )} days left`
                      : "Overdue"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
