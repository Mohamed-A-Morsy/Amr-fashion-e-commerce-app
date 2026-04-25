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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-1 py-1 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-16 w-h-h-16 sm:h-20 sm:w-20 shrink-0">
            <Image
              src={
                mounted && theme === "dark"
                  ? "/logo-dark2.png"
                  : "/logo-light2.png"
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
            className="relative text-sm font-medium transition-colors duration-300 hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            {t("nav.shop")}
          </Link>

          <Link
            href="/about"
            className="relative text-sm font-medium transition-colors duration-300 hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            {t("nav.about")}
          </Link>

          <Link
            href="/contact"
            className="relative text-sm font-medium transition-colors duration-300 hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
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
          <nav className="flex flex-col gap-2">
            {[
              { href: "/", label: t("nav.home") },
              { href: "/shop", label: t("nav.shop") },
              { href: "/about", label: t("nav.about") },
              { href: "/contact", label: t("nav.contact") },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary active:scale-95"
              >
                {item.label}

                {/* line animation */}
                <span className="absolute left-4 bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-[calc(100%-2rem)]"></span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
