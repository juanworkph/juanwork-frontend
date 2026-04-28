"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const { currentRole } = useAuth();

  // Check if current route is an auth route
  const isAuthRoute = pathname.startsWith("/auth");
  if (isAuthRoute) {
    // For auth routes, only render children without navbar and footer
    return <>{children}</>;
  }

  // For all other routes, render with navbar and footer
  return (
    <>
      {currentRole === "guest" ? (
        // Natural scroll layout for landing page
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      ) : (
        // Fixed-height container for Dashboard/Apps
        <div className="h-screen flex flex-col overflow-hidden">
          <Navbar />
          <div
            className={cn(
              "flex-1 custom-scrollbar",
              pathname?.includes("/settings")
                ? "overflow-hidden"
                : "overflow-y-auto",
            )}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
