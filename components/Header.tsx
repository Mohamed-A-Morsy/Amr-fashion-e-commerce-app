'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Menu, Sun, Moon, Globe } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { cartCount } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  if (typeof window !== 'undefined' && !mounted) {
    setMounted(true);
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold">{t('footer.brand')}</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/shop" className="text-sm font-medium transition-colors hover:text-primary">
            {t('nav.shop')}
          </Link>
          <Link href="/categories" className="text-sm font-medium transition-colors hover:text-primary">
            {t('nav.categories')}
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            {t('nav.about')}
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search Bar - Desktop Only */}
          <div className="hidden gap-2 lg:flex">
            <Input
              type="search"
              placeholder={t('header.search')}
              className="w-64"
            />
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            <Globe className="h-5 w-5" />
            <span className="ml-1 text-xs font-bold">{language.toUpperCase()}</span>
          </Button>

          {/* Cart Icon */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Account Menu */}
          <div className="hidden items-center gap-2 md:flex">
            {isLoggedIn && user ? (
              <>
                <Link href="/account/profile">
                  <Button variant="ghost" className="text-sm">
                    {user.name}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-sm">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">{t('nav.register')}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t bg-card p-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              {t('nav.home')}
            </Link>
            <Link href="/shop" onClick={() => setIsMenuOpen(false)}>
              {t('nav.shop')}
            </Link>
            <Link href="/categories" onClick={() => setIsMenuOpen(false)}>
              {t('nav.categories')}
            </Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>
              {t('nav.about')}
            </Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              {t('nav.contact')}
            </Link>
            {isLoggedIn && user ? (
              <>
                <Link href="/account/profile" onClick={() => setIsMenuOpen(false)}>
                  {user.name}
                </Link>
                <Button variant="ghost" onClick={() => { logout(); setIsMenuOpen(false); }}>
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  {t('nav.login')}
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  {t('nav.register')}
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
