'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import { CartProvider } from '@/lib/context/CartContext';
import { AuthProvider } from '@/lib/context/AuthContext';
import { AdminAuthProvider } from '@/lib/context/AdminAuthContext';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AdminAuthProvider>
        <LanguageProvider>
          <CartProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </CartProvider>
        </LanguageProvider>
      </AdminAuthProvider>
    </ThemeProvider>
  );
}
