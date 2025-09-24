"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { User, UserRole } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  currentRole: UserRole;
  login: (user: User) => void;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
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
  const pathname = usePathname();
  
  // Get role from current route
  const routeRole = getRoleFromPath(pathname);
  
  // Determine current role: authenticated user role > route-based role > override role
  const currentRole = user?.role || routeRole;
  
  // Check for saved user in localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
      }
    }
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

  const logout = () => {
    setUser(null);
    setOverrideRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('overrideRole');
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        currentRole,
        login,
        logout,
        setUserRole,
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