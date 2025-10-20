import React from "react";
import { WorkstationNav } from "@/features/workstation/components";
import { WorkstationHeader } from "@/features/workstation/components";

export default function WorkstationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full position-relative">
      <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-6">
        {/* Header */}
        <WorkstationHeader />

        {/* Navigation */}
        <WorkstationNav />

        {/* Main Content */}
        <main className="h-full">{children}</main>
      </div>
    </div>
  );
}
