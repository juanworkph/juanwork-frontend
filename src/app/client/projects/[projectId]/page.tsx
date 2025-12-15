"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProjectDetailView } from "@/features/projects/components";
import { mockMyProjects } from "@/features/projects/schema";
import { toast } from "sonner";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = React.use(params);

  // Find the project by ID
  const project = mockMyProjects.find((p) => p.id === resolvedParams.projectId);

  // Handle not found
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Project Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => router.push("/client/projects/my-projects")}
            className="bg-[#F45A0B] hover:bg-[#F45A0B]/90"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Projects
          </Button>
        </div>
      </div>
    );
  }

  // Handlers
  const handleEdit = () => {
    toast.info(`Edit functionality for project ${resolvedParams.projectId}`);
    // In a real app, navigate to edit page
    // router.push(`/client/projects/edit/${resolvedParams.projectId}`);
  };

  const handleDelete = () => {
    toast.error("Delete functionality not implemented yet");
    // In a real app, show confirmation dialog and delete
    // After successful deletion:
    // router.push("/client/projects/my-projects");
  };

  const handleDuplicate = () => {
    toast.success(`Project duplicated successfully`);
    // In a real app, duplicate the project and redirect
    // router.push("/client/projects/my-projects");
  };

  const handleShare = () => {
    toast.success("Share link copied to clipboard!");
    // In a real app, copy share link to clipboard
    // const shareUrl = `${window.location.origin}/projects/${resolvedParams.projectId}`;
    // navigator.clipboard.writeText(shareUrl);
  };

  const handleCloseProject = () => {
    toast.info("Close project functionality not implemented yet");
    // In a real app, show confirmation dialog and close the project
    // Update project status to "closed"
  };

  const handleBack = () => {
    router.push("/client/projects/my-projects");
  };

  return (
    <div className="position-relative h-full">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6 -ml-2 hover:bg-transparent hover:text-[#F45A0B]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to My Projects
        </Button>

        {/* Project Detail */}
        <ProjectDetailView
          project={project}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onShare={handleShare}
          onCloseProject={handleCloseProject}
        />
      </div>
    </div>
  );
}
