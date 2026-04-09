'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AdminAuthContextType {
  isAdminLoggedIn: boolean;
  adminEmail: string | null;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = {
  email: 'admin@store.com',
  password: 'Admin123',
};

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  // Check if admin session exists on mount
  useEffect(() => {
    const storedAdminSession = localStorage?.getItem('adminSession');
    if (storedAdminSession === 'true') {
      const storedEmail = localStorage?.getItem('adminEmail');
      setIsAdminLoggedIn(true);
      setAdminEmail(storedEmail);
    }
  }, []);

  const adminLogin = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          setIsAdminLoggedIn(true);
          setAdminEmail(email);
          localStorage?.setItem('adminSession', 'true');
          localStorage?.setItem('adminEmail', email);
          resolve();
        } else {
          reject(new Error('Invalid admin credentials'));
        }
      }, 500);
    });
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminEmail(null);
    localStorage?.removeItem('adminSession');
    localStorage?.removeItem('adminEmail');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdminLoggedIn,
        adminEmail,
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
