"use client";

import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";

export default function FreelancerPage() {
  const { currentRole, user, isAuthenticated } = useAuth();
  const pathname = usePathname();
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12">
          <div className="px-4 md:px-6">
            <div className="mb-4 p-3 bg-primary/10 rounded-lg border">
              <p className="text-sm font-medium text-primary">
                Current Role: <span className="font-bold">{currentRole}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Pathname: {pathname} | Authenticated: {isAuthenticated.toString()} | User Role: {user?.role || 'none'}
              </p>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Freelancer Dashboard</h1>
            <p className="mt-4 text-muted-foreground">
              Welcome to your freelancer dashboard. Find jobs and manage your projects here.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
