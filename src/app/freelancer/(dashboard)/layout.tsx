import { UserSidebar } from "@/components/layout/userSidebar";
import { PageNavbar } from "@/components/layout/pageNavbar";

export default function FreelancerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] min-h-screen">
        {/* Sidebar - Hidden on mobile, fixed height on desktop */}
        <aside className="hidden lg:flex lg:flex-col bg-background border-r border-border h-screen sticky top-0">
          <UserSidebar />
        </aside>

        {/* Main Content Area - Contains header and content */}
        <div className="flex flex-col min-h-screen">
          {/* Page Navigation */}
          <header className="flex-shrink-0 bg-background/95 backdrop-blur-xl border-b border-border sticky top-0 z-10">
            <PageNavbar />
          </header>

          {/* Main Content */}
          <main className="flex-1">
            <div className="p-4 lg:p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
