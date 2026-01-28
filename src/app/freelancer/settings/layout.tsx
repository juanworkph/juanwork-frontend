import React from "react";
import { SettingsHeader, SettingsNav } from "@/features/settings/components";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col overflow-hidden bg-background transition-colors duration-200">
      <div className="max-w-7xl w-full mx-auto flex flex-col h-full py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0">
          <SettingsHeader />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-8 flex-1 overflow-hidden min-h-0">
          {/* Sidebar Navigation - Fixed */}
          <aside className="lg:w-64 flex-shrink-0 overflow-y-auto custom-scrollbar lg:h-full max-h-[30vh] lg:max-h-none">
            <SettingsNav />
          </aside>

          {/* Main Content Area - Scrollable */}
          <main className="flex-1 min-w-0 h-full overflow-y-auto custom-scrollbar pr-2 min-h-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
