'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/lib/context/AuthContext';
import { useCart } from '@/lib/context/CartContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import Link from 'next/link';
import { User, Heart, Package, Trash2 } from 'lucide-react';
import { products } from '@/lib/data/products';
import { useState } from 'react';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { user, isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [wishlist, setWishlist] = useState(products.slice(0, 3));

  const handleRemove = (productId: string) => {
    setWishlist(wishlist.filter((p) => p.id !== productId));
    toast.success(t('message.removed_from_wishlist'));
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product, product.sizes[0], product.colors[0].id, 1);
    toast.success(t('message.added_to_cart'));
  };

  if (!isLoggedIn || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Please log in</h2>
            <Link href="/login" className="block mt-6">
              <Button>{t('nav.login')}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-muted/30 py-8 border-b">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-3xl font-bold">{t('account.wishlist')}</h1>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar Navigation */}
            <div>
              <Card className="p-4">
                <nav className="space-y-2">
                  <Link href="/account/profile">
                    <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted">
                      <User className="h-5 w-5" />
                      <span className="text-sm">{t('account.profile')}</span>
                    </div>
                  </Link>
                  <Link href="/account/orders">
                    <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted">
                      <Package className="h-5 w-5" />
                      <span className="text-sm">{t('account.orders')}</span>
                    </div>
                  </Link>
                  <Link href="/account/wishlist">
                    <div className="flex items-center gap-3 rounded-lg bg-primary p-3 text-primary-foreground">
                      <Heart className="h-5 w-5" />
                      <span className="text-sm font-semibold">{t('account.wishlist')}</span>
                    </div>
                  </Link>
                </nav>
              </Card>
            </div>

            {/* Wishlist Items */}
            <div className="lg:col-span-3">
              {wishlist.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {wishlist.map((product) => (
                    <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="relative overflow-hidden bg-muted h-64">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(product.id)}
                          className="absolute right-2 top-2 bg-white/80 hover:bg-white text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="p-4">
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-semibold hover:text-primary line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                          {product.discount && (
                            <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                              -{product.discount}%
                            </span>
                          )}
                        </div>

                        <Button
                          className="mt-4 w-full"
                          onClick={() => handleAddToCart(product)}
                        >
                          {t('button.add_to_cart')}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-lg font-semibold">No items in your wishlist</p>
                  <p className="mt-2 text-muted-foreground">
                    Add items to your wishlist to save them for later
                  </p>
                  <Link href="/shop" className="block mt-6">
                    <Button>{t('nav.shop')}</Button>
                  </Link>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
