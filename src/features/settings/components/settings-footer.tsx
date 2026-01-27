"use client";

import React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsFooterProps {
  onSave?: () => void;
  onCancel?: () => void;
  isSaving?: boolean;
}

export function SettingsFooter({
  onSave,
  onCancel,
  isSaving,
}: SettingsFooterProps) {
  return (
    <div className="flex items-center justify-end gap-4 pb-12 mt-6">
      <Button
        variant="ghost"
        onClick={onCancel}
        className="px-8 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        Discard Changes
      </Button>
      <Button
        onClick={onSave}
        disabled={isSaving}
        className="px-10 py-3.5 bg-[#f97316] hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-200 dark:shadow-none transition-all flex items-center gap-2 transform active:scale-95"
      >
        <Save className="h-5 w-5" />
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
