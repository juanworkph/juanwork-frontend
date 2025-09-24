"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { redirect } from "next/navigation";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Client-side role check
  const { user, setUserRole } = useAuth();

  // Set the role to client when accessing client routes
  useEffect(() => {
    if (user && user.role !== 'client') {
      setUserRole('client');
    }
  }, [user, setUserRole]);

  // This is a client-side check, but we should also implement server-side auth checks
  // if (!user) {
  //   redirect('/auth/login');
  // }

  return <>{children}</>;
}