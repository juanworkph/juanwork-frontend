"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/features/home/components/footer";
import { cn } from "@/lib/utils";

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
      {/* Render navbar only if user is not admin */}
      {currentRole !== "admin" && <Navbar />}

      {/* Render main content with appropriate height */}
      <div
        className={cn(
          currentRole !== "admin"
            ? "h-[calc(100vh-65px)] overflow-y-auto"
            : "h-screen"
        )}
      >
        {children}
      </div>

      {/* Render footer only if user is guest */}
      {currentRole === "guest" && <Footer />}
    </>
  );
}
