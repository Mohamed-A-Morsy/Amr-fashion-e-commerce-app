'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import { CartProvider } from '@/lib/context/CartContext';
import { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}