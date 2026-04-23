'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';

export function Footer() {
  const { t, isRTL } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const shopLinks = [
    {
      label: isRTL ? 'كل المنتجات' : 'All Products',
      href: '/shop',
    },
    {
      label: isRTL ? 'وصل حديثًا' : 'New Arrivals',
      href: '/shop?filter=new',
    },
    {
      label: isRTL ? 'العروض' : 'Sale',
      href: '/shop?filter=sale',
    },
  ];

  const companyLinks = [
    {
      label: t('footer.about'),
      href: '/about',
    },
    {
      label: t('footer.contact'),
      href: '/contact',
    },
    {
      label: t('nav.shop'),
      href: '/shop',
    },
  ];

  return (
    <footer
      dir={isRTL ? 'ltr' : 'rtl'}
      className="relative overflow-hidden border-t bg-[#0b0b0f] text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-[-80px] h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-60px] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-10 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:mb-14 md:p-8">
          <div
            className={`flex flex-col gap-6 md:flex-row md:items-center md:justify-between ${
              isRTL ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-white/60">
                {isRTL ? 'بريميوم ستايل' : 'Premium Style'}
              </p>

              <h2 className="max-w-2xl text-2xl font-bold leading-tight md:text-4xl">
                {isRTL
                  ? 'ستايل يلفت من أول نظرة — خامة، تفاصيل، وهوية'
                  : 'Style that stands out from the first look — quality, detail, and identity.'}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
                {isRTL
                  ? 'اكتشف تشكيلتنا المختارة بعناية وخلّي حضور البراند يبان في كل تفصيلة من الموقع.'
                  : 'Explore a carefully curated collection and give your brand presence a sharper, more elevated feel.'}
              </p>
            </div>

            <div className={`flex ${isRTL ? 'md:justify-start' : 'md:justify-end'}`}>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
              >
                {isRTL ? 'تسوّق الآن' : 'Shop Now'}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`grid gap-10 md:grid-cols-2 ${
            isRTL
              ? 'lg:grid-cols-[1fr_0.9fr_0.9fr_1.3fr]'
              : 'lg:grid-cols-[1.3fr_0.9fr_0.9fr_1fr]'
          }`}
        >
          <div className={`${isRTL ? 'text-right lg:order-4' : 'text-left lg:order-1'}`}>
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {t('footer.brand')}
            </div>

            <h3 className="mt-5 text-3xl font-extrabold tracking-tight">
              {isRTL ? 'موضة بستايل جريء' : 'Fashion with a bold edge'}
            </h3>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
              {isRTL
                ? 'مش مجرد منتجات، لكن تجربة شكلها أنظف، إحساسها أقوى، وتفاصيلها معمولة علشان تخلي البراند يبان بشكل مميز.'
                : 'Not just products, but a cleaner experience, stronger presence, and thoughtful details designed to elevate the brand.'}
            </p>

            <div className={`mt-6 flex gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-white/75 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white hover:text-black"
                  >
                    <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className={`${isRTL ? 'text-right lg:order-3' : 'text-left lg:order-2'}`}>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
              {t('nav.shop')}
            </h4>

            <ul className="mt-5 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white ${
                      isRTL ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${isRTL ? 'text-right lg:order-2' : 'text-left lg:order-3'}`}>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
              {isRTL ? 'الشركة' : 'Company'}
            </h4>

            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white ${
                      isRTL ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${isRTL ? 'text-right lg:order-1' : 'text-left lg:order-4'}`}>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
              {isRTL ? 'تواصل معنا' : 'Contact'}
            </h4>

            <div className="mt-5 space-y-5">
              <a
                href="mailto:support@example.com"
                className={`group flex items-start gap-3 text-white/70 transition-colors hover:text-white ${
                  isRTL ? 'flex-row-reverse text-right' : ''
                }`}
              >
                <div className="mt-0.5 rounded-full bg-white/5 p-2 text-primary ring-1 ring-white/10 transition-all group-hover:bg-white/10">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                    {isRTL ? 'الإيميل' : 'Email'}
                  </p>
                  <p className="mt-1 text-sm">support@example.com</p>
                </div>
              </a>

              <a
                href="tel:+201000000000"
                className={`group flex items-start gap-3 text-white/70 transition-colors hover:text-white ${
                  isRTL ? 'flex-row-reverse text-right' : ''
                }`}
              >
                <div className="mt-0.5 rounded-full bg-white/5 p-2 text-primary ring-1 ring-white/10 transition-all group-hover:bg-white/10">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                    {isRTL ? 'الهاتف' : 'Phone'}
                  </p>
                  <p className="mt-1 text-sm">+20 100 000 0000</p>
                </div>
              </a>

              <div
                className={`flex items-start gap-3 text-white/70 ${
                  isRTL ? 'flex-row-reverse text-right' : ''
                }`}
              >
                <div className="mt-0.5 rounded-full bg-white/5 p-2 text-primary ring-1 ring-white/10">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                    {isRTL ? 'العنوان' : 'Address'}
                  </p>
                  <p className="mt-1 text-sm">
                    {isRTL ? 'القاهرة، مصر' : 'Cairo, Egypt'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div
            className={`flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${
              isRTL ? 'md:flex-row-reverse' : ''
            }`}
          >
            <p className="text-sm text-white/45">
              &copy; 2024 {t('footer.brand')}.{' '}
              {isRTL ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </p>

            <div
              className={`flex flex-wrap gap-4 text-sm text-white/45 ${
                isRTL ? 'md:flex-row-reverse' : ''
              }`}
            >
              <Link href="/about" className="transition-colors hover:text-white">
                {t('footer.about')}
              </Link>
              <Link href="/contact" className="transition-colors hover:text-white">
                {t('footer.contact')}
              </Link>
              <Link href="/shop" className="transition-colors hover:text-white">
                {t('nav.shop')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}