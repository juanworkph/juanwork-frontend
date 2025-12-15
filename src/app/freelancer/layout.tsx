"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";

export default function FreelancerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Client-side role check
  const { user, setUserRole } = useAuth();

  // Set the role to freelancer when accessing freelancer routes
  useEffect(() => {
    if (user && user.role !== "freelancer") {
      setUserRole("freelancer");
    }
  }, [user, setUserRole]);

  return <>{children}</>;
}
