'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/lib/context/LanguageContext';
import Link from 'next/link';
import { Heart, Globe, Zap, Shield } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden bg-gradient-to-r from-primary/10 via-background to-accent/10 md:h-screen">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop"
              alt="About us"
              className="h-full w-full object-cover opacity-40"
            />
          </div>

          <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-center px-4 py-16 text-center md:h-screen md:py-0">
            <div className="max-w-2xl">
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
                {t('footer.about')}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Discover the story behind our premium fashion brand and our commitment to excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-3xl font-bold">Our Story</h2>
                <p className="mt-4 text-muted-foreground">
                  Founded with a passion for timeless fashion, our brand began as a small vision to create
                  premium clothing that combines elegance, comfort, and sustainability.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Over the years, we&apos;ve grown into a trusted name in the fashion industry, known for our
                  meticulous attention to detail and commitment to quality materials.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Today, we serve customers across the globe who share our belief that fashion should be
                  timeless, not trendy, and accessible to everyone.
                </p>
              </div>
              <div className="relative h-96 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop"
                  alt="Our story"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="border-t border-b bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              To create timeless, high-quality fashion that empowers individuals to express their unique
              style while maintaining our commitment to sustainability and ethical production.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-center text-3xl font-bold">Our Values</h2>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Heart className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Quality</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Premium materials and expert craftsmanship in every piece
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Globe className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Sustainability</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ethical production and environmental responsibility
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Zap className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Innovation</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Constantly evolving our designs and customer experience
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Shield className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Integrity</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Honest communication and transparent business practices
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="border-t bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-center text-3xl font-bold">Our Team</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              We&apos;re a diverse group of designers, craftspeople, and visionaries united by our passion for fashion.
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20" />
                  <div className="p-6 text-center">
                    <h3 className="font-semibold">Team Member</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Position Title</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-primary py-16 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl font-bold">Join Our Community</h2>
            <p className="mt-4 text-lg opacity-90">
              Be part of something special. Discover the latest collections and exclusive offers.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/shop">
                <Button size="lg" variant="secondary">
                  Shop Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  {t('footer.contact')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
