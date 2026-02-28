"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Client-side role check
  const { user } = useAuth();

  // This is a client-side check, but we should also implement server-side auth checks
  // if (!user) {
  //   redirect('/auth/login');
  // }

  return <>{children}</>;
}
