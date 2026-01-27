"use client";

import React from "react";
import { Settings as SettingsIcon } from "lucide-react";

export function SettingsHeader() {
  return (
    <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700">
          <SettingsIcon className="h-6 w-6 text-[#f97316]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your account settings and preferences
          </p>
        </div>
      </div>
    </header>
  );
}
