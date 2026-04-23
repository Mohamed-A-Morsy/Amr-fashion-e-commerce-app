'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/lib/context/LanguageContext';
import { getOrderById } from '@/lib/services/googleSheetsApi';
import { Order } from '@/types';
import { CheckCircle, Mail, Truck, Clock, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '201030088222'; 

export default function OrderSuccessPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        setError('');

        if (!orderId) {
          setError('Order ID is missing');
          return;
        }

        const result = await getOrderById(orderId);

        if (!result) {
          setError('Order not found');
          return;
        }

        setOrder(result);
      } catch (err) {
        console.error(err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  const estimatedDelivery = useMemo(() => {
    const baseDate = order?.created_at ? new Date(order.created_at) : new Date();
    return new Date(baseDate.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString();
  }, [order]);

  const whatsappLink = useMemo(() => {
    if (!order) return '#';

    const itemsText = order.items
      .map(
        (item) =>
          `- ${item.name} | Qty: ${item.quantity} | Size: ${item.size} | Color: ${item.color}`
      )
      .join('\n');

    const paymentText =
      order.payment_method === 'instapay'
        ? 'Payment Method: Instapay Transfer'
        : 'Payment Method: Cash on Delivery';

    const message =
      `Hello, I want to confirm my order.\n\n` +
      `Order Number: ${order.order_id}\n` +
      `Name: ${order.customer_name}\n` +
      `Phone: ${order.phone}\n` +
      `City: ${order.city}\n` +
      `Address: ${order.address}\n` +
      `${paymentText}\n` +
      `Total: ${order.total}\n\n` +
      `Items:\n${itemsText}\n\n` +
      (order.payment_method === 'instapay'
        ? `I will send the Instapay transfer confirmation.`
        : `Please confirm my cash on delivery order.`);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [order]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-2xl px-4 py-16 text-center">
            <p className="text-lg font-semibold">Loading order details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-2xl px-4 py-16 text-center">
            <p className="text-lg font-semibold text-red-500">
              {error || 'Order not found'}
            </p>

            <div className="mt-6">
              <Link href="/shop">
                <Button>Back to Shop</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const orderDate = new Date(order.created_at).toLocaleDateString();
  const isInstapay = order.payment_method === 'instapay';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
            <h1 className="mt-4 text-3xl font-bold">{t('order.success')}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Your order has been created successfully.
            </p>
          </div>

          <Card className="mt-8 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">{t('order.number')}</p>
                <p className="mt-1 text-2xl font-bold">{order.order_id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('order.date')}</p>
                <p className="mt-1 text-2xl font-bold">{orderDate}</p>
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer</span>
                  <span className="font-medium">{order.customer_name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{order.phone}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium">
                    {isInstapay ? 'Instapay Transfer' : 'Cash on Delivery'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-bold">${Number(order.total).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <h3 className="font-semibold">What happens next?</h3>

              <div className="mt-4 space-y-4">
                <div className="flex gap-3">
                  <MessageCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Confirm on WhatsApp</p>
                    <p className="text-sm text-muted-foreground">
                      {isInstapay
                        ? 'Send your order and transfer confirmation on WhatsApp to complete the process.'
                        : 'Send your order on WhatsApp for final confirmation and delivery coordination.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Order Saved</p>
                    <p className="text-sm text-muted-foreground">
                      Your order has already been recorded successfully in our system.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Processing</p>
                    <p className="text-sm text-muted-foreground">
                      We will review your order details after WhatsApp confirmation.
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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href={whatsappLink} target="_blank" rel="noreferrer">
              <Button size="lg" className="w-full sm:w-auto">
                <MessageCircle className="mr-2 h-5 w-5" />
                Confirm on WhatsApp
              </Button>
            </a>

            <Link href="/shop">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {t('button.continue_shopping')}
              </Button>
            </Link>
          </div>

          <Card className="mt-8 bg-muted/30 p-6">
            <h3 className="font-semibold">Need help?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {isInstapay
                ? 'After making the Instapay transfer, send your payment screenshot on WhatsApp with your order number.'
                : 'If you have any questions about your order, please contact us on WhatsApp or through the contact page.'}
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}