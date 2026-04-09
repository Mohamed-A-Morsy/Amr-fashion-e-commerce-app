'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useCart } from '@/lib/context/CartContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone is required'),
  street: z.string().min(5, 'Street is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(3, 'ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { t } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      checkoutSchema.parse(formData);

      // Simulate order creation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear cart and redirect to success page
      clearCart();
      toast.success(t('order.success'));
      router.push('/order-success');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error('Please fix the errors in the form');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Add items before checking out</p>
            <Link href="/shop" className="block mt-6">
              <Button>{t('nav.shop')}</Button>
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
        {/* Page Header */}
        <div className="border-b bg-muted/30 py-8">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-3xl font-bold">{t('checkout.order_summary')}</h1>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Customer Information */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold">{t('checkout.customer_info')}</h2>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium">{t('checkout.full_name')}</label>
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={errors.fullName ? 'border-red-500' : ''}
                        placeholder="John Doe"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium">{t('checkout.email')}</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'border-red-500' : ''}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium">{t('checkout.phone')}</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? 'border-red-500' : ''}
                        placeholder="+1 (555) 000-0000"
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                    </div>
                  </div>
                </Card>

                {/* Shipping Address */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold">{t('checkout.shipping_address')}</h2>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium">{t('checkout.street')}</label>
                      <Input
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className={errors.street ? 'border-red-500' : ''}
                        placeholder="123 Main St"
                      />
                      {errors.street && <p className="mt-1 text-xs text-red-500">{errors.street}</p>}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium">{t('checkout.city')}</label>
                        <Input
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={errors.city ? 'border-red-500' : ''}
                          placeholder="New York"
                        />
                        {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium">{t('checkout.state')}</label>
                        <Input
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={errors.state ? 'border-red-500' : ''}
                          placeholder="NY"
                        />
                        {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium">{t('checkout.zip_code')}</label>
                        <Input
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className={errors.zipCode ? 'border-red-500' : ''}
                          placeholder="10001"
                        />
                        {errors.zipCode && (
                          <p className="mt-1 text-xs text-red-500">{errors.zipCode}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium">{t('checkout.country')}</label>
                        <Input
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className={errors.country ? 'border-red-500' : ''}
                          placeholder="United States"
                        />
                        {errors.country && (
                          <p className="mt-1 text-xs text-red-500">{errors.country}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Payment Method */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold">{t('checkout.payment_method')}</h2>
                  <div className="mt-4 space-y-3">
                    <label className="flex items-center rounded-lg border p-3 cursor-pointer hover:bg-muted">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'card')}
                      />
                      <span className="ml-3">{t('checkout.cash_on_delivery')}</span>
                    </label>
                    <label className="flex items-center rounded-lg border p-3 cursor-pointer hover:bg-muted">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'card')}
                      />
                      <span className="ml-3">{t('checkout.credit_card')}</span>
                    </label>
                  </div>
                </Card>

                {/* Submit Button */}
                <Button size="lg" className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? 'Processing...' : t('checkout.place_order')}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24 p-6">
                <h2 className="text-lg font-bold">{t('order.items')}</h2>

                <div className="mt-6 space-y-3">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product?.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">
                        ${((item.product?.price ?? 0) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

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
                </div>

                <div className="mt-6 border-t pt-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">{t('cart.total')}</span>
                    <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
