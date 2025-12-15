import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StickyNote, Plus, Edit, Trash2 } from "lucide-react";
import { ProjectNote, formatDateTime } from "../schema/overview-data";

interface ProjectNotesCardProps {
  notes: ProjectNote[];
  onAddNote?: (content: string) => void;
}

export function ProjectNotesCard({ notes, onAddNote }: ProjectNotesCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim() && onAddNote) {
      onAddNote(newNote);
      setNewNote("");
      setIsAdding(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <CardTitle className="text-[#F45A0B] flex items-center gap-2">
          <StickyNote className="h-5 w-5" />
          Project Notes
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setIsAdding(!isAdding)}
        >
          <Plus className="h-4 w-4" />
          Add Note
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Note Form */}
        {isAdding && (
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 space-y-3">
            <Textarea
              placeholder="Write your note here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px] bg-white dark:bg-gray-900"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsAdding(false);
                  setNewNote("");
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-[#F45A0B] hover:bg-[#F45A0B]/90"
                onClick={handleAddNote}
                disabled={!newNote.trim()}
              >
                Save Note
              </Button>
            </div>
          </div>
        )}

        {/* Notes List */}
        {notes.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <StickyNote className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No notes yet. Add your first note to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => {
              const initials = note.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();

              return (
                <div
                  key={note.id}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-[#F45A0B]/30 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-[#F45A0B] text-white text-xs font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">
                          {note.author.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDateTime(note.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-gray-600 hover:text-[#F45A0B] dark:text-gray-400"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-gray-600 hover:text-red-600 dark:text-gray-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
