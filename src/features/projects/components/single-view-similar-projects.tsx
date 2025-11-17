"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText } from "lucide-react";
import { Project, formatCurrency, getTimeLeft } from "../schema/projects-data";
import { mockProjectsData } from "../schema/projects-data";

interface SingleViewSimilarProjectsProps {
  currentProjectId: string;
  category: string;
  skills: string[];
  maxProjects?: number;
}

interface ProjectWithScore extends Project {
  matchScore: number;
  matchingSkills: number;
}

export const SingleViewSimilarProjects = ({
  currentProjectId,
  category,
  skills,
  maxProjects = 5,
}: SingleViewSimilarProjectsProps) => {
  const router = useRouter();

  // Filter and sort similar projects based on matching criteria
  const similarProjects = useMemo(() => {
    // Get all available projects
    const allProjects = mockProjectsData.projects;

    // Filter and score projects
    const scoredProjects: ProjectWithScore[] = allProjects
      .filter((project) => {
        // Exclude current project
        if (project.id === currentProjectId) return false;
        
        // Only show active projects
        if (project.status !== "active") return false;

        // Must match category OR have matching skills
        const matchesCategory = project.category === category;
        const matchingSkillsCount = project.skills.filter((skill) =>
          skills.includes(skill)
        ).length;

        return matchesCategory || matchingSkillsCount > 0;
      })
      .map((project) => {
        // Calculate matching skills
        const matchingSkillsCount = project.skills.filter((skill) =>
          skills.includes(skill)
        ).length;

        // Calculate match score for sorting
        // Priority 1: 3+ matching skills (score: 300+)
        // Priority 2: Same category with 1+ matching skills (score: 200+)
        // Priority 3: Same category only (score: 100)
        let matchScore = 0;

        if (matchingSkillsCount >= 3) {
          matchScore = 300 + matchingSkillsCount;
        } else if (project.category === category && matchingSkillsCount > 0) {
          matchScore = 200 + matchingSkillsCount;
        } else if (project.category === category) {
          matchScore = 100;
        } else {
          matchScore = matchingSkillsCount;
        }

        return {
          ...project,
          matchScore,
          matchingSkills: matchingSkillsCount,
        };
      })
      .sort((a, b) => {
        // Sort by match score (descending)
        if (b.matchScore !== a.matchScore) {
          return b.matchScore - a.matchScore;
        }
        // If same score, sort by creation date (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, maxProjects);

    return scoredProjects;
  }, [currentProjectId, category, skills, maxProjects]);

  const handleProjectClick = (projectId: string) => {
    router.push(`/freelancer/projects/${projectId}`);
  };

  // Empty state when no similar projects found
  if (similarProjects.length === 0) {
    return (
      <Card className="border shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Similar Projects</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
            <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-2 sm:mb-3" />
            <p className="text-xs sm:text-sm text-muted-foreground">
              No similar projects available at the moment
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border shadow-sm gap-0 p-0">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg">Similar Projects</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        {/* Mobile: Horizontal scroll, Desktop: Vertical stack */}
        <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory sm:snap-none">
          {similarProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              className="flex-shrink-0 w-[280px] sm:w-full p-3 border rounded-lg hover:bg-accent hover:border-accent-foreground/20 transition-colors cursor-pointer snap-start"
            >
              {/* Project Title */}
              <h4 className="font-medium text-xs sm:text-sm mb-2 line-clamp-2 text-foreground">
                {project.name}
              </h4>

              {/* Budget */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-semibold text-foreground">
                  {project.budget.type === "fixed"
                    ? formatCurrency(project.budget.amount, project.budget.currency)
                    : `${formatCurrency(
                        project.budget.hourlyRate || 0,
                        project.budget.currency
                      )}/hr`}
                </span>
                {project.budget.type === "hourly" && project.budget.estimatedHours && (
                  <span className="text-xs text-muted-foreground">
                    Est. {project.budget.estimatedHours}h
                  </span>
                )}
              </div>

              {/* Skills - Show top 3 */}
              <div className="flex flex-wrap gap-1 mb-2">
                {project.skills.slice(0, 3).map((skill, index) => {
                  const isMatching = skills.includes(skill);
                  return (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={`text-xs ${
                        isMatching
                          ? "bg-primary/10 text-primary border-primary/20"
                          : ""
                      }`}
                    >
                      {skill}
                    </Badge>
                  );
                })}
                {project.skills.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.skills.length - 3}
                  </Badge>
                )}
              </div>

              {/* Proposals and Time Remaining */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  <span>
                    {project.proposalStats?.totalProposals || 0} proposal
                    {(project.proposalStats?.totalProposals || 0) !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{getTimeLeft(project.deadline.endDate)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
