"use client";

import React from "react";
import { Settings as SettingsIcon } from "lucide-react";

export function SettingsHeader() {
  return (
    <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-card rounded-2xl flex items-center justify-center shadow-sm border border-border">
          <SettingsIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>
    </header>
  );
}
