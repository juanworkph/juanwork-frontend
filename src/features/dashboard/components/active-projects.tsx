import React from "react";
import { Clock, ExternalLink } from "lucide-react";
import { Project } from "../schema/dashboard-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ActiveProjectsProps {
  projects: Project[];
}

export function ActiveProjects({ projects }: ActiveProjectsProps) {
  // Take only top 3 as per reference
  const displayedProjects = projects.slice(0, 3);

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Active Projects</h2>
          <p className="text-sm text-muted-foreground">Currently working on {projects.length} projects</p>
        </div>
        <Link 
          href="/freelancer/projects" 
          className="text-sm font-medium text-primary hover:underline"
        >
          View All Projects
        </Link>
      </div>

      <div className="space-y-4">
        {displayedProjects.map((project) => (
          <div
            key={project.id}
            className="p-5 sm:p-6 rounded-xl bg-card-accent border border-border transition-all hover:border-primary/20 hover:shadow-md"
          >
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-sm ring-2 ring-background">
                  {project.client.charAt(0)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-4">
                  {/* Title & Info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-bold truncate text-foreground flex items-center gap-2 group cursor-pointer">
                        {project.title}
                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{project.client}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span className="flex items-center gap-1 text-amber-500">
                          ★ {project.clientRating}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="bg-secondary/50 text-xs font-normal">
                        {project.type}
                      </Badge>
                      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-500">
                        ${project.budget.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.skills.map(skill => (
                         <span key={skill} className="px-2.5 py-1 text-xs font-medium rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                           {skill}
                         </span>
                      ))}
                    </div>
                  </div>

                  {/* Status & Progress */}
                  <div className="flex flex-col sm:flex-row xl:flex-col items-start sm:items-center xl:items-end gap-3 xl:gap-2 xl:min-w-[200px]">
                    <div className="flex items-center gap-2">
                      {project.urgency === 'high' && (
                        <Badge variant="destructive" className="h-6">Urgent</Badge>
                      )}
                      <Badge variant="outline" className="h-6 whitespace-nowrap bg-background">
                        {project.status}
                      </Badge>
                    </div>

                    <div className="w-full mt-2 sm:mt-0 xl:mt-2">
                      <div className="flex justify-between items-end mb-1.5">
                        <span className="text-xs font-medium text-muted-foreground">Progress</span>
                        <span className="text-xs font-bold">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${project.progress}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Due Date Footer */}
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                  <Clock className={cn("w-4 h-4", project.urgency === 'high' ? 'text-destructive' : 'text-muted-foreground')} />
                  <span className={cn("text-sm", project.urgency === 'high' ? 'text-destructive font-medium' : 'text-muted-foreground')}>
                    Due {new Date(project.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
