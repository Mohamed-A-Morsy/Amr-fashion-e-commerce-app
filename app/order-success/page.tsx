'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/lib/context/LanguageContext';
import Link from 'next/link';
import { CheckCircle, Mail, Truck, Clock } from 'lucide-react';

export default function OrderSuccessPage() {
  const { t } = useLanguage();
  const orderNumber = `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const orderDate = new Date().toLocaleDateString();
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-16">
          {/* Success Message */}
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
            <h1 className="mt-4 text-3xl font-bold">{t('order.success')}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Thank you for your purchase! Your order has been confirmed.
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="mt-8 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">{t('order.number')}</p>
                <p className="mt-1 text-2xl font-bold">{orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('order.date')}</p>
                <p className="mt-1 text-2xl font-bold">{orderDate}</p>
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <h3 className="font-semibold">What happens next?</h3>
              <div className="mt-4 space-y-4">
                <div className="flex gap-3">
                  <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Confirmation Email</p>
                    <p className="text-sm text-muted-foreground">
                      Check your email for order confirmation and tracking details
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Processing</p>
                    <p className="text-sm text-muted-foreground">
                      Your order will be processed within 1-2 business days
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Truck className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">{t('checkout.estimated_delivery')}</p>
                    <p className="text-sm text-muted-foreground">
                      Expected to arrive by {estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/shop">
              <Button variant="outline" size="lg">
                {t('button.continue_shopping')}
              </Button>
            </Link>
            <Link href="/shop">
              <Button size="lg">
                {t('order.track')}
              </Button>
            </Link>
          </div>

          {/* Support Section */}
          <Card className="mt-8 bg-muted/30 p-6">
            <h3 className="font-semibold">Need help?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              If you have any questions about your order, please{' '}
              <Link href="/contact" className="text-primary hover:underline">
                contact us
              </Link>
              {' '}or email us at support@example.com
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
