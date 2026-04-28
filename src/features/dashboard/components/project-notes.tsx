import React from "react";
import { StickyNote, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Using static notes matching reference. Real data could come via props.
const NOTES = [
  {
    id: 1,
    project: "E-commerce Redesign",
    text: "Follow up on the mobile menu animations. Client requested softer easing.",
    date: "Today",
    theme: "orange",
  },
  {
    id: 2,
    project: "Mobile App UI",
    text: "Waiting for assets from the design team. Deadline is next week.",
    date: "Yesterday",
    theme: "blue",
  },
  {
    id: 3,
    project: "Brand Guidelines",
    text: "Schedule kickoff meeting with marketing team.",
    date: "2 days ago",
    theme: "neutral",
  },
];

export function ProjectNotes() {
  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case "orange":
        return "bg-orange-500/5 border-orange-500/20";
      case "blue":
        return "bg-blue-500/5 border-blue-500/20";
      case "neutral":
      default:
        return "bg-secondary/50 border-border";
    }
  };

  const getThemeBadgeClasses = (theme: string) => {
    switch (theme) {
      case "orange":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
      case "blue":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "neutral":
      default:
        return "bg-background text-muted-foreground border border-border";
    }
  };

  return (
    <div className="p-6 rounded-xl bg-card-accent border border-border flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <StickyNote className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold">Notes</h3>
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Plus className="w-4 h-4" />
          Add Notes
        </Button>
      </div>

      <div className="space-y-4">
        {NOTES.map((note) => (
          <div
            key={note.id}
            className={cn("p-4 rounded-xl border border-dashed", getThemeClasses(note.theme))}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={cn("text-xs font-medium px-2 py-1 rounded w-fit", getThemeBadgeClasses(note.theme))}>
                {note.project}
              </span>
              <span className="text-[11px] text-muted-foreground">{note.date}</span>
            </div>
            <p className="text-sm font-medium leading-snug">{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
