'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ role: 'admin' | 'customer' }>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database with both admin and customer users
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+1234567890',
    role: 'customer',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@store.com',
    password: 'Admin123',
    phone: '+1234567890',
    role: 'admin',
    createdAt: new Date(),
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<{ role: 'admin' | 'customer' }> => {
    // Simulate API call
    return new Promise<{ role: 'admin' | 'customer' }>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find((u) => u.email === email && u.password === password);

        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword as User);
          resolve({ role: foundUser.role });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  const register = async (name: string, email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const userExists = mockUsers.find((u) => u.email === email);

        if (userExists) {
          reject(new Error('Email already registered'));
        } else {
          const newUser: User = {
            id: String(mockUsers.length + 1),
            name,
            email,
            password,
            role: 'customer',
            createdAt: new Date(),
          };

          mockUsers.push(newUser);
          const { password: _, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword as User);
          resolve();
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedData });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
