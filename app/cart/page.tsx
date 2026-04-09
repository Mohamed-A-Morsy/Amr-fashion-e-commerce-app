'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useCart } from '@/lib/context/CartContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import Link from 'next/link';
import { Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const { t } = useLanguage();
  const [discountCode, setDiscountCode] = useState('');

  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="border-b bg-muted/30 py-8">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-3xl font-bold">{t('nav.cart')}</h1>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          {items.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {items.map((item) => (
                    <Card key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`} className="p-4">
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                          <img
                            src={item.product?.images[0]}
                            alt={item.product?.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <Link
                              href={`/products/${item.productId}`}
                              className="text-lg font-semibold hover:text-primary"
                            >
                              {item.product?.name}
                            </Link>
                            <div className="mt-1 flex gap-4 text-sm text-muted-foreground">
                              <span>{t('product.select_color')}: {item.selectedColor}</span>
                              <span>{t('product.select_size')}: {item.selectedSize}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold">
                              ${(item.product?.price ?? 0).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Quantity & Remove */}
                        <div className="flex flex-col items-end justify-between">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              removeFromCart(item.productId, item.selectedSize, item.selectedColor)
                            }
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          <div className="flex items-center gap-2 rounded-lg border border-input bg-muted">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.selectedSize,
                                  item.selectedColor,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="px-3 py-1 hover:bg-background"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.selectedSize,
                                  item.selectedColor,
                                  item.quantity + 1
                                )
                              }
                              className="px-3 py-1 hover:bg-background"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-sm font-semibold">
                            ${((item.product?.price ?? 0) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="mt-6">
                  <Link href="/shop">
                    <Button variant="outline" className="w-full">
                      {t('button.continue_shopping')}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Cart Summary */}
              <div>
                <Card className="sticky top-24 p-6">
                  <h2 className="text-lg font-bold">{t('cart.order_summary')}</h2>

                  {/* Discount Code */}
                  <div className="mt-6">
                    <div className="flex gap-2">
                      <Input
                        placeholder={t('cart.discount_code')}
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                      />
                      <Button variant="outline" size="sm">
                        {t('button.apply')}
                      </Button>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mt-6 space-y-3 border-t pt-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('cart.tax')}</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('cart.shipping')}</span>
                      <span className="font-semibold">
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>

                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over $100
                      </p>
                    )}
                  </div>

                  {/* Total */}
                  <div className="mt-6 border-t pt-6">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">{t('cart.total')}</span>
                      <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout" className="block">
                    <Button size="lg" className="mt-6 w-full">
                      {t('button.checkout')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  {/* Clear Cart */}
                  <Button
                    variant="outline"
                    className="mt-2 w-full"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex h-96 items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
                <h2 className="mt-4 text-2xl font-bold">{t('cart.empty')}</h2>
                <p className="mt-2 text-muted-foreground">
                  Add items to your cart to get started
                </p>
                <Link href="/shop" className="block mt-6">
                  <Button>{t('nav.shop')}</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
