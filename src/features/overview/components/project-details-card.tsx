import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  DollarSign,
  User,
  Building2,
  Mail,
  Edit,
  Tag,
} from "lucide-react";
import {
  ProjectOverview,
  formatDate,
  formatCurrency,
} from "../schema/overview-data";

interface ProjectDetailsCardProps {
  project: ProjectOverview;
}

export function ProjectDetailsCard({ project }: ProjectDetailsCardProps) {
  const budgetPercentage = (project.budget.spent / project.budget.amount) * 100;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <CardTitle className="text-[#F45A0B] flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Project Details
        </CardTitle>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Project Name */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {project.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Status & Category */}
        <div className="flex flex-wrap gap-2">
          <Badge
            className={`${
              project.status === "active"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : project.status === "completed"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            {project.status.replace("-", " ").toUpperCase()}
          </Badge>
          <Badge
            variant="outline"
            className="border-[#F45A0B]/20 text-[#F45A0B] flex items-center gap-1"
          >
            <Tag className="h-3 w-3" />
            {project.category}
          </Badge>
        </div>

        {/* Client Info */}
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
            Client Information
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-900 dark:text-white">
              <User className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{project.client.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Building2 className="h-4 w-4 text-gray-400" />
              <span>{project.client.company}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Mail className="h-4 w-4 text-gray-400" />
              <a
                href={`mailto:${project.client.email}`}
                className="text-[#F45A0B] hover:underline"
              >
                {project.client.email}
              </a>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                Start Date
              </p>
            </div>
            <p className="text-sm font-bold text-blue-900 dark:text-blue-100">
              {formatDate(project.startDate)}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <p className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                Deadline
              </p>
            </div>
            <p className="text-sm font-bold text-orange-900 dark:text-orange-100">
              {formatDate(project.deadline)}
            </p>
          </div>
        </div>

        {/* Budget */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
              <p className="font-semibold text-green-900 dark:text-green-100">
                Budget
              </p>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              {budgetPercentage.toFixed(0)}% spent
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-700 dark:text-green-300">Spent</span>
              <span className="font-bold text-green-900 dark:text-green-100">
                {formatCurrency(project.budget.spent, project.budget.currency)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-700 dark:text-green-300">Total</span>
              <span className="font-bold text-green-900 dark:text-green-100">
                {formatCurrency(project.budget.amount, project.budget.currency)}
              </span>
            </div>
            <div className="w-full bg-green-200 dark:bg-green-900/30 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 dark:bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${budgetPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
