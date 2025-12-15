import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListTodo, Calendar, Plus } from "lucide-react";
import {
  ProjectTask,
  taskStatusConfig,
  taskPriorityConfig,
  formatDate,
} from "../schema/overview-data";

interface MyTasksCardProps {
  tasks: ProjectTask[];
  currentUserId: string;
  onToggleTask?: (taskId: string) => void;
  onAddTask?: () => void;
}

export function MyTasksCard({
  tasks,
  currentUserId,
  onToggleTask,
  onAddTask,
}: MyTasksCardProps) {
  const myTasks = tasks.filter((task) => task.assignee.id === currentUserId);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <CardTitle className="text-[#F45A0B] flex items-center gap-2">
          <ListTodo className="h-5 w-5" />
          My Tasks ({myTasks.length})
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={onAddTask}
        >
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </CardHeader>
      <CardContent>
        {myTasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <ListTodo className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No tasks assigned to you yet.</p>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="font-semibold">Task</TableHead>
                  <TableHead className="font-semibold w-32">Status</TableHead>
                  <TableHead className="font-semibold w-32">Priority</TableHead>
                  <TableHead className="font-semibold w-36">Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myTasks.map((task) => {
                  const isOverdue =
                    task.status !== "completed" &&
                    new Date(task.dueDate) < new Date();

                  return (
                    <TableRow
                      key={task.id}
                      className={`${
                        task.status === "completed"
                          ? "opacity-60 bg-green-50/30 dark:bg-green-900/5"
                          : isOverdue
                          ? "bg-orange-50 dark:bg-orange-900/10"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/30"
                      }`}
                    >
                      {/* Checkbox */}
                      <TableCell className="py-3">
                        <Checkbox
                          checked={task.status === "completed"}
                          onCheckedChange={() =>
                            onToggleTask && onToggleTask(task.id)
                          }
                        />
                      </TableCell>

                      {/* Task Title & Description */}
                      <TableCell className="py-3">
                        <div>
                          <p
                            className={`font-semibold text-sm ${
                              task.status === "completed"
                                ? "line-through text-gray-500 dark:text-gray-400"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {task.title}
                          </p>
                          {task.description && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                              {task.description}
                            </p>
                          )}
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-3">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            taskStatusConfig[task.status].color
                          }`}
                        >
                          <span className="mr-1">
                            {taskStatusConfig[task.status].icon}
                          </span>
                          {taskStatusConfig[task.status].label}
                        </Badge>
                      </TableCell>

                      {/* Priority */}
                      <TableCell className="py-3">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            taskPriorityConfig[task.priority].color
                          }`}
                        >
                          <span className="mr-1">
                            {taskPriorityConfig[task.priority].icon}
                          </span>
                          {taskPriorityConfig[task.priority].label}
                        </Badge>
                      </TableCell>

                      {/* Due Date */}
                      <TableCell className="py-3">
                        <div
                          className={`flex items-center gap-1.5 text-sm ${
                            isOverdue
                              ? "text-orange-700 dark:text-orange-400 font-semibold"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{formatDate(task.dueDate)}</span>
                          {isOverdue && (
                            <Badge
                              variant="destructive"
                              className="ml-1 text-xs px-1.5 py-0"
                            >
                              Overdue
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
