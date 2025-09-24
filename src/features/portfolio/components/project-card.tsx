import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  Github, 
  Play, 
  Calendar,
  DollarSign,
  Users,
  Star,
  Clock,
  Award,
  Eye
} from 'lucide-react';
import { PortfolioProject } from '../schema/portfolio-data';

interface ProjectCardProps {
  project: PortfolioProject;
  viewMode: 'grid' | 'list';
  onViewDetails: (project: PortfolioProject) => void;
}

export function ProjectCard({ project, viewMode, onViewDetails }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'Concept': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800';
      default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="border-0 py-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Project Image */}
            <div className="relative w-full lg:w-80 h-48 lg:h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group">
              <Image
                src={project.images.thumbnail}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {project.featured && (
                <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                  <Award className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Button
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => onViewDetails(project)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>

            {/* Project Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-primary cursor-pointer transition-colors">
                      {project.title}
                    </h3>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {project.shortDescription}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{project.timeline.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>${project.metrics.budget.toLocaleString()}</span>
                    </div>
                    {project.client.testimonial && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{project.client.testimonial.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  {project.links.live && (
                    <Button size="sm" variant="outline" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Live
                    </Button>
                  )}
                  {project.links.github && (
                    <Button size="sm" variant="outline" className="gap-2">
                      <Github className="h-4 w-4" />
                      Code
                    </Button>
                  )}
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 6).map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 6 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.technologies.length - 6} more
                  </Badge>
                )}
              </div>

              {/* Client Info */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>{project.client.name}</span>
                  <span>•</span>
                  <span>{project.client.industry}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(project)}
                  className="text-primary hover:text-primary/80"
                >
                  View Details →
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid view
  return (
    <Card className="border-0 py-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30 group overflow-hidden">
      {/* Project Image */}
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <Image
          src={project.images.thumbnail}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {project.featured && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 z-10">
            <Award className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.links.live && (
              <Button size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Live
              </Button>
            )}
            {project.links.demo && (
              <Button size="sm" variant="secondary" className="gap-2">
                <Play className="h-4 w-4" />
                Demo
              </Button>
            )}
          </div>
        </div>
        <Badge className={`absolute top-3 right-3 ${getStatusColor(project.status)}`}>
          {project.status}
        </Badge>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Project Title & Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors cursor-pointer">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {project.shortDescription}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>

        {/* Project Metrics */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{project.timeline.duration}</span>
          </div>
          {project.client.testimonial && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{project.client.testimonial.rating}/5</span>
            </div>
          )}
        </div>

        {/* Client & Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {project.client.name}
          </div>
          <div className="flex gap-2">
            {project.links.github && (
              <Button size="sm" variant="ghost" className="p-2">
                <Github className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onViewDetails(project)}
              className="p-2"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 