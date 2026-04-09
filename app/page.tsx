'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/lib/context/LanguageContext';
import { products } from '@/lib/data/products';
import { categories } from '@/lib/data/categories';
import { ArrowRight, Heart, Star, Truck, RotateCcw } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const { t, isRTL } = useLanguage();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden bg-gradient-to-r from-primary/10 via-background to-accent/10 md:h-screen">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&h=600&fit=crop"
              alt="Hero"
              className="h-full w-full object-cover opacity-40"
            />
          </div>

          <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-center px-4 py-16 text-center md:h-screen md:py-0">
            <div className="max-w-2xl">
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
                Timeless Fashion for Every Moment
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Discover our curated collection of premium fashion wear designed for the modern individual.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/shop">
                  <Button size="lg">
                    {t('button.checkout')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    {t('footer.about')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-b bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Truck className="mb-4 h-12 w-12 text-primary" />
                <h3 className="text-lg font-semibold">Free Shipping</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  On orders over $100. Fast delivery worldwide.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="mb-4 h-12 w-12 text-primary" />
                <h3 className="text-lg font-semibold">Easy Returns</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  30-day return policy for your peace of mind.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Heart className="mb-4 h-12 w-12 text-primary" />
                <h3 className="text-lg font-semibold">Quality First</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Premium materials and expert craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Featured Collections</h2>
              <Link href="/shop">
                <Button variant="ghost">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="group overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative overflow-hidden bg-muted">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-64 w-full object-cover transition-transform group-hover:scale-110"
                      />
                      {product.discount && (
                        <div className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                          -{product.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">
                            ${product.discount
                              ? (product.price * (1 - product.discount / 100)).toFixed(2)
                              : product.price.toFixed(2)}
                          </span>
                          {product.discount && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span className="text-xs font-semibold">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="border-b py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold">Shop by Category</h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <Link key={category.id} href={`/shop?category=${category.id}`}>
                  <Card className="group relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-48 w-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-4">
                      <div>
                        <h3 className="font-semibold text-white">{category.name}</h3>
                        <p className="text-xs text-gray-200">{category.itemCount} items</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">New Arrivals</h2>
              <Link href="/shop?filter=new">
                <Button variant="ghost">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {newProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="group overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative overflow-hidden bg-muted">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-64 w-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                        New
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span className="text-xs font-semibold">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="border-t bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Best Sellers</h2>
              <Link href="/shop?filter=bestseller">
                <Button variant="ghost">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {bestSellers.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="group overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative overflow-hidden bg-muted">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-64 w-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span className="text-xs font-semibold">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-primary py-16 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl font-bold">Ready to Elevate Your Style?</h2>
            <p className="mt-4 text-lg opacity-90">
              Discover premium fashion pieces that define your personal style.
            </p>
            <div className="mt-8">
              <Link href="/shop">
                <Button size="lg" variant="secondary">
                  Start Shopping
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
