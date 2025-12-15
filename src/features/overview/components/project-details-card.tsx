import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DollarSign,
  Clock,
  MapPin,
  Download,
  Briefcase,
  Calendar,
  CheckCircle2,
  CalendarClock,
  Tag,
} from "lucide-react";
import {
  ProjectOverview,
  formatDate,
  formatCurrency,
  formatFileSize,
  getFileIcon,
} from "../schema/overview-data";

interface ProjectDetailsCardProps {
  project: ProjectOverview;
}

export function ProjectDetailsCard({ project }: ProjectDetailsCardProps) {
  // Calculate delivery days
  const calculateDeliveryDays = () => {
    const start = new Date(project.startDate);
    const end = new Date(project.deadline);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Mock data for stats (you can add these to your schema later)
  const stats = {
    deadline: project.deadline,
    startedDate: project.startDate,
    deliveryDays: calculateDeliveryDays(),
    projectType: "Fixed Price", // or "Hourly Rate"
  };

  // Get client initials
  const clientInitials = project.client.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      {/* Top Stats Row - Single Card */}
      <div className="flex flex-wrap gap-6">
        {/* Started Date */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#F45A0B]/10">
            <CalendarClock className="h-4 w-4 text-[#F45A0B]" />
          </div>
          <div className="text-nowrap">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Started Date
            </p>
            <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
              {formatDate(stats.startedDate)}
            </p>
          </div>
        </div>

        {/* Project Type */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#F45A0B]/10">
            <Briefcase className="h-4 w-4 text-[#F45A0B]" />
          </div>
          <div className="text-nowrap">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Project Type
            </p>
            <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
              {stats.projectType}
            </p>
          </div>
        </div>

        {/* Project Fee */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#F45A0B]/10">
            <DollarSign className="h-4 w-4 text-[#F45A0B]" />
          </div>
          <div className="text-nowrap">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Project fee
            </p>
            <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
              $500
            </p>
          </div>
        </div>

        {/* Delivery Days */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#F45A0B]/10">
            <Calendar className="h-4 w-4 text-[#F45A0B]" />
          </div>
          <div className="text-nowrap">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Delivery Days
            </p>
            <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
              {stats.deliveryDays}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#F45A0B]/10">
            <CheckCircle2 className="h-4 w-4 text-[#F45A0B]" />
          </div>
          <div className="text-nowrap">
            <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5 capitalize">
              {project.status.replace("-", " ")}
            </p>
          </div>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#F45A0B]/10">
            <Clock className="h-4 w-4 text-[#F45A0B]" />
          </div>
          <div className="text-nowrap">
            <p className="text-xs text-gray-500 dark:text-gray-400">Deadline</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
              {formatDate(stats.deadline)}
            </p>
          </div>
        </div>
      </div>

      {/* Main Project Details Card */}
      <Card>
        <CardContent className="space-y-8">
          {/* Client Info Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-base font-semibold">
                  {clientInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {project.client.name}
                </h3>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-[#F45A0B]" />
                  <span className="text-xs">{project.client.company}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <Tag className="h-6 w-6 text-[#F45A0B]" />
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {project.category}
                </p>
              </div>
            </div>
          </div>

          {/* Project Title & Description */}
          <div className="">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {project.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Skills/Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {project.category}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {project.status.replace("-", " ").toUpperCase()}
            </Badge>
            {/* Add more skill badges as needed */}
            <Badge
              variant="secondary"
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Web Development
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              UI/UX Design
            </Badge>
          </div>

          {/* Attachments */}
          <div className="">
            <h3 className="text-md font-bold text-gray-900 dark:text-white mb-4">
              Attachments ({project.attachments.length})
            </h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {project.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="w-full sm:w-80 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-between gap-4 sm:gap-7 hover:border-[#F45A0B]/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="text-2xl flex-shrink-0">
                      {getFileIcon(attachment.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {formatFileSize(attachment.size)} •{" "}
                        {attachment.type.split("/")[1]?.toUpperCase() || "FILE"}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    className="bg-[#F45A0B] hover:bg-[#F45A0B]/90 rounded-full h-10 w-10 flex-shrink-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
