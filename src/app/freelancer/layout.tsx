"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";

export default function FreelancerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Client-side role check
  const { user } = useAuth();

  return <>{children}</>;
}
