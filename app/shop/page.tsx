'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/lib/context/LanguageContext';
import { getProducts } from '@/lib/services/googleSheetsApi';
import { Product } from '@/types';
import { useSearchParams } from 'next/navigation';
import { Star, Filter } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type CategoryItem = {
  id: string;
  name: string;
};

function getFinalPrice(product: Product) {
  const price = Number(product.price || 0);
  const discount = Number(product.discount || 0);

  if (!discount) return price;

  return Math.max(price - (price * discount) / 100, 0);
}

export default function ShopPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const result = await getProducts();
        setProducts(result);

        const maxPrice = result.length
          ? Math.max(...result.map((product) => getFinalPrice(product)))
          : 1000;

        setPriceRange({
          min: 0,
          max: Math.max(1000, Math.ceil(maxPrice)),
        });
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = useMemo<CategoryItem[]>(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category).filter(Boolean))
    );

    return uniqueCategories.map((category) => ({
      id: category,
      name: category,
    }));
  }, [products]);

  const allSizes = useMemo(() => {
    return Array.from(new Set(products.flatMap((product) => product.sizes || [])));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products].filter((product) => {
      const finalPrice = getFinalPrice(product);

      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const minPrice = Math.min(priceRange.min, priceRange.max);
      const maxPrice = Math.max(priceRange.min, priceRange.max);

      const matchesPrice = finalPrice >= minPrice && finalPrice <= maxPrice;
      const matchesSize =
        selectedSizes.length === 0 ||
        (product.sizes || []).some((size) => selectedSizes.includes(size));

      return matchesCategory && matchesSearch && matchesPrice && matchesSize;
    });

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
      });
    }

    return filtered;
  }, [products, selectedCategory, searchTerm, selectedSizes, priceRange, sortBy]);

  const resetFilters = () => {
    const maxPrice = products.length
      ? Math.max(...products.map((product) => getFinalPrice(product)))
      : 1000;

    setSelectedCategory('');
    setSearchTerm('');
    setSelectedSizes([]);
    setPriceRange({
      min: 0,
      max: Math.max(1000, Math.ceil(maxPrice)),
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="border-b bg-muted/30 py-8">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-3xl font-bold">{t('nav.shop')}</h1>
            <p className="mt-2 text-muted-foreground">
              Discover our premium collection of fashion wear
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          {loading ? (
            <div className="flex h-96 items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <p className="text-lg font-semibold">Loading products...</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Please wait while we load the collection
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex h-96 items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <p className="text-lg font-semibold text-red-500">{error}</p>
                <Button className="mt-4" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-4">
              <div className="hidden space-y-6 lg:block">
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

                <div>
                  <h3 className="font-semibold">{t('product.price')}</h3>
                  <div className="mt-3 space-y-2">
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Min: ${Math.min(priceRange.min, priceRange.max)}
                      </label>
                      <Input
                        type="range"
                        min="0"
                        max={Math.max(1000, priceRange.max)}
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            min: parseInt(e.target.value, 10),
                          })
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground">
                        Max: ${Math.max(priceRange.min, priceRange.max)}
                      </label>
                      <Input
                        type="range"
                        min="0"
                        max={Math.max(1000, priceRange.max)}
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            max: parseInt(e.target.value, 10),
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

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

                <Button variant="outline" className="w-full" onClick={resetFilters}>
                  Clear Filters
                </Button>
              </div>

              <div className="lg:col-span-3">
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
                      Showing {filteredProducts.length} products
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

                {showFilters && (
                  <div className="mb-6 space-y-4 rounded-lg border bg-muted/30 p-4 lg:hidden">
                    <Input
                      type="search"
                      placeholder={t('header.search')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <div>
                      <h4 className="text-sm font-semibold">{t('nav.categories')}</h4>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center">
                          <Checkbox
                            id="mobile-all-categories"
                            checked={!selectedCategory}
                            onCheckedChange={() => setSelectedCategory('')}
                          />
                          <label
                            htmlFor="mobile-all-categories"
                            className="ml-2 cursor-pointer text-sm"
                          >
                            All Categories
                          </label>
                        </div>

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

                    <div>
                      <h4 className="text-sm font-semibold">{t('product.select_size')}</h4>
                      <div className="mt-2 space-y-1">
                        {allSizes.slice(0, 8).map((size) => (
                          <div key={size} className="flex items-center">
                            <Checkbox
                              id={`mobile-size-${size}`}
                              checked={selectedSizes.includes(size)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedSizes([...selectedSizes, size]);
                                } else {
                                  setSelectedSizes(selectedSizes.filter((s) => s !== size));
                                }
                              }}
                            />
                            <label
                              htmlFor={`mobile-size-${size}`}
                              className="ml-2 cursor-pointer text-sm"
                            >
                              {size}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" onClick={resetFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}

                {filteredProducts.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((product) => {
                      const finalPrice = getFinalPrice(product);

                      return (
                        <Link key={product.id} href={`/products/${product.id}`}>
                          <Card className="group overflow-hidden transition-all hover:shadow-lg">
                            <div className="relative overflow-hidden bg-muted">
                              <img
                                src={product.images?.[0] || '/placeholder-image.png'}
                                alt={product.name}
                                className="h-64 w-full object-cover transition-transform group-hover:scale-110"
                              />

                              {!!product.discount && (
                                <div className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                                  -{product.discount}%
                                </div>
                              )}
                            </div>

                            <div className="p-4">
                              <h3 className="line-clamp-2 font-semibold">{product.name}</h3>

                              <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                                {product.description}
                              </p>

                              <div className="mt-3 flex items-end justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold">
                                    ${finalPrice.toFixed(2)}
                                  </span>

                                  {!!product.discount && (
                                    <span className="text-xs text-muted-foreground line-through">
                                      ${Number(product.price).toFixed(2)}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                                  <span className="text-xs font-semibold">
                                    {Number(product.rating || 0)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      );
                    })}
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
          )}
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}