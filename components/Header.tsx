"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useCart } from "@/lib/context/CartContext";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Menu, Sun, Moon, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { cartCount } = useCart();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0">
            <Image
              src={
                mounted && theme === "dark"
                  ? "/logo-dark.png"
                  : "/logo-light.png"
              }
              alt="Wdee Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/shop"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("nav.shop")}
          </Link>
          {/* <Link href="/categories" className="text-sm font-medium transition-colors hover:text-primary">
            {t('nav.categories')}
          </Link> */}
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("nav.about")}
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("nav.contact")}
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search Bar - Desktop Only */}
          <div className="hidden gap-2 lg:flex">
            <Input
              type="search"
              placeholder={t("header.search")}
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
            {mounted && theme === "dark" ? (
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
            <span className="ml-1 text-xs font-bold">
              {language.toUpperCase()}
            </span>
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
              {t("nav.home")}
            </Link>
            <Link href="/shop" onClick={() => setIsMenuOpen(false)}>
              {t("nav.shop")}
            </Link>
            {/* <Link href="/categories" onClick={() => setIsMenuOpen(false)}>
              {t('nav.categories')}
            </Link> */}
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>
              {t("nav.about")}
            </Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              {t("nav.contact")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
