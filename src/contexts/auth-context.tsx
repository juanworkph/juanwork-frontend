"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { User, UserRole } from '@/types/user';
import { authService, AuthUserData } from '@/services/auth.service';
import { getAccessToken, clearTokens } from '@/lib/api-client';
import { logError } from '@/utils/logger';

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
  if (pathname.startsWith('/freelancer')) return 'freelancer';
  if (pathname.startsWith('/client')) return 'client';
  if (pathname.startsWith('/admin')) return 'admin';
  return 'guest';
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    return {
      id: authUser.id,
      email: authUser.email,
      name: `${authUser.firstName} ${authUser.lastName}`,
      role: authUser.role,
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
          const authUser = await authService.getCurrentUser();
          const userData = convertAuthUserToUser(authUser);
          setUser(userData);
        } else {
          // Check for saved user in localStorage (backward compatibility)
          const savedUser = localStorage.getItem('user');
          
          if (savedUser) {
            try {
              const parsedUser = JSON.parse(savedUser);
              setUser(parsedUser);
            } catch (error) {
              logError('Failed to parse saved user', error);
              localStorage.removeItem('user');
            }
          }
        }
      } catch (error) {
        logError('Auth initialization failed', error);
        // Clear invalid tokens
        clearTokens();
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Clear override role when route changes (prioritize route-based detection)
  useEffect(() => {
    if (!user) {
      // Clear any saved override role when route changes and no authenticated user
      setOverrideRole(null);
      localStorage.removeItem('overrideRole');
    }
  }, [pathname, user]);

  const login = (userData: User) => {
    setUser(userData);
    setOverrideRole(null);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.removeItem('overrideRole');
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      logError('Logout error', error);
    } finally {
      setUser(null);
      setOverrideRole(null);
      localStorage.removeItem('user');
      localStorage.removeItem('overrideRole');
      
      // Redirect to login page
      router.push('/auth');
    }
  };

  const setUserRole = (role: UserRole) => {
    if (user) {
      // If user is authenticated, update their role
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } else {
      // If no authenticated user, use override role (for manual testing)
      setOverrideRole(role);
      localStorage.setItem('overrideRole', role);
    }
  };

  const refreshUser = async () => {
    try {
      const authUser = await authService.getCurrentUser();
      const userData = convertAuthUserToUser(authUser);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      logError('Failed to refresh user', error);
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};