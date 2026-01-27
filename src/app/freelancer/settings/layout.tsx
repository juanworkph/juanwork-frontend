import React from "react";
import { SettingsHeader, SettingsNav } from "@/features/settings/components";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <SettingsHeader />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <SettingsNav />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
