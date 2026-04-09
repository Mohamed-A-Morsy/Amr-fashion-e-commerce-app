'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { User } from '@/types';

interface AdminAuthContextType {
  adminUser: User | null;
  isAdminLoggedIn: boolean;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const { user, login, logout } = useAuth();

  const adminLogin = async (email: string, password: string) => {
    try {
      const result = await login(email, password);
      // Verify user is admin
      if (result.role !== 'admin') {
        logout();
        throw new Error('This account does not have admin access');
      }
    } catch (error) {
      throw error;
    }
  };

  const adminLogout = () => {
    logout();
  };

  // Check if current user is admin
  const isAdminUser = user?.role === 'admin';

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser: isAdminUser ? user : null,
        isAdminLoggedIn: isAdminUser,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
