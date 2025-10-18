import React from "react";
import { PageNavbar } from "@/components/layout/pageNavbar";

export default function WorkstationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full bg-gradient-to-br from-background to-muted/20">
      {/* Main Content */}
      <main className="h-full">{children}</main>
    </div>
  );
}
