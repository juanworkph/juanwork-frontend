"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User, UserRole } from "@/types/user";
import { getCurrentUser, logoutUser } from "@/features/auth/actions/auth";
import { AuthUserData } from "@/features/auth/schema/auth";
import { getAccessToken, clearTokens } from "@/lib/api-client";
import { logError } from "@/utils/logger";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  currentRole: UserRole;
  login: (user: User) => void;
  logout: () => Promise<void>;
  setUserRole: (role: UserRole) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to detect role from pathname
const getRoleFromPath = (pathname: string): UserRole => {
  if (pathname.startsWith("/freelancer")) return "freelancer";
  if (pathname.startsWith("/client")) return "client";
  if (pathname.startsWith("/admin")) return "admin";
  return "guest";
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [overrideRole, setOverrideRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Get role from current route
  const routeRole = getRoleFromPath(pathname);

  // Determine current role: authenticated user role > route-based role > override role
  const currentRole = user?.role || routeRole;

  // Convert AuthUserData to User type
  const convertAuthUserToUser = (authUser: AuthUserData): User => {
    const firstName = authUser.firstName || (authUser as any).first_name || "";
    const lastName = authUser.lastName || (authUser as any).last_name || "";
    const name = `${firstName} ${lastName}`.trim() || "User";

    return {
      id: authUser.id,
      email: authUser.email,
      name,
      role: authUser.role || "client",
      avatar: null, // API doesn't return avatar yet
      balance: 0, // Will be fetched separately if needed
      createdAt: authUser.createdAt,
      updatedAt: authUser.updatedAt,
    };
  };

  // Check authentication on initial load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getAccessToken();

        if (token) {
          // Try to fetch current user from API
          const authUser = await getCurrentUser();
          const userData = convertAuthUserToUser(authUser);
          setUser(userData);
        }
      } catch (error) {
        logError("Auth initialization failed", error);
        // Clear invalid tokens
        clearTokens();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setOverrideRole(null);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      logError("Logout error", error);
    } finally {
      setUser(null);
      setOverrideRole(null);
      clearTokens();

      // Redirect to login page
      router.push("/auth");
    }
  };

  const setUserRole = (role: UserRole) => {
    if (user) {
      // If user is authenticated, update their role
      const updatedUser = { ...user, role };
      setUser(updatedUser);
    } else {
      // If no authenticated user, use override role (for manual testing)
      setOverrideRole(role);
    }
  };

  const refreshUser = async () => {
    try {
      const authUser = await getCurrentUser();
      const userData = convertAuthUserToUser(authUser);
      setUser(userData);
    } catch (error) {
      logError("Failed to refresh user", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        currentRole,
        login,
        logout,
        setUserRole,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
