import { UserSidebar } from "@/components/layout/userSidebar";
import { PageNavbar } from "@/components/layout/pageNavbar";

export default function FreelancerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full overflow-hidden bg-gradient-to-br from-background to-muted/20">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] h-full">
        {/* Sidebar - Hidden on mobile, scrollable on desktop */}
        <aside className="hidden lg:flex lg:flex-col bg-background border-r border-border h-full overflow-hidden">
          <UserSidebar />
        </aside>

        {/* Main Content Area - Contains header and content */}
        <div className="flex flex-col h-full overflow-hidden">
          {/* Page Navigation - Fixed */}
          <header className="flex-shrink-0 bg-background/95 backdrop-blur-xl border-b border-border z-10">
            <PageNavbar />
          </header>

          {/* Main Content - Scrollable */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
