import { AdminSidebar } from "@/components/layout/adminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] h-full">
        {/* Sidebar - Hidden on mobile, scrollable on desktop */}
        <aside className="hidden lg:flex lg:flex-col bg-background border-r border-border h-full overflow-y-auto">
          <AdminSidebar />
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-col h-full overflow-hidden">
          {/* Main Content - Scrollable */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
