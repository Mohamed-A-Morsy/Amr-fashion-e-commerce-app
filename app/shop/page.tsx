'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/data/products';
import { categories } from '@/lib/data/categories';
import { Star, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ShopPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);

  // Filter products
  let filtered = products.filter((p) => {
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const matchesSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max;
    const matchesSize = selectedSizes.length === 0 || p.sizes.some((s) => selectedSizes.includes(s));
    return matchesCategory && matchesSearch && matchesPrice && matchesSize;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="border-b bg-muted/30 py-8">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-3xl font-bold">{t('nav.shop')}</h1>
            <p className="mt-2 text-muted-foreground">
              Discover our premium collection of fashion wear
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden space-y-6 lg:block">
              {/* Search */}
              <div>
                <h3 className="font-semibold">{t('button.search')}</h3>
                <Input
                  type="search"
                  placeholder={t('header.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold">{t('nav.categories')}</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="all-categories"
                      checked={!selectedCategory}
                      onCheckedChange={() => setSelectedCategory('')}
                    />
                    <label htmlFor="all-categories" className="ml-2 cursor-pointer text-sm">
                      All Categories
                    </label>
                  </div>
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center">
                      <Checkbox
                        id={`cat-${cat.id}`}
                        checked={selectedCategory === cat.id}
                        onCheckedChange={() =>
                          setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)
                        }
                      />
                      <label htmlFor={`cat-${cat.id}`} className="ml-2 cursor-pointer text-sm">
                        {cat.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold">{t('product.price')}</h3>
                <div className="mt-3 space-y-2">
                  <div>
                    <label className="text-xs text-muted-foreground">Min: ${priceRange.min}</label>
                    <Input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: parseInt(e.target.value) })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Max: ${priceRange.max}</label>
                    <Input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h3 className="font-semibold">{t('product.select_size')}</h3>
                <div className="mt-3 space-y-2">
                  {allSizes.slice(0, 8).map((size) => (
                    <div key={size} className="flex items-center">
                      <Checkbox
                        id={`size-${size}`}
                        checked={selectedSizes.includes(size)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedSizes([...selectedSizes, size]);
                          } else {
                            setSelectedSizes(selectedSizes.filter((s) => s !== size));
                          }
                        }}
                      />
                      <label htmlFor={`size-${size}`} className="ml-2 cursor-pointer text-sm">
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedCategory('');
                  setSearchTerm('');
                  setSelectedSizes([]);
                  setPriceRange({ min: 0, max: 1000 });
                }}
              >
                Clear Filters
              </Button>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Top Bar */}
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2 lg:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    {t('button.filter')}
                  </Button>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Showing {filtered.length} products
                  </p>
                </div>

                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              {/* Mobile Filters - Expandable */}
              {showFilters && (
                <div className="mb-6 space-y-4 rounded-lg border bg-muted/30 p-4 lg:hidden">
                  <Input
                    type="search"
                    placeholder={t('header.search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div>
                    <h4 className="font-semibold text-sm">{t('nav.categories')}</h4>
                    <div className="mt-2 space-y-1">
                      {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center">
                          <Checkbox
                            id={`mobile-cat-${cat.id}`}
                            checked={selectedCategory === cat.id}
                            onCheckedChange={() =>
                              setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)
                            }
                          />
                          <label
                            htmlFor={`mobile-cat-${cat.id}`}
                            className="ml-2 cursor-pointer text-sm"
                          >
                            {cat.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              {filtered.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((product) => (
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
                          <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                            {product.description}
                          </p>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold">
                                ${product.discount
                                  ? (product.price * (1 - product.discount / 100)).toFixed(2)
                                  : product.price.toFixed(2)}
                              </span>
                              {product.discount && (
                                <span className="text-xs text-muted-foreground line-through">
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
              ) : (
                <div className="flex h-96 items-center justify-center rounded-lg border border-dashed">
                  <div className="text-center">
                    <p className="text-lg font-semibold">No products found</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
