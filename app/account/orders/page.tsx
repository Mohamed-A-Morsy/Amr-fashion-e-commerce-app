'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/lib/context/AuthContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import Link from 'next/link';
import { User, Settings, Heart, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function OrdersPage() {
  const { user, isLoggedIn } = useAuth();
  const { t } = useLanguage();

  // Mock orders
  const orders = [
    {
      id: '#ORD001',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      status: 'delivered' as const,
      total: 249.99,
      items: 3,
    },
    {
      id: '#ORD002',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'shipped' as const,
      total: 159.99,
      items: 1,
    },
    {
      id: '#ORD003',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'processing' as const,
      total: 399.98,
      items: 2,
    },
  ];

  const getStatusColor = (status: typeof orders[0]['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
            <h1 className="text-3xl font-bold">{t('account.orders')}</h1>
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
                    <div className="flex items-center gap-3 rounded-lg bg-primary p-3 text-primary-foreground">
                      <Package className="h-5 w-5" />
                      <span className="text-sm font-semibold">{t('account.orders')}</span>
                    </div>
                  </Link>
                  <Link href="/account/wishlist">
                    <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted">
                      <Heart className="h-5 w-5" />
                      <span className="text-sm">{t('account.wishlist')}</span>
                    </div>
                  </Link>
                </nav>
              </Card>
            </div>

            {/* Orders List */}
            <div className="lg:col-span-3">
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="p-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Order ID</p>
                          <p className="text-lg font-bold">{order.id}</p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Placed on {order.date.toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge className={`mt-1 ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Items</p>
                          <p className="text-lg font-bold">{order.items}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                        </div>

                        <Link href={`/account/orders/${order.id}`}>
                          <Button variant="outline">{t('button.view')}</Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-lg font-semibold">No orders yet</p>
                  <p className="mt-2 text-muted-foreground">
                    Start shopping to create your first order
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
