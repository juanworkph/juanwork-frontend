"use client";

import React, { useState } from "react";
import {
  OverviewStats,
  ProjectDetailsCard,
  TeamMembersCard,
  ProjectNotesCard,
  ProjectFilesCard,
  ProjectProgressCard,
  MyTasksCard,
} from "@/features/overview/components";
import {
  mockProjectOverview,
  calculateTaskStats,
} from "@/features/overview/schema";
import { toast } from "sonner";

export default function WorkstationOverviewPage() {
  const [project] = useState(mockProjectOverview);

  // Simulated current user ID
  const currentUserId = "m2"; // Mike Chen (Developer)

  // Calculate task statistics
  const taskStats = calculateTaskStats(project.tasks, currentUserId);

  // Handlers
  const handleAddNote = (content: string) => {
    toast.success("Note added successfully");
    console.log("New note:", content);
  };

  const handleUploadFile = () => {
    toast.info("File upload functionality coming soon");
  };

  const handleToggleTask = (taskId: string) => {
    toast.success(`Task ${taskId} status updated`);
  };

  const handleAddTask = () => {
    toast.info("Add task functionality coming soon");
  };

  return (
    <div className="h-full space-y-6">
      {/* Task Stats */}
      <OverviewStats stats={taskStats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2 columns width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Details */}
          <ProjectDetailsCard project={project} />

          {/* My Tasks */}
          <MyTasksCard
            tasks={project.tasks}
            currentUserId={currentUserId}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
          />

          {/* Project Notes */}
          <ProjectNotesCard notes={project.notes} onAddNote={handleAddNote} />
        </div>

        {/* Right Column - 1 column width */}
        <div className="space-y-6">
          {/* Project Progress */}
          <ProjectProgressCard
            overallProgress={project.progress}
            milestones={project.milestones}
          />

          {/* Team Members */}
          <TeamMembersCard members={project.members} />

          {/* Project Files */}
          <ProjectFilesCard files={project.files} onUpload={handleUploadFile} />
        </div>
      </div>
    </div>
  );
}
