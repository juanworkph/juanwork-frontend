import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash2,
  Copy,
  Calendar,
  Clock,
  Share2,
  Layers,
} from "lucide-react";
import {
  MyProject,
  projectStatusConfig,
  formatDate,
} from "../schema/my-projects-data";

interface ProjectHeaderProps {
  project: MyProject;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onShare?: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  onEdit,
  onDelete,
  onDuplicate,
  onShare,
}) => {
  const statusInfo = projectStatusConfig[project.status];

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <Badge className={statusInfo.color}>
            <span className="mr-1">{statusInfo.icon}</span>
            {statusInfo.label}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <Layers className="h-3 w-3 mr-1" />
            {project.category.name}
          </Badge>
          {project.upgrades.length > 0 && (
            <div className="flex gap-1">
              {project.upgrades.map((upgrade) => (
                <Badge
                  key={upgrade.id}
                  variant="secondary"
                  className="text-xs bg-[#F45A0B]/10 text-[#F45A0B] border-[#F45A0B]/20"
                >
                  {upgrade.name.toUpperCase()}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {project.name}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Created: {formatDate(project.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Updated: {formatDate(project.updatedAt)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onShare}
          aria-label={`Share ${project.name} project`}
        >
          <Share2 className="h-4 w-4 mr-2" aria-hidden="true" />
          Share
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onDuplicate}
          aria-label={`Duplicate ${project.name} project`}
        >
          <Copy className="h-4 w-4 mr-2" aria-hidden="true" />
          Duplicate
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="border-[#F45A0B] text-[#F45A0B] hover:bg-[#F45A0B]/10"
          aria-label={`Edit ${project.name} project`}
        >
          <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
          aria-label={`Delete ${project.name} project`}
        >
          <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
          Delete
        </Button>
      </div>
    </div>
  );
};
